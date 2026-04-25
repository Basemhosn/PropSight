import { useAuth } from '../context/AuthContext';
import { fmtNum } from '../utils/format';
import PropSightLogo from './PropSightLogo';

export default function TopNav({ datasetMeta, filteredCount }) {
  const { user, profile, signOut, isPro } = useAuth();

  return (
    <div style={{
      background: 'rgba(6,14,26,0.97)',
      padding: '0 1.25rem', minHeight: 56,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      borderBottom: '1px solid rgba(59,130,246,0.1)',
      position: 'sticky', top: 0, zIndex: 100,
      backdropFilter: 'blur(12px)',
      flexWrap: 'wrap', gap: 8,
      fontFamily: 'system-ui, sans-serif',
    }}>
      {/* Left — logo */}
      <PropSightLogo size="sm" />

      {/* Centre — dataset info */}
      <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' }}>
        {datasetMeta && (
          <>
            <span style={{
              fontSize:11, padding:'3px 10px', borderRadius:20, fontWeight:600,
              background:'rgba(56,189,248,0.1)', color:'#38BDF8',
              border:'1px solid rgba(56,189,248,0.2)',
            }}>
              {fmtNum(filteredCount)} / {fmtNum(datasetMeta.totalRows)} transactions
            </span>
            <span style={{
              fontSize:11, padding:'3px 10px', borderRadius:20,
              background:'rgba(59,130,246,0.06)', color:'#475569',
              border:'1px solid rgba(59,130,246,0.1)',
            }}>
              Updated {datasetMeta.lastUpdated}
            </span>
          </>
        )}
        {isPro && (
          <span style={{
            fontSize:11, padding:'3px 10px', borderRadius:20, fontWeight:600,
            background:'rgba(245,158,11,0.1)', color:'#F59E0B',
            border:'1px solid rgba(245,158,11,0.2)',
          }}>⭐ Pro</span>
        )}
      </div>

      {/* Right — user */}
      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
        {profile?.avatar_url ? (
          <img src={profile.avatar_url} alt="avatar"
            style={{ width:28, height:28, borderRadius:'50%', objectFit:'cover',
              border:'1px solid rgba(59,130,246,0.3)' }}/>
        ) : (
          <div style={{
            width:28, height:28, borderRadius:'50%',
            background:'linear-gradient(135deg,#1D4ED8,#38BDF8)',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:11, fontWeight:700, color:'#fff',
          }}>
            {(profile?.full_name?.[0] || user?.email?.[0] || 'U').toUpperCase()}
          </div>
        )}
        <span style={{ fontSize:12, fontWeight:500, color:'#94A3B8' }}>
          {profile?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'User'}
        </span>
        <button onClick={signOut} style={{
          background:'transparent',
          border:'1px solid rgba(59,130,246,0.15)',
          color:'#475569', borderRadius:8,
          padding:'5px 10px', fontSize:11,
          cursor:'pointer', fontWeight:500,
          transition:'all 0.15s', fontFamily:'system-ui,sans-serif',
        }}
        onMouseEnter={e=>{ e.currentTarget.style.borderColor='rgba(59,130,246,0.3)'; e.currentTarget.style.color='#94A3B8'; }}
        onMouseLeave={e=>{ e.currentTarget.style.borderColor='rgba(59,130,246,0.15)'; e.currentTarget.style.color='#475569'; }}>
          Sign out
        </button>
      </div>
    </div>
  );
}
