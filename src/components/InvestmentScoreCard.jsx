import { useState, useRef } from 'react';
import { calcPropSightScore } from '../utils/propSightScore';
import { fmtAED, fmtNum } from '../utils/format';

const AREA_NICE = {
  'Al Barsha South Fourth':'JVC','Burj Khalifa':'Downtown Dubai','Marsa Dubai':'Dubai Marina',
  'Hadaeq Sheikh Mohammed Bin Rashid':'Dubai Hills','Al Thanyah Fifth':'JLT',
  'Business Bay':'Business Bay','Palm Jumeirah':'Palm Jumeirah','Al Merkadh':'MBR City',
  'Al Khairan First':'Creek Harbour','Al Hebiah Fourth':'Damac Hills',
};
const na = a => AREA_NICE[a] || a;

export default function InvestmentScoreCard({ areaData, core }) {
  const lang = localStorage.getItem('lang') || 'en';
  const [selectedArea, setSelectedArea] = useState('');
  const [developer, setDeveloper] = useState('');
  const [projectName, setProjectName] = useState('');
  const [askingPrice, setAskingPrice] = useState('');
  const [sizeSqft, setSizeSqft] = useState('');
  const [printing, setPrinting] = useState(false);
  const cardRef = useRef(null);

  const areas = areaData ? Object.keys(areaData).sort() : [];
  const areaInfo = areaData?.[selectedArea];

  const dubaiAvg = core?.priceTrend?.slice(-1)[0]?.ppsqm || 15000;
  const maxCount = areaData ? Math.max(...Object.values(areaData).map(d=>d.kpis?.count||0)) : 5000;

  const score = selectedArea && areaInfo ? calcPropSightScore({
    areaKpis: areaInfo.kpis || {},
    priceTrend: areaInfo.priceTrend || [],
    dubaiAvgPpsqm: dubaiAvg,
    maxAreaCount: maxCount,
    developerName: developer,
  }) : null;

  const priceSqft = askingPrice && sizeSqft
    ? Math.round(parseFloat(askingPrice.replace(/,/g,'')) / parseFloat(sizeSqft.replace(/,/g,'')))
    : 0;
  const marketPriceSqft = Math.round((areaInfo?.kpis?.ppsqm||0)/10.764);
  const priceVsMarket = marketPriceSqft && priceSqft
    ? ((priceSqft - marketPriceSqft) / marketPriceSqft * 100).toFixed(1)
    : null;

  const yoy = () => {
    const pt = areaInfo?.priceTrend || [];
    return pt.length >= 2
      ? +((pt[pt.length-1].ppsqm - pt[pt.length-2].ppsqm)/pt[pt.length-2].ppsqm*100).toFixed(1)
      : 0;
  };

  const handlePrint = () => {
    setPrinting(true);
    setTimeout(() => {
      window.print();
      setPrinting(false);
    }, 300);
  };

  const inp = {
    width:'100%', padding:'10px 12px', borderRadius:8, background:'var(--bg-alt)',
    border:'1px solid rgba(59,130,246,0.15)', color:'var(--text-primary)',
    fontSize:13, outline:'none', fontFamily:'system-ui', boxSizing:'border-box',
  };

  return (
    <div style={{ flex:1, overflowY:'auto', background:'var(--bg)',
      fontFamily:'system-ui', padding:'24px 20px' }}>
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #score-card, #score-card * { visibility: visible; }
          #score-card { position: fixed; left:0; top:0; width:100%; }
          .no-print { display: none !important; }
        }
      `}</style>

      <div style={{ maxWidth:880, margin:'0 auto' }}>
        <div style={{ marginBottom:24 }}>
          <h1 style={{ margin:0, fontSize:22, fontWeight:700,
            color:'var(--text-primary)', marginBottom:4 }}>Investment Score Card</h1>
          <div style={{ fontSize:13, color:'var(--text-secondary)' }}>
            Generate a branded one-page investment summary for any property
          </div>
        </div>

        {/* Input form */}
        <div className="no-print" style={{ background:'var(--surface)',
          border:'1px solid rgba(255,255,255,0.06)', borderRadius:16,
          padding:24, marginBottom:24 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
            <div>
              <div style={{ fontSize:11, color:'var(--text-muted)', marginBottom:6,
                fontWeight:600, textTransform:'uppercase', letterSpacing:'0.05em' }}>Area *</div>
              <select value={selectedArea} onChange={e=>setSelectedArea(e.target.value)} style={{...inp,cursor:'pointer'}}>
                <option value="">Select area...</option>
                {areas.map(a=><option key={a} value={a}>{na(a)}</option>)}
              </select>
            </div>
            <div>
              <div style={{ fontSize:11, color:'var(--text-muted)', marginBottom:6,
                fontWeight:600, textTransform:'uppercase', letterSpacing:'0.05em' }}>Developer</div>
              <input value={developer} onChange={e=>setDeveloper(e.target.value)}
                placeholder="e.g. Emaar, Ellington..." style={inp}/>
            </div>
            <div>
              <div style={{ fontSize:11, color:'var(--text-muted)', marginBottom:6,
                fontWeight:600, textTransform:'uppercase', letterSpacing:'0.05em' }}>Project / Building</div>
              <input value={projectName} onChange={e=>setProjectName(e.target.value)}
                placeholder="e.g. Address Residences" style={inp}/>
            </div>
            <div>
              <div style={{ fontSize:11, color:'var(--text-muted)', marginBottom:6,
                fontWeight:600, textTransform:'uppercase', letterSpacing:'0.05em' }}>Asking Price (AED)</div>
              <input value={askingPrice} onChange={e=>setAskingPrice(e.target.value)}
                placeholder="e.g. 2,500,000" style={inp}/>
            </div>
            <div>
              <div style={{ fontSize:11, color:'var(--text-muted)', marginBottom:6,
                fontWeight:600, textTransform:'uppercase', letterSpacing:'0.05em' }}>Size (sqft)</div>
              <input value={sizeSqft} onChange={e=>setSizeSqft(e.target.value)}
                placeholder="e.g. 1,200" style={inp}/>
            </div>
          </div>
        </div>

        {/* Score Card Preview */}
        {score && (
          <div id="score-card" ref={cardRef} style={{
            background:'var(--surface)', borderRadius:20,
            border:`2px solid ${score.color}30`, overflow:'hidden',
            boxShadow:`0 8px 40px ${score.color}15`,
          }}>
            {/* Header */}
            <div style={{
              background:`linear-gradient(135deg,${score.color}15,rgba(6,14,26,0.8))`,
              padding:'28px 32px',
              borderBottom:`1px solid ${score.color}20`,
            }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                <div>
                  <div style={{ fontSize:11, color:score.color, fontWeight:700,
                    textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:6 }}>
                    PropSight Investment Score Card
                  </div>
                  <div style={{ fontSize:24, fontWeight:800, color:'var(--text-primary)',
                    marginBottom:4 }}>
                    {projectName || na(selectedArea)}
                  </div>
                  {developer && <div style={{ fontSize:13, color:'var(--text-secondary)' }}>
                    by {developer}
                  </div>}
                  <div style={{ fontSize:13, color:'var(--text-muted)', marginTop:4 }}>
                    📍 {na(selectedArea)} · Dubai, UAE
                  </div>
                </div>
                <div style={{ textAlign:'center' }}>
                  <div style={{ fontSize:11, color:'var(--text-muted)', marginBottom:4,
                    textTransform:'uppercase', letterSpacing:'0.06em' }}>PropSight Score</div>
                  <div style={{ fontSize:56, fontWeight:900, color:score.color,
                    lineHeight:1 }}>{score.total}</div>
                  <div style={{ fontSize:10, color:'var(--text-muted)' }}>/100</div>
                  <div style={{ marginTop:8, padding:'6px 16px',
                    background:score.bg, border:`1px solid ${score.color}40`,
                    borderRadius:20, fontSize:13, fontWeight:700, color:score.color }}>
                    {score.verdict}
                  </div>
                </div>
              </div>
            </div>

            {/* Key metrics */}
            <div style={{ padding:'24px 32px',
              borderBottom:`1px solid rgba(255,255,255,0.06)` }}>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
                {[
                  ['Avg Price', fmtAED(areaInfo?.kpis?.avg||0, true), '#38BDF8'],
                  ['Price/sqft', `AED ${fmtNum(marketPriceSqft)}`, '#A78BFA'],
                  ['YoY Growth', `${yoy()>0?'+':''}${yoy()}%`, yoy()>=0?'#22C55E':'#F87171'],
                  ['Transactions', fmtNum(areaInfo?.kpis?.count||0), 'var(--text-primary)'],
                ].map(([label,value,color])=>(
                  <div key={label} style={{ textAlign:'center' }}>
                    <div style={{ fontSize:10, color:'var(--text-muted)', marginBottom:4,
                      textTransform:'uppercase', letterSpacing:'0.05em' }}>{label}</div>
                    <div style={{ fontSize:16, fontWeight:700, color }}>{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Asking price analysis */}
            {askingPrice && sizeSqft && (
              <div style={{ padding:'20px 32px',
                borderBottom:`1px solid rgba(255,255,255,0.06)`,
                background:'rgba(59,130,246,0.03)' }}>
                <div style={{ fontSize:12, fontWeight:600, color:'var(--text-muted)',
                  textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:12 }}>
                  Property Analysis
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }}>
                  {[
                    ['Asking Price', fmtAED(parseFloat(askingPrice.replace(/,/g,''))||0), '#38BDF8'],
                    ['Your Price/sqft', `AED ${fmtNum(priceSqft)}`, 'var(--text-primary)'],
                    ['vs Market', priceVsMarket !== null ? `${priceVsMarket > 0 ? '+' : ''}${priceVsMarket}%` : '—',
                      priceVsMarket !== null ? (parseFloat(priceVsMarket) <= 0 ? '#22C55E' : '#F87171') : 'var(--text-muted)'],
                  ].map(([label,value,color])=>(
                    <div key={label} style={{ background:'var(--bg-alt)', borderRadius:10, padding:'12px 14px' }}>
                      <div style={{ fontSize:10, color:'var(--text-muted)', marginBottom:4,
                        textTransform:'uppercase', letterSpacing:'0.05em' }}>{label}</div>
                      <div style={{ fontSize:15, fontWeight:700, color }}>{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Score breakdown */}
            <div style={{ padding:'24px 32px',
              borderBottom:`1px solid rgba(255,255,255,0.06)` }}>
              <div style={{ fontSize:12, fontWeight:600, color:'var(--text-muted)',
                textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:16 }}>
                Score Breakdown
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                {Object.entries(score.breakdown).map(([key, b]) => (
                  <div key={key}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                      <span style={{ fontSize:11, color:'var(--text-secondary)' }}>{b.label}</span>
                      <span style={{ fontSize:11, color:score.color, fontWeight:600 }}>{b.score}/100</span>
                    </div>
                    <div style={{ height:5, background:'rgba(255,255,255,0.06)',
                      borderRadius:3, overflow:'hidden' }}>
                      <div style={{ height:'100%', width:`${b.score}%`,
                        background:score.color, borderRadius:3 }}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div style={{ padding:'16px 32px', display:'flex',
              justifyContent:'space-between', alignItems:'center' }}>
              <div style={{ fontSize:11, color:'var(--text-muted)' }}>
                Generated by <span style={{ color:'#38BDF8', fontWeight:600 }}>PropSight</span> · {new Date().toLocaleDateString('en-AE',{day:'numeric',month:'long',year:'numeric'})}
              </div>
              <div style={{ fontSize:10, color:'var(--text-muted)' }}>
                Data source: Dubai Land Department · propsightae.vercel.app
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        {score && (
          <div className="no-print" style={{ display:'flex', gap:12, marginTop:16 }}>
            <button onClick={handlePrint} style={{
              flex:1, padding:'13px', borderRadius:12, border:'none', cursor:'pointer',
              background:'linear-gradient(135deg,#1D4ED8,#38BDF8)',
              color:'#fff', fontSize:14, fontWeight:600, fontFamily:'system-ui',
              display:'flex', alignItems:'center', justifyContent:'center', gap:8,
            }}>
              🖨️ Print / Save as PDF
            </button>
          </div>
        )}

        {!score && selectedArea && (
          <div style={{ textAlign:'center', padding:40, color:'var(--text-muted)' }}>
            Loading score data...
          </div>
        )}

        {!selectedArea && (
          <div style={{ textAlign:'center', padding:60,
            color:'var(--text-muted)', fontSize:14 }}>
            Select an area above to generate your Investment Score Card
          </div>
        )}
      </div>
    </div>
  );
}
