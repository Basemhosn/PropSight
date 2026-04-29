import { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { fmtAED, fmtNum } from '../utils/format';

const AREA_NICE = {'Al Barsha South Fourth':'JVC','Burj Khalifa':'Downtown Dubai','Marsa Dubai':'Dubai Marina','Hadaeq Sheikh Mohammed Bin Rashid':'Dubai Hills','Al Thanyah Fifth':'JLT','Business Bay':'Business Bay','Palm Jumeirah':'Palm Jumeirah','Al Merkadh':'MBR City','Al Khairan First':'Creek Harbour','Al Hebiah Fourth':'Damac Hills'};
const niceArea = a => AREA_NICE[a] || a;

export default function PropertyLookup({ recentRaw }) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [showSugg, setShowSugg] = useState(false);

  const projectIndex = useMemo(() => {
    if (!recentRaw?.length) return {};
    const idx = {};
    recentRaw.forEach(r => {
      const proj = r.j||''; if (!proj.trim()) return;
      if (!idx[proj]) idx[proj] = { name:proj, area:r.a||'', transactions:[], areas:new Set() };
      idx[proj].transactions.push(r);
      idx[proj].areas.add(r.a||'');
    });
    return idx;
  }, [recentRaw]);

  const suggestions = useMemo(() => {
    if (!query || query.length < 2) return [];
    const q = query.toLowerCase();
    return Object.keys(projectIndex).filter(p=>p.toLowerCase().includes(q)).slice(0,8).map(p=>({name:p,...projectIndex[p]}));
  }, [query, projectIndex]);

  const selectProject = (proj) => {
    const data = projectIndex[proj.name]; if (!data) return;
    const txns = data.transactions;
    const values = txns.map(t=>t.v||0).filter(v=>v>0);
    const sizes = txns.map(t=>t.s||0).filter(s=>s>0);
    const dates = txns.map(t=>t.d||'').filter(Boolean).sort();
    const monthly = {};
    txns.forEach(t => { const m=(t.d||'').slice(0,7); if(!m)return; if(!monthly[m])monthly[m]={month:m,count:0,total:0}; monthly[m].count++; monthly[m].total+=t.v||0; });
    const rooms = {}; txns.forEach(t=>{const b=t.b||'?'; rooms[b]=(rooms[b]||0)+1;});
    const regs = {}; txns.forEach(t=>{const r=t.r==='Off'?'Off-Plan':'Ready'; regs[r]=(regs[r]||0)+1;});
    setSelected({
      name:proj.name, area:niceArea([...data.areas][0]||''), count:txns.length,
      avgValue:values.length?Math.round(values.reduce((s,v)=>s+v,0)/values.length):0,
      minValue:values.length?Math.min(...values):0, maxValue:values.length?Math.max(...values):0,
      avgSize:sizes.length?Math.round(sizes.reduce((s,v)=>s+v,0)/sizes.length*10.764):0,
      avgPpsqft:sizes.length&&values.length?Math.round(values.reduce((s,v)=>s+v,0)/values.length/(sizes.reduce((s,v)=>s+v,0)/sizes.length)/10.764):0,
      firstDate:dates[0]||'', lastDate:dates[dates.length-1]||'',
      monthly:Object.values(monthly).sort((a,b)=>a.month.localeCompare(b.month)),
      rooms:Object.entries(rooms).sort((a,b)=>b[1]-a[1]),
      regs:Object.entries(regs),
      recentTxns:txns.sort((a,b)=>(b.d||'').localeCompare(a.d||'')).slice(0,15),
    });
    setShowSugg(false); setQuery(proj.name);
  };

  const tt = {contentStyle:{background:'#0A1628',border:'1px solid rgba(59,130,246,0.2)',borderRadius:8,color:'var(--text-primary)',fontSize:11}};

  return (
    <div style={{flex:1,overflowY:'auto',background:'var(--bg)',fontFamily:'system-ui',padding:'24px 28px'}}>
      <div style={{marginBottom:24}}>
        <h1 style={{margin:0,fontSize:22,fontWeight:700,color:'var(--text-primary)',marginBottom:4}}>Property Lookup</h1>
        <div style={{fontSize:13,color:'#475569'}}>Search any building or project — full DLD transaction history</div>
      </div>
      <div style={{position:'relative',maxWidth:600,marginBottom:32}}>
        <div style={{display:'flex',alignItems:'center',gap:12,background:'var(--surface)',border:'1px solid rgba(59,130,246,0.2)',borderRadius:12,padding:'14px 20px',boxShadow:'0 4px 20px rgba(0,0,0,0.3)'}}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input value={query} onChange={e=>{setQuery(e.target.value);setShowSugg(true);setSelected(null);}} onFocus={()=>setShowSugg(true)} placeholder="Search building, project..." style={{background:'none',border:'none',outline:'none',color:'var(--text-primary)',fontSize:15,flex:1,fontFamily:'system-ui'}}/>
          {query && <button onClick={()=>{setQuery('');setSelected(null);}} style={{background:'none',border:'none',cursor:'pointer',color:'#475569',fontSize:18}}>×</button>}
        </div>
        {showSugg && suggestions.length>0 && (
          <div style={{position:'absolute',top:'100%',left:0,right:0,background:'var(--surface)',border:'1px solid rgba(59,130,246,0.2)',borderRadius:12,marginTop:4,overflow:'hidden',zIndex:100,boxShadow:'0 8px 32px rgba(0,0,0,0.5)'}}>
            {suggestions.map((s,i)=>(
              <button key={i} onClick={()=>selectProject(s)} style={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'100%',padding:'12px 16px',background:'none',border:'none',cursor:'pointer',textAlign:'left',borderBottom:i<suggestions.length-1?'1px solid rgba(255,255,255,0.04)':'none',fontFamily:'system-ui'}}
                onMouseEnter={e=>e.currentTarget.style.background='rgba(59,130,246,0.08)'}
                onMouseLeave={e=>e.currentTarget.style.background='none'}>
                <div>
                  <div style={{fontSize:13,fontWeight:600,color:'var(--text-primary)',marginBottom:2}}>{s.name.length>50?s.name.slice(0,50)+'…':s.name}</div>
                  <div style={{fontSize:11,color:'#475569'}}>{niceArea([...s.areas][0]||'')} · {s.transactions.length} transactions</div>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            ))}
          </div>
        )}
      </div>

      {!selected && !query && (
        <div style={{textAlign:'center',padding:'60px 0'}}>
          <div style={{fontSize:56,marginBottom:16}}>🏢</div>
          <div style={{fontSize:18,fontWeight:600,color:'var(--text-primary)',marginBottom:8}}>Search any Dubai property</div>
          <div style={{fontSize:13,color:'#475569',marginBottom:32}}>1,145+ projects with full transaction history from DLD</div>
          <div style={{display:'flex',justifyContent:'center',gap:8,flexWrap:'wrap'}}>
            {['Creek Bay','DAMAC LAGOONS - VALENCIA','Terra Woods','Serenz by Danube','Creek Haven'].map(p=>(
              <button key={p} onClick={()=>{setQuery(p);selectProject({name:p,...(projectIndex[p]||{transactions:[],areas:new Set()})});}} style={{padding:'8px 16px',borderRadius:20,border:'1px solid rgba(59,130,246,0.2)',background:'rgba(59,130,246,0.06)',color:'var(--text-muted)',cursor:'pointer',fontSize:12,fontFamily:'system-ui'}}>{p}</button>
            ))}
          </div>
        </div>
      )}

      {selected && <>
        <div style={{background:'linear-gradient(135deg,rgba(59,130,246,0.1),rgba(6,14,26,0.5))',border:'1px solid rgba(59,130,246,0.2)',borderRadius:16,padding:24,marginBottom:24}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
            <div>
              <div style={{fontSize:11,color:'#38BDF8',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:6}}>DLD Transaction History</div>
              <div style={{fontSize:22,fontWeight:800,color:'var(--text-primary)',marginBottom:4}}>{selected.name}</div>
              <div style={{fontSize:13,color:'var(--text-muted)'}}>📍 {selected.area} · {selected.firstDate} → {selected.lastDate}</div>
            </div>
            <div style={{textAlign:'right'}}>
              <div style={{fontSize:32,fontWeight:800,color:'var(--text-primary)'}}>{fmtNum(selected.count)}</div>
              <div style={{fontSize:12,color:'var(--text-muted)'}}>total transactions</div>
            </div>
          </div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(130px,1fr))',gap:12,marginBottom:24}}>
          {[['Avg Deal',fmtAED(selected.avgValue,true),'var(--text-primary)',''],['Min Price',fmtAED(selected.minValue,true),'#22C55E','rgba(34,197,94,0.1)'],['Max Price',fmtAED(selected.maxValue,true),'#F87171','rgba(248,113,113,0.1)'],['Avg Size',selected.avgSize?fmtNum(selected.avgSize)+' sqft':'N/A','var(--text-muted)',''],['Price/sqft',selected.avgPpsqft?'AED '+fmtNum(selected.avgPpsqft):'N/A','#38BDF8','rgba(59,130,246,0.1)']].map(([l,v,c,bg],i)=>(
            <div key={i} style={{background:bg||'var(--surface)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:12,padding:'14px 16px'}}>
              <div style={{fontSize:11,color:'var(--text-muted)',marginBottom:5,textTransform:'uppercase',letterSpacing:'0.05em'}}>{l}</div>
              <div style={{fontSize:17,fontWeight:700,color:c}}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:16,marginBottom:24}}>
          <div style={{background:'var(--surface)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:14,padding:20}}>
            <div style={{fontSize:13,fontWeight:600,color:'var(--text-primary)',marginBottom:14}}>Transaction Volume Over Time</div>
            <ResponsiveContainer width="100%" height={160}>
              <AreaChart data={selected.monthly} margin={{top:4,right:4,left:0,bottom:0}}>
                <defs><linearGradient id="plg" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#38BDF8" stopOpacity={0.15}/><stop offset="95%" stopColor="#38BDF8" stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)"/>
                <XAxis dataKey="month" tick={{fontSize:9,fill:'#475569'}} axisLine={false} tickLine={false}/>
                <YAxis hide/>
                <Tooltip {...tt} formatter={v=>[v,'Transactions']}/>
                <Area type="monotone" dataKey="count" stroke="#38BDF8" strokeWidth={2.5} fill="url(#plg)"/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div style={{background:'var(--surface)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:14,padding:20}}>
            <div style={{fontSize:13,fontWeight:600,color:'var(--text-primary)',marginBottom:14}}>Breakdown</div>
            <div style={{marginBottom:14}}>
              <div style={{fontSize:11,color:'var(--text-muted)',marginBottom:6}}>REGISTRATION</div>
              {selected.regs.map(([k,v],i)=><div key={i} style={{display:'flex',justifyContent:'space-between',marginBottom:4}}><span style={{fontSize:12,color:'var(--text-secondary)'}}>{k}</span><span style={{fontSize:12,fontWeight:600,color:k==='Off-Plan'?'#38BDF8':'#22C55E'}}>{v} ({Math.round(v/selected.count*100)}%)</span></div>)}
            </div>
            <div style={{borderTop:'1px solid rgba(255,255,255,0.04)',paddingTop:12}}>
              <div style={{fontSize:11,color:'var(--text-muted)',marginBottom:6}}>BEDROOMS</div>
              {selected.rooms.slice(0,5).map(([k,v],i)=><div key={i} style={{display:'flex',justifyContent:'space-between',marginBottom:4}}><span style={{fontSize:12,color:'var(--text-secondary)'}}>{k||'Unknown'}</span><span style={{fontSize:12,fontWeight:600,color:'var(--text-primary)'}}>{v}</span></div>)}
            </div>
          </div>
        </div>
        <div style={{background:'var(--surface)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:14,overflow:'hidden'}}>
          <div style={{padding:'16px 20px',borderBottom:'1px solid rgba(255,255,255,0.06)'}}><div style={{fontSize:14,fontWeight:600,color:'var(--text-primary)'}}>Recent Transactions</div></div>
          <div style={{display:'grid',gridTemplateColumns:'100px 90px 65px 65px 1fr 80px 80px',padding:'10px 20px',borderBottom:'1px solid rgba(255,255,255,0.06)',background:'rgba(59,130,246,0.04)'}}>
            {['Date','Value','Reg','BR','Project','Size','Price/sqft'].map((h,i)=><div key={i} style={{fontSize:10,color:'#475569',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.05em'}}>{h}</div>)}
          </div>
          {selected.recentTxns.map((t,i)=>{
            const ppsqft=t.s&&t.v?Math.round(t.v/t.s/10.764):0;
            return (
              <div key={i} style={{display:'grid',gridTemplateColumns:'100px 90px 65px 65px 1fr 80px 80px',padding:'11px 20px',borderBottom:i<selected.recentTxns.length-1?'1px solid rgba(255,255,255,0.03)':'none'}}
                onMouseEnter={e=>e.currentTarget.style.background='rgba(59,130,246,0.04)'}
                onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                <div style={{fontSize:11,color:'var(--text-muted)'}}>{t.d||'—'}</div>
                <div style={{fontSize:12,fontWeight:600,color:'var(--text-primary)'}}>{t.v?fmtAED(t.v,true):'—'}</div>
                <div><span style={{fontSize:9,fontWeight:600,padding:'2px 5px',borderRadius:20,background:t.r==='Off'?'rgba(59,130,246,0.1)':'rgba(34,197,94,0.1)',color:t.r==='Off'?'#38BDF8':'#22C55E'}}>{t.r==='Off'?'Off-Plan':'Ready'}</span></div>
                <div style={{fontSize:11,color:'var(--text-secondary)'}}>{t.b||'—'}</div>
                <div style={{fontSize:11,color:'var(--text-muted)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{t.j||'—'}</div>
                <div style={{fontSize:11,color:'var(--text-muted)'}}>{t.s?fmtNum(Math.round(t.s*10.764))+' sqft':'—'}</div>
                <div style={{fontSize:11,fontWeight:600,color:'#38BDF8'}}>{ppsqft?'AED '+fmtNum(ppsqft):'—'}</div>
              </div>
            );
          })}
        </div>
      </>}
    </div>
  );
}
