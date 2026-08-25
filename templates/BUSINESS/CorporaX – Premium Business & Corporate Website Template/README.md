# CorporaX – Premium Business & Corporate Website Template
A **premium, fully responsive** business & corporate website template built with pure HTML5, CSS3, and Vanilla JavaScript. Designed for startups, agencies, IT companies, consultants, and AI businesses.

---

## 🚀 Live Demo

Open `index.html` in your browser to preview the template instantly.

---

## 📁 Folder Structure

```
Business-Website-Template/
│
├── index.html          → Home Page
├── about.html          → About Page
├── services.html       → Services + Pricing + FAQ
├── portfolio.html      → Portfolio + Case Studies
├── blog.html           → Blog Grid + Sidebar
├── contact.html        → Contact Form + Map
│
├── assets/
│   ├── css/
│   │   └── style.css   → Main stylesheet (design system)
│   ├── js/
│   │   └── main.js     → All interactive features
│   ├── images/         → Add your images here
│   └── fonts/          → Custom font files (if needed)
│
└── README.md
```

---

## ✅ Features

| Feature | Status |
|---|---|
| 6 Full Pages | ✅ |
| Dark / Light Mode Toggle | ✅ |
| Sticky Responsive Navbar | ✅ |
| Mobile Hamburger Menu | ✅ |
| Animated Hero Section | ✅ |
| Scroll-Reveal Animations | ✅ |
| Animated Counters | ✅ |
| Testimonials Auto-Slider | ✅ |
| Portfolio Filter (JS) | ✅ |
| Pricing Monthly/Yearly Toggle | ✅ |
| FAQ Accordion | ✅ |
| Contact Form (with validation) | ✅ |
| Newsletter Subscription UI | ✅ |
| Back-to-Top Button | ✅ |
| Google Fonts (Inter + Poppins) | ✅ |
| Font Awesome 6 Icons | ✅ |
| SEO Meta Tags on all pages | ✅ |
| Fully Mobile Responsive | ✅ |
| CSS Variables for easy theming | ✅ |
| Clean, well-commented code | ✅ |

---

## 🎨 How to Customize

### Change the Brand Color

Open `assets/css/style.css` and edit the `:root` variables at the top:

```css
:root {
  --primary: #1a73e8;       /* Main brand color */
  --primary-dark: #1557b0;  /* Darker shade */
  --primary-light: #4a9af5; /* Lighter shade */
  --accent: #00d4ff;        /* Accent/highlight color */
  --secondary: #0d1b2e;     /* Dark navy background */
}
```

### Change the Logo

In each HTML file, find the `.nav-logo` element:

```html
<a href="index.html" class="nav-logo">
  <div class="logo-icon"><i class="fas fa-bolt"></i></div>
  Corpora<span>X</span>      <!-- ← Change this text -->
</a>
```

To use an image logo instead:

```html
<a href="index.html" class="nav-logo">
  <img src="assets/images/logo.png" alt="Your Brand" height="40">
</a>
```

### Change the Typography

In `assets/css/style.css`, update the Google Fonts import:

```css
@import url('https://fonts.googleapis.com/css2?family=YourFont:wght@400;600;700&display=swap');
```

Then update the font variables:

```css
:root {
  --font-primary: 'YourFont', sans-serif;
  --font-secondary: 'YourSecondFont', sans-serif;
}
```

### Edit Text Content

All content is in plain HTML files. Simply open any `.html` file in a text editor and update the text between HTML tags.

### Add a New Page

1. Copy any existing page (e.g., `about.html`) and rename it (e.g., `team.html`)
2. Update the `<title>` and `<meta name="description">` tags
3. Change the page hero title and breadcrumb
4. Add your content in the sections below the hero
5. Update all navbar `<ul class="nav-menu">` lists across all pages to include the new link

---

## 🗺️ Adding a Real Google Map

In `contact.html`, find the `.map-container` div and replace the `.map-placeholder` with:

```html
<iframe
  src="https://www.google.com/maps/embed?pb=YOUR_EMBED_CODE"
  width="100%" height="380"
  style="border:0;display:block;" allowfullscreen="" loading="lazy">
</iframe>
```

Get your embed code from [Google Maps](https://maps.google.com) → Share → Embed a map.

---

## 📸 Adding Images

Place your images in `assets/images/` and reference them in HTML:

```html
<img src="assets/images/hero-bg.jpg" alt="Hero Background" />
```

For the hero background:

```css
.hero {
  background-image: url('../images/hero-bg.jpg');
  background-size: cover;
  background-position: center;
}
```

---



---

## 🛠️ Browser Support

| Browser | Support |
|---|---|
| Chrome 90+ | ✅ Full |
| Firefox 88+ | ✅ Full |
| Safari 14+ | ✅ Full |
| Edge 90+ | ✅ Full |
| IE 11 | ❌ Not supported |

---

##  Contact

For support, customization requests, or licensing inquiries:

- 📧 **Email:** aywebsellings@gmail.com
- 🌐 **Website:** www.aywebselling.com


---

## 🏆 Credits

- **Fonts:** [Google Fonts](https://fonts.google.com) – Inter & Poppins
- **Icons:** [Font Awesome 6](https://fontawesome.com)
- **Template:** CorporaX by [aywebselling](https://www.aywebselling.com)

---

© 2026 aywebselling. All rights reserved.
