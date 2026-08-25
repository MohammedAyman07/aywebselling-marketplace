/* ==========================================================
   Template Name: Corporate Business Template
   Description: Modern corporate business website template
   Author: aywebsellings
   Author Email: aywebsellings@gmail.com
   Version: 1.0
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Sticky Navbar
    const navbar = document.querySelector(".navbar");
    if (navbar) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        });
    }

    // 2. Animated Counters
    const counters = document.querySelectorAll(".counter-value");
    const speed = 200; // The lower the slower

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute("data-target");
                const count = +counter.innerText;
                
                // Lower increment to slow and higher to speed up
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    // Intersection Observer for counters (animate when scrolled into view)
    const counterSection = document.querySelector(".stats-section");
    if (counterSection && counters.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    // Unobserve after animating once
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        observer.observe(counterSection);
    }

    // 3. Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Ignore links that are just '#'
            if(this.getAttribute('href') !== '#') {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Adjust offset for sticky navbar
                    const offset = navbar ? navbar.offsetHeight : 0;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
