==========================================
 CINEVISION - VIDEOGRAPHER PORTFOLIO TEMPLATE
 Author: Ayman InfoTech
 Email:  aymaninfotechs@gmail.com
 Version: 1.0
==========================================

DESCRIPTION
-----------
A professional, cinematic dark-themed videographer and filmmaker 
portfolio website template built with HTML5, CSS3, Bootstrap 5, 
and vanilla JavaScript. Designed for videographers, filmmakers, 
video editors, and media creators.

FOLDER STRUCTURE
----------------
videographer-portfolio-template/
│
├── index.html          → Main homepage (Hero, Portfolio, About, Services, Testimonials, Contact)
├── portfolio.html      → Full video portfolio gallery with filter tabs
├── services.html       → Detailed services + pricing packages + FAQ
├── about.html          → About page (bio, skills, timeline, equipment, awards)
├── contact.html        → Contact page with full form + map placeholder
│
├── css/
│   └── style.css       → Main stylesheet (cinematic dark theme)
│
├── js/
│   └── script.js       → Core JavaScript (animations, filters, lightbox, form)
│
├── images/             → Place your images here
│   ├── hero-bg.jpg          (Generated cinematic hero background)
│   ├── portfolio-wedding.jpg
│   ├── portfolio-commercial.jpg
│   └── portfolio-shortfilm.jpg
│
├── videos/             → Place your MP4 video files here
│
└── readme.txt          → This file


TECHNOLOGIES USED
-----------------
• HTML5 (semantic structure, SEO-friendly)
• CSS3 (custom properties, animations, grid layout, flexbox)
• Bootstrap 5.3.2 (responsive grid and components)
• Font Awesome 6.5 (icons)
• Google Fonts (Montserrat, Playfair Display, Rajdhani)
• Vanilla JavaScript (no jQuery dependency)


FEATURES
--------
✓ Cinematic dark theme (black/dark grey/red accent)
✓ Fully responsive design (mobile-first)
✓ Animated page loader
✓ Sticky transparent → glass navbar on scroll
✓ Cinematic hero section with pan animation
✓ Filterable video portfolio grid
✓ Video lightbox (add your video URL to data-video attribute)
✓ Animated skill bars (intersection observer)
✓ Animated counter numbers
✓ Scroll reveal animations
✓ Services with pricing cards (3 tiers)
✓ FAQ accordion
✓ Career timeline
✓ Equipment showcase
✓ Awards section
✓ Client testimonials
✓ Contact form with validation + toast notifications
✓ Back-to-top button
✓ SEO-friendly HTML structure
✓ Well-commented code


HOW TO ADD YOUR VIDEOS
-----------------------
To link a real video to a portfolio item, add the URL to the 
data-video attribute on the .portfolio-item element.

Supported video URL formats:
  - YouTube embed:  https://www.youtube.com/embed/VIDEO_ID
  - Vimeo embed:    https://player.vimeo.com/video/VIDEO_ID
  - Direct MP4:     videos/my-video.mp4

Example:
  <div class="portfolio-item" data-video="https://www.youtube.com/embed/dQw4w9WgXcQ" ...>


HOW TO ADD YOUR IMAGES
-----------------------
Replace placeholder/remote image URLs with your own images
in the images/ folder. Recommended dimensions:
  - Hero background: 1920×1080px
  - Portfolio thumbnails: 900×560px (16:9 ratio)
  - About portrait: 700×880px

Update the src attribute in each HTML file.


CUSTOMIZATION
-------------
All design tokens (colors, fonts, transitions) are defined as 
CSS custom properties in the :root block in style.css:

  --color-red:     #e50914;   ← Primary accent color
  --color-black:   #080808;   ← Page background
  --color-dark:    #111111;   ← Secondary dark background
  --font-primary:  'Montserrat', sans-serif;
  --font-display:  'Playfair Display', serif;

Change --color-red to any hex value to retheme quickly.


GOOGLE MAPS
-----------
In contact.html, replace the .map-placeholder div with your 
actual Google Maps embed iframe.


CONTACT FORM BACKEND
--------------------
The contact form currently uses a simulated response (setTimeout).
To make it functional, replace the setTimeout block in script.js 
(initContactForm function) with a real backend call:
  - PHP / Node.js / Python backend
  - Formspree: https://formspree.io
  - EmailJS: https://www.emailjs.com
  - Netlify Forms


CREDITS
-------
• Bootstrap 5     → https://getbootstrap.com
• Font Awesome    → https://fontawesome.com
• Google Fonts    → https://fonts.google.com
• Unsplash        → https://unsplash.com (placeholder images)


CONTACT & SUPPORT
-----------------
Email: aymaninfotechs@gmail.com

==========================================
         Thank you for using CineVision!
==========================================
