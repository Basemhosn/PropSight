import { useState, useMemo, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import LoginPage from "./components/LoginPage";
import { groupByArea, groupByMonth, groupByType, getUniqueValues } from "./utils/parseCSV";
import { fmtAED, fmtNum } from "./utils/format";
import { datasetMeta } from "./data/meta";
import { expandTransactions } from "./data/adapter";

import TopNav from "./components/TopNav";
import FilterBar from "./components/FilterBar";
import KpiCard from "./components/KpiCard";
import AreaBarChart from "./components/AreaBarChart";
import TypeDonut from "./components/TypeDonut";
import MonthlyTrend from "./components/MonthlyTrend";
import AreaTable from "./components/AreaTable";
import TopAreaDetail from "./components/TopAreaDetail";
import UsageChart from "./components/UsageChart";
import DubaiMap from "./components/DubaiMap";
import ProjectLeaderboard from "./components/ProjectLeaderboard";
import BedroomBreakdown from "./components/BedroomBreakdown";
import OffPlanReady from "./components/OffPlanReady";
import ExportPDF, { CHART_IDS } from "./components/ExportPDF";
import MetroPremium from "./components/MetroPremium";
import VelocityTracker from "./components/VelocityTracker";
import PricePerSqm from "./components/PricePerSqm";
import YearOnYear from "./components/YearOnYear";

const DEFAULT_FILTERS = {
  type: "", usage: "", reg: "", propType: "",
  area: "", sort: "value", dateFrom: "", dateTo: ""
};

export default function App() {
  const { isSignedIn, isLoaded } = useAuth();
  const [allRows, setAllRows] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [dataError, setDataError] = useState(null);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [selectedArea, setSelectedArea] = useState(null);

  // Load data from public JSON at runtime
  useEffect(() => {
    fetch("/data/transactions.json")
      .then(r => {
        if (!r.ok) throw new Error(`Failed to load data: ${r.status}`);
        return r.json();
      })
      .then(raw => {
        setAllRows(expandTransactions(raw));
        setDataLoading(false);
      })
      .catch(err => {
        setDataError(err.message);
        setDataLoading(false);
      });
  }, []);

  // Filter options — derived from full dataset
  const options = useMemo(() => {
    if (!allRows.length) return { types: [], usages: [], regs: [], propTypes: [] };
    return {
      types:     getUniqueValues(allRows, "type"),
      usages:    getUniqueValues(allRows, "usage"),
      regs:      getUniqueValues(allRows, "reg"),
      propTypes: getUniqueValues(allRows, "prop_type"),
    };
  }, [allRows]);

  // Date range for picker
  const dateRange = useMemo(() => {
    const dates = allRows.map(r => r.dateObj).filter(Boolean);
    if (!dates.length) return { min: "", max: "" };
    const fmt = d => d.toISOString().slice(0, 10);
    return {
      min: fmt(new Date(Math.min(...dates))),
      max: fmt(new Date(Math.max(...dates))),
    };
  }, [allRows]);

  // Apply filters
  const filtered = useMemo(() => {
    const from = filters.dateFrom ? new Date(filters.dateFrom) : null;
    const to   = filters.dateTo   ? new Date(filters.dateTo + "T23:59:59") : null;
    return allRows.filter(r =>
      (!filters.type     || r.type === filters.type) &&
      (!filters.usage    || r.usage === filters.usage) &&
      (!filters.reg      || r.reg === filters.reg) &&
      (!filters.propType || r.prop_type === filters.propType) &&
      (!filters.area     || r.area.toLowerCase().includes(filters.area.toLowerCase())) &&
      (!from || (r.dateObj && r.dateObj >= from)) &&
      (!to   || (r.dateObj && r.dateObj <= to))
    );
  }, [allRows, filters]);

  // Derived aggregations
  const areas = useMemo(() => {
    const a = groupByArea(filtered);
    const sk = filters.sort === "count" ? "count" : filters.sort === "avg" ? "avg" : "total";
    return a.sort((x, y) => y[sk] - x[sk]);
  }, [filtered, filters.sort]);

  const monthlyData = useMemo(() => groupByMonth(filtered), [filtered]);
  const typeData    = useMemo(() => groupByType(filtered), [filtered]);

  const kpis = useMemo(() => {
    const total = filtered.length;
    const value = filtered.reduce((s, r) => s + r.amount, 0);
    const avg   = total ? value / total : 0;
    const uniqueAreas = new Set(filtered.map(r => r.area)).size;
    const topArea = areas[0]?.area || "—";
    return { total, value, avg, uniqueAreas, topArea };
  }, [filtered, areas]);

  // Auth guard
  if (!isLoaded) return null;
  if (!isSignedIn) return <LoginPage />;

  // Data loading screen
  if (dataLoading) {
    return (
      <div style={{ height: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 16, background: "#F4F6FA" }}>
        <div style={{ width: 44, height: 44, border: "3px solid #E8ECF2",
          borderTopColor: "#185FA5", borderRadius: "50%",
          animation: "spin 0.7s linear infinite" }} />
        <div style={{ fontSize: 14, color: "#7A8499" }}>Loading {fmtNum(datasetMeta.totalRows)} transactions…</div>
        <div style={{ fontSize: 12, color: "#9AA0AE" }}>
          {datasetMeta.dateRange.from} → {datasetMeta.dateRange.to}
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    );
  }

  if (dataError) {
    return (
      <div style={{ height: "100vh", display: "flex", alignItems: "center",
        justifyContent: "center", flexDirection: "column", gap: 12 }}>
        <div style={{ fontSize: 14, color: "#A32D2D" }}>Failed to load data</div>
        <div style={{ fontSize: 12, color: "#9AA0AE" }}>{dataError}</div>
        <button onClick={() => window.location.reload()}
          style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid #E8ECF2",
            background: "#fff", cursor: "pointer", fontSize: 13 }}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#F4F6FA" }}>
      <TopNav datasetMeta={datasetMeta} filteredCount={filtered.length} />
      <FilterBar filters={filters} setFilters={setFilters} options={options} dateRange={dateRange} />

      <div style={{ padding: "1.25rem", maxWidth: 1400, margin: "0 auto" }}>

        {/* KPI cards */}
        <div className="grid-kpi">
          <KpiCard label="Total transactions" value={fmtNum(kpis.total)}
            sub={`Across ${fmtNum(kpis.uniqueAreas)} areas`} />
          <KpiCard label="Total value" value={fmtAED(kpis.value, true)} sub="Sum of all amounts" />
          <KpiCard label="Avg transaction"  value={fmtAED(kpis.avg, true)} sub="Per deal" />
          <KpiCard label="Top area" value={kpis.topArea} sub="By total transaction value" />
        </div>

        {/* Charts row */}
        <div className="grid-2col">
          <div id={CHART_IDS.barChart}><AreaBarChart areas={areas} onAreaClick={setSelectedArea} /></div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div id={CHART_IDS.typeDonut}><TypeDonut data={typeData} /></div>
            <div id={CHART_IDS.monthly}><MonthlyTrend data={monthlyData} /></div>
          </div>
        </div>

        {/* Usage */}
        <div style={{ marginBottom: "1.25rem" }}>
          <UsageChart areas={areas} />
        </div>

        {/* Map + Leaderboard */}
        <div className="grid-map">
          <div id={CHART_IDS.map}><DubaiMap areas={areas} /></div>
          <div id={CHART_IDS.leaderboard}>
            <ProjectLeaderboard rows={filtered} allAreas={areas} />
          </div>
        </div>

        {/* Price per sqm + YoY */}
        <div className="grid-2col-equal">
          <div id={CHART_IDS.priceSqm}><PricePerSqm areas={areas} /></div>
          <div id={CHART_IDS.yoy}><YearOnYear rows={filtered} /></div>
        </div>

        {/* Metro + Velocity */}
        <div className="grid-2col-equal">
          <div id={CHART_IDS.metro}><MetroPremium rows={filtered} /></div>
          <div id={CHART_IDS.velocity}><VelocityTracker rows={filtered} areas={areas} /></div>
        </div>

        {/* Bedroom + Off-plan */}
        <div className="grid-2col-equal">
          <div id={CHART_IDS.bedroom}><BedroomBreakdown rows={filtered} areas={areas} /></div>
          <div id={CHART_IDS.offplan}><OffPlanReady rows={filtered} areas={areas} /></div>
        </div>

        {/* Area table */}
        <div id={CHART_IDS.table}>
          <AreaTable areas={areas} onRowClick={setSelectedArea} />
        </div>

        {/* Footer */}
        <div style={{ marginTop: "1.25rem", paddingBottom: "1.5rem",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 8, fontSize: 11, color: "#9AA0AE" }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[
              "Dubai Land Department (DLD)",
              "Official Open Data",
              `${fmtNum(datasetMeta.totalRows)} transactions`,
              `${datasetMeta.dateRange.from} → ${datasetMeta.dateRange.to}`,
              `Updated: ${datasetMeta.lastUpdated}`,
            ].map(s => (
              <span key={s} style={{ background: "#fff", border: "1px solid #E8ECF2",
                borderRadius: 4, padding: "2px 8px" }}>{s}</span>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <ExportPDF kpis={kpis} areas={areas} filters={filters}
              fileName={`DLD_${datasetMeta.lastUpdated}`} isDemo={false} />
            <a href="https://dubailand.gov.ae/en/open-data/real-estate-data/"
              target="_blank" rel="noreferrer"
              style={{ color: "#185FA5", fontSize: 11, textDecoration: "none" }}>
              Get latest data from DLD →
            </a>
          </div>
        </div>
      </div>

      {selectedArea && (
        <TopAreaDetail area={selectedArea} onClose={() => setSelectedArea(null)} />
      )}
    </div>
  );
}
