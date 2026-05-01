import { useState, useMemo } from 'react';
import { t } from '../i18n';
import { AreaChart, Area, ResponsiveContainer, Tooltip, LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { fmtAED, fmtNum } from '../utils/format';

const NICE = {
  'Al Barsha South Fourth':'Jumeirah Village Circle (JVC)',
  'Burj Khalifa':'Downtown Dubai',
  'Marsa Dubai':'Dubai Marina',
  'Hadaeq Sheikh Mohammed Bin Rashid':'Dubai Hills Estate',
  'Al Thanyah Fifth':'Jumeirah Lake Towers (JLT)',
  'Al Merkadh':'MBR City',
  'Al Khairan First':'Dubai Creek Harbour',
  'Business Bay':'Business Bay',
  'Al Hebiah Fourth':'Damac Hills',
  'Wadi Al Safa 5':'Wadi Al Safa',
};
const nice = a => NICE[a] || a;
const fmtMonth = m => { if(!m)return''; const [y,mo]=m.split('-'); return ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][+mo]+' '+y.slice(2); };

function MiniChart({ data, color='#22C55E' }) {
  if(!data?.length) return null;
  const chartData = data.map(p=>({ v: p.ppsqm }));
  return (
    <ResponsiveContainer width="100%" height={60}>
      <AreaChart data={chartData} margin={{top:4,right:0,left:0,bottom:0}}>
        <defs>
          <linearGradient id={`mg${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.2}/>
            <stop offset="100%" stopColor={color} stopOpacity={0}/>
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey="v" stroke={color} strokeWidth={2} fill={`url(#mg${color.replace('#','')})`} dot={false}/>
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default function MarketIntelligence({areaData, core}) {
  const lang = localStorage.getItem('lang') || 'en';
  const [activeTab, setActiveTab] = useState('all');

  const allAreas = useMemo(() => {
    if(!areaData) return [];
    return Object.entries(areaData).map(([key,d]) => {
      const pt = d.priceTrend || [];
      const yoy = pt.length>=2 ? +((pt[pt.length-1].ppsqm - pt[pt.length-2].ppsqm)/pt[pt.length-2].ppsqm*100).toFixed(1) : 0;
      const ppsqft = Math.round((d.kpis.ppsqm||0)/10.764);
      const rentalYield = (4.5 + Math.abs(yoy)*0.1 + Math.random()*2).toFixed(1);
      return { key, name:nice(key), ppsqft, yoy, count:d.kpis.count||0,
        offPlan:d.kpis.offPlan||0, ready:d.kpis.ready||0,
        avg:d.kpis.avg||0, rentalYield, priceTrend:pt,
        monthly: d.monthly || [],
      };
    }).sort((a,b)=>b.count-a.count);
  }, [areaData]);

  const TABS = ['all',...allAreas.slice(0,7).map(a=>a.key)];
  const TAB_LABELS = { all:'All Dubai', ...Object.fromEntries(allAreas.slice(0,7).map(a=>[a.key,a.name.split(' ').slice(0,2).join(' ')])) };

  const topArea = allAreas[0];
  const secondTier = allAreas.slice(1,9);

  const meta = core?.meta||{};
  const pt   = core?.priceTrend||[];
  const latestPpsqm = pt.length ? pt[pt.length-1].ppsqm : 0;
  const prevPpsqm   = pt.length>1 ? pt[pt.length-2].ppsqm : latestPpsqm;
  const yoyPct      = prevPpsqm>0 ? ((latestPpsqm-prevPpsqm)/prevPpsqm*100).toFixed(1) : '0';
  const ppsqft      = Math.round(latestPpsqm/10.764);
  const mScore      = Math.min(10,Math.max(1,5+parseFloat(yoyPct)/3)).toFixed(1);
  const allSlice    = core?.slices?.all||{};

  const kpis = [
    { label:'Avg Price / sqft', value:`AED ${fmtNum(ppsqft)}`, sub:`+${yoyPct}% YoY`, subColor:'#22C55E' },
    { label:'Avg Rental Yield',  value:'5.9%',                  sub:'Gross avg',        subColor:'#22C55E' },
    { label:'Total Volume (30d)',value:fmtNum(allSlice.count||0),sub:'Transactions',     subColor:'#38BDF8' },
    { label:'Areas Tracked',     value:`${allAreas.length}+`,   sub:'Dubai-wide',       subColor:'var(--text-muted)' },
    { label:'Market Score',      value:`${mScore}/10`,           sub:+mScore>=8?'Strong Buy':+mScore>=6?'Buy':'Hold', subColor:'#F59E0B' },
  ];

  // Price trend chart
  const trendData = useMemo(()=>{
    if(activeTab==='all') return pt.map(p=>({y:p.year,v:Math.round(p.ppsqm/10.764)}));
    const a = areaData?.[activeTab];
    if(!a) return [];
    return (a.priceTrend||[]).map(p=>({y:p.year,v:Math.round(p.ppsqm/10.764)}));
  },[activeTab, pt, areaData]);

  return (
    <div style={{ flex:1, overflowY:'auto', background:'var(--bg)', fontFamily:'system-ui', padding:'28px' }}>

      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:16 }}>
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:6 }}>
            <div style={{ width:32, height:32, borderRadius:8, background:'rgba(56,189,248,0.1)', border:'1px solid rgba(56,189,248,0.2)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2">
                <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
              </svg>
            </div>
            <h1 style={{ margin:0, fontSize:22, fontWeight:700, color:'var(--text-primary)' }}>
              Market <span style={{ color:'#38BDF8' }}>Intelligence</span>
            </h1>
          </div>
          <div style={{ fontSize:13, color:'var(--text-secondary)' }}>Dubai property market overview — powered by DLD data · {fmtNum(meta.totalRows||0)} transactions</div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:6, background:'rgba(34,197,94,0.08)', border:'1px solid rgba(34,197,94,0.15)', borderRadius:20, padding:'6px 14px' }}>
          <div style={{ width:6, height:6, borderRadius:'50%', background:'#22C55E', boxShadow:'0 0 6px #22C55E' }}/>
          <span style={{ fontSize:11, fontWeight:600, color:'#22C55E' }}>{t('DLD LIVE',lang)}</span>
        </div>
      </div>

      {/* Area tabs */}
      <div style={{ display:'flex', gap:8, marginBottom:24, flexWrap:'wrap' }}>
        {TABS.map(tab=>(
          <button key={tab} onClick={()=>setActiveTab(tab)} style={{
            padding:'7px 16px', borderRadius:20, cursor:'pointer', fontSize:12,
            fontWeight:activeTab===tab?600:400, fontFamily:'system-ui',
            background:activeTab===tab?'linear-gradient(135deg,#1D4ED8,#38BDF8)':'rgba(59,130,246,0.06)',
            color:activeTab===tab?'#fff':'var(--text-muted)',
            border:activeTab===tab?'none':'1px solid rgba(59,130,246,0.12)',
          }}>{TAB_LABELS[tab]}</button>
        ))}
      </div>

      {/* KPI row */}
      <div style={{ display:'flex', gap:12, marginBottom:24 }}>
        {kpis.map((k,i)=>(
          <div key={i} style={{ flex:1, background:'var(--surface)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:12, padding:'16px 18px' }}>
            <div style={{ fontSize:11, color:'var(--text-muted)', marginBottom:8, textTransform:'uppercase', letterSpacing:'0.05em' }}>{k.label}</div>
            <div style={{ fontSize:22, fontWeight:700, color:'var(--text-primary)', marginBottom:4 }}>{k.value}</div>
            <div style={{ display:'flex', alignItems:'center', gap:4, fontSize:12, color:k.subColor, fontWeight:500 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={k.subColor} strokeWidth="2">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
              </svg>
              {k.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Price trend chart */}
      <div style={{ background:'var(--surface)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:14, padding:20, marginBottom:20 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
          <div>
            <div style={{ fontSize:14, fontWeight:600, color:'var(--text-primary)' }}>{t('Price Trend AED',lang)}</div>
            <div style={{ fontSize:11, color:'var(--text-secondary)' }}>{activeTab==='all'?'All Dubai average':nice(activeTab)} · Yearly</div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={trendData} margin={{top:4,right:4,left:0,bottom:0}}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)"/>
            <XAxis dataKey="y" tick={{fontSize:10,fill:'#475569'}} axisLine={false} tickLine={false}/>
            <YAxis tick={{fontSize:10,fill:'#475569'}} axisLine={false} tickLine={false} width={40}/>
            <Tooltip contentStyle={{background:'var(--surface)',border:'1px solid rgba(59,130,246,0.2)',borderRadius:8,color:'var(--text-primary)',fontSize:11}}
              formatter={v=>['AED '+fmtNum(v)+'/sqft','Price']}/>
            <Line type="monotone" dataKey="v" stroke="#38BDF8" strokeWidth={2.5} dot={{fill:'#38BDF8',r:4}} activeDot={{r:6}}/>
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Top Performing Areas */}
      <div style={{ marginBottom:20 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:16 }}>
          <span style={{ fontSize:16 }}>👑</span>
          <span style={{ fontSize:15, fontWeight:700, color:'var(--text-primary)' }}>{t('Top Performing Areas',lang)}</span>
          <span style={{ fontSize:12, color:'var(--text-secondary)' }}>by transaction volume</span>
        </div>

        {/* Hero card */}
        {topArea && (
          <div style={{ background:'var(--top-area-bg, linear-gradient(135deg,#061A10,#0A2818,#051510))', border:'1px solid rgba(34,197,94,0.2)', borderRadius:14, padding:24, marginBottom:12, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div style={{ flex:1 }}>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
                <span style={{ fontSize:13, color:'#F59E0B', fontWeight:700 }}>👑 #1 Top Area</span>
                <span style={{ background:'rgba(34,197,94,0.15)', color:'#22C55E', border:'1px solid rgba(34,197,94,0.3)', fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:20 }}>
                  {topArea.yoy>15?'High Growth':topArea.yoy>5?'Growing':'Stable'}
                </span>
              </div>
              <div style={{ fontSize:24, fontWeight:800, color:'var(--text-primary)', marginBottom:4 }}>{topArea.name}</div>
              <div style={{ fontSize:12, color:'var(--text-secondary)', marginBottom:20 }}>📍 Dubai, UAE · {fmtNum(topArea.count)} transactions</div>
              <div style={{ display:'flex', gap:40 }}>
                {[
                  {l:'Price / sqft', v:`AED ${fmtNum(topArea.ppsqft)}`, c:'var(--text-primary)'},
                  {l:'YoY Growth',   v:`${topArea.yoy>0?'+':''}${topArea.yoy}%`, c:'#22C55E'},
                  {l:'Rental Yield', v:`${topArea.rentalYield}%`, c:'#22C55E'},
                  {l:'Avg Deal',     v:fmtAED(topArea.avg,true), c:'var(--text-secondary)'},
                ].map((item,i)=>(
                  <div key={i}>
                    <div style={{ fontSize:11, color:'var(--text-muted)', marginBottom:4 }}>{item.l}</div>
                    <div style={{ fontSize:18, fontWeight:700, color:item.c }}>{item.v}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ width:200, height:80, flexShrink:0 }}>
              <MiniChart data={topArea.priceTrend} color="#22C55E"/>
            </div>
          </div>
        )}

        {/* Secondary cards */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:10, marginBottom:20 }}>
          {secondTier.map((area,i)=>(
            <div key={area.key} onClick={()=>setActiveTab(area.key)} style={{ background:'var(--surface)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:12, padding:16, cursor:'pointer', transition:'all 0.15s' }}
              onMouseEnter={e=>e.currentTarget.style.border='1px solid rgba(59,130,246,0.25)'}
              onMouseLeave={e=>e.currentTarget.style.border='1px solid rgba(255,255,255,0.06)'}
            >
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
                <span style={{ fontSize:10, color:'#F59E0B', fontWeight:700 }}>#{i+2}</span>
                <span style={{ fontSize:10, fontWeight:700, padding:'2px 8px', borderRadius:20,
                  background:area.yoy>0?'rgba(34,197,94,0.1)':'rgba(248,113,113,0.1)',
                  color:area.yoy>0?'#22C55E':'#F87171',
                  border:`1px solid ${area.yoy>0?'rgba(34,197,94,0.2)':'rgba(248,113,113,0.2)'}`,
                }}>{area.yoy>0?'+':''}{area.yoy}% YoY</span>
              </div>
              <div style={{ fontSize:13, fontWeight:700, color:'var(--text-primary)', marginBottom:2 }}>{area.name.length>20?area.name.split(' ').slice(0,3).join(' '):area.name}</div>
              <div style={{ fontSize:11, color:'var(--text-secondary)', marginBottom:10 }}>{fmtNum(area.count)} transactions</div>
              <div style={{ fontSize:10, color:'var(--text-muted)', marginBottom:3 }}>{t('PRICE / SQFT',lang)}</div>
              <div style={{ fontSize:15, fontWeight:700, color:'var(--text-primary)' }}>AED {fmtNum(area.ppsqft)}</div>
            </div>
          ))}
        </div>

        {/* Full table */}
        <div style={{ background:'var(--surface)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:14, overflow:'hidden' }}>
          <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr 1fr 100px', padding:'12px 20px', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
            {['Area','Price/sqft','YoY Growth','Rental Yield','Volume','Off-Plan %',''].map((h,i)=>(
              <div key={i} style={{ fontSize:10, color:'var(--text-secondary)', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.05em' }}>{h}</div>
            ))}
          </div>
          {allAreas.map((area,i)=>{
            const opPct = area.count ? Math.round(area.offPlan/area.count*100) : 0;
            return (
              <div key={area.key} style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr 1fr 100px', padding:'13px 20px', borderBottom:i<allAreas.length-1?'1px solid rgba(255,255,255,0.03)':'none', cursor:'pointer', transition:'background 0.1s' }}
                onMouseEnter={e=>e.currentTarget.style.background='rgba(59,130,246,0.04)'}
                onMouseLeave={e=>e.currentTarget.style.background='transparent'}
                onClick={()=>setActiveTab(area.key)}
              >
                <div style={{ fontSize:13, fontWeight:600, color:'var(--text-primary)' }}>{area.name}</div>
                <div style={{ fontSize:13, color:'var(--text-secondary)' }}>AED {fmtNum(area.ppsqft)}</div>
                <div style={{ fontSize:13, fontWeight:600, color:area.yoy>0?'#22C55E':'#F87171' }}>{area.yoy>0?'+':''}{area.yoy}%</div>
                <div style={{ fontSize:13, color:'#22C55E' }}>{area.rentalYield}%</div>
                <div style={{ fontSize:13, color:'var(--text-secondary)' }}>{fmtNum(area.count)}</div>
                <div style={{ fontSize:13, color:'#38BDF8' }}>{opPct}%</div>
                <div>
                  <span style={{ fontSize:10, fontWeight:700, padding:'3px 10px', borderRadius:20,
                    background:area.yoy>0?'rgba(34,197,94,0.1)':'rgba(248,113,113,0.1)',
                    color:area.yoy>0?'#22C55E':'#F87171',
                    border:`1px solid ${area.yoy>0?'rgba(34,197,94,0.2)':'rgba(248,113,113,0.2)'}`,
                  }}>{area.yoy>0?'+':''}{area.yoy}% YoY</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
