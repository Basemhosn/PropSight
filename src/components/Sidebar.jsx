import { useState, useEffect } from 'react';
import PropSightLogo from './PropSightLogo';
import { useAuth, supabase } from '../context/AuthContext';

const NAV_SECTIONS = [
  { items: [{ id:'home', label:'Home', icon:'home' }] },
  { label:'TRANSACTIONS', items: [
    { id:'overview',  label:'Overview',             icon:'grid' },
    { id:'recent',    label:'Recent Transactions',  icon:'live',     lite:true },
    { id:'offplan',   label:'Properties',           icon:'building' },
    { id:'areas',     label:'Area Analysis',        icon:'layers',   pro:true },
    { id:'rental',    label:'Rental Index',         icon:'home',     lite:true },
  ]},
  { label:'INTELLIGENCE', items: [
    { id:'markets',    label:'Market Intelligence', icon:'chart' },
    { id:'lookup',     label:'Deal Analyzer',       icon:'search',   lite:true },
    { id:'pulse',      label:'Market Pulse',        icon:'pulse',    pro:true },
    { id:'map',        label:'Dubai Heatmap',       icon:'map',      pro:true },
    { id:'developers', label:'Developers',          icon:'building2' },
  ]},
  { label:'MY PLATFORM', items: [
    { id:'portfolio',  label:'My Portfolio',        icon:'briefcase', lite:true },
    { id:'watchlist',  label:'Watchlist',           icon:'bookmark',  lite:true },
    { id:'alerts',     label:'Price Alerts',        icon:'bell',      lite:true },
    { id:'upgrade',    label:'Upgrade Plan',        icon:'upgrade' },
  ]},
  { label:'TOOLS', items: [
    { id:'roi',        label:'ROI Calculator',      icon:'calculator', lite:true },
    { id:'ai',         label:'AI Concierge',        icon:'bot',        pro:true },
    { id:'reports',    label:'Shareable Reports',   icon:'share',      pro:true },
    { id:'pdf',        label:'PDF Export',          icon:'pdf',        pro:true },
  ]},
];

function Icon({ name, size=15 }) {
  const p = { width:size, height:size, viewBox:"0 0 24 24", fill:"none", stroke:"currentColor", strokeWidth:1.8, strokeLinecap:"round", strokeLinejoin:"round" };
  const icons = {
    home:       <svg {...p}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    chart:      <svg {...p}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    search:     <svg {...p}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    bot:        <svg {...p}><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/></svg>,
    briefcase:  <svg {...p}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
    calculator: <svg {...p}><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/></svg>,
    building:   <svg {...p}><rect x="4" y="2" width="16" height="20" rx="1"/><path d="M9 22V12h6v10"/></svg>,
    building2:  <svg {...p}><rect x="2" y="2" width="9" height="20" rx="1"/><rect x="13" y="8" width="9" height="14" rx="1"/></svg>,
    bookmark:   <svg {...p}><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>,
    map:        <svg {...p}><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/></svg>,
    layers:     <svg {...p}><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
    grid:       <svg {...p}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
    upgrade:    <svg {...p}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
    logout:     <svg {...p}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
    pulse:      <svg {...p}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    live:       <svg {...p}><circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49"/><path d="M7.76 7.76a6 6 0 0 0 0 8.49"/></svg>,
    bell:    <svg {...p}><path d='M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9'/><path d='M13.73 21a2 2 0 0 1-3.46 0'/></svg>,
    share:   <svg {...p}><circle cx='18' cy='5' r='3'/><circle cx='6' cy='12' r='3'/><circle cx='18' cy='19' r='3'/><line x1='8.59' y1='13.51' x2='15.42' y2='17.49'/><line x1='15.41' y1='6.51' x2='8.59' y2='10.49'/></svg>,
    sparkle: <svg {...p}><polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'/></svg>,
    menu:       <svg {...p}><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
    close:      <svg {...p}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  };
  return icons[name] || null;
}

export default function Sidebar({ page, setPage }) {
  const { user, profile, signOut, isPro, isLite, theme, toggleTheme, lang, toggleLang } = useAuth();
  const [open, setOpen] = useState(false);
  const [brokerMenu, setBrokerMenu] = useState(false);
  const [brokerTheme, setBrokerTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [themeMode, setThemeMode] = useState(() => localStorage.getItem('theme') || 'dark');
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 769);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const nav = (id) => { setPage(id); setOpen(false); };

  const navItems = (
    <div style={{ display:'flex', flexDirection:'column', height:'100%' }}>
      <div style={{ padding:'14px 16px', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <div style={{width:28,height:28,borderRadius:7,background:'linear-gradient(135deg,#1D4ED8,#38BDF8)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14}}>🏙️</div>
          <span style={{fontSize:16,fontWeight:800,color:'var(--text-primary)',fontFamily:"system-ui"}}>Prop<span style={{color:'#38BDF8'}}>Sight</span></span>
        </div>
        {isMobile && <button onClick={() => setOpen(false)} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--text-muted)', padding:4 }}><Icon name="close" size={20}/></button>}
      </div>
      <div style={{ flex:1, padding:'12px 8px', overflowY:'auto' }}>
        {NAV_SECTIONS.map((section, si) => (
          <div key={si} style={{ marginBottom:8 }}>
            {section.label && <div style={{ fontSize:10, fontWeight:600, color:'var(--text-faint)', letterSpacing:'0.12em', padding:'8px 8px 4px' }}>{section.label}</div>}
            {section.items.map(item => {
              const active = page === item.id;
              const locked = (item.pro && !isPro) || (item.lite && !isLite);
              return (
                <button key={item.id} onClick={() => !locked && nav(item.id)} style={{
                  width:'100%', display:'flex', alignItems:'center', gap:10,
                  padding:'10px', borderRadius:8, border:'none', marginBottom:2,
                  cursor:locked?'default':'pointer',
                  background:active?'rgba(59,130,246,0.12)':'transparent',
                  color:active?'#38BDF8':locked?'var(--text-faint)':'var(--text-muted)',
                  fontFamily:'system-ui', position:'relative', textAlign:'left',
                }}>
                  {active && <div style={{ position:'absolute', left:0, top:'50%', transform:'translateY(-50%)', width:3, height:20, borderRadius:2, background:'linear-gradient(180deg,#1D4ED8,#38BDF8)' }}/>}
                  <Icon name={item.icon} size={16}/>
                  <span style={{ fontSize:14, fontWeight:active?600:400, flex:1 }}>{item.label}</span>
                  {locked && <span style={{ fontSize:9, fontWeight:700, padding:'2px 6px', borderRadius:20, background:item.pro?'rgba(245,158,11,0.15)':'rgba(139,92,246,0.15)', color:item.pro?'#F59E0B':'#A78BFA', border:`1px solid ${item.pro?'rgba(245,158,11,0.2)':'rgba(139,92,246,0.2)'}` }}>{item.pro?'PRO':'LITE'}</span>}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      {!isLite && (
        <div style={{ margin:'8px', borderRadius:10, background:'linear-gradient(135deg,rgba(139,92,246,0.2),rgba(192,132,252,0.1))', border:'1px solid rgba(139,92,246,0.3)', padding:'12px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
            <div style={{ width:28, height:28, borderRadius:8, background:'linear-gradient(135deg,#7C3AED,#A78BFA)', display:'flex', alignItems:'center', justifyContent:'center' }}><Icon name="upgrade" size={14}/></div>
            <div><div style={{ fontSize:12, fontWeight:700, color:'var(--text-primary)' }}>Upgrade to Lite</div><div style={{ fontSize:10, color:'var(--text-secondary)' }}>AED 99/mo · Unlock more features</div></div>
          </div>
          <button onClick={() => nav('upgrade')} style={{ width:'100%', padding:'8px', borderRadius:8, border:'none', background:'linear-gradient(135deg,#7C3AED,#A78BFA)', color:'#fff', fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'system-ui' }}>Upgrade to Lite →</button>
        </div>
      )}
      {isLite && !isPro && (
        <div style={{ margin:'8px', borderRadius:10, background:'linear-gradient(135deg,rgba(245,158,11,0.2),rgba(251,191,36,0.1))', border:'1px solid rgba(245,158,11,0.3)', padding:'12px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
            <div style={{ width:28, height:28, borderRadius:8, background:'linear-gradient(135deg,#B45309,#F59E0B)', display:'flex', alignItems:'center', justifyContent:'center' }}><Icon name="upgrade" size={14}/></div>
            <div><div style={{ fontSize:12, fontWeight:700, color:'var(--text-primary)' }}>Upgrade to Pro</div><div style={{ fontSize:10, color:'var(--text-secondary)' }}>AED 299/mo · Unlock everything</div></div>
          </div>
          <button onClick={() => nav('upgrade')} style={{ width:'100%', padding:'8px', borderRadius:8, border:'none', background:'linear-gradient(135deg,#B45309,#F59E0B)', color:'#fff', fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'system-ui' }}>Upgrade to Pro →</button>
        </div>
      )}
      <div style={{ padding:'12px', borderTop:'1px solid rgba(59,130,246,0.08)', display:'flex', alignItems:'center', gap:10 }}>
        {profile?.avatar_url
          ? <img src={profile.avatar_url} alt="avatar" style={{ width:32, height:32, borderRadius:'50%', objectFit:'cover', border:'1px solid rgba(59,130,246,0.3)', flexShrink:0 }}/>
          : <div style={{ width:32, height:32, borderRadius:'50%', flexShrink:0, background:'linear-gradient(135deg,#1D4ED8,#38BDF8)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:700, color:'#fff' }}>{(profile?.full_name?.[0]||user?.email?.[0]||'U').toUpperCase()}</div>
        }
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize:12, fontWeight:600, color:'var(--text-secondary)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{profile?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'User'}</div>
          <div style={{ fontSize:10, color:'var(--text-faint)' }}>{isPro?<span style={{color:'#F59E0B',fontWeight:700}}>Pro</span>:isLite?<span style={{color:'#A78BFA',fontWeight:700}}>Lite</span>:'Free plan'}</div>
        </div>
        <button onClick={() => { const c=document.documentElement.getAttribute('data-theme')||'dark'; const n=c==='dark'?'light':'dark'; document.documentElement.setAttribute('data-theme',n); localStorage.setItem('theme',n); setThemeMode(n); }} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--text-muted)', padding:4, fontSize:13 }}>{themeMode==='dark'?'☀️':'🌙'}</button>
        <button onClick={signOut} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--text-faint)', padding:4 }}><Icon name="logout" size={14}/></button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        <div style={{ position:'fixed', top:0, left:0, right:0, zIndex:1000, height:56, background:'var(--bg-alt)', borderBottom:'1px solid rgba(59,130,246,0.1)', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 16px' }}>
          <PropSightLogo size="sm" />
          <button onClick={() => setOpen(true)} style={{ background:'rgba(59,130,246,0.1)', border:'1px solid rgba(59,130,246,0.2)', borderRadius:8, cursor:'pointer', color:'var(--text-secondary)', padding:'6px 10px', display:'flex', alignItems:'center' }}>
            <Icon name="menu" size={20}/>
          </button>
        </div>
        <div style={{ height:56 }} />
        {open && <>
          <div onClick={() => setOpen(false)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', zIndex:1001 }}/>
          <div style={{ position:'fixed', left:0, top:0, bottom:0, width:280, background:'var(--bg-alt)', zIndex:1002, overflowY:'auto', boxShadow:'4px 0 24px rgba(0,0,0,0.5)' }}>{navItems}</div>
        </>}
      </>
    );
  }

  return (
    <div style={{ width:220, flexShrink:0, background:'var(--bg-alt)', borderRight:'1px solid rgba(59,130,246,0.08)', height:'100vh', position:'sticky', top:0, overflowY:'auto', fontFamily:'system-ui' }}>
      {navItems}
    </div>
  );
}
