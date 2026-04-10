import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { fmtAED, fmtNum, fmtMonth } from "../utils/format";

const CustomTooltip = ({ active, payload, label, tab }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#0A1628", color: "#fff", borderRadius: 8, padding: "8px 12px", fontSize: 12 }}>
      <div style={{ fontWeight: 600, marginBottom: 3 }}>{label}</div>
      <div>{tab === "count" ? fmtNum(payload[0].value) + " transactions" : fmtAED(payload[0].value, true)}</div>
    </div>
  );
};

export default function MonthlyTrend({ data }) {
  const [tab, setTab] = useState("count");

  const chartData = data.map(d => ({
    month: fmtMonth(d.month),
    count: d.count,
    total: d.total,
  }));

  return (
    <div style={{ background: "#fff", border: "1px solid #E8ECF2", borderRadius: 12, padding: "1.25rem" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem", flexWrap: "wrap", gap: 8 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#0A1628" }}>Monthly volume</div>
        <div style={{ display: "flex", gap: 4 }}>
          {[{ key: "count", label: "Count" }, { key: "total", label: "Value" }].map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{
              fontSize: 11, padding: "4px 10px", borderRadius: 6, cursor: "pointer", fontWeight: 500,
              border: tab === t.key ? "1px solid #185FA5" : "1px solid #E8ECF2",
              background: tab === t.key ? "#EDF4FC" : "#fff",
              color: tab === t.key ? "#185FA5" : "#7A8499",
            }}>{t.label}</button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={chartData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#185FA5" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#185FA5" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#F0F2F6" />
          <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#9AA0AE" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: "#9AA0AE" }} axisLine={false} tickLine={false}
            tickFormatter={v => tab === "count" ? fmtNum(v) : fmtAED(v, true)} width={70} />
          <Tooltip content={<CustomTooltip tab={tab} />} />
          <Area type="monotone" dataKey={tab} stroke="#185FA5" strokeWidth={2} fill="url(#grad)" dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
