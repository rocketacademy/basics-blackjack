var playerTurn = "player turn";
var computerTurn = "computer turn";

//making the deck of cards
var makeDeck = function () {
  var cardDeck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var suitIndex = 0;
  while (suitIndex < suitIndex.length) {
    var currentSuit = suits[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      if (rankCounter == 1) {
        cardName = "ace";
      } else if (rankCounter == 11) {
        cardName = "jack";
      } else if (rankCounter == 12) {
        cardName = "queen";
      } else if (rankCounter == 13) {
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

// //assigning blackjack value to face cards
// var storeValues = function () {
//   while (rankCounter == 2 - 10) {}
//   return cardValue;
// };

// var main = function (input) {
//   var myOutputValue = "hello world";
//   return myOutputValue;
// };
