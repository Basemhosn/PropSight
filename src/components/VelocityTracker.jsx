import { useState, useMemo } from "react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, ReferenceLine
} from "recharts";
import { fmtNum } from "../utils/format";

const WINDOW_OPTIONS = [
  { label: "7-day", days: 7 },
  { label: "14-day", days: 14 },
  { label: "30-day", days: 30 },
];

const AREA_COLORS = [
  "#38BDF8", "#22C55E", "#D85A30", "#BA7517",
  "#993556", "#534AB7", "#3b6d11", "#0f6e56",
];

function rollingAvg(dailyMap, days) {
  const sorted = Object.keys(dailyMap).sort();
  return sorted.map((dateStr, i) => {
    const windowDates = sorted.slice(Math.max(0, i - days + 1), i + 1);
    const sum = windowDates.reduce((s, d) => s + (dailyMap[d] || 0), 0);
    const avg = sum / days;
    return { date: dateStr, raw: dailyMap[dateStr] || 0, rolling: Math.round(avg * 10) / 10 };
  });
}

function formatDateLabel(d) {
  const dt = new Date(d + "T00:00:00");
  return dt.toLocaleDateString("en-AE", { day: "numeric", month: "short" });
}

const CustomTooltip = ({ active, payload, label, selectedAreas }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "var(--text-primary)", color: "var(--surface)", borderRadius: 8,
      padding: "10px 14px", fontSize: 12, minWidth: 180 }}>
      <div style={{ fontWeight: 600, marginBottom: 6 }}>{formatDateLabel(label)}</div>
      {payload.map(p => (
        <div key={p.dataKey} style={{ color: p.color, marginBottom: 2 }}>
          {p.name}: <span style={{ color: "var(--surface)", fontWeight: 600 }}>{fmtNum(p.value)} deals/day</span>
        </div>
      ))}
    </div>
  );
};

export default function VelocityTracker({ rows, areas }) {
  const [window, setWindow] = useState(14);
  const [selectedAreas, setSelectedAreas] = useState(["ALL"]);
  const [view, setView] = useState("overall"); // overall | byarea

  const TOP_AREAS = areas.slice(0, 8).map(a => a.area);

  // Build daily counts
  const { overallDaily, areaDaily } = useMemo(() => {
    const overall = {};
    const byArea = {};
    rows.forEach(r => {
      if (!r.dateObj) return;
      const d = r.dateObj.toISOString().slice(0, 10);
      overall[d] = (overall[d] || 0) + 1;
      const area = r.area;
      if (!byArea[area]) byArea[area] = {};
      byArea[area][d] = (byArea[area][d] || 0) + 1;
    });
    return { overallDaily: overall, areaDaily: byArea };
  }, [rows]);

  // Overall rolling average
  const overallData = useMemo(() => rollingAvg(overallDaily, window), [overallDaily, window]);

  // Per-area rolling average — merge into single dataset keyed by date
  const areaChartData = useMemo(() => {
    const allDates = [...new Set(Object.values(areaDaily).flatMap(d => Object.keys(d)))].sort();
    return allDates.map(date => {
      const point = { date };
      TOP_AREAS.forEach(area => {
        const daily = areaDaily[area] || {};
        const windowDates = allDates.slice(
          Math.max(0, allDates.indexOf(date) - window + 1),
          allDates.indexOf(date) + 1
        );
        const sum = windowDates.reduce((s, d) => s + (daily[d] || 0), 0);
        point[area] = Math.round((sum / window) * 10) / 10;
      });
      return point;
    });
  }, [areaDaily, window, TOP_AREAS]);

  // Momentum: compare last 7 days avg vs previous 7 days
  const momentum = useMemo(() => {
    const sorted = Object.keys(overallDaily).sort();
    if (sorted.length < 14) return null;
    const recent = sorted.slice(-7).reduce((s, d) => s + overallDaily[d], 0) / 7;
    const prev = sorted.slice(-14, -7).reduce((s, d) => s + overallDaily[d], 0) / 7;
    const pct = prev > 0 ? ((recent - prev) / prev) * 100 : 0;
    return { recent: Math.round(recent), prev: Math.round(prev), pct: pct.toFixed(1) };
  }, [overallDaily]);

  // Peak day
  const peakDay = useMemo(() => {
    const entries = Object.entries(overallDaily);
    if (!entries.length) return null;
    const [date, count] = entries.sort((a, b) => b[1] - a[1])[0];
    return { date: formatDateLabel(date), count };
  }, [overallDaily]);

  const toggleArea = (area) => {
    setSelectedAreas(prev =>
      prev.includes(area)
        ? prev.filter(a => a !== area)
        : [...prev, area]
    );
  };

  return (
    <div style={{ background: "var(--surface)", border: "1px solid #E8ECF2", borderRadius: 12, padding: "1.25rem" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between",
        marginBottom: "1rem", flexWrap: "wrap", gap: 8 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>Transaction velocity</div>
          <div style={{ fontSize: 11, color: "#9AA0AE", marginTop: 2 }}>
            Rolling average deals per day — shows market momentum
          </div>
        </div>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {[{ k: "overall", l: "Overall" }, { k: "byarea", l: "By area" }].map(tabId => (
            <button key={t.k} onClick={() => setView(t.k)} style={{
              fontSize: 11, padding: "4px 10px", borderRadius: 6, cursor: "pointer", fontWeight: 500,
              border: view === t.k ? "1px solid #0A1628" : "1px solid #E8ECF2",
              background: view === t.k ? "var(--text-primary)" : "var(--surface)",
              color: view === t.k ? "var(--surface)" : "#7A8499",
            }}>{t.l}</button>
          ))}
          <div style={{ width: 1, background: "rgba(59,130,246,0.12)", margin: "0 2px" }} />
          {WINDOW_OPTIONS.map(({ label, days }) => (
            <button key={days} onClick={() => setWindow(days)} style={{
              fontSize: 11, padding: "4px 10px", borderRadius: 6, cursor: "pointer", fontWeight: 500,
              border: window === days ? "1px solid #185FA5" : "1px solid #E8ECF2",
              background: window === days ? "rgba(59,130,246,0.1)" : "var(--surface)",
              color: window === days ? "#38BDF8" : "#7A8499",
            }}>{label}</button>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 8, marginBottom: "1rem" }}>
        {momentum && (
          <>
            <div style={{ background: "var(--bg)", borderRadius: 8, padding: "0.75rem" }}>
              <div style={{ fontSize: 10, color: "#9AA0AE", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>Last 7 days avg</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)" }}>{fmtNum(momentum.recent)}</div>
              <div style={{ fontSize: 10, color: "#9AA0AE" }}>deals / day</div>
            </div>
            <div style={{ background: "var(--bg)", borderRadius: 8, padding: "0.75rem" }}>
              <div style={{ fontSize: 10, color: "#9AA0AE", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>Momentum</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: parseFloat(momentum.pct) >= 0 ? "#22C55E" : "#E24B4A" }}>
                {parseFloat(momentum.pct) >= 0 ? "▲" : "▼"} {Math.abs(momentum.pct)}%
              </div>
              <div style={{ fontSize: 10, color: "#9AA0AE" }}>vs prev 7 days</div>
            </div>
          </>
        )}
        {peakDay && (
          <div style={{ background: "var(--bg)", borderRadius: 8, padding: "0.75rem" }}>
            <div style={{ fontSize: 10, color: "#9AA0AE", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>Peak day</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>{fmtNum(peakDay.count)}</div>
            <div style={{ fontSize: 10, color: "#9AA0AE" }}>{peakDay.date}</div>
          </div>
        )}
      </div>

      {/* Area selector for by-area view */}
      {view === "byarea" && (
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: "0.875rem", overflowX: "auto" }}>
          {TOP_AREAS.map((area, i) => (
            <button key={area} onClick={() => toggleArea(area)} style={{
              fontSize: 10, padding: "3px 8px", borderRadius: 20, cursor: "pointer",
              fontWeight: selectedAreas.includes(area) ? 600 : 400,
              border: selectedAreas.includes(area) ? `1px solid ${AREA_COLORS[i % AREA_COLORS.length]}` : "1px solid #E8ECF2",
              background: selectedAreas.includes(area) ? AREA_COLORS[i % AREA_COLORS.length] + "18" : "var(--surface)",
              color: selectedAreas.includes(area) ? AREA_COLORS[i % AREA_COLORS.length] : "#7A8499",
              whiteSpace: "nowrap",
            }}>
              {area.length > 20 ? area.slice(0, 18) + "…" : area}
            </button>
          ))}
        </div>
      )}

      {/* Chart */}
      {view === "overall" ? (
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={overallData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="velGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#38BDF8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(59,130,246,0.08)" />
            <XAxis dataKey="date" tick={{ fontSize: 9, fill: "#9AA0AE" }}
              tickFormatter={formatDateLabel} axisLine={false} tickLine={false}
              interval={Math.floor(overallData.length / 8)} />
            <YAxis tick={{ fontSize: 10, fill: "#9AA0AE" }} axisLine={false}
              tickLine={false} tickFormatter={fmtNum} width={40} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="rolling" stroke="#38BDF8" strokeWidth={2}
              fill="url(#velGrad)" dot={false} name={`${window}-day avg`} />
            <Area type="monotone" dataKey="raw" stroke="#C5CAD6" strokeWidth={1}
              fill="none" dot={false} name="Daily" strokeDasharray="3 3" />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={areaChartData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(59,130,246,0.08)" />
            <XAxis dataKey="date" tick={{ fontSize: 9, fill: "#9AA0AE" }}
              tickFormatter={formatDateLabel} axisLine={false} tickLine={false}
              interval={Math.floor(areaChartData.length / 8)} />
            <YAxis tick={{ fontSize: 10, fill: "#9AA0AE" }} axisLine={false}
              tickLine={false} tickFormatter={fmtNum} width={40} />
            <Tooltip content={<CustomTooltip selectedAreas={selectedAreas} />} />
            {TOP_AREAS.filter(a => selectedAreas.includes(a)).map((area, i) => (
              <Area key={area} type="monotone" dataKey={area}
                stroke={AREA_COLORS[TOP_AREAS.indexOf(area) % AREA_COLORS.length]}
                strokeWidth={1.5} fill="none" dot={false}
                name={area.length > 18 ? area.slice(0, 16) + "…" : area} />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      )}

      <div style={{ display: "flex", gap: 16, marginTop: "0.5rem", fontSize: 10, color: "#9AA0AE" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ width: 16, height: 2, background: "#38BDF8", display: "inline-block" }} />
          {window}-day rolling avg
        </span>
        {view === "overall" && (
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ width: 16, height: 2, background: "#C5CAD6", display: "inline-block",
              borderTop: "2px dashed #C5CAD6" }} />
            Daily count
          </span>
        )}
      </div>
    </div>
  );
}
