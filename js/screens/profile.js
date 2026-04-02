function renderProfile(el) {
  const d = APP_DATA;
  el.innerHTML = `
    ${UI.backHeader('Profile')}

    <div class="profile-header-section">
      <div class="profile-avatar-lg">${d.user.initial}</div>
      <div class="profile-name">${d.user.name}</div>
      <div class="profile-since">Member since ${d.user.since}</div>
    </div>

    <!-- Wellness Intentions -->
    <div style="padding:0 16px">
      <div class="section-title">Wellness Intentions</div>
      <div class="intentions-chips" style="margin:8px 0 20px">
        ${d.user.intentions.map(i => `<span class="chip chip-sage">${i}</span>`).join('')}
      </div>
    </div>

    <!-- Streaks -->
    <div style="padding:0 16px;margin-bottom:20px">
      <div class="section-title">Your Journey</div>
    </div>
    <div class="streak-row">
      <div class="streak-card">
        <div class="streak-value">23</div>
        <div class="streak-label">Days logged</div>
      </div>
      <div class="streak-card">
        <div class="streak-value">15</div>
        <div class="streak-label">Reflections</div>
      </div>
      <div class="streak-card">
        <div class="streak-value">8</div>
        <div class="streak-label">Journal entries</div>
      </div>
    </div>

    <!-- Actions -->
    <div style="padding:16px;margin-top:20px">
      <div class="list-item" onclick="router.navigateTo('profile-edit')" style="border-radius:12px 12px 0 0;background:var(--color-white)">
        <div class="list-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
        </div>
        <div class="list-content"><div class="list-title">Edit Profile</div></div>
        <span class="list-arrow">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 18l6-6-6-6"/></svg>
        </span>
      </div>
      <div class="list-item" onclick="router.navigateTo('settings')" style="border-radius:0 0 12px 12px;background:var(--color-white)">
        <div class="list-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
        </div>
        <div class="list-content"><div class="list-title">Settings</div></div>
        <span class="list-arrow">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 18l6-6-6-6"/></svg>
        </span>
      </div>
    </div>

    <div style="height:40px"></div>
  `;
}

function renderProfileEdit(el) {
  const d = APP_DATA;
  el.innerHTML = `
    ${UI.backHeader('Edit Profile')}
    <div style="padding:16px">
      <div class="profile-avatar-lg" style="margin:20px auto">${d.user.initial}</div>
      <button class="btn btn-secondary btn-sm btn-full" style="margin-bottom:24px">Change photo</button>

      <div class="form-field">
        <label class="form-label">Name</label>
        <input class="form-input" value="${d.user.name}">
      </div>

      <div class="form-field">
        <label class="form-label">Email</label>
        <input class="form-input" value="${d.user.email}">
      </div>

      <div class="form-field">
        <label class="form-label">Dietary Preference</label>
        <input class="form-input" value="${d.user.dietary}">
      </div>

      <div class="form-field">
        <label class="form-label">Wellness Intentions</label>
        <div class="chip-row" style="margin-top:8px">
          ${['Improve focus', 'Better sleep', 'Reduce brain fog', 'More energy', 'Better digestion'].map(i => `
            <span class="chip ${d.user.intentions.includes(i) ? 'chip-forest' : ''}" onclick="this.classList.toggle('chip-forest')" style="cursor:pointer">${i}</span>
          `).join('')}
        </div>
      </div>

      <button class="btn btn-primary btn-full" style="margin-top:16px" onclick="UI.showToast('Profile updated');router.back()">Save Changes</button>
    </div>
  `;
}

function renderSettings(el) {
  const d = APP_DATA;

  const settingIcons = {
    bell: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>',
    palette: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>',
    lock: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>',
    info: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>',
    logout: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>'
  };

  el.innerHTML = `
    ${UI.backHeader('Settings')}
    <div style="padding:16px">
      ${d.settings.map(s => `
        <div class="list-item" onclick="UI.showToast('Coming soon')">
          <div class="list-icon">${settingIcons[s.icon] || ''}</div>
          <div class="list-content"><div class="list-title">${s.title}</div></div>
          <span class="list-arrow">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 18l6-6-6-6"/></svg>
          </span>
        </div>
      `).join('')}
    </div>
    <div style="text-align:center;padding:40px 16px;color:var(--color-text-tertiary);font-size:13px">
      Northwind v1.0<br>
      Made for your wellbeing
    </div>
  `;
}
