var main = function (input) {
  var myOutputValue = "hello world";
  return myOutputValue;
};

var initializeDeck = function () {
  var suitList = ["spades", "hearts", "clubs", "diamonds"];
  var cardNumList = [
    "Ace",
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    "Jack",
    "Queen",
    "King",
  ];

  var suitLen = suitList.length;
  var cardLen = cardNumList.length;
  var unshuffledDeck = [];

  var currentCard = {};

  for (i = 0; i < suitLen; i++) {
    for (j = 0; j < cardLen; j++) {
      currentCard = {};
      currentCard.suit = suitList[i];
      currentCard.cardNum = cardNumList[j];
      currentCard.cardIndex = j + 1;
      unshuffledDeck.push(currentCard);
    }
  }
  return unshuffledDeck;
};
