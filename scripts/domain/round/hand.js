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

    this.splitCounter = 0; // to keep track i
  }

  id = () => this._id;
  count = () => this._cards.length;
  getCards = () => this._cards;
  addCard = (card) => {
    this._cards.push(card);
    this._onAddCard(card);
  };

  getHardTotal = () =>
    this._cards.reduce((sum, card) => {
      sum += card.getHardValue();
      return sum;
    }, 0);

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

  whatDoYouWantToDoOnSubsequentDeal = (dealer, options) => {
    console.group(`whatDoYouWantToDoOnSubsequentDeal`);
    if (!this._wager || !this._wager.getBet()) {
      return new Error(
        `[whatDoYouWantToDoOnSubsequentDeal] Non-compliance CRA-V6-3.14`
      );
    }
    this._onWhatDoYouWantToDoOnSubsequentDeal(dealer, options);
    console.groupEnd();
  };

  _onWhatDoYouWantToDoOnSubsequentDeal = (dealer, options) => {};

  setOnWhatDoYouWantToDoOnSubsequentDeal = (cb) =>
    (this._onWhatDoYouWantToDoOnSubsequentDeal = cb);

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

    this._onAskWageFoInitialBet(spon, hand, limit, dealer);
    this._wager.placeYourInitialBet(dealer);
  };

  _onAskWageFoInitialBet = () => {};

  setWhenGoingToAskForInitialBet = (cb) => {
    this._onAskWageFoInitialBet = cb;
  };

  initialBetStaked = () => {
    console.log(`hand notified of initial wager staked`);
  };
}
