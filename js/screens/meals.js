function renderMealDetail(el) {
  const d = APP_DATA;
  const meal = d.lastMeal;
  el.innerHTML = `
    ${UI.backHeader('Meal Detail')}

    <img src="${meal.image}" class="meal-analysis-img" alt="${meal.name}">

    <div style="padding:16px">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div class="card-title" style="font-size:20px">${meal.name}</div>
        <span class="text-sm text-secondary">${meal.time}</span>
      </div>

      <div class="card-tag tag-green" style="margin:12px 0">LOGGED</div>

      <!-- What this meal gives you -->
      <div class="section-title" style="margin-top:20px">What this meal gives you</div>

      ${Object.entries(meal.nutrients).map(([label, value]) => `
        <div class="nourishment-bar-item">
          <div class="nourishment-bar-label">${label}</div>
          <div class="nourishment-bar-track">
            <div class="nourishment-bar-fill" style="width:${value}%"></div>
          </div>
          <span class="text-xs text-secondary">${value}%</span>
        </div>
      `).join('')}

      <!-- Mood tag (disappears after selection) -->
      <div class="section-title" style="margin-top:24px">How did this meal make you feel?</div>
      <div id="meal-mood-selector" class="mood-selector" style="justify-content:flex-start;gap:8px">
        ${d.moods.map(m => `
          <button class="mood-btn" onclick="selectMealMood(this)">
            <span class="mood-dot" style="background:${m.color}"></span>
            <span class="mood-label">${m.label}</span>
          </button>
        `).join('')}
      </div>
    </div>
  `;

  // Animate bars
  setTimeout(() => {
    el.querySelectorAll('.nourishment-bar-fill').forEach(bar => {
      const width = bar.style.width;
      bar.style.width = '0%';
      setTimeout(() => bar.style.width = width, 100);
    });
  }, 350);
}

function selectMealMood(btn) {
  btn.parentElement.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  UI.showToast('Feeling logged');

  // Fade out the mood selector after logging
  setTimeout(() => {
    const selector = document.getElementById('meal-mood-selector');
    if (selector) {
      const title = selector.previousElementSibling;
      selector.style.transition = 'opacity 400ms ease, max-height 400ms ease';
      selector.style.opacity = '0';
      selector.style.maxHeight = '0';
      selector.style.overflow = 'hidden';
      if (title) {
        title.style.transition = 'opacity 400ms ease';
        title.style.opacity = '0';
      }
      setTimeout(() => {
        selector.remove();
        if (title) title.remove();
      }, 450);
    }
  }, 800);
}

function renderLogMeal(el) {
  el.innerHTML = `
    ${UI.backHeader('Log Meal')}

    <div style="padding:16px;text-align:center">
      <div style="font-size:17px;font-weight:600;margin-bottom:4px">Capture your meal</div>
      <div style="font-size:13px;color:var(--color-text-secondary);margin-bottom:20px">Take a photo and we'll analyze what nourishment it provides</div>
    </div>

    <div class="camera-view">
      <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop" alt="Camera preview">
      <div class="camera-crosshair"></div>
      <div class="camera-instruction">Point camera at your meal</div>
    </div>

    <div style="text-align:center">
      <button class="shutter-btn" onclick="router.navigateTo('meal-result')">
        <div class="shutter-inner"></div>
      </button>
      <div style="font-size:13px;color:var(--color-text-secondary)">Tap to capture</div>
    </div>

    <div style="text-align:center;margin-top:20px;display:flex;gap:12px;justify-content:center;padding:0 16px">
      <button class="btn btn-secondary btn-sm" onclick="router.navigateTo('meal-result')">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
        Choose from gallery
      </button>
      <button class="btn btn-secondary btn-sm" onclick="router.navigateTo('log-meal-journal')">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
        Journal instead
      </button>
    </div>
  `;
}

function renderLogMealJournal(el) {
  el.innerHTML = `
    ${UI.backHeader('Journal Your Meal')}

    <div style="padding:16px">
      <div style="font-size:15px;font-weight:600;margin-bottom:4px">Describe what you ate</div>
      <div style="font-size:13px;color:var(--color-text-secondary);margin-bottom:16px">
        No photo needed -- simply write about your meal and we'll help you understand its nourishment.
      </div>

      <div class="form-field">
        <label class="form-label">Meal name</label>
        <input class="form-input" placeholder="e.g., Dal rice with salad" id="journal-meal-name">
      </div>

      <div class="form-field">
        <label class="form-label">What did it include?</label>
        <textarea class="text-area" placeholder="Describe the ingredients and portions... e.g., Yellow dal, brown rice, cucumber raita, and a small salad with lemon dressing" id="journal-meal-desc"></textarea>
      </div>

      <div class="form-field">
        <label class="form-label">How did you feel after eating?</label>
        <div class="mood-selector" style="justify-content:flex-start;gap:8px" id="journal-mood-selector">
          ${APP_DATA.moods.map(m => `
            <button class="mood-btn" onclick="this.parentElement.querySelectorAll('.mood-btn').forEach(b=>b.classList.remove('selected'));this.classList.add('selected')">
              <span class="mood-dot" style="background:${m.color}"></span>
              <span class="mood-label">${m.label}</span>
            </button>
          `).join('')}
        </div>
      </div>

      <button class="btn btn-primary btn-full" onclick="UI.showToast('Meal journaled and saved');router.navigateTo('home')">
        Save meal journal
      </button>
    </div>
  `;
}

function renderMealResult(el) {
  const d = APP_DATA;
  el.innerHTML = `
    ${UI.backHeader('Meal Analysis')}

    <img src="${d.lastMeal.image}" class="meal-analysis-img" alt="Analyzed meal">

    <div class="meal-name-detected">${d.lastMeal.name}</div>
    <div style="padding:0 16px;font-size:13px;color:var(--color-text-secondary)">AI-identified from your photo</div>

    <!-- Nourishment breakdown -->
    <div style="padding:16px">
      <div class="section-title">What this gives your body</div>
      ${Object.entries(d.lastMeal.nutrients).map(([label, value]) => `
        <div class="nourishment-bar-item">
          <div class="nourishment-bar-label">${label}</div>
          <div class="nourishment-bar-track">
            <div class="nourishment-bar-fill" style="width:${value}%"></div>
          </div>
          <span class="text-xs text-secondary">${value}%</span>
        </div>
      `).join('')}
    </div>

    <!-- Mindful Note -->
    <div class="meal-mindful-note">
      <div class="note-label">Mindful note</div>
      This balanced bowl provides sustained brain fuel through complete proteins and healthy fats. The combination of paneer and vegetables supports afternoon focus and stable energy.
    </div>

    <div style="padding:16px;display:flex;gap:12px">
      <button class="btn btn-primary" style="flex:1" onclick="UI.showToast('Meal saved to your log');router.navigateTo('home')">Save to log</button>
      <button class="btn btn-outline" onclick="router.back()">Retake</button>
    </div>
  `;

  setTimeout(() => {
    el.querySelectorAll('.nourishment-bar-fill').forEach(bar => {
      const width = bar.style.width;
      bar.style.width = '0%';
      setTimeout(() => bar.style.width = width, 100);
    });
  }, 350);
}
