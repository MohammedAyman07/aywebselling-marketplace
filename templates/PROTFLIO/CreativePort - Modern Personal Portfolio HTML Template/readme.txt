Portfolio Website Template
==========================
Developed by AymanInfotech
Contact: aymaninfotechs@gmail.com

Thank you for using this template!

------------------------------------------------------------
FOLDER STRUCTURE
------------------------------------------------------------
portfolio-template/
│
├── index.html          → Home page (Hero, About, Portfolio, Services, Testimonials, Contact)
├── about.html          → About page (Skills, Experience, Education Timeline)
├── projects.html       → Projects page (Filterable Portfolio Grid)
├── services.html       → Services page (Services Grid, Process, Pricing Plans)
├── contact.html        → Contact page (Contact Form, Info, FAQ Accordion)
│
├── css/
│   └── style.css       → All styles (custom properties, animations, responsive)
│
├── js/
│   └── script.js       → Interactions (navbar, filters, counters, form, animations)
│
├── images/             → Place your custom images here
│
└── readme.txt          → This file

------------------------------------------------------------
HOW TO EDIT THE WEBSITE
------------------------------------------------------------
1. Open the template folder.
2. Open index.html (or any page) in a code editor.

Recommended Editors:
  - Visual Studio Code (https://code.visualstudio.com)
  - Sublime Text
  - Notepad++

Edit text content directly inside HTML tags.
For example, to change the hero headline:
  <h1 class="hero-title">Your New Headline Here</h1>

------------------------------------------------------------
HOW TO CHANGE IMAGES
------------------------------------------------------------
Option 1 – Replace Unsplash Links:
  The template uses Unsplash URLs. Replace them with your own:
  <img src="images/your-photo.jpg" alt="Description" />

Option 2 – Place images in the /images/ folder:
  1. Copy your images into the images/ folder.
  2. Update the src attribute in the HTML.

Recommended image sizes:
  - Hero / About profile:  800×1000 px
  - Portfolio thumbnails:  600×450 px
  - Testimonial avatars:   100×100 px

------------------------------------------------------------
HOW TO CHANGE COLORS
------------------------------------------------------------
Open css/style.css — find the :root block at the top:

  :root {
    --primary:      #0a78f2;   /* Main blue accent */
    --accent:       #ff6b35;   /* Orange accent */
    --dark:         #111827;   /* Dark text / backgrounds */
    --grey:         #6b7280;   /* Secondary text */
    --white:        #ffffff;
    /* etc. */
  }

Change any hex value to update the whole color scheme instantly.

------------------------------------------------------------
HOW TO CHANGE FONTS
------------------------------------------------------------
Open index.html (and all pages) — find the Google Fonts <link> tag:
  @import url('https://fonts.googleapis.com/css2?family=Inter...');

Replace "Inter" with any font from fonts.google.com.
Then update the CSS variable in style.css:
  --font-main: 'YourNewFont', sans-serif;

------------------------------------------------------------
HOW TO ENABLE CONTACT FORM
------------------------------------------------------------
The contact form currently shows a UI simulation.
To make it functional, connect it to one of these services:

Option 1 – Formspree (easiest, free):
  1. Create an account at https://formspree.io
  2. Add your form's action URL:
     <form action="https://formspree.io/f/YOUR_ID" method="POST">

Option 2 – EmailJS (no server needed):
  1. Sign up at https://www.emailjs.com
  2. Follow their JavaScript integration guide.

Option 3 – Custom Backend:
  Connect to your own PHP/Node.js backend.

------------------------------------------------------------
HOW TO UPLOAD YOUR WEBSITE
------------------------------------------------------------
1. Purchase web hosting (Hostinger, Namecheap, Bluehost, etc.)
2. Log in to your hosting control panel (cPanel / hPanel).
3. Open File Manager.
4. Navigate to the public_html folder.
5. Upload all template files (maintain the folder structure).
6. Your website will be live at your domain!

Recommended Hosting Providers:
  - Hostinger: https://www.hostinger.com
  - Namecheap: https://www.namecheap.com
  - Netlify (free): https://www.netlify.com (drag & drop deploy!)
  - GitHub Pages (free): https://pages.github.com

------------------------------------------------------------
FEATURES
------------------------------------------------------------
✔ Fully responsive (mobile-first, Bootstrap 5)
✔ Smooth hero entrance animation + floating badges
✔ Animated skill progress bars (scroll-triggered)
✔ Interactive portfolio filter (All / Web / Mobile / Branding)
✔ Animated stat counters
✔ Sticky navbar that changes on scroll
✔ Back-to-top button
✔ Tilt effect on project / service cards
✔ Testimonials section with star ratings
✔ Services with hover flip animation
✔ Pricing plans (3 tiers)
✔ Timeline for experience & education (about.html)
✔ FAQ accordion (contact.html)
✔ Contact form with submit animation
✔ SEO-friendly structure (meta tags, semantic HTML)
✔ Clean, well-commented code
✔ Google Fonts (Inter + Playfair Display)
✔ Bootstrap Icons (no extra image downloads)

------------------------------------------------------------
SUPPORT
------------------------------------------------------------
Email: aymaninfotechs@gmail.com

We aim to respond within 24 hours. Please provide:
  - Your order/transaction ID
  - A clear description of the issue
  - Screenshots if applicable

------------------------------------------------------------
LICENSE
------------------------------------------------------------
This template is for personal and commercial use.
Please do not redistribute or resell this template as-is.

------------------------------------------------------------
VERSION
------------------------------------------------------------
Template Version: 1.0.0
Release Date: March 2026
Developed by: AymanInfotech
