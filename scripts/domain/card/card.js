class FaceValue {
  // Only Ace have soft value.
  static ACE = new FaceValue(1, 1, 11);

  /** CRA-V6-3.4.2 */
  static TWO = new FaceValue(2, 2);
  static THREE = new FaceValue(3, 3);
  static FOUR = new FaceValue(4, 4);
  static FIVE = new FaceValue(5, 5);
  static SIX = new FaceValue(6, 6);
  static SEVEN = new FaceValue(7, 7);
  static EIGHT = new FaceValue(8, 8);
  static NINE = new FaceValue(9, 9);
  static TEN = new FaceValue(10, 10);

  // Pictures
  static JACK = new FaceValue(11, 10);
  static QUEEN = new FaceValue(12, 10);
  static KING = new FaceValue(13, 10);

  /**
   *
   * @param {number} rank
   * @param {number} hardValue
   * @param {number} softValue
   */
  constructor(rank, hardValue, softValue) {
    this._rank = rank;
    this._hardValue = hardValue;
    this._softValue = softValue;
  }

  getRank = () => this._rank;
  getHardValue = () => this._hardValue;
  getSoftValue = () => this._softValue;
}

class Suit {
  //CARD
  static SUIT_CLUBS = new Suit("CLUBS");
  static SUIT_DIAMONDS = new Suit("DIAMONDS");
  static SUIT_HEARTS = new Suit("HEARTS");
  static SUIT_SPADES = new Suit("SPADES");

  /**
   *
   * @param {string} desc
   */
  constructor(desc) {
    this._desc = desc;
  }
  desc = () => this._desc;
}

class Card {
  /**
   *
   * @param {Suit} suit
   * @param {FaceValue} faceValue
   */
  constructor(suit, faceValue) {
    this._suit = suit;
    this._faceValue = faceValue;
    this._isFaceUp = null;
  }
  flip = (isToFaceUp) => {
    if (!(this._isFaceUp === true || this._isFaceUp === false)) {
      throw `Invalid card face direction.`;
    }
    this._isFaceUp = isToFaceUp;
    this._onFlip(this._isFaceUp);
  };

  isFaceUp = () => {
    if (this._isFaceUp === true || this._isFaceUp === false) {
      return this._isFaceUp;
    }
    throw new Error(`Card should be flipped at least once. `);
  };

  getSuitDesc = () => this._suit.desc();
  getHardValue = () => this._faceValue.getHardValue();
  getRank = () => this._faceValue.getRank();
  getString = () => `${this._suit}${this._faceValue}`;
  _onFlip = (isFaceUp) => {};
  setOnFlip = (fn) => (this._onFlip = fn);
}

const newCard = (suit, faceValue) => {
  const card = new Card(suit, faceValue);
  card.flip(false);
  return card;
};
