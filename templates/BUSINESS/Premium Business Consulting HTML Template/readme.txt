================================================================
 Business Website Template
 Developed by aywebselling
================================================================

Thank you for choosing this template!

Contact Email: aywebsellings@gmail.com

================================================================
 TEMPLATE OVERVIEW
================================================================

This is a modern, professional, and fully responsive Business
Website Template built with:

  - HTML5 (semantic, SEO-friendly markup)
  - CSS3 (custom design system, CSS variables, animations)
  - Bootstrap 5.3 (responsive grid, components)
  - JavaScript (ES6+, no jQuery dependency)
  - Bootstrap Icons 1.11
  - Google Fonts (Inter)

All external resources are loaded from CDN, so no package
install is needed. Simply open any HTML file in a browser.

================================================================
 FILE STRUCTURE
================================================================

business-template/
│
├── index.html          → Home Page
├── about.html          → About Page (Story, Mission, Team)
├── services.html       → Services Page
├── portfolio.html      → Portfolio Page (filterable gallery)
├── blog.html           → Blog Page (articles + sidebar)
├── contact.html        → Contact Page (form, map, FAQ)
│
├── css/
│   └── style.css       → Main stylesheet (all custom styles)
│
├── js/
│   └── script.js       → Main JavaScript (interactions)
│
├── images/             → Place your local images here
│
└── readme.txt          → This file

================================================================
 INCLUDED PAGES
================================================================

1. HOME (index.html)
   - Hero section with animated stats
   - Company introduction
   - Services preview (6 cards)
   - Testimonials (3 cards)
   - Portfolio preview (3 projects)
   - Newsletter subscription section
   - Footer with social links

2. ABOUT (about.html)
   - Company story
   - Mission, Vision, Values, Culture cards
   - Team section (8 members with social overlays)

3. SERVICES (services.html)
   - Detailed service sections (alternating image + text)
   - Quick-view service cards
   - Call-to-action banner

4. PORTFOLIO (portfolio.html)
   - 9 projects with JavaScript filter
   - Categories: Web, Consulting, Marketing, IT, Finance

5. BLOG (blog.html)
   - 6 blog article cards
   - Sidebar: Search, Categories, Popular Posts, Tags
   - Pagination

6. CONTACT (contact.html)
   - Contact info cards (Email, Hours, Reach, Chat)
   - Contact form (with validation + submission feedback)
   - Google Maps embed
   - FAQ accordion

================================================================
 HOW TO CUSTOMIZE
================================================================

--- EDIT TEXT ---
Open any .html file in a code editor and modify the text
inside HTML tags. Recommended editors:
  - Visual Studio Code (recommended)
  - Sublime Text
  - Notepad++

--- CHANGE COLORS ---
Open css/style.css and edit the CSS variables at the top:

  :root {
    --primary:  #1a56db;   ← Main brand color (blue)
    --secondary: #0ea5e9;  ← Accent color (sky blue)
    --accent:   #f59e0b;   ← Highlight color (amber)
    --dark:     #0f172a;   ← Dark sections background
    ...
  }

Changing --primary will update buttons, icons, and accents
across the entire template automatically.

--- CHANGE FONTS ---
In each HTML file's <head>, replace the Google Fonts URL:
  https://fonts.googleapis.com/css2?family=Inter:wght@...

And update the --font variable in css/style.css:
  --font: 'YourFont', sans-serif;

--- ADD/REPLACE IMAGES ---
  Option A (CDN Images): Replace the src URL in <img> tags
  with your own Unsplash/Pexels CDN URL.

  Option B (Local Images): Place images in the /images/
  folder and update src attributes:
  <img src="images/your-image.jpg" alt="Description" />

  Recommended image sizes:
  - Hero: 1200 × 800px
  - Portfolio/Blog: 800 × 600px
  - Team: 400 × 500px

--- UPDATE CONTACT EMAIL ---
Search and replace all instances of:
  aywebsellings@gmail.com
with your actual email address.

--- GOOGLE MAPS ---
In contact.html, find the <iframe> with the Google Maps
embed and replace the src URL with your own embed URL:
  1. Go to maps.google.com
  2. Search your location
  3. Click Share → Embed a map
  4. Copy the <iframe> src URL

--- ENABLE FORM SUBMISSION ---
The contact form currently uses a JavaScript simulation.
To enable real email sending, integrate a service like:
  - Formspree (formspree.io) — free tier available
  - EmailJS (emailjs.com)
  - Web3Forms (web3forms.com)
  - Your own backend endpoint

================================================================
 FEATURES
================================================================

✓ Fully responsive (mobile-first, Bootstrap 5 grid)
✓ SEO-friendly HTML5 semantic structure
✓ Sticky navigation bar with scroll shrink effect
✓ Smooth scrolling throughout
✓ Page preloader with fade-out
✓ Scroll reveal animations (IntersectionObserver)
✓ Animated number counters
✓ Portfolio filter (JavaScript, no dependencies)
✓ Back-to-top button
✓ Contact form with validation & submission feedback
✓ Newsletter subscription section
✓ Google Maps integration (contact page)
✓ FAQ accordion (Bootstrap)
✓ CSS custom properties for easy theming
✓ Clean, well-commented code throughout
✓ No jQuery dependency

================================================================
 BROWSER SUPPORT
================================================================

✓ Chrome (latest)
✓ Firefox (latest)
✓ Safari (latest)
✓ Edge (latest)
✓ Opera (latest)
✓ Mobile browsers (iOS Safari, Android Chrome)

================================================================
 HOW TO UPLOAD TO HOSTING
================================================================

1. Purchase web hosting (e.g., Hostinger, Bluehost, SiteGround)
2. Login to your hosting control panel (cPanel / Plesk)
3. Open File Manager
4. Navigate to public_html (or www) directory
5. Upload all files from the business-template/ folder
6. Your website will be live at your domain!

For FTP upload:
  - Use FileZilla (free): filezilla-project.org
  - Host: your domain / FTP server
  - Upload all files to public_html/

================================================================
 SUPPORT
================================================================

For questions, customization services, or bug reports:

  Email: aywebsellings@gmail.com

We typically respond within 24 business hours.

================================================================
 CREDITS
================================================================

  - Bootstrap 5       github.com/twbs/bootstrap
  - Bootstrap Icons   icons.getbootstrap.com
  - Google Fonts      fonts.google.com
  - Unsplash Photos   unsplash.com (demo images only)

================================================================
 COPYRIGHT
================================================================

© 2026 aywebselling. All rights reserved.

This template is provided for use under the standard
template license terms. Redistribution or resale of the
original template files is not permitted.

================================================================
