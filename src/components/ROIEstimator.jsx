import { useState, useMemo } from "react";
import { fmtAED, fmtNum } from "../utils/format";

// Dubai avg gross rental yields by area (from market benchmarks)
const YIELD_BENCHMARKS = {
  "Jumeirah Village Circle": 7.2,
  "Business Bay": 5.8,
  "Dubai Marina": 5.5,
  "Downtown Dubai": 4.9,
  "Palm Jumeirah": 4.3,
  "Dubai Silicon Oasis": 7.8,
  "International City": 8.9,
  "Al Barsha": 6.1,
  "Jumeirah Lake Towers": 6.8,
  "Discovery Gardens": 7.5,
  "Dubai Sports City": 7.1,
  "Arjan": 7.4,
};
const DEFAULT_YIELD = 6.0;

export default function ROIEstimator({ rows, areas }) {
  const [selectedArea, setSelectedArea] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [annualRent, setAnnualRent] = useState("");
  const [serviceChargePct, setServiceChargePct] = useState(1.5);
  const [holdYears, setHoldYears] = useState(5);
  const [growthPct, setGrowthPct] = useState(5);

  // Area stats from data
  const areaStats = useMemo(() => {
    const map = {};
    rows.forEach(r => {
      if (!map[r.area]) map[r.area] = { count:0, total:0, sizes:[] };
      map[r.area].count++;
      map[r.area].total += r.amount;
      if (r.txn_size > 0) map[r.area].sizes.push(r.txn_size);
    });
    return Object.entries(map).map(([area, d]) => {
      const avg = d.count ? d.total/d.count : 0;
      const avgSize = d.sizes.length ? d.sizes.reduce((s,v)=>s+v,0)/d.sizes.length : 0;
      const ppsqm = avgSize > 0 ? avg/avgSize : 0;
      return { area, avg, avgSize, ppsqm, count: d.count };
    }).sort((a,b) => b.count - a.count);
  }, [rows]);

  const topAreas = areaStats.slice(0, 20);

  const currentArea = areaStats.find(a => a.area === selectedArea);
  const estYield = YIELD_BENCHMARKS[selectedArea] || DEFAULT_YIELD;

  // Compute from inputs or estimates
  const price = parseFloat(purchasePrice.replace(/,/g,"")) || currentArea?.avg || 0;
  const rent  = parseFloat(annualRent.replace(/,/g,"")) || (price * estYield / 100);
  const serviceCharge = price * serviceChargePct / 100;
  const netAnnualIncome = rent - serviceCharge;
  const grossYield = price > 0 ? (rent / price * 100) : 0;
  const netYield   = price > 0 ? (netAnnualIncome / price * 100) : 0;

  // Capital appreciation
  const futureValue = price * Math.pow(1 + growthPct/100, holdYears);
  const capitalGain = futureValue - price;
  const totalReturn = capitalGain + (netAnnualIncome * holdYears);
  const totalROI    = price > 0 ? (totalReturn / price * 100) : 0;
  const annualROI   = holdYears > 0 ? totalROI / holdYears : 0;

  const card = (label, value, sub, color="var(--text-primary)") => (
    <div style={{ background:"var(--surface)", borderRadius:8, padding:"0.75rem 1rem" }}>
      <div style={{ fontSize:11, color:"#9AA0AE", marginBottom:4 }}>{label}</div>
      <div style={{ fontSize:18, fontWeight:700, color }}>{value}</div>
      {sub && <div style={{ fontSize:11, color:"#9AA0AE", marginTop:2 }}>{sub}</div>}
    </div>
  );

  return (
    <div style={{ background:"var(--surface)", border:"1px solid #E8ECF2", borderRadius:12, padding:"1.25rem" }}>
      <div style={{ marginBottom:"1rem" }}>
        <div style={{ fontSize:13, fontWeight:600, color:"var(--text-primary)" }}>ROI & yield estimator</div>
        <div style={{ fontSize:11, color:"#9AA0AE", marginTop:2 }}>Estimate rental yield and return on investment</div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:"1.25rem" }}>
        {/* Area selector */}
        <div style={{ gridColumn:"1/-1" }}>
          <label style={{ fontSize:11, color:"#7A8499", display:"block", marginBottom:4 }}>Area</label>
          <select value={selectedArea} onChange={e => setSelectedArea(e.target.value)}
            style={{ width:"100%", fontSize:12, padding:"7px 10px", borderRadius:8, border:"1px solid #E8ECF2", background:"var(--surface)", color:"var(--text-primary)" }}>
            <option value="">Select an area…</option>
            {topAreas.map(a => (
              <option key={a.area} value={a.area}>{a.area} — avg {fmtAED(a.avg, true)}</option>
            ))}
          </select>
        </div>

        {/* Purchase price */}
        <div>
          <label style={{ fontSize:11, color:"#7A8499", display:"block", marginBottom:4 }}>
            Purchase price (AED)
          </label>
          <input value={purchasePrice}
            onChange={e => setPurchasePrice(e.target.value)}
            placeholder={currentArea ? fmtNum(Math.round(currentArea.avg)) : "e.g. 1,200,000"}
            style={{ width:"100%", fontSize:12, padding:"7px 10px", borderRadius:8, border:"1px solid #E8ECF2", background:"var(--surface)", color:"var(--text-primary)", boxSizing:"border-box" }}
          />
          {currentArea && !purchasePrice && (
            <div style={{ fontSize:10, color:"#9AA0AE", marginTop:3 }}>Using area avg: {fmtAED(currentArea.avg, true)}</div>
          )}
        </div>

        {/* Annual rent */}
        <div>
          <label style={{ fontSize:11, color:"#7A8499", display:"block", marginBottom:4 }}>
            Annual rent (AED)
          </label>
          <input value={annualRent}
            onChange={e => setAnnualRent(e.target.value)}
            placeholder={price > 0 ? fmtNum(Math.round(price * estYield / 100)) : "e.g. 80,000"}
            style={{ width:"100%", fontSize:12, padding:"7px 10px", borderRadius:8, border:"1px solid #E8ECF2", background:"var(--surface)", color:"var(--text-primary)", boxSizing:"border-box" }}
          />
          {!annualRent && (
            <div style={{ fontSize:10, color:"#9AA0AE", marginTop:3 }}>Est. {estYield}% yield benchmark</div>
          )}
        </div>

        {/* Service charge */}
        <div>
          <label style={{ fontSize:11, color:"#7A8499", display:"block", marginBottom:4 }}>
            Service charge: {serviceChargePct}% / yr
          </label>
          <input type="range" min="0.5" max="5" step="0.5" value={serviceChargePct}
            onChange={e => setServiceChargePct(parseFloat(e.target.value))}
            style={{ width:"100%" }} />
        </div>

        {/* Hold period */}
        <div>
          <label style={{ fontSize:11, color:"#7A8499", display:"block", marginBottom:4 }}>
            Hold period: {holdYears} years
          </label>
          <input type="range" min="1" max="20" step="1" value={holdYears}
            onChange={e => setHoldYears(parseInt(e.target.value))}
            style={{ width:"100%" }} />
        </div>

        {/* Growth rate */}
        <div style={{ gridColumn:"1/-1" }}>
          <label style={{ fontSize:11, color:"#7A8499", display:"block", marginBottom:4 }}>
            Annual capital growth: {growthPct}%
          </label>
          <input type="range" min="0" max="15" step="0.5" value={growthPct}
            onChange={e => setGrowthPct(parseFloat(e.target.value))}
            style={{ width:"100%" }} />
        </div>
      </div>

      {/* Results */}
      {price > 0 ? (
        <>
          <div style={{ borderTop:"1px solid #F0F2F6", paddingTop:"1rem", marginBottom:"1rem" }}>
            <div style={{ fontSize:11, fontWeight:600, color:"#7A8499", textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:8 }}>Yield</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
              {card("Gross yield", grossYield.toFixed(2)+"%", fmtAED(rent,true)+" / yr", "#38BDF8")}
              {card("Net yield", netYield.toFixed(2)+"%", "After service charges", netYield >= 6 ? "#22C55E" : "#BA7517")}
            </div>
          </div>

          <div style={{ borderTop:"1px solid #F0F2F6", paddingTop:"1rem" }}>
            <div style={{ fontSize:11, fontWeight:600, color:"#7A8499", textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:8 }}>
              {holdYears}-year projection
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
              {card("Future value", fmtAED(futureValue,true), `+${fmtAED(capitalGain,true)} gain`, "#22C55E")}
              {card("Total return", fmtAED(totalReturn,true), `${totalROI.toFixed(1)}% total ROI`, "#534AB7")}
              {card("Annual ROI", annualROI.toFixed(2)+"%", "Capital + rental", "#38BDF8")}
              {card("Break-even rent", fmtAED(serviceCharge + price * 0.04,true), "Min rent for 4% net", "#7A8499")}
            </div>
          </div>

          <div style={{ marginTop:"1rem", fontSize:10, color:"#C5CAD6", lineHeight:1.5 }}>
            * Estimates only. Excludes DLD fees (4%), agent fees (2%), mortgage interest, and taxes. Rental benchmarks sourced from market data.
          </div>
        </>
      ) : (
        <div style={{ textAlign:"center", padding:"2rem", color:"#9AA0AE", fontSize:13 }}>
          Select an area or enter a purchase price to see estimates
        </div>
      )}
    </div>
  );
}
