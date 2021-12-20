// HAND

class PlayerStatus {
  static IN_PLAY = new PlayerStatus();
  static BUSTED = new PlayerStatus();
  constructor() {}
}

class Wager {
  constructor() {
    this._hand = null;
    this._sponsor = null;
    this._amt = null;
  }

  setHand = (hand) => (this._hand = hand);
  getHand = () => this._hand;
  setSponsor = (player) => {
    this._sponsor = player;
  };
  getSponsor = () => this._sponsor;
  setAmount = (amt) => {
    this._amt = amt;
  };

  _placeYourInitialBet = () => {
    console.group(`wage._placeYourInitialBet`);
    const spon = this.getSponsor();
    const hand = this.getHand();
    const limit = spon.getCredit();

    const anyNull = [hand, spon, limit].some(
      (e) => e === null || e === undefined
    );
    if (anyNull) {
      throw new Error(
        `Require not null args - hand ${!!hand} spon ${!!spon} limit ${!!limit}`
      );
    }
    console.log(
      `Awaiting wager on hand [${this._hand.getCards()}] sponsored by ${spon.getName()} with ${limit}`
    );

    console.groupEnd();
  };
}
class Hand {
  static FIRST_CARD = 0;
  static SECOND_CARD = 1;
  static THIRD_CARD = 2;
  static FOURTH_CARD = 3;
  static FIFTH_CARD = 4;
  constructor() {
    /** @private @const {Card[]} */
    this._cards = [];

    this._controller = null;
    this._status = PlayerStatus.IN_PLAY;
    this._id = uuidv4();
    this._wager = null;
  }

  id = () => this._id;
  count = () => this._cards.length;
  getCards = () => this._cards;
  addCard = (card) => {
    this._cards.push(card);
    this._onAddCard(card);
  };

  getWager = () => {
    return this._wager;
  };
  _onAddCard = (card) => {};
  setOnAddCard = (cb) => (this._onAddCard = cb);
  /**
   *
   * @param {Player} player
   */
  setController = (player) => {
    this._controller = player;
  };

  placeYourInitialBet = () => {
    const sponsor = this._controller;
    if (!sponsor) {
      throw new Error(`hand.placeYourInitialBet: sponsor required.`);
    }
    this._wager = new Wager();
    this._wager.setSponsor(sponsor);
    this._wager.setHand(this);
    this._wager._placeYourInitialBet(this._wager);
  };

  _onPlaceYourInitialBet = () => {};

  setOnPlaceYourInitialBet = (cb) => {
    this._onPlaceYourInitialBet = cb;
  };
}
