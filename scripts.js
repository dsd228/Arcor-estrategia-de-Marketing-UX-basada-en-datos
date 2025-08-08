// ===== Theme Toggle Functionality =====
document.addEventListener('DOMContentLoaded', function() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  const body = document.body;

  // Check for saved theme preference or default to light mode
  const currentTheme = localStorage.getItem('theme') || 'light';
  body.classList.toggle('dark-mode', currentTheme === 'dark');
  updateThemeIcon(currentTheme);

  themeToggleBtn.addEventListener('click', function() {
    const isDarkMode = body.classList.contains('dark-mode');
    const newTheme = isDarkMode ? 'light' : 'dark';
    
    body.classList.toggle('dark-mode', !isDarkMode);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    // Add smooth transition effect
    body.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      body.style.transition = '';
    }, 300);
  });

  function updateThemeIcon(theme) {
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }

  // Initialize charts after DOM is loaded
  initializeCharts();
  
  // Add scroll animations
  addScrollAnimations();
  
  // Add smooth scrolling for navigation
  addSmoothScrolling();
});

// ===== Enhanced Chart Configurations =====
function getChartColors() {
  const isDarkMode = document.body.classList.contains('dark-mode');
  
  return {
    primary: isDarkMode ? '#00d4ff' : '#0066cc',
    secondary: isDarkMode ? '#e53e3e' : '#c53030',
    accent: isDarkMode ? '#fbbf24' : '#f59e0b',
    text: isDarkMode ? '#f8fafc' : '#1a1a2e',
    grid: isDarkMode ? 'rgba(248, 250, 252, 0.1)' : 'rgba(26, 26, 46, 0.1)',
    background: isDarkMode ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)'
  };
}

function getChartOptions(type = 'default') {
  const colors = getChartColors();
  
  const baseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: colors.text,
          font: {
            family: 'Orbitron, sans-serif',
            size: 12,
            weight: '600'
          },
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: colors.background,
        titleColor: colors.primary,
        bodyColor: colors.text,
        borderColor: colors.primary,
        borderWidth: 1,
        cornerRadius: 10,
        padding: 12,
        displayColors: true,
        titleFont: {
          family: 'Orbitron, sans-serif',
          weight: 'bold'
        },
        bodyFont: {
          family: 'Roboto Mono, monospace'
        }
      }
    },
    animation: {
      duration: 2000,
      easing: 'easeInOutCubic'
    }
  };

  if (type === 'bar' || type === 'line') {
    baseOptions.scales = {
      x: {
        grid: {
          color: colors.grid,
          borderColor: colors.grid
        },
        ticks: {
          color: colors.text,
          font: {
            family: 'Roboto Mono, monospace',
            size: 11
          }
        }
      },
      y: {
        grid: {
          color: colors.grid,
          borderColor: colors.grid
        },
        ticks: {
          color: colors.text,
          font: {
            family: 'Roboto Mono, monospace',
            size: 11
          }
        }
      }
    };
  }

  if (type === 'radar') {
    baseOptions.scales = {
      r: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: colors.grid
        },
        pointLabels: {
          color: colors.text,
          font: {
            family: 'Orbitron, sans-serif',
            size: 11,
            weight: '600'
          }
        },
        ticks: {
          color: colors.text,
          font: {
            family: 'Roboto Mono, monospace',
            size: 10
          },
          stepSize: 20,
          showLabelBackdrop: false
        }
      }
    };
  }

  return baseOptions;
}

// ===== Chart Initialization =====
function initializeCharts() {
  const colors = getChartColors();
  
  // Check if Chart.js is available, otherwise use fallback
  if (typeof Chart !== 'undefined') {
    // Funnel Chart (Conversion Funnel)
    renderFunnelChart(colors);
    
    // Radar Chart (UX Comparison)
    renderRadarChart(colors);
    
    // Engagement Chart (Social Media)
    renderEngagementChart(colors);
    
    // Geographic Chart (Consumption Distribution)
    renderGeographicChart(colors);
  } else {
    // Fallback to CSS-based charts when Chart.js is not available
    renderFallbackCharts(colors);
  }
}

// ===== Funnel Chart =====
function renderFunnelChart(colors) {
  const canvas = document.getElementById('funnelChart');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Visitantes', 'Interacción', 'Leads', 'Ventas'],
      datasets: [{
        label: 'Conversiones',
        data: [120000, 60000, 15000, 4000],
        backgroundColor: [
          `${colors.primary}AA`,
          `${colors.primary}88`,
          `${colors.primary}66`,
          `${colors.primary}44`
        ],
        borderColor: colors.primary,
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      }]
    },
    options: {
      ...getChartOptions('bar'),
      indexAxis: 'y',
      plugins: {
        ...getChartOptions('bar').plugins,
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          ...getChartOptions('bar').scales.x,
          beginAtZero: true,
          title: {
            display: true,
            text: 'Número de Usuarios',
            color: colors.text,
            font: {
              family: 'Orbitron, sans-serif',
              weight: '600'
            }
          }
        },
        y: {
          ...getChartOptions('bar').scales.y,
          title: {
            display: true,
            text: 'Etapas del Embudo',
            color: colors.text,
            font: {
              family: 'Orbitron, sans-serif',
              weight: '600'
            }
          }
        }
      }
    }
  });
}

// ===== Radar Chart =====
function renderRadarChart(colors) {
  const canvas = document.getElementById('radarChart');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  
  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['Usabilidad', 'Velocidad', 'Accesibilidad', 'SEO', 'Engagement'],
      datasets: [
        {
          label: 'Arcor',
          data: [75, 82, 78, 88, 67],
          backgroundColor: `${colors.primary}40`,
          borderColor: colors.primary,
          borderWidth: 3,
          pointBackgroundColor: colors.primary,
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8
        },
        {
          label: 'Nestlé',
          data: [80, 75, 82, 78, 80],
          backgroundColor: `${colors.secondary}40`,
          borderColor: colors.secondary,
          borderWidth: 3,
          pointBackgroundColor: colors.secondary,
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8
        }
      ]
    },
    options: getChartOptions('radar')
  });
}

// ===== Engagement Chart =====
function renderEngagementChart(colors) {
  const canvas = document.getElementById('engagementChart');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Facebook', 'Instagram', 'Twitter', 'LinkedIn', 'TikTok'],
      datasets: [{
        label: 'Engagement (%)',
        data: [28, 35, 15, 12, 10],
        backgroundColor: [
          colors.primary,
          colors.secondary,
          colors.accent,
          `${colors.primary}80`,
          `${colors.secondary}80`
        ],
        borderColor: '#fff',
        borderWidth: 3,
        hoverOffset: 15,
        hoverBorderWidth: 4
      }]
    },
    options: {
      ...getChartOptions(),
      cutout: '60%',
      plugins: {
        ...getChartOptions().plugins,
        legend: {
          ...getChartOptions().plugins.legend,
          position: 'bottom',
          labels: {
            ...getChartOptions().plugins.legend.labels,
            usePointStyle: true,
            pointStyle: 'circle'
          }
        }
      }
    }
  });
}

// ===== Fallback Charts (CSS-based) =====
function renderFallbackCharts(colors) {
  renderFallbackFunnelChart();
  renderFallbackRadarChart();
  renderFallbackEngagementChart();
  renderFallbackGeographicChart();
}

function renderFallbackFunnelChart() {
  const canvas = document.getElementById('funnelChart');
  if (!canvas) return;
  
  canvas.style.display = 'none';
  const container = canvas.parentElement;
  
  const fallbackHTML = `
    <div class="fallback-chart funnel-chart">
      <div class="chart-bar" style="width: 100%;">
        <span class="bar-label">Visitantes</span>
        <span class="bar-value">120,000</span>
      </div>
      <div class="chart-bar" style="width: 50%;">
        <span class="bar-label">Interacción</span>
        <span class="bar-value">60,000</span>
      </div>
      <div class="chart-bar" style="width: 12.5%;">
        <span class="bar-label">Leads</span>
        <span class="bar-value">15,000</span>
      </div>
      <div class="chart-bar" style="width: 3.3%;">
        <span class="bar-label">Ventas</span>
        <span class="bar-value">4,000</span>
      </div>
    </div>
  `;
  
  container.insertAdjacentHTML('beforeend', fallbackHTML);
}

function renderFallbackRadarChart() {
  const canvas = document.getElementById('radarChart');
  if (!canvas) return;
  
  canvas.style.display = 'none';
  const container = canvas.parentElement;
  
  const fallbackHTML = `
    <div class="fallback-chart radar-chart">
      <div class="radar-comparison">
        <div class="radar-item">
          <span class="radar-label">Usabilidad</span>
          <div class="radar-bars">
            <div class="radar-bar arcor" style="width: 75%;" title="Arcor: 75%"></div>
            <div class="radar-bar nestle" style="width: 80%;" title="Nestlé: 80%"></div>
          </div>
        </div>
        <div class="radar-item">
          <span class="radar-label">Velocidad</span>
          <div class="radar-bars">
            <div class="radar-bar arcor" style="width: 82%;" title="Arcor: 82%"></div>
            <div class="radar-bar nestle" style="width: 75%;" title="Nestlé: 75%"></div>
          </div>
        </div>
        <div class="radar-item">
          <span class="radar-label">Accesibilidad</span>
          <div class="radar-bars">
            <div class="radar-bar arcor" style="width: 78%;" title="Arcor: 78%"></div>
            <div class="radar-bar nestle" style="width: 82%;" title="Nestlé: 82%"></div>
          </div>
        </div>
        <div class="radar-item">
          <span class="radar-label">SEO</span>
          <div class="radar-bars">
            <div class="radar-bar arcor" style="width: 88%;" title="Arcor: 88%"></div>
            <div class="radar-bar nestle" style="width: 78%;" title="Nestlé: 78%"></div>
          </div>
        </div>
        <div class="radar-item">
          <span class="radar-label">Engagement</span>
          <div class="radar-bars">
            <div class="radar-bar arcor" style="width: 67%;" title="Arcor: 67%"></div>
            <div class="radar-bar nestle" style="width: 80%;" title="Nestlé: 80%"></div>
          </div>
        </div>
      </div>
      <div class="radar-legend">
        <div class="legend-item">
          <div class="legend-color arcor"></div>
          <span>Arcor</span>
        </div>
        <div class="legend-item">
          <div class="legend-color nestle"></div>
          <span>Nestlé</span>
        </div>
      </div>
    </div>
  `;
  
  container.insertAdjacentHTML('beforeend', fallbackHTML);
}

function renderFallbackEngagementChart() {
  const canvas = document.getElementById('engagementChart');
  if (!canvas) return;
  
  canvas.style.display = 'none';
  const container = canvas.parentElement;
  
  const fallbackHTML = `
    <div class="fallback-chart pie-chart">
      <div class="pie-segments">
        <div class="pie-segment" style="--angle: 101deg; --color: var(--arcor-cyan);" title="Facebook: 28%">
          <span class="pie-label">Facebook 28%</span>
        </div>
        <div class="pie-segment" style="--angle: 126deg; --color: var(--arcor-red);" title="Instagram: 35%">
          <span class="pie-label">Instagram 35%</span>
        </div>
        <div class="pie-segment" style="--angle: 54deg; --color: var(--arcor-gold);" title="Twitter: 15%">
          <span class="pie-label">Twitter 15%</span>
        </div>
        <div class="pie-segment" style="--angle: 43deg; --color: var(--arcor-blue);" title="LinkedIn: 12%">
          <span class="pie-label">LinkedIn 12%</span>
        </div>
        <div class="pie-segment" style="--angle: 36deg; --color: var(--arcor-silver);" title="TikTok: 10%">
          <span class="pie-label">TikTok 10%</span>
        </div>
      </div>
    </div>
  `;
  
  container.insertAdjacentHTML('beforeend', fallbackHTML);
}

function renderFallbackGeographicChart() {
  const canvas = document.getElementById('geographicChart');
  if (!canvas) return;
  
  canvas.style.display = 'none';
  const container = canvas.parentElement;
  
  const fallbackHTML = `
    <div class="fallback-chart geographic-chart">
      <div class="geo-bars">
        <div class="geo-item">
          <span class="geo-label">Argentina</span>
          <div class="geo-bar">
            <div class="geo-consumption" style="width: 100%;" title="$450M"></div>
            <div class="geo-growth" style="width: 12%;" title="12% crecimiento"></div>
          </div>
          <span class="geo-value">$450M (12%)</span>
        </div>
        <div class="geo-item">
          <span class="geo-label">Brasil</span>
          <div class="geo-bar">
            <div class="geo-consumption" style="width: 84%;" title="$380M"></div>
            <div class="geo-growth" style="width: 8%;" title="8% crecimiento"></div>
          </div>
          <span class="geo-value">$380M (8%)</span>
        </div>
        <div class="geo-item">
          <span class="geo-label">Chile</span>
          <div class="geo-bar">
            <div class="geo-consumption" style="width: 27%;" title="$120M"></div>
            <div class="geo-growth" style="width: 15%;" title="15% crecimiento"></div>
          </div>
          <span class="geo-value">$120M (15%)</span>
        </div>
        <div class="geo-item">
          <span class="geo-label">Uruguay</span>
          <div class="geo-bar">
            <div class="geo-consumption" style="width: 19%;" title="$85M"></div>
            <div class="geo-growth" style="width: 18%;" title="18% crecimiento"></div>
          </div>
          <span class="geo-value">$85M (18%)</span>
        </div>
        <div class="geo-item">
          <span class="geo-label">Perú</span>
          <div class="geo-bar">
            <div class="geo-consumption" style="width: 21%;" title="$95M"></div>
            <div class="geo-growth" style="width: 22%;" title="22% crecimiento"></div>
          </div>
          <span class="geo-value">$95M (22%)</span>
        </div>
        <div class="geo-item">
          <span class="geo-label">Colombia</span>
          <div class="geo-bar">
            <div class="geo-consumption" style="width: 24%;" title="$110M"></div>
            <div class="geo-growth" style="width: 20%;" title="20% crecimiento"></div>
          </div>
          <span class="geo-value">$110M (20%)</span>
        </div>
      </div>
      <div class="geo-legend">
        <div class="legend-item">
          <div class="legend-color consumption"></div>
          <span>Consumo (Millones USD)</span>
        </div>
        <div class="legend-item">
          <div class="legend-color growth"></div>
          <span>Crecimiento (%)</span>
        </div>
      </div>
    </div>
  `;
  
  container.insertAdjacentHTML('beforeend', fallbackHTML);
}

// ===== Scroll Animations =====
function addScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        
        // Add staggered animation for grid items
        const gridItems = entry.target.querySelectorAll('.glass-card');
        gridItems.forEach((item, index) => {
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, index * 100);
        });
      }
    });
  }, observerOptions);

  // Observe all sections
  document.querySelectorAll('.glass-section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });

  // Observe grid items
  document.querySelectorAll('.glass-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  });
}

// ===== Smooth Scrolling =====
function addSmoothScrolling() {
  document.querySelectorAll('.glass-nav-item').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const headerOffset = 100;
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Add active state animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
          this.style.transform = '';
        }, 150);
      }
    });
  });
}

// ===== Progress Bar Animations =====
function animateProgressBars() {
  const progressBars = document.querySelectorAll('.progress-fill');
  
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target;
        const targetWidth = progressBar.style.width;
        
        progressBar.style.width = '0%';
        progressBar.style.transition = 'width 2s ease-in-out';
        
        setTimeout(() => {
          progressBar.style.width = targetWidth;
        }, 200);
        
        progressObserver.unobserve(progressBar);
      }
    });
  }, { threshold: 0.5 });

  progressBars.forEach(bar => {
    progressObserver.observe(bar);
  });
}

// ===== Chart Theme Updates =====
function updateChartsTheme() {
  // Re-render all charts with new theme colors
  const chartElements = ['funnelChart', 'radarChart', 'engagementChart', 'geographicChart'];
  
  chartElements.forEach(elementId => {
    const canvas = document.getElementById(elementId);
    if (canvas && canvas.chart) {
      canvas.chart.destroy();
    }
  });
  
  // Reinitialize charts with new theme
  setTimeout(() => {
    initializeCharts();
  }, 100);
}

// ===== Action Button Handlers =====
document.addEventListener('DOMContentLoaded', function() {
  // Add click handlers for action buttons
  document.querySelectorAll('.action-button').forEach(button => {
    button.addEventListener('click', function() {
      const buttonText = this.textContent;
      
      // Add loading state
      this.style.opacity = '0.7';
      this.textContent = 'Cargando...';
      
      // Simulate action
      setTimeout(() => {
        this.style.opacity = '1';
        this.textContent = buttonText;
        
        // Show success feedback
        const originalBg = this.style.background;
        this.style.background = 'linear-gradient(45deg, #10b981, #059669)';
        this.textContent = '✓ Completado';
        
        setTimeout(() => {
          this.style.background = originalBg;
          this.textContent = buttonText;
        }, 2000);
      }, 1500);
    });
  });
  
  // Initialize progress bar animations
  animateProgressBars();
  
  // Update charts theme when theme changes
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      setTimeout(updateChartsTheme, 300);
    });
  }
});

// ===== Performance Optimizations =====
// Debounced resize handler
let resizeTimer;
window.addEventListener('resize', function() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
    // Update chart sizes if needed
    Chart.helpers.each(Chart.instances, function(instance) {
      instance.resize();
    });
  }, 250);
});

// ===== Keyboard Navigation =====
document.addEventListener('keydown', function(e) {
  // Allow keyboard navigation for theme toggle
  if (e.key === 't' && e.ctrlKey) {
    e.preventDefault();
    document.getElementById('theme-toggle-btn').click();
  }
  
  // Navigate sections with arrow keys
  if (e.altKey && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
    e.preventDefault();
    const sections = Array.from(document.querySelectorAll('.glass-section'));
    const currentSection = sections.find(section => {
      const rect = section.getBoundingClientRect();
      return rect.top <= 100 && rect.bottom > 100;
    });
    
    if (currentSection) {
      const currentIndex = sections.indexOf(currentSection);
      const nextIndex = e.key === 'ArrowDown' 
        ? Math.min(currentIndex + 1, sections.length - 1)
        : Math.max(currentIndex - 1, 0);
      
      sections[nextIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
});

// ===== Analytics Tracking (Mock) =====
function trackEvent(action, category, label) {
  console.log(`Analytics Event: ${category} - ${action} - ${label}`);
  // In a real implementation, this would send data to your analytics service
}

// Track chart interactions
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('canvas').forEach(canvas => {
    canvas.addEventListener('click', function() {
      trackEvent('chart_interaction', 'engagement', this.id);
    });
  });
  
  document.querySelectorAll('.glass-nav-item').forEach(link => {
    link.addEventListener('click', function() {
      trackEvent('navigation_click', 'menu', this.textContent);
    });
  });
});