import { useState, useMemo } from 'react';
import { fmtAED } from '../utils/format';

const RENTAL_YIELDS = {
  'Business Bay':          6.8,
  'Marsa Dubai':           6.2,
  'Al Barsha South Fourth':7.1,
  'Burj Khalifa':          5.4,
  'Hadaeq Sheikh Mohammed Bin Rashid': 5.8,
  'Palm Jumeirah':         5.1,
  'Al Thanyah Fifth':      7.4,
  'Al Merkadh':            5.6,
  'DEFAULT':               6.5,
};

const APPRECIATION = {
  'Palm Jumeirah':  8.2,
  'Burj Khalifa':   7.1,
  'Marsa Dubai':    6.8,
  'Business Bay':   7.4,
  'DEFAULT':        6.5,
};

export default function ROICalculator({ areaData }) {
  const areas = areaData ? Object.keys(areaData).sort() : [];

  const [area,        setArea]        = useState(areas[0] || '');
  const [price,       setPrice]       = useState(2000000);
  const [downPct,     setDownPct]     = useState(20);
  const [years,       setYears]       = useState(5);
  const [mortgageRate,setMortgageRate]= useState(4.5);
  const [furnished,   setFurnished]   = useState(false);

  const calc = useMemo(() => {
    const yieldPct      = (RENTAL_YIELDS[area] || RENTAL_YIELDS.DEFAULT) + (furnished ? 0.8 : 0);
    const appreciationPct = APPRECIATION[area]  || APPRECIATION.DEFAULT;
    const downPayment   = price * downPct / 100;
    const loanAmt       = price - downPayment;
    const monthlyRate   = mortgageRate / 100 / 12;
    const months        = years * 12;
    const monthlyPayment = loanAmt > 0
      ? loanAmt * monthlyRate * Math.pow(1+monthlyRate,months) / (Math.pow(1+monthlyRate,months)-1)
      : 0;

    const annualRent    = price * yieldPct / 100;
    const annualMortgage= monthlyPayment * 12;
    const annualCashflow= annualRent - annualMortgage;

    const futureValue   = price * Math.pow(1 + appreciationPct/100, years);
    const capitalGain   = futureValue - price;
    const totalRent     = annualRent * years;
    const totalMortgage = annualMortgage * years;
    const totalReturn   = capitalGain + totalRent - totalMortgage - (downPayment);
    const roiPct        = downPayment > 0 ? (totalReturn / downPayment * 100) : 0;
    const breakEvenYrs  = annualCashflow > 0 ? (downPayment / annualCashflow).toFixed(1) : '—';

    return {
      yieldPct, appreciationPct, downPayment, loanAmt,
      monthlyPayment, annualRent, annualCashflow,
      futureValue, capitalGain, totalReturn, roiPct, breakEvenYrs,
    };
  }, [area, price, downPct, years, mortgageRate, furnished]);

  const fmt = (n) => fmtAED(Math.round(n));
  const positive = (n) => n >= 0;

  return (
    <div style={{ flex:1, overflowY:'auto', background:'var(--bg)', fontFamily:'system-ui', padding:'24px 28px' }}>
      <div style={{ marginBottom:24 }}>
        <h1 style={{ margin:0, fontSize:22, fontWeight:700, color:'var(--text-primary)', marginBottom:4 }}>ROI Calculator</h1>
        <div style={{ fontSize:13, color:'var(--text-secondary)' }}>Estimate rental yield, mortgage payments and 5-year return</div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem' }}>

        {/* Inputs */}
        <div style={{ background:'var(--surface)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:12, padding:'1.25rem' }}>
          <div style={{ fontSize:13, fontWeight:600, color:'var(--text-primary)', marginBottom:'1rem' }}>Property Details</div>

          {/* Area */}
          <div style={{ marginBottom:'1rem' }}>
            <label style={{ fontSize:11, color:'var(--text-muted)', display:'block', marginBottom:4 }}>Area</label>
            <select value={area} onChange={e=>setArea(e.target.value)} style={{
              width:'100%', padding:'8px 10px', borderRadius:8, border:'1px solid rgba(255,255,255,0.06)',
              fontSize:13, color:'var(--text-primary)', background:'var(--bg-alt)', border:'1px solid rgba(59,130,246,0.15)', borderRadius:6, padding:'6px 10px', outline:'none', fontFamily:'system-ui'
            }}>
              {areas.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>

          {/* Purchase Price */}
          <div style={{ marginBottom:'1rem' }}>
            <label style={{ fontSize:11, color:'var(--text-muted)', display:'block', marginBottom:4 }}>
              Purchase price — {fmtAED(price)}
            </label>
            <input type="range" min={500000} max={20000000} step={100000} value={price}
              onChange={e=>setPrice(+e.target.value)}
              style={{ width:'100%', accentColor:'#38BDF8' }}/>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:10, color:'var(--text-secondary)' }}>
              <span>500K</span><span>20M</span>
            </div>
          </div>

          {/* Down payment */}
          <div style={{ marginBottom:'1rem' }}>
            <label style={{ fontSize:11, color:'var(--text-muted)', display:'block', marginBottom:4 }}>
              Down payment — {downPct}% ({fmtAED(price * downPct / 100)})
            </label>
            <input type="range" min={20} max={100} step={5} value={downPct}
              onChange={e=>setDownPct(+e.target.value)}
              style={{ width:'100%', accentColor:'#38BDF8' }}/>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:10, color:'var(--text-secondary)' }}>
              <span>20%</span><span>100%</span>
            </div>
          </div>

          {/* Mortgage rate */}
          <div style={{ marginBottom:'1rem' }}>
            <label style={{ fontSize:11, color:'var(--text-muted)', display:'block', marginBottom:4 }}>
              Mortgage rate — {mortgageRate}%
            </label>
            <input type="range" min={3} max={8} step={0.1} value={mortgageRate}
              onChange={e=>setMortgageRate(+e.target.value)}
              style={{ width:'100%', accentColor:'#38BDF8' }}/>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:10, color:'var(--text-secondary)' }}>
              <span>3%</span><span>8%</span>
            </div>
          </div>

          {/* Holding period */}
          <div style={{ marginBottom:'1rem' }}>
            <label style={{ fontSize:11, color:'var(--text-muted)', display:'block', marginBottom:4 }}>
              Holding period — {years} years
            </label>
            <input type="range" min={1} max={15} step={1} value={years}
              onChange={e=>setYears(+e.target.value)}
              style={{ width:'100%', accentColor:'#38BDF8' }}/>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:10, color:'var(--text-secondary)' }}>
              <span>1yr</span><span>15yr</span>
            </div>
          </div>

          {/* Furnished toggle */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
            padding:'10px 12px', background:'var(--surface)', borderRadius:8 }}>
            <div>
              <div style={{ fontSize:12, fontWeight:500, color:'var(--text-primary)' }}>Furnished rental</div>
              <div style={{ fontSize:10, color:'var(--text-secondary)' }}>+0.8% yield premium</div>
            </div>
            <div onClick={() => setFurnished(f=>!f)} style={{
              width:40, height:22, borderRadius:11, cursor:'pointer',
              background: furnished ? '#185FA5' : '#D1D5DB',
              position:'relative', transition:'background 0.2s',
            }}>
              <div style={{
                position:'absolute', top:3, left: furnished ? 21 : 3,
                width:16, height:16, borderRadius:'50%', background:'var(--surface)',
                transition:'left 0.2s',
              }}/>
            </div>
          </div>
        </div>

        {/* Results */}
        <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>

          {/* Key metrics */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem' }}>
            {[
              { label:'Gross rental yield',    value:`${calc.yieldPct.toFixed(1)}%`,    color:'#1D9E75', bg:'#E1F5EE' },
              { label:'Annual appreciation',   value:`${calc.appreciationPct.toFixed(1)}%`, color:'#185FA5', bg:'#EDF4FC' },
              { label:'Monthly mortgage',      value:fmt(calc.monthlyPayment),           color:'#F59E0B', bg:'rgba(245,158,11,0.1)' },
              { label:'Annual rental income',  value:fmt(calc.annualRent),               color:'#1D9E75', bg:'#E1F5EE' },
            ].map(m => (
              <div key={m.label} style={{ background:m.bg, borderRadius:10, padding:'0.875rem' }}>
                <div style={{ fontSize:10, color:'var(--text-muted)', marginBottom:3 }}>{m.label}</div>
                <div style={{ fontSize:17, fontWeight:700, color:m.color }}>{m.value}</div>
              </div>
            ))}
          </div>

          {/* Cash flow */}
          <div style={{ background:'var(--surface)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:12, padding:'1rem' }}>
            <div style={{ fontSize:12, fontWeight:600, color:'var(--text-primary)', marginBottom:'0.75rem' }}>
              Annual cash flow
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', padding:'6px 0', borderBottom:'1px solid #F4F6FA' }}>
              <span style={{ fontSize:12, color:'var(--text-muted)' }}>Rental income</span>
              <span style={{ fontSize:12, fontWeight:600, color:'#1D9E75' }}>+{fmt(calc.annualRent)}</span>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', padding:'6px 0', borderBottom:'1px solid #F4F6FA' }}>
              <span style={{ fontSize:12, color:'var(--text-muted)' }}>Mortgage payments</span>
              <span style={{ fontSize:12, fontWeight:600, color:'#D85A30' }}>-{fmt(calc.monthlyPayment*12)}</span>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', padding:'8px 0' }}>
              <span style={{ fontSize:13, fontWeight:600, color:'var(--text-primary)' }}>Net cash flow</span>
              <span style={{ fontSize:13, fontWeight:700, color:positive(calc.annualCashflow)?'#1D9E75':'#D85A30' }}>
                {positive(calc.annualCashflow)?'+':''}{fmt(calc.annualCashflow)}/yr
              </span>
            </div>
          </div>

          {/* {years}-year projection */}
          <div style={{ background:'var(--surface)', borderRadius:12, padding:'1rem', color:'var(--text-primary)' }}>
            <div style={{ fontSize:12, fontWeight:600, marginBottom:'0.75rem' }}>
              {years}-year projection
            </div>
            {[
              { label:'Future property value', value:fmt(calc.futureValue), color:'#60a5fa' },
              { label:'Capital gain',           value:fmt(calc.capitalGain), color:'#34d399' },
              { label:'Total rental income',    value:fmt(calc.annualRent*years), color:'#34d399' },
              { label:'Total mortgage paid',    value:fmt(calc.monthlyPayment*12*years), color:'#f87171' },
              { label:'Break-even',             value:`${calc.breakEvenYrs} years`, color:'#fbbf24' },
            ].map(r => (
              <div key={r.label} style={{ display:'flex', justifyContent:'space-between', padding:'5px 0',
                borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ fontSize:11, color:'rgba(255,255,255,0.5)' }}>{r.label}</span>
                <span style={{ fontSize:11, fontWeight:700, color:r.color }}>{r.value}</span>
              </div>
            ))}
            <div style={{ marginTop:'0.75rem', padding:'10px', background:'rgba(29,158,117,0.15)',
              borderRadius:8, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <span style={{ fontSize:12, color:'rgba(255,255,255,0.7)' }}>Total ROI on equity</span>
              <span style={{ fontSize:18, fontWeight:700, color:positive(calc.roiPct)?'#34d399':'#f87171' }}>
                {calc.roiPct.toFixed(1)}%
              </span>
            </div>
          </div>

          <div style={{ fontSize:10, color:'var(--text-secondary)', lineHeight:1.5 }}>
            * Estimates based on historical DLD transaction data. Does not include service charges,
            maintenance fees, agent commission (2%), or DLD transfer fees (4%). For indicative purposes only.
          </div>
        </div>
      </div>
    </div>
  );
}
