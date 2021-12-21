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
    this._id = uuidv4();
    this._wager = null;

    this.splitCounter = 0; // to keep track i

    this._isSurrendered = false;
  }

  getController = () => this._controller;
  isSurrendered = () => this._isSurrendered;

  isBlackJack = () => {
    return (
      (this._cards.length === 2 &&
        this._generallyAceWithPicture(this._cards[0], this._cards[1])) ||
      this._generallyAceWithPicture(this._cards[0], this._cards[1])
    );
  };

  _getBestValue = (cards, i = 0, length, v = 0) => {
    if (v > Deck.POINT_TWENTY_ONE) {
      return null;
    }
    if (i === length) {
      return v;
    }

    const card = cards[i];
    const hardValue = card.getHardValue();
    const rank = card.getRank();
    let hardVal = this._getBestValue(cards, i + 1, length, v + hardValue);
    if (rank === FaceValue.ACE) {
      const soft = card.getSoftValue();
      return hardVal || this._getBestValue(cards, i + 1, length, v + soft);
    }
    return hardVal;
  };

  getBestValue = () => this._getBestValue(this._cards, 0, this._cards.length);

  hasTwentyOne = () => {
    const bestPoint = this._getBestValue(this._cards, 0, this._cards.length);
    return bestPoint === Deck.POINT_TWENTY_ONE;
  };

  _generallyAceWithPicture = (c1, c2) => {
    if (c1.getHardValue() === 1) {
      const c2HardValue = c2.getHardValue();
      if (c2 === 10) {
        return true;
      }
      return false;
    }
  };
  // No good form :()
  isBusted = () => {
    return this._getBestValue(this._cards, 0, this._cards.length) === null;
  };

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

  getWager = () => this._wager;
  _onAddCard = (card) => {};
  setOnAddCard = (cb) => (this._onAddCard = cb);
  /**
   *
   * @param {Player} player
   */
  setController = (player) => {
    this._controller = player;
  };

  howMuchWagerDouble = (dealer) => {
    this._onhowMuchWagerDouble();
    this._wager.pleasePlaceYourDouble(dealer);
  };

  _onhowMuchWagerDouble = (dealer, limit) => {};
  setOnHowMuchWagerDouble = (cb) => (this._onhowMuchWagerDouble = cb);

  whatDoYouWantToDoOnSubsequentDeal = (dealer, options) => {
    if (!options) {
      throw new Error(`Option required for subsequent deal`);
    }
    if (!Object.values(options).some((is) => is === true)) {
      throw new Error(`No good options... Please don't ask the hand.`);
    }
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

  placeWageInitialBet = (dealer) => {
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

    this._onAskWagerFoInitialBet();
    this._wager.placeYourInitialBet(dealer);
  };

  _onAskWagerFoInitialBet = () => {};

  setWhenGoingToAskForInitialBet = (cb) => {
    this._onAskWagerFoInitialBet = cb;
  };
  doubledDown = () => {
    console.log(`hand notified of wager doubledDown`);

    this._onDoubledDown();
  };

  _onDoubledDown = () => {};

  setOnDoubledDown = (cb) => {
    this._onDoubledDown = cb;
  };
  initialBetStaked = () => {
    console.log(`hand notified of initial wager staked`);
  };
}
