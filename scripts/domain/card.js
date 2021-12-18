//CARD
const SUIT_CLUBS = "CLUBS";
const SUIT_DIAMONDS = "DIAMONDS";
const SUIT_HEARTS = "HEARTS";
const SUIT_SPADES = "SPADES";

const FACE_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

const SUITS = [SUIT_CLUBS, SUIT_DIAMONDS, SUIT_HEARTS, SUIT_SPADES];

class Card {
  constructor(suit, faceVal) {
    this._suit = suit;
    this._faceVal = faceVal;
    this._isFaceUp = false;
    this.flip(false);
  }

  flip = (isToFaceUp) => {
    if (isToFaceUp === undefined || isToFaceUp === null) {
      throw `Please specify card face direction.`;
    }
    this._isFaceUp = isToFaceUp;
    this._onFlip(this._isFaceUp);
  };

  isFaceUp = () => this._isFaceUp;

  getSuit = () => this._suit;
  getFaceValue = () => this._faceVal;
  getString = () => `${this._suit}${this._faceVal}`;

  _onFlip = (isFaceUp) => {};
  setOnFlip = (fn) => (this._onFlip = fn);
}

const createNewCard = (suit, faceVal) => {
  return new Card(suit, faceVal);
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
  const card = sourceCards.pop();
  hand.addCard(card);
  return card;
};

/**
 * Deals two cards to hand
 * @param {Card[]} deck the deck to draw from
 * @param {Hand} hand insert card to hand
 * @returns
 */
const dealToHand = (deck, hand) => {
  transferTopCardToHand(deck, hand).flip(true);
  transferTopCardToHand(deck, hand).flip(true);
  return { deck, hand };
};

const dealToDealerHand = (deck, hand) => {
  transferTopCardToHand(deck, hand).flip(true);
  transferTopCardToHand(deck, hand);
};
