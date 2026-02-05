# 🏏 T20 Betting Edges PWA

A Progressive Web App for finding value bets in T20 cricket using data-driven analysis.

## Features

### 📊 Pre-Match Calculator
- Calculate win probabilities based on team strengths
- Compare with bookmaker odds to find edges
- Automatic Kelly Criterion stake suggestions
- Factors: Recent form, squad quality, powerplay strength, death bowling, venue conditions

### ⚡ Live Match Tracker
- Real-time win probability during matches
- Identify in-play betting opportunities
- Adjust for batsmen/bowler quality
- Track required run rate and wickets

### 📝 Bet Log
- Track all your bets with detailed records
- Automatic profit/loss calculation
- Performance statistics (ROI, win rate)
- Filter by bet type and league

### 🚀 PWA Features
- Install on home screen (iOS/Android)
- Works offline after first load
- Fast loading and smooth performance
- Mobile-optimized interface

## Installation

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/t20-betting-edges-pwa.git
cd t20-betting-edges-pwa
```

2. Serve the files using any local server:

**Using Python:**
```bash
python -m http.server 8000
```

**Using Node.js (http-server):**
```bash
npx http-server -p 8000
```

**Using PHP:**
```bash
php -S localhost:8000
```

3. Open browser to `http://localhost:8000`

### GitHub Pages Deployment

1. Push code to GitHub repository

2. Go to repository Settings → Pages

3. Select source: Deploy from branch `main` (or `gh-pages`)

4. Your app will be live at: `https://YOUR_USERNAME.github.io/t20-betting-edges-pwa/`

### Vercel Deployment (Recommended)

1. Push to GitHub

2. Import project to Vercel:
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Deploy (no configuration needed)

3. Your app will be live with custom domain support

### Netlify Deployment

1. Push to GitHub

2. Connect to Netlify:
   - Visit [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import existing project"
   - Connect GitHub repo
   - Deploy

## Creating App Icons

You need to create two PNG icons:
- `icon-192.png` (192x192 pixels)
- `icon-512.png` (512x512 pixels)

**Design tips:**
- Use a cricket-related icon (ball, bat, chart)
- Simple, clear design that works at small sizes
- Solid background color matching theme (#667eea)

**Tools to create icons:**
- [Canva](https://canva.com) - Free online design
- [Figma](https://figma.com) - Professional design tool
- [Favicon.io](https://favicon.io) - Generate from text/emoji

## Usage Guide

### Finding Pre-Match Edges

1. Enter both team names and venue
2. Input team strength metrics:
   - Recent form (last 10 matches win %)
   - Squad quality rating (0-100)
   - Powerplay scoring rate
   - Death bowling economy
3. Add venue conditions (dew, pitch type)
4. Enter bookmaker odds
5. Click "Calculate Edge"
6. Look for 5%+ edge before betting

### Live Betting

1. Enter batting team and target
2. Update current score and wickets
3. Input overs completed
4. Enter current odds from bookmaker
5. Adjust for batsmen/bowler quality
6. Calculate to see if edge exists

### Tracking Performance

1. Add each bet to the log after placing
2. Update result when match completes
3. Review statistics to verify your edge
4. Need 100+ bets to confirm consistent edge

## Key Betting Principles

### Edge Requirements
- **Minimum edge:** 5% to overcome bookmaker margin
- **Small edge (0-5%):** Proceed with extreme caution
- **Negative edge:** Avoid the bet

### Bankroll Management
- Use Kelly Criterion (app suggests 25% Kelly)
- Never risk more than 2-3% on single bet
- Track all bets to verify long-term edge

### Data Sources
- ESPNcricinfo for stats
- Team news from official sources
- Pitch reports from venue
- Historical data from Cricsheet.org

## Technology Stack

- **Frontend:** Vanilla JavaScript (no dependencies)
- **Storage:** LocalStorage for bet log
- **PWA:** Service Worker for offline support
- **Styling:** Pure CSS with responsive design
- **No backend required** - runs entirely client-side

## Browser Support

- Chrome/Edge 90+
- Safari 14+
- Firefox 88+
- Mobile browsers (iOS Safari, Chrome Android)

## Contributing

Pull requests welcome! Areas for improvement:
- More sophisticated probability models
- Additional bet types (player props, totals)
- Data visualization (charts)
- Export bet log to CSV
- Dark mode

## Disclaimer

⚠️ **Important:** This tool is for educational and entertainment purposes only. 

- Not financial advice
- Betting involves risk of loss
- Only bet what you can afford to lose
- Check local gambling laws
- Past performance doesn't guarantee future results
- The app's calculations are estimates, not guarantees

## License

MIT License - feel free to use and modify

## Support

For issues or questions:
- Open GitHub issue
- Check existing issues for solutions
- Star the repo if you find it useful!

---

Made with 🏏 for cricket betting enthusiasts
