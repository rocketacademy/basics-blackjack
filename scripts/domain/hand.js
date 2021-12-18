// HAND

class HandStatus {
  static IN_PLAY = new HandStatus();
  static SETTLED = new HandStatus();
  constructor() {}
}

class Hand {
  constructor() {
    /** @private @const {Card[]} */
    this._cards = [];
    /** @private @const {number} */
    this._bet = null;
    this._sponsor = null;
    this._status = HandStatus.IN_PLAY;
    this._id = uuidv4();
  }
  setBet = (amt) => {
    this._bet = amt;
    this._onSetBet(this._bet);
  };
  addBet = (amt) => this.setBet(this._bet + amt);
  setSponsor = (player) => (this._sponsor = player);

  getBet = () => this._bet;
  /**
   *
   * @param {Card} card
   */
  addCard = (card) => {
    this._cards.push(card);
    this._onAddCard(card);
  };

  getCards = () => this._cards;
  count = () => this._cards.length;
  getFaceValue = () => {
    return this._cards.reduce((sum, currentCard, _) => {
      return (sum += currentCard.getFaceValue());
    }, 0);
  };
  _onAddCard = (card) => {};
  setOnAddCard = (cb) => (this._onAddCard = cb);
  _onSetBet = (bet) => {};
  setOnSetBet = (cb) => {
    this._onSetBet = cb;
  };
  desc = () => `${this._cards.forEach((c) => `(${c.getString()})`)}`;
  id = () => this._id;
}
/**
 * newHand
 * @returns {Hand}
 */
const newHand = () => {
  return new Hand();
};

/**
 *
 * @param {Actor} actors
 */
const createHands = (actors) => {
  for (const actor of actors) {
    actor.createNewHand();
  }
};
