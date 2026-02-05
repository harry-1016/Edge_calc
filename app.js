// Tab switching
function switchTab(tabName) {
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));
    
    event.target.classList.add('active');
    document.getElementById(tabName).classList.add('active');
    
    if (tabName === 'log') {
        updateStats();
    }
}

// Pre-match calculation
function calculatePrematch() {
    const teamA = document.getElementById('teamA').value || 'Team A';
    const teamB = document.getElementById('teamB').value || 'Team B';
    
    // Get all inputs
    const formA = parseFloat(document.getElementById('formA').value);
    const formB = parseFloat(document.getElementById('formB').value);
    const squadA = parseFloat(document.getElementById('squadA').value);
    const squadB = parseFloat(document.getElementById('squadB').value);
    const ppA = parseFloat(document.getElementById('ppA').value);
    const ppB = parseFloat(document.getElementById('ppB').value);
    const deathA = parseFloat(document.getElementById('deathA').value);
    const deathB = parseFloat(document.getElementById('deathB').value);
    const oddsA = parseFloat(document.getElementById('oddsA').value);
    const oddsB = parseFloat(document.getElementById('oddsB').value);
    
    // Calculate base probability (50-50 start)
    let probA = 50;
    
    // Recent form impact (20% weight)
    probA += (formA - formB) * 0.20;
    
    // Squad quality (25% weight)
    probA += (squadA - squadB) * 0.25;
    
    // Powerplay strength (15% weight)
    probA += (ppA - ppB) * 1.5;
    
    // Death bowling (15% weight, inverted - lower is better)
    probA += (deathB - deathA) * 1.5;
    
    // Venue adjustments
    const tossImpact = document.getElementById('tossImpact').value;
    const dew = document.getElementById('dew').value;
    const pitch = document.getElementById('pitch').value;
    
    if (tossImpact === 'slight') probA += 2;
    if (tossImpact === 'moderate') probA += 4;
    if (tossImpact === 'high') probA += 6;
    
    if (dew === 'slight') probA -= 2; // Benefits chase
    if (dew === 'heavy') probA -= 4;
    
    // Ensure probability stays in valid range
    probA = Math.max(5, Math.min(95, probA));
    const probB = 100 - probA;
    
    // Calculate implied probabilities from odds
    const impliedA = (1 / oddsA) * 100;
    const impliedB = (1 / oddsB) * 100;
    
    // Calculate edges
    const edgeA = probA - impliedA;
    const edgeB = probB - impliedB;
    
    // Calculate Kelly stake (conservative 25% Kelly)
    const bankroll = 1000; // Default bankroll
    const kellyFraction = 0.25;
    
    let stakeA = 0;
    let stakeB = 0;
    
    if (edgeA > 0) {
        stakeA = bankroll * kellyFraction * ((probA/100 - 1/oddsA) / (oddsA - 1));
        stakeA = Math.max(0, stakeA);
    }
    
    if (edgeB > 0) {
        stakeB = bankroll * kellyFraction * ((probB/100 - 1/oddsB) / (oddsB - 1));
        stakeB = Math.max(0, stakeB);
    }
    
    // Display results
    const resultHTML = `
        <div class="result-box">
            <h3>Win Probability Analysis</h3>
            <div class="result-grid">
                <div class="result-item">
                    <label>${teamA}</label>
                    <div class="value">${probA.toFixed(1)}%</div>
                    <div style="font-size: 0.9rem; margin-top: 5px;">
                        Implied: ${impliedA.toFixed(1)}%
                    </div>
                    <div class="edge-indicator ${edgeA > 5 ? 'edge-positive' : edgeA > 0 ? 'edge-neutral' : 'edge-negative'}">
                        Edge: ${edgeA > 0 ? '+' : ''}${edgeA.toFixed(1)}%
                    </div>
                    ${edgeA > 5 ? `<div style="margin-top: 10px; font-size: 0.9rem;">💰 Suggested Stake: $${stakeA.toFixed(2)}</div>` : ''}
                </div>
                <div class="result-item">
                    <label>${teamB}</label>
                    <div class="value">${probB.toFixed(1)}%</div>
                    <div style="font-size: 0.9rem; margin-top: 5px;">
                        Implied: ${impliedB.toFixed(1)}%
                    </div>
                    <div class="edge-indicator ${edgeB > 5 ? 'edge-positive' : edgeB > 0 ? 'edge-neutral' : 'edge-negative'}">
                        Edge: ${edgeB > 0 ? '+' : ''}${edgeB.toFixed(1)}%
                    </div>
                    ${edgeB > 5 ? `<div style="margin-top: 10px; font-size: 0.9rem;">💰 Suggested Stake: $${stakeB.toFixed(2)}</div>` : ''}
                </div>
            </div>
            <div style="margin-top: 20px; font-size: 0.95rem; opacity: 0.9;">
                ${edgeA > 5 || edgeB > 5 ? '✅ VALUE BET FOUND!' : edgeA > 0 || edgeB > 0 ? '⚠️ Small edge - proceed with caution' : '❌ No edge - avoid this bet'}
            </div>
            <div style="margin-top: 10px; font-size: 0.85rem; opacity: 0.8;">
                Recommended minimum edge: 5% | Kelly Fraction: 25%
            </div>
        </div>
    `;
    
    document.getElementById('prematchResult').innerHTML = resultHTML;
}

// Live match calculation
function calculateLive() {
    const battingTeam = document.getElementById('battingTeam').value || 'Batting Team';
    const target = parseFloat(document.getElementById('target').value);
    const currentScore = parseFloat(document.getElementById('currentScore').value);
    const wickets = parseFloat(document.getElementById('wickets').value);
    const overs = parseFloat(document.getElementById('overs').value);
    const liveOdds = parseFloat(document.getElementById('liveOdds').value);
    const batsmenQuality = parseFloat(document.getElementById('batsmenQuality').value);
    const bowlersQuality = parseFloat(document.getElementById('bowlersQuality').value);
    
    // Calculate metrics
    const ballsRemaining = Math.max(0, (20 - overs) * 6);
    const runsRequired = Math.max(0, target - currentScore);
    const requiredRunRate = ballsRemaining > 0 ? (runsRequired / (ballsRemaining / 6)) : 0;
    const wicketsInHand = 10 - wickets;
    const currentRunRate = overs > 0 ? currentScore / overs : 0;
    
    // Base win probability from required run rate
    let winProb = 50;
    
    if (requiredRunRate <= 6) winProb = 90;
    else if (requiredRunRate <= 8) winProb = 75;
    else if (requiredRunRate <= 10) winProb = 60;
    else if (requiredRunRate <= 12) winProb = 45;
    else if (requiredRunRate <= 14) winProb = 30;
    else winProb = 15;
    
    // Wickets adjustment
    if (wicketsInHand >= 8) winProb += 10;
    else if (wicketsInHand >= 6) winProb += 5;
    else if (wicketsInHand >= 4) winProb += 0;
    else if (wicketsInHand >= 2) winProb -= 10;
    else winProb -= 25;
    
    // Quality adjustments
    winProb += batsmenQuality;
    winProb += bowlersQuality;
    
    // Ensure valid range
    winProb = Math.max(5, Math.min(95, winProb));
    
    // Calculate edge
    const impliedProb = (1 / liveOdds) * 100;
    const edge = winProb - impliedProb;
    
    // Display results
    const resultHTML = `
        <div class="result-box">
            <h3>Live Match Analysis</h3>
            <div class="result-grid">
                <div class="result-item">
                    <label>Balls Remaining</label>
                    <div class="value">${ballsRemaining}</div>
                </div>
                <div class="result-item">
                    <label>Runs Required</label>
                    <div class="value">${runsRequired}</div>
                </div>
                <div class="result-item">
                    <label>Required Rate</label>
                    <div class="value">${requiredRunRate.toFixed(2)}</div>
                </div>
                <div class="result-item">
                    <label>Wickets in Hand</label>
                    <div class="value">${wicketsInHand}</div>
                </div>
            </div>
            
            <div style="margin-top: 25px;">
                <h3 style="font-size: 1rem; margin-bottom: 10px;">Win Probability</h3>
                <div class="value">${winProb.toFixed(1)}%</div>
                <div style="font-size: 0.9rem; margin-top: 5px; opacity: 0.9;">
                    Market Implied: ${impliedProb.toFixed(1)}%
                </div>
                <div class="edge-indicator ${edge > 5 ? 'edge-positive' : edge > 0 ? 'edge-neutral' : 'edge-negative'}">
                    Edge: ${edge > 0 ? '+' : ''}${edge.toFixed(1)}%
                </div>
            </div>
            
            <div style="margin-top: 20px; font-size: 0.95rem; opacity: 0.9;">
                ${edge > 5 ? '✅ STRONG EDGE - Consider betting!' : edge > 0 ? '⚠️ Small edge detected' : '❌ No edge - avoid'}
            </div>
            ${edge > 5 ? `<div style="margin-top: 10px; font-size: 0.9rem;">💡 Suggested: 2-3% of bankroll</div>` : ''}
        </div>
    `;
    
    document.getElementById('liveResult').innerHTML = resultHTML;
}

// Bet log management
let betLog = JSON.parse(localStorage.getItem('betLog') || '[]');

function addBet() {
    const bet = {
        date: document.getElementById('betDate').value,
        league: document.getElementById('betLeague').value,
        match: document.getElementById('betMatch').value,
        type: document.getElementById('betType').value,
        selection: document.getElementById('betSelection').value,
        winProb: parseFloat(document.getElementById('betWinProb').value),
        odds: parseFloat(document.getElementById('betOdds').value),
        stake: parseFloat(document.getElementById('betStake').value),
        result: document.getElementById('betResult').value
    };
    
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
    
    betLog.unshift(bet); // Add to beginning
    localStorage.setItem('betLog', JSON.stringify(betLog));
    
    // Clear form
    document.getElementById('betMatch').value = '';
    document.getElementById('betSelection').value = '';
    document.getElementById('betWinProb').value = '';
    document.getElementById('betOdds').value = '';
    document.getElementById('betStake').value = '';
    document.getElementById('betResult').value = '';
    
    displayBetLog();
    updateStats();
}

function displayBetLog() {
    const tbody = document.getElementById('betLogBody');
    
    if (betLog.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 30px; color: #6b7280;">
                    No bets logged yet. Add your first bet above!
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = betLog.map(bet => `
        <tr>
            <td>${bet.date}</td>
            <td>${bet.match}</td>
            <td>${bet.selection}</td>
            <td>${bet.odds.toFixed(2)}</td>
            <td>$${bet.stake.toFixed(2)}</td>
            <td>${bet.result || 'Pending'}</td>
            <td class="${bet.pl > 0 ? 'profit' : bet.pl < 0 ? 'loss' : ''}">
                ${bet.pl > 0 ? '+' : ''}${bet.pl.toFixed(2)}
            </td>
        </tr>
    `).join('');
}

function updateStats() {
    const settledBets = betLog.filter(bet => bet.result === 'won' || bet.result === 'lost');
    const wonBets = betLog.filter(bet => bet.result === 'won');
    
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
}

// PWA Install
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    document.getElementById('installPrompt').classList.add('show');
});

document.getElementById('installBtn').addEventListener('click', async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
        document.getElementById('installPrompt').classList.remove('show');
    }
    
    deferredPrompt = null;
});

// Initialize on load
window.addEventListener('load', () => {
    displayBetLog();
    updateStats();
});
