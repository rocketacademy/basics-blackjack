// Declare game modes
var gameStartMode = `game start`;
var cardsDrawnMode = `cards drawn`;
var resultsShownMode = `results shown`;
var currentGameMode = gameStartMode;

// Declare variables to store player and dealer hands
var playerHand = [];
var dealerHand = [];

// Declare variable to hold deck of cards
var gameDeck = "empty at the start";

// 1. Deck is shuffled.
var makeDeck = function () {
  console.log(`control flow: start of makeDeck`);
  var cardDeck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};

var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

var shuffleCards = function (cards) {
  var currentIndex = 0;
  while (currentIndex < cards.length) {
    var randomIndex = getRandomIndex(cards.length);
    var randomCard = cards[randomIndex];
    var currentCard = cards[currentIndex];
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
    currentIndex = currentIndex + 1;
  }
  return cards;
};

var shuffledDeck = shuffleCards(makeDeck());

// 2. User clicks Submit to deal cards.
// 3. The cards are analysed for game winning conditions, e.g. Blackjack.
// 4. The cards are displayed to the user.
// 5. The user decides whether to hit or stand, using the submit button to submit their choice.
// 6. The user's cards are analysed for winning or losing conditions.
// 7. The computer decides to hit or stand automatically based on game rules.
// 8. Comparing both hands and determining a winner. The possible scenarios are:
//    A tie. When both the player and dealer have the same total hand values - or if both draw Blackjack
//    A Blackjack win. When either player or dealer draw Blackjack.
//    A normal win. When neither draw Blackjack, the winner is decided by whomever has the higher hand total.

var main = function (input) {
  var myOutputValue = "hello world";
  return myOutputValue;
};
