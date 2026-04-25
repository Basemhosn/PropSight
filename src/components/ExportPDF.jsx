import { useState } from "react";
import { FileDown, Loader } from "lucide-react";
import { fmtAED, fmtNum } from "../utils/format";

// Helper: capture a DOM element as image via html2canvas
async function captureElement(id) {
  const el = document.getElementById(id);
  if (!el) return null;
  try {
    const { default: html2canvas } = await import("html2canvas");
    const canvas = await html2canvas(el, {
      scale: 1.5,
      useCORS: true,
      logging: false,
      backgroundColor: "#0D1929",
    });
    return canvas.toDataURL("image/png");
  } catch {
    return null;
  }
}

// Add IDs to chart wrappers in App — we'll capture these
export const CHART_IDS = {
  kpi:        "pdf-kpi",
  barChart:   "pdf-barchart",
  typeDonut:  "pdf-donut",
  monthly:    "pdf-monthly",
  map:        "pdf-map",
  leaderboard:"pdf-leaderboard",
  priceSqm:   "pdf-pricesqm",
  yoy:        "pdf-yoy",
  metro:      "pdf-metro",
  velocity:   "pdf-velocity",
  bedroom:    "pdf-bedroom",
  offplan:    "pdf-offplan",
  table:      "pdf-table",
};

export default function ExportPDF({ kpis, areas, filters, fileName, isDemo }) {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState("");

  const handleExport = async () => {
    setLoading(true);
    try {
      const { default: jsPDF } = await import("jspdf");

      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pageW = 210;
      const pageH = 297;
      const margin = 12;
      const contentW = pageW - margin * 2;
      let y = margin;

      const addPage = () => {
        doc.addPage();
        y = margin;
      };

      const checkPage = (neededHeight) => {
        if (y + neededHeight > pageH - 16) addPage();
      };

      // ── Cover header ──────────────────────────────────────────
      doc.setFillColor(10, 22, 40);
      doc.rect(0, 0, pageW, 42, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.text("Dubai Real Estate Dashboard", margin, 17);
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(90, 122, 154);
      doc.text("Powered by Dubai Land Department Official Open Data", margin, 25);
      const now = new Date().toLocaleDateString("en-AE", { day: "numeric", month: "long", year: "numeric" });
      doc.text(`Report generated: ${now}`, margin, 32);
      if (fileName) {
        doc.setTextColor(74, 222, 128);
        doc.text(isDemo ? "Sample data (demo)" : fileName, pageW - margin, 32, { align: "right" });
      }
      y = 52;

      // ── Active filters ────────────────────────────────────────
      const activeFilters = Object.entries(filters)
        .filter(([k, v]) => v && !["sort"].includes(k))
        .map(([k, v]) => `${k}: ${v}`);
      if (activeFilters.length) {
        doc.setFontSize(8);
        doc.setTextColor(120, 130, 150);
        doc.text(`Active filters: ${activeFilters.join("  ·  ")}`, margin, y);
        y += 8;
      }

      // ── KPI summary ───────────────────────────────────────────
      doc.setFillColor(244, 246, 250);
      doc.roundedRect(margin, y, contentW, 22, 2, 2, "F");
      const kpiItems = [
        { label: "Total transactions", value: fmtNum(kpis.total) },
        { label: "Total value",        value: fmtAED(kpis.value, true) },
        { label: "Avg transaction",    value: fmtAED(kpis.avg, true) },
        { label: "Areas covered",      value: fmtNum(kpis.uniqueAreas) },
      ];
      const kpiW = contentW / kpiItems.length;
      kpiItems.forEach((kpi, i) => {
        const x = margin + i * kpiW + kpiW / 2;
        doc.setFontSize(7); doc.setFont("helvetica", "normal"); doc.setTextColor(120, 130, 150);
        doc.text(kpi.label.toUpperCase(), x, y + 7, { align: "center" });
        doc.setFontSize(11); doc.setFont("helvetica", "bold"); doc.setTextColor(10, 22, 40);
        doc.text(kpi.value, x, y + 16, { align: "center" });
      });
      y += 28;

      // ── Helper: add captured screenshot ───────────────────────
      const addScreenshot = async (id, title, maxH = 80) => {
        setProgress(`Capturing ${title}…`);
        const img = await captureElement(id);
        if (!img) return;
        checkPage(maxH + 12);
        if (title) {
          doc.setFontSize(10); doc.setFont("helvetica", "bold"); doc.setTextColor(10, 22, 40);
          doc.text(title, margin, y);
          y += 6;
        }
        // Calculate image dimensions to fit contentW
        const tmpImg = new Image();
        await new Promise(res => { tmpImg.onload = res; tmpImg.src = img; });
        const ratio = tmpImg.naturalHeight / tmpImg.naturalWidth;
        const imgH = Math.min(maxH, contentW * ratio);
        doc.addImage(img, "PNG", margin, y, contentW, imgH);
        y += imgH + 6;
      };

      // ── Screenshots of every section ──────────────────────────
      await addScreenshot(CHART_IDS.barChart,    "Transactions by area",            75);
      await addScreenshot(CHART_IDS.typeDonut,   "Transaction type split",           55);
      await addScreenshot(CHART_IDS.monthly,     "Monthly volume trend",             55);
      await addScreenshot(CHART_IDS.map,         "Dubai transaction heatmap",        75);
      await addScreenshot(CHART_IDS.leaderboard, "Project / area leaderboard",       90);
      await addScreenshot(CHART_IDS.priceSqm,    "Price per sq.m by area",           75);
      await addScreenshot(CHART_IDS.yoy,         "Year-on-year comparison",          70);
      await addScreenshot(CHART_IDS.metro,       "Nearest metro price premium",      75);
      await addScreenshot(CHART_IDS.velocity,    "Transaction velocity",             60);
      await addScreenshot(CHART_IDS.bedroom,     "Bedroom breakdown",                75);
      await addScreenshot(CHART_IDS.offplan,     "Off-plan vs ready",                65);

      // ── Full area table ───────────────────────────────────────
      setProgress("Building area table…");
      addPage();
      doc.setFontSize(11); doc.setFont("helvetica", "bold"); doc.setTextColor(10, 22, 40);
      doc.text("Area Breakdown — Full Table", margin, y); y += 8;

      const cols = [
        { label: "#",            w: 8,  align: "center" },
        { label: "Area",         w: 52, align: "left" },
        { label: "Transactions", w: 26, align: "right" },
        { label: "Total value",  w: 36, align: "right" },
        { label: "Avg value",    w: 34, align: "right" },
        { label: "Price/m²",     w: 24, align: "right" },
        { label: "Top type",     w: 20, align: "center" },
      ];

      // Header
      doc.setFillColor(10, 22, 40);
      doc.rect(margin, y, contentW, 7, "F");
      doc.setFontSize(7); doc.setFont("helvetica", "bold"); doc.setTextColor(255, 255, 255);
      let cx = margin;
      cols.forEach(col => {
        const tx = col.align === "right" ? cx + col.w - 1 : col.align === "center" ? cx + col.w / 2 : cx + 2;
        doc.text(col.label, tx, y + 5, { align: col.align });
        cx += col.w;
      });
      y += 7;

      areas.forEach((area, i) => {
        if (y > pageH - 16) { addPage(); }
        if (i % 2 === 0) { doc.setFillColor(248, 250, 252); doc.rect(margin, y, contentW, 6.2, "F"); }
        doc.setFontSize(7); doc.setFont("helvetica", "normal"); doc.setTextColor(10, 22, 40);
        const ppsqm = area.avgSize > 0 ? Math.round(area.avg / area.avgSize) : 0;
        const rowData = [
          { val: String(i + 1),                    col: cols[0] },
          { val: area.area,                        col: cols[1] },
          { val: fmtNum(area.count),               col: cols[2] },
          { val: fmtAED(area.total, true),         col: cols[3] },
          { val: fmtAED(area.avg, true),           col: cols[4] },
          { val: ppsqm > 0 ? fmtAED(ppsqm,true) : "—", col: cols[5] },
          { val: area.topType || "—",              col: cols[6] },
        ];
        cx = margin;
        rowData.forEach(({ val, col }) => {
          const tx = col.align === "right" ? cx + col.w - 1 : col.align === "center" ? cx + col.w / 2 : cx + 2;
          doc.text(String(val), tx, y + 4.5, { align: col.align, maxWidth: col.w - 2 });
          cx += col.w;
        });
        doc.setDrawColor(240, 242, 246);
        doc.line(margin, y + 6.2, margin + contentW, y + 6.2);
        y += 6.2;
      });

      // ── Footer on every page ──────────────────────────────────
      const totalPages = doc.getNumberOfPages();
      for (let p = 1; p <= totalPages; p++) {
        doc.setPage(p);
        doc.setFillColor(10, 22, 40);
        doc.rect(0, pageH - 11, pageW, 11, "F");
        doc.setFontSize(7); doc.setFont("helvetica", "normal"); doc.setTextColor(90, 122, 154);
        doc.text("Dubai RE Dashboard  ·  Dubai Land Department Open Data  ·  dubailand.gov.ae", margin, pageH - 4);
        doc.text(`Page ${p} of ${totalPages}`, pageW - margin, pageH - 4, { align: "right" });
      }

      // ── Save ──────────────────────────────────────────────────
      const dateStr = new Date().toISOString().slice(0, 10);
      doc.save(`dubai-re-report-${dateStr}.pdf`);
      setProgress("");
    } catch (err) {
      console.error("PDF export error:", err);
      alert("PDF export failed: " + err.message);
    } finally {
      setLoading(false);
      setProgress("");
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={loading}
      style={{
        display: "flex", alignItems: "center", gap: 6,
        background: loading ? "#060E1A" : "#F1F5F9",
        color: loading ? "#9AA0AE" : "#0D1929",
        border: "none", borderRadius: 8, padding: "8px 16px",
        fontSize: 13, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer",
      }}
    >
      {loading
        ? <><Loader size={14} style={{ animation: "spin 0.7s linear infinite" }} /> {progress || "Building PDF…"}</>
        : <><FileDown size={14} /> Export full PDF</>
      }
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </button>
  );
}
