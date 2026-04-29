import { useState, useEffect } from 'react';
import { supabase } from '../context/AuthContext';
import { useAuth } from '../context/AuthContext';
import { fmtAED, fmtNum } from '../utils/format';

const AREA_NICE = {'Al Barsha South Fourth':'JVC','Burj Khalifa':'Downtown Dubai','Marsa Dubai':'Dubai Marina','Hadaeq Sheikh Mohammed Bin Rashid':'Dubai Hills','Al Thanyah Fifth':'JLT','Business Bay':'Business Bay','Palm Jumeirah':'Palm Jumeirah','Al Merkadh':'MBR City','Al Khairan First':'Creek Harbour'};
const niceArea = a => AREA_NICE[a] || a;

export default function Watchlist({ areaData, projectsData, setPage }) {
  const { user, isPro, isLite } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [addType, setAddType] = useState('area');
  const [addValue, setAddValue] = useState('');
  const [saving, setSaving] = useState(false);

  const areas = areaData ? Object.keys(areaData).map(k=>({key:k,label:niceArea(k)})) : [];
  const projects = projectsData ? Object.keys(projectsData).slice(0,50) : [];

  useEffect(() => { if (user) loadItems(); }, [user]);

  const loadItems = async () => {
    setLoading(true);
    const { data } = await supabase.from('watchlist').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
    setItems(data || []);
    setLoading(false);
  };

  const addItem = async () => {
    if (!addValue) return;
    setSaving(true);
    const isArea = addType === 'area';
    const areaKey = isArea ? addValue : projectsData?.[addValue]?.area || '';
    await supabase.from('watchlist').insert({
      user_id: user.id, type: addType,
      name: isArea ? niceArea(addValue) : addValue,
      key: addValue, area: areaKey,
      current_ppsqm: areaData?.[areaKey]?.kpis?.ppsqm || 0,
      current_avg: areaData?.[areaKey]?.kpis?.avg || 0,
    });
    setSaving(false); setShowAdd(false); setAddValue(''); loadItems();
  };

  const removeItem = async (id) => {
    await supabase.from('watchlist').delete().eq('id', id);
    setItems(i => i.filter(x => x.id !== id));
  };

  if (!isLite) return (
    <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',background:'var(--bg)',fontFamily:'system-ui',padding:24}}>
      <div style={{textAlign:'center',maxWidth:380}}>
        <div style={{fontSize:48,marginBottom:16}}>🔖</div>
        <div style={{fontSize:22,fontWeight:700,color:'var(--text-primary)',marginBottom:8}}>Watchlist</div>
        <div style={{fontSize:14,color:'var(--text-muted)',marginBottom:24,lineHeight:1.6}}>Save areas and projects you are tracking. Get notified when prices move.</div>
        <button onClick={()=>setPage('upgrade')} style={{width:'100%',padding:'13px',borderRadius:10,border:'none',cursor:'pointer',background:'linear-gradient(135deg,#1D4ED8,#38BDF8)',color:'#fff',fontSize:14,fontWeight:600,fontFamily:'system-ui'}}>Upgrade to Lite</button>
      </div>
    </div>
  );

  return (
    <div style={{flex:1,overflowY:'auto',background:'var(--bg)',fontFamily:'system-ui',padding:'24px 28px'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:24}}>
        <div>
          <h1 style={{margin:0,fontSize:22,fontWeight:700,color:'var(--text-primary)',marginBottom:4}}>Watchlist</h1>
          <div style={{fontSize:13,color:'#475569'}}>Track areas and projects you are interested in</div>
        </div>
        <button onClick={()=>setShowAdd(true)} style={{padding:'10px 18px',borderRadius:10,border:'none',cursor:'pointer',background:'linear-gradient(135deg,#1D4ED8,#38BDF8)',color:'#fff',fontSize:13,fontWeight:600,fontFamily:'system-ui'}}>+ Add to Watchlist</button>
      </div>

      {loading ? <div style={{textAlign:'center',padding:60,color:'#475569'}}>Loading...</div>
      : items.length === 0 ? (
        <div style={{textAlign:'center',padding:60}}>
          <div style={{fontSize:48,marginBottom:16}}>🔖</div>
          <div style={{fontSize:18,fontWeight:600,color:'var(--text-primary)',marginBottom:8}}>Nothing saved yet</div>
          <div style={{fontSize:13,color:'#475569',marginBottom:24}}>Add areas or projects you want to track</div>
          <button onClick={()=>setShowAdd(true)} style={{padding:'11px 24px',borderRadius:10,border:'none',cursor:'pointer',background:'linear-gradient(135deg,#1D4ED8,#38BDF8)',color:'#fff',fontSize:13,fontWeight:600,fontFamily:'system-ui'}}>+ Add First Item</button>
        </div>
      ) : (
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:16}}>
          {items.map(item => {
            const currentPpsqm = item.type==='area' ? (areaData?.[item.key]?.kpis?.ppsqm||0) : 0;
            const currentAvg = item.type==='area' ? (areaData?.[item.key]?.kpis?.avg||0) : 0;
            const change = item.current_ppsqm&&currentPpsqm ? ((currentPpsqm-item.current_ppsqm)/item.current_ppsqm*100).toFixed(1) : 0;
            return (
              <div key={item.id} style={{background:'var(--surface)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:14,padding:20}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:14}}>
                  <div>
                    <span style={{fontSize:10,fontWeight:600,padding:'2px 8px',borderRadius:20,background:item.type==='area'?'rgba(59,130,246,0.1)':'rgba(245,158,11,0.1)',color:item.type==='area'?'#38BDF8':'#F59E0B',display:'inline-block',marginBottom:6}}>{item.type==='area'?'AREA':'PROJECT'}</span>
                    <div style={{fontSize:15,fontWeight:700,color:'var(--text-primary)'}}>{item.name}</div>
                    {item.area && <div style={{fontSize:11,color:'#475569',marginTop:2}}>📍 {niceArea(item.area)}</div>}
                  </div>
                  <button onClick={()=>removeItem(item.id)} style={{background:'rgba(248,113,113,0.1)',border:'1px solid rgba(248,113,113,0.2)',borderRadius:8,cursor:'pointer',color:'#F87171',padding:'4px 8px',fontSize:12,fontFamily:'system-ui'}}>✕</button>
                </div>
                {item.type==='area' && currentPpsqm>0 && (
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:10}}>
                    <div style={{background:'rgba(59,130,246,0.06)',borderRadius:8,padding:10}}>
                      <div style={{fontSize:9,color:'#475569',marginBottom:3}}>PRICE/SQFT</div>
                      <div style={{fontSize:13,fontWeight:700,color:'var(--text-primary)'}}>AED {fmtNum(Math.round(currentPpsqm/10.764))}</div>
                    </div>
                    <div style={{background:'rgba(59,130,246,0.06)',borderRadius:8,padding:10}}>
                      <div style={{fontSize:9,color:'#475569',marginBottom:3}}>AVG DEAL</div>
                      <div style={{fontSize:13,fontWeight:700,color:'var(--text-primary)'}}>{fmtAED(currentAvg,true)}</div>
                    </div>
                  </div>
                )}
                {change!==0 && <div style={{fontSize:12,fontWeight:600,color:change>0?'#22C55E':'#F87171'}}>{change>0?'↑':'↓'} {Math.abs(change)}% since added</div>}
                <div style={{fontSize:10,color:'var(--text-faint)',marginTop:8}}>Added {new Date(item.created_at).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})}</div>
              </div>
            );
          })}
        </div>
      )}

      {showAdd && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.7)',zIndex:2000,display:'flex',alignItems:'center',justifyContent:'center',padding:16}}>
          <div style={{background:'var(--surface)',border:'1px solid rgba(59,130,246,0.2)',borderRadius:16,padding:28,width:'100%',maxWidth:440,fontFamily:'system-ui'}}>
            <div style={{fontSize:18,fontWeight:700,color:'var(--text-primary)',marginBottom:20}}>Add to Watchlist</div>
            <div style={{display:'flex',gap:8,marginBottom:16,background:'var(--bg-alt)',borderRadius:10,padding:4}}>
              {[['area','Area'],['project','Project']].map(([t,l])=>(
                <button key={t} onClick={()=>{setAddType(t);setAddValue('');}} style={{flex:1,padding:'8px',borderRadius:8,border:'none',cursor:'pointer',fontSize:13,fontFamily:'system-ui',fontWeight:addType===t?600:400,background:addType===t?'linear-gradient(135deg,#1D4ED8,#38BDF8)':'transparent',color:addType===t?'#fff':'var(--text-muted)'}}>{l}</button>
              ))}
            </div>
            <div style={{marginBottom:20}}>
              <label style={{fontSize:12,color:'var(--text-muted)',marginBottom:5,display:'block',fontWeight:500}}>Select {addType==='area'?'Area':'Project'}</label>
              <select value={addValue} onChange={e=>setAddValue(e.target.value)} style={{width:'100%',padding:'10px 12px',borderRadius:8,background:'var(--bg-alt)',border:'1px solid rgba(59,130,246,0.15)',color:'var(--text-primary)',fontSize:13,outline:'none',fontFamily:'system-ui',cursor:'pointer'}}>
                <option value="">Choose...</option>
                {addType==='area' ? areas.map(a=><option key={a.key} value={a.key}>{a.label}</option>) : projects.map(p=><option key={p} value={p}>{p.length>50?p.slice(0,50)+'...':p}</option>)}
              </select>
            </div>
            <div style={{display:'flex',gap:10}}>
              <button onClick={()=>setShowAdd(false)} style={{flex:1,padding:'11px',borderRadius:10,border:'1px solid rgba(59,130,246,0.15)',background:'transparent',color:'var(--text-muted)',fontSize:13,fontWeight:600,cursor:'pointer',fontFamily:'system-ui'}}>Cancel</button>
              <button onClick={addItem} disabled={saving||!addValue} style={{flex:2,padding:'11px',borderRadius:10,border:'none',cursor:'pointer',background:'linear-gradient(135deg,#1D4ED8,#38BDF8)',color:'#fff',fontSize:13,fontWeight:600,fontFamily:'system-ui',opacity:saving||!addValue?0.5:1}}>{saving?'Adding...':'Add to Watchlist'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
