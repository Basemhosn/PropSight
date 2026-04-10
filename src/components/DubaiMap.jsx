import { useState, useMemo } from "react";
import { fmtAED, fmtNum } from "../utils/format";

// Real approximate lat/lng centres for Dubai areas
// Converted to SVG coordinates within a 900x600 viewport
// Dubai bounding box: lng 54.89–55.57, lat 24.99–25.37
const LNG_MIN = 54.89, LNG_MAX = 55.57;
const LAT_MIN = 24.99, LAT_MAX = 25.37;
const W = 900, H = 560;

function toXY(lng, lat) {
  const x = ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * W;
  const y = H - ((lat - LAT_MIN) / (LAT_MAX - LAT_MIN)) * H;
  return [Math.round(x), Math.round(y)];
}

// Area centres — real GPS coordinates for major Dubai districts
const AREA_COORDS = {
  "Jumeirah Village Circle":  [55.210, 25.052],
  "Business Bay":             [55.264, 25.185],
  "Dubai Marina":             [55.140, 25.079],
  "Jumeirah Village Triangle":[55.186, 25.060],
  "Dubai Sports City":        [55.224, 25.038],
  "Motor City":               [55.238, 25.044],
  "Al Furjan":                [55.132, 25.038],
  "Silicon Oasis":            [55.381, 25.118],
  "Dubai Land Residence Complex": [55.320, 25.063],
  "Burj Khalifa":             [55.274, 25.197],
  "Jumeirah Lakes Towers":    [55.153, 25.072],
  "Arjan":                    [55.225, 25.063],
  "Dubai Production City":    [55.184, 25.018],
  "Dubai Creek Harbour":      [55.334, 25.206],
  "Damac Hills":              [55.236, 25.025],
  "Dubai Hills":              [55.242, 25.113],
  "Dubai South":              [55.161, 24.995],
  "Palm Jumeirah":            [55.138, 25.112],
  "International City Ph 1":  [55.409, 25.164],
  "Discovery Gardens":        [55.124, 25.052],
  "Sobha Heartland":          [55.378, 25.183],
  "Majan":                    [55.278, 25.077],
  "Dubai Marina":             [55.140, 25.079],
  "Meydan One":               [55.308, 25.158],
  "Dubai Harbour":            [55.115, 25.095],
  "Town Square":              [55.243, 25.015],
  "Dubai Studio City":        [55.185, 25.032],
  "Jumeirah Beach Residence": [55.132, 25.087],
  "Palm Deira":               [55.305, 25.285],
  "Al Khairan First":         [55.143, 24.978],
  "Al Yelayiss 1":            [55.170, 24.978],
  "Madinat Al Mataar":        [55.165, 24.987],
  "Business Park":            [55.267, 25.164],
  "Dubai Creek":              [55.299, 25.237],
  "Al Satwa":                 [55.255, 25.215],
  "Al Wasl":                  [55.232, 25.196],
  "Tecom":                    [55.181, 25.093],
  "Barsha Heights":           [55.193, 25.097],
  "Dubai Healthcare City":    [55.327, 25.224],
  "Wadi Al Safa 5":           [55.318, 25.075],
};

// Normalise area name from CSV to map key
function normalise(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/jumeirah village circle/i, "Jumeirah Village Circle")
    .replace(/business bay/i, "Business Bay")
    .replace(/dubai marina/i, "Dubai Marina")
    .replace(/jumeirah village triangle/i, "Jumeirah Village Triangle")
    .replace(/dubai sports city/i, "Dubai Sports City")
    .replace(/motor city/i, "Motor City")
    .replace(/al furjan/i, "Al Furjan")
    .replace(/silicon oasis/i, "Silicon Oasis")
    .replace(/dubai land residence complex/i, "Dubai Land Residence Complex")
    .replace(/burj khalifa/i, "Burj Khalifa")
    .replace(/jumeirah lakes towers/i, "Jumeirah Lakes Towers")
    .replace(/arjan/i, "Arjan")
    .replace(/dubai production city/i, "Dubai Production City")
    .replace(/dubai creek harbour/i, "Dubai Creek Harbour")
    .replace(/damac hills/i, "Damac Hills")
    .replace(/dubai hills/i, "Dubai Hills")
    .replace(/dubai south/i, "Dubai South")
    .replace(/palm jumeirah/i, "Palm Jumeirah")
    .replace(/international city ph 1/i, "International City Ph 1")
    .replace(/discovery gardens/i, "Discovery Gardens")
    .replace(/sobha heartland/i, "Sobha Heartland")
    .replace(/majan/i, "Majan")
    .replace(/meydan one/i, "Meydan One")
    .replace(/dubai harbour/i, "Dubai Harbour")
    .replace(/town square/i, "Town Square")
    .replace(/dubai studio city/i, "Dubai Studio City")
    .replace(/jumeirah beach residence/i, "Jumeirah Beach Residence")
    .replace(/palm deira/i, "Palm Deira")
    .replace(/al khairan first/i, "Al Khairan First")
    .replace(/al yelayiss 1/i, "Al Yelayiss 1")
    .replace(/madinat al mataar/i, "Madinat Al Mataar")
    .replace(/business park/i, "Business Park")
    .replace(/al satwa/i, "Al Satwa")
    .replace(/al wasl/i, "Al Wasl")
    .replace(/tecom site a/i, "Tecom")
    .replace(/barsha heights/i, "Barsha Heights")
    .replace(/wadi al safa 5/i, "Wadi Al Safa 5");
}

// Colour scale: light blue → deep blue
function getColor(value, max, metric) {
  if (!value || !max) return "#EDF4FC";
  const intensity = Math.pow(value / max, 0.4); // power scale so small values still show
  const r = Math.round(237 - intensity * (237 - 10));
  const g = Math.round(244 - intensity * (244 - 50));
  const b = Math.round(252 - intensity * (252 - 100));
  return `rgb(${r},${g},${b})`;
}

export default function DubaiMap({ areas }) {
  const [metric, setMetric] = useState("count");
  const [hovered, setHovered] = useState(null);
  const [tooltip, setTooltip] = useState({ x: 0, y: 0 });

  // Build lookup: displayName → area data
  const areaMap = useMemo(() => {
    const m = {};
    areas.forEach(a => {
      const norm = normalise(a.area);
      // Find matching key in AREA_COORDS
      Object.keys(AREA_COORDS).forEach(key => {
        if (key.toLowerCase() === norm.toLowerCase() ||
            norm.toLowerCase().includes(key.toLowerCase()) ||
            key.toLowerCase().includes(norm.toLowerCase().split(" ")[0])) {
          if (!m[key] || m[key].count < a.count) m[key] = a;
        }
      });
      // Direct name match
      if (AREA_COORDS[a.area]) m[a.area] = a;
    });
    return m;
  }, [areas]);

  const maxVal = useMemo(() => {
    const vals = Object.values(areaMap).map(a => a[metric] || 0);
    return Math.max(...vals, 1);
  }, [areaMap, metric]);

  const points = useMemo(() => {
    return Object.entries(AREA_COORDS).map(([name, [lng, lat]]) => {
      const [x, y] = toXY(lng, lat);
      const data = areaMap[name];
      const val = data?.[metric] || 0;
      const r = data ? Math.max(8, Math.min(36, 8 + (val / maxVal) * 28)) : 6;
      return { name, x, y, r, data, val, color: getColor(val, maxVal, metric) };
    });
  }, [areaMap, maxVal, metric]);

  const fmtVal = (v) => metric === "count" ? fmtNum(v) + " deals" : fmtAED(v, true);

  return (
    <div style={{ background: "#fff", border: "1px solid #E8ECF2", borderRadius: 12, padding: "1.25rem" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between",
        marginBottom: "1rem", flexWrap: "wrap", gap: 8 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#0A1628" }}>Dubai transaction heatmap</div>
          <div style={{ fontSize: 11, color: "#9AA0AE", marginTop: 2 }}>
            Bubble size + colour = activity level · hover for details
          </div>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {[
            { k: "count", l: "Count" },
            { k: "total", l: "Value" },
            { k: "avg", l: "Avg price" },
          ].map(t => (
            <button key={t.k} onClick={() => setMetric(t.k)} style={{
              fontSize: 11, padding: "4px 10px", borderRadius: 6, cursor: "pointer", fontWeight: 500,
              border: metric === t.k ? "1px solid #185FA5" : "1px solid #E8ECF2",
              background: metric === t.k ? "#EDF4FC" : "#fff",
              color: metric === t.k ? "#185FA5" : "#7A8499",
            }}>{t.l}</button>
          ))}
        </div>
      </div>

      {/* Map */}
      <div style={{ position: "relative", width: "100%", background: "#F8FAFB",
        borderRadius: 8, border: "1px solid #E8ECF2", overflow: "hidden" }}>
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", display: "block" }}>
          {/* Background - rough Dubai coastline shape */}
          <rect x="0" y="0" width={W} height={H} fill="#EEF4FB" />

          {/* Gulf water area - top */}
          <path d={`M 0 0 L ${W} 0 L ${W} 200 Q 700 180 500 200 Q 300 220 200 180 Q 100 150 0 180 Z`}
            fill="#D4E8F7" opacity="0.5" />

          {/* Grid lines */}
          {[1,2,3,4].map(i => (
            <line key={`h${i}`} x1="0" y1={i * H/5} x2={W} y2={i * H/5}
              stroke="#E8ECF2" strokeWidth="0.5" />
          ))}
          {[1,2,3,4,5,6].map(i => (
            <line key={`v${i}`} x1={i * W/7} y1="0" x2={i * W/7} y2={H}
              stroke="#E8ECF2" strokeWidth="0.5" />
          ))}

          {/* Sheikh Zayed Road - main artery */}
          <path d="M 50 500 Q 200 450 350 380 Q 450 330 550 280 Q 650 230 750 200"
            stroke="#D0D8E8" strokeWidth="3" fill="none" strokeDasharray="8 4" />
          <text x="120" y="490" fontSize="9" fill="#B0B8C8">Sheikh Zayed Rd</text>

          {/* E311 */}
          <path d="M 50 520 Q 200 510 400 490 Q 550 475 700 460 Q 800 450 880 440"
            stroke="#D0D8E8" strokeWidth="2" fill="none" strokeDasharray="6 4" />

          {/* Bubbles */}
          {points.map(p => (
            <g key={p.name}
              onMouseEnter={(e) => {
                setHovered(p);
                const rect = e.currentTarget.closest("svg").getBoundingClientRect();
                setTooltip({ x: e.clientX - rect.left, y: e.clientY - rect.top });
              }}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: p.data ? "pointer" : "default" }}>
              <circle
                cx={p.x} cy={p.y} r={p.r}
                fill={p.data ? p.color : "#E8ECF2"}
                stroke={hovered?.name === p.name ? "#185FA5" : p.data ? "#C5D8EE" : "#E0E4EC"}
                strokeWidth={hovered?.name === p.name ? 2 : 1}
                opacity={p.data ? 0.92 : 0.4}
              />
              {p.r > 14 && (
                <text x={p.x} y={p.y + 1} textAnchor="middle" dominantBaseline="middle"
                  fontSize={Math.max(7, Math.min(10, p.r * 0.5))}
                  fill={p.val / maxVal > 0.5 ? "#0A2A50" : "#185FA5"}
                  fontWeight="500" style={{ pointerEvents: "none" }}>
                  {p.name.split(" ")[0].slice(0, 8)}
                </text>
              )}
            </g>
          ))}

          {/* Compass */}
          <g transform="translate(860, 40)">
            <circle cx="0" cy="0" r="18" fill="#fff" stroke="#E8ECF2" strokeWidth="1" />
            <text x="0" y="-6" textAnchor="middle" fontSize="10" fontWeight="700" fill="#185FA5">N</text>
            <polygon points="0,-14 -4,-2 0,2 4,-2" fill="#185FA5" />
            <polygon points="0,14 -4,2 0,-2 4,2" fill="#C5CAD6" />
          </g>
        </svg>

        {/* Tooltip */}
        {hovered && hovered.data && (
          <div style={{
            position: "absolute",
            left: Math.min(tooltip.x + 12, W * 0.6),
            top: Math.max(tooltip.y - 80, 8),
            background: "#0A1628", color: "#fff",
            borderRadius: 8, padding: "10px 14px",
            fontSize: 12, pointerEvents: "none",
            zIndex: 10, minWidth: 180,
            boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
          }}>
            <div style={{ fontWeight: 600, marginBottom: 6, fontSize: 13 }}>{hovered.name}</div>
            <div style={{ color: "#8AAAC8", marginBottom: 3 }}>
              Transactions: <span style={{ color: "#fff", fontWeight: 600 }}>{fmtNum(hovered.data.count)}</span>
            </div>
            <div style={{ color: "#8AAAC8", marginBottom: 3 }}>
              Total value: <span style={{ color: "#fff", fontWeight: 600 }}>{fmtAED(hovered.data.total, true)}</span>
            </div>
            <div style={{ color: "#8AAAC8", marginBottom: 3 }}>
              Avg price: <span style={{ color: "#fff", fontWeight: 600 }}>{fmtAED(hovered.data.avg, true)}</span>
            </div>
            {hovered.data.avgSize > 0 && (
              <div style={{ color: "#8AAAC8" }}>
                Price/m²: <span style={{ color: "#4ADE80", fontWeight: 600 }}>
                  {fmtAED(Math.round(hovered.data.avg / hovered.data.avgSize), true)}/m²
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Colour scale legend */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: "0.75rem" }}>
        <span style={{ fontSize: 11, color: "#9AA0AE" }}>Low</span>
        <div style={{ flex: 1, height: 6, borderRadius: 3,
          background: "linear-gradient(to right, #EDF4FC, #185FA5)" }} />
        <span style={{ fontSize: 11, color: "#9AA0AE" }}>High</span>
        <span style={{ fontSize: 11, color: "#9AA0AE", marginLeft: 12 }}>
          Bubble size = relative activity
        </span>
      </div>
    </div>
  );
}
