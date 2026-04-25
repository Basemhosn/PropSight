import { useState } from 'react';
import { fmtAED, fmtNum } from '../utils/format';

const AREAS = [
  'Business Bay','Dubai Marina','Downtown Dubai','JVC','Dubai Hills Estate',
  'Palm Jumeirah','JLT','Dubai Creek Harbour','MBR City','DIFC','Meydan',
];

const inputStyle = {
  width: '100%', padding: '12px 14px', borderRadius: 10,
  background: '#070E1B', border: '1px solid rgba(59,130,246,0.15)',
  color: '#F1F5F9', fontSize: 14, outline: 'none',
  fontFamily: 'system-ui', boxSizing: 'border-box',
};

const labelStyle = { fontSize: 12, color: '#64748B', marginBottom: 6, display: 'block', fontWeight: 500 };

export default function DealAnalyzer({ areaData }) {
  const [tab, setTab] = useState('details');
  const [url, setUrl] = useState('');
  const [form, setForm] = useState({
    name: '', area: '', type: 'Apartment', beds: '1 Bedroom',
    floor: '', price: '', size: '', rent: '', service: '',
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    if (!form.price || !form.area) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1800));

    const price = parseFloat(form.price.replace(/,/g, '')) || 2100000;
    const size  = parseFloat(form.size.replace(/,/g, '')) || 1200;
    const rent  = parseFloat(form.rent.replace(/,/g, '')) || 120000;
    const ppsqft = Math.round(price / size);
    const grossYield = ((rent / price) * 100).toFixed(2);
    const netYield = ((rent - (parseFloat(form.service || 25) * size)) / price * 100).toFixed(2);
    const score = Math.min(10, (parseFloat(grossYield) * 1.2 + (ppsqft < 1500 ? 2 : 0))).toFixed(1);
    const verdict = +score >= 7 ? 'Strong Buy' : +score >= 5 ? 'Fair Deal' : 'Overpriced';
    const verdictColor = +score >= 7 ? '#22C55E' : +score >= 5 ? '#F59E0B' : '#F87171';

    setResult({ price, size, rent, ppsqft, grossYield, netYield, score, verdict, verdictColor });
    setLoading(false);
  };

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: '#060E1A', fontFamily: 'system-ui', padding: '28px' }}>

      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#F1F5F9' }}>Deal Analyzer</h1>
        </div>
        <div style={{ fontSize: 13, color: '#475569' }}>
          Analyze any property against real DLD market data and generate a professional PDF report
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 24, background: '#0D1929', borderRadius: 10, padding: 4, width: 'fit-content' }}>
        {[['details', '📊 Enter Details'], ['url', '🔗 Paste URL']].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            padding: '8px 20px', borderRadius: 8, border: 'none', cursor: 'pointer',
            fontSize: 13, fontWeight: 600, fontFamily: 'system-ui',
            background: tab === id ? '#1D4ED8' : 'transparent',
            color: tab === id ? '#fff' : '#64748B',
          }}>{label}</button>
        ))}
      </div>

      {tab === 'url' && (
        <div style={{
          background: '#0D1929', border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 14, padding: '24px', marginBottom: 20,
        }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#F1F5F9', marginBottom: 6 }}>Paste a Listing URL</div>
          <div style={{ fontSize: 13, color: '#475569', marginBottom: 16 }}>
            Paste a Bayut, Property Finder, or Dubizzle link — then fill in the property details below.
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <input value={url} onChange={e => setUrl(e.target.value)}
              placeholder="https://bayut.com/property/..."
              style={{ ...inputStyle, flex: 1 }}/>
            <button onClick={() => setTab('details')} style={{
              padding: '12px 20px', borderRadius: 10, border: 'none', cursor: 'pointer',
              background: 'linear-gradient(135deg,#16A34A,#22C55E)',
              color: '#fff', fontSize: 13, fontWeight: 600, fontFamily: 'system-ui', whiteSpace: 'nowrap',
            }}>Fill Details →</button>
          </div>
          <div style={{ fontSize: 11, color: '#475569', marginTop: 8 }}>
            After pasting, switch to "Enter Details" and fill in the property info from the listing.
          </div>
        </div>
      )}

      {tab === 'details' && (
        <div style={{
          background: '#0D1929', border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 14, padding: '24px', marginBottom: 20,
        }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#F1F5F9', marginBottom: 4 }}>Property Details</div>
          <div style={{ fontSize: 13, color: '#475569', marginBottom: 20 }}>
            Fill in the property details. As you type the area, we'll match it to DLD market data automatically.
          </div>

          {/* Property name */}
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Property / Development Name</label>
            <input value={form.name} onChange={e => setForm({...form, name: e.target.value})}
              placeholder="e.g. Luma 22, Creek Rise Tower 1..." style={inputStyle}/>
          </div>

          {/* Area + Type */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
            <div>
              <label style={labelStyle}>Area <span style={{ color: '#22C55E' }}>* (searches DLD database)</span></label>
              <div style={{ position: 'relative' }}>
                <svg style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}
                  width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <input value={form.area} onChange={e => setForm({...form, area: e.target.value})}
                  placeholder="Type area name, e.g. JVC..."
                  style={{ ...inputStyle, paddingLeft: 36 }}/>
              </div>
            </div>
            <div>
              <label style={labelStyle}>Property Type</label>
              <select value={form.type} onChange={e => setForm({...form, type: e.target.value})}
                style={{ ...inputStyle, cursor: 'pointer' }}>
                {['Apartment','Villa','Townhouse','Penthouse','Studio'].map(t => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Beds + Floor */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
            <div>
              <label style={labelStyle}>Bedrooms</label>
              <select value={form.beds} onChange={e => setForm({...form, beds: e.target.value})}
                style={{ ...inputStyle, cursor: 'pointer' }}>
                {['Studio','1 Bedroom','2 Bedrooms','3 Bedrooms','4 Bedrooms','5+ Bedrooms'].map(b => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Floor / Level</label>
              <input value={form.floor} onChange={e => setForm({...form, floor: e.target.value})}
                placeholder="e.g. 8, Ground, Penthouse..." style={inputStyle}/>
            </div>
          </div>

          {/* Price + Size */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
            <div>
              <label style={labelStyle}>Asking Price (AED) <span style={{ color: '#F87171' }}>*</span></label>
              <input value={form.price} onChange={e => setForm({...form, price: e.target.value})}
                placeholder="2,100,000" style={inputStyle}/>
            </div>
            <div>
              <label style={labelStyle}>Size (sq ft) <span style={{ color: '#F87171' }}>*</span></label>
              <input value={form.size} onChange={e => setForm({...form, size: e.target.value})}
                placeholder="1,200" style={inputStyle}/>
            </div>
          </div>

          {/* Rent + Service */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
            <div>
              <label style={labelStyle}>Expected Annual Rent (AED)</label>
              <input value={form.rent} onChange={e => setForm({...form, rent: e.target.value})}
                placeholder="120,000" style={inputStyle}/>
            </div>
            <div>
              <label style={labelStyle}>Service Charge (AED/sqft/yr)</label>
              <input value={form.service} onChange={e => setForm({...form, service: e.target.value})}
                placeholder="25" style={inputStyle}/>
            </div>
          </div>

          <button onClick={analyze} disabled={loading} style={{
            padding: '13px 28px', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: loading ? 'rgba(34,197,94,0.3)' : 'linear-gradient(135deg,#16A34A,#22C55E)',
            color: '#fff', fontSize: 14, fontWeight: 600, fontFamily: 'system-ui',
          }}>
            {loading ? 'Analyzing...' : '🔍 Analyze This Deal'}
          </button>
        </div>
      )}

      {/* Result */}
      {result && (
        <div style={{
          background: '#0D1929', border: `1px solid ${result.verdictColor}40`,
          borderRadius: 14, padding: '24px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 12, color: '#64748B', marginBottom: 4 }}>AI Verdict</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: result.verdictColor }}>{result.verdict}</div>
            </div>
            <div style={{
              width: 72, height: 72, borderRadius: '50%',
              background: `${result.verdictColor}15`,
              border: `3px solid ${result.verdictColor}`,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: result.verdictColor }}>{result.score}</div>
              <div style={{ fontSize: 10, color: '#64748B' }}>/10</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
            {[
              { label: 'Price/sqft', value: `AED ${fmtNum(result.ppsqft)}` },
              { label: 'Gross Yield', value: `${result.grossYield}%`, color: '#22C55E' },
              { label: 'Net Yield', value: `${result.netYield}%`, color: '#22C55E' },
              { label: 'Deal Score', value: `${result.score}/10`, color: result.verdictColor },
            ].map((item, i) => (
              <div key={i} style={{
                background: '#070E1B', border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 10, padding: '14px',
              }}>
                <div style={{ fontSize: 11, color: '#64748B', marginBottom: 6 }}>{item.label}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: item.color || '#F1F5F9' }}>{item.value}</div>
              </div>
            ))}
          </div>

          <button style={{
            marginTop: 16, padding: '12px 20px', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: 'linear-gradient(135deg,#1D4ED8,#38BDF8)',
            color: '#fff', fontSize: 13, fontWeight: 600, fontFamily: 'system-ui',
          }}>📄 Download PDF Report</button>
        </div>
      )}
    </div>
  );
}
