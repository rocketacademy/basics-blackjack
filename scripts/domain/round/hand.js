// HAND

class PlayerStatus {
  static IN_PLAY = new PlayerStatus();
  static BUSTED = new PlayerStatus();
  constructor() {}
}

class Wager {
  constructor() {
    this._sponsor = null;
    this._amt = null;
  }
  setSponsor = (player) => {
    this._sponsor = player;
  };

  getSponsor = () => this._sponsor;
  setAmount = (amt) => {
    this._amt = amt;
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
    this._placeYourInitialBet(this._wager);
  };

  _placeYourInitialBet = (wager) => {
    console.group(`hand._placeYourInitialBet`);
    const spon = wager.getSponsor();
    if (spon === undefined || spon === null) {
      throw new Error(`Require not null arg`);
    }
    const limit = spon.getCredit();

    const anyNull = [spon, limit].some((e) => e === null || e === undefined);
    if (anyNull) {
      throw new Error(`Require not null args`);
    }
    console.log(
      `Awaiting wager on hand [${
        this._cards
      }] sponsored by ${spon.getName()} with ${limit}`
    );

    this._onPlaceYourInitialBet(wager, spon, limit);
    console.groupEnd();
  };

  _onPlaceYourInitialBet = () => {};

  setOnPlaceYourInitialBet = (cb) => {
    this._onPlaceYourInitialBet = cb;
  };
}
