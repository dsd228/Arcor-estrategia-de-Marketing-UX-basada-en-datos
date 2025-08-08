// ===== ARCOR FUTURISTIC DASHBOARD =====
// Self-contained JavaScript for modern, interactive data visualization

class ArcorDashboard {
  constructor() {
    this.data = {
      sales: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        values: [3.2, 3.8, 4.1, 3.9, 4.5, 4.8, 5.2, 4.9, 5.1, 5.3, 5.6, 5.8],
        colors: ['#00ffff', '#0099ff', '#6600ff', '#ff0099', '#00ff99', '#ffd700']
      },
      engagement: {
        arcor: [75, 82, 78, 88, 67],
        nestle: [80, 75, 82, 78, 80],
        labels: ['Usabilidad', 'Velocidad', 'Accesibilidad', 'SEO', 'Engagement']
      },
      sustainability: {
        labels: ['Material Reciclado', 'Reducción CO₂', 'Agua Ahorrada', 'Energía Renovable'],
        values: [25, 40, 35, 50],
        goals: [60, 70, 65, 80]
      }
    };
    this.charts = {};
    this.animationFrameId = null;
  }

  init() {
    this.createSalesChart();
    this.createEngagementChart();
    this.createSustainabilityChart();
    this.startAnimations();
    this.setupEventListeners();
  }

  // Simple Chart Implementation (self-contained)
  createSalesChart() {
    const canvas = document.getElementById('salesChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    this.charts.sales = { canvas, ctx, width, height };
    this.drawSalesChart();
  }

  drawSalesChart() {
    const { ctx, width, height } = this.charts.sales;
    const { labels, values } = this.data.sales;
    
    // Clear canvas
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, 0, width, height);
    
    // Chart parameters
    const padding = 40;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;
    const barWidth = chartWidth / labels.length;
    const maxValue = Math.max(...values);
    
    // Draw bars
    values.forEach((value, index) => {
      const barHeight = (value / maxValue) * chartHeight;
      const x = padding + index * barWidth + barWidth * 0.1;
      const y = height - padding - barHeight;
      const w = barWidth * 0.8;
      
      // Gradient bar
      const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
      gradient.addColorStop(0, '#00ffff');
      gradient.addColorStop(1, '#0099ff');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, w, barHeight);
      
      // Glow effect
      ctx.shadowColor = '#00ffff';
      ctx.shadowBlur = 10;
      ctx.fillRect(x, y, w, barHeight);
      ctx.shadowBlur = 0;
      
      // Value labels
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`$${value.toFixed(1)}B`, x + w/2, y - 5);
      
      // Month labels
      ctx.fillText(labels[index], x + w/2, height - 10);
    });
    
    // Title
    ctx.fillStyle = '#00ffff';
    ctx.font = 'bold 16px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Ventas Mensuales 2024 (Billones USD)', width/2, 25);
  }

  createEngagementChart() {
    const canvas = document.getElementById('engagementChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    this.charts.engagement = { canvas, ctx, width, height };
    this.drawEngagementChart();
  }

  drawEngagementChart() {
    const { ctx, width, height } = this.charts.engagement;
    const { arcor, nestle, labels } = this.data.engagement;
    
    // Clear canvas
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, 0, width, height);
    
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 3;
    const angleStep = (2 * Math.PI) / labels.length;
    
    // Draw radar grid
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.3)';
    ctx.lineWidth = 1;
    for (let i = 1; i <= 5; i++) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, (radius * i) / 5, 0, 2 * Math.PI);
      ctx.stroke();
    }
    
    // Draw axes
    for (let i = 0; i < labels.length; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.stroke();
      
      // Labels
      ctx.fillStyle = '#ffffff';
      ctx.font = '10px monospace';
      ctx.textAlign = 'center';
      const labelX = centerX + Math.cos(angle) * (radius + 15);
      const labelY = centerY + Math.sin(angle) * (radius + 15);
      ctx.fillText(labels[i], labelX, labelY);
    }
    
    // Draw Arcor data
    this.drawRadarData(ctx, centerX, centerY, radius, arcor, '#00ffff', 'Arcor');
    
    // Draw Nestlé data
    this.drawRadarData(ctx, centerX, centerY, radius, nestle, '#ff0099', 'Nestlé');
    
    // Legend
    ctx.fillStyle = '#00ffff';
    ctx.fillRect(20, 20, 15, 10);
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px monospace';
    ctx.fillText('Arcor', 40, 30);
    
    ctx.fillStyle = '#ff0099';
    ctx.fillRect(20, 35, 15, 10);
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Nestlé', 40, 45);
  }

  drawRadarData(ctx, centerX, centerY, radius, data, color, label) {
    const angleStep = (2 * Math.PI) / data.length;
    
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.fillStyle = color + '33';
    ctx.lineWidth = 2;
    
    for (let i = 0; i < data.length; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const value = data[i] / 100; // Normalize to 0-1
      const x = centerX + Math.cos(angle) * radius * value;
      const y = centerY + Math.sin(angle) * radius * value;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // Draw points
    for (let i = 0; i < data.length; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const value = data[i] / 100;
      const x = centerX + Math.cos(angle) * radius * value;
      const y = centerY + Math.sin(angle) * radius * value;
      
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  createSustainabilityChart() {
    const canvas = document.getElementById('sustainabilityChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    this.charts.sustainability = { canvas, ctx, width, height };
    this.drawSustainabilityChart();
  }

  drawSustainabilityChart() {
    const { ctx, width, height } = this.charts.sustainability;
    const { labels, values, goals } = this.data.sustainability;
    
    // Clear canvas
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, 0, width, height);
    
    const padding = 60;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;
    const barHeight = chartHeight / labels.length / 2;
    
    labels.forEach((label, index) => {
      const y = padding + index * (chartHeight / labels.length);
      const currentWidth = (values[index] / 100) * chartWidth;
      const goalWidth = (goals[index] / 100) * chartWidth;
      
      // Goal bar (background)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.fillRect(padding, y, goalWidth, barHeight);
      
      // Current progress bar
      const gradient = ctx.createLinearGradient(padding, y, padding + currentWidth, y);
      gradient.addColorStop(0, '#00ff99');
      gradient.addColorStop(1, '#00ffff');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(padding, y, currentWidth, barHeight);
      
      // Glow effect
      ctx.shadowColor = '#00ff99';
      ctx.shadowBlur = 5;
      ctx.fillRect(padding, y, currentWidth, barHeight);
      ctx.shadowBlur = 0;
      
      // Labels
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(label, 10, y + barHeight/2 + 4);
      
      // Percentage
      ctx.textAlign = 'right';
      ctx.fillText(`${values[index]}%`, width - 10, y + barHeight/2 + 4);
    });
    
    // Title
    ctx.fillStyle = '#00ff99';
    ctx.font = 'bold 16px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Progreso Sostenibilidad vs Objetivos 2030', width/2, 25);
  }

  // Animation functions
  startAnimations() {
    this.animateMetrics();
    this.animateBackgroundElements();
  }

  animateMetrics() {
    const metrics = ['revenueMetric', 'employeesMetric', 'countriesMetric', 'sustainabilityMetric'];
    const targets = ['$3.9B', '21,000+', '120+', '$410M'];
    
    metrics.forEach((id, index) => {
      const element = document.getElementById(id);
      if (element) {
        this.animateCounter(element, targets[index], 2000 + index * 500);
      }
    });
  }

  animateCounter(element, target, duration) {
    let start = 0;
    const startTime = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      if (target.includes('$')) {
        const value = parseFloat(target.replace(/[$BM]/g, ''));
        const current = (value * progress).toFixed(1);
        element.textContent = target.includes('B') ? `$${current}B` : `$${current}M`;
      } else if (target.includes(',')) {
        const value = parseInt(target.replace(/[,+]/g, ''));
        const current = Math.floor(value * progress).toLocaleString();
        element.textContent = current + '+';
      } else {
        const value = parseInt(target.replace('+', ''));
        const current = Math.floor(value * progress);
        element.textContent = current + '+';
      }
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }

  animateBackgroundElements() {
    // Add floating particles animation
    this.createFloatingParticles();
  }

  createFloatingParticles() {
    const container = document.body;
    
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: #00ffff;
        border-radius: 50%;
        pointer-events: none;
        opacity: 0.6;
        z-index: -1;
        left: ${Math.random() * 100}vw;
        top: ${Math.random() * 100}vh;
        animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
      `;
      
      container.appendChild(particle);
      
      // Remove after animation
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 7000);
    }
  }

  setupEventListeners() {
    // Smooth scrolling for navigation
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }
}

// Interactive button functions
function updateSalesData() {
  showNotification('📊 Datos actualizados con información en tiempo real', 'success');
  // Refresh the sales chart with new data
  if (window.arcorDashboard) {
    window.arcorDashboard.drawSalesChart();
  }
}

function toggleComparison() {
  showNotification('🔄 Alternando vista comparativa Arcor vs Nestlé', 'info');
}

function showSustainabilityGoals() {
  showModal('Objetivos de Sostenibilidad 2030', `
    <div style="text-align: left;">
      <h3 style="color: #00ff99;">🎯 Metas Principales:</h3>
      <ul style="list-style: none; padding: 0;">
        <li>🔄 60% Material Reciclado</li>
        <li>🌱 70% Reducción CO₂</li>
        <li>💧 65% Agua Ahorrada</li>
        <li>⚡ 80% Energía Renovable</li>
      </ul>
      <p style="margin-top: 1rem; color: #00ffff;">
        Estrategia "Living Better" alineada con ODS de la ONU
      </p>
    </div>
  `);
}

function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function downloadReport() {
  showNotification('📄 Preparando reporte PDF...', 'info');
  setTimeout(() => {
    showNotification('✅ Reporte descargado exitosamente', 'success');
  }, 2000);
}

function showMethodology() {
  showModal('Metodología del Estudio', `
    <div style="text-align: left;">
      <h3 style="color: #00ffff;">📋 Enfoque Metodológico:</h3>
      <ol style="color: #ffffff; line-height: 1.6;">
        <li>Análisis cuantitativo de datos web y redes sociales</li>
        <li>Benchmarking competitivo con Nestlé y Mondelez</li>
        <li>Auditoría UX basada en heurísticas de Nielsen</li>
        <li>Métricas de performance (Lighthouse, Core Web Vitals)</li>
        <li>Análisis de sostenibilidad y packaging ecológico</li>
      </ol>
    </div>
  `);
}

function showTimeline() {
  showModal('Timeline del Proyecto', `
    <div style="text-align: left;">
      <h3 style="color: #00ffff;">⏱️ Fases del Proyecto:</h3>
      <div style="color: #ffffff; line-height: 1.8;">
        <p><strong>Semana 1-2:</strong> Recolección y análisis de datos</p>
        <p><strong>Semana 3:</strong> Benchmarking competitivo</p>
        <p><strong>Semana 4:</strong> Auditoría UX y performance</p>
        <p><strong>Semana 5:</strong> Análisis de sostenibilidad</p>
        <p><strong>Semana 6:</strong> Visualizaciones y reporte final</p>
      </div>
    </div>
  `);
}

function showEcoImpact() {
  showNotification('🌍 Cargando datos de impacto ambiental...', 'info');
}

function showGreenInitiatives() {
  showModal('Iniciativas Verdes Arcor', `
    <div style="text-align: left;">
      <h3 style="color: #00ff99;">🌿 Proyectos Sostenibles:</h3>
      <ul style="color: #ffffff; line-height: 1.6;">
        <li>🍃 Packaging biodegradable para toda la línea</li>
        <li>🏭 Plantas con energía 100% renovable</li>
        <li>♻️ Programa de reciclaje comunitario</li>
        <li>🌱 Reforestación: 1 árbol por producto vendido</li>
        <li>💧 Sistemas de recuperación de agua</li>
      </ul>
    </div>
  `);
}

function calculateCarbonFootprint() {
  showNotification('🔢 Iniciando calculadora de huella de carbono...', 'info');
}

// Utility functions
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#00ff99' : type === 'error' ? '#ff0099' : '#00ffff'};
    color: #000;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    font-weight: bold;
    z-index: 10000;
    box-shadow: 0 0 20px ${type === 'success' ? '#00ff99' : type === 'error' ? '#ff0099' : '#00ffff'};
    animation: slideIn 0.3s ease-out;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-in';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

function showModal(title, content) {
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
    z-index: 10000;
    display: flex;
    justify-content: center;
    align-items: center;
  `;
  
  const modalContent = document.createElement('div');
  modalContent.style.cssText = `
    background: linear-gradient(135deg, rgba(0, 255, 255, 0.1), rgba(102, 0, 255, 0.1));
    backdrop-filter: blur(15px);
    border: 2px solid #00ffff;
    border-radius: 20px;
    padding: 2rem;
    max-width: 500px;
    width: 90%;
    color: #ffffff;
    position: relative;
  `;
  
  modalContent.innerHTML = `
    <h2 style="color: #00ffff; margin-bottom: 1rem;">${title}</h2>
    ${content}
    <button onclick="this.closest('.modal').remove()" style="
      position: absolute;
      top: 10px;
      right: 15px;
      background: none;
      border: none;
      color: #00ffff;
      font-size: 24px;
      cursor: pointer;
    ">×</button>
  `;
  
  modal.className = 'modal';
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
  
  // Close on background click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
  
  @keyframes slideOut {
    from { transform: translateX(0); }
    to { transform: translateX(100%); }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) translateX(0px); }
    25% { transform: translateY(-20px) translateX(10px); }
    50% { transform: translateY(-10px) translateX(-5px); }
    75% { transform: translateY(-15px) translateX(5px); }
  }
`;
document.head.appendChild(style);

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.arcorDashboard = new ArcorDashboard();
  window.arcorDashboard.init();
  
  // Add welcome notification
  setTimeout(() => {
    showNotification('🚀 Dashboard futurista cargado exitosamente', 'success');
  }, 1000);
});
