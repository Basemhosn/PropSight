import { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip,
         ResponsiveContainer, CartesianGrid, AreaChart, Area } from 'recharts';
import { fmtAED, fmtNum } from '../utils/format';

function Change({ value, suffix = '%', invert = false }) {
  const positive = invert ? value < 0 : value > 0;
  const color    = value === 0 ? '#9AA0AE' : positive ? '#1D9E75' : '#D85A30';
  const arrow    = value === 0 ? '→' : positive ? '▲' : '▼';
  return (
    <span style={{ color, fontSize:11, fontWeight:600 }}>
      {arrow} {Math.abs(value).toFixed(1)}{suffix}
    </span>
  );
}

function StatCard({ label, value, sub, change, color = '#0A1628', bg = '#F8FAFC', large = false }) {
  return (
    <div style={{ background: bg, borderRadius: 12, padding: large ? '1.25rem' : '0.875rem',
      border: '1px solid #E8ECF2', display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ fontSize: 11, color: '#9AA0AE' }}>{label}</div>
      <div style={{ fontSize: large ? 24 : 18, fontWeight: 700, color, lineHeight: 1.2 }}>{value}</div>
      {sub    && <div style={{ fontSize: 11, color: '#9AA0AE' }}>{sub}</div>}
      {change !== undefined && <Change value={change} />}
    </div>
  );
}

export default function MarketPulse({ onAreaClick, onProjectClick, projectsData }) {
  const [pulse, setPulse] = useState(null);

  useEffect(() => {
    fetch('/data/pulse.json').then(r => r.json()).then(setPulse);
  }, []);

  if (!pulse) return (
    <div style={{ padding: '3rem', textAlign: 'center', color: '#9AA0AE' }}>
      <div style={{ width: 32, height: 32, border: '3px solid #E8ECF2', borderTopColor: '#185FA5',
        borderRadius: '50%', animation: 'spin 0.7s linear infinite', margin: '0 auto 1rem' }}/>
      Loading market pulse…
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  const { thisWeek, lastWeek, changes, biggestDeal, hottestArea, hottestCount, topAreas, topDeals, monthly, weekRange } = pulse;
  const offPlanPct = thisWeek.offPlanPct;
  const readyPct   = 100 - offPlanPct;

  return (
    <div style={{ padding: '1.5rem', maxWidth: 1200, margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
        marginBottom: '1.5rem', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#1D9E75',
              boxShadow: '0 0 0 3px rgba(29,158,117,0.2)', animation: 'pulse 2s infinite' }}/>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#0A1628' }}>Market Pulse</div>
          </div>
          <div style={{ fontSize: 12, color: '#9AA0AE' }}>
            Week of {weekRange} · Dubai real estate market snapshot
          </div>
        </div>
        <div style={{ fontSize: 11, color: '#9AA0AE', textAlign: 'right' }}>
          Data from DLD Official Open Data<br/>Updated {pulse.generatedAt}
        </div>
      </div>
      <style>{`@keyframes pulse{0%,100%{box-shadow:0 0 0 3px rgba(29,158,117,0.2)}50%{box-shadow:0 0 0 6px rgba(29,158,117,0.1)}}`}</style>

      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        <StatCard label="Deals this week"   value={fmtNum(thisWeek.count)}
          change={changes.countChange} color="#F1F5F9" large />
        <StatCard label="Total value"        value={fmtAED(thisWeek.total, true)}
          change={changes.valueChange} color="#38BDF8" large />
        <StatCard label="Avg price / m²"     value={fmtAED(thisWeek.avgPpsqm, true)}
          change={changes.ppsqmChange} color="#22C55E" large />
        <StatCard label="Off-plan share"     value={`${offPlanPct}%`}
          sub={`${readyPct}% ready`} color="#BA7517" large />
      </div>

      {/* Main grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>

        {/* Monthly trend */}
        <div style={{ background: '#fff', border: '1px solid #E8ECF2', borderRadius: 12, padding: '1.25rem' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#0A1628', marginBottom: '1rem' }}>
            Monthly transaction volume (last 12 months)
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={monthly} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#38BDF8" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#38BDF8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(59,130,246,0.08)"/>
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#9AA0AE' }} axisLine={false} tickLine={false}
                tickFormatter={m => { const [y,mo] = m.split('-'); return ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][+mo-1]+' '+y.slice(2); }}/>
              <YAxis hide/>
              <Tooltip
                formatter={(v, n) => [n === 'count' ? fmtNum(v) : fmtAED(v, true), n === 'count' ? 'Deals' : 'Value']}
                contentStyle={{ background: '#0A1628', border: 'none', borderRadius: 8, color: '#fff', fontSize: 11 }}
                labelStyle={{ color: '#9AA0AE' }}/>
              <Area type="monotone" dataKey="count" stroke="#38BDF8" fill="url(#areaGrad)" strokeWidth={2.5}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Hottest areas */}
        <div style={{ background: '#fff', border: '1px solid #E8ECF2', borderRadius: 12, padding: '1.25rem' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#0A1628', marginBottom: '1rem' }}>
            🔥 Hottest areas this week
          </div>
          {topAreas.map((a, i) => {
            const maxCount = topAreas[0].count;
            const pct = Math.max(4, (a.count / maxCount) * 100);
            return (
              <div key={a.area} onClick={() => onAreaClick && onAreaClick(a.area)}
                style={{ marginBottom: 12, cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: i === 0 ? '#D85A30' : '#0A1628' }}>
                      {i === 0 ? '🏆' : `${i + 1}.`} {a.area}
                    </span>
                  </div>
                  <span style={{ fontSize: 11, color: '#9AA0AE' }}>{a.count} deals</span>
                </div>
                <div style={{ height: 6, background: '#F4F6FA', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', borderRadius: 3, transition: 'width 0.5s',
                    background: i === 0 ? '#D85A30' : '#185FA5' }}/>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>

        {/* Biggest deal */}
        <div style={{ background: 'linear-gradient(135deg,#0A1628 0%,#185FA5 100%)',
          borderRadius: 12, padding: '1.25rem', color: '#fff' }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>
            💎 BIGGEST DEAL THIS WEEK
          </div>
          <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 6 }}>
            {fmtAED(biggestDeal.amount)}
          </div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', marginBottom: 4 }}>
            {biggestDeal.project || biggestDeal.area}
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: '1rem' }}>
            {biggestDeal.area} · {biggestDeal.date}
            {biggestDeal.size > 0 && ` · ${fmtNum(biggestDeal.size)}m²`}
          </div>
          {biggestDeal.size > 0 && (
            <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 8, padding: '8px 12px',
              display: 'inline-block', fontSize: 12, fontWeight: 600 }}>
              {fmtAED(Math.round(biggestDeal.amount / biggestDeal.size))}/m²
            </div>
          )}
        </div>

        {/* Top deals table */}
        <div style={{ background: '#fff', border: '1px solid #E8ECF2', borderRadius: 12, padding: '1.25rem' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#0A1628', marginBottom: '1rem' }}>
            Top 5 deals this week
          </div>
          {topDeals.map((deal, i) => (
            <div key={i} onClick={() => {
                const proj = projectsData?.[deal.project];
                if (proj && onProjectClick) onProjectClick(deal.project, proj);
              }}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '8px 0', borderBottom: '1px solid #F4F6FA',
                cursor: deal.project && projectsData?.[deal.project] ? 'pointer' : 'default' }}
              onMouseEnter={e => { if (deal.project) e.currentTarget.style.background = '#F8FAFC'; }}
              onMouseLeave={e => e.currentTarget.style.background = '#fff'}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#185FA5' }}>
                  {fmtAED(deal.amount)}
                </div>
                <div style={{ fontSize: 10, color: '#9AA0AE' }}>
                  {deal.project || deal.area} · {deal.date}
                  {deal.rooms && ` · ${deal.rooms}`}
                </div>
              </div>
              <div style={{ textAlign: 'right', fontSize: 11, color: '#9AA0AE' }}>
                {deal.size > 0 && <div>{fmtNum(deal.size)}m²</div>}
                {deal.size > 0 && <div style={{ color: '#1D9E75', fontWeight: 600 }}>
                  {fmtAED(Math.round(deal.amount / deal.size))}/m²
                </div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* YoY comparison */}
      <div style={{ marginTop: '1.25rem', background: '#F8FAFC', border: '1px solid #E8ECF2',
        borderRadius: 12, padding: '1rem', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        <div style={{ fontSize: 12, color: '#7A8499', fontWeight: 600 }}>Year-on-year (same month):</div>
        <div style={{ fontSize: 12, color: '#0A1628' }}>
          Transactions: <Change value={changes.yoyCountChange} />
        </div>
        <div style={{ fontSize: 12, color: '#0A1628' }}>
          Total value: <Change value={changes.yoyValueChange} />
        </div>
        <div style={{ fontSize: 11, color: '#9AA0AE', marginLeft: 'auto' }}>
          Source: Dubai Land Department · DDA Open Data
        </div>
      </div>
    </div>
  );
}
