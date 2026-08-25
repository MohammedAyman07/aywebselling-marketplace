/*!
 * aywebselling - Premium Portfolio Template
 * Main JavaScript File
 * Version: 1.0
 */

'use strict';

// ===== PAGE LOADER =====
window.addEventListener('load', () => {
  const loader = document.querySelector('.page-loader');
  if (loader) {
    setTimeout(() => loader.classList.add('hide'), 500);
  }
});

// ===== THEME TOGGLE (Dark / Light Mode) =====
const themeToggle = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('theme') || 'light';

document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(next);
  });
}

function updateThemeIcon(theme) {
  if (!themeToggle) return;
  themeToggle.innerHTML = theme === 'dark'
    ? '<svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 7a5 5 0 100 10A5 5 0 0012 7zM2 13h2a1 1 0 000-2H2a1 1 0 000 2zm18 0h2a1 1 0 000-2h-2a1 1 0 000 2zM11 2v2a1 1 0 002 0V2a1 1 0 00-2 0zm0 18v2a1 1 0 002 0v-2a1 1 0 00-2 0zM5.99 4.58a1 1 0 00-1.41 1.41l1.06 1.06a1 1 0 001.41-1.41L5.99 4.58zm12.37 12.37a1 1 0 00-1.41 1.41l1.06 1.06a1 1 0 001.41-1.41l-1.06-1.06zm1.06-10.96a1 1 0 00-1.41-1.41l-1.06 1.06a1 1 0 001.41 1.41l1.06-1.06zM7.05 18.36a1 1 0 00-1.41-1.41l-1.06 1.06a1 1 0 001.41 1.41l1.06-1.06z"/></svg>'
    : '<svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M21.64 13a1 1 0 00-1.05-.14 8.05 8.05 0 01-3.37.73 8.15 8.15 0 01-8.14-8.1 8.59 8.59 0 01.25-2A1 1 0 008 2.36a10.14 10.14 0 1014 11.69 1 1 0 00-.36-1.05z"/></svg>';
}

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }
  // Back to top
  backToTopBtn?.classList.toggle('show', window.scrollY > 400);
});

// ===== HAMBURGER MENU =====
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');
const mobileLinks = document.querySelectorAll('.mobile-nav .nav-link');

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileNav?.classList.toggle('open');
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger?.classList.remove('active');
    mobileNav?.classList.remove('open');
  });
});

// Close mobile nav on outside click
document.addEventListener('click', (e) => {
  if (!navbar?.contains(e.target) && !mobileNav?.contains(e.target)) {
    hamburger?.classList.remove('active');
    mobileNav?.classList.remove('open');
  }
});

// ===== ACTIVE NAV LINK =====
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link, .mobile-nav .nav-link').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ===== BACK TO TOP =====
const backToTopBtn = document.querySelector('.back-to-top');
backToTopBtn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== TYPING ANIMATION =====
function initTypingAnimation() {
  const el = document.querySelector('.typing-text');
  if (!el) return;

  const words = el.dataset.words ? JSON.parse(el.dataset.words) : ['Developer', 'Designer', 'Creator'];
  let wordIndex = 0, charIndex = 0, isDeleting = false;

  function type() {
    const currentWord = words[wordIndex];
    const displayed = isDeleting
      ? currentWord.slice(0, charIndex--)
      : currentWord.slice(0, charIndex++);

    el.textContent = displayed;

    let speed = isDeleting ? 60 : 110;

    if (!isDeleting && charIndex === currentWord.length + 1) {
      speed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      speed = 400;
    }
    setTimeout(type, speed);
  }
  type();
}
initTypingAnimation();

// ===== SCROLL ANIMATIONS (Custom AOS-like) =====
function initScrollAnimations() {
  const elements = document.querySelectorAll('[data-aos]');
  if (!elements.length) return;

  const delays = {
    '100': '0.1s', '200': '0.2s', '300': '0.3s',
    '400': '0.4s', '500': '0.5s', '600': '0.6s'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.aosDelay;
        if (delay && delays[delay]) el.style.transitionDelay = delays[delay];
        el.classList.add('aos-animate');
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.15 });

  elements.forEach(el => observer.observe(el));
}
initScrollAnimations();

// ===== STATS COUNTER ANIMATION =====
function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      const duration = 2000;
      const start = performance.now();

      function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}
initCounters();

// ===== SKILL BARS ANIMATION =====
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill[data-width]');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const bar = entry.target;
      setTimeout(() => { bar.style.width = bar.dataset.width; }, 200);
      observer.unobserve(bar);
    });
  }, { threshold: 0.3 });

  bars.forEach(b => observer.observe(b));
}
initSkillBars();

// ===== PORTFOLIO FILTER =====
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  if (!filterBtns.length) return;

  // Show all items initially
  portfolioItems.forEach(item => item.classList.add('show'));

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      portfolioItems.forEach(item => {
        item.classList.remove('show');
        setTimeout(() => {
          if (filter === 'all' || item.dataset.category === filter) {
            item.classList.add('show');
          }
        }, 50);
      });
    });
  });
}
initPortfolioFilter();

// ===== PROJECT MODAL =====
function initModals() {
  const overlay = document.querySelector('.modal-overlay');
  if (!overlay) return;

  const modal = overlay.querySelector('.modal');
  const closeBtn = overlay.querySelector('.modal-close');

  document.querySelectorAll('[data-modal-open]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const id = trigger.dataset.modalOpen;
      const data = projectsData[id];
      if (!data) return;
      populateModal(data);
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function populateModal(data) {
    overlay.querySelector('.modal-title').textContent = data.title || '';
    overlay.querySelector('.modal-img').innerHTML = data.emoji || '🖥️';
    overlay.querySelector('.modal-desc').textContent = data.desc || '';
    const meta = overlay.querySelector('.modal-meta');
    if (meta && data.meta) {
      meta.innerHTML = data.meta.map(m => `
        <div class="modal-meta-item">
          <span class="modal-meta-label">${m.label}</span>
          <span class="modal-meta-value">${m.value}</span>
        </div>`).join('');
    }
    const tags = overlay.querySelector('.modal-tags');
    if (tags && data.tags) {
      tags.innerHTML = data.tags.map(t => `<span class="badge badge-primary">${t}</span>`).join('');
    }
    const liveBtn = overlay.querySelector('.modal-live');
    const codeBtn = overlay.querySelector('.modal-code');
    if (liveBtn) liveBtn.href = data.live || '#';
    if (codeBtn) codeBtn.href = data.code || '#';
  }

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  closeBtn?.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
}

// Projects data for modal
const projectsData = {
  p1: { title: 'E-Commerce Platform', emoji: '🛒', desc: 'A full-featured e-commerce platform built with modern technologies. Features include product management, cart, checkout, payment integration, and admin dashboard.', meta: [{label:'Client',value:'RetailCo Inc.'},{label:'Duration',value:'3 Months'},{label:'Year',value:'2024'}], tags:['React','Node.js','MongoDB','Stripe'], live:'#', code:'#' },
  p2: { title: 'AI Dashboard App', emoji: '🤖', desc: 'An analytics dashboard powered by AI insights. Visualizes complex data with beautiful charts and provides AI-driven recommendations.', meta: [{label:'Client',value:'DataViz Corp'},{label:'Duration',value:'2 Months'},{label:'Year',value:'2024'}], tags:['Vue.js','Python','TensorFlow','D3.js'], live:'#', code:'#' },
  p3: { title: 'Portfolio Designer', emoji: '🎨', desc: 'A drag-and-drop portfolio builder for creatives. Features real-time preview, custom themes, and one-click publishing.', meta: [{label:'Type',value:'SaaS App'},{label:'Duration',value:'4 Months'},{label:'Year',value:'2023'}], tags:['Next.js','TypeScript','Tailwind'], live:'#', code:'#' },
  p4: { title: 'Mobile Banking App', emoji: '💳', desc: 'A modern mobile banking interface with biometric auth, transactions history, budgeting tools and investment tracking.', meta: [{label:'Client',value:'FinBank'},{label:'Duration',value:'5 Months'},{label:'Year',value:'2024'}], tags:['React Native','Node.js','PostgreSQL'], live:'#', code:'#' },
  p5: { title: 'SaaS Landing Page', emoji: '🚀', desc: 'A high-converting SaaS landing page with animated sections, pricing tables, testimonials and CTA optimization.', meta: [{label:'Type',value:'Marketing'},{label:'Duration',value:'2 Weeks'},{label:'Year',value:'2023'}], tags:['HTML','CSS','GSAP','JS'], live:'#', code:'#' },
  p6: { title: 'Brand Identity Package', emoji: '✨', desc: 'Complete brand identity design including logo system, color palette, typography, stationery and brand guidelines document.', meta: [{label:'Client',value:'StartupX'},{label:'Duration',value:'3 Weeks'},{label:'Year',value:'2024'}], tags:['Figma','Illustrator','Branding'], live:'#', code:'#' },
};
initModals();

// ===== CONTACT FORM =====
const contactForm = document.querySelector('#contactForm');
contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('[type="submit"]');
  const originalText = btn.innerHTML;
  btn.innerHTML = '⏳ Sending...';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = '✅ Message Sent!';
    btn.style.background = 'linear-gradient(135deg, #00D68F, #00b377)';
    contactForm.reset();
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
      btn.style.background = '';
    }, 3000);
  }, 1500);
});

// ===== NEWSLETTER FORM =====
document.querySelectorAll('.newsletter-form').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    btn.textContent = '✅ Subscribed!';
    setTimeout(() => { btn.textContent = 'Subscribe'; form.reset(); }, 2500);
  });
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== PARALLAX HERO ORBS =====
window.addEventListener('mousemove', (e) => {
  const orbs = document.querySelectorAll('.hero-orb');
  const { clientX, clientY } = e;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const dx = (clientX - centerX) / centerX;
  const dy = (clientY - centerY) / centerY;
  orbs.forEach((orb, i) => {
    const factor = (i + 1) * 15;
    orb.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
  });
});
