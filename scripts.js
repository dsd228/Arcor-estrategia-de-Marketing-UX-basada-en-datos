// Gráfico embudo (funnel) con Chart.js
const funnelCtx = document.getElementById('funnelChart').getContext('2d');
const funnelChart = new Chart(funnelCtx, {
  type: 'bar',
  data: {
    labels: ['Visitantes', 'Visitantes interesados', 'Leads', 'Clientes'],
    datasets: [{
      label: 'Funnel de Conversión',
      data: [50000, 15000, 3500, 700],
      backgroundColor: [
        '#f5a623', '#f7c948', '#004990', '#002e5d'
      ],
      borderRadius: 5,
      borderSkipped: false
    }]
  },
  options: {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 60000
      },
      y: {
        ticks: {
          font: { size: 14, weight: '600' },
          color: '#004990'
        }
      }
    }
  }
});

// Gráfico radar UX comparativo
const radarCtx = document.getElementById('radarChart').getContext('2d');
const radarChart = new Chart(radarCtx, {
  type: 'radar',
  data: {
    labels: ['Usabilidad', 'Accesibilidad', 'Velocidad', 'Contenido', 'Diseño'],
    datasets: [
      {
        label: 'Arcor',
        data: [85, 78, 80, 75, 82],
        fill: true,
        backgroundColor: 'rgba(0, 73, 144, 0.4)',
        borderColor: '#004990',
        pointBackgroundColor: '#002e5d',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#f5a623',
        pointHoverBorderColor: '#004990'
      },
      {
        label: 'Nestlé',
        data: [78, 72, 75, 82, 79],
        fill: true,
        backgroundColor: 'rgba(245, 166, 35, 0.4)',
        borderColor: '#f5a623',
        pointBackgroundColor: '#f7c948',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#004990',
        pointHoverBorderColor: '#f5a623'
      }
    ]
  },
  options: {
    responsive: true,
    scales: {
      r: {
        angleLines: { color: '#ddd' },
        grid: { color: '#ddd' },
        pointLabels: { color: '#222', font: { size: 14, weight: '600' } },
        ticks: { display: false, beginAtZero: true, max: 100 }
      }
    },
    plugins: {
      legend: {
        position: 'top',
        labels: { font: { size: 14, weight: '600' } }
      }
    }
  }
});
