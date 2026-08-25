/*!
 * MediCare – Medical Website Template
 * script.js
 * Developed by aywebselling | aywebsellings@gmail.com
 */

(function () {
  'use strict';

  /* ============================================================
     1. STICKY NAVBAR
  ============================================================ */
  const nav = document.getElementById('mainNav');
  if (nav) {
    const handleScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  /* ============================================================
     2. SMOOTH SCROLL (fallback for older browsers)
  ============================================================ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = nav ? nav.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ============================================================
     3. SCROLL REVEAL ANIMATION
  ============================================================ */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const ioOptions = { threshold: 0.12 };
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, ioOptions);
    revealEls.forEach(el => io.observe(el));
  }

  /* ============================================================
     4. COUNTER ANIMATION
  ============================================================ */
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const suffix = el.getAttribute('data-suffix') || '';
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current).toLocaleString() + suffix;
    }, 16);
  }

  const counters = document.querySelectorAll('[data-target]');
  if (counters.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));
  }

  /* ============================================================
     5. BACK TO TOP BUTTON
  ============================================================ */
  const btt = document.getElementById('backToTop');
  if (btt) {
    window.addEventListener('scroll', () => {
      btt.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    btt.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ============================================================
     6. ACTIVE NAV LINK
  ============================================================ */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ============================================================
     7. APPOINTMENT FORM SUBMISSION
  ============================================================ */
  const apptForm = document.getElementById('appointmentForm');
  if (apptForm) {
    apptForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!apptForm.checkValidity()) {
        apptForm.classList.add('was-validated');
        return;
      }
      const btn = apptForm.querySelector('[type="submit"]');
      const original = btn.innerHTML;
      btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Booking…';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check me-2"></i>Appointment Booked!';
        btn.classList.replace('btn-primary-custom', 'btn-success');
        apptForm.reset();
        apptForm.classList.remove('was-validated');
        setTimeout(() => {
          btn.innerHTML = original;
          btn.classList.replace('btn-success', 'btn-primary-custom');
          btn.disabled = false;
        }, 3500);
      }, 1800);
    });
  }

  /* ============================================================
     8. CONTACT FORM SUBMISSION
  ============================================================ */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!contactForm.checkValidity()) {
        contactForm.classList.add('was-validated');
        return;
      }
      const btn = contactForm.querySelector('[type="submit"]');
      const original = btn.innerHTML;
      btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending…';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check me-2"></i>Message Sent!';
        btn.classList.replace('btn-primary-custom', 'btn-success');
        contactForm.reset();
        contactForm.classList.remove('was-validated');
        setTimeout(() => {
          btn.innerHTML = original;
          btn.classList.replace('btn-success', 'btn-primary-custom');
          btn.disabled = false;
        }, 3500);
      }, 1800);
    });
  }

  /* ============================================================
     9. NEWSLETTER FORM
  ============================================================ */
  const nlForm = document.getElementById('newsletterForm');
  if (nlForm) {
    nlForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = nlForm.querySelector('button');
      const input = nlForm.querySelector('input');
      if (!input.value) return;
      btn.textContent = 'Subscribed ✓';
      btn.style.background = '#198754';
      btn.style.color = 'white';
      input.value = '';
      setTimeout(() => {
        btn.textContent = 'Subscribe';
        btn.style.background = '';
        btn.style.color = '';
      }, 3000);
    });
  }

  /* ============================================================
     10. TOOLTIP INIT (Bootstrap)
  ============================================================ */
  if (typeof bootstrap !== 'undefined') {
    const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltips.forEach(el => new bootstrap.Tooltip(el));
  }

})();
