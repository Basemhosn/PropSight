import { useTheme } from '../hooks/useTheme';

export default function KpiCard({ label, value, sub, trend, trendUp }) {
  const { colors } = useTheme();
  return (
    <div style={{
      background: colors.surface,
      border: `1px solid ${colors.border}`,
      borderRadius: 12,
      padding: "1rem 1.25rem",
      flex: 1, minWidth: 0,
    }}>
      <div style={{ fontSize: 11, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>
        {label}
      </div>
      <div style={{ fontSize: 22, fontWeight: 700, color: colors.textPrimary, lineHeight: 1.2 }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: colors.textMuted, marginTop: 3 }}>{sub}</div>}
      {trend && (
        <div style={{ fontSize: 12, color: trendUp ? "#22C55E" : "#F87171", marginTop: 4, fontWeight: 500 }}>
          {trendUp ? "↑" : "↓"} {trend}
        </div>
      )}
    </div>
  );
}
