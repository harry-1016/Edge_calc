# 🏏 T20 Betting Calculator

A Progressive Web App for calculating betting suggestions on T20 cricket matches - focused on **Match Odds**, **Over/Under**, and **Runline** betting markets.

## Features

### 📊 Three Betting Markets

#### 1. Match Odds
Calculate which team has betting value based on:
- Recent form (win percentage)
- Squad quality ratings
- Bookmaker odds comparison
- Clear bet suggestions with edge calculations

#### 2. Over/Under (Totals)
Predict if total runs will be over or under the line:
- Batting team's average scores
- Powerplay strike rate analysis
- Bowling team's runs conceded
- Economy rate adjustments
- Expected score calculations

#### 3. Runline (Handicap)
Calculate if teams will cover the runline:
- Historical win margins
- Team form analysis
- Favorite/underdog dynamics
- Margin of victory predictions

### 🎯 Smart Suggestions
- **Clear recommendations**: BET, SMALL EDGE, or NO BET
- **Value calculations**: Shows your edge percentage vs bookmaker odds
- **Kelly Criterion staking**: Suggests optimal bet size (25% Kelly)
- **Minimum 3% edge**: Only recommends bets with meaningful value

### 📝 Bet Tracking
- Log all your bets with detailed records
- Track results (Won/Lost/Pending)
- Performance statistics:
  - Total bets placed
  - Win rate percentage
  - Total profit/loss
  - ROI (Return on Investment)
- Filter by bet type

### 🚀 PWA Features
- Install on phone home screen
- Works offline after first load
- Fast, app-like experience
- No app store needed

## How to Use

### Match Odds
1. Enter team names
2. Input recent form percentages (last 10 matches)
3. Rate squad quality (0-100)
4. Enter bookmaker odds for both teams
5. Get suggestion with recommended stake

### Over/Under
1. Enter batting team
2. Input the bookmaker's total runs line
3. Add batting team's average score and powerplay SR
4. Enter bowling team's runs conceded and economy rate
5. Get over/under suggestion with expected score

### Runline
1. Enter both team names
2. Input the runline value (e.g., -10.5, +10.5)
3. Select which team is favored
4. Enter average win margins for both teams
5. Add recent form percentages
6. Get runline covering probability and suggestion

## Calculation Methods

### Match Odds Algorithm
- Base probability: 50/50
- Form adjustment: 40% weight on recent form difference
- Squad quality: 30% weight on rating difference
- Compare to implied probability from bookmaker odds
- Recommend bet if edge > 3%

### Over/Under Algorithm
- Start with batting team's average score
- Adjust for powerplay strength (±10 runs)
- Adjust for bowling quality (±8 runs)
- Adjust for economy rate (±5 runs)
- Calculate margin vs bookmaker line
- Convert margin to probability
- Recommend bet if edge > 3%

### Runline Algorithm
- Calculate expected win margin for favorite
- Factor in form difference (15% weight)
- Compare to runline spread
- Adjust probability based on margin difference
- Recommend bet if edge > 3%

## Installation

### Quick Deploy Options

#### 1. GitHub Pages (Free)
```bash
1. Create new repository on github.com
2. Upload all files
3. Go to Settings → Pages
4. Set source to "main" branch
5. Your app is live!
```

#### 2. Vercel (Recommended)
```bash
1. Push code to GitHub
2. Visit vercel.com
3. Import your repository
4. Click Deploy
5. Get instant custom URL
```

#### 3. Netlify Drop
```bash
1. Visit netlify.com/drop
2. Drag entire folder onto page
3. Instant deployment!
```

### Local Development
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server -p 8000

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000`

## Required Files

- ✅ **index.html** - Main app interface
- ✅ **app.js** - All calculation logic
- ✅ **sw.js** - Service worker (offline support)
- ✅ **manifest.json** - PWA configuration
- ⚠️ **icon-192.png** - App icon (192x192 px) - YOU NEED TO CREATE THIS
- ⚠️ **icon-512.png** - App icon (512x512 px) - YOU NEED TO CREATE THIS

## Creating Icons

You need two PNG icons for the app to install properly:

**Design tips:**
- Use a cricket ball, bat, or chart symbol
- Simple design that works at small sizes
- Background color: #667eea (matches app theme)
- White or contrasting foreground

**Easy tools:**
- [Canva](https://canva.com) - Free templates
- [Figma](https://figma.com) - Professional design
- [Favicon.io](https://favicon.io) - Generate from text/emoji

## Betting Guidelines

### Minimum Requirements
- **Minimum edge**: 3% to overcome bookmaker margin
- **Small edge (0-3%)**: Proceed with extreme caution
- **Negative edge**: Always avoid

### Bankroll Management
- App suggests 25% Kelly Criterion
- Never risk more than 2-3% on a single bet
- Track minimum 50-100 bets to verify edge
- Adjust stakes based on confidence

### Data Sources
- **Team stats**: ESPNcricinfo, Cricbuzz
- **Historical data**: Cricsheet.org
- **Team news**: Official team social media
- **Pitch reports**: Venue-specific cricket sites

## Technology

- **Frontend**: Vanilla JavaScript (no dependencies)
- **Storage**: LocalStorage for bet log
- **PWA**: Service Worker for offline capability
- **Styling**: Pure CSS with responsive design
- **No backend required** - runs entirely in browser

## Browser Support

- ✅ Chrome/Edge 90+
- ✅ Safari 14+
- ✅ Firefox 88+
- ✅ iOS Safari
- ✅ Chrome Android

## Customization

All calculations can be adjusted in `app.js`:

```javascript
// Change minimum edge threshold
if (edge > 3) { // Change 3 to your preference

// Adjust Kelly fraction
const stake = 100 * 0.25 // Change 0.25 to adjust stake sizing

// Modify form weight
probA += (formA - formB) * 0.4; // Change 0.4 to adjust influence
```

## Tips for Best Results

1. **Use accurate data**: Recent form and stats are crucial
2. **Track all bets**: You need volume to verify edge
3. **Be disciplined**: Only bet when suggested edge > 3%
4. **Adjust for conditions**: Consider pitch, weather, toss
5. **Shop for odds**: Different bookmakers = better prices
6. **Never chase losses**: Stick to calculated stakes

## Disclaimer

⚠️ **Important Notice**

- This tool is for **educational purposes only**
- Not financial or betting advice
- Betting involves risk of loss
- Only bet what you can afford to lose
- Check local gambling laws and regulations
- Past performance doesn't guarantee future results
- Calculations are estimates, not guarantees
- Always gamble responsibly

## Contributing

Pull requests welcome! Ideas for improvement:
- Additional markets (player props, boundary totals)
- More sophisticated probability models
- Machine learning integration
- Data visualization charts
- CSV export for bet log
- Dark mode theme
- Multi-language support

## Support

- 📖 Check this README for usage help
- 🐛 Report issues on GitHub
- ⭐ Star the repo if useful!

## License

MIT License - Free to use and modify

---

Made with 🏏 for cricket betting enthusiasts

**Version 2.0** - Now with Runline, Over/Under & Match Odds
