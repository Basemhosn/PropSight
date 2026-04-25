import { useState } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
         CartesianGrid, PieChart, Pie, Cell } from "recharts";
import { fmtAED, fmtNum } from "../utils/format";

const REG_EXPAND  = {Off:"Off-Plan",Rea:"Ready"};
const USG_EXPAND  = {Res:"Residential",Com:"Commercial",Mul:"Multi-Use",Agr:"Agricultural",Hos:"Hospitality",Ind:"Industrial",Oth:"Other"};
const COLORS = ["#38BDF8","#22C55E","#D85A30","#BA7517","#993556","#534AB7"];

function expandRow(r) {
  let dateObj = null;
  if (r.d?.length >= 10) {
    const [y,m,d] = r.d.split("-");
    const dt = new Date(+y,+m-1,+d);
    if (!isNaN(dt.getTime())) dateObj = dt;
  }
  return { txn_num:r.n||"", date:r.d||"", dateObj, month:r.m||"", type:r.t||"Other",
    reg:REG_EXPAND[r.r]||r.r||"", usage:USG_EXPAND[r.u]||r.u||"Other",
    area:r.a||"Unknown", prop_type:r.p||"Other", amount:r.v||0, txn_size:r.s||0,
    rooms:r.b||"", metro:r.e||"", project:r.j||"" };
}

function KPI({ label, value, sub, color="#F1F5F9" }) {
  return (
    <div style={{ background:"#0D1929", borderRadius:8, padding:"0.6rem 0.75rem" }}>
      <div style={{ fontSize:10, color:"#9AA0AE", marginBottom:3 }}>{label}</div>
      <div style={{ fontSize:16, fontWeight:700, color }}>{value}</div>
      {sub && <div style={{ fontSize:10, color:"#9AA0AE", marginTop:1 }}>{sub}</div>}
    </div>
  );
}

export default function ProjectDetail({ project, data, onClose }) {
  const [imgSrc, setImgSrc] = useState(data.image);
  const [imgError, setImgError] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);

  const FALLBACKS = [
    data.image,
    `https://source.unsplash.com/800x500/?${encodeURIComponent((data.imageQuery||project)+' Dubai')}`,
  ];

  const handleImgError = () => {
    const next = attemptCount + 1;
    if (next < FALLBACKS.length) {
      setImgSrc(FALLBACKS[next]);
      setAttemptCount(next);
    } else {
      setImgError(true);
    }
  };
  const [tab, setTab] = useState("overview");
  const [txnSearch, setTxnSearch] = useState("");

  if (!data) return null;

  const kpis = data.kpis;
  const offPct  = kpis.count ? ((kpis.offPlan/kpis.count)*100).toFixed(1) : 0;
  const readyPct = (100 - parseFloat(offPct)).toFixed(1);
  const typeData = Object.entries(data.types||{}).map(([name,value])=>({name,value}));
  const regData  = [{name:"Off-Plan",value:kpis.offPlan},{name:"Ready",value:kpis.ready}];

  const expandedTxns = (data.recent||[]).map(expandRow);
  const filteredTxns = txnSearch
    ? expandedTxns.filter(r => r.rooms?.toLowerCase().includes(txnSearch.toLowerCase()) ||
        r.prop_type?.toLowerCase().includes(txnSearch.toLowerCase()) ||
        r.txn_num?.toLowerCase().includes(txnSearch.toLowerCase()))
    : expandedTxns;

  const TABS = [
    { id:"overview", label:"Overview" },
    { id:"price",    label:"Prices" },
    { id:"units",    label:"Units" },
    { id:"txns",     label:"Transactions" },
  ];

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{ position:"fixed",inset:0,background:"rgba(10,22,40,0.4)",zIndex:190 }} />

      {/* Panel */}
      <div style={{ position:"fixed",right:0,top:0,bottom:0,width:480,background:"#0D1929",
        zIndex:200,overflowY:"auto",display:"flex",flexDirection:"column" }}>

        {/* Hero image */}
        <div style={{ height:200,flexShrink:0,position:"relative",overflow:"hidden" }}>
          {!imgError && data.image ? (
            <img src={imgSrc} alt={project} onError={handleImgError}
              style={{ width:"100%",height:"100%",objectFit:"cover" }} />
          ) : (
            <div style={{ width:"100%",height:"100%",background:"linear-gradient(135deg,#0A1628 0%,#185FA5 100%)",
              display:"flex",alignItems:"center",justifyContent:"center",padding:"1.5rem" }}>
              <div style={{ fontSize:18,fontWeight:700,color:"#0D1929",textAlign:"center",lineHeight:1.4 }}>{project}</div>
            </div>
          )}
          {/* Gradient overlay */}
          <div style={{ position:"absolute",inset:0,background:"linear-gradient(to top,rgba(10,22,40,0.7) 0%,transparent 60%)" }} />
          {/* Close btn */}
          <button onClick={onClose} style={{ position:"absolute",top:12,right:12,background:"rgba(255,255,255,0.2)",
            border:"none",borderRadius:"50%",width:32,height:32,cursor:"pointer",color:"#0D1929",
            fontSize:18,display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(4px)" }}>×</button>
          {/* Project name overlay */}
          <div style={{ position:"absolute",bottom:12,left:16,right:48 }}>
            <div style={{ fontSize:16,fontWeight:700,color:"#0D1929",lineHeight:1.3,marginBottom:3 }}>{project}</div>
            <div style={{ fontSize:11,color:"rgba(255,255,255,0.7)" }}>{data.area}</div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display:"flex",borderBottom:"1px solid #E8ECF2",flexShrink:0 }}>
          {TABS.map(t => (
            <button key={t.id} onClick={()=>setTab(t.id)} style={{
              flex:1,padding:"10px 0",fontSize:12,fontWeight:tab===t.id?600:400,
              color:tab===t.id?"#38BDF8":"#7A8499",background:"none",border:"none",cursor:"pointer",
              borderBottom:tab===t.id?"2px solid #185FA5":"2px solid transparent",
            }}>{t.label}</button>
          ))}
        </div>

        {/* Content */}
        <div style={{ padding:"1.25rem",flex:1 }}>

          {/* ── OVERVIEW ── */}
          {tab === "overview" && (
            <>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:"1.25rem" }}>
                <KPI label="Transactions"   value={fmtNum(kpis.count)}        />
                <KPI label="Total value"    value={fmtAED(kpis.total,true)}   color="#38BDF8" />
                <KPI label="Avg deal"       value={fmtAED(kpis.avg,true)}     />
                <KPI label="Avg size"       value={kpis.avgSize>0?kpis.avgSize+"m²":"—"} />
                <KPI label="Price/m²"       value={kpis.ppsqm>0?fmtAED(kpis.ppsqm,true):"—"} color="#22C55E" />
                <KPI label="Off-plan"       value={offPct+"%"}                color="#38BDF8" />
              </div>

              {/* Price range */}
              <div style={{ background:"#0D1929",borderRadius:8,padding:"0.875rem",marginBottom:"1.25rem" }}>
                <div style={{ fontSize:11,color:"#9AA0AE",marginBottom:8 }}>Price range (2020–2026)</div>
                <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between" }}>
                  <div>
                    <div style={{ fontSize:10,color:"#9AA0AE" }}>Min</div>
                    <div style={{ fontSize:14,fontWeight:600,color:"#22C55E" }}>{fmtAED(kpis.minPrice,true)}</div>
                  </div>
                  <div style={{ flex:1,height:4,background:"linear-gradient(to right,#1D9E75,#185FA5)",borderRadius:2,margin:"0 12px" }} />
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontSize:10,color:"#9AA0AE" }}>Max</div>
                    <div style={{ fontSize:14,fontWeight:600,color:"#38BDF8" }}>{fmtAED(kpis.maxPrice,true)}</div>
                  </div>
                </div>
              </div>

              {/* Off-plan split */}
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:"1.25rem" }}>
                <div style={{ background:"rgba(59,130,246,0.1)",borderRadius:8,padding:"0.75rem",textAlign:"center" }}>
                  <div style={{ fontSize:11,color:"#7A8499" }}>Off-plan</div>
                  <div style={{ fontSize:22,fontWeight:700,color:"#38BDF8" }}>{offPct}%</div>
                  <div style={{ fontSize:11,color:"#7A8499" }}>{fmtNum(kpis.offPlan)} deals</div>
                </div>
                <div style={{ background:"rgba(34,197,94,0.1)",borderRadius:8,padding:"0.75rem",textAlign:"center" }}>
                  <div style={{ fontSize:11,color:"#7A8499" }}>Ready</div>
                  <div style={{ fontSize:22,fontWeight:700,color:"#22C55E" }}>{readyPct}%</div>
                  <div style={{ fontSize:11,color:"#7A8499" }}>{fmtNum(kpis.ready)} deals</div>
                </div>
              </div>

              {/* Monthly trend */}
              <div style={{ fontSize:12,fontWeight:600,color:"#F1F5F9",marginBottom:8 }}>Monthly volume</div>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={data.monthly} margin={{top:0,right:0,left:0,bottom:0}}>
                  <XAxis dataKey="month" tick={{fontSize:9,fill:"#9AA0AE"}} axisLine={false} tickLine={false}
                    tickFormatter={m=>{const[,mo]=m.split('-');return['J','F','M','A','M','J','J','A','S','O','N','D'][+mo-1];}} />
                  <YAxis hide />
                  <Tooltip formatter={(v)=>[fmtNum(v),'Txns']} contentStyle={{background:"#F1F5F9",border:"none",borderRadius:8,color:"#0D1929",fontSize:11}} />
                  <Bar dataKey="count" fill="#38BDF8" radius={[2,2,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </>
          )}

          {/* ── PRICES ── */}
          {tab === "price" && (
            <>
              <div style={{ fontSize:12,fontWeight:600,color:"#F1F5F9",marginBottom:8 }}>Price per m² by year</div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={data.priceTrend} margin={{top:4,right:16,left:0,bottom:0}}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(59,130,246,0.08)" />
                  <XAxis dataKey="year" tick={{fontSize:11,fill:"#9AA0AE"}} axisLine={false} tickLine={false} />
                  <YAxis tick={{fontSize:10,fill:"#9AA0AE"}} axisLine={false} tickLine={false} tickFormatter={v=>fmtAED(v,true)} width={72} />
                  <Tooltip formatter={(v)=>[fmtAED(v,true)+'/m²','Price']} contentStyle={{background:"#F1F5F9",border:"none",borderRadius:8,color:"#0D1929",fontSize:11}} />
                  <Line type="monotone" dataKey="ppsqm" stroke="#22C55E" strokeWidth={2.5} dot={{r:4,fill:"#22C55E"}} />
                </LineChart>
              </ResponsiveContainer>

              <div style={{ marginTop:"1.25rem",fontSize:12,fontWeight:600,color:"#F1F5F9",marginBottom:8 }}>Transaction type split</div>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={typeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60}
                    label={({name,percent})=>`${name} ${(percent*100).toFixed(0)}%`} labelLine={false} fontSize={11}>
                    {typeData.map((_,i)=><Cell key={i} fill={COLORS[i%COLORS.length]} />)}
                  </Pie>
                  <Tooltip formatter={(v)=>[fmtNum(v),'Deals']} contentStyle={{background:"#F1F5F9",border:"none",borderRadius:8,color:"#0D1929",fontSize:11}} />
                </PieChart>
              </ResponsiveContainer>

              <div style={{ marginTop:"1.25rem",fontSize:12,fontWeight:600,color:"#F1F5F9",marginBottom:8 }}>Price range summary</div>
              {[
                ["Minimum price", fmtAED(kpis.minPrice)],
                ["Maximum price", fmtAED(kpis.maxPrice)],
                ["Average price", fmtAED(kpis.avg)],
                ["Avg price/m²", kpis.ppsqm>0?fmtAED(kpis.ppsqm)+"/m²":"—"],
                ["Avg unit size", kpis.avgSize>0?kpis.avgSize+" m²":"—"],
              ].map(([label,value])=>(
                <div key={label} style={{ display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #F4F6FA" }}>
                  <div style={{ fontSize:12,color:"#7A8499" }}>{label}</div>
                  <div style={{ fontSize:12,color:"#F1F5F9",fontWeight:500 }}>{value}</div>
                </div>
              ))}
            </>
          )}

          {/* ── UNITS ── */}
          {tab === "units" && (
            <>
              <div style={{ fontSize:12,fontWeight:600,color:"#F1F5F9",marginBottom:"1rem" }}>Unit breakdown by bedroom type</div>
              {(data.rooms||[]).map((r, i) => {
                const maxCount = data.rooms[0]?.count || 1;
                const barW = Math.max(4, (r.count/maxCount)*100);
                return (
                  <div key={r.rooms} style={{ marginBottom:16 }}>
                    <div style={{ display:"flex",justifyContent:"space-between",marginBottom:4 }}>
                      <div style={{ fontSize:13,fontWeight:500,color:"#F1F5F9" }}>{r.rooms}</div>
                      <div style={{ fontSize:11,color:"#9AA0AE" }}>{fmtNum(r.count)} units</div>
                    </div>
                    <div style={{ height:8,background:"#060E1A",borderRadius:4,overflow:"hidden",marginBottom:4 }}>
                      <div style={{ width:`${barW}%`,height:"100%",background:COLORS[i%COLORS.length],borderRadius:4 }} />
                    </div>
                    <div style={{ display:"flex",gap:16,fontSize:11,color:"#9AA0AE" }}>
                      <span>Avg price: <span style={{ color:"#F1F5F9",fontWeight:500 }}>{fmtAED(r.avg,true)}</span></span>
                      {r.avgSize > 0 && <span>Avg size: <span style={{ color:"#F1F5F9",fontWeight:500 }}>{r.avgSize}m²</span></span>}
                    </div>
                  </div>
                );
              })}

              {(!data.rooms||data.rooms.length===0) && (
                <div style={{ textAlign:"center",padding:"2rem",color:"#9AA0AE",fontSize:13 }}>No unit breakdown available</div>
              )}
            </>
          )}

          {/* ── TRANSACTIONS ── */}
          {tab === "txns" && (
            <>
              <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1rem",gap:8 }}>
                <div style={{ fontSize:12,color:"#9AA0AE" }}>{filteredTxns.length} of {expandedTxns.length} recent</div>
                <input value={txnSearch} onChange={e=>setTxnSearch(e.target.value)}
                  placeholder="Filter by rooms, type…"
                  style={{ fontSize:12,padding:"6px 10px",borderRadius:8,border:"1px solid #E8ECF2",
                    width:180,color:"#F1F5F9",background:"#0D1929",outline:"none" }} />
              </div>

              {filteredTxns.map((r,i) => (
                <div key={i} style={{ padding:"10px 0",borderBottom:"1px solid #F4F6FA" }}>
                  <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8 }}>
                    <div>
                      <div style={{ fontSize:13,fontWeight:600,color:"#F1F5F9" }}>{fmtAED(r.amount,true)}</div>
                      <div style={{ fontSize:11,color:"#9AA0AE",marginTop:2 }}>
                        {r.dateObj?.toLocaleDateString("en-AE",{day:"2-digit",month:"short",year:"numeric"})||r.date}
                        {r.rooms && ` · ${r.rooms}`}
                        {r.txn_size > 0 && ` · ${fmtNum(r.txn_size)}m²`}
                      </div>
                    </div>
                    <div style={{ display:"flex",gap:4,flexShrink:0 }}>
                      <span style={{ fontSize:10,padding:"2px 7px",borderRadius:20,fontWeight:600,
                        background:r.type==="Sale"?"rgba(59,130,246,0.1)":r.type==="Mortgage"?"#FEF3E2":"rgba(34,197,94,0.1)",
                        color:r.type==="Sale"?"#38BDF8":r.type==="Mortgage"?"#BA7517":"#22C55E" }}>{r.type}</span>
                      {r.reg && <span style={{ fontSize:10,padding:"2px 7px",borderRadius:20,fontWeight:600,
                        background:r.reg==="Off-Plan"?"rgba(59,130,246,0.1)":"rgba(34,197,94,0.1)",
                        color:r.reg==="Off-Plan"?"#38BDF8":"#22C55E" }}>{r.reg}</span>}
                    </div>
                  </div>
                  {r.txn_size > 0 && (
                    <div style={{ fontSize:11,color:"#9AA0AE",marginTop:2 }}>
                      {fmtAED(Math.round(r.amount/r.txn_size),true)}/m²
                    </div>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}
