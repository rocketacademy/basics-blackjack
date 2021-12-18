/**
 *
 * @param {Actor} actor1
 * @param {number} amt
 * @param {Actor} actor2
 */
const transferCredit = (actor1, amt, actor2) => {
  actor1.decreaseCredit(amt);
  actor2.increaseCredit(amt);
};
// ROUND

// Round Phase

class RoundPhase {
  static _NULL = new RoundPhase(null);
  static SIT = new RoundPhase("SIT");
  static BET = new RoundPhase("BETTING");
  static DEAL = new RoundPhase("DEALING");
  static IN_PLAY_PLAYERS = new RoundPhase("PLAY_PLAYERS");
  static IN_PLAY_DEALER = new RoundPhase("PLAY_DEALER");
  static END = new RoundPhase("END");

  constructor(desc) {
    this._desc = desc;
  }

  desc = () => this._desc;
}

class Round {
  /**
   *
   * @param {Table} table
   */
  constructor(table) {
    /** @private @const {!Player[]} */
    this._players = table.getPlayers().map(
      /**
       *
       * @param {Participant} p
       * @returns {Player}
       */
      (p) => {
        return newPlayer(p);
      }
    );
    /** @private @const {!Dealer} */
    this._dealer = newDealer(table.getDealer());
    /** @private @const {Card[]} */
    this._deck = shuffleDeck(generateStandardDeck());
    /** @private {RoundPhase} */
    this._phase = RoundPhase._NULL;

    /** @private @const {number} */
    this._actorsCount = this.getActors().length;
    /** @private @const {number} */
    this._playersCount = this.getPlayers().length;
    /** @private @const {Player} */
    this._currentPlayer = null;
    this._currentHand = null;

    this._nextTurn = null;
  }

  _nextActorGenerator = (actors) => {
    let index = 0;
    let length = actors.length;
    return () => (index < length ? actors[index++] : null);
  };

  _nextHandGenerator = (actors) => {
    console.group("_nextHandGenerator");
    const nextActor = this._nextActorGenerator(actors);

    let currentHand = {};
    currentHand.hand = null;
    currentHand.actor = null;
    let nextHand = () => {
      return null;
    };
    console.groupEnd();

    // If no hand, switch player then get hand
    return () => {
      console.group("Next hand is ...");

      currentHand.hand = nextHand();
      if (!currentHand.hand) {
        currentHand.actor = nextActor();
        nextHand = ((player) => {
          if (!player) {
            return () => null;
          }
          let index = 0;
          let hands = player.getHands();
          let length = hands.length;
          return () => (index < length ? hands[index++] : null);
        })(currentHand.actor);
        currentHand.hand = nextHand();
      }
      console.log(
        `Yield: Hand [${currentHand.hand?.id()}] Player [${currentHand.actor?.getName()}]`
      );
      console.groupEnd();
      return { hand: currentHand.hand, actor: currentHand.actor };
    };
  };

  _setPhase = (phase) => {
    const prevPhase = this._phase;
    this._phase = phase;
    console.warn(`Changing Phase ${prevPhase.desc()} -> ${this._phase.desc()}`);
    this._onSetPhase(this._phase);
  };

  _initSit = () => {
    console.log(this._phase.desc());
    this._setPhase(RoundPhase.SIT);
    this._onSetPhaseCompleted(this._phase);
    console.groupEnd();

    this.requestInitBetPhase();
  };
  _initBet = () => {
    console.group("_initBet");
    this._setPhase(RoundPhase.BET);
    this._autoCreateHands();

    this._onSetPhaseCompleted(this._phase);
    console.groupEnd();

    this._resetBetTurn();
    this._changeBetTurn();
  };
  _initDeal = () => {
    this._setPhase(RoundPhase.DEAL);
    this._autoDeal();
    this.requestInitInPlayPhase();
  };

  _initInPlayPlayers = () => {
    this._setPhase(RoundPhase.IN_PLAY_PLAYERS);
    this._resetInPlayPlayerTurn();

    this._onSetPhaseCompleted(this._phase);

    this._changeInPlayPlayerTurn();
  };
  _initInPlayDealer = () => {
    this._setPhase(RoundPhase.IN_PLAY_DEALER);
    //TODO - Reconcilliation
    this.requestInitEndPhase();
  };
  _initEnd = () => {
    this._setPhase(RoundPhase.END);
  };

  requestInitSitPhase = () => {
    const proposedPhase = RoundPhase.SIT;
    const suceedingPhase = this._nextPhase(this._phase);
    if (proposedPhase !== suceedingPhase) {
      console.warn(
        `Current Phase: ${this._phase.desc()}. Requested ${proposedPhase.desc()}. Next phase should be ${suceedingPhase.desc()}.`
      );
      return;
    }
    this._initSit();
  };
  requestInitBetPhase = () => {
    const proposedPhase = RoundPhase.BET;
    const suceedingPhase = this._nextPhase(this._phase);
    let reject = false;
    if (proposedPhase !== suceedingPhase) {
      console.warn(
        `Current Phase: ${this._phase.desc()}. Requested ${proposedPhase.desc()}. Next phase should be ${suceedingPhase.desc()}.`
      );
      reject = true;
    }
    if (reject) {
      return;
    }
    this._initBet();
  };
  requestInitDealPhase = () => {
    const proposedPhase = RoundPhase.DEAL;
    const suceedingPhase = this._nextPhase(this._phase);
    if (proposedPhase !== suceedingPhase) {
      console.warn(
        `Current Phase: ${this._phase.desc()}. Requested ${proposedPhase.desc()}. Next phase should be ${suceedingPhase.desc()}.`
      );
      return;
    }
    this._initDeal();
  };
  requestInitInPlayPhase = () => {
    const proposedPhase = RoundPhase.IN_PLAY_PLAYERS;
    const suceedingPhase = this._nextPhase(this._phase);
    if (proposedPhase !== suceedingPhase) {
      console.warn(
        `Current Phase: ${this._phase.desc()}. Requested ${proposedPhase.desc()}. Next phase should be ${suceedingPhase.desc()}.`
      );
      return;
    }
    this._initInPlayPlayers();
  };
  requestInitInPlayDealerPhase = () => {
    const proposedPhase = RoundPhase.IN_PLAY_DEALER;
    const suceedingPhase = this._nextPhase(this._phase);
    if (proposedPhase !== suceedingPhase) {
      console.warn(
        `Current Phase: ${this._phase.desc()}. Requested ${proposedPhase.desc()}. Next phase should be ${suceedingPhase.desc()}.`
      );
      return;
    }
    this._initInPlayDealer();
  };
  requestInitEndPhase = () => {
    const proposedPhase = RoundPhase.END;
    const suceedingPhase = this._nextPhase(this._phase);
    if (proposedPhase !== suceedingPhase) {
      console.warn(
        `Current Phase: ${this._phase.desc()}. Requested ${proposedPhase.desc()}. Next phase should be ${suceedingPhase.desc()}.`
      );
      return;
    }
    this._initEnd();
  };

  _bet = (player, hand, bet) => {
    console.group(
      `_bet Player [${player.getName()}] Hand [${hand.id()}] Bet [${bet}]`
    );

    //TODO add the action

    this._changeBetTurn();

    if (!this._currentHand) {
      console.log("All bets should be placed...");
      this.requestInitDealPhase();
    }
    console.groupEnd();
  };

  /**
   *
   * @param {Player} better
   * @param {Hand} hand
   * @param {number} amt
   * @returns
   */
  requestBet = (better, hand, amt) => {
    console.group("Bet requested");

    let reject = false;
    if (hand !== this._currentHand) {
      console.warn(
        `Error betting on hand. Current ${
          this._currentHand
        }, Requestee ${hand.id()}`
      );
      reject = true;
    }
    if (!better || !hand || !amt) {
      console.warn(`Invalid request Need a better, an amount and a hand.`);
      reject = true;
    }
    hand.setSponsor(better);
    hand.setBet(amt);
    if (reject) {
      console.groupEnd();
      return;
    }
    this._bet(better, hand, amt);
    console.groupEnd();
  };

  _stand = (hand) => {
    console.group(`_stand Hand [${hand.id()}] STAND`);
    //TODO add the action
    this._changeInPlayPlayerTurn();
    if (!this._currentHand) {
      console.log("All hands should be played out...");
      this.requestInitInPlayDealerPhase();
    }
    console.groupEnd();
  };
  requestStand = (hand) => {
    this._stand(hand);
  };

  _resetBetTurn = () => {
    console.log("resetting bet turns");
    this._nextTurn = this._nextHandGenerator(this.getPlayers());
  };

  _changeBetTurn = () => {
    const beforePlayer = this.getCurrentPlayer();
    const beforeHand = this.getCurrentHand();
    const { hand, actor: player } = this._nextTurn();
    console.log(
      `Betting Turn on hand [${hand?.id()}] of Player [${player?.getName()}] `
    );
    this.setCurrentHandAndPlayer(hand, player);
  };
  _resetInPlayPlayerTurn = () => {
    this._nextTurn = this._nextHandGenerator(this.getPlayers());
  };
  _changeInPlayPlayerTurn = () => {
    const { hand, actor: player } = this._nextTurn();
    console.log(`Playing Turn for ${player?.getName()} on ${hand?.id()}`);
    this.setCurrentHandAndPlayer(hand, player);
  };

  /**
   *
   * @returns {RoundPhase}
   */
  getPhase = () => this._phase;
  getPlayers = () => this._players;
  getDealer = () => this._dealer;
  getActors = () => [...this.getPlayers(), this.getDealer()];
  dealCards = () => {
    dealToHandsOfActors(this.getActors(), this._deck);
  };
  deckSize = () => this._deck.length;
  setHands_tt = () => createHands(this.getActors());
  getDealerHands = () => this._dealer.getHands();

  setCurrentPlayer = (player) => {
    const prevPlayer = this.getCurrentPlayer();
    this._currentPlayer = player;
    const nextPlayer = this.getCurrentPlayer();
    this._onSetCurrentPlayer(prevPlayer?.id(), nextPlayer?.id());
  };

  setCurrentHandAndPlayer = (hand, player) => {
    const [prevPlayerId, prevHandId] = [
      this.getCurrentPlayer()?.id(),
      this.getCurrentHand()?.id(),
    ];
    this._currentHand = hand;
    this._currentPlayer = player;
    const [nextPlayer, nextHand] = [
      this.getCurrentPlayer()?.id(),
      this.getCurrentHand()?.id(),
    ];
    this._onSetCurrentPlayer(prevPlayerId, prevHandId, this._phase);
    this._onSetCurrentHand(
      prevPlayerId,
      prevHandId,
      nextPlayer,
      nextHand,
      this._phase
    );
  };

  _autoCreateHands = () => {
    console.group("auto create hand");
    const dealPlayersOrder = this._nextActorGenerator(this.getActors());
    let actor = dealPlayersOrder();
    while (actor) {
      console.log("create new hand for " + actor.getName());
      actor.createNewHand();
      actor = dealPlayersOrder();
    }
    console.groupEnd("auto create hand");
  };
  _autoDeal = () => {
    console.group("auto dealing");
    const nextPlayerHand = this._nextHandGenerator(this.getPlayers());
    let { hand: playerHand, actor: player } = nextPlayerHand();
    while (playerHand) {
      console.log(
        `Dealing to Actor [${player.getName()}] Hand [${playerHand.id()}]`
      );
      this.setCurrentHandAndPlayer(playerHand, player);

      dealToHand(this._deck, playerHand);
      const newHand = nextPlayerHand();
      playerHand = newHand.hand;
      player = newHand.actor;
    }

    const nextDealerHand = this._nextHandGenerator([this.getDealer()]);
    let { hand: dealerHand, actor: dealer } = nextDealerHand();

    while (dealerHand) {
      this.setCurrentHandAndPlayer(dealerHand, dealer);
      dealToDealerHand(this._deck, dealerHand);
      const newHand = nextDealerHand();
      dealerHand = newHand.hand;
      dealer = newHand.actor;
    }
    console.log("Auto Deal Completed");
    console.groupEnd();
  };
  _nextPhase = (_phase) => {
    const phase = _phase || this._phase;
    switch (phase) {
      case RoundPhase._NULL:
        return RoundPhase.SIT;
      case RoundPhase.SIT:
        return RoundPhase.BET;
      case RoundPhase.BET:
        return RoundPhase.DEAL;
      case RoundPhase.DEAL:
        return RoundPhase.IN_PLAY_PLAYERS;
      case RoundPhase.IN_PLAY_PLAYERS:
        return RoundPhase.IN_PLAY_DEALER;
      case RoundPhase.IN_PLAY_DEALER:
        return RoundPhase.END;
    }
  };

  /**
   *
   * @returns {Player}
   */
  getCurrentPlayer = () => this._currentPlayer;
  getCurrentHand = () => this._currentHand;
  getRoundPhase = () => this._phase;
  // dealer head on, with plain rules.
  concileAllPlayerHandsOnFaceValue = () => {
    const dealer = this.getDealer();
    const players = this.getPlayers();
    const dealerHands = this.getDealerHands();
    for (const player of players) {
      const playerHands = player.getHands();
      for (const playerHand of playerHands) {
        for (const dealerHand of dealerHands) {
          const playerHandVal = playerHand.getFaceValue();
          const dealerHandVal = dealerHand.getFaceValue();
          const bet = playerHand.getBet();
          if (playerHandVal > dealerHandVal) {
            transferCredit(player, bet, dealer);
          } else if (playerHandVal < dealerHandVal) {
            transferCredit(dealer, bet, player);
          }
        }
      }
    }
  };

  /**
   * Listeners
   */

  _onSetPhase = (phase) => {};
  setOnSetPhase = (fn) => (this._onSetPhase = fn);

  _onSetPhaseCompleted = (phase) => {};
  setOnSetPhaseCompleted = (fn) => (this._onSetPhaseCompleted = fn);

  _onSetCurrentPlayer = (prevPlayerId, currentPlayerId, phase) => {};
  setOnSetCurrentPlayer = (fn) => (this._onSetCurrentPlayer = fn);
  _onSetCurrentHand = (
    prevPlayerId,
    prevHandId,
    currentPlayerId,
    currentHandId,
    phase
  ) => {};
  setOnSetCurrentHand = (fn) => (this._onSetCurrentHand = fn);
}
