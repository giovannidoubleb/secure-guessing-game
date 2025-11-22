let chosenRange = 0;
let secretNumber = 0;
let attemptsRemaining = 0;
const previousGuesses = [];

// DOM Elements
const rangeSelector = document.getElementById('range-selection');
const beginBtn = document.getElementById('start-btn');
const gameArea = document.getElementById('game-section');
const chosenRangeDisplay = document.getElementById('selected-range');
const userGuessInput = document.getElementById('guess-input');
const verifyBtn = document.getElementById('check-btn');
const attemptsDisplay = document.getElementById('guesses-left');
const guessHistory = document.getElementById('guesses');
const endGamePopup = document.getElementById('game-over-modal');
const endGameText = document.getElementById('game-over-message');
const restartBtn = document.getElementById('play-again-btn');

// Event Listeners
document.querySelectorAll('input[name="range"]').forEach(option => {
    option.addEventListener('change', (e) => {
        chosenRange = parseInt(e.target.value);
        beginBtn.disabled = false;
    });
});

beginBtn.addEventListener('click', initializeGame);
verifyBtn.addEventListener('click', validateGuess);
restartBtn.addEventListener('click', () => location.reload());

// Functions
function initializeGame() {
    secretNumber = Math.floor(Math.random() * chosenRange) + 1;
    attemptsRemaining = calculateAttempts(chosenRange);
    previousGuesses.length = 0;

    rangeSelector.style.display = 'none';
    gameArea.style.display = 'block';
    chosenRangeDisplay.textContent = chosenRange;
    attemptsDisplay.textContent = attemptsRemaining;
}

function validateGuess() {
    const userGuess = parseInt(userGuessInput.value);
    if (isNaN(userGuess) || userGuess < 1 || userGuess > chosenRange) {
        alert('Please input a valid number within the selected range.');
        return;
    }

    previousGuesses.push(userGuess);
    attemptsRemaining--;
    attemptsDisplay.textContent = attemptsRemaining;

    // Update guess history
    const listItem = document.createElement('li');
    listItem.textContent = userGuess;
    guessHistory.appendChild(listItem);

    // Check user's guess
    if (userGuess === secretNumber) {
        concludeGame(true);
    } else if (attemptsRemaining === 0) {
        concludeGame(false);
    } else {
        const feedback = userGuess > secretNumber ? 'Too high. Try again!' : 'Too low. Try again!';
        alert(feedback);
    }

    userGuessInput.value = '';
}

function concludeGame(hasWon) {
    endGameText.textContent = hasWon ? 'You won! Great job!' : 'No attempts left. Better luck next time!';
    endGamePopup.style.display = 'flex';
}

function calculateAttempts(range) {
    if (range === 10) return 3;
    if (range === 100) return 7;
    if (range === 1000) return 10;
    return 0;
}