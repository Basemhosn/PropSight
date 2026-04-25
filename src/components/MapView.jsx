import { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { fmtAED, fmtNum } from '../utils/format';

mapboxgl.accessToken = 'pk.eyJ1IjoiYmFzZW1hYm91bGhvc24iLCJhIjoiY21vY3l5aG4xMDU1djJxcjEyNHFwOWxmZCJ9.mrfljePI1WyRhNrg0gpzGQ';

const METRICS = [
  { id:'count', label:'Transactions', colors:['#1a3a5c','#185FA5','#60a5fa'] },
  { id:'total', label:'Total value',  colors:['#0f3d2a','#1D9E75','#6ee7b7'] },
  { id:'avg',   label:'Avg deal',     colors:['#3d2a0a','#BA7517','#fcd34d'] },
  { id:'ppsqm', label:'Price/m²',    colors:['#2d1b4e','#7C3AED','#c4b5fd'] },
];

function makeAreaEl(p, onExplore) {
  const el = document.createElement('div');
  el.style.fontFamily = '-apple-system,sans-serif';
  el.innerHTML = `
    <div style="font-size:14px;font-weight:700;color:#0A1628;margin-bottom:8px">${p.area}</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;margin-bottom:10px">
      <div style="background:#f4f6fa;padding:6px 8px;border-radius:6px">
        <div style="font-size:9px;color:#9AA0AE">Transactions</div>
        <div style="font-size:13px;font-weight:700">${fmtNum(p.count)}</div>
      </div>
      <div style="background:#f4f6fa;padding:6px 8px;border-radius:6px">
        <div style="font-size:9px;color:#9AA0AE">Total value</div>
        <div style="font-size:13px;font-weight:700;color:#185FA5">${fmtAED(p.total,true)}</div>
      </div>
      <div style="background:#f4f6fa;padding:6px 8px;border-radius:6px">
        <div style="font-size:9px;color:#9AA0AE">Avg deal</div>
        <div style="font-size:13px;font-weight:700">${fmtAED(p.avg,true)}</div>
      </div>
      <div style="background:#f4f6fa;padding:6px 8px;border-radius:6px">
        <div style="font-size:9px;color:#9AA0AE">Price/m²</div>
        <div style="font-size:13px;font-weight:700;color:#1D9E75">${p.ppsqm>0?fmtAED(p.ppsqm,true):'—'}</div>
      </div>
    </div>
    <button id="explore-btn" style="width:100%;padding:8px;background:#185FA5;color:#fff;border:none;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer">Explore area →</button>
  `;
  el.querySelector('#explore-btn').addEventListener('click', onExplore);
  return el;
}

function makeProjectEl(p, projectsData, onView) {
  const el = document.createElement('div');
  el.style.fontFamily = '-apple-system,sans-serif';
  const img = p.image ? `<img src="${p.image}" style="width:100%;height:90px;object-fit:cover;border-radius:6px;margin-bottom:8px"/>` : '';
  el.innerHTML = `
    ${img}
    <div style="font-size:12px;font-weight:700;color:#0A1628;margin-bottom:4px;line-height:1.3">${p.name}</div>
    <div style="font-size:11px;color:#666;margin-bottom:8px">${fmtNum(p.count)} deals · avg ${fmtAED(p.avg,true)}</div>
    <button id="view-btn" style="width:100%;padding:7px;background:#D85A30;color:#fff;border:none;border-radius:8px;font-size:11px;font-weight:600;cursor:pointer">View project details →</button>
  `;
  el.querySelector('#view-btn').addEventListener('click', onView);
  return el;
}

export default function MapView({ onAreaClick, onProjectClick, projectsData }) {
  const mapContainer = useRef(null);
  const map          = useRef(null);
  const popup        = useRef(null);
  const cbRefs       = useRef({ onAreaClick, onProjectClick, projectsData });
  useEffect(() => { cbRefs.current = { onAreaClick, onProjectClick, projectsData }; });

  const [metric,       setMetric]       = useState('count');
  const [is3D,         setIs3D]         = useState(true);
  const [geoData,      setGeoData]      = useState(null);
  const [mapReady,     setMapReady]     = useState(false);
  const [showProjects, setShowProjects] = useState(true);
  const [selected,     setSelected]     = useState(null);

  useEffect(() => {
    fetch('/data/areas_geo.json').then(r => r.json()).then(setGeoData);
  }, []);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style:     'mapbox://styles/mapbox/dark-v11',
      center:    [55.2708, 25.1500],
      zoom: 10.8, pitch: 55, bearing: -20, antialias: true,
    });
    map.current.addControl(new mapboxgl.NavigationControl({ showCompass:true }), 'top-right');
    map.current.on('load', () => {
      map.current.addLayer({
        id:'3d-buildings', source:'composite', 'source-layer':'building',
        filter:['==','extrude','true'], type:'fill-extrusion', minzoom:12,
        paint:{
          'fill-extrusion-color':['interpolate',['linear'],['get','height'],0,'#1a2744',50,'#1e3a6e',100,'#2563eb',300,'#60a5fa'],
          'fill-extrusion-height':['get','height'],
          'fill-extrusion-base':['get','min_height'],
          'fill-extrusion-opacity':0.75,
        },
      });
      setMapReady(true);
    });
    return () => { if (map.current) { map.current.remove(); map.current = null; } };
  }, []);

  const toggle3D = useCallback(() => {
    setIs3D(prev => {
      const next = !prev;
      if (map.current) map.current.easeTo({ pitch:next?55:0, bearing:next?-20:0, duration:800 });
      return next;
    });
  }, []);

  // Area layers
  useEffect(() => {
    if (!mapReady || !geoData || !map.current) return;
    const m = map.current;
    const vals = geoData.features.map(f => f.properties[metric]).filter(Boolean);
    const maxV = Math.max(...vals), minV = Math.min(...vals);
    const [c0,c1,c2] = METRICS.find(x=>x.id===metric).colors;

    ['area-circles','area-labels','area-heat'].forEach(id => { if (m.getLayer(id)) m.removeLayer(id); });
    if (m.getSource('areas')) m.removeSource('areas');

    m.addSource('areas', { type:'geojson', data:geoData });

    m.addLayer({ id:'area-heat', type:'heatmap', source:'areas', maxzoom:13,
      paint:{
        'heatmap-weight':   ['interpolate',['linear'],['get',metric],minV,0,maxV,1],
        'heatmap-intensity':['interpolate',['linear'],['zoom'],9,1,13,4],
        'heatmap-radius':   ['interpolate',['linear'],['zoom'],9,35,13,70],
        'heatmap-opacity':  ['interpolate',['linear'],['zoom'],11,0.8,13,0],
        'heatmap-color':    ['interpolate',['linear'],['heatmap-density'],0,'rgba(0,0,0,0)',0.2,c0,0.6,c1,1,c2],
      }
    }, '3d-buildings');

    m.addLayer({ id:'area-circles', type:'circle', source:'areas', minzoom:10,
      paint:{
        'circle-radius':      ['interpolate',['linear'],['get',metric],minV,16,maxV,52],
        'circle-color':       ['interpolate',['linear'],['get',metric],minV,c0,maxV,c2],
        'circle-opacity':     0.82,
        'circle-stroke-width':2,
        'circle-stroke-color':'rgba(255,255,255,0.3)',
      }
    }, '3d-buildings');

    m.addLayer({ id:'area-labels', type:'symbol', source:'areas', minzoom:10.5,
      layout:{'text-field':['get','area'],'text-size':10,'text-anchor':'center','text-max-width':8},
      paint:{'text-color':'#fff','text-halo-color':'rgba(0,0,0,0.8)','text-halo-width':1.5},
    });

    m.off('click', 'area-circles');
    m.on('click', 'area-circles', (e) => {
      const p = e.features[0].properties;
      setSelected(p.area);
      if (popup.current) popup.current.remove();
      const el = makeAreaEl(p, () => {
        if (popup.current) popup.current.remove();
        if (cbRefs.current.onAreaClick) cbRefs.current.onAreaClick(p.area);
      });
      popup.current = new mapboxgl.Popup({ offset:25, closeButton:true, maxWidth:'260px' })
        .setLngLat(e.lngLat).setDOMContent(el).addTo(m);
    });
    m.on('mouseenter','area-circles',()=>{ m.getCanvas().style.cursor='pointer'; });
    m.on('mouseleave','area-circles',()=>{ m.getCanvas().style.cursor=''; });

  }, [mapReady, geoData, metric]);

  // Project markers
  useEffect(() => {
    if (!mapReady || !map.current) return;
    const m = map.current;
    ['project-labels','project-markers'].forEach(id=>{ if(m.getLayer(id)) m.removeLayer(id); });
    if (m.getSource('projects')) m.removeSource('projects');
    if (!showProjects || !projectsData) return;

    const features = Object.entries(projectsData).map(([name,data]) => ({
      type:'Feature',
      geometry:{ type:'Point', coordinates:[data.lng||55.2708, data.lat||25.2048] },
      properties:{ name, count:data.kpis?.count||0, avg:data.kpis?.avg||0, total:data.kpis?.total||0, image:data.image||'' },
    }));

    m.addSource('projects', { type:'geojson', data:{ type:'FeatureCollection', features } });

    m.addLayer({ id:'project-markers', type:'circle', source:'projects', minzoom:11,
      paint:{'circle-radius':6,'circle-color':'#D85A30','circle-stroke-width':2,'circle-stroke-color':'#fff','circle-opacity':0.9}
    });

    m.addLayer({ id:'project-labels', type:'symbol', source:'projects', minzoom:13.5,
      layout:{'text-field':['get','name'],'text-size':9,'text-anchor':'top','text-offset':[0,1],'text-max-width':10},
      paint:{'text-color':'#ffedd5','text-halo-color':'rgba(0,0,0,0.9)','text-halo-width':1.5},
    });

    m.off('click', 'project-markers');
    m.on('click', 'project-markers', (e) => {
      e.stopPropagation();
      const p = e.features[0].properties;
      if (popup.current) popup.current.remove();
      const el = makeProjectEl(p, cbRefs.current.projectsData, () => {
        if (popup.current) popup.current.remove();
        const { onProjectClick, projectsData: pd } = cbRefs.current;
        if (onProjectClick) onProjectClick(p.name, pd?.[p.name]);
      });
      popup.current = new mapboxgl.Popup({ offset:16, closeButton:true, maxWidth:'220px' })
        .setLngLat(e.lngLat).setDOMContent(el).addTo(m);
    });
    m.on('mouseenter','project-markers',()=>{ m.getCanvas().style.cursor='pointer'; });
    m.on('mouseleave','project-markers',()=>{ m.getCanvas().style.cursor=''; });

  }, [mapReady, projectsData, showProjects]);

  const cm = METRICS.find(x => x.id === metric);

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', minHeight:500, background:'#0A1628' }}>
      <div style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 14px',
        background:'rgba(10,22,40,0.95)', backdropFilter:'blur(8px)',
        borderBottom:'1px solid rgba(255,255,255,0.08)', flexShrink:0, flexWrap:'wrap' }}>
        <div style={{ fontSize:14, fontWeight:700, color:'#fff', marginRight:4 }}>Dubai RE Map</div>
        <button onClick={toggle3D} style={{ padding:'4px 12px', borderRadius:8, border:'none', cursor:'pointer',
          fontSize:11, fontWeight:600, background:is3D?'#185FA5':'rgba(255,255,255,0.08)', color:'#fff' }}>
          {is3D ? '3D View' : '2D View'}
        </button>
        {METRICS.map(met => (
          <button key={met.id} onClick={() => setMetric(met.id)} style={{
            padding:'4px 11px', borderRadius:20, border:'none', cursor:'pointer', fontSize:11, fontWeight:600,
            background: metric===met.id ? met.colors[1] : 'rgba(255,255,255,0.08)',
            color:      metric===met.id ? '#fff' : 'rgba(255,255,255,0.5)',
          }}>{met.label}</button>
        ))}
        <button onClick={() => setShowProjects(p => !p)} style={{ marginLeft:'auto', padding:'4px 12px',
          borderRadius:20, border:'none', cursor:'pointer', fontSize:11, fontWeight:600,
          background: showProjects ? 'rgba(216,90,48,0.25)' : 'rgba(255,255,255,0.08)',
          color:      showProjects ? '#D85A30' : 'rgba(255,255,255,0.4)' }}>
          🔴 Projects {showProjects ? 'ON' : 'OFF'}
        </button>
      </div>

      <div ref={mapContainer} style={{ flex:1 }} />

      <div style={{ padding:'8px 14px', background:'rgba(10,22,40,0.95)',
        borderTop:'1px solid rgba(255,255,255,0.08)', display:'flex', alignItems:'center', gap:12, flexShrink:0 }}>
        <div style={{ fontSize:10, color:'rgba(255,255,255,0.35)' }}>
          {selected ? `📍 ${selected}` : 'Click any area bubble or 🔴 project marker'}
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:5, marginLeft:'auto' }}>
          <span style={{ fontSize:10, color:'rgba(255,255,255,0.35)' }}>Low</span>
          <div style={{ width:70, height:5, borderRadius:3,
            background:`linear-gradient(to right,${cm.colors[0]},${cm.colors[2]})` }}/>
          <span style={{ fontSize:10, color:'rgba(255,255,255,0.35)' }}>High</span>
        </div>
      </div>
    </div>
  );
}
