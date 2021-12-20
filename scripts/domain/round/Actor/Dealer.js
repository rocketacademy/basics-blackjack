class Dealer extends _Actor {
  static HOLE_CARD_POSITION = Hand.SECOND_CARD; // 2, as in second card

  /**
   * @param {Participant} participant
   */
  constructor(participant) {
    super(participant);

    /** @private @const {Round} */
    this._round = null;

    this._seatGen = null;
    this._handGen = null;

    /** @priv {Hand} */
    this._hand = null;
  }
  getHand = () => this._hand;
  _createOwnHand = () => {
    this._hand = new Hand();
    this._onOwnNewHand();
  };

  _onOwnNewHand = (hand) => {
    throw new Error(`abstract`);
  };

  setOwnNewHand = (cb) => {
    this._onOwnNewHand = cb;
  };
  setRound = (round) => (this._round = round);
  getRound = () => this._round;

  commence = () => {
    // CRA-V6-3.1
    this.shout("Place your bets, please");
    this._round.start();
  };
  _onCommence = () => {};

  _initialDeal = () => {
    this.shout("");

    this._createOwnHand();
    this._round.initDeal();
  };
  shout = (desc) => {
    this._onShout(desc);
  };
  _unsetGenerators = () => {
    this._seatGen = null;
    this._handGen = null;
  };

  callForInitialDeals = () => {
    console.group(`dealer called ForInitialDeal `);

    if (this._round.getPhase() !== RoundPhase.INITIAL_DEAL) {
      throw new Error(
        `[callForInitialDeals] Error! Round phase should be ${RoundPhase.INITIAL_DEAL}`
      );
    }

    if (this._hand === null || this._hand === undefined) {
      throw new Error(
        `[callForInitialDeals] Error! Round phase should be ${RoundPhase.INITIAL_DEAL}`
      );
    }
    const shoe = this._round.getShoe();
    // Deal action
    this._performNextInitialDealsPlayerOneCard(shoe);
    this._transferCard(shoe, this._hand);
    this._performNextInitialDealsPlayerOneCard(shoe);
    console.log(`End of dealer ForInitialDeal `);
    console.groupEnd();
  };

  _transferCard = (shoe, hand) => {
    const card = shoe.pop();
    hand.addCard(card);
    return card;
  };
  _performNextInitialDealsPlayerOneCard = (shoe) => {
    console.group(`_performNextInitialDealsPlayerOneCard`);
    const handGen = this._round.getAllHandsGenerator();
    let activeHand = handGen.next();
    while (activeHand) {
      this._transferCard(shoe, activeHand).flip(true);
      activeHand = handGen.next();
    }
    console.groupEnd();
  };
  callForInitialBets = () => {
    console.group(`dealer called ForInitialBet initial bet`);

    if (this._round.getPhase() !== RoundPhase.COMMENCE) {
      throw new Error(
        `[callForInitialBet] Error! Round phase should be ${RoundPhase.COMMENCE}`
      );
    }
    this._seatGen = this._round.getSeatGenerator();
    this._performNextInitialBet();
    console.groupEnd();
  };

  _performNextInitialBet = () => {
    const activeSeat = this._seatGen.next();
    if (!activeSeat) {
      console.log(`End of initial bet`);
      this._unsetGenerators();
      this._initialDeal();
      return;
    }
    activeSeat.callForInitialBet(this);
  };

  /**
   *
   * @param {Wager} wager
   * @param {number} betValue
   */
  placeInitialBet = (wager, betValue) => {
    console.group(`dealer receives request to placeInitialBet`);

    //TODO validation if bet can be placed
    if (!false) {
    }
    const sponsor = wager.getSponsor();
    this._stake(sponsor, betValue, wager);

    wager.initialBetStaked();
    wager.getHand().initialBetStaked();
    this._performNextInitialBet();
    console.groupEnd();
  };
  _stake = (sponsor, betValue, wager) => {
    console.group(`dealer performs the transfer of value`);
    sponsor.decreaseCredit(betValue);
    wager.setBet(betValue);
    console.log(sponsor.getCredit());
    console.groupEnd();
  };
  /**
   * @param {string} desc
   */
  _onShout = (desc) => {};
  setOnShout = (cb) => {
    this._onShout = cb;
  };
}
