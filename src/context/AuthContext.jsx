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
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
      else setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
      else { setProfile(null); setLoading(false); }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function fetchProfile(userId) {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    setProfile(data);
    setLoading(false);
  }

  async function signInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
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

  const isPro = profile?.subscription_status === 'pro';

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
    const { data } = await supabase
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
      isPro, canSearch, recordSearch,
      signInWithGoogle, signInWithEmail, signUpWithEmail, signOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
