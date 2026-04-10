// Realistic sample data matching real DLD transaction figures
const AREAS = [
  { area: "Business Bay", base: 4200, avgAmt: 2800000 },
  { area: "Dubai Marina", base: 3900, avgAmt: 3200000 },
  { area: "Jumeirah Village Circle", base: 5100, avgAmt: 1100000 },
  { area: "Downtown Dubai", base: 2800, avgAmt: 5400000 },
  { area: "Palm Jumeirah", base: 1200, avgAmt: 12000000 },
  { area: "Dubai Hills Estate", base: 2100, avgAmt: 4100000 },
  { area: "Jumeirah Lake Towers", base: 2600, avgAmt: 1600000 },
  { area: "Al Barsha", base: 1800, avgAmt: 2100000 },
  { area: "Arabian Ranches", base: 900, avgAmt: 6800000 },
  { area: "Dubai Creek Harbour", base: 1600, avgAmt: 3300000 },
  { area: "Meydan", base: 1300, avgAmt: 3800000 },
  { area: "Dubai South", base: 2200, avgAmt: 980000 },
  { area: "Al Furjan", base: 1400, avgAmt: 2200000 },
  { area: "Deira", base: 1700, avgAmt: 1400000 },
  { area: "Bur Dubai", base: 1500, avgAmt: 1800000 },
  { area: "DAMAC Hills", base: 1100, avgAmt: 2600000 },
  { area: "Jumeirah", base: 800, avgAmt: 7200000 },
  { area: "Dubai Silicon Oasis", base: 1200, avgAmt: 1200000 },
  { area: "International City", base: 2400, avgAmt: 650000 },
  { area: "Al Quoz", base: 900, avgAmt: 2900000 },
  { area: "Discovery Gardens", base: 1100, avgAmt: 850000 },
  { area: "Dubai Sports City", base: 980, avgAmt: 1100000 },
  { area: "Motor City", base: 740, avgAmt: 1400000 },
  { area: "Emirates Hills", base: 280, avgAmt: 18000000 },
  { area: "Jumeirah Park", base: 560, avgAmt: 5500000 },
  { area: "Al Jadaf", base: 620, avgAmt: 2100000 },
  { area: "Culture Village", base: 480, avgAmt: 2800000 },
  { area: "Oud Metha", base: 540, avgAmt: 3200000 },
  { area: "Al Rashidiya", base: 680, avgAmt: 2600000 },
  { area: "Remraam", base: 820, avgAmt: 980000 },
];

const TYPES = ["Sale", "Sale", "Sale", "Mortgage", "Mortgage", "Gift"];
const ROOMS = ["Studio", "1 B/R", "1 B/R", "2 B/R", "2 B/R", "2 B/R", "3 B/R", "3 B/R", "4 B/R", "5 B/R"];
const USAGES = ["Residential", "Residential", "Residential", "Commercial", "Other"];
const PROP_TYPES = ["Unit", "Unit", "Unit", "Land", "Building"];
const REGS = ["Ready", "Ready", "Off Plan"];
const METROS = ["Dubai Marina Metro", "Business Bay Metro", "DAMAC Properties Metro", "Mall of the Emirates Metro", "Union Metro", null];

function rnd(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

export function generateSampleData(numRows = 8000) {
  const rows = [];
  const now = new Date(2026, 2, 31); // end March 2026
  const start = new Date(2024, 0, 1); // Jan 2024 — spans 2 years for YoY
  const span = now - start;

  for (let i = 0; i < numRows; i++) {
    const areaDef = pick(AREAS);
    const dateObj = new Date(start.getTime() + Math.random() * span);
    const month = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, "0")}`;
    const variance = 0.6 + Math.random() * 0.8;
    const amount = Math.round(areaDef.avgAmt * variance / 1000) * 1000;
    const txnSize = rnd(40, 350);
    const type = pick(TYPES);

    rows.push({
      txn_num: `TXN-${1000000 + i}`,
      date: `${String(dateObj.getDate()).padStart(2,"0")}-${String(dateObj.getMonth()+1).padStart(2,"0")}-${dateObj.getFullYear()}`,
      dateObj,
      month,
      type,
      subtype: type === "Sale" ? (Math.random() > 0.5 ? "Ready" : "Off Plan") : type,
      reg: pick(REGS),
      freehold: Math.random() > 0.2 ? "Yes" : "No",
      usage: pick(USAGES),
      area: areaDef.area,
      prop_type: pick(PROP_TYPES),
      prop_sub: "Apartment",
      amount,
      txn_size: txnSize,
      prop_size: txnSize + rnd(0, 30),
      rooms: pick(ROOMS),
      metro: pick(METROS) || "",
      project: "",
    });
  }
  return rows;
}
