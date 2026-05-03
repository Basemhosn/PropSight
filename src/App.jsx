import { useAuth } from './context/AuthContext';
import LoginPage from './components/LoginPage';
import LandingPage from './components/LandingPage';
import InvestorApp from './components/InvestorApp';
import OnboardingPage from './components/OnboardingPage';
import BrokerApp from './components/BrokerApp';

export default function App() {
  const { user, profile, loading } = useAuth();

  // Still loading auth state
  if (loading) return null;

  // New user — needs onboarding
  if (user && profile && profile.onboarded === false) {
    return <OnboardingPage user={user} onComplete={() => window.location.reload()} />;
  }

  // Not logged in — show landing or login
  if (!user) {
    const showLogin = sessionStorage.getItem('show_login');
    if (showLogin) return <LoginPage />;
    return (
      <LandingPage
        onLogin={() => { sessionStorage.setItem('show_login','1'); window.location.reload(); }}
        onInvestorLogin={() => { sessionStorage.setItem('show_login','1'); sessionStorage.setItem('intended_role','investor'); window.location.reload(); }}
        onBrokerLogin={() => { sessionStorage.setItem('show_login','1'); sessionStorage.setItem('intended_role','broker'); window.location.reload(); }}
      />
    );
  }

  // Investor portal
  if (profile?.role === 'investor') {
    return (
      <InvestorApp
        onSwitchToBroker={async () => {
          const { supabase } = await import('./context/AuthContext');
          await supabase.from('profiles').update({ role: 'broker' }).eq('id', user.id);
          window.location.reload();
        }}
      />
    );
  }

  // Broker portal (default)
  return <BrokerApp />;
}
