function renderNourishment(el) {
  const d = APP_DATA;

  const statIcons = {
    steps: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-forest)" stroke-width="2" stroke-linecap="round"><path d="M4 16l6-6 4 4 8-8"/><path d="M14 6h8v8"/></svg>',
    water: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5A8BA8" stroke-width="2" stroke-linecap="round"><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/></svg>',
    fire: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C4A35A" stroke-width="2" stroke-linecap="round"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"/></svg>',
    moon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7B3A" stroke-width="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>'
  };

  el.innerHTML = `
    <!-- Header -->
    <div class="nourishment-header">
      <div class="nourishment-category">DAILY RHYTHM</div>
      <div class="nourishment-title">Structural<br>Nourishment</div>
      <div class="nourishment-desc">You're in a gentle flow today. Your body is responding well to the intentional choices you're making.</div>
    </div>

    <!-- Stats Grid -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon-svg">${statIcons.steps}</div>
        <div class="stat-value">${d.nourishment.steps.value}</div>
        <div class="stat-label">${d.nourishment.steps.label}</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon-svg">${statIcons.water}</div>
        <div class="stat-value">${d.nourishment.water.value}</div>
        <div class="stat-label">${d.nourishment.water.label}</div>
      </div>
      <div class="stat-card" style="background:var(--color-sage-pale)">
        <div class="stat-icon-svg">${statIcons.fire}</div>
        <div class="stat-value">${d.nourishment.movement.value}</div>
        <div class="stat-label">${d.nourishment.movement.label}</div>
      </div>
      <div class="stat-card" style="background:var(--color-sage-pale)">
        <div class="stat-icon-svg">${statIcons.moon}</div>
        <div class="stat-value">${d.nourishment.sleep.value}</div>
        <div class="stat-label">${d.nourishment.sleep.label}</div>
      </div>
    </div>

    <!-- Nourishment Flow Chart -->
    <div class="chart-container" style="margin-top:20px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <div>
          <div class="chart-title">Nourishment Flow</div>
          <div class="chart-subtitle">PAST 7 DAYS</div>
        </div>
      </div>
      <div id="nourishment-bar-chart"></div>
    </div>

    <!-- Macro Nutrients - Horizontal Completion Status -->
    <div class="section-block">
      <div class="section-block-title">Macro Nutrients</div>
      ${Object.values(d.macros).map(m => {
        const pct = Math.min(Math.round((m.consumed / m.ideal) * 100), 100);
        return `
        <div class="macro-completion-row">
          <div class="macro-completion-header">
            <span class="legend-dot" style="background:${m.color}"></span>
            <span class="macro-completion-name">${m.label}</span>
            <span class="macro-completion-values">${m.consumed}${m.unit} / ${m.ideal}${m.unit}</span>
          </div>
          <div class="macro-completion-track">
            <div class="macro-completion-fill" style="width:${pct}%;background:${m.color}"></div>
          </div>
          <div class="macro-completion-footer">
            <span class="macro-completion-pct">${pct}%</span>
            <span class="macro-completion-status">${m.status}</span>
          </div>
        </div>`;
      }).join('')}
    </div>

    <!-- Micro Nutrients - Compact Horizontal Bars -->
    <div class="section-block">
      <div class="section-block-title">Micro Nutrients</div>
      ${[
        { key: 'iron', label: 'Iron', data: d.microHistory.iron, color: d.micros.iron.color, status: d.micros.iron.status },
        { key: 'magnesium', label: 'Magnesium', data: d.microHistory.magnesium, color: d.micros.magnesium.color, status: d.micros.magnesium.status },
        { key: 'vitaminD', label: 'Vitamin D', data: d.microHistory.vitaminD, color: d.micros.vitaminD.color, status: d.micros.vitaminD.status },
        { key: 'zinc', label: 'Zinc', data: d.microHistory.zinc, color: d.micros.zinc.color, status: d.micros.zinc.status }
      ].map(m => {
        const latest = m.data[m.data.length - 1];
        return `
        <div class="micro-bar-row">
          <div class="micro-bar-header">
            <span class="legend-dot" style="background:${m.color}"></span>
            <span class="micro-bar-name">${m.label}</span>
            <span class="micro-bar-pct">${latest}%</span>
            <span class="micro-bar-status" style="color:${m.color}">${m.status}</span>
          </div>
          <div class="micro-bar-track">
            <div class="micro-bar-fill" style="width:${latest}%;background:${m.color}"></div>
          </div>
        </div>`;
      }).join('')}
    </div>

    <!-- Physique Directions -->
    <div class="section-block">
      <div class="section-block-title">Physique Directions</div>
      ${d.physiqueDirections.map(pd => `
        <div class="list-item" onclick="router.navigateTo('${pd.id}')">
          <div class="list-icon" style="background:${pd.color}20">
            ${getPhysiqueIcon(pd.icon, pd.color)}
          </div>
          <div class="list-content">
            <div class="list-title">${pd.name}</div>
          </div>
          <span class="list-arrow">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 18l6-6-6-6"/></svg>
          </span>
        </div>
      `).join('')}
    </div>

    <div style="height:20px"></div>
  `;

  // Render charts after DOM is ready
  setTimeout(() => {
    const barContainer = document.getElementById('nourishment-bar-chart');
    if (barContainer) {
      Charts.barChart(barContainer, d.nourishmentFlow, { width: 310, height: 180 });
    }
  }, 50);
}

function getPhysiqueIcon(icon, color) {
  const icons = {
    bolt: `<svg width="20" height="20" viewBox="0 0 24 24" fill="${color}" stroke="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
    strength: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round"><path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/></svg>`,
    wave: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round"><path d="M2 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0"/></svg>`,
    weight: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round"><path d="M6 5v14M18 5v14M6 12h12M2 8h4M18 8h4M2 16h4M18 16h4"/></svg>`,
    drop: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round"><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/></svg>`
  };
  return icons[icon] || '';
}
