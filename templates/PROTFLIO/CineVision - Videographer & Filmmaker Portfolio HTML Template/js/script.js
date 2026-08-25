/**
 * =========================================================
 * VIDEOGRAPHER PORTFOLIO TEMPLATE - script.js
 * Author: Ayman InfoTechs | aymaninfotechs@gmail.com
 * Version: 1.0
 * Description: Core JavaScript for cinematic portfolio
 * =========================================================
 */

'use strict';

/* =========================================================
   DOM READY
   ========================================================= */
document.addEventListener('DOMContentLoaded', function () {
  initLoader();
  initNavbar();
  initScrollReveal();
  initPortfolioFilter();
  initPortfolioLightbox();
  initSkillBars();
  initCounters();
  initContactForm();
  initBackToTop();
  initCurrentYear();
});

/* =========================================================
   LOADER
   ========================================================= */
function initLoader() {
  const loader = document.getElementById('loader-wrapper');
  if (!loader) return;

  // Hide loader after page assets are ready
  window.addEventListener('load', function () {
    setTimeout(function () {
      loader.classList.add('hidden');
      // Remove from DOM after transition
      setTimeout(function () {
        loader.remove();
      }, 700);
    }, 1800); // Loader display duration (matches CSS animation)
  });
}

/* =========================================================
   NAVBAR — sticky + scroll style
   ========================================================= */
function initNavbar() {
  const navbar = document.getElementById('mainNav');
  if (!navbar) return;

  function handleScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  handleScroll(); // Run on load
  window.addEventListener('scroll', handleScroll, { passive: true });

  // Close mobile menu on nav link click
  const navLinks = navbar.querySelectorAll('.nav-link');
  const navCollapse = navbar.querySelector('.navbar-collapse');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (navCollapse && navCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });
}

/* =========================================================
   SCROLL REVEAL — intersection observer
   ========================================================= */
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach(function (el) {
    observer.observe(el);
  });
}

/* =========================================================
   PORTFOLIO FILTER
   ========================================================= */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (!filterBtns.length || !portfolioItems.length) return;

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      // Update active button
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      portfolioItems.forEach(function (item) {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'block';
          item.style.opacity = '0';
          requestAnimationFrame(function () {
            item.style.transition = 'opacity 0.4s ease';
            item.style.opacity = '1';
          });
        } else {
          item.style.opacity = '0';
          setTimeout(function () {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* =========================================================
   PORTFOLIO LIGHTBOX
   ========================================================= */
function initPortfolioLightbox() {
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  const lightbox = document.getElementById('videoLightbox');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxPlaceholder = document.getElementById('lightboxPlaceholder');

  if (!lightbox) return;

  // Open lightbox on portfolio item click
  portfolioItems.forEach(function (item) {
    item.addEventListener('click', openLightbox);
    item.addEventListener('keypress', function (e) {
      if (e.key === 'Enter' || e.key === ' ') openLightbox.call(item, e);
    });

    function openLightbox() {
      const videoUrl = item.getAttribute('data-video');
      const title = item.getAttribute('data-title') || 'Video Preview';

      if (lightboxTitle) lightboxTitle.textContent = title;

      // If a real video URL is provided, embed it as iframe
      if (videoUrl && videoUrl.trim() !== '') {
        const existingIframe = lightbox.querySelector('iframe');
        if (existingIframe) existingIframe.remove();

        const iframe = document.createElement('iframe');
        iframe.className = 'lightbox-video';
        iframe.src = videoUrl;
        iframe.allowFullscreen = true;
        iframe.allow = 'autoplay; fullscreen';
        iframe.setAttribute('frameborder', '0');

        if (lightboxPlaceholder) lightboxPlaceholder.style.display = 'none';
        lightbox.querySelector('.lightbox-content').appendChild(iframe);
      } else {
        // Show placeholder
        if (lightboxPlaceholder) lightboxPlaceholder.style.display = 'flex';
        const existingIframe = lightbox.querySelector('iframe');
        if (existingIframe) existingIframe.remove();
      }

      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });

  // Close lightbox
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    // Remove iframe to stop video
    const iframe = lightbox.querySelector('iframe');
    if (iframe) iframe.remove();
    if (lightboxPlaceholder) lightboxPlaceholder.style.display = 'flex';
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

  // Close on overlay click
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

/* =========================================================
   SKILL BAR ANIMATION
   ========================================================= */
function initSkillBars() {
  const skillFills = document.querySelectorAll('.skill-fill');
  if (!skillFills.length) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const fill = entry.target;
          const targetWidth = fill.getAttribute('data-width') || '0';
          fill.style.width = targetWidth + '%';
          observer.unobserve(fill);
        }
      });
    },
    { threshold: 0.5 }
  );

  skillFills.forEach(function (fill) {
    observer.observe(fill);
  });
}

/* =========================================================
   COUNTERS ANIMATION
   ========================================================= */
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target'), 10);
          const duration = 2000; // ms
          const step = Math.ceil(target / (duration / 30));
          let current = 0;

          const timer = setInterval(function () {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            el.textContent = current + (el.getAttribute('data-suffix') || '+');
          }, 30);

          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(function (counter) {
    observer.observe(counter);
  });
}

/* =========================================================
   CONTACT FORM
   ========================================================= */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Basic validation
    const name = form.querySelector('[name="name"]');
    const email = form.querySelector('[name="email"]');
    const message = form.querySelector('[name="message"]');
    const service = form.querySelector('[name="service"]');

    let isValid = true;

    [name, email, service, message].forEach(function (field) {
      if (field && !field.value.trim()) {
        highlightError(field);
        isValid = false;
      } else if (field) {
        clearError(field);
      }
    });

    // Email format check
    if (email && email.value && !isValidEmail(email.value)) {
      highlightError(email);
      isValid = false;
    }

    if (!isValid) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    // Simulate form send (replace with real backend)
    const submitBtn = document.getElementById('contactSubmit');
    if (submitBtn) {
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending…';
      submitBtn.disabled = true;
    }

    setTimeout(function () {
      if (submitBtn) {
        submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
        submitBtn.disabled = false;
      }
      form.reset();
      showToast('Message sent successfully! I\'ll be in touch soon.', 'success');
    }, 2000);
  });

  function highlightError(field) {
    field.style.borderColor = 'var(--color-red)';
    field.style.boxShadow = '0 0 0 3px rgba(229,9,20,0.2)';
  }

  function clearError(field) {
    field.style.borderColor = '';
    field.style.boxShadow = '';
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

/* =========================================================
   TOAST NOTIFICATION
   ========================================================= */
function showToast(message, type) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation';
  const toast = document.createElement('div');
  toast.className = 'toast-message';
  toast.innerHTML = '<i class="fa-solid ' + icon + '"></i> ' + message;

  container.appendChild(toast);

  setTimeout(function () {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    setTimeout(function () { toast.remove(); }, 400);
  }, 4000);
}

/* =========================================================
   BACK TO TOP
   ========================================================= */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* =========================================================
   CURRENT YEAR IN FOOTER
   ========================================================= */
function initCurrentYear() {
  const yearEls = document.querySelectorAll('#currentYear');
  const year = new Date().getFullYear();
  yearEls.forEach(function (el) { el.textContent = year; });
}
