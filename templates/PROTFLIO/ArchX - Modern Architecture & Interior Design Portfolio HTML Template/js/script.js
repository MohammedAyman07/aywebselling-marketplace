/**
 * Architect Portfolio Template - Main Script
 */

document.addEventListener("DOMContentLoaded", function() {
    
    // Sticky Navbar
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    });

    // Add active class to nav links based on current page
    const currentLocation = location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if(link.getAttribute('href') === currentLocation.split('/').pop()) {
            link.classList.add('active');
        } else if (currentLocation.endsWith('/') && link.getAttribute('href') === 'index.html') {
            link.classList.add('active');
        }
    });

    // Simple scroll animation for elements
    const animateElements = document.querySelectorAll('.project-item, .service-box, .about-img-box');
    
    // Initial check in case elements are already in view
    checkScroll();
    
    window.addEventListener('scroll', checkScroll);
    
    function checkScroll() {
        const triggerBottom = window.innerHeight / 5 * 4;
        
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if(elementTop < triggerBottom) {
                // If we want a fade in up animation we could add a class here
                // element.classList.add('fade-in-up');
                element.style.opacity = "1";
                element.style.transform = "translateY(0)";
            }
        });
    }

    // Set initial state for animated elements if needed
    animateElements.forEach(element => {
        element.style.transition = "all 0.8s ease-out";
        // Optionally set starting state:
        // element.style.opacity = "0";
        // element.style.transform = "translateY(30px)";
    });

});
