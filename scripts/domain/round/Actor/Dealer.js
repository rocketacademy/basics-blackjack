const STAND_OFF = new Symbol();
const PLAYER_WIN = new Symbol();
const PLAYER_LOSE = new Symbol();
const INTERIM_SETTLED = new Symbol();

const PAY_TABLE_RATIO_BLACKJACK = 1.5;
const PAY_TABLE_RATIO_REGULAR = 1;

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

    this._round.initInitialDeal();
  };

  _initialDealEnds = () => {
    this._round.initSubsequentDeal();
  };
  shout = (desc) => {
    this._onShout(desc);
  };
  _unsetGenerators = () => {
    this._seatGen = null;
    this._handGen = null;
  };

  _assessSubsqDealDealerOptions = () => {
    const options = {};

    const hardTotal = this._hand.getHardTotal();
    console.log(`Dealer Hard Total ${hardTotal}`);

    //TODO: CRA-V6-3.34
    options.canHit = hardTotal <= 16 || false;

    //TODO: CRA-V6-3.35

    return options;
  };
  _assessSubsqDealPlayerOptions = (hand) => {
    const options = {};
    options.canHit = false;
    options.canStand = true;
    options.canDouble = false;
    options.canSplit = false;
    return options;
  };

  callForInitialDeals = () => {
    console.group(`dealer was called on ForInitialDeal `);
    this._createOwnHand();

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
    this._transferCard(shoe, this._hand).flip(true);
    this._performNextInitialDealsPlayerOneCard(shoe);
    console.log(`End of dealer ForInitialDeal `);
    console.groupEnd();
    this._initialDealEnds();
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

  callForSubsequentDeals = () => {
    console.group(`dealer was called on ForSubsequentDeal `);
    if (this._round.getPhase() !== RoundPhase.SUBSEQUENT_DEAL) {
      throw new Error(
        `[callForSubsequentDeals] Error! Round phase should be ${RoundPhase.SUBSEQUENT_DEAL}`
      );
    }

    this._handGen = this._round.getAllHandsGenerator();
    this._performNextSubsequentPlayerDeal();

    console.groupEnd();
  };
  requestStand = (hand) => {
    this._performNextSubsequentPlayerDeal();
  };

  _performSubsequentDealDealerCompleted = () => {
    this.shout("Dealer draw completed");
    this._round.settleFinal();
  };

  _computeResult = () => {
    const playerHand = wager.getSponsor();

    const playerPointTotal = playerHand.getHardTotal();
    const dealerPointTotal = this._hand.getHardTotal();
    const isDealerBlackJack = this._hand.isBlackJack();
    const isPlayerBlackJack = playerHand.isBlackJack();
    const isDealerBusted = this._hand.isBusted();
    const isPlayerHandBusted = playerHand.isBusted();

    const isWagerSurrendered = false; // wager.isSurrendered()

    // CRA-V6-4.5.2
    if (isDealerBlackJack && isPlayerBlackJack) {
      return {
        decision: STAND_OFF,
      };
    }

    if (!isDealerBlackJack && !isPlayerBlackJack) {
      // CRA-V6-4.5.1
      if (playerPointTotal === dealerPointTotal) {
        return {
          decision: STAND_OFF,
        };
      }
      // CRA-V6-4.2.2
      if (dealerPointTotal < playerPointTotal) {
        return {
          decision: PLAYER_WIN,
          payoutRatio: PAY_TABLE_RATIO_REGULAR,
        };
      }

      // CRA-V6-4.3.1

      if (dealerPointTotal > playerPointTotal) {
        return {
          decision: PLAYER_LOSE,
        };
      }
    }

    // CRA-V6-3.32 / CRA-V6-4.3.2

    if (isPlayerHandBusted) {
      return {
        decision: PLAYER_LOSE,
      };
    }

    // CRA-V6-4.3.3
    if (isDealerBlackJack && !isPlayerBlackJack) {
      return {
        decision: PLAYER_LOSE,
      };
    }

    // CRA-V6-4.2.1
    if (!isDealerBlackJack && isPlayerBlackJack) {
      return {
        decision: PLAYER_WIN,
        payoutRatio: PAY_TABLE_RATIO_BLACKJACK,
      };
    }

    // CRA-V6-4.2.3
    if (!isPlayerHandBusted && !isWagerSurrendered && isDealerBusted) {
      return {
        decision: PLAYER_WIN,
        payoutRatio: PAY_TABLE_RATIO_REGULAR,
      };
    }
  };

  _performSettlementFinal = () => {
    const playerHandGen = this._round.getAllHandsGenerator();

    let hand = playerHandGen.next();

    while (hand) {
      return;
      const result = this._computeResult(playerHand);
    }
    // comparison point totals

    /**
     * {
     *  decision: ,
     *  payout?
     * }
     */
  };

  callForFinalSettlement = () => {
    console.group(`dealer was called on ForSubsequentDeal `);
    if (this._round.getPhase() !== RoundPhase.SETTLEMENT_FINAL) {
      throw new Error(
        `[callForFinalSettlement] Error! Round phase should be ${RoundPhase.SETTLEMENT_FINAL}`
      );
    }

    this._performSettlementFinal();

    console.groupEnd();
  };
  _performSubsequentDealDealer = () => {
    console.group(`Dealing drawing turn`);
    const options = this._assessSubsqDealDealerOptions();

    if (options.canHit) {
      this._transferCard(this._round.getShoe(), this._hand).flip(true);
      this._performSubsequentDealDealer();
    } else {
      this._performSubsequentDealDealerCompleted();
    }
    console.groupEnd();
  };
  _performNextSubsequentDealPlayerCompleted = () => {
    this._performSubsequentDealDealer();
  };
  _performNextSubsequentPlayerDeal = () => {
    const activeHand = this._handGen.next();
    if (!activeHand) {
      console.log(`End _performNextSubsequentPlayerDeal`);
      this._unsetGenerators();
      this._performNextSubsequentDealPlayerCompleted();
      return;
    }
    const options = this._assessSubsqDealPlayerOptions(activeHand);
    activeHand.whatDoYouWantToDoOnSubsequentDeal(this, options);
  };

  _callForInitialBetsCompleted = () => this._initialDeal();
  callForInitialBets = () => {
    console.group(`dealer was called on ForInitialBet initial bet`);

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
      this._callForInitialBetsCompleted();
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
