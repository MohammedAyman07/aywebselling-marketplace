/**
 * LaunchPad – Premium Landing Page Template
 * Developed by aywebselling
 * Email: aywebsellings@gmail.com
 */

(function () {
  'use strict';

  /* =============================================
     PRELOADER
  ============================================= */
  function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;
    window.addEventListener('load', () => {
      setTimeout(() => preloader.classList.add('hidden'), 400);
    });
  }

  /* =============================================
     NAVBAR – scroll effect
  ============================================= */
  function initNavbar() {
    const navbar = document.getElementById('mainNavbar');
    if (!navbar) return;

    const updateNavbar = () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', updateNavbar, { passive: true });
    updateNavbar();

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 100) current = sec.getAttribute('id');
      });
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) link.classList.add('active');
      });
    }, { passive: true });

    // Close mobile menu on link click
    const navLinks2 = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse) {
      navLinks2.forEach(link => {
        link.addEventListener('click', () => {
          const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
          if (bsCollapse) bsCollapse.hide();
        });
      });
    }
  }

  /* =============================================
     SMOOTH SCROLL
  ============================================= */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 70,
          behavior: 'smooth'
        });
      });
    });
  }

  /* =============================================
     SCROLL-REVEAL (AOS-like, no library needed)
  ============================================= */
  function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));
  }

  /* =============================================
     SCROLL TO TOP BUTTON
  ============================================= */
  function initScrollTop() {
    const btn = document.getElementById('scrollTopBtn');
    if (!btn) return;
    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* =============================================
     PRICING TOGGLE
  ============================================= */
  function initPricingToggle() {
    const toggle = document.getElementById('billingToggle');
    const monthlyLabel = document.getElementById('monthlyLabel');
    const yearlyLabel = document.getElementById('yearlyLabel');
    const amounts = document.querySelectorAll('.pc-amount');

    if (!toggle) return;

    let isYearly = false;

    function updatePrices() {
      amounts.forEach(el => {
        const val = isYearly ? el.dataset.yearly : el.dataset.monthly;
        // Animate the number change
        animateNumber(el, parseInt(el.textContent), parseInt(val));
      });
      monthlyLabel.classList.toggle('active', !isYearly);
      yearlyLabel.classList.toggle('active', isYearly);
      toggle.setAttribute('aria-checked', isYearly);
    }

    toggle.addEventListener('click', () => {
      isYearly = !isYearly;
      toggle.classList.toggle('on', isYearly);
      updatePrices();
    });
  }

  function animateNumber(el, from, to) {
    const duration = 400;
    const start = performance.now();
    const step = (timestamp) => {
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
      el.textContent = Math.round(from + (to - from) * eased);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* =============================================
     SHOWCASE TABS
  ============================================= */
  function initShowcaseTabs() {
    const tabs = document.querySelectorAll('.stab');
    if (!tabs.length) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.target;

        // Update tabs
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Update panels
        document.querySelectorAll('.showcase-panel').forEach(p => p.classList.remove('active'));
        const panel = document.getElementById(target);
        if (panel) panel.classList.add('active');
      });
    });
  }

  /* =============================================
     CONTACT FORM
  ============================================= */
  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.querySelectorAll('[required]').forEach(field => {
          if (!field.value.trim()) {
            field.style.borderColor = '#ef4444';
            field.addEventListener('input', () => { field.style.borderColor = ''; }, { once: true });
          }
        });
        return;
      }

      // Simulate form send
      const btn = form.querySelector('.btn-submit');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i> Sending...';
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        form.reset();
        const msg = document.getElementById('formSuccess');
        if (msg) {
          msg.classList.remove('d-none');
          setTimeout(() => msg.classList.add('d-none'), 5000);
        }
      }, 1800);
    });

    // Real-time validation
    form.querySelectorAll('[required]').forEach(field => {
      field.addEventListener('blur', () => {
        field.style.borderColor = field.value.trim() ? '' : '#ef4444';
      });
    });
  }

  /* =============================================
     COUNTER ANIMATION (stats)
  ============================================= */
  function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    if (!counters.length) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          entry.target.dataset.animated = 'true';
          const text = entry.target.textContent.trim();
          const suffix = text.replace(/[\d.]/g, '');
          const num = parseFloat(text);
          if (isNaN(num)) return;

          let start = 0;
          const step = num / 60;
          const timer = setInterval(() => {
            start += step;
            if (start >= num) {
              entry.target.textContent = num + suffix;
              clearInterval(timer);
            } else {
              entry.target.textContent = (suffix === '★' 
                ? start.toFixed(1) 
                : Math.floor(start).toLocaleString()) + suffix;
            }
          }, 16);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
  }

  /* =============================================
     CARD HOVER TILT
  ============================================= */
  function initCardTilt() {
    document.querySelectorAll('.feature-card, .pricing-card, .testimonial-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
        card.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) translateY(-6px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* =============================================
     BUTTON RIPPLE EFFECT
  ============================================= */
  function initRipple() {
    document.querySelectorAll('.btn-primary-custom, .btn-outline-custom').forEach(btn => {
      btn.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.cssText = `
          position:absolute;width:${size}px;height:${size}px;
          left:${e.clientX - rect.left - size/2}px;
          top:${e.clientY - rect.top - size/2}px;
          background:rgba(255,255,255,0.25);border-radius:50%;
          transform:scale(0);animation:rippleAnim .6s linear;pointer-events:none;
        `;
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove());
      });
    });

    // Inject ripple keyframes
    if (!document.getElementById('rippleStyle')) {
      const style = document.createElement('style');
      style.id = 'rippleStyle';
      style.textContent = '@keyframes rippleAnim{to{transform:scale(4);opacity:0}}';
      document.head.appendChild(style);
    }
  }

  /* =============================================
     NAVBAR HOVER UNDERLINE – highlight active section
  ============================================= */
  function initNavHighlight() {
    const links = document.querySelectorAll('.navbar-nav .nav-link');
    links.forEach(link => {
      link.style.position = 'relative';
    });
  }

  /* =============================================
     FOOTER NEWSLETTER
  ============================================= */
  function initNewsletterForm() {
    const form = document.querySelector('.footer-newsletter-form');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.fn-input');
      if (!input.value.includes('@')) {
        input.style.borderColor = '#ef4444';
        return;
      }
      const btn = form.querySelector('.fn-btn');
      btn.innerHTML = '<i class="bi bi-check-lg"></i>';
      btn.style.background = '#22c55e';
      input.value = '';
      setTimeout(() => {
        btn.innerHTML = '<i class="bi bi-send-fill"></i>';
        btn.style.background = '';
      }, 3000);
    });
  }

  /* =============================================
     TYPING EFFECT on Hero Headline
  ============================================= */
  function initTypingEffect() {
    const words = ['Apps & Products', 'SaaS Businesses', 'Digital Startups', 'Your Next Big Idea'];
    const target = document.querySelector('.hero-headline .type-target');
    if (!target) return;

    let wIndex = 0, cIndex = 0, deleting = false;

    function type() {
      const word = words[wIndex];
      if (!deleting) {
        target.textContent = word.substring(0, cIndex + 1);
        cIndex++;
        if (cIndex === word.length) {
          deleting = true;
          setTimeout(type, 2000);
          return;
        }
      } else {
        target.textContent = word.substring(0, cIndex - 1);
        cIndex--;
        if (cIndex === 0) {
          deleting = false;
          wIndex = (wIndex + 1) % words.length;
        }
      }
      setTimeout(type, deleting ? 60 : 85);
    }
    type();
  }

  /* =============================================
     INIT ALL
  ============================================= */
  function init() {
    initPreloader();
    initNavbar();
    initSmoothScroll();
    initScrollReveal();
    initScrollTop();
    initPricingToggle();
    initShowcaseTabs();
    initContactForm();
    initCounters();
    initCardTilt();
    initRipple();
    initNavHighlight();
    initNewsletterForm();
    initTypingEffect();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
