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
  { key: 'animal', label: 'Animals', match: (item) => item.tags && (item.tags.includes('animal') || item.tags.includes('animals')) },
  { key: 'bw', label: 'Black & White', match: (item) => item.tags && (item.tags.includes('bw') || item.tags.includes('black & white'))  },
  { key: 'people', label: 'People', match: (item) => item.tags && item.tags.includes('people') }
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
      cardDiv.innerHTML = `
        <img src="${escapeAttr(card.image)}" alt="${escapeHtml(card.name)}" />
        <div class="card-name">${escapeHtml(card.name)}</div>
        <div class="card-qty">Remaining: <span id="qty-${slotId}">${remaining[cardKey]}</span></div>
        <button type="button" id="btn-${slotId}">Claim</button>
        <div class="sold-history" id="history-${slotId}" style="display:none;"></div>
      `;

      const btn = cardDiv.querySelector('button');
      btn.onclick = () => addToCart(card.name, cardKey, card.image, btn, slotId);

      if (remaining[cardKey] === 0) {
        btn.disabled = true;
      }

      cardsContainer.appendChild(cardDiv);
      cardNodes.push(cardDiv);
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

function calculatePrice(count) {
  if (count <= 0) return 0;
  if (count === 1) return 2;
  if (count === 2) return 3;
  if (count === 3) return 5;
  if (count === 4) return 6;
  if (count === 5) return 8;
  if (count === 6) return 9;
  return 9 + (count - 6);
}

function addToCart(cardName, key, image, button, slotId) {
  if (remaining[key] <= 0) {
    alert('🐾 No cards left. Sorry! 🙃 🐾');
    return;
  }
  if (!soldHistory[key]) {
    soldHistory[key] = { name: cardName, sold: 0 };
  }
  soldHistory[key].sold++;

  remaining[key]--;
  const qtyEl = document.getElementById(`qty-${slotId}`);
  if (qtyEl) qtyEl.innerText = remaining[key];
  if (remaining[key] === 0) button.disabled = true;

  cart.push({ cardName, key, image, slotId });
  updateCartDisplay();

  saveRemainingToLocalStorage();
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
    const div = document.createElement('div');
    div.className = 'cart-item';

    const top = document.createElement('div');
    top.className = 'cart-item-top';

    const img = document.createElement('img');
    img.src = item.image;
    img.alt = item.cardName;

    const body = document.createElement('div');
    body.className = 'cart-item-body';

    const nameSpan = document.createElement('span');
    nameSpan.className = 'cart-item-name';
    nameSpan.textContent = item.cardName;

    const actions = document.createElement('div');
    actions.className = 'cart-item-actions';

    const returnBtn = document.createElement('button');
    returnBtn.type = 'button';
    returnBtn.className = 'btn-cart-return';
    returnBtn.textContent = 'Return';
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
    body.appendChild(actions);
    top.appendChild(img);
    top.appendChild(body);
    div.appendChild(top);

    cartItemsDiv.appendChild(div);
  });

  const totalPrice = calculatePrice(cart.length);
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

initCards();
setup();
applyFilters();
updateCartDisplay();
