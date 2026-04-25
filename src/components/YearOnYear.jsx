import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  ResponsiveContainer, CartesianGrid
} from "recharts";
import { fmtAED, fmtNum } from "../utils/format";

const CustomTooltip = ({ active, payload, label, metric }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#F1F5F9", color: "#0D1929", borderRadius: 8, padding: "10px 14px", fontSize: 12, minWidth: 200 }}>
      <div style={{ fontWeight: 600, marginBottom: 6 }}>{label}</div>
      {payload.map(p => {
        const val = metric === "count"
          ? fmtNum(p.value) + " transactions"
          : fmtAED(p.value, true);
        const change = payload.length === 2 && payload[0].value && payload[1].value
          ? (((payload[1].value - payload[0].value) / payload[0].value) * 100).toFixed(1)
          : null;
        return (
          <div key={p.name} style={{ color: p.color, marginBottom: 3 }}>
            {p.name}: <span style={{ color: "#0D1929", fontWeight: 600 }}>{val}</span>
          </div>
        );
      })}
      {payload.length === 2 && payload[0].value > 0 && payload[1].value > 0 && (() => {
        const pct = (((payload[1].value - payload[0].value) / payload[0].value) * 100).toFixed(1);
        const up = parseFloat(pct) >= 0;
        return (
          <div style={{ marginTop: 6, paddingTop: 6, borderTop: "1px solid #1A2A40",
            color: up ? "#4ADE80" : "#F87171", fontWeight: 600, fontSize: 11 }}>
            {up ? "▲" : "▼"} {Math.abs(pct)}% year-on-year
          </div>
        );
      })()}
    </div>
  );
};

export default function YearOnYear({ rows }) {
  const [metric, setMetric] = useState("count");
  const [view, setView] = useState("monthly"); // monthly | area

  // Get available years from data
  const years = [...new Set(
    rows.filter(r => r.dateObj).map(r => r.dateObj.getFullYear())
  )].sort();

  const currentYear = years[years.length - 1];
  const prevYear = years[years.length - 2];

  // Monthly comparison
  const monthlyData = (() => {
    const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return MONTHS.map((month, i) => {
      const prev = rows.filter(r => r.dateObj && r.dateObj.getFullYear() === prevYear && r.dateObj.getMonth() === i);
      const curr = rows.filter(r => r.dateObj && r.dateObj.getFullYear() === currentYear && r.dateObj.getMonth() === i);
      const prevVal = metric === "count" ? prev.length : prev.reduce((s, r) => s + r.amount, 0);
      const currVal = metric === "count" ? curr.length : curr.reduce((s, r) => s + r.amount, 0);
      return { month, [prevYear]: prevVal, [currentYear]: currVal };
    }).filter(d => d[prevYear] > 0 || d[currentYear] > 0);
  })();

  // Area comparison — top 12 areas by combined volume
  const areaData = (() => {
    const areaMap = {};
    rows.filter(r => r.dateObj && (r.dateObj.getFullYear() === prevYear || r.dateObj.getFullYear() === currentYear))
      .forEach(r => {
        if (!areaMap[r.area]) areaMap[r.area] = { area: r.area, [prevYear]: 0, [currentYear]: 0, prevCount: 0, currCount: 0 };
        if (r.dateObj.getFullYear() === prevYear) {
          areaMap[r.area][prevYear] += metric === "count" ? 1 : r.amount;
          areaMap[r.area].prevCount++;
        } else {
          areaMap[r.area][currentYear] += metric === "count" ? 1 : r.amount;
          areaMap[r.area].currCount++;
        }
      });

    return Object.values(areaMap)
      .filter(a => a[prevYear] > 0 && a[currentYear] > 0)
      .sort((a, b) => (b[currentYear] + b[prevYear]) - (a[currentYear] + a[prevYear]))
      .slice(0, 12)
      .map(a => ({
        ...a,
        change: a[prevYear] > 0 ? (((a[currentYear] - a[prevYear]) / a[prevYear]) * 100).toFixed(1) : null,
      }));
  })();

  const fmtTick = v => metric === "count" ? fmtNum(v) : fmtAED(v, true);

  if (years.length < 2) {
    return (
      <div style={{ background: "#0D1929", border: "1px solid #E8ECF2", borderRadius: 12, padding: "1.25rem" }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#F1F5F9", marginBottom: "0.5rem" }}>Year-on-year comparison</div>
        <div style={{ fontSize: 13, color: "#9AA0AE", padding: "2rem", textAlign: "center" }}>
          Year-on-year requires data spanning at least 2 years.<br />
          Your current CSV covers: {years.join(", ")}
        </div>
      </div>
    );
  }

  const chartData = view === "monthly" ? monthlyData : areaData;
  const xKey = view === "monthly" ? "month" : "area";
  const chartHeight = view === "monthly" ? 280 : 360;

  return (
    <div style={{ background: "#0D1929", border: "1px solid #E8ECF2", borderRadius: 12, padding: "1.25rem" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between",
        marginBottom: "1rem", flexWrap: "wrap", gap: 8 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#F1F5F9" }}>
            Year-on-year comparison
          </div>
          <div style={{ fontSize: 11, color: "#9AA0AE", marginTop: 2 }}>
            {prevYear} vs {currentYear}
          </div>
        </div>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {[{ key: "monthly", label: "By month" }, { key: "area", label: "By area" }].map(t => (
            <button key={t.key} onClick={() => setView(t.key)} style={{
              fontSize: 11, padding: "4px 10px", borderRadius: 6, cursor: "pointer", fontWeight: 500,
              border: view === t.key ? "1px solid #185FA5" : "1px solid #E8ECF2",
              background: view === t.key ? "rgba(59,130,246,0.1)" : "#0D1929",
              color: view === t.key ? "#38BDF8" : "#7A8499",
            }}>{t.label}</button>
          ))}
          <div style={{ width: 1, background: "rgba(59,130,246,0.12)", margin: "0 2px" }} />
          {[{ key: "count", label: "Count" }, { key: "value", label: "Value" }].map(t => (
            <button key={t.key} onClick={() => setMetric(t.key)} style={{
              fontSize: 11, padding: "4px 10px", borderRadius: 6, cursor: "pointer", fontWeight: 500,
              border: metric === t.key ? "1px solid #1D9E75" : "1px solid #E8ECF2",
              background: metric === t.key ? "rgba(34,197,94,0.1)" : "#0D1929",
              color: metric === t.key ? "#22C55E" : "#7A8499",
            }}>{t.label}</button>
          ))}
        </div>
      </div>

      {/* Summary pills — area view */}
      {view === "area" && areaData.length > 0 && (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: "1rem" }}>
          {areaData.slice(0, 6).map(a => {
            const up = parseFloat(a.change) >= 0;
            return (
              <div key={a.area} style={{
                background: up ? "rgba(34,197,94,0.1)" : "#FCEBEB",
                borderRadius: 6, padding: "3px 10px", fontSize: 11,
              }}>
                <span style={{ color: "#F1F5F9", fontWeight: 500 }}>{a.area}</span>
                {" "}
                <span style={{ color: up ? "#22C55E" : "#A32D2D", fontWeight: 600 }}>
                  {up ? "▲" : "▼"}{Math.abs(a.change)}%
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Chart */}
      {view === "monthly" ? (
        <ResponsiveContainer width="100%" height={chartHeight}>
          <BarChart data={chartData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(59,130,246,0.08)" />
            <XAxis dataKey={xKey} tick={{ fontSize: 11, fill: "#9AA0AE" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: "#9AA0AE" }} axisLine={false} tickLine={false} tickFormatter={fmtTick} width={72} />
            <Tooltip content={<CustomTooltip metric={metric} />} cursor={{ fill: "#0D1929" }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey={prevYear} fill="#C5CAD6" radius={[3, 3, 0, 0]} maxBarSize={24} name={String(prevYear)} />
            <Bar dataKey={currentYear} fill="#38BDF8" radius={[3, 3, 0, 0]} maxBarSize={24} name={String(currentYear)} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <ResponsiveContainer width="100%" height={chartHeight}>
          <BarChart data={chartData} layout="vertical" margin={{ left: 0, right: 8, top: 0, bottom: 0 }}>
            <XAxis type="number" tick={{ fontSize: 10, fill: "#9AA0AE" }} tickFormatter={fmtTick} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="area" width={148} tick={{ fontSize: 11, fill: "#4A5568" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip metric={metric} />} cursor={{ fill: "#0D1929" }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey={prevYear} fill="#C5CAD6" radius={[0, 3, 3, 0]} maxBarSize={12} name={String(prevYear)} />
            <Bar dataKey={currentYear} fill="#38BDF8" radius={[0, 3, 3, 0]} maxBarSize={12} name={String(currentYear)} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
