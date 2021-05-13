var shuffledDeck = [];

// create a new deck of cards
var buildDeck = function () {
  // 3 properties of the object
  // 1: suit (4 types)
  // 2: rank (1-13)
  // 3: name (13 types)
  var suits = ["diamonds", "clubs", "hearts", "spades"];
  var cardDeck = [];
  var suitCounter = 0;
  var cardName = "";
  while (suitCounter < suits.length) {
    //set suit
    var currentSuit = suits[suitCounter];

    // set rank and name
    var rankCounter = 1;
    var currentRank = 1;
    while (rankCounter <= 13) {
      currentRank = rankCounter;
      if (rankCounter == 11) {
        cardName = "jack";
      } else if (rankCounter == 12) {
        cardName = "queen";
      } else if (rankCounter == 13) {
        cardName = "king";
      } else {
        cardName = currentRank;
      }

      //create a new card
      var singleCard = {
        suit: currentSuit,
        rank: currentRank,
        name: cardName,
      };
      cardDeck.push(singleCard);
      rankCounter += 1;
    }
    suitCounter += 1;
  }
  return cardDeck;
};

var shuffleDeck = function () {
  var cardDeck = buildDeck();
  for (i = 1; i < cardDeck.length; i++) {
    var j = Math.floor(Math.random() * 52);
    var currentCard = cardDeck[i];
    var randomCard = cardDeck[j];
    cardDeck[i] = randomCard;
    cardDeck[j] = currentCard;
  }
  return cardDeck;
};

var main = function (input) {
  var myOutputValue = "hello world";
  var neatDeck = buildDeck();
  console.log(neatDeck);
  shuffledDeck = shuffleDeck();
  console.log(shuffledDeck);
  return "it's been shuffled";
};
