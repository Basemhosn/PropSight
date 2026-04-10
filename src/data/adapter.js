// Expands compressed transaction records back to full schema
// Short keys: n=txn_num, d=date, m=month, t=type, r=reg, u=usage,
//             a=area, p=prop_type, v=amount, s=txn_size, b=rooms, e=metro, j=project

const REG_MAP = { 'Off': 'Off-Plan', 'Rea': 'Ready', '': '' };

export function expandTransactions(raw) {
  return raw.map(r => ({
    txn_num:   r.n || '',
    date:      r.d || '',
    dateObj:   r.d ? parseDate(r.d) : null,
    month:     r.m || '',
    type:      r.t || 'Other',
    subtype:   '',
    reg:       REG_MAP[r.r] || r.r || '',
    usage:     r.u === 'Res' ? 'Residential' : r.u === 'Com' ? 'Commercial' : r.u || 'Other',
    area:      r.a || 'Unknown',
    prop_type: r.p || 'Other',
    prop_sub:  '',
    amount:    r.v || 0,
    txn_size:  r.s || 0,
    rooms:     r.b || '',
    metro:     r.e || '',
    project:   r.j || '',
  }));
}

function parseDate(str) {
  if (!str || str.length < 10) return null;
  const [y, m, d] = str.split('-');
  const dt = new Date(+y, +m - 1, +d);
  return isNaN(dt.getTime()) ? null : dt;
}
