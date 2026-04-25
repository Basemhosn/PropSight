import PropSightLogo from './PropSightLogo';
import { useAuth } from '../context/AuthContext';

const NAV_SECTIONS = [
  {
    items: [
      { id:'home',      label:'Home',                icon:'home' },
    ]
  },
  {
    label: 'TRANSACTIONS',
    items: [
      { id:'overview',  label:'Overview',             icon:'grid' },
      { id:'offplan',   label:'Properties',           icon:'building' },
      { id:'areas',     label:'Area Analysis',        icon:'layers' },
      { id:'projects',  label:'Projects',             icon:'briefcase' },
    ]
  },
  {
    label: 'INTELLIGENCE',
    items: [
      { id:'markets',   label:'Market Intelligence',  icon:'chart' },
      { id:'lookup',    label:'Deal Analyzer',        icon:'search' },
      { id:'pulse',     label:'Market Pulse',         icon:'chart' },
      { id:'map',       label:'Dubai Heatmap',        icon:'map',      pro:true },
      { id:'developers',label:'Developers',           icon:'building' },
    ]
  },
  {
    label: 'TOOLS',
    items: [
      { id:'roi',       label:'ROI Calculator',       icon:'calculator' },
      { id:'live',      label:'Live Feed',             icon:'sparkle' },
      { id:'ai',        label:'AI Concierge',          icon:'bot' },
      { id:'watchlist', label:'Watchlist',             icon:'bookmark', pro:true },
    ]
  },
];

function Icon({ name, size=16 }) {
  const s = { width:size, height:size, flexShrink:0 };
  const props = { width:size, height:size, viewBox:'0 0 24 24', fill:'none', stroke:'currentColor', strokeWidth:1.8, strokeLinecap:'round', strokeLinejoin:'round' };
  const icons = {
    home:       <svg {...props}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    chart:      <svg {...props}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    search:     <svg {...props}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    sparkle:    <svg {...props}><path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z"/></svg>,
    bot:        <svg {...props}><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>,
    briefcase:  <svg {...props}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
    calculator: <svg {...props}><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/></svg>,
    building:   <svg {...props}><rect x="4" y="2" width="16" height="20" rx="1"/><path d="M9 22V12h6v10"/><path d="M9 7h1"/><path d="M9 11h1"/><path d="M14 7h1"/><path d="M14 11h1"/></svg>,
    bookmark:   <svg {...props}><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>,
    map:        <svg {...props}><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>,
    layers:     <svg {...props}><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
    grid:       <svg {...props}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
    upgrade:    <svg {...props}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
    user:       <svg {...props}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    logout:     <svg {...props}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  };
  return icons[name] || null;
}

export default function Sidebar({ page, setPage }) {
  const { user, profile, signOut, isPro } = useAuth();

  return (
    <div style={{
      width: 220, flexShrink: 0,
      background: '#070E1B',
      borderRight: '1px solid rgba(59,130,246,0.08)',
      display: 'flex', flexDirection: 'column',
      height: '100vh', position: 'sticky', top: 0,
      fontFamily: 'system-ui, sans-serif',
      overflowY: 'auto',
    }}>
      {/* Logo */}
      <div style={{ padding: '20px 16px 16px', borderBottom: '1px solid rgba(59,130,246,0.08)' }}>
        <PropSightLogo size="sm" />
      </div>

      {/* Nav */}
      <div style={{ flex: 1, padding: '12px 8px', overflowY: 'auto' }}>
        {NAV_SECTIONS.map((section, si) => (
          <div key={si} style={{ marginBottom: 8 }}>
            {section.label && (
              <div style={{
                fontSize: 10, fontWeight: 600, color: '#1E3A5F',
                letterSpacing: '0.12em', padding: '8px 8px 4px',
              }}>{section.label}</div>
            )}
            {section.items.map(item => {
              const active = page === item.id;
              const locked = item.pro && !isPro;
              return (
                <button key={item.id}
                  onClick={() => !locked && setPage(item.id)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                    padding: '9px 10px', borderRadius: 8, border: 'none',
                    cursor: locked ? 'default' : 'pointer',
                    marginBottom: 1,
                    background: active
                      ? 'rgba(59,130,246,0.12)'
                      : 'transparent',
                    color: active ? '#38BDF8' : locked ? '#1E3A5F' : '#64748B',
                    transition: 'all 0.15s',
                    textAlign: 'left',
                    fontFamily: 'system-ui, sans-serif',
                  }}
                  onMouseEnter={e => { if (!locked && !active) e.currentTarget.style.background = 'rgba(59,130,246,0.06)'; e.currentTarget.style.color = active?'#38BDF8':locked?'#1E3A5F':'#94A3B8'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = active?'rgba(59,130,246,0.12)':'transparent'; e.currentTarget.style.color = active?'#38BDF8':locked?'#1E3A5F':'#64748B'; }}
                >
                  {/* Active indicator */}
                  {active && (
                    <div style={{
                      position: 'absolute', left: 8,
                      width: 3, height: 20, borderRadius: 2,
                      background: 'linear-gradient(180deg,#1D4ED8,#38BDF8)',
                    }}/>
                  )}
                  <Icon name={item.icon} size={15}/>
                  <span style={{ fontSize: 13, fontWeight: active ? 600 : 400, flex: 1 }}>
                    {item.label}
                  </span>
                  {locked && (
                    <span style={{
                      fontSize: 9, fontWeight: 700, padding: '2px 6px',
                      borderRadius: 20, letterSpacing: '0.05em',
                      background: 'rgba(245,158,11,0.15)',
                      color: '#F59E0B',
                      border: '1px solid rgba(245,158,11,0.2)',
                    }}>PRO</span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Upgrade CTA */}
      {!isPro && (
        <div style={{
          margin: '8px', borderRadius: 10,
          background: 'linear-gradient(135deg, rgba(29,78,216,0.2), rgba(56,189,248,0.1))',
          border: '1px solid rgba(59,130,246,0.2)',
          padding: '12px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 8,
              background: 'linear-gradient(135deg,#1D4ED8,#38BDF8)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name="upgrade" size={14}/>
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#F1F5F9' }}>Upgrade to Pro</div>
              <div style={{ fontSize: 10, color: '#475569' }}>$29/mo · 30-day free trial</div>
            </div>
          </div>
          <button onClick={() => setPage('upgrade')} style={{
            width: '100%', padding: '7px', borderRadius: 8, border: 'none',
            background: 'linear-gradient(135deg,#1D4ED8,#38BDF8)',
            color: '#fff', fontSize: 12, fontWeight: 600,
            cursor: 'pointer', fontFamily: 'system-ui,sans-serif',
          }}>
            Upgrade Now →
          </button>
        </div>
      )}

      {/* User + signout */}
      <div style={{
        padding: '12px', borderTop: '1px solid rgba(59,130,246,0.08)',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        {profile?.avatar_url ? (
          <img src={profile.avatar_url} alt="avatar"
            style={{ width:32, height:32, borderRadius:'50%', objectFit:'cover',
              border:'1px solid rgba(59,130,246,0.3)', flexShrink:0 }}/>
        ) : (
          <div style={{
            width:32, height:32, borderRadius:'50%', flexShrink:0,
            background:'linear-gradient(135deg,#1D4ED8,#38BDF8)',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:12, fontWeight:700, color:'#fff',
          }}>
            {(profile?.full_name?.[0]||user?.email?.[0]||'U').toUpperCase()}
          </div>
        )}
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize:12, fontWeight:600, color:'#94A3B8',
            overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
            {profile?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'User'}
          </div>
          <div style={{ fontSize:10, color:'#1E3A5F' }}>
            {isPro ? '⭐ Pro' : 'Free plan'}
          </div>
        </div>
        <button onClick={signOut} title="Sign out" style={{
          background:'none', border:'none', cursor:'pointer',
          color:'#1E3A5F', padding:4, borderRadius:6,
          transition:'color 0.15s',
        }}
        onMouseEnter={e=>e.currentTarget.style.color='#64748B'}
        onMouseLeave={e=>e.currentTarget.style.color='#1E3A5F'}>
          <Icon name="logout" size={14}/>
        </button>
      </div>
    </div>
  );
}
