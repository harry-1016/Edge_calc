# 🚀 Deployment Checklist

## ✅ Pre-Deployment

- [ ] **Extract the ZIP file**
  - Unzip `t20-betting-calculator.zip`
  - You should see 10 files

- [ ] **Create Icons** (REQUIRED for PWA installation)
  - [ ] Create `icon-192.png` (192x192 pixels)
  - [ ] Create `icon-512.png` (512x512 pixels)
  - [ ] See ICONS.md for easy methods
  - [ ] Place them in the same folder as index.html

## 📦 Files Checklist

Your extracted folder should contain:

**Core App Files:**
- [ ] index.html - Main app interface
- [ ] app.js - Calculation logic
- [ ] sw.js - Service worker
- [ ] manifest.json - PWA config

**Documentation:**
- [ ] README.md - Complete guide
- [ ] QUICKSTART.md - Fast setup
- [ ] ICONS.md - Icon creation guide
- [ ] TROUBLESHOOTING.md - Fix common issues
- [ ] SUMMARY.md - Overview
- [ ] DEPLOYMENT-CHECKLIST.md - This file

**Optional:**
- [ ] icon.svg - Template for creating icons
- [ ] icon-192.png - YOU MUST CREATE
- [ ] icon-512.png - YOU MUST CREATE

## 🎨 Create Your Icons First

**Don't skip this!** The app won't install to home screen without icons.

### Fastest Method (5 minutes):
1. Go to https://favicon.io/favicon-generator/
2. Settings:
   - Text: 🏏 (cricket emoji)
   - Background: #667eea
   - Font: Any bold font
   - Size: Large
3. Click "Generate"
4. Download the files
5. Resize the largest to 512x512 and 192x192
6. Name them: `icon-192.png` and `icon-512.png`
7. Place in app folder

**Alternative:** Use Canva, Figma, or any design tool. See ICONS.md for details.

## 🌐 Choose Your Deployment Method

### Option 1: Netlify Drop (Easiest - 2 minutes)

**Steps:**
1. [ ] Go to https://netlify.com/drop
2. [ ] Drag entire folder (with icons!) onto page
3. [ ] Wait 30 seconds
4. [ ] Get your live URL!

**Pros:**
- ✅ Instant deployment
- ✅ Automatic HTTPS
- ✅ No account needed
- ✅ Custom domain later (optional)

**URL format:** `random-name-12345.netlify.app`

---

### Option 2: GitHub Pages (Free Forever - 5 minutes)

**Steps:**
1. [ ] Create GitHub account (if needed)
2. [ ] Create new repository
   - Name: `t20-betting-calculator`
   - Public repository
3. [ ] Upload all files:
   - Click "Add file" → "Upload files"
   - Drag all files including icons
   - Commit changes
4. [ ] Enable GitHub Pages:
   - Go to Settings
   - Scroll to "Pages"
   - Source: Deploy from branch "main"
   - Click Save
5. [ ] Wait 2-3 minutes
6. [ ] Visit: `https://YOUR-USERNAME.github.io/t20-betting-calculator/`

**Pros:**
- ✅ Free forever
- ✅ Automatic HTTPS
- ✅ Easy updates (just upload new files)
- ✅ Good for portfolios

**URL format:** `https://yourusername.github.io/t20-betting-calculator/`

---

### Option 3: Vercel (Best for Custom Domains - 3 minutes)

**Steps:**
1. [ ] Push code to GitHub first (see Option 2, steps 1-3)
2. [ ] Go to https://vercel.com
3. [ ] Sign up with GitHub
4. [ ] Click "New Project"
5. [ ] Import your repository
6. [ ] Click "Deploy"
7. [ ] Get instant URL!

**Pros:**
- ✅ Fastest deploys
- ✅ Automatic HTTPS
- ✅ Easy custom domains
- ✅ Auto-deploys on GitHub push
- ✅ Free hobby plan

**URL format:** `t20-betting-calculator.vercel.app`

---

### Option 4: Local Testing (Before deploying)

**For testing on your computer:**

```bash
# Navigate to app folder
cd path/to/t20-betting-calculator

# Start local server (choose one):

# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js
npx http-server -p 8000

# PHP
php -S localhost:8000
```

Then visit: `http://localhost:8000`

**Note:** Service Worker requires HTTPS or localhost to work!

## 📱 Post-Deployment Testing

After deploying, test everything:

### Basic Functionality:
- [ ] Site loads correctly
- [ ] All three bet type tabs work (Match Odds, Over/Under, Runline)
- [ ] Enter sample data in each calculator
- [ ] Click "Calculate Bet Suggestion"
- [ ] Results display correctly
- [ ] Bet Log tab opens
- [ ] Can add a test bet
- [ ] Statistics update

### PWA Features (if icons added):
- [ ] "Install App" prompt appears (may take a few seconds)
- [ ] Can install to home screen
- [ ] Icon appears correctly
- [ ] App opens in standalone mode
- [ ] Works offline after first visit

### Mobile Testing:
- [ ] Open on mobile browser
- [ ] Layout looks good
- [ ] All inputs are tappable
- [ ] Can add to home screen
- [ ] Touch interactions work smoothly

## 🔧 Common Issues

### Issue: Service Worker Error
**Solution:** See TROUBLESHOOTING.md
- Must use HTTPS or localhost
- Clear browser cache and try again

### Issue: Can't Install to Home Screen
**Solution:** 
- Make sure icons are created and uploaded
- Check file names: `icon-192.png` and `icon-512.png` (exact)
- Try on mobile device (works better than desktop)

### Issue: Site Not Loading
**Solution:**
- Check if all files uploaded
- Verify index.html is in root directory
- Wait 2-3 minutes after deployment
- Hard refresh: Ctrl+Shift+R

### Issue: Calculations Not Working
**Solution:**
- Check browser console (F12) for errors
- Make sure app.js uploaded correctly
- Try different browser

## 📊 Using the App

### Quick Start:
1. **Choose bet type** - Match Odds (easiest to start)
2. **Enter team names** - Any T20 teams
3. **Add statistics** - Use recent form percentages
4. **Enter odds** - From your bookmaker
5. **Calculate** - See if there's value
6. **Only bet if edge > 3%**
7. **Use suggested stake** - Based on Kelly Criterion
8. **Log the bet** - Track in Bet Log tab

### Tips:
- Start with Match Odds (simplest)
- Use accurate, recent data
- Only bet when app suggests (edge > 3%)
- Track minimum 50-100 bets
- Review ROI regularly
- Adjust if not profitable after 100 bets

## 🎯 Success Metrics

After 50+ tracked bets, you should see:
- **ROI > 5%** = System working well
- **ROI 0-5%** = Marginal, keep tracking
- **ROI < 0%** = Reassess data quality or strategy

## 📞 Support

**If you need help:**
1. Check TROUBLESHOOTING.md
2. Review README.md
3. Re-read QUICKSTART.md
4. Verify all files uploaded correctly

## 🎉 You're Ready!

Once you check all boxes above:
- ✅ Icons created
- ✅ Deployed to hosting
- ✅ Tested all features
- ✅ Added first test bet

**You're ready to start finding betting value!**

---

## 📋 Quick Reference

**Files needed:** 10 core files + 2 icons (12 total)
**Time to deploy:** 2-5 minutes
**Cost:** Free (all options)
**Maintenance:** None needed

**Recommended path:**
1. Create icons (5 min)
2. Deploy to Netlify Drop (2 min)
3. Test all features (5 min)
4. Start using! (ongoing)

---

Good luck with your betting calculator! 🏏💰

*Remember: This is an educational tool. Bet responsibly and within your means.*
