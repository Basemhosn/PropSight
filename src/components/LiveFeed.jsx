import { useState, useEffect, useCallback } from "react";
import { fetchTodayTransactions } from "../services/ddaApi";
import { fmtAED, fmtNum } from "../utils/format";

const TYPE_COLORS = {
  Sale:     { bg:"rgba(59,130,246,0.1)", color:"#38BDF8" },
  Mortgage: { bg:"#FEF3E2", color:"#BA7517" },
  Gift:     { bg:"rgba(34,197,94,0.1)", color:"#22C55E" },
};

function LiveBadge() {
  const [on, setOn] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setOn(v => !v), 800);
    return () => clearInterval(t);
  }, []);
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:5 }}>
      <span style={{
        width:8, height:8, borderRadius:"50%",
        background: on ? "#22C55E" : "transparent",
        border:"2px solid #1D9E75",
        transition:"background 0.3s",
      }} />
      <span style={{ fontSize:11, fontWeight:600, color:"#22C55E" }}>LIVE</span>
    </span>
  );
}

export default function LiveFeed() {
  const [txns,    setTxns]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [stats,   setStats]   = useState(null);

  const load = useCallback(async () => {
    try {
      setError(null);
      const data = await fetchTodayTransactions();

      // Handle different response shapes
      const rows = Array.isArray(data) ? data
        : data?.result?.records || data?.records || data?.data || [];

      // Compute quick stats
      const sales = rows.filter(r => r.trans_group_en === "Sales" || r.transaction_type_en === "Sale");
      const totalVal = rows.reduce((s, r) => s + (parseFloat(r.trans_value || r.transaction_value || 0)), 0);

      setTxns(rows.slice(0, 50));
      setStats({
        total: rows.length,
        totalVal,
        sales:  sales.length,
        avgVal: rows.length ? totalVal / rows.length : 0,
      });
      setLastUpdate(new Date());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    // Refresh every 5 minutes
    const interval = setInterval(load, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [load]);

  if (loading) return (
    <div style={{ padding:"2rem", textAlign:"center" }}>
      <div style={{ width:32,height:32,border:"3px solid #E8ECF2",borderTopColor:"#38BDF8",
        borderRadius:"50%",animation:"spin 0.7s linear infinite",margin:"0 auto 1rem"}} />
      <div style={{ fontSize:13,color:"#9AA0AE" }}>Connecting to Dubai Data Authority…</div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  if (error) return (
    <div style={{ padding:"1.5rem", background:"#FFF8F0", borderRadius:10, border:"1px solid #F5DDB8", margin:"1rem" }}>
      <div style={{ fontSize:13,fontWeight:600,color:"#BA7517",marginBottom:6 }}>⚠ Live feed unavailable</div>
      <div style={{ fontSize:12,color:"#9AA0AE",marginBottom:12 }}>{error}</div>
      <div style={{ fontSize:11,color:"#9AA0AE" }}>
        The DDA test environment has a daily quota. Dashboard is showing cached data.
        Live feed will reconnect automatically.
      </div>
      <button onClick={load} style={{
        marginTop:12,fontSize:12,padding:"6px 14px",borderRadius:8,
        background:"#38BDF8",color:"#0D1929",border:"none",cursor:"pointer"
      }}>Retry</button>
    </div>
  );

  return (
    <div style={{ padding:"1.25rem" }}>
      {/* Header */}
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1.25rem" }}>
        <div>
          <div style={{ display:"flex",alignItems:"center",gap:10 }}>
            <div style={{ fontSize:18,fontWeight:700,color:"#F1F5F9" }}>Live Transactions</div>
            <LiveBadge />
          </div>
          <div style={{ fontSize:12,color:"#9AA0AE",marginTop:2 }}>
            Today · DLD via Dubai Data Authority
            {lastUpdate && ` · Updated ${lastUpdate.toLocaleTimeString("en-AE",{hour:"2-digit",minute:"2-digit"})}`}
          </div>
        </div>
        <button onClick={load} style={{
          fontSize:12,padding:"6px 12px",borderRadius:8,
          background:"#0D1929",border:"1px solid #E8ECF2",cursor:"pointer",color:"#7A8499"
        }}>↻ Refresh</button>
      </div>

      {/* Stats */}
      {stats && (
        <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:"1.25rem" }}>
          {[
            ["Today's deals",  fmtNum(stats.total),        "#F1F5F9"],
            ["Total value",    fmtAED(stats.totalVal,true), "#38BDF8"],
            ["Sales",          fmtNum(stats.sales),         "#22C55E"],
            ["Avg deal",       fmtAED(stats.avgVal,true),   "#F1F5F9"],
          ].map(([label,value,color]) => (
            <div key={label} style={{ background:"#0D1929",borderRadius:8,padding:"10px 12px" }}>
              <div style={{ fontSize:10,color:"#9AA0AE",marginBottom:3 }}>{label}</div>
              <div style={{ fontSize:16,fontWeight:700,color }}>{value}</div>
            </div>
          ))}
        </div>
      )}

      {/* Transaction list */}
      {txns.length === 0 ? (
        <div style={{ textAlign:"center",padding:"2rem",color:"#9AA0AE",fontSize:13 }}>
          No transactions recorded today yet
        </div>
      ) : (
        <div style={{ display:"flex",flexDirection:"column",gap:0 }}>
          {txns.map((r, i) => {
            const type  = r.trans_group_en || r.transaction_type_en || "—";
            const area  = r.area_name_en   || r.area || "—";
            const val   = parseFloat(r.trans_value || r.transaction_value || 0);
            const size  = parseFloat(r.procedure_area || r.size || 0);
            const proj  = r.project_name_en || r.project || "";
            const date  = r.instance_date  || r.transaction_date || "";
            const style = TYPE_COLORS[type] || { bg:"#0D1929", color:"#7A8499" };

            return (
              <div key={i} style={{
                display:"flex",alignItems:"flex-start",justifyContent:"space-between",
                padding:"10px 0",borderBottom:"1px solid #F4F6FA",gap:12,
              }}>
                <div style={{ flex:1,minWidth:0 }}>
                  <div style={{ fontSize:13,fontWeight:600,color:"#F1F5F9",marginBottom:2 }}>
                    {fmtAED(val,true)}
                  </div>
                  <div style={{ fontSize:11,color:"#9AA0AE" }}>
                    {area}{proj ? ` · ${proj.slice(0,30)}` : ""}
                    {size > 0 ? ` · ${fmtNum(Math.round(size))}m²` : ""}
                  </div>
                  {date && (
                    <div style={{ fontSize:10,color:"#C0C6D2",marginTop:1 }}>
                      {date.slice(0,10)}
                    </div>
                  )}
                </div>
                <span style={{
                  fontSize:10,fontWeight:600,padding:"3px 8px",borderRadius:20,
                  flexShrink:0,background:style.bg,color:style.color,
                }}>{type}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
