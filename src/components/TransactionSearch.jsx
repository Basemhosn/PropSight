import { t } from '../i18n';
import { useState, useMemo, useCallback } from 'react';
import { fmtAED, fmtNum } from '../utils/format';

const REG = { Off:'Off-Plan', Rea:'Ready', Mor:'Mortgage' };
const USG = { Res:'Residential', Com:'Commercial', Mul:'Multi-Use', Ind:'Industrial', Hos:'Hospitality' };

export default function TransactionSearch({ recentRaw }) {
  const lang = localStorage.getItem('lang') || 'en';
  const [search, setSearch] = useState('');
  const [typeF, setTypeF] = useState('');
  const [regF, setRegF] = useState('');
  const [minVal, setMinVal] = useState('');
  const [maxVal, setMaxVal] = useState('');
  const [pg, setPg] = useState(1);
  const PER = 50;

  const rows = useMemo(() => {
    if (!recentRaw?.length) return [];
    return recentRaw.map(r => ({
      id:r.n, date:r.d, type:r.t||'Sale',
      reg:REG[r.r]||r.r||'', usage:USG[r.u]||r.u||'',
      area:r.a||'', project:r.j||'',
      value:r.v||0, size:r.s||0, rooms:r.b||'',
      ppsqft: r.s>0 ? Math.round((r.v||0)/r.s/10.764) : 0,
    }));
  }, [recentRaw]);

  const filtered = useMemo(() => {
    let res = rows;
    if (search) { const q=search.toLowerCase(); res=res.filter(r=>r.area.toLowerCase().includes(q)||r.project.toLowerCase().includes(q)||r.id.includes(q)); }
    if (typeF) res=res.filter(r=>r.type===typeF);
    if (regF) res=res.filter(r=>r.reg===regF);
    if (minVal) res=res.filter(r=>r.value>=parseFloat(minVal.replace(/,/g,''))*1e6);
    if (maxVal) res=res.filter(r=>r.value<=parseFloat(maxVal.replace(/,/g,''))*1e6);
    return res;
  }, [rows, search, typeF, regF, minVal, maxVal]);

  const paged = filtered.slice((pg-1)*PER, pg*PER);
  const totalPages = Math.ceil(filtered.length/PER);

  const exportCSV = useCallback(() => {
    const header = 'ID,Date,Type,Reg,Area,Project,Value (AED),Size (sqft),Price/sqft\n';
    const body = filtered.map(r=>`${r.id},${r.date},${r.type},${r.reg},"${r.area}","${r.project}",${r.value},${Math.round(r.size*10.764)},${r.ppsqft}`).join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([header+body],{type:'text/csv'}));
    a.download = 'propsight-transactions.csv'; a.click();
  }, [filtered]);

  const inp = {background:'var(--bg-alt)',border:'1px solid rgba(59,130,246,0.15)',borderRadius:8,color:'var(--text-primary)',fontSize:12,padding:'8px 12px',outline:'none',fontFamily:'system-ui'};
  const TC = {Sale:{bg:'rgba(59,130,246,0.1)',color:'#38BDF8'},Mortgage:{bg:'rgba(34,197,94,0.1)',color:'#22C55E'},Gift:{bg:'rgba(245,158,11,0.1)',color:'#F59E0B'}};
  const RC = {'Off-Plan':{bg:'rgba(59,130,246,0.1)',color:'#38BDF8'},'Ready':{bg:'rgba(34,197,94,0.1)',color:'#22C55E'}};

  return (
    <div style={{flex:1,overflowY:'auto',background:'var(--bg)',fontFamily:'system-ui',padding:'24px 28px'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
        <div>
          <h1 style={{margin:0,fontSize:22,fontWeight:700,color:'var(--text-primary)',marginBottom:4}}>{t('Transaction Search',lang)}</h1>
          <div style={{fontSize:13,color:'var(--text-secondary)'}}>{fmtNum(filtered.length)} of {fmtNum(rows.length)} transactions</div>
        </div>
        <button onClick={exportCSV} style={{display:'flex',alignItems:'center',gap:8,padding:'9px 16px',borderRadius:10,border:'1px solid rgba(59,130,246,0.2)',background:'rgba(59,130,246,0.06)',color:'#38BDF8',cursor:'pointer',fontSize:13,fontWeight:600,fontFamily:'system-ui'}}>{t('Export CSV',lang)}</button>
      </div>
      <div style={{background:'var(--surface)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:12,padding:16,marginBottom:20}}>
        <div style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr',gap:10}}>
          <div style={{display:'flex',alignItems:'center',gap:8,background:'var(--bg-alt)',border:'1px solid rgba(59,130,246,0.15)',borderRadius:8,padding:'8px 12px'}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input value={search} onChange={e=>{setSearch(e.target.value);setPg(1);}} placeholder={t("Search area project",lang)} style={{background:'none',border:'none',outline:'none',color:'var(--text-secondary)',fontSize:13,flex:1,fontFamily:'system-ui'}}/>
          </div>
          <select value={typeF} onChange={e=>{setTypeF(e.target.value);setPg(1);}} style={{...inp,cursor:'pointer'}}><option value="">{t('All types',lang)}</option><option>Sale</option><option>Mortgage</option><option>Gift</option></select>
          <select value={regF} onChange={e=>{setRegF(e.target.value);setPg(1);}} style={{...inp,cursor:'pointer'}}><option value="">{t('All registrations',lang)}</option><option>Off-Plan</option><option>Ready</option></select>
          <input value={minVal} onChange={e=>{setMinVal(e.target.value);setPg(1);}} placeholder="Min (M AED)" style={inp}/>
          <input value={maxVal} onChange={e=>{setMaxVal(e.target.value);setPg(1);}} placeholder="Max (M AED)" style={inp}/>
        </div>
        {(search||typeF||regF||minVal||maxVal) && <button onClick={()=>{setSearch('');setTypeF('');setRegF('');setMinVal('');setMaxVal('');setPg(1);}} style={{marginTop:10,background:'none',border:'none',cursor:'pointer',color:'#F87171',fontSize:12,fontFamily:'system-ui'}}>× Clear filters</button>}
      </div>
      <div style={{background:'var(--surface)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:14,overflow:'hidden'}}>
        <div style={{display:'grid',gridTemplateColumns:'130px 90px 70px 80px 1fr 1fr 100px 80px 70px',padding:'10px 16px',borderBottom:'1px solid rgba(255,255,255,0.06)',background:'rgba(59,130,246,0.04)'}}>
          {[t('TXN ID',lang),t('Date',lang),t('Type',lang),t('Reg',lang),t('Area',lang),t('Project',lang),t('Value',lang),t('Size',lang),t('Price/sqft',lang)].map((h,i)=><div key={i} style={{fontSize:10,color:'var(--text-secondary)',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.06em'}}>{h}</div>)}
        </div>
        {paged.length===0 ? <div style={{textAlign:'center',padding:40,color:'var(--text-secondary)'}}>{t('No transactions match filters',lang)}</div>
        : paged.map((r,i)=>{
          const tc=TC[r.type]||{bg:'rgba(100,116,139,0.1)',color:'var(--text-secondary)'};
          const rc=RC[r.reg]||{bg:'rgba(100,116,139,0.1)',color:'var(--text-secondary)'};
          return (
            <div key={r.id} style={{display:'grid',gridTemplateColumns:'130px 90px 70px 80px 1fr 1fr 100px 80px 70px',padding:'11px 16px',borderBottom:i<paged.length-1?'1px solid rgba(255,255,255,0.03)':'none',transition:'background 0.1s'}}
              onMouseEnter={e=>e.currentTarget.style.background='rgba(59,130,246,0.04)'}
              onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
              <div style={{fontSize:11,color:'var(--text-secondary)',fontFamily:'monospace'}}>{r.id}</div>
              <div style={{fontSize:12,color:'var(--text-muted)'}}>{r.date}</div>
              <div><span style={{fontSize:10,fontWeight:600,padding:'2px 7px',borderRadius:20,background:tc.bg,color:tc.color}}>{r.type}</span></div>
              <div><span style={{fontSize:10,fontWeight:600,padding:'2px 7px',borderRadius:20,background:rc.bg,color:rc.color}}>{r.reg}</span></div>
              <div style={{fontSize:12,color:'var(--text-secondary)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',paddingRight:8}}>{r.area}</div>
              <div style={{fontSize:11,color:'var(--text-muted)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',paddingRight:8}}>{r.project||'—'}</div>
              <div style={{fontSize:13,fontWeight:600,color:'var(--text-primary)'}}>{fmtAED(r.value,true)}</div>
              <div style={{fontSize:12,color:'var(--text-muted)'}}>{r.size?fmtNum(Math.round(r.size*10.764))+' sqft':'—'}</div>
              <div style={{fontSize:12,color:'#38BDF8'}}>{r.ppsqft?'AED '+fmtNum(r.ppsqft):'—'}</div>
            </div>
          );
        })}
      </div>
      {totalPages>1 && (
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:8,marginTop:20}}>
          <button onClick={()=>setPg(p=>Math.max(1,p-1))} disabled={pg===1} style={{padding:'7px 14px',borderRadius:8,border:'1px solid rgba(59,130,246,0.2)',background:'rgba(59,130,246,0.06)',color:pg===1?'var(--text-faint)':'var(--text-muted)',cursor:pg===1?'default':'pointer',fontSize:12,fontFamily:'system-ui'}}>{t('Prev',lang)}</button>
          <span style={{fontSize:12,color:'var(--text-muted)'}}>{t('Page',lang)} {pg} {t('of',lang)} {totalPages}</span>
          <button onClick={()=>setPg(p=>Math.min(totalPages,p+1))} disabled={pg===totalPages} style={{padding:'7px 14px',borderRadius:8,border:'1px solid rgba(59,130,246,0.2)',background:'rgba(59,130,246,0.06)',color:pg===totalPages?'var(--text-faint)':'var(--text-muted)',cursor:pg===totalPages?'default':'pointer',fontSize:12,fontFamily:'system-ui'}}>{t('Next',lang)}</button>
        </div>
      )}
    </div>
  );
}
