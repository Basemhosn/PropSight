import { useState, useMemo } from 'react';
import { fmtAED, fmtNum } from '../utils/format';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area } from 'recharts';

const DEV_META = {
  'Emaar Properties':    { logo:'🏙️', color:'#38BDF8', founded:'1997', hq:'Dubai, UAE', desc:'Dubai\'s largest developer. Known for Burj Khalifa, Dubai Mall, and master-planned communities.' },
  'Damac Properties':    { logo:'💎', color:'#F59E0B', founded:'2002', hq:'Dubai, UAE', desc:'Luxury real estate developer known for branded residences with Versace, Bugatti, and Cavalli.' },
  'Nakheel':             { logo:'🌴', color:'#22C55E', founded:'2000', hq:'Dubai, UAE', desc:'Creator of Palm Jumeirah, The World Islands, and major waterfront developments.' },
  'Sobha Realty':        { logo:'⭐', color:'#A78BFA', founded:'1976', hq:'Dubai, UAE', desc:'Premium developer known for Sobha Hartland and high-quality construction standards.' },
  'Meraas':              { logo:'🎭', color:'#F87171', founded:'2007', hq:'Dubai, UAE', desc:'Creator of Bluewaters Island, City Walk, and La Mer. Dubai lifestyle destinations.' },
  'Ellington Properties':{ logo:'🎨', color:'#34D399', founded:'2014', hq:'Dubai, UAE', desc:'Boutique developer focused on design-led residential properties in prime locations.' },
  'Danube Properties':   { logo:'🏊', color:'#60A5FA', founded:'2014', hq:'Dubai, UAE', desc:'Known for affordable luxury with amenity-rich developments across Dubai.' },
  'Binghatti Developers':{ logo:'🔶', color:'#FBBF24', founded:'2008', hq:'Dubai, UAE', desc:'Fast-growing developer known for unique architectural designs and rapid delivery.' },
};

function inferDeveloper(name) {
  const n = name.toLowerCase();
  if (n.includes('emaar')||n.includes('address')||n.includes('vida')||n.includes('st. regis')||n.includes('oasis')||n.includes('hills estate')||n.includes('creek')) return 'Emaar Properties';
  if (n.includes('damac')||n.includes('lagoon')||n.includes('cavalli')||n.includes('altitude')) return 'Damac Properties';
  if (n.includes('nakheel')||n.includes('jumeirah park')||n.includes('palm')) return 'Nakheel';
  if (n.includes('sobha')||n.includes('hartland')) return 'Sobha Realty';
  if (n.includes('bluewaters')||n.includes('citywalk')||n.includes('meraas')||n.includes('la mer')) return 'Meraas';
  if (n.includes('ellington')||n.includes('wilton')) return 'Ellington Properties';
  if (n.includes('danube')||n.includes('sportz')||n.includes('bayz')) return 'Danube Properties';
  if (n.includes('binghatti')) return 'Binghatti Developers';
  return null;
}

export default function DeveloperTracker({ projectsData, areaData }) {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');

  const developers = useMemo(() => {
    if (!projectsData) return [];
    const map = {};
    Object.entries(projectsData).forEach(([key, d]) => {
      const dev = inferDeveloper(key);
      if (!dev) return;
      if (!map[dev]) map[dev] = { name:dev, projects:[], totalTxns:0, totalValue:0, offPlan:0, ready:0 };
      map[dev].projects.push({ name:d.name||key, area:d.area, kpis:d.kpis, image:d.image, priceTrend:d.priceTrend||[] });
      map[dev].totalTxns += d.kpis?.count||0;
      map[dev].totalValue += d.kpis?.total||0;
      map[dev].offPlan += d.regSplit?.['Off-Plan']||0;
      map[dev].ready += d.regSplit?.['Ready']||0;
    });
    return Object.values(map).sort((a,b)=>b.totalTxns-a.totalTxns);
  }, [projectsData]);

  const filtered = developers.filter(d => d.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{flex:1,display:'flex',background:'var(--bg)',fontFamily:'system-ui',position:'relative',overflow:'hidden'}}>

      {/* Main list */}
      <div style={{flex:1,overflowY:'auto',padding:'24px 28px',transition:'all 0.3s'}}>
        <div style={{marginBottom:24}}>
          <h1 style={{margin:0,fontSize:22,fontWeight:700,color:'var(--text-primary)',marginBottom:4}}>Developers</h1>
          <div style={{fontSize:13,color:'#475569'}}>Dubai's top real estate developers — click any to see full profile</div>
        </div>

        <div style={{display:'flex',alignItems:'center',gap:8,background:'var(--surface)',border:'1px solid rgba(59,130,246,0.15)',borderRadius:10,padding:'10px 16px',marginBottom:20}}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search developers..."
            style={{background:'none',border:'none',outline:'none',color:'var(--text-secondary)',fontSize:13,flex:1,fontFamily:'system-ui'}}/>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:16}}>
          {filtered.map(dev => {
            const meta = DEV_META[dev.name] || { logo:'🏢', color:'var(--text-muted)' };
            const opPct = dev.totalTxns ? Math.round(dev.offPlan/dev.totalTxns*100) : 0;
            return (
              <div key={dev.name} onClick={()=>setSelected(dev)} style={{background:'var(--surface)',border:`1px solid ${selected?.name===dev.name?meta.color+'40':'rgba(255,255,255,0.06)'}`,borderRadius:16,padding:20,cursor:'pointer',transition:'all 0.2s'}}
                onMouseEnter={e=>{e.currentTarget.style.border=`1px solid ${meta.color}40`;e.currentTarget.style.transform='translateY(-2px)';}}
                onMouseLeave={e=>{e.currentTarget.style.border=selected?.name===dev.name?`1px solid ${meta.color}40`:'1px solid rgba(255,255,255,0.06)';e.currentTarget.style.transform='translateY(0)';}}>
                <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:14}}>
                  <div style={{width:48,height:48,borderRadius:12,background:`${meta.color}15`,border:`1px solid ${meta.color}30`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:24,flexShrink:0}}>{meta.logo}</div>
                  <div>
                    <div style={{fontSize:14,fontWeight:700,color:'var(--text-primary)'}}>{dev.name}</div>
                    <div style={{fontSize:11,color:'#475569'}}>{dev.projects.length} projects tracked</div>
                  </div>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:12}}>
                  <div style={{background:'rgba(59,130,246,0.06)',borderRadius:8,padding:'8px 10px'}}>
                    <div style={{fontSize:10,color:'#475569',marginBottom:3}}>TRANSACTIONS</div>
                    <div style={{fontSize:15,fontWeight:700,color:'var(--text-primary)'}}>{fmtNum(dev.totalTxns)}</div>
                  </div>
                  <div style={{background:'rgba(59,130,246,0.06)',borderRadius:8,padding:'8px 10px'}}>
                    <div style={{fontSize:10,color:'#475569',marginBottom:3}}>TOTAL VALUE</div>
                    <div style={{fontSize:15,fontWeight:700,color:meta.color}}>{fmtAED(dev.totalValue,true)}</div>
                  </div>
                </div>
                <div style={{display:'flex',gap:6}}>
                  <span style={{fontSize:10,fontWeight:600,padding:'3px 8px',borderRadius:20,background:'rgba(59,130,246,0.1)',color:'#38BDF8'}}>{opPct}% Off-Plan</span>
                  <span style={{fontSize:10,fontWeight:600,padding:'3px 8px',borderRadius:20,background:'rgba(34,197,94,0.1)',color:'#22C55E'}}>{100-opPct}% Ready</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Slide-in panel */}
      {selected && (() => {
        const meta = DEV_META[selected.name] || { logo:'🏢', color:'var(--text-muted)', founded:'—', hq:'Dubai, UAE', desc:'' };
        const opPct = selected.totalTxns ? Math.round(selected.offPlan/selected.totalTxns*100) : 0;
        const avgDeal = selected.totalTxns ? Math.round(selected.totalValue/selected.totalTxns) : 0;
        const projectsByArea = selected.projects.reduce((m,p)=>{ const a=p.area||'Other'; m[a]=(m[a]||0)+1; return m; },{});
        const areaData2 = Object.entries(projectsByArea).map(([name,count])=>({name:name.length>15?name.slice(0,15)+'…':name,count})).sort((a,b)=>b.count-a.count).slice(0,6);

        return (
          <>
            <div onClick={()=>setSelected(null)} style={{position:'absolute',inset:0,background:'rgba(0,0,0,0.4)',zIndex:10}}/>
            <div style={{position:'absolute',right:0,top:0,bottom:0,width:480,background:'#0A1628',borderLeft:`1px solid ${meta.color}30`,zIndex:11,overflowY:'auto',boxShadow:'-8px 0 40px rgba(0,0,0,0.5)'}}>
              {/* Header */}
              <div style={{padding:24,borderBottom:'1px solid rgba(255,255,255,0.06)',background:`linear-gradient(135deg,${meta.color}10,rgba(6,14,26,0.5))`}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:16}}>
                  <div style={{display:'flex',alignItems:'center',gap:14}}>
                    <div style={{width:56,height:56,borderRadius:14,background:`${meta.color}15`,border:`2px solid ${meta.color}40`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:28}}>{meta.logo}</div>
                    <div>
                      <div style={{fontSize:18,fontWeight:800,color:'var(--text-primary)',marginBottom:2}}>{selected.name}</div>
                      <div style={{fontSize:12,color:'#475569'}}>Est. {meta.founded} · {meta.hq}</div>
                    </div>
                  </div>
                  <button onClick={()=>setSelected(null)} style={{background:'rgba(59,130,246,0.1)',border:'none',borderRadius:8,color:'var(--text-muted)',padding:'6px 10px',cursor:'pointer',fontSize:18}}>×</button>
                </div>
                <div style={{fontSize:13,color:'var(--text-secondary)',lineHeight:1.6}}>{meta.desc}</div>
              </div>

              <div style={{padding:24}}>
                {/* KPIs */}
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:20}}>
                  {[['Total Transactions',fmtNum(selected.totalTxns),meta.color],['Total Value',fmtAED(selected.totalValue,true),'var(--text-primary)'],['Avg Deal',fmtAED(avgDeal,true),'#38BDF8'],['Projects Tracked',selected.projects.length,'#22C55E'],['Off-Plan Share',opPct+'%','#38BDF8'],['Ready Share',(100-opPct)+'%','#22C55E']].map(([l,v,c],i)=>(
                    <div key={i} style={{background:'rgba(59,130,246,0.06)',border:'1px solid rgba(59,130,246,0.1)',borderRadius:10,padding:12}}>
                      <div style={{fontSize:10,color:'var(--text-muted)',marginBottom:4,textTransform:'uppercase',letterSpacing:'0.05em'}}>{l}</div>
                      <div style={{fontSize:16,fontWeight:700,color:c}}>{v}</div>
                    </div>
                  ))}
                </div>

                {/* Area distribution */}
                {areaData2.length > 0 && (
                  <div style={{marginBottom:20}}>
                    <div style={{fontSize:13,fontWeight:600,color:'var(--text-primary)',marginBottom:12}}>Projects by Area</div>
                    <ResponsiveContainer width="100%" height={140}>
                      <BarChart data={areaData2} margin={{top:4,right:4,left:0,bottom:0}}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)"/>
                        <XAxis dataKey="name" tick={{fontSize:9,fill:'#475569'}} axisLine={false} tickLine={false}/>
                        <YAxis hide/>
                        <Tooltip contentStyle={{background:'#0A1628',border:'1px solid rgba(59,130,246,0.2)',borderRadius:8,color:'var(--text-primary)',fontSize:11}}/>
                        <Bar dataKey="count" fill={meta.color} radius={[4,4,0,0]}/>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {/* Projects list */}
                <div style={{fontSize:13,fontWeight:600,color:'var(--text-primary)',marginBottom:12}}>Projects ({selected.projects.length})</div>
                <div style={{display:'flex',flexDirection:'column',gap:8}}>
                  {selected.projects.slice(0,12).map((proj,i)=>(
                    <div key={i} style={{background:'rgba(59,130,246,0.04)',border:'1px solid rgba(59,130,246,0.08)',borderRadius:10,padding:'12px 14px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                      <div>
                        <div style={{fontSize:12,fontWeight:600,color:'var(--text-primary)',marginBottom:2}}>{proj.name.length>35?proj.name.slice(0,35)+'…':proj.name}</div>
                        <div style={{fontSize:11,color:'#475569'}}>{proj.area} · {fmtNum(proj.kpis?.count||0)} txns</div>
                      </div>
                      <div style={{textAlign:'right'}}>
                        <div style={{fontSize:12,fontWeight:600,color:meta.color}}>{fmtAED(proj.kpis?.avg||0,true)}</div>
                        <div style={{fontSize:10,color:'#475569'}}>avg deal</div>
                      </div>
                    </div>
                  ))}
                  {selected.projects.length > 12 && <div style={{textAlign:'center',fontSize:12,color:'#475569',padding:'8px 0'}}>+{selected.projects.length-12} more projects</div>}
                </div>
              </div>
            </div>
          </>
        );
      })()}
    </div>
  );
}
