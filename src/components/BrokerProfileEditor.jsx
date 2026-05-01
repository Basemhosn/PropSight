import { useState, useRef } from 'react';
import { useAuth, supabase } from '../context/AuthContext';

const SPECIALIZATIONS = [
  'Residential Sales','Luxury Properties','Off-Plan','Commercial','Investment',
  'Property Management','Rentals','Land','Hotel Apartments','Short-term Rentals',
];
const LANGUAGES = ['English','Arabic','Russian','French','Hindi','Urdu','Chinese','German','Italian','Spanish'];

function Avatar({ url, name, size=80 }) {
  return (
    <div style={{ width:size, height:size, borderRadius:'50%', flexShrink:0,
      background:'linear-gradient(135deg,#1D4ED8,#38BDF8)',
      display:'flex', alignItems:'center', justifyContent:'center',
      fontSize:size*0.35, fontWeight:700, color:'#fff', overflow:'hidden',
      border:'3px solid rgba(56,189,248,0.3)' }}>
      {url
        ? <img src={url} alt={name} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
        : (name?.[0] || 'B').toUpperCase()
      }
    </div>
  );
}

function UploadButton({ label, onUpload, loading }) {
  const ref = useRef();
  return (
    <>
      <input ref={ref} type="file" accept="image/*" style={{ display:'none' }}
        onChange={e => e.target.files[0] && onUpload(e.target.files[0])}/>
      <button onClick={() => ref.current.click()} disabled={loading}
        style={{ padding:'8px 16px', borderRadius:8, border:'1px solid rgba(59,130,246,0.2)',
          background:'rgba(59,130,246,0.06)', color:'#38BDF8', cursor:'pointer',
          fontSize:12, fontWeight:600, fontFamily:'system-ui' }}>
        {loading ? 'Uploading...' : label}
      </button>
    </>
  );
}

export default function BrokerProfileEditor() {
  const { user, profile } = useAuth();
  const [form, setForm] = useState({
    broker_name:      profile?.broker_name      || profile?.full_name || '',
    broker_title:     profile?.broker_title     || 'Real Estate Broker',
    agency_name:      profile?.agency_name      || '',
    rera_number:      profile?.rera_number      || '',
    phone:            profile?.phone            || '',
    office_address:   profile?.office_address   || '',
    bio:              profile?.bio              || '',
    website:          profile?.website          || '',
    years_experience: profile?.years_experience || '',
    specializations:  profile?.specializations  || [],
    languages:        profile?.languages        || ['English'],
    broker_photo_url: profile?.broker_photo_url || profile?.avatar_url || '',
    agency_logo_url:  profile?.agency_logo_url  || '',
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [error, setError] = useState('');

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const toggleArr = (key, val) => {
    setForm(f => ({
      ...f,
      [key]: f[key].includes(val) ? f[key].filter(x=>x!==val) : [...f[key], val]
    }));
  };

  const uploadImage = async (file, path, key, setLoading) => {
    setLoading(true);
    setError('');
    try {
      const ext = file.name.split('.').pop();
      const filePath = `${user.id}/${path}-${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from('broker-assets')
        .upload(filePath, file, { upsert: true });
      if (upErr) throw upErr;
      const { data } = supabase.storage.from('broker-assets').getPublicUrl(filePath);
      set(key, data.publicUrl);
    } catch (e) {
      setError('Upload failed: ' + e.message);
    }
    setLoading(false);
  };

  const save = async () => {
    setSaving(true);
    setError('');
    try {
      const { error } = await supabase.from('profiles').update({
        ...form,
        years_experience: form.years_experience ? parseInt(form.years_experience) : null,
        full_name: form.broker_name,
        avatar_url: form.broker_photo_url,
      }).eq('id', user.id);
      if (error) throw error;
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      setError('Save failed: ' + e.message);
    }
    setSaving(false);
  };

  const inp = {
    width:'100%', padding:'10px 12px', borderRadius:8, background:'var(--bg-alt)',
    border:'1px solid rgba(59,130,246,0.15)', color:'var(--text-primary)',
    fontSize:13, outline:'none', fontFamily:'system-ui', boxSizing:'border-box',
  };
  const lbl = { fontSize:11, color:'var(--text-muted)', marginBottom:6, fontWeight:600,
    textTransform:'uppercase', letterSpacing:'0.05em', display:'block' };

  return (
    <div style={{ flex:1, overflowY:'auto', background:'var(--bg)', fontFamily:'system-ui', padding:'24px 28px' }}>
      <div style={{ maxWidth:760, margin:'0 auto' }}>

        {/* Header */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
          <div>
            <h1 style={{ margin:0, fontSize:22, fontWeight:700, color:'var(--text-primary)', marginBottom:4 }}>Broker Profile</h1>
            <div style={{ fontSize:13, color:'var(--text-secondary)' }}>Your details appear on all generated reports and score cards</div>
          </div>
          <button onClick={save} disabled={saving} style={{
            padding:'10px 24px', borderRadius:12, border:'none', cursor:'pointer',
            background:'linear-gradient(135deg,#1D4ED8,#38BDF8)',
            color:'#fff', fontSize:14, fontWeight:600, fontFamily:'system-ui',
          }}>
            {saving ? 'Saving...' : saved ? '✓ Saved!' : 'Save Profile'}
          </button>
        </div>

        {error && (
          <div style={{ background:'rgba(248,113,113,0.1)', border:'1px solid rgba(248,113,113,0.3)', borderRadius:10, padding:'12px 16px', marginBottom:16, fontSize:13, color:'#F87171' }}>
            {error}
          </div>
        )}

        {/* Profile preview card */}
        <div style={{ background:'var(--surface)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:16, padding:24, marginBottom:24 }}>
          <div style={{ fontSize:12, fontWeight:600, color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:16 }}>Profile Preview</div>
          <div style={{ display:'flex', alignItems:'center', gap:20 }}>
            <Avatar url={form.broker_photo_url} name={form.broker_name} size={80}/>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:20, fontWeight:700, color:'var(--text-primary)', marginBottom:2 }}>{form.broker_name || 'Your Name'}</div>
              <div style={{ fontSize:14, color:'#38BDF8', marginBottom:2 }}>{form.broker_title}</div>
              <div style={{ fontSize:13, color:'var(--text-secondary)' }}>{form.agency_name || 'Agency Name'}</div>
              {form.rera_number && <div style={{ fontSize:11, color:'var(--text-muted)', marginTop:4 }}>RERA: {form.rera_number}</div>}
            </div>
            {form.agency_logo_url && (
              <img src={form.agency_logo_url} alt="Agency Logo"
                style={{ height:60, objectFit:'contain', borderRadius:8 }}/>
            )}
          </div>
        </div>

        {/* Photo & Logo uploads */}
        <div style={{ background:'var(--surface)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:16, padding:24, marginBottom:20 }}>
          <div style={{ fontSize:14, fontWeight:600, color:'var(--text-primary)', marginBottom:16 }}>Photos & Branding</div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
            <div>
              <div style={{ fontSize:12, fontWeight:600, color:'var(--text-muted)', marginBottom:10, textTransform:'uppercase', letterSpacing:'0.05em' }}>Broker Photo</div>
              <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                <Avatar url={form.broker_photo_url} name={form.broker_name} size={56}/>
                <div>
                  <UploadButton label="Upload Photo" loading={uploadingPhoto}
                    onUpload={f => uploadImage(f, 'photo', 'broker_photo_url', setUploadingPhoto)}/>
                  <div style={{ fontSize:10, color:'var(--text-muted)', marginTop:4 }}>JPG, PNG · Max 2MB · Square recommended</div>
                </div>
              </div>
            </div>
            <div>
              <div style={{ fontSize:12, fontWeight:600, color:'var(--text-muted)', marginBottom:10, textTransform:'uppercase', letterSpacing:'0.05em' }}>Agency Logo</div>
              <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                <div style={{ width:56, height:56, borderRadius:10, background:'var(--bg-alt)', border:'1px solid rgba(255,255,255,0.06)', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
                  {form.agency_logo_url
                    ? <img src={form.agency_logo_url} alt="Logo" style={{ width:'100%', height:'100%', objectFit:'contain' }}/>
                    : <span style={{ fontSize:20 }}>🏢</span>}
                </div>
                <div>
                  <UploadButton label="Upload Logo" loading={uploadingLogo}
                    onUpload={f => uploadImage(f, 'logo', 'agency_logo_url', setUploadingLogo)}/>
                  <div style={{ fontSize:10, color:'var(--text-muted)', marginTop:4 }}>PNG with transparency recommended</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Personal details */}
        <div style={{ background:'var(--surface)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:16, padding:24, marginBottom:20 }}>
          <div style={{ fontSize:14, fontWeight:600, color:'var(--text-primary)', marginBottom:16 }}>Personal & Professional Details</div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
            <div>
              <label style={lbl}>Full Name</label>
              <input value={form.broker_name} onChange={e=>set('broker_name',e.target.value)} placeholder="Mohammed Al Rashid" style={inp}/>
            </div>
            <div>
              <label style={lbl}>Title / Role</label>
              <input value={form.broker_title} onChange={e=>set('broker_title',e.target.value)} placeholder="Senior Real Estate Broker" style={inp}/>
            </div>
            <div>
              <label style={lbl}>Agency / Company Name</label>
              <input value={form.agency_name} onChange={e=>set('agency_name',e.target.value)} placeholder="PropSight Real Estate" style={inp}/>
            </div>
            <div>
              <label style={lbl}>RERA Broker Number</label>
              <input value={form.rera_number} onChange={e=>set('rera_number',e.target.value)} placeholder="e.g. 12345" style={inp}/>
            </div>
            <div>
              <label style={lbl}>Phone / WhatsApp</label>
              <input value={form.phone} onChange={e=>set('phone',e.target.value)} placeholder="+971 50 123 4567" style={inp}/>
            </div>
            <div>
              <label style={lbl}>Years of Experience</label>
              <input type="number" value={form.years_experience} onChange={e=>set('years_experience',e.target.value)} placeholder="e.g. 7" style={inp}/>
            </div>
            <div style={{ gridColumn:'1/-1' }}>
              <label style={lbl}>Office Address</label>
              <input value={form.office_address} onChange={e=>set('office_address',e.target.value)} placeholder="Office 2205, Marina Plaza, Dubai Marina, Dubai" style={inp}/>
            </div>
            <div>
              <label style={lbl}>Website</label>
              <input value={form.website} onChange={e=>set('website',e.target.value)} placeholder="www.youragency.ae" style={inp}/>
            </div>
            <div style={{ gridColumn:'1/-1' }}>
              <label style={lbl}>Professional Bio</label>
              <textarea value={form.bio} onChange={e=>set('bio',e.target.value)}
                placeholder="Experienced Dubai real estate broker specialising in luxury residential and off-plan properties..."
                rows={3} style={{ ...inp, resize:'vertical', lineHeight:1.6 }}/>
            </div>
          </div>
        </div>

        {/* Specializations */}
        <div style={{ background:'var(--surface)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:16, padding:24, marginBottom:20 }}>
          <div style={{ fontSize:14, fontWeight:600, color:'var(--text-primary)', marginBottom:6 }}>Specializations</div>
          <div style={{ fontSize:12, color:'var(--text-muted)', marginBottom:14 }}>Select all that apply — shown on your reports</div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
            {SPECIALIZATIONS.map(s => (
              <button key={s} onClick={() => toggleArr('specializations', s)} style={{
                padding:'7px 14px', borderRadius:20, border:'none', cursor:'pointer',
                fontSize:12, fontFamily:'system-ui', fontWeight:500,
                background: form.specializations.includes(s) ? 'linear-gradient(135deg,#1D4ED8,#38BDF8)' : 'var(--bg-alt)',
                color: form.specializations.includes(s) ? '#fff' : 'var(--text-muted)',
                border: form.specializations.includes(s) ? 'none' : '1px solid rgba(255,255,255,0.06)',
              }}>{s}</button>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div style={{ background:'var(--surface)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:16, padding:24, marginBottom:24 }}>
          <div style={{ fontSize:14, fontWeight:600, color:'var(--text-primary)', marginBottom:6 }}>Languages Spoken</div>
          <div style={{ fontSize:12, color:'var(--text-muted)', marginBottom:14 }}>Shown on your broker report</div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
            {LANGUAGES.map(l => (
              <button key={l} onClick={() => toggleArr('languages', l)} style={{
                padding:'7px 14px', borderRadius:20, border:'none', cursor:'pointer',
                fontSize:12, fontFamily:'system-ui', fontWeight:500,
                background: form.languages.includes(l) ? 'linear-gradient(135deg,#7C3AED,#A78BFA)' : 'var(--bg-alt)',
                color: form.languages.includes(l) ? '#fff' : 'var(--text-muted)',
                border: form.languages.includes(l) ? 'none' : '1px solid rgba(255,255,255,0.06)',
              }}>{l}</button>
            ))}
          </div>
        </div>

        <button onClick={save} disabled={saving} style={{
          width:'100%', padding:'14px', borderRadius:12, border:'none', cursor:'pointer',
          background:'linear-gradient(135deg,#1D4ED8,#38BDF8)',
          color:'#fff', fontSize:15, fontWeight:600, fontFamily:'system-ui',
        }}>
          {saving ? 'Saving...' : saved ? '✓ Profile Saved!' : 'Save Broker Profile'}
        </button>
      </div>
    </div>
  );
}
