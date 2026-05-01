import { t } from '../i18n';
import { useState, useMemo } from "react";
import { fmtAED, fmtNum } from "../utils/format";
import ProjectCard from "./ProjectCard";


export default function ProjectsPage({ projectsData, onProjectClick }) {
  const lang = localStorage.getItem('lang') || 'en';
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("total");
  const [filterReg, setFilterReg] = useState("");

  const projects = useMemo(() => {
    if (!projectsData) return [];
    let list = Object.entries(projectsData).map(([name, data]) => ({ name, data }));

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.data.area?.toLowerCase().includes(q)
      );
    }

    if (filterReg === "offplan") {
      list = list.filter(p => p.data.kpis.offPlan > p.data.kpis.ready);
    } else if (filterReg === "ready") {
      list = list.filter(p => p.data.kpis.ready >= p.data.kpis.offPlan);
    }

    list.sort((a, b) => {
      if (sortBy === "total")  return b.data.kpis.total - a.data.kpis.total;
      if (sortBy === "count")  return b.data.kpis.count - a.data.kpis.count;
      if (sortBy === "avg")    return b.data.kpis.avg - a.data.kpis.avg;
      if (sortBy === "ppsqm")  return b.data.kpis.ppsqm - a.data.kpis.ppsqm;
      return 0;
    });

    return list;
  }, [projectsData, search, sortBy, filterReg]);

  if (!projectsData) {
    return (
      <div style={{ padding:"3rem", textAlign:"center", color:"#9AA0AE" }}>
        <div style={{ width:32,height:32,border:"3px solid #E8ECF2",borderTopColor:"#38BDF8",
          borderRadius:"50%",animation:"spin 0.7s linear infinite",margin:"0 auto 1rem"}} />
        Loading projects…
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  return (
    <div style={{ padding:"1.25rem", maxWidth:1400, margin:"0 auto" }}>

      {/* Header + filters */}
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:"1.5rem", flexWrap:"wrap" }}>
        <div style={{ flex:1, minWidth:200 }}>
          <div style={{ fontSize:20, fontWeight:700, color:"var(--text-primary)" }}>{t('Projects title',lang)}</div>
          <div style={{ fontSize:12, color:"#9AA0AE", marginTop:2 }}>
            {projects.length} of 100 top projects · 2020–2026
          </div>
        </div>

        {/* Search */}
        <div style={{ display:"flex", alignItems:"center", gap:8, background:"var(--surface)",
          border:"1px solid #E8ECF2", borderRadius:8, padding:"6px 12px", minWidth:240 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9AA0AE" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input value={search} onChange={e=>setSearch(e.target.value)}
            placeholder="Search project or area…"
            style={{ border:"none", outline:"none", fontSize:13, color:"var(--text-primary)", background:"transparent", width:"100%" }} />
          {search && <button onClick={()=>setSearch("")} style={{ background:"none",border:"none",cursor:"pointer",color:"#9AA0AE",fontSize:16,lineHeight:1 }}>×</button>}
        </div>

        {/* Reg filter */}
        <select value={filterReg} onChange={e=>setFilterReg(e.target.value)}
          style={{ fontSize:12, padding:"7px 10px", borderRadius:8, border:"1px solid #E8ECF2", background:"var(--surface)", color:"var(--text-primary)" }}>
          <option value="">All projects</option>
          <option value="offplan">Mostly off-plan</option>
          <option value="ready">Mostly ready</option>
        </select>

        {/* Sort */}
        <select value={sortBy} onChange={e=>setSortBy(e.target.value)}
          style={{ fontSize:12, padding:"7px 10px", borderRadius:8, border:"1px solid #E8ECF2", background:"var(--surface)", color:"var(--text-primary)" }}>
          <option value="total">Sort: Total value</option>
          <option value="count">Sort: Transactions</option>
          <option value="avg">Sort: Avg deal</option>
          <option value="ppsqm">Sort: Price/m²</option>
        </select>
      </div>

      {/* Grid */}
      {projects.length === 0 ? (
        <div style={{ textAlign:"center", padding:"3rem", color:"#9AA0AE", fontSize:13 }}>
          No projects match "{search}"
        </div>
      ) : (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:"1.25rem" }}>
          {projects.map((p, i) => (
            <ProjectCard key={p.name} project={p.name} data={p.data} index={i}
              onClick={() => onProjectClick(p.name, p.data)} />
          ))}
        </div>
      )}
    </div>
  );
}
