/* 
 * Template Name: Modern IT Company
 * Description: Custom Javascript for interactivity
 */

document.addEventListener('DOMContentLoaded', function() {
  
  // Sticky Navbar
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('shadow-sm');
        navbar.style.padding = '10px 0';
      } else {
        navbar.classList.remove('shadow-sm');
        navbar.style.padding = '15px 0';
      }
    });
  }

  // Animated Counters
  const counters = document.querySelectorAll('.counter-number');
  const speed = 200;

  const animateCounters = () => {
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / speed;

        if (count < target) {
          counter.innerText = Math.ceil(count + inc);
          setTimeout(updateCount, 1);
        } else {
          counter.innerText = target;
        }
      };

      // Check if element is in viewport
      const rect = counter.getBoundingClientRect();
      const isVisible = (rect.top <= (window.innerHeight || document.documentElement.clientHeight));
      
      if(isVisible && counter.innerText == '0') {
         updateCount();
      }
    });
  };

  window.addEventListener('scroll', animateCounters);
  animateCounters(); // Run once on load just in case they are visible initially
  
  // Set current year in footer
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
  
});
