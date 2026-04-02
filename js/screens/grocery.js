// In-memory grocery list state
let groceryItems = [];
let groceryIdCounter = 0;

// Dummy Blinkit catalog for search/fetch
const BLINKIT_CATALOG = [
  { name: 'Tata Sampann Toor Dal', category: 'Pantry', price: 159 },
  { name: 'Amul Paneer (200g)', category: 'Protein', price: 90 },
  { name: 'Organic Spinach (bunch)', category: 'Produce', price: 35 },
  { name: 'Aashirvaad Atta (5kg)', category: 'Pantry', price: 275 },
  { name: 'Mother Dairy Milk (1L)', category: 'Dairy', price: 68 },
  { name: 'Fortune Sunflower Oil (1L)', category: 'Pantry', price: 145 },
  { name: 'Fresho Banana (6pc)', category: 'Produce', price: 45 },
  { name: 'Fresho Tomato (500g)', category: 'Produce', price: 28 },
  { name: 'Fresho Onion (1kg)', category: 'Produce', price: 40 },
  { name: 'Epigamia Greek Yogurt', category: 'Dairy', price: 55 },
  { name: 'Raw Almonds (200g)', category: 'Dry Fruits', price: 199 },
  { name: 'Walnuts (200g)', category: 'Dry Fruits', price: 249 },
  { name: 'Tata Salt (1kg)', category: 'Pantry', price: 28 },
  { name: 'Red Lentils / Masoor Dal (500g)', category: 'Pantry', price: 79 },
  { name: 'Coconut Milk (400ml)', category: 'Pantry', price: 110 },
  { name: 'Fresh Turmeric (100g)', category: 'Produce', price: 20 },
  { name: 'Fresh Ginger (100g)', category: 'Produce', price: 18 },
  { name: 'Quinoa (500g)', category: 'Pantry', price: 220 },
  { name: 'Chia Seeds (200g)', category: 'Pantry', price: 179 },
  { name: 'Blueberries (125g)', category: 'Produce', price: 299 },
  { name: 'Avocado (1pc)', category: 'Produce', price: 120 },
  { name: 'Mixed Berries Frozen (300g)', category: 'Produce', price: 250 },
  { name: 'Almond Milk (1L)', category: 'Dairy', price: 199 },
  { name: 'Dark Chocolate 70% (100g)', category: 'Snacks', price: 165 },
  { name: 'Pumpkin Seeds (150g)', category: 'Dry Fruits', price: 149 },
  { name: 'Brown Rice (1kg)', category: 'Pantry', price: 120 },
  { name: 'Chickpeas / Chole (500g)', category: 'Pantry', price: 75 },
  { name: 'Honey (250g)', category: 'Pantry', price: 149 },
  { name: 'Eggs (6pc)', category: 'Protein', price: 55 },
  { name: 'Chicken Breast (500g)', category: 'Protein', price: 230 }
];

function renderGrocery(el) {
  const d = APP_DATA;
  const selectedRecipe = d.selectedRecipe ? d.recipes.find(r => r.id === d.selectedRecipe) : null;

  el.innerHTML = `
    ${UI.backHeader('Grocery List')}

    <!-- Blinkit Banner -->
    <div class="blinkit-banner">
      <div>
        <div class="blinkit-text">Blinkit Delivery</div>
        <div class="blinkit-discount">FLAT 10% OFF on your first order</div>
      </div>
      <button class="btn btn-sm" style="background:#1a1a1a;color:#F5E642;font-size:12px;padding:6px 14px" onclick="event.stopPropagation();transferToBlinkitAll()">Order</button>
    </div>

    ${selectedRecipe ? `
    <!-- Recipe-based ingredient suggestion -->
    <div style="padding:0 16px 8px">
      <div class="card card-sage" style="cursor:default">
        <div style="font-weight:600;margin-bottom:6px;color:var(--color-forest)">From recipe: ${selectedRecipe.name}</div>
        <div style="font-size:12px;color:var(--color-text-secondary);margin-bottom:10px">
          Tap items to add them to your list
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:6px">
          ${selectedRecipe.ingredients.map(item => `
            <button class="btn btn-sm btn-outline" style="font-size:12px;padding:5px 10px" onclick="addRecipeIngredient(this, '${item.replace(/'/g, "\\'")}')">
              + ${item}
            </button>
          `).join('')}
        </div>
      </div>
    </div>
    ` : ''}

    <!-- Search Blinkit -->
    <div style="padding:0 16px 12px">
      <div style="font-size:14px;font-weight:600;margin-bottom:8px">Search on Blinkit</div>
      <div style="display:flex;gap:8px">
        <input type="text" id="blinkit-search-input" class="form-input" placeholder="Search groceries on Blinkit..." style="flex:1;padding:10px 14px;font-size:13px" onkeydown="if(event.key==='Enter')searchBlinkit()">
        <button class="btn btn-sm" style="background:#1a1a1a;color:#F5E642;padding:10px 14px" onclick="searchBlinkit()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        </button>
      </div>
      <div id="blinkit-results" style="margin-top:8px"></div>
    </div>

    <!-- Add custom item -->
    <div style="padding:0 16px 12px">
      <div style="font-size:14px;font-weight:600;margin-bottom:8px">Add your own items</div>
      <div style="display:flex;gap:8px">
        <input type="text" id="grocery-add-input" class="form-input" placeholder="e.g. Oat milk, Avocado, Turmeric..." style="flex:1;padding:10px 14px;font-size:13px" onkeydown="if(event.key==='Enter')addCustomGroceryItem()">
        <button class="btn btn-primary btn-sm" onclick="addCustomGroceryItem()">Add</button>
      </div>
    </div>

    <!-- Grocery list -->
    <div style="padding:0 16px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
        <div style="font-size:14px;font-weight:600">Your list <span id="grocery-count" style="font-weight:400;color:var(--color-text-tertiary);font-size:12px">(${groceryItems.length} items)</span></div>
        ${groceryItems.length > 0 ? `<button style="font-size:12px;color:var(--color-text-tertiary)" onclick="clearGroceryList()">Clear all</button>` : ''}
      </div>
      <div id="grocery-list-items">
        ${groceryItems.length === 0 ? `
          <div style="text-align:center;padding:24px 0;color:var(--color-text-tertiary);font-size:13px">
            Your list is empty. Add items above or search Blinkit.
          </div>
        ` : renderGroceryItems()}
      </div>
    </div>

    ${groceryItems.length > 0 ? `
    <div style="padding:16px">
      <button class="btn btn-primary btn-full" onclick="transferToBlinkitAll()">
        Transfer to Blinkit
      </button>
      <div style="text-align:center;margin-top:8px;font-size:11px;color:var(--color-text-tertiary)">
        Choose specific brands and quantities on Blinkit -- FLAT 10% OFF
      </div>
    </div>
    ` : ''}

    <div style="height:20px"></div>
  `;
}

function renderGroceryItems() {
  if (groceryItems.length === 0) return '';
  return groceryItems.map(item => `
    <div class="checkbox-item" id="grocery-item-${item.id}">
      <div class="checkbox${item.checked ? ' checked' : ''}" onclick="toggleGroceryCheck(${item.id})"></div>
      <span class="checkbox-label${item.checked ? ' checked' : ''}" style="flex:1">${item.name}</span>
      ${item.price ? `<span style="font-size:11px;color:var(--color-text-tertiary);margin-right:8px">Rs.${item.price}</span>` : ''}
      <button style="width:24px;height:24px;display:flex;align-items:center;justify-content:center;color:var(--color-text-tertiary)" onclick="removeGroceryItem(${item.id})">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
  `).join('');
}

function addCustomGroceryItem() {
  const input = document.getElementById('grocery-add-input');
  const name = input.value.trim();
  if (!name) return;
  groceryItems.push({ id: ++groceryIdCounter, name, checked: false, price: null });
  input.value = '';
  refreshGroceryList();
}

function addRecipeIngredient(btn, name) {
  if (groceryItems.some(i => i.name.toLowerCase() === name.toLowerCase())) {
    UI.showToast('Already in your list');
    return;
  }
  groceryItems.push({ id: ++groceryIdCounter, name, checked: false, price: null });
  btn.style.opacity = '0.4';
  btn.style.pointerEvents = 'none';
  btn.textContent = 'Added';
  refreshGroceryList();
}

function addBlinkitItem(name, price) {
  if (groceryItems.some(i => i.name.toLowerCase() === name.toLowerCase())) {
    UI.showToast('Already in your list');
    return;
  }
  groceryItems.push({ id: ++groceryIdCounter, name, checked: false, price });
  refreshGroceryList();
  // Re-run search to update buttons
  searchBlinkit();
  UI.showToast('Added to your list');
}

function searchBlinkit() {
  const input = document.getElementById('blinkit-search-input');
  const query = input.value.trim().toLowerCase();
  const resultsEl = document.getElementById('blinkit-results');
  if (!query) {
    resultsEl.innerHTML = '';
    return;
  }
  const matches = BLINKIT_CATALOG.filter(item =>
    item.name.toLowerCase().includes(query) || item.category.toLowerCase().includes(query)
  ).slice(0, 5);

  if (matches.length === 0) {
    resultsEl.innerHTML = `<div style="font-size:12px;color:var(--color-text-tertiary);padding:8px 0">No results found on Blinkit. You can add it manually above.</div>`;
    return;
  }
  resultsEl.innerHTML = matches.map(item => {
    const alreadyAdded = groceryItems.some(i => i.name.toLowerCase() === item.name.toLowerCase());
    return `
    <div style="display:flex;align-items:center;padding:8px 0;border-bottom:1px solid var(--color-cream);gap:10px">
      <div style="flex:1">
        <div style="font-size:13px;font-weight:500">${item.name}</div>
        <div style="font-size:11px;color:var(--color-text-tertiary)">${item.category} -- Rs.${item.price}</div>
      </div>
      ${alreadyAdded
        ? `<span style="font-size:11px;color:var(--color-improving);font-weight:600">Added</span>`
        : `<button class="btn btn-sm btn-primary" style="font-size:11px;padding:4px 10px" onclick="addBlinkitItem('${item.name.replace(/'/g, "\\'")}', ${item.price})">+ Add</button>`
      }
    </div>`;
  }).join('');
}

function toggleGroceryCheck(id) {
  const item = groceryItems.find(i => i.id === id);
  if (item) {
    item.checked = !item.checked;
    const el = document.getElementById(`grocery-item-${id}`);
    if (el) {
      el.querySelector('.checkbox').classList.toggle('checked');
      el.querySelector('.checkbox-label').classList.toggle('checked');
    }
  }
}

function removeGroceryItem(id) {
  groceryItems = groceryItems.filter(i => i.id !== id);
  refreshGroceryList();
}

function clearGroceryList() {
  groceryItems = [];
  refreshGroceryList();
}

function refreshGroceryList() {
  // Re-render the full grocery screen to keep everything in sync
  const screenEl = document.getElementById('screen-grocery');
  if (screenEl) renderGrocery(screenEl);
}

function transferToBlinkitAll() {
  if (groceryItems.length === 0) {
    UI.showToast('Add some items first');
    return;
  }
  UI.showToast('Transferred ' + groceryItems.length + ' items to Blinkit');
}
