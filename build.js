const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, 'templates');
const outputFile = path.join(__dirname, 'index.html');

let html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>AYWEBSELLING - Premium HTML Templates</title>
    <meta name="description" content="Expertly crafted digital assets for developers, startups, and agencies.">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="assets/css/main.css">
    <style>
        .site-header { background: #fff; padding: 20px 0; border-bottom: 1px solid #eee; }
        .header-inner { display: flex; justify-content: space-between; align-items: center; }
        .site-logo a { font-size: 1.5rem; font-weight: 700; color: #333; text-decoration: none; }
        .main-navigation ul { list-style: none; display: flex; gap: 20px; margin: 0; padding: 0; }
        .main-navigation a { text-decoration: none; color: #555; font-weight: 500; }
        .hero-section { background: #f8f9fa; padding: 80px 0; text-align: center; }
        .hero-content h1 { font-size: 3rem; margin-bottom: 20px; }
        .categories-section { padding: 60px 0; }
        .template-category { margin-bottom: 40px; }
        .template-category h2 { border-bottom: 2px solid #eee; padding-bottom: 10px; margin-bottom: 20px; text-transform: uppercase; }
        .templates-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
        .template-card { border: 1px solid #ddd; border-radius: 8px; padding: 20px; background: #fff; transition: transform 0.2s; }
        .template-card:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.05); }
        .template-card h3 { font-size: 1.2rem; margin: 0 0 10px 0; }
        .template-card a { display: inline-block; margin-top: 15px; padding: 8px 15px; background: #007bff; color: white; text-decoration: none; border-radius: 4px; font-size: 0.9rem; }
        .site-footer { background: #1a1a1a; color: #fff; padding: 60px 0 20px; margin-top: 60px; }
        .footer-widgets { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 40px; margin-bottom: 40px; }
        .footer-bottom { text-align: center; padding-top: 20px; border-top: 1px solid #333; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
    </style>
</head>
<body class="aywebselling-theme">

<header class="site-header">
    <div class="container header-inner">
        <div class="site-logo">
            <a href="index.html" rel="home">AYWEBSELLING</a>
            <p class="site-tagline" style="font-size: 0.8rem; margin: 0; color: #777;">Premium Digital Assets</p>
        </div>
        <nav id="site-navigation" class="main-navigation">
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="#templates">Templates</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </div>
</header>

<div id="content" class="site-content">
    <section class="hero-section">
        <div class="container hero-content">
            <h1>Premium HTML Templates</h1>
            <p>Expertly crafted digital assets for developers, startups, and agencies.</p>
        </div>
    </section>

    <section id="templates" class="categories-section container">
`;

if (fs.existsSync(templatesDir)) {
    const categories = fs.readdirSync(templatesDir).filter(f => fs.statSync(path.join(templatesDir, f)).isDirectory());
    
    for (const category of categories) {
        html += `        <div class='template-category'>\n`;
        html += `            <h2>${category}</h2>\n`;
        html += `            <div class='templates-grid'>\n`;
        
        const categoryPath = path.join(templatesDir, category);
        const templates = fs.readdirSync(categoryPath).filter(f => fs.statSync(path.join(categoryPath, f)).isDirectory());
        
        if (templates.length > 0) {
            for (const template of templates) {
                const urlPath = `templates/${encodeURIComponent(category)}/${encodeURIComponent(template)}`;
                html += `                <div class='template-card'>\n`;
                html += `                    <h3>${template}</h3>\n`;
                html += `                    <a href='${urlPath}/index.html' target='_blank'>View Template</a>\n`;
                html += `                </div>\n`;
            }
        } else {
            html += `                <p>No templates currently available.</p>\n`;
        }
        
        html += `            </div>\n`;
        html += `        </div>\n`;
    }
} else {
    html += `        <p>No templates found.</p>\n`;
}

html += `
    </section>
</div>

<footer id="contact" class="site-footer">
    <div class="container">
        <div class="footer-widgets">
            <div class="footer-widget">
                <h4>AYWEBSELLING</h4>
                <p>We are a premier digital marketplace dedicated to providing high-quality HTML templates.</p>
            </div>
            <div class="footer-widget">
                <h4>Contact Us</h4>
                <p><i class="fas fa-envelope"></i> support@aywebselling.com</p>
                <p><i class="fas fa-map-marker-alt"></i> 123 Tech Street, Digital City</p>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; ${new Date().getFullYear()} AYWEBSELLING. All rights reserved.</p>
        </div>
    </div>
</footer>

<script src="assets/js/scripts.js"></script>
</body>
</html>
`;

fs.writeFileSync(outputFile, html, 'utf8');
console.log('Successfully generated index.html');
