export default function KpiCard({ label, value, sub, trend, trendUp }) {
  return (
    <div style={{
      background: "#fff",
      border: "1px solid #E8ECF2",
      borderRadius: 12,
      padding: "1rem 1.25rem",
    }}>
      <div style={{ fontSize: 11, color: "#7A8499", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>
        {label}
      </div>
      <div style={{ fontSize: 22, fontWeight: 600, color: "#0A1628", lineHeight: 1.2 }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: "#9AA0AE", marginTop: 3 }}>{sub}</div>}
      {trend && (
        <div style={{ fontSize: 12, marginTop: 5, color: trendUp ? "#1D9E75" : "#E24B4A", fontWeight: 500 }}>
          {trendUp ? "▲" : "▼"} {trend}
        </div>
      )}
    </div>
  );
}
