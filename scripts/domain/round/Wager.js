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
  setBet = (amt) => {
    this._amt = amt;
  };

  getBet = () => this._amt;

  placeYourInitialBet = (dealer) => {
    console.group(`wager. notified turn to bet.`);
    if (!dealer) {
      throw new Error(`arbitter required`);
    }
    const sponsor = this.getSponsor();
    const playableCredit = sponsor.getCredit();
    const hand = this.getHand();
    this._onPlaceYourInitialBet(this, dealer, playableCredit);
    console.groupEnd();
  };
  _onPlaceYourInitialBet = (wage, dealer, playableCredit) => {};
  setOnWhatIsYourInitialBet = (fn) => {
    this._onPlaceYourInitialBet = fn;
  };

  initialBetStaked = () => {
    console.log(`wager notified of bet stake initialBetStaked`);
    this._onInitialBetStaked(this._amt);
  };

  /**
   *
   * @param {number} bet
   */
  _onInitialBetStaked = (bet) => {
    throw new Error(`abstract`);
  };

  setOnInitialBetStaked = (cb) => {
    console.log("seetint");
    this._onInitialBetStaked = cb;
  };
}
