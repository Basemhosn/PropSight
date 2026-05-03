import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Cell, ReferenceLine
} from "recharts";
import { fmtAED, fmtNum } from "../utils/format";

const CustomTooltip = ({ active, payload, label }) => {
const [metric, setMetric] = useState("median");
const [minTxns, setMinTxns] = useState(100);
  if (!active || !payload || !payload.length) return null;
  const d = payload[0].payload;
  return (
    <div style={{ background: "var(--surface)", color: "var(--text-primary)", borderRadius: 8,
      padding: "10px 14px", fontSize: 12, minWidth: 220 }}>
      <div style={{ fontWeight: 600, marginBottom: 6, fontSize: 13 }}>{d.fullName}</div>
      <div style={{ color: "#8AAAC8", marginBottom: 3 }}>
        Median price: <span style={{ color: "#4ADE80", fontWeight: 600 }}>{fmtAED(d.median, true)}</span>
      </div>
      <div style={{ color: "#8AAAC8", marginBottom: 3 }}>
        Avg price: <span style={{ color: "var(--text-primary)" }}>{fmtAED(d.avg, true)}</span>
      </div>
      <div style={{ color: "#8AAAC8", marginBottom: 3 }}>
        Transactions: <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{fmtNum(d.count)}</span>
      </div>
      {d.premium !== 0 && (
        <div style={{
          marginTop: 6, paddingTop: 6, borderTop: "1px solid #1A2A40",
          color: d.premium > 0 ? "#4ADE80" : "#F87171", fontWeight: 600, fontSize: 11
        }}>
          {d.premium > 0 ? "▲" : "▼"} {Math.abs(d.premium).toFixed(1)}% vs market median
        </div>
      )}
    </div>
  );
};

export default function MetroPremium({ rows }) {
  if (!rows) return null;

  // Group by metro station
  const metroMap = {};
  rows.forEach(r => {
    const metro = r.metro?.trim();
    if (!metro) return;
    if (!metroMap[metro]) metroMap[metro] = { name: metro, prices: [], count: 0, total: 0 };
    metroMap[metro].count++;
    metroMap[metro].total += r.amount;
    if (r.amount > 0) metroMap[metro].prices.push(r.amount);
  });

  // Compute stats
  const metroData = Object.values(metroMap)
    .filter(m => m.count >= minTxns)
    .map(m => {
      const sorted = [...m.prices].sort((a, b) => a - b);
      const median = sorted.length ? sorted[Math.floor(sorted.length / 2)] : 0;
      const avg = m.total / m.count;
      return { ...m, median, avg, fullName: m.name };
    });

  // Market median across all metro-tagged transactions
  const allPrices = rows
    .filter(r => r.metro && r.amount > 0)
    .map(r => r.amount)
    .sort((a, b) => a - b);
  const marketMedian = allPrices.length ? allPrices[Math.floor(allPrices.length / 2)] : 0;

  // Add premium vs market
  const withPremium = metroData.map(m => ({
    ...m,
    premium: marketMedian ? ((m[metric] - marketMedian) / marketMedian) * 100 : 0,
    name: m.name.length > 30 ? m.name.slice(0, 28) + "…" : m.name,
  })).sort((a, b) => b[metric] - a[metric]);

  const maxVal = withPremium[0]?.[metric] || 1;

  if (!withPremium.length) {
    return (
      <div style={{ background: "var(--surface)", border: "1px solid rgba(59,130,246,0.12)", borderRadius: 12, padding: "1.25rem" }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.5rem" }}>Nearest metro price premium</div>
        <div style={{ fontSize: 13, color: "#9AA0AE", padding: "2rem", textAlign: "center" }}>
          No metro data available in current filter selection
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "var(--surface)", border: "1px solid rgba(59,130,246,0.12)", borderRadius: 12, padding: "1.25rem" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between",
        marginBottom: "0.75rem", flexWrap: "wrap", gap: 8 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>Nearest metro price premium</div>
          <div style={{ fontSize: 11, color: "#9AA0AE", marginTop: 2 }}>
            Market median: <span style={{ color: "#38BDF8", fontWeight: 600 }}>{fmtAED(marketMedian, true)}</span>
            {" · "}{fmtNum(allPrices.length)} transactions with metro data
          </div>
        </div>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {[{ k: "median", l: "Median" }, { k: "avg", l: "Average" }, { k: "count", l: "Volume" }].map(tabOpt => (
            <button key={tabOpt.k} onClick={() => setMetric(tabOpt.k)} style={{
              fontSize: 11, padding: "4px 10px", borderRadius: 6, cursor: "pointer", fontWeight: 500,
              border: metric === tabOpt.k ? "1px solid #185FA5" : "1px solid rgba(59,130,246,0.12)",
              background: metric === tabOpt.k ? "rgba(59,130,246,0.1)" : "var(--surface)",
              color: metric === tabOpt.k ? "#38BDF8" : "#7A8499",
            }}>{tabOpt.l}</button>
          ))}
        </div>
      </div>

      {/* Min transactions filter */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1rem" }}>
        <span style={{ fontSize: 11, color: "#9AA0AE" }}>Min transactions:</span>
        {[50, 100, 200, 500].map(n => (
          <button key={n} onClick={() => setMinTxns(n)} style={{
            fontSize: 11, padding: "3px 8px", borderRadius: 5, cursor: "pointer",
            border: minTxns === n ? "1px solid #185FA5" : "1px solid rgba(59,130,246,0.12)",
            background: minTxns === n ? "rgba(59,130,246,0.1)" : "var(--surface)",
            color: minTxns === n ? "#38BDF8" : "#7A8499",
          }}>{n}+</button>
        ))}
      </div>

      {/* Premium pills — top 5 */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: "1rem" }}>
        {withPremium.slice(0, 5).map(m => {
          const up = m.premium >= 0;
          return (
            <div key={m.fullName} style={{
              background: up ? "rgba(34,197,94,0.1)" : "rgba(248,113,113,0.1)",
              borderRadius: 6, padding: "4px 10px", fontSize: 11,
            }}>
              <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>
                {m.fullName.split(" ").slice(0, 3).join(" ")}
              </span>
              {" "}
              <span style={{ color: up ? "#22C55E" : "#F87171", fontWeight: 700 }}>
                {up ? "▲" : "▼"}{Math.abs(m.premium).toFixed(0)}%
              </span>
            </div>
          );
        })}
      </div>

      {/* Bar chart */}
      <ResponsiveContainer width="100%" height={withPremium.length * 26 + 50}>
        <BarChart data={withPremium} layout="vertical"
          margin={{ left: 0, right: 80, top: 4, bottom: 0 }}>
          <XAxis type="number" tick={{ fontSize: 10, fill: "#9AA0AE" }}
            tickFormatter={v => metric === "count" ? fmtNum(v) : fmtAED(v, true)}
            axisLine={false} tickLine={false} />
          <YAxis type="category" dataKey="name" width={190}
            tick={{ fontSize: 10, fill: "#4A5568" }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--surface)" }} />
          {metric !== "count" && (
            <ReferenceLine x={marketMedian} stroke="rgba(59,130,246,0.12)" strokeDasharray="4 3"
              label={{ value: "Mkt", position: "top", fontSize: 9, fill: "#9AA0AE" }} />
          )}
          <Bar dataKey={metric} radius={[0, 4, 4, 0]} maxBarSize={14}
            label={{
              position: "right", fontSize: 10, fill: "#7A8499",
              formatter: v => metric === "count" ? fmtNum(v) : fmtAED(v, true)
            }}>
            {withPremium.map((m, i) => (
              <Cell key={i}
                fill={metric === "count" ? "#38BDF8" : m.premium >= 0 ? "#38BDF8" : "#475569"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div style={{ display: "flex", gap: 16, marginTop: "0.75rem", fontSize: 11, color: "#9AA0AE" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 10, height: 10, borderRadius: 2, background: "#38BDF8", display: "inline-block" }} />
          Above market median
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 10, height: 10, borderRadius: 2, background: "#475569", display: "inline-block" }} />
          Below market median
        </span>
      </div>
    </div>
  );
}
