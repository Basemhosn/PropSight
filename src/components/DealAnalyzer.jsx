import { useState } from 'react';
import { t } from '../i18n';
import { fmtAED, fmtNum } from '../utils/format';

const AREA_NICE = {'Al Barsha South Fourth':'JVC','Burj Khalifa':'Downtown Dubai','Marsa Dubai':'Dubai Marina','Hadaeq Sheikh Mohammed Bin Rashid':'Dubai Hills','Al Thanyah Fifth':'JLT','Business Bay':'Business Bay','Palm Jumeirah':'Palm Jumeirah','Al Merkadh':'MBR City','Al Khairan First':'Creek Harbour','Al Hebiah Fourth':'Damac Hills'};
const niceArea = a => AREA_NICE[a] || a;


const DEV_TIERS = {
  'Ultra Premium': ['Bulgari','Six Senses','Baccarat','Aman','Four Seasons','Dorchester','Armani'],
  'Premium': ['Ellington','Omniyat','Select Group','Alpago','AHS Properties','Sobha'],
  'Mid-Market': ['Emaar','Nakheel','Meraas','Aldar','Union Properties'],
  'Affordable Luxury': ['Damac','Binghatti','Azizi','Danube','Tiger'],
  'Value': ['Deyaar','RAK Properties','Bloom','Gulf General'],
};
const getDevTier = (dev) => { for (const [tier, devs] of Object.entries(DEV_TIERS)) { if (devs.some(d => dev.toLowerCase().includes(d.toLowerCase()))) return tier; } return 'Standard'; };
const DEV_PREMIUM = { 'Ultra Premium':'+30-50%', 'Premium':'+15-25%', 'Mid-Market':'Market rate', 'Affordable Luxury':'-5-10%', 'Value':'-10-20%', 'Standard':'Varies' };

export default function DealAnalyzer({areaData, projectsData}) {
  const lang = localStorage.getItem('lang') || 'en';
  const [tab, setTab] = useState('manual');
  const [unit, setUnit] = useState('sqft');
  const [mode, setMode] = useState('buy'); // 'buy' or 'sell'
  const [form, setForm] = useState({ area:'', price:'', size:'', bedrooms:'', type:'Apartment', url:'', developer:'', project:'' });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const areas = areaData ? Object.keys(areaData).map(k=>({key:k,label:niceArea(k)})) : [];
  const inp = {width:'100%',padding:'10px 12px',borderRadius:8,boxSizing:'border-box',background:'var(--bg-alt)',border:'1px solid rgba(59,130,246,0.15)',color:'var(--text-primary)',fontSize:13,outline:'none',fontFamily:'system-ui'};
  const lbl = {fontSize:12,color:'var(--text-muted)',marginBottom:5,display:'block',fontWeight:500};

  const analyze = async () => {
    setLoading(true); setError(''); setResult(null);
    const areaKey = form.area;
    const kpis = areaData?.[areaKey]?.kpis || {};
    const priceTrend = areaData?.[areaKey]?.priceTrend || [];
    const price = parseFloat(form.price.replace(/,/g,''))||0;
    const sizeRaw = parseFloat(form.size.replace(/,/g,''))||0;
    const sizeSqft = unit==='sqm' ? Math.round(sizeRaw*10.764) : sizeRaw;
    const sizeSqm  = unit==='sqm' ? sizeRaw : Math.round(sizeRaw/10.764);
    const ppsqft = sizeSqft>0 ? Math.round(price/sizeSqft) : 0;
    const ppsqm  = sizeSqm>0  ? Math.round(price/sizeSqm)  : 0;
    const marketPpsqft = Math.round((kpis.ppsqm||0)/10.764);
    const marketPpsqm  = kpis.ppsqm||0;
    const yoy = priceTrend.length>=2 ? ((priceTrend[priceTrend.length-1].ppsqm-priceTrend[priceTrend.length-2].ppsqm)/priceTrend[priceTrend.length-2].ppsqm*100).toFixed(1) : 0;

    try {
      const response = await fetch('/api/claude', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          model:'claude-haiku-4-5-20251001', max_tokens:1000,
          messages:[{role:'user',content:`You are a Dubai real estate ${mode==='buy'?'investment':'valuation'} analyst.

${mode==='buy'?'A buyer is considering this property — analyze if it is a good deal.':'A seller wants to price their property — analyze the market and recommend an asking price.'}

Property: ${niceArea(areaKey)||'Not specified'} | ${form.type} | ${form.bedrooms||'?'} BR
${mode==='buy'?'Asking Price':'Current Estimated Value'}: AED ${fmtNum(price)}
Developer: ${form.developer||'Not specified'} (Tier: ${getDevTier(form.developer||'')})
Project: ${form.project||'Not specified'}
Size: ${sizeSqft} sqft / ${sizeSqm} sqm
Price/sqft: AED ${fmtNum(ppsqft)} | Price/sqm: AED ${fmtNum(ppsqm)}
${form.url?'Listing URL: '+form.url:''}

Live Market Data for ${niceArea(areaKey)}:
- Market avg price/sqft: AED ${fmtNum(marketPpsqft)} (AED ${fmtNum(marketPpsqm)}/sqm)
- Area avg transaction: AED ${fmtAED(kpis.avg||0,true)}
- Total transactions: ${fmtNum(kpis.count||0)}
- YoY price growth: ${yoy}%
- Off-plan share: ${kpis.count?Math.round((kpis.offPlan||0)/kpis.count*100):0}%
- Developer tier premium: ${DEV_PREMIUM[getDevTier(form.developer||'')]}

IMPORTANT: Factor in developer reputation and brand premium/discount when calculating fair value. Ellington, Sobha, and Select Group command 15-25% premiums. Azizi and Danube are more affordable. Bulgari and Six Senses are ultra-luxury.

${mode==='buy'?
'Analyze if this is a good buy. Consider price vs market, growth potential, yield.':
'Help the seller price competitively. Suggest optimal asking price, time to sell, and negotiation room.'}

Respond ONLY with JSON (no markdown, no backticks):
${mode==='buy'?
'{"verdict":"BUY","score":7,"summary":"2 sentence buyer summary.","pros":["pro1","pro2","pro3"],"cons":["con1","con2"],"fairValue":2300000,"rentalYield":5.2,"priceVsMarket":-3}':
'{"verdict":"PRICE NOW","score":8,"summary":"2 sentence seller summary.","pros":["seller pro1","seller pro2","seller pro3"],"cons":["seller con1","seller con2"],"fairValue":2500000,"recommendedAsk":2450000,"negotiationRoom":3,"daysToSell":45}'}`}]
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || 'API error');
      const text = data.content?.[0]?.text||'';
      const clean = text.replace(/```json|```/g,'').trim();
      const parsed = JSON.parse(clean);
      setResult({...parsed,price,sizeSqft,sizeSqm,ppsqft,ppsqm,marketPpsqft,marketPpsqm,areaKey,yoy});
    } catch(err) {
      setError('Analysis failed: '+err.message);
    }
    setLoading(false);
  };

  const VS = {
    BUY:  {bg:'rgba(34,197,94,0.15)',color:'#22C55E',border:'rgba(34,197,94,0.3)',icon:'✅'},
    HOLD: {bg:'rgba(245,158,11,0.15)',color:'#F59E0B',border:'rgba(245,158,11,0.3)',icon:'⚠️'},
    AVOID:{bg:'rgba(248,113,113,0.15)',color:'#F87171',border:'rgba(248,113,113,0.3)',icon:'❌'},
  };

  return (
    <div style={{flex:1,overflowY:'auto',background:'var(--bg)',fontFamily:'system-ui',padding:'24px 28px'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:24}}>
        <div>
          <h1 style={{margin:0,fontSize:22,fontWeight:700,color:'var(--text-primary)',marginBottom:4}}>{t('Deal Analyzer',lang)}</h1>
          <div style={{fontSize:13,color:'var(--text-secondary)'}}>{t('AI powered analysis',lang)}</div>
        </div>
        <div style={{display:'flex',gap:0,background:'var(--surface)',border:'1px solid rgba(59,130,246,0.15)',borderRadius:12,padding:4}}>
          {[['buy','🔍 Buying'],['sell','💰 Selling']].map(([m,label])=>(
            <button key={m} onClick={()=>{setMode(m);setResult(null);}} style={{padding:'9px 22px',borderRadius:9,border:'none',cursor:'pointer',fontSize:13,fontWeight:mode===m?700:400,fontFamily:'system-ui',background:mode===m?m==='buy'?'linear-gradient(135deg,#1D4ED8,#38BDF8)':'linear-gradient(135deg,#16A34A,#22C55E)':'transparent',color:mode===m?'#fff':'var(--text-muted)',transition:'all 0.2s'}}>{label}</button>
          ))}
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
        <div style={{background:'var(--surface)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:14,padding:24}}>
          <div style={{fontSize:14,fontWeight:600,color:'var(--text-primary)',marginBottom:16}}>{t('Property Details',lang)}</div>

          <div style={{display:'flex',gap:6,marginBottom:16,background:'var(--bg-alt)',borderRadius:10,padding:4,width:'fit-content'}}>
            {[['manual','Enter Details'],['url','Paste URL']].map(([id,label])=>(
              <button key={id} onClick={()=>setTab(id)} style={{padding:'7px 16px',borderRadius:8,border:'none',cursor:'pointer',fontSize:12,fontFamily:'system-ui',fontWeight:tab===id?600:400,background:tab===id?'linear-gradient(135deg,#1D4ED8,#38BDF8)':'transparent',color:tab===id?'#fff':'var(--text-muted)'}}>{label}</button>
            ))}
          </div>

          {tab==='url' && (
            <div style={{marginBottom:14}}>
              <label style={lbl}>{t('Property URL',lang)}</label>
              <textarea value={form.url} onChange={e=>setForm(f=>({...f,url:e.target.value}))} placeholder="Paste property URL or description..." rows={3} style={{...inp,resize:'vertical'}}/>
            </div>
          )}

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:14}}>
            <div>
              <label style={lbl}>{t('Developer',lang)}</label>
              <input value={form.developer} onChange={e=>setForm(f=>({...f,developer:e.target.value}))} placeholder="e.g. Ellington, Emaar, Azizi..." style={inp}/>
              {form.developer && getDevTier(form.developer) !== 'Standard' && (
                <div style={{fontSize:10,marginTop:4,color:'#38BDF8'}}>Tier: {getDevTier(form.developer)} · {DEV_PREMIUM[getDevTier(form.developer)]}</div>
              )}
            </div>
            <div>
              <label style={lbl}>{t('Project Building',lang)}</label>
              <input value={form.project} onChange={e=>setForm(f=>({...f,project:e.target.value}))} placeholder="e.g. Belgravia Heights..." style={inp}/>
            </div>
          </div>
          <div style={{marginBottom:14}}>
            <label style={lbl}>Area *</label>
            <select value={form.area} onChange={e=>setForm(f=>({...f,area:e.target.value}))} style={{...inp,cursor:'pointer'}}>
              <option value="">Select area...</option>
              {areas.map(a=><option key={a.key} value={a.key}>{a.label}</option>)}
            </select>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:14}}>
            <div>
              <label style={lbl}>{t('Type',lang)}</label>
              <select value={form.type} onChange={e=>setForm(f=>({...f,type:e.target.value}))} style={{...inp,cursor:'pointer'}}>
                {['Apartment','Villa','Townhouse','Penthouse','Studio','Office'].map(t=><option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={lbl}>{t('Bedrooms',lang)}</label>
              <select value={form.bedrooms} onChange={e=>setForm(f=>({...f,bedrooms:e.target.value}))} style={{...inp,cursor:'pointer'}}>
                <option value="">Any</option>
                {['Studio','1','2','3','4','5+'].map(b=><option key={b}>{b}</option>)}
              </select>
            </div>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:20}}>
            <div>
              <label style={lbl}>Asking Price (AED) *</label>
              <input value={form.price} onChange={e=>setForm(f=>({...f,price:e.target.value}))} placeholder="2,500,000" style={inp}/>
            </div>
            <div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:5}}>
                <label style={{...lbl,marginBottom:0}}>{t('Size',lang)}</label>
                <div style={{display:'flex',gap:4}}>
                  {['sqft','sqm'].map(u=>(
                    <button key={u} onClick={()=>setUnit(u)} style={{padding:'2px 8px',borderRadius:20,border:'none',cursor:'pointer',fontSize:10,fontWeight:unit===u?700:400,fontFamily:'system-ui',background:unit===u?'var(--border-strong)':'rgba(59,130,246,0.06)',color:unit===u?'#38BDF8':'var(--text-muted)'}}>{u}</button>
                  ))}
                </div>
              </div>
              <input value={form.size} onChange={e=>setForm(f=>({...f,size:e.target.value}))} placeholder={unit==='sqft'?'1,200':'111'} style={inp}/>
              {form.size && parseFloat(form.size)>0 && (
                <div style={{fontSize:10,color:'var(--text-secondary)',marginTop:4}}>
                  = {unit==='sqft' ? Math.round(parseFloat(form.size)/10.764)+' sqm' : Math.round(parseFloat(form.size)*10.764)+' sqft'}
                </div>
              )}
            </div>
          </div>

          <button onClick={analyze} disabled={loading||!form.area||!form.price} style={{width:'100%',padding:'13px',borderRadius:10,border:'none',cursor:'pointer',background:'linear-gradient(135deg,#1D4ED8,#38BDF8)',color:'#fff',fontSize:14,fontWeight:700,fontFamily:'system-ui',opacity:loading||!form.area||!form.price?0.5:1}}>
            {loading?'🤖 Analyzing...':mode==='buy'?'🔍 Analyze as Buyer →':'💰 Get Seller Valuation →'}
          </button>
          {error && <div style={{fontSize:12,color:'#F87171',marginTop:10,textAlign:'center'}}>{error}</div>}

          {form.area && areaData?.[form.area] && (
            <div style={{marginTop:16,padding:14,background:'rgba(59,130,246,0.06)',border:'1px solid rgba(59,130,246,0.1)',borderRadius:10}}>
              <div style={{fontSize:11,color:'var(--text-muted)',fontWeight:600,marginBottom:10,textTransform:'uppercase',letterSpacing:'0.05em'}}>Market — {niceArea(form.area)}</div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
                {[
                  ['Avg Deal',fmtAED(areaData[form.area].kpis?.avg||0,true),'var(--text-primary)'],
                  ['Price/sqft','AED '+fmtNum(Math.round((areaData[form.area].kpis?.ppsqm||0)/10.764)),'#38BDF8'],
                  ['Price/sqm','AED '+fmtNum(areaData[form.area].kpis?.ppsqm||0),'#38BDF8'],
                  ['Transactions',fmtNum(areaData[form.area].kpis?.count||0),'var(--text-secondary)'],
                ].map(([l,v,c],i)=>(
                  <div key={i}><div style={{fontSize:10,color:'var(--text-secondary)'}}>{l}</div><div style={{fontSize:13,fontWeight:600,color:c}}>{v}</div></div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          {!result&&!loading && (
            <div style={{background:'var(--surface)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:14,padding:40,textAlign:'center',height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
              <div style={{fontSize:48,marginBottom:16}}>🤖</div>
              <div style={{fontSize:16,fontWeight:600,color:'var(--text-primary)',marginBottom:8}}>{t('AI Deal Verdict',lang)}</div>
              <div style={{fontSize:13,color:'var(--text-secondary)',lineHeight:1.6}}>Enter property details and click Analyze to get an AI-powered investment verdict using live Dubai market data.</div>
            </div>
          )}
          {loading && (
            <div style={{background:'var(--surface)',border:'1px solid rgba(59,130,246,0.2)',borderRadius:14,padding:40,textAlign:'center',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100%'}}>
              <div style={{width:48,height:48,border:'3px solid rgba(59,130,246,0.2)',borderTopColor:'#38BDF8',borderRadius:'50%',animation:'spin 0.8s linear infinite',marginBottom:16}}/>
              <div style={{fontSize:14,color:'var(--text-secondary)'}}>Analyzing with AI...</div>
              <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
            </div>
          )}
          {result && (()=>{
            const vs=VS[result.verdict]||VS.HOLD;
            return (
              <div style={{background:'var(--surface)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:14,padding:24,display:'flex',flexDirection:'column',gap:14}}>
                <div style={{background:vs.bg,border:`1px solid ${vs.border}`,borderRadius:12,padding:20,textAlign:'center'}}>
                  <div style={{fontSize:36,marginBottom:6}}>{vs.icon}</div>
                  <div style={{fontSize:28,fontWeight:800,color:vs.color,marginBottom:4}}>{result.verdict}</div>
                {mode==='sell' && result.recommendedAsk && <div style={{fontSize:13,color:'var(--text-secondary)',marginTop:4}}>Recommended Ask: <span style={{color:'#22C55E',fontWeight:700}}>{fmtAED(result.recommendedAsk,true)}</span></div>}
                  <div style={{fontSize:13,color:'var(--text-secondary)',lineHeight:1.5}}>{result.summary}</div>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10}}>
                  {(mode==='buy'?[['Score',`${result.score}/10`,result.score>=7?'#22C55E':result.score>=5?'#F59E0B':'#F87171'],['Est. Yield',`${result.rentalYield||'—'}%`,'#38BDF8'],['vs Market',`${result.priceVsMarket>0?'+':''}${result.priceVsMarket}%`,result.priceVsMarket<=0?'#22C55E':'#F87171']]:[['Market Score',`${result.score}/10`,result.score>=7?'#22C55E':result.score>=5?'#F59E0B':'#F87171'],['Negotiation Room',`${result.negotiationRoom||3}%`,'#F59E0B'],['Est. Days to Sell',`${result.daysToSell||30}`,'#38BDF8']]).map(([l,v,c],i)=>(
                    <div key={i} style={{background:'rgba(59,130,246,0.06)',border:'1px solid rgba(59,130,246,0.1)',borderRadius:10,padding:'12px',textAlign:'center'}}>
                      <div style={{fontSize:10,color:'var(--text-muted)',marginBottom:4}}>{l}</div>
                      <div style={{fontSize:18,fontWeight:700,color:c}}>{v}</div>
                    </div>
                  ))}
                </div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
                  <div style={{background:'rgba(59,130,246,0.06)',border:'1px solid rgba(59,130,246,0.1)',borderRadius:10,padding:14}}>
                    <div style={{fontSize:10,color:'var(--text-muted)',marginBottom:4}}>{t('FAIR VALUE',lang)}</div>
                    <div style={{fontSize:18,fontWeight:700,color:'var(--text-primary)'}}>{fmtAED(result.fairValue,true)}</div>
                  </div>
                  <div style={{background:'rgba(59,130,246,0.06)',border:'1px solid rgba(59,130,246,0.1)',borderRadius:10,padding:14}}>
                    <div style={{fontSize:10,color:'var(--text-muted)',marginBottom:4}}>{t('YOUR PRICE/SQFT',lang)}</div>
                    <div style={{fontSize:15,fontWeight:700,color:'var(--text-primary)'}}>AED {fmtNum(result.ppsqft)}<span style={{fontSize:11,color:'var(--text-secondary)'}}> vs mkt AED {fmtNum(result.marketPpsqft)}</span></div>
                    <div style={{fontSize:12,color:'var(--text-secondary)',marginTop:2}}>AED {fmtNum(result.ppsqm)}/sqm vs mkt AED {fmtNum(result.marketPpsqm)}/sqm</div>
                  </div>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                  <div style={{background:'rgba(34,197,94,0.06)',border:'1px solid rgba(34,197,94,0.15)',borderRadius:10,padding:14}}>
                    <div style={{fontSize:11,fontWeight:600,color:'#22C55E',marginBottom:10}}>{t('PROS',lang)}</div>
                    {result.pros?.map((p,i)=><div key={i} style={{fontSize:12,color:'var(--text-secondary)',marginBottom:6,display:'flex',gap:6}}><span style={{color:'#22C55E',flexShrink:0}}>✓</span>{p}</div>)}
                  </div>
                  <div style={{background:'rgba(248,113,113,0.06)',border:'1px solid rgba(248,113,113,0.15)',borderRadius:10,padding:14}}>
                    <div style={{fontSize:11,fontWeight:600,color:'#F87171',marginBottom:10}}>{t('CONS',lang)}</div>
                    {result.cons?.map((c,i)=><div key={i} style={{fontSize:12,color:'var(--text-secondary)',marginBottom:6,display:'flex',gap:6}}><span style={{color:'#F87171',flexShrink:0}}>✗</span>{c}</div>)}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
