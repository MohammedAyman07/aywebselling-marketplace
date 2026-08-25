/**
 * Education Website Template
 * Developed by AymanInfotech
 * Contact: aymaninfotechs@gmail.com
 */

(function () {
  "use strict";

  /* ==========================================
     Preloader
     ========================================== */
  window.addEventListener("load", function () {
    const preloader = document.getElementById("preloader");
    if (preloader) {
      preloader.style.opacity = "0";
      setTimeout(() => preloader.remove(), 600);
    }
  });

  /* ==========================================
     Sticky Navbar
     ========================================== */
  const navbar = document.getElementById("mainNav");
  function handleNavbar() {
    if (!navbar) return;
    if (window.scrollY > 60) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }
  window.addEventListener("scroll", handleNavbar);
  handleNavbar();

  /* ==========================================
     Active Nav Link
     ========================================== */
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });

  /* ==========================================
     Back to Top
     ========================================== */
  const backToTop = document.getElementById("backToTop");
  window.addEventListener("scroll", function () {
    if (!backToTop) return;
    if (window.scrollY > 300) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });
  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ==========================================
     Scroll Reveal Animation (fade-up)
     ========================================== */
  const fadeUpElements = document.querySelectorAll(".fade-up");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  fadeUpElements.forEach((el) => observer.observe(el));

  /* ==========================================
     Counter Animation
     ========================================== */
  function animateCounter(el, target, duration) {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        el.textContent = target.toLocaleString();
        clearInterval(timer);
        return;
      }
      el.textContent = Math.floor(start).toLocaleString();
    }, 16);
  }

  const counterSection = document.querySelector(".stats-section");
  if (counterSection) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          document.querySelectorAll(".counter-value").forEach((el) => {
            const target = parseInt(el.getAttribute("data-target"), 10);
            animateCounter(el, target, 1800);
          });
          counterObserver.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    counterObserver.observe(counterSection);
  }

  /* ==========================================
     Course Filter Tabs
     ========================================== */
  const filterTabs = document.querySelectorAll(".filter-tab");
  const courseCards = document.querySelectorAll(".course-item");

  filterTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      filterTabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      const filter = this.getAttribute("data-filter");
      courseCards.forEach((card) => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.style.display = "block";
          card.style.animation = "none";
          card.offsetHeight; // reflow
          card.style.animation = "fadeInCard 0.4s ease forwards";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  /* ==========================================
     Contact Form Submission
     ========================================== */
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const btn = this.querySelector("button[type='submit']");
      const originalText = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check me-2"></i>Sent Successfully!';
        btn.style.background = "#10B981";
        this.reset();
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.background = "";
          btn.disabled = false;
        }, 3000);
      }, 1500);
    });
  }

  /* ==========================================
     Newsletter Form
     ========================================== */
  document.querySelectorAll(".newsletter-form").forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const btn = this.querySelector("button");
      const input = this.querySelector("input");
      if (!input.value.trim()) return;

      const originalText = btn.innerHTML;
      btn.innerHTML = "Subscribed! ✓";
      btn.style.background = "#10B981";
      input.value = "";

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = "";
      }, 3000);
    });
  });

  /* ==========================================
     Smooth Scroll for Anchor Links
     ========================================== */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  /* ==========================================
     Navbar Mobile Close on Link Click
     ========================================== */
  const navbarCollapse = document.querySelector(".navbar-collapse");
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function () {
      if (navbarCollapse && navbarCollapse.classList.contains("show")) {
        const toggler = document.querySelector(".navbar-toggler");
        if (toggler) toggler.click();
      }
    });
  });

  /* ==========================================
     Tooltip Init (Bootstrap)
     ========================================== */
  if (typeof bootstrap !== "undefined") {
    const tooltipEls = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipEls.forEach((el) => new bootstrap.Tooltip(el));
  }

  /* ==========================================
     CSS Animation keyframe (dynamic)
     ========================================== */
  const style = document.createElement("style");
  style.textContent = `
    @keyframes fadeInCard {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
})();
