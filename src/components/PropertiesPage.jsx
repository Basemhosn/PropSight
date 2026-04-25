import { useState, useMemo } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip,
         ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { fmtAED, fmtNum } from '../utils/format';

const AREA_SHORT = {
  'Al Barsha South Fourth': 'JVC', 'Burj Khalifa': 'Downtown',
  'Marsa Dubai': 'Marina', 'Hadaeq Sheikh Mohammed Bin Rashid': 'Dubai Hills',
  'Al Thanyah Fifth': 'JLT', 'Al Merkadh': 'MBR City',
  'Business Bay': 'Business Bay', 'Al Khairan First': 'Creek Harbour',
};
const short = a => AREA_SHORT[a] || a.split(' ').slice(0,2).join(' ');

function StatCard({ label, value, sub, subColor='#38BDF8', accent }) {
  return (
    <div style={{
      background: '#0D1929', border: `1px solid ${accent || 'rgba(255,255,255,0.06)'}`,
      borderRadius: 12, padding: '18px 20px', flex: 1, minWidth: 0,
    }}>
      <div style={{ fontSize: 11, color: '#64748B', fontWeight: 500, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 700, color: '#F1F5F9', letterSpacing: '-0.5px', marginBottom: 6 }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: subColor, fontWeight: 500 }}>{sub}</div>}
    </div>
  );
}

const COLORS = ['#38BDF8','#22C55E','#F59E0B','#A78BFA','#F87171','#34D399'];

export default function PropertiesPage({ core, areaData, recentRaw }) {
  const [tab, setTab] = useState('all'); // all | offplan | ready

  const areas = areaData ? Object.keys(areaData) : [];
  const allSlice = core?.slices?.all || {};
  const monthly = (core?.slices?.all?.monthly || []).slice(-12);
  const priceTrend = core?.priceTrend || [];

  // Compute stats
  const stats = useMemo(() => {
    if (!areaData) return { offPlan: 0, ready: 0, total: 0, pct: 0 };
    let offPlan = 0, ready = 0;
    Object.values(areaData).forEach(d => {
      offPlan += d.kpis.offPlan || 0;
      ready += d.kpis.ready || 0;
    });
    const total = offPlan + ready;
    return { offPlan, ready, total, pct: total ? Math.round(offPlan / total * 100) : 0 };
  }, [areaData]);

  // Area breakdown
  const areaBreakdown = useMemo(() => {
    if (!areaData) return [];
    return Object.entries(areaData)
      .map(([key, d]) => ({
        name: short(key),
        offPlan: d.kpis.offPlan || 0,
        ready: d.kpis.ready || 0,
        total: (d.kpis.offPlan || 0) + (d.kpis.ready || 0),
        ppsqft: Math.round((d.kpis.ppsqm || 0) / 10.764),
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 8);
  }, [areaData]);

  // Pie data
  const pieData = useMemo(() => {
    const shown = tab === 'all'
      ? [{ name: 'Off-Plan', value: stats.offPlan, color: '#38BDF8' },
         { name: 'Ready', value: stats.ready, color: '#22C55E' }]
      : tab === 'offplan'
        ? [{ name: 'Off-Plan', value: stats.offPlan, color: '#38BDF8' },
           { name: 'Ready', value: stats.ready, color: 'rgba(59,130,246,0.1)' }]
        : [{ name: 'Off-Plan', value: stats.offPlan, color: 'rgba(59,130,246,0.1)' },
           { name: 'Ready', value: stats.ready, color: '#22C55E' }];
    return shown;
  }, [tab, stats]);

  const filteredMonthly = monthly;
  const shownAreas = areaBreakdown;

  const tabStyle = (t) => ({
    padding: '8px 20px', borderRadius: 8, border: 'none', cursor: 'pointer',
    fontSize: 13, fontWeight: tab === t ? 600 : 400, fontFamily: 'system-ui',
    background: tab === t ? 'linear-gradient(135deg,#1D4ED8,#38BDF8)' : 'rgba(59,130,246,0.06)',
    color: tab === t ? '#fff' : '#64748B',
  });

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: '#060E1A', fontFamily: 'system-ui', padding: '24px 28px' }}>

      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#F1F5F9', marginBottom: 4 }}>
          Properties
        </h1>
        <div style={{ fontSize: 13, color: '#475569' }}>
          Off-plan and ready property transactions — Dubai DLD data
        </div>
      </div>

      {/* Tab selector */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, background: '#0D1929', borderRadius: 10, padding: 4, width: 'fit-content' }}>
        <button style={tabStyle('all')} onClick={() => setTab('all')}>All Properties</button>
        <button style={tabStyle('offplan')} onClick={() => setTab('offplan')}>Off-Plan</button>
        <button style={tabStyle('ready')} onClick={() => setTab('ready')}>Ready</button>
      </div>

      {/* KPI cards */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
        <StatCard label="Total Transactions" value={fmtNum(allSlice.count || 0)} sub="All time" subColor="#64748B"/>
        <StatCard label="Off-Plan" value={fmtNum(stats.offPlan)}
          sub={`${stats.pct}% of total`} subColor="#38BDF8" accent="rgba(59,130,246,0.15)"/>
        <StatCard label="Ready" value={fmtNum(stats.ready)}
          sub={`${100 - stats.pct}% of total`} subColor="#22C55E" accent="rgba(34,197,94,0.15)"/>
        <StatCard label="Total Value" value={fmtAED(allSlice.total || 0, true)} sub="AED" subColor="#64748B"/>
        <StatCard label="Avg Deal" value={fmtAED(allSlice.avg || 0, true)} sub="per transaction" subColor="#64748B"/>
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 300px', gap: 14, marginBottom: 24 }}>

        {/* Monthly trend */}
        <div style={{ background: '#0D1929', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#F1F5F9', marginBottom: 4 }}>Monthly Volume</div>
          <div style={{ fontSize: 11, color: '#475569', marginBottom: 16 }}>Transaction count over time</div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={filteredMonthly} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="propGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#38BDF8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)"/>
              <XAxis dataKey="month" tick={{ fontSize: 9, fill: '#475569' }} axisLine={false} tickLine={false}/>
              <YAxis hide/>
              <Tooltip contentStyle={{ background: '#0A1628', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 8, color: '#F1F5F9', fontSize: 11 }}
                formatter={v => [fmtNum(v), 'Transactions']}/>
              <Area type="monotone" dataKey="count" stroke="#38BDF8" strokeWidth={2.5} fill="url(#propGrad)"/>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Area bar chart */}
        <div style={{ background: '#0D1929', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#F1F5F9', marginBottom: 4 }}>Top Areas</div>
          <div style={{ fontSize: 11, color: '#475569', marginBottom: 16 }}>
            {tab === 'all' ? 'Off-plan vs Ready' : tab === 'offplan' ? 'Off-plan deals' : 'Ready deals'}
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={shownAreas} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)"/>
              <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#475569' }} axisLine={false} tickLine={false}/>
              <YAxis hide/>
              <Tooltip contentStyle={{ background: '#0A1628', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 8, color: '#F1F5F9', fontSize: 11 }}/>
              {(tab === 'all' || tab === 'offplan') && (
                <Bar dataKey="offPlan" name="Off-Plan" fill="#38BDF8" radius={[3,3,0,0]} stackId="a"/>
              )}
              {(tab === 'all' || tab === 'ready') && (
                <Bar dataKey="ready" name="Ready" fill="#22C55E" radius={[3,3,0,0]} stackId="a"/>
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Donut */}
        <div style={{ background: '#0D1929', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#F1F5F9', marginBottom: 4 }}>Split</div>
          <div style={{ fontSize: 11, color: '#475569', marginBottom: 8 }}>Off-plan vs Ready</div>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={60}
                dataKey="value" strokeWidth={0}>
                {pieData.map((e, i) => <Cell key={i} fill={e.color}/>)}
              </Pie>
              <Tooltip contentStyle={{ background: '#0A1628', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 8, color: '#F1F5F9', fontSize: 11 }}
                formatter={v => [fmtNum(v), '']}/>
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { label: 'Off-Plan', value: stats.offPlan, pct: stats.pct, color: '#38BDF8' },
              { label: 'Ready', value: stats.ready, pct: 100 - stats.pct, color: '#22C55E' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.color }}/>
                  <span style={{ fontSize: 12, color: '#94A3B8' }}>{item.label}</span>
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: item.color }}>{item.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Area table */}
      <div style={{ background: '#0D1929', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#F1F5F9' }}>Area Breakdown</div>
          <div style={{ fontSize: 12, color: '#475569' }}>Transactions by area and property type</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', padding: '10px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
          {['Area', 'Off-Plan', 'Ready', 'Total', 'Price/sqft'].map((h, i) => (
            <div key={i} style={{ fontSize: 11, color: '#475569', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</div>
          ))}
        </div>
        {areaBreakdown.map((area, i) => (
          <div key={area.name} style={{
            display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
            padding: '14px 20px',
            borderBottom: i < areaBreakdown.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
            background: i % 2 === 0 ? 'transparent' : 'rgba(59,130,246,0.02)',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(59,130,246,0.06)'}
            onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? 'transparent' : 'rgba(59,130,246,0.02)'}
          >
            <div style={{ fontSize: 13, fontWeight: 600, color: '#F1F5F9' }}>{area.name}</div>
            <div style={{ fontSize: 13, color: '#38BDF8', fontWeight: 500 }}>{fmtNum(area.offPlan)}</div>
            <div style={{ fontSize: 13, color: '#22C55E', fontWeight: 500 }}>{fmtNum(area.ready)}</div>
            <div style={{ fontSize: 13, color: '#94A3B8' }}>{fmtNum(area.total)}</div>
            <div style={{ fontSize: 13, color: '#94A3B8' }}>AED {fmtNum(area.ppsqft)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
