/* ============================================================
   aywebselling Business Template - script.js
   Author: aywebselling | aywebsellings@gmail.com
   ============================================================ */

(function () {
  'use strict';

  /* -----------------------------------------------
     1. Preloader
  ----------------------------------------------- */
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.classList.add('hidden');
      setTimeout(() => preloader.remove(), 600);
    });
  }

  /* -----------------------------------------------
     2. Sticky Navbar on Scroll
  ----------------------------------------------- */
  const navbar = document.querySelector('.navbar-custom');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  /* -----------------------------------------------
     3. Active Nav Link
  ----------------------------------------------- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  /* -----------------------------------------------
     4. Scroll Reveal
  ----------------------------------------------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(el => observer.observe(el));
  }

  /* -----------------------------------------------
     5. Counter Animation
  ----------------------------------------------- */
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
      el.textContent = Math.floor(current) + suffix;
    }, 16);
  }

  const counters = document.querySelectorAll('[data-target]');
  if (counters.length) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach(c => counterObserver.observe(c));
  }

  /* -----------------------------------------------
     6. Portfolio Filter
  ----------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      portfolioItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = '';
          setTimeout(() => item.style.opacity = '1', 10);
        } else {
          item.style.opacity = '0';
          setTimeout(() => item.style.display = 'none', 300);
        }
      });
    });
  });

  /* -----------------------------------------------
     7. Back to Top Button
  ----------------------------------------------- */
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* -----------------------------------------------
     8. Smooth scroll for anchor links
  ----------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Close mobile menu if open
        const navCollapse = document.querySelector('.navbar-collapse');
        if (navCollapse && navCollapse.classList.contains('show')) {
          navCollapse.classList.remove('show');
        }
      }
    });
  });

  /* -----------------------------------------------
     9. Contact Form Submission
  ----------------------------------------------- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = this.querySelector('[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Message Sent!';
        btn.classList.remove('btn-primary-custom');
        btn.classList.add('btn-success');
        this.reset();
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.disabled = false;
          btn.classList.add('btn-primary-custom');
          btn.classList.remove('btn-success');
        }, 4000);
      }, 2000);
    });
  }

  /* -----------------------------------------------
     10. Newsletter Form
  ----------------------------------------------- */
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = this.querySelector('button');
      btn.innerHTML = '✓ Subscribed!';
      btn.style.background = '#22c55e';
      btn.style.color = '#fff';
      this.reset();
      setTimeout(() => {
        btn.innerHTML = 'Subscribe';
        btn.style.background = '';
        btn.style.color = '';
      }, 4000);
    });
  }

  /* -----------------------------------------------
     11. Testimonial Swiper (Auto-scroll on small screens)
  ----------------------------------------------- */
  // Bootstrap carousel if present
  const testimonialCarousel = document.getElementById('testimonialCarousel');
  if (testimonialCarousel && typeof bootstrap !== 'undefined') {
    new bootstrap.Carousel(testimonialCarousel, { interval: 5000, ride: 'carousel' });
  }

  /* -----------------------------------------------
     12. Tooltip Init
  ----------------------------------------------- */
  if (typeof bootstrap !== 'undefined') {
    const tooltipEls = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipEls.forEach(el => new bootstrap.Tooltip(el));
  }

})();
