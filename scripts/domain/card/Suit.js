class Suit {
  static CLUBS = new Suit("CLUBS");
  static DIAMONDS = new Suit("DIAMONDS");
  static HEARTS = new Suit("HEARTS");
  static SPADES = new Suit("SPADES");

  /**
   *
   * @param {string} desc
   */
  constructor(desc) {
    this._desc = desc;
  }
  desc = () => this._desc;
}
