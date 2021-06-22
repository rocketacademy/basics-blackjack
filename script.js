// Project 3: Blackjack

var main = function (input) {
  var myOutputValue = "hello world";
  return myOutputValue;
};

// Generate deck of 52 playing cards
var makeDeck = function () {
  var deck = [];

  var suitIndex = 0;
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    console.log("current suit: " + currentSuit);

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
      console.log("rank: " + rankCounter);
      deck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return deck;
};

var deck = makeDeck();

// Shuffles deck of cards
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
