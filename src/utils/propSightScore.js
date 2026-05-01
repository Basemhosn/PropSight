/**
 * PropSight Score — 0 to 100 investment scoring engine
 * Weights:
 *   Developer Reputation  25%
 *   Rental Yield          20%
 *   YoY Appreciation      20%
 *   Price vs Dubai avg    15%
 *   Transaction Volume    12%
 *   Off-plan ratio         8%
 */

// ── Developer Tiers ────────────────────────────────────────────────────────
const DEV_TIERS = {
  // Tier 1 — Premium / Government-backed (100)
  'emaar': 100, 'ellington': 100, 'omniyat': 100, 'meraas': 100,
  'nakheel': 100, 'wasl': 100, 'aldar': 100, 'dubai holding': 100,
  'meydan': 100, 'dubai asset management': 100, 'emaar properties': 100,

  // Tier 2 — Established / Trusted (80)
  'sobha': 80, 'damac': 80, 'binghatti': 80, 'dubai properties': 80,
  'select group': 80, 'deyaar': 80, 'union properties': 80,
  'majid al futtaim': 80, 'mag': 80, 'imtiaz': 80,

  // Tier 3 — Mid-tier / Active (60)
  'danube': 60, 'azizi': 60, 'reportage': 60, 'tiger': 60,
  'samana': 60, 'object 1': 60, 'vincitore': 60, 'nacre': 60,
  'aqua properties': 60, 'fakhruddin': 60, 'continental': 60,
};

function getDevScore(developerName) {
  if (!developerName) return 40;
  const n = developerName.toLowerCase();
  for (const [key, score] of Object.entries(DEV_TIERS)) {
    if (n.includes(key)) return score;
  }
  return 40; // Tier 4 — unknown
}

export function getDevTier(developerName) {
  const score = getDevScore(developerName);
  if (score === 100) return { tier: 1, label: 'Tier 1', color: '#22C55E' };
  if (score === 80)  return { tier: 2, label: 'Tier 2', color: '#38BDF8' };
  if (score === 60)  return { tier: 3, label: 'Tier 3', color: '#F59E0B' };
  return { tier: 4, label: 'Tier 4', color: '#F87171' };
}

// ── Scoring Factors ────────────────────────────────────────────────────────

function scoreYield(yieldPct) {
  // Dubai avg ~5.5%, excellent = 8%+
  if (!yieldPct) return 50;
  if (yieldPct >= 8)   return 100;
  if (yieldPct >= 7)   return 85;
  if (yieldPct >= 6)   return 70;
  if (yieldPct >= 5)   return 55;
  if (yieldPct >= 4)   return 40;
  return 25;
}

function scoreAppreciation(yoyPct) {
  // YoY price growth
  if (!yoyPct) return 50;
  if (yoyPct >= 15)  return 100;
  if (yoyPct >= 10)  return 85;
  if (yoyPct >= 7)   return 70;
  if (yoyPct >= 4)   return 55;
  if (yoyPct >= 0)   return 40;
  return 20; // negative growth
}

function scorePriceVsMarket(areaPpsqm, dubaiAvgPpsqm) {
  // Below market = better value
  if (!areaPpsqm || !dubaiAvgPpsqm) return 50;
  const ratio = areaPpsqm / dubaiAvgPpsqm;
  if (ratio <= 0.7)  return 100; // 30%+ below market — great value
  if (ratio <= 0.85) return 85;
  if (ratio <= 1.0)  return 70;  // at market
  if (ratio <= 1.2)  return 50;
  if (ratio <= 1.5)  return 30;
  return 15; // 50%+ premium
}

function scoreVolume(txnCount, maxCount) {
  // Higher volume = better liquidity
  if (!txnCount) return 20;
  const ratio = txnCount / (maxCount || 1000);
  if (ratio >= 0.8)  return 100;
  if (ratio >= 0.5)  return 80;
  if (ratio >= 0.25) return 60;
  if (ratio >= 0.1)  return 40;
  return 20;
}

function scoreOffPlan(offPlanPct) {
  // Lower off-plan % = less speculative risk
  if (offPlanPct === undefined) return 50;
  if (offPlanPct <= 10)  return 100;
  if (offPlanPct <= 25)  return 85;
  if (offPlanPct <= 40)  return 70;
  if (offPlanPct <= 60)  return 50;
  if (offPlanPct <= 80)  return 30;
  return 15;
}

// ── Main Score Function ────────────────────────────────────────────────────

/**
 * Calculate PropSight Score for an area
 * @param {object} areaKpis - from areaData[key].kpis
 * @param {array}  priceTrend - from areaData[key].priceTrend
 * @param {number} dubaiAvgPpsqm - from core.priceTrend last entry
 * @param {number} maxAreaCount - highest txn count across all areas
 * @param {string} developerName - optional, for project-level scoring
 * @param {number} rentalYield - optional override
 */
export function calcPropSightScore({
  areaKpis = {},
  priceTrend = [],
  dubaiAvgPpsqm = 15000,
  maxAreaCount = 5000,
  developerName = '',
  rentalYield = null,
}) {
  // YoY appreciation from price trend
  const yoy = priceTrend.length >= 2
    ? ((priceTrend[priceTrend.length-1].ppsqm - priceTrend[priceTrend.length-2].ppsqm)
       / priceTrend[priceTrend.length-2].ppsqm * 100)
    : 0;

  // Off-plan percentage
  const offPlanPct = areaKpis.count
    ? Math.round((areaKpis.offPlan || 0) / areaKpis.count * 100)
    : 50;

  // Rental yield — use provided or estimate from ppsqm
  const yieldPct = rentalYield || (areaKpis.ppsqm
    ? Math.min(10, Math.max(3, 80000 / areaKpis.ppsqm))
    : 5.5);

  // Individual scores
  const devScore   = getDevScore(developerName);
  const yieldScore = scoreYield(yieldPct);
  const appScore   = scoreAppreciation(yoy);
  const priceScore = scorePriceVsMarket(areaKpis.ppsqm, dubaiAvgPpsqm);
  const volScore   = scoreVolume(areaKpis.count, maxAreaCount);
  const opScore    = scoreOffPlan(offPlanPct);

  // Weighted total
  const total = Math.round(
    devScore   * 0.25 +
    yieldScore * 0.20 +
    appScore   * 0.20 +
    priceScore * 0.15 +
    volScore   * 0.12 +
    opScore    * 0.08
  );

  // Verdict
  let verdict, color, bg;
  if (total >= 80) { verdict = 'Strong Buy'; color = '#22C55E'; bg = 'rgba(34,197,94,0.1)'; }
  else if (total >= 65) { verdict = 'Buy';       color = '#38BDF8'; bg = 'rgba(56,189,248,0.1)'; }
  else if (total >= 50) { verdict = 'Hold';      color = '#F59E0B'; bg = 'rgba(245,158,11,0.1)'; }
  else                  { verdict = 'Avoid';     color = '#F87171'; bg = 'rgba(248,113,113,0.1)'; }

  return {
    total,
    verdict,
    color,
    bg,
    breakdown: {
      developer:    { score: devScore,   weight: 25, label: 'Developer' },
      yield:        { score: yieldScore, weight: 20, label: 'Rental Yield' },
      appreciation: { score: appScore,   weight: 20, label: 'Appreciation' },
      price:        { score: priceScore, weight: 15, label: 'Value vs Market' },
      liquidity:    { score: volScore,   weight: 12, label: 'Liquidity' },
      offplan:      { score: opScore,    weight: 8,  label: 'Risk Profile' },
    },
    inputs: { yoy, offPlanPct, yieldPct, devScore },
  };
}

/**
 * Get score for all areas at once
 */
export function scoreAllAreas(areaData, core) {
  if (!areaData || !core) return {};
  const dubaiAvg = core.priceTrend?.slice(-1)[0]?.ppsqm || 15000;
  const maxCount = Math.max(...Object.values(areaData).map(d => d.kpis?.count || 0));
  const scores = {};
  for (const [key, data] of Object.entries(areaData)) {
    scores[key] = calcPropSightScore({
      areaKpis: data.kpis || {},
      priceTrend: data.priceTrend || [],
      dubaiAvgPpsqm: dubaiAvg,
      maxAreaCount: maxCount,
    });
  }
  return scores;
}
