import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { fmtNum, fmtPct } from "../utils/format";
import { TYPE_COLORS } from "../utils/colors";



const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#F1F5F9", color: "#0D1929", borderRadius: 8, padding: "8px 12px", fontSize: 12 }}>
      <div style={{ fontWeight: 600 }}>{payload[0].name}</div>
      <div>{fmtNum(payload[0].value)} transactions</div>
    </div>
  );
};

export default function TypeDonut({ data }) {
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div style={{ background: "#0D1929", border: "1px solid #E8ECF2", borderRadius: 12, padding: "1.25rem" }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: "#F1F5F9", marginBottom: "1rem" }}>
        Transaction type split
      </div>

      {/* Legend */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: "0.75rem" }}>
        {data.map(d => (
          <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#4A5568" }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: TYPE_COLORS[d.name] || "#888" }} />
            {d.name} <span style={{ color: "#9AA0AE" }}>{fmtPct(d.value, total)}</span>
          </div>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={52} outerRadius={78} dataKey="value" paddingAngle={2}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={TYPE_COLORS[entry.name] || "#888"} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
