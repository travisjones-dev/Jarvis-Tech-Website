# Jarvis Technologies Inc - Website

A modern, professional website for Jarvis Technologies Inc, showcasing custom PC building services.

## Features

- **Single-Page Design**: Smooth scrolling navigation with distinct sections
- **Responsive Layout**: Fully mobile-friendly and tablet-optimized
- **Service Pricing Tiers**: Three build packages (Essential, Performance, Ultimate)
- **Build Gallery**: Showcase your completed PC builds with photos and specs
- **Contact Form**: Custom build inquiry form for potential clients
- **Modern UI**: Tech-focused design with gradient accents and smooth animations

## Getting Started

### Option 1: Open Locally
1. Navigate to the `jarvis-tech-website` folder
2. Double-click `index.html` to open in your browser
3. The website will load and work completely offline

### Option 2: Use a Local Server (Recommended)
Using a local server prevents any CORS issues and provides a better development experience.

**Using Python:**
```bash
cd jarvis-tech-website
python -m http.server 8000
```
Then open http://localhost:8000 in your browser

**Using Node.js:**
```bash
cd jarvis-tech-website
npx serve
```

**Using VS Code:**
- Install the "Live Server" extension
- Right-click on `index.html` and select "Open with Live Server"

## Customization Guide

### 1. Update Contact Information

**Email Address:**
- Open `index.html`
- Find `info@jarvistechnologies.com` (appears in footer and contact section)
- Replace with your actual email

**Phone Number:**
- Open `index.html`
- Line ~520: Update the placeholder "Add your number" with your phone

### 2. Add Your PC Build Photos

**Replace Placeholder Images:**
- Take high-quality photos of your completed builds
- Save them in the `jarvis-tech-website` folder (e.g., `build1.jpg`, `build2.jpg`)
- Open `index.html`
- Find the `.build-image-placeholder` divs in the Builds Gallery section
- Replace with actual images:

```html
<!-- Replace this: -->
<div class="build-image-placeholder">...</div>

<!-- With this: -->
<img src="build1.jpg" alt="Custom PC Build" style="width: 100%; height: 100%; object-fit: cover;">
```

**Add Build Specifications:**
- Update the build titles (e.g., "Sunday Special Build")
- Add component details in the spec badges:

```html
<div class="build-specs">
    <span class="spec-badge">RTX 4080</span>
    <span class="spec-badge">i9-13900K</span>
    <span class="spec-badge">32GB DDR5</span>
</div>
```

### 3. Customize Pricing

Open `index.html` and find the Services section to update:
- Price ranges
- Feature lists
- Package names

### 4. Update Company Information

**About Section:**
- Open `index.html`
- Find the About section (~435)
- Update the company description and story

**Add Company Photo:**
- Save an image of your workspace or team
- Replace the `.about-image-placeholder` similar to build images

### 5. Customize Colors & Branding

Open `styles.css` and modify the color variables at the top:

```css
:root {
    --primary: #00d4ff;        /* Main accent color */
    --secondary: #6366f1;      /* Secondary accent */
    --accent: #ec4899;         /* Additional accent */
}
```

### 6. Add Your Logo

If you have a logo:
1. Save it as `logo.png` in the `jarvis-tech-website` folder
2. Open `index.html`
3. Replace the text logo in the navbar with:

```html
<div class="nav-brand">
    <img src="logo.png" alt="Jarvis Technologies" style="height: 50px;">
</div>
```

## Deploying Your Website

### Free Hosting Options:

**1. GitHub Pages (Recommended)**
```bash
# Create a GitHub account at github.com
# Create a new repository named "jarvis-tech-website"
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR-USERNAME/jarvis-tech-website.git
git push -u origin main
```
Then enable GitHub Pages in repository settings.

**2. Netlify**
- Create account at netlify.com
- Drag and drop the `jarvis-tech-website` folder
- Your site will be live instantly
- Free custom domain support

**3. Vercel**
- Create account at vercel.com
- Import the project
- Automatic deployments on every update

### Custom Domain

Once deployed, you can connect a custom domain like `jarvistechnologies.com`:
1. Purchase domain from Namecheap, GoDaddy, or Google Domains
2. Follow your hosting provider's instructions to connect the domain
3. Update the email address to use your custom domain

## Form Submission

The contact form currently opens your email client. To collect form submissions automatically:

### Option 1: Formspree (Easiest)
1. Sign up at formspree.io
2. Create a form and get your form endpoint
3. Update the form in `script.js`:

```javascript
buildForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const formData = new FormData(buildForm);

    await fetch('YOUR_FORMSPREE_ENDPOINT', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
    });

    showNotification('Thank you! We\'ll be in touch soon.', 'success');
    buildForm.reset();
});
```

### Option 2: EmailJS
- Sign up at emailjs.com
- Free tier includes 200 emails/month
- No backend required

### Option 3: Custom Backend
- Build a backend with Node.js, Python, or PHP
- Connect to email service like SendGrid or Mailgun

## File Structure

```
jarvis-tech-website/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── script.js           # JavaScript functionality
└── README.md          # This file
```

## Adding a Blog or News Section

To add blog posts in the future:
1. Create a new section in `index.html` after the Builds section
2. Style it similarly to the builds grid
3. Consider using a static site generator like Jekyll or Hugo for easier blog management

## SEO Optimization

### Add Meta Tags
Add these to the `<head>` section of `index.html`:

```html
<meta name="description" content="Jarvis Technologies Inc - Custom PC builds tailored to your needs. Gaming, workstation, and professional computer builds.">
<meta name="keywords" content="custom PC, gaming PC, computer build, PC builder, custom computers">
<meta property="og:title" content="Jarvis Technologies Inc - Custom PC Builds">
<meta property="og:description" content="Expert custom PC building services">
<meta property="og:image" content="preview-image.jpg">
```

### Create a Sitemap
After deploying, submit your site to:
- Google Search Console
- Bing Webmaster Tools

## Future Enhancements

Ideas to expand your website:
- Customer testimonials section
- PC build configurator/calculator
- Blog for tech tips and build guides
- Order tracking system
- Before/after photo galleries
- Video showcase of builds
- Live chat support
- Newsletter signup

## Support

If you need help customizing the website:
1. Check this README for common tasks
2. Review the comments in the code files
3. Modify one section at a time and test changes
4. Keep backups before making major changes

## Browser Compatibility

This website works on:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This website was custom-built for Jarvis Technologies Inc.

---

**Built with:** HTML5, CSS3, JavaScript
**Last Updated:** January 2026

For questions or custom modifications, refer to the inline code comments or reach out for support.
