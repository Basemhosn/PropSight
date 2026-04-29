import { useState } from "react";
import { fmtAED, fmtNum } from "../utils/format";

const METRICS = [
  { key:"total",  label:"Total value" },
  { key:"count",  label:"Transactions" },
  { key:"avg",    label:"Avg deal" },
  { key:"ppsqm",  label:"Price/m²" },
  { key:"growth", label:"YoY growth" },
];

export default function AreaRanking({ rows, areas }) {
  if (!rows || !areas) return null;
  const [metric, setMetric] = useState("total");
  const [propType, setPropType] = useState("all");

  const propTypes = ["all", ...new Set(rows.map(r => r.prop_type).filter(Boolean))].slice(0,6);

  // Build ranked list with all metrics
  const ranked = (() => {
    const filtered = propType === "all" ? rows : rows.filter(r => r.prop_type === propType);
    const map = {};
    filtered.forEach(r => {
      if (!map[r.area]) map[r.area] = { area: r.area, total:0, count:0, sizes:[], prevYear:0, currYear:0 };
      map[r.area].total += r.amount;
      map[r.area].count++;
      if (r.txn_size > 0) map[r.area].sizes.push(r.txn_size);

      // YoY: compare last two years
      if (r.dateObj) {
        const y = r.dateObj.getFullYear();
        const allYears = [...new Set(rows.map(r2 => r2.dateObj?.getFullYear()).filter(Boolean))].sort();
        const curr = allYears[allYears.length-1];
        const prev = allYears[allYears.length-2];
        if (y === curr) map[r.area].currYear += r.amount;
        if (y === prev) map[r.area].prevYear += r.amount;
      }
    });

    return Object.values(map).map(a => {
      const avg = a.count ? a.total / a.count : 0;
      const avgSize = a.sizes.length ? a.sizes.reduce((s,v)=>s+v,0)/a.sizes.length : 0;
      const ppsqm = avgSize > 0 ? avg / avgSize : 0;
      const growth = a.prevYear > 0 ? ((a.currYear - a.prevYear) / a.prevYear * 100) : null;
      return { ...a, avg, avgSize, ppsqm, growth };
    })
    .filter(a => a.count >= 5)
    .sort((a,b) => {
      if (metric === "growth") {
        if (a.growth === null) return 1;
        if (b.growth === null) return -1;
        return b.growth - a.growth;
      }
      return b[metric] - a[metric];
    })
    .slice(0, 20);
  })();

  const maxVal = ranked[0]?.[metric === "growth" ? "growth" : metric] || 1;

  const fmtVal = (a) => {
    if (metric === "total") return fmtAED(a.total, true);
    if (metric === "count") return fmtNum(a.count);
    if (metric === "avg")   return fmtAED(a.avg, true);
    if (metric === "ppsqm") return a.ppsqm > 0 ? fmtAED(a.ppsqm, true) + "/m²" : "—";
    if (metric === "growth") return a.growth !== null ? (a.growth >= 0 ? "+" : "") + a.growth.toFixed(1) + "%" : "—";
    return "—";
  };

  const getColor = (a, i) => {
    if (metric === "growth") {
      if (a.growth === null) return "#C5CAD6";
      return a.growth >= 0 ? "#22C55E" : "#E24B4A";
    }
    const blues = ["#042C53","#0C447C","#38BDF8","#378ADD","#85B7EB","#B5D4F4"];
    return blues[Math.min(i, blues.length-1)];
  };

  return (
    <div style={{ background:"var(--surface)", border:"1px solid #E8ECF2", borderRadius:12, padding:"1.25rem" }}>
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:"1rem", flexWrap:"wrap", gap:8 }}>
        <div>
          <div style={{ fontSize:13, fontWeight:600, color:"var(--text-primary)" }}>Top performing areas</div>
          <div style={{ fontSize:11, color:"#9AA0AE", marginTop:2 }}>Ranked by {METRICS.find(m=>m.key===metric)?.label.toLowerCase()}</div>
        </div>
        <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
          {METRICS.map(m => (
            <button key={m.key} onClick={() => setMetric(m.key)} style={{
              fontSize:11, padding:"4px 10px", borderRadius:6, cursor:"pointer", fontWeight:500,
              border: metric===m.key ? "1px solid #185FA5" : "1px solid #E8ECF2",
              background: metric===m.key ? "rgba(59,130,246,0.1)" : "var(--surface)",
              color: metric===m.key ? "#38BDF8" : "#7A8499",
            }}>{m.label}</button>
          ))}
        </div>
      </div>

      {/* Property type filter */}
      <div style={{ display:"flex", gap:4, marginBottom:"1rem", flexWrap:"wrap" }}>
        {propTypes.map(p => (
          <button key={p} onClick={() => setPropType(p)} style={{
            fontSize:11, padding:"3px 10px", borderRadius:20, cursor:"pointer",
            border: propType===p ? "1px solid #0A1628" : "1px solid #E8ECF2",
            background: propType===p ? "var(--text-primary)" : "var(--surface)",
            color: propType===p ? "var(--surface)" : "#9AA0AE",
          }}>{p === "all" ? "All types" : p}</button>
        ))}
      </div>

      {/* Rankings list */}
      <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
        {ranked.map((a, i) => {
          const val = metric === "growth" ? (a.growth ?? 0) : a[metric];
          const barW = maxVal ? Math.max(4, Math.abs(val) / Math.abs(maxVal) * 100) : 4;
          return (
            <div key={a.area} style={{ display:"flex", alignItems:"center", gap:10 }}>
              {/* Rank */}
              <div style={{ width:22, fontSize:11, fontWeight:700, color: i < 3 ? "#38BDF8" : "#C5CAD6", textAlign:"right", flexShrink:0 }}>
                {i+1}
              </div>
              {/* Area name */}
              <div style={{ width:148, fontSize:12, color:"var(--text-primary)", flexShrink:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                {a.area}
              </div>
              {/* Bar */}
              <div style={{ flex:1, height:8, background:"var(--bg)", borderRadius:4, overflow:"hidden" }}>
                <div style={{ width:`${barW}%`, height:"100%", background:getColor(a,i), borderRadius:4, transition:"width 0.3s" }} />
              </div>
              {/* Value */}
              <div style={{ width:90, fontSize:12, fontWeight:600, color: metric==="growth" && a.growth !== null ? (a.growth>=0 ? "#22C55E":"#A32D2D") : "var(--text-primary)", textAlign:"right", flexShrink:0 }}>
                {fmtVal(a)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
