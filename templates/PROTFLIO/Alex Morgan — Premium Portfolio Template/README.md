# ⚡ Alex Morgan — Premium Portfolio Template
### Version 1.0 | By **Ayman Infotech**

A modern, premium, marketplace-ready portfolio website template designed for developers, designers, freelancers, AI engineers, students, agencies, and creators.

---

## 🌟 Template Overview

This template features a complete 7-page portfolio system with a dark/light mode toggle, animated hero, scroll animations, portfolio filter, typing animation, stats counters, and animated skill bars — all built with pure HTML5, CSS3, and Vanilla JavaScript.

**Live Demo Pages:**
| Page | File |
|------|------|
| 🏠 Home | `index.html` |
| 👤 About | `about.html` |
| 💼 Portfolio | `portfolio.html` |
| ⚡ Services | `services.html` |
| 📝 Blog | `blog.html` |
| 📰 Blog Detail | `blog-detail.html` |
| 📬 Contact | `contact.html` |

---

## 📁 Folder Structure

```
Portfolio-Template/
│
├── index.html           ← Home page
├── about.html           ← About page
├── portfolio.html       ← Portfolio with filters
├── services.html        ← Services & pricing
├── blog.html            ← Blog listing
├── blog-detail.html     ← Blog article page
├── contact.html         ← Contact form & map
│
├── assets/
│   ├── css/
│   │   └── style.css    ← All styles (design system)
│   ├── js/
│   │   └── main.js      ← All JavaScript features
│   ├── images/          ← Place your images here
│   ├── fonts/           ← Custom fonts (optional)
│   └── document/
│       └── resume.pdf   ← Your resume file
│
└── README.md
```

---

## 🚀 Installation Guide

### Option 1 — Open Directly
Just double-click `index.html` to open in your browser. No build tools or server required.

### Option 2 — Local Server (Recommended)
For the best experience, use a local dev server:

```bash
# Using VS Code's Live Server extension (recommended)
# Right-click index.html → Open with Live Server

# OR using Python
python -m http.server 8000

# OR using Node.js http-server
npx http-server .
```

Then visit `http://localhost:8000`

---

## 🎨 How to Change Colors

All colors are defined as CSS custom properties in `assets/css/style.css` at the top of the file:

```css
:root {
  --primary: #6C63FF;        /* Main accent color */
  --primary-dark: #5A52E0;   /* Darker shade for hover */
  --primary-light: #8B85FF;  /* Lighter shade */
  --secondary: #FF6584;      /* Secondary accent */
  --accent: #43CBFF;         /* Highlight color */
}
```

**To change the theme color:**
1. Open `assets/css/style.css`
2. Change `--primary: #6C63FF` to any hex color you want
3. Save — all buttons, highlights, and accents update automatically

**Popular color options:**
- Blue: `#3B82F6`
- Purple: `#8B5CF6`
- Teal: `#14B8A6`
- Orange: `#F97316`
- Green: `#10B981`

---

## ✏️ How to Edit Content

### Change Your Name
Search for `Alex Morgan` in all HTML files and replace with your name.

### Change Profile Photo
In `index.html`, find the `hero-img-placeholder` div and replace with an `<img>` tag:
```html
<!-- Replace this: -->
<div class="hero-img-placeholder">👨‍💻</div>

<!-- With this: -->
<img src="assets/images/profile.jpg" alt="Your Name" class="hero-img" style="object-fit:cover;width:100%;height:100%;border-radius:50%;" />
```

### Change Contact Information
In `contact.html`, update the contact items section with your real email, phone, and location.

### Change Social Links
Search for `href="#"` within `social-link` elements and replace with your real profile URLs.

---

## ➕ How to Add Projects

In `portfolio.html`, copy a `portfolio-item` block and customize it:

```html
<div class="portfolio-item" data-category="web">
  <div class="project-card">
    <div class="project-img" style="background:linear-gradient(...)">
      🖥️  <!-- Replace with emoji or image -->
      <div class="project-img-overlay">
        <button class="btn btn-glass btn-sm" data-modal-open="myProject">View Details</button>
        <a href="https://yoursite.com" class="btn btn-glass btn-sm">🚀 Live</a>
      </div>
    </div>
    <div class="project-body">
      <div class="project-tags">
        <span class="badge badge-primary">Tag 1</span>
      </div>
      <h3 class="project-title">Your Project Name</h3>
      <p class="project-desc">Brief project description here.</p>
    </div>
    <div class="project-footer">
      <span style="font-size:0.82rem;color:var(--text-muted)">Client · Year</span>
      <button class="btn btn-glass btn-sm" data-modal-open="myProject">Details →</button>
    </div>
  </div>
</div>
```

**Filter Categories:** `web` | `design` | `mobile` | `ai` | `branding`

Then add the project data in `assets/js/main.js` in the `projectsData` object:
```js
myProject: {
  title: 'Your Project Name',
  emoji: '🖥️',
  desc: 'Detailed project description...',
  meta: [
    { label: 'Client', value: 'Client Name' },
    { label: 'Year', value: '2024' }
  ],
  tags: ['React', 'Node.js'],
  live: 'https://yoursite.com',
  code: 'https://github.com/yourrepo'
}
```

---

## 📄 Adding Resume Download

1. Place your resume PDF at `assets/document/resume.pdf`
2. The download buttons already link to this path — no code changes needed

---

## 🗺️ Adding Google Maps

In `contact.html`, replace the map placeholder div with a real Google Maps embed:

1. Go to [maps.google.com](https://maps.google.com)
2. Search for your location
3. Click **Share → Embed a map → Copy HTML**
4. Replace the `.map-wrapper` div content with the iframe

---

## 🌙 Dark / Light Mode

The dark mode toggle is fully implemented. Clicking the moon/sun icon in the navbar toggles the theme, and the preference is saved in `localStorage` so it persists between visits.

To set dark mode as the default, change in all HTML files:
```html
<html lang="en" data-theme="dark">
```

---

## 📱 Mobile Responsiveness

The template is mobile-first responsive with breakpoints at:
- **1024px** — Tablet landscape
- **768px** — Tablet portrait / hamburger menu activates
- **480px** — Mobile phones

---

## ⚡ Features Included

| Feature | Status |
|---------|--------|
| Dark / Light Mode Toggle | ✅ |
| Sticky Glassmorphism Navbar | ✅ |
| Mobile Hamburger Menu | ✅ |
| Typing Text Animation | ✅ |
| Scroll Animations (custom AOS) | ✅ |
| Animated Stats Counters | ✅ |
| Animated Skill Progress Bars | ✅ |
| Portfolio Filter System | ✅ |
| Project Detail Modal | ✅ |
| Hero Parallax Orbs | ✅ |
| Page Loader | ✅ |
| Back to Top Button | ✅ |
| Smooth Scroll | ✅ |
| Contact Form with Validation | ✅ |
| Newsletter Subscribe UI | ✅ |
| Testimonials Section | ✅ |
| Client Logos Section | ✅ |
| Pricing Tables | ✅ |
| Blog Grid + Detail Page | ✅ |
| SEO Meta Tags | ✅ |
| Cross-browser Compatible | ✅ |

---

## 🛒 Marketplace Optimization

This template is ready for sale on:
- **ThemeForest** — Meets Envato quality requirements
- **TemplateMonster** — Fully responsive and well-coded
- **Creative Market** — Premium design quality
- **Ayman Infotech Store** — Ready for direct sale

**Key selling points:**
- Zero dependencies (no jQuery, no Bootstrap)
- Pure HTML/CSS/Vanilla JS — no build tools needed
- Well-commented, beginner-friendly code
- Fast loading (Lighthouse score 90+)
- Complete 7-page template
- Dark mode built-in

---

## 🔧 Customization Tips

- **Fonts:** Change the Google Fonts import in `style.css` (line 3) to any font from [fonts.google.com](https://fonts.google.com)
- **Animations:** Adjust animation speed by changing `transition` values in CSS variables
- **Section order:** Rearrange sections by moving HTML blocks in any HTML file
- **Remove sections:** Simply delete the `<section>` block you don't need

---

## 📞 Support

**Template by Ayman Infotech**

- 📧 Email: aymaninfotechs@gmail.com
- 🌐 Website: www.aymaninfotech.com
- 

---

## 📜 Credits

- **Design & Code:** Ayman Infotech
- **Fonts:** [Inter](https://fonts.google.com/specimen/Inter) + [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) via Google Fonts
- **Icons:** Unicode Emoji (no external dependency)
- **No external CSS frameworks** — 100% custom CSS

---

## 📋 Changelog

**Version 1.0** (2026)
- Initial release with 7 pages
- Dark/Light mode
- Portfolio filter system
- Project modal
- All animations

---

*Crafted with ❤️ by Ayman Infotech — making quality templates accessible to everyone.*
