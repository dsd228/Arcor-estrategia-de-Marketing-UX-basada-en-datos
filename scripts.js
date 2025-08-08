// === Animación de entrada por scroll ===
const animateSections = () => {
  const sections = document.querySelectorAll("section");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  });
  sections.forEach(section => observer.observe(section));
};

// === Gráfico de embudo de conversión ===
const renderFunnelChart = () => {
  const ctxFunnel = document.getElementById('funnelChart').getContext('2d');
  new Chart(ctxFunnel, {
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
};

// === Gráfico radar comparativo UX ===
const renderRadarChart = () => {
  const ctxRadar = document.getElementById('radarChart').getContext('2d');
  new Chart(ctxRadar, {
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
        tooltip: { enabled: true }
      }
    }
  });
};

// === Mapa de calor con Leaflet ===
const renderHeatmap = () => {
  const heatmap = L.map('heatmap').setView([-15, -60], 3);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(heatmap);

  const heatPoints = [
    [-34.6, -58.4, 0.8], // Buenos Aires
    [-23.5, -46.6, 0.7], // São Paulo
    [-12.0, -77.0, 0.5], // Lima
    [-33.4, -70.6, 0.6], // Santiago
    [4.6, -74.0, 0.4],   // Bogotá
    [-16.5, -68.1, 0.3]  // La Paz
  ];

  const scriptHeat = document.createElement('script');
  scriptHeat.src = 'https://cdn.jsdelivr.net/npm/leaflet.heat/dist/leaflet-heat.js';
  scriptHeat.onload = () => {
    L.heatLayer(heatPoints, {
      radius: 25,
      blur: 20,
      maxZoom: 6
    }).addTo(heatmap);
  };
  document.head.appendChild(scriptHeat);
};

// === Inicialización ===
document.addEventListener('DOMContentLoaded', () => {
  animateSections();
  renderFunnelChart();
  renderRadarChart();
  renderHeatmap();
});
