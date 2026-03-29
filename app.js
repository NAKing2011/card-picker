/**
 * Card Picker — logic only. Catalog lives in data.js as global `sections`.
 */

// Object to track remaining count by key (section-label + card index)
const remaining = {};
// Cart: { cardName, key (inventory id), image, slotId (safe DOM id suffix) }
let cart = [];
let soldHistory = {}; // { "Halloween-0": { name: "Halloween Option 1", sold: 0 } }

// Elements
const cardSectionsContainer = document.getElementById('cardSectionsContainer');
const cartIcon = document.getElementById('cartIcon');
const cartPanel = document.getElementById('cartPanel');
const cartItemsDiv = document.getElementById('cartItems');
const closeCartBtn = document.getElementById('closeCart');
const footerBar = document.getElementById('footerBar');
const quickPicks = document.getElementById('quickPicks');
const categoryChips = document.getElementById('categoryChips');
const sectionRegistry = [];
let activeCategory = 'all';
let activeQuickPick = 'all';

const QUICK_PICK_GROUPS = [
  { key: 'all', label: 'Show All', match: (item) => true },
  { key: 'cat', label: 'Cats 🐱', match: (item) => item.tags && item.tags.includes('cat') },
  { key: 'dog', label: 'Dogs 🐶', match: (item) => item.tags && item.tags.includes('dog') },
  /*{ key: 'animal', label: 'Animals', match: (item) => item.tags && (item.tags.includes('animal') || item.tags.includes('animals')) },
  { key: 'bw', label: 'Black & White', match: (item) => item.tags && (item.tags.includes('bw') || item.tags.includes('black & white'))  },
  { key: 'people', label: 'People', match: (item) => item.tags && item.tags.includes('people') }, */
  { key: 'funny', label: 'Funny', match: (item) => item.tags && item.tags.includes('funny') }
];

/** How many sellable rows exist in a section (skips bad entries). */
function countValidCards(section) {
  if (!section.cards || !Array.isArray(section.cards)) return 0;
  return section.cards.filter(
    (c) => c && typeof c.name === 'string' && typeof c.image === 'string' && typeof c.remaining === 'number'
  ).length;
}

function initCards() {
  if (typeof sections === 'undefined' || !Array.isArray(sections)) {
    console.error('data.js must load before app.js and define `sections`.');
    return;
  }
  
  sections.forEach((section, sectionIndex) => {
    const sectionDiv = document.createElement('section');
    sectionDiv.className = 'card-section category-section';
    const validCount = countValidCards(section);
    const heading = document.createElement('div');
    heading.className = 'category-heading';
    heading.innerHTML = `
      <h2 class="section-title">${escapeHtml(section.label)}</h2>
      <span class="section-count">${validCount} card${validCount !== 1 ? 's' : ''}</span>
    `;

    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'cards-container';
    const cardNodes = [];

    (section.cards || []).forEach((card, cardIndex) => {
      if (!card || typeof card.name !== 'string' || typeof card.image !== 'string' || typeof card.remaining !== 'number') {
        return;
      }

      const cardKey = `${section.label}-${cardIndex}`;
      const slotId = `s${sectionIndex}-c${cardIndex}`;
      remaining[cardKey] = card.remaining;

      const cardDiv = document.createElement('div');
      cardDiv.className = 'card';
      
      // NEW: Add special class if the data says so
      if (card.isSpecial) {
        cardDiv.classList.add('special-card');
        // Optional: add a badge or price tag text
        const priceTag = '<div class="special-badge">✨ Premium</div>';
        cardDiv.insertAdjacentHTML('afterbegin', priceTag);
      }
      
      // Keep your live visual classes
      if (remaining[cardKey] === 0) cardDiv.classList.add('sold-out');
      if (remaining[cardKey] === 1) cardDiv.classList.add('low-stock');

      // --- NEW: Check for the hot tag ---
      const isHot = card.tags && card.tags.includes('hot');
      const hotBadge = isHot ? '<div class="hot-badge">🔥 Hot Seller</div>' : '';

      cardDiv.innerHTML = `
        <div class="card-img-container">
          ${hotBadge} 
          <img src="${escapeAttr(card.image)}" alt="${escapeHtml(card.name)}" />
          <div class="sold-out-overlay">SOLD OUT</div>
        </div>
        <div class="card-name">${escapeHtml(card.name)}</div>
        <div class="card-qty">Remaining: <span id="qty-${slotId}">${remaining[cardKey]}</span></div>
        <button type="button" id="btn-${slotId}" ${remaining[cardKey] === 0 ? 'disabled' : ''}>Claim</button>
        <div class="sold-history" id="history-${slotId}" style="display:none;"></div>
      `;

      const btn = cardDiv.querySelector('button');
      btn.onclick = () => addToCart(card.name, cardKey, card.image, btn, slotId);

      cardsContainer.appendChild(cardDiv);
      cardNodes.push(cardDiv);

      const isSpecial = card.isSpecial || false; 
      btn.onclick = () => addToCart(card.name, cardKey, card.image, btn, slotId, isSpecial);
      
    });

    if (cardsContainer.children.length === 0) {
      const empty = document.createElement('p');
      empty.className = 'accordion-empty';
      empty.textContent = 'No cards in this category yet — add rows in data.js (name, image, remaining).';
      sectionDiv.appendChild(heading);
      sectionDiv.appendChild(empty);
    } else {
      sectionDiv.appendChild(heading);
      sectionDiv.appendChild(cardsContainer);
    }

    sectionRegistry.push({ sectionEl: sectionDiv, cards: cardNodes, label: section.label, index: sectionIndex });
    cardSectionsContainer.appendChild(sectionDiv);
  });

  renderCategoryChips();
  renderQuickPicks();
}

function normalizeText(text) {
  return String(text).toLowerCase().replace(/\s+/g, ' ').trim();
}

function escapeHtml(text) {
  const s = String(text);
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeAttr(text) {
  return String(text).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

// 1. Your existing tiered logic for regular cards
function calculateRegularTier(count) {
  if (count <= 0) return 0;
  if (count === 1) return 3;
  if (count === 2) return 5;
  if (count === 3) return 8;
  if (count === 4) return 10;
  if (count === 5) return 13;
  if (count === 6) return 15;
  return 15 + (count - 6);
}

// 2. The main price function (it MUST take the 'cart' array)
function calculatePrice(cartData) {
  let total = 0;
  let regularCount = 0;

  // 1. If it's the array (the list of cards), check for special ones
  if (Array.isArray(cartData)) {
    cartData.forEach(item => {
      if (item.isSpecial) {
        total += 5; // Special cards = $5
      } else {
        regularCount++; // Normal cards = bulk discount
      }
    });
  } 
  // 2. If it's just a number (the old way), treat them all as regular
  else {
    regularCount = cartData;
  }

  // Add the tiered pricing for the regular cards
  total += calculateRegularTier(regularCount); 
  return total;
}



function addToCart(cardName, key, image, button, slotId, isSpecial) {
  if (remaining[key] <= 0) {
    alert('🐾 No cards left. Sorry! 🙃 🐾');
    return;
  }
  
  if (!soldHistory[key]) {
    soldHistory[key] = { name: cardName, sold: 0 };
  }
  soldHistory[key].sold++;
  remaining[key]--;
  
  // Push the isSpecial status into the cart array
  cart.push({ name: cardName, key: key, image: image, slotId: slotId, isSpecial: isSpecial });

  const qtyEl = document.getElementById(`qty-${slotId}`);
  if (qtyEl) qtyEl.textContent = remaining[key];
  if (remaining[key] <= 0) button.disabled = true;

  // Use the smart price function
  const total = calculatePrice(cart);
  
  // Update Footer and Cart Panel
  if(footerBar) footerBar.textContent = `Total: $${total} | ${cart.length} card${cart.length !== 1 ? 's' : ''}`;
  const cartTotalEl = document.getElementById('cartTotal');
  if(cartTotalEl) cartTotalEl.textContent = `Total: $${total}`;
  
  cartIcon.setAttribute('data-count', cart.length);

  updateCartDisplay();
}


function removeFromCart(index, permanentDelete = false) {
  const item = cart[index];

  if (!permanentDelete) {
    if (remaining[item.key] !== undefined) {
      remaining[item.key]++;
      const sid = item.slotId;
      const qtySpan = sid ? document.getElementById(`qty-${sid}`) : null;
      if (qtySpan) qtySpan.innerText = remaining[item.key];
      const claimBtn = sid ? document.getElementById(`btn-${sid}`) : null;
      if (claimBtn && remaining[item.key] > 0) claimBtn.disabled = false;
      updateCardVisuals(item.slotId, item.key);
    }

    if (soldHistory[item.key]) {
      soldHistory[item.key].sold--;
      if (soldHistory[item.key].sold < 0) soldHistory[item.key].sold = 0;
    }
  }

  cart.splice(index, 1);
  updateCartDisplay();

  saveRemainingToLocalStorage();
}

function updateCartDisplay() {
  cartItemsDiv.innerHTML = '';

  cart.forEach((item, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item';

    const top = document.createElement('div');
    top.className = 'cart-item-top';

    const img = document.createElement('img');
    img.src = item.image;
    img.alt = item.name;

    const body = document.createElement('div');
    body.className = 'cart-item-body';

    const nameSpan = document.createElement('span');
    nameSpan.className = 'cart-item-name';
    nameSpan.textContent = item.name;

    // Add the type label (NEW)
    const typeDiv = document.createElement('div');
    typeDiv.className = 'sold-history';
    typeDiv.style.display = 'block';
    typeDiv.style.marginBottom = '10px';
    typeDiv.textContent = item.isSpecial ? 'Premium Card — $5.00' : 'Regular Card';

    const actions = document.createElement('div');
    actions.className = 'cart-item-actions';

    const returnBtn = document.createElement('button');
    returnBtn.type = 'button';
    returnBtn.className = 'btn-cart-return';
    returnBtn.textContent = 'Remove Card';
    returnBtn.title = 'Put this card back in stock';
    returnBtn.onclick = () => removeFromCart(index, false);

    const finalizeBtn = document.createElement('button');
    finalizeBtn.type = 'button';
    finalizeBtn.className = 'btn-cart-finalize';
    finalizeBtn.textContent = 'Finalize sale';
    finalizeBtn.title = 'Remove from cart without restoring stock';
    finalizeBtn.onclick = () => {
      if (!confirm('Finalize this sale? The card will leave the cart and will NOT go back into stock.')) return;
      const realIndex = cart.findIndex(c => c === item);
      if (realIndex === -1) return;
      const historyDiv = item.slotId ? document.getElementById(`history-${item.slotId}`) : null;
      if (historyDiv && soldHistory[item.key]) {
        historyDiv.style.display = 'block';
        historyDiv.textContent = `Sold: ${soldHistory[item.key].sold}`;
      }
      removeFromCart(realIndex, true);
    };

    actions.appendChild(returnBtn);
    actions.appendChild(finalizeBtn);
    body.appendChild(nameSpan);
    body.appendChild(typeDiv);
    body.appendChild(actions);
    top.appendChild(img);
    top.appendChild(body);
    itemDiv.appendChild(top);

    cartItemsDiv.appendChild(itemDiv);
  });

  const totalPrice = calculatePrice(cart);
  cartIcon.setAttribute('data-count', cart.length);
  document.getElementById('cartTotal').innerText = `Total: $${totalPrice}`;
  footerBar.innerText = `Total: $${totalPrice} | ${cart.length} card${cart.length !== 1 ? 's' : ''}`;
}


function toggleCart() {
  const isVisible = cartPanel.style.display === 'flex';
  cartPanel.style.display = isVisible ? 'none' : 'flex';
  footerBar.style.display = isVisible ? 'block' : 'none';
}

function setup() {
  cartIcon.addEventListener('click', toggleCart);
  closeCartBtn.addEventListener('click', () => {
    cartPanel.style.display = 'none';
    footerBar.style.display = 'block';
  });
}

function renderCategoryChips() {
  if (!categoryChips) return;
  categoryChips.innerHTML = '';

  const allBtn = document.createElement('button');
  allBtn.type = 'button';
  allBtn.className = `category-chip ${activeCategory === 'all' ? 'is-active' : ''}`;
  allBtn.textContent = 'All';
  allBtn.onclick = () => setActiveCategory('all');
  categoryChips.appendChild(allBtn);

  sectionRegistry.forEach((sectionInfo) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `category-chip ${activeCategory === sectionInfo.label ? 'is-active' : ''}`;
    btn.textContent = sectionInfo.label;
    btn.onclick = () => setActiveCategory(sectionInfo.label);
    categoryChips.appendChild(btn);
  });
}

function renderQuickPicks() {
  if (!quickPicks) return;
  quickPicks.innerHTML = '';

  QUICK_PICK_GROUPS.forEach((group) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `quick-pick-btn ${activeQuickPick === group.key ? 'is-active' : ''}`;
    btn.textContent = group.label;
    btn.onclick = () => setActiveQuickPick(group.key);
    quickPicks.appendChild(btn);
  });
}

function setActiveCategory(nextCategory) {
  activeCategory = nextCategory;
  activeQuickPick = 'all';
  renderQuickPicks();
  renderCategoryChips();
  applyFilters();
}

function setActiveQuickPick(nextKey) {
  activeQuickPick = nextKey;
  activeCategory = 'all';
  renderQuickPicks();
  renderCategoryChips();
  applyFilters();
}

function applyFilters() {
  const activeGroup = QUICK_PICK_GROUPS.find((g) => g.key === activeQuickPick) || QUICK_PICK_GROUPS[0];

  sectionRegistry.forEach((sectionInfo) => {
    let sectionHasVisibleCards = false;

    // 1. Look at each card in this section
    sectionInfo.cards.forEach((cardDiv, cardIndex) => {
      // Get the actual card data from your global 'sections' array
      const cardData = sections[sectionInfo.index].cards[cardIndex];
      
      // Check if Category matches AND if the Quick Pick tag matches
      const categoryMatch = (activeCategory === 'all' || activeCategory === sectionInfo.label);
      
      // IMPORTANT: We pass the whole cardData to the match function now
      const tagMatch = activeGroup.match(cardData);

      if (categoryMatch && tagMatch) {
        cardDiv.style.display = 'block'; // Show card
        sectionHasVisibleCards = true;
      } else {
        cardDiv.style.display = 'none'; // Hide card
      }
    });

    // 2. Hide the whole section heading if no cards inside it match
    sectionInfo.sectionEl.style.display = sectionHasVisibleCards ? 'block' : 'none';
  });
}
function saveRemainingToLocalStorage() {
  localStorage.setItem('remaining', JSON.stringify(remaining));
}

function exportSoldHistoryToCSV() {
  let csvContent = 'data:text/csv;charset=utf-8,Item,Sold\n';

  for (const key in soldHistory) {
    if (soldHistory.hasOwnProperty(key)) {
      const sold = soldHistory[key].sold;
      csvContent += `${key},${sold}\n`;
    }
  }

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'sold_history.csv');
  document.body.appendChild(link);

  link.click();
  document.body.removeChild(link);
}

function updateCardVisuals(slotId, key) {
  const cardDiv = document.getElementById(`btn-${slotId}`).closest('.card');
  const count = remaining[key];

  // Remove old classes first
  cardDiv.classList.remove('sold-out', 'low-stock');

  // Add the correct class based on the NEW count
  if (count === 0) {
    cardDiv.classList.add('sold-out');
  } else if (count === 1) {
    cardDiv.classList.add('low-stock');
  }
}

function setActiveCategory(nextCategory) {
  activeCategory = nextCategory;
  activeQuickPick = 'all';
  renderQuickPicks();
  renderCategoryChips();
  applyFilters();
  
  // Auto-scroll to top when category changes
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setActiveQuickPick(nextKey) {
  activeQuickPick = nextKey;
  activeCategory = 'all';
  renderQuickPicks();
  renderCategoryChips();
  applyFilters();
  
  // Auto-scroll to top when quick pick changes
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

initCards();
setup();
applyFilters();
updateCartDisplay();
