// deck.js contains code for generation of deck, shuffling of deck

export function makeDeck() {
  var cardDeck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];

    var rankCounter = 1;
    var points = rankCounter;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      if (cardName == 1) {
        cardName = "ace";
        points = 1;
      } else if (cardName == 11) {
        cardName = "jack";
        points = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        points = 10;
      } else if (cardName == 13) {
        cardName = "king";
        points = 10;
      } else {
        points = rankCounter;
      }

      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        points: points,
      };
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
}

var getRandomInt = function (max) {
  return Math.floor(Math.random() * max);
};

export function shuffleDeck(cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomInt(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    // swap position
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex += 1;
  }
  return cardDeck;
}
