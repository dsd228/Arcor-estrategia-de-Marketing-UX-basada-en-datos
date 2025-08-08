// Chart Funnel - Embudo de conversión
const ctxFunnel = document.getElementById('funnelChart').getContext('2d');
const funnelChart = new Chart(ctxFunnel, {
  type: 'bar',
  data: {
    labels: ['Visitantes', 'Interacción', 'Leads', 'Ventas'],
    datasets: [{
      label: 'Conversiones',
      data: [100000, 45000, 12000, 3500],
      backgroundColor: ['#d92d2b', '#f06e5a', '#f9a66c', '#fcdcb3'],
      borderRadius: 8
    }]
  },
  options: {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: ctx => `${ctx.label}: ${ctx.raw.toLocaleString()}`
        }
      }
    },
    scales: {
      x: { beginAtZero: true }
    }
  }
});

// Chart Radar - Radar UX comparativo
const ctxRadar = document.getElementById('radarChart').getContext('2d');
const radarChart = new Chart(ctxRadar, {
  type: 'radar',
  data: {
    labels: ['Usabilidad', 'Velocidad', 'Accesibilidad', 'SEO', 'Engagement'],
    datasets: [
      {
        label: 'Arcor',
        data: [75, 82, 78, 88, 67],
        backgroundColor: 'rgba(217, 45, 43, 0.35)',
        borderColor: '#d92d2b',
        borderWidth: 2,
        pointBackgroundColor: '#d92d2b'
      },
      {
        label: 'Nestlé',
        data: [80, 75, 82, 78, 80],
        backgroundColor: 'rgba(0, 123, 255, 0.35)',
        borderColor: '#007bff',
        borderWidth: 2,
        pointBackgroundColor: '#007bff'
      }
    ]
  },
  options: {
    responsive: true,
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: { stepSize: 20 }
      }
    },
    plugins: {
      tooltip: {
        enabled: true
      }
    }
  }
});

// Heatmap con Leaflet
const heatmap = L.map('heatmap').setView([-15, -60], 3);

// Capa base OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(heatmap);

// Datos de consumo ficticios para heatmap (lat, lon, intensidad)
const heatPoints = [
  [-34.6, -58.4, 0.8], // Buenos Aires, Argentina
  [-23.5, -46.6, 0.7], // São Paulo, Brasil
  [-12.0, -77.0, 0.5], // Lima, Perú
  [-33.4, -70.6, 0.6], // Santiago, Chile
  [4.6, -74.0, 0.4],   // Bogotá, Colombia
  [-16.5, -68.1, 0.3]  // La Paz, Bolivia
];

// Agregar puntos al heatmap usando plugin heatLayer de Leaflet.heat
// Incluimos la librería directamente aquí:
const scriptHeat = document.createElement('script');
scriptHeat.src = 'https://cdn.jsdelivr.net/npm/leaflet.heat/dist/leaflet-heat.js';
scriptHeat.onload = () => {
  L.heatLayer(heatPoints, {radius: 25, blur: 20, maxZoom: 6}).addTo(heatmap);
};
document.head.appendChild(scriptHeat);
