// Initialize global variables
let isStartOfGame = true;
let allPlayerCards = [];
let allPcCards = [];
let playerScore = [];
let pcScore = [];

// Helper functions

// Make an ordinary deck
const makeDeck = function () {
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
const getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

const makeShuffledDeck = function (deck) {
  for (let currentIndex = 0; currentIndex < deck.length; currentIndex++) {
    let currentCard = deck[currentIndex];
    let randomIndex = getRandomIndex(deck.length);
    let randomCard = deck[randomIndex];
    deck[currentIndex] = randomCard;
    deck[randomIndex] = currentCard;
  }
  return deck;
};

// Update cards ranks of face cards according to Blackjack's rules
const updateCardRanks = function (deckShuffled) {
  for (i = 0; i < deckShuffled.length; i++)
    if (
      deckShuffled[i].rank === 11 ||
      deckShuffled[i].rank === 12 ||
      deckShuffled[i].rank === 13
    ) {
      deckShuffled[i].rank = 10;
    }
  return deckShuffled;
};

// Draw multiple random cards
const drawMultipleCards = function (
  cardCount,
  allUserCards,
  blackjackDeckShuffled
) {
  for (let i = 0; i < cardCount; i++) {
    allUserCards.push(blackjackDeckShuffled.pop());
  }
  return allUserCards;
};

// Access cards ranks and store them in an array to calculate each user's scores
const accessCardRanks = function (userCard) {
  const allcardRanks = [];
  for (let i = 0; i < userCard.length; i++) {
    allcardRanks.push(userCard[i].rank);
  }
  return allcardRanks;
};

// Calculate each user's scores
const calculateScores = function (userCardRanks) {
  let sum = 0;
  for (let i = 0; i < userCardRanks.length; i++) {
    sum += userCardRanks[i];
  }
  return sum;
};

// Main function
const main = function (input) {
  // Create blackjackdeck
  const originalDeck = makeDeck();
  const shuffledDeck = makeShuffledDeck(originalDeck);
  const shuffledBlackjackDeck = updateCardRanks(shuffledDeck);

  // Each user gets 2 cards only at the start
  if (isStartOfGame) {
    allPlayerCards = drawMultipleCards(
      2,
      allPlayerCards,
      shuffledBlackjackDeck
    );
    allPcCards = drawMultipleCards(2, allPcCards, shuffledBlackjackDeck);
    isStartOfGame = false;
  }

  // Calculate each user's scores
  allPlayerCardRanks = accessCardRanks(allPlayerCards);
  allPcCardRanks = accessCardRanks(allPcCards);
  console.log("allPlayerCardRanks: " + allPlayerCardRanks);
  console.log("allPcCardRanks: " + allPcCardRanks);

  playerScore = calculateScores(allPlayerCardRanks);
  pcScore = calculateScores(allPcCardRanks);
  console.log("playerScore: " + playerScore);
  console.log("pcScore: " + pcScore);

  let myOutputValue = "hello world";
  return myOutputValue;
};

// Issues:
// Ace being rank 11 not accounted for yet
