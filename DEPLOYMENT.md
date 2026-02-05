# 🚀 Deployment Guide

Complete guide to deploy your T20 Betting Edges PWA to GitHub and various hosting platforms.

## Quick Start (GitHub + GitHub Pages)

### Step 1: Create GitHub Repository

1. Go to [github.com](https://github.com) and log in
2. Click the "+" icon → "New repository"
3. Repository settings:
   - Name: `t20-betting-edges-pwa`
   - Description: "Progressive Web App for T20 cricket betting analysis"
   - Public (required for free GitHub Pages)
   - Do NOT initialize with README (we already have one)
4. Click "Create repository"

### Step 2: Upload Files to GitHub

**Option A: Using GitHub Web Interface (Easiest)**

1. On your new repository page, click "uploading an existing file"
2. Drag and drop ALL files from the project folder:
   - index.html
   - app.js
   - sw.js
   - manifest.json
   - icon-192.png
   - icon-512.png
   - README.md
   - .gitignore
3. Add commit message: "Initial commit"
4. Click "Commit changes"

**Option B: Using Git Command Line**

```bash
# Navigate to your project folder
cd path/to/t20-betting-edges-pwa

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Add GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/t20-betting-edges-pwa.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll to "Pages" in left sidebar
4. Under "Source":
   - Branch: `main`
   - Folder: `/ (root)`
5. Click "Save"
6. Wait 2-5 minutes for deployment

Your app will be live at:
```
https://YOUR_USERNAME.github.io/t20-betting-edges-pwa/
```

### Step 4: Test Your PWA

1. Open the live URL on your phone
2. For iPhone:
   - Safari → Share button → "Add to Home Screen"
3. For Android:
   - Chrome → Menu (⋮) → "Add to Home screen"
4. Test offline: Close browser, open from home screen

---

## Alternative Deployment Options

### 🟢 Vercel (Recommended - Fastest CDN)

**Pros:** Free, fast global CDN, automatic HTTPS, custom domains

**Steps:**

1. Push code to GitHub (follow steps above)

2. Go to [vercel.com](https://vercel.com)

3. Click "Sign up" → Choose "Continue with GitHub"

4. Click "Add New Project"

5. Import your repository: `t20-betting-edges-pwa`

6. Click "Deploy" (no configuration needed!)

7. Done! You'll get a URL like: `t20-betting-edges-pwa.vercel.app`

**Custom Domain (Optional):**
- Go to Project Settings → Domains
- Add your domain and follow DNS instructions

---

### 🔵 Netlify

**Pros:** Free, drag-and-drop deployment, form handling

**Steps:**

1. Go to [netlify.com](https://netlify.com)

2. Sign up with GitHub

3. Click "Add new site" → "Import an existing project"

4. Choose GitHub → Select your repository

5. Build settings: Leave empty (static site)

6. Click "Deploy site"

7. Your URL: `random-name-123.netlify.app`

**Drag-and-Drop Alternative:**
- Just drag the entire project folder onto netlify.com/drop
- Instant deployment!

---

### 🟣 Cloudflare Pages

**Pros:** Free unlimited bandwidth, amazing speed

**Steps:**

1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)

2. Sign up → Connect GitHub

3. Click "Create a project"

4. Select your repository

5. Build settings: None needed

6. Click "Save and Deploy"

---

### 🔴 Firebase Hosting (Google)

**Pros:** Free tier, Google infrastructure

**Setup:**

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize (in project folder)
firebase init hosting

# Select:
# - Use existing project or create new
# - Public directory: . (current directory)
# - Single page app: No
# - Don't overwrite files

# Deploy
firebase deploy
```

---

## Testing PWA Features

### Desktop (Chrome/Edge)

1. Open DevTools (F12)
2. Go to "Application" tab
3. Check:
   - Manifest: Should show app details
   - Service Workers: Should be registered
   - Storage: LocalStorage for bet log

### Lighthouse PWA Audit

1. Open DevTools → Lighthouse tab
2. Select "Progressive Web App"
3. Click "Generate report"
4. Should score 90+ for full PWA

### Mobile Testing

**iOS Safari:**
- Share → Add to Home Screen
- Open from home screen (should feel like native app)
- Turn off wifi → should still work offline

**Android Chrome:**
- Menu → Install app
- Find icon on home screen
- Test offline functionality

---

## Troubleshooting

### Icons Not Showing

**Problem:** Default browser icon appears

**Solutions:**
1. Clear browser cache (Cmd+Shift+R or Ctrl+Shift+R)
2. Check icons are 192x192 and 512x512 PNG
3. Verify manifest.json paths are correct
4. Wait 24 hours for CDN cache

### PWA Not Installing

**Problem:** No "Add to Home Screen" option

**Solutions:**
1. Must be served over HTTPS (GitHub Pages does this)
2. Service worker must register successfully
3. Manifest must be valid JSON
4. Icons must be correct sizes

### Service Worker Not Updating

**Problem:** Old version cached

**Solutions:**
1. Update CACHE_NAME in sw.js (e.g., 'v2')
2. Hard refresh: Ctrl+Shift+R
3. DevTools → Application → Service Workers → Unregister

### Bet Log Data Lost

**Problem:** LocalStorage cleared

**Note:** This is expected behavior. Consider adding:
```javascript
// Export function
function exportBets() {
    const data = JSON.stringify(betLog, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bet-log.json';
    a.click();
}
```

---

## Custom Domain Setup

### GitHub Pages

1. Buy domain (Namecheap, GoDaddy, etc.)

2. Add CNAME file to repository:
```
yourdomain.com
```

3. In GitHub Settings → Pages:
   - Enter custom domain
   - Enable HTTPS (automatic)

4. Update DNS (at domain registrar):
```
Type: A
Host: @
Value: 185.199.108.153 (and 109.153, 110.153, 111.153)

Type: CNAME
Host: www
Value: YOUR_USERNAME.github.io
```

### Vercel Custom Domain

1. Project Settings → Domains
2. Add domain
3. Follow DNS instructions
4. Automatic HTTPS

---

## Performance Optimization

### Image Optimization
Already optimized! Icons are minimal PNG files.

### Code Minification (Optional)
For production, consider:

```bash
# Install minifier
npm install -g terser html-minifier

# Minify JS
terser app.js -o app.min.js -c -m

# Minify HTML
html-minifier --collapse-whitespace --remove-comments --minify-css index.html -o index.min.html
```

### Service Worker Caching
Already implemented! App works fully offline after first load.

---

## Analytics (Optional)

### Add Google Analytics

Add before closing `</head>` in index.html:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## Security Considerations

### Content Security Policy (Optional)

Add to `<head>` for extra security:

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; style-src 'self' 'unsafe-inline';">
```

### HTTPS Only
All deployment options (GitHub Pages, Vercel, Netlify) provide automatic HTTPS.

---

## Updating Your App

### Making Changes

1. Edit files locally
2. Test changes (open index.html in browser)
3. Update CACHE_NAME in sw.js (important!)
4. Push to GitHub:

```bash
git add .
git commit -m "Description of changes"
git push
```

5. Changes deploy automatically (1-5 minutes)

### Version Control

Keep track of versions in manifest.json:
```json
{
  "version": "1.0.1",
  ...
}
```

---

## Support & Community

- **Issues:** Open on GitHub repository
- **Stars:** Star the repo if useful!
- **Forks:** Feel free to fork and customize
- **Pull Requests:** Contributions welcome

---

## Next Steps

After deployment:

1. ✅ Test on multiple devices
2. ✅ Share with friends
3. ✅ Track your betting performance
4. ✅ Star the GitHub repo
5. ✅ Consider contributing improvements

---

## Need Help?

Common questions:

**Q: Can I use this commercially?**
A: Yes, MIT License allows commercial use.

**Q: How do I add more features?**
A: Fork the repo, make changes, test, then deploy.

**Q: Is my bet data private?**
A: Yes! Everything stored locally (LocalStorage). Never sent to server.

**Q: Can I use my own domain?**
A: Yes! Follow custom domain setup above.

---

Made with 🏏 by the cricket betting community
