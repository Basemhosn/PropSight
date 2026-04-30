import { useState, useMemo } from 'react';
import { fmtAED, fmtNum } from '../utils/format';

const AREA_NICE = {'Al Barsha South Fourth':'JVC','Burj Khalifa':'Downtown Dubai','Marsa Dubai':'Dubai Marina','Hadaeq Sheikh Mohammed Bin Rashid':'Dubai Hills','Al Thanyah Fifth':'JLT','Business Bay':'Business Bay','Palm Jumeirah':'Palm Jumeirah','Al Merkadh':'MBR City','Al Khairan First':'Creek Harbour'};
const niceArea = a => AREA_NICE[a] || a;

export default function ComparableSales({ recentRaw }) {
  const [area, setArea] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [minSize, setMinSize] = useState('');
  const [maxSize, setMaxSize] = useState('');
  const [regType, setRegType] = useState('');
  const [months, setMonths] = useState('12');

  const areas = useMemo(() => {
    if (!recentRaw?.length) return [];
    return [...new Set(recentRaw.map(r=>r.a||'').filter(Boolean))].sort();
  }, [recentRaw]);

  const comps = useMemo(() => {
    if (!recentRaw?.length || !area) return [];
    const cutoff = new Date();
    cutoff.setMonth(cutoff.getMonth() - parseInt(months));
    const cutoffStr = cutoff.toISOString().slice(0,10);
    return recentRaw.filter(r => {
      if ((r.a||'') !== area) return false;
      if (r.d < cutoffStr) return false;
      if (bedrooms && r.b !== bedrooms) return false;
      if (regType) { const reg=r.r==='Off'?'Off-Plan':'Ready'; if(reg!==regType)return false; }
      const sqft = (r.s||0)*10.764;
      if (minSize && sqft < parseFloat(minSize)) return false;
      if (maxSize && sqft > parseFloat(maxSize)) return false;
      return true;
    }).sort((a,b)=>(b.d||'').localeCompare(a.d||'')).slice(0,50);
  }, [recentRaw, area, bedrooms, regType, minSize, maxSize, months]);

  const stats = useMemo(() => {
    if (!comps.length) return null;
    const vals = comps.map(r=>r.v||0).filter(v=>v>0);
    const psqfts = comps.filter(r=>r.s&&r.v).map(r=>r.v/r.s/10.764);
    const sorted = [...vals].sort((a,b)=>a-b);
    return {
      count:comps.length,
      avgValue:vals.length?Math.round(vals.reduce((s,v)=>s+v,0)/vals.length):0,
      medValue:sorted.length?sorted[Math.floor(sorted.length/2)]:0,
      minValue:vals.length?Math.min(...vals):0,
      maxValue:vals.length?Math.max(...vals):0,
      avgPsqft:psqfts.length?Math.round(psqfts.reduce((s,v)=>s+v,0)/psqfts.length):0,
    };
  }, [comps]);

  const BEDROOMS = ['Studio','1 B/R','2 B/R','3 B/R','4 B/R','5 B/R'];
  const inp = {background:'var(--bg-alt)',border:'1px solid rgba(59,130,246,0.15)',borderRadius:8,color:'var(--text-primary)',fontSize:13,padding:'9px 12px',outline:'none',fontFamily:'system-ui',width:'100%',boxSizing:'border-box'};

  return (
    <div style={{flex:1,overflowY:'auto',background:'var(--bg)',fontFamily:'system-ui',padding:'24px 28px'}}>
      <div style={{marginBottom:24}}>
        <h1 style={{margin:0,fontSize:22,fontWeight:700,color:'var(--text-primary)',marginBottom:4}}>Comparable Sales</h1>
        <div style={{fontSize:13,color:'var(--text-secondary)'}}>Find similar recent transactions — filter by area, bedrooms, size and date</div>
      </div>

      <div style={{background:'var(--surface)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:14,padding:20,marginBottom:24}}>
        <div style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr 1fr',gap:12,marginBottom:12}}>
          <div>
            <label style={{fontSize:11,color:'var(--text-muted)',marginBottom:5,display:'block',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.05em'}}>Area *</label>
            <select value={area} onChange={e=>setArea(e.target.value)} style={{...inp,cursor:'pointer'}}>
              <option value="">Select area...</option>
              {areas.map(a=><option key={a} value={a}>{niceArea(a)}</option>)}
            </select>
          </div>
          <div>
            <label style={{fontSize:11,color:'var(--text-muted)',marginBottom:5,display:'block',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.05em'}}>Bedrooms</label>
            <select value={bedrooms} onChange={e=>setBedrooms(e.target.value)} style={{...inp,cursor:'pointer'}}>
              <option value="">Any</option>
              {BEDROOMS.map(b=><option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div>
            <label style={{fontSize:11,color:'var(--text-muted)',marginBottom:5,display:'block',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.05em'}}>Min Size (sqft)</label>
            <input value={minSize} onChange={e=>setMinSize(e.target.value)} placeholder="e.g. 500" style={inp}/>
          </div>
          <div>
            <label style={{fontSize:11,color:'var(--text-muted)',marginBottom:5,display:'block',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.05em'}}>Max Size (sqft)</label>
            <input value={maxSize} onChange={e=>setMaxSize(e.target.value)} placeholder="e.g. 2000" style={inp}/>
          </div>
          <div>
            <label style={{fontSize:11,color:'var(--text-muted)',marginBottom:5,display:'block',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.05em'}}>Registration</label>
            <select value={regType} onChange={e=>setRegType(e.target.value)} style={{...inp,cursor:'pointer'}}>
              <option value="">Any</option>
              <option value="Off-Plan">Off-Plan</option>
              <option value="Ready">Ready</option>
            </select>
          </div>
          <div>
            <label style={{fontSize:11,color:'var(--text-muted)',marginBottom:5,display:'block',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.05em'}}>Period</label>
            <select value={months} onChange={e=>setMonths(e.target.value)} style={{...inp,cursor:'pointer'}}>
              <option value="3">Last 3 months</option>
              <option value="6">Last 6 months</option>
              <option value="12">Last 12 months</option>
              <option value="24">Last 2 years</option>
            </select>
          </div>
        </div>
        {(area||bedrooms||minSize||maxSize||regType) && (
          <button onClick={()=>{setArea('');setBedrooms('');setMinSize('');setMaxSize('');setRegType('');}} style={{background:'none',border:'none',cursor:'pointer',color:'#F87171',fontSize:12,fontFamily:'system-ui'}}>× Clear filters</button>
        )}
      </div>

      {!area && (
        <div style={{textAlign:'center',padding:60,color:'var(--text-secondary)'}}>
          <div style={{fontSize:40,marginBottom:12}}>🔍</div>
          <div style={{fontSize:16,fontWeight:600,color:'var(--text-primary)',marginBottom:8}}>Select an area to find comparables</div>
          <div style={{fontSize:13}}>Filter by bedrooms, size and date range</div>
        </div>
      )}

      {area && comps.length===0 && (
        <div style={{textAlign:'center',padding:60,color:'var(--text-secondary)'}}>
          <div style={{fontSize:40,marginBottom:12}}>📭</div>
          <div style={{fontSize:16,color:'var(--text-primary)',marginBottom:8}}>No transactions found</div>
          <div style={{fontSize:13}}>Try widening your filters or extending the date range</div>
        </div>
      )}

      {stats && <>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(130px,1fr))',gap:12,marginBottom:24}}>
          {[['Comparables',fmtNum(stats.count),'var(--text-primary)',''],['Avg Price',fmtAED(stats.avgValue,true),'#38BDF8','rgba(59,130,246,0.1)'],['Median',fmtAED(stats.medValue,true),'var(--text-primary)',''],['Min',fmtAED(stats.minValue,true),'#22C55E','rgba(34,197,94,0.08)'],['Max',fmtAED(stats.maxValue,true),'#F87171','rgba(248,113,113,0.08)'],['Avg/sqft',stats.avgPsqft?'AED '+fmtNum(stats.avgPsqft):'N/A','#F59E0B','rgba(245,158,11,0.08)']].map(([l,v,c,bg],i)=>(
            <div key={i} style={{background:bg||'var(--surface)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:12,padding:'14px 16px'}}>
              <div style={{fontSize:10,color:'var(--text-muted)',marginBottom:5,textTransform:'uppercase',letterSpacing:'0.05em'}}>{l}</div>
              <div style={{fontSize:16,fontWeight:700,color:c}}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{background:'var(--surface)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:14,overflow:'hidden'}}>
          <div style={{padding:'16px 20px',borderBottom:'1px solid rgba(255,255,255,0.06)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div><div style={{fontSize:14,fontWeight:600,color:'var(--text-primary)'}}>Comparable Transactions</div><div style={{fontSize:12,color:'var(--text-secondary)'}}>{fmtNum(comps.length)} results in {niceArea(area)}</div></div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'90px 90px 65px 65px 1fr 80px 80px',padding:'10px 20px',borderBottom:'1px solid rgba(255,255,255,0.06)',background:'rgba(59,130,246,0.04)'}}>
            {['Date','Value','Reg','BR','Project','Size','Price/sqft'].map((h,i)=><div key={i} style={{fontSize:10,color:'var(--text-secondary)',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.05em'}}>{h}</div>)}
          </div>
          {comps.map((t,i)=>{
            const ppsqft=t.s&&t.v?Math.round(t.v/t.s/10.764):0;
            const isAbove=ppsqft&&stats.avgPsqft&&ppsqft>stats.avgPsqft;
            return (
              <div key={i} style={{display:'grid',gridTemplateColumns:'90px 90px 65px 65px 1fr 80px 80px',padding:'11px 20px',borderBottom:i<comps.length-1?'1px solid rgba(255,255,255,0.03)':'none'}}
                onMouseEnter={e=>e.currentTarget.style.background='rgba(59,130,246,0.04)'}
                onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                <div style={{fontSize:11,color:'var(--text-muted)'}}>{t.d||'—'}</div>
                <div style={{fontSize:12,fontWeight:600,color:'var(--text-primary)'}}>{t.v?fmtAED(t.v,true):'—'}</div>
                <div><span style={{fontSize:9,fontWeight:600,padding:'2px 5px',borderRadius:20,background:t.r==='Off'?'rgba(59,130,246,0.1)':'rgba(34,197,94,0.1)',color:t.r==='Off'?'#38BDF8':'#22C55E'}}>{t.r==='Off'?'Off-Plan':'Ready'}</span></div>
                <div style={{fontSize:11,color:'var(--text-secondary)'}}>{t.b||'—'}</div>
                <div style={{fontSize:11,color:'var(--text-muted)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{t.j||'—'}</div>
                <div style={{fontSize:11,color:'var(--text-muted)'}}>{t.s?fmtNum(Math.round(t.s*10.764))+' sqft':'—'}</div>
                <div style={{fontSize:11,fontWeight:600,color:isAbove?'#F87171':'#22C55E'}}>{ppsqft?'AED '+fmtNum(ppsqft):'—'}</div>
              </div>
            );
          })}
        </div>
      </>}
    </div>
  );
}
