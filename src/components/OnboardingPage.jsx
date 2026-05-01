import { useState } from 'react';
import { t } from '../i18n';
import { supabase } from '../context/AuthContext';

const INVESTOR_TYPES = [
  { id:'investor', label:'Investor', icon:'📈', desc:'Looking for ROI and capital growth' },
  { id:'enduser', label:'End User', icon:'🏠', desc:'Buying to live in Dubai' },
  { id:'agent', label:'Agent / Broker', icon:'🤝', desc:'Working with buyers and sellers' },
  { id:'developer', label:'Developer', icon:'🏗️', desc:'Building or selling projects' },
];
const BUDGETS = [
  { id:'under1m', label:'Under AED 1M' },
  { id:'1m_3m', label:'AED 1M – 3M' },
  { id:'3m_7m', label:'AED 3M – 7M' },
  { id:'7m_15m', label:'AED 7M – 15M' },
  { id:'over15m', label:'AED 15M+' },
];
const AREAS = ['Dubai Marina','Downtown Dubai','Dubai Hills Estate','Palm Jumeirah','JVC','Business Bay','MBR City','Creek Harbour','JLT','Damac Hills'];

export default function OnboardingPage({ user, onComplete }) {
  const lang = localStorage.getItem('lang') || 'en';
  const [step, setStep] = useState(1);
  const [investorType, setInvestorType] = useState('');
  const [budget, setBudget] = useState('');
  const [preferredAreas, setPreferredAreas] = useState([]);
  const [saving, setSaving] = useState(false);

  const toggleArea = a => setPreferredAreas(p => p.includes(a) ? p.filter(x=>x!==a) : [...p,a]);

  const finish = async () => {
    setSaving(true);
    await supabase.from('profiles').update({ onboarded:true, role:investorType, preferred_budget:budget, preferred_areas:preferredAreas }).eq('id', user.id);
    setSaving(false);
    onComplete();
  };

  return (
    <div style={{minHeight:'100vh',background:'var(--bg)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'system-ui',padding:24}}>
      <div style={{width:'100%',maxWidth:560}}>
        <div style={{textAlign:'center',marginBottom:32}}>
          <div style={{fontSize:28,fontWeight:800,color:'var(--text-primary)',marginBottom:4}}>Prop<span style={{color:'#38BDF8'}}>Sight</span></div>
          <div style={{fontSize:13,color:'var(--text-secondary)',marginBottom:20}}>Step {step} of 3</div>
          <div style={{background:'rgba(59,130,246,0.1)',borderRadius:20,height:4,overflow:'hidden'}}>
            <div style={{height:'100%',background:'linear-gradient(90deg,#1D4ED8,#38BDF8)',borderRadius:20,width:`${(step/3)*100}%`,transition:'width 0.4s ease'}}/>
          </div>
        </div>

        <div style={{background:'var(--surface)',border:'1px solid rgba(59,130,246,0.15)',borderRadius:20,padding:32}}>

          {step===1 && <>
            <div style={{textAlign:'center',marginBottom:28}}>
              <div style={{fontSize:22,fontWeight:700,color:'var(--text-primary)',marginBottom:8}}>{t('What describes you',lang)}</div>
              <div style={{fontSize:14,color:'var(--text-muted)'}}>{t('Personalize for needs',lang)}</div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:28}}>
              {INVESTOR_TYPES.map(t=>(
                <button key={t.id} onClick={()=>setInvestorType(t.id)} style={{padding:'18px 16px',borderRadius:14,cursor:'pointer',textAlign:'left',background:investorType===t.id?'rgba(59,130,246,0.15)':'rgba(59,130,246,0.04)',border:investorType===t.id?'2px solid #38BDF8':'2px solid rgba(59,130,246,0.1)',transition:'all 0.15s',fontFamily:'system-ui'}}>
                  <div style={{fontSize:28,marginBottom:8}}>{t.icon}</div>
                  <div style={{fontSize:14,fontWeight:700,color:'var(--text-primary)',marginBottom:4}}>{t.label}</div>
                  <div style={{fontSize:11,color:'var(--text-muted)',lineHeight:1.4}}>{t.desc}</div>
                </button>
              ))}
            </div>
            <button onClick={()=>setStep(2)} disabled={!investorType} style={{width:'100%',padding:'13px',borderRadius:12,border:'none',cursor:'pointer',background:'linear-gradient(135deg,#1D4ED8,#38BDF8)',color:'#fff',fontSize:14,fontWeight:700,fontFamily:'system-ui',opacity:!investorType?0.4:1}}>{t('Continue',lang)}</button>
          </>}

          {step===2 && <>
            <div style={{textAlign:'center',marginBottom:28}}>
              <div style={{fontSize:22,fontWeight:700,color:'var(--text-primary)',marginBottom:8}}>{t('Budget range',lang)}</div>
              <div style={{fontSize:14,color:'var(--text-muted)'}}>{t('Most relevant transactions',lang)}</div>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:10,marginBottom:28}}>
              {BUDGETS.map(b=>(
                <button key={b.id} onClick={()=>setBudget(b.id)} style={{padding:'14px 18px',borderRadius:12,cursor:'pointer',textAlign:'left',display:'flex',alignItems:'center',justifyContent:'space-between',background:budget===b.id?'rgba(59,130,246,0.15)':'rgba(59,130,246,0.04)',border:budget===b.id?'2px solid #38BDF8':'2px solid rgba(59,130,246,0.1)',transition:'all 0.15s',fontFamily:'system-ui'}}>
                  <span style={{fontSize:14,fontWeight:600,color:'var(--text-primary)'}}>{b.label}</span>
                  {budget===b.id && <span style={{color:'#38BDF8',fontSize:18}}>✓</span>}
                </button>
              ))}
            </div>
            <div style={{display:'flex',gap:10}}>
              <button onClick={()=>setStep(1)} style={{flex:1,padding:'13px',borderRadius:12,border:'1px solid rgba(59,130,246,0.15)',background:'transparent',color:'var(--text-muted)',fontSize:13,fontWeight:600,cursor:'pointer',fontFamily:'system-ui'}}>{t('Back',lang)}</button>
              <button onClick={()=>setStep(3)} disabled={!budget} style={{flex:2,padding:'13px',borderRadius:12,border:'none',cursor:'pointer',background:'linear-gradient(135deg,#1D4ED8,#38BDF8)',color:'#fff',fontSize:14,fontWeight:700,fontFamily:'system-ui',opacity:!budget?0.4:1}}>Continue →</button>
            </div>
          </>}

          {step===3 && <>
            <div style={{textAlign:'center',marginBottom:28}}>
              <div style={{fontSize:22,fontWeight:700,color:'var(--text-primary)',marginBottom:8}}>{t('Preferred areas',lang)}</div>
              <div style={{fontSize:14,color:'var(--text-muted)'}}>{t('Select interests',lang)}</div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:28}}>
              {AREAS.map(area=>(
                <button key={area} onClick={()=>toggleArea(area)} style={{padding:'11px 14px',borderRadius:10,cursor:'pointer',textAlign:'left',display:'flex',alignItems:'center',justifyContent:'space-between',background:preferredAreas.includes(area)?'rgba(59,130,246,0.15)':'rgba(59,130,246,0.04)',border:preferredAreas.includes(area)?'2px solid #38BDF8':'2px solid rgba(59,130,246,0.1)',fontFamily:'system-ui',transition:'all 0.15s'}}>
                  <span style={{fontSize:13,fontWeight:500,color:'var(--text-primary)'}}>{area}</span>
                  {preferredAreas.includes(area) && <span style={{color:'#38BDF8'}}>✓</span>}
                </button>
              ))}
            </div>
            <div style={{display:'flex',gap:10}}>
              <button onClick={()=>setStep(2)} style={{flex:1,padding:'13px',borderRadius:12,border:'1px solid rgba(59,130,246,0.15)',background:'transparent',color:'var(--text-muted)',fontSize:13,fontWeight:600,cursor:'pointer',fontFamily:'system-ui'}}>← Back</button>
              <button onClick={finish} disabled={saving} style={{flex:2,padding:'13px',borderRadius:12,border:'none',cursor:'pointer',background:'linear-gradient(135deg,#16A34A,#22C55E)',color:'#fff',fontSize:14,fontWeight:700,fontFamily:'system-ui'}}>{saving?t('Setting up',lang):t('Launch PropSight',lang)}</button>
            </div>
            <button onClick={finish} style={{width:'100%',marginTop:10,background:'none',border:'none',cursor:'pointer',color:'var(--text-secondary)',fontSize:12,fontFamily:'system-ui'}}>{t('Skip',lang)}</button>
          </>}
        </div>
      </div>
    </div>
  );
}
