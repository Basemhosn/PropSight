import { useState } from "react";
import { fmtAED, fmtNum } from "../utils/format";

const DUBAI_SKYLINE = "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80&auto=format&fit=crop";

export default function ProjectCard({ project, data, onClick, index }) {
  const [imgError, setImgError] = useState(false);
  const kpis = data.kpis;
  const offPct = kpis.count ? ((kpis.offPlan / kpis.count) * 100).toFixed(0) : 0;
  const imgSrc = imgError ? DUBAI_SKYLINE : (data.image || DUBAI_SKYLINE);

  return (
    <div onClick={onClick} style={{
      background:"#0D1929", border:"1px solid #E8ECF2", borderRadius:12,
      overflow:"hidden", cursor:"pointer",
      transition:"transform 0.15s, box-shadow 0.15s",
      display:"flex", flexDirection:"column",
    }}
    onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,0.1)";}}
    onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="";}}
    >
      <div style={{ height:160, overflow:"hidden", position:"relative", flexShrink:0 }}>
        <img src={imgSrc} alt={project}
          onError={() => setImgError(true)}
          style={{ width:"100%", height:"100%", objectFit:"cover" }} />
        <div style={{
          position:"absolute", top:8, right:8,
          background: offPct >= 50 ? "rgba(24,95,165,0.9)" : "rgba(29,158,117,0.9)",
          color:"#0D1929", fontSize:10, fontWeight:600, padding:"3px 8px", borderRadius:20,
        }}>
          {offPct >= 50 ? `${offPct}% Off-Plan` : `${100-parseInt(offPct)}% Ready`}
        </div>
      </div>

      <div style={{ padding:"0.875rem", flex:1 }}>
        <div style={{
          fontSize:13, fontWeight:600, color:"#F1F5F9", marginBottom:3, lineHeight:1.3,
          overflow:"hidden", textOverflow:"ellipsis", display:"-webkit-box",
          WebkitLineClamp:2, WebkitBoxOrient:"vertical",
        }}>{project}</div>
        <div style={{ fontSize:11, color:"#9AA0AE", marginBottom:"0.75rem" }}>{data.area}</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6 }}>
          {[
            ["Transactions", fmtNum(kpis.count), "#F1F5F9"],
            ["Total value",  fmtAED(kpis.total,true), "#38BDF8"],
            ["Avg deal",     fmtAED(kpis.avg,true), "#F1F5F9"],
            ["Price/m²",     kpis.ppsqm>0 ? fmtAED(kpis.ppsqm,true) : "—", "#22C55E"],
          ].map(([label,value,color]) => (
            <div key={label} style={{ background:"#0D1929", borderRadius:6, padding:"6px 8px" }}>
              <div style={{ fontSize:10, color:"#9AA0AE" }}>{label}</div>
              <div style={{ fontSize:13, fontWeight:600, color }}>{value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
