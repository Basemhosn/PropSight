import { useAuth } from '../context/AuthContext';
import { fmtNum } from '../utils/format';

export default function TopNav({ datasetMeta, filteredCount }) {
  const { user, profile, signOut, isPro } = useAuth();

  return (
    <div style={{
      background: "#0A1628", padding: "0 1.25rem", minHeight: 56,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      borderBottom: "1px solid #1A2A40", position: "sticky", top: 0, zIndex: 100,
      flexWrap: "wrap", gap: 8,
    }}>
      {/* Left — logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 20 }}>🏙️</span>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>
            Dubai RE Dashboard
          </div>
          <div style={{ fontSize: 10, color: "#5A7A9A" }}>DLD Official Open Data</div>
        </div>
      </div>

      {/* Centre — dataset info */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        {datasetMeta && (
          <>
            <span style={{ fontSize: 11, background: "#1D3A20", color: "#4ADE80",
              padding: "3px 10px", borderRadius: 20, fontWeight: 600 }}>
              {fmtNum(filteredCount)} / {fmtNum(datasetMeta.totalRows)} transactions
            </span>
            <span style={{ fontSize: 11, background: "#0C2038", color: "#5A7A9A",
              padding: "3px 10px", borderRadius: 20 }}>
              Updated {datasetMeta.lastUpdated}
            </span>
          </>
        )}
        {isPro && (
          <span style={{ fontSize: 11, background: "rgba(186,117,23,0.2)", color: "#BA7517",
            padding: "3px 10px", borderRadius: 20, fontWeight: 600 }}>
            ⭐ Pro
          </span>
        )}
      </div>

      {/* Right — user */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {profile?.avatar_url ? (
          <img src={profile.avatar_url} alt="avatar"
            style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover" }} />
        ) : (
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#185FA5",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 11, fontWeight: 700, color: "#fff" }}>
            {(profile?.full_name?.[0] || user?.email?.[0] || "U").toUpperCase()}
          </div>
        )}
        <div style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>
          {profile?.full_name || user?.email?.split('@')[0] || "User"}
        </div>
        <button onClick={signOut} style={{
          background: "transparent", border: "1px solid #2A3F5A",
          color: "#8AAAC8", borderRadius: 8, padding: "5px 10px",
          fontSize: 11, cursor: "pointer", fontWeight: 500,
        }}>Sign out</button>
      </div>
    </div>
  );
}
