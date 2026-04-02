function renderPhysique(el, screenId) {
  const d = APP_DATA;
  const data = d.physiqueData[screenId];
  if (!data) {
    el.innerHTML = UI.backHeader('Not Found') + '<div style="padding:40px;text-align:center">Screen not found</div>';
    return;
  }

  const trendColors = {
    'Improving': 'chip-improving',
    'Stable': 'chip-sage',
    'Balanced': 'chip-sage',
    'Building': 'chip-improving',
    'Needs attention': 'chip-low'
  };

  el.innerHTML = `
    ${UI.backHeader(data.title)}

    <div class="physique-detail-header">
      <div class="physique-score">${data.score}</div>
      <div style="font-size:13px;color:var(--color-text-secondary)">out of 100</div>
      <span class="chip ${trendColors[data.trend] || 'chip-sage'} physique-trend-label">${data.trend}</span>
    </div>

    <!-- 7-day trend -->
    <div class="chart-container">
      <div class="chart-title">7-Day Trend</div>
      <div id="physique-chart-${screenId}"></div>
    </div>

    <!-- Insights -->
    <div style="padding:16px">
      <div class="section-title">Insights</div>
      ${data.insights.map(insight => `
        <div class="insight-card">
          <div class="insight-icon insight-icon-green">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
          </div>
          <div class="insight-content">
            <div class="insight-desc" style="font-size:14px;color:var(--color-text-primary)">${insight}</div>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Recommendations -->
    <div style="padding:16px">
      <div class="section-title">Recommendations</div>
      ${data.recommendations.map(rec => `
        <div class="insight-card" style="background:var(--color-sage-pale)">
          <div class="insight-icon" style="background:var(--color-forest);color:white;font-size:14px">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75"/></svg>
          </div>
          <div class="insight-content">
            <div class="insight-desc" style="font-size:14px;color:var(--color-forest)">${rec}</div>
          </div>
        </div>
      `).join('')}
    </div>

    <div style="height:20px"></div>
  `;

  setTimeout(() => {
    const chartEl = document.getElementById('physique-chart-' + screenId);
    if (chartEl) {
      Charts.lineChart(chartEl, data.weekData, { width: 310, height: 140, color: '#2D4A2D' });
    }
  }, 50);
}
