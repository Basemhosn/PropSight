import { useState, useEffect } from 'react';
import { fmtAED, fmtNum } from '../utils/format';
import { AreaChart, Area, ResponsiveContainer, Tooltip, CartesianGrid, XAxis, YAxis } from 'recharts';

const AREA_NICE = {'Al Barsha South Fourth':'JVC','Burj Khalifa':'Downtown Dubai','Marsa Dubai':'Dubai Marina','Hadaeq Sheikh Mohammed Bin Rashid':'Dubai Hills','Al Thanyah Fifth':'JLT','Business Bay':'Business Bay','Palm Jumeirah':'Palm Jumeirah','Al Merkadh':'MBR City'};
const niceArea = a => AREA_NICE[a] || a;

export default function MarketPulse({ onAreaClick, core, areaData }) {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  const allSlice = core?.slices?.all || {};
  const monthly = (allSlice.monthly||[]).slice(-8).map(m=>({month:m.month?.slice(0,7),count:m.count}));
  const priceTrend = (core?.priceTrend||[]).map(p=>({year:p.year,ppsqft:Math.round(p.ppsqm/10.764)}));
  const topAreas = areaData ? Object.entries(areaData).map(([k,d])=>({name:niceArea(k),count:d.kpis?.count||0,ppsqft:Math.round((d.kpis?.ppsqm||0)/10.764),yoy:(()=>{const pt=d.priceTrend||[];return pt.length>=2?+((pt[pt.length-1].ppsqm-pt[pt.length-2].ppsqm)/pt[pt.length-2].ppsqm*100).toFixed(1):0;})()})).sort((a,b)=>b.count-a.count).slice(0,5) : [];

  useEffect(() => { if (core && areaData) generateSummary(); }, [core, areaData]);

  const generateSummary = async () => {
    setLoading(true);
    try {
      const totalTxns = allSlice.count||0;
      const opPct = totalTxns ? Math.round((core?.slices?.['r:Off-Plan']?.count||0)/totalTxns*100) : 0;
      const latestPpsqft = priceTrend[priceTrend.length-1]?.ppsqft||0;
      const prevPpsqft = priceTrend[priceTrend.length-2]?.ppsqft||0;
      const yoy = prevPpsqft ? ((latestPpsqft-prevPpsqft)/prevPpsqft*100).toFixed(1) : 0;
      const res = await fetch('/api/claude', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          model:'claude-sonnet-4-5', max_tokens:1200,
          messages:[{role:'user',content:`You are a Dubai real estate market analyst. Generate a weekly market pulse report.

Data: ${fmtNum(totalTxns)} total transactions, AED ${fmtAED(allSlice.total||0,true)} market value, ${opPct}% off-plan, ${yoy}% YoY price growth, AED ${fmtNum(latestPpsqft)}/sqft avg.
Top areas: ${topAreas.map(a=>`${a.name} (${fmtNum(a.count)} txns, ${a.yoy>0?'+':''}${a.yoy}% YoY)`).join(', ')}

Respond ONLY with JSON (no markdown):
{"headline":"<one-line market summary>","sentiment":"bullish"|"neutral"|"bearish","sentimentScore":<1-10>,"weekSummary":"<3-4 sentence overview>","keyInsights":[{"title":"<title>","body":"<2 sentences>","trend":"up"|"down"|"neutral"},{"title":"<title>","body":"<2 sentences>","trend":"up"|"down"|"neutral"},{"title":"<title>","body":"<2 sentences>","trend":"up"|"down"|"neutral"}],"hotArea":{"name":"<area>","reason":"<1 sentence>"},"watchOut":"<1 risk>","outlook":"<1 sentence forward look>"}`}]
        })
      });
      const data = await res.json();
      const parsed = JSON.parse(data.content?.[0]?.text?.replace(/```json|```/g,'').trim()||'{}');
      setSummary(parsed);
    } catch(e) { setSummary(null); }
    setLoading(false);
  };

  const SS = {bullish:{color:'#22C55E',bg:'rgba(34,197,94,0.1)',border:'rgba(34,197,94,0.2)',icon:'📈'},neutral:{color:'#F59E0B',bg:'rgba(245,158,11,0.1)',border:'rgba(245,158,11,0.2)',icon:'➡️'},bearish:{color:'#F87171',bg:'rgba(248,113,113,0.1)',border:'rgba(248,113,113,0.2)',icon:'📉'}};
  const TI = {up:'↑',down:'↓',neutral:'→'};
  const TC = {up:'#22C55E',down:'#F87171',neutral:'#F59E0B'};

  return (
    <div style={{flex:1,overflowY:'auto',background:'var(--bg)',fontFamily:'system-ui',padding:'28px'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:24}}>
        <div>
          <h1 style={{margin:0,fontSize:22,fontWeight:700,color:'var(--text-primary)',marginBottom:4}}>Market <span style={{color:'#38BDF8'}}>Pulse</span></h1>
          <div style={{fontSize:13,color:'#475569'}}>Weekly Dubai real estate intelligence — AI powered</div>
        </div>
        <button onClick={generateSummary} disabled={loading} style={{padding:'9px 16px',borderRadius:10,border:'1px solid rgba(59,130,246,0.2)',background:'rgba(59,130,246,0.06)',color:'#38BDF8',cursor:'pointer',fontSize:12,fontWeight:600,fontFamily:'system-ui',opacity:loading?0.5:1}}>🔄 Refresh</button>
      </div>

      {loading ? (
        <div style={{textAlign:'center',padding:80,display:'flex',flexDirection:'column',alignItems:'center',gap:16}}>
          <div style={{width:48,height:48,border:'3px solid rgba(59,130,246,0.2)',borderTopColor:'#38BDF8',borderRadius:'50%',animation:'spin 0.8s linear infinite'}}/>
          <div style={{fontSize:14,color:'var(--text-muted)'}}>Generating AI market analysis...</div>
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </div>
      ) : <>
        {summary && (()=>{
          const ss = SS[summary.sentiment]||SS.neutral;
          return <>
            <div style={{background:`linear-gradient(135deg,${ss.bg},rgba(6,14,26,0.5))`,border:`1px solid ${ss.border}`,borderRadius:16,padding:24,marginBottom:24}}>
              <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}>
                <span style={{fontSize:24}}>{ss.icon}</span>
                <span style={{fontSize:13,fontWeight:700,color:ss.color,textTransform:'uppercase',letterSpacing:'0.08em'}}>{summary.sentiment} MARKET</span>
                <span style={{fontSize:12,color:ss.color,fontWeight:600}}>Score: {summary.sentimentScore}/10</span>
              </div>
              <div style={{fontSize:20,fontWeight:700,color:'var(--text-primary)',marginBottom:10,lineHeight:1.3}}>{summary.headline}</div>
              <div style={{fontSize:13,color:'var(--text-secondary)',lineHeight:1.6,marginBottom:12}}>{summary.weekSummary}</div>
              {summary.watchOut && <div style={{display:'flex',alignItems:'center',gap:8,background:'rgba(245,158,11,0.08)',border:'1px solid rgba(245,158,11,0.15)',borderRadius:8,padding:'10px 14px'}}>
                <span style={{fontSize:16}}>⚠️</span><span style={{fontSize:12,color:'#F59E0B'}}><strong>Watch:</strong> {summary.watchOut}</span>
              </div>}
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:14,marginBottom:24}}>
              {summary.keyInsights?.map((ins,i)=>(
                <div key={i} style={{background:'var(--surface)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:14,padding:18}}>
                  <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:10}}>
                    <span style={{fontSize:18,color:TC[ins.trend],fontWeight:700}}>{TI[ins.trend]}</span>
                    <span style={{fontSize:12,fontWeight:700,color:'var(--text-primary)'}}>{ins.title}</span>
                  </div>
                  <div style={{fontSize:12,color:'var(--text-muted)',lineHeight:1.6}}>{ins.body}</div>
                </div>
              ))}
            </div>
          </>;
        })()}

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))',gap:12,marginBottom:24}}>
          {[['Total Transactions',fmtNum(allSlice.count||0),'var(--text-primary)'],['Market Value',fmtAED(allSlice.total||0,true),'#38BDF8'],['Avg Deal',fmtAED(allSlice.count?Math.round(allSlice.total/allSlice.count):0,true),'var(--text-primary)'],['Price/sqft','AED '+fmtNum(priceTrend[priceTrend.length-1]?.ppsqft||0),'#22C55E']].map(([l,v,c],i)=>(
            <div key={i} style={{background:'var(--surface)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:12,padding:'16px 18px'}}>
              <div style={{fontSize:11,color:'var(--text-muted)',marginBottom:8,textTransform:'uppercase',letterSpacing:'0.05em'}}>{l}</div>
              <div style={{fontSize:20,fontWeight:700,color:c}}>{v}</div>
            </div>
          ))}
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:24}}>
          <div style={{background:'var(--surface)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:14,padding:20}}>
            <div style={{fontSize:13,fontWeight:600,color:'var(--text-primary)',marginBottom:14}}>Monthly Volume</div>
            <ResponsiveContainer width="100%" height={160}>
              <AreaChart data={monthly} margin={{top:4,right:4,left:0,bottom:0}}>
                <defs><linearGradient id="mpg1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#38BDF8" stopOpacity={0.15}/><stop offset="95%" stopColor="#38BDF8" stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)"/>
                <XAxis dataKey="month" tick={{fontSize:9,fill:'#475569'}} axisLine={false} tickLine={false}/>
                <YAxis hide/>
                <Tooltip contentStyle={{background:'#0A1628',border:'1px solid rgba(59,130,246,0.2)',borderRadius:8,color:'var(--text-primary)',fontSize:11}} formatter={v=>[fmtNum(v),'Transactions']}/>
                <Area type="monotone" dataKey="count" stroke="#38BDF8" strokeWidth={2.5} fill="url(#mpg1)"/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div style={{background:'var(--surface)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:14,padding:20}}>
            <div style={{fontSize:13,fontWeight:600,color:'var(--text-primary)',marginBottom:14}}>Price / sqft Trend</div>
            <ResponsiveContainer width="100%" height={160}>
              <AreaChart data={priceTrend} margin={{top:4,right:4,left:0,bottom:0}}>
                <defs><linearGradient id="mpg2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22C55E" stopOpacity={0.15}/><stop offset="95%" stopColor="#22C55E" stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)"/>
                <XAxis dataKey="year" tick={{fontSize:9,fill:'#475569'}} axisLine={false} tickLine={false}/>
                <YAxis hide/>
                <Tooltip contentStyle={{background:'#0A1628',border:'1px solid rgba(59,130,246,0.2)',borderRadius:8,color:'var(--text-primary)',fontSize:11}} formatter={v=>['AED '+fmtNum(v)+'/sqft','Price']}/>
                <Area type="monotone" dataKey="ppsqft" stroke="#22C55E" strokeWidth={2.5} fill="url(#mpg2)"/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{background:'var(--surface)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:14,overflow:'hidden',marginBottom:24}}>
          <div style={{padding:'16px 20px',borderBottom:'1px solid rgba(255,255,255,0.06)'}}><div style={{fontSize:14,fontWeight:600,color:'var(--text-primary)'}}>🔥 Top Areas This Week</div></div>
          {topAreas.map((area,i)=>(
            <div key={area.name} onClick={()=>onAreaClick&&onAreaClick(area.name)} style={{padding:'14px 20px',borderBottom:i<topAreas.length-1?'1px solid rgba(255,255,255,0.04)':'none',display:'flex',justifyContent:'space-between',alignItems:'center',cursor:'pointer'}}
              onMouseEnter={e=>e.currentTarget.style.background='rgba(59,130,246,0.04)'}
              onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
              <div style={{display:'flex',alignItems:'center',gap:12}}>
                <div style={{width:28,height:28,borderRadius:8,background:'rgba(59,130,246,0.1)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:700,color:'#38BDF8'}}>#{i+1}</div>
                <div>
                  <div style={{fontSize:13,fontWeight:600,color:'var(--text-primary)'}}>{area.name}</div>
                  <div style={{fontSize:11,color:'#475569'}}>{fmtNum(area.count)} transactions · AED {fmtNum(area.ppsqft)}/sqft</div>
                </div>
              </div>
              <span style={{fontSize:12,fontWeight:700,padding:'4px 10px',borderRadius:20,background:area.yoy>0?'rgba(34,197,94,0.1)':'rgba(248,113,113,0.1)',color:area.yoy>0?'#22C55E':'#F87171',border:`1px solid ${area.yoy>0?'rgba(34,197,94,0.2)':'rgba(248,113,113,0.2)'}`}}>{area.yoy>0?'+':''}{area.yoy}% YoY</span>
          </div>
          ))}
        </div>

        {summary?.outlook && (
          <div style={{background:'linear-gradient(135deg,rgba(29,78,216,0.1),rgba(56,189,248,0.05))',border:'1px solid rgba(59,130,246,0.2)',borderRadius:14,padding:20,textAlign:'center'}}>
            <div style={{fontSize:11,color:'#38BDF8',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:8}}>AI OUTLOOK</div>
            <div style={{fontSize:15,color:'var(--text-primary)',lineHeight:1.6,fontStyle:'italic'}}>"{summary.outlook}"</div>
          </div>
        )}
      </>}
    </div>
  );
}
