/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const HEARTS = "hearts";
const DIAMONDS = "diamonds";
const CLUBS = "clubs";
const SPADES = "spades";

/**
 * ------------------------------------------------------------------------
 * Global Variables
 * ------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Helper Functions
 * ------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Creates a 52 card deck.
 * Each card has the following properties.
 * [name]   2, 3, ... , J, Q, K, A
 * [suit]   Hearts, Diamonds, Clubs, Spades
 * [emoji]  Emoji of the suit.
 * [value]
 * @return  {Array}       A deck grouped by suits and ordered from 2 to Ace.
 * ------------------------------------------------------------------------
 */

function createDeck() {
  var cardDeck = [];
  var suits = [HEARTS, DIAMONDS, CLUBS, SPADES];

  for (var suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    var currentSuit = suits[suitIndex];

    for (var rankCounter = 2; rankCounter <= 14, (rankCounter += 1); ) {
      var cardName = rankCounter;
      var cardValue = rankCounter;
      var suitEmoji;

      switch (cardName) {
        case 11:
          cardName = "J";
          cardValue = 10;
          break;
        case 12:
          cardName = "Q";
          cardValue = 10;
          break;
        case 13:
          cardName = "K";
          cardValue = 10;
          break;
        case 14:
          cardName = "A";
          cardValue = 11;
          break;
      }

      switch (currentSuit) {
        case HEARTS:
          suitEmoji = "♥";
          break;
        case DIAMONDS:
          suitEmoji = "♦";
          break;
        case CLUBS:
          suitEmoji = "♣";
          break;
        case SPADES:
          suitEmoji = "♠";
          break;
      }

      var card = {
        name: cardName,
        suit: currentSuit,
        emoji: suitEmoji,
        value: cardValue,
      };

      cardDeck.push(card);
    }
  }
  return cardDeck;
}

/**
 * ------------------------------------------------------------------------
 * A random index ranging from 0 (inclusive) to max (exclusive).
 * @param   {Number}    max     The maximum of the random number to be generated.
 * @return  {Number}            A random index.
 * ------------------------------------------------------------------------
 */

function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
}

/**
 * ------------------------------------------------------------------------
 * Shuffle the elements in the cardDeck array
 * @param   {Array}    cardDeck     The deck of cards to be shuffled.
 * @return  {Array}                 A shuffled deck.
 * ------------------------------------------------------------------------
 */

//
function shuffleCards(cardDeck) {
  for (
    var currentIndex = 0;
    currentIndex < cardDeck.length, (currentIndex += 1);

  ) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var cardHolder = cardDeck[randomIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = cardDeck[randomIndex];
    cardDeck[randomIndex] = cardHolder;
  }
  return cardDeck;
}

class Player {
  constructor(id) {
    this.id = id;
  }
}

/**
 * ------------------------------------------------------------------------
 * Main
 * ------------------------------------------------------------------------
 */

function main(input) {
  var deck = createDeck();
  var shuffledDeck = shuffleCards(deck)
  var output = "Hello World";
  return output;
}

/* Pseudocode
Create deck.
Shuffle deck.
User clicks Submit to deal cards.
The cards are analysed for game winning conditions, e.g. Blackjack.
Only one of dealer's card is displayed.
The user's hand is displayed to the user.
The user decides whether to hit or stand, using the submit button to submit their choice.
The user's cards are analysed for winning or losing conditions.
The computer decides to hit or stand automatically based on game rules.
The game either ends or continues.
 */
