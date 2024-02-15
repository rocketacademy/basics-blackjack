//game modes
const INIT_GAME = `initialize game`;
const EVAL_OPTIONS = `evaluate options after drawing cards`;
const CHECK_RESULTS = `check for any results such as blackjack`;
const HIT_OR_STAND = `players decide to hit or stand`;
let mode = INIT_GAME;

//global variables
const playerHand = [];
const dealerHand = [];
const gameDeck = [];

//deck functions

function createDeck() {
  const cardDeck = [];
  const suits = [`Hearts`, `Diamonds`, `Clubs`, `Spades`];
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    for (let rankCount = 1; rankCount <= 13; rankCount += 1) {
      let cardName = rankCount;
      if (rankCount == 1) {
        cardName = `Ace`;
      } else if (rankCount == 11) {
        cardName = `Jack`;
      } else if (rankCount == 12) {
        cardName = `Queen`;
      } else if (rankCount == 13) {
        cardName = `King`;
      }
      const card = {
        name: cardName,
        rank: rankCount,
        suit: suits[suitIndex],
      };
      cardDeck.push(card);
    }
  }
  return cardDeck;
}

function getRandomIndex(arrayLength) {
  return Math.floor(Math.random() * arrayLength);
}

function shuffleDeck(cardDeck) {
  for (let i = 0; i < cardDeck.length; i += 1) {
    const randomIndex = getRandomIndex(cardDeck.length);
    const randomCard = cardDeck[i];
    cardDeck[i] = cardDeck[randomIndex];
    cardDeck[randomIndex] = randomCard;
  }
  return cardDeck;
}

function generateNewDeck() {
  const newDeck = createDeck();
  const shuffledDeck = shuffleDeck(newDeck);
  return shuffledDeck;
}

//game functions

function checkForBlackJack(hand) {
  let isBlackJack = false;
  const playerCardOne = hand[0];
  const playerCardTwo = hand[1];
  if (
    (playerCardOne.name = `Ace` && playerCardTwo.rank >= 10) ||
    (playerCardTwo.name = `Ace` && playerCardOne.rank >= 10)
  ) {
    isBlackJack = true;
  }
  return isBlackJack;
}

var main = function (input) {
  var myOutputValue = "hello world";
  return myOutputValue;
};
