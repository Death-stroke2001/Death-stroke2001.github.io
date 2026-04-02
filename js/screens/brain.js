function renderBrain(el) {
  const d = APP_DATA;

  // SVG icon map for insight cards
  const insightIcons = {
    brain: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.5 2 5.5 4.5 5 8c-.5 3.5 1 6 3 7.5V20h8v-4.5c2-1.5 3.5-4 3-7.5-.5-3.5-3.5-6-7-6z"/></svg>',
    moon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>',
    strength: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/></svg>',
    search: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>'
  };

  const knowledgeIcons = {
    supplement: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 8v8M8 12h8"/></svg>',
    brainfood: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.5 2 5.5 4.5 5 8c-.5 3.5 1 6 3 7.5V20h8v-4.5c2-1.5 3.5-4 3-7.5-.5-3.5-3.5-6-7-6z"/></svg>',
    podcast: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/></svg>'
  };

  el.innerHTML = `
    <!-- Header -->
    <div class="brain-header">
      <div class="brain-category">NEURO-PERFORMANCE</div>
      <div class="brain-title">Brain health<br>Overview</div>
    </div>

    <!-- Clarity Score with Rolling Week Line Graph -->
    <div class="score-display">
      <div class="score-label">Clarity Stability</div>
      <div class="score-main">${d.brain.clarityLabel}</div>
      <div style="display:flex;align-items:baseline;gap:8px;margin-top:8px">
        <span class="score-value">${d.brain.clarityScore}%</span>
        <span class="score-trend">${d.brain.clarityTrend}</span>
      </div>
      <div id="clarity-week-chart" style="margin-top:16px;opacity:0.9"></div>
      <div style="display:flex;justify-content:space-between;padding:4px 16px 0;font-size:9px;opacity:0.5">
        ${d.energyHistory.map(h => `<span>${h.day}</span>`).join('')}
      </div>
    </div>

    <!-- Mood / Energy Chips -->
    <div class="chips-section">
      <div class="chip-row">
        <span class="chip chip-improving">Mood Volatility: ${d.brain.moodVolatility}</span>
        <span class="chip chip-moderate">Energy Stability: ${d.brain.energyStability}</span>
      </div>
    </div>

    <!-- Intelligence Summary -->
    <div class="section-block">
      <div class="section-block-title">Intelligence Summary</div>
      ${d.intelligenceSummary.map(item => `
        <div class="insight-card">
          <div class="insight-icon ${item.iconClass}">${insightIcons[item.icon] || ''}</div>
          <div class="insight-content">
            <div class="insight-title">${item.title}</div>
            <div class="insight-desc">${item.desc}</div>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Pattern Discovery -->
    <div class="section-block">
      <div class="pattern-card">
        <div class="pattern-header">
          <span class="pattern-icon">${insightIcons[d.patternDiscovery.icon] || ''}</span>
          <span class="pattern-title">${d.patternDiscovery.title}</span>
        </div>
        <div class="pattern-insight">${d.patternDiscovery.insight}</div>
        <div class="pattern-confidence">${d.patternDiscovery.confidence}</div>
      </div>
    </div>

    <!-- Journal Prompts -->
    <div class="section-block">
      <div class="section-block-title">Journal your thoughts</div>
      <div class="section-subtitle" style="margin-bottom:12px">Help us analyze your cognitive load better.</div>
      ${d.journalPrompts.map((p, i) => `
        <button class="prompt-btn" onclick="router.navigateTo('journal', '${i}')">
          <span class="prompt-text">${p.text}</span>
          <span style="margin-left:auto;color:var(--color-text-tertiary);font-size:16px">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 18l6-6-6-6"/></svg>
          </span>
        </button>
      `).join('')}
      <button class="btn btn-secondary btn-sm" style="margin-top:8px" onclick="router.navigateTo('journal-history')">View past entries</button>
    </div>

    <!-- Knowledge Root -->
    <div class="section-block">
      <div class="section-block-title">Knowledge Root</div>
      ${d.knowledgeRoot.map(item => `
        <div class="list-item" onclick="router.navigateTo('${item.screen}')">
          <div class="list-icon">${knowledgeIcons[item.icon] || ''}</div>
          <div class="list-content">
            <div class="list-title">${item.title}</div>
            <div class="list-desc">${item.desc}</div>
          </div>
          <span class="list-arrow">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 18l6-6-6-6"/></svg>
          </span>
        </div>
      `).join('')}
    </div>

    <div style="height:20px"></div>
  `;

  // Render clarity week chart
  setTimeout(() => {
    const chartEl = document.getElementById('clarity-week-chart');
    if (chartEl) {
      Charts.lineChart(chartEl, d.brain.weeklyClarity, {
        width: 310, height: 80, color: 'rgba(255,255,255,0.8)',
        fillColor: 'rgba(255,255,255,0.1)', showDots: true
      });
    }
  }, 50);
}
