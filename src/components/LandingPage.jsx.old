import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const FEATURES = [
  { icon:'📊', title:'354,000+ Live Transactions', desc:'Complete DLD transaction history from 2020 to today. Every sale, mortgage and transfer in Dubai.' },
  { icon:'🤖', title:'AI Deal Analyzer', desc:'Get an instant Buy/Hold/Avoid verdict with fair value estimate, rental yield and comparable sales.' },
  { icon:'🗺️', title:'Dubai Heatmap', desc:'Visualize price per sqft across every area. Spot the next hot neighborhood before everyone else.' },
  { icon:'📈', title:'Weekly Market Pulse', desc:'AI-generated weekly summary. Know what moved, what is trending, and what to watch.' },
  { icon:'💼', title:'Portfolio Tracker', desc:'Track all your Dubai investments. Capital gain, rental yield and payment schedules.' },
  { icon:'🔔', title:'Price Alerts', desc:'Get notified when prices in your target areas move by your chosen threshold.' },
];

const AGENT_FEATURES = [
  { icon:'📥', title:'Bulk CSV Export', desc:'Export any dataset for your CRM or client presentations.' },
  { icon:'📄', title:'Branded PDF Reports', desc:'Send professional reports with your agency branding.' },
  { icon:'🔍', title:'Broker Lookup', desc:'Search DLD registered brokers by transaction volume and area.' },
  { icon:'📊', title:'Comparable Sales', desc:'Find the most similar recent transactions for any property.' },
];

const PLANS = [
  { name:'Free', price:'Free', color:'#64748B', border:'rgba(100,116,139,0.2)', btnBg:'rgba(100,116,139,0.1)', btnColor:'#64748B',
    features:['Home dashboard & KPIs','Market Intelligence','Properties (Off-plan & Ready)','Developers'] },
  { name:'Lite', price:'AED 99/mo', color:'#A78BFA', border:'rgba(139,92,246,0.3)', btnBg:'linear-gradient(135deg,#7C3AED,#A78BFA)', btnColor:'#fff',
    features:['Everything in Free','Recent Transactions','Deal Analyzer','Portfolio Tracker','Rental Index & Yields','Watchlist & Price Alerts'] },
  { name:'Pro', price:'AED 299/mo', color:'#F59E0B', border:'rgba(245,158,11,0.3)', btnBg:'linear-gradient(135deg,#B45309,#F59E0B)', btnColor:'#fff', popular:true,
    features:['Everything in Lite','AI Market Pulse weekly','Dubai Heatmap','Area Deep Dive','AI Concierge','PDF Reports & Exports'] },
];

export default function LandingPage({ onLogin, onInvestorLogin, onBrokerLogin }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const S = {
    section: { maxWidth: 1080, margin: '0 auto', width: '100%' },
    label: { fontSize: 11, fontWeight: 700, color: '#38BDF8', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 12, display: 'block' },
    h2: { fontFamily: "'Syne',sans-serif", fontSize: 'clamp(30px,4vw,48px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#F1F5F9', marginBottom: 16, lineHeight: 1.1 },
    p: { fontSize: 16, color: '#64748B', lineHeight: 1.75, maxWidth: 480 },
  };

  return (
    <div style={{ fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif", background: '#060E1A', color: '#F1F5F9', overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; }
        .lp-card { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .lp-card:hover { transform: translateY(-3px); box-shadow: 0 16px 40px rgba(0,0,0,0.3); }
        .lp-btn { transition: transform 0.15s ease, box-shadow 0.15s ease; }
        .lp-btn:hover { transform: translateY(-2px); }
        .lp-nav-link { transition: color 0.15s; cursor: pointer; font-size: 14px; color: #94A3B8; font-weight: 500; }
        .lp-nav-link:hover { color: #F1F5F9; }
        .g-text { background: linear-gradient(135deg,#38BDF8,#818CF8,#38BDF8); background-size: 200%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: gs 4s ease infinite; }
        @keyframes gs { 0%,100% { background-position:0% } 50% { background-position:100% } }
        .grid-bg { background-image: linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px); background-size: 60px 60px; }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 5%',
        background: scrolled ? 'rgba(6,14,26,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        transition: 'all 0.3s',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,#1D4ED8,#38BDF8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🏙️</div>
          <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 800, color: '#F1F5F9' }}>Prop<span style={{ color: '#38BDF8' }}>Sight</span></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <span className="lp-nav-link" onClick={() => scrollTo('features')}>Features</span>
          <span className="lp-nav-link" onClick={() => scrollTo('pricing')}>Pricing</span>
          <span className="lp-nav-link" onClick={() => scrollTo('agents')}>For Agents</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={onLogin} className="lp-nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: '8px 14px' }}>Sign in</button>
          <button onClick={onLogin} className="lp-btn" style={{ padding: '9px 22px', borderRadius: 10, border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg,#1D4ED8,#38BDF8)', color: '#fff', fontSize: 14, fontWeight: 600, fontFamily: 'inherit' }}>Get started →</button>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" className="grid-bg" style={{ padding: '130px 5% 80px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '10%', left: '5%', width: 400, height: 400, borderRadius: '50%', background: 'rgba(29,78,216,0.1)', filter: 'blur(100px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: 300, height: 300, borderRadius: '50%', background: 'rgba(56,189,248,0.07)', filter: 'blur(80px)', pointerEvents: 'none' }} />

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: 20, padding: '6px 16px', fontSize: 13, color: '#38BDF8', fontWeight: 600, marginBottom: 24 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 8px #22C55E', display: 'inline-block', flexShrink: 0 }} />
          Live DLD Data · 354,343 Transactions
        </div>

        <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(38px,5.5vw,72px)', fontWeight: 800, lineHeight: 1.05, marginBottom: 20, letterSpacing: '-0.03em', maxWidth: 800 }}>
          Dubai Real Estate<br /><span className="g-text">Intelligence</span>
        </h1>

        <p style={{ fontSize: 18, color: '#64748B', maxWidth: 500, lineHeight: 1.75, marginBottom: 36 }}>
          The most comprehensive Dubai property data platform. AI-powered deal analysis, live DLD transactions, and market intelligence.
        </p>

        <div style={{ marginBottom: 16, fontSize: 13, color: '#475569', fontWeight: 500 }}>Choose your path</div>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 60 }}>
          <button onClick={onInvestorLogin || onLogin} className="lp-btn" style={{ padding: '16px 32px', borderRadius: 14, border: '2px solid rgba(56,189,248,0.3)', cursor: 'pointer', background: 'rgba(29,78,216,0.15)', color: '#F1F5F9', fontSize: 15, fontWeight: 600, fontFamily: 'inherit', minWidth: 200, textAlign: 'center' }}>
            <div style={{ fontSize: 24, marginBottom: 6 }}>👤</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#38BDF8', marginBottom: 3 }}>I am an Investor</div>
            <div style={{ fontSize: 12, color: '#64748B', fontWeight: 400 }}>Search areas, check deals, track portfolio</div>
          </button>
          <button onClick={onBrokerLogin || onLogin} className="lp-btn" style={{ padding: '16px 32px', borderRadius: 14, border: '2px solid rgba(245,158,11,0.3)', cursor: 'pointer', background: 'rgba(180,83,9,0.1)', color: '#F1F5F9', fontSize: 15, fontWeight: 600, fontFamily: 'inherit', minWidth: 200, textAlign: 'center' }}>
            <div style={{ fontSize: 24, marginBottom: 6 }}>🏢</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#F59E0B', marginBottom: 3 }}>I am a Broker</div>
            <div style={{ fontSize: 12, color: '#64748B', fontWeight: 400 }}>Full terminal, reports, analytics, exports</div>
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', maxWidth: 620, width: '100%', background: 'rgba(13,25,41,0.85)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, overflow: 'hidden', backdropFilter: 'blur(20px)' }}>
          {[['354K+','Transactions'],['30+','Areas'],['1,145+','Projects'],['Live','Data']].map(([v,l],i) => (
            <div key={i} style={{ padding: '16px 10px', textAlign: 'center', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, color: '#F1F5F9', marginBottom: 2 }}>{v}</div>
              <div style={{ fontSize: 11, color: '#475569', fontWeight: 500 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ padding: '72px 5%' }}>
        <div style={S.section}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={S.label}>FEATURES</span>
            <h2 style={{ ...S.h2, textAlign: 'center' }}>Built for Dubai investors</h2>
            <p style={{ ...S.p, margin: '0 auto', textAlign: 'center' }}>From first-time buyers to seasoned investors and agents — PropSight has the intelligence you need.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 14 }}>
            {FEATURES.map((f, i) => (
              <div key={i} className="lp-card" style={{ background: '#0D1929', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: 22 }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{f.icon}</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 700, color: '#F1F5F9', marginBottom: 8 }}>{f.title}</div>
                <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.65 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOR AGENTS */}
      <section id="agents" style={{ padding: '72px 5%', background: 'rgba(13,25,41,0.4)' }}>
        <div style={{ ...S.section, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
          <div>
            <span style={{ ...S.label, color: '#F59E0B' }}>FOR AGENTS & BROKERS</span>
            <h2 style={S.h2}>Close more deals with professional tools</h2>
            <p style={{ ...S.p, marginBottom: 28 }}>PropSight Pro gives agents everything they need to serve clients better, analyze deals faster, and win more listings.</p>
            <button onClick={onLogin} className="lp-btn" style={{ padding: '12px 26px', borderRadius: 10, border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg,#B45309,#F59E0B)', color: '#fff', fontSize: 14, fontWeight: 600, fontFamily: 'inherit' }}>
              Get Pro → AED 299/mo
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {AGENT_FEATURES.map((f, i) => (
              <div key={i} className="lp-card" style={{ background: '#0D1929', border: '1px solid rgba(245,158,11,0.12)', borderRadius: 14, padding: 18 }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{f.icon}</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 13, fontWeight: 700, color: '#F1F5F9', marginBottom: 5 }}>{f.title}</div>
                <div style={{ fontSize: 12, color: '#64748B', lineHeight: 1.6 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: '72px 5%' }}>
        <div style={S.section}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={S.label}>PRICING</span>
            <h2 style={{ ...S.h2, textAlign: 'center' }}>Simple, transparent pricing</h2>
            <p style={{ ...S.p, margin: '0 auto', textAlign: 'center' }}>All prices in AED. Cancel anytime. No hidden fees.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            {PLANS.map((plan, i) => (
              <div key={i} className="lp-card" style={{ background: plan.popular ? 'linear-gradient(160deg,#0D1929,#0A1E3D)' : '#0D1929', border: `2px solid ${plan.border}`, borderRadius: 18, padding: 26, position: 'relative', boxShadow: plan.popular ? `0 0 50px ${plan.color}12` : 'none' }}>
                {plan.popular && <div style={{ position: 'absolute', top: -11, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg,#B45309,#F59E0B)', color: '#fff', fontSize: 10, fontWeight: 700, padding: '3px 14px', borderRadius: 20, whiteSpace: 'nowrap' }}>MOST POPULAR</div>}
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 12, fontWeight: 700, color: plan.color, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>{plan.name}</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 28, fontWeight: 800, color: '#F1F5F9', marginBottom: 18 }}>{plan.price}</div>
                <button onClick={onLogin} className="lp-btn" style={{ width: '100%', padding: '11px', borderRadius: 9, border: 'none', cursor: 'pointer', marginBottom: 18, fontSize: 13, fontWeight: 600, fontFamily: 'inherit', background: plan.btnBg, color: plan.btnColor }}>
                  {plan.price === 'Free' ? 'Start free →' : `Get ${plan.name} →`}
                </button>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {plan.features.map((f, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                      <span style={{ color: plan.color, fontSize: 12, flexShrink: 0, marginTop: 1 }}>✓</span>
                      <span style={{ fontSize: 13, color: '#94A3B8', lineHeight: 1.4 }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: '80px 5%', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 400, borderRadius: '50%', background: 'rgba(29,78,216,0.07)', filter: 'blur(100px)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(32px,5vw,56px)', fontWeight: 800, marginBottom: 16, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            Start making smarter<br /><span className="g-text">property decisions today</span>
          </h2>
          <p style={{ fontSize: 17, color: '#64748B', marginBottom: 36 }}>Join investors, agents and developers already using PropSight.</p>
          <button onClick={onLogin} className="lp-btn" style={{ padding: '15px 40px', borderRadius: 12, border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg,#1D4ED8,#38BDF8)', color: '#fff', fontSize: 16, fontWeight: 600, fontFamily: 'inherit', boxShadow: '0 4px 24px rgba(56,189,248,0.2)' }}>
            Get started for free →
          </button>
          <div style={{ fontSize: 13, color: '#334155', marginTop: 14 }}>No credit card required · Free plan always available</div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '28px 5%', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 26, height: 26, borderRadius: 6, background: 'linear-gradient(135deg,#1D4ED8,#38BDF8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>🏙️</div>
          <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 700, color: '#F1F5F9' }}>Prop<span style={{ color: '#38BDF8' }}>Sight</span></span>
        </div>
        <div style={{ fontSize: 13, color: '#334155' }}>Data from Dubai Land Department · {new Date().getFullYear()}</div>
        <div style={{ display: 'flex', gap: 20 }}>
          {['Privacy', 'Terms', 'Contact'].map(l => (
            <span key={l} style={{ fontSize: 13, color: '#475569', cursor: 'pointer' }}>{l}</span>
          ))}
        </div>
      </footer>
    </div>
  );
}
