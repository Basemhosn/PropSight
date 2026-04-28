import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const PLANS = [
  {
    id:'free', name:'Free', price:0, currency:'', color:'#64748B', accent:'rgba(100,116,139,0.15)', border:'rgba(100,116,139,0.2)',
    tag:'What you get for free',
    features:[
      'Home dashboard & KPIs',
      'Overview & market charts',
      'Properties (Off-plan & Ready)',
      'Market Intelligence',
      'Developers',
    ]
  },
  {
    id:'lite', name:'Lite', price:99, currency:'AED', color:'#A78BFA', accent:'rgba(139,92,246,0.15)', border:'rgba(139,92,246,0.3)',
    tag:'In addition to Free',
    features:[
      'Recent Transactions (Live Feed + Search)',
      'Rental Index & Yield Calculator',
      'Deal Analyzer (Buy & Sell mode)',
      'My Portfolio Tracker',
      'Watchlist',
      'Price Alerts',
      'ROI Calculator',
    ]
  },
  {
    id:'pro', name:'Pro', price:299, currency:'AED', color:'#F59E0B', accent:'rgba(245,158,11,0.15)', border:'rgba(245,158,11,0.3)', popular:true,
    tag:'In addition to Free & Lite',
    features:[
      'Market Pulse — AI weekly report',
      'Dubai Heatmap',
      'Area Analysis (deep dive)',
      'AI Concierge',
      'PDF Export & branded reports',
      'Shareable Reports',
      'Comparable Sales tool',
      'Property Lookup (1,145+ projects)',
      'Priority support',
    ]
  }
];

const BTN_BG = {
  free: 'rgba(100,116,139,0.1)',
  lite: 'linear-gradient(135deg,#7C3AED,#A78BFA)',
  pro:  'linear-gradient(135deg,#B45309,#F59E0B)',
};

export default function UpgradePage() {
  const { user, profile, isPro, isLite } = useAuth();
  const [loading, setLoading] = useState('');
  const [error, setError] = useState('');
  const currentPlan = isPro ? 'pro' : isLite ? 'lite' : 'free';

  const handleUpgrade = async (planId) => {
    if (planId === 'free' || planId === currentPlan) return;
    setLoading(planId); setError('');
    try {
      const res = await fetch('/api/create-checkout', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body:JSON.stringify({ userId:user?.id, email:user?.email, plan:planId, successUrl:window.location.origin+'?upgraded=true', cancelUrl:window.location.origin }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else setError(data.error || 'Something went wrong');
    } catch(err) { setError(err.message); }
    setLoading('');
  };

  return (
    <div style={{flex:1,overflowY:'auto',background:'#060E1A',fontFamily:'system-ui',padding:'40px 28px'}}>
      <div style={{textAlign:'center',marginBottom:48}}>
        <div style={{display:'inline-flex',alignItems:'center',gap:8,background:'rgba(245,158,11,0.1)',border:'1px solid rgba(245,158,11,0.2)',borderRadius:20,padding:'6px 16px',marginBottom:16}}>
          <span style={{fontSize:14}}>⚡</span>
          <span style={{fontSize:12,fontWeight:600,color:'#F59E0B'}}>CHOOSE YOUR PLAN</span>
        </div>
        <h1 style={{margin:0,fontSize:34,fontWeight:800,color:'#F1F5F9',marginBottom:12}}>
          Simple, transparent{' '}
          <span style={{background:'linear-gradient(135deg,#38BDF8,#1D4ED8)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>pricing</span>
        </h1>
        <p style={{fontSize:15,color:'#64748B',margin:0}}>All prices in AED · Cancel anytime · No hidden fees</p>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20,maxWidth:920,margin:'0 auto 40px'}}>
        {PLANS.map(plan => {
          const isCurrent = plan.id === currentPlan;
          const isDowngrade = (plan.id==='free') || (plan.id==='lite' && currentPlan==='pro');
          return (
            <div key={plan.id} style={{
              background: plan.popular ? 'linear-gradient(135deg,#0D1929,#0D2040)' : '#0D1929',
              border: `2px solid ${isCurrent ? plan.color : plan.border}`,
              borderRadius: 20, padding: 28, position:'relative',
              transform: plan.popular ? 'scale(1.03)' : 'none',
              boxShadow: plan.popular ? `0 8px 40px ${plan.accent}` : 'none',
            }}>
              {plan.popular && (
                <div style={{position:'absolute',top:-12,left:'50%',transform:'translateX(-50%)',background:'linear-gradient(135deg,#B45309,#F59E0B)',color:'#fff',fontSize:10,fontWeight:700,padding:'4px 16px',borderRadius:20,whiteSpace:'nowrap'}}>
                  MOST POPULAR
                </div>
              )}
              {isCurrent && (
                <div style={{position:'absolute',top:16,right:16,background:plan.accent,color:plan.color,fontSize:10,fontWeight:700,padding:'3px 10px',borderRadius:20,border:`1px solid ${plan.border}`}}>
                  CURRENT
                </div>
              )}

              {/* Plan name */}
              <div style={{fontSize:13,fontWeight:700,color:plan.color,textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:10}}>{plan.name}</div>

              {/* Price */}
              <div style={{display:'flex',alignItems:'baseline',gap:4,marginBottom:8}}>
                {plan.price===0
                  ? <span style={{fontSize:36,fontWeight:800,color:'#F1F5F9'}}>Free</span>
                  : <><span style={{fontSize:36,fontWeight:800,color:'#F1F5F9'}}>{plan.currency} {plan.price}</span><span style={{fontSize:13,color:'#64748B'}}>/mo</span></>
                }
              </div>

              {/* Tag */}
              <div style={{fontSize:11,color:plan.color,fontWeight:600,background:plan.accent,border:`1px solid ${plan.border}`,borderRadius:20,padding:'3px 12px',display:'inline-block',marginBottom:20}}>
                {plan.tag}
              </div>

              {/* CTA Button */}
              <button onClick={()=>handleUpgrade(plan.id)}
                disabled={isCurrent || loading===plan.id || plan.price===0 || isDowngrade}
                style={{
                  width:'100%', padding:'12px', borderRadius:10, border:'none',
                  cursor: isCurrent||plan.price===0||isDowngrade ? 'default' : 'pointer',
                  marginBottom:24, fontSize:13, fontWeight:600, fontFamily:'system-ui',
                  background: isCurrent ? plan.accent : plan.price===0||isDowngrade ? 'rgba(100,116,139,0.1)' : BTN_BG[plan.id],
                  color: isCurrent ? plan.color : plan.price===0||isDowngrade ? '#64748B' : '#fff',
                  opacity: loading===plan.id ? 0.7 : 1,
                }}>
                {loading===plan.id ? 'Redirecting...'
                  : isCurrent ? '✓ Current Plan'
                  : plan.price===0 ? 'Free Forever'
                  : isDowngrade ? 'Downgrade'
                  : `Upgrade to ${plan.name} →`}
              </button>

              {/* Features */}
              <div style={{display:'flex',flexDirection:'column',gap:9}}>
                {plan.features.map((f,i)=>(
                  <div key={i} style={{display:'flex',alignItems:'flex-start',gap:8}}>
                    <span style={{fontSize:13,color:plan.color,flexShrink:0,marginTop:1}}>✓</span>
                    <span style={{fontSize:12,color:'#94A3B8',lineHeight:1.4}}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {error && <div style={{textAlign:'center',fontSize:13,color:'#F87171',marginBottom:20}}>{error}</div>}

      <div style={{maxWidth:920,margin:'0 auto',background:'rgba(59,130,246,0.05)',border:'1px solid rgba(59,130,246,0.1)',borderRadius:14,padding:20,textAlign:'center'}}>
        <div style={{fontSize:13,color:'#64748B'}}>
          Secure payment via Stripe · Access on any device · Cancel anytime · Data from Dubai Land Department
        </div>
      </div>
    </div>
  );
}
