# Deployment Guide

## GitHub Pages Deployment (Recommended)

### 1. Prepare Your Files
Make sure your project structure looks like this:
```
My portfolio/
├── index.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── script.js
│   ├── images/
│   │   ├── portfolio.jpg
│   │   ├── pothole-detection.png
│   │   ├── sentiment-analysis.jpeg
│   │   └── dajubhai.jpeg
│   └── documents/
│       └── Resume-Suprem.pdf
├── README.md
└── package.json
```

### 2. Create GitHub Repository
1. Go to [github.com](https://github.com) and create account
2. Click "New Repository"
3. Name it `suprem-portfolio` (or `your-username.github.io` for main site)
4. Make it public
5. Don't initialize with README (we already have files)

### 3. Upload Files to GitHub
**Option A: Using GitHub Web Interface**
1. Click "uploading an existing file"
2. Drag and drop all your files
3. Write commit message: "Initial portfolio upload"
4. Click "Commit changes"

**Option B: Using Git Commands**
```bash
git init
git add .
git commit -m "Initial portfolio upload"
git branch -M main
git remote add origin https://github.com/your-username/suprem-portfolio.git
git push -u origin main
```

### 4. Enable GitHub Pages
1. Go to repository Settings tab
2. Scroll to "Pages" section
3. Source: "Deploy from a branch"
4. Branch: "main" / "(root)"
5. Click Save

### 5. Access Your Site
Your site will be available at:
`https://your-username.github.io/suprem-portfolio`

## Alternative: Netlify Deployment

### Quick Deploy
1. Go to [netlify.com](https://netlify.com)
2. Sign up for free account
3. Drag your project folder to the deploy area
4. Your site is live instantly!

### Custom Domain (Optional)
1. Buy domain from any provider (Namecheap, GoDaddy, etc.)
2. In Netlify: Site Settings → Domain Management
3. Add your custom domain
4. Update DNS records as instructed

## Pre-Deployment Checklist

### ✅ Content Review
- [ ] Update email in contact section
- [ ] Add real project GitHub links
- [ ] Update certificate links
- [ ] Add LinkedIn profile URL
- [ ] Update phone number if needed

### ✅ File Check
- [ ] All images load correctly
- [ ] Resume PDF is accessible
- [ ] CSS and JS files linked properly
- [ ] No broken links
- [ ] All sections display correctly

### ✅ SEO Optimization
- [ ] Add meta description to `<head>`
- [ ] Add Open Graph tags
- [ ] Compress images for faster loading

## Post-Deployment

### Update Content
1. Edit files locally
2. Upload to GitHub (or drag to Netlify)
3. Changes go live automatically

### Monitor Performance
- Use Google PageSpeed Insights
- Check mobile responsiveness
- Test on different browsers

### Share Your Portfolio
- Add URL to LinkedIn profile
- Include in email signatures
- Share on social media
- Add to resume

## Support
If you need help with deployment:
1. Check the hosting provider's documentation
2. GitHub Pages: [docs.github.com/pages](https://docs.github.com/pages)
3. Netlify: [docs.netlify.com](https://docs.netlify.com)

Your portfolio is ready to impress! 🚀
