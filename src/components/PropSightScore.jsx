import { useState, useMemo } from 'react';
import { calcPropSightScore, scoreAllAreas, getDevTier } from '../utils/propSightScore';
import { fmtNum } from '../utils/format';
import { t } from '../i18n';

// ── Score Ring ─────────────────────────────────────────────────────────────
function ScoreRing({ score, color, size = 80 }) {
  const r = (size - 10) / 2;
  const circ = 2 * Math.PI * r;
  const filled = (score / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none"
        stroke="rgba(255,255,255,0.06)" strokeWidth={6}/>
      <circle cx={size/2} cy={size/2} r={r} fill="none"
        stroke={color} strokeWidth={6}
        strokeDasharray={`${filled} ${circ}`}
        strokeLinecap="round"
        style={{ transition: 'stroke-dasharray 0.8s ease' }}/>
      <text x={size/2} y={size/2} textAnchor="middle"
        dominantBaseline="middle"
        style={{ transform: 'rotate(90deg)', transformOrigin: `${size/2}px ${size/2}px`,
          fill: color, fontSize: size * 0.22, fontWeight: 700, fontFamily: 'system-ui' }}>
        {score}
      </text>
    </svg>
  );
}

// ── Score Bar ──────────────────────────────────────────────────────────────
function ScoreBar({ label, score, weight, color }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{label}</span>
        <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'flex', gap: 8 }}>
          <span style={{ color }}>{score}/100</span>
          <span style={{ opacity: 0.4 }}>×{weight}%</span>
        </span>
      </div>
      <div style={{ height: 5, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${score}%`, background: color,
          borderRadius: 3, transition: 'width 0.6s ease' }}/>
      </div>
    </div>
  );
}

// ── Area Score Card ────────────────────────────────────────────────────────
export function AreaScoreCard({ areaKey, areaData, core, compact = false, onClick }) {
  const score = useMemo(() => {
    if (!areaData || !core) return null;
    const dubaiAvg = core.priceTrend?.slice(-1)[0]?.ppsqm || 15000;
    const maxCount = 5000;
    return calcPropSightScore({
      areaKpis: areaData.kpis || {},
      priceTrend: areaData.priceTrend || [],
      dubaiAvgPpsqm: dubaiAvg,
      maxAreaCount: maxCount,
    });
  }, [areaData, core]);

  if (!score) return null;

  if (compact) {
    return (
      <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 6,
        background: score.bg, border: `1px solid ${score.color}40`,
        borderRadius: 20, padding: '3px 10px', cursor: onClick ? 'pointer' : 'default' }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: score.color }}/>
        <span style={{ fontSize: 11, fontWeight: 700, color: score.color }}>{score.total}</span>
        <span style={{ fontSize: 10, color: score.color, opacity: 0.8 }}>{score.verdict}</span>
      </div>
    );
  }

  return (
    <div onClick={onClick} style={{ background: 'var(--surface)',
      border: `1px solid ${score.color}30`, borderRadius: 14, padding: 20,
      cursor: onClick ? 'pointer' : 'default' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
        <ScoreRing score={score.total} color={score.color} size={72}/>
        <div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2,
            textTransform: 'uppercase', letterSpacing: '0.06em' }}>PropSight Score</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: score.color }}>{score.verdict}</div>
          <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>{areaKey}</div>
        </div>
      </div>
      {Object.entries(score.breakdown).map(([key, b]) => (
        <ScoreBar key={key} label={b.label} score={b.score}
          weight={b.weight} color={score.color}/>
      ))}
    </div>
  );
}

// ── Main PropSight Score Page ──────────────────────────────────────────────
const AREA_NICE = {
  'Al Barsha South Fourth':'JVC','Burj Khalifa':'Downtown Dubai','Marsa Dubai':'Dubai Marina',
  'Hadaeq Sheikh Mohammed Bin Rashid':'Dubai Hills','Al Thanyah Fifth':'JLT',
  'Business Bay':'Business Bay','Palm Jumeirah':'Palm Jumeirah','Al Merkadh':'MBR City',
  'Al Khairan First':'Creek Harbour','Al Hebiah Fourth':'Damac Hills',
};
const na = a => AREA_NICE[a] || a;

export default function PropSightScorePage({ areaData, core }) {
  const lang = localStorage.getItem('lang') || 'en';
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('score');

  const dubaiAvg = core?.priceTrend?.slice(-1)[0]?.ppsqm || 15000;
  const maxCount = useMemo(() => areaData
    ? Math.max(...Object.values(areaData).map(d => d.kpis?.count || 0))
    : 5000, [areaData]);

  const scored = useMemo(() => {
    if (!areaData || !core) return [];
    return Object.entries(areaData).map(([key, data]) => ({
      key,
      label: na(key),
      score: calcPropSightScore({
        areaKpis: data.kpis || {},
        priceTrend: data.priceTrend || [],
        dubaiAvgPpsqm: dubaiAvg,
        maxAreaCount: maxCount,
      }),
      kpis: data.kpis || {},
      priceTrend: data.priceTrend || [],
    }));
  }, [areaData, core, dubaiAvg, maxCount]);

  const filtered = useMemo(() => {
    let list = scored;
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(a => a.label.toLowerCase().includes(q) || a.key.toLowerCase().includes(q));
    }
    if (sortBy === 'score')  list = [...list].sort((a,b) => b.score.total - a.score.total);
    if (sortBy === 'yield')  list = [...list].sort((a,b) => (b.score.inputs.yieldPct||0) - (a.score.inputs.yieldPct||0));
    if (sortBy === 'growth') list = [...list].sort((a,b) => (b.score.inputs.yoy||0) - (a.score.inputs.yoy||0));
    return list;
  }, [scored, search, sortBy]);

  const selectedData = selected ? areaData?.[selected.key] : null;
  const selectedScore = selected?.score;

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: 'var(--bg)',
      fontFamily: 'system-ui', padding: '24px 28px' }}>

      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: 'var(--text-primary)' }}>
            PropSight Score
          </h1>
          <div style={{ background: 'linear-gradient(135deg,#1D4ED8,#38BDF8)',
            borderRadius: 20, padding: '3px 12px' }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#fff' }}>BETA</span>
          </div>
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
          AI-powered investment score for every Dubai area — based on yield, appreciation, developer, liquidity & risk
        </div>
      </div>

      {/* Score legend */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {[['80–100','Strong Buy','#22C55E'],['65–79','Buy','#38BDF8'],
          ['50–64','Hold','#F59E0B'],['<50','Avoid','#F87171']].map(([range,label,color])=>(
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6,
            background: `${color}10`, border: `1px solid ${color}30`,
            borderRadius: 20, padding: '4px 12px' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: color }}/>
            <span style={{ fontSize: 11, fontWeight: 600, color }}>{label}</span>
            <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{range}</span>
          </div>
        ))}
      </div>

      {/* Search + Sort */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, alignItems: 'center' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8,
          background: 'var(--surface)', border: '1px solid rgba(59,130,246,0.15)',
          borderRadius: 10, padding: '9px 14px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="#475569" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search any area..."
            style={{ background: 'none', border: 'none', outline: 'none',
              color: 'var(--text-secondary)', fontSize: 13, flex: 1, fontFamily: 'system-ui' }}/>
        </div>
        <div style={{ display: 'flex', gap: 4, background: 'var(--surface)',
          border: '1px solid rgba(59,130,246,0.1)', borderRadius: 10, padding: 4 }}>
          {[['score','Score'],['yield','Yield'],['growth','Growth']].map(([k,l])=>(
            <button key={k} onClick={() => setSortBy(k)} style={{
              padding: '6px 14px', borderRadius: 8, border: 'none', cursor: 'pointer',
              fontSize: 12, fontFamily: 'system-ui', fontWeight: sortBy===k ? 600 : 400,
              background: sortBy===k ? 'linear-gradient(135deg,#1D4ED8,#38BDF8)' : 'transparent',
              color: sortBy===k ? '#fff' : 'var(--text-muted)' }}>{l}</button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 360px' : '1fr', gap: 16 }}>

        {/* Area grid */}
        <div style={{ display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 12 }}>
          {filtered.map(area => {
            const s = area.score;
            const isSelected = selected?.key === area.key;
            return (
              <div key={area.key}
                onClick={() => setSelected(isSelected ? null : area)}
                style={{ background: 'var(--surface)',
                  border: `1px solid ${isSelected ? s.color : s.color+'20'}`,
                  borderRadius: 14, padding: '16px 18px', cursor: 'pointer',
                  transition: 'all 0.15s',
                  boxShadow: isSelected ? `0 4px 20px ${s.color}20` : 'none' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>

                <div style={{ display: 'flex', justifyContent: 'space-between',
                  alignItems: 'flex-start', marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600,
                      color: 'var(--text-primary)', marginBottom: 2 }}>{area.label}</div>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>
                      {fmtNum(area.kpis.count || 0)} transactions
                    </div>
                  </div>
                  <ScoreRing score={s.total} color={s.color} size={52}/>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 6,
                  background: s.bg, border: `1px solid ${s.color}40`,
                  borderRadius: 20, padding: '4px 10px', display: 'inline-flex' }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%',
                    background: s.color }}/>
                  <span style={{ fontSize: 11, fontWeight: 700, color: s.color }}>
                    {s.verdict}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr',
                  gap: 6, marginTop: 12 }}>
                  {[
                    ['Yield', `${s.inputs.yieldPct?.toFixed(1)}%`],
                    ['YoY', `${s.inputs.yoy > 0 ? '+' : ''}${s.inputs.yoy?.toFixed(1)}%`],
                  ].map(([k,v]) => (
                    <div key={k} style={{ background: 'rgba(59,130,246,0.04)',
                      borderRadius: 6, padding: '5px 8px' }}>
                      <div style={{ fontSize: 9, color: 'var(--text-muted)',
                        textTransform: 'uppercase', letterSpacing: '0.05em' }}>{k}</div>
                      <div style={{ fontSize: 12, fontWeight: 600,
                        color: 'var(--text-primary)' }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Detail panel */}
        {selected && selectedScore && (
          <div style={{ position: 'sticky', top: 0 }}>
            <div style={{ background: 'var(--surface)',
              border: `1px solid ${selectedScore.color}30`,
              borderRadius: 16, padding: 24 }}>

              <div style={{ display: 'flex', justifyContent: 'space-between',
                alignItems: 'flex-start', marginBottom: 20 }}>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2,
                    textTransform: 'uppercase', letterSpacing: '0.06em' }}>PropSight Score</div>
                  <div style={{ fontSize: 16, fontWeight: 700,
                    color: 'var(--text-primary)' }}>{selected.label}</div>
                </div>
                <button onClick={() => setSelected(null)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer',
                    color: 'var(--text-muted)', fontSize: 18, padding: '0 4px' }}>×</button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center',
                gap: 16, marginBottom: 24 }}>
                <ScoreRing score={selectedScore.total} color={selectedScore.color} size={88}/>
                <div>
                  <div style={{ fontSize: 28, fontWeight: 800,
                    color: selectedScore.color }}>{selectedScore.verdict}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
                    Score: {selectedScore.total}/100
                  </div>
                </div>
              </div>

              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)',
                textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
                Score Breakdown
              </div>
              {Object.entries(selectedScore.breakdown).map(([key, b]) => (
                <ScoreBar key={key} label={b.label} score={b.score}
                  weight={b.weight} color={selectedScore.color}/>
              ))}

              <div style={{ marginTop: 20, padding: 14,
                background: 'rgba(59,130,246,0.04)',
                border: '1px solid rgba(59,130,246,0.1)', borderRadius: 10 }}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)',
                  marginBottom: 8, fontWeight: 600,
                  textTransform: 'uppercase', letterSpacing: '0.05em' }}>Key Metrics</div>
                {[
                  ['Rental Yield', `${selectedScore.inputs.yieldPct?.toFixed(1)}%`],
                  ['YoY Growth', `${selectedScore.inputs.yoy > 0 ? '+' : ''}${selectedScore.inputs.yoy?.toFixed(1)}%`],
                  ['Off-Plan Share', `${selectedScore.inputs.offPlanPct}%`],
                  ['Transactions', fmtNum(selected.kpis.count || 0)],
                ].map(([k,v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between',
                    padding: '5px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{k}</span>
                    <span style={{ fontSize: 12, fontWeight: 600,
                      color: 'var(--text-primary)' }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
