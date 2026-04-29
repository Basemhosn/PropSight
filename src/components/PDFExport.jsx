import { useState } from 'react';
import { fmtAED, fmtNum } from '../utils/format';

const AREA_NICE = {'Al Barsha South Fourth':'JVC','Burj Khalifa':'Downtown Dubai','Marsa Dubai':'Dubai Marina','Hadaeq Sheikh Mohammed Bin Rashid':'Dubai Hills','Al Thanyah Fifth':'JLT','Business Bay':'Business Bay','Palm Jumeirah':'Palm Jumeirah','Al Merkadh':'MBR City','Al Khairan First':'Creek Harbour'};
const niceArea = a => AREA_NICE[a] || a;

function generateHTML(area, areaKey, kpis, priceTrend, meta) {
  const ppsqft = Math.round((kpis.ppsqm||0)/10.764);
  const yoy = priceTrend?.length>=2 ? ((priceTrend[priceTrend.length-1].ppsqm-priceTrend[priceTrend.length-2].ppsqm)/priceTrend[priceTrend.length-2].ppsqm*100).toFixed(1) : 0;
  const opPct = kpis.count ? Math.round((kpis.offPlan||0)/kpis.count*100) : 0;
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"/>
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family: -apple-system, system-ui, sans-serif; background:#fff; color:#1a1a2e; padding:40px; }
  .header { display:flex; justify-content:space-between; align-items:center; margin-bottom:32px; padding-bottom:20px; border-bottom:2px solid #e2e8f0; }
  .logo { font-size:28px; font-weight:800; color:#1a1a2e; }
  .logo span { color:#0ea5e9; }
  .meta { font-size:12px; color:#94a3b8; text-align:right; }
  .title { font-size:32px; font-weight:800; color:#1a1a2e; margin-bottom:4px; }
  .subtitle { font-size:14px; color:#64748b; margin-bottom:32px; }
  .kpis { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; margin-bottom:32px; }
  .kpi { background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:16px; }
  .kpi-label { font-size:10px; color:#94a3b8; font-weight:600; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:6px; }
  .kpi-value { font-size:22px; font-weight:700; color:#1a1a2e; }
  .kpi-sub { font-size:11px; color:#64748b; margin-top:4px; }
  .section { margin-bottom:28px; }
  .section-title { font-size:16px; font-weight:700; color:#1a1a2e; margin-bottom:14px; padding-bottom:8px; border-bottom:1px solid #e2e8f0; }
  .trend-table { width:100%; border-collapse:collapse; }
  .trend-table th { font-size:11px; color:#94a3b8; font-weight:600; text-transform:uppercase; padding:8px 12px; text-align:left; background:#f8fafc; }
  .trend-table td { font-size:13px; padding:10px 12px; border-bottom:1px solid #f1f5f9; color:#1a1a2e; }
  .badge { display:inline-block; padding:3px 10px; border-radius:20px; font-size:11px; font-weight:600; }
  .badge-blue { background:#dbeafe; color:#1d4ed8; }
  .badge-green { background:#dcfce7; color:#16a34a; }
  .footer { margin-top:40px; padding-top:20px; border-top:1px solid #e2e8f0; display:flex; justify-content:space-between; font-size:11px; color:#94a3b8; }
  .positive { color:#16a34a; } .negative { color:#dc2626; }
</style>
</head>
<body>
<div class="header">
  <div class="logo">Prop<span>Sight</span></div>
  <div class="meta">
    <div>Market Intelligence Report</div>
    <div>Generated: ${new Date().toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'})}</div>
    <div>Data as of: ${meta?.lastUpdated||'2026-04-09'}</div>
  </div>
</div>
<div class="title">${area}</div>
<div class="subtitle">Dubai Real Estate Market Analysis · ${fmtNum(kpis.count||0)} total transactions</div>
<div class="kpis">
  <div class="kpi"><div class="kpi-label">Avg Transaction</div><div class="kpi-value">${fmtAED(kpis.avg||0,true)}</div><div class="kpi-sub">All time average</div></div>
  <div class="kpi"><div class="kpi-label">Price per sqft</div><div class="kpi-value">AED ${fmtNum(ppsqft)}</div><div class="kpi-sub">Current market rate</div></div>
  <div class="kpi"><div class="kpi-label">YoY Growth</div><div class="kpi-value ${yoy>0?'positive':'negative'}">${yoy>0?'+':''}${yoy}%</div><div class="kpi-sub">Year over year</div></div>
  <div class="kpi"><div class="kpi-label">Off-Plan Share</div><div class="kpi-value">${opPct}%</div><div class="kpi-sub">${100-opPct}% ready market</div></div>
</div>
<div class="section">
  <div class="section-title">Price Trend History</div>
  <table class="trend-table">
    <thead><tr><th>Year</th><th>Price/sqm (AED)</th><th>Price/sqft (AED)</th><th>Change</th></tr></thead>
    <tbody>
      ${(priceTrend||[]).map((p,i,arr)=>{
        const prev = arr[i-1];
        const change = prev ? ((p.ppsqm-prev.ppsqm)/prev.ppsqm*100).toFixed(1) : null;
        return `<tr>
          <td>${p.year}</td>
          <td>AED ${fmtNum(p.ppsqm)}</td>
          <td>AED ${fmtNum(Math.round(p.ppsqm/10.764))}</td>
          <td>${change!==null?`<span class="${change>0?'positive':'negative'}">${change>0?'+':''}${change}%</span>`:'—'}</td>
        </tr>`;
      }).join('')}
    </tbody>
  </table>
</div>
<div class="section">
  <div class="section-title">Market Breakdown</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
    <div style="background:#f8fafc;border-radius:12px;padding:16px;">
      <div style="font-size:12px;color:#94a3b8;margin-bottom:10px;font-weight:600;">TRANSACTION TYPE</div>
      <div style="display:flex;justify-content:space-between;margin-bottom:6px;"><span style="font-size:13px;color:#1a1a2e;">Off-Plan</span><span class="badge badge-blue">${fmtNum(kpis.offPlan||0)} (${opPct}%)</span></div>
      <div style="display:flex;justify-content:space-between;"><span style="font-size:13px;color:#1a1a2e;">Ready</span><span class="badge badge-green">${fmtNum(kpis.ready||0)} (${100-opPct}%)</span></div>
    </div>
    <div style="background:#f8fafc;border-radius:12px;padding:16px;">
      <div style="font-size:12px;color:#94a3b8;margin-bottom:10px;font-weight:600;">MARKET SUMMARY</div>
      <div style="font-size:13px;color:#1a1a2e;line-height:1.6;">${area} shows ${yoy>5?'strong':'moderate'} price growth of ${yoy}% YoY. The market is ${opPct>50?'primarily off-plan driven':'ready property dominated'} with ${fmtNum(kpis.count||0)} total transactions recorded.</div>
    </div>
  </div>
</div>
<div class="footer">
  <div>PropSight · propsightae.vercel.app · Dubai Real Estate Intelligence</div>
  <div>Data source: Dubai Land Department (DLD) · Confidential</div>
</div>
</body></html>`;
}

export default function PDFExport({ areaData, core }) {
  const [selectedArea, setSelectedArea] = useState('');
  const [generating, setGenerating] = useState(false);

  const areas = areaData ? Object.keys(areaData).map(k=>({key:k,label:niceArea(k)})) : [];

  const generatePDF = () => {
    if (!selectedArea) return;
    setGenerating(true);
    const kpis = areaData[selectedArea]?.kpis || {};
    const priceTrend = areaData[selectedArea]?.priceTrend || [];
    const html = generateHTML(niceArea(selectedArea), selectedArea, kpis, priceTrend, core?.meta);
    const win = window.open('', '_blank');
    win.document.write(html);
    win.document.close();
    setTimeout(() => { win.print(); setGenerating(false); }, 500);
  };

  const inp = {background:'var(--bg-alt)',border:'1px solid rgba(59,130,246,0.15)',borderRadius:8,color:'var(--text-primary)',fontSize:13,padding:'10px 12px',outline:'none',fontFamily:'system-ui',width:'100%',boxSizing:'border-box'};

  return (
    <div style={{flex:1,overflowY:'auto',background:'var(--bg)',fontFamily:'system-ui',padding:'24px 28px'}}>
      <div style={{marginBottom:24}}>
        <h1 style={{margin:0,fontSize:22,fontWeight:700,color:'var(--text-primary)',marginBottom:4}}>PDF Export</h1>
        <div style={{fontSize:13,color:'#475569'}}>Generate branded market intelligence reports — print or save as PDF</div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'320px 1fr',gap:20,alignItems:'start'}}>
        <div style={{background:'var(--surface)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:14,padding:24}}>
          <div style={{fontSize:14,fontWeight:600,color:'var(--text-primary)',marginBottom:16}}>Generate Report</div>
          <div style={{marginBottom:16}}>
            <label style={{fontSize:12,color:'var(--text-muted)',marginBottom:6,display:'block',fontWeight:500}}>Select Area</label>
            <select value={selectedArea} onChange={e=>setSelectedArea(e.target.value)} style={{...inp,cursor:'pointer'}}>
              <option value="">Choose an area...</option>
              {areas.map(a=><option key={a.key} value={a.key}>{a.label}</option>)}
            </select>
          </div>
          {selectedArea && (
            <div style={{background:'rgba(59,130,246,0.06)',border:'1px solid rgba(59,130,246,0.1)',borderRadius:10,padding:14,marginBottom:16}}>
              <div style={{fontSize:11,color:'var(--text-muted)',fontWeight:600,marginBottom:8,textTransform:'uppercase',letterSpacing:'0.05em'}}>Report includes</div>
              {['Price trend chart & history','Transaction volume breakdown','Off-plan vs Ready split','YoY growth analysis','Market summary & insights','PropSight branding'].map((f,i)=>(
                <div key={i} style={{display:'flex',alignItems:'center',gap:8,padding:'3px 0',fontSize:12,color:'var(--text-secondary)'}}><span style={{color:'#22C55E'}}>✓</span>{f}</div>
              ))}
            </div>
          )}
          <button onClick={generatePDF} disabled={!selectedArea||generating} style={{width:'100%',padding:'12px',borderRadius:10,border:'none',cursor:'pointer',background:'linear-gradient(135deg,#1D4ED8,#38BDF8)',color:'#fff',fontSize:13,fontWeight:600,fontFamily:'system-ui',opacity:!selectedArea||generating?0.5:1}}>
            {generating?'Opening preview...':'🖨️ Generate PDF Report'}
          </button>
          <div style={{fontSize:11,color:'#475569',marginTop:10,textAlign:'center'}}>Opens print dialog — save as PDF or print directly</div>
        </div>
        <div style={{background:'var(--surface)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:14,overflow:'hidden'}}>
          <div style={{padding:'16px 20px',borderBottom:'1px solid rgba(255,255,255,0.06)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div style={{fontSize:13,fontWeight:600,color:'var(--text-primary)'}}>Report Preview</div>
            {selectedArea && <span style={{fontSize:11,color:'#38BDF8',fontWeight:600}}>{niceArea(selectedArea)}</span>}
          </div>
          <div style={{padding:24}}>
            {!selectedArea ? (
              <div style={{textAlign:'center',padding:40}}>
                <div style={{fontSize:48,marginBottom:16}}>📄</div>
                <div style={{fontSize:15,fontWeight:600,color:'var(--text-primary)',marginBottom:8}}>Select an area to preview</div>
                <div style={{fontSize:13,color:'#475569'}}>Professional branded report ready to print or share</div>
              </div>
            ) : (()=>{
              const kpis = areaData[selectedArea]?.kpis||{};
              const priceTrend = areaData[selectedArea]?.priceTrend||[];
              const ppsqft = Math.round((kpis.ppsqm||0)/10.764);
              const yoy = priceTrend.length>=2?((priceTrend[priceTrend.length-1].ppsqm-priceTrend[priceTrend.length-2].ppsqm)/priceTrend[priceTrend.length-2].ppsqm*100).toFixed(1):0;
              const opPct = kpis.count?Math.round((kpis.offPlan||0)/kpis.count*100):0;
              return (
                <div style={{background:'#fff',borderRadius:10,padding:24,color:'#1a1a2e',fontFamily:'system-ui'}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20,paddingBottom:16,borderBottom:'2px solid #e2e8f0'}}>
                    <div style={{fontSize:20,fontWeight:800,color:'#1a1a2e'}}>Prop<span style={{color:'#0ea5e9'}}>Sight</span></div>
                    <div style={{fontSize:11,color:'#94a3b8',textAlign:'right'}}><div>Market Intelligence Report</div><div>{new Date().toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'})}</div></div>
                  </div>
                  <div style={{fontSize:22,fontWeight:800,color:'#1a1a2e',marginBottom:4}}>{niceArea(selectedArea)}</div>
                  <div style={{fontSize:12,color:'#64748b',marginBottom:20}}>Dubai Real Estate · {fmtNum(kpis.count||0)} transactions</div>
                  <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10,marginBottom:20}}>
                    {[['Avg Deal',fmtAED(kpis.avg||0,true)],['Price/sqft','AED '+fmtNum(ppsqft)],['YoY Growth',(yoy>0?'+':'')+yoy+'%'],['Off-Plan',opPct+'%']].map(([l,v],i)=>(
                      <div key={i} style={{background:'#f8fafc',border:'1px solid #e2e8f0',borderRadius:8,padding:10}}>
                        <div style={{fontSize:9,color:'#94a3b8',fontWeight:600,textTransform:'uppercase',marginBottom:4}}>{l}</div>
                        <div style={{fontSize:14,fontWeight:700,color:'#1a1a2e'}}>{v}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{fontSize:12,color:'#94a3b8',textAlign:'center',padding:'12px 0',borderTop:'1px solid #e2e8f0'}}>PropSight · propsightae.vercel.app · Confidential</div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}
