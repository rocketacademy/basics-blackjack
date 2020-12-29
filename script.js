// card rank goes from 1-10, 11, 12, 13
// card suit - hearts, diamonds, spades, clubs
// car name - 1 is ace, 2-10, jack is 11, queen is 12, king is 13

var makeDeck = function () {
  var deck = [];

  var cardSuits = ['hearts', 'diamonds', 'spades', 'clubs'];
  var cardSuitIndex = 0;

  while (cardSuitIndex < cardSuits.length) {
    var cardSuit = cardSuits[cardSuitIndex];
    var cardRankIndex = 1;
    var cardName;
    while (cardRankIndex < 14) {
      if (cardRankIndex == 1) {
        cardName = 'Ace';
      }
      else if (cardRankIndex == 11) {
        cardName = 'Jack';
      }
      else if (cardRankIndex == 12) {
        cardName = 'Queen';
      }
      else if (cardRankIndex == 13) {
        cardName = 'King';
      }
      else {
        cardName = cardRankIndex;
      }
      var card = {
        name: cardName,
        rank: cardRankIndex,
        suit: cardSuit,
      };
      cardRankIndex += 1;
      deck.push(card);
    }
    cardSuitIndex += 1;
  }

  return deck;
};

// function is given an object containing ordered deck
// function returns shuffled deck
var shuffleDeck = function (deck) {
  var cardIndex = 0;
  while (cardIndex < deck.length) {
    var randomNumber;
    var placeHolder;
    randomNumber = cardIndex + Math.floor(Math.random() * (deck.length - cardIndex));
    placeHolder = deck[randomNumber];
    deck[randomNumber] = deck[cardIndex];
    deck[cardIndex] = placeHolder;
    cardIndex += 1;
  }
  return deck;
};

// On submit button being pressed, a card is drawn by computer and player to be compared
var main = function (input) {
  // create a shuffled pack of cards
  var shuffledCards = shuffleDeck(makeDeck());
  var myOutputValue = shuffledCards;
  return myOutputValue;
};
