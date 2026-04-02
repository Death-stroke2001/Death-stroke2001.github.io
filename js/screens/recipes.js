function renderRecipes(el) {
  const d = APP_DATA;
  el.innerHTML = `
    ${UI.backHeader('Recipes for You')}

    <div style="padding:0 16px 8px">
      <div style="font-size:13px;color:var(--color-text-secondary);line-height:1.6;margin-bottom:12px">
        Recipes chosen to support how you are feeling today. Each one is crafted with your wellbeing in mind.
      </div>
      <div class="chip-row">
        <button class="chip chip-forest" onclick="filterRecipes(this, 'all')">All</button>
        <button class="chip" onclick="filterRecipes(this, 'brain')">Brain boost</button>
        <button class="chip" onclick="filterRecipes(this, 'clarity')">Clarity fuel</button>
        <button class="chip" onclick="filterRecipes(this, 'gut')">Gut-friendly</button>
        <button class="chip" onclick="filterRecipes(this, 'sleep')">Sleep support</button>
        <button class="chip" onclick="filterRecipes(this, 'comfort')">Comfort</button>
      </div>
    </div>

    <div id="recipe-list" style="padding:0 16px">
      ${d.recipes.map(r => `
        <div class="recipe-card" data-benefit="${r.benefit.toLowerCase()}" onclick="router.navigateTo('recipe-detail', '${r.id}')">
          <img class="recipe-card-img" src="${r.image}" alt="${r.name}">
          <div class="recipe-card-body">
            <div class="recipe-card-name">${r.name}</div>
            <div class="recipe-card-meta">
              <span>${r.time}</span>
              <span class="chip chip-sage" style="padding:3px 8px;font-size:10px">${r.benefit}</span>
            </div>
            ${r.empathyNote ? `<div style="font-size:11px;color:var(--color-text-tertiary);margin-top:4px;font-style:italic">${r.empathyNote}</div>` : ''}
          </div>
        </div>
      `).join('')}
    </div>

    <!-- AI Chat FAB -->
    <button class="ai-chat-fab" onclick="openAIChatOverlay()">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      </svg>
      <span class="ai-fab-label">AI</span>
    </button>

    <!-- AI Chat Overlay (hidden by default) -->
    <div id="ai-chat-overlay" class="ai-chat-overlay" style="display:none">
      <div class="ai-chat-header">
        <span style="font-weight:600;font-size:15px">Recipe Assistant</span>
        <button onclick="closeAIChatOverlay()" style="font-size:20px;color:var(--color-text-secondary);background:none;border:none;cursor:pointer">&times;</button>
      </div>
      <div class="ai-chat-body" id="ai-chat-body">
        <div class="ai-chat-msg ai-msg">
          Hi Kalyani! I can suggest recipes based on how you are feeling. Tell me -- are you tired, stressed, sleep-deprived, or craving something specific?
        </div>
      </div>
      <div class="ai-chat-input-row">
        <input class="ai-chat-input" id="ai-chat-input" placeholder="e.g., I'm sleep deprived today..." onkeypress="if(event.key==='Enter')sendAIChat()">
        <button class="btn btn-primary btn-sm" onclick="sendAIChat()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>
    </div>
  `;
}

function filterRecipes(btn, category) {
  btn.closest('.chip-row').querySelectorAll('.chip').forEach(c => c.classList.remove('chip-forest'));
  btn.classList.add('chip-forest');

  document.querySelectorAll('#recipe-list .recipe-card').forEach(card => {
    if (category === 'all') {
      card.style.display = '';
    } else {
      const benefit = card.dataset.benefit;
      card.style.display = benefit.includes(category) ? '' : 'none';
    }
  });
}

function openAIChatOverlay() {
  document.getElementById('ai-chat-overlay').style.display = 'flex';
}

function closeAIChatOverlay() {
  document.getElementById('ai-chat-overlay').style.display = 'none';
}

function sendAIChat() {
  const input = document.getElementById('ai-chat-input');
  const body = document.getElementById('ai-chat-body');
  const msg = input.value.trim();
  if (!msg) return;

  // Add user message
  body.innerHTML += `<div class="ai-chat-msg user-msg">${msg}</div>`;
  input.value = '';

  // Simulate AI response based on keywords
  setTimeout(() => {
    let response = '';
    const lower = msg.toLowerCase();

    if (lower.includes('sleep') || lower.includes('tired') || lower.includes('exhausted')) {
      response = `When you are sleep deprived, your body needs L-theanine and slow-release carbs. I'd recommend the <b>Calming Matcha Oat Bowl</b> -- matcha gives you calm focus without the crash, and oats sustain your energy gently. Also consider the <b>Soothing Ginger Khichdi</b> if you want something warm and easy to digest.`;
    } else if (lower.includes('stress') || lower.includes('anxious') || lower.includes('overwhelm')) {
      response = `For stress, magnesium-rich foods work wonders. Try the <b>Mood-Lifting Dark Chocolate Bark</b> as a mindful snack -- dark chocolate triggers endorphin release. For a full meal, the <b>Soothing Ginger Khichdi</b> is like a warm hug for your gut-brain axis.`;
    } else if (lower.includes('fog') || lower.includes('focus') || lower.includes('concentrate')) {
      response = `Brain fog calls for anti-inflammatory foods and omega-3s. The <b>Warm Turmeric Lentil Soup</b> is excellent -- turmeric clears inflammation that dulls thinking, while lentils provide steady brain fuel. Pair it with the <b>Berry Avocado Smoothie Bowl</b> for an omega-3 boost.`;
    } else if (lower.includes('sad') || lower.includes('low') || lower.includes('down')) {
      response = `I hear you. On low days, comfort food that also nourishes can make a difference. The <b>Soothing Ginger Khichdi</b> is warm and simple, and the <b>Mood-Lifting Dark Chocolate Bark</b> can give you a gentle lift through endorphins and magnesium.`;
    } else if (lower.includes('digest') || lower.includes('gut') || lower.includes('stomach')) {
      response = `For gut health, the <b>Warm Quinoa & Roasted Veg Bowl</b> is ideal -- fiber-rich chickpeas feed good bacteria while quinoa provides complete protein. If your stomach is sensitive today, the <b>Soothing Ginger Khichdi</b> is gentle and easy to digest.`;
    } else {
      response = `Based on your recent patterns, I'd suggest the <b>Berry Avocado Smoothie Bowl</b> for a light, brain-nourishing meal, or the <b>Warm Turmeric Lentil Soup</b> if you want something more substantial. What kind of mood or energy level are you dealing with?`;
    }

    body.innerHTML += `<div class="ai-chat-msg ai-msg">${response}</div>`;
    body.scrollTop = body.scrollHeight;
  }, 600);
}

function renderRecipeDetail(el, param) {
  const d = APP_DATA;
  const recipe = d.recipes.find(r => r.id === parseInt(param)) || d.recipes[0];

  el.innerHTML = `
    <img class="recipe-hero" src="${recipe.image}" alt="${recipe.name}">
    <button class="back-btn" onclick="router.back()" style="position:absolute;top:12px;left:12px;background:rgba(255,255,255,0.9);z-index:10">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" width="20" height="20">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
    </button>

    <div class="recipe-detail-body">
      <div class="recipe-detail-name">${recipe.name}</div>
      <div class="recipe-detail-meta">
        <span class="chip chip-sage" style="padding:4px 10px;font-size:12px">${recipe.time}</span>
        <span class="chip chip-improving" style="padding:4px 10px;font-size:12px">${recipe.benefit}</span>
      </div>

      <div class="recipe-detail-desc">${recipe.description}</div>

      ${recipe.empathyNote ? `
      <div style="padding:10px 14px;background:var(--color-improving-bg);border-radius:8px;margin-bottom:16px;font-size:12px;color:var(--color-improving);font-style:italic">
        ${recipe.empathyNote}
      </div>` : ''}

      <div class="recipe-section-title">Ingredients</div>
      <ul class="ingredient-list">
        ${recipe.ingredients.map(i => `<li>${i}</li>`).join('')}
      </ul>

      <div class="recipe-section-title">Steps</div>
      <ol class="step-list">
        ${recipe.steps.map(s => `<li>${s}</li>`).join('')}
      </ol>

      <div style="display:flex;gap:12px">
        <button class="btn btn-primary" style="flex:1" onclick="finalizeRecipeForGrocery(${recipe.id})">Add to grocery list</button>
        <button class="btn btn-outline" onclick="UI.showToast('Meal logged');router.navigateTo('home')">I made this</button>
      </div>
    </div>
  `;
}

function finalizeRecipeForGrocery(recipeId) {
  APP_DATA.selectedRecipe = recipeId;
  UI.showToast('Ingredients added to grocery list');
  router.navigateTo('grocery');
}
