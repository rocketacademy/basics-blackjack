// Initialize global variables
let isStartOfGame = true;
let playerCards = [];
let pcCards = [];
let playerScore = 0;
let pcScore = 0;
const winningScore = 21;

// Helper functions

// Make an ordinary deck
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

// Shuffle the ordinary deck
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

// Update cards ranks of face cards according to Blackjack's rules
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

// Draw multiple random cards
const drawMultipleCards = function (
  cardCount,
  userCards,
  blackjackDeckShuffled
) {
  for (let i = 0; i < cardCount; i++) {
    userCards.push(blackjackDeckShuffled.pop());
  }
  return userCards;
};

// Access cards ranks and store them in an array to calculate each user's scores
const getCardValues = function (userCard) {
  const cardRanks = [];
  for (let i = 0; i < userCard.length; i++) {
    cardRanks.push(userCard[i].rank);
  }
  return cardRanks;
};

// Calculate each user's scores
const calculateScores = function (userCardValues) {
  let sum = 0;
  for (let i = 0; i < userCardValues.length; i++) {
    sum += userCardValues[i];
  }
  return sum;
};

// Compare scores
const compareScores = function (playerScore, pcScore) {
  let isThereBlackjack = false;
  let result = "";
  // If there is blackjack
  if (playerScore === winningScore && pcScore === winningScore) {
    isThereBlackjack = true;
    result = `Both player and computer have a blackjack. It's miraculously tied!!!`;
  } else if (pcScore === winningScore) {
    isThereBlackjack = true;
    result = `Computer has a blackjack. Computer wins!!!`;
  } else if (playerScore === winningScore) {
    isThereBlackjack = true;
    result = `Player has a blackjack. Player wins!!!`;
  }
  // If there is no blackjack
  else if (!isThereBlackjack) {
    if (playerScore > pcScore) {
      result = `Player's sum of card values is closer to 21. Player wins!!!`;
    } else if (playerScore < pcScore) {
      result = `Computer's sum of card values is closer to 21. Computer wins!!!`;
    } else if (playerScore === pcScore) {
      result = `Both player and computer have the same sum of card values. It's miraculously tied!!!`;
    }
  }
  return result;
};

// Main function
const main = function (input) {
  // Create blackjackdeck
  const originalDeck = createDeck();
  const shuffledDeck = shuffleDeck(originalDeck);
  const shuffledBlackjackDeck = updateCardValues(shuffledDeck);

  // Each user gets 2 cards only at the start
  if (isStartOfGame) {
    playerCards = drawMultipleCards(2, playerCards, shuffledBlackjackDeck);
    pcCards = drawMultipleCards(2, pcCards, shuffledBlackjackDeck);
    isStartOfGame = false;
  }

  // Calculate each user's scores
  const playerCardValues = getCardValues(playerCards);
  const pcCardValues = getCardValues(pcCards);
  console.log("PlayerCardRanks: " + playerCardValues);
  console.log("PcCardRanks: " + pcCardValues);

  playerScore = calculateScores(playerCardValues);
  pcScore = calculateScores(pcCardValues);
  console.log("playerScore: " + playerScore);
  console.log("pcScore: " + pcScore);

  // Update output message
  const resultMessage = compareScores(playerScore, pcScore);

  let myOutputValue = `Player has: ${playerCards[0].name} of ${playerCards[0].suit} and ${playerCards[1].name} of ${playerCards[1].suit} with sum ${playerScore}. <br>
Computer has: ${pcCards[0].name} of ${pcCards[0].suit} and ${pcCards[1].name} of ${pcCards[1].suit} with sum ${pcScore}. <br>
${resultMessage} <br>
Please enter "h" to hit or "s" to stand, then press Submit.`;
  return myOutputValue;
};

// Issues:
// Ace being rank 1 upon busting not accounted for yet
// 2 aces totalling 22 may happen
