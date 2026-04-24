import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

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

  return (
    <div style={{ minHeight:'100vh', background:'#0A1628', display:'flex',
      alignItems:'center', justifyContent:'center', padding:'1rem' }}>
      <div style={{ width:'100%', maxWidth:420 }}>
        <div style={{ textAlign:'center', marginBottom:'2rem' }}>
          <div style={{ fontSize:36, marginBottom:8 }}>🏙️</div>
          <div style={{ fontSize:24, fontWeight:700, color:'#fff', marginBottom:4 }}>Dubai RE Dashboard</div>
          <div style={{ fontSize:13, color:'#5A7A9A' }}>Official DLD open data · Real-time market intelligence</div>
        </div>

        <div style={{ background:'#0F1E32', border:'1px solid #1A2A40', borderRadius:16, padding:'2rem' }}>
          <div style={{ display:'flex', background:'rgba(255,255,255,0.05)', borderRadius:10, padding:3, marginBottom:'1.5rem' }}>
            {['signin','signup'].map(m => (
              <button key={m} onClick={() => { setMode(m); setError(''); setSuccess(''); }} style={{
                flex:1, padding:'8px', borderRadius:8, border:'none', cursor:'pointer', fontSize:13, fontWeight:600,
                background: mode===m ? '#185FA5' : 'transparent', color: mode===m ? '#fff' : '#5A7A9A',
              }}>{m === 'signin' ? 'Sign in' : 'Create account'}</button>
            ))}
          </div>

          <button onClick={signInWithGoogle} style={{
            width:'100%', padding:'11px', borderRadius:10, border:'1px solid #1A2A40',
            background:'#fff', cursor:'pointer', display:'flex', alignItems:'center',
            justifyContent:'center', gap:10, fontSize:13, fontWeight:600, color:'#0A1628', marginBottom:'1.25rem',
          }}>
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Continue with Google
          </button>

          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:'1.25rem' }}>
            <div style={{ flex:1, height:1, background:'#1A2A40' }}/>
            <span style={{ fontSize:11, color:'#3A4A5A' }}>or</span>
            <div style={{ flex:1, height:1, background:'#1A2A40' }}/>
          </div>

          {mode === 'signup' && (
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name"
              style={{ width:'100%', padding:'11px 14px', borderRadius:10, border:'1px solid #1A2A40',
                background:'#0A1628', color:'#fff', fontSize:13, outline:'none',
                boxSizing:'border-box', marginBottom:'0.875rem', display:'block' }}/>
          )}

          <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
            placeholder="Email address" onKeyDown={e=>e.key==='Enter'&&handleSubmit()}
            style={{ width:'100%', padding:'11px 14px', borderRadius:10, border:'1px solid #1A2A40',
              background:'#0A1628', color:'#fff', fontSize:13, outline:'none',
              boxSizing:'border-box', marginBottom:'0.875rem', display:'block' }}/>

          <input type="password" value={password} onChange={e=>setPassword(e.target.value)}
            placeholder="Password" onKeyDown={e=>e.key==='Enter'&&handleSubmit()}
            style={{ width:'100%', padding:'11px 14px', borderRadius:10, border:'1px solid #1A2A40',
              background:'#0A1628', color:'#fff', fontSize:13, outline:'none',
              boxSizing:'border-box', marginBottom:'1.25rem', display:'block' }}/>

          {error   && <div style={{ fontSize:12, color:'#f87171', marginBottom:'0.875rem', textAlign:'center' }}>{error}</div>}
          {success && <div style={{ fontSize:12, color:'#34d399', marginBottom:'0.875rem', textAlign:'center' }}>{success}</div>}

          <button onClick={handleSubmit} disabled={loading} style={{
            width:'100%', padding:'12px', borderRadius:10, border:'none',
            background: loading ? '#0F3D5E' : '#185FA5', color:'#fff',
            fontSize:14, fontWeight:600, cursor: loading?'default':'pointer',
          }}>
            {loading ? 'Please wait…' : mode==='signin' ? 'Sign in' : 'Create account'}
          </button>

          <div style={{ marginTop:'1.25rem', textAlign:'center', fontSize:12, color:'#3A4A5A' }}>
            Free: Overview, Pulse & 3 Lookups/day<br/>
            <span style={{ color:'#185FA5', fontWeight:600 }}>Pro ($29/mo)</span> — everything unlocked
          </div>
        </div>
      </div>
    </div>
  );
}
