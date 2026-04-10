import { useClerk, useUser } from "@clerk/clerk-react";
import { fmtNum } from "../utils/format";

export default function TopNav({ datasetMeta, filteredCount }) {
  const { signOut } = useClerk();
  const { user } = useUser();

  return (
    <div style={{
      background: "#0A1628",
      padding: "0 1.25rem",
      minHeight: 56,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      borderBottom: "1px solid #1A2A40",
      position: "sticky", top: 0, zIndex: 100,
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
            <span style={{
              fontSize: 11, background: "#1D3A20", color: "#4ADE80",
              padding: "3px 10px", borderRadius: 20, fontWeight: 600,
            }}>
              {fmtNum(filteredCount)} / {fmtNum(datasetMeta.totalRows)} transactions
            </span>
            <span style={{
              fontSize: 11, background: "#0C2038", color: "#5A7A9A",
              padding: "3px 10px", borderRadius: 20,
            }}>
              Updated {datasetMeta.lastUpdated}
            </span>
          </>
        )}
      </div>

      {/* Right — user */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {user?.imageUrl ? (
          <img src={user.imageUrl} alt="avatar"
            style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover" }} />
        ) : (
          <div style={{
            width: 28, height: 28, borderRadius: "50%", background: "#185FA5",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 11, fontWeight: 700, color: "#fff",
          }}>
            {(user?.firstName?.[0] || user?.emailAddresses?.[0]?.emailAddress?.[0] || "U").toUpperCase()}
          </div>
        )}
        <div style={{ display: "none" }} className="user-name-desktop">
          <div style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>
            {user?.firstName || "User"}
          </div>
        </div>
        <button onClick={() => signOut()} style={{
          background: "transparent", border: "1px solid #2A3F5A",
          color: "#8AAAC8", borderRadius: 8, padding: "5px 10px",
          fontSize: 11, cursor: "pointer", fontWeight: 500,
        }}>Sign out</button>
      </div>
    </div>
  );
}
