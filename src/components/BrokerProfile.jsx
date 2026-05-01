import BrokerReport from './BrokerReport';
import BrokerProfileEditor from './BrokerProfileEditor';
import { useState, useMemo, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { fmtAED, fmtNum } from '../utils/format';
import { calcPropSightScore } from '../utils/propSightScore';
import Watchlist from './Watchlist';
import PriceAlerts from './PriceAlerts';
import UpgradePage from './UpgradePage';

const AREA_NICE = {
  'Al Barsha South Fourth':'JVC','Burj Khalifa':'Downtown Dubai','Marsa Dubai':'Dubai Marina',
  'Hadaeq Sheikh Mohammed Bin Rashid':'Dubai Hills','Al Thanyah Fifth':'JLT',
  'Business Bay':'Business Bay','Palm Jumeirah':'Palm Jumeirah','Al Merkadh':'MBR City',
  'Al Khairan First':'Creek Harbour','Al Hebiah Fourth':'Damac Hills',
};
const na = a => AREA_NICE[a] || a;

// ── Broker Portfolio ───────────────────────────────────────────────────────
function BrokerPortfolio({ areaData, core, recentRaw }) {
  const [section, setSection] = useState('market');

  const sections = [
    ['market',     'Market Data'],
    ['portfolio',  'Portfolio & Accounts'],
    ['execution',  'Execution Info'],
    ['education',  'Resources'],
    ['compliance', 'Compliance'],
  ];

  // Market data computed from our DLD data
  const marketData = useMemo(() => {
    if (!areaData || !core) return null;
    const pt = core.priceTrend || [];
    const latest = pt[pt.length-1]?.ppsqm || 0;
    const prev = pt[pt.length-2]?.ppsqm || 0;
    const yoy = prev ? ((latest-prev)/prev*100).toFixed(1) : 0;
    const totalTxns = core.slices?.all?.count || 0;
    const offPlan = core.slices?.['r:Off-Plan']?.count || 0;
    const opPct = totalTxns ? Math.round(offPlan/totalTxns*100) : 0;

    const topAreas = Object.entries(areaData)
      .map(([k,d]) => ({ name:na(k), key:k, ppsqft:Math.round((d.kpis?.ppsqm||0)/10.764), count:d.kpis?.count||0, avg:d.kpis?.avg||0 }))
      .sort((a,b)=>b.count-a.count).slice(0,8);

    return { latest, prev, yoy, totalTxns, offPlan, opPct, topAreas,
      latestPpsqft: Math.round(latest/10.764) };
  }, [areaData, core]);

  const monthlyTrend = useMemo(() => {
    return (core?.slices?.all?.monthly || []).slice(-12).map(m => ({
      month: m.month?.slice(0,7) || '',
      count: m.count || 0,
      value: m.total || 0,
    }));
  }, [core]);

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      {/* Section tabs */}
      <div style={{ padding:'12px 28px 0', borderBottom:'1px solid rgba(59,130,246,0.08)' }}>
        <div style={{ display:'flex', gap:4, overflowX:'auto', paddingBottom:0 }}>
          {sections.map(([id,lbl]) => (
            <button key={id} onClick={() => setSection(id)} style={{
              padding:'8px 16px', borderRadius:'8px 8px 0 0', border:'none',
              cursor:'pointer', fontSize:13, fontFamily:'system-ui', whiteSpace:'nowrap',
              fontWeight: section===id ? 600 : 400,
              background: section===id ? 'var(--surface)' : 'transparent',
              color: section===id ? 'var(--text-primary)' : 'var(--text-muted)',
              borderBottom: section===id ? '2px solid #38BDF8' : '2px solid transparent',
            }}>{lbl}</button>
          ))}
        </div>
      </div>

      <div style={{ flex:1, overflowY:'auto', padding:'24px 28px' }}>

        {/* MARKET DATA */}
        {section==='market' && marketData && (
          <div>
            <div style={{ marginBottom:20 }}>
              <h2 style={{ margin:0, fontSize:18, fontWeight:700, color:'var(--text-primary)', marginBottom:4 }}>Market Data & Analysis</h2>
              <div style={{ fontSize:13, color:'var(--text-secondary)' }}>Live DLD data · Dubai residential market overview</div>
            </div>

            {/* KPI row */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:24 }}>
              {[
                ['Avg Price/sqft', `AED ${fmtNum(marketData.latestPpsqft)}`, '#38BDF8'],
                ['YoY Growth', `${marketData.yoy>0?'+':''}${marketData.yoy}%`, marketData.yoy>=0?'#22C55E':'#F87171'],
                ['Total Transactions', fmtNum(marketData.totalTxns), 'var(--text-primary)'],
                ['Off-Plan Share', `${marketData.opPct}%`, '#F59E0B'],
              ].map(([l,v,c])=>(
                <div key={l} style={{ background:'var(--surface)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:12, padding:'16px 18px' }}>
                  <div style={{ fontSize:10, color:'var(--text-muted)', marginBottom:6, textTransform:'uppercase', letterSpacing:'0.06em' }}>{l}</div>
                  <div style={{ fontSize:20, fontWeight:700, color:c }}>{v}</div>
                </div>
              ))}
            </div>

            {/* Top areas table */}
            <div style={{ background:'var(--surface)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:14, overflow:'hidden', marginBottom:24 }}>
              <div style={{ padding:'14px 20px', borderBottom:'1px solid rgba(255,255,255,0.06)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div style={{ fontSize:14, fontWeight:600, color:'var(--text-primary)' }}>Top Performing Areas</div>
                <div style={{ fontSize:11, color:'var(--text-muted)' }}>by transaction volume</div>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', padding:'10px 20px', background:'rgba(59,130,246,0.02)', borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
                {['Area','Price/sqft','Avg Deal','Transactions'].map((h,i)=>(
                  <div key={i} style={{ fontSize:10, color:'var(--text-secondary)', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.05em' }}>{h}</div>
                ))}
              </div>
              {marketData.topAreas.map((a,i)=>(
                <div key={a.key} style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', padding:'12px 20px', borderBottom:i<marketData.topAreas.length-1?'1px solid rgba(255,255,255,0.03)':'none' }}>
                  <div style={{ fontSize:13, fontWeight:600, color:'var(--text-primary)' }}>{a.name}</div>
                  <div style={{ fontSize:13, color:'#38BDF8' }}>AED {fmtNum(a.ppsqft)}</div>
                  <div style={{ fontSize:13, color:'var(--text-secondary)' }}>{fmtAED(a.avg, true)}</div>
                  <div style={{ fontSize:13, color:'var(--text-muted)' }}>{fmtNum(a.count)}</div>
                </div>
              ))}
            </div>

            {/* Monthly volume */}
            <div style={{ background:'var(--surface)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:14, padding:20 }}>
              <div style={{ fontSize:14, fontWeight:600, color:'var(--text-primary)', marginBottom:16 }}>Monthly Transaction Volume (12 months)</div>
              <div style={{ display:'flex', alignItems:'flex-end', gap:4, height:100 }}>
                {monthlyTrend.map((m,i)=>{
                  const max = Math.max(...monthlyTrend.map(x=>x.count));
                  const h = max > 0 ? Math.round((m.count/max)*100) : 0;
                  return (
                    <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
                      <div style={{ width:'100%', height:`${h}%`, background:'linear-gradient(180deg,#38BDF8,#1D4ED8)', borderRadius:'3px 3px 0 0', minHeight:2 }} title={`${m.month}: ${fmtNum(m.count)}`}/>
                      <div style={{ fontSize:8, color:'var(--text-muted)', transform:'rotate(-45deg)', whiteSpace:'nowrap' }}>{m.month?.slice(5)}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* PORTFOLIO & ACCOUNTS */}
        {section==='portfolio' && (
          <div>
            <div style={{ marginBottom:20 }}>
              <h2 style={{ margin:0, fontSize:18, fontWeight:700, color:'var(--text-primary)', marginBottom:4 }}>Portfolio & Account Management</h2>
              <div style={{ fontSize:13, color:'var(--text-secondary)' }}>Track your property portfolio performance and transaction history</div>
            </div>

            {/* Portfolio summary */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:24 }}>
              {[
                { title:'Portfolio Valuation', desc:'Real-time tracking of your portfolio value and performance across all tracked properties.', icon:'📊', action:'Go to My Portfolio', page:'portfolio' },
                { title:'Transaction History', desc:'Complete records of all DLD transactions in your tracked areas and projects.', icon:'📋', action:'View Transactions', page:'recent' },
                { title:'Account Statements', desc:'Regular updates on your tracked properties, watchlist performance, and alert history.', icon:'📄', action:'View Watchlist', page:'watchlist' },
                { title:'Performance Reports', desc:'Monthly performance summaries and area-level analytics for your tracked investments.', icon:'📈', action:'View Reports', page:'reports' },
              ].map((item,i)=>(
                <div key={i} style={{ background:'var(--surface)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:14, padding:20 }}>
                  <div style={{ fontSize:24, marginBottom:10 }}>{item.icon}</div>
                  <div style={{ fontSize:14, fontWeight:600, color:'var(--text-primary)', marginBottom:6 }}>{item.title}</div>
                  <div style={{ fontSize:12, color:'var(--text-secondary)', lineHeight:1.6, marginBottom:14 }}>{item.desc}</div>
                  <div style={{ fontSize:12, color:'#38BDF8', fontWeight:600, cursor:'pointer' }}>{item.action} →</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EXECUTION */}
        {section==='execution' && (
          <div>
            <div style={{ marginBottom:20 }}>
              <h2 style={{ margin:0, fontSize:18, fontWeight:700, color:'var(--text-primary)', marginBottom:4 }}>Execution & Trading Information</h2>
              <div style={{ fontSize:13, color:'var(--text-secondary)' }}>DLD transaction data, pricing intelligence and market depth</div>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12, marginBottom:24 }}>
              {[
                ['Average Days on Market', '47 days', 'Dubai residential avg', '#38BDF8'],
                ['Transaction Success Rate', '94.2%', 'Completed vs cancelled', '#22C55E'],
                ['Off-Plan Delivery Rate', '87%', 'On-time handovers 2023', '#A78BFA'],
                ['Avg Negotiation Margin', '3-5%', 'Below asking price', '#F59E0B'],
                ['Mortgage Approval Rate', '68%', 'UAE bank avg 2024', '#38BDF8'],
                ['DLD Processing Time', '3-5 days', 'Standard transfer', '#22C55E'],
              ].map(([label,value,sub,color])=>(
                <div key={label} style={{ background:'var(--surface)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:12, padding:'16px 18px' }}>
                  <div style={{ fontSize:10, color:'var(--text-muted)', marginBottom:6, textTransform:'uppercase', letterSpacing:'0.05em' }}>{label}</div>
                  <div style={{ fontSize:18, fontWeight:700, color }}>{value}</div>
                  <div style={{ fontSize:11, color:'var(--text-secondary)', marginTop:4 }}>{sub}</div>
                </div>
              ))}
            </div>

            <div style={{ background:'var(--surface)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:14, padding:20 }}>
              <div style={{ fontSize:14, fontWeight:600, color:'var(--text-primary)', marginBottom:14 }}>Best Price Execution Guide</div>
              {[
                ['Off-Plan', 'Book during launch phase for best pricing. Developers typically offer 5-10% below post-launch price.', '#38BDF8'],
                ['Ready Properties', 'Negotiate 3-5% below asking. Properties listed 60+ days have higher negotiation margin.', '#22C55E'],
                ['Mortgage Financed', 'Pre-approval strengthens your offer. UAE banks offer rates from 3.49% (fixed 1-3yr).', '#A78BFA'],
                ['Bulk/Multiple Units', 'Investors buying 2+ units in same project can negotiate 5-8% volume discount.', '#F59E0B'],
              ].map(([type, tip, color])=>(
                <div key={type} style={{ display:'flex', gap:12, padding:'12px 0', borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
                  <div style={{ width:3, background:color, borderRadius:2, flexShrink:0 }}/>
                  <div>
                    <div style={{ fontSize:13, fontWeight:600, color, marginBottom:3 }}>{type}</div>
                    <div style={{ fontSize:12, color:'var(--text-secondary)', lineHeight:1.6 }}>{tip}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EDUCATION */}
        {section==='education' && (
          <div>
            <div style={{ marginBottom:20 }}>
              <h2 style={{ margin:0, fontSize:18, fontWeight:700, color:'var(--text-primary)', marginBottom:4 }}>Educational & Advisory Resources</h2>
              <div style={{ fontSize:13, color:'var(--text-secondary)' }}>Dubai real estate knowledge base for brokers and investors</div>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:24 }}>
              {[
                { icon:'🎓', title:'Dubai Real Estate Law', desc:'RERA regulations, escrow requirements, SPA obligations, and strata law for off-plan developments.', tags:['RERA','Off-Plan','Legal'] },
                { icon:'📊', title:'Market Analysis Methods', desc:'How to read DLD data, calculate yield, interpret price trends, and identify investment opportunities.', tags:['Analysis','Yield','Data'] },
                { icon:'🏦', title:'Mortgage & Finance Guide', desc:'UAE mortgage criteria, LTV ratios, interest rates, and Islamic finance options for property buyers.', tags:['Mortgage','Finance','Banks'] },
                { icon:'🌍', title:'GCC Investor Guide', desc:'Freehold zones, golden visa eligibility, tax benefits, and residency requirements for foreign investors.', tags:['Visa','Tax','Foreign'] },
                { icon:'📋', title:'Due Diligence Checklist', desc:'NOC requirements, title deed verification, service charge validation, and developer track record checks.', tags:['Due Diligence','Checklist'] },
                { icon:'💼', title:'Broker Best Practices', desc:'RERA licensing, client disclosure requirements, commission structures, and professional standards.', tags:['RERA','Licensing','Ethics'] },
              ].map((item,i)=>(
                <div key={i} style={{ background:'var(--surface)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:14, padding:18 }}>
                  <div style={{ fontSize:24, marginBottom:8 }}>{item.icon}</div>
                  <div style={{ fontSize:13, fontWeight:600, color:'var(--text-primary)', marginBottom:6 }}>{item.title}</div>
                  <div style={{ fontSize:12, color:'var(--text-secondary)', lineHeight:1.6, marginBottom:10 }}>{item.desc}</div>
                  <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                    {item.tags.map(tag=>(
                      <span key={tag} style={{ fontSize:10, fontWeight:600, padding:'2px 8px', borderRadius:20, background:'rgba(59,130,246,0.08)', color:'#38BDF8', border:'1px solid rgba(59,130,246,0.15)' }}>{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background:'linear-gradient(135deg,rgba(29,78,216,0.12),rgba(56,189,248,0.06))', border:'1px solid rgba(56,189,248,0.2)', borderRadius:14, padding:20 }}>
              <div style={{ fontSize:14, fontWeight:600, color:'var(--text-primary)', marginBottom:8 }}>AI Concierge — Your Dubai Property Expert</div>
              <div style={{ fontSize:12, color:'var(--text-secondary)', lineHeight:1.6, marginBottom:14 }}>
                Get instant answers to any Dubai real estate question — market analysis, RERA regulations, investment strategy, area comparisons, and deal structuring advice.
              </div>
              <div style={{ fontSize:12, color:'#38BDF8', fontWeight:600, cursor:'pointer' }}>Open AI Concierge →</div>
            </div>
          </div>
        )}

        {/* COMPLIANCE */}
        {section==='compliance' && (
          <div>
            <div style={{ marginBottom:20 }}>
              <h2 style={{ margin:0, fontSize:18, fontWeight:700, color:'var(--text-primary)', marginBottom:4 }}>Regulatory & Compliance</h2>
              <div style={{ fontSize:13, color:'var(--text-secondary)' }}>Dubai real estate regulatory framework and compliance requirements</div>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:24 }}>
              {[
                { label:'RERA Status', value:'Active', sub:'Real Estate Regulatory Agency', color:'#22C55E', bg:'rgba(34,197,94,0.08)' },
                { label:'DLD Registration', value:'Required', sub:'Dubai Land Department', color:'#38BDF8', bg:'rgba(56,189,248,0.08)' },
                { label:'DFSA Framework', value:'Compliant', sub:'Dubai Financial Services Authority', color:'#22C55E', bg:'rgba(34,197,94,0.08)' },
                { label:'AML Requirements', value:'Mandatory', sub:'Anti-Money Laundering', color:'#F59E0B', bg:'rgba(245,158,11,0.08)' },
              ].map((item)=>(
                <div key={item.label} style={{ background:item.bg, border:`1px solid ${item.color}20`, borderRadius:12, padding:'16px 18px' }}>
                  <div style={{ fontSize:10, color:'var(--text-muted)', marginBottom:4, textTransform:'uppercase', letterSpacing:'0.05em' }}>{item.label}</div>
                  <div style={{ fontSize:18, fontWeight:700, color:item.color, marginBottom:2 }}>{item.value}</div>
                  <div style={{ fontSize:11, color:'var(--text-secondary)' }}>{item.sub}</div>
                </div>
              ))}
            </div>

            <div style={{ background:'var(--surface)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:14, overflow:'hidden', marginBottom:16 }}>
              <div style={{ padding:'14px 20px', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize:14, fontWeight:600, color:'var(--text-primary)' }}>KYC & Documentation Checklist</div>
              </div>
              {[
                ['Emirates ID / Passport', 'Required for all parties', true],
                ['Proof of Address', 'Utility bill or bank statement (3 months)', true],
                ['Source of Funds', 'Bank statements or salary certificate', true],
                ['Title Deed / SPA', 'Original documents from developer', true],
                ['NOC from Developer', 'Required for secondary market sales', true],
                ['Mortgage Pre-approval', 'Bank letter if financing', false],
                ['Power of Attorney', 'If buyer/seller not present', false],
              ].map(([item, detail, required])=>(
                <div key={item} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'11px 20px', borderBottom:'1px solid rgba(255,255,255,0.03)' }}>
                  <div>
                    <div style={{ fontSize:13, fontWeight:500, color:'var(--text-primary)' }}>{item}</div>
                    <div style={{ fontSize:11, color:'var(--text-muted)' }}>{detail}</div>
                  </div>
                  <span style={{ fontSize:10, fontWeight:600, padding:'3px 10px', borderRadius:20, background:required?'rgba(34,197,94,0.1)':'rgba(100,116,139,0.1)', color:required?'#22C55E':'var(--text-muted)' }}>
                    {required?'Required':'Optional'}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ background:'rgba(245,158,11,0.06)', border:'1px solid rgba(245,158,11,0.2)', borderRadius:12, padding:16 }}>
              <div style={{ fontSize:13, fontWeight:600, color:'#F59E0B', marginBottom:6 }}>Important: RERA Broker License</div>
              <div style={{ fontSize:12, color:'var(--text-secondary)', lineHeight:1.6 }}>
                All real estate brokers in Dubai must hold a valid RERA Certified Broker card. License must be renewed annually. PropSight data is for licensed professionals only. Verify your license status at <span style={{ color:'#38BDF8' }}>dubailand.gov.ae</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Watchlist & Alerts (merged) ────────────────────────────────────────────
function WatchlistAlerts({ areaData, projectsData }) {
  const [view, setView] = useState('watchlist');
  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <div style={{ padding:'12px 28px 0', borderBottom:'1px solid rgba(59,130,246,0.08)' }}>
        <div style={{ display:'flex', gap:4, background:'rgba(255,255,255,0.04)', borderRadius:10, padding:3, width:'fit-content', marginBottom:12 }}>
          {[['watchlist','Watchlist'],['alerts','Price Alerts']].map(([id,lbl])=>(
            <button key={id} onClick={()=>setView(id)} style={{
              padding:'7px 18px', borderRadius:8, border:'none', cursor:'pointer',
              fontSize:13, fontFamily:'system-ui', fontWeight:view===id?600:400,
              background:view===id?'var(--surface)':'transparent',
              color:view===id?'var(--text-primary)':'var(--text-muted)',
              boxShadow:view===id?'0 1px 4px rgba(0,0,0,0.3)':'none',
            }}>{lbl}</button>
          ))}
        </div>
      </div>
      <div style={{ flex:1, overflowY:'auto' }}>
        {view==='watchlist' && <Watchlist areaData={areaData} projectsData={projectsData} setPage={()=>{}}/>}
        {view==='alerts' && <PriceAlerts areaData={areaData}/>}
      </div>
    </div>
  );
}

// ── Main BrokerProfile ─────────────────────────────────────────────────────
export default function BrokerProfile({ areaData, core, recentRaw, projectsData, onNavigate }) {
  const [tab, setTab] = useState('profile');

  const tabs = [
    ['profile',    'My Profile'],
    ['portfolio',  'Broker Portfolio'],
    ['watchlist',  'Watchlist & Alerts'],
    ['report',     'Broker Report'],
    ['upgrade',    'Upgrade Plan'],
  ];

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', background:'var(--bg)', fontFamily:'system-ui', overflow:'hidden' }}>
      <div style={{ padding:'20px 28px 0', borderBottom:'1px solid rgba(59,130,246,0.08)' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
          <div>
            <h1 style={{ margin:0, fontSize:22, fontWeight:700, color:'var(--text-primary)', marginBottom:4 }}>Broker Profile</h1>
            <div style={{ fontSize:13, color:'var(--text-secondary)' }}>Portfolio management, market intelligence and valuation reports</div>
          </div>
        </div>
        <div style={{ display:'flex', gap:4 }}>
          {tabs.map(([id,lbl])=>(
            <button key={id} onClick={()=>setTab(id)} style={{
              padding:'9px 20px', borderRadius:'8px 8px 0 0', border:'none',
              cursor:'pointer', fontSize:13, fontFamily:'system-ui',
              fontWeight:tab===id?600:400,
              background:tab===id?'var(--surface)':'transparent',
              color:tab===id?'var(--text-primary)':'var(--text-muted)',
              borderBottom:tab===id?'2px solid #38BDF8':'2px solid transparent',
            }}>{lbl}</button>
          ))}
        </div>
      </div>
      <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
        {tab==='profile'    && <BrokerProfileEditor/>}
        {tab==='portfolio' && <BrokerPortfolio areaData={areaData} core={core} recentRaw={recentRaw}/>}
        {tab==='watchlist' && <WatchlistAlerts areaData={areaData} projectsData={projectsData}/>}
        {tab==='report'    && <BrokerReport areaData={areaData} core={core} recentRaw={recentRaw}/>}
        {tab==='upgrade'   && <UpgradePage/>}
      </div>
    </div>
  );
}
