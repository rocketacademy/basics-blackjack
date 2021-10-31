// Global variables
var currentGameMode = "";
var playerHandScore = "";
var computerHandScore = "";

var getRandomIndex = function (array) {
  return Math.floor(Math.random() * array.length);
};

var getDeckOfCards = function () {
  var deckOfCards = [];
  var suits = ["Diamonds", "Clubs", "Hearts", "Spades"];

  for (var suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    var currentSuit = suits[suitIndex];
    for (var rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      var currentRank = rankCounter;
      var currentName = String(rankCounter);

      if (rankCounter == 1) {
        currentName = "Ace";
      } else if (rankCounter == 11) {
        currentName = "Jack";
      } else if (rankCounter == 12) {
        currentName = "Queen";
      } else if (rankCounter == 13) {
        currentName = "King";
      }

      var card = {
        rank: currentRank,
        suit: currentSuit,
        name: currentName,
      };

      deckOfCards.push(card);
    }
  }
  return deckOfCards;
};

console.log(getDeckOfCards().length);
console.log(getRandomIndex(getDeckOfCards()));

var shufflingCards = function (deckOfCards) {
  for (
    var currentIndex = 0;
    currentIndex < deckOfCards.length;
    currentIndex += 1
  ) {
    var randomIndex = getRandomIndex(deckOfCards);
    var currentCard = deckOfCards[currentIndex];
    var randomCard = deckOfCards[randomIndex];

    deckOfCards[randomIndex] = currentCard;
    deckOfCards[currentIndex] = randomCard;
  }

  return deckOfCards;
};

console.log(shufflingCards(getDeckOfCards()));

var main = function (input) {
  var myOutputValue = "hello world";
  return myOutputValue;
};
