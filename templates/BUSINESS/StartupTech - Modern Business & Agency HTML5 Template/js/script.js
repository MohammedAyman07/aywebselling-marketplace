(function ($) {
  "use strict";

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 45) {
      $('.navbar').addClass('navbar-scrolled');
    } else {
      $('.navbar').removeClass('navbar-scrolled');
    }
  });

  // Smooth scrolling on the navbar links
  $(".navbar-nav a").on('click', function (event) {
    if (this.hash !== "") {
      event.preventDefault();

      $('html, body').animate({
        scrollTop: $(this.hash).offset().top - 70
      }, 800, 'swing');

      if ($('.navbar-collapse').hasClass('show')) {
        $('.navbar-collapse').removeClass('show');
      }
    }
  });

  // Portfolio isotope and filter
  if ($('.portfolio-container').length) {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({ filter: $(this).data('filter') });
    });
  }

  // Initialize AOS (Animate on Scroll)
  AOS.init({
    duration: 1000,
    easing: "ease-in-out",
    once: true,
    mirror: false
  });

  // Testimonial Carousel Setup
  if ($('.testimonial-carousel').length) {
    $('.testimonial-carousel').owlCarousel({
      autoplay: true,
      smartSpeed: 1000,
      center: true,
      margin: 24,
      dots: true,
      loop: true,
      nav: false,
      responsive: {
        0: { items: 1 },
        768: { items: 2 },
        992: { items: 3 }
      }
    });
  }

})(jQuery);
