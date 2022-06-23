var main = function (input) {
  var myOutputValue = "hello world";
  return myOutputValue;
};

// MAKE A CARD DECK
var makeDeck = function () {
  //first we make a deck case
  var cardDeck = [];

  //then we need a suits array
  var suits = [heart, diamond, spade, clover];
  var suitsIndex;

  //we loop over the suits array
  while (suitsIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }

      //create a card with name, suit and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      //Add the card to the deck
      cardDeck.push(Card);

      //increase rank
      rankCounter += 1;
    }

    suitIndex += 1;
  }

  return cardDeck;
};
