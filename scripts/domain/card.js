//CARD
const SUIT_CLUBS = "CLUBS";
const SUIT_DIAMONDS = "DIAMONDS";
const SUIT_HEARTS = "HEARTS";
const SUIT_SPADES = "SPADES";

const FACE_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

const SUITS = [SUIT_CLUBS, SUIT_DIAMONDS, SUIT_HEARTS, SUIT_SPADES];

/**
 * @typedef {Object} Card
 * @property {number} getSuit get suit of card
 * @property {number} getFaceValue get face value of card
 */

/**
 * Creates a new card
 * @param {string} suit
 * @param {number} faceVal
 * @returns {Card}
 */
const createNewCard = (suit, faceVal) => {
  /** @private @const {string} */
  let _suit = suit;
  /** @private @const {number} */
  let _faceVal = faceVal;

  return {
    suit,
    faceVal,
    getSuit: () => _suit,
    getFaceValue: () => _faceVal,
    getString: () => `${_suit}${_faceVal}`,
  };
};

/**
 * Generates a standard deck of cards
 * @returns {Card[]}
 */
const generateStandardDeck = () => {
  const deck = [];
  for (let suit of SUITS) {
    for (let faceValue of FACE_VALUES) {
      deck.push(createNewCard(suit, faceValue));
    }
  }
  return deck;
};

/**
 * Swap card positions in the deck
 * @param {Card[]} deck
 */
const shuffleDeck = (deck) => {
  const length = deck.length;
  for (let i = 0; i < length; i += 1) {
    const j = Math.floor(Math.random() * (length - i)) + i;
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

/**
 * Transfer one card from source to destination
 * @param {Card[]} sourceCards
 * @param {Hand} destCards
 */
const transferTopCardToHand = (sourceCards, hand) => {
  hand.addCard(sourceCards.pop());
};

/**
 * Deals two cards to hand
 * @param {Card[]} deck the deck to draw from
 * @param {Hand} hand insert card to hand
 * @returns
 */
const dealToHand = (deck, hand) => {
  transferTopCardToHand(deck, hand);
  transferTopCardToHand(deck, hand);
  return { deck, hand };
};
