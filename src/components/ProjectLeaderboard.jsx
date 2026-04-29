import { useState } from "react";
import { fmtAED, fmtNum } from "../utils/format";
import { Trophy, Search } from "lucide-react";

const MEDAL = ["🥇","🥈","🥉"];
const TAB_COLOR = { count: "#38BDF8", value: "#22C55E", avg: "#BA7517" };

// Change 1: Distinct colours for each transaction type
const TYPE_COLOR = {
  Sale:     { bg: "rgba(59,130,246,0.1)", color: "#38BDF8", bar: "#38BDF8" },
  Mortgage: { bg: "rgba(34,197,94,0.1)", color: "#22C55E", bar: "#22C55E" },
  Gift:     { bg: "#FAEEDA", color: "#854F0B", bar: "#D85A30" },
  Other:    { bg: "rgba(100,116,139,0.15)", color: "var(--text-secondary)", bar: "var(--text-muted)" },
};

export default function ProjectLeaderboard({ rows, allAreas }) {
  const [metric, setMetric] = useState("count");
  // Change 2: Separate view (project/area) and metric (count/value/avg) controls
  const [view, setView] = useState("project");
  // Change 3: Area search dropdown
  const [areaSearch, setAreaSearch] = useState("");
  const [showAll, setShowAll] = useState(false);

  const LIMIT = showAll ? 50 : 15;

  // Filter rows by selected area if searching
  const filteredRows = areaSearch
    ? rows.filter(r => r.area.toLowerCase().includes(areaSearch.toLowerCase()))
    : rows;

  // Group by project or area
  const grouped = (() => {
    const map = {};
    filteredRows.forEach(r => {
      const key = view === "project" ? (r.project || "Unknown") : r.area;
      if (!key || key === "Unknown") return;
      if (!map[key]) map[key] = { name: key, count: 0, total: 0, types: {} };
      map[key].count++;
      map[key].total += r.amount;
      map[key].types[r.type] = (map[key].types[r.type] || 0) + 1;
    });
    return Object.values(map)
      .map(g => ({
        ...g,
        avg: g.count ? g.total / g.count : 0,
        topType: Object.entries(g.types).sort((a, b) => b[1] - a[1])[0]?.[0] || "Other",
      }))
      .sort((a, b) => b[metric] - a[metric])
      .slice(0, LIMIT);
  })();

  const maxVal = grouped[0]?.[metric] || 1;

  // Unique areas for dropdown
  const uniqueAreas = allAreas
    ? allAreas.map(a => a.area).sort()
    : [...new Set(rows.map(r => r.area))].filter(Boolean).sort();

  return (
    <div style={{ background: "var(--surface)", border: "1px solid #E8ECF2", borderRadius: 12, padding: "1.25rem" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between",
        marginBottom: "1rem", flexWrap: "wrap", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Trophy size={16} color="#BA7517" />
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>
              {view === "project" ? "Top projects" : "Top areas"} leaderboard
            </div>
            <div style={{ fontSize: 11, color: "#9AA0AE", marginTop: 2 }}>
              {fmtNum(grouped.length)} {view === "project" ? "projects" : "areas"}
              {areaSearch ? ` in ${areaSearch}` : ""}
            </div>
          </div>
        </div>

        {/* Change 2: Two clearly separated filter rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
          {/* Row 1: View toggle */}
          <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
            <span style={{ fontSize: 10, color: "#9AA0AE", marginRight: 2 }}>Show:</span>
            {[{ k: "project", l: "Projects" }, { k: "area", l: "Areas" }].map(t => (
              <button key={t.k} onClick={() => { setView(t.k); setAreaSearch(""); }} style={{
                fontSize: 11, padding: "4px 10px", borderRadius: 6, cursor: "pointer", fontWeight: 500,
                border: view === t.k ? "1px solid #0A1628" : "1px solid #E8ECF2",
                background: view === t.k ? "var(--text-primary)" : "var(--surface)",
                color: view === t.k ? "var(--surface)" : "#7A8499",
              }}>{t.l}</button>
            ))}
          </div>
          {/* Row 2: Metric toggle */}
          <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
            <span style={{ fontSize: 10, color: "#9AA0AE", marginRight: 2 }}>Rank by:</span>
            {[{ k: "count", l: "Count" }, { k: "total", l: "Value" }, { k: "avg", l: "Avg" }].map(t => (
              <button key={t.k} onClick={() => setMetric(t.k)} style={{
                fontSize: 11, padding: "4px 10px", borderRadius: 6, cursor: "pointer", fontWeight: 500,
                border: metric === t.k ? `1px solid ${TAB_COLOR[t.k]}` : "1px solid #E8ECF2",
                background: metric === t.k ? TAB_COLOR[t.k] + "18" : "var(--surface)",
                color: metric === t.k ? TAB_COLOR[t.k] : "#7A8499",
              }}>{t.l}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Change 3: Area search dropdown — only shown in project view */}
      {view === "project" && (
        <div style={{ marginBottom: "1rem", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6,
            border: "1px solid #E8ECF2", borderRadius: 8, padding: "6px 10px",
            background: areaSearch ? "rgba(59,130,246,0.1)" : "var(--surface)" }}>
            <Search size={13} color={areaSearch ? "#38BDF8" : "#9AA0AE"} />
            <select
              value={areaSearch}
              onChange={e => setAreaSearch(e.target.value)}
              style={{
                border: "none", outline: "none", fontSize: 13,
                color: areaSearch ? "#38BDF8" : "#9AA0AE",
                background: "transparent", width: "100%", cursor: "pointer",
              }}>
              <option value="">Filter by area (all areas)</option>
              {uniqueAreas.map(a => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Leaderboard rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        {grouped.map((item, i) => {
          const pct = (item[metric] / maxVal) * 100;
          const val = metric === "count"
            ? fmtNum(item.count) + " deals"
            : fmtAED(item[metric], true);
          const tc = TYPE_COLOR[item.topType] || TYPE_COLOR.Other;

          return (
            <div key={item.name} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "7px 10px", borderRadius: 8,
              background: i < 3 ? "rgba(59,130,246,0.06)" : "transparent",
              border: i < 3 ? "1px solid #F0F2F6" : "1px solid transparent",
            }}>
              {/* Rank */}
              <div style={{ width: 22, textAlign: "center", fontSize: i < 3 ? 14 : 11,
                color: "#9AA0AE", flexShrink: 0, fontWeight: 500 }}>
                {i < 3 ? MEDAL[i] : i + 1}
              </div>

              {/* Name + bar */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between",
                  alignItems: "baseline", marginBottom: 4, gap: 8 }}>
                  <div style={{
                    fontSize: 12, fontWeight: i < 3 ? 600 : 500, color: "var(--text-primary)",
                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "65%"
                  }} title={item.name}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: 12, color: TAB_COLOR[metric], fontWeight: 600, flexShrink: 0 }}>
                    {val}
                  </div>
                </div>
                <div style={{ height: 4, background: "rgba(59,130,246,0.08)", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{
                    height: "100%", width: `${pct}%`,
                    background: i < 3 ? tc.bar : tc.bar + "70",
                    borderRadius: 2, transition: "width 0.4s ease",
                  }} />
                </div>
              </div>

              {/* Change 1: Colour-coded type pill */}
              <div style={{
                flexShrink: 0, fontSize: 10, fontWeight: 600,
                padding: "2px 7px", borderRadius: 20,
                background: tc.bg, color: tc.color,
              }}>{item.topType}</div>
            </div>
          );
        })}
      </div>

      <button onClick={() => setShowAll(s => !s)} style={{
        width: "100%", marginTop: "0.875rem", padding: "7px",
        background: "var(--bg)", border: "none", borderRadius: 8,
        fontSize: 12, color: "#7A8499", cursor: "pointer", fontWeight: 500,
      }}>
        {showAll ? "Show less ↑" : "Show more — top 50 ↓"}
      </button>
    </div>
  );
}
