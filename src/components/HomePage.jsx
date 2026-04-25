import { useState, useMemo } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip,
         ResponsiveContainer, CartesianGrid } from 'recharts';
import { fmtAED, fmtNum } from '../utils/format';

const AREA_SHORT = {
  'Al Barsha South Fourth': 'JVC',
  'Burj Khalifa': 'Downtown',
  'Marsa Dubai': 'Marina',
  'Hadaeq Sheikh Mohammed Bin Rashid': 'Dubai Hills',
  'Al Thanyah Fifth': 'JLT',
  'Al Merkadh': 'MBR City',
  'Al Khairan First': 'Creek Harbour',
  'Al Hebiah Fourth': 'Damac Hills',
};
const short = a => AREA_SHORT[a] || a.split(' ').slice(0,2).join(' ');

function KPICard({ label, value, sub, subColor = '#38BDF8', trend }) {
  const isUp = trend > 0;
  return (
    <div style={{
      background: '#0D1929',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: 12, padding: '18px 20px', flex: 1, minWidth: 0,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
        <div style={{ fontSize: 12, color: '#64748B', fontWeight: 400 }}>{label}</div>
        {trend !== undefined && (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke={isUp ? '#22D3EE' : '#F87171'} strokeWidth="2">
            <polyline points={isUp ? '23 6 13.5 15.5 8.5 10.5 1 18' : '23 18 13.5 8.5 8.5 13.5 1 6'}/>
            <polyline points={isUp ? '17 6 23 6 23 12' : '17 18 23 18 23 12'}/>
          </svg>
        )}
      </div>
      <div style={{ fontSize: 26, fontWeight: 700, color: '#F1F5F9', letterSpacing: '-0.5px', marginBottom: 6, lineHeight: 1 }}>
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: 12, color: subColor, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={subColor} strokeWidth="2">
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
          </svg>
          {sub}
        </div>
      )}
    </div>
  );
}

export default function HomePage({ core, areaData, recentRaw, onNavigate }) {
  const [selectedArea, setSelectedArea] = useState('All Dubai');
  const [timeframe, setTimeframe] = useState('1Y');

  const meta    = core?.meta || {};
  const areas   = areaData ? Object.keys(areaData) : [];
  const topAreas = areas.slice(0, 7);

  // Price trend
  const priceTrend = useMemo(() => (core?.priceTrend || []), [core]);
  const latestPpsqm = priceTrend.length ? priceTrend[priceTrend.length - 1].ppsqm : 0;
  const prevPpsqm   = priceTrend.length > 1 ? priceTrend[priceTrend.length - 2].ppsqm : latestPpsqm;
  const yoyPct      = prevPpsqm > 0 ? ((latestPpsqm - prevPpsqm) / prevPpsqm * 100).toFixed(1) : '0';

  // Market score
  const mScore = Math.min(10, Math.max(1, 5 + parseFloat(yoyPct) / 3)).toFixed(1);
  const mLabel = +mScore >= 8 ? 'Strong Buy' : +mScore >= 6 ? 'Buy' : 'Hold';

  // Area volumes from recent
  const areaVolumes = useMemo(() => {
    if (!recentRaw?.length) return [];
    const counts = {};
    recentRaw.forEach(r => { const a = short(r.a || ''); counts[a] = (counts[a] || 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 7)
      .map(([area, count]) => ({ area, count }));
  }, [recentRaw]);

  // Monthly trend for chart
  const monthly = useMemo(() => {
    const m = core?.slices?.all?.monthly || [];
    return m.slice(-12);
  }, [core]);

  const TIMEFRAMES = ['7D', '1M', '3M', '6M', '1Y', 'YTD'];

  return (
    <div style={{
      flex: 1, overflowY: 'auto', background: '#060E1A',
      fontFamily: 'system-ui, sans-serif', minHeight: '100vh',
    }}>
      {/* Pro banner */}
      <div style={{
        background: 'linear-gradient(90deg, rgba(29,78,216,0.12) 0%, rgba(6,182,212,0.08) 100%)',
        borderBottom: '1px solid rgba(59,130,246,0.12)',
        padding: '10px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
          </svg>
          <span style={{ fontSize: 12, color: '#64748B' }}>
            <span style={{ color: '#38BDF8', fontWeight: 600 }}>PropSight Pro</span>
            {' '}— Market Intelligence · Deal Analyzer · Dubai Heatmap ·{' '}
            <span style={{ color: '#F59E0B', fontWeight: 500 }}>30 days free trial</span>
          </span>
        </div>
        <button style={{
          padding: '5px 16px', borderRadius: 20, border: 'none', cursor: 'pointer',
          background: 'linear-gradient(135deg, #1D4ED8, #38BDF8)',
          color: '#fff', fontSize: 11, fontWeight: 600, fontFamily: 'system-ui',
        }}>Upgrade Now →</button>
      </div>

      <div style={{ padding: '24px 28px' }}>

        {/* Search */}
        <div style={{
          display: 'flex', gap: 10, marginBottom: 20, alignItems: 'center',
          background: '#0D1929', border: '1px solid rgba(59,130,246,0.15)',
          borderRadius: 12, padding: '10px 16px',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input placeholder="Search areas, projects, developers..."
            style={{
              background: 'none', border: 'none', outline: 'none',
              color: '#94A3B8', fontSize: 14, flex: 1, fontFamily: 'system-ui',
            }}/>
          <div style={{ display: 'flex', gap: 6 }}>
            {['Sales', 'Rental'].map(t => (
              <button key={t} style={{
                padding: '5px 14px', borderRadius: 20, border: 'none', cursor: 'pointer',
                fontSize: 11, fontWeight: 600, fontFamily: 'system-ui',
                background: t === 'Sales' ? 'linear-gradient(135deg,#1D4ED8,#38BDF8)' : 'rgba(59,130,246,0.08)',
                color: t === 'Sales' ? '#fff' : '#64748B',
              }}>{t}</button>
            ))}
          </div>
          <button style={{
            padding: '8px 20px', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: 'linear-gradient(135deg,#1D4ED8,#38BDF8)',
            color: '#fff', fontSize: 13, fontWeight: 600, fontFamily: 'system-ui',
          }}>Search</button>
        </div>

        {/* Area chips */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 18, flexWrap: 'wrap', alignItems: 'center' }}>
          {['All Dubai', ...topAreas].map(a => {
            const lbl = a === 'All Dubai' ? `All Areas (${fmtNum(meta.totalRows || 0)})` : `${short(a)} (${fmtNum(areaData?.[a]?.kpis?.count || 0)})`;
            const active = selectedArea === a;
            return (
              <button key={a} onClick={() => setSelectedArea(a)} style={{
                padding: '6px 14px', borderRadius: 20, cursor: 'pointer', fontSize: 12,
                fontWeight: active ? 600 : 400, fontFamily: 'system-ui',
                background: active ? 'linear-gradient(135deg,#1D4ED8,#38BDF8)' : 'rgba(59,130,246,0.06)',
                color: active ? '#fff' : '#64748B',
                border: active ? 'none' : '1px solid rgba(59,130,246,0.12)',
              }}>{lbl}</button>
            );
          })}
        </div>

        {/* Timeframe */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 20 }}>
          {TIMEFRAMES.map(t => (
            <button key={t} onClick={() => setTimeframe(t)} style={{
              padding: '5px 12px', borderRadius: 8, border: 'none', cursor: 'pointer',
              fontSize: 11, fontWeight: 600, fontFamily: 'system-ui',
              background: timeframe === t ? 'rgba(59,130,246,0.15)' : 'transparent',
              color: timeframe === t ? '#38BDF8' : '#475569',
            }}>{t}</button>
          ))}
          <span style={{ fontSize: 12, color: '#1E3A5F', marginLeft: 12 }}>
            All Dubai · {fmtNum(meta.totalRows || 0)} transactions
          </span>
        </div>

        {/* KPI Cards */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
          <KPICard label="Median Price" value={fmtAED(meta.avgValue || 0)}
            sub={`+${yoyPct}% YoY`} subColor="#22D3EE" trend={1} />
          <KPICard label="Price / sqft" value={fmtAED(latestPpsqm)}
            sub="+14% YoY" subColor="#22D3EE" trend={1} />
          <KPICard label="Transactions"
            value={fmtNum(core?.slices?.all?.count || 0)}
            sub="30 days" subColor="#64748B" />
          <KPICard label="Rental Yield" value="5.9%"
            sub="Gross avg" subColor="#64748B" />
          <KPICard label="Market Score"
            value={`${mScore}/10`}
            sub={mLabel} subColor="#F59E0B" />
        </div>

        {/* Analyse CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <button onClick={() => onNavigate && onNavigate('lookup')} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '12px 22px', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: 'linear-gradient(135deg,#1D4ED8,#38BDF8)',
            color: '#fff', fontSize: 13, fontWeight: 600, fontFamily: 'system-ui',
            boxShadow: '0 4px 20px rgba(59,130,246,0.25)',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            Analyse My Property
          </button>
          <span style={{ fontSize: 12, color: '#1E3A5F' }}>
            ✓ Verified DLD Data · Updated daily
          </span>
        </div>

        {/* Charts row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
          {/* Price trend */}
          <div style={{
            background: '#0D1929', border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 14, padding: '20px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
                  <polyline points="16 7 22 7 22 13"/>
                </svg>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#F1F5F9' }}>12-Month Price Trend</span>
              </div>
              <span style={{ fontSize: 11, color: '#475569' }}>Dubai avg · AED/sqft</span>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={priceTrend} margin={{ top: 8, right: 4, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="pg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.12}/>
                    <stop offset="95%" stopColor="#38BDF8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)"/>
                <XAxis dataKey="year" tick={{ fontSize: 10, fill: '#475569' }} axisLine={false} tickLine={false}/>
                <YAxis hide/>
                <Tooltip
                  formatter={v => [fmtAED(v) + '/sqft', 'Price']}
                  contentStyle={{ background: '#0A1628', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 8, color: '#F1F5F9', fontSize: 11 }}
                  labelStyle={{ color: '#64748B' }}/>
                <Area type="monotone" dataKey="ppsqm" stroke="#38BDF8" strokeWidth={2.5} fill="url(#pg)"/>
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Volume */}
          <div style={{
            background: '#0D1929', border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 14, padding: '20px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2">
                  <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
                </svg>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#F1F5F9' }}>Transaction Volume (30d)</span>
              </div>
              <span style={{ fontSize: 11, color: '#475569' }}>Top areas by activity</span>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={areaVolumes} margin={{ top: 8, right: 4, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#38BDF8"/>
                    <stop offset="100%" stopColor="#1D4ED8"/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)"/>
                <XAxis dataKey="area" tick={{ fontSize: 9, fill: '#475569' }} axisLine={false} tickLine={false}/>
                <YAxis hide/>
                <Tooltip
                  formatter={v => [fmtNum(v), 'Deals']}
                  contentStyle={{ background: '#0A1628', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 8, color: '#F1F5F9', fontSize: 11 }}/>
                <Bar dataKey="count" radius={[4, 4, 0, 0]} fill="url(#bg)"/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Intelligence tools */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#F1F5F9' }}>
              Intelligence tools built for{' '}
              <span style={{ background: 'linear-gradient(135deg,#38BDF8,#1D4ED8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Dubai investors
              </span>
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
            {[
              {
                bg: 'linear-gradient(135deg, #0D2137 0%, #0A3040 100%)',
                border: 'rgba(29,78,216,0.3)',
                icon: '🔍',
                big: 'AI Verdict',
                bigSub: 'in seconds',
                label: 'Deal Analyzer',
                desc: 'Paste any listing — get instant market analysis, verdict & PDF report.',
                badge: 'Free', badgeColor: '#22D3EE',
                page: 'lookup',
              },
              {
                bg: 'linear-gradient(135deg, #1a0d37 0%, #2d1060 100%)',
                border: 'rgba(124,58,237,0.3)',
                icon: '📊',
                big: mScore,
                bigSub: `/ 10 — ${mLabel}`,
                label: 'Market Score',
                desc: 'Proprietary 0-10 score from YoY growth and rental yield data.',
                badge: 'Free', badgeColor: '#A78BFA',
                page: 'markets',
              },
              {
                bg: 'linear-gradient(135deg, #1f1200 0%, #3d2200 100%)',
                border: 'rgba(245,158,11,0.3)',
                icon: '📄',
                big: '8 slides',
                bigSub: 'branded PDF',
                label: 'AI Presentation',
                desc: 'Full branded investor presentation for any property in seconds.',
                badge: 'Pro', badgeColor: '#F59E0B',
                page: 'ai',
              },
              {
                bg: 'linear-gradient(135deg, #071629 0%, #0d2040 100%)',
                border: 'rgba(56,189,248,0.3)',
                icon: '∞',
                big: 'properties',
                bigSub: 'tracked free',
                label: 'Portfolio Intelligence',
                desc: 'Track all Dubai investments. Payment schedules, capital gain, AI reports.',
                badge: 'Free', badgeColor: '#38BDF8',
                page: 'projects',
              },
            ].map((t, i) => (
              <div key={i}
                onClick={() => onNavigate && onNavigate(t.page)}
                style={{
                  background: t.bg,
                  border: `1px solid ${t.border}`,
                  borderRadius: 14, padding: '18px 16px',
                  display: 'flex', flexDirection: 'column', gap: 8,
                  cursor: 'pointer', transition: 'transform 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: 26 }}>{t.icon}</div>
                  <span style={{
                    fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 20,
                    background: `${t.badgeColor}20`, color: t.badgeColor,
                    border: `1px solid ${t.badgeColor}40`,
                  }}>{t.badge}</span>
                </div>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#F1F5F9', lineHeight: 1.1 }}>{t.big}</div>
                <div style={{ fontSize: 11, color: t.badgeColor, fontWeight: 600 }}>{t.bigSub}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#94A3B8' }}>{t.label}</div>
                <div style={{ fontSize: 11, color: '#475569', lineHeight: 1.6, marginTop: 2 }}>{t.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Upgrade bar */}
        <div style={{
          background: '#0D1929', border: '1px solid rgba(59,130,246,0.15)',
          borderRadius: 14, padding: '16px 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg,#1D4ED8,#38BDF8)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0D1929" strokeWidth="2">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#F1F5F9' }}>
                Unlock Portfolio Pro — $29/mo
              </div>
              <div style={{ fontSize: 12, color: '#475569' }}>
                Full market intelligence, Deal Analyzer PDF reports, Dubai Heatmap, and Watchlist.
              </div>
            </div>
          </div>
          <button style={{
            padding: '10px 20px', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: 'linear-gradient(135deg,#1D4ED8,#38BDF8)',
            color: '#fff', fontSize: 13, fontWeight: 600, fontFamily: 'system-ui',
            display: 'flex', alignItems: 'center', gap: 6,
            whiteSpace: 'nowrap',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
            Upgrade Now →
          </button>
        </div>
      </div>
    </div>
  );
}
