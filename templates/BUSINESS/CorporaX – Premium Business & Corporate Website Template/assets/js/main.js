/* ============================================================
   CorporaX - Premium Business Template
   Main JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ── Theme (Dark / Light) ── */
  const themeToggleBtns = document.querySelectorAll('.theme-toggle');
  const html = document.documentElement;

  const savedTheme = localStorage.getItem('corporax-theme') || 'light';
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcons(savedTheme);

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const next = current === 'light' ? 'dark' : 'light';
      html.setAttribute('data-theme', next);
      localStorage.setItem('corporax-theme', next);
      updateThemeIcons(next);
    });
  });

  function updateThemeIcons(theme) {
    themeToggleBtns.forEach(btn => {
      btn.innerHTML = theme === 'dark'
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
    });
  }

  /* ── Navbar: Scroll + Hamburger ── */
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar && navbar.classList.add('scrolled');
    } else {
      navbar && navbar.classList.remove('scrolled');
    }
    // back-to-top
    const btt = document.querySelector('.back-to-top');
    if (btt) {
      btt.classList.toggle('visible', window.scrollY > 400);
    }
  });

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('open');
    });
    // Close on nav link click
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
      });
    });
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
      }
    });
  }

  /* ── Active Nav Link ── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── Back to Top ── */
  const btt = document.querySelector('.back-to-top');
  if (btt) {
    btt.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── Scroll Reveal ── */
  function initScrollReveal() {
    const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    if (!revealEls.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => observer.observe(el));
  }
  initScrollReveal();

  /* ── Animated Counters ── */
  function animateCounter(el, target, suffix = '', duration = 2000) {
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }
      el.textContent = start.toLocaleString() + suffix;
    }, 16);
  }

  function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-counter'));
          const suffix = el.getAttribute('data-suffix') || '';
          animateCounter(el, target, suffix);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
  }
  initCounters();

  /* ── Testimonials Slider ── */
  function initSlider() {
    const track = document.querySelector('.testimonial-track');
    if (!track) return;

    const slides = track.querySelectorAll('.testimonial-card');
    const dotsContainer = document.querySelector('.slider-dots');
    let current = 0;
    let autoSlide;

    // build dots
    if (dotsContainer) {
      slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
      });
    }

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${current * 100}%)`;
      document.querySelectorAll('.slider-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === current);
      });
      resetAutoSlide();
    }

    function resetAutoSlide() {
      clearInterval(autoSlide);
      autoSlide = setInterval(() => goTo(current + 1), 5000);
    }

    document.querySelector('.slider-prev')?.addEventListener('click', () => goTo(current - 1));
    document.querySelector('.slider-next')?.addEventListener('click', () => goTo(current + 1));

    // Touch / swipe
    let startX = 0;
    track.addEventListener('touchstart', e => startX = e.touches[0].clientX);
    track.addEventListener('touchend', e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
    });

    resetAutoSlide();
  }
  initSlider();

  /* ── FAQ Accordion ── */
  function initFAQ() {
    const items = document.querySelectorAll('.faq-item');
    items.forEach(item => {
      item.querySelector('.faq-question')?.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        items.forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    });
  }
  initFAQ();

  /* ── Portfolio Filter ── */
  function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.portfolio-card');
    if (!filterBtns.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        cards.forEach(card => {
          const cat = card.getAttribute('data-cat');
          if (filter === 'all' || cat === filter) {
            card.style.display = '';
            setTimeout(() => { card.style.opacity = '1'; card.style.transform = ''; }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            setTimeout(() => { card.style.display = 'none'; }, 300);
          }
        });
      });
    });
  }
  initPortfolioFilter();

  /* ── Pricing Toggle ── */
  function initPricingToggle() {
    const toggle = document.querySelector('.toggle-switch');
    if (!toggle) return;

    const monthlyPrices = document.querySelectorAll('[data-monthly]');
    const yearlyPrices = document.querySelectorAll('[data-yearly]');
    let isYearly = false;

    toggle.addEventListener('click', () => {
      isYearly = !isYearly;
      toggle.classList.toggle('yearly', isYearly);
      document.querySelectorAll('.pricing-toggle label').forEach((lbl, i) => {
        lbl.style.opacity = (i === 0 && isYearly) || (i === 1 && !isYearly) ? '0.5' : '1';
      });
      monthlyPrices.forEach(el => {
        el.textContent = isYearly ? el.getAttribute('data-yearly') : el.getAttribute('data-monthly');
      });
    });
  }
  initPricingToggle();

  /* ── Newsletter form ── */
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.querySelector('input');
      if (input && input.value.includes('@')) {
        const btn = form.querySelector('button');
        if (btn) {
          const orig = btn.innerHTML;
          btn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
          btn.disabled = true;
          input.value = '';
          setTimeout(() => { btn.innerHTML = orig; btn.disabled = false; }, 3000);
        }
      }
    });
  });

  /* ── Contact Form ── */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      if (btn) {
        const orig = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        btn.disabled = true;
        setTimeout(() => {
          btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
          setTimeout(() => { btn.innerHTML = orig; btn.disabled = false; contactForm.reset(); }, 2000);
        }, 1500);
      }
    });
  }

  /* ── Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── Card tilt effect ── */
  function initTilt() {
    const cards = document.querySelectorAll('.card, .pricing-card, .team-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotX = (-y / rect.height) * 6;
        const rotY = (x / rect.width) * 6;
        card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }
  initTilt();

  /* ── Page load entrance ── */
  document.body.style.opacity = '0';
  window.addEventListener('load', () => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  });

})();
