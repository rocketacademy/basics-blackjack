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
