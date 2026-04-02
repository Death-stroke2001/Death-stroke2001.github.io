function getTimeOfDay() {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return 'morning';
  if (h >= 12 && h < 17) return 'afternoon';
  if (h >= 17 && h < 21) return 'evening';
  return 'night';
}

function getGreetingText() {
  const tod = getTimeOfDay();
  if (tod === 'morning') return 'Good morning';
  if (tod === 'afternoon') return 'Good afternoon';
  if (tod === 'evening') return 'Good evening';
  return 'Good night';
}

function getGreetingAnimation() {
  const tod = getTimeOfDay();
  if (tod === 'morning' || tod === 'afternoon') {
    return `
      <div class="greeting-anim-scene greeting-anim-scene--day">
        <div class="greeting-horizon"></div>
        <svg class="greeting-sun-lg" width="80" height="80" viewBox="0 0 80 80" fill="none">
          <circle class="sun-glow-ring" cx="40" cy="40" r="28" fill="#d3c72d" opacity="0.12"/>
          <circle cx="40" cy="40" r="16" fill="#d3c72d" opacity="0.95"/>
          <g class="sun-rays" stroke="#d3c72d" stroke-width="2.5" stroke-linecap="round" opacity="0.7">
            <line x1="40" y1="6" x2="40" y2="16"/>
            <line x1="40" y1="64" x2="40" y2="74"/>
            <line x1="6" y1="40" x2="16" y2="40"/>
            <line x1="64" y1="40" x2="74" y2="40"/>
            <line x1="16" y1="16" x2="22.5" y2="22.5"/>
            <line x1="57.5" y1="57.5" x2="64" y2="64"/>
            <line x1="64" y1="16" x2="57.5" y2="22.5"/>
            <line x1="22.5" y1="57.5" x2="16" y2="64"/>
          </g>
        </svg>
        <div class="greeting-cloud greeting-cloud--1"></div>
        <div class="greeting-cloud greeting-cloud--2"></div>
      </div>`;
  } else {
    return `
      <div class="greeting-anim-scene greeting-anim-scene--night">
        <svg class="greeting-moon-lg" width="80" height="80" viewBox="0 0 80 80" fill="none">
          <circle class="moon-glow" cx="40" cy="40" r="30" fill="rgba(232,218,240,0.15)"/>
          <path d="M60 44A24 24 0 1136 16a18 18 0 0024 28z" fill="rgba(232,218,240,0.9)"/>
          <circle cx="42" cy="30" r="2.5" fill="rgba(59,30,94,0.12)"/>
          <circle cx="34" cy="38" r="1.8" fill="rgba(59,30,94,0.10)"/>
          <circle cx="46" cy="42" r="1.5" fill="rgba(59,30,94,0.08)"/>
        </svg>
        <div class="greeting-star-field">
          <span class="g-star" style="top:8%;left:15%"></span>
          <span class="g-star" style="top:20%;left:75%"></span>
          <span class="g-star" style="top:55%;left:10%"></span>
          <span class="g-star" style="top:70%;left:85%"></span>
          <span class="g-star" style="top:35%;left:55%"></span>
          <span class="g-star g-star--lg" style="top:12%;left:50%"></span>
          <span class="g-star g-star--lg" style="top:65%;left:30%"></span>
        </div>
      </div>`;
  }
}

function getMealStatusText() {
  // Show how many meals logged vs remaining
  return 'Breakfast logged, 2 more meals to go';
}

function renderHome(el) {
  const d = APP_DATA;
  const moodFilled = d.today.mood !== null;
  const greeting = getGreetingText();
  const anim = getGreetingAnimation();

  // North Wind logo mark
  const logoMark = `<svg width="32" height="32" viewBox="0 0 200 200" fill="none">
    <defs>
      <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#FFCA2D;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#FF9500;stop-opacity:1" />
      </linearGradient>
    </defs>
    <circle cx="100" cy="100" r="85" fill="none" stroke="#3b1e5e" stroke-width="6"/>
    <g style="animation:float 3s ease-in-out infinite">
      <path d="M100 50 L110 70 L130 75 L115 85 L120 105 L100 95 L80 105 L85 85 L70 75 L90 70 Z" fill="url(#logo-grad)"/>
    </g>
  </svg>`;

  el.innerHTML = `
    <!-- Header with logo -->
    <div class="home-header">
      <div class="home-header-left">
        <div class="home-logo-mark">${logoMark}</div>
        <div class="home-avatar">${d.user.initial}</div>
      </div>
      <button class="profile-btn" onclick="router.navigateTo('profile')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
        </svg>
      </button>
    </div>

    <!-- Extended Greeting Card with Animation -->
    <div class="greeting-card">
      <div class="greeting-content">
        <div class="greeting-text-col">
          <div class="greeting-label">${greeting},</div>
          <div class="greeting-name">${d.user.firstName}</div>
          <div class="greeting-subtitle">Let's nourish your day mindfully</div>
          <div class="greeting-date">${d.today.date}</div>
        </div>
        ${anim}
      </div>
    </div>

    <!-- Mood Check-in (hidden once filled) -->
    ${!moodFilled ? `
    <div class="mood-section" id="mood-section">
      <div class="mood-question">How are you feeling right now?</div>
      <div class="mood-selector">
        ${d.moods.map((m, i) => `
          <button class="mood-btn" onclick="selectMood(this, ${i})">
            <span class="mood-icon-svg">${m.icon}</span>
            <span class="mood-label">${m.label}</span>
          </button>
        `).join('')}
      </div>
    </div>
    ` : ''}

    <!-- Log Your Meal (PRIMARY ACTION - on top) -->
    <div class="card">
      <div class="card-title" style="margin-bottom:8px">Log your meal</div>
      <div class="card-subtitle" style="margin-bottom:12px">Choose how you'd like to record what you ate</div>
      <div style="display:flex;gap:10px">
        <button class="btn btn-primary btn-sm" style="flex:1" onclick="router.navigateTo('log-meal')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>
          Snap a picture
        </button>
        <button class="btn btn-secondary btn-sm" style="flex:1" onclick="router.navigateTo('log-meal-journal')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          Journal it
        </button>
      </div>
    </div>

    <!-- Meal Logged Card (below log meal) -->
    <div class="card" onclick="router.navigateTo('meal-detail')">
      <div class="card-row" style="align-items:center">
        <div style="flex:1">
          <div class="card-tag tag-green">LOGGED</div>
          <div class="card-title" style="margin-top:6px">${d.lastMeal.name}</div>
          <div class="card-subtitle">${getMealStatusText()}</div>
          <button class="btn btn-outline btn-sm" style="margin-top:8px;font-size:11px" onclick="event.stopPropagation();router.navigateTo('nourishment')">Check nutrients consumed</button>
        </div>
        <div class="meal-illust-sm">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
            <circle cx="28" cy="28" r="24" fill="#f2e0bb" stroke="#3b1e5e" stroke-width="1.5"/>
            <ellipse cx="28" cy="30" rx="14" ry="8" fill="#d3c72d" opacity="0.3"/>
            <path d="M20 26c2-4 6-6 8-6s6 2 8 6" stroke="#3b1e5e" stroke-width="1.5" stroke-linecap="round" fill="none"/>
            <circle cx="24" cy="24" r="2" fill="#e3505c" opacity="0.6"/>
            <circle cx="32" cy="22" r="1.5" fill="#7ab648" opacity="0.6"/>
            <path d="M28 18v-4M26 15l2-1 2 1" stroke="#3b1e5e" stroke-width="1" stroke-linecap="round" fill="none"/>
          </svg>
        </div>
      </div>
    </div>

    <!-- Suggest Recipe -->
    <div class="card card-brand" onclick="router.navigateTo('recipes')">
      <div style="display:flex;align-items:center;justify-content:space-between">
        <div>
          <div class="card-title" style="color:white">Suggest me a healthy recipe</div>
          <div class="card-subtitle" style="color:rgba(255,255,255,0.75)">AI-curated based on your mood and needs</div>
        </div>
        <div style="width:36px;height:36px;background:rgba(255,255,255,0.15);border-radius:50%;display:flex;align-items:center;justify-content:center;color:white">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"/></svg>
        </div>
      </div>
    </div>

    <!-- Make Grocery List -->
    <div class="card" onclick="router.navigateTo('grocery')" style="overflow:hidden;padding:0">
      <div style="display:flex">
        <div style="flex:1;padding:16px">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand)" stroke-width="2" stroke-linecap="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>
            <span class="card-title" style="margin:0">Make a grocery list</span>
          </div>
          <div class="card-subtitle">Transfer your grocery list to <b>Blinkit</b> and get groceries delivered in 10 minutes.</div>
          <div style="margin-top:8px;display:inline-block;padding:4px 10px;background:var(--color-accent-pale);border-radius:12px;font-size:11px;font-weight:600;color:var(--color-accent)">FLAT 10% DISCOUNT OFF</div>
          <div style="margin-top:12px">
            <button class="btn btn-primary btn-sm" onclick="event.stopPropagation();router.navigateTo('grocery')">Create List</button>
          </div>
        </div>
        <div class="grocery-illust">
          <svg width="120" height="140" viewBox="0 0 120 140" fill="none">
            <rect x="20" y="30" width="80" height="90" rx="12" fill="#f2e0bb" stroke="#3b1e5e" stroke-width="1.5"/>
            <path d="M40 30V20a20 20 0 0140 0v10" stroke="#3b1e5e" stroke-width="1.5" fill="none"/>
            <circle cx="45" cy="60" r="8" fill="#7ab648" opacity="0.4"/>
            <circle cx="70" cy="55" r="6" fill="#e3505c" opacity="0.4"/>
            <circle cx="55" cy="80" r="7" fill="#d3c72d" opacity="0.4"/>
            <circle cx="75" cy="78" r="5" fill="#3b1e5e" opacity="0.15"/>
            <path d="M35 100h50" stroke="#3b1e5e" stroke-width="1" stroke-linecap="round" opacity="0.3"/>
            <path d="M35 108h30" stroke="#3b1e5e" stroke-width="1" stroke-linecap="round" opacity="0.2"/>
          </svg>
        </div>
      </div>
    </div>

    <!-- Supportive Quote -->
    <div class="reflection-card" style="cursor:default">
      <div class="reflection-title">A note for you, ${d.user.firstName}</div>
      <div class="reflection-quote" style="margin-bottom:0">${d.upliftQuote}</div>
    </div>

    <!-- Energy Snapshot - compact summary -->
    <div class="card" onclick="router.navigateTo('energy-detail')" style="margin-top:8px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
        <div style="display:flex;align-items:center;gap:10px">
          <div class="energy-icon-wrap energy-icon-brand">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--color-health)" stroke="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          </div>
          <div>
            <div style="font-family:var(--font-heading);font-size:16px;font-weight:700">Energy Snapshot</div>
            <div style="font-size:12px;color:var(--color-text-secondary)">${d.energy.level.status}</div>
          </div>
        </div>
        <div style="font-size:28px;font-weight:800;color:var(--color-brand)">${d.energy.level.value}%</div>
      </div>
      <div style="display:flex;gap:12px">
        <div style="flex:1;text-align:center;padding:8px;background:var(--color-bg-primary);border-radius:8px">
          <div style="font-size:15px;font-weight:700">${d.energy.focus.detail.split(' ')[0]}</div>
          <div style="font-size:10px;color:var(--color-text-secondary);margin-top:2px">Focus</div>
        </div>
        <div style="flex:1;text-align:center;padding:8px;background:var(--color-bg-primary);border-radius:8px">
          <div style="font-size:15px;font-weight:700">${d.energy.recovery.value}%</div>
          <div style="font-size:10px;color:var(--color-text-secondary);margin-top:2px">Recovery</div>
        </div>
        <div style="flex:1;text-align:center;padding:8px;background:var(--color-bg-primary);border-radius:8px">
          <div style="font-size:15px;font-weight:700">${d.energy.stamina.value}%</div>
          <div style="font-size:10px;color:var(--color-text-secondary);margin-top:2px">Stamina</div>
        </div>
      </div>
      <div style="font-size:12px;color:var(--color-text-secondary);margin-top:10px;line-height:1.5">${d.energyInsights[0]}</div>
      <div style="text-align:center;margin-top:8px;font-size:12px;color:var(--color-brand);font-weight:600">Tap for detailed breakdown</div>
    </div>

    <div style="height:20px"></div>
  `;
}

function selectMood(btn, index) {
  document.querySelectorAll('#screen-home .mood-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  APP_DATA.today.mood = index;
  UI.showToast('Mood recorded -- we\'ll personalize your insights');

  // Fade out the mood section after a brief delay
  setTimeout(() => {
    const section = document.getElementById('mood-section');
    if (section) {
      section.style.transition = 'opacity 400ms ease, max-height 400ms ease';
      section.style.opacity = '0';
      section.style.maxHeight = '0';
      section.style.overflow = 'hidden';
      section.style.marginBottom = '0';
      setTimeout(() => section.remove(), 450);
    }
  }, 800);
}
