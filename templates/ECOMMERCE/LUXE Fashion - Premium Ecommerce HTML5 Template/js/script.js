/**
 * LUXE FASHION - Premium Ecommerce Template
 * script.js — Main JavaScript File
 * Author: LuxeFashion
 * Version: 1.0
 */

(function () {
  'use strict';

  /* ================================================
     CART STATE
     ================================================ */
  let cart = JSON.parse(localStorage.getItem('luxe_cart')) || [];

  function saveCart() {
    localStorage.setItem('luxe_cart', JSON.stringify(cart));
    updateCartCount();
  }

  function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = count;
      el.style.display = count === 0 ? 'none' : 'flex';
    });
  }

  function addToCart(id, name, price, image, size, qty) {
    qty = qty || 1;
    const existing = cart.find(i => i.id === id && i.size === size);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ id, name, price, image, size: size || 'One Size', qty });
    }
    saveCart();
    showToast(`<i class="bi bi-bag-check"></i> "${name}" added to cart!`);
  }

  function removeFromCart(id, size) {
    cart = cart.filter(i => !(i.id === id && i.size === size));
    saveCart();
    renderCartPage();
  }

  function updateQty(id, size, qty) {
    const item = cart.find(i => i.id === id && i.size === size);
    if (item) {
      item.qty = Math.max(1, parseInt(qty) || 1);
      saveCart();
    }
    renderCartTotal();
  }

  /* ================================================
     TOAST NOTIFICATION
     ================================================ */
  function showToast(html, duration) {
    duration = duration || 3000;
    let toast = document.getElementById('luxe-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'luxe-toast';
      toast.className = 'toast-notification';
      document.body.appendChild(toast);
    }
    toast.innerHTML = html;
    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => toast.classList.remove('show'), duration);
  }

  /* ================================================
     STICKY NAVBAR
     ================================================ */
  function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    function onScroll() {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ================================================
     BACK TO TOP
     ================================================ */
  function initBackToTop() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ================================================
     SCROLL ANIMATIONS
     ================================================ */
  function initScrollAnimations() {
    const elements = document.querySelectorAll('.fade-up, .fade-in');
    if (!elements.length) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    elements.forEach(el => observer.observe(el));
  }

  /* ================================================
     ADD TO CART BUTTONS
     ================================================ */
  function initAddToCart() {
    document.querySelectorAll('[data-add-cart]').forEach(btn => {
      btn.addEventListener('click', function () {
        const id    = this.dataset.id    || 'p' + Math.random();
        const name  = this.dataset.name  || 'Fashion Item';
        const price = this.dataset.price || '0';
        const img   = this.dataset.image || '';
        const size  = this.dataset.size  || '';
        addToCart(id, name, parseFloat(price), img, size, 1);
      });
    });
  }

  /* ================================================
     PRODUCT PAGE — SIZE SELECTOR
     ================================================ */
  function initSizeSelector() {
    document.querySelectorAll('.size-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
      });
    });
  }

  /* ================================================
     PRODUCT PAGE — QUANTITY SELECTOR
     ================================================ */
  function initQtySelector() {
    document.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const input = this.closest('.qty-selector').querySelector('.qty-input');
        let val = parseInt(input.value) || 1;
        if (this.dataset.action === 'plus') val++;
        if (this.dataset.action === 'minus') val = Math.max(1, val - 1);
        input.value = val;
      });
    });
  }

  /* ================================================
     PRODUCT PAGE — GALLERY THUMBNAILS
     ================================================ */
  function initGallery() {
    const mainImg = document.getElementById('main-product-img');
    if (!mainImg) return;
    document.querySelectorAll('.thumb').forEach(thumb => {
      thumb.addEventListener('click', function () {
        const src = this.querySelector('img').src;
        mainImg.src = src;
        document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
      });
    });
  }

  /* ================================================
     PRODUCT PAGE — ADD TO CART WITH SIZE
     ================================================ */
  function initProductPageCart() {
    const btn = document.getElementById('btn-add-to-cart-detailed');
    if (!btn) return;
    btn.addEventListener('click', function () {
      const activeSize = document.querySelector('.size-btn.active');
      const size = activeSize ? activeSize.textContent.trim() : 'One Size';
      const qty  = parseInt(document.querySelector('.qty-input')?.value || 1);
      const id   = btn.dataset.id    || 'p1';
      const name = btn.dataset.name  || 'Fashion Item';
      const price = parseFloat(btn.dataset.price || 0);
      const image = btn.dataset.image || '';
      if (!activeSize && document.querySelectorAll('.size-btn').length > 0) {
        showToast('<i class="bi bi-exclamation-circle"></i> Please select a size first.');
        return;
      }
      addToCart(id, name, price, image, size, qty);
    });
  }

  /* ================================================
     CART PAGE — RENDER
     ================================================ */
  function renderCartPage() {
    const tbody = document.getElementById('cart-items-body');
    const emptyMsg = document.getElementById('cart-empty');
    const cartContent = document.getElementById('cart-content');
    if (!tbody) return;

    if (cart.length === 0) {
      if (emptyMsg) emptyMsg.style.display = 'block';
      if (cartContent) cartContent.style.display = 'none';
      return;
    }
    if (emptyMsg) emptyMsg.style.display = 'none';
    if (cartContent) cartContent.style.display = 'block';

    tbody.innerHTML = cart.map(item => `
      <tr>
        <td><img src="${item.image || 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=80'}" class="cart-product-img" alt="${item.name}"></td>
        <td>
          <div class="cart-product-name">${item.name}</div>
          <div class="cart-product-variant">Size: ${item.size}</div>
        </td>
        <td>$${item.price.toFixed(2)}</td>
        <td>
          <input type="number" class="cart-qty-input" min="1" value="${item.qty}"
            onchange="updateQty('${item.id}','${item.size}', this.value)">
        </td>
        <td>$${(item.price * item.qty).toFixed(2)}</td>
        <td>
          <button class="remove-btn" onclick="removeFromCart('${item.id}','${item.size}')">
            <i class="bi bi-x-lg"></i>
          </button>
        </td>
      </tr>
    `).join('');

    renderCartTotal();
  }

  function renderCartTotal() {
    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const shipping = subtotal > 0 ? (subtotal >= 150 ? 0 : 12) : 0;
    const total    = subtotal + shipping;
    const el = id => document.getElementById(id);
    if (el('cart-subtotal')) el('cart-subtotal').textContent = '$' + subtotal.toFixed(2);
    if (el('cart-shipping')) el('cart-shipping').textContent = shipping === 0 ? 'Free' : '$' + shipping.toFixed(2);
    if (el('cart-total'))    el('cart-total').textContent    = '$' + total.toFixed(2);
  }

  // Expose for inline handlers
  window.removeFromCart = removeFromCart;
  window.updateQty = updateQty;

  /* ================================================
     FILTER TABS (Featured & Shop page)
     ================================================ */
  function initFilterTabs() {
    document.querySelectorAll('.filter-tab').forEach(tab => {
      tab.addEventListener('click', function () {
        document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        const filter = this.dataset.filter;
        document.querySelectorAll('.product-filterable').forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* ================================================
     COUNTDOWN TIMER
     ================================================ */
  function initCountdown() {
    const target = new Date();
    target.setDate(target.getDate() + 3);
    target.setHours(0, 0, 0, 0);

    function tick() {
      const diff = target - new Date();
      if (diff <= 0) return;
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      const fmt = v => String(v).padStart(2, '0');
      const el = id => document.getElementById(id);
      if (el('count-d')) el('count-d').textContent = fmt(d);
      if (el('count-h')) el('count-h').textContent = fmt(h);
      if (el('count-m')) el('count-m').textContent = fmt(m);
      if (el('count-s')) el('count-s').textContent = fmt(s);
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ================================================
     NEWSLETTER FORM
     ================================================ */
  function initNewsletter() {
    document.querySelectorAll('.newsletter-form').forEach(form => {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const input = this.querySelector('input[type="email"]');
        if (input && input.value) {
          showToast('<i class="bi bi-check-circle"></i> Thank you for subscribing!');
          input.value = '';
        }
      });
    });
  }

  /* ================================================
     CONTACT FORM
     ================================================ */
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      showToast('<i class="bi bi-check-circle"></i> Message sent! We\'ll get back to you soon.', 4000);
      form.reset();
    });
  }

  /* ================================================
     CHECKOUT FORM
     ================================================ */
  function initCheckout() {
    const form = document.getElementById('checkout-form');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      showToast('<i class="bi bi-bag-heart"></i> Order placed successfully! Thank you.', 5000);
      cart = [];
      saveCart();
      setTimeout(() => { window.location.href = 'index.html'; }, 2500);
    });

    document.querySelectorAll('.payment-option').forEach(opt => {
      opt.addEventListener('click', function () {
        document.querySelectorAll('.payment-option').forEach(o => o.classList.remove('selected'));
        this.classList.add('selected');
        this.querySelector('input[type="radio"]').checked = true;
      });
    });
  }

  /* ================================================
     COUPON
     ================================================ */
  function initCoupon() {
    const btn = document.getElementById('apply-coupon');
    if (!btn) return;
    btn.addEventListener('click', function () {
      const code = document.getElementById('coupon-input')?.value.trim().toUpperCase();
      if (code === 'LUXE10') {
        showToast('<i class="bi bi-tag"></i> Coupon applied! 10% off.');
      } else {
        showToast('<i class="bi bi-x-circle"></i> Invalid coupon code.');
      }
    });
  }

  /* ================================================
     INIT ALL
     ================================================ */
  document.addEventListener('DOMContentLoaded', function () {
    updateCartCount();
    initNavbar();
    initBackToTop();
    initScrollAnimations();
    initAddToCart();
    initSizeSelector();
    initQtySelector();
    initGallery();
    initProductPageCart();
    renderCartPage();
    initFilterTabs();
    initCountdown();
    initNewsletter();
    initContactForm();
    initCheckout();
    initCoupon();
  });

})();
