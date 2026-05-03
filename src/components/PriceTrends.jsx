import { useState, useMemo } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, Legend
} from "recharts";
import { fmtAED } from "../utils/format";

const COLORS = ["#38BDF8","#22C55E","#D85A30","#BA7517","#993556","#534AB7","#3b6d11","#d4537e"];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div style={{ background:"var(--text-primary)", color:"var(--surface)", borderRadius:8, padding:"10px 14px", fontSize:12, minWidth:200 }}>
      <div style={{ fontWeight:600, marginBottom:6 }}>{label}</div>
      {payload.map((p,i) => (
        <div key={i} style={{ color:p.color, marginBottom:3 }}>
          {p.name}: <span style={{ color:"var(--surface)", fontWeight:600 }}>{fmtAED(p.value, true)}/m²</span>
        </div>
      ))}
    </div>
  );
};

export default function PriceTrends({ rows, priceTrend }) {
  const [mode, setMode] = useState("market");
  const [selectedAreas, setSelectedAreas] = useState([]);

  const topAreas = useMemo(() => {
    const map = {};
    (rows||[]).forEach(r => {
      if (r.txn_size > 0 && r.amount > 0) {
        map[r.area] = (map[r.area] || 0) + 1;
      }
    });
    return Object.entries(map).sort((a,b) => b[1]-a[1]).slice(0,8).map(([a]) => a);
  }, [rows]);

  const marketData = useMemo(() => {
    if (priceTrend && priceTrend.length) return priceTrend;
    const map = {};
    (rows||[]).forEach(r => {
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

  const areaData = useMemo(() => {
    const areas = selectedAreas.length ? selectedAreas : topAreas.slice(0,4);
    const map = {};
    (rows||[]).forEach(r => {
      if (!r.dateObj || r.txn_size <= 0 || r.amount <= 0) return;
      if (!areas.includes(r.area)) return;
      const y = r.dateObj.getFullYear();
      if (y < 2010) return;
      const key = String(y);
      if (!map[key]) map[key] = { year: key };
      if (!map[key]["_"+r.area]) map[key]["_"+r.area] = [];
      map[key]["_"+r.area].push(r.amount / r.txn_size);
    });
    const result = Object.values(map).map(d => {
      const out = { year: d.year };
      areas.forEach(a => {
        const vals = d["_"+a] || [];
        if (vals.length) out[a] = Math.round(vals.reduce((s,v)=>s+v,0)/vals.length);
      });
      return out;
    }).sort((a,b) => a.year.localeCompare(b.year));
    return { data: result, areas };
  }, [rows, selectedAreas, topAreas]);

  if (!rows || !priceTrend) return null;

  const toggleArea = (area) => {
    setSelectedAreas(prev =>
      prev.includes(area) ? prev.filter(a => a !== area) : [...prev, area].slice(0,6)
    );
  };

  return (
    <div style={{ background:"var(--surface)", border:"1px solid #E8ECF2", borderRadius:12, padding:"1.25rem" }}>
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:"1rem", flexWrap:"wrap", gap:8 }}>
        <div>
          <div style={{ fontSize:13, fontWeight:600, color:"var(--text-primary)" }}>Price per m² trends</div>
          <div style={{ fontSize:11, color:"#9AA0AE", marginTop:2 }}>Historical price/sqm over time</div>
        </div>
        <div style={{ display:"flex", gap:4 }}>
          {[{k:"market",l:"Market"},{k:"area",l:"By area"}].map(tabOpt => (
            <button key={tabOpt.k} onClick={() => setMode(tabOpt.k)} style={{
              fontSize:11, padding:"4px 10px", borderRadius:6, cursor:"pointer", fontWeight:500,
              border: mode===tabOpt.k ? "1px solid #185FA5" : "1px solid #E8ECF2",
              background: mode===tabOpt.k ? "rgba(59,130,246,0.1)" : "var(--surface)",
              color: mode===tabOpt.k ? "#185FA5" : "#7A8499", fontFamily:"system-ui",
            }}>{tabOpt.l}</button>
          ))}
        </div>
      </div>

      {mode === "area" && (
        <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:12 }}>
          {topAreas.map(area => (
            <button key={area} onClick={() => toggleArea(area)} style={{
              fontSize:10, padding:"3px 10px", borderRadius:20, cursor:"pointer",
              fontFamily:"system-ui", fontWeight:500,
              background: selectedAreas.includes(area) ? "rgba(59,130,246,0.12)" : "var(--surface)",
              border: selectedAreas.includes(area) ? "1px solid #38BDF8" : "1px solid #E8ECF2",
              color: selectedAreas.includes(area) ? "#38BDF8" : "#7A8499",
            }}>{area}</button>
          ))}
        </div>
      )}

      <ResponsiveContainer width="100%" height={220}>
        {mode === "market" ? (
          <LineChart data={marketData} margin={{ top:4, right:8, left:0, bottom:0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
            <XAxis dataKey="year" tick={{ fontSize:10, fill:"#9AA0AE" }} />
            <YAxis tickFormatter={v => "AED "+Math.round(v/1000)+"k"} tick={{ fontSize:10, fill:"#9AA0AE" }} width={64} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="ppsqm" name="Dubai Avg" stroke="#38BDF8" strokeWidth={2} dot={{ r:3 }} activeDot={{ r:5 }} />
          </LineChart>
        ) : (
          <LineChart data={areaData.data || []} margin={{ top:4, right:8, left:0, bottom:0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
            <XAxis dataKey="year" tick={{ fontSize:10, fill:"#9AA0AE" }} />
            <YAxis tickFormatter={v => "AED "+Math.round(v/1000)+"k"} tick={{ fontSize:10, fill:"#9AA0AE" }} width={64} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize:10 }} />
            {(areaData.areas || []).map((area, i) => (
              <Line key={area} type="monotone" dataKey={area} stroke={COLORS[i % COLORS.length]} strokeWidth={2} dot={{ r:2 }} activeDot={{ r:4 }} />
            ))}
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
