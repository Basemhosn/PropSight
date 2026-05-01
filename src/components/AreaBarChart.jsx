import { t } from '../i18n';
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { fmtAED, fmtNum } from "../utils/format";
import { Search } from "lucide-react";

const COLORS = [
  "#38BDF8","#22C55E","#D85A30","#BA7517","#993556","#534AB7",
  "#3b6d11","#0f6e56","#d4537e","#639922","#185f80","#855a30",
  "#38BDF8","#22C55E","#D85A30","#BA7517","#993556","#534AB7","#3b6d11","#0f6e56",
];

const tabs = [
  { key: "count", label: "Count" },
  { key: "total", label: "Total value" },
  { key: "avg", label: "Avg price" },
];

const CustomTooltip = ({ active, payload, label, tab }) => {
  if (!active || !payload?.length) return null;
  const val = payload[0].value;
  return (
    <div style={{ background: "var(--text-primary)", color: "var(--surface)", borderRadius: 8, padding: "8px 12px", fontSize: 12, minWidth: 160 }}>
      <div style={{ fontWeight: 600, marginBottom: 4 }}>{label}</div>
      <div style={{ color: "#8AAAC8" }}>
        {tab === "count" ? fmtNum(val) + " transactions" : fmtAED(val, true)}
      </div>
      <div style={{ fontSize: 11, color: "#5A7A9A", marginTop: 3 }}>Click for details</div>
    </div>
  );
};

export default function AreaBarChart({ areas, onAreaClick }) {
  const lang = localStorage.getItem('lang') || 'en';
  const [tab, setTab] = useState("count");
  const [areaFilter, setAreaFilter] = useState("");

  const allAreaNames = areas.map(a => a.area).sort();

  const displayAreas = areaFilter
    ? areas.filter(a => a.area === areaFilter)
    : areas;

  const top20 = [...displayAreas]
    .sort((a, b) => b[tab] - a[tab])
    .slice(0, 20)
    .map(a => ({ ...a, name: a.area, value: a[tab] }));

  const fmtTick = (v) => tab === "count" ? fmtNum(v) : fmtAED(v, true);

  const handleClick = (data) => {
    if (data && data.activePayload?.[0] && onAreaClick) {
      const areaName = data.activePayload[0].payload.area;
      const areaObj = areas.find(a => a.area === areaName);
      if (areaObj) onAreaClick(areaObj);
    }
  };

  return (
    <div style={{ background: "var(--surface)", border: "1px solid #E8ECF2", borderRadius: 12, padding: "1.25rem" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
        marginBottom: "1rem", flexWrap: "wrap", gap: 8 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>Transactions by area</div>
          <div style={{ fontSize: 11, color: "#9AA0AE", marginTop: 2 }}>Top 20 areas · click bar for details</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6,
          border: "1px solid #E8ECF2", borderRadius: 8, padding: "5px 10px",
          background: areaFilter ? "rgba(59,130,246,0.1)" : "var(--surface)", minWidth: 180 }}>
          <Search size={12} color={areaFilter ? "#38BDF8" : "#9AA0AE"} />
          <select value={areaFilter} onChange={e => setAreaFilter(e.target.value)} style={{
            border: "none", outline: "none", fontSize: 12,
            color: areaFilter ? "#38BDF8" : "#9AA0AE",
            background: "transparent", cursor: "pointer", width: "100%",
          }}>
            <option value="">{t('All areas',lang)}</option>
            {allAreaNames.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {tabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{
              fontSize: 11, padding: "4px 10px", borderRadius: 6, cursor: "pointer", fontWeight: 500,
              border: tab === t.key ? "1px solid #185FA5" : "1px solid #E8ECF2",
              background: tab === t.key ? "rgba(59,130,246,0.1)" : "var(--surface)",
              color: tab === t.key ? "#38BDF8" : "#7A8499",
            }}>{t.label}</button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={440}>
        <BarChart
          data={top20}
          layout="vertical"
          margin={{ left: 0, right: 16, top: 0, bottom: 0 }}
          onClick={handleClick}
          style={{ cursor: "pointer" }}
        >
          <XAxis type="number" tick={{ fontSize: 10, fill: "#9AA0AE" }}
            tickFormatter={fmtTick} axisLine={false} tickLine={false} />
          <YAxis type="category" dataKey="name" width={150}
            tick={{ fontSize: 11, fill: "#4A5568" }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip tab={tab} />} cursor={{ fill: "var(--surface)" }} />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} maxBarSize={18}>
            {top20.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
