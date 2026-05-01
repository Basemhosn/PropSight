import { useEffect, useState, useRef } from 'react';
import { t } from '../i18n';

const FEATURES_BENTO = {
  hero: { icon:null, title:'AI Deal Analyzer', desc:'Paste any property. Get an instant Buy/Hold/Avoid verdict with fair value, rental yield, and comparable sales — in seconds.', accent:'#38BDF8' },
  tall: { icon:null, title:'354K+ Live Transactions', desc:'Complete DLD transaction history from 2020 to today. Every sale, mortgage, and transfer in Dubai — fully searchable.', accent:'#A78BFA' },
  wide: { icon:null, title:'Weekly Market Pulse', desc:'AI-generated weekly summary. Know what moved, what is trending, and what to watch.', accent:'#F59E0B' },
  small1: { icon:null, title:'Dubai Heatmap', desc:'Visualize price per sqft across every area. Spot the next hot neighborhood.' },
  small2: { icon:null, title:'Portfolio Tracker', desc:'Track all your Dubai investments. Capital gain, rental yield, payment schedules.' },
  small3: { icon:null, title:'Price Alerts', desc:'Get notified when prices in your target areas move by your chosen threshold.' },
};

const AGENT_FEATURES = [
  { icon:'📥', title:'Bulk CSV Export', desc:'Export any dataset for your CRM or client presentations.' },
  { icon:'📄', title:'Branded PDF Reports', desc:'Send professional reports with your agency branding.' },
  { icon:'🔍', title:'Broker Lookup', desc:'Search DLD registered brokers by transaction volume and area.' },
  { icon:null, title:'Comparable Sales', desc:'Find the most similar recent transactions for any property.' },
];

const INVESTOR_PLANS = [
  { name:'Free', price:'Free', priceSub:'forever', color:'#64748B', border:'rgba(100,116,139,0.25)', btnBg:'rgba(100,116,139,0.1)', btnColor:'#94A3B8', cta:'Start free →',
    features:['Search any area in Dubai','Browse recent transactions','Basic market overview','Save up to 3 favorites'] },
  { name:'Pro', price:'AED 99', priceSub:'/month', color:'#38BDF8', border:'rgba(56,189,248,0.35)', btnBg:'linear-gradient(135deg,#1D4ED8,#38BDF8)', btnColor:'#fff', popular:true, cta:'Get Investor Pro →',
    features:['Everything in Free','AI Deal Analyzer (unlimited)','Portfolio tracker','Price alerts on watched areas','Rental yield estimates'] },
];

const BROKER_PLANS = [
  { name:'Free', price:'Free', priceSub:'forever', color:'#64748B', border:'rgba(100,116,139,0.25)', btnBg:'rgba(100,116,139,0.1)', btnColor:'#94A3B8', cta:'Start free →',
    features:['Home dashboard & KPIs','Market intelligence','Properties (off-plan & ready)','Developer profiles'] },
  { name:'Lite', price:'AED 99', priceSub:'/month', color:'#A78BFA', border:'rgba(139,92,246,0.35)', btnBg:'linear-gradient(135deg,#7C3AED,#A78BFA)', btnColor:'#fff', cta:'Get Broker Lite →',
    features:['Everything in Free','Recent transactions feed','Deal Analyzer','Rental Index & yields','Watchlist & price alerts'] },
  { name:'Pro', price:'AED 299', priceSub:'/month', color:'#F59E0B', border:'rgba(245,158,11,0.35)', btnBg:'linear-gradient(135deg,#B45309,#F59E0B)', btnColor:'#fff', popular:true, cta:'Get Broker Pro →',
    features:['Everything in Lite','AI Market Pulse weekly','Dubai Heatmap','Area Deep Dive','AI Concierge','Branded PDF reports'] },
];

// Reveal-on-scroll wrapper using IntersectionObserver
function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function LandingPage({ onLogin, onInvestorLogin, onBrokerLogin }) {
  const lang = localStorage.getItem('lang') || 'en';
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const S = {
    section: { maxWidth: 1080, margin: '0 auto', width: '100%' },
    label: { fontSize: 11, fontWeight: 700, color: '#38BDF8', textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: 14, display: 'block' },
    h2: { fontFamily: "'Syne',sans-serif", fontSize: 'clamp(28px, 3.6vw, 42px)', fontWeight: 800, letterSpacing: '-0.025em', color: '#F1F5F9', marginBottom: 16, lineHeight: 1.1 },
    p: { fontSize: 15, color: '#94A3B8', lineHeight: 1.65, maxWidth: 540 },
  };

  const PlanCard = ({ plan, audienceLabel }) => (
    <div className="lp-card" style={{ background: plan.popular ? 'linear-gradient(160deg,#0D1929,#0A1E3D)' : '#0D1929', border: `2px solid ${plan.border}`, borderRadius: 18, padding: 24, position: 'relative', boxShadow: plan.popular ? `0 0 40px ${plan.color}1A` : 'none', display: 'flex', flexDirection: 'column' }}>
      {plan.popular && <div style={{ position: 'absolute', top: -11, left: '50%', transform: 'translateX(-50%)', background: plan.btnBg, color: '#fff', fontSize: 10, fontWeight: 700, padding: '3px 14px', borderRadius: 20, whiteSpace: 'nowrap', letterSpacing: '0.05em' }}>{t('Most Popular',lang)}</div>}
      <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 12, fontWeight: 700, color: plan.color, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>{plan.name}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 18 }}>
        <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 28, fontWeight: 800, color: '#F1F5F9', letterSpacing: '-0.02em' }}>{plan.price}</span>
        <span style={{ fontSize: 13, color: '#64748B' }}>{plan.priceSub}</span>
      </div>
      <button onClick={audienceLabel === 'investor' ? (onInvestorLogin || onLogin) : (onBrokerLogin || onLogin)} className="lp-btn" style={{ width: '100%', padding: '11px', borderRadius: 10, border: 'none', cursor: 'pointer', marginBottom: 18, fontSize: 13, fontWeight: 600, fontFamily: 'inherit', background: plan.btnBg, color: plan.btnColor }}>
        {plan.cta}
      </button>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9, flex: 1 }}>
        {plan.features.map((f, j) => (
          <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <span style={{ color: plan.color, fontSize: 13, flexShrink: 0, marginTop: 1, fontWeight: 700 }}>✓</span>
            <span style={{ fontSize: 13, color: '#CBD5E1', lineHeight: 1.5 }}>{f}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const BentoCard = ({ feature, size = 'sm', gridArea }) => {
    const isLarge = size === 'lg';
    const isTall = size === 'tall';
    const isWide = size === 'wide';
    return (
      <div
        className="lp-bento"
        style={{
          gridArea,
          background: isLarge
            ? `radial-gradient(circle at 100% 0%, ${feature.accent}1F 0%, transparent 60%), #0D1929`
            : isTall
              ? `radial-gradient(circle at 0% 100%, ${feature.accent}17 0%, transparent 55%), #0D1929`
              : isWide
                ? `radial-gradient(circle at 100% 100%, ${feature.accent}17 0%, transparent 55%), #0D1929`
                : '#0D1929',
          border: `1px solid ${(isLarge || isTall || isWide) ? `${feature.accent}33` : 'rgba(255,255,255,0.06)'}`,
          borderRadius: 18,
          padding: isLarge ? 32 : 22,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: (isLarge || isTall) ? 'space-between' : 'flex-start',
          minHeight: isTall ? 320 : isLarge ? 240 : 170,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ fontSize: isLarge ? 36 : 26, marginBottom: isLarge ? 18 : 12 }}>{feature.icon}</div>
        <div>
          <div style={{ fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif", fontSize: isLarge ? 22 : 15, fontWeight: 700, color: '#F1F5F9', marginBottom: 8, letterSpacing: '-0.01em' }}>{feature.title}</div>
          <div style={{ fontSize: isLarge ? 15 : 13, color: '#94A3B8', lineHeight: 1.6 }}>{feature.desc}</div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif", background: '#060E1A', color: '#F1F5F9', overflowX: 'hidden', position: 'relative' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; }
        .lp-card, .lp-bento { transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease; }
        .lp-card:hover { transform: translateY(-3px); box-shadow: 0 16px 40px rgba(0,0,0,0.35); }
        .lp-bento:hover { transform: translateY(-2px); border-color: rgba(255,255,255,0.14); box-shadow: 0 12px 32px rgba(0,0,0,0.3); }
        .lp-btn { transition: transform 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease; }
        .lp-btn:hover { transform: translateY(-1px); }
        .lp-nav-link { transition: color 0.15s; cursor: pointer; font-size: 14px; color: #94A3B8; font-weight: 500; }
        .lp-nav-link:hover { color: #F1F5F9; }
        .g-text { background: linear-gradient(135deg,#38BDF8,#818CF8,#38BDF8); background-size: 200%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: gs 5s ease infinite; }
        @keyframes gs { 0%,100% { background-position:0% } 50% { background-position:100% } }
        .lp-hero-card { transition: transform 0.2s ease, border-color 0.2s ease; }
        .lp-hero-card:hover { transform: translateY(-2px); }
        .lp-nav-inner { max-width: 1200px; margin: 0 auto; width: 100%; display: flex; align-items: center; justify-content: space-between; }
        .mesh-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 18% 12%, rgba(29,78,216,0.20) 0%, transparent 48%),
            radial-gradient(circle at 82% 22%, rgba(56,189,248,0.13) 0%, transparent 45%),
            radial-gradient(circle at 50% 88%, rgba(139,92,246,0.10) 0%, transparent 50%);
          pointer-events: none;
          z-index: 0;
        }
        .mesh-bg > * { position: relative; z-index: 1; }
        .grain { position: absolute; inset: 0; pointer-events: none; opacity: 0.5; background-image: linear-gradient(rgba(59,130,246,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.025) 1px, transparent 1px); background-size: 80px 80px; z-index: 0; }
        .lp-bento-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: 1fr 1fr 1fr 1fr;
          grid-template-areas:
            "hero hero tall"
            "hero hero tall"
            "small1 small2 small3"
            "wide wide small3";
          gap: 14px;
        }
        @media (max-width: 900px) {
          .lp-nav-links { display: none !important; }
          .lp-agents-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
          .lp-pricing-pair { grid-template-columns: 1fr !important; gap: 32px !important; }
          .lp-investor-plans, .lp-broker-plans { grid-template-columns: 1fr !important; }
          .lp-bento-grid {
            grid-template-columns: 1fr;
            grid-template-rows: auto;
            grid-template-areas:
              "hero"
              "tall"
              "small1"
              "small2"
              "small3"
              "wide";
          }
        }
        @media (max-width: 600px) {
          .lp-hero-cta-row { flex-direction: column !important; align-items: stretch !important; }
          .lp-hero-cta-row > button { min-width: 0 !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, height: 64,
        display: 'flex', alignItems: 'center', padding: '0 clamp(20px, 5vw, 80px)',
        background: scrolled ? 'rgba(6,14,26,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        transition: 'all 0.3s',
      }}>
        <div className="lp-nav-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,#1D4ED8,#38BDF8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}></div>
            <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 800, color: '#F1F5F9' }}>Prop<span style={{ color: '#38BDF8' }}>Sight</span></span>
          </div>
          <div className="lp-nav-links" style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
            <span className="lp-nav-link" onClick={() => scrollTo('features')}>Features</span>
            <span className="lp-nav-link" onClick={() => scrollTo('pricing')}>Pricing</span>
            <span className="lp-nav-link" onClick={() => scrollTo('agents')}>{t('For Brokers',lang)}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button onClick={onLogin} className="lp-nav-link lp-nav-links" style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: '8px 14px' }}>Sign in</button>
            <button onClick={onLogin} className="lp-btn" style={{ padding: '9px 20px', borderRadius: 10, border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg,#1D4ED8,#38BDF8)', color: '#fff', fontSize: 14, fontWeight: 600, fontFamily: 'inherit' }}>{t('Get started',lang)}</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" className="mesh-bg" style={{ padding: '130px clamp(20px, 5vw, 80px) 100px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="grain" />
        <Reveal>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: 20, padding: '6px 16px', fontSize: 12, color: '#38BDF8', fontWeight: 600, marginBottom: 28, letterSpacing: '0.02em' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 8px #22C55E', display: 'inline-block', flexShrink: 0 }} />
            Live DLD data · 354,343 transactions
          </div>
        </Reveal>

        <Reveal delay={80}>
          <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 800, lineHeight: 1.06, marginBottom: 22, letterSpacing: '-0.03em', maxWidth: 760 }}>
            Clarity in <span className="g-text">every move.</span>
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p style={{ fontSize: 18, color: '#94A3B8', maxWidth: 580, lineHeight: 1.6, marginBottom: 40 }}>
            Property data, AI analysis, and market intelligence — built for investors and brokers across the Gulf.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="lp-hero-cta-row" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 56 }}>
            <button onClick={onInvestorLogin || onLogin} className="lp-btn lp-hero-card" style={{ padding: '14px 28px', borderRadius: 12, border: '1px solid rgba(56,189,248,0.3)', cursor: 'pointer', background: 'rgba(29,78,216,0.12)', color: '#F1F5F9', fontSize: 15, fontWeight: 600, fontFamily: 'inherit', minWidth: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
              
              <span style={{ color: '#38BDF8' }}>I'm an investor</span>
              <span style={{ color: '#64748B', fontWeight: 400 }}>→</span>
            </button>
            <button onClick={onBrokerLogin || onLogin} className="lp-btn lp-hero-card" style={{ padding: '14px 28px', borderRadius: 12, border: '1px solid rgba(245,158,11,0.3)', cursor: 'pointer', background: 'rgba(180,83,9,0.08)', color: '#F1F5F9', fontSize: 15, fontWeight: 600, fontFamily: 'inherit', minWidth: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
              
              <span style={{ color: '#F59E0B' }}>I'm a broker</span>
              <span style={{ color: '#64748B', fontWeight: 400 }}>→</span>
            </button>
          </div>
        </Reveal>

        <Reveal delay={320}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', maxWidth: 660, width: '100%', background: 'rgba(13,25,41,0.7)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, overflow: 'hidden', backdropFilter: 'blur(20px)' }}>
            {[['354K+','Transactions'],['30+','Areas'],['1,145+','Projects'],['Live','Data']].map(([v,l],i) => (
              <div key={i} style={{ padding: '16px 10px', textAlign: 'center', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, color: '#F1F5F9', marginBottom: 2, letterSpacing: '-0.02em' }}>{v}</div>
                <div style={{ fontSize: 11, color: '#64748B', fontWeight: 500 }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, fontSize: 12, color: '#475569', fontWeight: 500, letterSpacing: '0.02em', textAlign: 'center' }}>Source: Dubai Land Department · Updated daily</div>
        </Reveal>
      </section>

      {/* FEATURES — BENTO */}
      <section id="features" style={{ padding: '90px clamp(20px, 5vw, 80px)' }}>
        <div style={S.section}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <span style={S.label}>FEATURES</span>
              <h2 style={{ ...S.h2, textAlign: 'center' }}>Everything you need to make confident moves.</h2>
              <p style={{ ...S.p, margin: '0 auto', textAlign: 'center' }}>From first-time buyers to seasoned investors and brokers — PropSight has the intelligence you need.</p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="lp-bento-grid">
              <BentoCard feature={FEATURES_BENTO.hero} size="lg" gridArea="hero" />
              <BentoCard feature={FEATURES_BENTO.tall} size="tall" gridArea="tall" />
              <BentoCard feature={FEATURES_BENTO.small1} size="sm" gridArea="small1" />
              <BentoCard feature={FEATURES_BENTO.small2} size="sm" gridArea="small2" />
              <BentoCard feature={FEATURES_BENTO.small3} size="sm" gridArea="small3" />
              <BentoCard feature={FEATURES_BENTO.wide} size="wide" gridArea="wide" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOR BROKERS */}
      <section id="agents" style={{ padding: '90px clamp(20px, 5vw, 80px)', background: 'rgba(13,25,41,0.4)', position: 'relative' }}>
        <div className="lp-agents-grid" style={{ ...S.section, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
          <Reveal>
            <div>
              <span style={{ ...S.label, color: '#F59E0B' }}>FOR BROKERS</span>
              <h2 style={S.h2}>Close more deals with professional tools.</h2>
              <p style={{ ...S.p, marginBottom: 28 }}>Broker plans give you everything to serve clients better, analyze deals faster, and win more listings.</p>
              <button onClick={onBrokerLogin || onLogin} className="lp-btn" style={{ padding: '12px 26px', borderRadius: 10, border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg,#B45309,#F59E0B)', color: '#fff', fontSize: 14, fontWeight: 600, fontFamily: 'inherit' }}>
                See broker plans →
              </button>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {AGENT_FEATURES.map((f, i) => (
                <div key={i} className="lp-card" style={{ background: '#0D1929', border: '1px solid rgba(245,158,11,0.12)', borderRadius: 14, padding: 18 }}>
                  <div style={{ fontSize: 22, marginBottom: 8 }}>{f.icon}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#F1F5F9', marginBottom: 5 }}>{f.title}</div>
                  <div style={{ fontSize: 12, color: '#94A3B8', lineHeight: 1.55 }}>{f.desc}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: '90px clamp(20px, 5vw, 80px)' }}>
        <div style={S.section}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <span style={S.label}>PRICING</span>
              <h2 style={{ ...S.h2, textAlign: 'center' }}>Pick the plan that fits how you work.</h2>
              <p style={{ ...S.p, margin: '0 auto', textAlign: 'center' }}>All prices in AED. Cancel anytime. No hidden fees.</p>
            </div>
          </Reveal>

          <div className="lp-pricing-pair" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <Reveal delay={80}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                  <span style={{ fontSize: 22 }}>👤</span>
                  <div>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 700, color: '#F1F5F9' }}>For investors</div>
                    <div style={{ fontSize: 12, color: '#64748B' }}>Search, analyze, track</div>
                  </div>
                </div>
                <div className="lp-investor-plans" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {INVESTOR_PLANS.map((p, i) => <PlanCard key={i} plan={p} audienceLabel="investor" />)}
                </div>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                  <span style={{ fontSize: 22 }}>🏢</span>
                  <div>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 700, color: '#F1F5F9' }}>For brokers</div>
                    <div style={{ fontSize: 12, color: '#64748B' }}>Full terminal, reports, exports</div>
                  </div>
                </div>
                <div className="lp-broker-plans" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
                  {BROKER_PLANS.map((p, i) => <PlanCard key={i} plan={p} audienceLabel="broker" />)}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mesh-bg" style={{ padding: '100px clamp(20px, 5vw, 80px)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="grain" />
        <Reveal>
          <div style={{ position: 'relative', maxWidth: 640, margin: '0 auto' }}>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, marginBottom: 16, letterSpacing: '-0.025em', lineHeight: 1.1 }}>
              Make smarter property<br /><span className="g-text">decisions today.</span>
            </h2>
            <p style={{ fontSize: 16, color: '#94A3B8', marginBottom: 32 }}>Free to start. No credit card required.</p>
            <button onClick={onLogin} className="lp-btn" style={{ padding: '15px 40px', borderRadius: 12, border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg,#1D4ED8,#38BDF8)', color: '#fff', fontSize: 16, fontWeight: 600, fontFamily: 'inherit', boxShadow: '0 4px 24px rgba(56,189,248,0.2)' }}>
              Get started for free →
            </button>
          </div>
        </Reveal>
      </section>

      {/* COMING SOON */}
      <section style={{ padding: '24px clamp(20px, 5vw, 80px)', borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)', background: 'rgba(13,25,41,0.4)' }}>
        <div style={{ ...S.section, textAlign: 'center' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#94A3B8', letterSpacing: '0.01em' }}>
            Live in Dubai. <span style={{ color: '#475569' }}>Coming soon to Abu Dhabi, Riyadh, and Doha.</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '32px clamp(20px, 5vw, 80px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 26, height: 26, borderRadius: 6, background: 'linear-gradient(135deg,#1D4ED8,#38BDF8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>🏙️</div>
          <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 700, color: '#F1F5F9' }}>Prop<span style={{ color: '#38BDF8' }}>Sight</span></span>
        </div>
        <div style={{ fontSize: 12, color: '#475569', textAlign: 'center' }}>Data from Dubai Land Department · Made in Dubai 🇦🇪 · © {new Date().getFullYear()}</div>
      </footer>
    </div>
  );
}
