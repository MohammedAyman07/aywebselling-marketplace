/**
 * Creative Designer Portfolio
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Sticky Navbar
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (href === '#') {
                e.preventDefault();
                return;
            }

            e.preventDefault();

            const target = document.querySelector(href);
            if (target) {
                // Close mobile menu if open
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show') && navbarToggler) {
                    navbarToggler.click();
                }

                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Reveal Elements on Scroll
    const revealElements = document.querySelectorAll('.reveal');

    const reveal = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }

    // Initial check on load
    reveal();

    // Check on scroll
    window.addEventListener('scroll', reveal);

    // 4. Contact Form Submission (Mock)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;

            btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Sending...';
            btn.disabled = true;

            // Mock submission delay
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check me-2"></i> Message Sent!';
                btn.classList.remove('btn-primary-custom');
                btn.classList.add('btn-outline-custom');

                // Reset form
                this.reset();

                // Reset button after 3 seconds
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.classList.remove('btn-outline-custom');
                    btn.classList.add('btn-primary-custom');
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // 5. Portfolio Filtering
    const filterButtons = document.querySelectorAll('.filter-button-group button');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function () {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));

                // Add active class to clicked button
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                portfolioItems.forEach(item => {
                    if (filterValue === '*' || item.classList.contains(filterValue.substring(1))) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
});
