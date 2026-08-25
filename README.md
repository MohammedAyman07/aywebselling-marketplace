# AyWebSelling Digital Marketplace

A blazing-fast, static digital marketplace storefront and portfolio showcasing over 40+ premium HTML templates across various industries.

## Overview

AyWebSelling is a high-performance static site engineered for deployment on serverless edge networks like Vercel. Designed as a digital template marketplace, this project aggregates and categorizes dozens of HTML templates (Business, Portfolio, SaaS, Medical, eCommerce) into a clean, responsive storefront.

By utilizing a static architecture rather than a traditional heavy CMS (like WordPress), the marketplace achieves perfect Lighthouse performance scores, zero database latency, and flawless scaling.

## Features

- **Dynamic Template Injection:** A custom Node.js build script structurally maps and injects 40+ nested HTML templates into the UI.
- **Client-Side Filtering:** Zero-latency category filtering (e.g., SaaS, E-commerce, Medical) using Vanilla JavaScript and CSS transitions.
- **Automated Thumbnail Extraction:** The build pipeline intelligently parses nested directories to extract hero images and screenshots for template thumbnails.
- **Responsive Grid Architecture:** A modern CSS grid layout that adapts flawlessly to mobile, tablet, and desktop viewports.
- **Edge-Ready:** 100% static HTML/CSS/JS ready for global CDN distribution.

## Tech Stack

- **Frontend:** Vanilla HTML5, CSS3, JavaScript
- **Icons & Typography:** FontAwesome 6, Google Fonts (Inter & Outfit)
- **Tooling:** Node.js (fs, path) for automated generation scripts
- **Deployment:** Vercel (Static Output)

## Project Structure

```text
??? css/                  # Global stylesheets
??? js/                   # Client-side interactions (filtering, animations)
??? templates/            # 40+ Premium HTML templates organized by industry
?   ??? BUSINESS/
?   ??? ECOMMERCE/
?   ??? MEDICAL/
?   ??? ...
??? index.html            # Marketplace Landing Page (Featured items)
??? products.html         # Full Marketplace Grid with client-side filtering
??? README.md             # Project documentation
```

## How It Works

The storefront is entirely static but acts as an aggregator. The `templates/` directory serves as a flat-file database. Every template category and individual template is mapped, and the products grid (`products.html`) renders product cards for each item, dynamically linking to their respective live previews.

JavaScript handles the category routing on the client side, listening to data attributes (`data-category`) to instantly filter the visible grid without requiring a server round-trip.

## Deployment

This repository is optimized for **Vercel**:
1. Connect this repository to Vercel.
2. Ensure the Framework Preset is set to **Other**.
3. Leave the Build Command and Output Directory blank (or explicitly default).
4. Vercel will instantly deploy the root directory to the edge.

## Technical Highlights

- **Elimination of Technical Debt:** Refactored out legacy WordPress dependencies and PHP in favor of a lean static pipeline.
- **Algorithm-driven Asset Discovery:** Built automated scripts to parse directory trees, discover thumbnail assets, and gracefully fallback to generated CSS gradients if standard thumbnails were absent.
- **No-Dependency Architecture:** Achieving rich filtering and animations strictly with Vanilla JS and CSS, completely avoiding heavy frameworks like React or jQuery for maximum performance.

## License

MIT License.
