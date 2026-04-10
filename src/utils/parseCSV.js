import Papa from "papaparse";

// Exact real DLD CSV column names (UPPERCASE_UNDERSCORE format from dubailand.gov.ae export)
// Fallbacks handle older portal exports with spaced English names
const COLUMN_MATCHERS = [
  ["txn_num",        ["TRANSACTION_NUMBER", "transaction number", "trans number"]],
  ["date",           ["INSTANCE_DATE", "transaction date", "trans date", "date"]],
  ["type",           ["GROUP_EN", "transaction type", "trans type", "type", "group_en"]],
  ["subtype",        ["PROCEDURE_EN", "transaction sub type", "procedure_en", "procedure", "sub type"]],
  ["reg",            ["IS_OFFPLAN_EN", "registration type", "is_offplan_en", "offplan"]],
  ["freehold",       ["IS_FREE_HOLD_EN", "is free hold", "is_free_hold_en", "freehold"]],
  ["usage",          ["USAGE_EN", "usage_en", "usage"]],
  ["area",           ["AREA_EN", "area_en", "area", "area name", "zone", "district"]],
  ["prop_type",      ["PROP_TYPE_EN", "prop_type_en", "property type", "prop type"]],
  ["prop_sub",       ["PROP_SB_TYPE_EN", "prop_sb_type_en", "property sub type", "prop sub type"]],
  ["amount",         ["TRANS_VALUE", "trans_value", "amount", "price", "value", "transaction amount"]],
  ["txn_size",       ["PROCEDURE_AREA", "procedure_area", "transaction size (sq.m)", "transaction size"]],
  ["prop_size",      ["ACTUAL_AREA", "actual_area", "property size (sq.m)", "property size"]],
  ["rooms",          ["ROOMS_EN", "rooms_en", "room(s)", "rooms", "bedrooms"]],
  ["parking",        ["PARKING", "parking"]],
  ["metro",          ["NEAREST_METRO_EN", "nearest_metro_en", "nearest metro", "metro"]],
  ["mall",           ["NEAREST_MALL_EN", "nearest_mall_en", "nearest mall"]],
  ["landmark",       ["NEAREST_LANDMARK_EN", "nearest_landmark_en", "nearest landmark"]],
  ["project",        ["PROJECT_EN", "project_en", "project"]],
  ["master_project", ["MASTER_PROJECT_EN", "master_project_en", "master project"]],
];

function cap(s) {
  if (!s) return "";
  const str = s.toString().trim();
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Build a map from internalKey -> actual CSV header, using case-insensitive matching
function buildColMap(headers) {
  const map = {};
  // Strip BOM from first header if present
  const cleaned = headers.map((h, i) => i === 0 ? h.replace(/^\uFEFF/, "").trim() : h.trim());
  const lower = cleaned.map(h => h.toLowerCase());

  COLUMN_MATCHERS.forEach(([key, candidates]) => {
    for (const candidate of candidates) {
      const idx = lower.findIndex(h => h === candidate.toLowerCase());
      if (idx !== -1) {
        map[key] = cleaned[idx];
        break;
      }
    }
    // If exact match not found, try partial match
    if (!map[key]) {
      for (const candidate of candidates) {
        const idx = lower.findIndex(h => h.includes(candidate.toLowerCase()) || candidate.toLowerCase().includes(h));
        if (idx !== -1) {
          map[key] = cleaned[idx];
          break;
        }
      }
    }
  });

  return map;
}

export function parseDLDcsv(file) {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.replace(/^\uFEFF/, "").trim(),
      complete: (results) => {
        const headers = results.meta.fields || [];
        const colMap = buildColMap(headers);

        if (!colMap["area"]) {
          reject(new Error(
            `Could not find the Area column in your CSV.\n\n` +
            `Columns found: ${headers.join(", ")}\n\n` +
            `Expected column name: AREA_EN\n\n` +
            `Please download from dubailand.gov.ae → Open Data → Real Estate Data → Transactions → Download as CSV`
          ));
          return;
        }

        const get = (row, key) => {
          const header = colMap[key];
          if (!header) return "";
          return (row[header] || "").toString().trim();
        };

        const rows = results.data.map((raw) => {
          const amount = parseFloat(get(raw, "amount").replace(/,/g, "")) || 0;
          const txnSize = parseFloat(get(raw, "txn_size").replace(/,/g, "")) || 0;
          const propSize = parseFloat(get(raw, "prop_size").replace(/,/g, "")) || 0;

          // Parse date — handles YYYY-MM-DD HH:MM:SS (real DLD format), DD-MM-YYYY, DD/MM/YYYY
          let dateObj = null;
          const rawDate = get(raw, "date");
          if (rawDate) {
            // Try native parse first (works for "2026-01-29 18:04:38")
            const native = new Date(rawDate);
            if (!isNaN(native.getTime())) {
              dateObj = native;
            } else {
              // Fallback: split on - / .
              const parts = rawDate.split(/[-\/\.]/);
              if (parts.length >= 3) {
                if (parts[0].length === 4) {
                  dateObj = new Date(+parts[0], +parts[1] - 1, +parts[2]);
                } else if (parts[2].length === 4) {
                  dateObj = new Date(+parts[2], +parts[1] - 1, +parts[0]);
                }
              }
            }
          }

          const validDate = dateObj && !isNaN(dateObj.getTime());

          // Area comes in ALL CAPS from DLD — convert to Title Case
          const rawArea = get(raw, "area");
          const area = rawArea
            ? rawArea.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ")
            : "Unknown";

          return {
            txn_num: get(raw, "txn_num"),
            date: rawDate,
            dateObj: validDate ? dateObj : null,
            month: validDate
              ? `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, "0")}`
              : null,
            type: cap(get(raw, "type")) || "Other",
            subtype: get(raw, "subtype"),
            reg: cap(get(raw, "reg")) || "Other",
            freehold: get(raw, "freehold"),
            usage: cap(get(raw, "usage")) || "Other",
            area,
            prop_type: cap(get(raw, "prop_type")) || "Other",
            prop_sub: cap(get(raw, "prop_sub")),
            amount,
            txn_size: txnSize,
            prop_size: propSize,
            rooms: get(raw, "rooms"),
            metro: get(raw, "metro"),
            project: get(raw, "project") || get(raw, "master_project"),
          };
        }).filter((r) => r.area !== "Unknown" || r.amount > 0);

        // ── Deduplicate portfolio transactions ─────────────────────────
        // Portfolio mortgages stamp the same TRANS_VALUE on every unit in the
        // bundle. We keep only the first row per transaction number so the value
        // is counted once and room-type averages stay accurate.
        const seenTxn = new Set();
        const deduped = rows.filter(r => {
          if (!r.txn_num) return true; // keep rows with no txn number
          if (seenTxn.has(r.txn_num)) return false;
          seenTxn.add(r.txn_num);
          return true;
        });

        resolve(deduped);
      },
      error: (err) => reject(err),
    });
  });
}

export function groupByArea(rows) {
  const map = {};
  rows.forEach((r) => {
    const a = r.area;
    if (!map[a]) {
      map[a] = { area: a, count: 0, total: 0, sizes: [], types: {}, usages: {}, months: {} };
    }
    map[a].count++;
    map[a].total += r.amount;
    if (r.txn_size > 0) map[a].sizes.push(r.txn_size);
    map[a].types[r.type] = (map[a].types[r.type] || 0) + 1;
    map[a].usages[r.usage] = (map[a].usages[r.usage] || 0) + 1;
    if (r.month) map[a].months[r.month] = (map[a].months[r.month] || 0) + 1;
  });

  return Object.values(map).map((a) => {
    const avgSize = a.sizes.length ? a.sizes.reduce((s, v) => s + v, 0) / a.sizes.length : 0;
    const topType = Object.entries(a.types).sort((x, y) => y[1] - x[1])[0]?.[0] || "—";
    const topUsage = Object.entries(a.usages).sort((x, y) => y[1] - x[1])[0]?.[0] || "—";
    return { ...a, avg: a.count ? a.total / a.count : 0, avgSize, topType, topUsage };
  });
}

export function groupByMonth(rows) {
  const map = {};
  rows.forEach((r) => {
    if (!r.month) return;
    if (!map[r.month]) map[r.month] = { month: r.month, count: 0, total: 0 };
    map[r.month].count++;
    map[r.month].total += r.amount;
  });
  return Object.values(map).sort((a, b) => a.month.localeCompare(b.month));
}

export function groupByType(rows) {
  const map = {};
  rows.forEach((r) => { map[r.type] = (map[r.type] || 0) + 1; });
  return Object.entries(map).map(([name, value]) => ({ name, value }));
}

export function getUniqueValues(rows, key) {
  return [...new Set(rows.map((r) => r[key]).filter(Boolean))].sort();
}
