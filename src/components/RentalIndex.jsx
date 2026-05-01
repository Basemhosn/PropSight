import { t } from '../i18n';
import { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { fmtAED, fmtNum } from '../utils/format';

const AREAS = ['Dubai Marina','Downtown Dubai','JVC','Business Bay','Dubai Hills Estate','Palm Jumeirah','JLT','MBR City','Creek Harbour','Damac Hills','Arabian Ranches','Mirdif','Deira','Bur Dubai','Al Barsha'];
const BEDROOMS = ['Studio','1 B/R','2 B/R','3 B/R','4 B/R'];
const BR_KEY = {'Studio':'studio','1 B/R':'1br','2 B/R':'2br','3 B/R':'3br','4 B/R':'4br'};

const RENTAL_DATA = {
  'Dubai Marina':       {studio:65000,'1br':95000,'2br':145000,'3br':210000,'4br':320000,yield:5.8,trend:8.2},
  'Downtown Dubai':     {studio:75000,'1br':115000,'2br':175000,'3br':280000,'4br':450000,yield:5.2,trend:9.1},
  'JVC':                {studio:38000,'1br':58000,'2br':82000,'3br':115000,'4br':160000,yield:7.8,trend:12.3},
  'Business Bay':       {studio:55000,'1br':85000,'2br':130000,'3br':190000,'4br':280000,yield:6.1,trend:7.4},
  'Dubai Hills Estate': {studio:55000,'1br':90000,'2br':145000,'3br':220000,'4br':380000,yield:5.9,trend:10.2},
  'Palm Jumeirah':      {studio:95000,'1br':145000,'2br':240000,'3br':380000,'4br':650000,yield:4.8,trend:6.3},
  'JLT':                {studio:45000,'1br':70000,'2br':105000,'3br':155000,'4br':220000,yield:7.2,trend:8.8},
  'MBR City':           {studio:60000,'1br':95000,'2br':150000,'3br':230000,'4br':350000,yield:5.6,trend:11.4},
  'Creek Harbour':      {studio:65000,'1br':100000,'2br':160000,'3br':250000,'4br':380000,yield:5.4,trend:13.2},
  'Damac Hills':        {studio:40000,'1br':65000,'2br':100000,'3br':155000,'4br':240000,yield:6.8,trend:7.9},
  'Arabian Ranches':    {studio:0,'1br':0,'2br':130000,'3br':195000,'4br':290000,yield:5.1,trend:5.8},
  'Mirdif':             {studio:32000,'1br':48000,'2br':72000,'3br':105000,'4br':145000,yield:8.2,trend:6.1},
  'Deira':              {studio:28000,'1br':42000,'2br':62000,'3br':90000,'4br':130000,yield:9.1,trend:4.2},
  'Bur Dubai':          {studio:30000,'1br':45000,'2br':68000,'3br':98000,'4br':140000,yield:8.8,trend:4.8},
  'Al Barsha':          {studio:35000,'1br':55000,'2br':82000,'3br':120000,'4br':170000,yield:7.9,trend:5.5},
};

function Card({label,value,sub,subColor='var(--text-muted)',accent}) {
  return (
    <div style={{background:'var(--surface)',border:`1px solid ${accent||'rgba(255,255,255,0.06)'}`,borderRadius:12,padding:'16px 18px',flex:1,minWidth:0}}>
      <div style={{fontSize:11,color:'var(--text-muted)',fontWeight:500,marginBottom:6,textTransform:'uppercase',letterSpacing:'0.06em'}}>{label}</div>
      <div style={{fontSize:22,fontWeight:700,color:'var(--text-primary)',marginBottom:4}}>{value}</div>
      {sub && <div style={{fontSize:12,color:subColor,fontWeight:500}}>{sub}</div>}
    </div>
  );
}

export default function RentalIndex({ areaData }) {
  const [selectedArea, setSelectedArea] = useState('Dubai Marina');
  const [selectedBR, setSelectedBR] = useState('2 B/R');
  const [viewMode, setViewMode] = useState('overview');
  const [calcArea, setCalcArea] = useState('Dubai Marina');
  const [calcBR, setCalcBR] = useState('2 B/R');
  const [calcSize, setCalcSize] = useState('');
  const [calcUnit, setCalcUnit] = useState('sqft');

  const d = RENTAL_DATA[selectedArea]||{};
  const brKey = BR_KEY[selectedBR]||'2br';
  const annualRent = d[brKey]||0;
  const monthlyRent = Math.round(annualRent/12);

  const compData = useMemo(()=>AREAS.map(a=>({name:a.split(' ').slice(0,2).join(' '),annual:RENTAL_DATA[a]?.[brKey]||0,yield:RENTAL_DATA[a]?.yield||0})).filter(x=>x.annual>0).sort((a,b)=>b.annual-a.annual),[brKey]);
  const yieldData = AREAS.map(a=>({name:a.split(' ').slice(0,2).join(' '),yield:RENTAL_DATA[a]?.yield||0})).sort((a,b)=>b.yield-a.yield);

  const cd = RENTAL_DATA[calcArea]||{};
  const cbKey = BR_KEY[calcBR]||'2br';
  const cAnnual = cd[cbKey]||0;
  const cSizeNum = parseFloat(calcSize)||0;
  const cSizeSqm = calcUnit==='sqft' ? cSizeNum/10.764 : cSizeNum;
  const cPsqm = areaData?.[Object.keys(areaData||{}).find(k=>k.toLowerCase().includes(calcArea.split(' ')[0].toLowerCase()))]?.kpis?.ppsqm||0;
  const cValue = cSizeSqm*cPsqm;
  const gYield = cValue&&cAnnual ? (cAnnual/cValue*100).toFixed(2) : cd.yield;
  const nYield = gYield ? (parseFloat(gYield)*0.78).toFixed(2) : 0;

  const lang = localStorage.getItem('lang') || 'en';
  const inp = {background:'var(--bg-alt)',border:'1px solid rgba(59,130,246,0.15)',borderRadius:8,color:'var(--text-primary)',fontSize:13,padding:'9px 12px',outline:'none',fontFamily:'system-ui',width:'100%',boxSizing:'border-box'};
  const tt = {contentStyle:{background:'var(--surface)',border:'1px solid rgba(59,130,246,0.2)',borderRadius:8,color:'var(--text-primary)',fontSize:11}};

  return (
    <div style={{flex:1,overflowY:'auto',background:'var(--bg)',fontFamily:'system-ui',padding:'24px 28px'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:24}}>
        <div>
          <h1 style={{margin:0,fontSize:22,fontWeight:700,color:'var(--text-primary)',marginBottom:4}}>{t('Rental Index',lang)}</h1>
          <div style={{fontSize:13,color:'var(--text-secondary)'}}>{t('Rental subtitle',lang)}</div>
        </div>
        <div style={{display:'flex',gap:6,background:'var(--surface)',border:'1px solid rgba(59,130,246,0.15)',borderRadius:10,padding:4}}>
          {[['overview',t('Overview',lang)],['calculator',t('Yield Calculator',lang)]].map(([m,l])=>(
            <button key={m} onClick={()=>setViewMode(m)} style={{padding:'8px 18px',borderRadius:8,border:'none',cursor:'pointer',fontSize:13,fontFamily:'system-ui',fontWeight:viewMode===m?600:400,background:viewMode===m?'linear-gradient(135deg,#1D4ED8,#38BDF8)':'transparent',color:viewMode===m?'#fff':'var(--text-muted)'}}>{l}</button>
          ))}
        </div>
      </div>

      {viewMode==='overview' && <>
        <div style={{display:'flex',gap:10,marginBottom:20,flexWrap:'wrap',alignItems:'flex-end'}}>
          <div>
            <div style={{fontSize:11,color:'var(--text-muted)',marginBottom:6,fontWeight:600}}>AREA</div>
            <select value={selectedArea} onChange={e=>setSelectedArea(e.target.value)} style={{...inp,width:'auto',cursor:'pointer'}}>
              {AREAS.map(a=><option key={a}>{a}</option>)}
            </select>
          </div>
          <div>
            <div style={{fontSize:11,color:'var(--text-muted)',marginBottom:6,fontWeight:600}}>BEDROOMS</div>
            <div style={{display:'flex',gap:6}}>
              {BEDROOMS.map(br=>(
                <button key={br} onClick={()=>setSelectedBR(br)} style={{padding:'8px 14px',borderRadius:8,border:'none',cursor:'pointer',fontSize:12,fontFamily:'system-ui',fontWeight:selectedBR===br?600:400,background:selectedBR===br?'linear-gradient(135deg,#1D4ED8,#38BDF8)':'rgba(59,130,246,0.06)',color:selectedBR===br?'#fff':'var(--text-muted)'}}>{br}</button>
              ))}
            </div>
          </div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))',gap:12,marginBottom:24}}>
          <Card label={t("Annual Rent",lang)} value={annualRent?fmtAED(annualRent,true):'N/A'} sub={t("Avg asking",lang)}/>
          <Card label={t("Monthly Rent",lang)} value={monthlyRent?fmtAED(monthlyRent,true):'N/A'} sub={t("Per month",lang)}/>
          <Card label={t("Gross Yield",lang)} value={d.yield?d.yield+'%':'N/A'} sub={t("Annual return",lang)} subColor="#22C55E" accent="rgba(34,197,94,0.15)"/>
          <Card label={t("YoY Growth",lang)} value={d.trend?'+'+d.trend+'%':'N/A'} sub={t("Rental growth",lang)} subColor="#38BDF8" accent="rgba(59,130,246,0.15)"/>
          <Card label={t("Quarterly",lang)} value={annualRent?fmtAED(Math.round(annualRent/4),true):'N/A'} sub={t("Per cheque",lang)}/>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:24}}>
          <div style={{background:'var(--surface)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:14,padding:20}}>
            <div style={{fontSize:13,fontWeight:600,color:'var(--text-primary)',marginBottom:14}}>{t('Annual Rent by Area',lang)} — {selectedBR}</div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={compData.slice(0,10)} margin={{top:4,right:4,left:0,bottom:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)"/>
                <XAxis dataKey="name" tick={{fontSize:9,fill:'#475569'}} axisLine={false} tickLine={false}/>
                <YAxis hide/>
                <Tooltip {...tt} formatter={v=>['AED '+fmtNum(v),'Annual Rent']}/>
                <Bar dataKey="annual" fill="#38BDF8" radius={[4,4,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div style={{background:'var(--surface)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:14,padding:20}}>
            <div style={{fontSize:13,fontWeight:600,color:'var(--text-primary)',marginBottom:14}}>{t('Gross Rental Yield by Area',lang)}</div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={yieldData.slice(0,10)} margin={{top:4,right:4,left:0,bottom:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)"/>
                <XAxis dataKey="name" tick={{fontSize:9,fill:'#475569'}} axisLine={false} tickLine={false}/>
                <YAxis hide/>
                <Tooltip {...tt} formatter={v=>[v+'%','Gross Yield']}/>
                <Bar dataKey="yield" fill="#22C55E" radius={[4,4,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div style={{background:'var(--surface)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:14,overflow:'hidden'}}>
          <div style={{padding:'16px 20px',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
            <div style={{fontSize:14,fontWeight:600,color:'var(--text-primary)'}}>Rental Rates by Area</div>
            <div style={{fontSize:12,color:'var(--text-secondary)'}}>Annual asking rents in AED</div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1.5fr 1fr 1fr 1fr 1fr 1fr 0.8fr 0.8fr',padding:'10px 20px',borderBottom:'1px solid rgba(255,255,255,0.06)',background:'rgba(59,130,246,0.04)'}}>
            {['Area','Studio','1 B/R','2 B/R','3 B/R','4 B/R','Yield','YoY'].map((h,i)=><div key={i} style={{fontSize:10,color:'var(--text-secondary)',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.05em'}}>{h}</div>)}
          </div>
          {AREAS.map((area,i)=>{
            const rd=RENTAL_DATA[area]||{};
            return (
              <div key={area} onClick={()=>setSelectedArea(area)} style={{display:'grid',gridTemplateColumns:'1.5fr 1fr 1fr 1fr 1fr 1fr 0.8fr 0.8fr',padding:'13px 20px',borderBottom:i<AREAS.length-1?'1px solid rgba(255,255,255,0.03)':'none',cursor:'pointer',background:selectedArea===area?'rgba(59,130,246,0.08)':'transparent'}}
                onMouseEnter={e=>e.currentTarget.style.background='rgba(59,130,246,0.05)'}
                onMouseLeave={e=>e.currentTarget.style.background=selectedArea===area?'rgba(59,130,246,0.08)':'transparent'}>
                <div style={{fontSize:13,fontWeight:600,color:'var(--text-primary)'}}>{area}</div>
                {['studio','1br','2br','3br','4br'].map(k=><div key={k} style={{fontSize:12,color:'var(--text-secondary)'}}>{rd[k]?fmtAED(rd[k],true):'—'}</div>)}
                <div style={{fontSize:12,fontWeight:600,color:'#22C55E'}}>{rd.yield?rd.yield+'%':'—'}</div>
                <div style={{fontSize:12,fontWeight:600,color:'#38BDF8'}}>{rd.trend?'+'+rd.trend+'%':'—'}</div>
              </div>
            );
          })}
        </div>
      </>}

      {viewMode==='calculator' && (
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
          <div style={{background:'var(--surface)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:14,padding:24}}>
            <div style={{fontSize:15,fontWeight:700,color:'var(--text-primary)',marginBottom:20}}>Yield Calculator</div>
            <div style={{marginBottom:14}}>
              <label style={{fontSize:12,color:'var(--text-muted)',marginBottom:5,display:'block',fontWeight:500}}>Area</label>
              <select value={calcArea} onChange={e=>setCalcArea(e.target.value)} style={{...inp,cursor:'pointer'}}>
                {AREAS.map(a=><option key={a}>{a}</option>)}
              </select>
            </div>
            <div style={{marginBottom:14}}>
              <label style={{fontSize:12,color:'var(--text-muted)',marginBottom:5,display:'block',fontWeight:500}}>Bedrooms</label>
              <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                {BEDROOMS.map(br=><button key={br} onClick={()=>setCalcBR(br)} style={{padding:'7px 12px',borderRadius:8,border:'none',cursor:'pointer',fontSize:11,fontFamily:'system-ui',fontWeight:calcBR===br?600:400,background:calcBR===br?'var(--border-strong)':'rgba(59,130,246,0.06)',color:calcBR===br?'#38BDF8':'var(--text-muted)'}}>{br}</button>)}
              </div>
            </div>
            <div style={{marginBottom:20}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:5}}>
                <label style={{fontSize:12,color:'var(--text-muted)',fontWeight:500}}>Property Size</label>
                <div style={{display:'flex',gap:4}}>
                  {['sqft','sqm'].map(u=><button key={u} onClick={()=>setCalcUnit(u)} style={{padding:'3px 8px',borderRadius:20,border:'none',cursor:'pointer',fontSize:10,fontWeight:calcUnit===u?700:400,fontFamily:'system-ui',background:calcUnit===u?'var(--border-strong)':'rgba(59,130,246,0.06)',color:calcUnit===u?'#38BDF8':'var(--text-muted)'}}>{u}</button>)}
                </div>
              </div>
              <input value={calcSize} onChange={e=>setCalcSize(e.target.value)} placeholder={calcUnit==='sqft'?'e.g. 1200':'e.g. 111'} style={inp}/>
              {cSizeNum>0 && <div style={{fontSize:10,color:'var(--text-secondary)',marginTop:4}}>{calcUnit==='sqft'?Math.round(cSizeNum/10.764)+' sqm':Math.round(cSizeNum*10.764)+' sqft'}</div>}
            </div>
            {cAnnual>0 && (
              <div style={{background:'rgba(59,130,246,0.06)',border:'1px solid rgba(59,130,246,0.1)',borderRadius:10,padding:14}}>
                <div style={{fontSize:11,color:'var(--text-muted)',marginBottom:8,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.05em'}}>Market Rent — {calcArea}</div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
                  {[['Annual',fmtAED(cAnnual,true),'var(--text-primary)'],['Monthly',fmtAED(Math.round(cAnnual/12),true),'var(--text-primary)'],['Market Yield',cd.yield+'%','#22C55E'],['YoY Growth','+'+cd.trend+'%','#38BDF8']].map(([l,v,c],i)=>(
                    <div key={i}><div style={{fontSize:10,color:'var(--text-secondary)'}}>{l}</div><div style={{fontSize:14,fontWeight:700,color:c}}>{v}</div></div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div style={{background:'var(--surface)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:14,padding:24}}>
            <div style={{fontSize:15,fontWeight:700,color:'var(--text-primary)',marginBottom:20}}>Yield Analysis</div>
            {!cAnnual ? <div style={{textAlign:'center',padding:40,color:'var(--text-secondary)'}}><div style={{fontSize:32,marginBottom:12}}>📊</div><div>Select area and bedrooms</div></div> : <>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:16}}>
                {[['Annual Rent',fmtAED(cAnnual,true),'var(--text-primary)','rgba(59,130,246,0.1)'],['Monthly',fmtAED(Math.round(cAnnual/12),true),'#38BDF8','rgba(59,130,246,0.08)'],['Gross Yield',gYield+'%','#22C55E','rgba(34,197,94,0.1)'],['Net Yield',nYield+'%','#22C55E','rgba(34,197,94,0.08)']].map(([l,v,c,bg],i)=>(
                  <div key={i} style={{background:bg,border:'1px solid rgba(59,130,246,0.1)',borderRadius:10,padding:14}}>
                    <div style={{fontSize:10,color:'var(--text-muted)',marginBottom:6,textTransform:'uppercase',letterSpacing:'0.05em'}}>{l}</div>
                    <div style={{fontSize:18,fontWeight:700,color:c}}>{v}</div>
                  </div>
                ))}
              </div>
              {cValue>0 && <div style={{background:'rgba(245,158,11,0.06)',border:'1px solid rgba(245,158,11,0.15)',borderRadius:10,padding:14,marginBottom:14}}>
                <div style={{fontSize:11,color:'#F59E0B',fontWeight:600,marginBottom:6}}>PROPERTY VALUE (estimated)</div>
                <div style={{fontSize:20,fontWeight:700,color:'var(--text-primary)'}}>{fmtAED(cValue,true)}</div>
                <div style={{fontSize:11,color:'var(--text-muted)',marginTop:2}}>Based on {calcArea} DLD market data</div>
              </div>}
              <div style={{background:'rgba(59,130,246,0.04)',border:'1px solid rgba(59,130,246,0.08)',borderRadius:10,padding:14}}>
                <div style={{fontSize:11,color:'var(--text-muted)',fontWeight:600,marginBottom:10}}>PAYMENT SCHEDULE</div>
                {[['Annual (1 cheque)',cAnnual],['Semi-annual',Math.round(cAnnual/2)],['Quarterly',Math.round(cAnnual/4)],['Monthly',Math.round(cAnnual/12)]].map(([l,v],i)=>(
                  <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:i<3?'1px solid rgba(255,255,255,0.04)':'none'}}>
                    <span style={{fontSize:12,color:'var(--text-secondary)'}}>{l}</span>
                    <span style={{fontSize:12,fontWeight:600,color:'var(--text-primary)'}}>{fmtAED(v,true)}</span>
                  </div>
                ))}
              </div>
            </>}
          </div>
        </div>
      )}
    </div>
  );
}
