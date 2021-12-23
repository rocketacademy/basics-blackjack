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
    if (!(isToFaceUp === true || isToFaceUp === false)) {
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
  getFaceValue = () => this._faceValue;
  getHardValue = () => this._faceValue.getHardValue();
  getSoftValue = () => this._faceValue.getSoftValue();
  getRank = () => this._faceValue.getRank();
  getString = () => `${this._suit.desc()}${this._faceValue.getFaceString()}`;
  _onFlip = (isFaceUp) => {};
  setOnFlip = (fn) => (this._onFlip = fn);
  //
}
