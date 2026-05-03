import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  Legend, CartesianGrid, Cell, PieChart, Pie
} from "recharts";
import { fmtAED, fmtNum } from "../utils/format";

const OFF_COLOR  = "#38BDF8";
const RDY_COLOR  = "#22C55E";

const CustomTooltip = ({ active, payload, label }) => {
  const off = payload.find(p => p.dataKey === "offPlan");
  const rdy = payload.find(p => p.dataKey === "ready");
  const total = (off?.value || 0) + (rdy?.value || 0);
  const pct = total ? ((off?.value || 0) / total * 100).toFixed(0) : 0;
  return (
    <div style={{ background: "var(--text-primary)", color: "var(--surface)", borderRadius: 8, padding: "10px 14px", fontSize: 12, minWidth: 190 }}>
      <div style={{ fontWeight: 600, marginBottom: 6 }}>{label}</div>
      {off && <div style={{ color: OFF_COLOR, marginBottom: 3 }}>Off-plan: <span style={{ color: "var(--surface)", fontWeight: 600 }}>{fmtNum(off.value)}</span></div>}
      {rdy && <div style={{ color: RDY_COLOR, marginBottom: 3 }}>Ready: <span style={{ color: "var(--surface)", fontWeight: 600 }}>{fmtNum(rdy.value)}</span></div>}
      <div style={{ color: "#8AAAC8", marginTop: 4, fontSize: 11 }}>Off-plan share: <span style={{ color: "#4ADE80", fontWeight: 600 }}>{pct}%</span></div>
    </div>
  );
};

export default function OffPlanReady({ rows, areas }) {
  if (!rows || !areas) return null;
  const [view, setView] = useState("area"); // area | trend
  const [metric, setMetric] = useState("count"); // count | value

  // Overall split
  const overall = { off: 0, ready: 0, offVal: 0, rdyVal: 0 };
  rows.forEach(r => {
    const isOff = r.reg?.toLowerCase().includes("off") || r.reg?.toLowerCase().includes("plan");
    if (isOff) { overall.off++; overall.offVal += r.amount; }
    else { overall.ready++; overall.rdyVal += r.amount; }
  });
  const totalTxns = overall.off + overall.ready;
  const offPct = totalTxns ? ((overall.off / totalTxns) * 100).toFixed(1) : 0;

  // By area — top 15
  const areaData = areas.slice(0, 15).map(a => {
    const aRows = rows.filter(r => r.area === a.area);
    const off = aRows.filter(r => r.reg?.toLowerCase().includes("off") || r.reg?.toLowerCase().includes("plan"));
    const rdy = aRows.filter(r => !r.reg?.toLowerCase().includes("off") && !r.reg?.toLowerCase().includes("plan"));
    return {
      name: a.area.length > 22 ? a.area.slice(0, 20) + "…" : a.area,
      fullName: a.area,
      offPlan: metric === "count" ? off.length : off.reduce((s, r) => s + r.amount, 0),
      ready: metric === "count" ? rdy.length : rdy.reduce((s, r) => s + r.amount, 0),
      offPct: aRows.length ? ((off.length / aRows.length) * 100).toFixed(0) : 0,
    };
  });

  // By month trend
  const monthlyData = (() => {
    const map = {};
    rows.forEach(r => {
      if (!r.month) return;
      if (!map[r.month]) map[r.month] = { month: r.month, offPlan: 0, ready: 0 };
      const isOff = r.reg?.toLowerCase().includes("off") || r.reg?.toLowerCase().includes("plan");
      if (isOff) map[r.month].offPlan += metric === "count" ? 1 : r.amount;
      else map[r.month].ready += metric === "count" ? 1 : r.amount;
    });
    return Object.values(map).sort((a, b) => a.month.localeCompare(b.month)).map(d => ({
      ...d,
      month: new Date(d.month + "-01").toLocaleDateString("en-AE", { month: "short", year: "2-digit" }),
    }));
  })();

  const fmtTick = v => metric === "count" ? fmtNum(v) : fmtAED(v, true);

  return (
    <div style={{ background: "var(--surface)", border: "1px solid #E8ECF2", borderRadius: 12, padding: "1.25rem" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between",
        marginBottom: "1rem", flexWrap: "wrap", gap: 8 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>Off-plan vs ready market</div>
          <div style={{ fontSize: 11, color: "#9AA0AE", marginTop: 2 }}>
            {offPct}% off-plan · {(100 - parseFloat(offPct)).toFixed(1)}% ready · {fmtNum(totalTxns)} total
          </div>
        </div>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {[{ k: "area", l: "By area" }, { k: "trend", l: "Trend" }].map(tabOpt => (
            <button key={tabOpt.k} onClick={() => setView(tabOpt.k)} style={{
              fontSize: 11, padding: "4px 10px", borderRadius: 6, cursor: "pointer", fontWeight: 500,
              border: view === tabOpt.k ? "1px solid #0A1628" : "1px solid #E8ECF2",
              background: view === tabOpt.k ? "var(--text-primary)" : "var(--surface)",
              color: view === tabOpt.k ? "var(--surface)" : "#7A8499",
            }}>{tabOpt.l}</button>
          ))}
          <div style={{ width: 1, background: "rgba(59,130,246,0.12)", margin: "0 2px" }} />
          {[{ k: "count", l: "Count" }, { k: "value", l: "Value" }].map(tabOpt => (
            <button key={tabOpt.k} onClick={() => setMetric(tabOpt.k)} style={{
              fontSize: 11, padding: "4px 10px", borderRadius: 6, cursor: "pointer", fontWeight: 500,
              border: metric === tabOpt.k ? "1px solid #185FA5" : "1px solid #E8ECF2",
              background: metric === tabOpt.k ? "rgba(59,130,246,0.1)" : "var(--surface)",
              color: metric === tabOpt.k ? "#38BDF8" : "#7A8499",
            }}>{tabOpt.l}</button>
          ))}
        </div>
      </div>

      {/* Overall split summary */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: "1rem" }}>
        <div style={{ background: "rgba(59,130,246,0.1)", borderRadius: 8, padding: "0.75rem 1rem" }}>
          <div style={{ fontSize: 11, color: "#7A8499", marginBottom: 4 }}>Off-plan</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: OFF_COLOR }}>{offPct}%</div>
          <div style={{ fontSize: 11, color: "#7A8499", marginTop: 2 }}>
            {fmtNum(overall.off)} deals · {fmtAED(overall.offVal, true)}
          </div>
        </div>
        <div style={{ background: "rgba(34,197,94,0.1)", borderRadius: 8, padding: "0.75rem 1rem" }}>
          <div style={{ fontSize: 11, color: "#7A8499", marginBottom: 4 }}>Ready</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: RDY_COLOR }}>
            {(100 - parseFloat(offPct)).toFixed(1)}%
          </div>
          <div style={{ fontSize: 11, color: "#7A8499", marginTop: 2 }}>
            {fmtNum(overall.ready)} deals · {fmtAED(overall.rdyVal, true)}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: 16, marginBottom: "0.75rem" }}>
        {[{ c: OFF_COLOR, l: "Off-plan" }, { c: RDY_COLOR, l: "Ready" }].map(({ c, l }) => (
          <span key={l} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#4A5568" }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, background: c, display: "inline-block" }} />
            {l}
          </span>
        ))}
      </div>

      {/* Chart */}
      {view === "area" ? (
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={areaData} layout="vertical" margin={{ left: 0, right: 8, top: 0, bottom: 0 }}>
            <XAxis type="number" tick={{ fontSize: 10, fill: "#9AA0AE" }}
              tickFormatter={fmtTick} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="name" width={148}
              tick={{ fontSize: 11, fill: "#4A5568" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--surface)" }} />
            <Bar dataKey="offPlan" stackId="a" fill={OFF_COLOR} maxBarSize={14} radius={[0, 0, 0, 0]} name="Off-plan" />
            <Bar dataKey="ready" stackId="a" fill={RDY_COLOR} maxBarSize={14} radius={[0, 4, 4, 0]} name="Ready" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={monthlyData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(59,130,246,0.08)" />
            <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#9AA0AE" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: "#9AA0AE" }} axisLine={false} tickLine={false}
              tickFormatter={fmtTick} width={72} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--surface)" }} />
            <Bar dataKey="offPlan" stackId="a" fill={OFF_COLOR} name="Off-plan" />
            <Bar dataKey="ready" stackId="a" fill={RDY_COLOR} name="Ready" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
