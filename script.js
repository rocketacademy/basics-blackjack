/* -------------------------------- */
/* ------- GLOBAL VARIABLES ------- */
/* -------------------------------- */

// empty arrays to store cards that computer and player draw.
let computerHand = [];
let playerHand = [];

/* -------------------------------- */
/* ------- HELPER FUNCTIONS ------- */
/* -------------------------------- */

// function to create deck of cards.
var makeDeck = function () {
  let suits = ["Hearts", "Spades", "Diamonds", "Clubs"];
  let names = [
    "Ace",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "Jack",
    "Queen",
    "King",
  ];

  let suitCounter = 0; // max 3 (total 4): hearts, spades, diamonds, clubs.
  let cardDeck = []; // array to store finished cards.

  while (suitCounter < suits.length) {
    let currentSuit = suits[suitCounter];
    let rankCounter = 0; // max 12 (total 13): ace, 2, 3, ..., 10, jack, queen, king.

    // loops through individual card names and pushes card object.
    while (rankCounter < names.length) {
      let currentName = names[rankCounter];
      let currentRank = rankCounter + 1;

      cardDeck.push({
        rank: currentRank,
        name: currentName,
        suit: currentSuit,
      });
      rankCounter++;
    }
    suitCounter++;
  }
  return cardDeck;
};

// function to get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// function to shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex = currentIndex + 1;
  }
  return cardDeck;
};

// takes the top card from the deck.
var drawCard = function (deck) {
  // let i = Math.floor(Math.random() * deck.length); // could also pop a random card... but that's not how you draw a card from a deck.
  return deck.pop(0);
};

/* -------------------------------- */
/* -------- GAME FUNCTIONS -------- */
/* -------------------------------- */

// create and shuffle the deck of cards.
let deck = makeDeck();
let shuffledDeck = shuffleCards(deck);

/* -------------------------------- */
/* --------- MAIN FUNCTION -------- */
/* -------------------------------- */

var main = function (input) {
  computerHand.push(drawCard(deck));
  computerHand.push(drawCard(deck));
  console.log(computerHand);
  playerHand.push(drawCard(deck));
  playerHand.push(drawCard(deck));
  console.log(playerHand);

  return computerHand[0], computerHand[1], playerHand[0], playerHand[1];
};
