import { useState, useMemo } from "react";
import { fmtAED, fmtNum } from "../utils/format";

export default function TransactionSearch({ rows }) {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortDir, setSortDir] = useState("desc");
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState(null);
  const PAGE_SIZE = 15;

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    const filtered = q
      ? rows.filter(r =>
          r.area?.toLowerCase().includes(q) ||
          r.project?.toLowerCase().includes(q) ||
          r.txn_num?.toLowerCase().includes(q) ||
          r.prop_type?.toLowerCase().includes(q) ||
          r.rooms?.toLowerCase().includes(q) ||
          r.metro?.toLowerCase().includes(q)
        )
      : rows;

    return [...filtered].sort((a, b) => {
      let av, bv;
      if (sortBy === "date")   { av = a.dateObj?.getTime() || 0; bv = b.dateObj?.getTime() || 0; }
      if (sortBy === "amount") { av = a.amount; bv = b.amount; }
      if (sortBy === "size")   { av = a.txn_size; bv = b.txn_size; }
      if (sortBy === "area")   { av = a.area; bv = b.area; return sortDir==="asc" ? av?.localeCompare(bv) : bv?.localeCompare(av); }
      return sortDir === "asc" ? av - bv : bv - av;
    });
  }, [rows, query, sortBy, sortDir]);

  const pageData = results.slice(page * PAGE_SIZE, (page+1) * PAGE_SIZE);
  const totalPages = Math.ceil(results.length / PAGE_SIZE);

  const toggleSort = (col) => {
    if (sortBy === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortBy(col); setSortDir("desc"); }
    setPage(0);
  };

  const SortIcon = ({ col }) => (
    <span style={{ fontSize:9, color: sortBy===col ? "#185FA5" : "#C5CAD6", marginLeft:3 }}>
      {sortBy===col ? (sortDir==="desc" ? "▼" : "▲") : "⇅"}
    </span>
  );

  const badge = (text, color) => (
    <span style={{ fontSize:10, padding:"2px 7px", borderRadius:20, background:color+"18", color, fontWeight:600, whiteSpace:"nowrap" }}>
      {text}
    </span>
  );

  return (
    <div style={{ background:"#fff", border:"1px solid #E8ECF2", borderRadius:12, padding:"1.25rem" }}>
      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"1rem", flexWrap:"wrap", gap:8 }}>
        <div>
          <div style={{ fontSize:13, fontWeight:600, color:"#0A1628" }}>Transaction search</div>
          <div style={{ fontSize:11, color:"#9AA0AE", marginTop:2 }}>
            {fmtNum(results.length)} results{query ? ` for "${query}"` : ""}
          </div>
        </div>
        <input
          value={query}
          onChange={e => { setQuery(e.target.value); setPage(0); }}
          placeholder="Search area, project, ID, rooms…"
          style={{
            fontSize:12, padding:"7px 12px", borderRadius:8, border:"1px solid #E8ECF2",
            outline:"none", width:260, color:"#0A1628", background:"#F8FAFC",
          }}
        />
      </div>

      {/* Table */}
      <div style={{ overflowX:"auto" }}>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
          <thead>
            <tr style={{ borderBottom:"1px solid #E8ECF2" }}>
              {[
                { key:"date",   label:"Date" },
                { key:"area",   label:"Area" },
                { label:"Type" },
                { label:"Property" },
                { key:"amount", label:"Value" },
                { key:"size",   label:"Size" },
                { label:"Rooms" },
                { label:"Status" },
              ].map(col => (
                <th key={col.label} onClick={() => col.key && toggleSort(col.key)}
                  style={{ padding:"6px 8px", textAlign:"left", color:"#7A8499", fontWeight:500,
                    cursor: col.key ? "pointer" : "default", whiteSpace:"nowrap",
                    borderBottom:"2px solid " + (sortBy===col.key ? "#185FA5" : "transparent"),
                  }}>
                  {col.label}{col.key && <SortIcon col={col.key} />}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageData.map((r, i) => (
              <tr key={i} onClick={() => setSelected(r)}
                style={{
                  borderBottom:"1px solid #F4F6FA", cursor:"pointer",
                  background: selected===r ? "#EDF4FC" : i%2===0 ? "#fff" : "#FAFBFC",
                  transition:"background 0.1s",
                }}>
                <td style={{ padding:"7px 8px", color:"#7A8499", whiteSpace:"nowrap" }}>
                  {r.dateObj ? r.dateObj.toLocaleDateString("en-AE", { day:"2-digit", month:"short", year:"numeric" }) : r.date}
                </td>
                <td style={{ padding:"7px 8px", color:"#0A1628", fontWeight:500, maxWidth:140, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                  {r.area}
                </td>
                <td style={{ padding:"7px 8px" }}>
                  {badge(r.type, r.type==="Sale" ? "#185FA5" : r.type==="Mortgage" ? "#BA7517" : "#1D9E75")}
                </td>
                <td style={{ padding:"7px 8px", color:"#4A5568", maxWidth:120, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                  {r.prop_type || "—"}
                </td>
                <td style={{ padding:"7px 8px", color:"#0A1628", fontWeight:600, whiteSpace:"nowrap" }}>
                  {fmtAED(r.amount, true)}
                </td>
                <td style={{ padding:"7px 8px", color:"#7A8499", whiteSpace:"nowrap" }}>
                  {r.txn_size > 0 ? fmtNum(r.txn_size) + " m²" : "—"}
                </td>
                <td style={{ padding:"7px 8px", color:"#7A8499" }}>{r.rooms || "—"}</td>
                <td style={{ padding:"7px 8px" }}>
                  {r.reg ? badge(r.reg, r.reg==="Off-Plan" ? "#185FA5" : "#1D9E75") : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:"1rem", flexWrap:"wrap", gap:8 }}>
        <div style={{ fontSize:11, color:"#9AA0AE" }}>
          Showing {page*PAGE_SIZE+1}–{Math.min((page+1)*PAGE_SIZE, results.length)} of {fmtNum(results.length)}
        </div>
        <div style={{ display:"flex", gap:4 }}>
          <button onClick={() => setPage(0)} disabled={page===0} style={{ fontSize:11, padding:"4px 10px", borderRadius:6, border:"1px solid #E8ECF2", background:page===0?"#F4F6FA":"#fff", color:page===0?"#C5CAD6":"#4A5568", cursor:page===0?"default":"pointer" }}>«</button>
          <button onClick={() => setPage(p=>Math.max(0,p-1))} disabled={page===0} style={{ fontSize:11, padding:"4px 10px", borderRadius:6, border:"1px solid #E8ECF2", background:page===0?"#F4F6FA":"#fff", color:page===0?"#C5CAD6":"#4A5568", cursor:page===0?"default":"pointer" }}>‹</button>
          <span style={{ fontSize:11, padding:"4px 10px", color:"#0A1628" }}>{page+1} / {totalPages}</span>
          <button onClick={() => setPage(p=>Math.min(totalPages-1,p+1))} disabled={page>=totalPages-1} style={{ fontSize:11, padding:"4px 10px", borderRadius:6, border:"1px solid #E8ECF2", background:page>=totalPages-1?"#F4F6FA":"#fff", color:page>=totalPages-1?"#C5CAD6":"#4A5568", cursor:page>=totalPages-1?"default":"pointer" }}>›</button>
          <button onClick={() => setPage(totalPages-1)} disabled={page>=totalPages-1} style={{ fontSize:11, padding:"4px 10px", borderRadius:6, border:"1px solid #E8ECF2", background:page>=totalPages-1?"#F4F6FA":"#fff", color:page>=totalPages-1?"#C5CAD6":"#4A5568", cursor:page>=totalPages-1?"default":"pointer" }}>»</button>
        </div>
      </div>

      {/* Detail drawer */}
      {selected && (
        <div style={{ position:"fixed", right:0, top:0, bottom:0, width:360, background:"#fff",
          boxShadow:"-4px 0 24px rgba(0,0,0,0.12)", zIndex:200, overflowY:"auto", padding:"1.5rem" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"1.5rem" }}>
            <div style={{ fontSize:14, fontWeight:700, color:"#0A1628" }}>Transaction detail</div>
            <button onClick={() => setSelected(null)} style={{ background:"none", border:"none", fontSize:18, cursor:"pointer", color:"#7A8499", lineHeight:1 }}>×</button>
          </div>

          <div style={{ display:"flex", gap:8, marginBottom:"1.5rem", flexWrap:"wrap" }}>
            {selected.type && badge(selected.type, selected.type==="Sale"?"#185FA5":selected.type==="Mortgage"?"#BA7517":"#1D9E75")}
            {selected.reg && badge(selected.reg, selected.reg==="Off-Plan"?"#185FA5":"#1D9E75")}
            {selected.usage && badge(selected.usage, "#534AB7")}
          </div>

          {[
            ["Transaction ID", selected.txn_num || "—"],
            ["Date", selected.dateObj ? selected.dateObj.toLocaleDateString("en-AE", { day:"2-digit", month:"long", year:"numeric" }) : selected.date],
            ["Area", selected.area],
            ["Project", selected.project || "—"],
            ["Property type", selected.prop_type || "—"],
            ["Rooms", selected.rooms || "—"],
            ["Transaction value", fmtAED(selected.amount)],
            ["Price per m²", selected.txn_size > 0 ? fmtAED(Math.round(selected.amount / selected.txn_size)) + "/m²" : "—"],
            ["Transaction size", selected.txn_size > 0 ? fmtNum(selected.txn_size) + " m²" : "—"],
            ["Nearest metro", selected.metro || "—"],
          ].map(([label, value]) => (
            <div key={label} style={{ display:"flex", justifyContent:"space-between", padding:"10px 0", borderBottom:"1px solid #F4F6FA", gap:16 }}>
              <div style={{ fontSize:12, color:"#7A8499", flexShrink:0 }}>{label}</div>
              <div style={{ fontSize:12, color:"#0A1628", fontWeight:500, textAlign:"right" }}>{value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
