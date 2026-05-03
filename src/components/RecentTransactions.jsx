import { useState, useMemo } from 'react';
import { t } from '../i18n';
import { fmtAED, fmtNum } from '../utils/format';

const AN = {'Al Barsha South Fourth':'JVC','Burj Khalifa':'Downtown Dubai','Marsa Dubai':'Dubai Marina','Hadaeq Sheikh Mohammed Bin Rashid':'Dubai Hills','Al Thanyah Fifth':'JLT','Business Bay':'Business Bay','Palm Jumeirah':'Palm Jumeirah','Al Merkadh':'MBR City','Al Khairan First':'Creek Harbour'};
const na = a => AN[a] || a;
const TC = {Sale:{bg:'rgba(59,130,246,0.1)',color:'#38BDF8'},Mortgage:{bg:'rgba(34,197,94,0.1)',color:'#22C55E'},Gift:{bg:'rgba(245,158,11,0.1)',color:'#F59E0B'}};

function LiveFeedTab({ recentRaw }) {
  const lang = localStorage.getItem('lang') || 'en';
  const [filter, setFilter] = useState('all');
  const [areaFilter, setAreaFilter] = useState('');
  const [minVal, setMinVal] = useState('');
  const [visibleCount, setVisibleCount] = useState(50);
  const areas = useMemo(()=>[...new Set((recentRaw||[]).map(r=>r.a||'').filter(Boolean))].sort(),[recentRaw]);
  const rows = useMemo(()=>{
    if(!recentRaw?.length) return [];
    let r=[...recentRaw].sort((a,b)=>(b.d||'').localeCompare(a.d||''));
    if(filter!=='all') r=r.filter(x=>(x.t||t('Sale',lang))===filter);
    if(areaFilter) r=r.filter(x=>(x.a||'')===areaFilter);
    if(minVal) r=r.filter(x=>(x.v||0)>=parseFloat(minVal)*1e6);
    return r;
  },[recentRaw,filter,areaFilter,minVal]);
  const stats = useMemo(()=>{
    if(!rows.length) return null;
    const today=rows.filter(r=>r.d===rows[0]?.d);
    return {todayCount:today.length,todayValue:today.reduce((s,r)=>s+(r.v||0),0),avg:rows.slice(0,100).reduce((s,r)=>s+(r.v||0),0)/Math.min(rows.length,100)};
  },[rows]);
  const inp={background:'var(--bg-alt)',border:'1px solid rgba(59,130,246,0.15)',borderRadius:8,color:'var(--text-primary)',fontSize:12,padding:'7px 10px',outline:'none',fontFamily:'system-ui'};
  return (
    <div>
      {stats && (
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,marginBottom:16}}>
          {[["Today's Txns",fmtNum(stats.todayCount),'var(--text-primary)'],["Today's Value",fmtAED(stats.todayValue,true),'#38BDF8'],['Avg Deal',fmtAED(stats.avg,true),'#22C55E']].map(([l,v,c],i)=>(
            <div key={i} style={{background:'var(--surface)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:10,padding:'12px 16px'}}>
              <div style={{fontSize:10,color:'var(--text-muted)',marginBottom:4,textTransform:'uppercase',letterSpacing:'0.05em'}}>{l}</div>
              <div style={{fontSize:16,fontWeight:700,color:c}}>{v}</div>
            </div>
          ))}
        </div>
      )}
      <div style={{display:'flex',gap:8,flexWrap:'wrap',alignItems:'center',marginBottom:14}}>
        <div style={{display:'flex',gap:6}}>
          {['all',t('Sale',lang),t('Mortgage',lang),t('Gift',lang)].map(f=>(
            <button key={f} onClick={()=>setFilter(f)} style={{padding:'6px 12px',borderRadius:20,border:'none',cursor:'pointer',fontSize:11,fontWeight:filter===f?600:400,fontFamily:'system-ui',background:filter===f?'linear-gradient(135deg,#1D4ED8,#38BDF8)':'rgba(59,130,246,0.06)',color:filter===f?'#fff':'var(--text-muted)'}}>{f==='all'?'All':f}</button>
          ))}
        </div>
        <select value={areaFilter} onChange={e=>setAreaFilter(e.target.value)} style={{...inp,cursor:'pointer'}}>
          <option value="">{t('All areas',lang)}</option>
          {areas.map(a=><option key={a} value={a}>{na(a)}</option>)}
        </select>
        <input value={minVal} onChange={e=>setMinVal(e.target.value)} placeholder="Min (M AED)" style={{...inp,width:110}}/>
        {(areaFilter||minVal||filter!=='all') && <button onClick={()=>{setFilter('all');setAreaFilter('');setMinVal('');}} style={{background:'none',border:'none',cursor:'pointer',color:'#F87171',fontSize:12,fontFamily:'system-ui'}}>× Clear</button>}
      </div>
      <div style={{background:'var(--surface)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:14,overflow:'hidden'}}>
        <div style={{display:'grid',gridTemplateColumns:'90px 1fr 90px 70px 70px 80px 75px',padding:'10px 20px',borderBottom:'1px solid rgba(59,130,246,0.06)',background:'rgba(59,130,246,0.02)'}}>
          {['Date','Project / Area','Value','Reg','Type','Size','AED/sqft'].map((h,i)=><div key={i} style={{fontSize:10,color:'var(--text-secondary)',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.05em'}}>{h}</div>)}
        </div>
        {rows.slice(0,visibleCount).map((r,i)=>{
          const tc=TC[r.t||t('Sale',lang)]||TC.Sale;
          const ppsqft=r.s&&r.v?Math.round(r.v/r.s/10.764):0;
          return (
            <div key={r.n||i} style={{display:'grid',gridTemplateColumns:'90px 1fr 90px 70px 70px 80px 75px',padding:'11px 20px',borderBottom:i<Math.min(rows.length,visibleCount)-1?'1px solid rgba(255,255,255,0.03)':'none'}}
              onMouseEnter={e=>e.currentTarget.style.background='rgba(59,130,246,0.05)'}
              onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
              <div style={{fontSize:11,color:'var(--text-muted)',display:'flex',alignItems:'center',gap:5}}>
                {i<5&&<div style={{width:5,height:5,borderRadius:'50%',background:'#22C55E',flexShrink:0}}/>}{r.d||'—'}
              </div>
              <div style={{minWidth:0,paddingRight:8}}>
                <div style={{fontSize:12,fontWeight:600,color:'var(--text-primary)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{r.j||'—'}</div>
                <div style={{fontSize:10,color:'var(--text-secondary)'}}>{na(r.a||'')} {r.b?'· '+r.b:''}</div>
              </div>
              <div style={{fontSize:12,fontWeight:700,color:'var(--text-primary)'}}>{r.v?fmtAED(r.v,true):'—'}</div>
              <div><span style={{fontSize:9,fontWeight:600,padding:'2px 5px',borderRadius:20,background:r.r==='Off'?'rgba(59,130,246,0.1)':'rgba(34,197,94,0.1)',color:r.r==='Off'?'#38BDF8':'#22C55E'}}>{r.r==='Off'?t('Off-Plan',lang):t('Ready',lang)}</span></div>
              <div><span style={{fontSize:9,fontWeight:600,padding:'2px 5px',borderRadius:20,background:tc.bg,color:tc.color}}>{r.t||t('Sale',lang)}</span></div>
              <div style={{fontSize:11,color:'var(--text-muted)'}}>{r.s?fmtNum(Math.round(r.s*10.764))+' sqft':'—'}</div>
              <div style={{fontSize:11,color:'#38BDF8'}}>{ppsqft?'AED '+fmtNum(ppsqft):'—'}</div>
            </div>
          );
        })}
        {visibleCount<rows.length && (
          <div style={{textAlign:'center',padding:16}}>
            <button onClick={()=>setVisibleCount(c=>c+50)} style={{padding:'8px 20px',borderRadius:10,border:'1px solid rgba(59,130,246,0.2)',background:'rgba(59,130,246,0.06)',color:'var(--text-muted)',cursor:'pointer',fontSize:12,fontFamily:'system-ui'}}>Load more ({fmtNum(rows.length-visibleCount)} remaining)</button>
          </div>
        )}
      </div>
    </div>
  );
}

function SearchTab({ recentRaw }) {
  const lang = localStorage.getItem('lang') || 'en';
  const [search, setSearch] = useState('');
  const [typeF, setTypeF] = useState('');
  const [regF, setRegF] = useState('');
  const [minVal, setMinVal] = useState('');
  const [maxVal, setMaxVal] = useState('');
  const [pg, setPg] = useState(1);
  const PER = 50;
  const rows = useMemo(()=>{
    if(!recentRaw?.length) return [];
    return recentRaw.map(r=>({id:r.n,date:r.d,type:r.t||t('Sale',lang),reg:r.r==='Off'?t('Off-Plan',lang):t('Ready',lang),area:r.a||'',project:r.j||'',value:r.v||0,size:r.s||0,rooms:r.b||'',ppsqft:r.s>0?Math.round((r.v||0)/r.s/10.764):0}));
  },[recentRaw]);
  const filtered = useMemo(()=>{
    let res=rows;
    if(search){const q=search.toLowerCase();res=res.filter(r=>r.area.toLowerCase().includes(q)||r.project.toLowerCase().includes(q));}
    if(typeF) res=res.filter(r=>r.type===typeF);
    if(regF) res=res.filter(r=>r.reg===regF);
    if(minVal) res=res.filter(r=>r.value>=parseFloat(minVal)*1e6);
    if(maxVal) res=res.filter(r=>r.value<=parseFloat(maxVal)*1e6);
    return res;
  },[rows,search,typeF,regF,minVal,maxVal]);
  const paged=filtered.slice((pg-1)*PER,pg*PER);
  const totalPages=Math.ceil(filtered.length/PER);
  const exportCSV=()=>{
    const header='Date,Type,Reg,Area,Project,Value,Size,AED/sqft\n';
    const body=filtered.map(r=>`${r.date},${r.type},${r.reg},"${r.area}","${r.project}",${r.value},${Math.round(r.size*10.764)},${r.ppsqft}`).join('\n');
    const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([header+body],{type:'text/csv'}));a.download='transactions.csv';a.click();
  };
  const inp={background:'var(--bg-alt)',border:'1px solid rgba(59,130,246,0.15)',borderRadius:8,color:'var(--text-primary)',fontSize:12,padding:'8px 10px',outline:'none',fontFamily:'system-ui'};
  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
        <div style={{fontSize:13,color:'var(--text-secondary)'}}>{fmtNum(filtered.length)} of {fmtNum(rows.length)} transactions</div>
        <button onClick={exportCSV} style={{padding:'7px 14px',borderRadius:8,border:'1px solid rgba(59,130,246,0.2)',background:'rgba(59,130,246,0.06)',color:'#38BDF8',cursor:'pointer',fontSize:12,fontWeight:600,fontFamily:'system-ui'}}>↓ CSV</button>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr',gap:8,marginBottom:14}}>
        <div style={{display:'flex',alignItems:'center',gap:8,background:'var(--bg-alt)',border:'1px solid rgba(59,130,246,0.15)',borderRadius:8,padding:'8px 10px'}}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input value={search} onChange={e=>{setSearch(e.target.value);setPg(1);}} placeholder="Search area or project..." style={{background:'none',border:'none',outline:'none',color:'var(--text-secondary)',fontSize:12,flex:1,fontFamily:'system-ui'}}/>
        </div>
        <select value={typeF} onChange={e=>{setTypeF(e.target.value);setPg(1);}} style={{...inp,cursor:'pointer'}}><option value="">{t('All types',lang)}</option><option>Sale</option><option>Mortgage</option><option>Gift</option></select>
        <select value={regF} onChange={e=>{setRegF(e.target.value);setPg(1);}} style={{...inp,cursor:'pointer'}}><option value="">{t('All reg',lang)}</option><option>Off-Plan</option><option>Ready</option></select>
        <input value={minVal} onChange={e=>{setMinVal(e.target.value);setPg(1);}} placeholder="Min (M AED)" style={inp}/>
        <input value={maxVal} onChange={e=>{setMaxVal(e.target.value);setPg(1);}} placeholder="Max (M AED)" style={inp}/>
      </div>
      <div style={{background:'var(--surface)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:14,overflow:'hidden'}}>
        <div style={{display:'grid',gridTemplateColumns:'90px 70px 70px 1fr 1fr 100px 70px',padding:'10px 20px',borderBottom:'1px solid rgba(255,255,255,0.06)',background:'rgba(59,130,246,0.04)'}}>
          {['Date','Type','Reg','Area','Project','Value','AED/sqft'].map((h,i)=><div key={i} style={{fontSize:10,color:'var(--text-secondary)',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.04em'}}>{h}</div>)}
        </div>
        {paged.length===0 ? <div style={{textAlign:'center',padding:40,color:'var(--text-secondary)'}}>{t('No results',lang)}</div>
        : paged.map((r,i)=>(
          <div key={r.id||i} style={{display:'grid',gridTemplateColumns:'90px 70px 70px 1fr 1fr 100px 70px',padding:'10px 20px',borderBottom:i<paged.length-1?'1px solid rgba(255,255,255,0.03)':'none'}}
            onMouseEnter={e=>e.currentTarget.style.background='rgba(59,130,246,0.04)'}
            onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
            <div style={{fontSize:11,color:'var(--text-muted)'}}>{r.date}</div>
            <div><span style={{fontSize:9,fontWeight:600,padding:'2px 5px',borderRadius:20,background:'rgba(59,130,246,0.1)',color:'#38BDF8'}}>{r.type}</span></div>
            <div><span style={{fontSize:9,fontWeight:600,padding:'2px 5px',borderRadius:20,background:r.reg===t('Off-Plan',lang)?'rgba(59,130,246,0.1)':'rgba(34,197,94,0.1)',color:r.reg===t('Off-Plan',lang)?'#38BDF8':'#22C55E'}}>{r.reg===t('Off-Plan',lang)?'Off':t('Ready',lang)}</span></div>
            <div style={{fontSize:11,color:'var(--text-secondary)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{na(r.area)}</div>
            <div style={{fontSize:11,color:'var(--text-muted)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{r.project||'—'}</div>
            <div style={{fontSize:12,fontWeight:600,color:'var(--text-primary)'}}>{fmtAED(r.value,true)}</div>
            <div style={{fontSize:11,color:'#38BDF8'}}>{r.ppsqft?'AED '+fmtNum(r.ppsqft):'—'}</div>
          </div>
        ))}
      </div>
      {totalPages>1 && (
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:8,marginTop:14}}>
          <button onClick={()=>setPg(p=>Math.max(1,p-1))} disabled={pg===1} style={{padding:'6px 14px',borderRadius:8,border:'1px solid rgba(59,130,246,0.2)',background:'rgba(59,130,246,0.06)',color:'var(--text-muted)',cursor:pg===1?'default':'pointer',fontSize:12,fontFamily:'system-ui'}}>← Prev</button>
          <span style={{fontSize:12,color:'var(--text-muted)'}}>Page {pg} of {totalPages}</span>
          <button onClick={()=>setPg(p=>Math.min(totalPages,p+1))} disabled={pg===totalPages} style={{padding:'6px 14px',borderRadius:8,border:'1px solid rgba(59,130,246,0.2)',background:'rgba(59,130,246,0.06)',color:'var(--text-muted)',cursor:pg===totalPages?'default':'pointer',fontSize:12,fontFamily:'system-ui'}}>Next →</button>
        </div>
      )}
    </div>
  );
}

export default function RecentTransactions({ recentRaw }) {
  const lang = localStorage.getItem('lang') || 'en';
  const [tab, setTab] = useState('live');
  return (
    <div style={{flex:1,display:'flex',flexDirection:'column',background:'var(--bg)',fontFamily:'system-ui',overflow:'hidden'}}>
      <div style={{padding:'20px 28px 0',borderBottom:'1px solid rgba(59,130,246,0.08)'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
          <div>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:4}}>
              <h1 style={{margin:0,fontSize:22,fontWeight:700,color:'var(--text-primary)'}}>{t('Recent Transactions broker',lang)}</h1>
              <div style={{display:'flex',alignItems:'center',gap:6,background:'rgba(34,197,94,0.08)',border:'1px solid rgba(34,197,94,0.15)',borderRadius:20,padding:'4px 12px'}}>
                <div style={{width:6,height:6,borderRadius:'50%',background:'#22C55E',boxShadow:'0 0 6px #22C55E'}}/>
                <span style={{fontSize:11,fontWeight:600,color:'#22C55E'}}>{t('LIVE DLD DATA',lang)}</span>
              </div>
            </div>
            <div style={{fontSize:13,color:'var(--text-secondary)'}}>{t('Latest transactions',lang)}</div>
          </div>
          <div style={{display:'flex',gap:6,background:'var(--surface)',border:'1px solid rgba(59,130,246,0.15)',borderRadius:10,padding:4}}>
            {[['live','Live Feed'],['search','Search & Filter']].map(([tabId,l])=>(
              <button key={t} onClick={()=>setTab(t)} style={{padding:'8px 18px',borderRadius:8,border:'none',cursor:'pointer',fontSize:13,fontFamily:'system-ui',fontWeight:tab===t?600:400,background:tab===t?'linear-gradient(135deg,#1D4ED8,#38BDF8)':'transparent',color:tab===t?'#fff':'var(--text-muted)'}}>{l}</button>
            ))}
          </div>
        </div>
      </div>
      <div style={{flex:1,overflowY:'auto',padding:'20px 28px'}}>
        {tab==='live' ? <LiveFeedTab recentRaw={recentRaw}/> : <SearchTab recentRaw={recentRaw}/>}
      </div>
    </div>
  );
}
