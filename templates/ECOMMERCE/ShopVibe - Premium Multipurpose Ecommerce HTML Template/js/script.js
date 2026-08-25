/**
 * ShopVibe - Premium Ecommerce Template
 * Main JavaScript File
 * Author: AymanInfotechs | aymaninfotechs@gmail.com
 */

'use strict';

/* ============================================================
   PAGE LOADER
============================================================ */
window.addEventListener('load', () => {
  const loader = document.getElementById('pageLoader');
  if (loader) {
    loader.classList.add('hidden');
    setTimeout(() => loader.remove(), 500);
  }
});

/* ============================================================
   NAVBAR - Sticky + Scroll effect
============================================================ */
const navbar = document.getElementById('mainNavbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  });
}

/* ============================================================
   SCROLL TO TOP
============================================================ */
const scrollBtn = document.getElementById('scrollTop');
if (scrollBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) scrollBtn.classList.add('visible');
    else scrollBtn.classList.remove('visible');
  });
  scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ============================================================
   TOAST NOTIFICATION
============================================================ */
function showToast(message, icon = '✓') {
  const container = document.getElementById('toastContainer') || (() => {
    const c = document.createElement('div');
    c.id = 'toastContainer'; c.className = 'toast-container';
    document.body.appendChild(c); return c;
  })();
  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.innerHTML = `<span class="toast-icon">${icon}</span> ${message}`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 400); }, 2800);
}

/* ============================================================
   CART SYSTEM
============================================================ */
const Cart = {
  _key: 'shopvibe_cart',
  get() { try { return JSON.parse(localStorage.getItem(this._key)) || []; } catch { return []; } },
  save(items) { localStorage.setItem(this._key, JSON.stringify(items)); this.updateBadge(); },
  add(product) {
    const items = this.get();
    const idx = items.findIndex(i => i.id === product.id);
    if (idx > -1) items[idx].qty += 1;
    else items.push({ ...product, qty: 1 });
    this.save(items);
    showToast(`"${product.name}" added to cart!`);
  },
  remove(id) {
    const items = this.get().filter(i => i.id !== id);
    this.save(items); this.renderCart();
    showToast('Item removed from cart', '🗑');
  },
  updateQty(id, qty) {
    if (qty < 1) { this.remove(id); return; }
    const items = this.get();
    const item = items.find(i => i.id === id);
    if (item) { item.qty = qty; this.save(items); this.renderCart(); }
  },
  count() { return this.get().reduce((s, i) => s + i.qty, 0); },
  total() { return this.get().reduce((s, i) => s + i.price * i.qty, 0); },
  updateBadge() {
    const badges = document.querySelectorAll('.cart-count');
    badges.forEach(b => { b.textContent = this.count(); b.style.display = this.count() > 0 ? 'flex' : 'none'; });
  },
  renderCart() {
    const body = document.getElementById('cartTableBody');
    const totEl = document.getElementById('cartTotal');
    const subtotalEl = document.getElementById('cartSubtotal');
    const itemsEl = document.getElementById('cartItemCount');
    const emptyEl = document.getElementById('emptyCart');
    const tableWrap = document.getElementById('cartTableWrap');
    if (!body) return;
    const items = this.get();
    if (items.length === 0) {
      if (emptyEl) emptyEl.style.display = 'block';
      if (tableWrap) tableWrap.style.display = 'none';
    } else {
      if (emptyEl) emptyEl.style.display = 'none';
      if (tableWrap) tableWrap.style.display = 'block';
      body.innerHTML = items.map(item => `
        <tr>
          <td>
            <div class="d-flex align-items-center gap-3">
              <div class="cart-item-img-placeholder">${item.icon || '📦'}</div>
              <div>
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-sku">SKU: ${item.id}</div>
              </div>
            </div>
          </td>
          <td class="fw-600">$${item.price.toFixed(2)}</td>
          <td>
            <div class="cart-qty">
              <button onclick="Cart.updateQty('${item.id}', ${item.qty - 1})">−</button>
              <input type="number" value="${item.qty}" min="1" onchange="Cart.updateQty('${item.id}', parseInt(this.value))" />
              <button onclick="Cart.updateQty('${item.id}', ${item.qty + 1})">+</button>
            </div>
          </td>
          <td><span class="cart-price">$${(item.price * item.qty).toFixed(2)}</span></td>
          <td><button class="cart-remove" onclick="Cart.remove('${item.id}')" title="Remove"><i class="bi bi-x-lg"></i></button></td>
        </tr>
      `).join('');
    }
    const subtotal = this.total();
    const shipping = subtotal > 0 ? (subtotal > 100 ? 0 : 9.99) : 0;
    const total = subtotal + shipping;
    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (totEl) totEl.textContent = `$${total.toFixed(2)}`;
    if (itemsEl) itemsEl.textContent = this.count();
    const shippingEl = document.getElementById('cartShipping');
    if (shippingEl) shippingEl.textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
  },
  renderOrderSummary() {
    const wrap = document.getElementById('orderSummaryItems');
    const subtotalEl = document.getElementById('orderSubtotal');
    const totalEl = document.getElementById('orderTotal');
    if (!wrap) return;
    const items = this.get();
    if (items.length === 0) {
      wrap.innerHTML = '<p class="text-muted small">Your cart is empty.</p>';
    } else {
      wrap.innerHTML = items.map(item => `
        <div class="order-item">
          <div class="order-item-img">${item.icon || '📦'}</div>
          <div>
            <div class="order-item-name">${item.name}</div>
            <div class="order-item-qty">Qty: ${item.qty}</div>
          </div>
          <div class="order-item-price">$${(item.price * item.qty).toFixed(2)}</div>
        </div>
      `).join('');
    }
    const subtotal = this.total();
    const shipping = subtotal > 0 ? (subtotal > 100 ? 0 : 9.99) : 0;
    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${(subtotal + shipping).toFixed(2)}`;
  }
};

/* ============================================================
   ADD TO CART BUTTONS
============================================================ */
document.addEventListener('click', e => {
  const btn = e.target.closest('[data-add-cart]');
  if (!btn) return;
  const product = {
    id:    btn.dataset.id    || 'p' + Date.now(),
    name:  btn.dataset.name  || 'Product',
    price: parseFloat(btn.dataset.price) || 0,
    icon:  btn.dataset.icon  || '📦'
  };
  Cart.add(product);
  // Flash animation
  const orig = btn.innerHTML;
  btn.innerHTML = '<i class="bi bi-check-lg"></i> Added!';
  btn.classList.add('added');
  setTimeout(() => { btn.innerHTML = orig; btn.classList.remove('added'); }, 1500);
});

/* ============================================================
   WISHLIST BUTTONS
============================================================ */
document.addEventListener('click', e => {
  const btn = e.target.closest('[data-wishlist]');
  if (!btn) return;
  btn.classList.toggle('wished');
  const wished = btn.classList.contains('wished');
  showToast(wished ? 'Added to wishlist!' : 'Removed from wishlist', wished ? '❤️' : '🤍');
});

/* ============================================================
   PRODUCT GALLERY (product.html)
============================================================ */
const galleryThumbs = document.querySelectorAll('.gallery-thumb');
const galleryMain   = document.getElementById('galleryMainImg');
galleryThumbs.forEach(thumb => {
  thumb.addEventListener('click', () => {
    galleryThumbs.forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
    if (galleryMain) {
      const src = thumb.dataset.src || thumb.querySelector('img')?.src;
      if (src) { galleryMain.style.opacity = '0'; setTimeout(() => { galleryMain.src = src; galleryMain.style.opacity = '1'; }, 150); }
    }
  });
});

/* ============================================================
   QUANTITY SELECTOR (product.html)
============================================================ */
function changeQty(delta) {
  const el = document.getElementById('productQty');
  if (!el) return;
  const newVal = Math.max(1, parseInt(el.textContent) + delta);
  el.textContent = newVal;
}

/* ============================================================
   SIZE SELECTOR (product.html)
============================================================ */
document.addEventListener('click', e => {
  const sizeBtn = e.target.closest('.size-btn');
  if (!sizeBtn) return;
  sizeBtn.closest('.size-options')?.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
  sizeBtn.classList.add('active');
});

/* ============================================================
   COLOR SWATCHES (product.html)
============================================================ */
document.addEventListener('click', e => {
  const swatch = e.target.closest('.color-swatch');
  if (!swatch) return;
  swatch.closest('.color-swatches')?.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
  swatch.classList.add('active');
});

/* ============================================================
   COUNTDOWN TIMER (index.html special offers)
============================================================ */
function initCountdown(endDate) {
  const timer = document.getElementById('countdown');
  if (!timer) return;
  function update() {
    const diff = new Date(endDate) - new Date();
    if (diff <= 0) { timer.innerHTML = '<span>EXPIRED</span>'; return; }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    document.getElementById('cd-days')?.setText ? null : null;
    const days  = document.getElementById('cd-days');
    const hours = document.getElementById('cd-hours');
    const mins  = document.getElementById('cd-mins');
    const secs  = document.getElementById('cd-secs');
    if (days)  days.textContent  = String(d).padStart(2, '0');
    if (hours) hours.textContent = String(h).padStart(2, '0');
    if (mins)  mins.textContent  = String(m).padStart(2, '0');
    if (secs)  secs.textContent  = String(s).padStart(2, '0');
  }
  update(); setInterval(update, 1000);
}
// Set offer end 3 days from now
initCountdown(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000));

/* ============================================================
   PAYMENT METHOD SELECTOR (checkout.html)
============================================================ */
document.addEventListener('click', e => {
  const pm = e.target.closest('.payment-method');
  if (!pm) return;
  document.querySelectorAll('.payment-method').forEach(p => p.classList.remove('active'));
  pm.classList.add('active');
  pm.querySelector('input[type=radio]')?.click();
});

/* ============================================================
   CONTACT FORM (contact.html)
============================================================ */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('[type=submit]');
    btn.disabled = true; btn.textContent = 'Sending...';
    setTimeout(() => {
      btn.disabled = false; btn.textContent = 'Send Message';
      contactForm.reset();
      showToast('Message sent! We\'ll reply within 24 hours. ✉️');
    }, 1500);
  });
}

/* ============================================================
   CHECKOUT FORM (checkout.html)
============================================================ */
const checkoutForm = document.getElementById('checkoutForm');
if (checkoutForm) {
  checkoutForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = checkoutForm.querySelector('[type=submit]');
    btn.disabled = true; btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Processing...';
    setTimeout(() => {
      localStorage.removeItem('shopvibe_cart');
      Cart.updateBadge();
      window.location.href = 'index.html?order=success';
    }, 2000);
  });
}

/* ============================================================
   ORDER SUCCESS TOAST (index.html)
============================================================ */
const params = new URLSearchParams(window.location.search);
if (params.get('order') === 'success') {
  setTimeout(() => showToast('🎉 Order placed successfully! Thank you!'), 500);
  history.replaceState({}, '', window.location.pathname);
}

/* ============================================================
   COUPON CODE (cart.html)
============================================================ */
const couponBtn = document.getElementById('applyCoupon');
if (couponBtn) {
  couponBtn.addEventListener('click', () => {
    const input = document.getElementById('couponInput');
    if (!input) return;
    const code = input.value.trim().toUpperCase();
    if (code === 'SAVE10') showToast('10% discount applied!', '🎁');
    else if (code === 'SHOPVIBE') showToast('Free shipping applied!', '🚚');
    else showToast('Invalid coupon code', '⚠️');
  });
}

/* ============================================================
   NEWSLETTER FORM
============================================================ */
document.querySelectorAll('.newsletter-form').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const input = form.querySelector('input[type=email]');
    if (input && input.value) {
      form.reset();
      showToast('You\'re subscribed! 🎉 Check your email.');
    }
  });
});

/* ============================================================
   SMOOTH FADE-IN ANIMATION (Intersection Observer)
============================================================ */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));

/* ============================================================
   SHOP PAGE - Filter + Sort UI
============================================================ */
function initShop() {
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      showToast(`Sorted by: ${sortSelect.options[sortSelect.selectedIndex].text}`, '↕');
    });
  }
  // View toggle
  document.querySelectorAll('.view-toggle button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.view-toggle button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const grid = document.getElementById('productsGrid');
      if (!grid) return;
      if (btn.dataset.view === 'list') {
        grid.classList.add('row-cols-1');
        grid.classList.remove('row-cols-md-3', 'row-cols-lg-4');
      } else {
        grid.classList.remove('row-cols-1');
        grid.classList.add('row-cols-md-3', 'row-cols-lg-4');
      }
    });
  });
  // Search filter on shop page
  const searchInput = document.getElementById('shopSearch');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase();
      document.querySelectorAll('.product-card-wrap').forEach(card => {
        const name = card.querySelector('.product-name')?.textContent.toLowerCase() || '';
        card.style.display = name.includes(q) ? '' : 'none';
      });
    });
  }
}
initShop();

/* ============================================================
   INIT CART BADGE + RENDER
============================================================ */
Cart.updateBadge();
Cart.renderCart();
Cart.renderOrderSummary();

/* ============================================================
   STAR RATING DISPLAY HELPER
============================================================ */
function renderStars(rating) {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) stars += '<i class="bi bi-star-fill"></i>';
    else if (i - 0.5 <= rating) stars += '<i class="bi bi-star-half"></i>';
    else stars += '<i class="bi bi-star"></i>';
  }
  return stars;
}
