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
