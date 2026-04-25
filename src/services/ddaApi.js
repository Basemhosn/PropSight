/**
 * Dubai Data Authority (DDA) API Service
 * Portal: data.dubai
 * Token endpoint: https://apis.data.dubai/secure/sdg/ssis/gatewayoauthtoken/1.0.0/getAccessToken
 * Transactions: https://apis.data.dubai/open/dld/dld_transactions-open-api
 */

const DDA_CONFIG = {
  tokenUrl:   "https://apis.data.dubai/secure/sdg/ssis/gatewayoauthtoken/1.0.0/getAccessToken",
  apiBase:    "https://apis.data.dubai/open/dld",
  appId:      "Q-{4UkaFwR83JbNZwUmaNDNVEsnaGtnDFX5}",
  clientId:   "3KdzL5F4KUseZG4f2m5QvkkBrQmrcamv",
  clientSecret: "exFKDqqxSeg8KN7DmTFjm6CzQDvAjJJH",
};

// Cache token in memory — valid ~30 minutes
let _tokenCache = { token: null, expiry: 0 };

async function getToken() {
  if (_tokenCache.token && Date.now() < _tokenCache.expiry) {
    return _tokenCache.token;
  }
  const res = await fetch(DDA_CONFIG.tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-DDA-SecurityApplicationIdentifier": DDA_CONFIG.appId,
    },
    body: JSON.stringify({
      grant_type:    "client_credentials",
      client_id:     DDA_CONFIG.clientId,
      client_secret: DDA_CONFIG.clientSecret,
    }),
  });
  const data = await res.json();
  if (!data.access_token) throw new Error(data.Exception || "Token request failed");
  _tokenCache = {
    token:  data.access_token,
    expiry: Date.now() + (data.expires_in ? data.expires_in * 1000 : 25 * 60 * 1000),
  };
  return _tokenCache.token;
}

async function ddaGet(dataset, params = {}) {
  const token = await getToken();
  const qs = new URLSearchParams(params).toString();
  const url = `${DDA_CONFIG.apiBase}/${dataset}${qs ? "?" + qs : ""}`;
  const res = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "x-DDA-SecurityApplicationIdentifier": DDA_CONFIG.appId,
    },
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

/**
 * Fetch latest transactions from DLD
 * @param {object} opts - { limit, dateFrom, dateTo, area, type }
 */
export async function fetchLiveTransactions(opts = {}) {
  const params = { limit: opts.limit || 100 };
  if (opts.dateFrom) params["filter"] = `transaction_date>='${opts.dateFrom}'`;
  if (opts.dateTo)   params["filter"] = (params["filter"] ? params["filter"] + " AND " : "") + `transaction_date<='${opts.dateTo}'`;
  if (opts.area)     params["filter"] = (params["filter"] ? params["filter"] + " AND " : "") + `area_name_en='${opts.area}'`;
  return ddaGet("dld_transactions-open-api", params);
}

/**
 * Fetch today's transactions
 */
export async function fetchTodayTransactions() {
  const today = new Date().toISOString().split("T")[0];
  return fetchLiveTransactions({ dateFrom: today, dateTo: today, limit: 500 });
}

/**
 * Fetch transactions for the past N days
 */
export async function fetchRecentTransactions(days = 7) {
  const to   = new Date();
  const from = new Date();
  from.setDate(from.getDate() - days);
  return fetchLiveTransactions({
    dateFrom: from.toISOString().split("T")[0],
    dateTo:   to.toISOString().split("T")[0],
    limit: 1000,
  });
}
