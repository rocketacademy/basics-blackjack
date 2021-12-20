// HAND

class PlayerStatus {
  static IN_PLAY = new PlayerStatus();
  static BUSTED = new PlayerStatus();
  constructor() {}
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

  placeYourInitialBet = (dealer) => {
    const sponsor = this._controller;
    if (!sponsor) {
      throw new Error(`hand.placeYourInitialBet: sponsor required.`);
    }
    if (!dealer) {
      throw new Error(`hand.placeYourInitialBet: dealer required to arbit.`);
    }
    this._wager = new Wager();
    this._wager.setSponsor(sponsor);
    this._wager.setHand(this);

    const spon = this._wager.getSponsor();
    const hand = this._wager.getHand();
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
      `Awaiting wager on hand [${hand.getCards()}] sponsored by ${spon.getName()} with ${limit}`
    );

    this._onPlaceYourInitialBet(spon, hand, limit, dealer);
    this._wager.placeYourInitialBet(dealer);
  };

  _onPlaceYourInitialBet = () => {};

  setOnPlaceYourInitialBet = (cb) => {
    this._onPlaceYourInitialBet = cb;
  };

  initialBetStaked = () => {
    console.log(`hand notified of initial wager staked`);
  };
}
