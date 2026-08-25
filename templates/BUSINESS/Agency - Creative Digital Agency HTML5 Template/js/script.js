document.addEventListener('DOMContentLoaded', () => {

    // Sticky Navbar
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('sticky-nav');
        } else {
            navbar.classList.remove('sticky-nav');
        }
    });

    // Simple fade-in scroll animation (Vanilla JS substitute for AOS if requested, though AOS can be included via CDN)
    // We'll use a basic intersection observer for custom smooth reveals
    const animatedElements = document.querySelectorAll('.animate-element');
    
    // Set initial state
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Determine delay if any
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    animatedElements.forEach(el => observer.observe(el));

    // Mobile menu collapse after click
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.getElementById('navbarNav');
    
    // Need bootstrap JS for this via API, but we can hook the click manually
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menuToggle && menuToggle.classList.contains('show')) {
                // Assuming Bootstrap 5
                const bsCollapse = new bootstrap.Collapse(menuToggle, {
                    toggle: false
                });
                bsCollapse.hide();
            }
        });
    });

    // Contact Form Submission (Prevent Default for Template)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real app, this would be an AJAX request
            const btn = document.getElementById('submitBtn');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = 'Message Sent Successfully!';
                btn.classList.remove('btn-primary-custom');
                btn.classList.add('btn-success');
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.classList.add('btn-primary-custom');
                    btn.classList.remove('btn-success');
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
});
