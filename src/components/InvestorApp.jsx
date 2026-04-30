import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import MapView from './MapView';
import { fmtAED, fmtNum } from '../utils/format';

const AREA_NICE = {
  'Al Barsha South Fourth':'JVC','Burj Khalifa':'Downtown Dubai','Marsa Dubai':'Dubai Marina',
  'Hadaeq Sheikh Mohammed Bin Rashid':'Dubai Hills','Al Thanyah Fifth':'JLT',
  'Business Bay':'Business Bay','Palm Jumeirah':'Palm Jumeirah','Al Merkadh':'MBR City',
  'Al Khairan First':'Creek Harbour','Wadi Al Safa 5':'Arabian Ranches',
  'Jabal Ali First':'Jebel Ali','Al Hebiah Fourth':'Damac Hills',
};
const na = a => AREA_NICE[a] || a;

const AREA_EMOJIS = {
  'Dubai Marina':'🌊','Downtown Dubai':'🏙️','JVC':'🏘️','Business Bay':'💼',
  'Dubai Hills':'🌿','Palm Jumeirah':'🌴','JLT':'🏢','MBR City':'✨',
  'Creek Harbour':'⚓','Arabian Ranches':'🐎','Damac Hills':'⛳','Jebel Ali':'🏗️',
};

const QUICK_AREAS = ['Business Bay','Marsa Dubai','Al Barsha South Fourth','Burj Khalifa','Hadaeq Sheikh Mohammed Bin Rashid','Palm Jumeirah','Al Merkadh','Al Thanyah Fifth'];

const VERDICT_STYLE = {
  'GOOD DEAL':{bg:'rgba(34,197,94,0.1)',border:'rgba(34,197,94,0.25)',color:'#22C55E'},
  'FAIR PRICE':{bg:'rgba(245,158,11,0.1)',border:'rgba(245,158,11,0.25)',color:'#F59E0B'},
  'OVERPRICED':{bg:'rgba(248,113,113,0.1)',border:'rgba(248,113,113,0.25)',color:'#F87171'},
  'ERROR':{bg:'rgba(100,116,139,0.1)',border:'rgba(100,116,139,0.2)',color:'var(--text-muted)'},
};

export default function InvestorApp({ areaData, recentRaw, core, onSwitchToBroker, projectsData, buildingsData }) {
  const { user, profile, signOut } = useAuth();
  const [themeMode, setThemeMode] = useState(() => localStorage.getItem('theme') || 'dark');
  const [showMenu, setShowMenu] = useState(false);
  const toggleTheme = () => {
    const next = themeMode === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    setThemeMode(next);
  };
  const [search, setSearch] = useState('');
  const [selectedArea, setSelectedArea] = useState(null);
  const [dealPrice, setDealPrice] = useState('');
  const [dealSize, setDealSize] = useState('');
  const [dealResult, setDealResult] = useState(null);
  const [dealLoading, setDealLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('discover');
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef = useRef(null);
  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedDeveloper, setSelectedDeveloper] = useState(null);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [savedKeys, setSavedKeys] = useState(new Set());

  const saveToWatchlist = async (type, name, key, area) => {
    const { supabase: sb } = await import('../context/AuthContext');
    const areaKey = type === 'area' ? key : area;
    await sb.from('watchlist').insert({
      user_id: user?.id, type, name, key, area: areaKey,
      current_ppsqm: areaData?.[areaKey]?.kpis?.ppsqm || 0,
      current_avg: areaData?.[areaKey]?.kpis?.avg || 0,
    });
    setSavedKeys(s => new Set([...s, key]));
  };

  useEffect(() => {
    fetch('/data/developers.json').then(r=>r.json()).then(d=>{ window.__devData = d.developers||[]; }).catch(()=>{});
    fetch('/data/buildings.json').then(r=>r.json()).then(d=>{ window.__bldData = d.index||[]; }).catch(()=>{});
  }, []);

  const areas = useMemo(() => {
    if (!areaData) return [];
    return Object.entries(areaData).map(([key, d]) => {
      const pt = d.priceTrend || [];
      const yoy = pt.length >= 2 ? ((pt[pt.length-1].ppsqm - pt[pt.length-2].ppsqm)/pt[pt.length-2].ppsqm*100) : 0;
      return {
        key, name: na(key),
        emoji: AREA_EMOJIS[na(key)] || '🏠',
        count: d.kpis?.count || 0,
        avg: d.kpis?.avg || 0,
        ppsqft: Math.round((d.kpis?.ppsqm||0)/10.764),
        yoy: parseFloat(yoy.toFixed(1)),
        offPlanPct: d.kpis?.count ? Math.round((d.kpis?.offPlan||0)/d.kpis.count*100) : 0,
      };
    }).sort((a,b) => b.count - a.count);
  }, [areaData]);

  const allSearchResults = useMemo(() => {
    if (!search || search.length < 2) return { areas: [], projects: [], developers: [], buildings: [] };
    const q = search.toLowerCase();

    const matchedAreas = areas
      .filter(a => a.name.toLowerCase().includes(q) || a.key.toLowerCase().includes(q))
      .slice(0, 3);

    const matchedProjects = projectsData ? Object.entries(projectsData)
      .filter(([k,v]) => k.toLowerCase().includes(q) || (v.area && na(v.area).toLowerCase().includes(q)))
      .slice(0, 4)
      .map(([k,v]) => ({ key: k, name: k, area: na(v.area||''), avg: v.kpis?.avg||0, count: v.kpis?.count||0 }))
      : [];

    const devData = window.__devData || [];
    const matchedDevs = devData
      .filter(d => d.name !== 'Other' && d.name.toLowerCase().includes(q))
      .slice(0, 2);

    const bldData = window.__bldData || [];
    const matchedBuildings = bldData
      .filter(b => b.name.toLowerCase().includes(q))
      .slice(0, 4);

    return { areas: matchedAreas, projects: matchedProjects, developers: matchedDevs, buildings: matchedBuildings };
  }, [search, areas, projectsData]);

  const suggestions = useMemo(() => allSearchResults.areas, [allSearchResults]);
  const hasResults = useMemo(() => Object.values(allSearchResults).some(v => v.length > 0), [allSearchResults]);

  const recentSales = useMemo(() => {
    if (!recentRaw?.length) return [];
    let rows = [...recentRaw].sort((a,b) => (b.d||'').localeCompare(a.d||''));
    if (selectedArea) rows = rows.filter(r => r.a === selectedArea.key);
    return rows.slice(0,10);
  }, [recentRaw, selectedArea]);

  const displayAreas = search.length > 1 ? suggestions : areas.filter(a => QUICK_AREAS.includes(a.key));

  const analyzeDeal = async () => {
    if (!selectedArea || !dealPrice) return;
    setDealLoading(true); setDealResult(null);
    const price = parseFloat(dealPrice.replace(/,/g,''));
    const size = parseFloat(dealSize.replace(/,/g,'')) || 0;
    const ppsqft = size > 0 ? Math.round(price/size) : 0;
    const marketPpsqft = selectedArea.ppsqft;
    const diff = marketPpsqft > 0 ? ((ppsqft - marketPpsqft)/marketPpsqft*100) : 0;
    try {
      const res = await fetch('/api/claude', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          model:'claude-haiku-4-5-20251001', max_tokens:500,
          messages:[{role:'user',content:`Dubai real estate deal analysis. Be brief and friendly for a regular investor.

Area: ${selectedArea.name}
Asking price: AED ${fmtNum(price)}
${size>0?`Size: ${size} sqft, Price/sqft: AED ${fmtNum(ppsqft)}`:'No size provided'}
Market avg price/sqft: AED ${fmtNum(marketPpsqft)}
YoY growth: ${selectedArea.yoy}%
${ppsqft>0?`This is ${Math.abs(diff.toFixed(1))}% ${diff>0?'above':'below'} market average`:''}

Respond ONLY with valid JSON (no markdown):
{"verdict":"GOOD DEAL","emoji":"✅","headline":"Brief 8-word summary","insight":"2 friendly sentences explaining the analysis.","action":"One clear recommendation."}`}]
        })
      });
      const data = await res.json();
      const text = data.content?.[0]?.text || '';
      const parsed = JSON.parse(text.replace(/```json|```/g,'').trim());
      setDealResult({...parsed, price, ppsqft, marketPpsqft, diff});
    } catch(e) {
      setDealResult({verdict:'ERROR',emoji:'⚠️',headline:'Could not analyze',insight:'Please try again.',action:'Check your connection.'});
    }
    setDealLoading(false);
  };

  const inp = {width:'100%',padding:'12px 14px',borderRadius:10,background:'var(--bg-alt)',border:'1px solid rgba(59,130,246,0.15)',color:'var(--text-primary)',fontSize:14,outline:'none',fontFamily:'inherit',boxSizing:'border-box'};

  return (
    <div style={{minHeight:'100vh',background:'var(--bg)',fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",color:'var(--text-primary)'}}>
      <style>{`
        .inv-card{transition:all 0.2s;cursor:pointer}
        .inv-card:hover{transform:translateY(-2px);border-color:rgba(56,189,248,0.3)!important;box-shadow:0 8px 24px rgba(0,0,0,0.3)}
        .inv-tab-btn{transition:all 0.15s;cursor:pointer;border:none;fontFamily:inherit}
        .inv-row:hover{background:rgba(59,130,246,0.04)!important}
        @keyframes spin{to{transform:rotate(360deg)}}
      `}</style>

      {/* NAV */}
      <nav style={{position:'sticky',top:0,zIndex:100,background:'var(--bg-alt)',backdropFilter:'blur(20px)',borderBottom:'1px solid var(--border)',height:58,padding:'0 24px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <div style={{width:28,height:28,borderRadius:7,background:'linear-gradient(135deg,#1D4ED8,#38BDF8)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14}}>🏙️</div>
          <span style={{fontSize:17,fontWeight:700,color:'var(--text-primary)'}}>Prop<span style={{color:'#38BDF8'}}>Sight</span></span>
        </div>

        <div style={{display:'flex',gap:2,background:'rgba(255,255,255,0.04)',borderRadius:10,padding:3}}>
          {[['discover','🔍 Discover'],['map','🗺️ Map'],['deal','⚡ Deal Check'],['feed','📋 Recent Sales']].map(([id,lbl])=>(
            <button key={id} onClick={()=>setActiveTab(id)} className="inv-tab-btn" style={{padding:'6px 14px',borderRadius:8,fontSize:13,fontWeight:activeTab===id?600:400,background:activeTab===id?'var(--surface)':'transparent',color:activeTab===id?'var(--text-primary)':'var(--text-muted)',boxShadow:activeTab===id?'0 1px 4px rgba(0,0,0,0.3)':'none'}}>
              {lbl}
            </button>
          ))}
        </div>

        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <div style={{display:'flex',alignItems:'center',gap:6,background:'rgba(56,189,248,0.08)',border:'1px solid rgba(56,189,248,0.15)',borderRadius:20,padding:'4px 12px'}}>
            <span style={{fontSize:11}}>👤</span>
            <span style={{fontSize:11,fontWeight:600,color:'#38BDF8'}}>Investor Portal</span>
          </div>
          {profile?.subscription_status === 'pro' || profile?.subscription_status === 'agent' ? (
            <button onClick={onSwitchToBroker} style={{fontSize:11,color:'var(--text-secondary)',background:'none',border:'1px solid rgba(255,255,255,0.07)',borderRadius:8,padding:'5px 10px',cursor:'pointer',fontFamily:'inherit'}}>
              Switch to Broker →
            </button>
          ) : null}
          <button onClick={toggleTheme} style={{background:'none',border:'1px solid var(--border)',borderRadius:8,padding:'5px 10px',fontSize:12,color:'var(--text-secondary)',cursor:'pointer',fontFamily:'inherit'}}>
            {themeMode === 'dark' ? '☀️' : '🌙'}
          </button>
          <div style={{position:'relative'}}>
            <div style={{width:30,height:30,borderRadius:'50%',background:'linear-gradient(135deg,#1D4ED8,#38BDF8)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:13,fontWeight:700,cursor:'pointer'}} onClick={()=>setShowMenu(m=>!m)}>
              {(profile?.full_name?.[0]||user?.email?.[0]||'U').toUpperCase()}
            </div>
            {showMenu && (
              <div style={{position:'absolute',right:0,top:38,background:'var(--surface)',border:'1px solid var(--border)',borderRadius:10,padding:8,minWidth:160,boxShadow:'0 8px 24px rgba(0,0,0,0.2)',zIndex:999}}>
                <div style={{fontSize:12,color:'var(--text-muted)',padding:'4px 8px',marginBottom:4}}>{user?.email}</div>
                <button onClick={()=>{setShowMenu(false);signOut();}} style={{width:'100%',padding:'8px',borderRadius:8,border:'none',background:'none',cursor:'pointer',fontSize:13,color:'#F87171',textAlign:'left',fontFamily:'inherit'}}>
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div style={{maxWidth:880,margin:'0 auto',padding:'32px 20px'}}>

        {/* DISCOVER */}
        {activeTab==='discover' && <>
          <div style={{textAlign:'center',marginBottom:32}}>
            <h1 style={{fontSize:'clamp(22px,3vw,32px)',fontWeight:700,color:'var(--text-primary)',marginBottom:8,letterSpacing:'-0.02em'}}>What are you looking for?</h1>
            <p style={{fontSize:15,color:'var(--text-muted)',marginBottom:24}}>Search any area or project in Dubai</p>
            <div ref={searchRef} style={{position:'relative',maxWidth:520,margin:'0 auto'}}>
              <div style={{display:'flex',alignItems:'center',gap:12,background:'var(--surface)',border:'2px solid rgba(59,130,246,0.2)',borderRadius:14,padding:'13px 18px',boxShadow:'0 4px 20px rgba(0,0,0,0.3)'}}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                <input value={search} onChange={e=>{setSearch(e.target.value);setSelectedArea(null);}} onFocus={()=>setSearchFocused(true)} placeholder="Dubai Marina, Business Bay, Emaar..." style={{background:'none',border:'none',outline:'none',color:'var(--text-primary)',fontSize:15,flex:1,fontFamily:'inherit'}}/>
                {search && <button onClick={()=>{setSearch('');setSelectedArea(null);}} style={{background:'none',border:'none',cursor:'pointer',color:'var(--text-secondary)',fontSize:18,lineHeight:1,padding:0}}>×</button>}
              </div>
              {search.length>1 && hasResults && searchFocused && (
                <div style={{position:'absolute',top:'calc(100% + 8px)',left:0,right:0,background:'var(--surface)',border:'1px solid var(--border)',borderRadius:16,zIndex:50,overflow:'hidden',boxShadow:'0 16px 48px rgba(0,0,0,0.4)',maxHeight:480,overflowY:'auto'}}>
                  
                  {/* Areas */}
                  {allSearchResults.areas.length > 0 && (
                    <div>
                      <div style={{padding:'10px 16px 6px',fontSize:10,fontWeight:700,color:'var(--text-muted)',textTransform:'uppercase',letterSpacing:'0.1em',borderBottom:'1px solid var(--border)'}}>📍 Areas</div>
                      {allSearchResults.areas.map((a,i)=>(
                        <button key={i} onClick={()=>{setSelectedArea(a);setSearch('');setSearchFocused(false);}} style={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'100%',padding:'12px 16px',background:'none',border:'none',cursor:'pointer',fontFamily:'inherit',borderBottom:'1px solid var(--border)'}}
                          onMouseEnter={e=>e.currentTarget.style.background='rgba(59,130,246,0.06)'}
                          onMouseLeave={e=>e.currentTarget.style.background='none'}>
                          <div style={{display:'flex',alignItems:'center',gap:12}}>
                            <div style={{width:36,height:36,borderRadius:10,background:'linear-gradient(135deg,rgba(29,78,216,0.2),rgba(56,189,248,0.1))',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,flexShrink:0}}>{a.emoji}</div>
                            <div style={{textAlign:'left'}}>
                              <div style={{fontSize:14,fontWeight:600,color:'var(--text-primary)'}}>{a.name}</div>
                              <div style={{fontSize:11,color:'var(--text-secondary)'}}>{fmtNum(a.count)} transactions</div>
                            </div>
                          </div>
                          <div style={{textAlign:'right'}}>
                            <div style={{fontSize:14,fontWeight:700,color:'#38BDF8'}}>AED {fmtNum(a.ppsqft)}<span style={{fontSize:10,color:'var(--text-muted)',fontWeight:400}}>/sqft</span></div>
                            <div style={{fontSize:11,fontWeight:600,color:a.yoy>=0?'#22C55E':'#F87171'}}>{a.yoy>=0?'+':''}{a.yoy}% YoY</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Projects */}
                  {allSearchResults.projects.length > 0 && (
                    <div>
                      <div style={{padding:'10px 16px 6px',fontSize:10,fontWeight:700,color:'var(--text-muted)',textTransform:'uppercase',letterSpacing:'0.1em',borderBottom:'1px solid var(--border)'}}>🏗️ Projects</div>
                      {allSearchResults.projects.map((p,i)=>(
                        <button key={i} onClick={()=>{setSelectedProject(p);setSearch('');setSearchFocused(false);}} style={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'100%',padding:'12px 16px',background:'none',border:'none',cursor:'pointer',fontFamily:'inherit',borderBottom:'1px solid var(--border)'}}
                          onMouseEnter={e=>e.currentTarget.style.background='rgba(59,130,246,0.06)'}
                          onMouseLeave={e=>e.currentTarget.style.background='none'}>
                          <div style={{display:'flex',alignItems:'center',gap:12}}>
                            <div style={{width:36,height:36,borderRadius:10,background:'linear-gradient(135deg,rgba(245,158,11,0.2),rgba(251,191,36,0.1))',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,flexShrink:0}}>🏗️</div>
                            <div style={{textAlign:'left'}}>
                              <div style={{fontSize:14,fontWeight:600,color:'var(--text-primary)'}}>{p.name}</div>
                              <div style={{fontSize:11,color:'var(--text-secondary)'}}>📍 {p.area} · {fmtNum(p.count)} transactions</div>
                            </div>
                          </div>
                          <div style={{textAlign:'right'}}>
                            <div style={{fontSize:13,fontWeight:700,color:'var(--text-primary)'}}>{fmtAED(p.avg,true)}</div>
                            <div style={{fontSize:10,color:'var(--text-muted)'}}>avg price</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Developers */}
                  {allSearchResults.developers.length > 0 && (
                    <div>
                      <div style={{padding:'10px 16px 6px',fontSize:10,fontWeight:700,color:'var(--text-muted)',textTransform:'uppercase',letterSpacing:'0.1em',borderBottom:'1px solid var(--border)'}}>🏢 Developers</div>
                      {allSearchResults.developers.map((d,i)=>(
                        <button key={i} onClick={()=>{setSelectedDeveloper(d);setSearch('');setSearchFocused(false);}} style={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'100%',padding:'12px 16px',background:'none',border:'none',cursor:'pointer',fontFamily:'inherit',borderBottom:'1px solid var(--border)'}}
                          onMouseEnter={e=>e.currentTarget.style.background='rgba(59,130,246,0.06)'}
                          onMouseLeave={e=>e.currentTarget.style.background='none'}>
                          <div style={{display:'flex',alignItems:'center',gap:12}}>
                            <div style={{width:36,height:36,borderRadius:10,background:'linear-gradient(135deg,rgba(139,92,246,0.2),rgba(167,139,250,0.1))',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,flexShrink:0}}>🏢</div>
                            <div style={{textAlign:'left'}}>
                              <div style={{fontSize:14,fontWeight:600,color:'var(--text-primary)'}}>{d.name}</div>
                              <div style={{fontSize:11,color:'var(--text-secondary)'}}>{fmtNum(d.count)} total transactions</div>
                            </div>
                          </div>
                          <div style={{fontSize:13,fontWeight:700,color:'#A78BFA'}}>{fmtAED(d.avg,true)}</div>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Buildings */}
                  {allSearchResults.buildings.length > 0 && (
                    <div>
                      <div style={{padding:'10px 16px 6px',fontSize:10,fontWeight:700,color:'var(--text-muted)',textTransform:'uppercase',letterSpacing:'0.1em',borderBottom:'1px solid var(--border)'}}>🏠 Buildings</div>
                      {allSearchResults.buildings.map((b,i)=>(
                        <button key={i} onClick={()=>{setSelectedBuilding(b);setSearch('');setSearchFocused(false);}} style={{display:'flex',alignItems:'center',gap:12,width:'100%',padding:'12px 16px',background:'none',border:'none',cursor:'pointer',fontFamily:'inherit',borderBottom:i<allSearchResults.buildings.length-1?'1px solid var(--border)':'none'}}
                          onMouseEnter={e=>e.currentTarget.style.background='rgba(59,130,246,0.06)'}
                          onMouseLeave={e=>e.currentTarget.style.background='none'}>
                          <div style={{width:36,height:36,borderRadius:10,background:'linear-gradient(135deg,rgba(34,197,94,0.15),rgba(34,197,94,0.05))',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,flexShrink:0}}>🏠</div>
                          <div style={{textAlign:'left'}}>
                            <div style={{fontSize:14,fontWeight:600,color:'var(--text-primary)'}}>{b.name}</div>
                            <div style={{fontSize:11,color:'var(--text-secondary)'}}>📍 {na(b.area||'')} · {fmtNum(b.count)} transactions</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                </div>
              )}
            </div>
          </div>

          {selectedArea && (
            <div style={{background:'linear-gradient(135deg,rgba(29,78,216,0.1),rgba(6,14,26,0.5))',border:'1px solid rgba(59,130,246,0.2)',borderRadius:20,padding:24,marginBottom:24}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:20}}>
                <div style={{display:'flex',alignItems:'center',gap:12}}>
                  <span style={{fontSize:36}}>{selectedArea.emoji}</span>
                  <div>
                    <h2 style={{fontSize:22,fontWeight:700,color:'var(--text-primary)',margin:0,marginBottom:4}}>{selectedArea.name}</h2>
                    <div style={{fontSize:13,color:'var(--text-secondary)'}}>{fmtNum(selectedArea.count)} total transactions</div>
                  </div>
                </div>
                <div style={{background:selectedArea.yoy>=0?'rgba(34,197,94,0.1)':'rgba(248,113,113,0.1)',border:`1px solid ${selectedArea.yoy>=0?'rgba(34,197,94,0.2)':'rgba(248,113,113,0.2)'}`,borderRadius:20,padding:'6px 14px',display:'flex',alignItems:'center',gap:6}}>
                  <span>{selectedArea.yoy>=0?'📈':'📉'}</span>
                  <span style={{fontSize:14,fontWeight:700,color:selectedArea.yoy>=0?'#22C55E':'#F87171'}}>{selectedArea.yoy>=0?'+':''}{selectedArea.yoy}% YoY</span>
                </div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,marginBottom:18}}>
                {[['Avg Sale Price',fmtAED(selectedArea.avg,true),'var(--text-primary)','💰'],['Price / sqft','AED '+fmtNum(selectedArea.ppsqft),'#38BDF8','📐'],['Off-Plan Share',selectedArea.offPlanPct+'%','#F59E0B','🏗️']].map(([l,v,c,icon],i)=>(
                  <div key={i} style={{background:'rgba(255,255,255,0.04)',borderRadius:12,padding:'14px',textAlign:'center'}}>
                    <div style={{fontSize:18,marginBottom:6}}>{icon}</div>
                    <div style={{fontSize:10,color:'var(--text-muted)',marginBottom:4,textTransform:'uppercase',letterSpacing:'0.05em'}}>{l}</div>
                    <div style={{fontSize:18,fontWeight:700,color:c}}>{v}</div>
                  </div>
                ))}
              </div>
              {/* Price trend sparkline */}
              {areaData && areaData[selectedArea.key]?.priceTrend?.length > 1 && (
                <div style={{marginBottom:16}}>
                  <div style={{fontSize:11,color:'var(--text-muted)',marginBottom:8,textTransform:'uppercase',letterSpacing:'0.05em',fontWeight:600}}>Price Trend (AED/sqft)</div>
                  <div style={{display:'flex',alignItems:'flex-end',gap:3,height:40}}>
                    {areaData[selectedArea.key].priceTrend.slice(-12).map((p,i,arr)=>{
                      const vals=arr.map(x=>Math.round((x.ppsqm||0)/10.764));
                      const min=Math.min(...vals),max=Math.max(...vals);
                      const h=max===min?100:Math.round(((vals[i]-min)/(max-min))*80)+20;
                      const isLast=i===arr.length-1;
                      return <div key={i} style={{flex:1,height:h+'%',borderRadius:'3px 3px 0 0',background:isLast?'#38BDF8':'rgba(56,189,248,0.3)',transition:'height 0.3s'}} title={`AED ${fmtNum(vals[i])}/sqft`}/>;
                    })}
                  </div>
                  <div style={{display:'flex',justifyContent:'space-between',marginTop:4}}>
                    <span style={{fontSize:10,color:'var(--text-muted)'}}>{areaData[selectedArea.key].priceTrend.slice(-12)[0]?.month||''}</span>
                    <span style={{fontSize:10,color:'#38BDF8',fontWeight:600}}>AED {fmtNum(selectedArea.ppsqft)}/sqft</span>
                  </div>
                </div>
              )}
              <div style={{display:'flex',gap:10}}>
                <button onClick={()=>setActiveTab('deal')} style={{flex:1,padding:'11px',borderRadius:11,border:'none',cursor:'pointer',background:'linear-gradient(135deg,#1D4ED8,#38BDF8)',color:'#fff',fontSize:14,fontWeight:600,fontFamily:'inherit'}}>⚡ Check a deal here</button>
                <button onClick={()=>setActiveTab('feed')} style={{flex:1,padding:'11px',borderRadius:11,border:'1px solid rgba(255,255,255,0.08)',cursor:'pointer',background:'rgba(255,255,255,0.04)',color:'var(--text-secondary)',fontSize:14,fontFamily:'inherit'}}>📋 Recent sales</button>
              </div>
              <button onClick={()=>setSelectedArea(null)} style={{marginTop:10,background:'none',border:'none',cursor:'pointer',fontSize:12,color:'var(--text-muted)',fontFamily:'inherit',width:'100%',textAlign:'center'}}>✕ Close</button>
            </div>
          )}

          {!search && (
            <div onClick={()=>setActiveTab('map')} style={{display:'flex',alignItems:'center',gap:16,background:'linear-gradient(135deg,rgba(29,78,216,0.12),rgba(56,189,248,0.08))',border:'1px solid rgba(56,189,248,0.2)',borderRadius:16,padding:'16px 20px',marginBottom:20,cursor:'pointer',transition:'all 0.2s'}}
              onMouseEnter={e=>e.currentTarget.style.borderColor='rgba(56,189,248,0.4)'}
              onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(56,189,248,0.2)'}>
              <div style={{width:44,height:44,borderRadius:12,background:'linear-gradient(135deg,#1D4ED8,#38BDF8)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,flexShrink:0}}>🗺️</div>
              <div style={{flex:1}}>
                <div style={{fontSize:15,fontWeight:700,color:'var(--text-primary)',marginBottom:3}}>Explore Dubai on the Map</div>
                <div style={{fontSize:13,color:'var(--text-secondary)'}}>Browse areas visually — see price heatmap, click any area to explore</div>
              </div>
              <div style={{fontSize:20,color:'var(--text-muted)'}}>→</div>
            </div>
          )}
          <div style={{fontSize:12,fontWeight:600,color:'var(--text-secondary)',marginBottom:12,textTransform:'uppercase',letterSpacing:'0.07em'}}>{search.length>1?`${suggestions.length} results`:'Popular areas'}</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(190px,1fr))',gap:12}}>
            {displayAreas.map((a,i)=>(
              <div key={i} className="inv-card" onClick={()=>{setSelectedArea(a);window.scrollTo({top:0,behavior:'smooth'});}} style={{background:'var(--surface)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:14,padding:'16px'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:10}}>
                  <span style={{fontSize:24}}>{a.emoji}</span>
                  <span style={{fontSize:11,fontWeight:700,padding:'3px 8px',borderRadius:20,background:a.yoy>=0?'rgba(34,197,94,0.1)':'rgba(248,113,113,0.1)',color:a.yoy>=0?'#22C55E':'#F87171'}}>{a.yoy>=0?'+':''}{a.yoy}%</span>
                </div>
                <div style={{fontSize:14,fontWeight:600,color:'var(--text-primary)',marginBottom:4}}>{a.name}</div>
                <div style={{fontSize:20,fontWeight:700,color:'#38BDF8',marginBottom:2}}>AED {fmtNum(a.ppsqft)}<span style={{fontSize:10,color:'var(--text-secondary)',fontWeight:400}}>/sqft</span></div>
                <div style={{fontSize:11,color:'var(--text-secondary)'}}>{fmtNum(a.count)} transactions</div>
              </div>
            ))}
          </div>
        </>}

        {/* DEAL CHECK */}
        {activeTab==='deal' && (
          <div style={{maxWidth:560,margin:'0 auto'}}>
            <div style={{textAlign:'center',marginBottom:28}}>
              <h1 style={{fontSize:26,fontWeight:700,color:'var(--text-primary)',marginBottom:6}}>⚡ Deal Check</h1>
              <p style={{fontSize:14,color:'var(--text-muted)'}}>Enter a property you are considering — get an instant AI verdict</p>
            </div>
            <div style={{background:'var(--surface)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:18,padding:24,marginBottom:16}}>
              <div style={{marginBottom:14}}>
                <label style={{fontSize:11,color:'var(--text-muted)',marginBottom:6,display:'block',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.05em'}}>Area *</label>
                <select value={selectedArea?.key||''} onChange={e=>{const a=areas.find(x=>x.key===e.target.value);setSelectedArea(a||null);setDealResult(null);}} style={{...inp,cursor:'pointer',appearance:'none'}}>
                  <option value="">Select an area...</option>
                  {areas.map(a=><option key={a.key} value={a.key}>{a.name}</option>)}
                </select>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:18}}>
                <div>
                  <label style={{fontSize:11,color:'var(--text-muted)',marginBottom:6,display:'block',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.05em'}}>Asking Price (AED) *</label>
                  <input value={dealPrice} onChange={e=>{setDealPrice(e.target.value);setDealResult(null);}} placeholder="2,500,000" style={inp}/>
                </div>
                <div>
                  <label style={{fontSize:11,color:'var(--text-muted)',marginBottom:6,display:'block',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.05em'}}>Size (sqft)</label>
                  <input value={dealSize} onChange={e=>{setDealSize(e.target.value);setDealResult(null);}} placeholder="1,200" style={inp}/>
                </div>
              </div>
              <button onClick={analyzeDeal} disabled={dealLoading||!selectedArea||!dealPrice} style={{width:'100%',padding:'13px',borderRadius:11,border:'none',cursor:'pointer',background:'linear-gradient(135deg,#1D4ED8,#38BDF8)',color:'#fff',fontSize:15,fontWeight:600,fontFamily:'inherit',opacity:dealLoading||!selectedArea||!dealPrice?0.5:1}}>
                {dealLoading?'Analyzing...':'Analyze this deal →'}
              </button>
            </div>
            {dealLoading && <div style={{textAlign:'center',padding:32}}><div style={{width:36,height:36,border:'3px solid rgba(59,130,246,0.2)',borderTopColor:'#38BDF8',borderRadius:'50%',animation:'spin 0.8s linear infinite',margin:'0 auto 12px'}}/><div style={{fontSize:13,color:'var(--text-muted)'}}>Analyzing with AI...</div></div>}
            {dealResult && !dealLoading && (()=>{
              const vs = VERDICT_STYLE[dealResult.verdict]||VERDICT_STYLE['FAIR PRICE'];
              return (
                <div style={{background:vs.bg,border:`2px solid ${vs.border}`,borderRadius:18,padding:24}}>
                  <div style={{textAlign:'center',marginBottom:18}}>
                    <div style={{fontSize:44,marginBottom:6}}>{dealResult.emoji}</div>
                    <div style={{fontSize:22,fontWeight:800,color:vs.color,marginBottom:4}}>{dealResult.verdict}</div>
                    <div style={{fontSize:15,fontWeight:600,color:'var(--text-primary)',marginBottom:8}}>{dealResult.headline}</div>
                    <div style={{fontSize:13,color:'var(--text-secondary)',lineHeight:1.65}}>{dealResult.insight}</div>
                  </div>
                  {/* PropSight Estimate Badge */}
                  <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:10,background:'rgba(56,189,248,0.06)',border:'1px solid rgba(56,189,248,0.15)',borderRadius:14,padding:'12px 18px',marginBottom:14}}>
                    <div style={{width:32,height:32,borderRadius:8,background:'linear-gradient(135deg,#1D4ED8,#38BDF8)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,flexShrink:0}}>🏙️</div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:10,color:'#38BDF8',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:2}}>PropSight Estimate</div>
                      <div style={{fontSize:16,fontWeight:800,color:'var(--text-primary)'}}>{dealResult.fairValue||'AED '+fmtNum(Math.round(parseInt(dealPrice.replace(/,/g,''))*(dealResult.verdict==='GOOD DEAL'?1.08:dealResult.verdict==='OVERPRICED'?0.92:1.0)))}</div>
                    </div>
                    <div style={{textAlign:'right'}}>
                      <div style={{fontSize:10,color:'var(--text-muted)',marginBottom:2}}>Confidence</div>
                      <div style={{fontSize:13,fontWeight:700,color:vs.color}}>{dealResult.confidence||'High'}</div>
                    </div>
                  </div>
                  {dealResult.ppsqft>0 && (
                    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:14}}>
                      <div style={{background:'rgba(255,255,255,0.05)',borderRadius:10,padding:'12px',textAlign:'center'}}>
                        <div style={{fontSize:10,color:'var(--text-muted)',marginBottom:3,textTransform:'uppercase'}}>Your price/sqft</div>
                        <div style={{fontSize:17,fontWeight:700,color:'var(--text-primary)'}}>AED {fmtNum(dealResult.ppsqft)}</div>
                      </div>
                      <div style={{background:'rgba(255,255,255,0.05)',borderRadius:10,padding:'12px',textAlign:'center'}}>
                        <div style={{fontSize:10,color:'var(--text-muted)',marginBottom:3,textTransform:'uppercase'}}>Market avg/sqft</div>
                        <div style={{fontSize:17,fontWeight:700,color:'#38BDF8'}}>AED {fmtNum(dealResult.marketPpsqft)}</div>
                      </div>
                    </div>
                  )}
                  <div style={{background:'rgba(255,255,255,0.06)',borderRadius:10,padding:'12px',textAlign:'center'}}>
                    <div style={{fontSize:10,color:'var(--text-muted)',marginBottom:4,textTransform:'uppercase',letterSpacing:'0.05em'}}>What to do</div>
                    <div style={{fontSize:13,color:'var(--text-primary)',fontWeight:500}}>{dealResult.action}</div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}


        {/* PROJECT PROFILE */}
        {selectedProject && activeTab==='discover' && (
          <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:20,padding:24,marginBottom:24}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
              <div style={{display:'flex',alignItems:'center',gap:12}}>
                <div style={{width:48,height:48,borderRadius:14,background:'linear-gradient(135deg,rgba(245,158,11,0.2),rgba(251,191,36,0.1))',display:'flex',alignItems:'center',justifyContent:'center',fontSize:24}}>🏗️</div>
                <div>
                  <h2 style={{fontSize:20,fontWeight:700,color:'var(--text-primary)',margin:0,marginBottom:4}}>{selectedProject.name}</h2>
                  <div style={{fontSize:13,color:'var(--text-secondary)'}}>📍 {selectedProject.area}</div>
                </div>
              </div>
              <button onClick={()=>setSelectedProject(null)} style={{background:'none',border:'1px solid var(--border)',borderRadius:8,color:'var(--text-muted)',cursor:'pointer',padding:'6px 12px',fontSize:12,fontFamily:'inherit'}}>✕ Close</button>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginBottom:20}}>
              {[
                ['Total Transactions', fmtNum(selectedProject.count), '📊'],
                ['Avg Price', fmtAED(selectedProject.avg, true), '💰'],
                ['Area', selectedProject.area, '📍'],
                ['Type', 'Residential', '🏠'],
              ].map(([l,v,icon],i)=>(
                <div key={i} style={{background:'var(--bg)',borderRadius:12,padding:'14px',textAlign:'center',border:'1px solid var(--border)'}}>
                  <div style={{fontSize:18,marginBottom:6}}>{icon}</div>
                  <div style={{fontSize:10,color:'var(--text-muted)',marginBottom:4,textTransform:'uppercase',letterSpacing:'0.05em'}}>{l}</div>
                  <div style={{fontSize:15,fontWeight:700,color:'var(--text-primary)'}}>{v}</div>
                </div>
              ))}
            </div>
            {projectsData?.[selectedProject.key]?.priceTrend?.length > 1 && (
              <div style={{marginBottom:16}}>
                <div style={{fontSize:11,color:'var(--text-muted)',marginBottom:8,textTransform:'uppercase',letterSpacing:'0.05em',fontWeight:600}}>Price Trend (AED/sqft)</div>
                <div style={{display:'flex',alignItems:'flex-end',gap:3,height:48}}>
                  {projectsData[selectedProject.key].priceTrend.slice(-12).map((p,i,arr)=>{
                    const vals=arr.map(x=>Math.round((x.ppsqm||0)/10.764));
                    const min=Math.min(...vals),max=Math.max(...vals);
                    const h=max===min?100:Math.round(((vals[i]-min)/(max-min))*80)+20;
                    return <div key={i} style={{flex:1,height:h+'%',borderRadius:'3px 3px 0 0',background:i===arr.length-1?'#38BDF8':'rgba(56,189,248,0.3)'}}/>;
                  })}
                </div>
              </div>
            )}
            <button onClick={()=>{const a=areas.find(x=>na(x.key)===selectedProject.area||x.key===selectedProject.area);if(a){setSelectedArea(a);}setActiveTab('deal');}} style={{width:'100%',padding:'11px',borderRadius:11,border:'none',cursor:'pointer',background:'linear-gradient(135deg,#1D4ED8,#38BDF8)',color:'#fff',fontSize:14,fontWeight:600,fontFamily:'inherit'}}>
              ⚡ Check a deal in {selectedProject.area}
            </button>
          </div>
        )}

        {/* DEVELOPER PROFILE */}
        {selectedDeveloper && activeTab==='discover' && (
          <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:20,padding:24,marginBottom:24}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
              <div style={{display:'flex',alignItems:'center',gap:12}}>
                <div style={{width:48,height:48,borderRadius:14,background:'linear-gradient(135deg,rgba(139,92,246,0.2),rgba(167,139,250,0.1))',display:'flex',alignItems:'center',justifyContent:'center',fontSize:24}}>🏢</div>
                <div>
                  <h2 style={{fontSize:20,fontWeight:700,color:'var(--text-primary)',margin:0,marginBottom:4}}>{selectedDeveloper.name}</h2>
                  <div style={{fontSize:13,color:'var(--text-secondary)'}}>Dubai Real Estate Developer</div>
                </div>
              </div>
              <button onClick={()=>setSelectedDeveloper(null)} style={{background:'none',border:'1px solid var(--border)',borderRadius:8,color:'var(--text-muted)',cursor:'pointer',padding:'6px 12px',fontSize:12,fontFamily:'inherit'}}>✕ Close</button>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,marginBottom:20}}>
              {[
                ['Total Transactions', fmtNum(selectedDeveloper.count), '📊'],
                ['Avg Deal Size', fmtAED(selectedDeveloper.avg, true), '💰'],
                ['Market Share', selectedDeveloper.count ? Math.round(selectedDeveloper.count/354343*100)+'%' : '—', '📈'],
              ].map(([l,v,icon],i)=>(
                <div key={i} style={{background:'var(--bg)',borderRadius:12,padding:'14px',textAlign:'center',border:'1px solid var(--border)'}}>
                  <div style={{fontSize:18,marginBottom:6}}>{icon}</div>
                  <div style={{fontSize:10,color:'var(--text-muted)',marginBottom:4,textTransform:'uppercase',letterSpacing:'0.05em'}}>{l}</div>
                  <div style={{fontSize:15,fontWeight:700,color:'var(--text-primary)'}}>{v}</div>
                </div>
              ))}
            </div>
            {selectedDeveloper.yearly?.length > 0 && (
              <div style={{marginBottom:16}}>
                <div style={{fontSize:11,color:'var(--text-muted)',marginBottom:8,textTransform:'uppercase',letterSpacing:'0.05em',fontWeight:600}}>Yearly Transaction Volume</div>
                <div style={{display:'flex',alignItems:'flex-end',gap:6,height:48}}>
                  {selectedDeveloper.yearly.map((y,i,arr)=>{
                    const vals=arr.map(x=>x.count);
                    const max=Math.max(...vals);
                    const h=Math.round((y.count/max)*100);
                    return (
                      <div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
                        <div style={{width:'100%',height:h+'%',borderRadius:'3px 3px 0 0',background:i===arr.length-1?'#A78BFA':'rgba(167,139,250,0.3)'}}/>
                        <div style={{fontSize:9,color:'var(--text-muted)'}}>{y.year}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* BUILDING PROFILE */}
        {selectedBuilding && activeTab==='discover' && (
          <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:20,padding:24,marginBottom:24}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
              <div style={{display:'flex',alignItems:'center',gap:12}}>
                <div style={{width:48,height:48,borderRadius:14,background:'linear-gradient(135deg,rgba(34,197,94,0.15),rgba(34,197,94,0.05))',display:'flex',alignItems:'center',justifyContent:'center',fontSize:24}}>🏠</div>
                <div>
                  <h2 style={{fontSize:20,fontWeight:700,color:'var(--text-primary)',margin:0,marginBottom:4}}>{selectedBuilding.name}</h2>
                  <div style={{fontSize:13,color:'var(--text-secondary)'}}>📍 {na(selectedBuilding.area||'')}</div>
                </div>
              </div>
              <button onClick={()=>setSelectedBuilding(null)} style={{background:'none',border:'1px solid var(--border)',borderRadius:8,color:'var(--text-muted)',cursor:'pointer',padding:'6px 12px',fontSize:12,fontFamily:'inherit'}}>✕ Close</button>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:12,marginBottom:20}}>
              {[
                ['Total Transactions', fmtNum(selectedBuilding.count), '📊'],
                ['Location', na(selectedBuilding.area||''), '📍'],
              ].map(([l,v,icon],i)=>(
                <div key={i} style={{background:'var(--bg)',borderRadius:12,padding:'14px',textAlign:'center',border:'1px solid var(--border)'}}>
                  <div style={{fontSize:18,marginBottom:6}}>{icon}</div>
                  <div style={{fontSize:10,color:'var(--text-muted)',marginBottom:4,textTransform:'uppercase',letterSpacing:'0.05em'}}>{l}</div>
                  <div style={{fontSize:15,fontWeight:700,color:'var(--text-primary)'}}>{v}</div>
                </div>
              ))}
            </div>
            <button onClick={()=>{const a=areas.find(x=>x.key===selectedBuilding.area||na(x.key)===na(selectedBuilding.area||''));if(a){setSelectedArea(a);}setActiveTab('deal');setSelectedBuilding(null);}} style={{width:'100%',padding:'11px',borderRadius:11,border:'none',cursor:'pointer',background:'linear-gradient(135deg,#1D4ED8,#38BDF8)',color:'#fff',fontSize:14,fontWeight:600,fontFamily:'inherit'}}>
              ⚡ Check a deal in this area
            </button>
          </div>
        )}

        {/* MAP */}
        {activeTab==='map' && (
          <div style={{height:'calc(100vh - 100px)',borderRadius:16,overflow:'hidden',border:'1px solid var(--border)'}}>
            <MapView
              onAreaClick={(area)=>{setActiveTab('discover');setSearch(area);}}
              onProjectClick={()=>{}}
              projectsData={projectsData}
            />
          </div>
        )}

        {/* RECENT SALES */}
        {activeTab==='feed' && (
          <div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:18}}>
              <div>
                <h1 style={{fontSize:22,fontWeight:700,color:'var(--text-primary)',margin:0,marginBottom:4}}>Recent Sales</h1>
                <div style={{fontSize:13,color:'var(--text-secondary)'}}>{selectedArea?`Latest in ${selectedArea.name}`:'Latest Dubai transactions'}</div>
              </div>
              {selectedArea && <button onClick={()=>setSelectedArea(null)} style={{background:'none',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8,color:'var(--text-secondary)',cursor:'pointer',padding:'6px 12px',fontSize:12,fontFamily:'inherit'}}>Show all</button>}
            </div>
            <div style={{background:'var(--surface)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:16,overflow:'hidden'}}>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 75px 90px 70px',padding:'10px 18px',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
                {['Area','Project','Date','Price','Type'].map((h,i)=><div key={i} style={{fontSize:10,color:'var(--text-secondary)',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.05em'}}>{h}</div>)}
              </div>
              {recentSales.map((r,i)=>{
                const ppsqft=r.s&&r.v?Math.round(r.v/r.s/10.764):0;
                return (
                  <div key={i} className="inv-row" style={{display:'grid',gridTemplateColumns:'1fr 1fr 75px 90px 70px',padding:'13px 18px',borderBottom:i<recentSales.length-1?'1px solid rgba(255,255,255,0.03)':'none',transition:'background 0.1s'}}>
                    <div>
                      <div style={{fontSize:13,fontWeight:600,color:'var(--text-primary)'}}>{na(r.a||'')}</div>
                      <div style={{fontSize:11,color:'var(--text-secondary)'}}>{r.b||''}{ppsqft?' · AED '+fmtNum(ppsqft)+'/sqft':''}</div>
                    </div>
                    <div style={{fontSize:12,color:'var(--text-muted)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',paddingRight:8,alignSelf:'center'}}>{r.j||'—'}</div>
                    <div style={{fontSize:11,color:'var(--text-secondary)',alignSelf:'center'}}>{r.d||'—'}</div>
                    <div style={{fontSize:13,fontWeight:600,color:'var(--text-primary)',alignSelf:'center'}}>{r.v?fmtAED(r.v,true):'—'}</div>
                    <div style={{alignSelf:'center'}}><span style={{fontSize:10,fontWeight:600,padding:'2px 7px',borderRadius:20,background:r.r==='Off'?'rgba(59,130,246,0.1)':'rgba(34,197,94,0.1)',color:r.r==='Off'?'#38BDF8':'#22C55E'}}>{r.r==='Off'?'Off-Plan':'Ready'}</span></div>
                  </div>
                );
              })}
            </div>
          </div>
        )}


      {/* FULL-SCREEN AREA PROFILE */}
      {selectedArea && (
        <div style={{position:'fixed',inset:0,background:'var(--bg)',zIndex:500,overflowY:'auto'}}>
          <div style={{position:'sticky',top:0,zIndex:10,background:'var(--bg-alt)',borderBottom:'1px solid var(--border)',height:52,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 24px'}}>
            <button onClick={()=>setSelectedArea(null)} style={{display:'flex',alignItems:'center',gap:8,background:'none',border:'none',cursor:'pointer',color:'var(--text-primary)',fontSize:14,fontWeight:600,fontFamily:'inherit'}}>
              ← Back to search
            </button>
            <button onClick={()=>saveToWatchlist('area',selectedArea.name,selectedArea.key,selectedArea.key)} disabled={savedKeys.has(selectedArea.key)} style={{display:'flex',alignItems:'center',gap:6,background:'none',border:'1px solid var(--border)',borderRadius:20,padding:'6px 14px',cursor:'pointer',fontSize:12,color:savedKeys.has(selectedArea.key)?'#22C55E':'var(--text-secondary)',fontFamily:'inherit'}}>
              {savedKeys.has(selectedArea.key)?'✓ Saved':'♡ Save'}
            </button>
          </div>
          <div style={{height:220,background:`linear-gradient(135deg,rgba(29,78,216,0.3),rgba(56,189,248,0.15))`,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:10,position:'relative'}}>
            <div style={{fontSize:56}}>{selectedArea.emoji}</div>
            <h1 style={{fontSize:26,fontWeight:800,color:'var(--text-primary)',margin:0,marginBottom:4}}>{selectedArea.name}</h1>
            <div style={{display:'flex',alignItems:'center',gap:8}}>
              <span style={{fontSize:13,color:'var(--text-secondary)'}}>{fmtNum(selectedArea.count)} transactions</span>
              <span style={{fontSize:13,fontWeight:700,padding:'3px 10px',borderRadius:20,background:selectedArea.yoy>=0?'rgba(34,197,94,0.1)':'rgba(248,113,113,0.1)',color:selectedArea.yoy>=0?'#22C55E':'#F87171'}}>{selectedArea.yoy>=0?'+':''}{selectedArea.yoy}% YoY</span>
            </div>
          </div>
          <div style={{maxWidth:900,margin:'0 auto',padding:'24px'}}>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginBottom:24}}>
              {[
                ['Avg Price',fmtAED(selectedArea.avg,true),'💰','#38BDF8'],
                ['Price/sqft','AED '+fmtNum(selectedArea.ppsqft),'📐','#A78BFA'],
                ['Off-Plan',selectedArea.offPlanPct+'%','🏗️','#F59E0B'],
                ['YoY Growth',(selectedArea.yoy>=0?'+':'')+selectedArea.yoy+'%','📈',selectedArea.yoy>=0?'#22C55E':'#F87171'],
              ].map(([l,v,icon,color],i)=>(
                <div key={i} style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:14,padding:'16px',textAlign:'center'}}>
                  <div style={{fontSize:20,marginBottom:6}}>{icon}</div>
                  <div style={{fontSize:18,fontWeight:800,color,marginBottom:4}}>{v}</div>
                  <div style={{fontSize:10,color:'var(--text-muted)',textTransform:'uppercase',letterSpacing:'0.05em'}}>{l}</div>
                </div>
              ))}
            </div>
            {areaData?.[selectedArea.key]?.priceTrend?.length>1 && (
              <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:14,padding:'18px',marginBottom:20}}>
                <div style={{fontSize:13,fontWeight:600,color:'var(--text-primary)',marginBottom:14}}>Price Trend (AED/sqft)</div>
                <div style={{display:'flex',alignItems:'flex-end',gap:4,height:72}}>
                  {areaData[selectedArea.key].priceTrend.slice(-18).map((p,i,arr)=>{
                    const vals=arr.map(x=>Math.round((x.ppsqm||0)/10.764));
                    const min=Math.min(...vals),max=Math.max(...vals);
                    const h=max===min?100:Math.round(((vals[i]-min)/(max-min))*80)+20;
                    return <div key={i} style={{flex:1,height:h+'%',borderRadius:'3px 3px 0 0',background:i===arr.length-1?'#38BDF8':'rgba(56,189,248,0.25)'}}/>;
                  })}
                </div>
              </div>
            )}
            {projectsData && (
              <div style={{marginBottom:20}}>
                <div style={{fontSize:13,fontWeight:600,color:'var(--text-primary)',marginBottom:12}}>Top Projects in {selectedArea.name}</div>
                <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:10}}>
                  {Object.entries(projectsData).filter(([k,v])=>na(v.area||'')===selectedArea.name||v.area===selectedArea.key).slice(0,6).map(([k,v],i)=>(
                    <div key={i} onClick={()=>{setSelectedProject({key:k,name:k,area:selectedArea.name,avg:v.kpis?.avg||0,count:v.kpis?.count||0});setSelectedArea(null);}} className="inv-card" style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:12,padding:'14px',cursor:'pointer'}}>
                      <div style={{fontSize:13,fontWeight:600,color:'var(--text-primary)',marginBottom:4}}>{k}</div>
                      <div style={{fontSize:12,color:'#38BDF8',fontWeight:700}}>{fmtAED(v.kpis?.avg||0,true)}</div>
                      <div style={{fontSize:11,color:'var(--text-muted)'}}>{fmtNum(v.kpis?.count||0)} txns</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div style={{display:'flex',gap:12}}>
              <button onClick={()=>setActiveTab('deal')} style={{flex:1,padding:'14px',borderRadius:12,border:'none',cursor:'pointer',background:'linear-gradient(135deg,#1D4ED8,#38BDF8)',color:'#fff',fontSize:15,fontWeight:600,fontFamily:'inherit'}}>
                ⚡ Check a deal here
              </button>
              <button onClick={()=>setActiveTab('feed')} style={{flex:1,padding:'14px',borderRadius:12,border:'1px solid var(--border)',cursor:'pointer',background:'var(--surface)',color:'var(--text-primary)',fontSize:15,fontWeight:600,fontFamily:'inherit'}}>
                📋 Recent sales
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FULL-SCREEN DEVELOPER PROFILE */}
      {selectedDeveloper && (
        <div style={{position:'fixed',inset:0,background:'var(--bg)',zIndex:500,overflowY:'auto'}}>
          <div style={{position:'sticky',top:0,zIndex:10,background:'var(--bg-alt)',borderBottom:'1px solid var(--border)',height:52,display:'flex',alignItems:'center',padding:'0 24px'}}>
            <button onClick={()=>setSelectedDeveloper(null)} style={{display:'flex',alignItems:'center',gap:8,background:'none',border:'none',cursor:'pointer',color:'var(--text-primary)',fontSize:14,fontWeight:600,fontFamily:'inherit'}}>
              ← Back to search
            </button>
          </div>
          <div style={{height:200,background:'linear-gradient(135deg,rgba(139,92,246,0.2),rgba(167,139,250,0.08))',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:10}}>
            <div style={{width:64,height:64,borderRadius:18,background:'linear-gradient(135deg,#7C3AED,#A78BFA)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:28}}>🏢</div>
            <h1 style={{fontSize:24,fontWeight:800,color:'var(--text-primary)',margin:0}}>{selectedDeveloper.name}</h1>
            <div style={{fontSize:13,color:'var(--text-secondary)'}}>Dubai Real Estate Developer</div>
          </div>
          <div style={{maxWidth:900,margin:'0 auto',padding:'24px'}}>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,marginBottom:24}}>
              {[
                ['Total Transactions',fmtNum(selectedDeveloper.count),'📊','#38BDF8'],
                ['Avg Deal Size',fmtAED(selectedDeveloper.avg,true),'💰','#22C55E'],
                ['Market Share',Math.round(selectedDeveloper.count/354343*100)+'%','📈','#A78BFA'],
              ].map(([l,v,icon,color],i)=>(
                <div key={i} style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:14,padding:'16px',textAlign:'center'}}>
                  <div style={{fontSize:20,marginBottom:6}}>{icon}</div>
                  <div style={{fontSize:18,fontWeight:800,color,marginBottom:4}}>{v}</div>
                  <div style={{fontSize:10,color:'var(--text-muted)',textTransform:'uppercase',letterSpacing:'0.05em'}}>{l}</div>
                </div>
              ))}
            </div>
            {selectedDeveloper.yearly?.length>0 && (
              <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:14,padding:'18px',marginBottom:20}}>
                <div style={{fontSize:13,fontWeight:600,color:'var(--text-primary)',marginBottom:14}}>Yearly Transaction Volume</div>
                <div style={{display:'flex',alignItems:'flex-end',gap:6,height:72}}>
                  {selectedDeveloper.yearly.map((y,i,arr)=>{
                    const max=Math.max(...arr.map(x=>x.count));
                    const h=Math.round((y.count/max)*100);
                    return (
                      <div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
                        <div style={{width:'100%',height:h+'%',borderRadius:'3px 3px 0 0',background:i===arr.length-1?'#A78BFA':'rgba(167,139,250,0.3)'}}/>
                        <div style={{fontSize:9,color:'var(--text-muted)'}}>{y.year}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {projectsData && Object.entries(projectsData).filter(([k,v])=>v.developer===selectedDeveloper.name).length>0 && (
              <div>
                <div style={{fontSize:13,fontWeight:600,color:'var(--text-primary)',marginBottom:12}}>Projects by {selectedDeveloper.name}</div>
                <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:10}}>
                  {Object.entries(projectsData).filter(([k,v])=>v.developer===selectedDeveloper.name).slice(0,6).map(([k,v],i)=>(
                    <div key={i} onClick={()=>{setSelectedProject({key:k,name:k,area:na(v.area||''),avg:v.kpis?.avg||0,count:v.kpis?.count||0});setSelectedDeveloper(null);}} className="inv-card" style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:12,padding:'14px',cursor:'pointer'}}>
                      <div style={{fontSize:13,fontWeight:600,color:'var(--text-primary)',marginBottom:4}}>{k}</div>
                      <div style={{fontSize:12,color:'#A78BFA',fontWeight:700}}>{fmtAED(v.kpis?.avg||0,true)}</div>
                      <div style={{fontSize:11,color:'var(--text-muted)'}}>{fmtNum(v.kpis?.count||0)} txns</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {/* FULL-SCREEN PROJECT PROFILE */}
      {selectedProject && (
        <div style={{position:'fixed',inset:0,background:'var(--bg)',zIndex:500,overflowY:'auto'}}>
          <div style={{position:'sticky',top:0,zIndex:10,background:'var(--bg-alt)',borderBottom:'1px solid var(--border)',height:52,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 24px'}}>
            <button onClick={()=>setSelectedProject(null)} style={{display:'flex',alignItems:'center',gap:8,background:'none',border:'none',cursor:'pointer',color:'var(--text-primary)',fontSize:14,fontWeight:600,fontFamily:'inherit'}}>
              ← Back to search
            </button>
            <button onClick={()=>saveToWatchlist('project',selectedProject.name,selectedProject.key,selectedProject.area)} disabled={savedKeys.has(selectedProject.key)} style={{display:'flex',alignItems:'center',gap:6,background:'none',border:'1px solid var(--border)',borderRadius:20,padding:'6px 14px',cursor:'pointer',fontSize:12,color:savedKeys.has(selectedProject.key)?'#22C55E':'var(--text-secondary)',fontFamily:'inherit'}}>
              {savedKeys.has(selectedProject.key)?'✓ Saved':'♡ Save'}
            </button>
          </div>
          <div style={{position:'relative',height:280,overflow:'hidden',background:'var(--surface)'}}>
            {projectsData?.[selectedProject.key]?.image
              ? <img src={projectsData[selectedProject.key].image} alt={selectedProject.name} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
              : <div style={{width:'100%',height:'100%',background:'linear-gradient(135deg,#0D2137,#0A3040)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:64}}>🏗️</div>
            }
            <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(0,0,0,0.7) 0%,transparent 60%)'}}/>
            <div style={{position:'absolute',bottom:20,left:24}}>
              <h1 style={{fontSize:26,fontWeight:800,color:'#fff',margin:0,marginBottom:4}}>{selectedProject.name}</h1>
              <div style={{fontSize:13,color:'rgba(255,255,255,0.8)'}}>📍 {selectedProject.area}</div>
            </div>
          </div>
          <div style={{maxWidth:900,margin:'0 auto',padding:'24px'}}>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginBottom:24}}>
              {[
                ['Avg Price',fmtAED(projectsData?.[selectedProject.key]?.kpis?.avg||selectedProject.avg,true),'💰','#38BDF8'],
                ['Transactions',fmtNum(projectsData?.[selectedProject.key]?.kpis?.count||selectedProject.count),'📊','#22C55E'],
                ['Price/sqft','AED '+fmtNum(Math.round((projectsData?.[selectedProject.key]?.kpis?.ppsqm||0)/10.764)),'📐','#A78BFA'],
                ['Off-Plan',projectsData?.[selectedProject.key]?.kpis?Math.round((projectsData[selectedProject.key].kpis.offPlan||0)/(projectsData[selectedProject.key].kpis.count||1)*100)+'%':'—','🏗️','#F59E0B'],
              ].map(([l,v,icon,color],i)=>(
                <div key={i} style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:14,padding:'16px',textAlign:'center'}}>
                  <div style={{fontSize:20,marginBottom:6}}>{icon}</div>
                  <div style={{fontSize:18,fontWeight:800,color,marginBottom:4}}>{v}</div>
                  <div style={{fontSize:10,color:'var(--text-muted)',textTransform:'uppercase',letterSpacing:'0.05em'}}>{l}</div>
                </div>
              ))}
            </div>
            {projectsData?.[selectedProject.key]?.priceTrend?.length>1 && (
              <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:14,padding:'18px',marginBottom:20}}>
                <div style={{fontSize:13,fontWeight:600,color:'var(--text-primary)',marginBottom:14}}>Price Trend (AED/sqft)</div>
                <div style={{display:'flex',alignItems:'flex-end',gap:4,height:72}}>
                  {projectsData[selectedProject.key].priceTrend.slice(-18).map((p,i,arr)=>{
                    const vals=arr.map(x=>Math.round((x.ppsqm||0)/10.764));
                    const min=Math.min(...vals),max=Math.max(...vals);
                    const h=max===min?100:Math.round(((vals[i]-min)/(max-min))*80)+20;
                    return <div key={i} style={{flex:1,height:h+'%',borderRadius:'3px 3px 0 0',background:i===arr.length-1?'#38BDF8':'rgba(56,189,248,0.25)'}}/>;
                  })}
                </div>
              </div>
            )}
            {projectsData?.[selectedProject.key]?.recent?.length>0 && (
              <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:14,overflow:'hidden',marginBottom:20}}>
                <div style={{padding:'14px 18px',borderBottom:'1px solid var(--border)',fontSize:13,fontWeight:600,color:'var(--text-primary)'}}>Recent Transactions</div>
                {projectsData[selectedProject.key].recent.slice(0,8).map((r,i,arr)=>{
                  const ppsqft=r.s&&r.v?Math.round(r.v/r.s/10.764):0;
                  return (
                    <div key={i} style={{display:'grid',gridTemplateColumns:'1fr 90px 100px 80px',padding:'12px 18px',borderBottom:i<arr.length-1?'1px solid var(--border)':'none',alignItems:'center'}}>
                      <div>
                        <div style={{fontSize:13,fontWeight:600,color:'var(--text-primary)'}}>{r.b||'—'} {r.t||''}</div>
                        <div style={{fontSize:11,color:'var(--text-secondary)'}}>{r.d||''}{ppsqft?' · AED '+fmtNum(ppsqft)+'/sqft':''}</div>
                      </div>
                      <div style={{fontSize:11,color:'var(--text-secondary)',textAlign:'center'}}>{r.s?fmtNum(Math.round(r.s))+' sqft':'—'}</div>
                      <div style={{fontSize:13,fontWeight:700,color:'var(--text-primary)',textAlign:'right'}}>{r.v?fmtAED(r.v,true):'—'}</div>
                      <div style={{textAlign:'right'}}><span style={{fontSize:10,fontWeight:600,padding:'2px 7px',borderRadius:20,background:r.r==='Off'?'rgba(59,130,246,0.1)':'rgba(34,197,94,0.1)',color:r.r==='Off'?'#38BDF8':'#22C55E'}}>{r.r==='Off'?'Off-Plan':'Ready'}</span></div>
                    </div>
                  );
                })}
              </div>
            )}
            <button onClick={()=>{const a=areas.find(x=>x.key===selectedProject.area||na(x.key)===selectedProject.area);if(a)setSelectedArea(a);setSelectedProject(null);setActiveTab('deal');}} style={{width:'100%',padding:'14px',borderRadius:12,border:'none',cursor:'pointer',background:'linear-gradient(135deg,#1D4ED8,#38BDF8)',color:'#fff',fontSize:15,fontWeight:600,fontFamily:'inherit'}}>
              ⚡ Check a deal in {selectedProject.area} →
            </button>
          </div>
        </div>
      )}

      {/* FULL-SCREEN BUILDING PROFILE */}
      {selectedBuilding && (
        <div style={{position:'fixed',inset:0,background:'var(--bg)',zIndex:500,overflowY:'auto'}}>
          <div style={{position:'sticky',top:0,zIndex:10,background:'var(--bg-alt)',borderBottom:'1px solid var(--border)',height:52,display:'flex',alignItems:'center',padding:'0 24px'}}>
            <button onClick={()=>setSelectedBuilding(null)} style={{display:'flex',alignItems:'center',gap:8,background:'none',border:'none',cursor:'pointer',color:'var(--text-primary)',fontSize:14,fontWeight:600,fontFamily:'inherit'}}>
              ← Back to search
            </button>
          </div>
          <div style={{height:180,background:'linear-gradient(135deg,rgba(34,197,94,0.15),rgba(16,185,129,0.08))',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:10}}>
            <div style={{fontSize:52}}>🏠</div>
            <h1 style={{fontSize:22,fontWeight:800,color:'var(--text-primary)',margin:0}}>{selectedBuilding.name}</h1>
            <div style={{fontSize:13,color:'var(--text-secondary)'}}>📍 {na(selectedBuilding.area||'')}</div>
          </div>
          <div style={{maxWidth:900,margin:'0 auto',padding:'24px'}}>
            <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:12,marginBottom:24}}>
              {[
                ['Total Transactions',fmtNum(selectedBuilding.count),'📊','#38BDF8'],
                ['Location',na(selectedBuilding.area||''),'📍','#22C55E'],
              ].map(([l,v,icon,color],i)=>(
                <div key={i} style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:14,padding:'16px',textAlign:'center'}}>
                  <div style={{fontSize:20,marginBottom:6}}>{icon}</div>
                  <div style={{fontSize:18,fontWeight:800,color,marginBottom:4}}>{v}</div>
                  <div style={{fontSize:10,color:'var(--text-muted)',textTransform:'uppercase',letterSpacing:'0.05em'}}>{l}</div>
                </div>
              ))}
            </div>
            <button onClick={()=>{const a=areas.find(x=>x.key===selectedBuilding.area||na(x.key)===na(selectedBuilding.area||''));if(a)setSelectedArea(a);setSelectedBuilding(null);setActiveTab('deal');}} style={{width:'100%',padding:'14px',borderRadius:12,border:'none',cursor:'pointer',background:'linear-gradient(135deg,#1D4ED8,#38BDF8)',color:'#fff',fontSize:15,fontWeight:600,fontFamily:'inherit'}}>
              ⚡ Check a deal in this area →
            </button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
