import { supabase, useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { fmtNum } from '../utils/format';
import { t } from '../i18n';

const AREA_NICE = {'Al Barsha South Fourth':'JVC','Burj Khalifa':'Downtown Dubai','Marsa Dubai':'Dubai Marina','Hadaeq Sheikh Mohammed Bin Rashid':'Dubai Hills','Al Thanyah Fifth':'JLT','Business Bay':'Business Bay','Palm Jumeirah':'Palm Jumeirah','Al Merkadh':'MBR City'};
const niceArea = a => AREA_NICE[a] || a;

export default function PriceAlerts({ areaData }) {
  const lang = localStorage.getItem('lang') || 'en';
  const { user, isPro, isLite } = useAuth();
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ area:'', threshold:'5', direction:'up' });
  const [saving, setSaving] = useState(false);

  useEffect(() => { if (user) loadAlerts(); }, [user]);

  const loadAlerts = async () => {
    setLoading(true);
    const { data } = await supabase.from('price_alerts').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
    setAlerts(data || []);
    setLoading(false);
  };

  const addAlert = async () => {
    if (!form.area) return;
    setSaving(true);
    const currentPpsqm = areaData?.[form.area]?.kpis?.ppsqm || 0;
    await supabase.from('price_alerts').insert({ user_id:user.id, building_name:niceArea(form.area), area:form.area, email:user.email, active:true, threshold_pct:parseFloat(form.threshold), direction:form.direction, current_ppsqm:currentPpsqm });
    setSaving(false); setShowAdd(false); setForm({ area:'', threshold:'5', direction:'up' }); loadAlerts();
  };

  const deleteAlert = async (id) => { await supabase.from('price_alerts').delete().eq('id', id); setAlerts(a=>a.filter(x=>x.id!==id)); };
  const toggleAlert = async (id, active) => { await supabase.from('price_alerts').update({ active:!active }).eq('id', id); setAlerts(a=>a.map(x=>x.id===id?{...x,active:!active}:x)); };

  const areas = areaData ? Object.keys(areaData).map(k=>({key:k,label:niceArea(k)})) : [];
  const inp = {width:'100%',padding:'10px 12px',borderRadius:8,boxSizing:'border-box',background:'var(--bg-alt)',border:'1px solid rgba(59,130,246,0.15)',color:'var(--text-primary)',fontSize:13,outline:'none',fontFamily:'system-ui'};
  const lbl = {fontSize:12,color:'var(--text-muted)',marginBottom:5,display:'block',fontWeight:500};

  if (!isLite) return (
    <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',background:'var(--bg)',fontFamily:'system-ui',padding:24}}>
      <div style={{textAlign:'center',maxWidth:380}}>
        <div style={{fontSize:48,marginBottom:16}}>🔔</div>
        <div style={{fontSize:22,fontWeight:700,color:'var(--text-primary)',marginBottom:8}}>{t('Price Alerts',lang)}</div>
        <div style={{fontSize:14,color:'var(--text-muted)',marginBottom:24,lineHeight:1.6}}>Get notified by email when Dubai area prices move by your chosen threshold.</div>
        <button style={{width:'100%',padding:'13px',borderRadius:10,border:'none',cursor:'pointer',background:'linear-gradient(135deg,#1D4ED8,#38BDF8)',color:'#fff',fontSize:14,fontWeight:600,fontFamily:'system-ui'}}>Upgrade to Lite — AED 99/mo</button>
      </div>
    </div>
  );

  return (
    <div style={{flex:1,overflowY:'auto',background:'var(--bg)',fontFamily:'system-ui',padding:'24px 28px'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:24}}>
        <div>
          <h1 style={{margin:0,fontSize:22,fontWeight:700,color:'var(--text-primary)',marginBottom:4}}>Price Alerts</h1>
          <div style={{fontSize:13,color:'var(--text-secondary)'}}>{t('Price Alerts subtitle',lang)}</div>
        </div>
        <button onClick={()=>setShowAdd(true)} style={{padding:'10px 18px',borderRadius:10,border:'none',cursor:'pointer',background:'linear-gradient(135deg,#1D4ED8,#38BDF8)',color:'#fff',fontSize:13,fontWeight:600,fontFamily:'system-ui'}}>+ New Alert</button>
      </div>

      {loading ? <div style={{textAlign:'center',padding:60,color:'var(--text-secondary)'}}>Loading...</div>
      : alerts.length===0 ? (
        <div style={{textAlign:'center',padding:60}}>
          <div style={{fontSize:48,marginBottom:16}}>🔔</div>
          <div style={{fontSize:18,fontWeight:600,color:'var(--text-primary)',marginBottom:8}}>{t('No alerts yet',lang)}</div>
          <div style={{fontSize:13,color:'var(--text-secondary)',marginBottom:24}}>{t('Set up first alert',lang)}</div>
          <button onClick={()=>setShowAdd(true)} style={{padding:'11px 24px',borderRadius:10,border:'none',cursor:'pointer',background:'linear-gradient(135deg,#1D4ED8,#38BDF8)',color:'#fff',fontSize:13,fontWeight:600,fontFamily:'system-ui'}}>+ Create Alert</button>
        </div>
      ) : (
        <div style={{background:'var(--surface)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:14,overflow:'hidden'}}>
          {alerts.map((alert,i)=>{
            const currentPpsqm = areaData?.[alert.area]?.kpis?.ppsqm||0;
            const change = alert.current_ppsqm ? ((currentPpsqm-alert.current_ppsqm)/alert.current_ppsqm*100).toFixed(1) : 0;
            return (
              <div key={alert.id} style={{padding:'18px 20px',borderBottom:i<alerts.length-1?'1px solid rgba(255,255,255,0.04)':'none',display:'flex',alignItems:'center',gap:16}}>
                <div style={{width:44,height:44,borderRadius:10,background:alert.active?'rgba(59,130,246,0.1)':'rgba(100,116,139,0.1)',border:`1px solid ${alert.active?'var(--border-strong)':'rgba(100,116,139,0.15)'}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,flexShrink:0}}>🔔</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:14,fontWeight:700,color:'var(--text-primary)',marginBottom:2}}>{alert.building_name}</div>
                  <div style={{fontSize:12,color:'var(--text-secondary)'}}>Alert when price {alert.direction==='up'?'rises':'drops'} {alert.threshold_pct||5}% · {alert.email}</div>
                  {currentPpsqm>0 && <div style={{fontSize:11,color:change>0?'#22C55E':'#F87171',marginTop:4}}>Current: AED {fmtNum(Math.round(currentPpsqm/10.764))}/sqft{change!==0?` · ${change>0?'+':''}${change}% since created`:''}</div>}
                </div>
                <div style={{display:'flex',alignItems:'center',gap:10}}>
                  <button onClick={()=>toggleAlert(alert.id,alert.active)} style={{padding:'6px 12px',borderRadius:20,border:'none',cursor:'pointer',fontSize:11,fontWeight:600,fontFamily:'system-ui',background:alert.active?'rgba(34,197,94,0.15)':'rgba(100,116,139,0.1)',color:alert.active?'#22C55E':'var(--text-muted)'}}>{alert.active?'Active':'Paused'}</button>
                  <button onClick={()=>deleteAlert(alert.id)} style={{background:'rgba(248,113,113,0.1)',border:'1px solid rgba(248,113,113,0.2)',borderRadius:8,cursor:'pointer',color:'#F87171',padding:'6px 10px',fontSize:12,fontFamily:'system-ui'}}>🗑️</button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showAdd && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.7)',zIndex:2000,display:'flex',alignItems:'center',justifyContent:'center',padding:16}}>
          <div style={{background:'var(--surface)',border:'1px solid rgba(59,130,246,0.2)',borderRadius:16,padding:28,width:'100%',maxWidth:440,fontFamily:'system-ui'}}>
            <div style={{fontSize:18,fontWeight:700,color:'var(--text-primary)',marginBottom:20}}>New Price Alert</div>
            <div style={{marginBottom:14}}><label style={lbl}>Area</label><select value={form.area} onChange={e=>setForm(f=>({...f,area:e.target.value}))} style={{...inp,cursor:'pointer'}}><option value="">Select area...</option>{areas.map(a=><option key={a.key} value={a.key}>{a.label}</option>)}</select></div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:20}}>
              <div><label style={lbl}>Threshold (%)</label><select value={form.threshold} onChange={e=>setForm(f=>({...f,threshold:e.target.value}))} style={{...inp,cursor:'pointer'}}>{['3','5','10','15','20'].map(v=><option key={v}>{v}</option>)}</select></div>
              <div><label style={lbl}>Direction</label><select value={form.direction} onChange={e=>setForm(f=>({...f,direction:e.target.value}))} style={{...inp,cursor:'pointer'}}><option value="up">Price rises</option><option value="down">Price drops</option><option value="both">Either direction</option></select></div>
            </div>
            <div style={{display:'flex',gap:10}}>
              <button onClick={()=>setShowAdd(false)} style={{flex:1,padding:'11px',borderRadius:10,border:'1px solid rgba(59,130,246,0.15)',background:'transparent',color:'var(--text-muted)',fontSize:13,fontWeight:600,cursor:'pointer',fontFamily:'system-ui'}}>Cancel</button>
              <button onClick={addAlert} disabled={saving||!form.area} style={{flex:2,padding:'11px',borderRadius:10,border:'none',cursor:'pointer',background:'linear-gradient(135deg,#1D4ED8,#38BDF8)',color:'#fff',fontSize:13,fontWeight:600,fontFamily:'system-ui',opacity:saving||!form.area?0.5:1}}>{saving?'Creating...':'Create Alert'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
