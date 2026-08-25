/**
 * TechStore – Electronics Ecommerce Template
 * Main JavaScript File
 * Version: 1.0
 */

/* ============================================================
   1. CART STATE
============================================================ */
let cart = JSON.parse(localStorage.getItem('ts_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('ts_wishlist')) || [];

function saveCart() {
  localStorage.setItem('ts_cart', JSON.stringify(cart));
  updateCartUI();
}

function saveWishlist() {
  localStorage.setItem('ts_wishlist', JSON.stringify(wishlist));
  updateWishlistUI();
}

function updateCartUI() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll('#cartCount').forEach(el => el.textContent = count);
  renderMiniCart();
}

function updateWishlistUI() {
  const count = wishlist.length;
  document.querySelectorAll('#wishlistCount').forEach(el => el.textContent = count);
}

/* ============================================================
   2. ADD TO CART
============================================================ */
function addToCart(btn, name, price) {
  const existing = cart.find(i => i.name === name);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ name, price, qty: 1, icon: guessIcon(name) });
  }
  saveCart();
  showToast(`<i class="fas fa-cart-plus"></i> <strong>${name}</strong> added to cart!`, 'success');

  // Button animation
  if (btn) {
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Added!';
    btn.style.background = 'var(--success)';
    setTimeout(() => {
      btn.innerHTML = original;
      btn.style.background = '';
    }, 1500);
  }
}

/* ============================================================
   3. ADD TO WISHLIST
============================================================ */
function addToWishlist(btn, name) {
  const exists = wishlist.includes(name);
  if (exists) {
    wishlist = wishlist.filter(w => w !== name);
    if (btn) btn.style.color = '';
    showToast(`<i class="fas fa-heart-broken"></i> Removed from wishlist`, 'info');
  } else {
    wishlist.push(name);
    if (btn) btn.style.color = 'var(--danger)';
    showToast(`<i class="fas fa-heart"></i> <strong>${name}</strong> added to wishlist!`, 'success');
  }
  saveWishlist();
}

/* ============================================================
   4. MINI CART RENDER
============================================================ */
function renderMiniCart() {
  const container = document.getElementById('miniCartItems');
  const totalEl = document.getElementById('miniCartTotal');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `<div class="text-center py-5" style="color:var(--text-muted);">
      <i class="fas fa-shopping-cart" style="font-size:3rem;margin-bottom:1rem;display:block;"></i>
      Your cart is empty
    </div>`;
    if (totalEl) totalEl.textContent = '$0.00';
    return;
  }

  container.innerHTML = cart.map((item, i) => `
    <div class="mini-cart-item">
      <div class="mini-cart-icon"><i class="${item.icon}"></i></div>
      <div class="flex-grow-1">
        <div style="font-size:0.88rem;font-weight:600;color:#fff;">${item.name}</div>
        <div style="font-size:0.8rem;color:var(--text-muted);">Qty: ${item.qty} × $${item.price}</div>
      </div>
      <div>
        <span style="font-weight:700;color:#fff;">$${(item.qty * item.price).toLocaleString()}</span>
        <button onclick="removeFromCart(${i})" style="background:none;border:none;color:var(--danger);margin-left:0.5rem;cursor:pointer;font-size:0.9rem;" title="Remove">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
  `).join('');

  const total = cart.reduce((sum, i) => sum + i.qty * i.price, 0);
  if (totalEl) totalEl.textContent = `$${total.toLocaleString()}`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  showToast('<i class="fas fa-trash-alt"></i> Item removed from cart', 'info');
}

/* ============================================================
   5. CART PAGE RENDER
============================================================ */
function renderCartPage() {
  const tbody = document.getElementById('cartTableBody');
  const subtotalEl = document.getElementById('cartSubtotal');
  const totalEl = document.getElementById('cartTotal');
  if (!tbody) return;

  if (cart.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="text-center py-5" style="color:var(--text-muted);">
      <i class="fas fa-shopping-cart" style="font-size:3rem;display:block;margin-bottom:1rem;"></i>
      Your cart is empty. <a href="shop.html" style="color:var(--neon);">Continue shopping</a>
    </td></tr>`;
    if (subtotalEl) subtotalEl.textContent = '$0.00';
    if (totalEl) totalEl.textContent = '$0.00';
    return;
  }

  tbody.innerHTML = cart.map((item, i) => `
    <tr>
      <td>
        <div class="d-flex align-items-center gap-3">
          <div class="cart-product-icon"><i class="${item.icon}"></i></div>
          <div>
            <div style="font-weight:600;color:#fff;">${item.name}</div>
            <div style="font-size:0.78rem;color:var(--text-muted);">Unit price: $${item.price}</div>
          </div>
        </div>
      </td>
      <td style="color:#fff;font-weight:700;">$${item.price}</td>
      <td>
        <div class="qty-selector">
          <button class="qty-btn" onclick="changeQty(${i}, -1)">−</button>
          <input type="number" class="qty-input" value="${item.qty}" min="1" onchange="setQty(${i}, this.value)">
          <button class="qty-btn" onclick="changeQty(${i}, 1)">+</button>
        </div>
      </td>
      <td style="color:#fff;font-weight:700;">$${(item.qty * item.price).toLocaleString()}</td>
      <td>
        <button onclick="removeFromCart(${i})" style="background:none;border:none;color:var(--danger);cursor:pointer;font-size:1rem;" title="Remove">
          <i class="fas fa-trash-alt"></i>
        </button>
      </td>
    </tr>
  `).join('');

  const subtotal = cart.reduce((s, i) => s + i.qty * i.price, 0);
  const shipping = subtotal > 99 ? 0 : 9.99;
  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toLocaleString()}`;
  if (document.getElementById('cartShipping')) {
    document.getElementById('cartShipping').textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
  }
  if (totalEl) totalEl.textContent = `$${(subtotal + shipping).toLocaleString()}`;
}

function changeQty(i, delta) {
  cart[i].qty = Math.max(1, cart[i].qty + delta);
  saveCart();
  renderCartPage();
}

function setQty(i, val) {
  cart[i].qty = Math.max(1, parseInt(val) || 1);
  saveCart();
  renderCartPage();
}

/* ============================================================
   6. CHECKOUT ORDER REVIEW
============================================================ */
function renderOrderReview() {
  const container = document.getElementById('orderItemsReview');
  const totalEl = document.getElementById('orderTotal');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = '<div class="text-center p-3" style="color:var(--text-muted);">No items in cart</div>';
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="order-item">
      <div class="order-item-icon"><i class="${item.icon}"></i></div>
      <div class="flex-grow-1">
        <div style="font-size:0.88rem;font-weight:600;color:#fff;">${item.name}</div>
        <div style="font-size:0.78rem;color:var(--text-muted);">Qty: ${item.qty}</div>
      </div>
      <span style="font-weight:700;color:#fff;">$${(item.qty * item.price).toLocaleString()}</span>
    </div>
  `).join('');

  const total = cart.reduce((s, i) => s + i.qty * i.price, 0);
  if (totalEl) totalEl.textContent = `$${total.toLocaleString()}`;
}

/* ============================================================
   7. PRODUCT DETAIL PAGE
============================================================ */
function setupProductDetail() {
  const addBtn = document.getElementById('addToCartBtn');
  if (!addBtn) return;

  addBtn.addEventListener('click', () => {
    const name = addBtn.getAttribute('data-name') || 'ProMax X15 Smartphone';
    const price = parseFloat(addBtn.getAttribute('data-price')) || 999;
    addToCart(addBtn, name, price);
  });

  // Gallery thumbs
  document.querySelectorAll('.gallery-thumb').forEach((th, i) => {
    th.addEventListener('click', () => {
      document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
      th.classList.add('active');
    });
  });

  // Tabs
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab');
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(p => p.style.display = 'none');
      btn.classList.add('active');
      const pane = document.getElementById(target);
      if (pane) pane.style.display = 'block';
    });
  });
}

/* ============================================================
   8. QTY BUTTONS on Product Page
============================================================ */
function setupQtyControl() {
  const qtyInput = document.getElementById('productQty');
  const btnMinus = document.getElementById('qtyMinus');
  const btnPlus = document.getElementById('qtyPlus');
  if (!qtyInput) return;

  btnMinus.addEventListener('click', () => {
    const v = parseInt(qtyInput.value);
    if (v > 1) qtyInput.value = v - 1;
  });

  btnPlus.addEventListener('click', () => {
    qtyInput.value = parseInt(qtyInput.value) + 1;
  });
}

/* ============================================================
   9. SHOP PAGE — FILTER & SORT
============================================================ */
function setupShopPage() {
  const searchInput = document.getElementById('shopSearch');
  if (searchInput) {
    searchInput.addEventListener('input', filterProducts);
  }

  const sortSelect = document.getElementById('shopSort');
  if (sortSelect) {
    sortSelect.addEventListener('change', filterProducts);
  }

  // Price range
  const priceRange = document.getElementById('priceRange');
  const priceDisplay = document.getElementById('priceDisplay');
  if (priceRange && priceDisplay) {
    priceRange.addEventListener('input', () => {
      priceDisplay.textContent = `$0 – $${priceRange.value}`;
      filterProducts();
    });
  }
}

function filterProducts() {
  const searchInput = document.getElementById('shopSearch');
  const sortSelect = document.getElementById('shopSort');
  const priceRange = document.getElementById('priceRange');
  const cards = document.querySelectorAll('.shop-product-card');

  const query = searchInput ? searchInput.value.toLowerCase() : '';
  const maxPrice = priceRange ? parseInt(priceRange.value) : 9999;

  cards.forEach(card => {
    const name = (card.getAttribute('data-name') || '').toLowerCase();
    const price = parseInt(card.getAttribute('data-price') || '0');
    const cat = (card.getAttribute('data-category') || '').toLowerCase();
    const checkedCats = [...document.querySelectorAll('.cat-filter:checked')].map(c => c.value.toLowerCase());
    const catMatch = checkedCats.length === 0 || checkedCats.includes(cat);
    const nameMatch = name.includes(query);
    const priceMatch = price <= maxPrice;
    card.closest('.col').style.display = (nameMatch && priceMatch && catMatch) ? '' : 'none';
  });
}

/* ============================================================
   10. COUNTDOWN TIMER
============================================================ */
function startCountdown(endTime) {
  const hEl = document.getElementById('timerHours');
  const mEl = document.getElementById('timerMinutes');
  const sEl = document.getElementById('timerSeconds');
  if (!hEl || !mEl || !sEl) return;

  function tick() {
    const now = Date.now();
    const diff = Math.max(0, endTime - now);
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    hEl.textContent = String(h).padStart(2, '0');
    mEl.textContent = String(m).padStart(2, '0');
    sEl.textContent = String(s).padStart(2, '0');
    if (diff > 0) setTimeout(tick, 1000);
  }
  tick();
}

/* ============================================================
   11. TOAST NOTIFICATION
============================================================ */
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast-custom';
  toast.innerHTML = message;
  if (type === 'info') toast.style.borderLeftColor = 'var(--primary)';
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3100);
}

/* ============================================================
   12. CONTACT FORM SUBMIT
============================================================ */
function submitContactForm(e) {
  e.preventDefault();
  showToast('<i class="fas fa-check-circle"></i> Message sent! We\'ll get back to you soon.', 'success');
  e.target.reset();
}

/* ============================================================
   13. NEWSLETTER
============================================================ */
function subscribeNewsletter() {
  const input = document.getElementById('newsletterEmail');
  if (!input || !input.value.includes('@')) {
    showToast('<i class="fas fa-exclamation-circle"></i> Please enter a valid email.', 'info');
    return;
  }
  showToast('<i class="fas fa-check-circle"></i> Subscribed successfully! Welcome aboard.', 'success');
  input.value = '';
}

/* ============================================================
   14. COUPON CODE
============================================================ */
function applyCoupon() {
  const input = document.getElementById('couponInput');
  if (!input) return;
  const code = input.value.trim().toUpperCase();
  if (code === 'TECH10') {
    showToast('<i class="fas fa-tag"></i> Coupon applied! 10% discount added.', 'success');
  } else {
    showToast('<i class="fas fa-times-circle"></i> Invalid coupon code. Try TECH10.', 'info');
  }
}

/* ============================================================
   15. STICKY NAVBAR
============================================================ */
function setupNavbar() {
  const navbar = document.getElementById('mainNavbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

/* ============================================================
   16. BACK TO TOP (smooth scroll for hash links)
============================================================ */
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ============================================================
   17. PAYMENT METHOD SELECTION (Checkout)
============================================================ */
function setupPaymentMethods() {
  document.querySelectorAll('.payment-method-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.payment-method-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
    });
  });
}

/* ============================================================
   18. CHECKOUT FORM
============================================================ */
function submitCheckout(e) {
  e.preventDefault();
  cart = [];
  saveCart();
  showToast('<i class="fas fa-check-circle"></i> Order placed successfully! Thank you.', 'success');
  setTimeout(() => window.location.href = 'index.html', 2000);
}

/* ============================================================
   19. HELPER: Guess icon class from product name
============================================================ */
function guessIcon(name) {
  const n = name.toLowerCase();
  if (n.includes('laptop') || n.includes('book') || n.includes('macbook')) return 'fas fa-laptop';
  if (n.includes('phone') || n.includes('iphone') || n.includes('promax')) return 'fas fa-mobile-alt';
  if (n.includes('headphone') || n.includes('soundmax')) return 'fas fa-headphones-alt';
  if (n.includes('airbuds') || n.includes('bud') || n.includes('earbud')) return 'fas fa-headphones';
  if (n.includes('watch')) return 'fas fa-clock';
  if (n.includes('tab') || n.includes('tablet') || n.includes('ipad')) return 'fas fa-tablet-alt';
  if (n.includes('monitor') || n.includes('display')) return 'fas fa-desktop';
  if (n.includes('keyboard')) return 'fas fa-keyboard';
  if (n.includes('camera')) return 'fas fa-camera';
  if (n.includes('gamepad') || n.includes('controller') || n.includes('nexstick')) return 'fas fa-gamepad';
  return 'fas fa-microchip';
}

/* ============================================================
   20. SCROLL REVEAL ANIMATION
============================================================ */
function setupScrollReveal() {
  const items = document.querySelectorAll('.product-card, .category-card, .deal-product-card, .contact-info-card');
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  items.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
}

/* ============================================================
   21. INIT
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  updateCartUI();
  updateWishlistUI();
  setupNavbar();
  setupSmoothScroll();
  setupProductDetail();
  setupQtyControl();
  setupShopPage();
  renderCartPage();
  renderOrderReview();
  setupPaymentMethods();
  setupScrollReveal();

  // Restore wishlist button states
  wishlist.forEach(name => {
    document.querySelectorAll('.product-action-btn').forEach(btn => {
      if (btn.title === 'Wishlist' && btn.closest('.product-card')) {
        const card = btn.closest('.product-card');
        const productName = card.querySelector('.product-name')?.textContent;
        if (productName === name) btn.style.color = 'var(--danger)';
      }
    });
  });

  // Start countdown (8 hours from page load)
  startCountdown(Date.now() + 8 * 3600000);

  // Checkout form
  const checkoutForm = document.getElementById('checkoutForm');
  if (checkoutForm) checkoutForm.addEventListener('submit', submitCheckout);
});
