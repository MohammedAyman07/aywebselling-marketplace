/* ============================================================
   Artist Portfolio Template - Main JavaScript
   ============================================================ */

'use strict';

/* ─── Preloader ─────────────────────────────────────────── */
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => preloader.classList.add('loaded'), 400);
  }
});

/* ─── Sticky Navbar ─────────────────────────────────────── */
const mainNav = document.getElementById('mainNav');
if (mainNav) {
  const onScroll = () => {
    if (window.scrollY > 60) {
      mainNav.classList.add('scrolled');
    } else {
      mainNav.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ─── Active Nav Link ───────────────────────────────────── */
function setActiveNavLink() {
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}
setActiveNavLink();

/* ─── Smooth Scroll ─────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Close mobile menu
      const navCollapse = document.getElementById('mainNavCollapse');
      if (navCollapse && navCollapse.classList.contains('show')) {
        navCollapse.classList.remove('show');
      }
    }
  });
});

/* ─── Parallax Hero ─────────────────────────────────────── */
const heroBg = document.querySelector('.hero-bg');
if (heroBg) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    heroBg.style.transform = `translateY(${y * 0.35}px)`;
  }, { passive: true });
}

/* ─── Scroll Reveal ─────────────────────────────────────── */
function revealOnScroll() {
  const items = document.querySelectorAll('[data-reveal]');
  const threshold = window.innerHeight * 0.88;
  items.forEach(el => {
    const delay = parseInt(el.dataset.delay || '0');
    const rect = el.getBoundingClientRect();
    if (rect.top < threshold) {
      setTimeout(() => el.classList.add('revealed'), delay);
    }
  });
}
window.addEventListener('scroll', revealOnScroll, { passive: true });
window.addEventListener('load', revealOnScroll);

/* ─── Animated Counters ─────────────────────────────────── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const start = performance.now();
  const step = (timestamp) => {
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.round(eased * target) + (el.dataset.suffix || '');
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.counted) {
      entry.target.dataset.counted = 'true';
      animateCounter(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

/* ─── Skill Bars ────────────────────────────────────────── */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target.querySelector('.skill-fill');
      if (fill) {
        fill.style.width = fill.dataset.width;
      }
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-item').forEach(item => skillObserver.observe(item));

/* ─── Gallery Filter ─────────────────────────────────────── */
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
  btn.addEventListener('click', function () {
    filterBtns.forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    const filter = this.dataset.filter;
    document.querySelectorAll('.gallery-item').forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.style.display = '';
        setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'scale(1)'; }, 10);
      } else {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.94)';
        setTimeout(() => { item.style.display = 'none'; }, 300);
      }
    });
  });
});

/* ─── Lightbox ───────────────────────────────────────────── */
const lightboxOverlay = document.getElementById('lightboxOverlay');
const lightboxImg     = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose   = document.getElementById('lightboxClose');
const lightboxPrev    = document.getElementById('lightboxPrev');
const lightboxNext    = document.getElementById('lightboxNext');
let lightboxItems     = [];
let currentLbIndex   = 0;

function openLightbox(items, index) {
  lightboxItems   = items;
  currentLbIndex  = index;
  showLightboxSlide(currentLbIndex);
  lightboxOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightboxOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

function showLightboxSlide(index) {
  const item = lightboxItems[index];
  lightboxImg.src = item.src;
  lightboxImg.alt = item.caption || '';
  if (lightboxCaption) lightboxCaption.textContent = item.caption || '';
}

if (lightboxOverlay) {
  lightboxClose.addEventListener('click', closeLightbox);
  lightboxOverlay.addEventListener('click', e => {
    if (e.target === lightboxOverlay) closeLightbox();
  });
  lightboxPrev.addEventListener('click', () => {
    currentLbIndex = (currentLbIndex - 1 + lightboxItems.length) % lightboxItems.length;
    showLightboxSlide(currentLbIndex);
  });
  lightboxNext.addEventListener('click', () => {
    currentLbIndex = (currentLbIndex + 1) % lightboxItems.length;
    showLightboxSlide(currentLbIndex);
  });
  document.addEventListener('keydown', e => {
    if (!lightboxOverlay.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lightboxPrev.click();
    if (e.key === 'ArrowRight') lightboxNext.click();
  });
}

// Bind gallery items
function initGallery() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lbData = Array.from(galleryItems).map(item => ({
    src:     item.dataset.src || item.querySelector('img')?.src,
    caption: item.dataset.caption || item.querySelector('h5')?.textContent || '',
  }));
  galleryItems.forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(lbData, i));
  });
}
initGallery();

/* ─── Back to Top ────────────────────────────────────────── */
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }, { passive: true });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ─── Contact Form ───────────────────────────────────────── */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = this.querySelector('[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-check me-2"></i>Message Sent!';
      btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
      contactForm.reset();
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    }, 1800);
  });
}

/* ─── Typed Text Effect (Hero) ───────────────────────────── */
function initTyped() {
  const el = document.getElementById('typedText');
  if (!el) return;
  const words = ['Digital Artist', 'Illustrator', 'Concept Artist', 'Visual Storyteller'];
  let wi = 0, ci = 0, deleting = false;
  const speed = () => deleting ? 60 : 120;
  function type() {
    const word = words[wi];
    el.textContent = deleting ? word.slice(0, --ci) : word.slice(0, ++ci);
    if (!deleting && ci === word.length) {
      setTimeout(() => { deleting = true; type(); }, 1800);
      return;
    }
    if (deleting && ci === 0) {
      deleting = false;
      wi = (wi + 1) % words.length;
    }
    setTimeout(type, speed());
  }
  type();
}
initTyped();

/* ─── Cursor Glow (desktop) ──────────────────────────────── */
if (window.innerWidth > 1024) {
  const cursor = document.createElement('div');
  cursor.id = 'cursorGlow';
  cursor.style.cssText = `
    position:fixed; width:320px; height:320px; border-radius:50%;
    background:radial-gradient(circle, rgba(124,58,237,0.06), transparent 70%);
    pointer-events:none; z-index:0; top:0; left:0;
    transform:translate(-50%,-50%); transition:transform 0.05s;
  `;
  document.body.appendChild(cursor);
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY  + 'px';
  });
}
