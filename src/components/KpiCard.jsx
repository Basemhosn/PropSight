export default function KpiCard({ label, value, sub, trend, trendUp }) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 12,
      padding: "1rem 1.25rem",
      flex: 1, minWidth: 0,
    }}>
      <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>
        {label}
      </div>
      <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3 }}>{sub}</div>}
      {trend && (
        <div style={{ fontSize: 12, color: trendUp ? "#22C55E" : "#F87171", marginTop: 4, fontWeight: 500 }}>
          {trendUp ? "↑" : "↓"} {trend}
        </div>
      )}
    </div>
  );
}
