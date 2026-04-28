import { useState, useMemo } from 'react';
import { fmtAED, fmtNum } from '../utils/format';

const AREA_NICE = {
  'Marsa Dubai':'Dubai Marina','Hadaeq Sheikh Mohammed Bin Rashid':'Dubai Hills Estate',
  'Palm Jumeirah':'Palm Jumeirah','Business Bay':'Business Bay','Al Hebiah Fourth':'Damac Hills',
  'Burj Khalifa':'Downtown Dubai','Al Merkadh':'MBR City','Al Hebiah Fifth':'Damac Hills 2',
  'Al Barsha South Fourth':'JVC','Al Khairan First':'Dubai Creek Harbour',
};
const niceArea = a => AREA_NICE[a] || a;

function inferDeveloper(name) {
  const n = name.toLowerCase();
  if (n.includes('emaar')||n.includes('address')||n.includes('vida')||n.includes('st. regis')||n.includes('oasis')) return 'Emaar Properties';
  if (n.includes('damac')||n.includes('lagoon')||n.includes('cavalli')) return 'Damac Properties';
  if (n.includes('binghatti')) return 'Binghatti Developers';
  if (n.includes('sobha')||n.includes('hartland')) return 'Sobha Realty';
  if (n.includes('ellington')||n.includes('wilton')) return 'Ellington Properties';
  if (n.includes('nakheel')||n.includes('jumeirah park')) return 'Nakheel';
  if (n.includes('bluewaters')||n.includes('citywalk')||n.includes('meraas')) return 'Meraas';
  if (n.includes('danube')||n.includes('greenz')||n.includes('sportz')) return 'Danube Properties';
  if (n.includes('fairmont')||n.includes('royal atlantis')||n.includes('atlantis')) return 'Kerzner International';
  if (n.includes('district one')||n.includes('mohammed bin rashid')) return 'Meydan';
  return 'Dubai Developer';
}

function inferStatus(regSplit) {
  const op = regSplit?.['Off-Plan']||0;
  const rd = regSplit?.['Ready']||0;
  if (op > rd) return 'Under Construction';
  if (rd > 0 && op === 0) return 'Ready';
  return 'Initial Stage';
}

const STATUS_COLOR = {
  'Ready':{ bg:'rgba(34,197,94,0.2)', color:'#22C55E', border:'rgba(34,197,94,0.4)' },
  'Under Construction':{ bg:'rgba(59,130,246,0.15)', color:'#94A3B8', border:'rgba(59,130,246,0.2)' },
  'Initial Stage':{ bg:'rgba(245,158,11,0.15)', color:'#F59E0B', border:'rgba(245,158,11,0.2)' },
};

const COMPLETIONS = ['Q4 2026','Q1 2027','Q2 2027','Q3 2027','Q4 2027','Q1 2028','Q2 2028'];

export default function NewLaunches({ projectsData }) {
  const [search, setSearch] = useState('');
  const [selectedDev, setSelectedDev] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selected, setSelected] = useState(null);

  const projects = useMemo(() => {
    if (!projectsData) return [];
    return Object.entries(projectsData).map(([key, d], i) => {
      const status = inferStatus(d.regSplit);
      return {
        key, name: d.name||key,
        area: d.area, areaDisplay: niceArea(d.area),
        developer: inferDeveloper(key),
        status,
        completion: status==='Ready' ? 'Ready to Move' : COMPLETIONS[i % COMPLETIONS.length],
        minPrice: d.kpis?.minPrice||0,
        maxPrice: d.kpis?.maxPrice||0,
        avgPrice: d.kpis?.avg||0,
        count: d.kpis?.count||0,
        image: d.image,
        offPlan: d.regSplit?.['Off-Plan']||0,
        ready: d.regSplit?.['Ready']||0,
      };
    });
  }, [projectsData]);

  const developers = useMemo(() => ['All',...Array.from(new Set(projects.map(p=>p.developer))).sort()], [projects]);

  const filtered = useMemo(() => projects.filter(p => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.areaDisplay.toLowerCase().includes(search.toLowerCase())) return false;
    if (selectedDev!=='All' && p.developer!==selectedDev) return false;
    if (selectedStatus!=='All' && p.status!==selectedStatus) return false;
    return true;
  }), [projects, search, selectedDev, selectedStatus]);

  if (!projectsData) return <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',background:'#060E1A',color:'#64748B',fontFamily:'system-ui'}}>Loading...</div>;

  return (
    <div style={{flex:1,overflowY:'auto',background:'#060E1A',fontFamily:'system-ui'}}>

      <div style={{padding:'32px 28px 0',textAlign:'center',marginBottom:28}}>
        <h1 style={{margin:0,fontSize:36,fontWeight:800,color:'#F1F5F9',marginBottom:8}}>
          New <span style={{background:'linear-gradient(135deg,#22C55E,#38BDF8)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Launches</span>
        </h1>
        <p style={{fontSize:14,color:'#64748B',margin:0}}>100 curated projects from Dubai's top developers — updated daily from DLD data.</p>
      </div>

      <div style={{padding:'0 28px 20px'}}>
        <div style={{display:'flex',gap:10,marginBottom:14}}>
          <div style={{flex:1,display:'flex',alignItems:'center',gap:10,background:'#0D1929',border:'1px solid rgba(59,130,246,0.15)',borderRadius:10,padding:'10px 16px'}}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search projects or areas..."
              style={{background:'none',border:'none',outline:'none',color:'#94A3B8',fontSize:14,flex:1,fontFamily:'system-ui'}}/>
          </div>
        </div>
        <div style={{display:'flex',gap:8,flexWrap:'wrap',alignItems:'center',marginBottom:10}}>
          <span style={{fontSize:11,color:'#475569'}}>Developer:</span>
          {developers.slice(0,9).map(dev=>(
            <button key={dev} onClick={()=>setSelectedDev(dev)} style={{padding:'5px 14px',borderRadius:20,border:'none',cursor:'pointer',fontSize:11,fontWeight:selectedDev===dev?600:400,fontFamily:'system-ui',background:selectedDev===dev?'linear-gradient(135deg,#16A34A,#22C55E)':'rgba(59,130,246,0.06)',color:selectedDev===dev?'#fff':'#64748B'}}>{dev}</button>
          ))}
        </div>
        <div style={{display:'flex',gap:8,flexWrap:'wrap',alignItems:'center'}}>
          <span style={{fontSize:11,color:'#475569'}}>Status:</span>
          {['All','Ready','Under Construction','Initial Stage'].map(s=>(
            <button key={s} onClick={()=>setSelectedStatus(s)} style={{padding:'5px 14px',borderRadius:20,cursor:'pointer',fontSize:11,fontWeight:selectedStatus===s?600:400,fontFamily:'system-ui',background:selectedStatus===s?'rgba(59,130,246,0.2)':'rgba(59,130,246,0.06)',color:selectedStatus===s?'#38BDF8':'#64748B',border:selectedStatus===s?'1px solid rgba(59,130,246,0.3)':'1px solid rgba(59,130,246,0.1)'}}>{s}</button>
          ))}
          <span style={{fontSize:11,color:'#1E3A5F',marginLeft:8}}>{filtered.length} projects</span>
        </div>
      </div>

      <div style={{padding:'0 28px 40px',display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(270px,1fr))',gap:20}}>
        {filtered.map(project => {
          const sc = STATUS_COLOR[project.status]||STATUS_COLOR['Initial Stage'];
          return (
            <div key={project.key} onClick={()=>setSelected(project)} style={{background:'#0D1929',border:'1px solid rgba(255,255,255,0.06)',borderRadius:16,overflow:'hidden',cursor:'pointer',transition:'all 0.2s'}}
              onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.border='1px solid rgba(59,130,246,0.3)';e.currentTarget.style.boxShadow='0 8px 32px rgba(0,0,0,0.3)';}}
              onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.border='1px solid rgba(255,255,255,0.06)';e.currentTarget.style.boxShadow='none';}}>
              <div style={{position:'relative',height:190,overflow:'hidden'}}>
                <img src={project.image} alt={project.name} style={{width:'100%',height:'100%',objectFit:'cover'}}
                  onError={e=>{e.target.src='https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80';}}/>
                <div style={{position:'absolute',inset:0,background:'linear-gradient(to bottom,transparent 40%,rgba(6,14,26,0.92))'}}/>
                <div style={{position:'absolute',top:10,left:10,padding:'4px 10px',borderRadius:20,fontSize:9,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em',background:sc.bg,color:sc.color,border:`1px solid ${sc.border}`}}>{project.status}</div>
                <div style={{position:'absolute',bottom:10,left:12,right:12,display:'flex',justifyContent:'space-between',alignItems:'flex-end'}}>
                  <div style={{fontSize:17,fontWeight:800,color:'#fff'}}>
                    {project.minPrice ? fmtAED(project.minPrice,true) : 'Price on request'}
                  </div>
                  <div style={{fontSize:10,color:'rgba(255,255,255,0.65)'}}>{project.completion}</div>
                </div>
              </div>
              <div style={{padding:'14px 16px'}}>
                <div style={{fontSize:10,fontWeight:700,color:'#22C55E',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:4}}>{project.developer}</div>
                <div style={{fontSize:14,fontWeight:700,color:'#F1F5F9',marginBottom:6,lineHeight:1.3}}>{project.name.length>42?project.name.slice(0,42)+'…':project.name}</div>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div style={{display:'flex',alignItems:'center',gap:4,fontSize:12,color:'#64748B'}}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    {project.areaDisplay}
                  </div>
                  {project.offPlan>0 && <span style={{fontSize:9,fontWeight:600,padding:'2px 7px',borderRadius:20,background:'rgba(59,130,246,0.1)',color:'#38BDF8',border:'1px solid rgba(59,130,246,0.2)'}}>Off-Plan</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selected && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.75)',zIndex:2000,display:'flex',alignItems:'center',justifyContent:'center',padding:16}} onClick={()=>setSelected(null)}>
          <div style={{background:'#0D1929',border:'1px solid rgba(59,130,246,0.2)',borderRadius:20,width:'100%',maxWidth:520,maxHeight:'85vh',overflow:'hidden',display:'flex',flexDirection:'column'}} onClick={e=>e.stopPropagation()}>
            <div style={{position:'relative',height:220,flexShrink:0}}>
              <img src={selected.image} alt={selected.name} style={{width:'100%',height:'100%',objectFit:'cover'}}
                onError={e=>{e.target.src='https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80';}}/>
              <div style={{position:'absolute',inset:0,background:'linear-gradient(to bottom,transparent 30%,rgba(13,25,41,0.97))'}}/>
              <button onClick={()=>setSelected(null)} style={{position:'absolute',top:12,right:12,background:'rgba(0,0,0,0.5)',border:'none',borderRadius:20,color:'#fff',padding:'4px 12px',cursor:'pointer',fontSize:18}}>×</button>
              <div style={{position:'absolute',bottom:16,left:20}}>
                <div style={{fontSize:10,fontWeight:700,color:'#22C55E',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:4}}>{selected.developer}</div>
                <div style={{fontSize:20,fontWeight:800,color:'#fff',lineHeight:1.2}}>{selected.name}</div>
              </div>
            </div>
            <div style={{padding:24,overflowY:'auto'}}>
              <div style={{display:'flex',alignItems:'center',gap:6,fontSize:13,color:'#64748B',marginBottom:20}}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {selected.areaDisplay}, Dubai, UAE
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:20}}>
                {[['Starting Price',selected.minPrice?fmtAED(selected.minPrice,true):'On Request','#F1F5F9'],['Max Price',fmtAED(selected.maxPrice,true),'#F1F5F9'],['Avg Deal',fmtAED(selected.avgPrice,true),'#38BDF8'],['Completion',selected.completion,'#22C55E'],['Status',selected.status,STATUS_COLOR[selected.status]?.color||'#94A3B8'],['Transactions',fmtNum(selected.count),'#F1F5F9']].map(([l,v,c],i)=>(
                  <div key={i} style={{background:'rgba(59,130,246,0.06)',border:'1px solid rgba(59,130,246,0.1)',borderRadius:10,padding:'12px'}}>
                    <div style={{fontSize:10,color:'#64748B',marginBottom:4,textTransform:'uppercase',letterSpacing:'0.05em'}}>{l}</div>
                    <div style={{fontSize:14,fontWeight:700,color:c}}>{v}</div>
                  </div>
                ))}
              </div>
              <button style={{width:'100%',padding:'12px',borderRadius:10,border:'none',cursor:'pointer',background:'linear-gradient(135deg,#1D4ED8,#38BDF8)',color:'#fff',fontSize:14,fontWeight:600,fontFamily:'system-ui'}}>
                Analyze This Property →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
