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
