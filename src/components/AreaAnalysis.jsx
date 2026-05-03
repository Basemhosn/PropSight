import { t } from '../i18n';
import { useState } from 'react';
import AreaDeepDive from './AreaDeepDive';
import ComparableSales from './ComparableSales';

export default function AreaAnalysis({ areaData, recentRaw }) {
  const lang = localStorage.getItem('lang') || 'en';
  const [tab, setTab] = useState('overview');

  return (
    <div style={{flex:1,display:'flex',flexDirection:'column',background:'var(--bg)',fontFamily:'system-ui',overflow:'hidden'}}>
      <div style={{padding:'12px 28px 0',borderBottom:'1px solid rgba(59,130,246,0.08)',display:'flex',justifyContent:'flex-end'}}>
        <div style={{display:'flex',gap:6,background:'var(--surface)',border:'1px solid rgba(59,130,246,0.15)',borderRadius:10,padding:4,marginBottom:12}}>
          {[['overview',t('Area Overview',lang)],['comps',t('Comparable Sales tab',lang)]].map(([tabId,l])=>(
            <button key={tabId} onClick={()=>setTab(tabId)} style={{padding:'7px 16px',borderRadius:8,border:'none',cursor:'pointer',fontSize:13,fontFamily:'system-ui',fontWeight:tab===tabId?600:400,background:tab===tabId?'linear-gradient(135deg,#1D4ED8,#38BDF8)':'transparent',color:tab===tabId?'#fff':'var(--text-muted)'}}>{l}</button>
          ))}
        </div>
      </div>
      {tab==='overview'
        ? <AreaDeepDive areaData={areaData} areaList={areaData ? Object.keys(areaData).sort() : []} />
        : <div style={{flex:1,overflowY:'auto',padding:'20px 28px'}}><ComparableSales recentRaw={recentRaw} /></div>
      }
    </div>
  );
}
