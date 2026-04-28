import { useState, useMemo } from 'react';
import { fmtAED, fmtNum } from '../utils/format';

const AREA_NICE = {'Al Barsha South Fourth':'JVC','Burj Khalifa':'Downtown Dubai','Marsa Dubai':'Dubai Marina','Hadaeq Sheikh Mohammed Bin Rashid':'Dubai Hills','Al Thanyah Fifth':'JLT','Business Bay':'Business Bay','Palm Jumeirah':'Palm Jumeirah','Al Merkadh':'MBR City','Al Khairan First':'Creek Harbour'};
const niceArea = a => AREA_NICE[a] || a;
const TYPE_COLOR = {Sale:{bg:'rgba(59,130,246,0.1)',color:'#38BDF8'},Mortgage:{bg:'rgba(34,197,94,0.1)',color:'#22C55E'},Gift:{bg:'rgba(245,158,11,0.1)',color:'#F59E0B'}};

export default function LiveFeed({ recentRaw }) {
  const [filter, setFilter] = useState('all');
  const [areaFilter, setAreaFilter] = useState('');
  const [minVal, setMinVal] = useState('');
  const [visibleCount, setVisibleCount] = useState(50);

  const areas = useMemo(() => {
    if (!recentRaw?.length) return [];
    return [...new Set(recentRaw.map(r=>r.a||'').filter(Boolean))].sort();
  }, [recentRaw]);

  const rows = useMemo(() => {
    if (!recentRaw?.length) return [];
    let r = [...recentRaw].sort((a,b)=>(b.d||'').localeCompare(a.d||''));
    if (filter !== 'all') r = r.filter(x=>(x.t||'Sale')===filter);
    if (areaFilter) r = r.filter(x=>(x.a||'')===areaFilter);
    if (minVal) r = r.filter(x=>(x.v||0)>=parseFloat(minVal)*1e6);
    return r;
  }, [recentRaw, filter, areaFilter, minVal]);

  const stats = useMemo(() => {
    if (!rows.length) return null;
    const today = rows.filter(r=>r.d===rows[0]?.d);
    return {
      todayCount: today.length,
      todayValue: today.reduce((s,r)=>s+(r.v||0),0),
      totalShown: rows.slice(0,100).reduce((s,r)=>s+(r.v||0),0),
      avg: rows.length ? rows.slice(0,100).reduce((s,r)=>s+(r.v||0),0)/Math.min(rows.length,100) : 0,
    };
  }, [rows]);

  const inp = {background:'#070E1B',border:'1px solid rgba(59,130,246,0.15)',borderRadius:8,color:'#F1F5F9',fontSize:12,padding:'7px 10px',outline:'none',fontFamily:'system-ui'};

  return (
    <div style={{flex:1,display:'flex',flexDirection:'column',background:'#060E1A',fontFamily:'system-ui'}}>
      <div style={{padding:'20px 28px',borderBottom:'1px solid rgba(59,130,246,0.08)'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
          <div>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:4}}>
              <h1 style={{margin:0,fontSize:22,fontWeight:700,color:'#F1F5F9'}}>Live DLD Feed</h1>
              <div style={{display:'flex',alignItems:'center',gap:6,background:'rgba(34,197,94,0.08)',border:'1px solid rgba(34,197,94,0.15)',borderRadius:20,padding:'4px 12px'}}>
                <div style={{width:6,height:6,borderRadius:'50%',background:'#22C55E',boxShadow:'0 0 6px #22C55E'}}/>
                <span style={{fontSize:11,fontWeight:600,color:'#22C55E'}}>LIVE</span>
              </div>
            </div>
            <div style={{fontSize:13,color:'#475569'}}>{fmtNum(rows.length)} transactions · latest: {rows[0]?.d||'—'}</div>
          </div>
        </div>
        {stats && (
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginBottom:16}}>
            {[["Today's Txns",fmtNum(stats.todayCount),'#F1F5F9'],["Today's Value",fmtAED(stats.todayValue,true),'#38BDF8'],['Feed Value',fmtAED(stats.totalShown,true),'#F1F5F9'],['Avg Deal',fmtAED(stats.avg,true),'#22C55E']].map(([l,v,c],i)=>(
              <div key={i} style={{background:'#0D1929',border:'1px solid rgba(255,255,255,0.06)',borderRadius:10,padding:'10px 14px'}}>
                <div style={{fontSize:10,color:'#64748B',marginBottom:4,textTransform:'uppercase',letterSpacing:'0.05em'}}>{l}</div>
                <div style={{fontSize:15,fontWeight:700,color:c}}>{v}</div>
              </div>
            ))}
          </div>
        )}
        <div style={{display:'flex',gap:8,flexWrap:'wrap',alignItems:'center'}}>
          <div style={{display:'flex',gap:6}}>
            {['all','Sale','Mortgage','Gift'].map(f=>(
              <button key={f} onClick={()=>setFilter(f)} style={{padding:'6px 14px',borderRadius:20,border:'none',cursor:'pointer',fontSize:11,fontWeight:filter===f?600:400,fontFamily:'system-ui',background:filter===f?'linear-gradient(135deg,#1D4ED8,#38BDF8)':'rgba(59,130,246,0.06)',color:filter===f?'#fff':'#64748B'}}>{f==='all'?'All':f}</button>
            ))}
          </div>
          <select value={areaFilter} onChange={e=>setAreaFilter(e.target.value)} style={{...inp,cursor:'pointer'}}>
            <option value="">All areas</option>
            {areas.map(a=><option key={a} value={a}>{niceArea(a)}</option>)}
          </select>
          <input value={minVal} onChange={e=>setMinVal(e.target.value)} placeholder="Min (M AED)" style={{...inp,width:110}}/>
          {(areaFilter||minVal||filter!=='all') && <button onClick={()=>{setFilter('all');setAreaFilter('');setMinVal('');}} style={{background:'none',border:'none',cursor:'pointer',color:'#F87171',fontSize:12,fontFamily:'system-ui'}}>× Clear</button>}
        </div>
      </div>

      <div style={{flex:1,overflowY:'auto'}}>
        {rows.length===0 ? <div style={{textAlign:'center',padding:60,color:'#475569'}}>No transactions match your filters</div> : <>
          <div style={{display:'grid',gridTemplateColumns:'90px 1fr 90px 70px 70px 80px 75px',padding:'10px 28px',borderBottom:'1px solid rgba(59,130,246,0.06)',background:'rgba(59,130,246,0.02)',position:'sticky',top:0,zIndex:10}}>
            {['Date','Project / Area','Value','Reg','Type','Size','Price/sqft'].map((h,i)=><div key={i} style={{fontSize:10,color:'#475569',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.05em'}}>{h}</div>)}
          </div>
          {rows.slice(0,visibleCount).map((r,i)=>{
            const tc=TYPE_COLOR[r.t||'Sale']||TYPE_COLOR.Sale;
            const ppsqft=r.s&&r.v?Math.round(r.v/r.s/10.764):0;
            const isNew=i<5;
            return (
              <div key={r.n||i} style={{display:'grid',gridTemplateColumns:'90px 1fr 90px 70px 70px 80px 75px',padding:'11px 28px',borderBottom:'1px solid rgba(255,255,255,0.03)',background:isNew?'rgba(59,130,246,0.03)':'transparent'}}
                onMouseEnter={e=>e.currentTarget.style.background='rgba(59,130,246,0.05)'}
                onMouseLeave={e=>e.currentTarget.style.background=isNew?'rgba(59,130,246,0.03)':'transparent'}>
                <div style={{fontSize:11,color:'#64748B',display:'flex',alignItems:'center',gap:5}}>
                  {isNew&&<div style={{width:5,height:5,borderRadius:'50%',background:'#22C55E',flexShrink:0}}/>}{r.d||'—'}
                </div>
                <div style={{minWidth:0,paddingRight:8}}>
                  <div style={{fontSize:12,fontWeight:600,color:'#F1F5F9',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{r.j||'—'}</div>
                  <div style={{fontSize:10,color:'#475569'}}>{niceArea(r.a||'')} {r.b?'· '+r.b:''}</div>
                </div>
                <div style={{fontSize:12,fontWeight:700,color:'#F1F5F9'}}>{r.v?fmtAED(r.v,true):'—'}</div>
                <div><span style={{fontSize:9,fontWeight:600,padding:'2px 5px',borderRadius:20,background:r.r==='Off'?'rgba(59,130,246,0.1)':'rgba(34,197,94,0.1)',color:r.r==='Off'?'#38BDF8':'#22C55E'}}>{r.r==='Off'?'Off-Plan':'Ready'}</span></div>
                <div><span style={{fontSize:9,fontWeight:600,padding:'2px 5px',borderRadius:20,background:tc.bg,color:tc.color}}>{r.t||'Sale'}</span></div>
                <div style={{fontSize:11,color:'#64748B'}}>{r.s?fmtNum(Math.round(r.s*10.764))+' sqft':'—'}</div>
                <div style={{fontSize:11,color:'#38BDF8'}}>{ppsqft?'AED '+fmtNum(ppsqft):'—'}</div>
              </div>
            );
          })}
          {visibleCount<rows.length && (
            <div style={{textAlign:'center',padding:20}}>
              <button onClick={()=>setVisibleCount(c=>c+50)} style={{padding:'10px 24px',borderRadius:10,border:'1px solid rgba(59,130,246,0.2)',background:'rgba(59,130,246,0.06)',color:'#64748B',cursor:'pointer',fontSize:13,fontFamily:'system-ui'}}>Load more ({fmtNum(rows.length-visibleCount)} remaining)</button>
            </div>
          )}
        </>}
      </div>
    </div>
  );
}
