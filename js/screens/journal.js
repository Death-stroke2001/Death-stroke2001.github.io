function renderJournal(el, param) {
  const d = APP_DATA;
  const promptIndex = parseInt(param) || 0;
  const prompt = d.journalPrompts[promptIndex] || d.journalPrompts[0];

  el.innerHTML = `
    ${UI.backHeader('Journal')}

    <div class="journal-prompt-display">
      ${prompt.text}
    </div>
    <div class="journal-entry-date">29 March 2026</div>

    <div style="padding:0 16px">
      <textarea class="text-area" style="min-height:180px" placeholder="Take your time... Write whatever comes to mind."></textarea>

      <div style="margin-top:16px">
        <div class="text-sm font-medium" style="margin-bottom:8px;color:var(--color-text-secondary)">How does this make you feel?</div>
        <div class="mood-selector" style="justify-content:flex-start;gap:6px">
          ${d.moods.map(m => `
            <button class="mood-btn" onclick="this.parentElement.querySelectorAll('.mood-btn').forEach(b=>b.classList.remove('selected'));this.classList.add('selected')">
              <span class="mood-dot" style="background:${m.color}"></span>
              <span class="mood-label">${m.label}</span>
            </button>
          `).join('')}
        </div>
      </div>

      <button class="btn btn-primary btn-full" style="margin-top:20px" onclick="UI.showToast('Entry saved');router.back()">
        Save entry
      </button>
    </div>
  `;
}

function renderJournalHistory(el) {
  const d = APP_DATA;
  el.innerHTML = `
    ${UI.backHeader('Journal History')}

    <div style="padding:16px">
      <div style="font-size:13px;color:var(--color-text-secondary);margin-bottom:16px">${d.journalEntries.length} entries</div>

      ${d.journalEntries.map(entry => `
        <div class="card" style="cursor:default">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
            <span class="text-xs text-secondary">${entry.date}</span>
            <span class="text-xs" style="color:var(--color-forest);font-weight:500">${entry.mood}</span>
          </div>
          <div style="font-size:12px;color:var(--color-forest);font-weight:500;margin-bottom:4px">${entry.prompt}</div>
          <div style="font-size:14px;line-height:1.6;color:var(--color-text-primary)">${entry.text}</div>
        </div>
      `).join('')}
    </div>
  `;
}
