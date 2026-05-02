import { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { calcPropSightScore } from '../utils/propSightScore';
import { fmtAED, fmtNum } from '../utils/format';
import html2pdf from 'html2pdf.js';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis,
  Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';

const AREA_NICE = {
  'Al Barsha South Fourth':'JVC','Burj Khalifa':'Downtown Dubai','Marsa Dubai':'Dubai Marina',
  'Hadaeq Sheikh Mohammed Bin Rashid':'Dubai Hills','Al Thanyah Fifth':'JLT',
  'Business Bay':'Business Bay','Palm Jumeirah':'Palm Jumeirah','Al Merkadh':'MBR City',
  'Al Khairan First':'Creek Harbour','Al Hebiah Fourth':'Damac Hills',
};
const na = a => AREA_NICE[a] || a;

// ── White theme tokens ────────────────────────────────────────────────────
const W = {
  bg:       '#FFFFFF',
  bgAlt:    '#F8FAFC',
  bgAccent: '#EFF6FF',
  border:   '#E2E8F0',
  borderAccent: '#BFDBFE',
  text:     '#0F172A',
  textSec:  '#475569',
  textMut:  '#94A3B8',
  blue: '#3B82F6',
  blueLt:   '#3B82F6',
  green:    '#16A34A',
  red:      '#DC2626',
  amber:    '#D97706',
  purple:   '#7C3AED',
};

const tt = {
  contentStyle:{ background:'#fff', border:`1px solid ${W.border}`, borderRadius:8, color:W.text, fontSize:11, boxShadow:'0 4px 12px rgba(0,0,0,0.1)' },
  labelStyle:{ color:W.textSec },
};

// ── Sub-components ────────────────────────────────────────────────────────
function Divider() {
  return <div style={{ height:1, background:W.border, margin:'0 0 20px' }}/>;
}

function SectionTitle({ num, title, subtitle, color=W.blue }) {
  return (
    <div style={{ borderLeft:`4px solid ${color}`, paddingLeft:14, marginBottom:20 }}>
      <div style={{ fontSize:16, fontWeight:700, color:W.text }}>{num}. {title}</div>
      {subtitle && <div style={{ fontSize:12, color:W.textMut, marginTop:2 }}>{subtitle}</div>}
    </div>
  );
}

function KPI({ label, value, sub, color=W.text, bg=W.bgAlt, border=W.border }) {
  return (
    <div style={{ background:bg, border:`1px solid ${border}`, borderRadius:10, padding:'14px 16px' }}>
      <div style={{ fontSize:10, color:W.textMut, marginBottom:5, textTransform:'uppercase', letterSpacing:'0.07em', fontWeight:600 }}>{label}</div>
      <div style={{ fontSize:18, fontWeight:800, color, lineHeight:1.2 }}>{value}</div>
      {sub && <div style={{ fontSize:11, color:W.textMut, marginTop:4 }}>{sub}</div>}
    </div>
  );
}

function ScoreGauge({ score, color, size=110 }) {
  const r = (size-14)/2;
  const circ = 2*Math.PI*r;
  const filled = (score/100)*circ;
  return (
    <div style={{ position:'relative', width:size, height:size }}>
      <svg width={size} height={size} style={{ transform:'rotate(-90deg)', position:'absolute', top:0, left:0 }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#E2E8F0" strokeWidth={8}/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={8}
          strokeDasharray={`${filled} ${circ}`} strokeLinecap="round"/>
      </svg>
      <div style={{ position:'absolute', top:0, left:0, width:size, height:size,
        display:'flex', alignItems:'center', justifyContent:'center',
        fontSize:size*0.21, fontWeight:800, color, fontFamily:'system-ui' }}>
        {score}
      </div>
    </div>
  );
}

function Card({ children, style={} }) {
  return (
    <div style={{ background:W.bg, border:`1px solid ${W.border}`, borderRadius:14,
      padding:'22px 24px', marginBottom:16, ...style }}>
      {children}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────
export default function BrokerReport({ areaData, core, recentRaw }) {
  const { profile } = useAuth();
  const [form, setForm] = useState({
    selectedArea:'', bedrooms:'', propType:'Apartment',
    askingPrice:'', sizeSqft:'', clientName:'',
    propertyRef:'', floor:'', parkingSpaces:'1', condition:'Good',
  });
  const [generated, setGenerated] = useState(false);
  const [exporting, setExporting] = useState(false);
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
  const verdictColor = priceVsMarket < -5 ? W.green : priceVsMarket > 8 ? W.red : W.amber;

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
  const confidenceColor = confidenceLevel==='High'?W.green:confidenceLevel==='Medium'?W.amber:W.red;

  const exportPDF = async () => {
    setExporting(true);
    const el = document.getElementById('rpt');
    const opt = {
      margin:[10,10,10,10],
      filename:`PropSight-Report-${form.clientName||'Client'}-${na(form.selectedArea)}-${new Date().toISOString().slice(0,10)}.pdf`,
      image:{ type:'jpeg', quality:0.98 },
      html2canvas:{ scale:2, useCORS:true, backgroundColor:'#FFFFFF', logging:false },
      jsPDF:{ unit:'mm', format:'a4', orientation:'portrait' },
      pagebreak:{ mode:['avoid-all','css','legacy'] },
    };
    try { await html2pdf().set(opt).from(el).save(); }
    catch(e) { console.error(e); }
    setExporting(false);
  };

  const inp = { width:'100%', padding:'10px 12px', borderRadius:8, background:'var(--bg-alt)',
    border:'1px solid rgba(59,130,246,0.15)', color:'var(--text-primary)',
    fontSize:13, outline:'none', fontFamily:'system-ui', boxSizing:'border-box' };
  const lbl = { fontSize:11, color:'var(--text-muted)', marginBottom:6, fontWeight:600,
    textTransform:'uppercase', letterSpacing:'0.05em', display:'block' };

  return (
    <div style={{ flex:1, overflowY:'auto', background:'var(--bg)', fontFamily:'system-ui', padding:'24px 28px' }}>
      <div style={{ maxWidth:1000, margin:'0 auto' }}>

        {/* Page header */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24 }}>
          <div>
            <h1 style={{ margin:0, fontSize:22, fontWeight:700, color:'var(--text-primary)', marginBottom:4 }}>Broker Valuation Report</h1>
            <div style={{ fontSize:13, color:'var(--text-secondary)' }}>Professional property analysis powered by live DLD data</div>
          </div>
          {generated && (
            <div className="no-print" style={{ display:'flex', gap:10 }}>
              <button onClick={()=>setGenerated(false)} style={{ padding:'10px 18px', borderRadius:10, border:'1px solid rgba(255,255,255,0.1)', background:'var(--surface)', color:'var(--text-secondary)', cursor:'pointer', fontSize:13, fontFamily:'system-ui' }}>← Edit</button>
              <button onClick={exportPDF} disabled={exporting} style={{ padding:'10px 24px', borderRadius:10, border:'none', background:'linear-gradient(135deg,#1D4ED8,#38BDF8)', color:'#fff', cursor:exporting?'default':'pointer', fontSize:13, fontWeight:600, fontFamily:'system-ui', opacity:exporting?0.7:1 }}>
                {exporting?'⏳ Generating...':'📄 Download PDF'}
              </button>
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
              Generate Report
            </button>
          </div>
        )}

        {/* ══ WHITE REPORT ═══════════════════════════════════════════════════ */}
        {generated && (
          <div id="rpt" style={{ background:W.bg, color:W.text, fontFamily:"system-ui,sans-serif", fontSize:13, lineHeight:1.5 }}>

            {/* ── COVER ─────────────────────────────────────────────────── */}
            <div style={{ background:'#F0F7FF', border:'1px solid #BFDBFE', borderRadius:14, overflow:'hidden', marginBottom:16 }}>
              {/* Agency bar */}
              <div style={{ background:'#EFF6FF', borderBottom:'1px solid #BFDBFE', padding:'16px 28px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div style={{ display:'flex', alignItems:'center', gap:16 }}>
                  {profile?.agency_logo_url
                    ? <img src={profile.agency_logo_url} alt="Logo" style={{ height:36, objectFit:'contain', borderRadius:6, background:'#fff', padding:4 }}/>
                    : <div style={{ fontSize:16, fontWeight:800, color:'#fff', letterSpacing:'-0.5px' }}>Prop<span style={{ color:'#93C5FD' }}>Sight</span></div>
                  }
                  <div>
                    <div style={{ fontSize:11, color:'#1E3A8A', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em' }}>{profile?.agency_name||'PropSight'} · Property Valuation Report</div>
                    <div style={{ fontSize:10, color:'#64748B' }}>Dubai Land Department Data · {new Date().toLocaleDateString('en-AE',{day:'numeric',month:'long',year:'numeric'})}</div>
                  </div>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  {profile?.broker_photo_url && <img src={profile.broker_photo_url} alt="Broker" style={{ width:42, height:42, borderRadius:'50%', objectFit:'cover', border:'2px solid rgba(255,255,255,0.4)' }}/>}
                  <div style={{ textAlign:'right' }}>
                    <div style={{ fontSize:13, fontWeight:700, color:'#0F172A' }}>{profile?.broker_name||profile?.full_name||'Broker'}</div>
                    <div style={{ fontSize:11, color:'#475569' }}>{profile?.broker_title||'Real Estate Broker'}</div>
                    {profile?.rera_number && <div style={{ fontSize:10, color:'#2563EB' }}>RERA: {profile.rera_number}</div>}
                  </div>
                </div>
              </div>

              {/* Property info */}
              <div style={{ padding:'28px', display:'grid', gridTemplateColumns:'1fr auto', gap:24, alignItems:'center' }}>
                <div>
                  <div style={{ fontSize:11, color:'rgba(255,255,255,0.5)', marginBottom:6, textTransform:'uppercase', letterSpacing:'0.1em' }}>Prepared for: {form.clientName||'Client'}</div>
                  <div style={{ fontSize:26, fontWeight:800, color:'#0F172A', lineHeight:1.2, marginBottom:8 }}>{form.propertyRef||`${form.propType} in ${na(form.selectedArea)}`}</div>
                  <div style={{ fontSize:13, color:'#64748B', marginBottom:16 }}>
                    📍 {na(form.selectedArea)}, Dubai, UAE{form.bedrooms?` · ${form.bedrooms}`:''}{form.floor?` · Floor ${form.floor}`:''}{form.sizeSqft?` · ${form.sizeSqft} sqft`:''}
                  </div>
                  <div style={{ display:'flex', gap:10 }}>
                    {[['Type',form.propType],['Condition',form.condition],['Parking',`${form.parkingSpaces} Space`]].map(([k,v])=>(
                      <div key={k} style={{ background:'#DBEAFE', borderRadius:8, padding:'7px 14px', border:'1px solid #BFDBFE' }}>
                        <div style={{ fontSize:9, color:'#3B82F6', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:2 }}>{k}</div>
                        <div style={{ fontSize:12, fontWeight:600, color:'#1E3A8A' }}>{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
                {score && (
                  <div style={{ textAlign:'center', background:'#DBEAFE', borderRadius:12, padding:'16px 20px', border:'1px solid #BFDBFE' }}>
                    <ScoreGauge score={score.total} color={score.total>=80?'#4ADE80':score.total>=65?'#60A5FA':score.total>=50?'#FBBF24':'#F87171'} size={110}/>
                    <div style={{ fontSize:16, fontWeight:800, color:'#0F172A', marginTop:6 }}>{score.verdict}</div>
                    <div style={{ fontSize:10, color:'#64748B', marginTop:2 }}>PropSight Score</div>
                  </div>
                )}
              </div>

              {/* Summary bar */}
              <div style={{ background:'#EFF6FF', borderTop:'1px solid #BFDBFE', padding:'18px 28px', display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:20 }}>
                {[
                  ['Estimated Valuation', estimatedValue>0?fmtAED(estimatedValue):price>0?fmtAED(price):'N/A', '#93C5FD', valueRange[0]>0?`Range: ${fmtAED(valueRange[0])} – ${fmtAED(valueRange[1])}`:''],
                  ['Confidence Level', confidenceLevel, confidenceLevel==='High'?'#4ADE80':confidenceLevel==='Medium'?'#FBBF24':'#F87171', `${comparables.length} comparables`],
                  ['Price vs Market', priceVerdict, priceVerdict==='Underpriced'?'#4ADE80':priceVerdict==='Overpriced'?'#F87171':'#FBBF24', priceVsMarket?`${priceVsMarket>0?'+':''}${priceVsMarket.toFixed(1)}% vs avg`:''],
                  ['YoY Growth', `${yoy>0?'+':''}${yoy}%`, yoy>=0?'#4ADE80':'#F87171', `${na(form.selectedArea)}`],
                ].map(([label,value,color,sub])=>(
                  <div key={label}>
                    <div style={{ fontSize:9, color:'#64748B', marginBottom:3, textTransform:'uppercase', letterSpacing:'0.08em' }}>{label}</div>
                    <div style={{ fontSize:20, fontWeight:800, color }}>{value}</div>
                    {sub && <div style={{ fontSize:10, color:'#64748B', marginTop:2 }}>{sub}</div>}
                  </div>
                ))}
              </div>
            </div>

            {/* ── SECTION 1 ─────────────────────────────────────────────── */}
            <Card>
              <SectionTitle num="1" title="Subject Property Analysis" subtitle="Price positioning and total acquisition cost"/>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:16 }}>
                <KPI label="Asking Price" value={price?fmtAED(price):'N/A'} color={W.blue}/>
                <KPI label="Your Price/sqft" value={ppsqft?`AED ${fmtNum(ppsqft)}`:'N/A'} color={W.text}/>
                <KPI label="Market Avg/sqft" value={marketPpsqft?`AED ${fmtNum(marketPpsqft)}`:'N/A'} color={W.purple}/>
                <KPI label="Price Verdict" value={priceVerdict} color={verdictColor} bg={`${verdictColor}12`} border={`${verdictColor}30`}/>
              </div>

              {/* Price bar */}
              {price>0 && marketPpsqft>0 && (
                <div style={{ background:W.bgAlt, border:`1px solid ${W.border}`, borderRadius:10, padding:14, marginBottom:16 }}>
                  <div style={{ fontSize:12, fontWeight:600, color:W.text, marginBottom:10 }}>Price Positioning vs Market Average</div>
                  <div style={{ position:'relative', height:8, background:'#E2E8F0', borderRadius:4, marginBottom:6 }}>
                    <div style={{ position:'absolute', left:'50%', top:-4, width:2, height:16, background:'#94A3B8' }}/>
                    <div style={{ position:'absolute', left:`${Math.min(95,Math.max(5,50+priceVsMarket*2.5))}%`, top:-4, width:16, height:16, borderRadius:'50%', background:verdictColor, transform:'translateX(-50%)', boxShadow:`0 2px 6px ${verdictColor}60` }}/>
                  </div>
                  <div style={{ display:'flex', justifyContent:'space-between', fontSize:10, color:W.textMut }}>
                    <span>−20% Below Market</span><span style={{ fontWeight:600, color:W.textSec }}>Market Average</span><span>+20% Above Market</span>
                  </div>
                </div>
              )}

              {dldFees && (
                <>
                  <div style={{ fontSize:12, fontWeight:600, color:W.text, marginBottom:10 }}>Total Acquisition Cost (DLD Transfer)</div>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10, marginBottom:10 }}>
                    <KPI label="DLD Fee (4%)" value={fmtAED(dldFees.dld)} color={W.red}/>
                    <KPI label="Agent Commission (2%)" value={fmtAED(dldFees.agent)} color={W.amber}/>
                    <KPI label="Trustee Fee" value={fmtAED(dldFees.trust)} color={W.textSec}/>
                    <KPI label="Total Fees" value={fmtAED(dldFees.total)} color={W.amber} bg="#FFFBEB" border="#FDE68A"/>
                  </div>
                  <div style={{ background:W.bgAccent, border:`1px solid ${W.borderAccent}`, borderRadius:10, padding:'12px 16px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <span style={{ fontSize:13, fontWeight:600, color:W.text }}>Total Cost of Acquisition (inc. all fees)</span>
                    <span style={{ fontSize:16, fontWeight:800, color:W.blue }}>{fmtAED(dldFees.totalCost)}</span>
                  </div>
                </>
              )}
            </Card>

            {/* ── SECTION 2 ─────────────────────────────────────────────── */}
            <Card>
              <SectionTitle num="2" title="Comparable Sales Analysis" subtitle={`${comparables.length} recent DLD transactions · ${na(form.selectedArea)}`} color={W.green}/>
              {compStats && (
                <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:10, marginBottom:16 }}>
                  <KPI label="Transactions" value={fmtNum(compStats.count)}/>
                  <KPI label="Lowest Sale" value={fmtAED(compStats.min,true)} color={W.green}/>
                  <KPI label="Highest Sale" value={fmtAED(compStats.max,true)} color={W.red}/>
                  <KPI label="Average Sale" value={fmtAED(compStats.avg,true)} color={W.blue}/>
                  <KPI label="Avg Price/sqft" value={`AED ${fmtNum(compStats.avgPpsqft)}`} color={W.purple}/>
                </div>
              )}
              {comparables.length>0 ? (
                <div style={{ borderRadius:10, overflow:'hidden', border:`1px solid ${W.border}` }}>
                  <div style={{ display:'grid', gridTemplateColumns:'90px 1fr 60px 80px 110px 80px 80px', padding:'10px 16px', background:W.bgAlt, borderBottom:`1px solid ${W.border}` }}>
                    {['Date','Project','Beds','Size (sqft)','Price','AED/sqft','Type'].map((h,i)=>(
                      <div key={i} style={{ fontSize:10, color:W.textMut, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.05em' }}>{h}</div>
                    ))}
                  </div>
                  {comparables.map((c,i)=>(
                    <div key={i} style={{ display:'grid', gridTemplateColumns:'90px 1fr 60px 80px 110px 80px 80px', padding:'11px 16px', borderBottom:i<comparables.length-1?`1px solid ${W.border}`:'none', background:i%2===0?W.bg:W.bgAlt }}>
                      <div style={{ fontSize:11, color:W.textMut }}>{c.date}</div>
                      <div style={{ fontSize:12, color:W.text, fontWeight:500, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', paddingRight:8 }}>{c.project}</div>
                      <div style={{ fontSize:11, color:W.textSec }}>{c.beds}</div>
                      <div style={{ fontSize:11, color:W.textSec }}>{c.size?fmtNum(c.size):'—'}</div>
                      <div style={{ fontSize:12, fontWeight:700, color:W.text }}>{fmtAED(c.price,true)}</div>
                      <div style={{ fontSize:11, color:W.blue, fontWeight:600 }}>AED {fmtNum(c.ppsqft)}</div>
                      <div><span style={{ fontSize:10, fontWeight:600, padding:'2px 8px', borderRadius:20, background:c.reg==='Off-Plan'?'#EFF6FF':'#F0FDF4', color:c.reg==='Off-Plan'?W.blue:W.green, border:`1px solid ${c.reg==='Off-Plan'?W.borderAccent:'#BBF7D0'}` }}>{c.reg}</span></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign:'center', padding:32, color:W.textMut, fontSize:13, background:W.bgAlt, borderRadius:10 }}>No comparable sales found for selected filters.</div>
              )}
            </Card>

            {/* ── SECTION 3 ─────────────────────────────────────────────── */}
            <Card>
              <SectionTitle num="3" title="Local Market Activity" subtitle={`${na(form.selectedArea)} · Dubai Land Department`} color={W.purple}/>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:20 }}>
                <KPI label="Total Transactions" value={fmtNum(areaInfo?.kpis?.count||0)}/>
                <KPI label="Avg Deal Value" value={fmtAED(areaInfo?.kpis?.avg||0,true)} color={W.blue}/>
                <KPI label="Total Market Value" value={fmtAED(areaInfo?.kpis?.total||0,true)} color={W.purple}/>
                <KPI label="Off-Plan Share" value={`${areaInfo?.kpis?.count?Math.round((areaInfo.kpis.offPlan||0)/areaInfo.kpis.count*100):0}%`} color={W.amber}/>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
                <div>
                  <div style={{ fontSize:12, fontWeight:600, color:W.text, marginBottom:10 }}>Monthly Transaction Volume</div>
                  <ResponsiveContainer width="100%" height={160}>
                    <BarChart data={monthlyData} margin={{ top:4, right:4, left:0, bottom:0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke={W.border}/>
                      <XAxis dataKey="month" tick={{ fontSize:9, fill:W.textMut }} axisLine={false} tickLine={false}/>
                      <YAxis hide/>
                      <Tooltip {...tt} formatter={v=>[fmtNum(v),'Transactions']}/>
                      <defs><linearGradient id="bg1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={W.blue}/><stop offset="100%" stopColor="#93C5FD"/></linearGradient></defs>
                      <Bar dataKey="count" radius={[3,3,0,0]} fill="url(#bg1)"/>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <div style={{ fontSize:12, fontWeight:600, color:W.text, marginBottom:10 }}>Bedroom Mix — {na(form.selectedArea)}</div>
                  {bedroomMix.map((b,i)=>{
                    const pct=Math.round(b.count/(bedroomMix[0]?.count||1)*100);
                    return (
                      <div key={i} style={{ marginBottom:9 }}>
                        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:3, fontSize:11 }}>
                          <span style={{ color:W.textSec, fontWeight:500 }}>{b.beds}</span>
                          <span style={{ color:W.textMut }}>{fmtAED(b.avg,true)} avg · {fmtNum(b.count)}</span>
                        </div>
                        <div style={{ height:5, background:W.border, borderRadius:3 }}>
                          <div style={{ height:'100%', width:`${pct}%`, background:`linear-gradient(90deg,${W.purple},#A78BFA)`, borderRadius:3 }}/>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>

            {/* ── SECTION 4 ─────────────────────────────────────────────── */}
            <Card>
              <SectionTitle num="4" title="Price Trend Analysis" subtitle={`${na(form.selectedArea)} vs Dubai average · AED per sqft`} color={W.blue}/>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, marginBottom:16 }}>
                <KPI label="Current Price/sqft" value={`AED ${fmtNum(marketPpsqft)}`} color={W.blue}/>
                <KPI label="YoY Growth" value={`${yoy>0?'+':''}${yoy}%`} color={yoy>=0?W.green:W.red}/>
                <KPI label="vs Dubai Average" value={marketPpsqft&&dubaiAvg?`${Math.round((marketPpsqft-dubaiAvg/10.764)/(dubaiAvg/10.764)*100)>0?'+':''}${Math.round((marketPpsqft-dubaiAvg/10.764)/(dubaiAvg/10.764)*100)}%`:'N/A'} color={W.purple}/>
              </div>
              {priceTrendData.length>0 && (
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={priceTrendData} margin={{ top:8, right:16, left:0, bottom:0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={W.border}/>
                    <XAxis dataKey="year" tick={{ fontSize:10, fill:W.textMut }} axisLine={false} tickLine={false}/>
                    <YAxis tick={{ fontSize:10, fill:W.textMut }} tickFormatter={v=>fmtNum(v)}/>
                    <Tooltip {...tt} formatter={(v,n)=>[`AED ${fmtNum(v)}/sqft`,n==='area'?na(form.selectedArea):'Dubai Avg']}/>
                    <Line type="monotone" dataKey="area" stroke={W.blue} strokeWidth={2.5} dot={{ r:4, fill:W.blue, strokeWidth:0 }} name="area"/>
                    <Line type="monotone" dataKey="dubai" stroke="#94A3B8" strokeWidth={1.5} strokeDasharray="4 4" dot={false} name="dubai"/>
                  </LineChart>
                </ResponsiveContainer>
              )}
              <div style={{ display:'flex', gap:20, justifyContent:'center', marginTop:10 }}>
                <div style={{ display:'flex', alignItems:'center', gap:6 }}><div style={{ width:18, height:2.5, background:W.blue, borderRadius:2 }}/><span style={{ fontSize:11, color:W.textSec }}>{na(form.selectedArea)}</span></div>
                <div style={{ display:'flex', alignItems:'center', gap:6 }}><div style={{ width:18, height:2, background:'#94A3B8', borderRadius:2 }}/><span style={{ fontSize:11, color:W.textSec }}>Dubai Average</span></div>
              </div>
            </Card>

            {/* ── SECTION 5 ─────────────────────────────────────────────── */}
            <Card>
              <SectionTitle num="5" title="Area Profile" subtitle={`Top projects and market statistics · ${na(form.selectedArea)}`} color={W.amber}/>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
                <div>
                  <div style={{ fontSize:12, fontWeight:600, color:W.text, marginBottom:12 }}>Top Projects by Transaction Volume</div>
                  {topProjects.map((d,i)=>{
                    const pct=Math.round(d.count/(topProjects[0]?.count||1)*100);
                    return (
                      <div key={i} style={{ marginBottom:10 }}>
                        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:3, fontSize:11 }}>
                          <span style={{ color:W.textSec, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', maxWidth:'70%', fontWeight:500 }}>{d.name}</span>
                          <span style={{ color:W.textMut, flexShrink:0 }}>{fmtNum(d.count)} txns</span>
                        </div>
                        <div style={{ height:5, background:W.border, borderRadius:3 }}>
                          <div style={{ height:'100%', width:`${pct}%`, background:`linear-gradient(90deg,${W.amber},#FCD34D)`, borderRadius:3 }}/>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div>
                  <div style={{ fontSize:12, fontWeight:600, color:W.text, marginBottom:12 }}>Market Statistics</div>
                  {[
                    ['Total Value Transacted', fmtAED(areaInfo?.kpis?.total||0,true)],
                    ['Average Deal Size', fmtAED(areaInfo?.kpis?.avg||0,true)],
                    ['Off-Plan Transactions', fmtNum(areaInfo?.kpis?.offPlan||0)],
                    ['Ready Transactions', fmtNum((areaInfo?.kpis?.count||0)-(areaInfo?.kpis?.offPlan||0))],
                    ['Price/sqft vs Dubai', `${Math.round((marketPpsqft-(dubaiAvg/10.764))/(dubaiAvg/10.764)*100)>0?'+':''}${Math.round((marketPpsqft-(dubaiAvg/10.764))/(dubaiAvg/10.764)*100)}%`],
                  ].map(([k,v])=>(
                    <div key={k} style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:`1px solid ${W.border}` }}>
                      <span style={{ fontSize:12, color:W.textSec }}>{k}</span>
                      <span style={{ fontSize:12, fontWeight:600, color:W.text }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* ── SECTION 6 ─────────────────────────────────────────────── */}
            {roiData && (
              <Card>
                <SectionTitle num="6" title="Investment Analysis" subtitle="Rental yield, mortgage scenarios and 5-year projections" color={W.green}/>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:16 }}>
                  <KPI label="Est. Rental Yield" value={`${roiData.yieldPct}%`} color={W.green} bg="#F0FDF4" border="#BBF7D0"/>
                  <KPI label="Annual Rental Income" value={fmtAED(roiData.annualRent,true)} color={W.green}/>
                  <KPI label="5yr Future Value" value={fmtAED(roiData.futureValue5,true)} color={W.blue}/>
                  <KPI label="5yr Capital Gain" value={fmtAED(roiData.capitalGain5,true)} color={roiData.capitalGain5>=0?W.green:W.red}/>
                </div>
                <div style={{ fontSize:12, fontWeight:600, color:W.text, marginBottom:10 }}>Mortgage Scenarios (4.5% interest rate · 25 year term)</div>
                <div style={{ borderRadius:10, overflow:'hidden', border:`1px solid ${W.border}` }}>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr 1fr', padding:'10px 16px', background:W.bgAlt, borderBottom:`1px solid ${W.border}` }}>
                    {['Down Payment','Down Amount','Monthly Payment','Annual Cashflow','Net Yield'].map((h,i)=>(
                      <div key={i} style={{ fontSize:10, color:W.textMut, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.04em' }}>{h}</div>
                    ))}
                  </div>
                  {roiData.scenarios.map((s,i)=>(
                    <div key={i} style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr 1fr', padding:'12px 16px', borderBottom:i<2?`1px solid ${W.border}`:'none', background:i%2===0?W.bg:W.bgAlt }}>
                      <div style={{ fontSize:13, fontWeight:700, color:W.text }}>{s.downPct}%</div>
                      <div style={{ fontSize:12, color:W.textSec }}>{fmtAED(s.downAmt,true)}</div>
                      <div style={{ fontSize:12, color:W.amber, fontWeight:600 }}>{fmtAED(s.monthly)}/mo</div>
                      <div style={{ fontSize:12, fontWeight:700, color:s.cashflow>=0?W.green:W.red }}>{s.cashflow>=0?'+':''}{fmtAED(s.cashflow)}</div>
                      <div style={{ fontSize:12, color:s.netYield>=0?W.green:W.red, fontWeight:600 }}>{s.netYield}%</div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* ── SECTION 7 ─────────────────────────────────────────────── */}
            {score && (
              <Card>
                <SectionTitle num="7" title="PropSight Investment Score" subtitle="AI-powered investment rating across 6 weighted factors" color={score.color}/>
                <div style={{ display:'grid', gridTemplateColumns:'auto 1fr', gap:28, alignItems:'center', marginBottom:16 }}>
                  <div style={{ textAlign:'center', background:W.bgAlt, borderRadius:12, padding:'16px 20px', border:`1px solid ${W.border}` }}>
                    <ScoreGauge score={score.total} color={score.color} size={110}/>
                    <div style={{ fontSize:18, fontWeight:800, color:score.color, marginTop:6 }}>{score.verdict}</div>
                    <div style={{ fontSize:11, color:W.textMut, marginTop:2 }}>{score.total}/100</div>
                  </div>
                  <div>
                    {Object.entries(score.breakdown).map(([key,b])=>(
                      <div key={key} style={{ marginBottom:13 }}>
                        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4, fontSize:12 }}>
                          <span style={{ color:W.textSec, fontWeight:500 }}>{b.label}</span>
                          <span style={{ fontWeight:700, color:W.text }}>{b.score}<span style={{ color:W.textMut, fontWeight:400 }}>/100</span> <span style={{ color:W.textMut, fontWeight:400, fontSize:11 }}>× {b.weight}%</span></span>
                        </div>
                        <div style={{ height:7, background:W.border, borderRadius:4 }}>
                          <div style={{ height:'100%', width:`${b.score}%`, background:score.color, borderRadius:4, opacity:0.85 }}/>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ background:`${score.color}0D`, border:`1px solid ${score.color}30`, borderRadius:10, padding:'12px 16px', fontSize:12, color:W.textSec, lineHeight:1.6 }}>
                  <strong style={{ color:score.color }}>Investment Verdict: </strong>
                  {score.total>=80?'Strong Buy — excellent market fundamentals, high liquidity, and strong yield potential make this an outstanding investment opportunity.':score.total>=65?'Buy — solid investment fundamentals with positive market momentum and reasonable rental yield.':score.total>=50?'Hold — market conditions are mixed. Consider negotiating on price or waiting for improved fundamentals.':'Caution — current market conditions or property pricing suggest significant risk. Seek independent advice.'}
                </div>
              </Card>
            )}

            {/* ── SECTION 8: Broker footer ──────────────────────────────── */}
            <div style={{ background:W.bg, border:`1px solid ${W.border}`, borderRadius:14, overflow:'hidden', marginBottom:0 }}>
              {/* Broker card */}
              <div style={{ background:W.bgAlt, borderBottom:`1px solid ${W.border}`, padding:'20px 24px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <div style={{ display:'flex', alignItems:'center', gap:16 }}>
                  {profile?.broker_photo_url && <img src={profile.broker_photo_url} alt="Broker" style={{ width:60, height:60, borderRadius:'50%', objectFit:'cover', border:`2px solid ${W.borderAccent}` }}/>}
                  <div>
                    <div style={{ fontSize:17, fontWeight:800, color:W.text }}>{profile?.broker_name||profile?.full_name||'Your Name'}</div>
                    <div style={{ fontSize:13, color:W.blue, fontWeight:600 }}>{profile?.broker_title||'Real Estate Broker'}</div>
                    <div style={{ fontSize:12, color:W.textSec }}>{profile?.agency_name}</div>
                    {profile?.rera_number && <div style={{ fontSize:11, color:W.textMut, marginTop:2 }}>RERA License No: {profile.rera_number}</div>}
                  </div>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:20 }}>
                  <div style={{ textAlign:'right', fontSize:12, color:W.textSec }}>
                    {profile?.phone && <div style={{ marginBottom:3 }}>📞 {profile.phone}</div>}
                    {profile?.website && <div style={{ color:W.blue, marginBottom:3 }}>🌐 {profile.website}</div>}
                    {profile?.office_address && <div style={{ fontSize:11, color:W.textMut }}>📍 {profile.office_address}</div>}
                  </div>
                  {profile?.agency_logo_url && <img src={profile.agency_logo_url} alt="Agency" style={{ height:50, objectFit:'contain', borderRadius:6 }}/>}
                </div>
              </div>

              {/* Tags */}
              {(profile?.specializations?.length||profile?.languages?.length) && (
                <div style={{ padding:'14px 24px', borderBottom:`1px solid ${W.border}`, display:'flex', gap:24 }}>
                  {profile?.specializations?.length>0 && (
                    <div>
                      <div style={{ fontSize:10, color:W.textMut, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:6 }}>Specializations</div>
                      <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                        {profile.specializations.map(s=><span key={s} style={{ fontSize:10, fontWeight:600, padding:'3px 10px', borderRadius:20, background:W.bgAccent, color:W.blue, border:`1px solid ${W.borderAccent}` }}>{s}</span>)}
                      </div>
                    </div>
                  )}
                  {profile?.languages?.length>0 && (
                    <div>
                      <div style={{ fontSize:10, color:W.textMut, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:6 }}>Languages</div>
                      <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                        {profile.languages.map(l=><span key={l} style={{ fontSize:10, fontWeight:600, padding:'3px 10px', borderRadius:20, background:'#FAF5FF', color:W.purple, border:'1px solid #DDD6FE' }}>{l}</span>)}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Disclaimer */}
              <div style={{ padding:'14px 24px', background:W.bg }}>
                <div style={{ fontSize:10, color:W.textMut, lineHeight:1.7 }}>
                  <strong style={{ color:W.textSec }}>Important Disclaimer: </strong>
                  This report was prepared by {profile?.broker_name||'a PropSight registered broker'} ({profile?.agency_name||'PropSight Real Estate'}) using PropSight's automated valuation model based on Dubai Land Department transaction records. Estimated valuations are indicative only and were generated without physical inspection of the subject property. This report does not constitute a formal RICS or RERA-compliant valuation and should not be relied upon as a basis for financial decisions without independent professional advice. Data source: Dubai Land Department. Report generated: {new Date().toLocaleString('en-AE')}.
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
