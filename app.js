/**
 * Card Picker — logic only. Catalog lives in data.js as global `sections`.
 */

// Object to track remaining count by key (section-label + card index)
const remaining = {};
// The cart array with objects: { cardName, key, image }
let cart = [];
let soldHistory = {}; // { "Halloween-0": { name: "Halloween Option 1", sold: 0 } }

// Elements
const cardSectionsContainer = document.getElementById('cardSectionsContainer');
const cartIcon = document.getElementById('cartIcon');
const cartPanel = document.getElementById('cartPanel');
const cartItemsDiv = document.getElementById('cartItems');
const closeCartBtn = document.getElementById('closeCart');
const footerBar = document.getElementById('footerBar');

function initCards() {
  if (typeof sections === 'undefined' || !Array.isArray(sections)) {
    console.error('data.js must load before app.js and define `sections`.');
    return;
  }

  sections.forEach((section) => {
    const sectionDiv = document.createElement('div');
    sectionDiv.className = 'card-section';

    const title = document.createElement('div');
    title.className = 'section-title';
    title.textContent = section.label;
    sectionDiv.appendChild(title);

    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'cards-container';

    section.cards.forEach((card, cardIndex) => {
      if (!card || typeof card.name !== 'string' || typeof card.image !== 'string' || typeof card.remaining !== 'number') {
        return;
      }

      const cardKey = `${section.label}-${cardIndex}`;
      remaining[cardKey] = card.remaining;

      const cardDiv = document.createElement('div');
      cardDiv.className = 'card';

      cardDiv.innerHTML = `
        <img src="${card.image}" alt="${card.name}" />
        <div class="card-name">${card.name}</div>
        <div class="card-qty">Remaining: <span id="qty-${cardKey}">${remaining[cardKey]}</span></div>
        <button type="button" id="btn-${cardKey}">Claim</button>
        <div class="sold-history" id="history-${cardKey}" style="display:none;"></div>
      `;

      const btn = cardDiv.querySelector('button');
      btn.onclick = () => addToCart(card.name, cardKey, card.image, btn);

      if (remaining[cardKey] === 0) {
        btn.disabled = true;
      }

      cardsContainer.appendChild(cardDiv);
    });

    sectionDiv.appendChild(cardsContainer);
    cardSectionsContainer.appendChild(sectionDiv);
  });
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

function addToCart(cardName, key, image, button) {
  if (remaining[key] <= 0) {
    alert('🐾 No cards left. Sorry! 🙃 🐾');
    return;
  }
  if (!soldHistory[key]) {
    soldHistory[key] = { name: cardName, sold: 0 };
  }
  soldHistory[key].sold++;

  remaining[key]--;
  document.getElementById(`qty-${key}`).innerText = remaining[key];
  if (remaining[key] === 0) button.disabled = true;

  cart.push({ cardName, key, image });
  updateCartDisplay();

  saveRemainingToLocalStorage();
}

function removeFromCart(index, permanentDelete = false) {
  const item = cart[index];

  if (!permanentDelete) {
    if (remaining[item.key] !== undefined) {
      remaining[item.key]++;
      const qtySpan = document.getElementById(`qty-${item.key}`);
      if (qtySpan) qtySpan.innerText = remaining[item.key];
      const claimBtn = document.getElementById(`btn-${item.key}`);
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
      const historyDiv = document.getElementById(`history-${item.key}`);
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
updateCartDisplay();
