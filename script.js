// Constants
const suits = ["hearts", "diamonds", "clubs", "spades"];
const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
const startGame = "start";
const playGame = "playing";
const gameOver = "gameover";
const aceValue = 11;
const faceCardValue = 10;

// Global variables
let playerHand = [];
let dealerHand = [];
let deck = [];
let gameState = startGame;
let gameMessage = "Welcome Player! Type 'start' to start the game.";

// Function to Create Deck. Use for loop to create suit + value
function createDeck(suits, values) {
  const deck = [];
  for (let suit of suits) {
    for (let value of values) {
      deck.push({ suit, value });
    }
  }
  return deck;
}
// Function to Shuffle Deck. Use Fisher Yates example from Stack OverFlow
function shuffleDeck(deck) {
  const shuffledDeck = [...deck];
  for (let i = shuffledDeck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
  }
  return shuffledDeck;
}
// Function to Deal Cards. 
function dealCards(deck, count) {
  return deck.splice(0, count);
}
// Function to Calculate Player and Dealer Hand
function calculateScore(hand) {
  let score = 0;
  let aceCount = 0;

  for (let card of hand) {
    switch (card.value) {
      case "A":
        aceCount++;
        score += aceValue;
        break;
      case "K":
      case "Q":
      case "J":
        score += faceCardValue;
        break;
      default:
        score += parseInt(card.value);
        break;
    }
  }

  while (aceCount > 0 && score > 21) {
    aceCount--;
    score -= 10;
  }

  return score;
}
// Function for Dealer's Turn
function dealerTurn() {
  while (calculateScore(dealerHand) < 17) {
    if (deck.length > 0) {
      dealerHand.push(deck.shift());
    } else {
      gameMessage = "The deck is empty. The dealer cannot draw a card.";
      return;
    }
  }
}
// Main Function
function main(input) {
  input = input.toLowerCase();

  if (gameState === startGame && input === "start") {
    deck = shuffleDeck(createDeck(suits, values));
    playerHand = dealCards(deck, 2);
    dealerHand = dealCards(deck, 2);
    gameState = playGame;
    gameMessage = `You have been dealt: ${playerHand.map(card => `${card.value} of ${card.suit}`).join(", ")}.
    Type 'hit' to draw another card or 'stand' to stop.`;

  } else if (gameState === playGame) {
    if (input === "hit") {
      playerHand.push(deck.shift());
      let playerScore = calculateScore(playerHand);
      if (playerScore > 21) {
        gameState = gameOver;
        gameMessage = "Bust! You lose. Type 'reset' to play again.";
      }

    } else if (input === "stand") {
      dealerTurn();
      const dealerCards = dealerHand.map(card => `${card.value} of ${card.suit}`).join(", ");
      const dealerScore = calculateScore(dealerHand);
      const playerScore = calculateScore(playerHand);

      if (dealerScore > 21) {
        gameMessage = `The Dealer's hand is ${dealerCards} with a score of ${dealerScore}. Dealer busts and you win!`;
      } else if (dealerScore === playerScore) {
        gameMessage = `It's a tie! Dealer's hand: ${dealerCards}. Score: ${dealerScore}. Type 'start' to begin another game.`;
      } else if (dealerScore > playerScore) {
        gameMessage = `The Dealer's hand is ${dealerCards} with a score of ${dealerScore}. Dealer wins!` 
      } else {
        gameMessage = `You win! Dealer's hand: ${dealerCards}. Score: ${dealerScore}. Type 'start' to play again.`;
      }
      gameState = gameOver;
    } 
  } else if (gameState === gameOver && input === "reset") {
    playerHand.length = 0;
    dealerHand.length = 0;
    deck = shuffleDeck(createDeck(suits, values));

    gameState = startGame;
    gameMessage = "Welcome player! Type 'start' to start the game.";
  } else {
    gameMessage = "Invalid input.";
  }

  return gameMessage;
}
