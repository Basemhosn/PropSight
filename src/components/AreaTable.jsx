import { useState } from "react";
import { fmtAED, fmtNum, fmtSqm } from "../utils/format";
import { TYPE_BG, TYPE_TEXT } from "../utils/colors";
import { ChevronUp, ChevronDown } from "lucide-react";

function Pill({ label }) {
  return (
    <span style={{ background: TYPE_BG[label] || TYPE_BG.Other, color: TYPE_TEXT[label] || TYPE_TEXT.Other,
      fontSize: 11, fontWeight: 600, padding: "2px 9px", borderRadius: 20 }}>
      {label}
    </span>
  );
}

const COLS = [
  { key: "area", label: "Area" },
  { key: "count", label: "Transactions" },
  { key: "total", label: "Total value" },
  { key: "avg", label: "Avg value" },
  { key: "avgSize", label: "Avg size" },
  { key: "ppsqm", label: "Price/m²" },
  { key: "topType", label: "Top type" },
];

export default function AreaTable({ areas, onRowClick }) {
  const [sort, setSort] = useState({ key: "total", dir: -1 });
  const [page, setPage] = useState(0);
  const PAGE = 15;

  const sorted = [...areas].sort((a, b) => {
    const av = a[sort.key] ?? "";
    const bv = b[sort.key] ?? "";
    return (typeof av === "number" ? av - bv : String(av).localeCompare(String(bv))) * sort.dir;
  });

  const pages = Math.ceil(sorted.length / PAGE);
  const visible = sorted.slice(page * PAGE, page * PAGE + PAGE);

  const handleSort = (key) => {
    setSort(s => ({ key, dir: s.key === key ? -s.dir : -1 }));
    setPage(0);
  };

  return (
    <div style={{ background: "var(--surface)", border: "1px solid #E8ECF2", borderRadius: 12, overflow: "hidden" }}>
      <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid #E8ECF2",
        display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>
          Area breakdown{" "}
          <span style={{ color: "#9AA0AE", fontWeight: 400 }}>— {fmtNum(areas.length)} areas</span>
        </div>
        <div style={{ fontSize: 11, color: "#9AA0AE" }}>Click any row for details</div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ padding: "8px 12px", fontSize: 11, color: "#9AA0AE", fontWeight: 500,
                borderBottom: "1px solid #E8ECF2", background: "rgba(59,130,246,0.06)", width: 36 }}>#</th>
              {COLS.map(col => {
                const active = sort.key === col.key;
                return (
                  <th key={col.key} onClick={() => handleSort(col.key)} style={{
                    padding: "8px 12px", fontSize: 11,
                    color: active ? "#38BDF8" : "#9AA0AE",
                    fontWeight: 500, textAlign: "left", whiteSpace: "nowrap", cursor: "pointer",
                    borderBottom: "1px solid #E8ECF2", background: "rgba(59,130,246,0.06)",
                    textTransform: "uppercase", letterSpacing: "0.04em", userSelect: "none",
                  }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>
                      {col.label}
                      {active && (sort.dir === -1 ? <ChevronDown size={11} /> : <ChevronUp size={11} />)}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {visible.map((row, i) => (
              <tr key={row.area}
                onClick={() => onRowClick && onRowClick(row)}
                style={{ borderBottom: "1px solid #F4F6FA", cursor: "pointer" }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--surface)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <td style={{ padding: "9px 12px", fontSize: 12, color: "#C5CAD6" }}>{page * PAGE + i + 1}</td>
                <td style={{ padding: "9px 12px", fontSize: 13, fontWeight: 600, color: "var(--text-primary)", whiteSpace: "nowrap" }}>{row.area}</td>
                <td style={{ padding: "9px 12px", fontSize: 13, color: "var(--text-primary)" }}>{fmtNum(row.count)}</td>
                <td style={{ padding: "9px 12px", fontSize: 13, color: "var(--text-primary)" }}>{fmtAED(row.total, true)}</td>
                <td style={{ padding: "9px 12px", fontSize: 13, color: "var(--text-primary)" }}>{fmtAED(row.avg, true)}</td>
                <td style={{ padding: "9px 12px", fontSize: 13, color: "#7A8499" }}>{fmtSqm(Math.round(row.avgSize))}</td>
                <td style={{ padding: "9px 12px", fontSize: 13, color: row.avgSize > 0 ? "var(--text-primary)" : "#C5CAD6" }}>
                  {row.avgSize > 0 ? "AED " + Math.round(row.avg / row.avgSize).toLocaleString() + "/m²" : "—"}
                </td>
                <td style={{ padding: "9px 12px" }}><Pill label={row.topType} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pages > 1 && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center",
          gap: 6, padding: "0.75rem", borderTop: "1px solid #E8ECF2" }}>
          {Array.from({ length: pages }, (_, i) => (
            <button key={i} onClick={() => setPage(i)} style={{
              width: 28, height: 28, borderRadius: 6,
              border: "1px solid #E8ECF2",
              background: page === i ? "#38BDF8" : "var(--surface)",
              color: page === i ? "var(--surface)" : "#4A5568",
              fontSize: 12, fontWeight: 500, cursor: "pointer",
            }}>{i + 1}</button>
          ))}
        </div>
      )}
    </div>
  );
}
