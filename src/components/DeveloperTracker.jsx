import { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip,
         ResponsiveContainer, CartesianGrid } from 'recharts';
import { fmtAED, fmtNum } from '../utils/format';

const COLORS = ['#185FA5','#1D9E75','#D85A30','#BA7517','#7C3AED','#993556','#0F6E56','#534AB7','#633806','#72243E'];

const SORT_OPTIONS = [
  { id:'total', label:'Total value' },
  { id:'count', label:'Transactions' },
  { id:'avg',   label:'Avg deal' },
  { id:'ppsqm', label:'Price/m²' },
];

export default function DeveloperTracker() {
  const [data,     setData]     = useState(null);
  const [sortBy,   setSortBy]   = useState('total');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch('/data/developers.json')
      .then(r => r.json())
      .then(d => {
        setData(d.developers.filter(x => x.name !== 'Other'));
        setSelected(d.developers.find(x => x.name !== 'Other')?.name || null);
      });
  }, []);

  if (!data) return (
    <div style={{ padding:'3rem', textAlign:'center', color:'#9AA0AE' }}>Loading developers…</div>
  );

  const sorted = [...data].sort((a,b) => b[sortBy] - a[sortBy]);
  const selectedDev = data.find(d => d.name === selected);
  const maxVal = Math.max(...sorted.map(d => d[sortBy]));

  return (
    <div style={{ padding:'1.5rem', maxWidth:1200, margin:'0 auto' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1.5rem', flexWrap:'wrap', gap:12 }}>
        <div>
          <div style={{ fontSize:20, fontWeight:700, color:'#0A1628' }}>Developer Tracker</div>
          <div style={{ fontSize:12, color:'#9AA0AE', marginTop:2 }}>
            {data.length} major developers · 2020–2026
          </div>
        </div>
        <div style={{ display:'flex', gap:6 }}>
          {SORT_OPTIONS.map(s => (
            <button key={s.id} onClick={() => setSortBy(s.id)} style={{
              padding:'5px 12px', borderRadius:20, border:'none', cursor:'pointer',
              fontSize:11, fontWeight:600,
              background: sortBy===s.id ? '#0A1628' : '#F4F6FA',
              color:       sortBy===s.id ? '#fff' : '#7A8499',
            }}>{s.label}</button>
          ))}
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem' }}>

        {/* Bar chart ranking */}
        <div style={{ background:'#fff', border:'1px solid #E8ECF2', borderRadius:12, padding:'1.25rem' }}>
          <div style={{ fontSize:13, fontWeight:600, color:'#0A1628', marginBottom:'1rem' }}>
            Ranked by {SORT_OPTIONS.find(s=>s.id===sortBy)?.label}
          </div>
          {sorted.map((dev, i) => {
            const barW = Math.max(4, (dev[sortBy] / maxVal) * 100);
            const isSelected = dev.name === selected;
            return (
              <div key={dev.name} onClick={() => setSelected(dev.name)}
                style={{ marginBottom:10, cursor:'pointer', padding:'6px 8px', borderRadius:8,
                  background: isSelected ? '#F0F6FF' : 'transparent',
                  border: isSelected ? '1px solid #185FA5' : '1px solid transparent' }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <div style={{ width:8, height:8, borderRadius:'50%', background:COLORS[i%COLORS.length], flexShrink:0 }}/>
                    <span style={{ fontSize:12, fontWeight:600, color:'#0A1628' }}>{dev.name}</span>
                  </div>
                  <span style={{ fontSize:11, color:'#9AA0AE' }}>
                    {sortBy==='total' ? fmtAED(dev.total,true) :
                     sortBy==='count' ? fmtNum(dev.count) :
                     sortBy==='avg'   ? fmtAED(dev.avg,true) :
                     dev.ppsqm > 0   ? fmtAED(dev.ppsqm,true)+'/m²' : '—'}
                  </span>
                </div>
                <div style={{ height:6, background:'#F4F6FA', borderRadius:3, overflow:'hidden' }}>
                  <div style={{ width:`${barW}%`, height:'100%', background:COLORS[i%COLORS.length], borderRadius:3,
                    transition:'width 0.4s' }}/>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected developer detail */}
        {selectedDev && (
          <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>

            {/* KPIs */}
            <div style={{ background:'#fff', border:'1px solid #E8ECF2', borderRadius:12, padding:'1.25rem' }}>
              <div style={{ fontSize:15, fontWeight:700, color:'#0A1628', marginBottom:'1rem' }}>
                {selectedDev.name}
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8 }}>
                {[
                  { label:'Transactions', value:fmtNum(selectedDev.count), color:'#0A1628' },
                  { label:'Total value',  value:fmtAED(selectedDev.total,true), color:'#185FA5' },
                  { label:'Avg deal',     value:fmtAED(selectedDev.avg,true), color:'#1D9E75' },
                ].map(k => (
                  <div key={k.label} style={{ background:'#F8FAFC', borderRadius:8, padding:'8px 10px' }}>
                    <div style={{ fontSize:10, color:'#9AA0AE' }}>{k.label}</div>
                    <div style={{ fontSize:14, fontWeight:700, color:k.color }}>{k.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Yearly trend */}
            <div style={{ background:'#fff', border:'1px solid #E8ECF2', borderRadius:12, padding:'1.25rem', flex:1 }}>
              <div style={{ fontSize:13, fontWeight:600, color:'#0A1628', marginBottom:'1rem' }}>
                Transaction volume by year
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={selectedDev.yearly} margin={{ top:0, right:0, left:0, bottom:0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(59,130,246,0.08)"/>
                  <XAxis dataKey="year" tick={{ fontSize:11, fill:'#9AA0AE' }} axisLine={false} tickLine={false}/>
                  <YAxis hide/>
                  <Tooltip
                    formatter={(v,n) => [n==='count' ? fmtNum(v) : fmtAED(v,true), n==='count'?'Deals':'Value']}
                    contentStyle={{ background:'#0A1628', border:'none', borderRadius:8, color:'#fff', fontSize:11 }}
                  />
                  <Bar dataKey="count" fill="#38BDF8" radius={[3,3,0,0]}/>
                </BarChart>
              </ResponsiveContainer>

              <div style={{ fontSize:13, fontWeight:600, color:'#0A1628', margin:'1rem 0 0.75rem' }}>
                Value trend (AED)
              </div>
              <ResponsiveContainer width="100%" height={160}>
                <LineChart data={selectedDev.yearly} margin={{ top:4, right:16, left:0, bottom:0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(59,130,246,0.08)"/>
                  <XAxis dataKey="year" tick={{ fontSize:11, fill:'#9AA0AE' }} axisLine={false} tickLine={false}/>
                  <YAxis tick={{ fontSize:10, fill:'#9AA0AE' }} axisLine={false} tickLine={false}
                    tickFormatter={v => `${(v/1e9).toFixed(0)}B`} width={36}/>
                  <Tooltip
                    formatter={(v) => [fmtAED(v,true), 'Total value']}
                    contentStyle={{ background:'#0A1628', border:'none', borderRadius:8, color:'#fff', fontSize:11 }}
                  />
                  <Line type="monotone" dataKey="total" stroke="#22C55E" strokeWidth={2.5}
                    dot={{ r:4, fill:'#1D9E75' }}/>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
