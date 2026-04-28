import { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// These will be replaced with real values from .env
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Clean up OAuth callback URL on initial load — prevents back button returning to Google auth URL
    if (window.location.hash.includes('access_token') || window.location.hash.includes('error')) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
      else setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
        // After SIGNED_IN, also clean up any lingering OAuth fragments
        if (event === 'SIGNED_IN' && window.location.hash) {
          window.history.replaceState(null, '', window.location.pathname + window.location.search);
        }
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Refresh profile when tab becomes visible (picks up webhook updates)
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'visible' && user) {
        fetchProfile(user.id);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [user]);

  async function fetchProfile(userId) {
    let { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    // Set role from landing page selection if first login
    const intendedRole = sessionStorage.getItem('intended_role');
    if (intendedRole && (!data?.role || data?.role === 'investor')) {
      await supabase.from('profiles').update({ role: intendedRole }).eq('id', userId);
      sessionStorage.removeItem('intended_role');
      data = { ...data, role: intendedRole };
    }
    setProfile(data);
    setLoading(false);
  }

  async function signInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin + '/?auth=callback' },
    });
  }

  async function signInWithEmail(email, password) {
    return supabase.auth.signInWithPassword({ email, password });
  }

  async function signUpWithEmail(email, password, fullName) {
    return supabase.auth.signUp({
      email, password,
      options: { data: { full_name: fullName } },
    });
  }

  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  }

  const isPro = profile?.subscription_status === 'pro' || profile?.subscription_status === 'agent' || profile?.email === 'basem.aboulhosn@gmail.com';
  const isLite = profile?.subscription_status === 'lite' || isPro;
  const isAgent = profile?.subscription_status === 'agent';
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const toggleTheme = () => { const n=theme==='dark'?'light':'dark'; setTheme(n); localStorage.setItem('theme',n); };
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'en');
  const toggleLang = () => { const n=lang==='en'?'ar':'en'; setLang(n); localStorage.setItem('lang',n); };

  const canSearch = () => {
    if (isPro) return true;
    const today = new Date().toISOString().split('T')[0];
    const resetDate = profile?.searches_reset_at;
    const count = resetDate === today ? (profile?.searches_today || 0) : 0;
    return count < 3;
  };

  const recordSearch = async () => {
    if (!user || isPro) return;
    const today = new Date().toISOString().split('T')[0];
    const resetDate = profile?.searches_reset_at;
    const newCount = resetDate === today ? (profile?.searches_today || 0) + 1 : 1;
    let { data } = await supabase
      .from('profiles')
      .update({ searches_today: newCount, searches_reset_at: today })
      .eq('id', user.id)
      .select()
      .single();
    if (data) setProfile(data);
  };

  return (
    <AuthContext.Provider value={{
      user, profile, loading,
      isPro, isLite, isAgent, canSearch, recordSearch,
      signInWithGoogle, signInWithEmail, signUpWithEmail, signOut,
      theme, toggleTheme, lang, toggleLang,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
