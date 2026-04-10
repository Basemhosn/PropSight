import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from "recharts";
import { fmtNum } from "../utils/format";

const USAGE_COLORS = {
  Residential: "#185FA5",
  Commercial: "#1D9E75",
  Other: "#C5CAD6",
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#0A1628", color: "#fff", borderRadius: 8, padding: "8px 12px", fontSize: 12 }}>
      <div style={{ fontWeight: 600, marginBottom: 4 }}>{label}</div>
      {payload.map(p => (
        <div key={p.name} style={{ color: p.color }}>{p.name}: {fmtNum(p.value)}</div>
      ))}
    </div>
  );
};

export default function UsageChart({ areas }) {
  const top10 = areas.slice(0, 10).map(a => {
    const entry = { name: a.area.length > 18 ? a.area.slice(0, 16) + "…" : a.area };
    const usageEntries = Object.entries(a.usages);
    usageEntries.forEach(([u, c]) => { entry[u] = c; });
    return entry;
  });

  const usageKeys = [...new Set(top10.flatMap(d => Object.keys(d).filter(k => k !== "name")))];

  return (
    <div style={{ background: "#fff", border: "1px solid #E8ECF2", borderRadius: 12, padding: "1.25rem" }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: "#0A1628", marginBottom: "1rem" }}>
        Usage breakdown — top 10 areas
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={top10} margin={{ top: 0, right: 4, left: 0, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F0F2F6" />
          <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#9AA0AE" }} angle={-35} textAnchor="end" axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: "#9AA0AE" }} axisLine={false} tickLine={false} tickFormatter={fmtNum} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#F4F6FA" }} />
          <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
          {usageKeys.map(key => (
            <Bar key={key} dataKey={key} stackId="a" fill={USAGE_COLORS[key] || "#C5CAD6"} maxBarSize={32} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
