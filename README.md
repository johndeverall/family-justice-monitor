# Family Justice Monitor NZ - Eleventy Version

This is a static website built with [Eleventy (11ty)](https://www.11ty.dev/), a simple and powerful static site generator.

## Why Eleventy?

- **Templates & Includes** - Reusable header, footer, and layouts (no copy-paste!)
- **Simple** - Uses HTML, no complex framework to learn
- **Fast** - Quick builds, fast loading
- **Flexible** - Easy to add blog posts, news, or dynamic content later
- **GitHub Pages Ready** - Builds easily for deployment

## Structure

```
eleventy-version/
├── src/
│   ├── _includes/          # Reusable components
│   │   ├── header.html     # Site header with navigation
│   │   └── footer.html     # Site footer
│   ├── _layouts/           # Page templates
│   │   └── base.html       # Main layout template
│   ├── css/
│   │   └── style.css       # Stylesheet (same as HTML version)
│   ├── js/
│   │   └── main.js         # JavaScript (same as HTML version)
│   ├── index.html          # Homepage
│   ├── about.html          # About page
│   ├── governance.html     # Governance page
│   └── contact.html        # Contact page
├── _site/                  # Generated site (created by Eleventy)
├── .eleventy.js           # Eleventy configuration
├── package.json           # Node.js dependencies
└── README.md             # This file
```

## Prerequisites

- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js)

Install Node.js from: https://nodejs.org/

## Installation

```bash
# Navigate to the eleventy-version folder
cd eleventy-version

# Install dependencies (only needed once)
npm install
```

## Development

To work on the site locally:

```bash
# Start development server with live reload
npm start

# Or use:
npm run serve
```

This will:
- Build your site
- Start a local server (usually at http://localhost:8080)
- Watch for changes and automatically rebuild
- Refresh your browser when files change

## Building for Production

```bash
# Build the site
npm run build
```

This creates the `_site` folder with your complete website ready to deploy.

## How It Works

### Layouts

Pages use layouts defined in `src/_layouts/`. The base layout includes:
- HTML structure
- Meta tags
- CSS and JS includes
- Header and footer components

Example page frontmatter:
```yaml
---
layout: base.html
title: About Us
description: Learn about our mission
---
```

### Includes

Reusable components in `src/_includes/`:
- `header.html` - Site header with navigation
- `footer.html` - Site footer with links

These are included in layouts using: `{% include "header.html" %}`

### Active Navigation

The navigation automatically highlights the current page using:
```html
<a href="/about/" {% if page.url == "/about/" %}class="active"{% endif %}>About</a>
```

### Adding New Pages

1. Create a new HTML file in `src/` (e.g., `src/research.html`)
2. Add frontmatter:
```yaml
---
layout: base.html
title: Research
description: Our research projects
---
```
3. Add your content
4. Update navigation in `src/_includes/header.html` and `src/_includes/footer.html`

## Deploying to GitHub Pages

### Method 1: Using GitHub Actions (Recommended)

1. Create `.github/workflows/build.yml` in your repository:

```yaml
name: Build and Deploy

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build site
        run: npm run build
        
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./_site
```

2. Push to GitHub
3. Go to repository Settings > Pages
4. Set source to "gh-pages" branch
5. Your site will auto-deploy on every push!

### Method 2: Build Locally and Push

```bash
# Build the site
npm run build

# The _site folder contains your website
# Deploy _site folder to GitHub Pages manually
```

## Custom Domain Setup

Same as HTML version - add CNAME record pointing to your GitHub Pages URL.

In your repository, create a file `src/CNAME` containing:
```
familycourtmonitor.org.nz
```

Add to `.eleventy.js`:
```javascript
eleventyConfig.addPassthroughCopy("src/CNAME");
```

## Advantages Over Plain HTML

### Plain HTML
- ✅ Simple, no build step
- ✅ Easy to understand
- ❌ Lots of copy-paste (header/footer on every page)
- ❌ Tedious to update navigation
- ❌ Hard to maintain consistency

### Eleventy
- ✅ Reusable components (edit header once, updates everywhere)
- ✅ Easy to maintain consistency
- ✅ Simple to add blog posts or news
- ✅ Active navigation highlighting
- ✅ Flexible for future growth
- ❌ Requires Node.js and build step
- ❌ Slightly more complex initially

## When to Use Which?

**Use Plain HTML if:**
- You want absolute simplicity
- You have just a few pages
- You don't plan to update often
- You're not comfortable with Node.js

**Use Eleventy if:**
- You'll be updating content regularly
- You plan to add a blog or news section
- You want easier maintenance
- You're comfortable running `npm start`

## Converting Between Versions

**HTML → Eleventy:** Already done! Just use this version.

**Eleventy → HTML:** Run `npm run build` and use the `_site` folder contents.

## Troubleshooting

**Port already in use:**
```bash
# Change port in package.json or use:
npx @11ty/eleventy --serve --port=8081
```

**Build fails:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

**Changes not showing:**
- Check you're editing files in `src/`, not `_site/`
- Stop and restart the dev server
- Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)

## Next Steps

Same as HTML version - add additional pages:
- Research page
- Get Involved page
- FAQ page
- Resources page
- Privacy Policy

## Learn More

- [Eleventy Documentation](https://www.11ty.dev/docs/)
- [Eleventy Tutorial](https://www.11ty.dev/docs/getting-started/)

## License

Copyright 2025 Family Justice Monitor NZ. All rights reserved.
