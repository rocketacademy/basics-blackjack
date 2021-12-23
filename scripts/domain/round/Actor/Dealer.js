/**
 * @typedef {Object} PayTable
 * @property {string} desc
 * @property {number} ratio
 */

/**
 * @typedef {Object} Decision
 * @property {Enum<AWARD_ENUM>} award
 * @property {Enum<PayTable>} mode
 */

/**
 * Result
 *
 *  @typedef {Object} Result
 *  @property {Decision} decision
 *  @property {Enum<SETTLEMENT_TYPE} type
 */

const AWARD_ENUM = {
  STAND_OFF: "STAND-OFF",
  PLAYER_WIN: "PLAYER WIN",
  PLAYER_LOSE: "PLAYER LOSE",
};

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

const SETTLEMENT_TYPE = {};
SETTLEMENT_TYPE.SETTLE_FINAL = "SETTLEMENT_TYPE.SETTLE_FINAL";
SETTLEMENT_TYPE.SETTLE_INTERIM = "SETTLEMENT_TYPE.SETTLE_INTERIM";

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

  hasPlayablePlayer = () => {
    return this._round.hasPlayablePlayer();
  };
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
    this.shout("Place your bets, please 🙂");
    this._round.start();
  };

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

  _assessSubsqDealOptionsDEALER = () => {
    const options = {};

    const pointTotal = this._hand.getBestValue();
    const isBusted = this._hand.isBusted();
    console.log(`Dealer pointTotal ${pointTotal}`);

    //CRA-V6-3.34
    options.canHit = !isBusted && pointTotal <= 16;

    //TODO: CRA-V6-3.35

    return options;
  };

  _assessSubsqDealOptionsPLAYER = (hand) => {
    const options = {};
    const hasTwentyOne = hand.hasTwentyOne();
    const isBusted = hand.isBusted();
    const count = hand.count();
    const isBlackJack = hand.isBlackJack();
    const isSponsorFunded = hand.getController().getCredit() > 0;

    console.log(`hasTwentyOne ${hasTwentyOne}`);
    console.log(`isBlackJack ${isBlackJack}`);
    //TODO if hand is surrender than cannot act
    // If minimally cannot stand, player should not be able to act

    //TODO 3.20
    options.canEvenMoney =
      false && isBlackJack && this._hand.getUpCard() === FaceValue.ACE;
    // CRA-V6-3.30
    options.canStand = !isBusted && !hasTwentyOne && !false;
    // CRA-V6-3.29
    options.canHit = !hasTwentyOne && !isBusted;
    // CRA-V6-3.30, CRA-V6-3.26.1
    //TODO 3.26.3
    options.canDouble = count === 2 && !hasTwentyOne && isSponsorFunded;
    options.canSplit = false || false;

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
    this._performNextSubsequentPlayerDealNextPlayer();
    console.groupEnd();
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
    console.log(`Sponsor : ${wager.getSponsor().getName()}`);
    console.groupEnd();

    const playerPointTotal = playerHand.getBestValue();
    const dealerPointTotal = this._hand.getBestValue();
    const isDealerBlackJack = this._hand.isBlackJack();
    const isPlayerBlackJack = playerHand.isBlackJack();
    const isDealerBusted = this._hand.isBusted();
    const isPlayerHandBusted = playerHand.isBusted();

    //TODO
    const isWagerSurrendered = false; // wager.isSurrendered()

    // CRA-V6-3.32 / CRA-V6-4.3.2

    if (isPlayerHandBusted) {
      return {
        decision: { award: AWARD_ENUM.PLAYER_LOSE },
        type: SETTLEMENT_TYPE.SETTLE_FINAL,
        remarks: `CRA-V6-4.3.2`,
      };
    }

    /** BLACKJACK */

    // CRA-V6-4.5.2
    if (isDealerBlackJack && isPlayerBlackJack) {
      return {
        decision: { award: AWARD_ENUM.STAND_OFF },
        type: SETTLEMENT_TYPE.SETTLE_FINAL,
        remarks: `CRA-V6-4.5.2`,
      };
    }

    // CRA-V6-4.2.1
    if (isPlayerBlackJack && !isDealerBlackJack) {
      return {
        decision: { award: AWARD_ENUM.PLAYER_WIN, mode: PAY_TABLE.BLACKJACK },
        type: SETTLEMENT_TYPE.SETTLE_FINAL,
        remarks: `CRA-V6-4.2.1`,
      };
    }

    // CRA-V6-4.3.3
    if (isDealerBlackJack && !isPlayerBlackJack) {
      return {
        decision: { award: AWARD_ENUM.PLAYER_LOSE },
        type: SETTLEMENT_TYPE.SETTLE_FINAL,
        remarks: `CRA-V6-4.3.3`,
      };
    }

    // CRA-V6-4.5.1
    if (playerPointTotal === dealerPointTotal) {
      return {
        decision: { award: AWARD_ENUM.STAND_OFF },
        type: SETTLEMENT_TYPE.SETTLE_FINAL,
        remarks: `CRA-V6-4.5.1`,
      };
    }

    // CRA-V6-4.2.2
    if (dealerPointTotal < playerPointTotal) {
      return {
        decision: { award: AWARD_ENUM.PLAYER_WIN, mode: PAY_TABLE.REGULAR },
        type: SETTLEMENT_TYPE.SETTLE_FINAL,
        remarks: `CRA-V6-4.2.2`,
      };
    }

    // CRA-V6-4.3.1
    if (!isDealerBusted && playerPointTotal < dealerPointTotal) {
      return {
        decision: {
          award: AWARD_ENUM.PLAYER_LOSE,
        },
        type: SETTLEMENT_TYPE.SETTLE_FINAL,
        remarks: `CRA-V6-4.2.3`,
      };
    }

    // CRA-V6-4.2.3
    if (isDealerBusted && !isWagerSurrendered) {
      return {
        decision: {
          award: AWARD_ENUM.PLAYER_WIN,
          mode: PAY_TABLE.REGULAR,
        },
        type: SETTLEMENT_TYPE.SETTLE_FINAL,
        remarks: `CRA-V6-4.2.3`,
      };
    }
    throw new Error(
      `Irregularity. No result type. Player: ${playerHand
        .getCards()
        .map((c) => `${c.getString()}`)
        .join(" | ")} Dealer: ${this._hand
        .getCards()
        .map((c) => `${c.getString()}`)
        .join(" | ")}`
    );
  };
  /**
   *
   * @param {Result} result
   * @param {Wager} wager
   */
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
    if (award === AWARD_ENUM.PLAYER_WIN) {
      // Win
      const { mode } = decision;
      if (!mode) {
        throw new Error(`please check pay table. payout ratio not specified.`);
      }

      console.log(`win`);
      // Return main wage

      const mainWager = wager.retrieveMainBet();

      console.log(`mainWager ${mainWager}`);

      sponsor.returnAnyBet(mainWager);

      // payout (win amount)
      const { ratio } = mode;

      const invoice = mainWager * ratio;
      console.log(`sponsor ${sponsor}`);

      console.log(`amt ${invoice}`);
      const beforeSettleWinCredit = sponsor.getCredit();
      this.decreaseCredit(invoice);
      sponsor.awardPayout(invoice);
      const afterSettleCredit = sponsor.getCredit();

      if (afterSettleCredit - beforeSettleWinCredit !== invoice) {
        throw new Error(
          `The invoice not tally before${beforeSettleWinCredit} - after${afterSettleCredit} !== ${invoice}`
        );
      }
    } else if (award === AWARD_ENUM.STAND_OFF) {
      console.log(`stand off`);
      // Return main wager to sponsor
      sponsor.returnAnyBet(wager.retrieveMainBet());
      sponsor.returnAnyBet(wager.retrieveDoubleBet());
    } else if (award === AWARD_ENUM.PLAYER_LOSE) {
      console.log(`Makan! lose`);
      // Makan
      const makanMainBet = wager.retrieveMainBet();
      this.increaseCredit(makanMainBet);
      const makanDoubleBet = wager.retrieveDoubleBet();
      this.increaseCredit(makanDoubleBet);
      if (makanMainBet > 0) {
        sponsor.makanMainBetNotif();
      }
      if (makanDoubleBet > 0) {
        sponsor.makanDoubleBetNotif();
      }
    } else {
      throw new Error(`Irregularity. No settlement type.`);
    }
    wager.dealerFinalSettlementCompleted(result);

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
    this._round.FinalSettlementCompleted();
  };
  requestHit = (hand) => {
    this._transferCard(this._round.getShoe(), hand).flip(true);
    const options = this._assessSubsqDealOptionsPLAYER(hand);
    if (!Object.values(options).some((is) => is === true)) {
      this._performNextSubsequentPlayerDealNextPlayer();
      return;
    } else {
      hand.whatDoYouWantToDoOnSubsequentDeal(this, options);
    }
  };
  requestStand = (hand) => {
    this._performNextSubsequentPlayerDealNextPlayer();
  };

  requestInitialDouble = (hand) => {
    // Sanity Check

    const options = this._assessSubsqDealOptionsPLAYER(hand);
    if (!options.canDouble) {
      throw new Error(`Eager hand doubling.`);
    }
    hand.howMuchWagerDouble(this);
    return;
  };

  /**
   *     this._transferCard(this._round.getShoe(),hand).flip(true)
    this._performNextSubsequentPlayerDealNextPlayer();
   */

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
    const options = this._assessSubsqDealOptionsDEALER();

    if (options.canHit) {
      this._transferCard(this._round.getShoe(), this._hand).flip(true);
      this._performSubsequentDealDealer();
    } else {
      this._performSubsequentDealDealerCompleted();
    }
    console.groupEnd();
  };
  _performNextSubsequentDealPlayersCompleted = () => {
    this._performSubsequentDealDealer();
  };
  _performNextSubsequentPlayerDealNextPlayer = () => {
    const hand = this._handGen.next();
    if (!hand) {
      console.log(`End _performNextSubsequentPlayerDealNextPlayer`);
      this._unsetGenerators();
      this._performNextSubsequentDealPlayersCompleted();
      return;
    }
    const options = this._assessSubsqDealOptionsPLAYER(hand);

    if (!Object.values(options).some((is) => is === true)) {
      this._performNextSubsequentPlayerDealNextPlayer();
      return;
    }
    hand.whatDoYouWantToDoOnSubsequentDeal(this, options);
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
  placeDouble = (wager, doubleAmt) => {
    console.group(`dealer receives request to placeInitialBet`);
    doubleAmt = Number(doubleAmt);
    const sponsor = wager.getSponsor();
    this._stakeDouble(sponsor, doubleAmt, wager);

    wager.doubledDown();
    wager.getHand().doubledDown();
    this._performNextSubsequentPlayerDealNextPlayer();

    console.groupEnd();
  };

  _stakeDouble = (sponsor, doubleAmt, wager) => {
    console.group(`dealer performs the transfer of value and transfer of card`);
    sponsor.stakeDouble(doubleAmt);
    wager.setDoubleBet(doubleAmt);
    this._transferCard(this._round.getShoe(), wager.getHand()).flip(true);
    console.log(sponsor.getCredit());
    console.groupEnd();
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
    this._stakeMainBet(sponsor, betValue, wager);

    wager.initialBetStaked();
    wager.getHand().initialBetStaked();
    this._performNextInitialBet();
    console.groupEnd();
  };
  _stakeMainBet = (sponsor, betValue, wager) => {
    console.group(`dealer performs the transfer of value`);
    sponsor.stakeMainBet(betValue);
    wager.setMainBet(betValue);
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
