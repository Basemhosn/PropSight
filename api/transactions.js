/**
 * Vercel Serverless Function — Live DLD Transactions
 * GET /api/transactions?limit=100&offset=0&area=Dubai+Marina&from=2026-01-01
 *
 * Handles token fetch + caching + data fetch from data.dubai API
 */

const TOKEN_URL = 'https://apis.data.dubai/secure/sdg/ssis/gatewayoauthtoken/1.0.0/getAccessToken';
const DATA_URL  = 'https://apis.data.dubai/open/dld/dld_transactions-open-api';

const CLIENT_ID     = process.env.DDA_CLIENT_ID;
const CLIENT_SECRET = process.env.DDA_CLIENT_SECRET;
const APP_ID        = process.env.DDA_APP_ID; // Q-{4UkaFwR83JbNZwUmaNDNVEsnaGtnDFX5}

// In-memory token cache (reused across warm invocations)
let tokenCache = { token: null, expiresAt: 0 };

async function getToken() {
  if (tokenCache.token && Date.now() < tokenCache.expiresAt) {
    return tokenCache.token;
  }

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-DDA-SecurityApplicationIdentifier': APP_ID,
    },
    body: JSON.stringify({
      grant_type:    'client_credentials',
      client_id:     CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }),
  });

  const data = await res.json();
  if (!data.access_token) throw new Error(`Token error: ${JSON.stringify(data)}`);

  // Cache for 25 minutes (tokens valid ~30 min)
  tokenCache = {
    token:     data.access_token,
    expiresAt: Date.now() + 25 * 60 * 1000,
  };

  return data.access_token;
}

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  try {
    const token = await getToken();

    // Build query from request params
    const { limit = 100, offset = 0, area, from, to, type } = req.query;
    const filters = [];
    if (area)  filters.push(`area_name_en="${area}"`);
    if (from)  filters.push(`trans_date>="${from}"`);
    if (to)    filters.push(`trans_date<="${to}"`);
    if (type)  filters.push(`trans_type_en="${type}"`);

    let url = `${DATA_URL}?limit=${limit}&offset=${offset}`;
    if (filters.length) url += `&filters=${encodeURIComponent(filters.join(' AND '))}`;

    const dataRes = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'x-DDA-SecurityApplicationIdentifier': APP_ID,
      },
    });

    const data = await dataRes.json();

    // Normalise response — data.dubai returns { result: [...] } or { data: [...] }
    const rows = data.result || data.data || data.records || data || [];

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    res.status(200).json({ success: true, count: rows.length, data: rows });

  } catch (err) {
    console.error('DLD API error:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
}
