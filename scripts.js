// Funnel Chart
const ctxFunnel = document.getElementById('funnelChart');
new Chart(ctxFunnel, {
  type: 'bar',
  data: {
    labels: ['Awareness', 'Consideration', 'Purchase', 'Loyalty'],
    datasets: [{
      label: 'Usuarios',
      data: [10000, 6000, 3000, 1500],
      backgroundColor: ['#004C97', '#FDB913', '#FF8000', '#00B050']
    }]
  }
});

// Radar Chart
const ctxRadar = document.getElementById('radarChart');
new Chart(ctxRadar, {
  type: 'radar',
  data: {
    labels: ['SEO', 'Engagement', 'UX', 'Sostenibilidad', 'Innovación'],
    datasets: [{
      label: 'Arcor',
      data: [85, 60, 75, 80, 70],
      backgroundColor: 'rgba(0,76,151,0.2)',
      borderColor: '#004C97',
      borderWidth: 2
    },{
      label: 'Nestlé',
      data: [80, 75, 85, 60, 75],
      backgroundColor: 'rgba(253,185,19,0.2)',
      borderColor: '#FDB913',
      borderWidth: 2
    }]
  }
});

// Leaflet map
const map = L.map('heatmap').setView([ -34.6, -58.38 ], 3);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);
L.marker([-34.6, -58.38]).addTo(map).bindPopup("Buenos Aires - Sede Arcor");
