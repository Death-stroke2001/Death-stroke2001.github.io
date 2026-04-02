function renderEnergyDetail(el) {
  const d = APP_DATA;

  el.innerHTML = `
    ${UI.backHeader('Energy Snapshot')}

    <!-- Summary -->
    <div class="energy-detail-value">
      <div class="energy-detail-number">${d.energy.level.value}%</div>
      <div class="energy-detail-unit">Overall energy today</div>
    </div>

    <!-- Stats row (unique tangible metrics, no overlap with nourish) -->
    <div class="stats-grid" style="margin:0 16px 16px">
      <div class="stat-card" onclick="scrollToEnergySection('energy-level-section')">
        <div class="stat-icon-svg">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--color-improving)" stroke="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
        </div>
        <div class="stat-value">${d.energy.level.value}%</div>
        <div class="stat-label">Energy Level</div>
      </div>
      <div class="stat-card" onclick="scrollToEnergySection('focus-section')">
        <div class="stat-icon-svg">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5A8BA8" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
        </div>
        <div class="stat-value">${d.energy.focus.detail.split(' ')[0]}</div>
        <div class="stat-label">Focus Time</div>
      </div>
      <div class="stat-card" style="background:var(--color-sage-pale)" onclick="scrollToEnergySection('recovery-section')">
        <div class="stat-icon-svg">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4A8B4A" stroke-width="2" stroke-linecap="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
        </div>
        <div class="stat-value">${d.energy.recovery.value}%</div>
        <div class="stat-label">Recovery</div>
      </div>
      <div class="stat-card" style="background:var(--color-sage-pale)" onclick="scrollToEnergySection('stamina-section')">
        <div class="stat-icon-svg">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B8864A" stroke-width="2" stroke-linecap="round"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>
        </div>
        <div class="stat-value">${d.energy.stamina.value}%</div>
        <div class="stat-label">Stamina</div>
      </div>
    </div>

    <!-- 7-day energy chart -->
    <div class="chart-container">
      <div class="chart-title">7-Day Energy Trend</div>
      <div id="energy-line-chart"></div>
      <div style="display:flex;justify-content:space-between;padding:8px 4px 0;font-size:10px;color:var(--color-text-tertiary)">
        ${d.energyHistory.map(h => `<span>${h.day}</span>`).join('')}
      </div>
    </div>

    <!-- Energy Level Deep Dive -->
    <div id="energy-level-section" style="padding:16px">
      <div class="section-title">Energy Level</div>
      <div style="font-size:13px;color:var(--color-text-secondary);line-height:1.7;margin-bottom:12px">
        Your energy is at <b>${d.energy.level.value}%</b> today. You've maintained a steady level through the morning, with natural fluctuations tied to your meal timing and activity. Your best energy days this week came when you had a balanced breakfast before 9 AM.
      </div>
      <div class="insight-card">
        <div class="insight-icon insight-icon-green">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--color-improving)" stroke="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
        </div>
        <div class="insight-content">
          <div class="insight-desc" style="font-size:14px;color:var(--color-text-primary)">${d.energyInsights[0]}</div>
        </div>
      </div>
    </div>

    <!-- Focus Duration Deep Dive -->
    <div id="focus-section" style="padding:0 16px 16px">
      <div class="section-title">Focus Duration</div>
      <div style="font-size:13px;color:var(--color-text-secondary);line-height:1.7;margin-bottom:12px">
        You've logged <b>${d.energy.focus.detail}</b> today. Your peak focus window was between 10-11:30 AM. On days when you start deep work within an hour of waking, your total focus time increases by about 40 minutes on average.
      </div>
      <div id="focus-line-chart"></div>
      <div style="display:flex;justify-content:space-between;padding:8px 4px 0;font-size:10px;color:var(--color-text-tertiary)">
        ${d.energyHistory.map(h => `<span>${h.day}</span>`).join('')}
      </div>
    </div>

    <!-- Recovery Score Deep Dive -->
    <div id="recovery-section" style="padding:0 16px 16px">
      <div class="section-title">Recovery Score</div>
      <div style="font-size:13px;color:var(--color-text-secondary);line-height:1.7;margin-bottom:12px">
        Your body recovered at <b>${d.energy.recovery.value}%</b> efficiency overnight. Recovery is influenced by sleep quality, stress levels, and evening nutrition. Your best recovery nights correlate with earlier dinners and reduced screen time.
      </div>
      <div id="recovery-line-chart"></div>
      <div style="display:flex;justify-content:space-between;padding:8px 4px 0;font-size:10px;color:var(--color-text-tertiary)">
        ${d.energyHistory.map(h => `<span>${h.day}</span>`).join('')}
      </div>
    </div>

    <!-- Afternoon Stamina Deep Dive -->
    <div id="stamina-section" style="padding:0 16px 16px">
      <div class="section-title">Afternoon Stamina</div>
      <div style="font-size:13px;color:var(--color-text-secondary);line-height:1.7;margin-bottom:12px">
        Your post-lunch energy held at <b>${d.energy.stamina.value}%</b>. The typical afternoon dip hits around 2 PM for you. On days with protein-rich lunches and a short walk, your stamina stays 25% higher through the afternoon.
      </div>
      <div id="stamina-line-chart"></div>
      <div style="display:flex;justify-content:space-between;padding:8px 4px 0;font-size:10px;color:var(--color-text-tertiary)">
        ${d.energyHistory.map(h => `<span>${h.day}</span>`).join('')}
      </div>
    </div>

    <!-- Gentle suggestion -->
    <div style="padding:0 16px 20px">
      <div class="card card-sage" style="cursor:default;margin-left:0;margin-right:0">
        <div style="font-weight:600;margin-bottom:6px;color:var(--color-forest)">Gentle suggestion</div>
        <div style="font-size:13px;color:var(--color-forest);line-height:1.6">
          Your energy tends to dip after 2 PM. Try a light, protein-rich snack around 1:30 PM to bridge the gap -- a handful of almonds or a small yogurt could help.
        </div>
      </div>
    </div>

    <div style="height:20px"></div>
  `;

  setTimeout(() => {
    const chartEl = document.getElementById('energy-line-chart');
    if (chartEl) {
      Charts.lineChart(chartEl, d.energyHistory.map(h => h.energy), {
        width: 310, height: 140, color: '#2D4A2D'
      });
    }
    const focusEl = document.getElementById('focus-line-chart');
    if (focusEl) {
      Charts.lineChart(focusEl, d.energyHistory.map(h => h.focus), {
        width: 310, height: 100, color: '#5A8BA8'
      });
    }
    const recoveryEl = document.getElementById('recovery-line-chart');
    if (recoveryEl) {
      Charts.lineChart(recoveryEl, d.energyHistory.map(h => h.recovery), {
        width: 310, height: 100, color: '#4A8B4A'
      });
    }
    const staminaEl = document.getElementById('stamina-line-chart');
    if (staminaEl) {
      Charts.lineChart(staminaEl, d.energyHistory.map(h => h.stamina), {
        width: 310, height: 100, color: '#B8864A'
      });
    }
  }, 50);
}

function scrollToEnergySection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
