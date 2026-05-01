const IS_STG = process.env.REACT_APP_DDA_ENV !== "production";

const DDA_CONFIG = {
  tokenUrl: IS_STG
    ? "https://stg-apis.data.dubai/secure/ssis/dubaiai/gatewaytoken/1.0.0/getAccessToken"
    : "https://apis.data.dubai/secure/ssis/dubaiai/gatewaytoken/1.0.0/getAccessToken",
  apiBase: IS_STG
    ? "https://stg-apis.data.dubai/open/dld"
    : "https://apis.data.dubai/open/dld",
  appId:        process.env.REACT_APP_DDA_APP_ID        || "Q-4UkaFwR83JbNZwUmaNDNVEsnaGtnDFX5",
  clientId:     process.env.REACT_APP_DDA_CLIENT_ID     || "3KdzL5F4KUseZG4f2m5QvkkBrQmrcamv",
  clientSecret: process.env.REACT_APP_DDA_CLIENT_SECRET || "exFKDqqxSeg8KN7DmTFjm6CzQDvAjJJH",
};

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
  if (!data.access_token) throw new Error(data.Exception || "DDA token request failed");
  _tokenCache = {
    token:  data.access_token,
    expiry: Date.now() + ((data.expires_in || 3600) - 60) * 1000,
  };
  return _tokenCache.token;
}

async function ddaGet(dataset, params = {}) {
  const token = await getToken();
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== "")
  );
  const qs = new URLSearchParams(cleanParams).toString();
  const url = `${DDA_CONFIG.apiBase}/${dataset}${qs ? "?" + qs : ""}`;
  const res = await fetch(url, {
    headers: { "Authorization": `Bearer ${token}` },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `DDA API error ${res.status}`);
  }
  return res.json();
}

export function normalizeTx(raw) {
  return {
    id:              raw.transaction_id,
    date:            raw.instance_date,
    type:            raw.trans_group_en,
    procedure:       raw.procedure_name_en,
    propertyType:    raw.property_type_en,
    subType:         raw.property_sub_type_en,
    usage:           raw.property_usage_en,
    regType:         raw.reg_type_en,
    areaNbr:         raw.area_id,
    area:            raw.area_name_en,
    areaAr:          raw.area_name_ar,
    building:        raw.building_name_en,
    buildingAr:      raw.building_name_ar,
    project:         raw.project_name_en,
    masterProject:   raw.master_project_en,
    masterProjectAr: raw.master_project_ar,
    bedrooms:        raw.rooms_en,
    hasParking:      raw.has_parking === 1,
    sizeSqm:         raw.procedure_area,
    price:           raw.actual_worth,
    pricePerSqm:     raw.meter_sale_price,
    rentValue:       raw.rent_value,
    rentPerSqm:      raw.meter_rent_price,
    nearestMetro:    raw.nearest_metro_en,
    nearestMall:     raw.nearest_mall_en,
    nearestLandmark: raw.nearest_landmark_en,
  };
}

export async function fetchTransactions(opts = {}) {
  const {
    page      = 1,
    pageSize  = 1000,
    area,
    transType,
    propType,
    bedrooms,
    orderBy   = "instance_date",
    orderDir  = "desc",
  } = opts;

  let filter;
  if (area)           filter = `area_name_en=${area}`;
  else if (transType) filter = `trans_group_en=${transType}`;
  else if (propType)  filter = `property_type_en=${propType}`;
  else if (bedrooms)  filter = `rooms_en=${bedrooms}`;

  const data = await ddaGet("dld_transactions-open-api", {
    page, pageSize, order_by: orderBy, order_dir: orderDir, filter,
  });

  const results = (data.results || []).map(normalizeTx);
  return { results, raw: data };
}

// Fetch latest 1000 transactions sorted by date — no date filter since STG data is historical
export async function fetchRecentTransactions(days = 30) {
  return fetchTransactions({ pageSize: 1000, orderBy: "instance_date", orderDir: "desc" });
}

export async function fetchAreaTransactions(areaName, opts = {}) {
  return fetchTransactions({ ...opts, area: areaName, pageSize: opts.pageSize || 500 });
}

export async function fetchPage(page = 1, pageSize = 1000) {
  return fetchTransactions({ page, pageSize });
}
