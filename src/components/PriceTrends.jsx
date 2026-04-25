import { useState, useMemo } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, Legend
} from "recharts";
import { fmtAED } from "../utils/format";

const COLORS = ["#38BDF8","#22C55E","#D85A30","#BA7517","#993556","#534AB7","#3b6d11","#d4537e"];

const CustomTooltip = ({ active, payload, label }) => {
  return (
    <div style={{ background:"#F1F5F9", color:"#0D1929", borderRadius:8, padding:"10px 14px", fontSize:12, minWidth:200 }}>
      <div style={{ fontWeight:600, marginBottom:6 }}>{label}</div>
      {payload.map((p,i) => (
        <div key={i} style={{ color:p.color, marginBottom:3 }}>
          {p.name}: <span style={{ color:"#0D1929", fontWeight:600 }}>{fmtAED(p.value, true)}/m²</span>
        </div>
      ))}
    </div>
  );
};

export default function PriceTrends({ rows, priceTrend }) {
  if (!rows || !priceTrend) return null;
  const [mode, setMode] = useState("market"); // market | area
  const [selectedAreas, setSelectedAreas] = useState([]);

  // Get top areas by transaction count
  const topAreas = useMemo(() => {
    const map = {};
    rows.forEach(r => {
      if (r.txn_size > 0 && r.amount > 0) {
        map[r.area] = (map[r.area] || 0) + 1;
      }
    });
    return Object.entries(map).sort((a,b) => b[1]-a[1]).slice(0,8).map(([a]) => a);
  }, [rows]);

  // Market-wide price/sqm by year — use precomputed if available
  const marketData = useMemo(() => {
    if (priceTrend && priceTrend.length) return priceTrend;
    const map = {};
    rows.forEach(r => {
      if (!r.dateObj || r.txn_size <= 0 || r.amount <= 0) return;
      const y = r.dateObj.getFullYear();
      if (y < 2008) return;
      if (!map[y]) map[y] = { year: String(y), vals: [] };
      map[y].vals.push(r.amount / r.txn_size);
    });
    return Object.values(map)
      .map(d => ({ year: d.year, ppsqm: Math.round(d.vals.reduce((s,v)=>s+v,0)/d.vals.length) }))
      .filter(d => d.ppsqm > 0 && d.ppsqm < 200000)
      .sort((a,b) => a.year.localeCompare(b.year));
  }, [rows, priceTrend]);

  // Per-area price/sqm by year
  const areaData = useMemo(() => {
    const areas = selectedAreas.length ? selectedAreas : topAreas.slice(0,4);
    const map = {};
    rows.forEach(r => {
      if (!r.dateObj || r.txn_size <= 0 || r.amount <= 0) return;
      if (!areas.includes(r.area)) return;
      const y = r.dateObj.getFullYear();
      if (y < 2010) return;
      const key = String(y);
      if (!map[key]) map[key] = { year: key };
      if (!map[key][`_${r.area}`]) map[key][`_${r.area}`] = [];
      map[key][`_${r.area}`].push(r.amount / r.txn_size);
    });
    const result = Object.values(map).map(d => {
      const out = { year: d.year };
      areas.forEach(a => {
        const vals = d[`_${a}`] || [];
        if (vals.length) out[a] = Math.round(vals.reduce((s,v)=>s+v,0)/vals.length);
      });
      return out;
    }).sort((a,b) => a.year.localeCompare(b.year));
    return { data: result, areas };
  }, [rows, selectedAreas, topAreas]);

  const toggleArea = (area) => {
    setSelectedAreas(prev =>
      prev.includes(area) ? prev.filter(a => a !== area) : [...prev, area].slice(0,6)
    );
  };

  return (
    <div style={{ background:"#0D1929", border:"1px solid #E8ECF2", borderRadius:12, padding:"1.25rem" }}>
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:"1rem", flexWrap:"wrap", gap:8 }}>
        <div>
          <div style={{ fontSize:13, fontWeight:600, color:"#F1F5F9" }}>Price per m² trends</div>
          <div style={{ fontSize:11, color:"#9AA0AE", marginTop:2 }}>Historical price/sqm over time</div>
        </div>
        <div style={{ display:"flex", gap:4 }}>
          {[{k:"market",l:"Market"},{k:"area",l:"By area"}].map(t => (
            <button key={t.k} onClick={() => setMode(t.k)} style={{
              fontSize:11, padding:"4px 10px", borderRadius:6, cursor:"pointer", fontWeight:500,
              border: mode===t.k ? "1px solid #185FA5" : "1px solid #E8ECF2",
              background: mode===t.k ? "rgba(59,130,246,0.1)" : "#0D1929",
              color: mode===t.k ? "#38BDF8" : "#7A8499",
            }}>{t.l}</button>
          ))}
        </div>
      </div>

      {mode === "area" && (
        <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:"1rem" }}>
          {topAreas.map((a,i) => {
            const sel = selectedAreas.includes(a) || (!selectedAreas.length && i < 4);
            return (
              <button key={a} onClick={() => toggleArea(a)} style={{
                fontSize:11, padding:"3px 10px", borderRadius:20, cursor:"pointer",
                border: sel ? `1px solid ${COLORS[i%COLORS.length]}` : "1px solid #E8ECF2",
                background: sel ? COLORS[i%COLORS.length]+"18" : "#0D1929",
                color: sel ? COLORS[i%COLORS.length] : "#9AA0AE", fontWeight: sel ? 600 : 400,
              }}>{a}</button>
            );
          })}
        </div>
      )}

      <ResponsiveContainer width="100%" height={280}>
        {mode === "market" ? (
          <LineChart data={marketData} margin={{ top:4, right:16, left:0, bottom:0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(59,130,246,0.08)" />
            <XAxis dataKey="year" tick={{ fontSize:11, fill:"#9AA0AE" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize:10, fill:"#9AA0AE" }} axisLine={false} tickLine={false}
              tickFormatter={v => fmtAED(v,true)} width={72} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="ppsqm" stroke="#38BDF8" strokeWidth={2.5}
              dot={{ r:3, fill:"#38BDF8" }} activeDot={{ r:5 }} name="Market avg" />
          </LineChart>
        ) : (
          <LineChart data={areaData.data} margin={{ top:4, right:16, left:0, bottom:0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(59,130,246,0.08)" />
            <XAxis dataKey="year" tick={{ fontSize:11, fill:"#9AA0AE" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize:10, fill:"#9AA0AE" }} axisLine={false} tickLine={false}
              tickFormatter={v => fmtAED(v,true)} width={72} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize:11 }} />
            {areaData.areas.map((a,i) => (
              <Line key={a} type="monotone" dataKey={a} stroke={COLORS[i%COLORS.length]}
                strokeWidth={2} dot={false} activeDot={{ r:4 }} />
            ))}
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
