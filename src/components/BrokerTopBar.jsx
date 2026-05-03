import { useState } from 'react';

export default function BrokerTopBar({ user, profile, signOut, toggleLang, lang, isLive, lastUpdate, liveError, onRefresh }) {
  const [showMenu, setShowMenu] = useState(false);
  const [themeMode, setThemeMode] = useState(() => localStorage.getItem('theme') || 'dark');

  const toggleTheme = () => {
    const next = themeMode === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    setThemeMode(next);
  };

  const switchToInvestor = async () => {
    const { supabase } = await import('../context/AuthContext'); // eslint-disable-line no-duplicate-imports
    await supabase.from('profiles').update({ role: 'investor' }).eq('id', user?.id);
    window.location.reload();
  };

  return (
    <div style={{height:52,borderBottom:'1px solid var(--border)',background:'var(--bg-alt)',display:'flex',alignItems:'center',justifyContent:'flex-end',padding:'0 20px',gap:10,flexShrink:0}}>
      <div onClick={onRefresh} title={liveError ? liveError : lastUpdate ? 'Updated '+lastUpdate.toLocaleTimeString() : 'Loading...'}
        style={{display:'flex',alignItems:'center',gap:6,background:isLive?'rgba(34,197,94,0.08)':'rgba(245,158,11,0.08)',border:'1px solid '+(isLive?'rgba(34,197,94,0.2)':'rgba(245,158,11,0.2)'),borderRadius:20,padding:'4px 12px',cursor:'pointer'}}>
        <div style={{width:6,height:6,borderRadius:'50%',background:isLive?'#22C55E':'#F59E0B',boxShadow:'0 0 6px '+(isLive?'#22C55E':'#F59E0B')}}/>
        <span style={{fontSize:11,fontWeight:600,color:isLive?'#22C55E':'#F59E0B'}}>
          {isLive ? 'DDA LIVE' : liveError ? 'STATIC DATA' : 'CONNECTING...'}
        </span>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:6,background:'rgba(245,158,11,0.08)',border:'1px solid rgba(245,158,11,0.2)',borderRadius:20,padding:'4px 12px'}}>
        <span style={{fontSize:11}}>🏢</span>
        <span style={{fontSize:11,fontWeight:600,color:'#F59E0B'}}>Broker Portal</span>
      </div>
      <button onClick={switchToInvestor} style={{fontSize:11,color:'var(--text-secondary)',background:'none',border:'1px solid var(--border)',borderRadius:8,padding:'5px 10px',cursor:'pointer',fontFamily:'inherit'}}>
        Switch to Investor →
      </button>
      <button onClick={toggleTheme} style={{background:'none',border:'1px solid var(--border)',borderRadius:8,padding:'5px 8px',fontSize:13,color:'var(--text-secondary)',cursor:'pointer'}}>
        {themeMode === 'dark' ? '☀️' : '🌙'}
      </button>
      <button onClick={toggleLang} style={{background:'none',border:'1px solid var(--border)',borderRadius:8,padding:'5px 8px',fontSize:12,color:'var(--text-secondary)',cursor:'pointer'}}>
        {lang==='ar'?'🇬🇧 EN':'🇦🇪 AR'}
      </button>
      <div style={{position:'relative'}}>
        <div onClick={() => setShowMenu(m => !m)} style={{width:30,height:30,borderRadius:'50%',background:'linear-gradient(135deg,#1D4ED8,#38BDF8)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:700,color:'#fff',cursor:'pointer'}}>
          {(profile?.full_name?.[0] || user?.email?.[0] || 'U').toUpperCase()}
        </div>
        {showMenu && (
          <div style={{position:'absolute',right:0,top:38,background:'var(--surface)',border:'1px solid var(--border)',borderRadius:10,padding:8,minWidth:180,boxShadow:'0 8px 24px rgba(0,0,0,0.2)',zIndex:999}}>
            <div style={{fontSize:12,color:'var(--text-muted)',padding:'4px 8px',marginBottom:4}}>{user?.email}</div>
            <button onClick={() => { setShowMenu(false); signOut(); }} style={{width:'100%',padding:'8px',borderRadius:8,border:'none',background:'none',cursor:'pointer',fontSize:13,color:'#F87171',textAlign:'left',fontFamily:'inherit'}}>
              Sign out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
