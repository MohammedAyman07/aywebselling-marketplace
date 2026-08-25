/*!
 * BLOG WEBSITE TEMPLATE - SCRIPT.JS
 * Developed by AymanInfotech
 * Email: aymaninfotechs@gmail.com
 */

'use strict';

/* ========================================
   1. PRELOADER
   ======================================== */
window.addEventListener('load', function () {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.style.opacity = '0';
    setTimeout(() => preloader.style.display = 'none', 400);
  }
});

/* ========================================
   2. STICKY NAVBAR ON SCROLL
   ======================================== */
const navbar = document.querySelector('.main-navbar');
window.addEventListener('scroll', function () {
  if (navbar) {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  // Back to top button visibility
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    if (window.scrollY > 400) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  }
});

/* ========================================
   3. BACK TO TOP BUTTON
   ======================================== */
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
  backToTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ========================================
   4. SCROLL REVEAL ANIMATIONS
   ======================================== */
function revealOnScroll() {
  const elements = document.querySelectorAll('[data-reveal]');
  const windowHeight = window.innerHeight;

  elements.forEach(function (el) {
    const rect = el.getBoundingClientRect();
    if (rect.top < windowHeight - 60) {
      el.classList.add('revealed');
    }
  });
}

// Add base styles for reveal
const revealStyle = document.createElement('style');
revealStyle.textContent = `
  [data-reveal] {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  [data-reveal].revealed {
    opacity: 1;
    transform: translateY(0);
  }
  [data-reveal][data-delay="1"] { transition-delay: 0.1s; }
  [data-reveal][data-delay="2"] { transition-delay: 0.2s; }
  [data-reveal][data-delay="3"] { transition-delay: 0.3s; }
  [data-reveal][data-delay="4"] { transition-delay: 0.4s; }
`;
document.head.appendChild(revealStyle);

window.addEventListener('scroll', revealOnScroll);
document.addEventListener('DOMContentLoaded', revealOnScroll);

/* ========================================
   5. ACTIVE NAV LINK HIGHLIGHTING
   ======================================== */
document.addEventListener('DOMContentLoaded', function () {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.main-navbar .nav-link');
  navLinks.forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
});

/* ========================================
   6. NEWSLETTER FORM SUBMISSION
   ======================================== */
document.addEventListener('DOMContentLoaded', function () {
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      const btn = form.querySelector('button[type="submit"]');
      const email = emailInput ? emailInput.value.trim() : '';

      if (!email || !validateEmail(email)) {
        showToast('Please enter a valid email address.', 'error');
        return;
      }

      const originalText = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
      btn.disabled = true;

      setTimeout(function () {
        btn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
        if (emailInput) emailInput.value = '';
        showToast('🎉 Thanks for subscribing! Welcome to InkFlow.', 'success');
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.disabled = false;
        }, 3000);
      }, 1500);
    });
  });
});

/* ========================================
   7. CONTACT FORM SUBMISSION
   ======================================== */
document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;

      btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
      btn.disabled = true;

      setTimeout(function () {
        btn.innerHTML = '<i class="fas fa-check me-2"></i>Message Sent!';
        showToast('✅ Your message has been sent! We\'ll get back to you soon.', 'success');
        contactForm.reset();
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.disabled = false;
        }, 3000);
      }, 2000);
    });
  }
});

/* ========================================
   8. CATEGORY FILTER (BLOG & CATEGORIES PAGE)
   ======================================== */
document.addEventListener('DOMContentLoaded', function () {
  const filterBtns = document.querySelectorAll('.category-filter-btn');
  const blogCards = document.querySelectorAll('[data-category]');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      blogCards.forEach(function (card) {
        const wrapper = card.closest('.col');
        if (!wrapper) return;
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          wrapper.style.display = '';
          card.style.animation = 'fadeInUp 0.4s ease both';
        } else {
          wrapper.style.display = 'none';
        }
      });
    });
  });
});

/* ========================================
   9. SEARCH FUNCTIONALITY (BASIC)
   ======================================== */
document.addEventListener('DOMContentLoaded', function () {
  const searchInputs = document.querySelectorAll('.search-input');
  searchInputs.forEach(function (input) {
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        const query = input.value.trim();
        if (query.length > 2) {
          // Redirect to blog page with search query
          window.location.href = 'blog.html?search=' + encodeURIComponent(query);
        }
      }
    });
  });
});

/* ========================================
   10. READING TIME CALCULATION
   ======================================== */
document.addEventListener('DOMContentLoaded', function () {
  const postContent = document.querySelector('.post-content');
  const readingTimeEl = document.getElementById('readingTime');

  if (postContent && readingTimeEl) {
    const words = postContent.innerText.split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    readingTimeEl.textContent = minutes + ' min read';
  }
});

/* ========================================
   11. READING PROGRESS BAR
   ======================================== */
document.addEventListener('DOMContentLoaded', function () {
  const progressBar = document.getElementById('readingProgress');
  if (progressBar) {
    window.addEventListener('scroll', function () {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / docHeight) * 100;
      progressBar.style.width = Math.min(100, scrolled) + '%';
    });
  }
});

/* ========================================
   12. SOCIAL SHARE BUTTONS
   ======================================== */
document.addEventListener('DOMContentLoaded', function () {
  const shareButtons = document.querySelectorAll('.share-btn[data-share]');
  shareButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const platform = btn.getAttribute('data-share');
      const url = encodeURIComponent(window.location.href);
      const title = encodeURIComponent(document.title);
      let shareUrl = '';

      switch (platform) {
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
          break;
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
          break;
        case 'linkedin':
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
          break;
        case 'whatsapp':
          shareUrl = `https://api.whatsapp.com/send?text=${title}%20${url}`;
          break;
      }

      if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=450');
      }
    });
  });
});

/* ========================================
   13. COPY LINK BUTTON
   ======================================== */
document.addEventListener('DOMContentLoaded', function () {
  const copyLinkBtn = document.getElementById('copyLink');
  if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', function () {
      navigator.clipboard.writeText(window.location.href).then(function () {
        showToast('🔗 Link copied to clipboard!', 'success');
      });
    });
  }
});

/* ========================================
   14. TOAST NOTIFICATION HELPER
   ======================================== */
function showToast(message, type) {
  const existing = document.querySelector('.toast-custom');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast-custom';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: ${type === 'error' ? '#e74c3c' : '#111'};
    color: white;
    padding: 12px 24px;
    border-radius: 50px;
    font-size: 0.88rem;
    font-weight: 500;
    z-index: 9999;
    box-shadow: 0 8px 30px rgba(0,0,0,0.2);
    opacity: 0;
    transition: all 0.4s ease;
    max-width: 90vw;
    text-align: center;
  `;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });

  setTimeout(function () {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

/* ========================================
   15. SMOOTH HOVER ON BLOG CARDS
   ======================================== */
document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.blog-card');
  cards.forEach(function (card) {
    card.addEventListener('mouseenter', function () {
      card.style.willChange = 'transform';
    });
    card.addEventListener('mouseleave', function () {
      card.style.willChange = 'auto';
    });
  });
});

/* ========================================
   16. EMAIL VALIDATION HELPER
   ======================================== */
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
