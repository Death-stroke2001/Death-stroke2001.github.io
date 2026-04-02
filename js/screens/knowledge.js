function renderKnowledgeSupplements(el) {
  const d = APP_DATA;

  const supplementIcons = {
    sun: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C4A35A" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>',
    moon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5A8BA8" stroke-width="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>',
    fish: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4A8B4A" stroke-width="2" stroke-linecap="round"><path d="M6.34 18.66L3 22M6.34 18.66a8 8 0 0011.31 0l4.24-4.24a2 2 0 000-2.83l-4.24-4.24a8 8 0 00-11.31 0L2.1 11.59a2 2 0 000 2.82z"/></svg>',
    leaf: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4A8B4A" stroke-width="2" stroke-linecap="round"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75"/></svg>'
  };

  el.innerHTML = `
    ${UI.backHeader('Supplement Needs')}

    <div style="padding:16px">
      <div style="font-size:13px;color:var(--color-text-secondary);line-height:1.6;margin-bottom:20px">
        Based on your food patterns and lifestyle data, here's what your body might benefit from.
      </div>

      <!-- Tata 1mg discount banner -->
      <div class="tata1mg-banner">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 8v8M8 12h8"/></svg>
          <span style="font-weight:600;font-size:14px;color:#E24444">Tata 1mg</span>
        </div>
        <div style="font-size:12px;color:var(--color-text-secondary)">
          Buy through North Wind and avail exclusive discounts on all supplements below.
        </div>
        <div style="margin-top:6px;display:inline-block;padding:3px 10px;background:#FFF0F0;border-radius:12px;font-size:11px;font-weight:600;color:#E24444">
          FLAT 15% OFF via North Wind
        </div>
      </div>

      ${d.supplements.map(s => `
        <div class="knowledge-item">
          <div class="knowledge-item-icon">${supplementIcons[s.icon] || ''}</div>
          <div class="knowledge-item-content">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
              <div class="knowledge-item-name">${s.name}</div>
              <span class="chip ${s.statusClass}" style="padding:3px 8px;font-size:10px">${s.status}</span>
            </div>
            <div class="knowledge-item-desc">${s.desc}</div>
            <div style="margin-top:8px;display:flex;align-items:center;justify-content:space-between">
              <span style="font-size:11px;color:var(--color-text-tertiary)">${s.price}</span>
              <a href="${s.tata1mgLink}" onclick="event.preventDefault();UI.showToast('Opening ${s.tata1mgName}')" class="supplement-link">
                View on Tata 1mg
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
              </a>
            </div>
          </div>
        </div>
      `).join('')}
    </div>

    <div style="padding:16px">
      <div class="card card-cream" style="cursor:default;text-align:center">
        <div style="font-size:13px;color:var(--color-text-secondary);line-height:1.6">
          These are lifestyle-based suggestions, not medical advice. Always consult a healthcare professional before starting supplements.
        </div>
      </div>
    </div>
  `;
}

function renderKnowledgeBrainfood(el) {
  const d = APP_DATA;
  el.innerHTML = `
    ${UI.backHeader('Brain Food')}

    <div style="padding:16px">
      <div style="font-size:13px;color:var(--color-text-secondary);line-height:1.6;margin-bottom:12px">
        Foods scientifically linked to improved cognitive function, memory, and mental clarity.
      </div>

      <!-- Tab switcher: Tata 1mg / Blinkit -->
      <div class="brainfood-tab-row" id="brainfood-tabs">
        <button class="brainfood-tab active" onclick="switchBrainfoodTab('info')">Food Guide</button>
        <button class="brainfood-tab" onclick="switchBrainfoodTab('blinkit')">Order on Blinkit</button>
      </div>

      <!-- Info tab (default) -->
      <div id="brainfood-info" style="display:block">
        ${d.brainFoods.map(f => `
          <div class="knowledge-item">
            <img class="knowledge-item-img" src="${f.image}" alt="${f.name}">
            <div class="knowledge-item-content">
              <div class="knowledge-item-name">${f.name}</div>
              <div class="knowledge-item-desc">${f.benefit}</div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Blinkit tab -->
      <div id="brainfood-blinkit" style="display:none">
        <div class="blinkit-banner" style="margin:0 0 16px">
          <div>
            <div class="blinkit-text">Blinkit Delivery</div>
            <div class="blinkit-discount">FLAT 10% OFF via North Wind</div>
          </div>
          <button class="btn btn-sm" style="background:#1a1a1a;color:#F5E642;font-size:12px;padding:6px 14px">Shop</button>
        </div>

        ${d.brainFoods.map(f => `
          <div class="knowledge-item" style="cursor:pointer" onclick="UI.showToast('Opening ${f.name} on Blinkit')">
            <img class="knowledge-item-img" src="${f.image}" alt="${f.name}">
            <div class="knowledge-item-content">
              <div class="knowledge-item-name">${f.name}</div>
              <div class="knowledge-item-desc">${f.benefit}</div>
              <div style="margin-top:6px;display:flex;align-items:center;justify-content:space-between">
                <span style="display:inline-block;padding:2px 8px;background:#FFF9D9;border-radius:10px;font-size:10px;font-weight:600;color:#8B7B1A">10% OFF</span>
                <span style="font-size:11px;color:var(--color-forest);font-weight:500">Order on Blinkit
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
                </span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function switchBrainfoodTab(tab) {
  const tabs = document.querySelectorAll('.brainfood-tab');
  tabs.forEach(t => t.classList.remove('active'));

  if (tab === 'blinkit') {
    tabs[1].classList.add('active');
    document.getElementById('brainfood-info').style.display = 'none';
    document.getElementById('brainfood-blinkit').style.display = 'block';
  } else {
    tabs[0].classList.add('active');
    document.getElementById('brainfood-info').style.display = 'block';
    document.getElementById('brainfood-blinkit').style.display = 'none';
  }
}

function renderKnowledgePodcasts(el) {
  const d = APP_DATA;

  const podcastIcons = {
    audio: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/></svg>',
    article: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>'
  };

  el.innerHTML = `
    ${UI.backHeader('Podcasts & Blogs')}

    <div style="padding:16px">
      <div style="font-size:13px;color:var(--color-text-secondary);line-height:1.6;margin-bottom:20px">
        Curated content to deepen your understanding of mindful nourishment.
      </div>

      ${d.podcasts.map(p => `
        <div class="knowledge-item" onclick="UI.showToast('Opening ${p.name}...')">
          <div class="knowledge-item-icon">${podcastIcons[p.icon] || ''}</div>
          <div class="knowledge-item-content">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
              <div class="knowledge-item-name">${p.name}</div>
              <span class="chip" style="padding:3px 8px;font-size:10px">${p.type}</span>
            </div>
            <div class="knowledge-item-desc">${p.desc}</div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}
