import { useRef } from "react";

export default function ChartCard({ title, subtitle, children, id }) {
  const ref = useRef();

  const downloadChart = async () => {
    try {
      const { default: html2canvas } = await import("html2canvas");
      const canvas = await html2canvas(ref.current, {
        backgroundColor: 'var(--surface)',
        scale: 2,
        logging: false,
      });
      const link = document.createElement("a");
      link.download = `${title.replace(/\s+/g, "_")}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (e) {
      window.print();
    }
  };

  return (
    <div ref={ref} id={id} style={{
      background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12,
      padding: "1.25rem", position: "relative",
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1rem" }}>
        <div>
          {title && <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{title}</div>}
          {subtitle && <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{subtitle}</div>}
        </div>
        <button onClick={downloadChart} title="Download chart" style={{
          background: "none", border: '1px solid var(--border)', borderRadius: 6,
          padding: "4px 8px", cursor: "pointer", fontSize: 11, color: 'var(--text-muted)',
          display: "flex", alignItems: "center", gap: 4, flexShrink: 0,
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
          </svg>
          PNG
        </button>
      </div>
      {children}
    </div>
  );
}
