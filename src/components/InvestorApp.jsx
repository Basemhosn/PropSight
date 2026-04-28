import { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { fmtAED, fmtNum } from '../utils/format';

const AREA_NICE = {
  'Al Barsha South Fourth':'JVC','Burj Khalifa':'Downtown Dubai','Marsa Dubai':'Dubai Marina',
  'Hadaeq Sheikh Mohammed Bin Rashid':'Dubai Hills','Al Thanyah Fifth':'JLT',
  'Business Bay':'Business Bay','Palm Jumeirah':'Palm Jumeirah','Al Merkadh':'MBR City',
  'Al Khairan First':'Creek Harbour','Wadi Al Safa 5':'Arabian Ranches',
  'Jabal Ali First':'Jebel Ali','Al Hebiah Fourth':'Damac Hills',
};
const na = a => AREA_NICE[a] || a;

const AREA_EMOJIS = {
  'Dubai Marina':'🌊','Downtown Dubai':'🏙️','JVC':'🏘️','Business Bay':'💼',
  'Dubai Hills':'🌿','Palm Jumeirah':'🌴','JLT':'🏢','MBR City':'✨',
  'Creek Harbour':'⚓','Arabian Ranches':'🐎','Damac Hills':'⛳','Jebel Ali':'🏗️',
};

const QUICK_AREAS = ['Business Bay','Marsa Dubai','Al Barsha South Fourth','Burj Khalifa','Hadaeq Sheikh Mohammed Bin Rashid','Palm Jumeirah','Al Merkadh','Al Thanyah Fifth'];

const VERDICT_STYLE = {
  'GOOD DEAL':{bg:'rgba(34,197,94,0.1)',border:'rgba(34,197,94,0.25)',color:'#22C55E'},
  'FAIR PRICE':{bg:'rgba(245,158,11,0.1)',border:'rgba(245,158,11,0.25)',color:'#F59E0B'},
  'OVERPRICED':{bg:'rgba(248,113,113,0.1)',border:'rgba(248,113,113,0.25)',color:'#F87171'},
  'ERROR':{bg:'rgba(100,116,139,0.1)',border:'rgba(100,116,139,0.2)',color:'#64748B'},
};

export default function InvestorApp({ areaData, recentRaw, core, onSwitchToBroker }) {
  const { user, profile, signOut } = useAuth();
  const [search, setSearch] = useState('');
  const [selectedArea, setSelectedArea] = useState(null);
  const [dealPrice, setDealPrice] = useState('');
  const [dealSize, setDealSize] = useState('');
  const [dealResult, setDealResult] = useState(null);
  const [dealLoading, setDealLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('discover');

  const areas = useMemo(() => {
    if (!areaData) return [];
    return Object.entries(areaData).map(([key, d]) => {
      const pt = d.priceTrend || [];
      const yoy = pt.length >= 2 ? ((pt[pt.length-1].ppsqm - pt[pt.length-2].ppsqm)/pt[pt.length-2].ppsqm*100) : 0;
      return {
        key, name: na(key),
        emoji: AREA_EMOJIS[na(key)] || '🏠',
        count: d.kpis?.count || 0,
        avg: d.kpis?.avg || 0,
        ppsqft: Math.round((d.kpis?.ppsqm||0)/10.764),
        yoy: parseFloat(yoy.toFixed(1)),
        offPlanPct: d.kpis?.count ? Math.round((d.kpis?.offPlan||0)/d.kpis.count*100) : 0,
      };
    }).sort((a,b) => b.count - a.count);
  }, [areaData]);

  const suggestions = useMemo(() => {
    if (!search || search.length < 2) return [];
    const q = search.toLowerCase();
    return areas.filter(a => a.name.toLowerCase().includes(q) || a.key.toLowerCase().includes(q)).slice(0,6);
  }, [search, areas]);

  const recentSales = useMemo(() => {
    if (!recentRaw?.length) return [];
    let rows = [...recentRaw].sort((a,b) => (b.d||'').localeCompare(a.d||''));
    if (selectedArea) rows = rows.filter(r => r.a === selectedArea.key);
    return rows.slice(0,10);
  }, [recentRaw, selectedArea]);

  const displayAreas = search.length > 1 ? suggestions : areas.filter(a => QUICK_AREAS.includes(a.key));

  const analyzeDeal = async () => {
    if (!selectedArea || !dealPrice) return;
    setDealLoading(true); setDealResult(null);
    const price = parseFloat(dealPrice.replace(/,/g,''));
    const size = parseFloat(dealSize.replace(/,/g,'')) || 0;
    const ppsqft = size > 0 ? Math.round(price/size) : 0;
    const marketPpsqft = selectedArea.ppsqft;
    const diff = marketPpsqft > 0 ? ((ppsqft - marketPpsqft)/marketPpsqft*100) : 0;
    try {
      const res = await fetch('/api/claude', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          model:'claude-haiku-4-5-20251001', max_tokens:500,
          messages:[{role:'user',content:`Dubai real estate deal analysis. Be brief and friendly for a regular investor.

Area: ${selectedArea.name}
Asking price: AED ${fmtNum(price)}
${size>0?`Size: ${size} sqft, Price/sqft: AED ${fmtNum(ppsqft)}`:'No size provided'}
Market avg price/sqft: AED ${fmtNum(marketPpsqft)}
YoY growth: ${selectedArea.yoy}%
${ppsqft>0?`This is ${Math.abs(diff.toFixed(1))}% ${diff>0?'above':'below'} market average`:''}

Respond ONLY with valid JSON (no markdown):
{"verdict":"GOOD DEAL","emoji":"✅","headline":"Brief 8-word summary","insight":"2 friendly sentences explaining the analysis.","action":"One clear recommendation."}`}]
        })
      });
      const data = await res.json();
      const text = data.content?.[0]?.text || '';
      const parsed = JSON.parse(text.replace(/```json|```/g,'').trim());
      setDealResult({...parsed, price, ppsqft, marketPpsqft, diff});
    } catch(e) {
      setDealResult({verdict:'ERROR',emoji:'⚠️',headline:'Could not analyze',insight:'Please try again.',action:'Check your connection.'});
    }
    setDealLoading(false);
  };

  const inp = {width:'100%',padding:'12px 14px',borderRadius:10,background:'#070E1B',border:'1px solid rgba(59,130,246,0.15)',color:'#F1F5F9',fontSize:14,outline:'none',fontFamily:'inherit',boxSizing:'border-box'};

  return (
    <div style={{minHeight:'100vh',background:'#060E1A',fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",color:'#F1F5F9'}}>
      <style>{`
        .inv-card{transition:all 0.2s;cursor:pointer}
        .inv-card:hover{transform:translateY(-2px);border-color:rgba(56,189,248,0.3)!important;box-shadow:0 8px 24px rgba(0,0,0,0.3)}
        .inv-tab-btn{transition:all 0.15s;cursor:pointer;border:none;fontFamily:inherit}
        .inv-row:hover{background:rgba(59,130,246,0.04)!important}
        @keyframes spin{to{transform:rotate(360deg)}}
      `}</style>

      {/* NAV */}
      <nav style={{position:'sticky',top:0,zIndex:100,background:'rgba(6,14,26,0.96)',backdropFilter:'blur(20px)',borderBottom:'1px solid rgba(255,255,255,0.06)',height:58,padding:'0 24px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <div style={{width:28,height:28,borderRadius:7,background:'linear-gradient(135deg,#1D4ED8,#38BDF8)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14}}>🏙️</div>
          <span style={{fontSize:17,fontWeight:700,color:'#F1F5F9'}}>Prop<span style={{color:'#38BDF8'}}>Sight</span></span>
        </div>

        <div style={{display:'flex',gap:2,background:'rgba(255,255,255,0.04)',borderRadius:10,padding:3}}>
          {[['discover','🔍 Discover'],['deal','⚡ Deal Check'],['feed','📋 Recent Sales']].map(([id,lbl])=>(
            <button key={id} onClick={()=>setActiveTab(id)} className="inv-tab-btn" style={{padding:'6px 14px',borderRadius:8,fontSize:13,fontWeight:activeTab===id?600:400,background:activeTab===id?'#0D1929':'transparent',color:activeTab===id?'#F1F5F9':'#64748B',boxShadow:activeTab===id?'0 1px 4px rgba(0,0,0,0.3)':'none'}}>
              {lbl}
            </button>
          ))}
        </div>

        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <div style={{display:'flex',alignItems:'center',gap:6,background:'rgba(56,189,248,0.08)',border:'1px solid rgba(56,189,248,0.15)',borderRadius:20,padding:'4px 12px'}}>
            <span style={{fontSize:11}}>👤</span>
            <span style={{fontSize:11,fontWeight:600,color:'#38BDF8'}}>Investor Portal</span>
          </div>
          {profile?.subscription_status === 'pro' || profile?.subscription_status === 'agent' ? (
            <button onClick={onSwitchToBroker} style={{fontSize:11,color:'#475569',background:'none',border:'1px solid rgba(255,255,255,0.07)',borderRadius:8,padding:'5px 10px',cursor:'pointer',fontFamily:'inherit'}}>
              Switch to Broker →
            </button>
          ) : null}
          <div style={{width:30,height:30,borderRadius:'50%',background:'linear-gradient(135deg,#1D4ED8,#38BDF8)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:13,fontWeight:700,cursor:'pointer'}} onClick={signOut} title="Sign out">
            {(profile?.full_name?.[0]||user?.email?.[0]||'U').toUpperCase()}
          </div>
        </div>
      </nav>

      <div style={{maxWidth:880,margin:'0 auto',padding:'32px 20px'}}>

        {/* DISCOVER */}
        {activeTab==='discover' && <>
          <div style={{textAlign:'center',marginBottom:32}}>
            <h1 style={{fontSize:'clamp(22px,3vw,32px)',fontWeight:700,color:'#F1F5F9',marginBottom:8,letterSpacing:'-0.02em'}}>What are you looking for?</h1>
            <p style={{fontSize:15,color:'#64748B',marginBottom:24}}>Search any area or project in Dubai</p>
            <div style={{position:'relative',maxWidth:520,margin:'0 auto'}}>
              <div style={{display:'flex',alignItems:'center',gap:12,background:'#0D1929',border:'2px solid rgba(59,130,246,0.2)',borderRadius:14,padding:'13px 18px',boxShadow:'0 4px 20px rgba(0,0,0,0.3)'}}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                <input value={search} onChange={e=>{setSearch(e.target.value);setSelectedArea(null);}} placeholder="Dubai Marina, Business Bay, Emaar..." style={{background:'none',border:'none',outline:'none',color:'#F1F5F9',fontSize:15,flex:1,fontFamily:'inherit'}}/>
                {search && <button onClick={()=>{setSearch('');setSelectedArea(null);}} style={{background:'none',border:'none',cursor:'pointer',color:'#475569',fontSize:18,lineHeight:1,padding:0}}>×</button>}
              </div>
              {search.length>1 && suggestions.length>0 && (
                <div style={{position:'absolute',top:'calc(100% + 6px)',left:0,right:0,background:'#0D1929',border:'1px solid rgba(59,130,246,0.2)',borderRadius:12,zIndex:50,overflow:'hidden',boxShadow:'0 8px 32px rgba(0,0,0,0.5)'}}>
                  {suggestions.map((a,i)=>(
                    <button key={i} onClick={()=>{setSelectedArea(a);setSearch(a.name);}} style={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'100%',padding:'12px 16px',background:'none',border:'none',cursor:'pointer',borderBottom:i<suggestions.length-1?'1px solid rgba(255,255,255,0.04)':'none',fontFamily:'inherit'}}
                      onMouseEnter={e=>e.currentTarget.style.background='rgba(59,130,246,0.08)'}
                      onMouseLeave={e=>e.currentTarget.style.background='none'}>
                      <div style={{display:'flex',alignItems:'center',gap:10}}>
                        <span style={{fontSize:18}}>{a.emoji}</span>
                        <div style={{textAlign:'left'}}>
                          <div style={{fontSize:13,fontWeight:600,color:'#F1F5F9'}}>{a.name}</div>
                          <div style={{fontSize:11,color:'#475569'}}>{fmtNum(a.count)} transactions</div>
                        </div>
                      </div>
                      <div style={{textAlign:'right'}}>
                        <div style={{fontSize:13,fontWeight:600,color:'#F1F5F9'}}>AED {fmtNum(a.ppsqft)}<span style={{fontSize:10,color:'#475569'}}>/sqft</span></div>
                        <div style={{fontSize:11,color:a.yoy>=0?'#22C55E':'#F87171',fontWeight:600}}>{a.yoy>=0?'+':''}{a.yoy}%</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {selectedArea && (
            <div style={{background:'linear-gradient(135deg,rgba(29,78,216,0.1),rgba(6,14,26,0.5))',border:'1px solid rgba(59,130,246,0.2)',borderRadius:20,padding:24,marginBottom:24}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:20}}>
                <div style={{display:'flex',alignItems:'center',gap:12}}>
                  <span style={{fontSize:36}}>{selectedArea.emoji}</span>
                  <div>
                    <h2 style={{fontSize:22,fontWeight:700,color:'#F1F5F9',margin:0,marginBottom:4}}>{selectedArea.name}</h2>
                    <div style={{fontSize:13,color:'#475569'}}>{fmtNum(selectedArea.count)} total transactions</div>
                  </div>
                </div>
                <div style={{background:selectedArea.yoy>=0?'rgba(34,197,94,0.1)':'rgba(248,113,113,0.1)',border:`1px solid ${selectedArea.yoy>=0?'rgba(34,197,94,0.2)':'rgba(248,113,113,0.2)'}`,borderRadius:20,padding:'6px 14px',display:'flex',alignItems:'center',gap:6}}>
                  <span>{selectedArea.yoy>=0?'📈':'📉'}</span>
                  <span style={{fontSize:14,fontWeight:700,color:selectedArea.yoy>=0?'#22C55E':'#F87171'}}>{selectedArea.yoy>=0?'+':''}{selectedArea.yoy}% YoY</span>
                </div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,marginBottom:18}}>
                {[['Avg Sale Price',fmtAED(selectedArea.avg,true),'#F1F5F9','💰'],['Price / sqft','AED '+fmtNum(selectedArea.ppsqft),'#38BDF8','📐'],['Off-Plan Share',selectedArea.offPlanPct+'%','#F59E0B','🏗️']].map(([l,v,c,icon],i)=>(
                  <div key={i} style={{background:'rgba(255,255,255,0.04)',borderRadius:12,padding:'14px',textAlign:'center'}}>
                    <div style={{fontSize:18,marginBottom:6}}>{icon}</div>
                    <div style={{fontSize:10,color:'#64748B',marginBottom:4,textTransform:'uppercase',letterSpacing:'0.05em'}}>{l}</div>
                    <div style={{fontSize:18,fontWeight:700,color:c}}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{display:'flex',gap:10}}>
                <button onClick={()=>setActiveTab('deal')} style={{flex:1,padding:'11px',borderRadius:11,border:'none',cursor:'pointer',background:'linear-gradient(135deg,#1D4ED8,#38BDF8)',color:'#fff',fontSize:14,fontWeight:600,fontFamily:'inherit'}}>⚡ Check a deal here</button>
                <button onClick={()=>setActiveTab('feed')} style={{flex:1,padding:'11px',borderRadius:11,border:'1px solid rgba(255,255,255,0.08)',cursor:'pointer',background:'rgba(255,255,255,0.04)',color:'#94A3B8',fontSize:14,fontFamily:'inherit'}}>📋 Recent sales</button>
              </div>
            </div>
          )}

          <div style={{fontSize:12,fontWeight:600,color:'#475569',marginBottom:12,textTransform:'uppercase',letterSpacing:'0.07em'}}>{search.length>1?`${suggestions.length} results`:'Popular areas'}</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(190px,1fr))',gap:12}}>
            {displayAreas.map((a,i)=>(
              <div key={i} className="inv-card" onClick={()=>{setSelectedArea(a);setSearch(a.name);window.scrollTo({top:0,behavior:'smooth'});}} style={{background:'#0D1929',border:'1px solid rgba(255,255,255,0.06)',borderRadius:14,padding:'16px'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:10}}>
                  <span style={{fontSize:24}}>{a.emoji}</span>
                  <span style={{fontSize:11,fontWeight:700,padding:'3px 8px',borderRadius:20,background:a.yoy>=0?'rgba(34,197,94,0.1)':'rgba(248,113,113,0.1)',color:a.yoy>=0?'#22C55E':'#F87171'}}>{a.yoy>=0?'+':''}{a.yoy}%</span>
                </div>
                <div style={{fontSize:14,fontWeight:600,color:'#F1F5F9',marginBottom:4}}>{a.name}</div>
                <div style={{fontSize:20,fontWeight:700,color:'#38BDF8',marginBottom:2}}>AED {fmtNum(a.ppsqft)}<span style={{fontSize:10,color:'#475569',fontWeight:400}}>/sqft</span></div>
                <div style={{fontSize:11,color:'#475569'}}>{fmtNum(a.count)} transactions</div>
              </div>
            ))}
          </div>
        </>}

        {/* DEAL CHECK */}
        {activeTab==='deal' && (
          <div style={{maxWidth:560,margin:'0 auto'}}>
            <div style={{textAlign:'center',marginBottom:28}}>
              <h1 style={{fontSize:26,fontWeight:700,color:'#F1F5F9',marginBottom:6}}>⚡ Deal Check</h1>
              <p style={{fontSize:14,color:'#64748B'}}>Enter a property you are considering — get an instant AI verdict</p>
            </div>
            <div style={{background:'#0D1929',border:'1px solid rgba(255,255,255,0.06)',borderRadius:18,padding:24,marginBottom:16}}>
              <div style={{marginBottom:14}}>
                <label style={{fontSize:11,color:'#64748B',marginBottom:6,display:'block',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.05em'}}>Area *</label>
                <select value={selectedArea?.key||''} onChange={e=>{const a=areas.find(x=>x.key===e.target.value);setSelectedArea(a||null);setDealResult(null);}} style={{...inp,cursor:'pointer',appearance:'none'}}>
                  <option value="">Select an area...</option>
                  {areas.map(a=><option key={a.key} value={a.key}>{a.name}</option>)}
                </select>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:18}}>
                <div>
                  <label style={{fontSize:11,color:'#64748B',marginBottom:6,display:'block',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.05em'}}>Asking Price (AED) *</label>
                  <input value={dealPrice} onChange={e=>{setDealPrice(e.target.value);setDealResult(null);}} placeholder="2,500,000" style={inp}/>
                </div>
                <div>
                  <label style={{fontSize:11,color:'#64748B',marginBottom:6,display:'block',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.05em'}}>Size (sqft)</label>
                  <input value={dealSize} onChange={e=>{setDealSize(e.target.value);setDealResult(null);}} placeholder="1,200" style={inp}/>
                </div>
              </div>
              <button onClick={analyzeDeal} disabled={dealLoading||!selectedArea||!dealPrice} style={{width:'100%',padding:'13px',borderRadius:11,border:'none',cursor:'pointer',background:'linear-gradient(135deg,#1D4ED8,#38BDF8)',color:'#fff',fontSize:15,fontWeight:600,fontFamily:'inherit',opacity:dealLoading||!selectedArea||!dealPrice?0.5:1}}>
                {dealLoading?'Analyzing...':'Analyze this deal →'}
              </button>
            </div>
            {dealLoading && <div style={{textAlign:'center',padding:32}}><div style={{width:36,height:36,border:'3px solid rgba(59,130,246,0.2)',borderTopColor:'#38BDF8',borderRadius:'50%',animation:'spin 0.8s linear infinite',margin:'0 auto 12px'}}/><div style={{fontSize:13,color:'#64748B'}}>Analyzing with AI...</div></div>}
            {dealResult && !dealLoading && (()=>{
              const vs = VERDICT_STYLE[dealResult.verdict]||VERDICT_STYLE['FAIR PRICE'];
              return (
                <div style={{background:vs.bg,border:`2px solid ${vs.border}`,borderRadius:18,padding:24}}>
                  <div style={{textAlign:'center',marginBottom:18}}>
                    <div style={{fontSize:44,marginBottom:6}}>{dealResult.emoji}</div>
                    <div style={{fontSize:22,fontWeight:800,color:vs.color,marginBottom:4}}>{dealResult.verdict}</div>
                    <div style={{fontSize:15,fontWeight:600,color:'#F1F5F9',marginBottom:8}}>{dealResult.headline}</div>
                    <div style={{fontSize:13,color:'#94A3B8',lineHeight:1.65}}>{dealResult.insight}</div>
                  </div>
                  {dealResult.ppsqft>0 && (
                    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:14}}>
                      <div style={{background:'rgba(255,255,255,0.05)',borderRadius:10,padding:'12px',textAlign:'center'}}>
                        <div style={{fontSize:10,color:'#64748B',marginBottom:3,textTransform:'uppercase'}}>Your price/sqft</div>
                        <div style={{fontSize:17,fontWeight:700,color:'#F1F5F9'}}>AED {fmtNum(dealResult.ppsqft)}</div>
                      </div>
                      <div style={{background:'rgba(255,255,255,0.05)',borderRadius:10,padding:'12px',textAlign:'center'}}>
                        <div style={{fontSize:10,color:'#64748B',marginBottom:3,textTransform:'uppercase'}}>Market avg/sqft</div>
                        <div style={{fontSize:17,fontWeight:700,color:'#38BDF8'}}>AED {fmtNum(dealResult.marketPpsqft)}</div>
                      </div>
                    </div>
                  )}
                  <div style={{background:'rgba(255,255,255,0.06)',borderRadius:10,padding:'12px',textAlign:'center'}}>
                    <div style={{fontSize:10,color:'#64748B',marginBottom:4,textTransform:'uppercase',letterSpacing:'0.05em'}}>What to do</div>
                    <div style={{fontSize:13,color:'#F1F5F9',fontWeight:500}}>{dealResult.action}</div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* RECENT SALES */}
        {activeTab==='feed' && (
          <div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:18}}>
              <div>
                <h1 style={{fontSize:22,fontWeight:700,color:'#F1F5F9',margin:0,marginBottom:4}}>Recent Sales</h1>
                <div style={{fontSize:13,color:'#475569'}}>{selectedArea?`Latest in ${selectedArea.name}`:'Latest Dubai transactions'}</div>
              </div>
              {selectedArea && <button onClick={()=>setSelectedArea(null)} style={{background:'none',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8,color:'#475569',cursor:'pointer',padding:'6px 12px',fontSize:12,fontFamily:'inherit'}}>Show all</button>}
            </div>
            <div style={{background:'#0D1929',border:'1px solid rgba(255,255,255,0.06)',borderRadius:16,overflow:'hidden'}}>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 75px 90px 70px',padding:'10px 18px',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
                {['Area','Project','Date','Price','Type'].map((h,i)=><div key={i} style={{fontSize:10,color:'#475569',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.05em'}}>{h}</div>)}
              </div>
              {recentSales.map((r,i)=>{
                const ppsqft=r.s&&r.v?Math.round(r.v/r.s/10.764):0;
                return (
                  <div key={i} className="inv-row" style={{display:'grid',gridTemplateColumns:'1fr 1fr 75px 90px 70px',padding:'13px 18px',borderBottom:i<recentSales.length-1?'1px solid rgba(255,255,255,0.03)':'none',transition:'background 0.1s'}}>
                    <div>
                      <div style={{fontSize:13,fontWeight:600,color:'#F1F5F9'}}>{na(r.a||'')}</div>
                      <div style={{fontSize:11,color:'#475569'}}>{r.b||''}{ppsqft?' · AED '+fmtNum(ppsqft)+'/sqft':''}</div>
                    </div>
                    <div style={{fontSize:12,color:'#64748B',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',paddingRight:8,alignSelf:'center'}}>{r.j||'—'}</div>
                    <div style={{fontSize:11,color:'#475569',alignSelf:'center'}}>{r.d||'—'}</div>
                    <div style={{fontSize:13,fontWeight:600,color:'#F1F5F9',alignSelf:'center'}}>{r.v?fmtAED(r.v,true):'—'}</div>
                    <div style={{alignSelf:'center'}}><span style={{fontSize:10,fontWeight:600,padding:'2px 7px',borderRadius:20,background:r.r==='Off'?'rgba(59,130,246,0.1)':'rgba(34,197,94,0.1)',color:r.r==='Off'?'#38BDF8':'#22C55E'}}>{r.r==='Off'?'Off-Plan':'Ready'}</span></div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
