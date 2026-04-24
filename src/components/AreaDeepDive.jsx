import { useState, useEffect } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts";
import { fmtAED, fmtNum } from "../utils/format";
import ChartCard from "./ChartCard";

const REG_EXPAND  = {Off:'Off-Plan',Rea:'Ready'};
const USG_EXPAND  = {Res:'Residential',Com:'Commercial',Mul:'Multi-Use',Agr:'Agricultural',Hos:'Hospitality',Ind:'Industrial',Oth:'Other'};

function expandRow(r) {
  let dateObj = null;
  if (r.d && r.d.length >= 10) {
    const [y,m,d] = r.d.split('-');
    const dt = new Date(+y,+m-1,+d);
    if (!isNaN(dt.getTime())) dateObj = dt;
  }
  return { txn_num:r.n||'', date:r.d||'', dateObj, month:r.m||'', type:r.t||'Other',
    reg:REG_EXPAND[r.r]||r.r||'', usage:USG_EXPAND[r.u]||r.u||'Other',
    area:r.a||'Unknown', prop_type:r.p||'Other', amount:r.v||0, txn_size:r.s||0,
    rooms:r.b||'', metro:r.e||'', project:r.j||'' };
}

const COLORS = ["#185FA5","#1D9E75","#D85A30","#BA7517","#993556","#534AB7"];

function KPI({ label, value, sub, color="#0A1628" }) {
  return (
    <div style={{ background:"#F8FAFC", borderRadius:8, padding:"0.75rem 1rem" }}>
      <div style={{ fontSize:11, color:"#9AA0AE", marginBottom:4 }}>{label}</div>
      <div style={{ fontSize:20, fontWeight:700, color }}>{value}</div>
      {sub && <div style={{ fontSize:11, color:"#9AA0AE", marginTop:2 }}>{sub}</div>}
    </div>
  );
}

export default function AreaDeepDive({ areaData, areaList }) {
  const [selected, setSelected] = useState(areaList[0] || "");
  const [txnSearch, setTxnSearch] = useState("");
  const [txnPage, setTxnPage] = useState(0);
  const [detailRow, setDetailRow] = useState(null);
  const PAGE = 20;

  const d = areaData?.[selected];
  if (!d) return (
    <div style={{ padding:"2rem", textAlign:"center", color:"#9AA0AE" }}>
      Select an area to view detailed analysis
    </div>
  );

  const kpis = d.kpis;
  const offPct = kpis.count ? ((kpis.offPlan / kpis.count)*100).toFixed(1) : 0;
  const readyPct = (100 - parseFloat(offPct)).toFixed(1);

  const typeData = Object.entries(d.types||{}).map(([name,value])=>({name,value}));
  const regData  = [
    { name:"Off-Plan", value: kpis.offPlan },
    { name:"Ready",    value: kpis.ready   },
  ];

  const expandedRecent = (d.recent||[]).map(expandRow);
  const filteredTxns = txnSearch
    ? expandedRecent.filter(r =>
        r.area?.toLowerCase().includes(txnSearch.toLowerCase()) ||
        r.project?.toLowerCase().includes(txnSearch.toLowerCase()) ||
        r.txn_num?.toLowerCase().includes(txnSearch.toLowerCase()) ||
        r.rooms?.toLowerCase().includes(txnSearch.toLowerCase())
      )
    : expandedRecent;
  const pageTxns = filteredTxns.slice(txnPage*PAGE, (txnPage+1)*PAGE);
  const totalPages = Math.ceil(filteredTxns.length / PAGE);

  return (
    <div style={{ padding:"1.25rem", maxWidth:1400, margin:"0 auto" }}>

      {/* Area selector */}
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:"1.5rem", flexWrap:"wrap" }}>
        <div style={{ fontSize:20, fontWeight:700, color:"#0A1628" }}>Area deep-dive</div>
        <select value={selected} onChange={e => { setSelected(e.target.value); setTxnPage(0); }}
          style={{ fontSize:14, fontWeight:600, padding:"8px 14px", borderRadius:8,
            border:"1px solid #E8ECF2", background:"#fff", color:"#0A1628", cursor:"pointer", minWidth:220 }}>
          {areaList.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
        <div style={{ fontSize:12, color:"#9AA0AE" }}>2020–2026 data</div>
      </div>

      {/* KPI row */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))", gap:10, marginBottom:"1.25rem" }}>
        <KPI label="Transactions"   value={fmtNum(kpis.count)}          sub="2020–2026" />
        <KPI label="Total value"    value={fmtAED(kpis.total,true)}     sub="All deals" color="#185FA5" />
        <KPI label="Avg deal"       value={fmtAED(kpis.avg,true)}       sub="Per transaction" />
        <KPI label="Avg size"       value={kpis.avgSize > 0 ? kpis.avgSize+"m²" : "—"} sub="Transaction area" />
        <KPI label="Price/m²"       value={kpis.ppsqm > 0 ? fmtAED(kpis.ppsqm,true) : "—"} sub="Avg" color="#1D9E75" />
        <KPI label="Off-plan share" value={offPct+"%"}                  sub={fmtNum(kpis.offPlan)+" deals"} color="#185FA5" />
      </div>

      {/* Monthly trend + Price trend */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.25rem", marginBottom:"1.25rem" }}>
        <ChartCard title="Monthly transaction volume" subtitle={selected}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={d.monthly} margin={{top:4,right:8,left:0,bottom:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F2F6" />
              <XAxis dataKey="month" tick={{fontSize:10,fill:"#9AA0AE"}} axisLine={false} tickLine={false}
                tickFormatter={m => { const [y,mo]=m.split('-'); return `${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][+mo-1]}'${y.slice(2)}`; }} />
              <YAxis tick={{fontSize:10,fill:"#9AA0AE"}} axisLine={false} tickLine={false} tickFormatter={v=>fmtNum(v)} width={50}/>
              <Tooltip formatter={(v,n)=>[fmtNum(v),'Transactions']} labelFormatter={l=>l} contentStyle={{background:"#0A1628",border:"none",borderRadius:8,color:"#fff",fontSize:12}} />
              <Bar dataKey="count" fill="#185FA5" radius={[3,3,0,0]} maxBarSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Price per m² trend" subtitle={selected}>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={d.priceTrend} margin={{top:4,right:16,left:0,bottom:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F2F6" />
              <XAxis dataKey="year" tick={{fontSize:11,fill:"#9AA0AE"}} axisLine={false} tickLine={false} />
              <YAxis tick={{fontSize:10,fill:"#9AA0AE"}} axisLine={false} tickLine={false} tickFormatter={v=>fmtAED(v,true)} width={72} />
              <Tooltip formatter={(v)=>[fmtAED(v,true)+'/m²','Price']} contentStyle={{background:"#0A1628",border:"none",borderRadius:8,color:"#fff",fontSize:12}} />
              <Line type="monotone" dataKey="ppsqm" stroke="#1D9E75" strokeWidth={2.5} dot={{r:4,fill:"#1D9E75"}} activeDot={{r:6}} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Type split + Reg split + Bedroom breakdown */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"1.25rem", marginBottom:"1.25rem" }}>
        <ChartCard title="Transaction type" subtitle={selected}>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={typeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label={({name,percent})=>`${name} ${(percent*100).toFixed(0)}%`} labelLine={false} fontSize={11}>
                {typeData.map((_,i) => <Cell key={i} fill={COLORS[i%COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(v)=>[fmtNum(v),'Deals']} contentStyle={{background:"#0A1628",border:"none",borderRadius:8,color:"#fff",fontSize:12}} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Off-plan vs ready" subtitle={selected}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:12 }}>
            <div style={{ background:"#EDF4FC", borderRadius:8, padding:"0.75rem", textAlign:"center" }}>
              <div style={{ fontSize:11, color:"#7A8499" }}>Off-plan</div>
              <div style={{ fontSize:22, fontWeight:700, color:"#185FA5" }}>{offPct}%</div>
              <div style={{ fontSize:11, color:"#7A8499" }}>{fmtNum(kpis.offPlan)}</div>
            </div>
            <div style={{ background:"#E1F5EE", borderRadius:8, padding:"0.75rem", textAlign:"center" }}>
              <div style={{ fontSize:11, color:"#7A8499" }}>Ready</div>
              <div style={{ fontSize:22, fontWeight:700, color:"#1D9E75" }}>{readyPct}%</div>
              <div style={{ fontSize:11, color:"#7A8499" }}>{fmtNum(kpis.ready)}</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={90}>
            <BarChart data={regData} layout="vertical">
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="name" tick={{fontSize:11,fill:"#4A5568"}} axisLine={false} tickLine={false} width={70} />
              <Tooltip formatter={(v)=>[fmtNum(v),'Deals']} contentStyle={{background:"#0A1628",border:"none",borderRadius:8,color:"#fff",fontSize:12}} />
              <Bar dataKey="value" radius={[0,4,4,0]} maxBarSize={14}>
                {regData.map((e,i)=><Cell key={i} fill={i===0?"#185FA5":"#1D9E75"} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Bedroom breakdown" subtitle={selected}>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={d.rooms?.slice(0,6)||[]} layout="vertical" margin={{left:0,right:50,top:0,bottom:0}}>
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="rooms" tick={{fontSize:11,fill:"#4A5568"}} axisLine={false} tickLine={false} width={60} />
              <Tooltip formatter={(v,n)=>n==="count"?[fmtNum(v),'Deals']:[fmtAED(v,true),'Avg price']} contentStyle={{background:"#0A1628",border:"none",borderRadius:8,color:"#fff",fontSize:12}} />
              <Bar dataKey="count" fill="#534AB7" radius={[0,4,4,0]} maxBarSize={14}
                label={{position:"right",fontSize:10,fill:"#7A8499",formatter:v=>fmtNum(v)}} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Top projects */}
      <ChartCard title="Top projects" subtitle={`${selected} — by total value`} id="area-projects">
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
            <thead>
              <tr style={{ borderBottom:"1px solid #E8ECF2" }}>
                {["#","Project","Transactions","Total value","Avg deal"].map(h => (
                  <th key={h} style={{ padding:"6px 8px", textAlign:"left", color:"#7A8499", fontWeight:500 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(d.projects||[]).slice(0,10).map((p,i) => (
                <tr key={i} style={{ borderBottom:"1px solid #F4F6FA", background: i%2===0?"#fff":"#FAFBFC" }}>
                  <td style={{ padding:"7px 8px", color:"#C5CAD6", fontWeight:700 }}>{i+1}</td>
                  <td style={{ padding:"7px 8px", color:"#0A1628", fontWeight:500 }}>{p.project}</td>
                  <td style={{ padding:"7px 8px", color:"#4A5568" }}>{fmtNum(p.count)}</td>
                  <td style={{ padding:"7px 8px", color:"#185FA5", fontWeight:600 }}>{fmtAED(p.total,true)}</td>
                  <td style={{ padding:"7px 8px", color:"#4A5568" }}>{fmtAED(p.avg,true)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>

      {/* Recent transactions */}
      <div style={{ marginTop:"1.25rem", background:"#fff", border:"1px solid #E8ECF2", borderRadius:12, padding:"1.25rem" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"1rem", flexWrap:"wrap", gap:8 }}>
          <div>
            <div style={{ fontSize:13, fontWeight:600, color:"#0A1628" }}>Recent transactions</div>
            <div style={{ fontSize:11, color:"#9AA0AE", marginTop:2 }}>{fmtNum(filteredTxns.length)} records</div>
          </div>
          <input value={txnSearch} onChange={e=>{setTxnSearch(e.target.value);setTxnPage(0);}}
            placeholder="Search project, rooms…"
            style={{ fontSize:12, padding:"7px 12px", borderRadius:8, border:"1px solid #E8ECF2", width:220, color:"#0A1628", background:"#F8FAFC", outline:"none" }} />
        </div>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
            <thead>
              <tr style={{ borderBottom:"1px solid #E8ECF2" }}>
                {["Date","Type","Property","Value","Size","Rooms","Status","Project"].map(h=>(
                  <th key={h} style={{ padding:"6px 8px", textAlign:"left", color:"#7A8499", fontWeight:500, whiteSpace:"nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pageTxns.map((r,i) => (
                <tr key={i} onClick={()=>setDetailRow(r)} style={{ borderBottom:"1px solid #F4F6FA", cursor:"pointer",
                  background: detailRow===r?"#EDF4FC":i%2===0?"#fff":"#FAFBFC" }}>
                  <td style={{ padding:"7px 8px", color:"#7A8499", whiteSpace:"nowrap" }}>
                    {r.dateObj ? r.dateObj.toLocaleDateString("en-AE",{day:"2-digit",month:"short",year:"numeric"}) : r.date}
                  </td>
                  <td style={{ padding:"7px 8px" }}>
                    <span style={{ fontSize:10, padding:"2px 7px", borderRadius:20, fontWeight:600, whiteSpace:"nowrap",
                      background: r.type==="Sale"?"#EDF4FC":r.type==="Mortgage"?"#FEF3E2":"#E1F5EE",
                      color: r.type==="Sale"?"#185FA5":r.type==="Mortgage"?"#BA7517":"#0F6E56" }}>
                      {r.type}
                    </span>
                  </td>
                  <td style={{ padding:"7px 8px", color:"#4A5568" }}>{r.prop_type||"—"}</td>
                  <td style={{ padding:"7px 8px", color:"#0A1628", fontWeight:600 }}>{fmtAED(r.amount,true)}</td>
                  <td style={{ padding:"7px 8px", color:"#7A8499" }}>{r.txn_size>0?fmtNum(r.txn_size)+"m²":"—"}</td>
                  <td style={{ padding:"7px 8px", color:"#7A8499" }}>{r.rooms||"—"}</td>
                  <td style={{ padding:"7px 8px" }}>
                    <span style={{ fontSize:10, padding:"2px 7px", borderRadius:20, fontWeight:600,
                      background: r.reg==="Off-Plan"?"#EDF4FC":"#E1F5EE",
                      color: r.reg==="Off-Plan"?"#185FA5":"#0F6E56" }}>{r.reg||"—"}</span>
                  </td>
                  <td style={{ padding:"7px 8px", color:"#4A5568", maxWidth:160, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                    {r.project||"—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:"1rem" }}>
          <div style={{ fontSize:11, color:"#9AA0AE" }}>
            {txnPage*PAGE+1}–{Math.min((txnPage+1)*PAGE,filteredTxns.length)} of {fmtNum(filteredTxns.length)}
          </div>
          <div style={{ display:"flex", gap:4 }}>
            {["«","‹","›","»"].map((label,i) => {
              const disabled = i<2 ? txnPage===0 : txnPage>=totalPages-1;
              const onClick = i===0?()=>setTxnPage(0):i===1?()=>setTxnPage(p=>Math.max(0,p-1)):
                              i===2?()=>setTxnPage(p=>Math.min(totalPages-1,p+1)):()=>setTxnPage(totalPages-1);
              return <button key={label} onClick={onClick} disabled={disabled} style={{
                fontSize:11,padding:"4px 10px",borderRadius:6,border:"1px solid #E8ECF2",
                background:disabled?"#F4F6FA":"#fff",color:disabled?"#C5CAD6":"#4A5568",cursor:disabled?"default":"pointer"
              }}>{label}</button>;
            })}
          </div>
        </div>
      </div>

      {/* Detail drawer */}
      {detailRow && (
        <div style={{ position:"fixed",right:0,top:0,bottom:0,width:340,background:"#fff",
          boxShadow:"-4px 0 24px rgba(0,0,0,0.12)",zIndex:200,overflowY:"auto",padding:"1.5rem" }}>
          <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1.5rem" }}>
            <div style={{ fontSize:14,fontWeight:700,color:"#0A1628" }}>Transaction detail</div>
            <button onClick={()=>setDetailRow(null)} style={{ background:"none",border:"none",fontSize:20,cursor:"pointer",color:"#7A8499" }}>×</button>
          </div>
          {[
            ["Transaction ID", detailRow.txn_num||"—"],
            ["Date", detailRow.dateObj?detailRow.dateObj.toLocaleDateString("en-AE",{day:"2-digit",month:"long",year:"numeric"}):detailRow.date],
            ["Area", detailRow.area],
            ["Project", detailRow.project||"—"],
            ["Type", detailRow.type],
            ["Status", detailRow.reg||"—"],
            ["Property", detailRow.prop_type||"—"],
            ["Rooms", detailRow.rooms||"—"],
            ["Value", fmtAED(detailRow.amount)],
            ["Price/m²", detailRow.txn_size>0?fmtAED(Math.round(detailRow.amount/detailRow.txn_size))+"/m²":"—"],
            ["Size", detailRow.txn_size>0?fmtNum(detailRow.txn_size)+"m²":"—"],
            ["Metro", detailRow.metro||"—"],
          ].map(([label,value])=>(
            <div key={label} style={{ display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:"1px solid #F4F6FA",gap:16 }}>
              <div style={{ fontSize:12,color:"#7A8499",flexShrink:0 }}>{label}</div>
              <div style={{ fontSize:12,color:"#0A1628",fontWeight:500,textAlign:"right" }}>{value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
