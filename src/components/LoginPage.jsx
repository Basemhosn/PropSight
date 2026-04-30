import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import PropSightLogo from './PropSightLogo';

export default function LoginPage() {
  const { signInWithEmail, signUpWithEmail, signInWithGoogle } = useAuth();
  const [mode,     setMode]     = useState('signin');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [name,     setName]     = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);
  const [success,  setSuccess]  = useState('');

  const handleSubmit = async () => {
    setError(''); setLoading(true);
    try {
      if (mode === 'signin') {
        const { error } = await signInWithEmail(email, password);
        if (error) setError(error.message);
      } else {
        const { error } = await signUpWithEmail(email, password, name);
        if (error) setError(error.message);
        else setSuccess('Check your email to confirm your account.');
      }
    } catch (e) { setError(e.message); }
    setLoading(false);
  };

  const inp = {
    width: '100%', padding: '11px 14px', borderRadius: 10,
    border: '1px solid rgba(59,130,246,0.15)',
    background: 'rgba(59,130,246,0.04)',
    color: 'var(--text-primary)', fontSize: 13, outline: 'none',
    boxSizing: 'border-box', display: 'block',
    transition: 'border-color 0.15s', fontFamily: 'system-ui,sans-serif',
    marginBottom: '0.875rem',
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '1rem', position: 'relative', overflow: 'hidden',
      fontFamily: 'system-ui, sans-serif',
    }}>
      {/* Dot grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(59,130,246,0.08) 1px, transparent 1px)',
        backgroundSize: '36px 36px',
      }}/>
      {/* Blue glow */}
      <div style={{
        position: 'absolute', top: '25%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: 700, height: 700, pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)',
      }}/>
      {/* Gold glow bottom right */}
      <div style={{
        position: 'absolute', bottom: '10%', right: '10%', pointerEvents: 'none',
        width: 300, height: 300,
        background: 'radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 70%)',
      }}/>

      {/* Logo */}
      <div style={{ marginBottom: '2.5rem', zIndex: 1 }}>
        <PropSightLogo size="lg" showSlogan />
      </div>

      {/* Card */}
      <div style={{
        width: '100%', maxWidth: 440, zIndex: 1,
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 16, padding: '2rem',
        boxShadow: '0 0 40px rgba(59,130,246,0.06), 0 8px 24px rgba(0,0,0,0.1)',
      }}>
        {/* Tabs */}
        <div style={{ display:'flex', background:'rgba(59,130,246,0.06)',
          borderRadius:10, padding:3, marginBottom:'1.5rem', gap:2 }}>
          {[['signin','Sign in'],['signup','Create account']].map(([m,label]) => (
            <button key={m} onClick={() => { setMode(m); setError(''); setSuccess(''); }} style={{
              flex:1, padding:'8px', borderRadius:8, border:'none', cursor:'pointer',
              fontSize:13, fontWeight:600, transition:'all 0.15s',
              background: mode===m ? 'linear-gradient(135deg,#1D4ED8,#38BDF8)' : 'transparent',
              color: mode===m ? '#fff' : 'var(--text-muted)',
            }}>{label}</button>
          ))}
        </div>

        {/* Google */}
        <button onClick={signInWithGoogle} style={{
          width:'100%', padding:'12px', borderRadius:10,
          border:'1px solid rgba(59,130,246,0.15)',
          background:'rgba(59,130,246,0.04)',
          cursor:'pointer', display:'flex', alignItems:'center',
          justifyContent:'center', gap:10,
          fontSize:13, fontWeight:500, color:'var(--text-secondary)',
          marginBottom:'1.25rem', transition:'all 0.15s',
          fontFamily:'system-ui,sans-serif',
        }}
        onMouseEnter={e=>{ e.currentTarget.style.borderColor='rgba(59,130,246,0.4)'; e.currentTarget.style.background='rgba(59,130,246,0.08)'; }}
        onMouseLeave={e=>{ e.currentTarget.style.borderColor='rgba(59,130,246,0.15)'; e.currentTarget.style.background='rgba(59,130,246,0.04)'; }}>
          <svg width="16" height="16" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          Continue with Google
        </button>

        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:'1.25rem' }}>
          <div style={{ flex:1, height:1, background:'rgba(59,130,246,0.1)' }}/>
          <span style={{ fontSize:11, color:'var(--text-faint)' }}>or</span>
          <div style={{ flex:1, height:1, background:'rgba(59,130,246,0.1)' }}/>
        </div>

        {mode === 'signup' && (
          <input value={name} onChange={e=>setName(e.target.value)}
            placeholder="Full name" style={inp}
            onFocus={e=>e.target.style.borderColor='rgba(59,130,246,0.5)'}
            onBlur={e=>e.target.style.borderColor='rgba(59,130,246,0.15)'}/>
        )}
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
          placeholder="Email address" onKeyDown={e=>e.key==='Enter'&&handleSubmit()}
          style={inp}
          onFocus={e=>e.target.style.borderColor='rgba(59,130,246,0.5)'}
          onBlur={e=>e.target.style.borderColor='rgba(59,130,246,0.15)'}/>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)}
          placeholder="Password" onKeyDown={e=>e.key==='Enter'&&handleSubmit()}
          style={{ ...inp, marginBottom:'1.25rem' }}
          onFocus={e=>e.target.style.borderColor='rgba(59,130,246,0.5)'}
          onBlur={e=>e.target.style.borderColor='rgba(59,130,246,0.15)'}/>

        {error   && <div style={{ fontSize:12, color:'#F87171', marginBottom:'0.875rem', textAlign:'center' }}>{error}</div>}
        {success && <div style={{ fontSize:12, color:'#38BDF8', marginBottom:'0.875rem', textAlign:'center' }}>{success}</div>}

        <button onClick={handleSubmit} disabled={loading} style={{
          width:'100%', padding:'13px', borderRadius:10, border:'none',
          background: 'linear-gradient(135deg, #1D4ED8, #38BDF8)',
          color:'#fff', fontSize:14, fontWeight:700,
          cursor: loading ? 'default' : 'pointer',
          opacity: loading ? 0.7 : 1,
          transition:'opacity 0.15s',
          fontFamily:'system-ui,sans-serif',
        }}>
          {loading ? 'Please wait…' : mode==='signin' ? 'Sign in' : 'Create account'}
        </button>

        <div style={{ marginTop:'1.25rem', textAlign:'center', fontSize:11, color:'var(--text-faint)', lineHeight:1.8 }}>
          Free: Overview, Pulse & 3 Lookups/day<br/>
          <span style={{ color:'#38BDF8', fontWeight:600 }}>Pro (AED 99/mo)</span> — full access
        </div>
      </div>
    </div>
  );
}
