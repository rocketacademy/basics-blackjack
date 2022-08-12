var playerTurn = "player turn";
var computerTurn = "computer turn";
var drawCard = "draw card";
var hitOrStay = "hit or stay";
var gameMode = drawCard;
var currentPlayer = playerTurn;

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
      //add card value
      var cardValue = rankCounter;
      if (rankCounter == 1) {
        cardName = "ace";
        cardValue = 1 || 11;
      } else if (rankCounter == 11) {
        cardName = "jack";
        cardValue = 10;
      } else if (rankCounter == 12) {
        cardName = "queen";
        cardValue = 10;
      } else if (rankCounter == 13) {
        cardName = "king";
        cardValue = 10;
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: cardValue,
      };
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};

var main = function (input) {
  console.log(`current game mode: ${gameMode}`);
  console.log(`current player: ${currentPlayer}`);
  var myOutputValue = "";
  return myOutputValue;
};
