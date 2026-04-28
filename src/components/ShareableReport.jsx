import { useState } from 'react';
import { fmtAED, fmtNum } from '../utils/format';
import { AreaChart, Area, ResponsiveContainer, Tooltip, CartesianGrid, XAxis, YAxis } from 'recharts';

const AREA_NICE = {'Al Barsha South Fourth':'JVC','Burj Khalifa':'Downtown Dubai','Marsa Dubai':'Dubai Marina','Hadaeq Sheikh Mohammed Bin Rashid':'Dubai Hills','Al Thanyah Fifth':'JLT','Business Bay':'Business Bay','Palm Jumeirah':'Palm Jumeirah','Al Merkadh':'MBR City'};
const niceArea = a => AREA_NICE[a] || a;

export default function ShareableReport({ areaData, core }) {
  const [selectedArea, setSelectedArea] = useState('');
  const [copied, setCopied] = useState(false);
  const [reportUrl, setReportUrl] = useState(null);

  const areas = areaData ? Object.keys(areaData).map(k=>({key:k,label:niceArea(k)})) : [];
  const areaStats = areaData?.[selectedArea];
  const kpis = areaStats?.kpis || {};
  const priceTrend = (areaStats?.priceTrend||[]).map(p=>({year:p.year,ppsqft:Math.round(p.ppsqm/10.764)}));
  const yoy = priceTrend.length>=2 ? ((priceTrend[priceTrend.length-1].ppsqft-priceTrend[priceTrend.length-2].ppsqft)/priceTrend[priceTrend.length-2].ppsqft*100).toFixed(1) : 0;

  const generateReport = () => {
    const reportData = { area:selectedArea, areaDisplay:niceArea(selectedArea), kpis, priceTrend, yoy, generatedAt:new Date().toISOString() };
    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(reportData))));
    setReportUrl(`${window.location.origin}?report=${encoded}`);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(reportUrl);
    setCopied(true);
    setTimeout(()=>setCopied(false), 2000);
  };

  return (
    <div style={{flex:1,overflowY:'auto',background:'#060E1A',fontFamily:'system-ui',padding:'24px 28px'}}>
      <div style={{marginBottom:24}}>
        <h1 style={{margin:0,fontSize:22,fontWeight:700,color:'#F1F5F9',marginBottom:4}}>Shareable Reports</h1>
        <div style={{fontSize:13,color:'#475569'}}>Generate a public link for any area analysis — no login required to view</div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'320px 1fr',gap:20,alignItems:'start'}}>
        <div style={{background:'#0D1929',border:'1px solid rgba(255,255,255,0.06)',borderRadius:14,padding:24}}>
          <div style={{fontSize:14,fontWeight:600,color:'#F1F5F9',marginBottom:16}}>Generate Report</div>
          <div style={{marginBottom:16}}>
            <div style={{fontSize:12,color:'#64748B',marginBottom:6,fontWeight:500}}>Select Area</div>
            <select value={selectedArea} onChange={e=>setSelectedArea(e.target.value)} style={{width:'100%',padding:'10px 12px',borderRadius:8,background:'#070E1B',border:'1px solid rgba(59,130,246,0.15)',color:'#F1F5F9',fontSize:13,outline:'none',fontFamily:'system-ui',cursor:'pointer'}}>
              <option value="">Choose an area...</option>
              {areas.map(a=><option key={a.key} value={a.key}>{a.label}</option>)}
            </select>
          </div>
          {selectedArea && (
            <div style={{background:'rgba(59,130,246,0.06)',border:'1px solid rgba(59,130,246,0.1)',borderRadius:10,padding:14,marginBottom:16}}>
              <div style={{fontSize:11,color:'#64748B',fontWeight:600,marginBottom:8,textTransform:'uppercase',letterSpacing:'0.05em'}}>Report includes</div>
              {['Price trend chart','Transaction volume','Off-plan vs Ready split','YoY growth','Avg deal & price/sqft','Market positioning'].map((f,i)=>(
                <div key={i} style={{display:'flex',alignItems:'center',gap:8,padding:'4px 0',fontSize:12,color:'#94A3B8'}}><span style={{color:'#22C55E'}}>✓</span>{f}</div>
              ))}
            </div>
          )}
          <button onClick={generateReport} disabled={!selectedArea} style={{width:'100%',padding:'12px',borderRadius:10,border:'none',cursor:'pointer',background:'linear-gradient(135deg,#1D4ED8,#38BDF8)',color:'#fff',fontSize:13,fontWeight:600,fontFamily:'system-ui',opacity:!selectedArea?0.5:1}}>
            🔗 Generate Shareable Link
          </button>
          {reportUrl && (
            <div style={{marginTop:14}}>
              <div style={{fontSize:11,color:'#64748B',marginBottom:6}}>Shareable link:</div>
              <div style={{background:'#070E1B',border:'1px solid rgba(59,130,246,0.2)',borderRadius:8,padding:'10px 12px',display:'flex',gap:8,alignItems:'center'}}>
                <div style={{flex:1,fontSize:11,color:'#64748B',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{reportUrl.slice(0,45)}...</div>
                <button onClick={copyLink} style={{flexShrink:0,padding:'4px 10px',borderRadius:6,border:'none',cursor:'pointer',background:copied?'rgba(34,197,94,0.2)':'rgba(59,130,246,0.15)',color:copied?'#22C55E':'#38BDF8',fontSize:11,fontWeight:600,fontFamily:'system-ui'}}>{copied?'✓ Copied':'Copy'}</button>
              </div>
              <div style={{fontSize:11,color:'#475569',marginTop:8}}>Anyone with this link can view — no login needed.</div>
            </div>
          )}
        </div>

        {selectedArea && areaStats ? (
          <div style={{background:'#0D1929',border:'1px solid rgba(255,255,255,0.06)',borderRadius:14,padding:24}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:20}}>
              <div>
                <div style={{fontSize:11,color:'#38BDF8',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:4}}>PropSight Market Report</div>
                <div style={{fontSize:22,fontWeight:800,color:'#F1F5F9'}}>{niceArea(selectedArea)}</div>
                <div style={{fontSize:12,color:'#475569'}}>Dubai, UAE · {new Date().toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'})}</div>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:6,background:'rgba(34,197,94,0.08)',border:'1px solid rgba(34,197,94,0.15)',borderRadius:20,padding:'6px 14px'}}>
                <div style={{width:6,height:6,borderRadius:'50%',background:'#22C55E'}}/>
                <span style={{fontSize:11,fontWeight:600,color:'#22C55E'}}>LIVE DATA</span>
              </div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginBottom:20}}>
              {[['Transactions',fmtNum(kpis.count||0),'#F1F5F9'],['Avg Deal',fmtAED(kpis.avg||0,true),'#38BDF8'],['Price/sqft','AED '+fmtNum(Math.round((kpis.ppsqm||0)/10.764)),'#F1F5F9'],['YoY Growth',`${yoy>0?'+':''}${yoy}%`,yoy>0?'#22C55E':'#F87171']].map(([l,v,c],i)=>(
                <div key={i} style={{background:'rgba(59,130,246,0.06)',border:'1px solid rgba(59,130,246,0.1)',borderRadius:10,padding:14}}>
                  <div style={{fontSize:10,color:'#64748B',marginBottom:6,textTransform:'uppercase',letterSpacing:'0.05em'}}>{l}</div>
                  <div style={{fontSize:18,fontWeight:700,color:c}}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{marginBottom:16}}>
              <div style={{fontSize:12,fontWeight:600,color:'#F1F5F9',marginBottom:12}}>Price per sqft — Historical Trend</div>
              <ResponsiveContainer width="100%" height={160}>
                <AreaChart data={priceTrend} margin={{top:4,right:4,left:0,bottom:0}}>
                  <defs><linearGradient id="rg1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#38BDF8" stopOpacity={0.15}/><stop offset="95%" stopColor="#38BDF8" stopOpacity={0}/></linearGradient></defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)"/>
                  <XAxis dataKey="year" tick={{fontSize:10,fill:'#475569'}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fontSize:10,fill:'#475569'}} axisLine={false} tickLine={false} width={40}/>
                  <Tooltip contentStyle={{background:'#0A1628',border:'1px solid rgba(59,130,246,0.2)',borderRadius:8,color:'#F1F5F9',fontSize:11}} formatter={v=>['AED '+fmtNum(v)+'/sqft','Price']}/>
                  <Area type="monotone" dataKey="ppsqft" stroke="#38BDF8" strokeWidth={2.5} fill="url(#rg1)"/>
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
              {[['Off-Plan',fmtNum(kpis.offPlan||0),'#38BDF8',Math.round((kpis.offPlan||0)/(kpis.count||1)*100)+'%'],['Ready',fmtNum(kpis.ready||0),'#22C55E',Math.round((kpis.ready||0)/(kpis.count||1)*100)+'%']].map(([l,v,c,pct],i)=>(
                <div key={i} style={{background:'rgba(59,130,246,0.04)',border:'1px solid rgba(59,130,246,0.08)',borderRadius:10,padding:14,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div><div style={{fontSize:11,color:'#64748B',marginBottom:4}}>{l}</div><div style={{fontSize:16,fontWeight:700,color:c}}>{v}</div></div>
                  <div style={{fontSize:22,fontWeight:800,color:c,opacity:0.6}}>{pct}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{background:'#0D1929',border:'1px solid rgba(255,255,255,0.06)',borderRadius:14,padding:40,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center'}}>
            <div style={{fontSize:48,marginBottom:16}}>📊</div>
            <div style={{fontSize:16,fontWeight:600,color:'#F1F5F9',marginBottom:8}}>Report Preview</div>
            <div style={{fontSize:13,color:'#475569'}}>Select an area to preview the shareable report</div>
          </div>
        )}
      </div>
    </div>
  );
}
