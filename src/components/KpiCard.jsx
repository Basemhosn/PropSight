export default function KpiCard({ label, value, sub, trend, trendUp }) {
  return (
    <div style={{
      background: "#0D1929",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: 12,
      padding: "1rem 1.25rem",
      flex: 1, minWidth: 0,
    }}>
      <div style={{ fontSize: 11, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>
        {label}
      </div>
      <div style={{ fontSize: 22, fontWeight: 700, color: "#F1F5F9", lineHeight: 1.2 }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: "#64748B", marginTop: 3 }}>{sub}</div>}
      {trend && (
        <div style={{ fontSize: 12, color: trendUp ? "#22C55E" : "#F87171", marginTop: 4, fontWeight: 500 }}>
          {trendUp ? "↑" : "↓"} {trend}
        </div>
      )}
    </div>
  );
}
