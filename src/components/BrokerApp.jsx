import { useState, useMemo, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { fmtAED, fmtNum } from '../utils/format';
import useLiveTransactions from '../hooks/useLiveTransactions';
import BrokerTopBar from './BrokerTopBar';
import Sidebar from './Sidebar';
import FilterBar from './FilterBar';
import KpiCard from './KpiCard';
import ChartCard from './ChartCard';
import HomePage from './HomePage';
import MarketIntelligence from './MarketIntelligence';
import DealAnalyzer from './DealAnalyzer';
import AIConcierge from './AIConcierge';
import TypeDonut from './TypeDonut';
import MonthlyTrend from './MonthlyTrend';
import ProjectLeaderboard from './ProjectLeaderboard';
import BedroomBreakdown from './BedroomBreakdown';
import OffPlanReady from './OffPlanReady';
import MetroPremium from './MetroPremium';
import PriceTrends from './PriceTrends';
import AreaRanking from './AreaRanking';
import AreaDeepDive from './AreaDeepDive';
import ProjectsPage from './ProjectsPage';
import ProjectDetail from './ProjectDetail';
import MapView from './MapView';
import ROICalculator from './ROICalculator';
import DeveloperTracker from './DeveloperTracker';
import MarketPulse from './MarketPulse';
import UpgradePage from './UpgradePage';
import PDFExport from './PDFExport';
import RecentTransactions from './RecentTransactions';
import AreaAnalysis from './AreaAnalysis';
import RentalIndex from './RentalIndex';
import ComparableSales from './ComparableSales';
import LiveFeed from './LiveFeed';
import Watchlist from './Watchlist';
import PropertyLookup from './PropertyLookup';
import NewLaunches from './NewLaunches';
import ShareableReport from './ShareableReport';
import PriceAlerts from './PriceAlerts';
import TransactionSearch from './TransactionSearch';
import PortfolioTracker from './PortfolioTracker';
import BrokerProfile from './BrokerProfile';
import PropertiesPage from './PropertiesPage';

const DEFAULT_FILTERS = { type:'', usage:'', reg:'', propType:'', area:'', sort:'value', dateFrom:'', dateTo:'' };
const REG_EXPAND = { Off:'Off-Plan', Rea:'Ready' };
const USG_EXPAND = { Res:'Residential', Com:'Commercial', Mul:'Multi-Use', Agr:'Agricultural', Hos:'Hospitality', Ind:'Industrial', Oth:'Other' };

function expandRow(r) {
  return { ...r, type:r.t||'Other', reg:REG_EXPAND[r.r]||r.r||'', usage:USG_EXPAND[r.u]||r.u||'',
    area:r.a||'', value:r.v||0, size:r.s||0, beds:r.b||'', project:r.j||'',
    dateObj:r.d?new Date(r.d):null, amount:r.v||0, txn_size:r.s||0 };
}

function getBestSlice(slices, filters) {
  const key = filters.type && filters.reg ? `t:${filters.type}|r:${filters.reg}`
    : filters.reg ? `r:${filters.reg==='Off-Plan'?'Off-Plan':'Ready'}`
    : filters.type ? `t:${filters.type}` : 'all';
  return slices[key] || slices['all'] || null;
}

function useMobile() {
  const [m, setM] = useState(window.innerWidth < 768);
  useEffect(() => { const h = () => setM(window.innerWidth < 768); window.addEventListener('resize', h); return () => window.removeEventListener('resize', h); }, []);
  return m;
}

export default function BrokerApp() {
  const { user, profile, lang, toggleLang, isPro, isLite, signOut } = useAuth();
  const [core, setCore] = useState(null);
  const [areaData, setAreaData] = useState(null);
  const [staticRecentRaw, setStaticRecentRaw] = useState([]);
  const [dataError, setDataError] = useState(null);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [page, setPage] = useState('home');
  const [projectsData, setProjectsData] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const isMobile = useMobile();

  const { liveData, error: liveError, lastUpdate, isLive, refresh } = useLiveTransactions({ days: 30 });
  const recentRaw = (liveData && liveData.length > 0) ? liveData : staticRecentRaw;

  useEffect(() => { fetch('/data/core.json').then(r=>r.json()).then(setCore).catch(err=>setDataError(err.message)); }, []);
  useEffect(() => { fetch('/data/areas.json').then(r=>r.json()).then(setAreaData).catch(()=>{}); }, []);
  useEffect(() => { fetch('/data/projects.json').then(r=>r.json()).then(setProjectsData).catch(()=>{}); }, []);
  useEffect(() => { fetch('/data/recent.json').then(r=>r.json()).then(d=>setStaticRecentRaw(d.recentRaw||[])).catch(()=>{}); }, []);

  const options = useMemo(() => {
    if (!core) return { types:[], usages:[], regs:[], propTypes:[] };
    return { types:[...new Set(core.types.map(tx => tx.name))].sort(), usages:['Residential','Commercial'], regs:Object.keys(core.regSplit).filter(r=>r!=='Other').sort(), propTypes:[] };
  }, [core]);

  const dateRange = { min:'2020-01-01', max:'2026-04-09' };
  const activeSlice = useMemo(() => { if (!core?.slices) return null; return getBestSlice(core.slices, filters); }, [core, filters]);
  const areas = useMemo(() => { if (!activeSlice) return []; let list = activeSlice.areas||[]; if (filters.area) list = list.filter(a=>a.area.toLowerCase().includes(filters.area.toLowerCase())); const sk = filters.sort==='count'?'count':filters.sort==='avg'?'avg':'total'; return [...list].sort((a,b)=>b[sk]-a[sk]); }, [activeSlice, filters]);
  const monthlyData = useMemo(() => activeSlice?.monthly || [], [activeSlice]);
  const expandedRecent = useMemo(() => {
    if (!recentRaw.length) return [];
    let rows = recentRaw;
    if (filters.type) rows = rows.filter(r=>(r.t||'Other')===filters.type);
    if (filters.reg) rows = rows.filter(r=>(REG_EXPAND[r.r]||r.r||'')===filters.reg);
    if (filters.usage) rows = rows.filter(r=>(USG_EXPAND[r.u]||r.u||'')===filters.usage);
    if (filters.area) rows = rows.filter(r=>(r.a||'').toLowerCase().includes(filters.area.toLowerCase()));
    return rows.map(expandRow);
  }, [recentRaw, filters]);
  const kpis = useMemo(() => {
    if (!activeSlice) return { count:0, total:0, avg:0, offPlan:0, ready:0, offPlanPct:0 };
    const total = areas.reduce((s,a)=>s+a.count,0);
    const value = areas.reduce((s,a)=>s+a.total,0);
    const offPlan = core?.slices?.['r:Off-Plan']?.count||0;
    const ready   = core?.slices?.['r:Ready']?.count||0;
    const opPct   = offPlan+ready>0 ? Math.round(offPlan/(offPlan+ready)*100) : 0;
    return { count:total, total:value, avg:total?value/total:0, offPlan, ready, offPlanPct:opPct };
  }, [activeSlice, areas, core]);

  if (!core) return (
    <div style={{height:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:16,background:'var(--bg)'}}>
      {dataError
        ? <><div style={{fontSize:14,color:'#F87171'}}>{dataError}</div><button onClick={()=>window.location.reload()} style={{padding:'6px 16px',borderRadius:8,background:'#0D1929',color:'#F1F5F9',border:'1px solid rgba(59,130,246,0.2)',cursor:'pointer',fontSize:13}}>Retry</button></>
        : <><div style={{width:44,height:44,border:'3px solid rgba(59,130,246,0.2)',borderTopColor:'#38BDF8',borderRadius:'50%',animation:'spin 0.7s linear infinite'}}/><div style={{fontSize:14,color:'#64748B',fontWeight:600}}>Loading PropSight…</div></>
      }
      <style>{'@keyframes spin{to{transform:rotate(360deg)}}'}</style>
    </div>
  );

  return (
    <div style={{display:'flex',minHeight:'100vh',background:'var(--bg)',flexDirection:isMobile?'column':'row'}} dir={lang==='ar'?'rtl':'ltr'}>
      <Sidebar page={page} setPage={setPage} />
      <div style={{display:'flex',flexDirection:'column',flex:1,overflow:'hidden',minWidth:0}}>
        <BrokerTopBar user={user} profile={profile} signOut={signOut} toggleLang={toggleLang} lang={lang} isLive={isLive} lastUpdate={lastUpdate} liveError={liveError} onRefresh={refresh} />
        <div style={{flex:1,display:'flex',flexDirection:'column',overflow:'hidden',minWidth:0}}>
          {page==='home'     && <HomePage core={core} areaData={areaData} recentRaw={recentRaw} onNavigate={setPage} isPro={isPro} isLite={isLite} />}
          {page==='overview' && <FilterBar filters={filters} setFilters={setFilters} options={options} dateRange={dateRange} showRegFilter={true} />}
          {page==='overview' && (
            <div style={{flex:1,overflowY:'auto',padding:'1.25rem',background:'var(--bg)'}}>
              <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'1rem',marginBottom:'1.25rem'}}>
                <KpiCard label="Transactions" value={fmtNum(kpis.count)} sub={'Data as of '+(core?.meta?.lastUpdated||'')} />
                <KpiCard label="Total value"  value={fmtAED(kpis.total,true)} />
                <KpiCard label="Avg deal"     value={fmtAED(kpis.avg,true)} />
                <KpiCard label="Off-plan"     value={kpis.offPlanPct+'%'} />
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem',marginBottom:'1rem'}}>
                <ChartCard title="Monthly trend"><MonthlyTrend data={monthlyData} /></ChartCard>
                <ChartCard title="Price trend"><PriceTrends rows={expandedRecent} priceTrend={core?.priceTrend||[]} /></ChartCard>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem',marginBottom:'1rem'}}>
                <ChartCard title="Bedroom breakdown"><BedroomBreakdown rows={expandedRecent} /></ChartCard>
                <ChartCard title="Off-plan vs Ready"><OffPlanReady rows={expandedRecent} areas={areas} /></ChartCard>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem',marginBottom:'1rem'}}>
                <ChartCard title="Top areas"><AreaRanking rows={expandedRecent} areas={areas} /></ChartCard>
                <ChartCard title="Metro premium"><MetroPremium rows={expandedRecent} /></ChartCard>
              </div>
              <ChartCard title="Project leaderboard">
                <ProjectLeaderboard rows={expandedRecent} allAreas={areas} onProjectClick={(name)=>{ const d=projectsData?.[name]; if(d) setSelectedProject({name,data:d}); }} />
              </ChartCard>
            </div>
          )}
          {page==='areas'        && <AreaAnalysis areaData={areaData} recentRaw={recentRaw} />}
          {page==='map'          && <div style={{height:'100vh'}}><MapView onAreaClick={(area)=>{ setSelectedArea(area); setPage('areas'); }} onProjectClick={(name,data)=>setSelectedProject({name,data})} projectsData={projectsData} /></div>}
          {page==='roi'          && <ROICalculator areaData={areaData} />}
          {page==='offplan'      && <PropertiesPage recentRaw={recentRaw} projectsData={projectsData} onProjectClick={(name,data)=>setSelectedProject({name,data})} />}
          {page==='recent'       && <RecentTransactions recentRaw={recentRaw} />}
          {page==='brokerprofile'&& <BrokerProfile areaData={areaData} core={core} recentRaw={recentRaw} projectsData={projectsData} onNavigate={setPage} />}
          {page==='rental'       && <RentalIndex areaData={areaData} />}
          {page==='pdf'          && <PDFExport areaData={areaData} core={core} />}
          {page==='upgrade'      && <UpgradePage />}
          {page==='comps'        && <ComparableSales recentRaw={recentRaw} />}
          {page==='lookup2'      && <PropertyLookup recentRaw={recentRaw} />}
          {page==='projects'     && <ProjectsPage projectsData={projectsData} onProjectClick={(name,data)=>setSelectedProject({name,data})} />}
          {page==='watchlist'    && <Watchlist areaData={areaData} projectsData={projectsData} setPage={setPage} />}
          {page==='portfolio'    && <PortfolioTracker areaData={areaData} />}
          {page==='developers'   && <DeveloperTracker projectsData={projectsData} areaData={areaData} />}
          {page==='markets'      && <MarketIntelligence areaData={areaData} core={core} />}
          {page==='lookup'       && <DealAnalyzer areaData={areaData} />}
          {page==='ai'           && <AIConcierge />}
          {page==='alerts'       && <PriceAlerts areaData={areaData} />}
          {page==='reports'      && <ShareableReport areaData={areaData} core={core} />}
          {page==='pulse'        && <MarketPulse onAreaClick={()=>setPage('areas')} onProjectClick={(name,data)=>setSelectedProject({name,data})} projectsData={projectsData} core={core} areaData={areaData} />}
          {page==='livefeed'     && <LiveFeed recentRaw={recentRaw} />}
          {page==='search'       && <TransactionSearch recentRaw={recentRaw} />}
          {page==='newlaunches'  && <NewLaunches projectsData={projectsData} onProjectClick={(name,data)=>setSelectedProject({name,data})} />}
          {selectedProject && <ProjectDetail project={selectedProject.name} data={selectedProject.data} onClose={()=>setSelectedProject(null)} />}
        </div>
      </div>
    </div>
  );
}
