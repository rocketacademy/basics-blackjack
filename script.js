// Constants for the game rules
const MAX_SCORE = 21;
const DEALER_HIT_THRESHOLD = 16;

// Variables to track game state
let gameIsOver = false;
let playerHasChosenToStand = false;
let playerHand = [];
let computerHand = [];
let username = "";

// Function to create a deck of Blackjack cards
const makeDeck = () => {
  const suits = ["hearts", "diamonds", "clubs", "spades"];
  const deck = [];

  // Loop through each suit and rank to create cards
  for (const suit of suits) {
    for (let rank = 1; rank <= 13; rank++) {
      // Determine the card name based on the rank
      let cardName = rank;
      if (cardName === 1) {
        cardName = "ace(11 or 1)";
      } else if (cardName >= 11 && cardName <= 13) {
        cardName = ["jack(10)", "queen(10)", "king(10)"][rank - 11];
      }

      // Create a card object and add it to the deck
      const card = {
        name: cardName,
        suit: suit,
        rank: Math.min(rank, 10), // Face cards have a rank of 10
      };

      deck.push(card);
    }
  }

  return deck;
};

// Function to get a random index within a range
const getRandomIndex = (size) => {
  return Math.floor(Math.random() * size);
};

// Function to shuffle an array of cards using the Fisher-Yates algorithm
const shuffleCards = (cards) => {
  for (let index = 0; index < cards.length; index++) {
    const randomIndex = getRandomIndex(cards.length);
    // Swap the current card with a randomly chosen card
    [cards[index], cards[randomIndex]] = [cards[randomIndex], cards[index]];
  }

  return cards;
};

// Create and shuffle the Blackjack deck
const blackjackDeck = shuffleCards(makeDeck());

// Function to deal a card to a hand
const dealCardToHand = (hand) => {
  hand.push(blackjackDeck.pop());
};

// Function to calculate the sum of cards in a hand, considering Aces' flexibility
const getHandSum = (hand) => {
  let numAcesInHand = 0;
  let sum = 0;

  for (const currCard of hand) {
    if (currCard.rank === 1) {
      numAcesInHand++;
      sum += 11;
    } else {
      sum += currCard.rank;
    }
  }

  // Adjust the sum if the hand contains Aces and it's busting
  while (sum > MAX_SCORE && numAcesInHand > 0) {
    sum -= 10;
    numAcesInHand--;
  }

  return sum;
};

// Function to check if a hand contains a Blackjack combination
const isBlackjack = (hand) => {
  return hand.length === 2 && getHandSum(hand) === MAX_SCORE;
};

// Function to convert a hand to a comma-separated string of card names
const convertHandToString = (hand) => {
  return hand.map((card) => card.name).join(", ");
};

// Function to generate the default output string showing player and computer hands
const getDefaultOutput = () => {
  return `You have: ${convertHandToString(playerHand)} with sum ${getHandSum(
    playerHand
  )}.<br>Computer has: ${convertHandToString(
    computerHand
  )} with sum ${getHandSum(computerHand)}.`;
};

// Main function that handles the game logic
const main = (input, userName) => {
  // If the user inputs their username, store it
  if (userName) {
    username = userName;
  }

  // Check if the game is already over
  if (gameIsOver) {
    return "The game is over. Please refresh to play again.";
  }

  // Deal initial cards to the player and computer
  if (playerHand.length === 0) {
    dealCardToHand(playerHand);
    dealCardToHand(computerHand);
    dealCardToHand(playerHand);
    dealCardToHand(computerHand);

    // Check for Blackjack combinations
    if (isBlackjack(computerHand)) {
      gameIsOver = true;
      return `${getDefaultOutput()} <br>Computer has Blackjack and wins. Please refresh to play again.`;
    }

    if (isBlackjack(playerHand)) {
      gameIsOver = true;
      return `${getDefaultOutput()} <br>You have Blackjack and you win!!!!!!!!!. Please refresh to play again.`;
    }

    // Prompt the player to choose "hit" or "stand"
    return `${getDefaultOutput()} <br>Please enter "hit" or "stand", then press Submit`;
  }

  // Player's turn
  if (!playerHasChosenToStand) {
    // Validate player input
    if (input !== "hit" && input !== "stand") {
      return 'Please input either "hit" or "stand" as possible moves in Blackjack';
    }

    if (input === "hit") {
      dealCardToHand(playerHand);

      // Check if the player busts
      if (getHandSum(playerHand) > MAX_SCORE) {
        gameIsOver = true;
        return `${getDefaultOutput()} <br> You have busted and lost the game.<br>The Computer Wins.<br> Please refresh to play again.`;
      }
    }

    if (input === "stand") {
      playerHasChosenToStand = true;
    }
  }

  // Computer's turn
  const computerHandSum = getHandSum(computerHand);

  // The computer hits until the sum is above the dealer's hit threshold
  if (computerHandSum <= DEALER_HIT_THRESHOLD) {
    dealCardToHand(computerHand);

    // Check if the computer busts
    if (getHandSum(computerHand) > MAX_SCORE) {
      gameIsOver = true;
      return `${getDefaultOutput()} <br>The computer have busted and lost the game.<br>You win the game. <br>Please refresh to play again.`;
    }
  }

  // Both player and computer have finished their actions, determine the winner
  if (playerHasChosenToStand && computerHandSum > DEALER_HIT_THRESHOLD) {
    gameIsOver = true;

    if (getHandSum(playerHand) > computerHandSum) {
      return `${getDefaultOutput()} <br>You win!!!!!!! Please refresh to play again.`;
    } else {
      return `${getDefaultOutput()} <br>The computer win!!!!!!! Please refresh to play again.`;
    }
  }

  // If the game is not over, display the current game status
  const statusMessage = `${getDefaultOutput()} <br><br>playerHasChosenToStand is ${playerHasChosenToStand}<br><br>If the player has not yet chosen to stand, please enter "hit" or "stand".<br><br>Otherwise, press Submit to see the computer's next move.`;
  return username ? `${username}, ${statusMessage}` : statusMessage;
};
