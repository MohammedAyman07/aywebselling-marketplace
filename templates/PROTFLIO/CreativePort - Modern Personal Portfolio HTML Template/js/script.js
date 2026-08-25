/* ============================================================
   PORTFOLIO WEBSITE TEMPLATE - script.js
   Developed by aywebselling | aywebsellings@gmail.com
   ============================================================ */

(function () {
  'use strict';

  /* ─── Navbar Scroll Effect ─────────────────────────────────── */
  const navbar = document.getElementById('mainNavbar');

  function handleNavbarScroll() {
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll(); // Run on load

  /* ─── Active Nav Link ────────────────────────────────────────── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#mainNavbar .nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ─── Back to Top Button ─────────────────────────────────────── */
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (!backToTopBtn) return;
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ─── Fade-Up on Scroll (IntersectionObserver) ───────────────── */
  const fadeEls = document.querySelectorAll('.fade-up');

  if (fadeEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    fadeEls.forEach(el => observer.observe(el));
  }

  /* ─── Skill Bar Animation ────────────────────────────────────── */
  const skillBars = document.querySelectorAll('.skill-bar-fill');

  if (skillBars.length) {
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const target = bar.getAttribute('data-width') || '0';
          bar.style.width = target + '%';
          skillObserver.unobserve(bar);
        }
      });
    }, { threshold: 0.4 });

    skillBars.forEach(bar => skillObserver.observe(bar));
  }

  /* ─── Portfolio Filter ───────────────────────────────────────── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const cat = item.getAttribute('data-category') || '';
        if (filter === 'all' || cat === filter) {
          item.style.display = 'block';
          item.style.animation = 'fadeInItem 0.4s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  /* ─── Counter Animation ─────────────────────────────────────── */
  const counters = document.querySelectorAll('[data-count]');

  if (counters.length) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count'), 10);
          const duration = 1500;
          const start = performance.now();

          function tick(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            el.textContent = Math.floor(ease * target) + (el.getAttribute('data-suffix') || '');
            if (progress < 1) requestAnimationFrame(tick);
          }

          requestAnimationFrame(tick);
          countObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => countObserver.observe(c));
  }

  /* ─── Contact Form Handler ───────────────────────────────────── */
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const btn = this.querySelector('[type="submit"]');
      const originalText = btn.innerHTML;

      // Loading state
      btn.disabled = true;
      btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';

      // Simulate async submission
      setTimeout(() => {
        btn.innerHTML = '<i class="bi bi-check-lg me-2"></i>Message Sent!';
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-success');

        setTimeout(() => {
          btn.disabled = false;
          btn.innerHTML = originalText;
          btn.classList.remove('btn-success');
          btn.classList.add('btn-primary');
          contactForm.reset();
        }, 3000);
      }, 1800);
    });
  }

  /* ─── Tooltip Init (Bootstrap) ───────────────────────────────── */
  const tooltipEls = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  if (tooltipEls.length && typeof bootstrap !== 'undefined') {
    tooltipEls.forEach(el => new bootstrap.Tooltip(el));
  }

  /* ─── Smooth Hover on Cards (tilt effect – optional extra) ───── */
  document.querySelectorAll('.portfolio-card, .service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
      card.style.transform = `translateY(-8px) rotateX(${y}deg) rotateY(${x}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ─── Preloader ──────────────────────────────────────────────── */
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 400);
    });
  }

})();

/* ─── Keyframe for portfolio filter ─────────────────────────── */
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInItem {
    from { opacity: 0; transform: scale(0.95); }
    to   { opacity: 1; transform: scale(1); }
  }
`;
document.head.appendChild(style);
