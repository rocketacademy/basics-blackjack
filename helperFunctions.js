/***
 * Makes a new 52 card deck
 * @returns {Array} an array of a playing card objects
 */
var makeDeck = function () {
  var cardSuits = ["S", "H", "C", "D"];
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
        svg: `<div class = "handContainer"><img class="card" src="svg/${currentSuit}${cardText[j]}.svg" /></div>`,
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

/***
 * Calculates the hand blackjack value
 * @argument {Array} cardArray The current blackjack hand
 * @returns {number} the total blackjack value of the hand.
 */
var calculateHand = function (cardArray) {
  var calculatedValue = 0;
  var acesInHand = 0;
  for (var i = 0; i < cardArray.length; i += 1) {
    //if it's an ace
    if (cardArray[i].rank == 1) {
      acesInHand += 1;
      continue;
    }
    //rank > 10 means Jack Queen King
    if (cardArray[i].rank > 10) {
      calculatedValue += 10;
      continue;
    }
    calculatedValue += cardArray[i].rank;
  }

  if (acesInHand) {
    var aceValues = calcuateAceValue(acesInHand);
    if (calculatedValue + aceValues[0] <= 21)
      return (calculatedValue += aceValues[0]);
    return (calculatedValue += aceValues[1]);
  }

  return calculatedValue;
};

/***
 * Calculates the maximum and minimum value of the Ace cards in the hand
 * @argument {number} numberofAces The number of Aces in hand.
 * @returns {Array} The maximum and minimum value of the Aces in hand where [0] is the max value, and [1] is the minimum value
 */
var calcuateAceValue = function (numberofAces) {
  var maxValue = 10 + numberofAces;
  var minValue = numberofAces;
  return [maxValue, minValue];
};

var dealGame = function () {};
