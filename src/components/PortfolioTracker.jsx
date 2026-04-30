import { useState, useEffect, useMemo } from 'react';
import { supabase } from '../context/AuthContext';
import { useAuth } from '../context/AuthContext';
import { fmtAED, fmtNum } from '../utils/format';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const AREA_NAMES = {'Al Barsha South Fourth':'JVC','Burj Khalifa':'Downtown Dubai','Marsa Dubai':'Dubai Marina','Hadaeq Sheikh Mohammed Bin Rashid':'Dubai Hills','Al Thanyah Fifth':'JLT','Business Bay':'Business Bay','Palm Jumeirah':'Palm Jumeirah'};
const niceArea = a => AREA_NAMES[a] || a;
const COLORS = ['#38BDF8','#22C55E','#F59E0B','#A78BFA','#F87171','#34D399'];

function StatCard({ label, value, sub, subColor='var(--text-muted)', accent }) {
  return (
    <div style={{background:'var(--surface)',border:`1px solid ${accent||'rgba(255,255,255,0.06)'}`,borderRadius:12,padding:'18px 20px',flex:1,minWidth:0}}>
      <div style={{fontSize:11,color:'var(--text-muted)',fontWeight:500,marginBottom:8,textTransform:'uppercase',letterSpacing:'0.06em'}}>{label}</div>
      <div style={{fontSize:22,fontWeight:700,color:'var(--text-primary)',letterSpacing:'-0.5px',marginBottom:4}}>{value}</div>
      {sub && <div style={{fontSize:12,color:subColor,fontWeight:500}}>{sub}</div>}
    </div>
  );
}

export default function PortfolioTracker({ areaData }) {
  const { user, isPro, isLite } = useAuth();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({name:'',area:'',type:'Apartment',status:'Ready',purchasePrice:'',size:'',purchaseDate:'',monthlyRent:'',notes:''});
  const [saving, setSaving] = useState(false);
  const [areaSearch, setAreaSearch] = useState('');
  const [deleting, setDeleting] = useState(null);

  useEffect(() => { if (user) loadProperties(); }, [user]);

  const loadProperties = async () => {
    setLoading(true);
    const { data } = await supabase.from('portfolio_properties').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
    setProperties(data || []);
    setLoading(false);
  };

  const addProperty = async () => {
    if (!form.name || !form.purchasePrice) return;
    setSaving(true);
    const price = parseFloat(form.purchasePrice.replace(/,/g,'')) || 0;
    const size = parseFloat(form.size.replace(/,/g,'')) || 0;
    const rent = parseFloat(form.monthlyRent.replace(/,/g,'')) || 0;
    // Current value: use market ppsqft * size if both available, otherwise use purchase price
    // Only apply market value if we have both size and area data
    const marketPpsqm = areaData?.[form.area]?.kpis?.ppsqm || 0;
    const marketPpsqft = marketPpsqm / 10.764;
    // Only use market valuation if it's within 50% of purchase price (sanity check)
    const marketEstimate = size && marketPpsqft ? Math.round(size * marketPpsqft) : 0;
    const sanityCheck = marketEstimate > price * 0.5 && marketEstimate < price * 2;
    const currentValue = (size && marketPpsqft && sanityCheck) ? marketEstimate : price;
    await supabase.from('portfolio_properties').insert({user_id:user.id,name:form.name,area:form.area,area_display:niceArea(form.area),property_type:form.type,status:form.status,purchase_price:price,current_value:currentValue,size_sqft:size,purchase_date:form.purchaseDate||null,monthly_rent:rent,notes:form.notes});
    setSaving(false);
    setShowAdd(false);
    setForm({name:'',area:'',type:'Apartment',status:'Ready',purchasePrice:'',size:'',purchaseDate:'',monthlyRent:'',notes:''});
    loadProperties();
  };

  const deleteProperty = async (id) => {
    setDeleting(id);
    await supabase.from('portfolio_properties').delete().eq('id', id);
    setProperties(p => p.filter(x => x.id !== id));
    setDeleting(null);
  };

  const stats = useMemo(() => {
    if (!properties.length) return {totalPurchase:0,totalCurrent:0,totalGain:0,gainPct:0,totalRent:0,annualYield:0};
    const totalPurchase = properties.reduce((s,p)=>s+(p.purchase_price||0),0);
    const totalCurrent = properties.reduce((s,p)=>s+(p.current_value||p.purchase_price||0),0);
    const totalGain = totalCurrent - totalPurchase;
    const gainPct = totalPurchase ? (totalGain/totalPurchase*100).toFixed(1) : 0;
    const totalRent = properties.reduce((s,p)=>s+(p.monthly_rent||0),0)*12;
    const annualYield = totalCurrent ? (totalRent/totalCurrent*100).toFixed(1) : 0;
    return {totalPurchase,totalCurrent,totalGain,gainPct,totalRent,annualYield};
  }, [properties]);

  const areaBreakdown = useMemo(() => {
    const map = {};
    properties.forEach(p => { const a=p.area_display||p.area||'Other'; map[a]=(map[a]||0)+(p.current_value||p.purchase_price||0); });
    return Object.entries(map).map(([name,value])=>({name,value}));
  }, [properties]);

  const inp = (f,v) => setForm(x=>({...x,[f]:v}));
  const areas = areaData ? Object.keys(areaData).map(k=>({key:k,label:niceArea(k)})) : [];
  const filteredAreas = areas.filter(a=>a.label.toLowerCase().includes(areaSearch.toLowerCase())).slice(0,6);
  const inputStyle = {width:'100%',padding:'10px 12px',borderRadius:8,boxSizing:'border-box',background:'var(--bg-alt)',border:'1px solid rgba(59,130,246,0.15)',color:'var(--text-primary)',fontSize:13,outline:'none',fontFamily:'system-ui'};
  const lbl = {fontSize:12,color:'var(--text-muted)',marginBottom:5,display:'block',fontWeight:500};

  if (!isLite) return (
    <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',background:'var(--bg)',fontFamily:'system-ui',padding:24}}>
      <div style={{textAlign:'center',maxWidth:380}}>
        <div style={{fontSize:48,marginBottom:16}}>🏢</div>
        <div style={{fontSize:22,fontWeight:700,color:'var(--text-primary)',marginBottom:8}}>Portfolio Tracker</div>
        <div style={{fontSize:14,color:'var(--text-muted)',marginBottom:24,lineHeight:1.6}}>Track all your Dubai investments. Monitor capital gain, rental yield and portfolio value in real time.</div>
        <div style={{background:'var(--surface)',border:'1px solid rgba(59,130,246,0.2)',borderRadius:12,padding:20,marginBottom:20}}>
          {['Track unlimited properties','Real-time market valuations','Capital gain calculator','Rental yield tracking','Portfolio breakdown charts'].map((f,i)=>(
            <div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:'8px 0',borderBottom:i<4?'1px solid rgba(255,255,255,0.04)':'none'}}>
              <span style={{color:'#22C55E'}}>✓</span><span style={{fontSize:13,color:'var(--text-secondary)'}}>{f}</span>
            </div>
          ))}
        </div>
        <button style={{width:'100%',padding:'13px',borderRadius:10,border:'none',cursor:'pointer',background:'linear-gradient(135deg,#1D4ED8,#38BDF8)',color:'#fff',fontSize:14,fontWeight:600,fontFamily:'system-ui'}}>Upgrade to Lite — AED 99/mo</button>
      </div>
    </div>
  );

  return (
    <div style={{flex:1,overflowY:'auto',background:'var(--bg)',fontFamily:'system-ui',padding:'24px 28px'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:24}}>
        <div>
          <h1 style={{margin:0,fontSize:22,fontWeight:700,color:'var(--text-primary)',marginBottom:4}}>My Portfolio</h1>
          <div style={{fontSize:13,color:'var(--text-secondary)'}}>{properties.length} {properties.length===1?'property':'properties'} tracked</div>
        </div>
        <button onClick={()=>setShowAdd(true)} style={{display:'flex',alignItems:'center',gap:8,padding:'10px 18px',borderRadius:10,border:'none',cursor:'pointer',background:'linear-gradient(135deg,#1D4ED8,#38BDF8)',color:'#fff',fontSize:13,fontWeight:600,fontFamily:'system-ui'}}>+ Add Property</button>
      </div>

      {loading ? <div style={{textAlign:'center',padding:60,color:'var(--text-secondary)'}}>Loading...</div> : properties.length === 0 ? (
        <div style={{textAlign:'center',padding:60}}>
          <div style={{fontSize:48,marginBottom:16}}>🏢</div>
          <div style={{fontSize:18,fontWeight:600,color:'var(--text-primary)',marginBottom:8}}>No properties yet</div>
          <div style={{fontSize:13,color:'var(--text-secondary)',marginBottom:24}}>Add your first property to start tracking</div>
          <button onClick={()=>setShowAdd(true)} style={{padding:'11px 24px',borderRadius:10,border:'none',cursor:'pointer',background:'linear-gradient(135deg,#1D4ED8,#38BDF8)',color:'#fff',fontSize:13,fontWeight:600,fontFamily:'system-ui'}}>+ Add Your First Property</button>
        </div>
      ) : (
        <>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))',gap:12,marginBottom:24}}>
            <StatCard label="Portfolio Value" value={fmtAED(stats.totalCurrent,true)} sub="Current market value"/>
            <StatCard label="Total Invested" value={fmtAED(stats.totalPurchase,true)} sub="Purchase total"/>
            <StatCard label="Capital Gain" value={fmtAED(Math.abs(stats.totalGain),true)} sub={`${stats.gainPct>=0?'+':''}${stats.gainPct}%`} subColor={stats.totalGain>=0?'#22C55E':'#F87171'} accent={stats.totalGain>=0?'rgba(34,197,94,0.15)':'rgba(248,113,113,0.15)'}/>
            <StatCard label="Annual Rent" value={fmtAED(stats.totalRent,true)} sub={`${stats.annualYield}% yield`} subColor="#38BDF8" accent="rgba(59,130,246,0.15)"/>
          </div>

          {areaBreakdown.length > 1 && (
            <div style={{background:'var(--surface)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:14,padding:20,marginBottom:24,display:'flex',alignItems:'center',gap:24}}>
              <div style={{fontSize:14,fontWeight:600,color:'var(--text-primary)',marginBottom:0,flexShrink:0}}>By Area</div>
              <ResponsiveContainer width={140} height={140}>
                <PieChart><Pie data={areaBreakdown} cx="50%" cy="50%" innerRadius={38} outerRadius={58} dataKey="value" strokeWidth={0}>
                  {areaBreakdown.map((_,i)=><Cell key={i} fill={COLORS[i%COLORS.length]}/>)}
                </Pie><Tooltip formatter={v=>[fmtAED(v,true),'']} contentStyle={{background:'var(--surface)',border:'1px solid rgba(59,130,246,0.2)',borderRadius:8,color:'var(--text-primary)',fontSize:11}}/></PieChart>
              </ResponsiveContainer>
              <div style={{flex:1,display:'flex',flexDirection:'column',gap:6}}>
                {areaBreakdown.map((item,i)=>(
                  <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <div style={{display:'flex',alignItems:'center',gap:8}}><div style={{width:8,height:8,borderRadius:2,background:COLORS[i%COLORS.length]}}/><span style={{fontSize:12,color:'var(--text-secondary)'}}>{item.name}</span></div>
                    <span style={{fontSize:12,fontWeight:600,color:'var(--text-primary)'}}>{fmtAED(item.value,true)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{background:'var(--surface)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:14,overflow:'hidden'}}>
            <div style={{padding:'16px 20px',borderBottom:'1px solid rgba(255,255,255,0.06)'}}><div style={{fontSize:14,fontWeight:600,color:'var(--text-primary)'}}>Properties</div></div>
            {properties.map((prop,i)=>{
              const gain=(prop.current_value||prop.purchase_price)-prop.purchase_price;
              const gainPct=prop.purchase_price?(gain/prop.purchase_price*100).toFixed(1):0;
              const annYield=prop.monthly_rent&&prop.current_value?(prop.monthly_rent*12/prop.current_value*100).toFixed(1):null;
              return (
                <div key={prop.id} style={{padding:'18px 20px',borderBottom:i<properties.length-1?'1px solid rgba(255,255,255,0.04)':'none',display:'flex',gap:14,alignItems:'flex-start'}}
                  onMouseEnter={e=>e.currentTarget.style.background='rgba(59,130,246,0.03)'}
                  onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                  <div style={{width:44,height:44,borderRadius:10,background:'rgba(59,130,246,0.1)',border:'1px solid rgba(59,130,246,0.2)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,fontSize:20}}>
                    {prop.property_type==='Villa'?'🏡':'🏢'}
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:14,fontWeight:700,color:'var(--text-primary)',marginBottom:2,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{prop.name}</div>
                    <div style={{fontSize:12,color:'var(--text-secondary)',marginBottom:10}}>{prop.area_display||prop.area} · {prop.property_type}{prop.size_sqft?` · ${fmtNum(prop.size_sqft)} sqft`:''}</div>
                    <div style={{display:'flex',gap:16,flexWrap:'wrap'}}>
                      {[['PURCHASED',fmtAED(prop.purchase_price,true),'var(--text-primary)'],['CURRENT',fmtAED(prop.current_value||prop.purchase_price,true),'var(--text-primary)'],['GAIN',`${gain>=0?'+':''}${fmtAED(Math.abs(gain),true)} (${gainPct}%)`,gain>=0?'#22C55E':'#F87171'],annYield?['YIELD',annYield+'%','#38BDF8']:null].filter(Boolean).map(([l,v,c],j)=>(
                        <div key={j}><div style={{fontSize:10,color:'var(--text-secondary)',marginBottom:2}}>{l}</div><div style={{fontSize:13,fontWeight:600,color:c}}>{v}</div></div>
                      ))}
                    </div>
                  </div>
                  <button onClick={()=>deleteProperty(prop.id)} disabled={deleting===prop.id} style={{background:'rgba(248,113,113,0.1)',border:'1px solid rgba(248,113,113,0.2)',borderRadius:8,cursor:'pointer',color:'#F87171',padding:'6px 10px',fontSize:12,fontFamily:'system-ui',flexShrink:0}}>
                    {deleting===prop.id?'...':'🗑️'}
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}

      {showAdd && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.7)',zIndex:2000,display:'flex',alignItems:'center',justifyContent:'center',padding:16}}>
          <div style={{background:'var(--surface)',border:'1px solid rgba(59,130,246,0.2)',borderRadius:16,padding:28,width:'100%',maxWidth:540,maxHeight:'90vh',overflowY:'auto',fontFamily:'system-ui'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
              <div style={{fontSize:18,fontWeight:700,color:'var(--text-primary)'}}>Add Property</div>
              <button onClick={()=>setShowAdd(false)} style={{background:'rgba(59,130,246,0.1)',border:'none',cursor:'pointer',color:'var(--text-muted)',padding:'4px 10px',borderRadius:8,fontSize:18}}>×</button>
            </div>
            <div style={{marginBottom:14}}><label style={lbl}>Property Name *</label><input value={form.name} onChange={e=>inp('name',e.target.value)} placeholder="e.g. Burj Vista Tower 1, Unit 2504" style={inputStyle}/></div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:14}}>
              <div>
                <label style={lbl}>Area</label>
                <input value={areaSearch||form.area} onChange={e=>{setAreaSearch(e.target.value);inp('area',e.target.value);}} placeholder="Search area..." style={inputStyle}/>
                {areaSearch && filteredAreas.length>0 && (
                  <div style={{background:'var(--bg-alt)',border:'1px solid rgba(59,130,246,0.15)',borderRadius:8,marginTop:4}}>
                    {filteredAreas.map(a=>(
                      <button key={a.key} onClick={()=>{inp('area',a.key);setAreaSearch('');}} style={{display:'block',width:'100%',padding:'8px 12px',textAlign:'left',background:'none',border:'none',cursor:'pointer',color:'var(--text-secondary)',fontSize:12,fontFamily:'system-ui'}}
                        onMouseEnter={e=>e.currentTarget.style.background='rgba(59,130,246,0.1)'}
                        onMouseLeave={e=>e.currentTarget.style.background='none'}
                      >{a.label}</button>
                    ))}
                  </div>
                )}
              </div>
              <div><label style={lbl}>Type</label><select value={form.type} onChange={e=>inp('type',e.target.value)} style={{...inputStyle,cursor:'pointer'}}>{['Apartment','Villa','Townhouse','Penthouse','Studio','Office'].map(t=><option key={t}>{t}</option>)}</select></div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:14}}>
              <div><label style={lbl}>Purchase Price (AED) *</label><input value={form.purchasePrice} onChange={e=>inp('purchasePrice',e.target.value)} placeholder="2,100,000" style={inputStyle}/></div>
              <div><label style={lbl}>Size (sq ft)</label><input value={form.size} onChange={e=>inp('size',e.target.value)} placeholder="1,200" style={inputStyle}/></div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:14}}>
              <div><label style={lbl}>Purchase Date</label><input type="date" value={form.purchaseDate} onChange={e=>inp('purchaseDate',e.target.value)} style={{...inputStyle,colorScheme:'dark'}}/></div>
              <div><label style={lbl}>Monthly Rent (AED)</label><input value={form.monthlyRent} onChange={e=>inp('monthlyRent',e.target.value)} placeholder="8,500" style={inputStyle}/></div>
            </div>
            <div style={{marginBottom:14}}>
              <label style={lbl}>Status</label>
              <div style={{display:'flex',gap:8}}>
                {['Under Construction','Ready','Off-Plan'].map(s=>(
                  <button key={s} onClick={()=>inp('status',s)} style={{flex:1,padding:'8px',borderRadius:8,border:'none',cursor:'pointer',fontSize:11,fontWeight:600,fontFamily:'system-ui',background:form.status===s?'var(--border-strong)':'rgba(59,130,246,0.06)',color:form.status===s?'#38BDF8':'var(--text-muted)'}}>{s}</button>
                ))}
              </div>
            </div>
            <div style={{marginBottom:20}}><label style={lbl}>Notes</label><textarea value={form.notes} onChange={e=>inp('notes',e.target.value)} rows={2} placeholder="Any notes..." style={{...inputStyle,resize:'vertical'}}/></div>
            <div style={{display:'flex',gap:10}}>
              <button onClick={()=>setShowAdd(false)} style={{flex:1,padding:'11px',borderRadius:10,border:'1px solid rgba(59,130,246,0.15)',background:'transparent',color:'var(--text-muted)',fontSize:13,fontWeight:600,cursor:'pointer',fontFamily:'system-ui'}}>Cancel</button>
              <button onClick={addProperty} disabled={saving||!form.name||!form.purchasePrice} style={{flex:2,padding:'11px',borderRadius:10,border:'none',cursor:'pointer',background:'linear-gradient(135deg,#1D4ED8,#38BDF8)',color:'#fff',fontSize:13,fontWeight:600,fontFamily:'system-ui',opacity:saving||!form.name||!form.purchasePrice?0.5:1}}>
                {saving?'Adding...':'+ Add to Portfolio'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
