import { useState } from 'react';

export default function LiveBadge({ isLive, loading, error, lastUpdate, onRefresh }) {
  const [hovering, setHovering] = useState(false);

  const statusColor = loading ? '#BA7517' : isLive ? '#1D9E75' : '#9AA0AE';
  const statusText  = loading ? 'Updating…' : isLive ? 'Live' : 'Static data';
  const dot         = loading ? '⟳' : isLive ? '●' : '○';

  return (
    <div
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      style={{ display:'flex', alignItems:'center', gap:6, position:'relative' }}
    >
      <div style={{
        display:'flex', alignItems:'center', gap:5,
        background: isLive ? '#E1F5EE' : '#F4F6FA',
        border:`1px solid ${isLive ? '#1D9E75' : '#E8ECF2'}`,
        borderRadius:20, padding:'3px 10px', cursor: isLive ? 'pointer' : 'default',
      }} onClick={onRefresh}>
        <span style={{ color:statusColor, fontSize:isLive?10:12, animation: loading ? 'spin 1s linear infinite' : 'none' }}>
          {dot}
        </span>
        <span style={{ fontSize:11, fontWeight:600, color:statusColor }}>{statusText}</span>
        {isLive && lastUpdate && (
          <span style={{ fontSize:10, color:'#9AA0AE' }}>
            {lastUpdate.toLocaleTimeString('en-AE',{hour:'2-digit',minute:'2-digit'})}
          </span>
        )}
      </div>

      {/* Tooltip */}
      {hovering && (
        <div style={{
          position:'absolute', top:'100%', right:0, marginTop:6,
          background:'#0A1628', color:'#fff', fontSize:11, borderRadius:8,
          padding:'8px 12px', whiteSpace:'nowrap', zIndex:100,
          boxShadow:'0 4px 16px rgba(0,0,0,0.2)',
        }}>
          {isLive
            ? `Live DLD data · refreshes every 5 min\nClick to refresh now`
            : error
              ? `Live API unavailable: ${error}\nShowing precomputed data`
              : 'Showing precomputed data (2020–2026)'
          }
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  );
}
