import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Cell, ReferenceLine
} from "recharts";
import { fmtAED, fmtNum } from "../utils/format";

const COLORS = [
  "#38BDF8","#22C55E","#D85A30","#BA7517","#993556","#534AB7",
  "#3b6d11","#0f6e56","#d4537e","#639922","#185f80","#855a30",
  "#38BDF8","#22C55E","#D85A30","#BA7517","#993556","#534AB7","#3b6d11","#0f6e56",
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={{ background: "var(--text-primary)", color: "var(--surface)", borderRadius: 8, padding: "10px 14px", fontSize: 12, minWidth: 180 }}>
      <div style={{ fontWeight: 600, marginBottom: 6 }}>{label}</div>
      <div style={{ color: "#8AAAC8", marginBottom: 3 }}>Avg price/sqm: <span style={{ color: "var(--surface)", fontWeight: 600 }}>{fmtAED(d.ppsqm, true)}</span></div>
      <div style={{ color: "#8AAAC8", marginBottom: 3 }}>Transactions: <span style={{ color: "var(--surface)" }}>{fmtNum(d.count)}</span></div>
      <div style={{ color: "#8AAAC8" }}>Avg deal size: <span style={{ color: "var(--surface)" }}>{fmtNum(Math.round(d.avgSize))} m²</span></div>
    </div>
  );
};

export default function PricePerSqm({ areas }) {
  const [showTop, setShowTop] = useState(15);

  // Only include areas with valid size data
  const data = areas
    .filter(a => a.avgSize > 0 && a.avg > 0)
    .map(a => ({
      name: a.area,
      ppsqm: Math.round(a.avg / a.avgSize),
      count: a.count,
      avgSize: a.avgSize,
      avg: a.avg,
    }))
    .filter(a => a.ppsqm > 0 && a.ppsqm < 200000) // filter outliers
    .sort((a, b) => b.ppsqm - a.ppsqm)
    .slice(0, showTop);

  const avgPpsqm = data.length
    ? Math.round(data.reduce((s, d) => s + d.ppsqm, 0) / data.length)
    : 0;

  if (!data.length) {
    return (
      <div style={{ background: "var(--surface)", border: "1px solid #E8ECF2", borderRadius: 12, padding: "1.25rem" }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.5rem" }}>Price per sq.m by area</div>
        <div style={{ fontSize: 13, color: "#9AA0AE", padding: "2rem", textAlign: "center" }}>
          No size data available — requires PROCEDURE_AREA column in your CSV
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "var(--surface)", border: "1px solid #E8ECF2", borderRadius: 12, padding: "1.25rem" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1rem", flexWrap: "wrap", gap: 8 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>Price per sq.m by area</div>
          <div style={{ fontSize: 11, color: "#9AA0AE", marginTop: 2 }}>
            Market avg: <span style={{ color: "#38BDF8", fontWeight: 600 }}>{fmtAED(avgPpsqm, true)}/m²</span>
            {" · "}based on {fmtNum(data.reduce((s, d) => s + d.count, 0))} transactions with size data
          </div>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {[10, 15, 20].map(n => (
            <button key={n} onClick={() => setShowTop(n)} style={{
              fontSize: 11, padding: "4px 10px", borderRadius: 6, cursor: "pointer", fontWeight: 500,
              border: showTop === n ? "1px solid #185FA5" : "1px solid #E8ECF2",
              background: showTop === n ? "rgba(59,130,246,0.1)" : "var(--surface)",
              color: showTop === n ? "#38BDF8" : "#7A8499",
            }}>Top {n}</button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={data.length * 28 + 60}>
        <BarChart data={data} layout="vertical" margin={{ left: 0, right: 80, top: 4, bottom: 0 }}>
          <XAxis type="number" tick={{ fontSize: 10, fill: "#9AA0AE" }}
            tickFormatter={v => fmtAED(v, true)} axisLine={false} tickLine={false} />
          <YAxis type="category" dataKey="name" width={148}
            tick={{ fontSize: 11, fill: "#4A5568" }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--surface)" }} />
          <ReferenceLine x={avgPpsqm} stroke="rgba(59,130,246,0.12)" strokeDasharray="4 3" label={{
            value: "Avg", position: "top", fontSize: 10, fill: "#9AA0AE"
          }} />
          <Bar dataKey="ppsqm" radius={[0, 4, 4, 0]} maxBarSize={16}
            label={{ position: "right", fontSize: 10, fill: "#7A8499",
              formatter: v => fmtAED(v, true) }}>
            {data.map((entry, i) => (
              <Cell key={i}
                fill={entry.ppsqm > avgPpsqm ? "#38BDF8" : "#C5CAD6"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div style={{ display: "flex", gap: 16, marginTop: "0.75rem", fontSize: 11, color: "#9AA0AE" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 10, height: 10, borderRadius: 2, background: "#38BDF8", display: "inline-block" }} />
          Above market average
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 10, height: 10, borderRadius: 2, background: "#C5CAD6", display: "inline-block" }} />
          Below market average
        </span>
      </div>
    </div>
  );
}
