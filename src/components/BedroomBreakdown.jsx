import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from "recharts";
import { fmtAED, fmtNum } from "../utils/format";

const ROOM_ORDER = ["Studio", "1 B/R", "2 B/R", "3 B/R", "4 B/R", "5 B/R", "Office", "Shop"];
const ROOM_COLORS = {
  "Studio":  "#534AB7",
  "1 B/R":   "#38BDF8",
  "2 B/R":   "#22C55E",
  "3 B/R":   "#D85A30",
  "4 B/R":   "#BA7517",
  "5 B/R":   "#993556",
  "Office":  "#64748B",
  "Shop":    "#3b6d11",
};

const CustomTooltip = ({ active, payload, label, metric }) => {
  if (!active || !payload || !payload.length) return null;
  const d = payload[0].payload;
  return (
    <div style={{ background: "#F1F5F9", color: "#0D1929", borderRadius: 8, padding: "10px 14px", fontSize: 12, minWidth: 190 }}>
      <div style={{ fontWeight: 600, marginBottom: 6, fontSize: 13 }}>{label}</div>
      <div style={{ color: "#8AAAC8", marginBottom: 3 }}>
        Transactions: <span style={{ color: "#0D1929", fontWeight: 600 }}>{fmtNum(d.count)}</span>
      </div>
      <div style={{ color: "#8AAAC8", marginBottom: 3 }}>
        Avg price: <span style={{ color: "#4ADE80", fontWeight: 600 }}>{fmtAED(d.avg, true)}</span>
      </div>
      <div style={{ color: "#8AAAC8", marginBottom: 3 }}>
        Median price: <span style={{ color: "#FAC775", fontWeight: 600 }}>{fmtAED(d.median, true)}</span>
      </div>
      <div style={{ color: "#8AAAC8" }}>
        Total value: <span style={{ color: "#0D1929" }}>{fmtAED(d.total, true)}</span>
      </div>
    </div>
  );
};

export default function BedroomBreakdown({ rows, areas }) {
  if (!rows || !areas) return null;
  const [metric, setMetric] = useState("count");
  const [selectedArea, setSelectedArea] = useState("ALL");

  // Get top areas for filter
  const topAreas = ["ALL", ...areas.slice(0, 12).map(a => a.area)];

  // Filter rows by area
  const filtered = selectedArea === "ALL"
    ? rows
    : rows.filter(r => r.area === selectedArea);

  // Group by room type
  const roomMap = {};
  filtered.forEach(r => {
    const room = r.rooms?.trim();
    if (!room || room === "NA" || room === "") return;
    if (!ROOM_ORDER.includes(room)) return;
    if (!roomMap[room]) roomMap[room] = { room, count: 0, total: 0, prices: [] };
    roomMap[room].count++;
    roomMap[room].total += r.amount;
    if (r.amount > 0) roomMap[room].prices.push(r.amount);
  });

  const data = ROOM_ORDER
    .filter(r => roomMap[r])
    .map(r => {
      const sorted = [...roomMap[r].prices].sort((a, b) => a - b);
      const median = sorted.length ? sorted[Math.floor(sorted.length / 2)] : 0;
      return { ...roomMap[r], avg: roomMap[r].total / roomMap[r].count, median };
    });

  const totalTxns = data.reduce((s, d) => s + d.count, 0);

  // Price ladder data
  const priceLadder = [...data].sort((a, b) => a.avg - b.avg);

  return (
    <div style={{ background: "#0D1929", border: "1px solid #E8ECF2", borderRadius: 12, padding: "1.25rem" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between",
        marginBottom: "1rem", flexWrap: "wrap", gap: 8 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#F1F5F9" }}>Bedroom type breakdown</div>
          <div style={{ fontSize: 11, color: "#9AA0AE", marginTop: 2 }}>
            {fmtNum(totalTxns)} transactions with room data
          </div>
        </div>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {[{ k: "count", l: "Count" }, { k: "median", l: "Median price" }, { k: "avg", l: "Avg price" }, { k: "total", l: "Total value" }].map(t => (
            <button key={t.k} onClick={() => setMetric(t.k)} style={{
              fontSize: 11, padding: "4px 10px", borderRadius: 6, cursor: "pointer", fontWeight: 500,
              border: metric === t.k ? "1px solid #185FA5" : "1px solid #E8ECF2",
              background: metric === t.k ? "rgba(59,130,246,0.1)" : "#0D1929",
              color: metric === t.k ? "#38BDF8" : "#7A8499",
            }}>{t.l}</button>
          ))}
        </div>
      </div>

      {/* Area filter */}
      <div style={{ marginBottom: "1rem", overflowX: "auto", whiteSpace: "nowrap", paddingBottom: 4 }}>
        {topAreas.map(a => (
          <button key={a} onClick={() => setSelectedArea(a)} style={{
            fontSize: 11, padding: "4px 10px", borderRadius: 20, cursor: "pointer",
            marginRight: 5, fontWeight: selectedArea === a ? 600 : 400,
            border: selectedArea === a ? "1px solid #0A1628" : "1px solid #E8ECF2",
            background: selectedArea === a ? "#F1F5F9" : "#0D1929",
            color: selectedArea === a ? "#0D1929" : "#7A8499",
            flexShrink: 0,
          }}>{a === "ALL" ? "All areas" : a}</button>
        ))}
      </div>

      {/* Summary pills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: "1rem" }}>
        {data.map(d => {
          const pct = totalTxns ? ((d.count / totalTxns) * 100).toFixed(0) : 0;
          return (
            <div key={d.room} style={{
              background: (ROOM_COLORS[d.room] || "#888") + "14",
              borderRadius: 8, padding: "6px 12px", textAlign: "center",
            }}>
              <div style={{ fontSize: 11, color: "#9AA0AE" }}>{d.room}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: ROOM_COLORS[d.room] || "#888" }}>{pct}%</div>
              <div style={{ fontSize: 10, color: "#9AA0AE" }}>{fmtNum(d.count)}</div>
            </div>
          );
        })}
      </div>

      {/* Bar chart */}
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
          <XAxis dataKey="room" tick={{ fontSize: 11, fill: "#7A8499" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: "#9AA0AE" }} axisLine={false} tickLine={false}
            tickFormatter={v => metric === "count" ? fmtNum(v) : fmtAED(v, true)} width={72} />
          <Tooltip content={<CustomTooltip metric={metric} />} cursor={{ fill: "#0D1929" }} />
          <Bar dataKey={metric} radius={[4, 4, 0, 0]} maxBarSize={40}>
            {data.map(d => <Cell key={d.room} fill={ROOM_COLORS[d.room] || "#888"} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Price ladder */}
      <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid #F0F2F6" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.75rem" }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#9AA0AE", textTransform: "uppercase", letterSpacing: "0.05em" }}>Median price ladder</div>
          <div style={{ fontSize: 10, color: "#9AA0AE" }}>Median is more reliable than avg for this data</div>
        </div>
        {priceLadder.map((d, i) => {
          const maxMedian = Math.max(...priceLadder.map(x => x.median));
          const pct = (d.median / maxMedian) * 100;
          return (
            <div key={d.room} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 7 }}>
              <div style={{ width: 60, fontSize: 11, color: "#4A5568", fontWeight: 500 }}>{d.room}</div>
              <div style={{ flex: 1, height: 6, background: "rgba(59,130,246,0.08)", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${pct}%`,
                  background: ROOM_COLORS[d.room] || "#888", borderRadius: 3 }} />
              </div>
              <div style={{ width: 90, fontSize: 11, color: "#F1F5F9", fontWeight: 600, textAlign: "right" }}>
                {fmtAED(d.median, true)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
