/* ============================================================
   ArtHouse - Premium Art Ecommerce Template
   Custom JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // 1. Sticky Navbar & Scroll Effect
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const headerHeight = navbar.offsetHeight;
    
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });

    // Check on load
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    }
  }

  // 2. Active Link Highlight
  const currentLocation = location.href;
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    if (link.href === currentLocation) {
      link.classList.add('active');
    } else if (currentLocation.includes('artwork.html') && link.href.includes('shop.html')) {
        // Highlight shop link when on artwork detail
        link.classList.add('active');
    } else if (currentLocation.includes('cart.html') || currentLocation.includes('checkout.html')) {
        // Remove active link from standard pages if in cart flow
        link.classList.remove('active');
    }
  });

  // ==========================================
  // 3. Shopping Cart Logic (localStorage)
  // ==========================================
  
  // Initialize cart from localStorage or empty array
  let cart = JSON.parse(localStorage.getItem('artHouseCart')) || [];
  
  // UI Elements
  const cartBadges = document.querySelectorAll('.cart-badge');
  const addToCartBtns = document.querySelectorAll('.add-to-cart-btn, .btn-add-cart');
  const cartTableBody = document.querySelector('.cart-table tbody');
  
  // Show toast notification
  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-art';
    toast.innerHTML = `
      <i class="fas fa-check-circle"></i>
      <span class="msg">${message}</span>
    `;
    
    document.querySelector('.toast-container-custom').appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = 'slideOutRight 0.3s ease forwards';
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3000);
  }

  // Update Cart Badges
  function updateCartBadges() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadges.forEach(badge => {
      badge.textContent = totalCount;
      badge.style.transform = 'scale(1.3)';
      setTimeout(() => badge.style.transform = 'scale(1)', 200);
    });
  }

  // Initial badge update
  updateCartBadges();

  // Add to cart click handler
  addToCartBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Determine what was clicked (Shop grid item vs Artwork Detail page)
      let productInfo = {};
      const card = this.closest('.artwork-card');
      const detailPage = this.closest('.artwork-detail-info');
      
      if (card) {
        // From Shop Grid
        const titleEl = card.querySelector('h5');
        const artistEl = card.querySelector('.artist-name');
        const priceEl = card.querySelector('.price');
        const imgEl = card.querySelector('.artwork-img-placeholder');
        
        productInfo = {
          id: titleEl ? titleEl.textContent.trim().replace(/\s+/g, '-').toLowerCase() : 'item-' + Date.now(),
          title: titleEl ? titleEl.textContent.trim() : 'Artwork',
          artist: artistEl ? artistEl.textContent.trim() : 'Unknown Artist',
          price: priceEl ? parseFloat(priceEl.textContent.replace('$', '').trim()) : 0,
          imageClass: imgEl ? imgEl.className.split(' ').find(c => c.startsWith('art')) : 'art1',
          iconClass: imgEl ? imgEl.innerHTML : '<i class="fa-solid fa-paintbrush"></i>',
          quantity: 1
        };
      } else if (detailPage) {
        // From Detail Page
        const titleEl = detailPage.querySelector('h1');
        const artistEl = detailPage.querySelector('.artist-link a');
        const priceEl = detailPage.querySelector('.price-large');
        const qtyInput = detailPage.querySelector('.qty-input');
        
        // Find main image placeholder context
        const mainPlaceholder = document.querySelector('.artwork-gallery-main .gallery-placeholder');
        
        productInfo = {
          id: titleEl ? titleEl.textContent.trim().replace(/\s+/g, '-').toLowerCase() : 'item-' + Date.now(),
          title: titleEl ? titleEl.textContent.trim() : 'Artwork',
          artist: artistEl ? artistEl.textContent.trim() : 'Unknown Artist',
          price: priceEl ? parseFloat(priceEl.textContent.replace('$', '').trim()) : 0,
          imageClass: mainPlaceholder ? mainPlaceholder.className.split(' ').find(c => c.startsWith('art')) : 'art1',
          iconClass: mainPlaceholder ? mainPlaceholder.innerHTML : '<i class="fa-solid fa-paintbrush"></i>',
          quantity: qtyInput ? parseInt(qtyInput.value) : 1
        };
      }

      // Check if item already exists in cart
      const existingItemIndex = cart.findIndex(item => item.id === productInfo.id);
      if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += productInfo.quantity;
        // Cap max quantity at 10
        if(cart[existingItemIndex].quantity > 10) cart[existingItemIndex].quantity = 10;
      } else {
        cart.push(productInfo);
      }

      // Save to localStorage
      localStorage.setItem('artHouseCart', JSON.stringify(cart));
      
      updateCartBadges();
      showToast(`${productInfo.title} added to cart!`);
    });
  });

  // ==========================================
  // 4. Cart Page Rendering & Calculations
  // ==========================================

  function renderCartItems() {
    if (!cartTableBody) return; // Only run on cart page
    
    cartTableBody.innerHTML = ''; // Clear current rows

    if (cart.length === 0) {
      cartTableBody.innerHTML = `
        <tr>
            <td colspan="5" class="text-center py-5 border-0">
                <div class="text-muted mb-3"><i class="fa-solid fa-cart-shopping display-4 opacity-50"></i></div>
                <h5>Your cart is empty</h5>
                <p class="text-muted mb-4">Looks like you haven't added any artwork to your cart yet.</p>
                <a href="shop.html" class="btn-dark px-4 py-2">Continue Shopping</a>
            </td>
        </tr>`;
      
      // Zero out summary
      updateCartSummaryUI(0, 0);
      
      // Disable checkout buttons
      const checkoutBtns = document.querySelectorAll('.cart-summary .btn-gold');
      checkoutBtns.forEach(btn => {
          btn.style.opacity = '0.5';
          btn.style.pointerEvents = 'none';
      });
      return;
    }

    // Render items
    let subtotal = 0;
    let totalItems = 0;

    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;
      totalItems += item.quantity;

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="width: 80px; padding-right: 0;">
            <div class="cart-product-img-ph ${item.imageClass}">${item.iconClass}</div>
        </td>
        <td>
            <a href="artwork.html" class="cart-product-name d-block">${item.title}</a>
            <div class="cart-product-artist">${item.artist}</div>
            <div class="text-muted small mt-1">Medium: Original Size</div>
        </td>
        <td>
            <div class="cart-price">$${item.price.toFixed(2)}</div>
        </td>
        <td>
            <div class="quantity-selector" style="transform: scale(0.85); transform-origin: left center;">
                <button class="qty-btn qty-btn-minus" data-index="${index}">-</button>
                <input type="number" class="qty-input" value="${item.quantity}" min="1" max="10" data-index="${index}">
                <button class="qty-btn qty-btn-plus" data-index="${index}">+</button>
            </div>
        </td>
        <td class="text-end">
            <div class="cart-price">$${itemTotal.toFixed(2)}</div>
            <button class="cart-remove mt-2" data-index="${index}"><i class="fa-regular fa-trash-can me-1"></i> Remove</button>
        </td>
      `;
      cartTableBody.appendChild(tr);
    });

    updateCartSummaryUI(subtotal, totalItems);
    attachCartEventListeners();
    
    // Enable checkout buttons
    const checkoutBtns = document.querySelectorAll('.cart-summary .btn-gold');
    checkoutBtns.forEach(btn => {
        btn.style.opacity = '1';
        btn.style.pointerEvents = 'auto';
    });
  }

  function updateCartSummaryUI(subtotal, totalItems) {
    const summaryRows = document.querySelectorAll('.cart-summary .summary-row');
    if (summaryRows.length >= 2) {
      summaryRows[0].innerHTML = `<span class="text-muted">Subtotal (${totalItems} items)</span><span class="fw-semibold text-dark">$${subtotal.toFixed(2)}</span>`;
      
      const totalRow = document.querySelector('.summary-row.total');
      if (totalRow) {
        totalRow.innerHTML = `<span>Total</span><span class="font-serif fs-4">$${subtotal.toFixed(2)}</span>`;
      }
    }
  }

  function renderCheckoutItems() {
    const desktopContainer = document.getElementById('checkout-items-desktop');
    const mobileContainer = document.getElementById('orderItemsMobile');
    
    // Only run if we are on the checkout page
    if (!desktopContainer && !mobileContainer) return;

    if (cart.length === 0) {
      const emptyMsg = '<p class="text-muted small py-3">Your cart is empty.</p>';
      if (desktopContainer) desktopContainer.innerHTML = emptyMsg;
      if (mobileContainer) mobileContainer.innerHTML = emptyMsg;
      updateCheckoutSummaryUI(0);
      return;
    }

    let htmlContent = '';
    let subtotal = 0;

    cart.forEach(item => {
      subtotal += (item.price * item.quantity);
      
      htmlContent += `
        <div class="order-item border-0 mb-3">
            <div class="position-relative">
                <div class="order-item-img-ph ${item.imageClass}">${item.iconClass}</div>
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark border border-white p-1 px-2" style="font-size:0.6rem;">${item.quantity}</span>
            </div>
            <div>
                <div class="order-item-name">${item.title}</div>
                <div class="order-item-artist">${item.artist}</div>
            </div>
            <div class="order-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
        </div>
      `;
    });

    if (desktopContainer) desktopContainer.innerHTML = htmlContent;
    if (mobileContainer) mobileContainer.innerHTML = htmlContent;

    updateCheckoutSummaryUI(subtotal);
  }

  function updateCheckoutSummaryUI(subtotal) {
    const summaryRows = document.querySelectorAll('.checkout-section .summary-row');
    if (summaryRows.length >= 2) {
      summaryRows[0].innerHTML = `<span>Subtotal</span><span class="text-dark fw-semibold">$${subtotal.toFixed(2)}</span>`;
      
      const totalRow = document.querySelector('.checkout-section .summary-row.total');
      if (totalRow) {
        totalRow.innerHTML = `
            <span>Total</span>
            <div class="text-end">
                <span class="text-muted small fw-normal d-block">USD</span>
                <span class="font-serif fs-3">$${subtotal.toFixed(2)}</span>
            </div>
        `;
      }
      
      // Update Mobile Accordion Header
      const mobileAccPrice = document.querySelector('[data-bs-target="#orderItemsMobile"] .text-gold span:last-child');
      if (mobileAccPrice) {
          mobileAccPrice.textContent = `$${subtotal.toFixed(2)}`;
      }
    }
  }

  function attachCartEventListeners() {
    // Quantity Selectors in Cart
    const qtySelectors = document.querySelectorAll('.cart-table .quantity-selector');
    
    qtySelectors.forEach(selector => {
      const btnMinus = selector.querySelector('.qty-btn-minus');
      const btnPlus = selector.querySelector('.qty-btn-plus');
      const qtyInput = selector.querySelector('.qty-input');

      btnMinus.addEventListener('click', function(e) {
        e.preventDefault();
        const idx = this.getAttribute('data-index');
        let currentVal = parseInt(qtyInput.value);
        if (currentVal > 1) {
          cart[idx].quantity = currentVal - 1;
          saveAndReRenderCart();
        }
      });

      btnPlus.addEventListener('click', function(e) {
        e.preventDefault();
        const idx = this.getAttribute('data-index');
        let currentVal = parseInt(qtyInput.value);
        if (currentVal < 10) { 
          cart[idx].quantity = currentVal + 1;
          saveAndReRenderCart();
        }
      });
      
      qtyInput.addEventListener('change', function() {
        const idx = this.getAttribute('data-index');
        let val = parseInt(this.value);
        if (isNaN(val) || val < 1) val = 1;
        if (val > 10) val = 10;
        
        cart[idx].quantity = val;
        saveAndReRenderCart();
      });
    });

    // Remove Buttons
    const removeBtns = document.querySelectorAll('.cart-remove');
    removeBtns.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const idx = parseInt(this.getAttribute('data-index'));
        const row = this.closest('tr');
        
        if (row) {
          row.style.opacity = '0';
          row.style.transform = 'translateX(20px)';
          row.style.transition = 'all 0.3s ease';
          
          setTimeout(() => {
            cart.splice(idx, 1); // remove from array
            showToast('Item removed from cart');
            saveAndReRenderCart();
          }, 300);
        }
      });
    });
  }

  function saveAndReRenderCart() {
    localStorage.setItem('artHouseCart', JSON.stringify(cart));
    updateCartBadges();
    renderCartItems();
  }

  // Initial render if on cart page or checkout page
  if (cartTableBody) {
    renderCartItems();
  }
  
  if (document.getElementById('checkout-items-desktop')) {
      renderCheckoutItems();
      
      // Also clear cart on successful checkout
      const checkoutForm = document.querySelector('.checkout-section form');
      if (checkoutForm) {
          checkoutForm.addEventListener('submit', function() {
              // The default onsubmit is currently inline alert('...');
              // We'll just hook in here to clear the cart in the background
              localStorage.removeItem('artHouseCart');
              cart = [];
              updateCartBadges();
          });
      }
  }

  // Quantity Selector (Artwork Detail Page specifically - not in cart table)
  const detailQtySelector = document.querySelector('.artwork-detail-info .quantity-selector');
  if (detailQtySelector) {
      const btnMinus = detailQtySelector.querySelector('.qty-btn-minus');
      const btnPlus = detailQtySelector.querySelector('.qty-btn-plus');
      const qtyInput = detailQtySelector.querySelector('.qty-input');

      if (btnMinus && btnPlus && qtyInput) {
        btnMinus.addEventListener('click', function() {
          let currentVal = parseInt(qtyInput.value);
          if (currentVal > 1) qtyInput.value = currentVal - 1;
        });

        btnPlus.addEventListener('click', function() {
          let currentVal = parseInt(qtyInput.value);
          if (currentVal < 10) qtyInput.value = currentVal + 1;
        });
        
        qtyInput.addEventListener('change', function() {
          let val = parseInt(this.value);
          if (isNaN(val) || val < 1) this.value = 1;
          if (val > 10) this.value = 10;
        });
      }
  }

  // ==========================================
  // 5. Artwork Gallery Thumbnails (Artwork Detail Page)
  // ==========================================

  // 6. Artwork Gallery Thumbnails (Artwork Detail Page)
  const mainImage = document.querySelector('.artwork-gallery-main img');
  const mainPlaceholder = document.querySelector('.artwork-gallery-main .gallery-placeholder');
  const thumbs = document.querySelectorAll('.artwork-thumb');

  if ((mainImage || mainPlaceholder) && thumbs.length > 0) {
    thumbs.forEach(thumb => {
      thumb.addEventListener('click', function() {
        // Remove active class from all
        thumbs.forEach(t => t.classList.remove('active'));
        // Add active to clicked
        this.classList.add('active');
        
        // Handle images
        if (mainImage && this.querySelector('img')) {
            const newSrc = this.querySelector('img').getAttribute('src');
            
            // Fade effect
            mainImage.style.opacity = '0.5';
            setTimeout(() => {
                mainImage.setAttribute('src', newSrc);
                mainImage.style.opacity = '1';
            }, 150);
        } 
        // Handle placeholders
        else if (mainPlaceholder && this.querySelector('.thumb-ph')) {
            const newClass = this.querySelector('.thumb-ph').className.split(' ')[1]; // get art1, art2 etc class
            const newIcon = this.querySelector('.thumb-ph').innerHTML;
            
            // Fade effect
            mainPlaceholder.style.opacity = '0.5';
            setTimeout(() => {
                // Keep base classes, replace color class
                mainPlaceholder.className = 'gallery-placeholder ' + newClass;
                mainPlaceholder.innerHTML = newIcon;
                mainPlaceholder.style.opacity = '1';
            }, 150);
        }
      });
    });
  }

  // 7. Scroll Animation Observer
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  
  if (animateElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Optional: Stop observing once animated
          // observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    });

    animateElements.forEach(el => observer.observe(el));
  }

  // 8. View Toggle (Shop Page)
  const gridViewBtn = document.getElementById('grid-view-btn');
  const listViewBtn = document.getElementById('list-view-btn');
  const productGrid = document.querySelector('.product-grid-container');

  if (gridViewBtn && listViewBtn && productGrid) {
    gridViewBtn.addEventListener('click', function() {
      listViewBtn.classList.remove('active');
      this.classList.add('active');
      
      // Assuming row class is used for grid
      productGrid.querySelectorAll('.col-md-4, .col-lg-4').forEach(col => {
          col.className = 'col-sm-6 col-md-4 mb-4';
      });
      // Removing list layout specific classes if they existed
      productGrid.querySelectorAll('.artwork-card').forEach(card => {
          card.style.display = 'block';
      });
    });

    listViewBtn.addEventListener('click', function() {
      gridViewBtn.classList.remove('active');
      this.classList.add('active');
      
      // Change columns to full width for list view
      productGrid.querySelectorAll('.col-sm-6, .col-md-4, .col-lg-4').forEach(col => {
          col.className = 'col-12 mb-4';
      });
      // Apply list layout styles
      productGrid.querySelectorAll('.artwork-card').forEach(card => {
          // A somewhat hacky inline style application for quick list view
          card.style.display = 'flex';
          card.style.alignItems = 'center';
      });
    });
  }

});
