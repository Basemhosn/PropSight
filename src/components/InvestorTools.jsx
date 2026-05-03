import { useState, useMemo } from 'react';
import { fmtAED, fmtNum } from '../utils/format';
import { t } from '../i18n';

const AREA_NICE = {
  'Al Barsha South Fourth':'JVC','Burj Khalifa':'Downtown Dubai','Marsa Dubai':'Dubai Marina',
  'Hadaeq Sheikh Mohammed Bin Rashid':'Dubai Hills','Al Thanyah Fifth':'JLT',
  'Business Bay':'Business Bay','Palm Jumeirah':'Palm Jumeirah','Al Merkadh':'MBR City',
  'Al Khairan First':'Creek Harbour','Al Hebiah Fourth':'Damac Hills',
};
const na = a => AREA_NICE[a] || a;

// ── DLD Fee Calculator ─────────────────────────────────────────────────────
function DLDCalculator({ areaData }) {
  const lang = localStorage.getItem('lang') || 'en';
  const [price, setPrice] = useState(2000000);
  const [isMortgage, setIsMortgage] = useState(false);
  const [isOffPlan, setIsOffPlan] = useState(false);

  const fees = useMemo(() => {
    const dld        = Math.round(price * 0.04);
    const admin      = 4200; // DLD admin fee
    const agent      = Math.round(price * 0.02);
    const mortgage   = isMortgage ? Math.round(price * 0.0025) + 290 : 0;
    const trustee    = isOffPlan ? 5250 : 4200;
    const total      = dld + admin + agent + mortgage + trustee;
    const totalCost  = price + total;
    return { dld, admin, agent, mortgage, trustee, total, totalCost };
  }, [price, isMortgage, isOffPlan]);

  const Row = ({ label, value, highlight }) => (
    <div style={{ display:'flex', justifyContent:'space-between', padding:'10px 0',
      borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
      <span style={{ fontSize:13, color:'var(--text-secondary)' }}>{label}</span>
      <span style={{ fontSize:13, fontWeight:highlight?700:600,
        color:highlight?'#F59E0B':'var(--text-primary)' }}>{fmtAED(value)}</span>
    </div>
  );

  return (
    <div style={{ background:'var(--surface)', border:'1px solid rgba(255,255,255,0.06)',
      borderRadius:16, padding:24 }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20 }}>
        <div style={{ width:36, height:36, borderRadius:10,
          background:'linear-gradient(135deg,rgba(245,158,11,0.2),rgba(251,191,36,0.1))',
          display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>🏛️</div>
        <div>
          <div style={{ fontSize:15, fontWeight:700, color:'var(--text-primary)' }}>DLD Fee Calculator</div>
          <div style={{ fontSize:12, color:'var(--text-muted)' }}>True cost of buying in Dubai</div>
        </div>
      </div>

      {/* Price slider */}
      <div style={{ marginBottom:20 }}>
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
          <span style={{ fontSize:12, color:'var(--text-muted)' }}>Property Price</span>
          <span style={{ fontSize:14, fontWeight:700, color:'#38BDF8' }}>{fmtAED(price)}</span>
        </div>
        <input type="range" min={500000} max={20000000} step={100000} value={price}
          onChange={e=>setPrice(+e.target.value)}
          style={{ width:'100%', accentColor:'#38BDF8' }}/>
        <div style={{ display:'flex', justifyContent:'space-between', fontSize:10,
          color:'var(--text-muted)', marginTop:4 }}>
          <span>AED 500K</span><span>AED 20M</span>
        </div>
      </div>

      {/* Toggles */}
      <div style={{ display:'flex', gap:10, marginBottom:20 }}>
        {[[isMortgage, setIsMortgage, 'Mortgage financed'],
          [isOffPlan, setIsOffPlan, 'Off-plan purchase']].map(([val, set, label], i) => (
          <div key={i} onClick={() => set(v=>!v)} style={{ flex:1, display:'flex',
            alignItems:'center', justifyContent:'space-between',
            background: val ? 'rgba(56,189,248,0.08)' : 'var(--bg-alt)',
            border: `1px solid ${val ? 'rgba(56,189,248,0.3)' : 'rgba(255,255,255,0.06)'}`,
            borderRadius:10, padding:'10px 14px', cursor:'pointer' }}>
            <span style={{ fontSize:12, color:'var(--text-secondary)' }}>{label}</span>
            <div style={{ width:34, height:18, borderRadius:9, cursor:'pointer',
              background: val ? '#38BDF8' : 'rgba(255,255,255,0.1)', position:'relative',
              transition:'background 0.2s' }}>
              <div style={{ position:'absolute', top:3, left: val ? 18 : 3,
                width:12, height:12, borderRadius:'50%', background:'#fff',
                transition:'left 0.2s' }}/>
            </div>
          </div>
        ))}
      </div>

      {/* Fee breakdown */}
      <div style={{ marginBottom:16 }}>
        <Row label="DLD Transfer Fee (4%)" value={fees.dld}/>
        <Row label="DLD Admin Fee" value={fees.admin}/>
        <Row label="Agent Commission (2%)" value={fees.agent}/>
        {isMortgage && <Row label="Mortgage Registration (0.25%)" value={fees.mortgage}/>}
        <Row label={`Trustee Fee (${isOffPlan?'Off-plan':'Ready'})`} value={fees.trustee}/>
      </div>

      <div style={{ background:'rgba(245,158,11,0.08)', border:'1px solid rgba(245,158,11,0.2)',
        borderRadius:12, padding:'14px 16px', marginBottom:12 }}>
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
          <span style={{ fontSize:13, fontWeight:600, color:'var(--text-primary)' }}>Total Fees</span>
          <span style={{ fontSize:16, fontWeight:800, color:'#F59E0B' }}>{fmtAED(fees.total)}</span>
        </div>
        <div style={{ display:'flex', justifyContent:'space-between' }}>
          <span style={{ fontSize:12, color:'var(--text-muted)' }}>Total Cost (incl. fees)</span>
          <span style={{ fontSize:14, fontWeight:700, color:'var(--text-primary)' }}>{fmtAED(fees.totalCost)}</span>
        </div>
      </div>
      <div style={{ fontSize:10, color:'var(--text-muted)', lineHeight:1.6 }}>
        * Estimates only. Excludes VAT on agent fees, service charges, and NOC fees. Always verify with your conveyancer.
      </div>
    </div>
  );
}

// ── Mortgage Calculator ────────────────────────────────────────────────────
function MortgageCalculator() {
  // lang already declared above
  const [price, setPrice]         = useState(2000000);
  const [down, setDown]           = useState(20);
  const [rate, setRate]           = useState(4.5);
  const [years, setYears]         = useState(25);
  const [showROI, setShowROI]     = useState(false);
  const [rentalYield, setRentalYield] = useState(6);
  const [appreciation, setAppreciation] = useState(7);

  const calc = useMemo(() => {
    const loan = price * (1 - down/100);
    const r = rate / 100 / 12;
    const n = years * 12;
    const monthly = loan > 0 && r > 0
      ? loan * r * Math.pow(1+r,n) / (Math.pow(1+r,n)-1)
      : loan / n;
    const total = monthly * n;
    const interest = total - loan;
    const downAmt = price * down/100;

    // ROI calculations
    const annualRent      = price * rentalYield / 100;
    const annualMortgage  = monthly * 12;
    const annualCashflow  = annualRent - annualMortgage;
    const futureValue     = price * Math.pow(1 + appreciation/100, years);
    const capitalGain     = futureValue - price;
    const totalRent       = annualRent * years;
    const totalMortgagePd = total;
    const netReturn       = capitalGain + totalRent - totalMortgagePd;
    const roi             = downAmt > 0 ? (netReturn / downAmt * 100) : 0;
    const grossYield      = rentalYield;
    const netYield        = ((annualRent - annualMortgage) / price * 100);
    const breakEven       = annualCashflow > 0 ? (downAmt / annualCashflow).toFixed(1) : '—';

    return { loan, monthly, total, interest, downAmt,
      annualRent, annualCashflow, futureValue, capitalGain,
      netReturn, roi, grossYield, netYield, breakEven };
  }, [price, down, rate, years, rentalYield, appreciation]);

  const Slider = ({ label, value, min, max, step, onChange, fmt, fmtMin, fmtMax }) => (
    <div style={{ marginBottom:18 }}>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
        <span style={{ fontSize:12, color:'var(--text-muted)' }}>{label}</span>
        <span style={{ fontSize:13, fontWeight:700, color:'#38BDF8' }}>{fmt(value)}</span>
      </div>
      <style>{`
        input[type=range].smooth-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 5px;
          border-radius: 3px;
          background: rgba(255,255,255,0.08);
          outline: none;
          cursor: pointer;
        }
        input[type=range].smooth-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1D4ED8, #38BDF8);
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(56,189,248,0.4);
          transition: transform 0.15s, box-shadow 0.15s;
        }
        input[type=range].smooth-slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 4px 16px rgba(56,189,248,0.6);
        }
        input[type=range].smooth-slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1D4ED8, #38BDF8);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 8px rgba(56,189,248,0.4);
        }
        input[type=range].smooth-slider::-webkit-slider-runnable-track {
          height: 5px;
          border-radius: 3px;
          background: rgba(255,255,255,0.08);
        }
      `}</style>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e=>onChange(+e.target.value)}
        className="smooth-slider"
        style={{ width:'100%' }}/>
      {(fmtMin || fmtMax) && (
        <div style={{ display:'flex', justifyContent:'space-between',
          fontSize:10, color:'var(--text-muted)', marginTop:4 }}>
          <span>{fmtMin ? fmtMin(min) : fmt(min)}</span>
          <span>{fmtMax ? fmtMax(max) : fmt(max)}</span>
        </div>
      )}
    </div>
  );

  return (
    <div style={{ background:'var(--surface)', border:'1px solid rgba(255,255,255,0.06)',
      borderRadius:16, padding:24 }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:36, height:36, borderRadius:10,
            background:'linear-gradient(135deg,rgba(56,189,248,0.2),rgba(29,78,216,0.1))',
            display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>🏦</div>
          <div>
            <div style={{ fontSize:15, fontWeight:700, color:'var(--text-primary)' }}>Mortgage Calculator</div>
            <div style={{ fontSize:12, color:'var(--text-muted)' }}>Monthly payments & total cost</div>
          </div>
        </div>
        {/* ROI Toggle */}
        <div onClick={()=>setShowROI(v=>!v)} style={{ display:'flex', alignItems:'center',
          gap:8, cursor:'pointer', background:showROI?'rgba(34,197,94,0.08)':'var(--bg-alt)',
          border:`1px solid ${showROI?'rgba(34,197,94,0.3)':'rgba(255,255,255,0.06)'}`,
          borderRadius:10, padding:'7px 14px' }}>
          <div style={{ width:16, height:16, borderRadius:4,
            background:showROI?'#22C55E':'rgba(255,255,255,0.1)',
            border:`2px solid ${showROI?'#22C55E':'rgba(255,255,255,0.2)'}`,
            display:'flex', alignItems:'center', justifyContent:'center' }}>
            {showROI && <span style={{ fontSize:10, color:'#fff', fontWeight:700 }}>✓</span>}
          </div>
          <span style={{ fontSize:12, fontWeight:600,
            color:showROI?'#22C55E':'var(--text-muted)' }}>ROI Calculator</span>
        </div>
      </div>

      <Slider label="Property Price" value={price} min={500000} max={20000000} step={50000}
        onChange={setPrice} fmt={v=>`AED ${fmtNum(v)}`} fmtMin={()=>'AED 500K'} fmtMax={()=>'AED 20M'}/>
      <Slider label={`Down Payment — ${down}% (${fmtAED(calc.downAmt)})`}
        value={down} min={20} max={80} step={1}
        onChange={setDown} fmt={v=>`${v}%`}/>
      <Slider label={`Interest Rate — ${rate}%`}
        value={rate} min={2.5} max={9} step={0.1}
        onChange={setRate} fmt={v=>`${v}%`}/>
      <Slider label={`Loan Term — ${years} years`}
        value={years} min={5} max={25} step={1}
        onChange={setYears} fmt={v=>`${v} yrs`}/>

      {/* ROI inputs - only shown when toggled */}
      {showROI && (
        <div style={{ background:'rgba(34,197,94,0.04)', border:'1px solid rgba(34,197,94,0.15)',
          borderRadius:12, padding:'16px', marginBottom:16 }}>
          <div style={{ fontSize:12, fontWeight:600, color:'#22C55E', marginBottom:12,
            textTransform:'uppercase', letterSpacing:'0.05em' }}>ROI Assumptions</div>
          <Slider label={`Rental Yield — ${rentalYield}%`}
            value={rentalYield} min={2} max={12} step={0.1}
            onChange={setRentalYield} fmt={v=>`${v}%`}/>
          <Slider label={`Annual Appreciation — ${appreciation}%`}
            value={appreciation} min={0} max={20} step={0.1}
            onChange={setAppreciation} fmt={v=>`${v}%`}/>
        </div>
      )}

      {/* Mortgage metrics */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:showROI?16:0 }}>
        {[
          ['Monthly Payment', fmtAED(Math.round(calc.monthly)), '#38BDF8'],
          ['Loan Amount',     fmtAED(Math.round(calc.loan)),    'var(--text-primary)'],
          ['Total Interest',  fmtAED(Math.round(calc.interest)),'#F87171'],
          ['Total Repayment', fmtAED(Math.round(calc.total)),   '#F59E0B'],
        ].map(([label, value, color]) => (
          <div key={label} style={{ background:'var(--bg-alt)', borderRadius:10, padding:'12px 14px' }}>
            <div style={{ fontSize:10, color:'var(--text-muted)', marginBottom:4,
              textTransform:'uppercase', letterSpacing:'0.05em' }}>{label}</div>
            <div style={{ fontSize:15, fontWeight:700, color }}>{value}</div>
          </div>
        ))}
      </div>

      {/* ROI results */}
      {showROI && (
        <>
          <div style={{ fontSize:12, fontWeight:600, color:'var(--text-muted)',
            textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:10 }}>
            Investment Returns over {years} years
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:12 }}>
            {[
              ['Annual Rent',    fmtAED(Math.round(calc.annualRent)),    '#22C55E'],
              ['Annual Cashflow',fmtAED(Math.round(calc.annualCashflow)), calc.annualCashflow>=0?'#22C55E':'#F87171'],
              ['Gross Yield',    calc.grossYield.toFixed(1)+'%',          '#38BDF8'],
              ['Net Yield',      calc.netYield.toFixed(1)+'%',            calc.netYield>=0?'#22C55E':'#F87171'],
              ['Capital Gain',   fmtAED(Math.round(calc.capitalGain)),   '#A78BFA'],
              ['Break-even',     calc.breakEven+' yrs',                   '#F59E0B'],
            ].map(([label,value,color])=>(
              <div key={label} style={{ background:'var(--bg-alt)', borderRadius:10, padding:'12px 14px' }}>
                <div style={{ fontSize:10, color:'var(--text-muted)', marginBottom:4,
                  textTransform:'uppercase', letterSpacing:'0.05em' }}>{label}</div>
                <div style={{ fontSize:15, fontWeight:700, color }}>{value}</div>
              </div>
            ))}
          </div>
          <div style={{ background:calc.roi>=0?'rgba(34,197,94,0.08)':'rgba(248,113,113,0.08)',
            border:`1px solid ${calc.roi>=0?'rgba(34,197,94,0.25)':'rgba(248,113,113,0.25)'}`,
            borderRadius:12, padding:'14px 20px', textAlign:'center' }}>
            <div style={{ fontSize:11, color:'var(--text-muted)', marginBottom:4 }}>
              Total ROI on Equity (after {years} years)
            </div>
            <div style={{ fontSize:32, fontWeight:800,
              color:calc.roi>=0?'#22C55E':'#F87171' }}>
              {calc.roi>=0?'+':''}{calc.roi.toFixed(1)}%
            </div>
            <div style={{ fontSize:12, color:'var(--text-muted)', marginTop:4 }}>
              Net return: {fmtAED(Math.round(calc.netReturn))}
            </div>
          </div>
        </>
      )}

      <div style={{ marginTop:12, fontSize:10, color:'var(--text-muted)', lineHeight:1.6 }}>
        * Based on reducing balance mortgage. UAE banks typically require 20% down for expats, 15% for UAE nationals. ROI figures are estimates only.
      </div>
    </div>
  );
}

// ── Area Comparison ────────────────────────────────────────────────────────
function AreaComparison({ areaData, core }) {
  // lang already declared above
  const areas = areaData ? Object.keys(areaData).sort() : [];
  const [areaA, setAreaA] = useState(areas[0] || '');
  const [areaB, setAreaB] = useState(areas[1] || '');

  const { calcPropSightScore } = require('../utils/propSightScore');
  const dubaiAvg = core?.priceTrend?.slice(-1)[0]?.ppsqm || 15000;
  const maxCount = useMemo(() =>
    areaData ? Math.max(...Object.values(areaData).map(d=>d.kpis?.count||0)) : 5000
  , [areaData]);

  const getScore = (key) => {
    if (!key || !areaData?.[key]) return null;
    return calcPropSightScore({
      areaKpis: areaData[key].kpis || {},
      priceTrend: areaData[key].priceTrend || [],
      dubaiAvgPpsqm: dubaiAvg,
      maxAreaCount: maxCount,
    });
  };

  const dataA = areaData?.[areaA];
  const dataB = areaData?.[areaB];
  const scoreA = getScore(areaA);
  const scoreB = getScore(areaB);

  const yoy = (d) => {
    const pt = d?.priceTrend || [];
    return pt.length >= 2
      ? +((pt[pt.length-1].ppsqm - pt[pt.length-2].ppsqm)/pt[pt.length-2].ppsqm*100).toFixed(1)
      : 0;
  };

  const metrics = [
    { label:'PropSight Score', a: scoreA?.total, b: scoreB?.total, fmt: v=>`${v}/100`, higherBetter:true },
    { label:'Price / sqft', a: Math.round((dataA?.kpis?.ppsqm||0)/10.764), b: Math.round((dataB?.kpis?.ppsqm||0)/10.764), fmt: v=>`AED ${fmtNum(v)}`, higherBetter:false },
    { label:'YoY Growth', a: yoy(dataA), b: yoy(dataB), fmt: v=>`${v>0?'+':''}${v}%`, higherBetter:true },
    { label:'Avg Deal Size', a: Math.round(dataA?.kpis?.avg||0), b: Math.round(dataB?.kpis?.avg||0), fmt: v=>fmtAED(v,true), higherBetter:false },
    { label:'Total Transactions', a: dataA?.kpis?.count||0, b: dataB?.kpis?.count||0, fmt: v=>fmtNum(v), higherBetter:true },
    { label:'Off-Plan Share', a: dataA?.kpis?.count?Math.round((dataA.kpis.offPlan||0)/dataA.kpis.count*100):0, b: dataB?.kpis?.count?Math.round((dataB.kpis.offPlan||0)/dataB.kpis.count*100):0, fmt: v=>`${v}%`, higherBetter:false },
    { label:'Rental Yield (est.)', a: dataA?.kpis?.ppsqm?+(Math.min(10,Math.max(3,80000/dataA.kpis.ppsqm)).toFixed(1)):0, b: dataB?.kpis?.ppsqm?+(Math.min(10,Math.max(3,80000/dataB.kpis.ppsqm)).toFixed(1)):0, fmt: v=>`${v}%`, higherBetter:true },
  ];

  const sel = {
    width:'100%', padding:'10px 12px', borderRadius:10, background:'var(--bg-alt)',
    border:'1px solid rgba(59,130,246,0.2)', color:'var(--text-primary)',
    fontSize:13, outline:'none', fontFamily:'system-ui', cursor:'pointer',
  };

  return (
    <div style={{ background:'var(--surface)', border:'1px solid rgba(255,255,255,0.06)',
      borderRadius:16, padding:24 }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20 }}>
        <div style={{ width:36, height:36, borderRadius:10,
          background:'linear-gradient(135deg,rgba(139,92,246,0.2),rgba(167,139,250,0.1))',
          display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>⚖️</div>
        <div>
          <div style={{ fontSize:15, fontWeight:700, color:'var(--text-primary)' }}>Area Comparison</div>
          <div style={{ fontSize:12, color:'var(--text-muted)' }}>Side-by-side investment analysis</div>
        </div>
      </div>

      {/* Area selectors */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr auto 1fr', gap:12,
        alignItems:'center', marginBottom:20 }}>
        <select value={areaA} onChange={e=>setAreaA(e.target.value)} style={sel}>
          {areas.map(a=><option key={a} value={a}>{na(a)}</option>)}
        </select>
        <div style={{ fontSize:16, fontWeight:700, color:'var(--text-muted)' }}>vs</div>
        <select value={areaB} onChange={e=>setAreaB(e.target.value)} style={sel}>
          {areas.map(a=><option key={a} value={a}>{na(a)}</option>)}
        </select>
      </div>

      {/* Score headers */}
      {scoreA && scoreB && (
        <div style={{ display:'grid', gridTemplateColumns:'1fr auto 1fr', gap:12,
          marginBottom:20, textAlign:'center' }}>
          <div style={{ background:scoreA.bg, border:`1px solid ${scoreA.color}40`,
            borderRadius:12, padding:'14px' }}>
            <div style={{ fontSize:11, color:scoreA.color, fontWeight:700,
              textTransform:'uppercase', marginBottom:4 }}>PropSight Score</div>
            <div style={{ fontSize:28, fontWeight:800, color:scoreA.color }}>{scoreA.total}</div>
            <div style={{ fontSize:13, fontWeight:600, color:scoreA.color }}>{scoreA.verdict}</div>
          </div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:20, color:'var(--text-muted)' }}>⚔️</div>
          <div style={{ background:scoreB.bg, border:`1px solid ${scoreB.color}40`,
            borderRadius:12, padding:'14px' }}>
            <div style={{ fontSize:11, color:scoreB.color, fontWeight:700,
              textTransform:'uppercase', marginBottom:4 }}>PropSight Score</div>
            <div style={{ fontSize:28, fontWeight:800, color:scoreB.color }}>{scoreB.total}</div>
            <div style={{ fontSize:13, fontWeight:600, color:scoreB.color }}>{scoreB.verdict}</div>
          </div>
        </div>
      )}

      {/* Metrics table */}
      <div style={{ borderRadius:12, overflow:'hidden',
        border:'1px solid rgba(255,255,255,0.06)' }}>
        {metrics.map((m, i) => {
          const aWins = m.higherBetter ? (m.a||0) > (m.b||0) : (m.a||0) < (m.b||0);
          const bWins = m.higherBetter ? (m.b||0) > (m.a||0) : (m.b||0) < (m.a||0);
          return (
            <div key={m.label} style={{ display:'grid', gridTemplateColumns:'1fr 120px 1fr',
              padding:'11px 16px', background: i%2===0?'rgba(59,130,246,0.02)':'transparent',
              borderBottom: i<metrics.length-1?'1px solid rgba(255,255,255,0.04)':'none',
              alignItems:'center' }}>
              <div style={{ fontWeight:600, fontSize:12,
                color: aWins?'#22C55E':'var(--text-primary)' }}>
                {m.a !== undefined ? m.fmt(m.a) : '—'}
                {aWins && <span style={{ marginLeft:6, fontSize:10 }}>✓</span>}
              </div>
              <div style={{ textAlign:'center', fontSize:10, color:'var(--text-muted)',
                fontWeight:600, textTransform:'uppercase', letterSpacing:'0.04em' }}>
                {m.label}
              </div>
              <div style={{ textAlign:'right', fontWeight:600, fontSize:12,
                color: bWins?'#22C55E':'var(--text-primary)' }}>
                {bWins && <span style={{ marginRight:6, fontSize:10 }}>✓</span>}
                {m.b !== undefined ? m.fmt(m.b) : '—'}
              </div>
            </div>
          );
        })}
      </div>

      {/* Winner */}
      {scoreA && scoreB && scoreA.total !== scoreB.total && (
        <div style={{ marginTop:16, padding:'14px 18px',
          background: scoreA.total > scoreB.total ? scoreA.bg : scoreB.bg,
          border:`1px solid ${scoreA.total > scoreB.total ? scoreA.color : scoreB.color}30`,
          borderRadius:12, textAlign:'center' }}>
          <div style={{ fontSize:12, color:'var(--text-muted)', marginBottom:4 }}>
            Better investment based on PropSight Score
          </div>
          <div style={{ fontSize:16, fontWeight:700,
            color: scoreA.total > scoreB.total ? scoreA.color : scoreB.color }}>
            {scoreA.total > scoreB.total ? na(areaA) : na(areaB)} wins 🏆
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main Tools Page ────────────────────────────────────────────────────────
export default function InvestorTools({ areaData, core }) {
  // lang already declared above
  const [tool, setTool] = useState('mortgage');

  return (
    <div style={{ flex:1, overflowY:'auto', background:'var(--bg)',
      fontFamily:'system-ui', padding:'24px 20px' }}>
      <div style={{ maxWidth:880, margin:'0 auto' }}>
        <div style={{ marginBottom:24 }}>
          <h1 style={{ margin:0, fontSize:22, fontWeight:700,
            color:'var(--text-primary)', marginBottom:4 }}>Investment Tools</h1>
          <div style={{ fontSize:13, color:'var(--text-secondary)' }}>
            Dubai property calculators — fees, mortgage, and area comparison
          </div>
        </div>

        {/* Tool selector */}
        <div style={{ display:'flex', gap:8, marginBottom:24, flexWrap:'wrap' }}>
          {[
            ['mortgage','🏦 Mortgage'],
            ['dld','🏛️ DLD Fees'],
            ['compare','⚖️ Compare Areas'],
          ].map(([id,label])=>(
            <button key={id} onClick={()=>setTool(id)} style={{
              padding:'9px 20px', borderRadius:20, border:'none', cursor:'pointer',
              fontSize:13, fontWeight:tool===id?600:400, fontFamily:'system-ui',
              background: tool===id?'linear-gradient(135deg,#1D4ED8,#38BDF8)':'var(--surface)',
              color: tool===id?'#fff':'var(--text-muted)',
              border: tool===id?'none':'1px solid rgba(59,130,246,0.12)',
            }}>{label}</button>
          ))}
        </div>

        {tool==='mortgage' && <MortgageCalculator/>}
        {tool==='dld'      && <DLDCalculator areaData={areaData}/>}
        {tool==='compare'  && <AreaComparison areaData={areaData} core={core}/>}
      </div>
    </div>
  );
}
