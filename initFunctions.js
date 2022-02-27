var makeDeck = function () {
  var cardSuits = ["♠", "♥", "♣", "♦"];
  var cardText = [
    "Ace",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Jack",
    "Queen",
    "King",
  ];
  var createdDeck = [];
  for (var i = 0; i < cardSuits.length; i += 1) {
    var currentSuit = cardSuits[i];
    for (var j = 0; j < cardText.length; j += 1) {
      var newCard = {
        suit: currentSuit,
        rank: j + 1,
        text: cardText[j],
      };
      createdDeck.push(newCard);
    }
  }
  return createdDeck;
};

var shuffleDeck = function (deckToShuffle) {
  for (var i = 0; i < deckToShuffle.length; i += 1) {
    var randomIndex = Math.floor(Math.random() * deckToShuffle.length);
    var randomCard = deckToShuffle[randomIndex];
    var currentCard = deckToShuffle[i];
    deckToShuffle[randomIndex] = currentCard;
    deckToShuffle[i] = randomCard;
  }
  return deckToShuffle;
};
