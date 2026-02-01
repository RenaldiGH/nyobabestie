// Saldo awal
let balance = 1000;

// Fungsi update tampilan saldo
function updateBalance() {
    const balanceElement = document.getElementById('balance');
    if (balanceElement) balanceElement.textContent = balance;
}

// Fungsi deposit
function deposit() {
    const amount = prompt('Masukkan jumlah deposit (minimal 10, maksimal 10.000):');
    const depositAmount = parseInt(amount);
    
    if (isNaN(depositAmount) || depositAmount < 10 || depositAmount > 10000) {
        alert('Jumlah deposit tidak valid! Minimal 10, maksimal 10.000.');
        return;
    }
    
    balance += depositAmount;
    updateBalance();
    alert('Deposit berhasil! Saldo Anda sekarang: ' + balance + ' Poin');
}

// Fungsi untuk memuat game Slot
function loadSlotGame() {
    const container = document.getElementById('gameContainer');
    container.innerHTML = `
        <h1>🎰 Mesin Slot</h1>
        <div class="balance">
            <p>Saldo Anda: <span id="balance">${balance}</span> Poin</p>
            <button id="depositButton">Deposit</button>
        </div>
        <div class="bet-section">
            <label for="betAmount">Jumlah Taruhan:</label>
            <input type="number" id="betAmount" min="1" value="10" step="1">
            <p>Reward Menang: 2x Taruhan</p>
        </div>
        <div class="slot-machine">
            <div class="reel" id="reel1">🍒</div>
            <div class="reel" id="reel2">🍋</div>
            <div class="reel" id="reel3">🍊</div>
        </div>
        <button id="spinButton">Spin!</button>
        <div id="result" class="result hidden">
            <p id="message"></p>
        </div>
        <div class="probabilities">
            <h3>Probabilitas Menang: ~55% (setidaknya 2 simbol sama)</h3>
            <p>Menang: + (2x Taruhan) | Kalah: - Taruhan</p>
        </div>
    `;
    
    // Event listener untuk slot
    document.getElementById('spinButton').addEventListener('click', spinSlot);
    document.getElementById('depositButton').addEventListener('click', deposit);
}

// Fungsi spin slot
function spinSlot() {
    const symbols = ['🍒', '🍋', '🍊', '🍇', '🍉', '⭐'];
    const betInput = document.getElementById('betAmount');
    const bet = parseInt(betInput.value);
    
    if (isNaN(bet) || bet < 1) {
        alert('Jumlah taruhan harus minimal 1!');
        return;
    }
    
    if (bet > balance) {
        alert('Saldo tidak cukup! Saldo Anda: ' + balance + ' Poin');
        return;
    }
    
    balance -= bet;
    updateBalance();
    
    document.getElementById('spinButton').disabled = true;
    
    document.getElementById('reel1').classList.add('spinning');
    document.getElementById('reel2').classList.add('spinning');
    document.getElementById('reel3').classList.add('spinning');
    
    let spins = 0;
    const maxSpins = 10;
    const interval = setInterval(() => {
        document.getElementById('reel1').textContent = symbols[Math.floor(Math.random() * symbols.length)];
        document.getElementById('reel2').textContent = symbols[Math.floor(Math.random() * symbols.length)];
        document.getElementById('reel3').textContent = symbols[Math.floor(Math.random() * symbols.length)];
        spins++;
        if (spins >= maxSpins) {
            clearInterval(interval);
            document.getElementById('reel1').classList.remove('spinning');
            document.getElementById('reel2').classList.remove('spinning');
            document.getElementById('reel3').classList.remove('spinning');
            checkWinSlot(bet);
        }
    }, 100);
}

// Fungsi cek menang slot
function checkWinSlot(bet) {
    const reel1 = document.getElementById('reel1').textContent;
    const reel2 = document.getElementById('reel2').textContent;
    const reel3 = document.getElementById('reel3').textContent;
    
    const resultDiv = document.getElementById('result');
    const message = document.getElementById('message');
    
    if (reel1 === reel2 || reel2 === reel3 || reel1 === reel3) {
        const reward = bet * 2;
        balance += reward;
        message.textContent = 'Menang! Saldo +' + reward + ' Poin';
        resultDiv.className = 'result win';
    } else {
        message.textContent = 'Kalah! Saldo -' + bet + ' Poin';
        resultDiv.className = 'result lose';
    }
    
    updateBalance();
    resultDiv.classList.remove('hidden');
    document.getElementById('spinButton').disabled = false;
}

// Fungsi untuk memuat game Tebak Dadu
function loadDiceGame() {
    const container = document.getElementById('gameContainer');
    container.innerHTML = `
        <h1>🎲 Tebak Dadu</h1>
        <div class="balance">
            <p>Saldo Anda: <span id="balance">${balance}</span> Poin</p>
            <button id="depositButton">Deposit</button>
        </div>
        <div class="bet-section">
            <label for="betAmount">Jumlah Taruhan:</label>
            <input type="number" id="betAmount" min="1" value="10" step="1">
        </div>
        <div class="guess-section">
            <label for="guess">Tebak:</label>
            <select id="guess">
                <option value="big">Besar (Total >31)</option>
                <option value="small">Kecil (Total <32)</option>
            </select>
            <p>Reward Menang: 2x Taruhan</p>
        </div>
        <div class="dice-game">
            <div class="die" id="die1">1</div>
            <div class="die" id="die2">2</div>
            <div class="die" id="die3">3</div>
            <div class="die" id="die4">4</div>
            <div class="die" id="die5">5</div>
            <div class="die" id="die6">6</div>
            <div class="die" id="die7">7</div>
            <div class="die" id="die8">8</div>
            <div class="die" id="die9">9</div>
        </div>
        <button id="rollButton">Roll Dadu!</button>
        <div id="result" class="result hidden">
            <p id="message"></p>
        </div>
        <div class="probabilities">
            <h3>Probabilitas Menang: ~50% (acak)</h3>
            <p>Menang: + (2x Taruhan) | Kalah: - Taruhan</p>
        </div>
    `;
    
    // Event listener untuk dadu
    document.getElementById('rollButton').addEventListener('click', rollDice);
    document.getElementById('depositButton').addEventListener('click', deposit);
}

// Fungsi roll dadu
function rollDice() {
    const betInput = document.getElementById('betAmount');
    const bet = parseInt(betInput.value);
    const guess = document.getElementById('guess').value;
    
    if (isNaN(bet) || bet < 1) {
        alert('Jumlah taruhan harus minimal 1!');
        return;
    }
    
    if (bet > balance) {
        alert('Saldo tidak cukup! Saldo Anda: ' + balance + ' Poin');
        return;
    }
    
    balance -= bet;
    updateBalance();
    
    document.getElementById('rollButton').disabled = true;
    
    // Animasi roll
    for (let i = 1; i <= 9; i++) {
        document.getElementById('die' + i).classList.add('spinning');
    }
    
    setTimeout(() => {
        let total = 0;
        for (let i = 1; i <= 9; i++) {
            const value = Math.floor(Math.random() * 6) + 1;
            document.getElementById('die' + i).textContent = value;
            document.getElementById('die' + i).classList.remove('spinning');
            total += value;
        }
        
        checkWinDice(bet, guess, total);
    }, 1000);
}

// Fungsi cek menang dadu
function checkWinDice(bet, guess, total) {
    const resultDiv = document.getElementById('result');
    const message = document.getElementById('message');
    
    const isBig = total > 31;
    const isSmall = total < 32;
    
    if ((guess === 'big' && isBig) || (guess === 'small' && isSmall)) {
        const reward = bet * 2;
        balance += reward;
        message.textContent = `Menang! Total: ${total} (${guess}). Saldo +${reward} Poin`;
        resultDiv.className = 'result win';
    } else {
        message.textContent = `Kalah! Total: ${total} (${guess}). Saldo -${bet} Poin`;
        resultDiv.className = 'result lose';
    }
    
    updateBalance();
    resultDiv.classList.remove('hidden');
    document.getElementById('rollButton').disabled = false;
}

// Fungsi untuk memuat game Spaceman
function loadSpacemanGame() {
    const container = document.getElementById('gameContainer');
    container.innerHTML = `
        <h1>🚀 Spaceman</h1>
        <div class="balance">
            <p>Saldo Anda: <span id="balance">${balance}</span> Poin</p>
            <button id="depositButton">Deposit</button>
        </div>
        <div class="bet-section">
            <label for="betAmount">Jumlah Taruhan:</label>
            <input type="number" id="betAmount" min="1" value="10" step="1">
        </div>
        <div class="spaceman-game">
            <div class="multiplier" id="multiplier">1.00x</div>
            <div class="rocket" id="rocket"><img src="rocket.jpg" alt="Rocket"></div>
            <button id="startButton">Start!</button>
            <button id="cashoutButton" class="cashout" disabled>Cash Out</button>
        </div>
        <div id="result" class="result hidden">
            <p id="message"></p>
        </div>
        <div class="probabilities">
            <h3>Probabilitas Crash: Acak (1.01x - 10x)</h3>
            <p>Cash out sebelum crash untuk dapat reward!</p>
        </div>
    `;
    
    // Event listener untuk spaceman
    document.getElementById('startButton').addEventListener('click', startSpaceman);
    document.getElementById('cashoutButton').addEventListener('click', cashoutSpaceman);
    document.getElementById('depositButton').addEventListener('click', deposit);
}

// Variabel global untuk spaceman
let spacemanInterval;
let currentMultiplier = 1.00;
let crashMultiplier;
let betAmount;

// Fungsi start spaceman
function startSpaceman() {
    const betInput = document.getElementById('betAmount');
    betAmount = parseInt(betInput.value);
    
    if (isNaN(betAmount) || betAmount < 1) {
        alert('Jumlah taruhan harus minimal 1!');
        return;
    }
    
    if (betAmount > balance) {
        alert('Saldo tidak cukup! Saldo Anda: ' + balance + ' Poin');
        return;
    }
    
    balance -= betAmount;
    updateBalance();
    
    document.getElementById('startButton').disabled = true;
    document.getElementById('cashoutButton').disabled = false;
    
    currentMultiplier = 1.00;
    crashMultiplier = Math.random() * 2 + 1.01; // Crash antara 1.01x sampai 10x (lebih cepat)
    
    // Animasi roket terbang dari kiri ke tengah
    const rocket = document.getElementById('rocket');
    rocket.classList.add('center'); // Terbang cepat ke tengah
    
    setTimeout(() => {
        // Mulai multiplier dan animasi berkedut
        spacemanInterval = setInterval(() => {
            currentMultiplier += 0.01;
            document.getElementById('multiplier').textContent = currentMultiplier.toFixed(2) + 'x';
            
            // Tambahkan animasi shake jika multiplier tinggi (ketegangan)
            if (currentMultiplier > 2.00) {
                rocket.classList.add('shake');
            }
            
            // Tambahkan efek zoom roket saat multiplier tinggi
            const scale = Math.min(1.5, 1 + (currentMultiplier - 1) * 0.1); // Zoom maksimal 1.5x saat multiplier tinggi
            rocket.style.transform = `translateX(-50%) scale(${scale})`;
            
            if (currentMultiplier >= crashMultiplier) {
                clearInterval(spacemanInterval);
                rocket.classList.add('crash');
                document.getElementById('startButton').disabled = false;
                document.getElementById('cashoutButton').disabled = true;
                const resultDiv = document.getElementById('result');
                const message = document.getElementById('message');
                message.textContent = 'Crash! Saldo -' + betAmount + ' Poin';
                resultDiv.className = 'result lose';
                resultDiv.classList.remove('hidden');
                setTimeout(() => {
                    rocket.classList.remove('crash', 'shake', 'center');
                    rocket.style.left = '-100px'; // Reset posisi
                    rocket.style.transform = 'translateX(-50%) scale(1)'; // Reset zoom
                }, 1000);
            }
        }, 100);
    }, 500); // Tunggu animasi terbang selesai
}

// Fungsi cashout spaceman
function cashoutSpaceman() {
    clearInterval(spacemanInterval);
    const reward = Math.floor(betAmount * currentMultiplier);
    balance += reward;
    updateBalance();
    
    document.getElementById('startButton').disabled = false;
    document.getElementById('cashoutButton').disabled = true;
    
    const resultDiv = document.getElementById('result');
    const message = document.getElementById('message');
    message.textContent = 'Cash Out! Saldo +' + reward + ' Poin';
    resultDiv.className = 'result win';
    resultDiv.classList.remove('hidden');
    
    // Reset roket
    const rocket = document.getElementById('rocket');
    rocket.classList.remove('shake', 'center');
    rocket.style.left = '-100px';
    rocket.style.transform = 'translateX(-50%) scale(1)'; // Reset zoom
}

// Fungsi toggle musik
function toggleMusic() {
    const music = document.getElementById('backgroundMusic');
    const button = document.getElementById('musicButton');
    
    if (music.paused) {
        music.play();
        button.textContent = '🎵 Pause Music';
    } else {
        music.pause();
        button.textContent = '🎵 Play Music';
    }
}

// Event listener untuk menu
document.getElementById('slotGame').addEventListener('click', loadSlotGame);
document.getElementById('diceGame').addEventListener('click', loadDiceGame);
document.getElementById('spacemanGame').addEventListener('click', loadSpacemanGame);
document.getElementById('musicButton').addEventListener('click', toggleMusic);

// Load default game
loadSlotGame();


