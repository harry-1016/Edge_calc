# 🏏 T20 Betting Calculator - Quick Start

## What You Got

A complete PWA for calculating T20 cricket betting suggestions across three major markets!

### Files Included:
- ✅ **index.html** - Main app interface
- ✅ **app.js** - Calculation logic for all bet types
- ✅ **sw.js** - Service worker (offline support)
- ✅ **manifest.json** - PWA configuration
- ✅ **README.md** - Full documentation
- ⚠️ **icon-192.png** - YOU NEED TO CREATE THIS (192x192 px)
- ⚠️ **icon-512.png** - YOU NEED TO CREATE THIS (512x512 px)

## 🚀 Deploy in 3 Minutes

### Option 1: Netlify Drop (Easiest)
1. Go to [netlify.com/drop](https://netlify.com/drop)
2. Drag the entire folder onto the page
3. Instant deployment! ✅

### Option 2: GitHub Pages (Free Forever)
1. Go to [github.com](https://github.com) → Create new repository
2. Name it `t20-betting-calculator`
3. Upload all files (drag & drop)
4. Go to Settings → Pages
5. Set Source to "main" branch
6. Live at: `https://YOUR_USERNAME.github.io/t20-betting-calculator/`

### Option 3: Vercel (Fastest with Custom Domain)
1. Push to GitHub first (see option 2)
2. Go to [vercel.com](https://vercel.com) → Sign up with GitHub
3. Import your repository
4. Click Deploy
5. Get instant custom URL!

## 📊 Three Betting Markets

### 1. Match Odds (Win/Loss)
**Use when:** You want to bet on which team will win

**What to enter:**
- Team names
- Recent form % (last 10 matches)
- Squad quality ratings (0-100)
- Bookmaker odds for both teams

**You get:**
- Win probability for each team
- Value edge vs bookmaker
- BET / NO BET suggestion
- Recommended stake amount

### 2. Over/Under (Total Runs)
**Use when:** You want to bet on total runs scored

**What to enter:**
- Bookmaker's total runs line (e.g., 165.5)
- Batting team's average score
- Powerplay strike rate
- Bowling team's runs conceded
- Economy rate

**You get:**
- Expected total score
- Over/Under probabilities
- Value edge calculation
- BET OVER / BET UNDER / NO BET
- Recommended stake

### 3. Runline (Handicap/Spread)
**Use when:** You want to bet on margin of victory

**What to enter:**
- Runline value (e.g., -10.5 or +10.5)
- Which team is favored
- Average win margins for both teams
- Recent form percentages

**You get:**
- Expected win margin
- Covering probability
- Value edge vs bookmaker
- BET suggestion with stake

## 🎯 How Each Calculator Works

### Match Odds Logic
```
1. Start at 50/50
2. Adjust for form difference (40% weight)
3. Adjust for squad quality (30% weight)
4. Compare to bookmaker implied probability
5. Recommend if edge > 3%
```

### Over/Under Logic
```
1. Start with team's average score
2. Adjust for powerplay strength (±10 runs)
3. Adjust for bowling quality (±8 runs)
4. Adjust for economy rate (±5 runs)
5. Compare to bookmaker line
6. Recommend if edge > 3%
```

### Runline Logic
```
1. Calculate expected win margin
2. Factor in form difference
3. Compare to runline spread
4. Calculate covering probability
5. Recommend if edge > 3%
```

## 📱 Using the App

### Step-by-Step
1. **Choose bet type** - Click Match Odds, Over/Under, or Runline
2. **Enter match details** - Team names and relevant stats
3. **Add bookmaker odds** - Enter the odds you're seeing
4. **Click Calculate** - Get instant suggestion
5. **Review edge** - Only bet if edge > 3%
6. **Use suggested stake** - Follow Kelly Criterion recommendation
7. **Log the bet** - Track in Bet Log tab
8. **Update result** - Mark as Won/Lost when match ends

### Understanding Results

**BET [Team/Market]** = ✅ Good value found, recommended bet
**SMALL EDGE - Caution** = ⚠️ Marginal value, bet carefully or skip
**NO BET - No value** = ❌ Avoid this bet, no edge

**Edge Percentage:**
- 5%+ = Strong bet
- 3-5% = Good bet
- 0-3% = Weak, be cautious
- Negative = Never bet

**Suggested Stake:**
- Based on 25% Kelly Criterion
- Calculated from $100 bankroll
- Scale to your actual bankroll
- Never bet more than you can afford

## 📝 Bet Log Features

### Tracking Your Bets
1. Go to "Bet Log" tab
2. Fill in bet details after placing
3. Select result when match ends
4. View updated statistics

### Performance Stats
- **Total Bets** - Number of settled bets
- **Win Rate** - Percentage of winning bets
- **Total P/L** - Overall profit or loss
- **ROI** - Return on investment percentage

### Why Track?
- Verify your edge over 50-100 bets
- Identify which markets work best
- Adjust strategy based on results
- Stay disciplined with bankroll

## ⚠️ Before You Start

### Create Your Icons!
The app won't install without icons. Quick options:

**Option A: Use Canva**
1. Go to [canva.com](https://canva.com)
2. Create 192x192 and 512x512 designs
3. Use cricket ball emoji 🏏 or sports icon
4. Background: #667eea (purple)
5. Save as PNG

**Option B: Use Emoji**
1. Go to [favicon.io](https://favicon.io)
2. Choose text to icon
3. Enter 🏏 emoji
4. Generate and download
5. Resize to 192x192 and 512x512

**Option C: Quick Fix**
1. Find any cricket image online
2. Resize to 192x192 and 512x512 pixels
3. Save as icon-192.png and icon-512.png

### Important Betting Rules
✅ **DO:**
- Only bet when edge > 3%
- Track every single bet
- Use suggested stake sizes
- Verify data accuracy
- Shop for best odds
- Stay disciplined

❌ **DON'T:**
- Bet without calculating edge
- Chase losses with bigger bets
- Ignore small negative edges
- Skip bet logging
- Bet more than suggested
- Bet based on emotions

## 🎓 Learning the Markets

### Start with Match Odds
- Easiest to understand
- Most data available
- Clear win/loss outcomes
- Good for beginners

### Then Try Over/Under
- More variables to consider
- Requires batting/bowling knowledge
- Interesting for tight matches
- Different from picking winners

### Advanced: Runline
- Most complex calculations
- Requires margin analysis
- Higher variance
- Best for experienced bettors

## 🔧 Customization

Want to adjust the calculator? Edit `app.js`:

```javascript
// Line 89 - Change minimum edge threshold
if (edge > 3) { // Change to 5 for more conservative

// Line 173 - Adjust Kelly fraction
const stake = 100 * 0.25 // Change 0.25 to 0.10 for safer stakes

// Line 42 - Modify form importance
probA += (formA - formB) * 0.4; // Change 0.4 to adjust weight
```

## 📞 Need Help?

1. **Read the full README.md** - Detailed explanations
2. **Check calculations** - Review the algorithm descriptions
3. **Test with examples** - Try known match data
4. **Verify your data** - Accurate inputs = accurate outputs

## 🎯 Success Tips

1. **Be patient** - Need 50-100 bets to verify edge
2. **Stay disciplined** - Follow the system, not emotions
3. **Use all markets** - Different situations favor different bets
4. **Keep learning** - Adjust based on your tracked results
5. **Manage bankroll** - Never risk more than 2-3% per bet
6. **Shop odds** - 0.05 difference = 5% profit change

## ⚠️ Final Reminder

This is an **educational tool** for learning about betting mathematics and probability. 

- Not financial advice
- Gambling involves risk
- Only bet what you can afford to lose
- Check local laws
- Gamble responsibly

---

**Ready to deploy?** Pick a method above and you'll be live in minutes!

Then create your icons, enter some match data, and start calculating!

Made with 🏏 for cricket fans
