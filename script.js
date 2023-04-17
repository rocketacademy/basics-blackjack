// Initialize global variables
const WINNING_SCORE = 21;
const PROGRAM_STATE_INITIAL_ROUND = "PROGRAM_STATE_INITIAL_ROUND";
const PROGRAM_STATE_CHOOSE_HIT_OR_STAND = "PROGRAM_STATE_CHOOSE_HIT_OR_STAND";
let isStartOfGame = true;
let playerCards = [];
let pcCards = [];
let playerScore = 0;
let pcScore = 0;
let program_state = PROGRAM_STATE_INITIAL_ROUND;
let hasPlayerBusted = false;
let hasPcBusted = false;

// --- Helper functions ---

// Function to initialize game at the start
const initializeGame = function (shuffledBlackjackDeck) {
  // Each user gets 2 cards only at the start
  if (isStartOfGame) {
    playerCards = drawCards(2, playerCards, shuffledBlackjackDeck);
    pcCards = drawCards(2, pcCards, shuffledBlackjackDeck);
    isStartOfGame = false;
  }

  // Calculate each user's scores
  const playerCardValues = getCardValues(playerCards);
  const pcCardValues = getCardValues(pcCards);

  playerScore = calculateScores(playerCardValues);
  pcScore = calculateScores(pcCardValues);

  return `Player has: ${playerCards[0].name} of ${playerCards[0].suit} and ${playerCards[1].name} of ${playerCards[1].suit} with sum ${playerScore}. <br>
Computer has: ${pcCards[0].name} of ${pcCards[0].suit} and ${pcCards[1].name} of ${pcCards[1].suit} with sum ${pcScore}. <br>`;
};

// Function to make an ordinary deck
const createDeck = function () {
  const deck = [];
  const suits = ["hearts", "diamonds", "clubs", "spades"];
  for (let suitIndex = 0; suitIndex < 4; suitIndex++) {
    let currentSuit = suits[suitIndex];
    for (let rankIndex = 1; rankIndex <= 13; rankIndex++) {
      let cardName = rankIndex;
      if (rankIndex === 1) {
        cardName = "ace";
      } else if (rankIndex === 11) {
        cardName = "jack";
      } else if (rankIndex === 12) {
        cardName = "queen";
      } else if (rankIndex === 13) {
        cardName = "king";
      }
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankIndex,
      };
      deck.push(card);
    }
  }
  return deck;
};

// Function to shuffle the ordinary deck
const getRandomNumber = function (max) {
  return Math.floor(Math.random() * max);
};

const shuffleDeck = function (deck) {
  for (let currentIndex = 0; currentIndex < deck.length; currentIndex++) {
    let currentCard = deck[currentIndex];
    let randomIndex = getRandomNumber(deck.length);
    let randomCard = deck[randomIndex];
    deck[currentIndex] = randomCard;
    deck[randomIndex] = currentCard;
  }
  return deck;
};

// Function to update cards ranks of face cards according to Blackjack's rules
const updateCardValues = function (deckShuffled) {
  for (let i = 0; i < deckShuffled.length; i++)
    if (
      deckShuffled[i].rank === 11 ||
      deckShuffled[i].rank === 12 ||
      deckShuffled[i].rank === 13
    ) {
      deckShuffled[i].rank = 10;
    } else if (deckShuffled[i].rank === 1) {
      deckShuffled[i].rank = 11;
    }
  return deckShuffled;
};

// Function to draw 1 or more random cards
const drawCards = function (cardCount, userCards, blackjackDeckShuffled) {
  for (let i = 0; i < cardCount; i++) {
    userCards.push(blackjackDeckShuffled.pop());
  }
  return userCards;
};

// Function to access cards ranks and store them in an array to calculate each user's scores
const getCardValues = function (userCard) {
  const cardRanks = [];
  for (let i = 0; i < userCard.length; i++) {
    cardRanks.push(userCard[i].rank);
  }
  return cardRanks;
};

// Function to calculate each user's scores
const calculateScores = function (userCardValues) {
  let sum = 0;
  for (let i = 0; i < userCardValues.length; i++) {
    sum += userCardValues[i];
  }
  return sum;
};

// Function to hit 1 more card
const hitMoreCard = function (shuffledBlackjackDeck) {
  // Push 1 more card to and update the cards array
  // Reassign with '=' instead of += or another push below as drawCards function already updates the ENTIRE cards array with push
  playerCards = drawCards(1, playerCards, shuffledBlackjackDeck);

  const playerCardValues = getCardValues(playerCards);

  // Update the score with value of 1 more card hit
  // Reassign with '=' instead of += below as calculateScores function already updates the sum with ALL the card values
  playerScore = calculateScores(playerCardValues);

  // Update the output message of 1 more card
  return `Player has: ${playerCards[0].name} of ${playerCards[0].suit}, ${playerCards[1].name} of ${playerCards[1].suit}, and ${playerCards[2].name} of ${playerCards[2].suit} with sum ${playerScore}. <br>
Computer has: ${pcCards[0].name} of ${pcCards[0].suit} and ${pcCards[1].name} of ${pcCards[1].suit} with sum ${pcScore}. <br>`;
};

// Function to detect blackjack
const detectBlackjack = function (playerScore, pcScore) {
  let isThereBlackjack = false;
  if (
    (playerScore === WINNING_SCORE && pcScore === WINNING_SCORE) ||
    pcScore === WINNING_SCORE ||
    playerScore === WINNING_SCORE
  ) {
    isThereBlackjack = true;
  }
  return isThereBlackjack;
};

// Function to compare scores
const compareScores = function (playerScore, pcScore) {
  let didAnyoneHasBlackjack = detectBlackjack(playerScore, pcScore);
  let result = "";

  // If there is blackjack
  if (didAnyoneHasBlackjack) {
    if (playerScore === WINNING_SCORE && pcScore === WINNING_SCORE) {
      result = `Both player and computer have a blackjack. It's miraculously a draw!!!`;
    } else if (pcScore === WINNING_SCORE) {
      result = `Computer has a blackjack. Computer wins!!!`;
    } else if (playerScore === WINNING_SCORE) {
      result = `Player has a blackjack. Player wins!!!`;
    }
  }

  // If there is no blackjack
  else if (!didAnyoneHasBlackjack) {
    // If player has busted
    if (playerScore > WINNING_SCORE) {
      hasPlayerBusted = true;
    }
    // If pc has busted
    if (pcScore > WINNING_SCORE) {
      hasPcBusted = true;
    }
    // If both player and pc have busted
    if (hasPlayerBusted && hasPcBusted) {
      result = `Both player and computer have busted. It's miraculously a draw!!!`;
    }
    // If only player has busted
    else if (hasPlayerBusted && !hasPcBusted) {
      result = `Player has busted and lost. Computer wins!!!`;
    }
    // If only pc has busted
    else if (hasPcBusted && !hasPlayerBusted) {
      result = `Computer has busted and lost. Player wins!!!`;
    }
    // Remaining conditions if there is no blackjack and no one has busted
    else if (playerScore > pcScore) {
      result = `Player's sum of card values is closer to 21. Player wins!!!`;
    } else if (playerScore < pcScore) {
      result = `Computer's sum of card values is closer to 21. Computer wins!!!`;
    } else if (playerScore === pcScore) {
      result = `Both player and computer have the same sum of card values. It's miraculously a draw!!!`;
    }
  }
  return result;
};

// --- Main function ---
const main = function (input) {
  // Create blackjackdeck
  const originalDeck = createDeck();
  const shuffledDeck = shuffleDeck(originalDeck);
  const shuffledBlackjackDeck = updateCardValues(shuffledDeck);

  let myOutputValue = "";

  if (program_state === PROGRAM_STATE_INITIAL_ROUND) {
    myOutputValue = initializeGame(shuffledBlackjackDeck);
    program_state = PROGRAM_STATE_CHOOSE_HIT_OR_STAND;
  } else if (program_state === PROGRAM_STATE_CHOOSE_HIT_OR_STAND) {
    if (input === "h") {
      myOutputValue = hitMoreCard(shuffledBlackjackDeck);
    } else if (input === "s") {
      myOutputValue;
    }
  }

  // Update output message with final result
  const resultMessage = compareScores(playerScore, pcScore);

  console.log(playerScore);

  return `${myOutputValue} <br> Please enter "h" to hit or "s" to stand, then press Submit. <br> ${resultMessage}`;
};

// Issues:
// Ace being rank 1 upon busting not accounted for yet
// 2 aces totalling 22 may happen
// resultMessage appears in the initial round even if there is no blackjack
// `Please enter "h" to hit or "s" to stand, then press Submit.` appears every single round even after the game ends
