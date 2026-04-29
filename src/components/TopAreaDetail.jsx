import { X } from "lucide-react";
import { fmtAED, fmtNum, fmtSqm } from "../utils/format";

const TYPE_COLORS = {
  Sale: "#38BDF8", Mortgage: "#22C55E", Gift: "#D85A30", Other: "var(--text-muted)",
};

export default function TopAreaDetail({ area, onClose }) {
  if (!area) return null;

  const typesObj = area.types || { Sale: area.count || 0 };
  const typeEntries = Object.entries(typesObj).sort((a, b) => b[1] - a[1]);
  const total = Object.values(typesObj).reduce((s, v) => s + v, 0);

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(10,22,40,0.5)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 200, padding: "1rem",
    }} onClick={onClose}>
      <div style={{
        background: "var(--surface)", borderRadius: 16, padding: "1.5rem",
        width: "100%", maxWidth: 480, boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
      }} onClick={e => e.stopPropagation()}>

        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.25rem" }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)" }}>{area.area}</div>
            <div style={{ fontSize: 12, color: "#7A8499", marginTop: 3 }}>Area transaction summary</div>
          </div>
          <button onClick={onClose} style={{ background: "var(--bg)", border: "none", borderRadius: 8,
            width: 32, height: 32, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <X size={15} color="#7A8499" />
          </button>
        </div>

        {/* Stats grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: "1.25rem" }}>
          {[
            { label: "Transactions", value: fmtNum(area.count) },
            { label: "Total value", value: fmtAED(area.total, true) },
            { label: "Avg price", value: fmtAED(area.avg, true) },
            { label: "Avg size", value: fmtSqm(Math.round(area.avgSize)) },
            { label: "Top type", value: area.topType },
            { label: "Top usage", value: area.topUsage },
          ].map(s => (
            <div key={s.label} style={{ background: "var(--bg)", borderRadius: 8, padding: "0.75rem" }}>
              <div style={{ fontSize: 10, color: "#9AA0AE", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Type breakdown bars */}
        <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.75rem" }}>
          Transaction type breakdown
        </div>
        {typeEntries.map(([type, count]) => {
          const pct = total ? (count / total) * 100 : 0;
          return (
            <div key={type} style={{ marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#4A5568", marginBottom: 3 }}>
                <span>{type}</span>
                <span style={{ color: "#9AA0AE" }}>{fmtNum(count)} ({pct.toFixed(1)}%)</span>
              </div>
              <div style={{ height: 6, background: "var(--bg)", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${pct}%`, background: TYPE_COLORS[type] || "#888", borderRadius: 3 }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
