import { useState } from 'react'; // v2
import { t } from '../i18n';
import { supabase } from '../context/AuthContext';

const INVESTOR_TYPES = [
  { id:'investor', label:'Investor', icon:'📈', desc:'Looking for ROI and capital growth' },
  { id:'enduser',  label:'End User', icon:'🏠', desc:'Buying to live in Dubai' },
  { id:'agent',    label:'Agent / Broker', icon:'🤝', desc:'Working with buyers and sellers' },
  { id:'developer',label:'Developer', icon:'🏗️', desc:'Building or selling projects' },
];
const BUDGETS = [
  { id:'under1m',  label:'Under AED 1M' },
  { id:'1m_3m',    label:'AED 1M – 3M' },
  { id:'3m_7m',    label:'AED 3M – 7M' },
  { id:'7m_15m',   label:'AED 7M – 15M' },
  { id:'over15m',  label:'AED 15M+' },
];
const AREAS = ['Dubai Marina','Downtown Dubai','Dubai Hills Estate','Palm Jumeirah','JVC','Business Bay','MBR City','Creek Harbour','JLT','Damac Hills'];

export default function OnboardingPage({ user, onComplete }) {
  const lang = localStorage.getItem('lang') || 'en';
  const [step, setStep] = useState(1);
  const [investorType, setInvestorType] = useState('');
  const [budget, setBudget] = useState('');
  const [preferredAreas, setPreferredAreas] = useState([]);
  const [consentGiven, setConsentGiven] = useState(false);
  const [contactOptOut, setContactOptOut] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [saving, setSaving] = useState(false);

  const toggleArea = a => setPreferredAreas(p => p.includes(a) ? p.filter(x=>x!==a) : [...p,a]);

  const finish = async () => {
    setSaving(true);
    await supabase.from('profiles').update({
      onboarded: true,
      role: investorType,
      preferred_budget: budget,
      preferred_areas: preferredAreas,
      consent_given: consentGiven,
      consent_date: new Date().toISOString(),
      contact_opted_out: contactOptOut,
    }).eq('id', user.id);
    setSaving(false);
    onComplete();
  };

  const TOTAL_STEPS = 4;

  return (
    <div style={{minHeight:'100vh',background:'var(--bg)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'system-ui',padding:24}}>
      <div style={{width:'100%',maxWidth:560}}>
        <div style={{textAlign:'center',marginBottom:32}}>
          <div style={{fontSize:28,fontWeight:800,color:'var(--text-primary)',marginBottom:4}}>Prop<span style={{color:'#38BDF8'}}>Sight</span></div>
          <div style={{fontSize:13,color:'var(--text-secondary)',marginBottom:20}}>Step {step} of {TOTAL_STEPS}</div>
          <div style={{background:'rgba(59,130,246,0.1)',borderRadius:20,height:4,overflow:'hidden'}}>
            <div style={{height:'100%',background:'linear-gradient(90deg,#1D4ED8,#38BDF8)',borderRadius:20,width:`${(step/TOTAL_STEPS)*100}%`,transition:'width 0.4s ease'}}/>
          </div>
        </div>

        <div style={{background:'var(--surface)',border:'1px solid rgba(59,130,246,0.15)',borderRadius:20,padding:32}}>

          {step===1 && <>
            <div style={{textAlign:'center',marginBottom:28}}>
              <div style={{fontSize:22,fontWeight:700,color:'var(--text-primary)',marginBottom:8}}>{t('What describes you',lang)}</div>
              <div style={{fontSize:14,color:'var(--text-muted)'}}>{t('Personalize for needs',lang)}</div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:28}}>
              {INVESTOR_TYPES.map(tp=>(
                <button key={tp.id} onClick={()=>setInvestorType(tp.id)} style={{padding:'18px 16px',borderRadius:14,cursor:'pointer',textAlign:'left',background:investorType===tp.id?'rgba(59,130,246,0.15)':'rgba(59,130,246,0.04)',border:investorType===tp.id?'2px solid #38BDF8':'2px solid rgba(59,130,246,0.1)',transition:'all 0.15s',fontFamily:'system-ui'}}>
                  <div style={{fontSize:28,marginBottom:8}}>{tp.icon}</div>
                  <div style={{fontSize:14,fontWeight:700,color:'var(--text-primary)',marginBottom:4}}>{tp.label}</div>
                  <div style={{fontSize:11,color:'var(--text-muted)',lineHeight:1.4}}>{tp.desc}</div>
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
              <button onClick={()=>setStep(4)} style={{flex:2,padding:'13px',borderRadius:12,border:'none',cursor:'pointer',background:'linear-gradient(135deg,#1D4ED8,#38BDF8)',color:'#fff',fontSize:14,fontWeight:700,fontFamily:'system-ui'}}>Continue →</button>
            </div>
            <button onClick={()=>setStep(4)} style={{width:'100%',marginTop:10,background:'none',border:'none',cursor:'pointer',color:'var(--text-secondary)',fontSize:12,fontFamily:'system-ui'}}>{t('Skip',lang)}</button>
          </>}

          {step===4 && <>
            <div style={{textAlign:'center',marginBottom:24}}>
              <div style={{fontSize:22,fontWeight:700,color:'var(--text-primary)',marginBottom:8}}>Data & Privacy Consent</div>
              <div style={{fontSize:14,color:'var(--text-muted)'}}>Please review and confirm your preferences</div>
            </div>

            {/* Consent summary box */}
            <div style={{background:'rgba(59,130,246,0.04)',border:'1px solid rgba(59,130,246,0.15)',borderRadius:14,padding:20,marginBottom:20,maxHeight:220,overflowY:'auto'}}>
              <div style={{fontSize:13,fontWeight:700,color:'var(--text-primary)',marginBottom:12}}>Consent Terms for Data Usage and Communication</div>
              {[
                ['1. Data Collection & Purpose', 'PropSight collects personal data including your name, contact information, professional details, and platform activity to provide a personalised and effective user experience. Data is used to improve our services, analyse market trends, develop new features, and ensure our platform meets your expectations.'],
                ['2. Marketing & Communication', 'We may use your data to inform you about updates, market insights, special offers, and other PropSight-related information. By agreeing, you consent to receiving communications via email, SMS, phone, or other channels. You may modify preferences or opt out at any time.'],
                ['3. Data Sharing with Partners', 'Your data may be shared with selected real estate agents and agencies affiliated with PropSight to offer relevant properties or investment opportunities. Partners are committed to data protection compliance. PropSight will not sell your data to unrelated third parties without your explicit consent.'],
                ['4. Right to Withdraw Consent', 'You may withdraw consent at any time by contacting us at support@propsightae.com. We will cease processing your data unless required by law or legitimate business grounds exist.'],
                ['5. Data Security & Retention', 'We implement reasonable security measures to protect your data. Data is retained as long as necessary for the stated purposes or as required by applicable law.'],
              ].map(([title, body]) => (
                <div key={title} style={{marginBottom:14}}>
                  <div style={{fontSize:12,fontWeight:700,color:'var(--text-primary)',marginBottom:4}}>{title}</div>
                  <div style={{fontSize:11,color:'var(--text-secondary)',lineHeight:1.7}}>{body}</div>
                </div>
              ))}
              <div style={{fontSize:11,color:'var(--text-muted)',marginTop:8}}>
                For further information contact our Data Protection Officer at{' '}
                <span style={{color:'#38BDF8'}}>support@propsightae.com</span>
              </div>
            </div>

            {/* Consent checkbox */}
            <div onClick={()=>setConsentGiven(v=>!v)} style={{display:'flex',alignItems:'flex-start',gap:12,padding:'14px 16px',borderRadius:12,border:consentGiven?'2px solid #38BDF8':'2px solid rgba(59,130,246,0.15)',background:consentGiven?'rgba(59,130,246,0.08)':'transparent',cursor:'pointer',marginBottom:12,transition:'all 0.15s'}}>
              <div style={{width:20,height:20,borderRadius:5,border:'2px solid',borderColor:consentGiven?'#38BDF8':'rgba(255,255,255,0.2)',background:consentGiven?'#38BDF8':'transparent',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:1}}>
                {consentGiven && <span style={{color:'#fff',fontSize:12,fontWeight:700}}>✓</span>}
              </div>
              <div style={{fontSize:13,color:'var(--text-primary)',lineHeight:1.6}}>
                I have read and agree to the{' '}
                <span onClick={e=>{e.stopPropagation();setShowPrivacy(true);}} style={{color:'#38BDF8',textDecoration:'underline',cursor:'pointer'}}>
                  Privacy Policy
                </span>
                {' '}and consent to PropSight collecting and processing my personal data as described above.
              </div>
            </div>

            {/* Contact opt-out */}
            <div onClick={()=>setContactOptOut(v=>!v)} style={{display:'flex',alignItems:'center',gap:12,padding:'12px 16px',borderRadius:12,border:'1px solid rgba(59,130,246,0.1)',background:'transparent',cursor:'pointer',marginBottom:24,transition:'all 0.15s'}}>
              <div style={{width:20,height:20,borderRadius:5,border:'2px solid',borderColor:contactOptOut?'#F59E0B':'rgba(255,255,255,0.2)',background:contactOptOut?'#F59E0B':'transparent',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                {contactOptOut && <span style={{color:'#fff',fontSize:12,fontWeight:700}}>✓</span>}
              </div>
              <div style={{fontSize:13,color:'var(--text-secondary)'}}>
                I wish <strong>not</strong> to be contacted by PropSight or its partners
              </div>
            </div>

            <div style={{display:'flex',gap:10}}>
              <button onClick={()=>setStep(3)} style={{flex:1,padding:'13px',borderRadius:12,border:'1px solid rgba(59,130,246,0.15)',background:'transparent',color:'var(--text-muted)',fontSize:13,fontWeight:600,cursor:'pointer',fontFamily:'system-ui'}}>← Back</button>
              <button onClick={finish} disabled={!consentGiven||saving} style={{flex:2,padding:'13px',borderRadius:12,border:'none',cursor:!consentGiven?'default':'pointer',background:consentGiven?'linear-gradient(135deg,#16A34A,#22C55E)':'rgba(100,116,139,0.2)',color:consentGiven?'#fff':'var(--text-muted)',fontSize:14,fontWeight:700,fontFamily:'system-ui',opacity:saving?0.7:1}}>
                {saving ? 'Setting up...' : 'Launch PropSight →'}
              </button>
            </div>
          </>}
        </div>

        {/* Privacy Policy Modal */}
        {showPrivacy && (
          <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.8)',zIndex:9999,display:'flex',alignItems:'center',justifyContent:'center',padding:24}}>
            <div style={{background:'var(--surface)',borderRadius:20,maxWidth:640,width:'100%',maxHeight:'85vh',overflow:'hidden',display:'flex',flexDirection:'column'}}>
              <div style={{padding:'20px 24px',borderBottom:'1px solid rgba(255,255,255,0.06)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{fontSize:18,fontWeight:700,color:'var(--text-primary)'}}>Privacy Policy</div>
                <button onClick={()=>setShowPrivacy(false)} style={{background:'none',border:'none',cursor:'pointer',color:'var(--text-muted)',fontSize:22,padding:'0 4px'}}>×</button>
              </div>
              <div style={{overflowY:'auto',padding:'24px',flex:1}}>
                <PrivacyPolicyContent/>
              </div>
              <div style={{padding:'16px 24px',borderTop:'1px solid rgba(255,255,255,0.06)'}}>
                <button onClick={()=>setShowPrivacy(false)} style={{width:'100%',padding:'12px',borderRadius:12,border:'none',background:'linear-gradient(135deg,#1D4ED8,#38BDF8)',color:'#fff',fontSize:14,fontWeight:600,cursor:'pointer',fontFamily:'system-ui'}}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PrivacyPolicyContent() {
  const sections = [
    {
      title: '1. Introduction',
      body: 'PropSight ("we", "our", "us") is committed to protecting your personal data. This Privacy Policy explains how we collect, use, store, and share your information when you use our platform at propsightae.vercel.app. By using PropSight, you agree to the terms of this policy.',
    },
    {
      title: '2. Data We Collect',
      items: [
        'Identity data: name, email address, phone number',
        'Professional data: RERA number, agency name, broker title, years of experience',
        'Preference data: preferred areas, budget range, investor type',
        'Usage data: pages visited, features used, search queries, time spent',
        'Device data: IP address, browser type, operating system',
        'Transaction data: watchlist activity, portfolio entries, alert preferences',
      ],
    },
    {
      title: '3. How We Use Your Data',
      items: [
        'To provide and personalise our real estate intelligence platform',
        'To process your account registration and maintain your profile',
        'To send market updates, new feature announcements, and relevant property insights',
        'To analyse usage patterns and improve platform performance',
        'To comply with legal and regulatory obligations under UAE law',
        'To prevent fraud, abuse, and unauthorised access',
      ],
    },
    {
      title: '4. Legal Basis for Processing',
      body: 'We process your personal data on the following legal bases: (a) your consent, which you may withdraw at any time; (b) the performance of a contract between you and PropSight; (c) our legitimate interests in operating and improving our business; and (d) compliance with legal obligations applicable in the UAE and other relevant jurisdictions.',
    },
    {
      title: '5. Data Sharing & Third Parties',
      items: [
        'Real estate partners: licensed agents and agencies affiliated with PropSight may receive relevant profile data to offer you properties or investment opportunities matching your preferences',
        'Service providers: Supabase (database hosting), Vercel (platform hosting), Stripe (payment processing) — all under data processing agreements',
        'Analytics providers: anonymised, aggregated usage data may be shared for research and market analysis',
        'Legal requirements: we may disclose data where required by UAE law, court order, or regulatory authority',
        'We will never sell your personal data to unrelated third parties for their own marketing purposes without your explicit consent',
      ],
    },
    {
      title: '6. Data Retention',
      body: 'We retain your personal data for as long as your account is active or as needed to provide services. If you close your account, we will delete or anonymise your data within 90 days, except where retention is required by law (e.g. financial records, which may be retained for 7 years under UAE Commercial Transactions Law).',
    },
    {
      title: '7. Your Rights',
      items: [
        'Right of access: request a copy of the personal data we hold about you',
        'Right to rectification: request correction of inaccurate or incomplete data',
        'Right to erasure: request deletion of your data ("right to be forgotten")',
        'Right to restrict processing: request that we limit how we use your data',
        'Right to data portability: receive your data in a structured, machine-readable format',
        'Right to withdraw consent: withdraw marketing consent at any time without affecting prior processing',
        'Right to object: object to processing based on legitimate interests',
        'To exercise any of these rights, contact us at support@propsightae.com',
      ],
    },
    {
      title: '8. Data Security',
      body: 'We implement industry-standard security measures including encrypted data transmission (TLS/HTTPS), encrypted data storage via Supabase, access controls and authentication, and regular security reviews. While we take reasonable precautions, no internet transmission is 100% secure. We encourage you to use a strong password and keep your account credentials confidential.',
    },
    {
      title: '9. Cookies & Tracking',
      body: 'PropSight uses essential cookies and local storage to maintain your session, remember your language preference, and store your theme setting. We do not use advertising or tracking cookies. You may clear browser storage at any time, though this will log you out and reset your preferences.',
    },
    {
      title: '10. International Data Transfers',
      body: 'Your data may be processed on servers located outside the UAE (including the United States, where Supabase and Vercel operate). We ensure appropriate safeguards are in place through data processing agreements with our service providers that include standard contractual clauses.',
    },
    {
      title: '11. Children\'s Privacy',
      body: 'PropSight is not intended for users under the age of 18. We do not knowingly collect personal data from minors. If you believe a minor has provided us with personal data, please contact us and we will delete it promptly.',
    },
    {
      title: '12. Changes to This Policy',
      body: 'We may update this Privacy Policy from time to time. We will notify you of material changes via email or a prominent notice on the platform at least 14 days before the changes take effect. Continued use of PropSight after changes constitutes acceptance of the updated policy.',
    },
    {
      title: '13. Contact & Data Protection Officer',
      body: 'For any privacy-related queries, to exercise your rights, or to report a data concern, please contact our Data Protection Officer at: support@propsightae.com. We will respond within 30 days. PropSight is operated by PropSight Real Estate Intelligence, Dubai, United Arab Emirates.',
    },
  ];

  return (
    <div style={{fontFamily:'system-ui'}}>
      <div style={{fontSize:12,color:'var(--text-muted)',marginBottom:20}}>
        Last updated: {new Date().toLocaleDateString('en-AE', {day:'numeric', month:'long', year:'numeric'})} · Effective immediately
      </div>
      {sections.map((s, i) => (
        <div key={i} style={{marginBottom:24}}>
          <div style={{fontSize:14,fontWeight:700,color:'var(--text-primary)',marginBottom:8,paddingBottom:6,borderBottom:'1px solid rgba(255,255,255,0.06)'}}>{s.title}</div>
          {s.body && <div style={{fontSize:12,color:'var(--text-secondary)',lineHeight:1.8}}>{s.body}</div>}
          {s.items && (
            <ul style={{margin:0,paddingLeft:18}}>
              {s.items.map((item, j) => (
                <li key={j} style={{fontSize:12,color:'var(--text-secondary)',lineHeight:1.8,marginBottom:4}}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
      <div style={{background:'rgba(59,130,246,0.06)',border:'1px solid rgba(59,130,246,0.15)',borderRadius:10,padding:'12px 16px',fontSize:11,color:'var(--text-muted)',lineHeight:1.7}}>
        This policy is governed by the laws of the Emirate of Dubai and the federal laws of the United Arab Emirates. Any disputes shall be subject to the exclusive jurisdiction of the courts of Dubai, UAE.
      </div>
    </div>
  );
}
