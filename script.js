// Constants for the game rules
const MAX_SCORE = 21;
const DEALER_HIT_THRESHOLD = 17;

// Constants for card symbols and colors
const cardSymbols = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];
const cardSuits = ["♠️", "♣️", "♥️", "♦️"]; // Spades, Clubs, Hearts, Diamonds

// Function to get a random card value
const getRandomCardValue = () => {
  const randomIndex = Math.floor(Math.random() * cardSymbols.length);
  return cardSymbols[randomIndex];
};

// Function to get a random card suit
const getRandomCardSuit = () => {
  const randomIndex = Math.floor(Math.random() * cardSuits.length);
  return cardSuits[randomIndex];
};

// Function to deal a card to a hand
const dealCardToHand = (hand) => {
  const cardValue = getRandomCardValue();
  const cardSuit = getRandomCardSuit();
  hand.push(cardValue + " " + cardSuit);
};

// Function to calculate the sum of cards in a hand, considering Aces' flexibility
const getHandSum = (hand) => {
  let numAcesInHand = 0;
  let sum = 0;

  for (const currCard of hand) {
    if (currCard[0] === "A") {
      numAcesInHand++;
      sum += 11;
    } else if (["J", "Q", "K"].includes(currCard[0])) {
      sum += 10;
    } else {
      sum += parseInt(currCard[0]);
    }
  }

  while (sum > MAX_SCORE && numAcesInHand > 0) {
    sum -= 10;
    numAcesInHand--;
  }

  return sum;
};

// Function to check if a hand has a Blackjack
const isBlackjack = (hand) => {
  return hand.length === 2 && getHandSum(hand) === MAX_SCORE;
};

let playerHand = [];
let computerHand = [];
let gameIsOver = false;
let playerHasChosenToStand = false;

// Function to start the game
const startGame = () => {
  playerHand = [];
  computerHand = [];
  gameIsOver = false;
  playerHasChosenToStand = false;

  // Deal two cards to the player and two cards to the computer
  dealCardToHand(playerHand);
  dealCardToHand(computerHand);
  dealCardToHand(playerHand);
  dealCardToHand(computerHand);

  // Check if player or computer has a Blackjack from the first draw
  if (isBlackjack(playerHand)) {
    gameIsOver = true;
    playerHasChosenToStand = true;
    updateOutput(
      `You have: ${getHandString(playerHand)} (${getHandSum(
        playerHand
      )})<br>Computer has: ${getHandString(computerHand)} (${getHandSum(
        computerHand
      )})<br>You have BLACKJACK! You win!`
    );
  } else if (isBlackjack(computerHand)) {
    gameIsOver = true;
    playerHasChosenToStand = true;
    updateOutput(
      `You have: ${getHandString(playerHand)} (${getHandSum(
        playerHand
      )})<br>Computer has: ${getHandString(computerHand)} (${getHandSum(
        computerHand
      )})<br>Computer has BLACKJACK! Computer wins!`
    );
  } else {
    updateOutput();
    document.getElementById("start-button").style.display = "none";
    document.getElementById("hit-button").style.display = "inline-block";
    document.getElementById("hitx2-button").style.display = "inline-block";
    document.getElementById("stand-button").style.display = "inline-block";
  }
};

// Function to handle the "Hit" button click
const handleHitButtonClick = () => {
  if (!gameIsOver && !playerHasChosenToStand) {
    dealCardToHand(playerHand);

    if (getHandSum(playerHand) === MAX_SCORE) {
      gameIsOver = true;
      playerHasChosenToStand = true;
      updateOutput();
      displayResult();
    } else if (getHandSum(playerHand) > MAX_SCORE) {
      gameIsOver = true;
      playerHasChosenToStand = true;
      updateOutput();
      displayResult();
    } else {
      updateOutput();
    }
  }
};

// Function to handle the "Hit x2" button click
const handleHitx2ButtonClick = () => {
  if (!gameIsOver && !playerHasChosenToStand) {
    dealCardToHand(playerHand);
    dealCardToHand(playerHand);

    if (getHandSum(playerHand) > MAX_SCORE) {
      gameIsOver = true;
      playerHasChosenToStand = true;
      updateOutput();
      displayResult();
    } else {
      updateOutput();
    }
  }
};

// Function to handle the "Stand" button click
const handleStandButtonClick = () => {
  if (!gameIsOver && !playerHasChosenToStand) {
    playerHasChosenToStand = true;

    while (!gameIsOver) {
      const computerHandSum = getHandSum(computerHand);
      if (
        isBlackjack(computerHand) ||
        computerHandSum > MAX_SCORE ||
        computerHandSum >= DEALER_HIT_THRESHOLD
      ) {
        gameIsOver = true;
        updateOutput();
        displayResult();
      } else {
        dealCardToHand(computerHand);
      }
    }
  }
};

// Function to display the game result along with hands
const displayResult = () => {
  let result = "";
  let playerHandString = `${getHandString(playerHand)} (${getHandSum(
    playerHand
  )})`;
  let computerHandString = `${getHandString(computerHand)} (${getHandSum(
    computerHand
  )})`;

  if (gameIsOver) {
    const playerSum = getHandSum(playerHand);
    const computerSum = getHandSum(computerHand);

    if (playerSum > MAX_SCORE || computerSum === MAX_SCORE) {
      result = "Computer wins!";
    } else if (playerSum === computerSum) {
      result = "It's a tie!";
      playerHandString += " (Tie Blackjack)";
      computerHandString += " (Tie Blackjack)";
    } else if (playerSum > computerSum) {
      result = "You win!";
    } else {
      result = "Computer wins!";
    }
  }

  const outputDiv = document.getElementById("output-div");
  outputDiv.innerHTML = `You have: ${playerHandString}<br>Computer has: ${computerHandString}<br>${result}...Game Over.`;
};

// Function to update the output with the current game status
const updateOutput = (message = null) => {
  const outputDiv = document.getElementById("output-div");

  if (message) {
    outputDiv.innerHTML = message;
  } else {
    outputDiv.innerHTML = `You have: ${getHandString(playerHand)} (${getHandSum(
      playerHand
    )}).<br>Computer has: ${getHandString(computerHand, true)} (${getHandSum(
      computerHand
    )}).`;
  }
};

// Function to get the string representation of a hand with card symbols and colors

const getHandString = (hand, hideFirstCard = false) => {
  const handStringArray = [];

  for (let i = 0; i < hand.length; i++) {
    const card = hand[i];
    handStringArray.push(`<span class="card">${card}</span>`);
  }

  return handStringArray.join(", ");
};

// Attach event listeners to buttons
document.getElementById("start-button").addEventListener("click", startGame);
document
  .getElementById("hit-button")
  .addEventListener("click", handleHitButtonClick);
document
  .getElementById("hitx2-button")
  .addEventListener("click", handleHitx2ButtonClick);
document
  .getElementById("stand-button")
  .addEventListener("click", handleStandButtonClick);

// Attach the "handleRefreshButtonClick" function to the "Refresh" button click event
const refreshButton = document.getElementById("refresh-button");
refreshButton.addEventListener("click", () => {
  // Reload the page to reset the game state
  location.reload();
});
