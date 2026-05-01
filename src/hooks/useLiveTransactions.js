/**
 * useLiveTransactions — fetches live DLD data directly from DDA API
 * DDA is UAE geo-restricted, so this runs in the user's browser (UAE IP) ✅
 */
import { useState, useEffect, useCallback } from 'react';
import { fetchRecentTransactions } from '../services/ddaApi';

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
let _cache = { data: null, fetchedAt: 0 };

// Adapts normalized DDA shape → short-key shape RecentTransactions expects
function toRaw(tx) {
  return {
    n: tx.id,
    d: tx.date,
    t: tx.type === 'Sales' ? 'Sale' : tx.type,   // DDA says "Sales", UI says "Sale"
    a: tx.area,
    v: tx.price,
    s: tx.sizeSqm,
    b: tx.bedrooms,
    j: tx.project || tx.building || tx.masterProject || '',
    r: tx.regType === 'Existing Properties' ? 'Ready' : 'Off',
  };
}

export default function useLiveTransactions({ enabled = true, days = 30 } = {}) {
  const [liveData,   setLiveData]   = useState(null);
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [isLive,     setIsLive]     = useState(false);

  const fetchLive = useCallback(async (force = false) => {
    if (!enabled) return;

    if (!force && _cache.data && Date.now() - _cache.fetchedAt < CACHE_TTL) {
      setLiveData(_cache.data);
      setIsLive(true);
      setLastUpdate(new Date(_cache.fetchedAt));
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { results } = await fetchRecentTransactions(days);
      const raw = results.map(toRaw);
      _cache = { data: raw, fetchedAt: Date.now() };
      setLiveData(raw);
      setIsLive(true);
      setLastUpdate(new Date());
    } catch (err) {
      console.error('DDA fetch failed:', err.message);
      setError(err.message);
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  }, [enabled, days]);

  useEffect(() => {
    fetchLive();
    const interval = setInterval(() => fetchLive(), CACHE_TTL);
    return () => clearInterval(interval);
  }, [fetchLive]);

  return { liveData, loading, error, lastUpdate, isLive, refresh: () => fetchLive(true) };
}
