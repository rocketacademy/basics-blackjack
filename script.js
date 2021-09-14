var makeDeck = function () {
  var deck = [];
  var suitIndex = 0;
  var suits = ["hearts", "diamonds", "clubs", "spade"];
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    //console.log("current suit: " + currentSuit);
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
        name: cardName + " of " + currentSuit,
        suit: currentSuit,
        rank: rankCounter,
      };
      //console.log("rank: " + rankCounter);
      deck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return deck;
};

var shuffleDeck = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = Math.floor(Math.random() * cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex += 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

var dealCard = function () {
  var playerIndex = 0;
  while (playerIndex < playerCount) {
    cardHolders[playerIndex].push(deck.pop());
    playerIndex += 1;
  }
};

var determineWinner = function () {
  if (cardHolders[0][0].rank > cardHolders[1][0].rank) {
    return "player wins";
  } else if (cardHolders[0][0].rank < cardHolders[1][0].rank) {
    return "dealer wins";
  } else {
    return "it's a tie";
  }
};

var deck = makeDeck();

shuffleDeck(deck);

var playerCount = 2;
var cardHolders = [[], []];

var main = function (input) {
  var myOutputValue = "hello world";
  dealCard();
  myOutputValue = determineWinner();
  return myOutputValue;
};
