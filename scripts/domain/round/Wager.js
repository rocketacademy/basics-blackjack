class Wager {
  constructor() {
    this._hand = null;
    this._sponsor = null;
    this._mainBet = null;
    this._doubleBet = null;
  }
  _totalBet = () =>
    !!this._mainBet
      ? this._mainBet
      : 0 + !!this._doubleBet
      ? this._doubleBet
      : 0;
  setHand = (hand) => (this._hand = hand);
  getHand = () => this._hand;
  setSponsor = (player) => {
    this._sponsor = player;
  };
  getSponsor = () => this._sponsor;
  setMainBet = (amt) => {
    this._mainBet = amt;
    this._onChangeBetButtonVal(this._mainBet);
  };

  setDoubleBet = (doubleBet) => {
    this._doubleBet = doubleBet;
    this._onChangeBetButtonVal(this._totalBet());
  };

  getBet = () => this._mainBet;
  retrieveMainBet = () => {
    const m = this._mainBet || 0;
    this.setMainBet(this._mainBet - m);
    return m;
  };
  retrieveDoubleBet = () => {
    const m = !!this._doubleBet ? this._doubleBet : 0;
    this.setDoubleBet(this._doubleBet - m);
    if (m === null || m === undefined) {
      throw new Error(`why still null`);
    }
    return m;
  };

  pleasePlaceYourDouble = (dealer) => {
    const sponsor = this.getSponsor();
    const sponsorCredit = sponsor.getCredit();
    const placedBet = this.getBet();

    // CRA-V6-3.26 (wagering an amount equal to or less than his original wager)
    const limit = Math.min(sponsorCredit, placedBet);
    this._onPleasePlaceYourDouble(dealer, limit);
  };

  _onPleasePlaceYourDouble = (dealer, limit) => {};
  setOnPleasePlaceYouDouble = (cb) => (this._onPleasePlaceYourDouble = cb);
  placeYourInitialBet = (dealer) => {
    console.group(`wager. notified turn to bet.`);
    if (!dealer) {
      throw new Error(`arbitter required`);
    }
    const sponsor = this.getSponsor();
    const playableCredit = sponsor.getCredit();

    this._onPlaceYourInitialBet(this, dealer, playableCredit);
    console.groupEnd();
  };
  _onPlaceYourInitialBet = (wage, dealer, playableCredit) => {};
  setOnWhatIsYourInitialBet = (fn) => {
    this._onPlaceYourInitialBet = fn;
  };

  initialBetStaked = () => {
    console.log(`wager notified of bet stake initialBetStaked`);
    this._onInitialBetStaked(this._mainBet);
  };
  dealerFinalSettlementCompleted = (result) => {
    console.group(`wager notified of settlement`);
    this._onFinalSettled(result);
    console.groupEnd();
  };
  _onChangeBetButtonVal = (amt) => {};
  setOnBetChange = (cb) => (this._onChangeBetButtonVal = cb);
  /**
   *
   * @param {number} bet
   */
  _onInitialBetStaked = (bet) => {
    throw new Error(`abstract`);
  };

  _onFinalSettled = (result) => {};
  setOnFinalSettled = (cb) => {
    this._onFinalSettled = cb;
  };

  setOnInitialBetStaked = (cb) => {
    console.log("seetint");
    this._onInitialBetStaked = cb;
  };

  doubledDown = () => {
    console.log(`hand notified of wager doubledDown`);
    this._onDoubleDown();
  };
  _onDoubleDown = () => {};
  setOnDoubledDown = (cb) => (this._onDoubleDown = cb);
}
