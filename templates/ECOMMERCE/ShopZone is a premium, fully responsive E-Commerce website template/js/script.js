/* =====================================================
   ShopZone E-Commerce Template - Main Script
   Developed by aywebselling
   Contact: aywebsellings@gmail.com
   ===================================================== */

'use strict';

/* ==========================================
   CART SYSTEM
   ========================================== */
const Cart = {
  items: JSON.parse(localStorage.getItem('shopzone_cart') || '[]'),

  save() {
    localStorage.setItem('shopzone_cart', JSON.stringify(this.items));
    this.updateCount();
  },

  add(product) {
    const existing = this.items.find(i => i.id === product.id);
    if (existing) {
      existing.qty += product.qty || 1;
    } else {
      this.items.push({ ...product, qty: product.qty || 1 });
    }
    this.save();
    showToast(`"${product.name}" added to cart!`);
  },

  remove(id) {
    this.items = this.items.filter(i => i.id !== id);
    this.save();
  },

  updateQty(id, qty) {
    const item = this.items.find(i => i.id === id);
    if (item) { item.qty = Math.max(1, qty); this.save(); }
  },

  getTotal() {
    return this.items.reduce((sum, i) => sum + (i.price * i.qty), 0);
  },

  getCount() {
    return this.items.reduce((sum, i) => sum + i.qty, 0);
  },

  clear() {
    this.items = [];
    this.save();
  },

  updateCount() {
    const badges = document.querySelectorAll('.cart-count');
    badges.forEach(b => {
      b.textContent = this.getCount();
      b.style.display = this.getCount() > 0 ? 'flex' : 'none';
    });
  }
};

/* ==========================================
   TOAST NOTIFICATION
   ========================================== */
function showToast(message, icon = 'bi-check-circle-fill') {
  let toast = document.getElementById('shopzone-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'shopzone-toast';
    toast.className = 'toast-custom';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<i class="bi ${icon}"></i> ${message}`;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 3000);
}

/* ==========================================
   SCROLL REVEAL
   ========================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => observer.observe(el));
}

/* ==========================================
   BACK TO TOP
   ========================================== */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ==========================================
   STICKY NAVBAR
   ========================================== */
function initStickyNav() {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.style.boxShadow = '0 4px 30px rgba(0,0,0,0.12)';
    } else {
      nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.07)';
    }
  });
}

/* ==========================================
   COUNTDOWN TIMER
   ========================================== */
function initCountdown() {
  const countdownEl = document.getElementById('countdown');
  if (!countdownEl) return;

  let deadline = localStorage.getItem('shopzone_deadline');
  if (!deadline) {
    deadline = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    localStorage.setItem('shopzone_deadline', deadline);
  }

  function update() {
    const now  = new Date();
    const end  = new Date(deadline);
    const diff = Math.max(0, end - now);

    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    const fmt = n => String(n).padStart(2, '0');
    countdownEl.querySelector('#cnt-h').textContent = fmt(h);
    countdownEl.querySelector('#cnt-m').textContent = fmt(m);
    countdownEl.querySelector('#cnt-s').textContent = fmt(s);

    if (diff <= 0) clearInterval(interval);
  }

  const interval = setInterval(update, 1000);
  update();
}

/* ==========================================
   PRODUCT GALLERY (product.html)
   ========================================== */
function initGallery() {
  const thumbs = document.querySelectorAll('.gallery-thumb');
  const mainImg = document.querySelector('.gallery-main img');
  if (!thumbs.length || !mainImg) return;

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      const src = thumb.querySelector('img').src;
      mainImg.style.opacity = '0';
      setTimeout(() => {
        mainImg.src = src;
        mainImg.style.opacity = '1';
      }, 200);
      mainImg.style.transition = 'opacity 0.2s ease';
    });
  });
}

/* ==========================================
   SIZE SELECTOR
   ========================================== */
function initSizeSelector() {
  document.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.size-selector').querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

/* ==========================================
   COLOR SELECTOR
   ========================================== */
function initColorSelector() {
  document.querySelectorAll('.color-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.color-selector').querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

/* ==========================================
   QUANTITY SELECTOR
   ========================================== */
function initQuantitySelector() {
  document.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.closest('.quantity-selector').querySelector('.qty-input');
      let val = parseInt(input.value) || 1;
      if (btn.dataset.action === 'plus') val++;
      else val = Math.max(1, val - 1);
      input.value = val;
    });
  });
}

/* ==========================================
   ADD TO CART BUTTONS
   ========================================== */
function initAddToCartButtons() {
  document.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', function() {
      const card = this.closest('[data-product-id]') || this.closest('.product-card');
      const id   = card?.dataset?.productId || 'p' + Math.random().toString(36).slice(2, 7);
      const name = card?.dataset?.productName || card?.querySelector('.product-name')?.textContent || 'Product';
      const price= parseFloat(card?.dataset?.productPrice || card?.querySelector('.price-current')?.textContent?.replace(/[^0-9.]/g,'') || '0');
      const img  = card?.querySelector('.product-img-wrapper img')?.src || '';

      Cart.add({ id, name, price, img });

      this.innerHTML = '<i class="bi bi-check2"></i> Added!';
      this.classList.add('added');
      setTimeout(() => {
        this.innerHTML = '<i class="bi bi-cart-plus"></i> Add to Cart';
        this.classList.remove('added');
      }, 2000);
    });
  });

  // Product detail add to cart
  const detailBtn = document.getElementById('addToCartDetail');
  if (detailBtn) {
    detailBtn.addEventListener('click', function() {
      const qty  = parseInt(document.querySelector('.qty-input')?.value) || 1;
      const name = document.querySelector('.product-detail-title')?.textContent;
      const price= parseFloat(document.querySelector('.product-detail-price')?.textContent?.replace(/[^0-9.]/g,'') || '0');
      const img  = document.querySelector('.gallery-main img')?.src || '';
      const id   = 'detail-' + Date.now();

      Cart.add({ id, name, price, img, qty });

      this.innerHTML = '<i class="bi bi-check2-circle"></i> Added to Cart!';
      this.classList.add('added');
      setTimeout(() => {
        this.innerHTML = '<i class="bi bi-cart-plus"></i> Add to Cart';
        this.classList.remove('added');
      }, 2500);
    });
  }
}

/* ==========================================
   CART PAGE RENDERER
   ========================================== */
function renderCartPage() {
  const cartBody   = document.getElementById('cartBody');
  const cartEmpty  = document.getElementById('cartEmpty');
  const cartFull   = document.getElementById('cartFull');
  const cartSummary= document.getElementById('cartSummarySection');
  if (!cartBody) return;

  function renderRows() {
    if (Cart.items.length === 0) {
      cartEmpty?.classList.remove('d-none');
      cartFull?.classList.add('d-none');
      cartSummary?.classList.add('d-none');
      return;
    }
    cartEmpty?.classList.add('d-none');
    cartFull?.classList.remove('d-none');
    cartSummary?.classList.remove('d-none');

    cartBody.innerHTML = Cart.items.map(item => `
      <tr data-id="${item.id}">
        <td>
          <div class="d-flex align-items-center gap-3">
            <img src="${item.img || 'images/product-1.png'}" class="cart-product-img" alt="${item.name}">
            <div>
              <div class="cart-product-name">${item.name}</div>
              <div class="cart-product-variant">Standard</div>
            </div>
          </div>
        </td>
        <td class="fw-bold">$${item.price.toFixed(2)}</td>
        <td>
          <div class="quantity-selector">
            <button class="qty-btn cart-qty-btn" data-action="minus" data-id="${item.id}">−</button>
            <input type="number" class="qty-input" value="${item.qty}" min="1" data-id="${item.id}">
            <button class="qty-btn cart-qty-btn" data-action="plus" data-id="${item.id}">+</button>
          </div>
        </td>
        <td class="fw-bold text-primary-custom">$${(item.price * item.qty).toFixed(2)}</td>
        <td><button class="remove-btn" data-id="${item.id}"><i class="bi bi-trash"></i></button></td>
      </tr>
    `).join('');

    updateCartSummary();
    bindCartEvents();
  }

  function updateCartSummary() {
    const subtotal = Cart.getTotal();
    const shipping = subtotal > 0 ? 9.99 : 0;
    const discount = 0;
    const total    = subtotal + shipping - discount;

    setTxt('cartSubtotal', `$${subtotal.toFixed(2)}`);
    setTxt('cartShipping', shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`);
    setTxt('cartDiscount', discount > 0 ? `-$${discount.toFixed(2)}` : '$0.00');
    setTxt('cartTotal',    `$${total.toFixed(2)}`);
    setTxt('cartCount',    Cart.getCount() + ' items');
  }

  function setTxt(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  function bindCartEvents() {
    // Remove buttons
    document.querySelectorAll('.remove-btn[data-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        Cart.remove(btn.dataset.id);
        renderRows();
        showToast('Item removed from cart', 'bi-trash-fill');
      });
    });

    // Qty buttons
    document.querySelectorAll('.cart-qty-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id  = btn.dataset.id;
        const inp = document.querySelector(`.qty-input[data-id="${id}"]`);
        let val   = parseInt(inp?.value) || 1;
        if (btn.dataset.action === 'plus') val++;
        else val = Math.max(1, val - 1);
        Cart.updateQty(id, val);
        if (inp) inp.value = val;
        updateCartSummary();
      });
    });

    // Qty inputs
    document.querySelectorAll('.qty-input[data-id]').forEach(inp => {
      inp.addEventListener('change', () => {
        Cart.updateQty(inp.dataset.id, parseInt(inp.value) || 1);
        updateCartSummary();
      });
    });
  }

  renderRows();

  // Clear cart
  const clearBtn = document.getElementById('clearCartBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      Cart.clear();
      renderRows();
      showToast('Cart cleared!', 'bi-cart-x-fill');
    });
  }
}

/* ==========================================
   PAYMENT METHOD SELECTOR (checkout.html)
   ========================================== */
function initPaymentSelector() {
  document.querySelectorAll('.payment-option').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.payment-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      const radio = opt.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    });
  });
}

/* ==========================================
   CONTACT FORM
   ========================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    showToast('Message sent! We\'ll reply within 24 hours. ✉️');
    form.reset();
  });
}

/* ==========================================
   CHECKOUT FORM
   ========================================== */
function initCheckoutForm() {
  const form = document.getElementById('checkoutForm');
  if (!form) return;

  // Populate order summary
  const orderItems = document.getElementById('orderItemsList');
  if (orderItems) {
    if (Cart.items.length === 0) {
      orderItems.innerHTML = '<p class="text-muted text-center">Your cart is empty</p>';
    } else {
      orderItems.innerHTML = Cart.items.map(item => `
        <div class="order-item">
          <img src="${item.img || 'images/product-1.png'}" class="order-item-img" alt="${item.name}">
          <div>
            <div class="order-item-name">${item.name}</div>
            <div class="order-item-variant">Qty: ${item.qty}</div>
          </div>
          <span class="order-item-price">$${(item.price * item.qty).toFixed(2)}</span>
        </div>
      `).join('');
    }
    const subtotal = Cart.getTotal();
    const shipping = subtotal > 0 ? 9.99 : 0;
    const total    = subtotal + shipping;
    document.getElementById('checkoutSubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('checkoutShipping').textContent = shipping > 0 ? `$${shipping.toFixed(2)}` : 'Free';
    document.getElementById('checkoutTotal').textContent    = `$${total.toFixed(2)}`;
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    Cart.clear();
    const successModal = new bootstrap.Modal(document.getElementById('orderSuccessModal'));
    successModal.show();
  });
}

/* ==========================================
   WISHLIST TOGGLE
   ========================================== */
function initWishlist() {
  document.querySelectorAll('.action-btn[data-action="wishlist"]').forEach(btn => {
    btn.addEventListener('click', function() {
      const icon = this.querySelector('i');
      if (icon.classList.contains('bi-heart')) {
        icon.classList.replace('bi-heart', 'bi-heart-fill');
        this.style.background = '#ff4d6d';
        this.style.color = '#fff';
        showToast('Added to wishlist!', 'bi-heart-fill');
      } else {
        icon.classList.replace('bi-heart-fill', 'bi-heart');
        this.style.background = '';
        this.style.color = '';
        showToast('Removed from wishlist', 'bi-heart');
      }
    });
  });
}

/* ==========================================
   SHOP FILTER & SORT
   ========================================== */
function initShopSort() {
  const sortSelect = document.getElementById('sortSelect');
  if (!sortSelect) return;
  sortSelect.addEventListener('change', function() {
    showToast(`Sorting by: ${this.options[this.selectedIndex].text}`, 'bi-sort-down');
  });
}

/* ==========================================
   PRICE RANGE SLIDER
   ========================================== */
function initPriceSlider() {
  const slider = document.getElementById('priceSlider');
  const display = document.getElementById('priceDisplay');
  if (!slider || !display) return;
  slider.addEventListener('input', () => {
    display.textContent = `$0 — $${slider.value}`;
  });
}

/* ==========================================
   NEWSLETTER FORM
   ========================================== */
function initNewsletter() {
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      showToast('Subscribed! Check your email.', 'bi-envelope-check-fill');
      this.reset();
    });
  });
}

/* ==========================================
   COUPON CODE
   ========================================== */
function initCoupon() {
  const btn = document.getElementById('applyCouponBtn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const code = document.getElementById('couponInput')?.value.trim().toUpperCase();
    if (code === 'SAVE10') {
      showToast('Coupon applied! 10% off your order.', 'bi-tag-fill');
    } else {
      showToast('Invalid coupon code.', 'bi-x-circle-fill');
    }
  });
}

/* ==========================================
   INIT ALL
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {
  Cart.updateCount();
  initScrollReveal();
  initBackToTop();
  initStickyNav();
  initCountdown();
  initGallery();
  initSizeSelector();
  initColorSelector();
  initQuantitySelector();
  initAddToCartButtons();
  renderCartPage();
  initPaymentSelector();
  initContactForm();
  initCheckoutForm();
  initWishlist();
  initShopSort();
  initPriceSlider();
  initNewsletter();
  initCoupon();
});
