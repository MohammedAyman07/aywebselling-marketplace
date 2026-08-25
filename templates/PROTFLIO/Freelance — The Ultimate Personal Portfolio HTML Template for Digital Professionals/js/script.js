/* ============================================================
   Freelancer Portfolio Template — script.js
   Author: Ayman InfoTechs | aymaninfotechs@gmail.com
   ============================================================ */

'use strict';

/* ── Preloader ── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const pre = document.getElementById('preloader');
    if (pre) { pre.classList.add('hidden'); }
  }, 1400);
});

/* ── Sticky Navbar ── */
const navbar = document.querySelector('.navbar-custom');
const handleNavbarScroll = () => {
  if (!navbar) return;
  navbar.classList.toggle('scrolled', window.scrollY > 60);
};
window.addEventListener('scroll', handleNavbarScroll, { passive: true });
handleNavbarScroll();

/* ── Active Nav Link (single-page) ── */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.navbar-custom .nav-link');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
}, { passive: true });

/* ── Back to Top ── */
const bttBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (!bttBtn) return;
  bttBtn.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });
if (bttBtn) bttBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ── Scroll Animations ── */
const animObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => entry.target.classList.add('animated'), parseInt(delay));
      animObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('[data-anim]').forEach(el => animObserver.observe(el));

/* ── Skill Bar Animations ── */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        setTimeout(() => { bar.style.width = bar.dataset.width; }, 200);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-card').forEach(card => skillObserver.observe(card));

/* ── Counter Animation ── */
function animateCounter(el) {
  const target  = parseInt(el.dataset.target || el.textContent, 10);
  const suffix  = el.dataset.suffix || '';
  const duration = 1800;
  const step    = Math.ceil(target / (duration / 16));
  let current   = 0;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current + suffix;
    if (current >= target) clearInterval(timer);
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-count]').forEach(animateCounter);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('.hero-stats, .cta-strip').forEach(el => counterObserver.observe(el));

/* ── Portfolio Filter ── */
const filterBtns  = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    portfolioItems.forEach(item => {
      const show = filter === 'all' || item.dataset.category === filter;
      item.style.opacity = '0';
      item.style.transform = 'scale(0.9)';
      setTimeout(() => {
        item.style.display = show ? '' : 'none';
        if (show) {
          requestAnimationFrame(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          });
        }
      }, 200);
    });
  });
});

/* ── Contact Form ── */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn  = contactForm.querySelector('.btn-submit');
    const orig = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<i class="bi bi-arrow-repeat spin-icon"></i> Sending…';

    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = orig;
      showToast('Message Sent!', 'Thank you! I\'ll get back to you shortly.');
      contactForm.reset();
    }, 1600);
  });
}

/* ── Toast Notification ── */
function showToast(title, body) {
  let toast = document.querySelector('.toast-notify');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notify';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<div class="toast-title">✅ ${title}</div><div class="toast-body">${body}</div>`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

/* ── Smooth scroll for anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = navbar ? navbar.offsetHeight + 16 : 80;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
      // Close mobile nav
      const toggler = document.querySelector('.navbar-toggler');
      const collapse = document.querySelector('.navbar-collapse');
      if (collapse && collapse.classList.contains('show')) toggler && toggler.click();
    }
  });
});

/* ── Navbar collapse on outside click (mobile) ── */
document.addEventListener('click', (e) => {
  const nav = document.querySelector('.navbar-collapse.show');
  if (!nav) return;
  if (!nav.contains(e.target) && !document.querySelector('.navbar-toggler').contains(e.target)) {
    document.querySelector('.navbar-toggler').click();
  }
});

/* ── Spin icon helper ── */
const style = document.createElement('style');
style.textContent = `.spin-icon { display:inline-block; animation:spin .8s linear infinite; } @keyframes spin{to{transform:rotate(360deg);}}`;
document.head.appendChild(style);
