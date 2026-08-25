/**
 * SaaS Website Template - script.js
 * Developed by AymanInfotech
 * Contact: aymaninfotechs@gmail.com
 */

'use strict';

/* ================================================
   STICKY NAVBAR
================================================ */
const navbar = document.querySelector('.navbar-custom');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar?.classList.add('scrolled');
  } else {
    navbar?.classList.remove('scrolled');
  }
});

/* ================================================
   SCROLL REVEAL ANIMATIONS
================================================ */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach((el) => observer.observe(el));
}

/* ================================================
   COUNTER ANIMATION
================================================ */
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  const duration = 1800;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // ease out quad
    const eased = 1 - (1 - progress) ** 3;
    const current = target * eased;

    el.textContent = prefix + (Number.isInteger(target) ? Math.floor(current) : current.toFixed(1)) + suffix;

    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

function initCounters() {
  const counters = document.querySelectorAll('[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

/* ================================================
   DASHBOARD PREVIEW TABS
================================================ */
function initDashTabs() {
  const tabs = document.querySelectorAll('.dash-tab');
  const panels = document.querySelectorAll('.dash-panel');

  if (!tabs.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      panels.forEach((p) => (p.style.display = 'none'));

      tab.classList.add('active');
      const target = document.getElementById(tab.dataset.tab);
      if (target) target.style.display = 'block';
    });
  });
}

/* ================================================
   PRICING TOGGLE (monthly / annual)
================================================ */
function initPricingToggle() {
  const toggle = document.getElementById('billingToggle');
  if (!toggle) return;

  const prices = {
    starter: { monthly: 29, annual: 19 },
    pro:     { monthly: 79, annual: 59 },
    enterprise: { monthly: 199, annual: 149 },
  };

  toggle.addEventListener('change', () => {
    const mode = toggle.checked ? 'annual' : 'monthly';
    Object.entries(prices).forEach(([plan, p]) => {
      const el = document.getElementById(`price-${plan}`);
      if (el) el.textContent = p[mode];
    });
    document.querySelectorAll('.billing-label').forEach((lbl) => {
      lbl.classList.toggle('active', lbl.dataset.billing === mode);
    });
  });
}

/* ================================================
   SMOOTH SCROLL for anchor links
================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* ================================================
   MOBILE NAV CLOSE on link click
================================================ */
function initMobileNav() {
  const links = document.querySelectorAll('.navbar-nav .nav-link-custom');
  const toggler = document.querySelector('.navbar-toggler');
  const collapse = document.getElementById('navbarMain');

  links.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 992 && collapse?.classList.contains('show')) {
        toggler?.click();
      }
    });
  });
}

/* ================================================
   CONTACT FORM SUBMISSION
================================================ */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    btn.innerHTML = '<i class="bi bi-hourglass-split"></i> Sending…';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = '<i class="bi bi-check-circle-fill"></i> Message Sent!';
      btn.style.background = 'linear-gradient(135deg,#22c55e,#16a34a)';
      form.reset();
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        btn.style.background = '';
      }, 3500);
    }, 1800);
  });
}

/* ================================================
   HERO BAR CHART ANIMATION
================================================ */
function initHeroChart() {
  const bars = document.querySelectorAll('.bar');
  const heights = [40, 65, 50, 80, 60, 90, 75, 95, 70, 85, 60, 100];
  bars.forEach((bar, i) => {
    const h = heights[i % heights.length];
    bar.style.height = `${h}%`;
  });
}

/* ================================================
   PROGRESS BAR ANIMATION
================================================ */
function initProgressBars() {
  const bars = document.querySelectorAll('.progress-bar-custom');
  if (!bars.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const width = bar.dataset.width;
          bar.style.width = width + '%';
          observer.unobserve(bar);
        }
      });
    },
    { threshold: 0.3 }
  );

  bars.forEach((bar) => {
    bar.style.width = '0';
    observer.observe(bar);
  });
}

/* ================================================
   NAVBAR ACTIVE STATE based on current page
================================================ */
function initActiveNav() {
  const links = document.querySelectorAll('.nav-link-custom');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach((link) => {
    const linkPage = link.getAttribute('href')?.split('/').pop();
    if (linkPage === currentPage) link.classList.add('active');
  });
}

/* ================================================
   INIT ALL
================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initCounters();
  initDashTabs();
  initPricingToggle();
  initSmoothScroll();
  initMobileNav();
  initContactForm();
  initHeroChart();
  initProgressBars();
  initActiveNav();
});
