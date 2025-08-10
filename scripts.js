/* scripts.js
  - Actualizaciones automáticas (simulación) cada 10 segundos
  - Charts con Chart.js
  - Map (Leaflet) con puntos / "heat" markers (simulado)
  - Parallax minimal (scroll-based)
  - ScrollReveal for entry animations
  - Hamburger menu
*/

/* ---------- Helpers: mock data / fetch ---------- */
async function fetchRemoteData() {
  // Intenta cargar datos desde 'data.json' en la misma carpeta.
  // Si no existe o falla, genera datos simulados (mock).
  try {
    const res = await fetch('data.json', {cache: "no-store"});
    if (!res.ok) throw new Error('no data.json');
    const json = await res.json();
    return json;
  } catch (err) {
    return generateMockData();
  }
}

function generateMockData() {
  // Genera datos verosímiles para las visualizaciones
  const now = Date.now();
  // Series temporal para Engagement vs SEO (últimos 8 puntos)
  const times = Array.from({length:8}).map((_,i) => {
    const t = new Date(now - (7-i)*60*60*1000);
    return t.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
  });

  const engagement = times.map(() => Math.round(30 + Math.random()*70)); // 30-100
  const seoScore = times.map(() => Math.round(50 + Math.random()*50)); // 50-100

  return {
    timestamp: new Date().toISOString(),
    funnel: {
      labels: ['Awareness','Consideration','Purchase','Loyalty'],
      values: [10000, Math.round(10000*0.58), Math.round(10000*0.28), Math.round(10000*0.12)]
    },
    radar: {
      labels: ['SEO','Engagement','UX','Sostenibilidad','Innovación'],
      arcor: [85, 60 + Math.round(Math.random()*20), 75, 80, 70 + Math.round(Math.random()*10)],
      nestle: [80, 70 + Math.round(Math.random()*10), 85, 60, 75]
    },
    timeSeries: {
      labels: times,
      engagement,
      seoScore
    },
    eco: {
      kgPlasticAvoided: Math.round(100000 + Math.random()*50000),
      pctSustainable: Math.round(12 + Math.random()*18),
      pctCompostable: Math.round(6 + Math.random()*10)
    },
    geo: [
      {country:'Argentina', lat:-34.6, lon:-58.38, value: Math.round(40 + Math.random()*60)},
      {country:'Brasil', lat:-15.78, lon:-47.93, value: Math.round(40 + Math.random()*60)},
      {country:'Chile', lat:-33.44, lon:-70.65, value: Math.round(20 + Math.random()*80)},
      {country:'México', lat:19.43, lon:-99.13, value: Math.round(30 + Math.random()*70)}
    ]
  };
}

/* ---------- DOM shortcuts ---------- */
const lastUpdatedEl = document.getElementById('last-updated');
const kgPlasticEl = document.getElementById('kg-plastic');
const pctSustainableEl = document.getElementById('pct-sustainable');
const compostableEl = document.getElementById('compostable');

/* ---------- Charts init ---------- */
let funnelChart = null;
let radarChart = null;
let lineChart = null;
let map = null;
let markers = [];

/* Funnel (bar) */
function initFunnel(ctx) {
  funnelChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [],
      datasets: [{
        label: 'Usuarios',
        data: [],
        backgroundColor: ['#004C97', '#FDB913', '#FF8000', '#00B050']
      }]
    },
    options: {
      responsive:true,
      plugins: { legend: { display:false } },
      scales: {
        y: { beginAtZero:true }
      }
    }
  });
}

/* Radar */
function initRadar(ctx) {
  radarChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: [],
      datasets: [
        { label:'Arcor', data: [], backgroundColor: 'rgba(0,76,151,0.18)', borderColor:'#004C97', borderWidth:2 },
        { label:'Nestlé', data: [], backgroundColor: 'rgba(253,185,19,0.12)', borderColor:'#FDB913', borderWidth:2 }
      ]
    },
    options: { responsive:true }
  });
}

/* Time series */
function initLine(ctx) {
  lineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [
        { label:'Engagement', data: [], fill:false, tension:0.3, borderColor:'#FDB913', backgroundColor:'#FDB913' },
        { label:'SEO Score', data: [], fill:false, tension:0.3, borderColor:'#004C97', backgroundColor:'#004C97' }
      ]
    },
    options: { responsive:true, interaction:{mode:'index', intersect:false} }
  });
}

/* Map */
function initMap() {
  map = L.map('heatmap', { minZoom:2, maxZoom:6, zoomControl:true }).setView([-20, -55], 3);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);
}

/* Update map markers */
function updateMapPoints(geo) {
  // remove existing
  markers.forEach(m => map.removeLayer(m));
  markers = [];
  geo.forEach(g => {
    const circle = L.circleMarker([g.lat, g.lon], {
      radius: 8 + Math.log(g.value+1),
      color: '#ff6f00',
      fillColor: '#ffcc66',
      fillOpacity: 0.8,
      weight: 1
    }).addTo(map).bindPopup(`<strong>${g.country}</strong><br/>Consumo índice: ${g.value}`);
    markers.push(circle);
  });
}

/* ---------- Update UI from data ---------- */
function applyDataToUI(data) {
  // timestamp
  const ts = new Date(data.timestamp || Date.now());
  lastUpdatedEl.textContent = `Última actualización: ${ts.toLocaleString()}`;

  // Funnel
  if (funnelChart) {
    funnelChart.data.labels = data.funnel.labels;
    funnelChart.data.datasets[0].data = data.funnel.values;
    funnelChart.update();
  }

  // Radar
  if (radarChart) {
    radarChart.data.labels = data.radar.labels;
    radarChart.data.datasets[0].data = data.radar.arcor;
    radarChart.data.datasets[1].data = data.radar.nestle;
    radarChart.update();
  }

  // Line
  if (lineChart) {
    lineChart.data.labels = data.timeSeries.labels;
    lineChart.data.datasets[0].data = data.timeSeries.engagement;
    lineChart.data.datasets[1].data = data.timeSeries.seoScore;
    lineChart.update();
  }

  // Eco KPIs
  if (kgPlasticEl) kgPlasticEl.textContent = (data.eco.kgPlasticAvoided || 0).toLocaleString();
  if (pctSustainableEl) pctSustainableEl.textContent = `${data.eco.pctSustainable || 0}%`;
  if (compostableEl) compostableEl.textContent = `${data.eco.pctCompostable || 0}%`;

  // Map
  if (map && data.geo) updateMapPoints(data.geo);
}

/* ---------- Main data loop ---------- */
async function refreshLoop() {
  const newData = await fetchRemoteData();
  applyDataToUI(newData);
}

/* ---------- Parallax (simple, performant) ---------- */
function initParallax() {
  const hero = document.getElementById('hero');
  if(!hero) return;
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    // Move background position subtly (works even if background-attachment fixed is not supported)
    hero.style.backgroundPosition = `center ${Math.max(-10, scrolled * 0.15)}px`;
  }, { passive: true });
}

/* ---------- ScrollReveal init ---------- */
function initScrollReveal() {
  if (typeof ScrollReveal === 'undefined') return;
  ScrollReveal().reveal('.reveal', { distance:'30px', duration:700, easing:'ease-in-out', origin:'bottom', interval:80, cleanup:true });
}

/* ---------- Hamburger ---------- */
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  if (!hamburger || !navMenu) return;
  hamburger.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(open));
    if (open) navMenu.style.display = 'flex';
    else navMenu.style.display = '';
    // animate hamburger lines
    hamburger.classList.toggle('is-open');
  });

  // close on link click (mobile)
  navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    if (navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      navMenu.style.display = '';
      hamburger.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  }));
}

/* ---------- Boot ---------- */
window.addEventListener('DOMContentLoaded', async () => {
  // Init charts
  const funnelCtx = document.getElementById('funnelChart')?.getContext('2d');
  const radarCtx  = document.getElementById('radarChart')?.getContext('2d');
  const lineCtx   = document.getElementById('lineChart')?.getContext('2d');

  if (funnelCtx) initFunnel(funnelCtx);
  if (radarCtx) initRadar(radarCtx);
  if (lineCtx) initLine(lineCtx);

  // Map
  try { initMap(); } catch(e){ console.warn('Leaflet init failed', e) }

  // UI/UX
  initParallax();
  initScrollReveal();
  initHamburger();

  // First refresh now
  await refreshLoop();

  // Repeat every 10 seconds (10000 ms)
  setInterval(refreshLoop, 10000);
});
