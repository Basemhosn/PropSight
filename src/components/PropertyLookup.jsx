import { useState, useEffect, useMemo, useRef } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip,
         ResponsiveContainer, CartesianGrid, ScatterChart, Scatter } from 'recharts';
import { fmtAED, fmtNum } from '../utils/format';

const REG_MAP  = { Off:'Off-Plan', Rea:'Ready' };
const USG_MAP  = { Res:'Residential', Com:'Commercial' };

function expandRow(r) {
  return {
    txnNum:  r.n || '',
    date:    r.d || '',
    type:    r.t || 'Other',
    reg:     REG_MAP[r.r] || r.r || '',
    area:    r.a || '',
    amount:  r.v || 0,
    size:    r.s || 0,
    rooms:   r.b || '',
    project: r.j || '',
    ppsqm:   r.s > 0 && r.v > 0 ? Math.round(r.v / r.s) : 0,
  };
}

function KPI({ label, value, sub, color = '#0A1628' }) {
  return (
    <div style={{ background:'#F8FAFC', borderRadius:8, padding:'8px 10px' }}>
      <div style={{ fontSize:10, color:'#9AA0AE', marginBottom:2 }}>{label}</div>
      <div style={{ fontSize:15, fontWeight:700, color }}>{value}</div>
      {sub && <div style={{ fontSize:10, color:'#9AA0AE', marginTop:1 }}>{sub}</div>}
    </div>
  );
}

export default function PropertyLookup({ onProjectClick, projectsData }) {
  const [searchIndex, setSearchIndex] = useState([]);
  const [buildings,   setBuildings]   = useState({});
  const [query,       setQuery]       = useState('');
  const [selected,    setSelected]    = useState(null);
  const [building,    setBuilding]    = useState(null);
  const [showDropdown,setShowDropdown]= useState(false);
  const [tab,         setTab]         = useState('overview');
  const [imgError,    setImgError]    = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    fetch('/data/buildings.json')
      .then(r => r.json())
      .then(d => {
        setSearchIndex(d.index || []);
        setBuildings(d.buildings || {});
      });
  }, []);

  const suggestions = useMemo(() => {
    if (!query || query.length < 2) return [];
    const q = query.toLowerCase();
    return searchIndex
      .filter(b => b.name.toLowerCase().includes(q) || b.area.toLowerCase().includes(q))
      .slice(0, 8);
  }, [query, searchIndex]);

  const selectBuilding = (name) => {
    setSelected(name);
    setQuery(name);
    setShowDropdown(false);
    setBuilding(buildings[name] || null);
    setTab('overview');
    setImgError(false);
  };

  const txns = useMemo(() => {
    if (!building) return [];
    return (building.recent || []).map(expandRow).sort((a,b) => b.date.localeCompare(a.date));
  }, [building]);

  const priceTrend = building?.priceTrend || [];
  const rooms      = building?.rooms || [];
  const kpis       = building?.kpis || {};

  // Scatter data: size vs price
  const scatterData = txns
    .filter(r => r.size > 0 && r.amount > 0)
    .map(r => ({ size: Math.round(r.size), price: Math.round(r.amount/1e6*10)/10, date: r.date }));

  const TABS = [
    { id:'overview',  label:'Overview' },
    { id:'history',   label:'Price History' },
    { id:'units',     label:'Units' },
    { id:'txns',      label:'Transactions' },
    { id:'comps',     label:'Comparables' },
  ];

  return (
    <div style={{ padding:'1.5rem', maxWidth:1100, margin:'0 auto' }}>

      {/* Header */}
      <div style={{ marginBottom:'1.5rem' }}>
        <div style={{ fontSize:20, fontWeight:700, color:'#0A1628' }}>Property Lookup</div>
        <div style={{ fontSize:12, color:'#9AA0AE', marginTop:2 }}>
          Search any building or project — view full transaction history, price trends and comparables
        </div>
      </div>

      {/* Search */}
      <div style={{ position:'relative', marginBottom:'1.5rem', maxWidth:600 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, background:'#fff',
          border:`2px solid ${showDropdown || query ? '#185FA5' : '#E8ECF2'}`,
          borderRadius:12, padding:'10px 16px', transition:'border 0.15s' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9AA0AE" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={e => { setQuery(e.target.value); setShowDropdown(true); }}
            onFocus={() => setShowDropdown(true)}
            placeholder="Search building, tower or project name…"
            style={{ border:'none', outline:'none', fontSize:14, color:'#0A1628',
              background:'transparent', flex:1 }}
          />
          {query && (
            <button onClick={() => { setQuery(''); setSelected(null); setBuilding(null); setShowDropdown(false); }}
              style={{ background:'none', border:'none', cursor:'pointer', color:'#9AA0AE', fontSize:18 }}>×</button>
          )}
        </div>

        {/* Dropdown */}
        {showDropdown && suggestions.length > 0 && (
          <div style={{ position:'absolute', top:'calc(100% + 4px)', left:0, right:0,
            background:'#fff', border:'1px solid #E8ECF2', borderRadius:10,
            boxShadow:'0 8px 24px rgba(0,0,0,0.12)', zIndex:50, overflow:'hidden' }}>
            {suggestions.map(s => (
              <div key={s.name} onClick={() => selectBuilding(s.name)}
                style={{ padding:'10px 16px', cursor:'pointer', display:'flex',
                  justifyContent:'space-between', alignItems:'center',
                  borderBottom:'1px solid #F4F6FA' }}
                onMouseEnter={e => e.currentTarget.style.background='#F8FAFC'}
                onMouseLeave={e => e.currentTarget.style.background='#fff'}>
                <div>
                  <div style={{ fontSize:13, fontWeight:500, color:'#0A1628' }}>{s.name}</div>
                  <div style={{ fontSize:11, color:'#9AA0AE' }}>{s.area}</div>
                </div>
                <div style={{ fontSize:11, color:'#9AA0AE' }}>{fmtNum(s.count)} deals</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Empty state */}
      {!building && (
        <div style={{ textAlign:'center', padding:'4rem 2rem', color:'#9AA0AE' }}>
          <div style={{ fontSize:48, marginBottom:'1rem' }}>🏢</div>
          <div style={{ fontSize:16, fontWeight:600, color:'#0A1628', marginBottom:8 }}>
            Search any building in Dubai
          </div>
          <div style={{ fontSize:13 }}>
            773 buildings available — type a name above to get started
          </div>
          <div style={{ marginTop:'1.5rem', display:'flex', gap:8, justifyContent:'center', flexWrap:'wrap' }}>
            {['Jumeirah Gate','Business Bay','Palm Jumeirah','Dubai Marina','Downtown Dubai'].map(s => (
              <button key={s} onClick={() => { setQuery(s); setShowDropdown(true); inputRef.current?.focus(); }}
                style={{ padding:'6px 14px', borderRadius:20, border:'1px solid #E8ECF2',
                  background:'#F8FAFC', fontSize:12, cursor:'pointer', color:'#7A8499' }}>
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Building detail */}
      {building && (
        <div>
          {/* Hero */}
          <div style={{ display:'flex', gap:'1.5rem', marginBottom:'1.5rem', flexWrap:'wrap' }}>
            {/* Image */}
            <div style={{ width:220, height:160, borderRadius:12, overflow:'hidden', flexShrink:0 }}>
              {!imgError && building.image ? (
                <img src={building.image} alt={selected} onError={() => setImgError(true)}
                  style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
              ) : (
                <div style={{ width:'100%', height:'100%',
                  background:'linear-gradient(135deg,#0A1628 0%,#185FA5 100%)',
                  display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem' }}>
                  <div style={{ fontSize:13, fontWeight:600, color:'#fff', textAlign:'center' }}>{selected}</div>
                </div>
              )}
            </div>

            {/* KPIs */}
            <div style={{ flex:1, minWidth:300 }}>
              <div style={{ fontSize:18, fontWeight:700, color:'#0A1628', marginBottom:4 }}>{selected}</div>
              <div style={{ fontSize:12, color:'#9AA0AE', marginBottom:'1rem' }}>{building.area}</div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8 }}>
                <KPI label="Transactions"   value={fmtNum(kpis.count)}       />
                <KPI label="Total value"    value={fmtAED(kpis.total,true)}  color="#38BDF8" />
                <KPI label="Avg deal"       value={fmtAED(kpis.avg,true)}    />
                <KPI label="Price/m²"       value={kpis.ppsqm>0?fmtAED(kpis.ppsqm,true):'—'} color="#22C55E" />
              </div>

              {/* Open in Projects button */}
              {projectsData?.[selected] && (
                <button onClick={() => onProjectClick && onProjectClick(selected, projectsData[selected])}
                  style={{ marginTop:'0.75rem', padding:'7px 16px', background:'#185FA5', color:'#fff',
                    border:'none', borderRadius:8, fontSize:12, fontWeight:600, cursor:'pointer' }}>
                  View full project details →
                </button>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display:'flex', borderBottom:'1px solid #E8ECF2', marginBottom:'1.25rem' }}>
            {TABS.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                padding:'8px 16px', fontSize:12, fontWeight:tab===t.id?600:400,
                color: tab===t.id ? '#185FA5' : '#7A8499',
                background:'none', border:'none', cursor:'pointer',
                borderBottom: tab===t.id ? '2px solid #185FA5' : '2px solid transparent',
              }}>{t.label}</button>
            ))}
          </div>

          {/* ── OVERVIEW ── */}
          {tab === 'overview' && (
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.25rem' }}>
              {/* Monthly volume */}
              <div style={{ background:'#fff', border:'1px solid #E8ECF2', borderRadius:12, padding:'1rem' }}>
                <div style={{ fontSize:12, fontWeight:600, color:'#0A1628', marginBottom:'0.75rem' }}>
                  Transaction volume
                </div>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={building.monthly || []} margin={{top:0,right:0,left:0,bottom:0}}>
                    <XAxis dataKey="month" tick={{fontSize:9,fill:'#9AA0AE'}} axisLine={false} tickLine={false}
                      tickFormatter={m => { const [,mo]=m.split('-'); return ['J','F','M','A','M','J','J','A','S','O','N','D'][+mo-1]; }}/>
                    <YAxis hide/>
                    <Tooltip formatter={v=>[fmtNum(v),'Deals']}
                      contentStyle={{background:'#0A1628',border:'none',borderRadius:8,color:'#fff',fontSize:11}}/>
                    <Bar dataKey="count" fill="#38BDF8" radius={[2,2,0,0]}/>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Size vs Price scatter */}
              <div style={{ background:'#fff', border:'1px solid #E8ECF2', borderRadius:12, padding:'1rem' }}>
                <div style={{ fontSize:12, fontWeight:600, color:'#0A1628', marginBottom:'0.75rem' }}>
                  Size vs Price (recent deals)
                </div>
                <ResponsiveContainer width="100%" height={180}>
                  <ScatterChart margin={{top:4,right:16,left:0,bottom:0}}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(59,130,246,0.08)"/>
                    <XAxis dataKey="size" name="Size" unit="m²"
                      tick={{fontSize:10,fill:'#9AA0AE'}} axisLine={false} tickLine={false}/>
                    <YAxis dataKey="price" name="Price" unit="M"
                      tick={{fontSize:10,fill:'#9AA0AE'}} axisLine={false} tickLine={false} width={36}/>
                    <Tooltip cursor={{strokeDasharray:'3 3'}}
                      formatter={(v,n) => [n==='Size'?v+'m²':'AED '+v+'M', n]}
                      contentStyle={{background:'#0A1628',border:'none',borderRadius:8,color:'#fff',fontSize:11}}/>
                    <Scatter data={scatterData} fill="#38BDF8" opacity={0.7} r={4}/>
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* ── PRICE HISTORY ── */}
          {tab === 'history' && (
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.25rem' }}>
              <div style={{ background:'#fff', border:'1px solid #E8ECF2', borderRadius:12, padding:'1rem' }}>
                <div style={{ fontSize:12, fontWeight:600, color:'#0A1628', marginBottom:'0.75rem' }}>
                  Price per m² trend
                </div>
                {priceTrend.length > 0 ? (
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={priceTrend} margin={{top:4,right:16,left:0,bottom:0}}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(59,130,246,0.08)"/>
                      <XAxis dataKey="year" tick={{fontSize:11,fill:'#9AA0AE'}} axisLine={false} tickLine={false}/>
                      <YAxis tick={{fontSize:10,fill:'#9AA0AE'}} axisLine={false} tickLine={false}
                        tickFormatter={v=>fmtAED(v,true)} width={72}/>
                      <Tooltip formatter={v=>[fmtAED(v,true)+'/m²','Price']}
                        contentStyle={{background:'#0A1628',border:'none',borderRadius:8,color:'#fff',fontSize:11}}/>
                      <Line type="monotone" dataKey="ppsqm" stroke="#22C55E" strokeWidth={2.5}
                        dot={{r:4,fill:'#1D9E75'}}/>
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div style={{textAlign:'center',padding:'3rem',color:'#9AA0AE',fontSize:13}}>
                    Not enough data for price trend
                  </div>
                )}
              </div>

              <div style={{ background:'#fff', border:'1px solid #E8ECF2', borderRadius:12, padding:'1rem' }}>
                <div style={{ fontSize:12, fontWeight:600, color:'#0A1628', marginBottom:'0.75rem' }}>
                  Recent deal prices
                </div>
                {txns.slice(0,15).map((r,i) => (
                  <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center',
                    padding:'7px 0', borderBottom:'1px solid #F4F6FA' }}>
                    <div>
                      <div style={{ fontSize:12, fontWeight:600, color:'#0A1628' }}>{fmtAED(r.amount)}</div>
                      <div style={{ fontSize:10, color:'#9AA0AE' }}>
                        {r.date} {r.rooms && `· ${r.rooms}`} {r.size>0 && `· ${fmtNum(r.size)}m²`}
                      </div>
                    </div>
                    <div style={{ textAlign:'right' }}>
                      {r.ppsqm > 0 && <div style={{ fontSize:11, color:'#1D9E75', fontWeight:600 }}>
                        {fmtAED(r.ppsqm)}/m²
                      </div>}
                      <span style={{ fontSize:10, padding:'2px 7px', borderRadius:20, fontWeight:600,
                        background:r.type==='Sale'?'#EDF4FC':'#FEF3E2',
                        color:r.type==='Sale'?'#185FA5':'#BA7517' }}>{r.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── UNITS ── */}
          {tab === 'units' && (
            <div style={{ background:'#fff', border:'1px solid #E8ECF2', borderRadius:12, padding:'1.25rem' }}>
              <div style={{ fontSize:13, fontWeight:600, color:'#0A1628', marginBottom:'1rem' }}>
                Breakdown by bedroom type
              </div>
              {rooms.length > 0 ? (
                <>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:10, marginBottom:'1.25rem' }}>
                    {rooms.map((r,i) => (
                      <div key={r.rooms} style={{ background:'#F8FAFC', borderRadius:10, padding:'0.875rem' }}>
                        <div style={{ fontSize:13, fontWeight:600, color:'#0A1628', marginBottom:6 }}>{r.rooms}</div>
                        <div style={{ fontSize:11, color:'#9AA0AE', lineHeight:1.8 }}>
                          <div>{fmtNum(r.count)} transactions</div>
                          <div>Avg price: <strong style={{color:'#185FA5'}}>{fmtAED(r.avg,true)}</strong></div>
                          {r.avgSize > 0 && <div>Avg size: <strong style={{color:'#0A1628'}}>{r.avgSize}m²</strong></div>}
                        </div>
                      </div>
                    ))}
                  </div>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={rooms} margin={{top:0,right:0,left:0,bottom:0}}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(59,130,246,0.08)"/>
                      <XAxis dataKey="rooms" tick={{fontSize:11,fill:'#9AA0AE'}} axisLine={false} tickLine={false}/>
                      <YAxis hide/>
                      <Tooltip formatter={v=>[fmtNum(v),'Units']}
                        contentStyle={{background:'#0A1628',border:'none',borderRadius:8,color:'#fff',fontSize:11}}/>
                      <Bar dataKey="count" fill="#38BDF8" radius={[3,3,0,0]}/>
                    </BarChart>
                  </ResponsiveContainer>
                </>
              ) : (
                <div style={{textAlign:'center',padding:'2rem',color:'#9AA0AE',fontSize:13}}>
                  No unit breakdown available for this building
                </div>
              )}
            </div>
          )}

          {/* ── COMPARABLES ── */}
          {tab === 'comps' && (
            <div>
              <div style={{ fontSize:13, color:'#7A8499', marginBottom:'1rem' }}>
                Similar deals in <strong style={{color:'#0A1628'}}>{building.area}</strong> — same area, last 90 days
              </div>
              {(() => {
                // Find comparable transactions from areas data using window-level cache
                const comps = txns.filter(r =>
                  r.size > 0 &&
                  txns[0]?.size > 0 &&
                  Math.abs(r.size - (txns[0]?.size || 0)) / (txns[0]?.size || 1) < 0.4
                ).slice(0,20);
                if (comps.length === 0) return (
                  <div style={{textAlign:'center',padding:'2rem',color:'#9AA0AE',fontSize:13}}>
                    No comparable sales data available
                  </div>
                );
                const avgComp = comps.reduce((s,r)=>s+r.ppsqm,0)/comps.length;
                const lastPpsqm = txns[0]?.ppsqm || 0;
                const vsAvg = lastPpsqm > 0 && avgComp > 0 ? ((lastPpsqm-avgComp)/avgComp*100).toFixed(1) : null;
                return (
                  <div>
                    {vsAvg !== null && (
                      <div style={{background: +vsAvg >= 0 ? '#E1F5EE' : '#FEF3E2', borderRadius:10,
                        padding:'10px 14px', marginBottom:'1rem', fontSize:13}}>
                        Latest deal price/m² is <strong style={{color:+vsAvg>=0?'#1D9E75':'#D85A30'}}>
                        {vsAvg >= 0 ? '+' : ''}{vsAvg}%</strong> vs comparable sales in this area
                      </div>
                    )}
                    <div style={{ background:'#fff', border:'1px solid #E8ECF2', borderRadius:12, overflow:'hidden' }}>
                      <table style={{width:'100%',borderCollapse:'collapse',fontSize:12}}>
                        <thead>
                          <tr style={{borderBottom:'2px solid #E8ECF2'}}>
                            {['Project','Date','Size','Amount','Price/m²','Rooms'].map(h=>(
                              <th key={h} style={{padding:'8px 10px',textAlign:'left',fontSize:11,color:'#9AA0AE',fontWeight:600}}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {comps.map((r,i)=>(
                            <tr key={i} style={{borderBottom:'1px solid #F4F6FA'}}
                              onMouseEnter={e=>e.currentTarget.style.background='#F8FAFC'}
                              onMouseLeave={e=>e.currentTarget.style.background='#fff'}>
                              <td style={{padding:'8px 10px',color:'#0A1628',maxWidth:160,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{r.project||'—'}</td>
                              <td style={{padding:'8px 10px',color:'#7A8499'}}>{r.date}</td>
                              <td style={{padding:'8px 10px',color:'#7A8499'}}>{fmtNum(r.size)}m²</td>
                              <td style={{padding:'8px 10px',fontWeight:600,color:'#185FA5'}}>{fmtAED(r.amount)}</td>
                              <td style={{padding:'8px 10px',fontWeight:600,color:'#1D9E75'}}>{r.ppsqm>0?fmtAED(r.ppsqm):'—'}</td>
                              <td style={{padding:'8px 10px',color:'#7A8499'}}>{r.rooms||'—'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

        {/* ── TRANSACTIONS ── */}
          {tab === 'txns' && (
            <div style={{ background:'#fff', border:'1px solid #E8ECF2', borderRadius:12, padding:'1.25rem' }}>
              <div style={{ fontSize:13, fontWeight:600, color:'#0A1628', marginBottom:'1rem' }}>
                Transaction history ({txns.length} records)
              </div>
              <div style={{ overflowX:'auto' }}>
                <table style={{ width:'100%', borderCollapse:'collapse', fontSize:12 }}>
                  <thead>
                    <tr style={{ borderBottom:'2px solid #E8ECF2' }}>
                      {['Date','Amount','Size','Price/m²','Type','Status','Rooms'].map(h => (
                        <th key={h} style={{ padding:'8px 10px', textAlign:'left',
                          fontSize:11, color:'#9AA0AE', fontWeight:600, whiteSpace:'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {txns.map((r,i) => (
                      <tr key={i} style={{ borderBottom:'1px solid #F4F6FA' }}
                        onMouseEnter={e=>e.currentTarget.style.background='#F8FAFC'}
                        onMouseLeave={e=>e.currentTarget.style.background='#fff'}>
                        <td style={{ padding:'8px 10px', color:'#0A1628' }}>{r.date}</td>
                        <td style={{ padding:'8px 10px', fontWeight:600, color:'#185FA5' }}>{fmtAED(r.amount)}</td>
                        <td style={{ padding:'8px 10px', color:'#7A8499' }}>{r.size>0?fmtNum(r.size)+'m²':'—'}</td>
                        <td style={{ padding:'8px 10px', color:'#1D9E75', fontWeight:500 }}>{r.ppsqm>0?fmtAED(r.ppsqm):'—'}</td>
                        <td style={{ padding:'8px 10px' }}>
                          <span style={{ fontSize:10, padding:'2px 7px', borderRadius:20, fontWeight:600,
                            background:r.type==='Sale'?'#EDF4FC':r.type==='Mortgage'?'#FEF3E2':'#E1F5EE',
                            color:r.type==='Sale'?'#185FA5':r.type==='Mortgage'?'#BA7517':'#0F6E56' }}>{r.type}</span>
                        </td>
                        <td style={{ padding:'8px 10px' }}>
                          {r.reg && <span style={{ fontSize:10, padding:'2px 7px', borderRadius:20, fontWeight:600,
                            background:r.reg==='Off-Plan'?'#EDF4FC':'#E1F5EE',
                            color:r.reg==='Off-Plan'?'#185FA5':'#0F6E56' }}>{r.reg}</span>}
                        </td>
                        <td style={{ padding:'8px 10px', color:'#7A8499' }}>{r.rooms || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
