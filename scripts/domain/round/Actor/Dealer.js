/**
 * Settlement
 *
 *  @typedef {Object} Settlement
 *  @property {Decision} decision
 *  @property {type} type
 */

/**
 * @typedef {Object} Decision
 * @property {string} award
 * @property {PayTable} mode
 */

/**
 * @typedef {Object} PayTable
 * @property {string} desc
 * @property {PayTable} ratio
 */

const STAND_OFF = Symbol();
const PLAYER_WIN = Symbol();
const PLAYER_LOSE = Symbol();

const PAY_TABLE_BLACKJACK = "BLACKJACK";
const PAY_TABLE_REGULAR = "REGULAR";

const PAY_TABLE = {
  [PAY_TABLE_BLACKJACK]: {
    desc: "blackjack",
    ratio: 1.5,
  },
  [PAY_TABLE_REGULAR]: {
    desc: "regular",
    ratio: 1,
  },
};

const SETTLE_FINAL = "SETTLE_FINAL";
const SETTLE_INTERIM = "SETTLE_INTERIM";

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

  // compute for the final settlement. functional, just to be safe.

  _computeFinalSettlement = (wager) => {
    console.group(`_computeFinalSettlement`);

    const playerHand = wager.getHand();

    console.log(`Hand : ${playerHand.getCards().map((c) => c.getRank())}`);
    console.log(`Sponsor : ${wager.getSponsor()}`);
    console.groupEnd();

    const playerPointTotal = playerHand.getHardTotal();
    const dealerPointTotal = this._hand.getHardTotal();
    const isDealerBlackJack = this._hand.isBlackJack();
    const isPlayerBlackJack = playerHand.isBlackJack();
    const isDealerBusted = this._hand.isBusted();
    const isPlayerHandBusted = playerHand.isBusted();

    //TODO
    const isWagerSurrendered = false; // wager.isSurrendered()

    // CRA-V6-4.5.2
    if (isDealerBlackJack && isPlayerBlackJack) {
      return {
        decision: { award: STAND_OFF },
        type: SETTLE_FINAL,
      };
    }

    // CRA-V6-4.2.1
    if (!isDealerBlackJack && isPlayerBlackJack) {
      return {
        decision: { award: PLAYER_WIN, mode: PAY_TABLE.BLACKJACK },
        type: SETTLE_FINAL,
      };
    }

    // CRA-V6-4.3.3
    if (isDealerBlackJack && !isPlayerBlackJack) {
      return {
        decision: { award: PLAYER_LOSE, mode: PAY_TABLE.BLACKJACK },
        type: SETTLE_FINAL,
      };
    }

    if (!isDealerBlackJack && !isPlayerBlackJack) {
      // CRA-V6-4.5.1
      if (playerPointTotal === dealerPointTotal) {
        return {
          decision: { award: STAND_OFF },
          type: SETTLE_FINAL,
        };
      }
      // CRA-V6-4.2.2
      if (dealerPointTotal < playerPointTotal) {
        return {
          decision: { award: PLAYER_WIN, mode: PAY_TABLE.REGULAR },
          type: SETTLE_FINAL,
        };
      }

      // CRA-V6-4.3.1

      if (dealerPointTotal > playerPointTotal) {
        return {
          decision: { award: PLAYER_LOSE, mode: PAY_TABLE.REGULAR },
          type: SETTLE_FINAL,
        };
      }
    }

    // CRA-V6-3.32 / CRA-V6-4.3.2

    if (isPlayerHandBusted) {
      return {
        decision: { award: PLAYER_LOSE, mode: PAY_TABLE.REGULAR },
        type: SETTLE_FINAL,
      };
    }

    // CRA-V6-4.2.3
    if (!isPlayerHandBusted && !isWagerSurrendered && isDealerBusted) {
      return {
        decision: {
          award: PLAYER_WIN,
          mode: PAY_TABLE.REGULAR,
        },
        type: SETTLE_FINAL,
      };
    }
  };
  _settle = (result, wager) => {
    console.group(`Get result and complete settlement`);
    const sponsor = wager.getSponsor();
    const { decision, type } = result;
    if (!decision) {
      throw new Error(`Decision required to be settled`);
    }

    if (!type) {
      throw new Error(`Settlement type required to be settled`);
    }

    const { award } = decision;
    if (award === PLAYER_WIN) {
      const { mode } = decision;
      if (!mode) {
        throw new Error(`please check pay table. payout ratio not specified`);
      }

      console.log(`win`);
      // Return main wage

      const mainWager = wager.retrieveMainBet();

      console.log(`mainWager ${mainWager}`);

      sponsor.increaseCredit(mainWager);

      // payout (win amount)
      const { ratio } = mode;

      const invoice = mainWager * ratio;
      console.log(`sponsor ${sponsor}`);

      console.log(`amt ${invoice}`);
      const beforeSettleWinCredit = sponsor.getCredit();
      this.decreaseCredit(invoice);
      sponsor.increaseCredit(invoice);
      const afterSettleCredit = sponsor.getCredit();

      if (afterSettleCredit - beforeSettleWinCredit !== invoice) {
        throw new Error(
          `The invoice not tally before${beforeSettleWinCredit} - after${afterSettleCredit} !== ${invoice}`
        );
      }
    } else if (award === STAND_OFF) {
      console.log(`stand off`);

      // Return main wager to sponsor
      sponsor.increaseCredit(wager.retrieveMainBet());
    } else if (award === PLAYER_LOSE) {
      console.log(`Makan! lose`);
      const { mode } = decision;
      // Makan
      this.increaseCredit(wager.retrieveMainBet());
    } else {
      throw new Error(`Irregularity. No settlement type.`);
    }
    wager.dealerSettlementCompleted(result);

    console.groupEnd();
  };
  _performSettlementFinal = () => {
    const playerHandGen = this._round.getAllHandsGenerator();

    let hand = playerHandGen.next();
    while (hand) {
      const wage = hand.getWager();
      const result = this._computeFinalSettlement(wage);
      this._settle(result, wage);
      hand = playerHandGen.next();
    }

    this._performSettlementFinalCompleted();
  };

  _performSettlementFinalCompleted = () => {
    this._round.settlementCompleted();
  };
  requestNewRound = () => {
    this._round.finish(true);
    //TODO
  };

  requestGoToLounge = () => {
    //TODO

    this._round.finish(false);
  };
  _performEndView = () => {
    this.shout("The round of play is completed. Restart?");
    this._onEndViewsCallbackList.forEach((f) => f(this));
  };

  _onEndViewsCallbackList = [];

  addOnEndView = (cb) => {
    this._onEndViewsCallbackList.push(cb);
  };
  callForEndViewMode = () => {
    console.group(`dealer was called on ForEndViewMode `);

    if (this._round.getPhase() !== RoundPhase.SETTLEMENT_FINAL_COMPLETED) {
      throw new Error(
        `[SETTLEMENT_FINAL_START] Error! Round phase should be ${RoundPhase.SETTLEMENT_FINAL_START}`
      );
    }
    this._performEndView();

    console.groupEnd();
  };
  callForFinalSettlement = () => {
    console.group(`dealer was called on ForSubsequentDeal `);
    if (this._round.getPhase() !== RoundPhase.SETTLEMENT_FINAL_START) {
      throw new Error(
        `[callForFinalSettlement] Error! Round phase should be ${RoundPhase.SETTLEMENT_FINAL_START}`
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
    betValue = Number(betValue);
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
