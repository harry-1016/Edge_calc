// Tab switching
function switchTab(tabName) {
const tabs = document.querySelectorAll(’.tab’);
const contents = document.querySelectorAll(’.tab-content’);

```
tabs.forEach(tab => tab.classList.remove('active'));
contents.forEach(content => content.classList.remove('active'));

event.target.classList.add('active');
document.getElementById(tabName).classList.add('active');

if (tabName === 'log') {
    updateStats();
}
```

}

// Match Odds calculation
function calculateMatchOdds() {
const teamA = document.getElementById(‘teamA_mo’).value || ‘Team A’;
const teamB = document.getElementById(‘teamB_mo’).value || ‘Team B’;

```
const formA = parseFloat(document.getElementById('formA_mo').value);
const formB = parseFloat(document.getElementById('formB_mo').value);
const squadA = parseFloat(document.getElementById('squadA_mo').value);
const squadB = parseFloat(document.getElementById('squadB_mo').value);
const oddsA = parseFloat(document.getElementById('oddsA_mo').value);
const oddsB = parseFloat(document.getElementById('oddsB_mo').value);

// Calculate win probability (50-50 base)
let probA = 50;

// Recent form impact (40% weight)
probA += (formA - formB) * 0.4;

// Squad quality (30% weight)
probA += (squadA - squadB) * 0.3;

// Ensure valid range
probA = Math.max(5, Math.min(95, probA));
const probB = 100 - probA;

// Calculate implied probabilities from odds
const impliedA = (1 / oddsA) * 100;
const impliedB = (1 / oddsB) * 100;

// Calculate value
const valueA = probA - impliedA;
const valueB = probB - impliedB;

// Determine suggestion
let suggestion = '';
let suggestedTeam = '';
let suggestedOdds = 0;
let edge = 0;

if (valueA > 3 && valueA > valueB) {
    suggestion = `BET ${teamA}`;
    suggestedTeam = teamA;
    suggestedOdds = oddsA;
    edge = valueA;
} else if (valueB > 3 && valueB > valueA) {
    suggestion = `BET ${teamB}`;
    suggestedTeam = teamB;
    suggestedOdds = oddsB;
    edge = valueB;
} else if (valueA > 0 || valueB > 0) {
    suggestion = 'SMALL EDGE - Caution advised';
    edge = Math.max(valueA, valueB);
} else {
    suggestion = 'NO BET - No value found';
}

// Calculate suggested stake (Kelly Criterion - 25%)
let stake = 0;
if (edge > 3) {
    const winProb = edge === valueA ? probA/100 : probB/100;
    stake = 100 * 0.25 * ((winProb - 1/suggestedOdds) / (suggestedOdds - 1));
    stake = Math.max(0, stake);
}

const resultHTML = `
    <div class="result-box">
        <h3>Match Odds Analysis</h3>
        <div class="result-grid">
            <div class="result-item">
                <label>${teamA}</label>
                <div class="value">${probA.toFixed(1)}%</div>
                <div style="font-size: 0.9rem; margin-top: 5px;">
                    Odds: ${oddsA.toFixed(2)} (Implied: ${impliedA.toFixed(1)}%)
                </div>
                <div class="bet-indicator ${valueA > 3 ? 'bet-positive' : valueA > 0 ? 'bet-neutral' : 'bet-negative'}">
                    Value: ${valueA > 0 ? '+' : ''}${valueA.toFixed(1)}%
                </div>
            </div>
            <div class="result-item">
                <label>${teamB}</label>
                <div class="value">${probB.toFixed(1)}%</div>
                <div style="font-size: 0.9rem; margin-top: 5px;">
                    Odds: ${oddsB.toFixed(2)} (Implied: ${impliedB.toFixed(1)}%)
                </div>
                <div class="bet-indicator ${valueB > 3 ? 'bet-positive' : valueB > 0 ? 'bet-neutral' : 'bet-negative'}">
                    Value: ${valueB > 0 ? '+' : ''}${valueB.toFixed(1)}%
                </div>
            </div>
        </div>
        <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.2); text-align: center;">
            <h3 style="font-size: 1.3rem; margin-bottom: 10px;">💡 SUGGESTION</h3>
            <div style="font-size: 1.5rem; font-weight: 700; margin: 15px 0;">
                ${suggestion}
            </div>
            ${stake > 0 ? `
                <div style="margin-top: 15px; font-size: 1rem;">
                    📊 Recommended Stake: <strong>$${stake.toFixed(2)}</strong>
                </div>
                <div style="margin-top: 10px; font-size: 0.9rem; opacity: 0.9;">
                    Edge: ${edge.toFixed(1)}% | Based on $100 bankroll (25% Kelly)
                </div>
            ` : ''}
        </div>
    </div>
`;

document.getElementById('result_mo').innerHTML = resultHTML;
```

}

// Over/Under calculation
function calculateOverUnder() {
const teamA = document.getElementById(‘teamA_ou’).value || ‘Batting Team’;
const totalLine = parseFloat(document.getElementById(‘totalLine_ou’).value);
const avgScore = parseFloat(document.getElementById(‘avgScore_ou’).value);
const ppSR = parseFloat(document.getElementById(‘ppSR_ou’).value);
const runsConc = parseFloat(document.getElementById(‘runsConc_ou’).value);
const economy = parseFloat(document.getElementById(‘economy_ou’).value);
const overOdds = parseFloat(document.getElementById(‘overOdds_ou’).value);
const underOdds = parseFloat(document.getElementById(‘underOdds_ou’).value);

```
// Calculate expected score
let expectedScore = avgScore;

// Adjust for batting strength (powerplay SR)
if (ppSR > 135) expectedScore += 10;
else if (ppSR > 125) expectedScore += 5;
else if (ppSR < 115) expectedScore -= 5;
else if (ppSR < 105) expectedScore -= 10;

// Adjust for bowling quality
if (runsConc < 155) expectedScore -= 8;
else if (runsConc < 165) expectedScore -= 4;
else if (runsConc > 175) expectedScore += 4;
else if (runsConc > 185) expectedScore += 8;

// Economy rate adjustment
if (economy < 7.5) expectedScore -= 5;
else if (economy < 8.0) expectedScore -= 3;
else if (economy > 9.0) expectedScore += 3;
else if (economy > 9.5) expectedScore += 5;

// Calculate probability of going over
const margin = expectedScore - totalLine;
let probOver = 50;

if (margin >= 15) probOver = 80;
else if (margin >= 10) probOver = 70;
else if (margin >= 5) probOver = 60;
else if (margin >= 0) probOver = 52;
else if (margin >= -5) probOver = 48;
else if (margin >= -10) probOver = 40;
else if (margin >= -15) probOver = 30;
else probOver = 20;

const probUnder = 100 - probOver;

// Calculate implied probabilities
const impliedOver = (1 / overOdds) * 100;
const impliedUnder = (1 / underOdds) * 100;

// Calculate value
const valueOver = probOver - impliedOver;
const valueUnder = probUnder - impliedUnder;

// Determine suggestion
let suggestion = '';
let edge = 0;
let stake = 0;

if (valueOver > 3 && valueOver > valueUnder) {
    suggestion = `BET OVER ${totalLine}`;
    edge = valueOver;
    stake = 100 * 0.25 * ((probOver/100 - 1/overOdds) / (overOdds - 1));
} else if (valueUnder > 3 && valueUnder > valueOver) {
    suggestion = `BET UNDER ${totalLine}`;
    edge = valueUnder;
    stake = 100 * 0.25 * ((probUnder/100 - 1/underOdds) / (underOdds - 1));
} else if (valueOver > 0 || valueUnder > 0) {
    suggestion = 'SMALL EDGE - Caution advised';
    edge = Math.max(valueOver, valueUnder);
} else {
    suggestion = 'NO BET - No value found';
}

stake = Math.max(0, stake);

const resultHTML = `
    <div class="result-box">
        <h3>Over/Under Analysis</h3>
        <div style="text-align: center; margin: 20px 0;">
            <div style="font-size: 0.9rem; opacity: 0.9;">Expected Score</div>
            <div class="value">${expectedScore.toFixed(1)}</div>
            <div style="font-size: 0.9rem; opacity: 0.9; margin-top: 5px;">
                Line: ${totalLine} | Margin: ${margin > 0 ? '+' : ''}${margin.toFixed(1)}
            </div>
        </div>
        
        <div class="result-grid">
            <div class="result-item">
                <label>OVER ${totalLine}</label>
                <div class="value">${probOver.toFixed(1)}%</div>
                <div style="font-size: 0.9rem; margin-top: 5px;">
                    Odds: ${overOdds.toFixed(2)} (Implied: ${impliedOver.toFixed(1)}%)
                </div>
                <div class="bet-indicator ${valueOver > 3 ? 'bet-positive' : valueOver > 0 ? 'bet-neutral' : 'bet-negative'}">
                    Value: ${valueOver > 0 ? '+' : ''}${valueOver.toFixed(1)}%
                </div>
            </div>
            <div class="result-item">
                <label>UNDER ${totalLine}</label>
                <div class="value">${probUnder.toFixed(1)}%</div>
                <div style="font-size: 0.9rem; margin-top: 5px;">
                    Odds: ${underOdds.toFixed(2)} (Implied: ${impliedUnder.toFixed(1)}%)
                </div>
                <div class="bet-indicator ${valueUnder > 3 ? 'bet-positive' : valueUnder > 0 ? 'bet-neutral' : 'bet-negative'}">
                    Value: ${valueUnder > 0 ? '+' : ''}${valueUnder.toFixed(1)}%
                </div>
            </div>
        </div>
        
        <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.2); text-align: center;">
            <h3 style="font-size: 1.3rem; margin-bottom: 10px;">💡 SUGGESTION</h3>
            <div style="font-size: 1.5rem; font-weight: 700; margin: 15px 0;">
                ${suggestion}
            </div>
            ${stake > 0 ? `
                <div style="margin-top: 15px; font-size: 1rem;">
                    📊 Recommended Stake: <strong>$${stake.toFixed(2)}</strong>
                </div>
                <div style="margin-top: 10px; font-size: 0.9rem; opacity: 0.9;">
                    Edge: ${edge.toFixed(1)}% | Based on $100 bankroll (25% Kelly)
                </div>
            ` : ''}
        </div>
    </div>
`;

document.getElementById('result_ou').innerHTML = resultHTML;
```

}

// Runline calculation
function calculateRunline() {
const teamA = document.getElementById(‘teamA_rl’).value || ‘Team A’;
const teamB = document.getElementById(‘teamB_rl’).value || ‘Team B’;
const runlineValue = parseFloat(document.getElementById(‘runlineValue_rl’).value);
const favoriteTeam = document.getElementById(‘favoriteTeam_rl’).value;
const marginA = parseFloat(document.getElementById(‘marginA_rl’).value);
const marginB = parseFloat(document.getElementById(‘marginB_rl’).value);
const formA = parseFloat(document.getElementById(‘formA_rl’).value);
const formB = parseFloat(document.getElementById(‘formB_rl’).value);
const runlineOddsA = parseFloat(document.getElementById(‘runlineOddsA_rl’).value);
const runlineOddsB = parseFloat(document.getElementById(‘runlineOddsB_rl’).value);

```
// Determine expected margin
let expectedMargin = 0;

if (favoriteTeam === 'A') {
    expectedMargin = marginA - (marginB * 0.3);
    expectedMargin += (formA - formB) * 0.15;
} else {
    expectedMargin = marginB - (marginA * 0.3);
    expectedMargin += (formB - formA) * 0.15;
}

// Calculate probability of covering runline
let probCoverA = 50;

if (favoriteTeam === 'A') {
    if (expectedMargin - runlineValue >= 10) probCoverA = 75;
    else if (expectedMargin - runlineValue >= 5) probCoverA = 65;
    else if (expectedMargin - runlineValue >= 0) probCoverA = 55;
    else if (expectedMargin - runlineValue >= -5) probCoverA = 45;
    else if (expectedMargin - runlineValue >= -10) probCoverA = 35;
    else probCoverA = 25;
} else {
    if (expectedMargin - runlineValue >= 10) probCoverA = 25;
    else if (expectedMargin - runlineValue >= 5) probCoverA = 35;
    else if (expectedMargin - runlineValue >= 0) probCoverA = 45;
    else if (expectedMargin - runlineValue >= -5) probCoverA = 55;
    else if (expectedMargin - runlineValue >= -10) probCoverA = 65;
    else probCoverA = 75;
}

const probCoverB = 100 - probCoverA;

// Calculate implied probabilities
const impliedA = (1 / runlineOddsA) * 100;
const impliedB = (1 / runlineOddsB) * 100;

// Calculate value
const valueA = probCoverA - impliedA;
const valueB = probCoverB - impliedB;

// Determine suggestion
let suggestion = '';
let edge = 0;
let stake = 0;

if (valueA > 3 && valueA > valueB) {
    suggestion = `BET ${teamA} ${runlineValue > 0 ? '+' : ''}${runlineValue}`;
    edge = valueA;
    stake = 100 * 0.25 * ((probCoverA/100 - 1/runlineOddsA) / (runlineOddsA - 1));
} else if (valueB > 3 && valueB > valueA) {
    suggestion = `BET ${teamB} ${runlineValue < 0 ? '+' : '-'}${Math.abs(runlineValue)}`;
    edge = valueB;
    stake = 100 * 0.25 * ((probCoverB/100 - 1/runlineOddsB) / (runlineOddsB - 1));
} else if (valueA > 0 || valueB > 0) {
    suggestion = 'SMALL EDGE - Caution advised';
    edge = Math.max(valueA, valueB);
} else {
    suggestion = 'NO BET - No value found';
}

stake = Math.max(0, stake);

const resultHTML = `
    <div class="result-box">
        <h3>Runline Analysis</h3>
        <div style="text-align: center; margin: 20px 0;">
            <div style="font-size: 0.9rem; opacity: 0.9;">Expected Win Margin</div>
            <div class="value">${expectedMargin.toFixed(1)} runs</div>
            <div style="font-size: 0.9rem; opacity: 0.9; margin-top: 5px;">
                Line: ${runlineValue > 0 ? '+' : ''}${runlineValue} | Favorite: ${favoriteTeam === 'A' ? teamA : teamB}
            </div>
        </div>
        
        <div class="result-grid">
            <div class="result-item">
                <label>${teamA} ${runlineValue > 0 ? '+' : ''}${runlineValue}</label>
                <div class="value">${probCoverA.toFixed(1)}%</div>
                <div style="font-size: 0.9rem; margin-top: 5px;">
                    Odds: ${runlineOddsA.toFixed(2)} (Implied: ${impliedA.toFixed(1)}%)
                </div>
                <div class="bet-indicator ${valueA > 3 ? 'bet-positive' : valueA > 0 ? 'bet-neutral' : 'bet-negative'}">
                    Value: ${valueA > 0 ? '+' : ''}${valueA.toFixed(1)}%
                </div>
            </div>
            <div class="result-item">
                <label>${teamB} ${runlineValue < 0 ? '+' : '-'}${Math.abs(runlineValue)}</label>
                <div class="value">${probCoverB.toFixed(1)}%</div>
                <div style="font-size: 0.9rem; margin-top: 5px;">
                    Odds: ${runlineOddsB.toFixed(2)} (Implied: ${impliedB.toFixed(1)}%)
                </div>
                <div class="bet-indicator ${valueB > 3 ? 'bet-positive' : valueB > 0 ? 'bet-neutral' : 'bet-negative'}">
                    Value: ${valueB > 0 ? '+' : ''}${valueB.toFixed(1)}%
                </div>
            </div>
        </div>
        
        <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.2); text-align: center;">
            <h3 style="font-size: 1.3rem; margin-bottom: 10px;">💡 SUGGESTION</h3>
            <div style="font-size: 1.5rem; font-weight: 700; margin: 15px 0;">
                ${suggestion}
            </div>
            ${stake > 0 ? `
                <div style="margin-top: 15px; font-size: 1rem;">
                    📊 Recommended Stake: <strong>$${stake.toFixed(2)}</strong>
                </div>
                <div style="margin-top: 10px; font-size: 0.9rem; opacity: 0.9;">
                    Edge: ${edge.toFixed(1)}% | Based on $100 bankroll (25% Kelly)
                </div>
            ` : ''}
        </div>
    </div>
`;

document.getElementById('result_rl').innerHTML = resultHTML;
```

}

// Live calculation
function calculateLive() {
const battingTeam = document.getElementById(‘battingTeam_live’).value || ‘Batting Team’;
const target = parseFloat(document.getElementById(‘target_live’).value);
const currentScore = parseFloat(document.getElementById(‘currentScore_live’).value);
const wickets = parseFloat(document.getElementById(‘wickets_live’).value);
const overs = parseFloat(document.getElementById(‘overs_live’).value);
const liveOdds = parseFloat(document.getElementById(‘liveOdds_live’).value);
const batsmenQuality = parseFloat(document.getElementById(‘batsmenQuality_live’).value);
const bowlersQuality = parseFloat(document.getElementById(‘bowlersQuality_live’).value);

```
// Calculate runs needed and overs remaining
const runsNeeded = target - currentScore;
const oversRemaining = 20 - overs;
const requiredRunRate = runsNeeded / oversRemaining;

// Base probability calculation
let winProb = 50;

// Adjust for runs needed vs overs
const runRateDiff = requiredRunRate - 8.0; // 8 is average RR
winProb -= runRateDiff * 5;

// Adjust for wickets lost
if (wickets >= 7) winProb -= 30;
else if (wickets >= 5) winProb -= 20;
else if (wickets >= 3) winProb -= 10;
else if (wickets <= 1) winProb += 10;

// Adjust for batsmen quality
winProb += batsmenQuality;

// Adjust for bowling quality (inverse)
winProb -= bowlersQuality;

// Ensure valid range
winProb = Math.max(5, Math.min(95, winProb));

// Calculate implied probability
const impliedProb = (1 / liveOdds) * 100;

// Calculate edge
const edge = winProb - impliedProb;

// Determine suggestion
let suggestion = '';
let stake = 0;

if (edge > 3) {
    suggestion = `BET ${battingTeam} TO WIN`;
    stake = 100 * 0.25 * ((winProb/100 - 1/liveOdds) / (liveOdds - 1));
    stake = Math.max(0, stake);
} else if (edge > 0) {
    suggestion = 'SMALL EDGE - Caution advised';
} else {
    suggestion = 'NO BET - No value found';
}

const resultHTML = `
    <div class="result-box">
        <h3>Live Match Analysis</h3>
        <div style="text-align: center; margin: 20px 0;">
            <div style="font-size: 0.9rem; opacity: 0.9;">Win Probability</div>
            <div class="value">${winProb.toFixed(1)}%</div>
        </div>
        
        <div class="result-grid">
            <div class="result-item">
                <label>Runs Needed</label>
                <div class="value">${runsNeeded}</div>
                <div style="font-size: 0.9rem; margin-top: 5px;">
                    RRR: ${requiredRunRate.toFixed(2)}
                </div>
            </div>
            <div class="result-item">
                <label>Wickets in Hand</label>
                <div class="value">${10 - wickets}</div>
                <div style="font-size: 0.9rem; margin-top: 5px;">
                    Overs left: ${oversRemaining.toFixed(1)}
                </div>
            </div>
        </div>
        
        <div style="margin-top: 20px; padding: 15px; background: rgba(255,255,255,0.1); border-radius: 10px;">
            <div style="font-size: 0.9rem; opacity: 0.9;">Current Odds: ${liveOdds.toFixed(2)}</div>
            <div style="font-size: 0.9rem; opacity: 0.9;">Implied Probability: ${impliedProb.toFixed(1)}%</div>
            <div class="bet-indicator ${edge > 3 ? 'bet-positive' : edge > 0 ? 'bet-neutral' : 'bet-negative'}">
                Edge: ${edge > 0 ? '+' : ''}${edge.toFixed(1)}%
            </div>
        </div>
        
        <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.2); text-align: center;">
            <h3 style="font-size: 1.3rem; margin-bottom: 10px;">💡 SUGGESTION</h3>
            <div style="font-size: 1.5rem; font-weight: 700; margin: 15px 0;">
                ${suggestion}
            </div>
            ${stake > 0 ? `
                <div style="margin-top: 15px; font-size: 1rem;">
                    📊 Recommended Stake: <strong>$${stake.toFixed(2)}</strong>
                </div>
                <div style="margin-top: 10px; font-size: 0.9rem; opacity: 0.9;">
                    Edge: ${edge.toFixed(1)}% | Based on $100 bankroll (25% Kelly)
                </div>
            ` : ''}
        </div>
    </div>
`;

document.getElementById('result_live').innerHTML = resultHTML;
```

}

// Bet log management
let betLog = JSON.parse(localStorage.getItem(‘betLog’) || ‘[]’);

function addBet() {
const bet = {
date: document.getElementById(‘betDate’).value,
type: document.getElementById(‘betType’).value,
match: document.getElementById(‘betMatch’).value,
selection: document.getElementById(‘betSelection’).value,
odds: parseFloat(document.getElementById(‘betOdds’).value),
stake: parseFloat(document.getElementById(‘betStake’).value),
result: document.getElementById(‘betResult’).value
};

```
// Validate
if (!bet.date || !bet.match || !bet.selection || !bet.odds || !bet.stake) {
    alert('Please fill in all required fields');
    return;
}

// Calculate P/L
if (bet.result === 'won') {
    bet.pl = bet.stake * (bet.odds - 1);
} else if (bet.result === 'lost') {
    bet.pl = -bet.stake;
} else {
    bet.pl = 0;
}

betLog.unshift(bet);
localStorage.setItem('betLog', JSON.stringify(betLog));

// Clear form
document.getElementById('betMatch').value = '';
document.getElementById('betSelection').value = '';
document.getElementById('betOdds').value = '';
document.getElementById('betStake').value = '';
document.getElementById('betResult').value = '';

displayBetLog();
updateStats();
```

}

function displayBetLog() {
const tbody = document.getElementById(‘betLogBody’);

```
if (betLog.length === 0) {
    tbody.innerHTML = `
        <tr>
            <td colspan="8" style="text-align: center; padding: 30px; color: #6b7280;">
                No bets logged yet. Add your first bet above!
            </td>
        </tr>
    `;
    return;
}

tbody.innerHTML = betLog.map(bet => `
    <tr>
        <td>${bet.date}</td>
        <td>${bet.type}</td>
        <td>${bet.match}</td>
        <td>${bet.selection}</td>
        <td>${bet.odds.toFixed(2)}</td>
        <td>$${bet.stake.toFixed(2)}</td>
        <td>${bet.result || 'Pending'}</td>
        <td class="${bet.pl > 0 ? 'profit' : bet.pl < 0 ? 'loss' : ''}">
            ${bet.pl > 0 ? '+' : ''}$${bet.pl.toFixed(2)}
        </td>
    </tr>
`).join('');
```

}

function updateStats() {
const settledBets = betLog.filter(bet => bet.result === ‘won’ || bet.result === ‘lost’);
const wonBets = betLog.filter(bet => bet.result === ‘won’);

```
const totalBets = settledBets.length;
const winRate = totalBets > 0 ? (wonBets.length / totalBets * 100) : 0;
const totalStaked = settledBets.reduce((sum, bet) => sum + bet.stake, 0);
const totalPL = settledBets.reduce((sum, bet) => sum + bet.pl, 0);
const roi = totalStaked > 0 ? (totalPL / totalStaked * 100) : 0;

document.getElementById('totalBets').textContent = totalBets;
document.getElementById('winRate').textContent = winRate.toFixed(1) + '%';
document.getElementById('totalPL').textContent = '$' + totalPL.toFixed(2);
document.getElementById('totalPL').className = 'stat-value ' + (totalPL > 0 ? 'profit' : totalPL < 0 ? 'loss' : '');
document.getElementById('roi').textContent = roi.toFixed(1) + '%';
document.getElementById('roi').className = 'stat-value ' + (roi > 0 ? 'profit' : roi < 0 ? 'loss' : '');
```

}

// PWA Install
let deferredPrompt;

window.addEventListener(‘beforeinstallprompt’, (e) => {
e.preventDefault();
deferredPrompt = e;
document.getElementById(‘installPrompt’).classList.add(‘show’);
});

document.getElementById(‘installBtn’).addEventListener(‘click’, async () => {
if (!deferredPrompt) return;

```
deferredPrompt.prompt();
const { outcome } = await deferredPrompt.userChoice;

if (outcome === 'accepted') {
    document.getElementById('installPrompt').classList.remove('show');
}

deferredPrompt = null;
```

});

// Initialize on load
window.addEventListener(‘load’, () => {
displayBetLog();
updateStats();
});