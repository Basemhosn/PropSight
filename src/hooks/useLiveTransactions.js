/**
 * useLiveTransactions — fetches live DLD data from /api/transactions
 * Falls back to static precomputed data if live API is unavailable
 */
import { useState, useEffect, useCallback } from 'react';

const LIVE_API = '/api/transactions';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

let liveCache = { data: null, fetchedAt: 0 };

export default function useLiveTransactions({ enabled = true } = {}) {
  const [liveData,   setLiveData]   = useState(null);
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [isLive,     setIsLive]     = useState(false);

  const fetchLive = useCallback(async (force = false) => {
    if (!enabled) return;

    // Use in-memory cache
    if (!force && liveCache.data && Date.now() - liveCache.fetchedAt < CACHE_TTL) {
      setLiveData(liveCache.data);
      setIsLive(true);
      setLastUpdate(new Date(liveCache.fetchedAt));
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res  = await fetch(`${LIVE_API}?limit=500`);
      const json = await res.json();

      if (!json.success) throw new Error(json.error || 'API error');

      liveCache = { data: json.data, fetchedAt: Date.now() };
      setLiveData(json.data);
      setIsLive(true);
      setLastUpdate(new Date());
    } catch (err) {
      setError(err.message);
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  }, [enabled]);

  useEffect(() => {
    fetchLive();
    // Auto-refresh every 5 minutes
    const interval = setInterval(() => fetchLive(), CACHE_TTL);
    return () => clearInterval(interval);
  }, [fetchLive]);

  return { liveData, loading, error, lastUpdate, isLive, refresh: () => fetchLive(true) };
}
