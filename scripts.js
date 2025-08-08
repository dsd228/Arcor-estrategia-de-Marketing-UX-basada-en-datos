// === Embudo de conversión ===
function renderFunnelChart() {
  const ctx = document.getElementById('funnelChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Visitantes', 'Interacción', 'Leads', 'Ventas'],
      datasets: [{
        label: 'Conversiones',
        data: [120000, 60000, 15000, 4000],
        backgroundColor: ['#00eaff', '#00c4ff', '#0099ff', '#0077cc'],
        borderRadius: 8
      }]
    },
    options: {
      indexAxis: 'y',
      plugins: { legend: { display: false } },
      scales: { x: { beginAtZero: true } }
    }
  });
}

// === Radar UX comparativo ===
function renderRadarChart() {
  const ctxRadar = document.getElementById('radarChart').getContext('2d');
  new Chart(ctxRadar, {
    type: 'radar',
    data: {
      labels: ['Usabilidad', 'Velocidad', 'Accesibilidad', 'SEO', 'Engagement'],
      datasets: [
        {
          label: 'Arcor',
          data: [75, 82, 78, 88, 67],
          backgroundColor: 'rgba(0, 234, 255, 0.3)',
          borderColor: '#00eaff',
          pointBackgroundColor: '#00eaff'
        },
        {
          label: 'Nestlé',
          data: [80, 75, 82, 78, 80],
          backgroundColor: 'rgba(255, 230, 0, 0.3)',
          borderColor: '#ffe600',
          pointBackgroundColor: '#ffe600'
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          ticks: { stepSize: 20 },
          pointLabels: { color: '#eee' },
          grid: { color: '#333' }
        }
      },
      plugins: {
        legend: { labels: { color: '#eee' } },
        tooltip: {
          backgroundColor: '#1f1f1f',
          titleColor: '#00eaff',
          bodyColor: '#fff'
        }
      }
    }
  });
}

// === Mapa de calor con Leaflet ===
function renderHeatmap() {
  const map = L.map('heatmap').setView([-15, -60], 3);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  const heatData = [
    [-34.6, -58.4, 0.9], // Buenos Aires
    [-23.5, -46.6, 0.8], // São Paulo
    [-12.0, -77.0, 0.6], // Lima
    [-33.4, -70.6, 0.7], // Santiago
    [4.6, -74.0, 0.5]    // Bogotá
  ];

  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/leaflet.heat/dist/leaflet-heat.js';
  script.onload = () => {
    L.heatLayer(heatData, { radius: 25, blur: 20 }).addTo(map);
  };
  document.head.appendChild(script);
}

// === Inicialización ===
document.addEventListener('DOMContentLoaded', () => {
  renderFunnelChart();
  renderRadarChart();
  renderHeatmap();
});
