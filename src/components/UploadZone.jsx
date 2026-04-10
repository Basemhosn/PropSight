import { useState, useRef } from "react";
import { Upload, FileText, ExternalLink } from "lucide-react";

export default function UploadZone({ onFile, onDemo }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef();

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) onFile(f);
  };

  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "2rem 1rem" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <div style={{
          width: 56, height: 56, borderRadius: 16,
          background: "linear-gradient(135deg, #185FA5 0%, #1D9E75 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 1rem",
        }}>
          <span style={{ fontSize: 28 }}>🏙️</span>
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: "#0A1628", marginBottom: 8 }}>
          Dubai Real Estate Dashboard
        </h1>
        <p style={{ fontSize: 14, color: "#7A8499", lineHeight: 1.6 }}>
          Powered by Dubai Land Department open data — free, official, updated daily
        </p>
      </div>

      {/* Upload box */}
      <div
        onClick={() => inputRef.current.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        style={{
          border: `2px dashed ${dragging ? "#185FA5" : "#C5CAD6"}`,
          borderRadius: 16,
          padding: "2.5rem 2rem",
          textAlign: "center",
          cursor: "pointer",
          background: dragging ? "#EDF4FC" : "#FAFBFC",
          transition: "all 0.2s",
          marginBottom: "1.25rem",
        }}
      >
        <Upload size={32} color={dragging ? "#185FA5" : "#C5CAD6"} style={{ margin: "0 auto 1rem" }} />
        <div style={{ fontSize: 15, fontWeight: 600, color: "#0A1628", marginBottom: 6 }}>
          Drop your DLD transactions CSV here
        </div>
        <div style={{ fontSize: 13, color: "#7A8499", marginBottom: 16 }}>
          or click to browse files
        </div>
        <div style={{
          display: "inline-flex", flexWrap: "wrap", gap: 6, justifyContent: "center",
          fontSize: 11, color: "#9AA0AE"
        }}>
          {["Transaction Date","Transaction Type","Area","Amount","Property Type","Usage","Registration type"].map(c => (
            <span key={c} style={{ background: "#F0F2F6", borderRadius: 4, padding: "2px 7px" }}>{c}</span>
          ))}
        </div>
        <input ref={inputRef} type="file" accept=".csv" style={{ display: "none" }}
          onChange={(e) => e.target.files[0] && onFile(e.target.files[0])} />
      </div>

      {/* Demo mode */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <button onClick={onDemo} style={{
          background: "#0A1628", color: "#fff", border: "none", borderRadius: 8,
          padding: "10px 24px", fontSize: 13, fontWeight: 600, cursor: "pointer",
        }}>
          Preview with sample data
        </button>
        <div style={{ fontSize: 12, color: "#9AA0AE", marginTop: 8 }}>
          Try the dashboard with 8,000 realistic transactions across all Dubai areas
        </div>
      </div>

      {/* How to get data */}
      <div style={{
        background: "#fff", border: "1px solid #E8ECF2", borderRadius: 12, padding: "1.25rem",
      }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "#0A1628", marginBottom: "1rem", display: "flex", alignItems: "center", gap: 6 }}>
          <FileText size={14} /> How to get free DLD data
        </div>
        {[
          { n: 1, text: <>Go to <a href="https://dubailand.gov.ae/en/open-data/real-estate-data/" target="_blank" rel="noreferrer" style={{ color: "#185FA5" }}>dubailand.gov.ae/en/open-data/real-estate-data <ExternalLink size={10} /></a></> },
          { n: 2, text: "Under Transactions, set your date range (e.g. 01-01-2025 to today), pick transaction type, click Search" },
          { n: 3, text: 'Click "Download as CSV" — completely free, no login required' },
          { n: 4, text: "Drop the downloaded file into the upload box above" },
        ].map(({ n, text }) => (
          <div key={n} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
            <div style={{
              width: 22, height: 22, borderRadius: "50%", background: "#185FA5",
              color: "#fff", fontSize: 11, fontWeight: 600, flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>{n}</div>
            <div style={{ fontSize: 13, color: "#4A5568", lineHeight: 1.55, paddingTop: 2 }}>{text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
