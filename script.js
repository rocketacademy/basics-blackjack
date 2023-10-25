var main = function (input) {
  var myOutputValue = "hello world";
  return myOutputValue;
};

// helper function to make deck
var makeDeck = function (suits) {
  // create the empty array that will be used to store the card objects
  var createdDeck = [];

  // create an array to store the suits
  var suits = ["spades", "hearts", "clubs", "diamonds"];

  for (var i = 0; i < suits.length; i++) {
    // for each suit, create the name and rank of the card
    var currentSuit = suits[i];
    // names are ace, 2 to 10, jack, queen and king
    // ranks are 1, 2 to 10, 11, 12 and 13
    // need a loop to iterate from 1 to and including 13 so we can get the currentRank. Then use if else to get the currentName
    var lastRank = 13;
    for (var currentRank = 1; currentRank <= lastRank; currentRank++) {
      var cardName = currentRank;
      if (currentRank == 1) cardName = "ace";
      else if (currentRank == 11) cardName = "jack";
      else if (currentRank == 12) cardName = "queen";
      else if (currentRank == 13) cardName = "king";
      var currentCard = {
        name: cardName,
        suit: currentSuit,
        rank: currentRank,
      };
      createdDeck.push(currentCard);
    }
  }
  return createdDeck;
};
