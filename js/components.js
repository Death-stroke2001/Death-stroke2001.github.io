const UI = {
  icons: {
    home: '<svg viewBox="0 0 24 24"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1V9.5z"/></svg>',
    brain: '<svg viewBox="0 0 24 24"><path d="M9.5 2a3.5 3.5 0 00-3.44 4.15A3.5 3.5 0 004 9.5c0 .98.4 1.87 1.06 2.5A3.5 3.5 0 004 14.5a3.5 3.5 0 002.83 3.43A3.5 3.5 0 0010 21h1v-9.5H9.5a1 1 0 010-2H11V6a3.5 3.5 0 00-1.5-4zm5 0A3.5 3.5 0 0113 6v3.5h1.5a1 1 0 010 2H13V21h1a3.5 3.5 0 003.17-3.07A3.5 3.5 0 0020 14.5a3.5 3.5 0 00-1.06-2.5A3.5 3.5 0 0020 9.5a3.5 3.5 0 00-2.06-3.35A3.5 3.5 0 0014.5 2z"/></svg>',
    heart: '<svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>',
    leaf: '<svg viewBox="0 0 24 24"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75"/></svg>',
    back: '<svg viewBox="0 0 24 24"><path d="M19 12H5m0 0l7 7m-7-7l7-7"/></svg>',
    profile: '<svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    camera: '<svg viewBox="0 0 24 24"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>',
    sparkle: '<svg viewBox="0 0 24 24"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"/></svg>',
    settings: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>'
  },

  renderBottomNav() {
    const nav = document.getElementById('bottom-nav');
    nav.innerHTML = `
      <button class="nav-item active" data-screen="home" onclick="router.navigateTo('home')">
        <span class="nav-icon">${UI.icons.home}</span>
        <span class="nav-label">Home</span>
      </button>
      <button class="nav-item" data-screen="brain" onclick="router.navigateTo('brain')">
        <span class="nav-icon">${UI.icons.brain}</span>
        <span class="nav-label">Brain</span>
      </button>
      <button class="nav-item" data-screen="nourishment" onclick="router.navigateTo('nourishment')">
        <span class="nav-icon">${UI.icons.leaf}</span>
        <span class="nav-label">Nourish</span>
      </button>
    `;
  },

  backHeader(title) {
    return `
      <div class="back-header">
        <button class="back-btn" onclick="router.back()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <span class="header-title">${title}</span>
      </div>
    `;
  },

  showToast(message) {
    let toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.className = 'toast';
      document.getElementById('app').appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  }
};
