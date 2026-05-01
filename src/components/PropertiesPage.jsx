import { t } from '../i18n';
import { useState, useMemo } from 'react';
import { fmtAED, fmtNum } from '../utils/format';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const AN = {'Al Barsha South Fourth':'JVC','Burj Khalifa':'Downtown Dubai','Marsa Dubai':'Dubai Marina','Hadaeq Sheikh Mohammed Bin Rashid':'Dubai Hills','Al Thanyah Fifth':'JLT','Business Bay':'Business Bay','Palm Jumeirah':'Palm Jumeirah','Al Merkadh':'MBR City','Al Khairan First':'Creek Harbour','Al Hebiah Fourth':'Damac Hills'};
const na = a => AN[a] || a;

function OffPlanReadyTab({ recentRaw }) {
  const lang = localStorage.getItem('lang') || 'en';
  const [regFilter, setRegFilter] = useState('all');
  const [areaFilter, setAreaFilter] = useState('');
  const [visibleCount, setVisibleCount] = useState(50);

  const areas = useMemo(()=>[...new Set((recentRaw||[]).map(r=>r.a||'').filter(Boolean))].sort(),[recentRaw]);

  const rows = useMemo(()=>{
    if(!recentRaw?.length) return [];
    let r = [...recentRaw].sort((a,b)=>(b.d||'').localeCompare(a.d||''));
    if(regFilter==='offplan') r=r.filter(x=>x.r==='Off');
    if(regFilter==='ready') r=r.filter(x=>x.r!=='Off');
    if(areaFilter) r=r.filter(x=>(x.a||'')===areaFilter);
    return r;
  },[recentRaw,regFilter,areaFilter]);

  const stats = useMemo(()=>{
    if(!rows.length) return null;
    const offPlan = rows.filter(r=>r.r==='Off');
    const ready = rows.filter(r=>r.r!=='Off');
    const avgVal = rows.length ? rows.slice(0,200).reduce((s,r)=>s+(r.v||0),0)/Math.min(rows.length,200) : 0;
    return { total:rows.length, offPlan:offPlan.length, ready:ready.length, avgVal };
  },[rows]);

  const inp={background:'var(--bg-alt)',border:'1px solid rgba(59,130,246,0.15)',borderRadius:8,color:'var(--text-primary)',fontSize:12,padding:'7px 10px',outline:'none',fontFamily:'system-ui'};

  return (
    <div>
      {stats && (
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginBottom:16}}>
          {[['Total',fmtNum(stats.total),'var(--text-primary)'],['Off-Plan',fmtNum(stats.offPlan),'#38BDF8'],['Ready',fmtNum(stats.ready),'#22C55E'],['Avg Deal',fmtAED(stats.avgVal,true),'#F59E0B']].map(([l,v,c],i)=>(
            <div key={i} style={{background:'var(--surface)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:10,padding:'12px 16px'}}>
              <div style={{fontSize:10,color:'var(--text-muted)',marginBottom:4,textTransform:'uppercase',letterSpacing:'0.05em'}}>{l}</div>
              <div style={{fontSize:16,fontWeight:700,color:c}}>{v}</div>
            </div>
          ))}
        </div>
      )}
      <div style={{display:'flex',gap:8,marginBottom:14,alignItems:'center',flexWrap:'wrap'}}>
        <div style={{display:'flex',gap:6}}>
          {[['all',t('All projects',lang)],['offplan',t('Off-Plan',lang)],['ready',t('Ready',lang)]].map(([f,l])=>(
            <button key={f} onClick={()=>setRegFilter(f)} style={{padding:'6px 14px',borderRadius:20,border:'none',cursor:'pointer',fontSize:11,fontWeight:regFilter===f?600:400,fontFamily:'system-ui',background:regFilter===f?'linear-gradient(135deg,#1D4ED8,#38BDF8)':'rgba(59,130,246,0.06)',color:regFilter===f?'#fff':'var(--text-muted)'}}>{l}</button>
          ))}
        </div>
        <select value={areaFilter} onChange={e=>setAreaFilter(e.target.value)} style={{...inp,cursor:'pointer'}}>
          <option value="">{t('All areas',lang)}</option>
          {areas.map(a=><option key={a} value={a}>{na(a)}</option>)}
        </select>
        {(areaFilter||regFilter!=='all') && <button onClick={()=>{setRegFilter('all');setAreaFilter('');}} style={{background:'none',border:'none',cursor:'pointer',color:'#F87171',fontSize:12,fontFamily:'system-ui'}}>× Clear</button>}
      </div>
      <div style={{background:'var(--surface)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:14,overflow:'hidden'}}>
        <div style={{display:'grid',gridTemplateColumns:'90px 70px 70px 1fr 1fr 90px 75px',padding:'10px 20px',borderBottom:'1px solid rgba(59,130,246,0.06)',background:'rgba(59,130,246,0.02)'}}>
          {[t('Date',lang),t('Reg',lang),t('BR',lang),t('Area',lang),t('Project',lang),t('Value',lang),t('AED/sqft',lang)].map((h,i)=><div key={i} style={{fontSize:10,color:'var(--text-secondary)',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.05em'}}>{h}</div>)}
        </div>
        {rows.slice(0,visibleCount).map((r,i)=>{
          const ppsqft=r.s&&r.v?Math.round(r.v/r.s/10.764):0;
          return (
            <div key={r.n||i} style={{display:'grid',gridTemplateColumns:'90px 70px 70px 1fr 1fr 90px 75px',padding:'11px 20px',borderBottom:i<Math.min(rows.length,visibleCount)-1?'1px solid rgba(255,255,255,0.03)':'none'}}
              onMouseEnter={e=>e.currentTarget.style.background='rgba(59,130,246,0.05)'}
              onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
              <div style={{fontSize:11,color:'var(--text-muted)'}}>{r.d||'—'}</div>
              <div><span style={{fontSize:9,fontWeight:600,padding:'2px 5px',borderRadius:20,background:r.r==='Off'?'rgba(59,130,246,0.1)':'rgba(34,197,94,0.1)',color:r.r==='Off'?'#38BDF8':'#22C55E'}}>{r.r==='Off'?t('Off-Plan',lang):t('Ready',lang)}</span></div>
              <div style={{fontSize:11,color:'var(--text-secondary)'}}>{r.b||'—'}</div>
              <div style={{fontSize:11,color:'var(--text-secondary)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{na(r.a||'')}</div>
              <div style={{fontSize:11,color:'var(--text-muted)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{r.j||'—'}</div>
              <div style={{fontSize:12,fontWeight:600,color:'var(--text-primary)'}}>{r.v?fmtAED(r.v,true):'—'}</div>
              <div style={{fontSize:11,color:'#38BDF8'}}>{ppsqft?'AED '+fmtNum(ppsqft):'—'}</div>
            </div>
          );
        })}
        {visibleCount<rows.length && (
          <div style={{textAlign:'center',padding:14}}>
            <button onClick={()=>setVisibleCount(c=>c+50)} style={{padding:'8px 20px',borderRadius:10,border:'1px solid rgba(59,130,246,0.2)',background:'rgba(59,130,246,0.06)',color:'var(--text-muted)',cursor:'pointer',fontSize:12,fontFamily:'system-ui'}}>Load more ({fmtNum(rows.length-visibleCount)} remaining)</button>
          </div>
        )}
      </div>
    </div>
  );
}

function PropertyLookupTab({ recentRaw }) {
  const lang = localStorage.getItem('lang') || 'en';
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [showSugg, setShowSugg] = useState(false);

  const projectIndex = useMemo(()=>{
    if(!recentRaw?.length) return {};
    const idx={};
    recentRaw.forEach(r=>{
      const proj=r.j||''; if(!proj.trim()) return;
      if(!idx[proj]) idx[proj]={name:proj,area:r.a||'',transactions:[],areas:new Set()};
      idx[proj].transactions.push(r); idx[proj].areas.add(r.a||'');
    });
    return idx;
  },[recentRaw]);

  const suggestions = useMemo(()=>{
    if(!query||query.length<2) return [];
    const q=query.toLowerCase();
    return Object.keys(projectIndex).filter(p=>p.toLowerCase().includes(q)).slice(0,8).map(p=>({name:p,...projectIndex[p]}));
  },[query,projectIndex]);

  const selectProject=(proj)=>{
    const data=projectIndex[proj.name]; if(!data) return;
    const txns=data.transactions;
    const values=txns.map(t=>t.v||0).filter(v=>v>0);
    const sizes=txns.map(t=>t.s||0).filter(s=>s>0);
    const dates=txns.map(t=>t.d||'').filter(Boolean).sort();
    const monthly={};
    txns.forEach(t=>{const m=(t.d||'').slice(0,7);if(!m)return;if(!monthly[m])monthly[m]={month:m,count:0};monthly[m].count++;});
    const rooms={}; txns.forEach(t=>{const b=t.b||'?';rooms[b]=(rooms[b]||0)+1;});
    const regs={}; txns.forEach(t=>{const r=t.r==='Off'?'Off-Plan':'Ready';regs[r]=(regs[r]||0)+1;});
    setSelected({
      name:proj.name,area:na([...data.areas][0]||''),count:txns.length,
      avgValue:values.length?Math.round(values.reduce((s,v)=>s+v,0)/values.length):0,
      minValue:values.length?Math.min(...values):0,maxValue:values.length?Math.max(...values):0,
      avgSize:sizes.length?Math.round(sizes.reduce((s,v)=>s+v,0)/sizes.length*10.764):0,
      avgPpsqft:sizes.length&&values.length?Math.round(values.reduce((s,v)=>s+v,0)/values.length/(sizes.reduce((s,v)=>s+v,0)/sizes.length)/10.764):0,
      firstDate:dates[0]||'',lastDate:dates[dates.length-1]||'',
      monthly:Object.values(monthly).sort((a,b)=>a.month.localeCompare(b.month)),
      rooms:Object.entries(rooms).sort((a,b)=>b[1]-a[1]),
      regs:Object.entries(regs),
      recentTxns:txns.sort((a,b)=>(b.d||'').localeCompare(a.d||'')).slice(0,10),
    });
    setShowSugg(false); setQuery(proj.name);
  };

  const tt={contentStyle:{background:'var(--surface)',border:'1px solid rgba(59,130,246,0.2)',borderRadius:8,color:'var(--text-primary)',fontSize:11}};

  return (
    <div>
      <div style={{position:'relative',maxWidth:560,marginBottom:24}}>
        <div style={{display:'flex',alignItems:'center',gap:10,background:'var(--surface)',border:'1px solid rgba(59,130,246,0.2)',borderRadius:12,padding:'12px 18px'}}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input value={query} onChange={e=>{setQuery(e.target.value);setShowSugg(true);setSelected(null);}} onFocus={()=>setShowSugg(true)} placeholder="Search building or project..." style={{background:'none',border:'none',outline:'none',color:'var(--text-primary)',fontSize:14,flex:1,fontFamily:'system-ui'}}/>
          {query&&<button onClick={()=>{setQuery('');setSelected(null);}} style={{background:'none',border:'none',cursor:'pointer',color:'var(--text-secondary)',fontSize:18}}>×</button>}
        </div>
        {showSugg&&suggestions.length>0&&(
          <div style={{position:'absolute',top:'100%',left:0,right:0,background:'var(--surface)',border:'1px solid rgba(59,130,246,0.2)',borderRadius:12,marginTop:4,overflow:'hidden',zIndex:100,boxShadow:'0 8px 32px rgba(0,0,0,0.5)'}}>
            {suggestions.map((s,i)=>(
              <button key={i} onClick={()=>selectProject(s)} style={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'100%',padding:'11px 16px',background:'none',border:'none',cursor:'pointer',textAlign:'left',borderBottom:i<suggestions.length-1?'1px solid rgba(255,255,255,0.04)':'none',fontFamily:'system-ui'}}
                onMouseEnter={e=>e.currentTarget.style.background='rgba(59,130,246,0.08)'}
                onMouseLeave={e=>e.currentTarget.style.background='none'}>
                <div>
                  <div style={{fontSize:12,fontWeight:600,color:'var(--text-primary)',marginBottom:2}}>{s.name.length>50?s.name.slice(0,50)+'…':s.name}</div>
                  <div style={{fontSize:10,color:'var(--text-secondary)'}}>{na([...s.areas][0]||'')} · {s.transactions.length} txns</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {!selected&&!query&&(
        <div style={{textAlign:'center',padding:'40px 0'}}>
          <div style={{fontSize:44,marginBottom:12}}>🏢</div>
          <div style={{fontSize:16,fontWeight:600,color:'var(--text-primary)',marginBottom:6}}>Search 1,145+ Dubai projects</div>
          <div style={{fontSize:13,color:'var(--text-secondary)',marginBottom:24}}>Full DLD transaction history for any building</div>
          <div style={{display:'flex',justifyContent:'center',gap:8,flexWrap:'wrap'}}>
            {['Creek Bay','Terra Woods','Serenz by Danube','Creek Haven'].map(p=>(
              <button key={p} onClick={()=>{setQuery(p);selectProject({name:p,...(projectIndex[p]||{transactions:[],areas:new Set()})});}} style={{padding:'7px 14px',borderRadius:20,border:'1px solid rgba(59,130,246,0.2)',background:'rgba(59,130,246,0.06)',color:'var(--text-muted)',cursor:'pointer',fontSize:12,fontFamily:'system-ui'}}>{p}</button>
            ))}
          </div>
        </div>
      )}

      {selected&&(
        <>
          <div style={{background:'linear-gradient(135deg,rgba(59,130,246,0.1),rgba(6,14,26,0.5))',border:'1px solid rgba(59,130,246,0.2)',borderRadius:14,padding:20,marginBottom:16}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div>
                <div style={{fontSize:18,fontWeight:800,color:'var(--text-primary)',marginBottom:2}}>{selected.name}</div>
                <div style={{fontSize:12,color:'var(--text-muted)'}}>📍 {selected.area} · {selected.firstDate} → {selected.lastDate}</div>
              </div>
              <div style={{textAlign:'right'}}>
                <div style={{fontSize:26,fontWeight:800,color:'var(--text-primary)'}}>{fmtNum(selected.count)}</div>
                <div style={{fontSize:11,color:'var(--text-muted)'}}>transactions</div>
              </div>
            </div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:10,marginBottom:16}}>
            {[['Avg Deal',fmtAED(selected.avgValue,true),'var(--text-primary)'],['Min',fmtAED(selected.minValue,true),'#22C55E'],['Max',fmtAED(selected.maxValue,true),'#F87171'],['Avg Size',selected.avgSize?fmtNum(selected.avgSize)+' sqft':'N/A','var(--text-muted)'],['AED/sqft',selected.avgPpsqft?'AED '+fmtNum(selected.avgPpsqft):'N/A','#38BDF8']].map(([l,v,c],i)=>(
              <div key={i} style={{background:'var(--surface)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:10,padding:'12px 14px'}}>
                <div style={{fontSize:10,color:'var(--text-muted)',marginBottom:4,textTransform:'uppercase',letterSpacing:'0.05em'}}>{l}</div>
                <div style={{fontSize:14,fontWeight:700,color:c}}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:14,marginBottom:16}}>
            <div style={{background:'var(--surface)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:12,padding:16}}>
              <div style={{fontSize:12,fontWeight:600,color:'var(--text-primary)',marginBottom:10}}>Volume Over Time</div>
              <ResponsiveContainer width="100%" height={140}>
                <AreaChart data={selected.monthly} margin={{top:4,right:4,left:0,bottom:0}}>
                  <defs><linearGradient id="plg2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#38BDF8" stopOpacity={0.15}/><stop offset="95%" stopColor="#38BDF8" stopOpacity={0}/></linearGradient></defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)"/>
                  <XAxis dataKey="month" tick={{fontSize:8,fill:'#475569'}} axisLine={false} tickLine={false}/>
                  <YAxis hide/>
                  <Tooltip contentStyle={{background:'var(--surface)',border:'1px solid rgba(59,130,246,0.2)',borderRadius:8,color:'var(--text-primary)',fontSize:10}} formatter={v=>[v,'Txns']}/>
                  <Area type="monotone" dataKey="count" stroke="#38BDF8" strokeWidth={2} fill="url(#plg2)"/>
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div style={{background:'var(--surface)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:12,padding:16}}>
              <div style={{fontSize:12,fontWeight:600,color:'var(--text-primary)',marginBottom:10}}>Breakdown</div>
              <div style={{marginBottom:10}}>
                <div style={{fontSize:10,color:'var(--text-muted)',marginBottom:5}}>REGISTRATION</div>
                {selected.regs.map(([k,v],i)=><div key={i} style={{display:'flex',justifyContent:'space-between',marginBottom:4}}><span style={{fontSize:11,color:'var(--text-secondary)'}}>{k}</span><span style={{fontSize:11,fontWeight:600,color:k==='Off-Plan'?'#38BDF8':'#22C55E'}}>{v} ({Math.round(v/selected.count*100)}%)</span></div>)}
              </div>
              <div style={{borderTop:'1px solid rgba(255,255,255,0.04)',paddingTop:10}}>
                <div style={{fontSize:10,color:'var(--text-muted)',marginBottom:5}}>BEDROOMS</div>
                {selected.rooms.slice(0,4).map(([k,v],i)=><div key={i} style={{display:'flex',justifyContent:'space-between',marginBottom:4}}><span style={{fontSize:11,color:'var(--text-secondary)'}}>{k||'?'}</span><span style={{fontSize:11,fontWeight:600,color:'var(--text-primary)'}}>{v}</span></div>)}
              </div>
            </div>
          </div>
          <div style={{background:'var(--surface)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:12,overflow:'hidden'}}>
            <div style={{padding:'12px 16px',borderBottom:'1px solid rgba(255,255,255,0.06)',fontSize:12,fontWeight:600,color:'var(--text-primary)'}}>Recent Transactions</div>
            <div style={{display:'grid',gridTemplateColumns:'90px 90px 60px 60px 80px 70px',padding:'8px 16px',borderBottom:'1px solid rgba(59,130,246,0.06)',background:'rgba(59,130,246,0.02)'}}>
              {['Date','Value','Reg','BR','Size','AED/sqft'].map((h,i)=><div key={i} style={{fontSize:9,color:'var(--text-secondary)',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.04em'}}>{h}</div>)}
            </div>
            {selected.recentTxns.map((t,i)=>{
              const ppsqft=t.s&&t.v?Math.round(t.v/t.s/10.764):0;
              return(
                <div key={i} style={{display:'grid',gridTemplateColumns:'90px 90px 60px 60px 80px 70px',padding:'10px 16px',borderBottom:i<selected.recentTxns.length-1?'1px solid rgba(255,255,255,0.03)':'none'}}
                  onMouseEnter={e=>e.currentTarget.style.background='rgba(59,130,246,0.04)'}
                  onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                  <div style={{fontSize:11,color:'var(--text-muted)'}}>{t.d||'—'}</div>
                  <div style={{fontSize:12,fontWeight:600,color:'var(--text-primary)'}}>{t.v?fmtAED(t.v,true):'—'}</div>
                  <div><span style={{fontSize:9,fontWeight:600,padding:'2px 4px',borderRadius:20,background:t.r==='Off'?'rgba(59,130,246,0.1)':'rgba(34,197,94,0.1)',color:t.r==='Off'?'#38BDF8':'#22C55E'}}>{t.r==='Off'?'Off':'Ready'}</span></div>
                  <div style={{fontSize:11,color:'var(--text-secondary)'}}>{t.b||'—'}</div>
                  <div style={{fontSize:11,color:'var(--text-muted)'}}>{t.s?fmtNum(Math.round(t.s*10.764))+' sqft':'—'}</div>
                  <div style={{fontSize:11,color:'#38BDF8'}}>{ppsqft?'AED '+fmtNum(ppsqft):'—'}</div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default function PropertiesPage({ recentRaw, projectsData, onProjectClick }) {
  const [tab, setTab] = useState('properties');
  return (
    <div style={{flex:1,display:'flex',flexDirection:'column',background:'var(--bg)',fontFamily:'system-ui',overflow:'hidden'}}>
      <div style={{padding:'20px 28px 0',borderBottom:'1px solid rgba(59,130,246,0.08)'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
          <div>
            <h1 style={{margin:0,fontSize:22,fontWeight:700,color:'var(--text-primary)',marginBottom:4}}>Properties</h1>
            <div style={{fontSize:13,color:'var(--text-secondary)'}}>Off-plan & ready transactions · Search any building or project</div>
          </div>
          <div style={{display:'flex',gap:6,background:'var(--surface)',border:'1px solid rgba(59,130,246,0.15)',borderRadius:10,padding:4}}>
            {[['properties',t('Off-Plan & Ready',lang)],['lookup',t('Property Lookup',lang)]].map(([tabKey,l])=>(
              <button key={t} onClick={()=>setTab(t)} style={{padding:'8px 18px',borderRadius:8,border:'none',cursor:'pointer',fontSize:13,fontFamily:'system-ui',fontWeight:tab===t?600:400,background:tab===t?'linear-gradient(135deg,#1D4ED8,#38BDF8)':'transparent',color:tab===t?'#fff':'var(--text-muted)'}}>{l}</button>
            ))}
          </div>
        </div>
      </div>
      <div style={{flex:1,overflowY:'auto',padding:'20px 28px'}}>
        {tab==='properties' ? <OffPlanReadyTab recentRaw={recentRaw}/> : <PropertyLookupTab recentRaw={recentRaw}/>}
      </div>
    </div>
  );
}
