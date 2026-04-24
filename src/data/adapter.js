// Expands compressed transaction records back to full schema
// Short keys: n=txn_num, d=date, m=month, t=type, r=reg, u=usage,
//             a=area, p=prop_type, v=amount, s=txn_size, b=rooms, e=metro, j=project
//
// Aggregated records (_agg:true) are historical monthly summaries (pre-2022)
// They have: m=month, c=count, v=totalValue, avgS=avgSize, ppsqm, t={types}, u={usages}, r={regs}, areas={}

const REG_MAP = { 'Off': 'Off-Plan', 'Rea': 'Ready', '': '' };
const USAGE_MAP = { 'Res': 'Residential', 'Com': 'Commercial', 'Mul': 'Multi-Use', 'Agr': 'Agricultural', 'Hos': 'Hospitality', 'Ind': 'Industrial', 'Sto': 'Storage', 'Oth': 'Other' };

function parseDate(str) {
  if (!str || str.length < 10) return null;
  const [y, m, d] = str.split('-');
  const dt = new Date(+y, +m - 1, +d);
  return isNaN(dt.getTime()) ? null : dt;
}

function parseMonth(ym) {
  if (!ym || ym.length < 7) return null;
  const [y, m] = ym.split('-');
  const dt = new Date(+y, +m - 1, 1);
  return isNaN(dt.getTime()) ? null : dt;
}

function expandAggRecord(r) {
  const month = r.m;
  const dateObj = parseMonth(month);
  const count = r.c || 0;
  const total = r.v || 0;
  const avgAmount = count > 0 ? total / count : 0;
  const avgSize = r.avgS || 0;

  const topType  = r.t ? Object.entries(r.t).sort((a,b)=>b[1]-a[1])[0]?.[0] : 'Sale';
  const topReg   = r.r ? Object.entries(r.r).sort((a,b)=>b[1]-a[1])[0]?.[0] : '';
  const topUsage = r.u ? Object.entries(r.u).sort((a,b)=>b[1]-a[1])[0]?.[0] : 'Res';

  const areaRows = [];
  const areas = r.areas || {};
  let coveredCount = 0;

  Object.entries(areas).forEach(([area, ab]) => {
    const aCount = ab.c || 0;
    const aTotal = ab.v || 0;
    const aSize  = ab.s || avgSize;
    const aAvg   = aCount > 0 ? aTotal / aCount : avgAmount;
    coveredCount += aCount;
    areaRows.push({
      _synthetic: true,
      _weight: aCount,
      txn_num: '', date: month + '-01', dateObj, month,
      type: topType || 'Sale', subtype: '',
      reg: REG_MAP[topReg] || topReg || '',
      usage: USAGE_MAP[topUsage] || topUsage || 'Other',
      area, prop_type: 'Other', prop_sub: '',
      amount: aAvg, txn_size: aSize,
      rooms: '', metro: '', project: '',
      _aggCount: aCount, _aggTotal: aTotal,
    });
  });

  const remaining = count - coveredCount;
  if (remaining > 0) {
    areaRows.push({
      _synthetic: true, _weight: remaining,
      txn_num: '', date: month + '-01', dateObj, month,
      type: topType || 'Sale', subtype: '',
      reg: REG_MAP[topReg] || topReg || '',
      usage: USAGE_MAP[topUsage] || topUsage || 'Other',
      area: 'Other', prop_type: 'Other', prop_sub: '',
      amount: avgAmount, txn_size: avgSize,
      rooms: '', metro: '', project: '',
      _aggCount: remaining, _aggTotal: avgAmount * remaining,
    });
  }

  return areaRows;
}

export function expandTransactions(raw) {
  const result = [];
  raw.forEach(r => {
    if (r._agg) {
      expandAggRecord(r).forEach(row => result.push(row));
    } else {
      result.push({
        txn_num:   r.n || '',
        date:      r.d || '',
        dateObj:   r.d ? parseDate(r.d) : null,
        month:     r.m || '',
        type:      r.t || 'Other',
        subtype:   '',
        reg:       REG_MAP[r.r] || r.r || '',
        usage:     USAGE_MAP[r.u] || r.u || 'Other',
        area:      r.a || 'Unknown',
        prop_type: r.p || 'Other',
        prop_sub:  '',
        amount:    r.v || 0,
        txn_size:  r.s || 0,
        rooms:     r.b || '',
        metro:     r.e || '',
        project:   r.j || '',
      });
    }
  });
  return result;
}
