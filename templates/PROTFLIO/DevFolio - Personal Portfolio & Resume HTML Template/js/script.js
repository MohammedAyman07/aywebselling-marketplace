/**
 * Developer Portfolio Template - script.js
 * Author  : Portfolio Template
 * Version : 1.0
 */

'use strict';

/* ─── Preloader ─────────────────────────────────────────── */
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('hidden');
      setTimeout(() => preloader.remove(), 500);
    }, 600);
  }
  initAnimations();
});

/* ─── Navbar scroll effect ──────────────────────────────── */
const navbar = document.querySelector('.navbar');
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Navbar sticky style
  if (navbar) {
    navbar.classList.toggle('scrolled', scrollY > 60);
  }

  // Back to top visibility
  if (backToTop) {
    backToTop.classList.toggle('visible', scrollY > 400);
  }

  // Highlight active nav link
  highlightNav();
});

// Back to top click
if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ─── Active nav link highlighting ─────────────────────── */
function highlightNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const scrollY = window.scrollY + 100;

  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');

    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

/* ─── Smooth scroll for anchor links ───────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navH = navbar ? navbar.offsetHeight : 70;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });

      // Close mobile nav
      const navCollapse = document.querySelector('.navbar-collapse');
      if (navCollapse && navCollapse.classList.contains('show')) {
        navCollapse.classList.remove('show');
      }
    }
  });
});

/* ─── Typed.js simulation ───────────────────────────────── */
function typeWriter(element, strings, speed = 90) {
  if (!element) return;
  let si = 0, ci = 0, deleting = false;

  function tick() {
    const current = strings[si];
    if (!deleting) {
      element.textContent = current.substring(0, ci + 1);
      ci++;
      if (ci === current.length) {
        deleting = true;
        setTimeout(tick, 2000);
        return;
      }
    } else {
      element.textContent = current.substring(0, ci - 1);
      ci--;
      if (ci === 0) {
        deleting = false;
        si = (si + 1) % strings.length;
      }
    }
    setTimeout(tick, deleting ? speed / 2 : speed);
  }
  tick();
}

const typedEl = document.querySelector('.typed-text');
if (typedEl) {
  typeWriter(typedEl, [
    'Full Stack Developer',
    'React.js Engineer',
    'Python Developer',
    'UI/UX Enthusiast',
    'Freelance Developer'
  ]);
}

/* ─── Scroll reveal animations ──────────────────────────── */
function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Animate progress bars when section enters view
        const bars = entry.target.querySelectorAll('.progress-bar[data-width]');
        bars.forEach(bar => {
          setTimeout(() => {
            bar.style.width = bar.dataset.width;
          }, 200);
        });
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    observer.observe(el);
  });

  // Also observe skill sections for progress bars
  document.querySelectorAll('.skill-section-animated').forEach(el => {
    observer.observe(el);
  });
}

/* ─── Skill progress bars (standalone) ─────────────────── */
function animateProgressBars() {
  const bars = document.querySelectorAll('.progress-bar[data-width]');
  bars.forEach(bar => {
    const rect = bar.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      bar.style.width = bar.dataset.width;
    }
  });
}
window.addEventListener('scroll', animateProgressBars);
setTimeout(animateProgressBars, 800);

/* ─── Project filter ────────────────────────────────────── */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
      if (show) {
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
        card.style.display = 'block';
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
          if (btn.dataset.filter !== filter) return;
          if (card.dataset.category !== filter && filter !== 'all') {
            card.style.display = 'none';
          }
        }, 350);
      }
    });
  });
});

/* ─── Contact form ──────────────────────────────────────── */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const btn    = this.querySelector('[type="submit"]');
    const orig   = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span>Sending...';

    // Simulate async send
    await new Promise(res => setTimeout(res, 1800));

    btn.innerHTML = orig;
    btn.disabled  = false;
    this.reset();
    showToast('✅ Message sent successfully!');
  });
}

/* ─── Toast ─────────────────────────────────────────────── */
function showToast(msg) {
  let toast = document.querySelector('.toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

/* ─── Particle / floating dots (canvas) ─────────────────── */
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;

  const ctx    = canvas.getContext('2d');
  let particles = [];
  let W, H;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.r  = Math.random() * 2 + 0.5;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.a  = Math.random() * 0.5 + 0.1;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.a;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = '#00b4ff';
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < 60; i++) particles.push(new Particle());

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });

    // Draw connecting lines
    particles.forEach((a, i) => {
      particles.slice(i + 1).forEach(b => {
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < 120) {
          ctx.save();
          ctx.globalAlpha = (1 - dist / 120) * 0.12;
          ctx.strokeStyle = '#00b4ff';
          ctx.lineWidth   = 0.8;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
          ctx.restore();
        }
      });
    });
    requestAnimationFrame(loop);
  }
  loop();
})();

/* ─── Skill tab switching (skills page) ─────────────────── */
document.querySelectorAll('.skill-category-tabs .nav-link').forEach(tab => {
  tab.addEventListener('click', function () {
    document.querySelectorAll('.skill-category-tabs .nav-link').forEach(t => t.classList.remove('active'));
    this.classList.add('active');
    const target = this.dataset.target;
    document.querySelectorAll('.skill-tab-pane').forEach(pane => {
      pane.style.display = pane.dataset.pane === target ? 'block' : 'none';
    });
    // Re-trigger progress bar animation
    setTimeout(animateProgressBars, 100);
  });
});

/* ─── Counter animation ─────────────────────────────────── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const dur    = 1800;
  const step   = target / (dur / 16);
  let current  = 0;
  const timer  = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current) + (el.dataset.suffix || '');
  }, 16);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('[data-target]').forEach(animateCounter);
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter-section').forEach(el => counterObserver.observe(el));
