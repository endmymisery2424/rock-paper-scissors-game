// get buttons
const rockButton = document.getElementById('rock');
const paperButton = document.getElementById('paper');
const scissorButton = document.getElementById('scissors');
const resetButton = document.getElementById('reset');
// get choices
const playerChoiceSpan = document.getElementById('playerchoice');
const enemyChoiceSpan = document.getElementById('enemychoice');
const result = document.getElementById('result');
const playerScoreSpan = document.getElementById('playerscore');
const enemyScoreSpan = document.getElementById('enemyscore');

// Score init with local storage
let playerScore = parseInt(localStorage.getItem('playerScoreRPS')) || 0;
let enemyScore = parseInt(localStorage.getItem('enemyScoreRPS')) || 0;

function updateScoreDisplay() {
    playerScoreSpan.textContent = playerScore;
    enemyScoreSpan.textContent = enemyScore;
}

// Call it when page load
updateScoreDisplay();

// Make a list of choices for computer to pick from.
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const choices = ['rock', 'paper', 'scissors'];

// Make enemy choice random...
function getEnemyChoice() {
    const randomChoice = Math.floor(Math.random() * choices.length);
    return choices[randomChoice];
}

// Determine the winner

function whoWinner(playerChoice, enemyChoice) {
    if (playerChoice === enemyChoice) {
        return "It's a Tie!!!";
    }
    // Conditions where player wins.
    if ((playerChoice === 'rock' && enemyChoice === 'scissors') || 
    (playerChoice === 'paper' && enemyChoice === 'rock') || 
    (playerChoice === 'scissors' && enemyChoice === 'paper')) {
        return "You Win!!!";
    } else {
        return "Enemy Wins!!!"
    }
}

// Function when button pressed
function playGame(playerChoice) {
    //const enemyChoice = getEnemyChoice();
    //const roundResult = whoWinner(playerChoice, enemyChoice);
    // Appending display, with delay to enemy.  
    playerChoiceSpan.textContent = capitalizeFirstLetter(playerChoice);

    
    enemyChoiceSpan.textContent = "Thinking...";
    result.textContent = "Enemy is choosing...";
    result.style.color = "orange"; 

    rockButton.disabled = true;
    paperButton.disabled = true;
    scissorButton.disabled = true;
    resetButton.disabled = true;

    setTimeout(() => {
      const enemyChoice = getEnemyChoice();
      const roundResult = whoWinner(playerChoice, enemyChoice);
      enemyChoiceSpan.textContent = capitalizeFirstLetter(enemyChoice); 
      result.textContent = roundResult;
    
        if (roundResult === "You Win!!!") {
            playerScore++;
            result.style.color = "green";
        } else if (roundResult === "Enemy Wins!!!") {
            enemyScore++;
            result.style.color = "red";
        } else {
            result.style.color = "blue";
        }
    
    // Save the score to localStorage using setItem.
    localStorage.setItem('playerScoreRPS', String(playerScore));
    localStorage.setItem('enemyScoreRPS', String(enemyScore));

    updateScoreDisplay();

    rockButton.disabled = false;
    paperButton.disabled = false;
    scissorButton.disabled = false; 
    resetButton.disabled = false;
    }, 3000);

}

function resetScores(){
    playerScore = 0;
    enemyScore = 0;
    localStorage.removeItem('playerScoreRPS');
    localStorage.removeItem('enemyScoreRPS');
    updateScoreDisplay();
    result.textContent = "Score successfully reset! Make a move!";
    result.style.color = "black";
}

// EVENT LISTENER FOR BUTTON CLICK

rockButton.addEventListener('click', () => {
    playGame('rock');
});

paperButton.addEventListener('click', () => {
    playGame('paper');
});

scissorButton.addEventListener('click', () => {
    playGame('scissors');
});

resetButton.addEventListener('click', resetScores);
