import { useState, useMemo, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { calcPropSightScore } from '../utils/propSightScore';
import { fmtAED, fmtNum } from '../utils/format';
import {
  BarChart, Bar, LineChart, Line, ScatterChart, Scatter,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';

const AREA_NICE = {
  'Al Barsha South Fourth':'JVC','Burj Khalifa':'Downtown Dubai','Marsa Dubai':'Dubai Marina',
  'Hadaeq Sheikh Mohammed Bin Rashid':'Dubai Hills','Al Thanyah Fifth':'JLT',
  'Business Bay':'Business Bay','Palm Jumeirah':'Palm Jumeirah','Al Merkadh':'MBR City',
  'Al Khairan First':'Creek Harbour','Al Hebiah Fourth':'Damac Hills',
};
const na = a => AREA_NICE[a] || a;
const tt = { contentStyle:{ background:'#0D1929', border:'1px solid rgba(56,189,248,0.2)', borderRadius:8, color:'#fff', fontSize:11 } };

function KPI({ label, value, sub, color='var(--text-primary)', bg='var(--bg-alt)' }) {
  return (
    <div style={{ background:bg, borderRadius:10, padding:'14px 16px' }}>
      <div style={{ fontSize:10, color:'var(--text-muted)', marginBottom:4, textTransform:'uppercase', letterSpacing:'0.06em' }}>{label}</div>
      <div style={{ fontSize:18, fontWeight:700, color, lineHeight:1.2 }}>{value}</div>
      {sub && <div style={{ fontSize:11, color:'var(--text-muted)', marginTop:4 }}>{sub}</div>}
    </div>
  );
}

function ScoreGauge({ score, color, size=120 }) {
  const r = (size-14)/2;
  const circ = 2*Math.PI*r;
  const filled = (score/100)*circ;
  return (
    <svg width={size} height={size} style={{ transform:'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={8}/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={8}
        strokeDasharray={`${filled} ${circ}`} strokeLinecap="round"/>
      <text x={size/2} y={size/2} textAnchor="middle" dominantBaseline="middle"
        style={{ transform:`rotate(90deg)`, transformOrigin:`${size/2}px ${size/2}px`,
          fill:color, fontSize:size*0.2, fontWeight:800, fontFamily:'system-ui' }}>
        {score}
      </text>
    </svg>
  );
}

export default function BrokerReport({ areaData, core, recentRaw }) {
  const { profile } = useAuth();
  const [form, setForm] = useState({
    selectedArea:'', bedrooms:'', propType:'Apartment',
    askingPrice:'', sizeSqft:'', clientName:'',
    propertyRef:'', floor:'', parkingSpaces:'1', condition:'Good',
  });
  const [generated, setGenerated] = useState(false);
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const areas = areaData ? Object.keys(areaData).sort() : [];
  const areaInfo = areaData?.[form.selectedArea];
  const dubaiAvg = core?.priceTrend?.slice(-1)[0]?.ppsqm || 15000;
  const maxCount = areaData ? Math.max(...Object.values(areaData).map(d=>d.kpis?.count||0)) : 5000;

  const score = useMemo(() => form.selectedArea && areaInfo ? calcPropSightScore({
    areaKpis:areaInfo.kpis||{}, priceTrend:areaInfo.priceTrend||[],
    dubaiAvgPpsqm:dubaiAvg, maxAreaCount:maxCount,
  }) : null, [form.selectedArea, areaInfo, dubaiAvg, maxCount]);

  const price  = parseFloat((form.askingPrice||'0').replace(/,/g,''))||0;
  const size   = parseFloat((form.sizeSqft||'0').replace(/,/g,''))||0;
  const ppsqft = size>0 ? Math.round(price/size) : 0;
  const marketPpsqft = Math.round((areaInfo?.kpis?.ppsqm||0)/10.764);
  const estimatedValue = marketPpsqft&&size ? Math.round(marketPpsqft*size) : 0;
  const valueRange = estimatedValue ? [Math.round(estimatedValue*0.92),Math.round(estimatedValue*1.08)] : [0,0];
  const priceVsMarket = marketPpsqft&&ppsqft ? ((ppsqft-marketPpsqft)/marketPpsqft*100) : 0;
  const priceVerdict = priceVsMarket < -5 ? 'Underpriced' : priceVsMarket > 8 ? 'Overpriced' : 'Fair Value';
  const verdictColor = priceVsMarket < -5 ? '#22C55E' : priceVsMarket > 8 ? '#F87171' : '#F59E0B';

  const yoy = useMemo(() => {
    const pt = areaInfo?.priceTrend||[];
    return pt.length>=2 ? +((pt[pt.length-1].ppsqm-pt[pt.length-2].ppsqm)/pt[pt.length-2].ppsqm*100).toFixed(1) : 0;
  }, [areaInfo]);

  const dldFees = useMemo(() => {
    if(!price) return null;
    const dld=Math.round(price*0.04), agent=Math.round(price*0.02), trust=4200;
    return { dld, agent, trust, total:dld+agent+trust, totalCost:price+dld+agent+trust };
  }, [price]);

  const comparables = useMemo(() => {
    if(!recentRaw?.length||!form.selectedArea) return [];
    return recentRaw
      .filter(r=>r.a===form.selectedArea&&(!form.bedrooms||r.b===form.bedrooms)&&r.v>0&&r.s>0)
      .sort((a,b)=>(b.d||'').localeCompare(a.d||''))
      .slice(0,8)
      .map(r=>({ date:r.d, project:r.j||'—', beds:r.b||'—',
        size:r.s?Math.round(r.s*10.764):0, price:r.v,
        ppsqft:r.s&&r.v?Math.round(r.v/r.s/10.764):0,
        reg:r.r==='Off'?'Off-Plan':'Ready' }));
  }, [recentRaw, form.selectedArea, form.bedrooms]);

  const compStats = useMemo(() => {
    if(!comparables.length) return null;
    const prices = comparables.map(c=>c.price).filter(Boolean);
    const psqfts = comparables.map(c=>c.ppsqft).filter(Boolean);
    const sorted = [...prices].sort((a,b)=>a-b);
    return {
      min:Math.min(...prices), max:Math.max(...prices),
      avg:Math.round(prices.reduce((s,v)=>s+v,0)/prices.length),
      median:sorted[Math.floor(sorted.length/2)],
      avgPpsqft:Math.round(psqfts.reduce((s,v)=>s+v,0)/psqfts.length),
      count:comparables.length,
    };
  }, [comparables]);

  const priceTrendData = useMemo(() => (areaInfo?.priceTrend||[]).map(p=>({
    year:p.year, area:Math.round(p.ppsqm/10.764),
    dubai:Math.round((core?.priceTrend?.find(x=>x.year===p.year)?.ppsqm||0)/10.764),
  })), [areaInfo, core]);

  const monthlyData = useMemo(() =>
    (core?.slices?.all?.monthly||[]).slice(-12).map(m=>({ month:m.month?.slice(5)||'', count:m.count||0 }))
  , [core]);

  const bedroomMix = useMemo(() => {
    if(!recentRaw?.length||!form.selectedArea) return [];
    const map={};
    recentRaw.filter(r=>r.a===form.selectedArea&&r.v>0).forEach(r=>{
      const b=r.b||'Other'; if(!map[b]) map[b]={beds:b,count:0,total:0};
      map[b].count++; map[b].total+=r.v;
    });
    return Object.values(map).sort((a,b)=>b.count-a.count).slice(0,6)
      .map(x=>({...x,avg:Math.round(x.total/x.count)}));
  }, [recentRaw, form.selectedArea]);

  const topProjects = useMemo(() => {
    if(!recentRaw?.length||!form.selectedArea) return [];
    const map={};
    recentRaw.filter(r=>r.a===form.selectedArea&&r.j).forEach(r=>{
      if(!map[r.j]) map[r.j]=0; map[r.j]++;
    });
    return Object.entries(map).sort((a,b)=>b[1]-a[1]).slice(0,6)
      .map(([name,count])=>({name,count}));
  }, [recentRaw, form.selectedArea]);

  const roiData = useMemo(() => {
    if(!price) return null;
    const yieldPct = areaInfo?.kpis?.ppsqm ? Math.min(10,Math.max(3,80000/areaInfo.kpis.ppsqm)) : 5.5;
    const annualRent = price*yieldPct/100;
    const scenarios = [20,25,30].map(dp=>{
      const loan=price*(1-dp/100), r=4.5/100/12, n=25*12;
      const monthly=loan*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);
      const cashflow=annualRent-monthly*12;
      return { downPct:dp, downAmt:price*dp/100, monthly:Math.round(monthly),
        cashflow:Math.round(cashflow), netYield:+(cashflow/price*100).toFixed(2) };
    });
    return { yieldPct:yieldPct.toFixed(1), annualRent:Math.round(annualRent), scenarios,
      futureValue5:Math.round(price*Math.pow(1+yoy/100,5)),
      capitalGain5:Math.round(price*Math.pow(1+yoy/100,5)-price) };
  }, [price, areaInfo, yoy]);

  const confidenceLevel = comparables.length>=5?'High':comparables.length>=3?'Medium':'Low';
  const confidenceColor = confidenceLevel==='High'?'#22C55E':confidenceLevel==='Medium'?'#F59E0B':'#F87171';

  const inp = { width:'100%', padding:'10px 12px', borderRadius:8, background:'var(--bg-alt)',
    border:'1px solid rgba(59,130,246,0.15)', color:'var(--text-primary)',
    fontSize:13, outline:'none', fontFamily:'system-ui', boxSizing:'border-box' };
  const lbl = { fontSize:11, color:'var(--text-muted)', marginBottom:6, fontWeight:600,
    textTransform:'uppercase', letterSpacing:'0.05em', display:'block' };

  return (
    <div style={{ flex:1, overflowY:'auto', background:'var(--bg)', fontFamily:'system-ui', padding:'24px 28px' }}>
      <style>{`@media print { .no-print{display:none!important} #rpt,#rpt *{visibility:visible} #rpt{position:fixed;left:0;top:0;width:100%} }`}</style>
      <div style={{ maxWidth:1000, margin:'0 auto' }}>

        {/* Header */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24 }}>
          <div>
            <h1 style={{ margin:0, fontSize:22, fontWeight:700, color:'var(--text-primary)', marginBottom:4 }}>Broker Valuation Report</h1>
            <div style={{ fontSize:13, color:'var(--text-secondary)' }}>Institutional-grade property analysis powered by live DLD data</div>
          </div>
          {generated && (
            <div className="no-print" style={{ display:'flex', gap:10 }}>
              <button onClick={()=>setGenerated(false)} style={{ padding:'10px 18px', borderRadius:10, border:'1px solid rgba(255,255,255,0.1)', background:'var(--surface)', color:'var(--text-secondary)', cursor:'pointer', fontSize:13, fontFamily:'system-ui' }}>← Edit</button>
              <button onClick={()=>window.print()} style={{ padding:'10px 24px', borderRadius:10, border:'none', background:'linear-gradient(135deg,#1D4ED8,#38BDF8)', color:'#fff', cursor:'pointer', fontSize:13, fontWeight:600, fontFamily:'system-ui' }}>Print / PDF</button>
            </div>
          )}
        </div>

        {/* Input form */}
        {!generated && (
          <div style={{ background:'var(--surface)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:16, padding:24, marginBottom:24 }}>
            <div style={{ fontSize:15, fontWeight:600, color:'var(--text-primary)', marginBottom:20 }}>Property Details</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:14 }}>
              <div><label style={lbl}>Client Name</label><input value={form.clientName} onChange={e=>set('clientName',e.target.value)} placeholder="Mohammed Al Rashid" style={inp}/></div>
              <div><label style={lbl}>Property Reference</label><input value={form.propertyRef} onChange={e=>set('propertyRef',e.target.value)} placeholder="Unit 808, Tower A" style={inp}/></div>
              <div><label style={lbl}>Area *</label>
                <select value={form.selectedArea} onChange={e=>set('selectedArea',e.target.value)} style={{...inp,cursor:'pointer'}}>
                  <option value="">Select area...</option>
                  {areas.map(a=><option key={a} value={a}>{na(a)}</option>)}
                </select>
              </div>
              <div><label style={lbl}>Property Type</label>
                <select value={form.propType} onChange={e=>set('propType',e.target.value)} style={{...inp,cursor:'pointer'}}>
                  {['Apartment','Villa','Townhouse','Penthouse','Studio','Office'].map(t=><option key={t}>{t}</option>)}
                </select>
              </div>
              <div><label style={lbl}>Bedrooms</label>
                <select value={form.bedrooms} onChange={e=>set('bedrooms',e.target.value)} style={{...inp,cursor:'pointer'}}>
                  <option value="">Any</option>
                  {['Studio','1 B/R','2 B/R','3 B/R','4 B/R','5+ B/R'].map(b=><option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div><label style={lbl}>Floor</label><input value={form.floor} onChange={e=>set('floor',e.target.value)} placeholder="e.g. 8" style={inp}/></div>
              <div><label style={lbl}>Size (sqft) *</label><input value={form.sizeSqft} onChange={e=>set('sizeSqft',e.target.value)} placeholder="e.g. 1,200" style={inp}/></div>
              <div><label style={lbl}>Asking Price (AED) *</label><input value={form.askingPrice} onChange={e=>set('askingPrice',e.target.value)} placeholder="e.g. 2,500,000" style={inp}/></div>
              <div><label style={lbl}>Condition</label>
                <select value={form.condition} onChange={e=>set('condition',e.target.value)} style={{...inp,cursor:'pointer'}}>
                  {['Excellent','Good','Average','Needs Renovation'].map(c=><option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <button onClick={()=>form.selectedArea&&setGenerated(true)} disabled={!form.selectedArea}
              style={{ marginTop:24, padding:'14px 40px', borderRadius:12, border:'none',
                cursor:form.selectedArea?'pointer':'default',
                background:form.selectedArea?'linear-gradient(135deg,#1D4ED8,#38BDF8)':'rgba(100,116,139,0.2)',
                color:form.selectedArea?'#fff':'var(--text-muted)', fontSize:15, fontWeight:600, fontFamily:'system-ui' }}>
              Generate Full Report
            </button>
          </div>
        )}

        {/* REPORT */}
        {generated && (
          <div id="rpt">

            {/* COVER */}
            <div style={{ background:'linear-gradient(135deg,#050E1A,#0A1E35)', borderRadius:20, overflow:'hidden', marginBottom:20, border:'1px solid rgba(56,189,248,0.15)' }}>
              <div style={{ background:'rgba(56,189,248,0.05)', borderBottom:'1px solid rgba(56,189,248,0.1)', padding:'20px 32px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div style={{ display:'flex', alignItems:'center', gap:16 }}>
                  {profile?.agency_logo_url
                    ? <img src={profile.agency_logo_url} alt="Logo" style={{ height:40, objectFit:'contain', borderRadius:6 }}/>
                    : <div style={{ fontSize:18, fontWeight:800, color:'#38BDF8' }}>Prop<span style={{ color:'#fff' }}>Sight</span></div>}
                  <div>
                    <div style={{ fontSize:11, color:'#38BDF8', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em' }}>{profile?.agency_name||'PropSight'} · Property Valuation Report</div>
                    <div style={{ fontSize:10, color:'rgba(255,255,255,0.3)' }}>Dubai Land Department Data · {new Date().toLocaleDateString('en-AE',{day:'numeric',month:'long',year:'numeric'})}</div>
                  </div>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  {profile?.broker_photo_url && <img src={profile.broker_photo_url} alt="Broker" style={{ width:44, height:44, borderRadius:'50%', objectFit:'cover', border:'2px solid rgba(56,189,248,0.4)' }}/>}
                  <div style={{ textAlign:'right' }}>
                    <div style={{ fontSize:13, fontWeight:700, color:'#fff' }}>{profile?.broker_name||profile?.full_name||'Broker'}</div>
                    <div style={{ fontSize:11, color:'rgba(255,255,255,0.5)' }}>{profile?.broker_title||'Real Estate Broker'}</div>
                    {profile?.rera_number && <div style={{ fontSize:10, color:'#38BDF8' }}>RERA: {profile.rera_number}</div>}
                  </div>
                </div>
              </div>
              <div style={{ padding:'32px', display:'grid', gridTemplateColumns:'1fr auto', gap:32, alignItems:'center' }}>
                <div>
                  <div style={{ fontSize:11, color:'rgba(255,255,255,0.4)', marginBottom:8, textTransform:'uppercase', letterSpacing:'0.1em' }}>Prepared for: {form.clientName||'Client'}</div>
                  <div style={{ fontSize:26, fontWeight:800, color:'#fff', marginBottom:8, lineHeight:1.2 }}>{form.propertyRef||`${form.propType} in ${na(form.selectedArea)}`}</div>
                  <div style={{ fontSize:14, color:'rgba(255,255,255,0.5)', marginBottom:16 }}>📍 {na(form.selectedArea)}, Dubai, UAE{form.bedrooms?` · ${form.bedrooms}`:''}{form.floor?` · Floor ${form.floor}`:''}{form.sizeSqft?` · ${form.sizeSqft} sqft`:''}</div>
                  <div style={{ display:'flex', gap:10 }}>
                    {[['Type',form.propType],['Condition',form.condition],['Parking',`${form.parkingSpaces} Space`]].map(([k,v])=>(
                      <div key={k} style={{ background:'rgba(56,189,248,0.1)', border:'1px solid rgba(56,189,248,0.2)', borderRadius:8, padding:'8px 14px' }}>
                        <div style={{ fontSize:9, color:'rgba(255,255,255,0.4)', textTransform:'uppercase', letterSpacing:'0.08em' }}>{k}</div>
                        <div style={{ fontSize:13, fontWeight:600, color:'#fff' }}>{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
                {score && <div style={{ textAlign:'center' }}>
                  <ScoreGauge score={score.total} color={score.color} size={130}/>
                  <div style={{ fontSize:18, fontWeight:800, color:score.color, marginTop:8 }}>{score.verdict}</div>
                  <div style={{ fontSize:11, color:'rgba(255,255,255,0.4)', marginTop:2 }}>PropSight Score</div>
                </div>}
              </div>
              <div style={{ background:'rgba(56,189,248,0.08)', borderTop:'1px solid rgba(56,189,248,0.15)', padding:'20px 32px', display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:20 }}>
                {[
                  ['Estimated Valuation', estimatedValue>0?fmtAED(estimatedValue):price>0?fmtAED(price):'N/A', '#38BDF8', valueRange[0]>0?`Range: ${fmtAED(valueRange[0])} – ${fmtAED(valueRange[1])}`:''],
                  ['Confidence Level', confidenceLevel, confidenceColor, `${comparables.length} comparables used`],
                  ['Price vs Market', priceVerdict, verdictColor, priceVsMarket?`${priceVsMarket>0?'+':''}${priceVsMarket.toFixed(1)}% vs area avg`:''],
                  ['YoY Growth', `${yoy>0?'+':''}${yoy}%`, yoy>=0?'#22C55E':'#F87171', `${na(form.selectedArea)} area trend`],
                ].map(([label,value,color,sub])=>(
                  <div key={label}>
                    <div style={{ fontSize:10, color:'rgba(255,255,255,0.4)', marginBottom:4, textTransform:'uppercase', letterSpacing:'0.08em' }}>{label}</div>
                    <div style={{ fontSize:22, fontWeight:800, color }}>{value}</div>
                    {sub && <div style={{ fontSize:10, color:'rgba(255,255,255,0.4)', marginTop:2 }}>{sub}</div>}
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 1: Subject Property */}
            <div style={{ background:'var(--surface)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:16, padding:'24px 28px', marginBottom:16 }}>
              <div style={{ borderLeft:'3px solid #38BDF8', paddingLeft:12, marginBottom:16 }}>
                <div style={{ fontSize:15, fontWeight:700, color:'var(--text-primary)' }}>1. Subject Property Analysis</div>
                <div style={{ fontSize:12, color:'var(--text-muted)', marginTop:2 }}>Price positioning and acquisition cost breakdown</div>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:16 }}>
                <KPI label="Asking Price" value={price?fmtAED(price):'N/A'} color="#38BDF8"/>
                <KPI label="Your Price/sqft" value={ppsqft?`AED ${fmtNum(ppsqft)}`:'N/A'}/>
                <KPI label="Market Avg/sqft" value={marketPpsqft?`AED ${fmtNum(marketPpsqft)}`:'N/A'} color="#A78BFA"/>
                <KPI label="Price Verdict" value={priceVerdict} color={verdictColor} bg={`${verdictColor}10`}/>
              </div>
              {price>0 && marketPpsqft>0 && (
                <div style={{ background:'var(--bg-alt)', borderRadius:12, padding:16, marginBottom:16 }}>
                  <div style={{ fontSize:12, fontWeight:600, color:'var(--text-primary)', marginBottom:10 }}>Price Positioning vs Market Average</div>
                  <div style={{ position:'relative', height:8, background:'rgba(255,255,255,0.06)', borderRadius:4, marginBottom:6 }}>
                    <div style={{ position:'absolute', left:'50%', top:-4, width:2, height:16, background:'rgba(255,255,255,0.2)' }}/>
                    <div style={{ position:'absolute', left:`${Math.min(95,Math.max(5,50+priceVsMarket*3))}%`, top:-4, width:16, height:16, borderRadius:'50%', background:verdictColor, transform:'translateX(-50%)', boxShadow:`0 0 8px ${verdictColor}` }}/>
                  </div>
                  <div style={{ display:'flex', justifyContent:'space-between', fontSize:10, color:'var(--text-muted)' }}>
                    <span>-20% Underpriced</span><span>Market Avg</span><span>+20% Overpriced</span>
                  </div>
                </div>
              )}
              {dldFees && (
                <>
                  <div style={{ fontSize:12, fontWeight:600, color:'var(--text-primary)', marginBottom:10 }}>Total Acquisition Cost</div>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10, marginBottom:10 }}>
                    <KPI label="DLD Fee (4%)" value={fmtAED(dldFees.dld)} color="#F87171"/>
                    <KPI label="Agent (2%)" value={fmtAED(dldFees.agent)} color="#F59E0B"/>
                    <KPI label="Trustee Fee" value={fmtAED(dldFees.trust)} color="var(--text-muted)"/>
                    <KPI label="Total Fees" value={fmtAED(dldFees.total)} color="#F59E0B" bg="rgba(245,158,11,0.08)"/>
                  </div>
                  <div style={{ background:'rgba(56,189,248,0.06)', border:'1px solid rgba(56,189,248,0.12)', borderRadius:10, padding:'12px 16px', display:'flex', justifyContent:'space-between' }}>
                    <span style={{ fontSize:13, fontWeight:600, color:'var(--text-primary)' }}>Total Cost of Acquisition</span>
                    <span style={{ fontSize:15, fontWeight:800, color:'#38BDF8' }}>{fmtAED(dldFees.totalCost)}</span>
                  </div>
                </>
              )}
            </div>

            {/* SECTION 2: Comparables */}
            <div style={{ background:'var(--surface)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:16, padding:'24px 28px', marginBottom:16 }}>
              <div style={{ borderLeft:'3px solid #22C55E', paddingLeft:12, marginBottom:16 }}>
                <div style={{ fontSize:15, fontWeight:700, color:'var(--text-primary)' }}>2. Comparable Sales Analysis</div>
                <div style={{ fontSize:12, color:'var(--text-muted)', marginTop:2 }}>{comparables.length} recent DLD transactions · {na(form.selectedArea)}</div>
              </div>
              {compStats && (
                <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:10, marginBottom:16 }}>
                  <KPI label="Found" value={fmtNum(compStats.count)}/>
                  <KPI label="Lowest" value={fmtAED(compStats.min,true)} color="#22C55E"/>
                  <KPI label="Highest" value={fmtAED(compStats.max,true)} color="#F87171"/>
                  <KPI label="Average" value={fmtAED(compStats.avg,true)} color="#38BDF8"/>
                  <KPI label="Avg/sqft" value={`AED ${fmtNum(compStats.avgPpsqft)}`} color="#A78BFA"/>
                </div>
              )}
              {comparables.length>0 ? (
                <div style={{ borderRadius:12, overflow:'hidden', border:'1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ display:'grid', gridTemplateColumns:'90px 1fr 60px 80px 100px 80px 80px', padding:'10px 16px', background:'rgba(59,130,246,0.04)', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
                    {['Date','Project','Beds','Size','Price','AED/sqft','Type'].map((h,i)=>(
                      <div key={i} style={{ fontSize:10, color:'var(--text-secondary)', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.04em' }}>{h}</div>
                    ))}
                  </div>
                  {comparables.map((c,i)=>(
                    <div key={i} style={{ display:'grid', gridTemplateColumns:'90px 1fr 60px 80px 100px 80px 80px', padding:'11px 16px', borderBottom:i<comparables.length-1?'1px solid rgba(255,255,255,0.03)':'none', background:i%2===0?'rgba(59,130,246,0.01)':'transparent' }}>
                      <div style={{ fontSize:11, color:'var(--text-muted)' }}>{c.date}</div>
                      <div style={{ fontSize:12, color:'var(--text-primary)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', paddingRight:8 }}>{c.project}</div>
                      <div style={{ fontSize:11, color:'var(--text-secondary)' }}>{c.beds}</div>
                      <div style={{ fontSize:11, color:'var(--text-secondary)' }}>{c.size?fmtNum(c.size):'—'}</div>
                      <div style={{ fontSize:12, fontWeight:600, color:'var(--text-primary)' }}>{fmtAED(c.price,true)}</div>
                      <div style={{ fontSize:11, color:'#38BDF8' }}>AED {fmtNum(c.ppsqft)}</div>
                      <div><span style={{ fontSize:10, fontWeight:600, padding:'2px 7px', borderRadius:20, background:c.reg==='Off-Plan'?'rgba(59,130,246,0.1)':'rgba(34,197,94,0.1)', color:c.reg==='Off-Plan'?'#38BDF8':'#22C55E' }}>{c.reg}</span></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign:'center', padding:32, color:'var(--text-muted)', fontSize:13 }}>No comparable sales found for selected filters.</div>
              )}
            </div>

            {/* SECTION 3: Market Activity */}
            <div style={{ background:'var(--surface)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:16, padding:'24px 28px', marginBottom:16 }}>
              <div style={{ borderLeft:'3px solid #A78BFA', paddingLeft:12, marginBottom:16 }}>
                <div style={{ fontSize:15, fontWeight:700, color:'var(--text-primary)' }}>3. Local Market Activity</div>
                <div style={{ fontSize:12, color:'var(--text-muted)', marginTop:2 }}>{na(form.selectedArea)} · Dubai Land Department data</div>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:16 }}>
                <KPI label="Total Transactions" value={fmtNum(areaInfo?.kpis?.count||0)}/>
                <KPI label="Avg Deal Value" value={fmtAED(areaInfo?.kpis?.avg||0,true)} color="#38BDF8"/>
                <KPI label="Total Market Value" value={fmtAED(areaInfo?.kpis?.total||0,true)} color="#A78BFA"/>
                <KPI label="Off-Plan Share" value={`${areaInfo?.kpis?.count?Math.round((areaInfo.kpis.offPlan||0)/areaInfo.kpis.count*100):0}%`} color="#F59E0B"/>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
                <div>
                  <div style={{ fontSize:12, fontWeight:600, color:'var(--text-primary)', marginBottom:10 }}>Monthly Transaction Volume (Dubai)</div>
                  <ResponsiveContainer width="100%" height={160}>
                    <BarChart data={monthlyData} margin={{ top:4, right:4, left:0, bottom:0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)"/>
                      <XAxis dataKey="month" tick={{ fontSize:9, fill:'#475569' }} axisLine={false} tickLine={false}/>
                      <YAxis hide/>
                      <Tooltip {...tt} formatter={v=>[fmtNum(v),'Transactions']}/>
                      <defs><linearGradient id="bg1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#38BDF8"/><stop offset="100%" stopColor="#1D4ED8"/></linearGradient></defs>
                      <Bar dataKey="count" radius={[3,3,0,0]} fill="url(#bg1)"/>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <div style={{ fontSize:12, fontWeight:600, color:'var(--text-primary)', marginBottom:10 }}>Bedroom Mix — {na(form.selectedArea)}</div>
                  {bedroomMix.map((b,i)=>{
                    const pct=Math.round(b.count/(bedroomMix[0]?.count||1)*100);
                    return (
                      <div key={i} style={{ marginBottom:8 }}>
                        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:3, fontSize:11 }}>
                          <span style={{ color:'var(--text-secondary)' }}>{b.beds}</span>
                          <span style={{ color:'var(--text-muted)' }}>{fmtAED(b.avg,true)} avg · {fmtNum(b.count)}</span>
                        </div>
                        <div style={{ height:4, background:'rgba(255,255,255,0.04)', borderRadius:2 }}>
                          <div style={{ height:'100%', width:`${pct}%`, background:'linear-gradient(90deg,#A78BFA,#7C3AED)', borderRadius:2 }}/>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* SECTION 4: Price Trends */}
            <div style={{ background:'var(--surface)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:16, padding:'24px 28px', marginBottom:16 }}>
              <div style={{ borderLeft:'3px solid #38BDF8', paddingLeft:12, marginBottom:16 }}>
                <div style={{ fontSize:15, fontWeight:700, color:'var(--text-primary)' }}>4. Price Trend Analysis</div>
                <div style={{ fontSize:12, color:'var(--text-muted)', marginTop:2 }}>{na(form.selectedArea)} vs Dubai average · AED/sqft</div>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, marginBottom:16 }}>
                <KPI label="Current Price/sqft" value={`AED ${fmtNum(marketPpsqft)}`} color="#38BDF8"/>
                <KPI label="YoY Growth" value={`${yoy>0?'+':''}${yoy}%`} color={yoy>=0?'#22C55E':'#F87171'}/>
                <KPI label="vs Dubai Avg" value={marketPpsqft&&dubaiAvg?`${Math.round((marketPpsqft-dubaiAvg/10.764)/(dubaiAvg/10.764)*100)>0?'+':''}${Math.round((marketPpsqft-dubaiAvg/10.764)/(dubaiAvg/10.764)*100)}%`:'N/A'} color="#A78BFA"/>
              </div>
              {priceTrendData.length>0 && (
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={priceTrendData} margin={{ top:8, right:16, left:0, bottom:0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)"/>
                    <XAxis dataKey="year" tick={{ fontSize:10, fill:'#475569' }} axisLine={false} tickLine={false}/>
                    <YAxis tick={{ fontSize:10, fill:'#475569' }} tickFormatter={v=>fmtNum(v)}/>
                    <Tooltip {...tt} formatter={(v,n)=>[`AED ${fmtNum(v)}/sqft`,n==='area'?na(form.selectedArea):'Dubai Avg']}/>
                    <Line type="monotone" dataKey="area" stroke="#38BDF8" strokeWidth={2.5} dot={{ r:4, fill:'#38BDF8' }} name="area"/>
                    <Line type="monotone" dataKey="dubai" stroke="rgba(255,255,255,0.2)" strokeWidth={1.5} strokeDasharray="4 4" dot={false} name="dubai"/>
                  </LineChart>
                </ResponsiveContainer>
              )}
              <div style={{ display:'flex', gap:16, justifyContent:'center', marginTop:8 }}>
                <div style={{ display:'flex', alignItems:'center', gap:6 }}><div style={{ width:16, height:2, background:'#38BDF8' }}/><span style={{ fontSize:11, color:'var(--text-muted)' }}>{na(form.selectedArea)}</span></div>
                <div style={{ display:'flex', alignItems:'center', gap:6 }}><div style={{ width:16, height:2, background:'rgba(255,255,255,0.2)', borderStyle:'dashed' }}/><span style={{ fontSize:11, color:'var(--text-muted)' }}>Dubai Average</span></div>
              </div>
            </div>

            {/* SECTION 5: Area Profile */}
            <div style={{ background:'var(--surface)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:16, padding:'24px 28px', marginBottom:16 }}>
              <div style={{ borderLeft:'3px solid #F59E0B', paddingLeft:12, marginBottom:16 }}>
                <div style={{ fontSize:15, fontWeight:700, color:'var(--text-primary)' }}>5. Area Profile</div>
                <div style={{ fontSize:12, color:'var(--text-muted)', marginTop:2 }}>Top projects and market statistics · {na(form.selectedArea)}</div>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
                <div>
                  <div style={{ fontSize:12, fontWeight:600, color:'var(--text-primary)', marginBottom:10 }}>Top Projects by Volume</div>
                  {topProjects.map((d,i)=>{
                    const pct=Math.round(d.count/(topProjects[0]?.count||1)*100);
                    return (
                      <div key={i} style={{ marginBottom:10 }}>
                        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:3, fontSize:11 }}>
                          <span style={{ color:'var(--text-secondary)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', maxWidth:'70%' }}>{d.name}</span>
                          <span style={{ color:'var(--text-muted)', flexShrink:0 }}>{fmtNum(d.count)} txns</span>
                        </div>
                        <div style={{ height:5, background:'rgba(255,255,255,0.04)', borderRadius:3 }}>
                          <div style={{ height:'100%', width:`${pct}%`, background:'linear-gradient(90deg,#F59E0B,#B45309)', borderRadius:3 }}/>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div>
                  <div style={{ fontSize:12, fontWeight:600, color:'var(--text-primary)', marginBottom:10 }}>Market Statistics</div>
                  {[
                    ['Total Value Transacted', fmtAED(areaInfo?.kpis?.total||0,true)],
                    ['Average Deal Size', fmtAED(areaInfo?.kpis?.avg||0,true)],
                    ['Off-Plan Transactions', fmtNum(areaInfo?.kpis?.offPlan||0)],
                    ['Ready Transactions', fmtNum((areaInfo?.kpis?.count||0)-(areaInfo?.kpis?.offPlan||0))],
                    ['Price/sqft vs Dubai', `${Math.round((marketPpsqft-(dubaiAvg/10.764))/(dubaiAvg/10.764)*100)>0?'+':''}${Math.round((marketPpsqft-(dubaiAvg/10.764))/(dubaiAvg/10.764)*100)}%`],
                  ].map(([k,v])=>(
                    <div key={k} style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
                      <span style={{ fontSize:12, color:'var(--text-secondary)' }}>{k}</span>
                      <span style={{ fontSize:12, fontWeight:600, color:'var(--text-primary)' }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SECTION 6: Investment Analysis */}
            {roiData && (
              <div style={{ background:'var(--surface)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:16, padding:'24px 28px', marginBottom:16 }}>
                <div style={{ borderLeft:'3px solid #22C55E', paddingLeft:12, marginBottom:16 }}>
                  <div style={{ fontSize:15, fontWeight:700, color:'var(--text-primary)' }}>6. Investment Analysis</div>
                  <div style={{ fontSize:12, color:'var(--text-muted)', marginTop:2 }}>Rental yield, mortgage scenarios and 5-year projections</div>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:16 }}>
                  <KPI label="Est. Rental Yield" value={`${roiData.yieldPct}%`} color="#22C55E" bg="rgba(34,197,94,0.06)"/>
                  <KPI label="Annual Rental Income" value={fmtAED(roiData.annualRent,true)} color="#22C55E"/>
                  <KPI label="5yr Future Value" value={fmtAED(roiData.futureValue5,true)} color="#38BDF8"/>
                  <KPI label="5yr Capital Gain" value={fmtAED(roiData.capitalGain5,true)} color="#A78BFA"/>
                </div>
                <div style={{ fontSize:12, fontWeight:600, color:'var(--text-primary)', marginBottom:10 }}>Mortgage Scenarios (4.5% rate · 25yr term)</div>
                <div style={{ borderRadius:12, overflow:'hidden', border:'1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr 1fr', padding:'10px 16px', background:'rgba(59,130,246,0.04)', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
                    {['Down Payment','Down Amount','Monthly Payment','Annual Cashflow','Net Yield'].map((h,i)=>(
                      <div key={i} style={{ fontSize:10, color:'var(--text-secondary)', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.04em' }}>{h}</div>
                    ))}
                  </div>
                  {roiData.scenarios.map((s,i)=>(
                    <div key={i} style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr 1fr', padding:'12px 16px', borderBottom:i<2?'1px solid rgba(255,255,255,0.03)':'none' }}>
                      <div style={{ fontSize:13, fontWeight:600, color:'var(--text-primary)' }}>{s.downPct}%</div>
                      <div style={{ fontSize:12, color:'var(--text-secondary)' }}>{fmtAED(s.downAmt,true)}</div>
                      <div style={{ fontSize:12, color:'#F59E0B' }}>{fmtAED(s.monthly)}/mo</div>
                      <div style={{ fontSize:12, fontWeight:600, color:s.cashflow>=0?'#22C55E':'#F87171' }}>{s.cashflow>=0?'+':''}{fmtAED(s.cashflow)}</div>
                      <div style={{ fontSize:12, color:s.netYield>=0?'#22C55E':'#F87171' }}>{s.netYield}%</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION 7: PropSight Score */}
            {score && (
              <div style={{ background:'var(--surface)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:16, padding:'24px 28px', marginBottom:16 }}>
                <div style={{ borderLeft:`3px solid ${score.color}`, paddingLeft:12, marginBottom:16 }}>
                  <div style={{ fontSize:15, fontWeight:700, color:'var(--text-primary)' }}>7. PropSight Investment Score</div>
                  <div style={{ fontSize:12, color:'var(--text-muted)', marginTop:2 }}>AI-powered investment rating across 6 weighted factors</div>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'auto 1fr', gap:24, alignItems:'center', marginBottom:16 }}>
                  <div style={{ textAlign:'center' }}>
                    <ScoreGauge score={score.total} color={score.color} size={110}/>
                    <div style={{ fontSize:16, fontWeight:700, color:score.color, marginTop:6 }}>{score.verdict}</div>
                  </div>
                  <div>
                    {Object.entries(score.breakdown).map(([key,b])=>(
                      <div key={key} style={{ marginBottom:12 }}>
                        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4, fontSize:12 }}>
                          <span style={{ color:'var(--text-secondary)' }}>{b.label}</span>
                          <span style={{ color:score.color, fontWeight:600 }}>{b.score}/100 <span style={{ color:'var(--text-muted)', fontWeight:400 }}>× {b.weight}%</span></span>
                        </div>
                        <div style={{ height:6, background:'rgba(255,255,255,0.06)', borderRadius:3 }}>
                          <div style={{ height:'100%', width:`${b.score}%`, background:score.color, borderRadius:3, opacity:0.85 }}/>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ background:`${score.color}08`, border:`1px solid ${score.color}20`, borderRadius:10, padding:'12px 16px', fontSize:12, color:'var(--text-secondary)', lineHeight:1.6 }}>
                  <strong style={{ color:score.color }}>Investment Verdict: </strong>
                  {score.total>=80?'Strong Buy — excellent fundamentals, high liquidity and strong yield potential.':score.total>=65?'Buy — solid investment with positive momentum and reasonable yield.':score.total>=50?'Hold — consider negotiating price or waiting for market improvement.':'Avoid — weak fundamentals or overpriced relative to market conditions.'}
                </div>
              </div>
            )}

            {/* SECTION 8: Broker Footer */}
            <div style={{ background:'var(--surface)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:16, overflow:'hidden' }}>
              <div style={{ padding:'24px 28px', borderBottom:'1px solid rgba(255,255,255,0.06)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <div style={{ display:'flex', alignItems:'center', gap:16 }}>
                  {profile?.broker_photo_url && <img src={profile.broker_photo_url} alt="Broker" style={{ width:64, height:64, borderRadius:'50%', objectFit:'cover', border:'2px solid rgba(56,189,248,0.3)' }}/>}
                  <div>
                    <div style={{ fontSize:17, fontWeight:700, color:'var(--text-primary)' }}>{profile?.broker_name||profile?.full_name||'Your Name'}</div>
                    <div style={{ fontSize:13, color:'#38BDF8' }}>{profile?.broker_title||'Real Estate Broker'}</div>
                    <div style={{ fontSize:12, color:'var(--text-secondary)' }}>{profile?.agency_name}</div>
                    {profile?.rera_number && <div style={{ fontSize:11, color:'var(--text-muted)', marginTop:2 }}>RERA: {profile.rera_number}</div>}
                  </div>
                </div>
                <div style={{ textAlign:'right' }}>
                  {profile?.agency_logo_url && <img src={profile.agency_logo_url} alt="Agency" style={{ height:48, objectFit:'contain', marginBottom:8, display:'block', marginLeft:'auto' }}/>}
                  {profile?.phone && <div style={{ fontSize:12, color:'var(--text-secondary)' }}>📞 {profile.phone}</div>}
                  {profile?.website && <div style={{ fontSize:12, color:'#38BDF8' }}>🌐 {profile.website}</div>}
                  {profile?.office_address && <div style={{ fontSize:11, color:'var(--text-muted)', marginTop:4 }}>📍 {profile.office_address}</div>}
                </div>
              </div>
              {(profile?.specializations?.length||profile?.languages?.length) && (
                <div style={{ padding:'14px 28px', borderBottom:'1px solid rgba(255,255,255,0.06)', display:'flex', gap:24 }}>
                  {profile?.specializations?.length>0 && (
                    <div>
                      <div style={{ fontSize:10, color:'var(--text-muted)', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:6 }}>Specializations</div>
                      <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                        {profile.specializations.map(s=><span key={s} style={{ fontSize:10, fontWeight:600, padding:'2px 8px', borderRadius:20, background:'rgba(59,130,246,0.08)', color:'#38BDF8', border:'1px solid rgba(59,130,246,0.15)' }}>{s}</span>)}
                      </div>
                    </div>
                  )}
                  {profile?.languages?.length>0 && (
                    <div>
                      <div style={{ fontSize:10, color:'var(--text-muted)', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:6 }}>Languages</div>
                      <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                        {profile.languages.map(l=><span key={l} style={{ fontSize:10, fontWeight:600, padding:'2px 8px', borderRadius:20, background:'rgba(139,92,246,0.08)', color:'#A78BFA', border:'1px solid rgba(139,92,246,0.15)' }}>{l}</span>)}
                      </div>
                    </div>
                  )}
                </div>
              )}
              <div style={{ padding:'16px 28px', background:'rgba(59,130,246,0.02)' }}>
                <div style={{ fontSize:10, color:'var(--text-muted)', lineHeight:1.7 }}>
                  <strong style={{ color:'var(--text-secondary)' }}>Disclaimer: </strong>
                  This report was prepared by {profile?.broker_name||'a PropSight registered broker'} using PropSight's automated valuation model based on Dubai Land Department data. Valuations are indicative only and do not constitute a formal RICS or RERA-compliant appraisal. Always seek independent professional advice before making financial decisions. Report generated: {new Date().toLocaleString('en-AE')}.
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
