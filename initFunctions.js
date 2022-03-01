/***
 * Makes a new 52 card deck
 * @returns {Array} an array of a playing card objects
 */
var makeDeck = function () {
  var cardSuits = ["♠", "♥", "♣", "♦"];
  var cardText = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "T",
    "J",
    "Q",
    "K",
  ];
  var createdDeck = [];
  for (var i = 0; i < cardSuits.length; i += 1) {
    var currentSuit = cardSuits[i];
    for (var j = 0; j < cardText.length; j += 1) {
      var newCard = {
        suit: currentSuit,
        rank: j + 1,
        text: cardText[j],
        svg: `<object data="${currentSuit}${cardText[j]}" type="image/svg+xml" id="cardsvg" width="300px" height="300px"></object>`,
      };
      createdDeck.push(newCard);
    }
  }
  return createdDeck;
};

/***
 * Shuffles a card deck
 * @argument {Array} deckToShuffle The deck to be shuffled
 * @returns {Array} the shuffled deck
 */
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
