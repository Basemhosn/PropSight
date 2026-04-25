import { useState, useMemo, useEffect, useRef } from "react";
import { useAuth } from "./context/AuthContext";
import LoginPage from "./components/LoginPage";
import OnboardingPage from "./components/OnboardingPage";
import { fmtAED, fmtNum } from "./utils/format";

import TopNav from "./components/TopNav";
import Sidebar from "./components/Sidebar";
import HomePage from "./components/HomePage";
import PropertiesPage from "./components/PropertiesPage";
import MarketIntelligence from "./components/MarketIntelligence";
import DealAnalyzer from "./components/DealAnalyzer";
import AIConcierge from "./components/AIConcierge";
import FilterBar from "./components/FilterBar";
import KpiCard from "./components/KpiCard";
import AreaBarChart from "./components/AreaBarChart";
import TypeDonut from "./components/TypeDonut";
import MonthlyTrend from "./components/MonthlyTrend";
import AreaTable from "./components/AreaTable";
import TopAreaDetail from "./components/TopAreaDetail";
import DubaiMap from "./components/DubaiMap";
import ProjectLeaderboard from "./components/ProjectLeaderboard";
import BedroomBreakdown from "./components/BedroomBreakdown";
import OffPlanReady from "./components/OffPlanReady";
import ExportPDF, { CHART_IDS } from "./components/ExportPDF";
import MetroPremium from "./components/MetroPremium";
import VelocityTracker from "./components/VelocityTracker";
import PricePerSqm from "./components/PricePerSqm";
import YearOnYear from "./components/YearOnYear";
import PriceTrends from "./components/PriceTrends";
import AreaRanking from "./components/AreaRanking";
import TransactionSearch from "./components/TransactionSearch";
import ROIEstimator from "./components/ROIEstimator";
import AreaDeepDive from "./components/AreaDeepDive";
import ChartCard from "./components/ChartCard";
import ProjectsPage from "./components/ProjectsPage";
import ProjectDetail from "./components/ProjectDetail";
import MapView from "./components/MapView";
import ROICalculator from "./components/ROICalculator";
import DeveloperTracker from "./components/DeveloperTracker";
import PropertyLookup from "./components/PropertyLookup";
import MarketPulse from "./components/MarketPulse";
import LiveFeed from "./components/LiveFeed";

const DEFAULT_FILTERS = {
  type:"", usage:"", reg:"", propType:"",
  area:"", sort:"value", dateFrom:"", dateTo:""
};

const REG_EXPAND  = {Off:"Off-Plan",Rea:"Ready"};
const USG_EXPAND  = {Res:"Residential",Com:"Commercial",Mul:"Multi-Use",Agr:"Agricultural",Hos:"Hospitality",Ind:"Industrial",Oth:"Other"};

function expandRow(r) {
  let dateObj = null;
  if (r.d && r.d.length >= 10) {
    const [y,m,d] = r.d.split("-");
    const dt = new Date(+y,+m-1,+d);
    if (!isNaN(dt.getTime())) dateObj = dt;
  }
  return { txn_num:r.n||"", date:r.d||"", dateObj, month:r.m||"", type:r.t||"Other", subtype:"",
    reg:REG_EXPAND[r.r]||r.r||"", usage:USG_EXPAND[r.u]||r.u||"Other",
    area:r.a||"Unknown", prop_type:r.p||"Other", prop_sub:"",
    amount:r.v||0, txn_size:r.s||0, rooms:r.b||"", metro:r.e||"", project:r.j||"" };
}

function getBestSlice(slices, filters) {
  if (!slices) return null;
  const parts = [];
  if (filters.type)  parts.push(`t:${filters.type}`);
  if (filters.reg)   parts.push(`r:${filters.reg}`);
  if (filters.usage) parts.push(`u:${filters.usage}`);
  const key = parts.join("|") || "all";
  if (slices[key]) return slices[key];
  for (let i = parts.length-1; i >= 1; i--) {
    const k = parts.slice(0,i).join("|");
    if (slices[k]) return slices[k];
  }
  if (parts.length && slices[parts[0]]) return slices[parts[0]];
  return slices["all"];
}

const PAGES = [
  { id:"home",       label:"Home" },
  { id:"overview",   label:"Overview" },
  { id:"offplan",    label:"Off-Plan" },
  { id:"ready",      label:"Ready" },
  { id:"areas",      label:"Areas" },
  { id:"projects",   label:"Projects" },
  { id:"live",       label:"Live" },
  { id:"map",        label:"Map" },
  { id:"roi",        label:"ROI" },
  { id:"developers", label:"Developers" },
  { id:"lookup",     label:"Lookup" },
  { id:"pulse",      label:"Pulse" },
  { id:"markets",    label:"Markets" },
  { id:"ai",         label:"AI Concierge" },
];


function NavDropdown({ label, active, items, onSelect, currentPage }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position:"relative" }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          padding:"10px 18px", fontSize:13, fontWeight: active?600:400,
          color: active?"#38BDF8":"#475569",
          background:"transparent", border:"none", cursor:"pointer",
          borderBottom: active?"2px solid #38BDF8":"2px solid transparent",
          display:"flex", alignItems:"center", gap:5, whiteSpace:"nowrap",
        }}>
        {label}
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>
      {open && (
        <div style={{
          position:"absolute", top:"calc(100% + 4px)", left:0,
          background:"rgba(6,14,26,0.98)", border:"1px solid rgba(59,130,246,0.12)",
          borderRadius:10, overflow:"hidden", zIndex:200,
          minWidth:180, boxShadow:"0 8px 24px rgba(0,0,0,0.4)",
        }}>
          {items.map(item => (
            <button key={item.id} onClick={() => { onSelect(item.id); setOpen(false); }} style={{
              display:"block", width:"100%", padding:"10px 16px",
              textAlign:"left", fontSize:13, fontWeight: currentPage===item.id?600:400,
              color: currentPage===item.id?"#38BDF8":"#64748B",
              background: currentPage===item.id?"rgba(59,130,246,0.1)":"transparent",
              border:"none", cursor:"pointer",
              borderLeft: currentPage===item.id?"2px solid #38BDF8":"2px solid transparent",
            }}
            onMouseEnter={e=>e.currentTarget.style.background="rgba(59,130,246,0.06)"}
            onMouseLeave={e=>e.currentTarget.style.background=currentPage===item.id?"rgba(59,130,246,0.1)":"transparent"}
            >{item.label}</button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const { user, profile, loading } = useAuth();
  const [core, setCore]               = useState(null);
  const [areaData, setAreaData]       = useState(null);
  const [recentRaw, setRecentRaw]     = useState([]);
  const [recentLoading, setRecentLoading] = useState(true);
  const [dataError, setDataError]     = useState(null);
  const [filters, setFilters]         = useState(DEFAULT_FILTERS);
  const [selectedArea, setSelectedArea]       = useState(null);
  const [page, setPage]                         = useState("home");
  const [projectsData, setProjectsData]         = useState(null);
  const [selectedProject, setSelectedProject]   = useState(null); // {name, data}

  useEffect(() => {
    fetch("/data/core.json")
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then(data => setCore(data))
      .catch(err => setDataError(err.message));
  }, []);

  useEffect(() => {
    fetch("/data/recent.json")
      .then(r => r.json())
      .then(data => { setRecentRaw(data.recentRaw||[]); setRecentLoading(false); })
      .catch(() => setRecentLoading(false));
  }, []);

  useEffect(() => {
    fetch("/data/areas.json")
      .then(r => r.json())
      .then(data => setAreaData(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetch("/data/projects.json")
      .then(r => r.json())
      .then(data => setProjectsData(data))
      .catch(() => {});
  }, []);

  const options = useMemo(() => {
    if (!core) return { types:[], usages:[], regs:[], propTypes:[] };
    return {
      types:  [...new Set(core.types.map(t=>t.name))].sort(),
      usages: ["Residential","Commercial"],
      regs:   Object.keys(core.regSplit).filter(r=>r!=="Other").sort(),
      propTypes: [],
    };
  }, [core]);

  const dateRange = { min:"2020-01-01", max:"2026-04-09" };
  const sliceKey  = `${filters.type}|${filters.reg}|${filters.usage}`;

  const activeSlice = useMemo(() => {
    if (!core?.slices) return null;
    // For off-plan/ready pages, override reg filter
    if (page === "offplan") return getBestSlice(core.slices, {...filters, reg:"Off-Plan"});
    if (page === "ready")   return getBestSlice(core.slices, {...filters, reg:"Ready"});
    return getBestSlice(core.slices, filters);
  }, [core, filters.type, filters.reg, filters.usage, page]);

  const areas = useMemo(() => {
    if (!activeSlice) return [];
    let list = activeSlice.areas;
    if (filters.area) {
      const q = filters.area.toLowerCase();
      list = list.filter(a => a.area.toLowerCase().includes(q));
    }
    const sk = filters.sort==="count"?"count":filters.sort==="avg"?"avg":"total";
    return [...list].sort((a,b)=>b[sk]-a[sk]);
  }, [activeSlice, sliceKey, filters.area, filters.sort]);

  const monthlyData = useMemo(() => {
    if (!activeSlice) return [];
    let list = activeSlice.monthly;
    if (filters.dateFrom) list = list.filter(m=>m.month>=filters.dateFrom.slice(0,7));
    if (filters.dateTo)   list = list.filter(m=>m.month<=filters.dateTo.slice(0,7));
    return list;
  }, [activeSlice, sliceKey, filters.dateFrom, filters.dateTo]);

  const expandedRecent = useMemo(() => {
    if (!recentRaw.length) return [];
    let rows = recentRaw;
    if (page==="offplan") rows = rows.filter(r=>(REG_EXPAND[r.r]||r.r||"")==="Off-Plan");
    if (page==="ready")   rows = rows.filter(r=>(REG_EXPAND[r.r]||r.r||"")==="Ready");
    if (filters.type)  rows = rows.filter(r=>(r.t||"Other")===filters.type);
    if (filters.reg && page==="overview") rows = rows.filter(r=>(REG_EXPAND[r.r]||r.r||"")===filters.reg);
    if (filters.usage) rows = rows.filter(r=>(USG_EXPAND[r.u]||r.u||"")===filters.usage);
    if (filters.area)  rows = rows.filter(r=>(r.a||"").toLowerCase().includes(filters.area.toLowerCase()));
    if (filters.dateFrom) rows = rows.filter(r=>r.d>=filters.dateFrom.slice(0,10));
    if (filters.dateTo)   rows = rows.filter(r=>r.d<=filters.dateTo.slice(0,10));
    return rows.map(expandRow);
  }, [recentRaw, filters.type, filters.reg, filters.usage, filters.area, filters.dateFrom, filters.dateTo, page]);

  const kpis = useMemo(() => {
    if (!activeSlice) return { total:0, value:0, avg:0, uniqueAreas:0, topArea:"—" };
    if (filters.dateFrom||filters.dateTo) {
      const total = monthlyData.reduce((s,m)=>s+m.count,0);
      const value = monthlyData.reduce((s,m)=>s+m.total,0);
      return { total, value, avg:total?value/total:0, uniqueAreas:areas.length, topArea:areas[0]?.area||"—" };
    }
    const total = areas.reduce((s,a)=>s+a.count,0);
    const value = areas.reduce((s,a)=>s+a.total,0);
    return { total, value, avg:total?value/total:0, uniqueAreas:areas.length, topArea:areas[0]?.area||"—" };
  }, [activeSlice, areas, monthlyData, sliceKey, filters.dateFrom, filters.dateTo]);

  const typeData = useMemo(() => {
    if (!activeSlice) return core?.types||[];
    const counts = {};
    activeSlice.areas.forEach(a=>{ counts[a.topType]=(counts[a.topType]||0)+a.count; });
    return Object.entries(counts).map(([name,value])=>({name,value}));
  }, [core, activeSlice, sliceKey]);

  if (loading) return null;
  if (!user) return <LoginPage />;
  if (user && profile && !profile.onboarded) return <OnboardingPage user={user} onComplete={() => window.location.reload()} />;

  if (!core) {
    return (
      <div style={{height:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:16,background:"#F1F5F9"}}>
        {dataError
          ? <><div style={{fontSize:14,color:"#A32D2D"}}>{dataError}</div><button onClick={()=>window.location.reload()} style={{padding:"6px 16px",borderRadius:8,border:"1px solid #E8ECF2",background:"#0D1929",cursor:"pointer",fontSize:13}}>Retry</button></>
          : <><div style={{width:44,height:44,border:"3px solid #E8ECF2",borderTopColor:"#38BDF8",borderRadius:"50%",animation:"spin 0.7s linear infinite"}}/><div style={{fontSize:14,color:"#F1F5F9",fontWeight:600}}>Loading dashboard…</div></>
        }
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  const datasetMeta = core?.meta||{};
  const pageLabel = PAGES.find(p=>p.id===page)?.label||"";

  // Page-specific filter — hide reg filter on offplan/ready pages
  const showRegFilter = page === "overview";

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:"#060E1A" }}>
      <Sidebar page={page} setPage={setPage} />
      <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>

      {/* Filter bar */}
      {page !== "areas" && page !== "projects" && page !== "map" && page !== "roi" && page !== "developers" && page !== "lookup" && page !== "pulse" && page !== "home" && page !== "markets" && page !== "ai" && (
        <FilterBar
          filters={filters} setFilters={setFilters}
          options={options} dateRange={dateRange}
          showRegFilter={page === "overview"}
        />
      )}

      {/* HOME */}
      {page === "home" && (
        <HomePage core={core} areaData={areaData} recentRaw={recentRaw} onNavigate={setPage} />
      )}

      {/* OVERVIEW */}
      {page === "overview" && core && (
        <div style={{ flex:1, overflowY:"auto", padding:"1.25rem" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1rem", marginBottom:"1.25rem" }}>
            <KpiCard label="Transactions" value={fmtNum(kpis.count)} />
            <KpiCard label="Total value" value={fmtAED(kpis.total,true)} />
            <KpiCard label="Avg deal" value={fmtAED(kpis.avg,true)} />
            <KpiCard label="Off-plan" value={`${kpis.offPlanPct}%`} />
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem", marginBottom:"1rem" }}>
            <ChartCard title="Monthly trend"><MonthlyTrend data={activeSlice?.monthly||[]} /></ChartCard>
            <ChartCard title="Price/m² trend"><PriceTrends areas={areas} areaData={areaData} allData={core?.priceTrend||[]} /></ChartCard>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"1rem", marginBottom:"1rem" }}>
            <ChartCard title="Transaction types"><TypeDonut data={typeData} /></ChartCard>
            <ChartCard title="Off-plan vs Ready"><OffPlanReady rows={expandedRecent||[]} areas={areas||[]} /></ChartCard>
            <ChartCard title="Bedroom breakdown"><BedroomBreakdown rows={expandedRecent||[]} areas={areas||[]} /></ChartCard>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem", marginBottom:"1rem" }}>
            <ChartCard title="Top areas"><AreaRanking areas={areas} areaData={areaData} /></ChartCard>
            <ChartCard title="Metro premium"><MetroPremium data={core?.metro||[]} /></ChartCard>
          </div>
          <ChartCard title="Project leaderboard">
            <ProjectLeaderboard rows={expandedRecent} allAreas={areas} onProjectClick={(name)=>{ const d=projectsData?.[name]; if(d) setSelectedProject({name,data:d}); }} />
          </ChartCard>
        </div>
      )}

      {/* OFF-PLAN */}
      {page === "offplan" && core && (
        <div style={{ flex:1, overflowY:"auto", padding:"1.25rem" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1rem", marginBottom:"1.25rem" }}>
            <KpiCard label="Off-plan deals" value={fmtNum(kpis.offPlan)} />
            <KpiCard label="Total value" value={fmtAED(kpis.total,true)} />
            <KpiCard label="Avg deal" value={fmtAED(kpis.avg,true)} />
            <KpiCard label="Share" value={`${kpis.offPlanPct}%`} />
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem", marginBottom:"1rem" }}>
            <ChartCard title="Monthly trend"><MonthlyTrend data={activeSlice?.monthly||[]} /></ChartCard>
            <ChartCard title="Top areas — off-plan"><AreaBarChart areas={areas} areaData={areaData} metric="offPlan" /></ChartCard>
          </div>
          <ChartCard title="Top projects — off-plan">
            <ProjectLeaderboard rows={expandedRecent} allAreas={areas} onProjectClick={(name)=>{ const d=projectsData?.[name]; if(d) setSelectedProject({name,data:d}); }} />
          </ChartCard>
        </div>
      )}

      {/* READY */}
      {page === "ready" && core && (
        <div style={{ flex:1, overflowY:"auto", padding:"1.25rem" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1rem", marginBottom:"1.25rem" }}>
            <KpiCard label="Ready deals" value={fmtNum(kpis.ready)} />
            <KpiCard label="Total value" value={fmtAED(kpis.total,true)} />
            <KpiCard label="Avg deal" value={fmtAED(kpis.avg,true)} />
            <KpiCard label="Share" value={`${100-kpis.offPlanPct}%`} />
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem", marginBottom:"1rem" }}>
            <ChartCard title="Monthly trend"><MonthlyTrend data={activeSlice?.monthly||[]} /></ChartCard>
            <ChartCard title="Top areas — ready"><AreaBarChart areas={areas} areaData={areaData} metric="ready" /></ChartCard>
          </div>
        </div>
      )}

      {/* AREAS */}
      {page === "areas" && (
        <AreaDeepDive areaData={areaData} areaList={areaData ? Object.keys(areaData).sort() : []} />
      )}

      {/* PROJECTS */}
      {page === "projects" && (
        <ProjectsPage projectsData={projectsData} onProjectClick={(name, data) => setSelectedProject({name, data})} />
      )}

      {/* MAP */}
      {page === "map" && (
        <div style={{ height:"calc(100vh - 0px)" }}>
          <MapView
            onAreaClick={(area) => setPage("areas")}
            onProjectClick={(name, data) => setSelectedProject({name, data})}
            projectsData={projectsData}
          />
        </div>
      )}

      {/* ROI */}
      {page === "roi" && <ROICalculator areaData={areaData} />}

      {/* DEVELOPERS */}
      {page === "developers" && <DeveloperTracker />}

      {/* MARKETS */}
      {page === "markets" && (
        <MarketIntelligence areaData={areaData} core={core} />
      )}

      {/* DEAL ANALYZER */}
      {page === "lookup" && (
        <DealAnalyzer areaData={areaData} />
      )}

      {/* AI CONCIERGE */}
      {page === "ai" && (
        <AIConcierge />
      )}

      {/* LOOKUP (old) */}
      {page === "lookup" && (
        <PropertyLookup
          onProjectClick={(name, data) => setSelectedProject({name, data})}
          projectsData={projectsData}
        />
      )}

      {/* PULSE */}
      {page === "pulse" && (
        <MarketPulse
          onAreaClick={(area) => setPage("areas")}
          onProjectClick={(name, data) => setSelectedProject({name, data})}
          projectsData={projectsData}
        />
      )}

      {selectedProject && (
        <ProjectDetail
          project={selectedProject.name}
          data={selectedProject.data}
          onClose={() => setSelectedProject(null)}
        />
      )}

      </div>
    </div>
  );
}
