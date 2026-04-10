export function fmtAED(n, short = false) {
  if (!isFinite(n) || isNaN(n)) return "—";
  if (short) {
    if (n >= 1e9) return "AED " + (n / 1e9).toFixed(2) + "B";
    if (n >= 1e6) return "AED " + (n / 1e6).toFixed(1) + "M";
    if (n >= 1e3) return "AED " + (n / 1e3).toFixed(0) + "K";
  }
  return "AED " + new Intl.NumberFormat("en-AE").format(Math.round(n));
}

export function fmtNum(n) {
  if (!isFinite(n) || isNaN(n)) return "—";
  return new Intl.NumberFormat("en-AE").format(Math.round(n));
}

export function fmtPct(n, total) {
  if (!total) return "0%";
  return ((n / total) * 100).toFixed(1) + "%";
}

export function fmtMonth(ym) {
  if (!ym) return "";
  const [y, m] = ym.split("-");
  return new Date(+y, +m - 1).toLocaleDateString("en-AE", { month: "short", year: "2-digit" });
}

export function fmtSqm(n) {
  if (!n || n === 0) return "—";
  return fmtNum(n) + " m²";
}
