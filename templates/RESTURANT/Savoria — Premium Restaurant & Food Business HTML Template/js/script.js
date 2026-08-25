/* ============================================
   Restaurant Website Template — script.js
   Developed by AymanInfotech
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Preloader ---------- */
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.classList.add('loaded');
      setTimeout(() => preloader.remove(), 600);
    });
  }

  /* ---------- Sticky Navbar ---------- */
  const navbar = document.querySelector('.navbar-custom');
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
  }

  /* ---------- Back to Top ---------- */
  const backBtn = document.querySelector('.back-to-top');
  if (backBtn) {
    window.addEventListener('scroll', () => {
      backBtn.classList.toggle('active', window.scrollY > 400);
    });
    backBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Smooth Scroll for nav links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = navbar ? navbar.offsetHeight : 0;
        window.scrollTo({
          top: target.offsetTop - offset,
          behavior: 'smooth'
        });
        // Close mobile menu
        const collapse = document.querySelector('.navbar-collapse');
        if (collapse && collapse.classList.contains('show')) {
          const toggler = document.querySelector('.navbar-toggler');
          if (toggler) toggler.click();
        }
      }
    });
  });

  /* ---------- Active Nav Link ---------- */
  const setActiveNav = () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (link) {
        link.classList.toggle('active', scrollY >= top && scrollY < top + height);
      }
    });
  };
  window.addEventListener('scroll', setActiveNav);

  /* ---------- Scroll Reveal Animations ---------- */
  const revealElements = document.querySelectorAll('.reveal');
  const revealOnScroll = () => {
    revealElements.forEach(el => {
      const top = el.getBoundingClientRect().top;
      const trigger = window.innerHeight * 0.88;
      if (top < trigger) {
        el.classList.add('revealed');
      }
    });
  };
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // run once initially

  /* ---------- Menu Filter ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const menuItems = document.querySelectorAll('.menu-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      menuItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = '';
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          requestAnimationFrame(() => {
            item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          });
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  /* ---------- Animated Counter (Stats) ---------- */
  const counters = document.querySelectorAll('.stat-number');
  let counted = false;
  const startCounters = () => {
    if (counted) return;
    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;
    const top = statsSection.getBoundingClientRect().top;
    if (top < window.innerHeight * 0.85) {
      counted = true;
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const suffix = counter.getAttribute('data-suffix') || '';
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        const tick = () => {
          current += step;
          if (current >= target) {
            counter.textContent = target.toLocaleString() + suffix;
          } else {
            counter.textContent = Math.floor(current).toLocaleString() + suffix;
            requestAnimationFrame(tick);
          }
        };
        tick();
      });
    }
  };
  window.addEventListener('scroll', startCounters);
  startCounters();

  /* ---------- Gallery Lightbox ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const galleryItems = document.querySelectorAll('.gallery-item');
  let currentGallery = 0;

  const galleryImages = [];
  galleryItems.forEach((item, i) => {
    const src = item.querySelector('img')?.getAttribute('src');
    if (src) galleryImages.push(src);
    item.addEventListener('click', () => openLightbox(i));
  });

  function openLightbox(index) {
    if (!lightbox || !lightboxImg) return;
    currentGallery = index;
    lightboxImg.src = galleryImages[index];
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (lightbox) {
    lightbox.querySelector('.close-lightbox')?.addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-prev')?.addEventListener('click', () => {
      currentGallery = (currentGallery - 1 + galleryImages.length) % galleryImages.length;
      lightboxImg.src = galleryImages[currentGallery];
    });
    lightbox.querySelector('.lightbox-next')?.addEventListener('click', () => {
      currentGallery = (currentGallery + 1) % galleryImages.length;
      lightboxImg.src = galleryImages[currentGallery];
    });
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') lightbox.querySelector('.lightbox-prev')?.click();
      if (e.key === 'ArrowRight') lightbox.querySelector('.lightbox-next')?.click();
    });
  }

  /* ---------- Offer Countdown Timer ---------- */
  const timerEl = document.getElementById('offer-timer');
  if (timerEl) {
    // Set end date 7 days from now
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);
    const updateTimer = () => {
      const now = new Date();
      const diff = endDate - now;
      if (diff <= 0) return;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / (1000 * 60)) % 60);
      const secs = Math.floor((diff / 1000) % 60);
      const pad = n => String(n).padStart(2, '0');
      document.getElementById('timer-days').textContent = pad(days);
      document.getElementById('timer-hours').textContent = pad(hours);
      document.getElementById('timer-mins').textContent = pad(mins);
      document.getElementById('timer-secs').textContent = pad(secs);
    };
    updateTimer();
    setInterval(updateTimer, 1000);
  }

  /* ---------- Simple Image Slider (Hero) ---------- */
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length > 1) {
    let current = 0;
    setInterval(() => {
      slides[current].classList.remove('active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('active');
    }, 5000);
  }

  /* ---------- Form Validation (basic) ---------- */
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const inputs = form.querySelectorAll('[required]');
      let valid = true;
      inputs.forEach(input => {
        if (!input.value.trim()) {
          valid = false;
          input.style.borderColor = '#e74c3c';
          input.addEventListener('input', () => {
            input.style.borderColor = '';
          }, { once: true });
        }
      });
      if (valid) {
        // Show success message
        const msg = document.createElement('div');
        msg.className = 'alert-success-custom';
        msg.innerHTML = '<i class="bi bi-check-circle"></i> Thank you! Your submission has been received.';
        msg.style.cssText = 'background:#d4edda;color:#155724;padding:16px 24px;border-radius:8px;margin-top:20px;display:flex;align-items:center;gap:10px;font-weight:500;animation:fadeUp 0.5s ease forwards;';
        form.appendChild(msg);
        form.reset();
        setTimeout(() => msg.remove(), 4000);
      }
    });
  });

  /* ---------- Newsletter Form ---------- */
  const nlForm = document.querySelector('.newsletter-form');
  if (nlForm) {
    nlForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = nlForm.querySelector('input');
      if (input && input.value.trim()) {
        input.value = '';
        const btn = nlForm.querySelector('button');
        const orig = btn.textContent;
        btn.textContent = 'Subscribed!';
        btn.style.background = '#27ae60';
        setTimeout(() => {
          btn.textContent = orig;
          btn.style.background = '';
        }, 3000);
      }
    });
  }

});
