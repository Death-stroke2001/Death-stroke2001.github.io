function renderReflection(el) {
  const d = APP_DATA;
  const guidance = d.reflection.guidance;
  el.innerHTML = `
    ${UI.backHeader('Reflect')}

    <div style="padding:16px">
      <div style="font-size:18px;font-weight:700;margin-bottom:4px">Afternoon Check-in</div>
      <div style="font-size:13px;color:var(--color-text-secondary);margin-bottom:20px">
        Pause for a moment. These prompts help you observe without judgment -- just noticing what is.
      </div>

      <!-- Observational Guidance Cards -->
      ${guidance.map((g, i) => `
        <div class="card" style="cursor:default;margin-left:0;margin-right:0">
          <div style="font-size:15px;font-weight:600;color:var(--color-forest);margin-bottom:8px">${g.prompt}</div>
          <div style="font-size:13px;color:var(--color-text-secondary);line-height:1.7">${g.detail}</div>
        </div>
      `).join('')}

      <div class="section-title" style="margin-top:8px">How are you feeling right now?</div>
      <div class="mood-selector" style="justify-content:flex-start;gap:8px;margin-bottom:16px">
        ${d.moods.map(m => `
          <button class="mood-btn" onclick="this.parentElement.querySelectorAll('.mood-btn').forEach(b=>b.classList.remove('selected'));this.classList.add('selected')">
            <span class="mood-dot" style="background:${m.color}"></span>
            <span class="mood-label">${m.label}</span>
          </button>
        `).join('')}
      </div>

      <textarea class="text-area" placeholder="Write your observations here... What did you notice about yourself today?"></textarea>

      <button class="btn btn-primary btn-full" style="margin-top:16px" onclick="UI.showToast('Reflection saved');router.back()">
        Save reflection
      </button>
    </div>

    <!-- Past reflections -->
    <div style="padding:0 16px 16px">
      <div class="section-title" style="margin-top:12px">Recent reflections</div>
      ${d.journalEntries.slice(0, 2).map(entry => `
        <div class="card" style="cursor:default;margin-left:0;margin-right:0">
          <div style="display:flex;justify-content:space-between;margin-bottom:4px">
            <span class="text-xs text-secondary">${entry.date}</span>
            <span class="text-xs" style="color:var(--color-forest);font-weight:500">${entry.mood}</span>
          </div>
          <div style="font-size:13px;color:var(--color-text-primary);line-height:1.6">${entry.text.substring(0, 80)}...</div>
        </div>
      `).join('')}
    </div>
  `;
}
