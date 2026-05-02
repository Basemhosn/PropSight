import { useState, useMemo, useEffect } from "react";
import { t } from './i18n';
import { useAuth } from "./context/AuthContext";
import LoginPage from "./components/LoginPage";
import LandingPage from "./components/LandingPage";
import InvestorApp from "./components/InvestorApp";
import OnboardingPage from "./components/OnboardingPage";
import { fmtAED, fmtNum } from "./utils/format";
import Sidebar from "./components/Sidebar";
import HomePage from "./components/HomePage";
import PropertiesPage from "./components/PropertiesPage";
import MarketIntelligence from "./components/MarketIntelligence";
import DealAnalyzer from "./components/DealAnalyzer";
import AIConcierge from "./components/AIConcierge";
import FilterBar from "./components/FilterBar";
import KpiCard from "./components/KpiCard";
import TypeDonut from "./components/TypeDonut";
import MonthlyTrend from "./components/MonthlyTrend";
import ProjectLeaderboard from "./components/ProjectLeaderboard";
import BedroomBreakdown from "./components/BedroomBreakdown";
import OffPlanReady from "./components/OffPlanReady";
import MetroPremium from "./components/MetroPremium";
import PriceTrends from "./components/PriceTrends";
import AreaRanking from "./components/AreaRanking";
import AreaDeepDive from "./components/AreaDeepDive";
import ChartCard from "./components/ChartCard";
import ProjectsPage from "./components/ProjectsPage";
import ProjectDetail from "./components/ProjectDetail";
import MapView from "./components/MapView";
import ROICalculator from "./components/ROICalculator";
import DeveloperTracker from "./components/DeveloperTracker";
import MarketPulse from "./components/MarketPulse";
import UpgradePage from "./components/UpgradePage";
import PDFExport from "./components/PDFExport";
import RecentTransactions from "./components/RecentTransactions";
import AreaAnalysis from "./components/AreaAnalysis";
import RentalIndex from "./components/RentalIndex";
import ComparableSales from "./components/ComparableSales";
import LiveFeed from "./components/LiveFeed";
import Watchlist from "./components/Watchlist";
import PropertyLookup from "./components/PropertyLookup";
import NewLaunches from "./components/NewLaunches";
import ShareableReport from "./components/ShareableReport";
import PriceAlerts from "./components/PriceAlerts";
import TransactionSearch from "./components/TransactionSearch";
import PrivacyPolicy from './components/PrivacyPolicy';
import PortfolioTracker from "./components/PortfolioTracker";
import useLiveTransactions from './hooks/useLiveTransactions';
import BrokerProfile from './components/BrokerProfile';

const DEFAULT_FILTERS = { type:"", usage:"", reg:"", propType:"", area:"", sort:"value", dateFrom:"", dateTo:"" };
const REG_EXPAND = { Off:"Off-Plan", Rea:"Ready" };
const USG_EXPAND = { Res:"Residential", Com:"Commercial", Mul:"Multi-Use", Agr:"Agricultural", Hos:"Hospitality", Ind:"Industrial", Oth:"Other" };

function expandRow(r) {
  return { txn_num:r.n||"", date:r.d||"", month:r.m||"", type:r.t||"Other",
    reg:REG_EXPAND[r.r]||r.r||"", usage:USG_EXPAND[r.u]||r.u||"Other",
    area:r.a||"Unknown", amount:r.v||0, txn_size:r.s||0, rooms:r.b||"", metro:r.e||"", project:r.j||"" };
}

function getBestSlice(slices, filters) {
  if (!slices) return null;
  const parts = [];
  if (filters.type) parts.push("t:"+filters.type);
  if (filters.reg) parts.push("r:"+filters.reg);
  if (filters.usage) parts.push("u:"+filters.usage);
  const key = parts.join("|") || "all";
  if (slices[key]) return slices[key];
  for (let i = parts.length-1; i >= 1; i--) { const k = parts.slice(0,i).join("|"); if (slices[k]) return slices[k]; }
  if (parts.length && slices[parts[0]]) return slices[parts[0]];
  return slices["all"];
}

function useMobile() {
  const [m, setM] = useState(() => window.innerWidth < 769);
  useEffect(() => { const h = () => setM(window.innerWidth < 769); window.addEventListener('resize', h); return () => window.removeEventListener('resize', h); }, []);
  return m;
}

function BrokerTopBar({ user, profile, signOut, toggleLang, lang, isLive, lastUpdate, liveError, onRefresh }) {
  const [showMenu, setShowMenu] = useState(false);
  const [themeMode, setThemeMode] = useState(() => localStorage.getItem('theme') || 'dark');

  const toggleTheme = () => {
    const next = themeMode === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    setThemeMode(next);
  };

  const switchToInvestor = async () => {
    const { supabase } = await import('./context/AuthContext');
    await supabase.from('profiles').update({ role: 'investor' }).eq('id', user?.id);
    window.location.reload();
  };

  return (
    <div style={{height:52,borderBottom:'1px solid var(--border)',background:'var(--bg-alt)',display:'flex',alignItems:'center',justifyContent:'flex-end',padding:'0 20px',gap:10,flexShrink:0}}>
      {/* Live data indicator */}
      <div
        onClick={onRefresh}
        title={liveError ? `Error: ${liveError}` : lastUpdate ? `Updated ${lastUpdate.toLocaleTimeString()}` : 'Loading...'}
        style={{display:'flex',alignItems:'center',gap:6,background:isLive?'rgba(34,197,94,0.08)':'rgba(245,158,11,0.08)',border:`1px solid ${isLive?'rgba(34,197,94,0.2)':'rgba(245,158,11,0.2)'}`,borderRadius:20,padding:'4px 12px',cursor:'pointer'}}>
        <div style={{width:6,height:6,borderRadius:'50%',background:isLive?'#22C55E':'#F59E0B',boxShadow:`0 0 6px ${isLive?'#22C55E':'#F59E0B'}`}}/>
        <span style={{fontSize:11,fontWeight:600,color:isLive?'#22C55E':'#F59E0B'}}>
          {isLive ? 'DDA LIVE' : liveError ? 'STATIC DATA' : 'CONNECTING...'}
        </span>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:6,background:'rgba(245,158,11,0.08)',border:'1px solid rgba(245,158,11,0.2)',borderRadius:20,padding:'4px 12px'}}>
        <span style={{fontSize:11}}>🏢</span>
        <span style={{fontSize:11,fontWeight:600,color:'#F59E0B'}}>Broker Portal</span>
      </div>
      <button onClick={switchToInvestor} style={{fontSize:11,color:'var(--text-secondary)',background:'none',border:'1px solid var(--border)',borderRadius:8,padding:'5px 10px',cursor:'pointer',fontFamily:'inherit'}}>
        Switch to Investor →
      </button>
      <button onClick={toggleTheme} style={{background:'none',border:'1px solid var(--border)',borderRadius:8,padding:'5px 8px',fontSize:13,color:'var(--text-secondary)',cursor:'pointer'}}>
        {themeMode === 'dark' ? '☀️' : '🌙'}
      </button>
      <button onClick={toggleLang} style={{background:'none',border:'1px solid var(--border)',borderRadius:8,padding:'5px 8px',fontSize:12,color:'var(--text-secondary)',cursor:'pointer'}}>
        {lang==='ar'?'🇬🇧 EN':'🇦🇪 AR'}
      </button>
      <div style={{position:'relative'}}>
        <div onClick={() => setShowMenu(m => !m)} style={{width:30,height:30,borderRadius:'50%',background:'linear-gradient(135deg,#1D4ED8,#38BDF8)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:700,color:'#fff',cursor:'pointer'}}>
          {(profile?.full_name?.[0] || user?.email?.[0] || 'U').toUpperCase()}
        </div>
        {showMenu && (
          <div style={{position:'absolute',right:0,top:38,background:'var(--surface)',border:'1px solid var(--border)',borderRadius:10,padding:8,minWidth:180,boxShadow:'0 8px 24px rgba(0,0,0,0.2)',zIndex:999}}>
            <div style={{fontSize:12,color:'var(--text-muted)',padding:'4px 8px',marginBottom:4}}>{user?.email}</div>
            <button onClick={() => { setShowMenu(false); signOut(); }} style={{width:'100%',padding:'8px',borderRadius:8,border:'none',background:'none',cursor:'pointer',fontSize:13,color:'#F87171',textAlign:'left',fontFamily:'inherit'}}>
              Sign out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const { user, profile, loading, theme, lang, toggleLang, isPro, isLite, signOut, colors } = useAuth();
  const [core, setCore] = useState(null);
  const [areaData, setAreaData] = useState(null);
  const [staticRecentRaw, setStaticRecentRaw] = useState([]);
  const [dataError, setDataError] = useState(null);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [page, setPage] = useState("home");
  const [showLogin, setShowLogin] = useState(false);
  const [projectsData, setProjectsData] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const isMobile = useMobile();

  // Live DDA data — runs in browser (UAE IP), falls back to static
  const { liveData, loading: liveLoading, error: liveError, lastUpdate, isLive, refresh } = useLiveTransactions({ days: 30 });

  // Use live data if available, otherwise fall back to static recent.json
  const recentRaw = (liveData && liveData.length > 0) ? liveData : staticRecentRaw;
  console.log("DDA liveData count:", liveData?.length, "first:", JSON.stringify(liveData?.[0]));

  useEffect(() => { fetch("/data/core.json").then(r=>r.json()).then(setCore).catch(err=>setDataError(err.message)); }, []);
  useEffect(() => { fetch("/data/areas.json").then(r=>r.json()).then(setAreaData).catch(()=>{}); }, []);
  useEffect(() => { fetch("/data/projects.json").then(r=>r.json()).then(setProjectsData).catch(()=>{}); }, []);
  // Static fallback — only used if DDA live fetch fails
  useEffect(() => { fetch("/data/recent.json").then(r=>r.json()).then(d=>setStaticRecentRaw(d.recentRaw||[])).catch(()=>{}); }, []);

  const options = useMemo(() => {
    if (!core) return { types:[], usages:[], regs:[], propTypes:[] };
    return { types:[...new Set(core.types.map(t=>t.name))].sort(), usages:["Residential","Commercial"], regs:Object.keys(core.regSplit).filter(r=>r!=="Other").sort(), propTypes:[] };
  }, [core]);

  const dateRange = { min:"2020-01-01", max:"2026-04-09" };
  const activeSlice = useMemo(() => { if (!core?.slices) return null; return getBestSlice(core.slices, filters); }, [core, filters.type, filters.reg, filters.usage]);
  const areas = useMemo(() => { if (!activeSlice) return []; let list = activeSlice.areas||[]; if (filters.area) list = list.filter(a=>a.area.toLowerCase().includes(filters.area.toLowerCase())); const sk = filters.sort==="count"?"count":filters.sort==="avg"?"avg":"total"; return [...list].sort((a,b)=>b[sk]-a[sk]); }, [activeSlice, filters.area, filters.sort]);
  const monthlyData = useMemo(() => activeSlice?.monthly || [], [activeSlice]);
  const expandedRecent = useMemo(() => { if (!recentRaw.length) return []; let rows = recentRaw; if (filters.type) rows = rows.filter(r=>(r.t||"Other")===filters.type); if (filters.reg) rows = rows.filter(r=>(REG_EXPAND[r.r]||r.r||"")===filters.reg); if (filters.usage) rows = rows.filter(r=>(USG_EXPAND[r.u]||r.u||"")===filters.usage); if (filters.area) rows = rows.filter(r=>(r.a||"").toLowerCase().includes(filters.area.toLowerCase())); return rows.map(expandRow); }, [recentRaw, filters.type, filters.reg, filters.usage, filters.area]);
  const kpis = useMemo(() => { if (!activeSlice) return { count:0, total:0, avg:0, offPlan:0, ready:0, offPlanPct:0 }; const total=areas.reduce((s,a)=>s+a.count,0); const value=areas.reduce((s,a)=>s+a.total,0); const offPlan=core?.slices?.["r:Off-Plan"]?.count||0; const ready=core?.slices?.["r:Ready"]?.count||0; const opPct=offPlan+ready>0?Math.round(offPlan/(offPlan+ready)*100):0; return { count:total, total:value, avg:total?value/total:0, offPlan, ready, offPlanPct:opPct }; }, [activeSlice, areas, core]);
  const typeData = useMemo(() => core?.types || [], [core]);

  if (loading) return null;
  if (user && profile && profile.onboarded === false) return <OnboardingPage user={user} onComplete={() => window.location.reload()} />;

  if (!user) { if (showLogin) return <LoginPage />; return <LandingPage
        onLogin={() => setShowLogin(true)}
        onInvestorLogin={() => { setShowLogin(true); sessionStorage.setItem('intended_role','investor'); }}
        onBrokerLogin={() => { setShowLogin(true); sessionStorage.setItem('intended_role','broker'); }}
      />; }
  if (user && profile?.role === 'investor') {
    return <InvestorApp areaData={areaData} recentRaw={recentRaw} core={core} projectsData={projectsData}
      onSwitchToBroker={async () => {
        const { createClient } = await import('@supabase/supabase-js');
        const sb = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ANON_KEY);
        await sb.from('profiles').update({role:'broker'}).eq('id', user.id);
        window.location.reload();
      }}
    />;
  }
  if (!core) {
    return (
      <div style={{height:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:16,background:"var(--bg)"}}>
        {dataError ? <><div style={{fontSize:14,color:"#F87171"}}>{dataError}</div><button onClick={()=>window.location.reload()} style={{padding:"6px 16px",borderRadius:8,background:"#0D1929",color:"#F1F5F9",border:"1px solid rgba(59,130,246,0.2)",cursor:"pointer",fontSize:13}}>Retry</button></> : <><div style={{width:44,height:44,border:"3px solid rgba(59,130,246,0.2)",borderTopColor:"#38BDF8",borderRadius:"50%",animation:"spin 0.7s linear infinite"}}/><div style={{fontSize:14,color:"#64748B",fontWeight:600}}>Loading PropSight…</div></>}
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  return (
    <div style={{display:"flex",minHeight:"100vh",background:"var(--bg)",flexDirection:isMobile?"column":"row"}} dir={lang==="ar"?"rtl":"ltr"}>
      <Sidebar page={page} setPage={setPage} />
      <div style={{display:'flex',flexDirection:'column',flex:1,overflow:'hidden',minWidth:0}}>
        <BrokerTopBar user={user} profile={profile} signOut={signOut} toggleLang={toggleLang} lang={lang} isLive={isLive} lastUpdate={lastUpdate} liveError={liveError} onRefresh={refresh} />
        <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden",minWidth:0}}>
          {page === "home" && <HomePage core={core} areaData={areaData} recentRaw={recentRaw} onNavigate={setPage} isPro={isPro} isLite={isLite} />}
          {page === "overview" && <FilterBar filters={filters} setFilters={setFilters} options={options} dateRange={dateRange} showRegFilter={true} />}
          {page === "overview" && (
            <div style={{flex:1,overflowY:"auto",padding:"1.25rem",background:"var(--bg)"}}>
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"1rem",marginBottom:"1.25rem"}}>
                <KpiCard label="Transactions" value={fmtNum(kpis.count)} sub={"Data as of "+(core?.meta?.lastUpdated||"")}/>
                <KpiCard label="Total value" value={fmtAED(kpis.total,true)} />
                <KpiCard label="Avg deal" value={fmtAED(kpis.avg,true)} />
                <KpiCard label="Off-plan" value={kpis.offPlanPct+"%"} />
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",marginBottom:"1rem"}}>
                <ChartCard title="Monthly trend"><MonthlyTrend data={monthlyData} /></ChartCard>
                <ChartCard title="Price trend"><PriceTrends rows={expandedRecent} priceTrend={core?.priceTrend||[]} /></ChartCard>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",marginBottom:"1rem"}}>
                <ChartCard title="Bedroom breakdown"><BedroomBreakdown rows={expandedRecent} /></ChartCard>
                <ChartCard title="Off-plan vs Ready"><OffPlanReady rows={expandedRecent} areas={areas} /></ChartCard>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",marginBottom:"1rem"}}>
                <ChartCard title="Top areas"><AreaRanking rows={expandedRecent} areas={areas} /></ChartCard>
                <ChartCard title="Metro premium"><MetroPremium rows={expandedRecent} /></ChartCard>
              </div>
              <ChartCard title="Project leaderboard">
                <ProjectLeaderboard rows={expandedRecent} allAreas={areas} onProjectClick={(name)=>{ const d=projectsData?.[name]; if(d) setSelectedProject({name,data:d}); }} />
              </ChartCard>
            </div>
          )}
          {page === "areas" && <AreaAnalysis areaData={areaData} recentRaw={recentRaw} />}
          {page === "map" && <div style={{height:"100vh"}}><MapView onAreaClick={(area)=>{ setSelectedArea(area); setPage("areas"); }} onProjectClick={(name,data)=>setSelectedProject({name,data})} projectsData={projectsData} /></div>}
          {page === "roi" && <ROICalculator areaData={areaData} />}
          {page === "offplan" && <PropertiesPage recentRaw={recentRaw} projectsData={projectsData} onProjectClick={(name,data)=>setSelectedProject({name,data})} />}
          {page === "recent" && <RecentTransactions recentRaw={recentRaw} />}
        {page === "brokerprofile" && <BrokerProfile areaData={areaData} core={core} recentRaw={recentRaw} projectsData={projectsData} onNavigate={setPage} />}
          {page === "rental" && <RentalIndex areaData={areaData} />}
          {page === "pdf" && <PDFExport areaData={areaData} core={core} />}
          {page === "upgrade" && <UpgradePage />}
          {page === "comps" && <ComparableSales recentRaw={recentRaw} />}
          {page === "lookup2" && <PropertyLookup recentRaw={recentRaw} />}
          {page === "projects" && <ProjectsPage projectsData={projectsData} onProjectClick={(name,data)=>setSelectedProject({name,data})} />}
          {page === "watchlist" && <Watchlist areaData={areaData} projectsData={projectsData} setPage={setPage} />}
          {page === "portfolio" && <PortfolioTracker areaData={areaData} />}
          {page === "developers" && <DeveloperTracker projectsData={projectsData} areaData={areaData} />}
          {page === "markets" && <MarketIntelligence areaData={areaData} core={core} />}
          {page === "lookup" && <DealAnalyzer areaData={areaData} />}
          {page === "ai" && <AIConcierge />}
          {page === "alerts" && <PriceAlerts areaData={areaData} />}
          {page === "reports" && <ShareableReport areaData={areaData} core={core} />}
          {page === "pulse" && <MarketPulse onAreaClick={()=>setPage("areas")} onProjectClick={(name,data)=>setSelectedProject({name,data})} projectsData={projectsData} core={core} areaData={areaData} />}
          {page === "livefeed" && <LiveFeed recentRaw={recentRaw} />}
          {page === "search" && <TransactionSearch recentRaw={recentRaw} />}
          {selectedProject && <ProjectDetail project={selectedProject.name} data={selectedProject.data} onClose={()=>setSelectedProject(null)} />}
        </div>
      </div>
    </div>
  );
}
