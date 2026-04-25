import { useState } from 'react';
import { supabase } from '../context/AuthContext';
import PropSightLogo from './PropSightLogo';

const COUNTRIES = [
  'United Arab Emirates','Saudi Arabia','Kuwait','Qatar','Bahrain','Oman',
  'United Kingdom','United States','India','Pakistan','Egypt','Jordan',
  'Lebanon','Russia','China','Germany','France','Australia','Canada','Other'
];
const LANGUAGES = ['English','Arabic','Russian','Chinese','Hindi','French','German'];
const ROLES = [
  { id:'investor',  label:'Investor',       icon:'💰' },
  { id:'broker',    label:'Broker / Agent', icon:'🤝' },
  { id:'developer', label:'Developer',      icon:'🏗' },
  { id:'analyst',   label:'Analyst',        icon:'📊' },
  { id:'buyer',     label:'End User',       icon:'🏠' },
  { id:'other',     label:'Other',          icon:'👤' },
];

export default function OnboardingPage({ user, onComplete }) {
  const [name,     setName]     = useState(user?.user_metadata?.full_name || '');
  const [phone,    setPhone]    = useState('');
  const [country,  setCountry]  = useState('United Arab Emirates');
  const [language, setLanguage] = useState('English');
  const [role,     setRole]     = useState('');
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');

  const handleSubmit = async () => {
    if (!name.trim()) { setError('Please enter your full name'); return; }
    if (!role)        { setError('Please select your role'); return; }
    setLoading(true); setError('');
    try {
      const { error } = await supabase.from('profiles').upsert({
        id: user.id, email: user.email,
        full_name: name, phone, country, language, role,
        onboarded: true, updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      onComplete();
    } catch (e) { setError(e.message); }
    setLoading(false);
  };

  const inp = {
    width:'100%', padding:'11px 14px', borderRadius:10,
    border:'1px solid rgba(59,130,246,0.15)',
    background:'rgba(59,130,246,0.04)',
    color:'#E2E8F0', fontSize:13, outline:'none',
    boxSizing:'border-box', display:'block',
    transition:'border-color 0.15s', fontFamily:'system-ui,sans-serif',
  };

  const sel = {
    ...inp,
    appearance:'none', cursor:'pointer',
    backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2364748B' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
    backgroundRepeat:'no-repeat', backgroundPosition:'right 12px center', paddingRight:36,
  };

  return (
    <div style={{
      minHeight:'100vh', background:'#060E1A',
      display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center',
      padding:'1rem', position:'relative', overflow:'hidden',
      fontFamily:'system-ui,sans-serif',
    }}>
      <div style={{
        position:'absolute', inset:0, pointerEvents:'none',
        backgroundImage:'radial-gradient(circle, rgba(59,130,246,0.08) 1px, transparent 1px)',
        backgroundSize:'36px 36px',
      }}/>
      <div style={{
        position:'absolute', top:'25%', left:'50%',
        transform:'translate(-50%,-50%)', width:700, height:700, pointerEvents:'none',
        background:'radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)',
      }}/>

      <div style={{ marginBottom:'2rem', zIndex:1 }}>
        <PropSightLogo size="md" showSlogan />
      </div>

      <div style={{
        width:'100%', maxWidth:480, zIndex:1,
        background:'rgba(10,18,32,0.95)',
        border:'1px solid rgba(59,130,246,0.12)',
        borderRadius:16, padding:'2rem',
        boxShadow:'0 0 40px rgba(59,130,246,0.06), 0 24px 48px rgba(0,0,0,0.5)',
      }}>
        <div style={{ fontSize:22, fontWeight:700, color:'#F1F5F9', marginBottom:6 }}>
          Complete Your Profile
        </div>
        <div style={{ fontSize:13, color:'#64748B', marginBottom:'1.75rem' }}>
          Please provide a few details to get started.
        </div>

        {/* Full name */}
        <label style={labelStyle}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
          </svg>
          Full Name *
        </label>
        <input value={name} onChange={e=>setName(e.target.value)}
          placeholder="Your full name"
          style={{ ...inp, marginBottom:'1.25rem' }}
          onFocus={e=>e.target.style.borderColor='rgba(59,130,246,0.5)'}
          onBlur={e=>e.target.style.borderColor='rgba(59,130,246,0.15)'}/>

        {/* Phone */}
        <label style={labelStyle}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.2 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
          Phone Number *
        </label>
        <input value={phone} onChange={e=>setPhone(e.target.value)}
          placeholder="+971 50 000 0000"
          style={{ ...inp, marginBottom:'1.25rem' }}
          onFocus={e=>e.target.style.borderColor='rgba(59,130,246,0.5)'}
          onBlur={e=>e.target.style.borderColor='rgba(59,130,246,0.15)'}/>

        {/* Country + Language row */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:'1.25rem' }}>
          <div>
            <label style={labelStyle}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              Country
            </label>
            <select value={country} onChange={e=>setCountry(e.target.value)} style={sel}>
              {COUNTRIES.map(c=><option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2">
                <path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/>
              </svg>
              Language
            </label>
            <select value={language} onChange={e=>setLanguage(e.target.value)} style={sel}>
              {LANGUAGES.map(l=><option key={l} value={l}>{l}</option>)}
            </select>
          </div>
        </div>

        {/* Role */}
        <label style={{ ...labelStyle, marginBottom:'0.875rem' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2">
            <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
          </svg>
          I am a *
        </label>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, marginBottom:'1.5rem' }}>
          {ROLES.map(r => (
            <button key={r.id} onClick={() => setRole(r.id)} style={{
              padding:'10px 8px', borderRadius:10, border:'none',
              cursor:'pointer', fontSize:11, fontWeight:600, textAlign:'center',
              background: role===r.id ? 'rgba(59,130,246,0.15)' : 'rgba(59,130,246,0.04)',
              color:       role===r.id ? '#38BDF8' : '#64748B',
              border: `1px solid ${role===r.id ? 'rgba(59,130,246,0.4)' : 'rgba(59,130,246,0.1)'}`,
              transition:'all 0.15s', fontFamily:'system-ui,sans-serif',
            }}>
              <div style={{ fontSize:18, marginBottom:4 }}>{r.icon}</div>
              {r.label}
            </button>
          ))}
        </div>

        {error && <div style={{ fontSize:12, color:'#F87171', marginBottom:'0.875rem', textAlign:'center' }}>{error}</div>}

        <button onClick={handleSubmit} disabled={loading} style={{
          width:'100%', padding:'13px', borderRadius:10, border:'none',
          background:'linear-gradient(135deg, #1D4ED8, #38BDF8)',
          color:'#fff', fontSize:14, fontWeight:700,
          cursor: loading ? 'default' : 'pointer',
          opacity: loading ? 0.7 : 1,
          fontFamily:'system-ui,sans-serif',
        }}>
          {loading ? 'Please wait…' : 'Continue to Dashboard →'}
        </button>
      </div>
    </div>
  );
}

const labelStyle = {
  display:'flex', alignItems:'center', gap:6,
  fontSize:12, color:'#64748B', marginBottom:6, fontWeight:500,
};
