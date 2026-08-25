const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, 'templates');
const productsFile = path.join(__dirname, 'products.html');
const indexFile = path.join(__dirname, 'index.html');

// Read templates
let allCards = [];
let featuredCards = [];

if (fs.existsSync(templatesDir)) {
    const categories = fs.readdirSync(templatesDir).filter(f => fs.statSync(path.join(templatesDir, f)).isDirectory());
    
    // Gradients for cards
    const gradients = [
        'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(to top, #0ba360 0%, #3cba92 100%)',
        'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)',
        'linear-gradient(to right, #ff758c 0%, #ff7eb3 100%)',
        'linear-gradient(to top, #fcc5e4 0%, #fda34b 15%, #ff7882 35%, #c8699e 52%, #7046aa 71%, #0c1db8 87%, #020f75 100%)'
    ];
    let gradIndex = 0;

    for (const category of categories) {
        const categoryPath = path.join(templatesDir, category);
        const templates = fs.readdirSync(categoryPath).filter(f => fs.statSync(path.join(categoryPath, f)).isDirectory());
        
        for (const template of templates) {
            const urlPath = `templates/${encodeURIComponent(category)}/${encodeURIComponent(template)}/index.html`;
            const displayCat = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
            const bg = gradients[gradIndex % gradients.length];
            gradIndex++;
            
            let cardHtml = `
            <article class="card product-item" data-category="${category.toLowerCase()}">
                <div class="card-img" style="background: ${bg}; position: relative; height: 200px;">
                </div>
                <div class="card-body">
                    <div class="d-flex justify-between items-center mb-2">
                        <span class="text-muted" style="font-size: 0.875rem;">${displayCat}</span>
                        <div class="stars" style="color: #f59e0b; font-size: 0.8rem;">
                            <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                        </div>
                    </div>
                    <h3 class="card-title"><a href="product.html">${template}</a></h3>
                    <p class="text-muted" style="font-size: 0.9rem; margin-bottom: 1rem;">Premium ${displayCat} HTML5 template.</p>
                    <div class="card-meta">
                        <span class="card-price">$49</span>
                        <div class="d-flex gap-sm">
                            <a href="${urlPath}" target="_blank" class="btn btn-outline btn-sm">Preview</a>
                            <a href="#" class="btn btn-primary btn-sm"><i class="fas fa-shopping-cart"></i></a>
                        </div>
                    </div>
                </div>
            </article>`;
            
            allCards.push(cardHtml);
            if (featuredCards.length < 6) {
                featuredCards.push(cardHtml);
            }
        }
    }
}

// Inject into products.html
let productsContent = fs.readFileSync(productsFile, 'utf8');
const gridRegex = /(<div class="d-grid grid-cols-3 gap-lg" id="product-grid">)([\s\S]*?)(<\/div>\s*<!-- Pagination -->)/;
if (gridRegex.test(productsContent)) {
    productsContent = productsContent.replace(gridRegex, `$1\n${allCards.join('\n')}\n$3`);
    fs.writeFileSync(productsFile, productsContent, 'utf8');
    console.log('Updated products.html');
}

// Inject into index.html
let indexContent = fs.readFileSync(indexFile, 'utf8');
const featuredRegex = /(<div class="d-grid grid-cols-3 gap-lg">)([\s\S]*?)(<\/div>\s*<\/div>\s*<\/section>\s*<!-- Call to Action -->)/;
if (featuredRegex.test(indexContent)) {
    indexContent = indexContent.replace(featuredRegex, `$1\n${featuredCards.join('\n')}\n$3`);
    fs.writeFileSync(indexFile, indexContent, 'utf8');
    console.log('Updated index.html');
}

