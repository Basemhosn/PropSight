import { Search, SlidersHorizontal, X } from "lucide-react";

const sel = {
  fontSize: 13, padding: "6px 10px", borderRadius: 8,
  border: "1px solid #E8ECF2", background: "#0D1929", color: "#F1F5F9",
  outline: "none", cursor: "pointer",
};

const dateInput = {
  fontSize: 13, padding: "6px 10px", borderRadius: 8,
  border: "1px solid #E8ECF2", background: "#0D1929", color: "#F1F5F9",
  outline: "none", cursor: "pointer",
};

export default function FilterBar({ filters, setFilters, options, dateRange }) {
  const set = (key) => (e) => setFilters((f) => ({ ...f, [key]: e.target.value }));

  const hasDateFilter = filters.dateFrom || filters.dateTo;

  const clearDates = () => setFilters(f => ({ ...f, dateFrom: "", dateTo: "" }));

  return (
    <div style={{
      display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center",
      padding: "0.75rem 1rem",
      background: "#0D1929", borderBottom: "1px solid #E8ECF2",
      overflowX: "auto",
    }}>
      <SlidersHorizontal size={14} color="#9AA0AE" />

      {/* Date range */}
      <div style={{ display: "flex", alignItems: "center", gap: 6,
        border: "1px solid #E8ECF2", borderRadius: 8, padding: "4px 10px",
        background: hasDateFilter ? "rgba(59,130,246,0.1)" : "#0D1929" }}>
        <span style={{ fontSize: 11, color: "#9AA0AE", whiteSpace: "nowrap" }}>From</span>
        <input
          type="date"
          style={{ ...dateInput, border: "none", padding: "2px 4px",
            background: "transparent", color: hasDateFilter ? "#38BDF8" : "#F1F5F9" }}
          value={filters.dateFrom}
          min={dateRange.min}
          max={dateRange.max}
          onChange={set("dateFrom")}
        />
        <span style={{ fontSize: 11, color: "#9AA0AE" }}>–</span>
        <input
          type="date"
          style={{ ...dateInput, border: "none", padding: "2px 4px",
            background: "transparent", color: hasDateFilter ? "#38BDF8" : "#F1F5F9" }}
          value={filters.dateTo}
          min={dateRange.min}
          max={dateRange.max}
          onChange={set("dateTo")}
        />
        {hasDateFilter && (
          <button onClick={clearDates} style={{ background: "none", border: "none",
            cursor: "pointer", padding: 0, display: "flex", alignItems: "center" }}>
            <X size={12} color="#38BDF8" />
          </button>
        )}
      </div>

      <select style={sel} value={filters.type} onChange={set("type")}>
        <option value="">All types</option>
        {options.types.map(t => <option key={t}>{t}</option>)}
      </select>

      <select style={sel} value={filters.usage} onChange={set("usage")}>
        <option value="">All usage</option>
        {options.usages.filter(u => ['Residential','Commercial'].includes(u)).map(t => <option key={t}>{t}</option>)}
      </select>

      {options.regs && options.regs.length > 0 && (
        <select style={sel} value={filters.reg} onChange={set("reg")}>
          <option value="">All registration</option>
          {options.regs.map(t => <option key={t}>{t}</option>)}
        </select>
      )}

      <select style={sel} value={filters.sort} onChange={set("sort")}>
        <option value="value">Sort: value</option>
        <option value="count">Sort: count</option>
        <option value="avg">Sort: avg price</option>
      </select>

      <div style={{ display: "flex", alignItems: "center", gap: 6,
        border: "1px solid #E8ECF2", borderRadius: 8, padding: "6px 10px",
        background: "#0D1929", flex: 1, minWidth: 160 }}>
        <Search size={13} color="#9AA0AE" />
        <input
          type="text"
          placeholder="Search area..."
          value={filters.area}
          onChange={set("area")}
          style={{ border: "none", outline: "none", fontSize: 13, color: "#F1F5F9", width: "100%", background: "transparent" }}
        />
      </div>
    </div>
  );
}
