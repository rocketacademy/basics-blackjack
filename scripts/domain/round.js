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
  // CRA-V6-1.24
  static SIT = new RoundPhase("PLACE YOUR BETS, PLEASE");
  static INITIAL_BET = new RoundPhase("INITIAL BET");
  static INITIAL_DEAL = new RoundPhase("INITIAL DEAL");
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
    // Domain

    /** @private @const {!Player[]} */
    this._players = table.getPlayers().map((p) => {
      return newPlayer(p);
    });
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

    // Properties

    /** @private {Player} */
    this._currentPlayer = null;
    /** @private {Hand} */
    this._currentHand = null;

    this._nextTurn = null;
  }
  /**
   *
   * @returns {Player}
   */
  getCurrentPlayer = () => this._currentPlayer;
  getCurrentHand = () => this._currentHand;
  getRoundPhase = () => this._phase;

  _setPhase = (phase) => {
    const prevPhase = this._phase;
    this._phase = phase;
    console.group(
      `Changing Phase ${prevPhase.desc()} -> ${this._phase.desc()}`
    );
    console.groupEnd();
    this._onSetPhase(this._phase);
  };

  /** Generators */
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

  // Phase Initiation
  _initSit = () => {
    console.log(this._phase.desc());
    this._setPhase(RoundPhase.SIT);
    console.groupEnd();

    this.requestInitInitialBetPhase();
  };
  _initInitialBet = () => {
    console.group("_initInitialBet");
    this._setPhase(RoundPhase.INITIAL_BET);
    this._autoCreateHands();

    console.groupEnd();

    this._resetBetTurn();
    this._changeBetTurn();
  };
  _initDeal = () => {
    this._setPhase(RoundPhase.INITIAL_DEAL);
    this._autoDeal();
    this.requestInitInPlayPhase();
  };

  _initInPlayPlayers = () => {
    this._setPhase(RoundPhase.IN_PLAY_PLAYERS);
    this._resetInPlayPlayerTurn();

    this._changeInPlayPlayerTurn();
  };
  _initInPlayDealer = () => {
    this._setPhase(RoundPhase.IN_PLAY_DEALER);
    this._dealer.flipHoleCard();
  };
  _initEnd = () => {
    this._setPhase(RoundPhase.END);
  };

  // Phase Initialzation - Request Validation
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
  requestInitInitialBetPhase = () => {
    const proposedPhase = RoundPhase.INITIAL_BET;
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
    this._initInitialBet();
  };
  requestInitDealPhase = () => {
    const proposedPhase = RoundPhase.INITIAL_DEAL;
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

    this._onSetPhaseCompleted(this._phase, this);
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

  // Game Activities
  _mainBet = (player, hand, bet) => {
    console.group(
      `_mainBet Player [${player.getName()}] Hand [${hand.id()}] Bet [${bet}]`
    );

    hand.setSponsor(player);
    hand.setBet(bet);

    //TODO add the action

    this._changeBetTurn();

    if (!this._currentHand) {
      console.log("All bets should be placed...");
      this.requestInitDealPhase();
    }
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

  /**
   *
   * @param {Player} better
   * @param {Hand} hand
   * @param {number} amt
   * @returns
   */
  requestMainBet = (better, hand, amt) => {
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

    if (reject) {
      console.groupEnd();
      return;
    }
    this._mainBet(better, hand, amt);
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

  /**
   *
   * @param {Hand} hand
   * @param {Player} player
   */
  setCurrentHandAndPlayer = (hand, player) => {
    const prevPlayer = this.getCurrentPlayer();
    const prevHand = this.getCurrentHand();

    this._currentPlayer = player;

    this._currentHand = hand;
    prevHand?.signalActive(false, this._phase, prevPlayer, this);

    this._currentHand?.signalActive(
      true,
      this._phase,
      this._currentPlayer,
      this
    );
  };

  _autoCreateHands = () => {
    console.group("auto create hand");
    const nextActor = this._nextActorGenerator(this.getActors());
    let actor = nextActor();
    while (actor) {
      console.log("create new hand for " + actor.getName());
      actor.createNewHand();
      actor = nextActor();
    }
    console.groupEnd("auto create hand");
  };
  _autoDeal = () => {
    console.group("[_autoDeal]");

    let cardPosition = Actor.FIRST_CARD;
    const dealerHoldCardIndex = Dealer.HOLE_CARD_POSITION;

    for (; cardPosition <= Actor.SECOND_CARD; cardPosition++) {
      console.group(
        `Dealing ${
          cardPosition === 1 ? `once` : cardPosition === 2 ? `twice` : `???????`
        }`
      );
      const nextPlayerHand = this._nextHandGenerator(this.getPlayers());
      let { hand: playerHand, actor: player } = nextPlayerHand();
      while (playerHand) {
        console.log(
          `Dealing to Actor [${player.getName()}] Hand [${playerHand.id()}]`
        );
        this.setCurrentHandAndPlayer(playerHand, player);

        dealToHandOneOpen(this._deck, playerHand);
        const newHand = nextPlayerHand();
        playerHand = newHand.hand;
        player = newHand.actor;
      }

      const nextDealerHand = this._nextHandGenerator([this.getDealer()]);
      let { hand: dealerHand, actor: dealer } = nextDealerHand();

      while (dealerHand) {
        this.setCurrentHandAndPlayer(dealerHand, dealer);
        if (dealerHoldCardIndex === cardPosition) {
          dealToHandOneClose(this._deck, dealerHand);
        } else {
          dealToHandOneOpen(this._deck, dealerHand);
        }
        const nextHand = nextDealerHand();
        dealerHand = nextHand.hand;
        dealer = nextHand.actor;
      }
      console.groupEnd();
    }

    console.log(`Auto Deal Completed ${cardPosition} dealt to each actor.`);

    console.groupEnd();
  };
  _nextPhase = (_phase) => {
    const phase = _phase || this._phase;
    switch (phase) {
      case RoundPhase._NULL:
        return RoundPhase.SIT;
      case RoundPhase.SIT:
        return RoundPhase.INITIAL_BET;
      case RoundPhase.INITIAL_BET:
        return RoundPhase.INITIAL_DEAL;
      case RoundPhase.INITIAL_DEAL:
        return RoundPhase.IN_PLAY_PLAYERS;
      case RoundPhase.IN_PLAY_PLAYERS:
        return RoundPhase.IN_PLAY_DEALER;
      case RoundPhase.IN_PLAY_DEALER:
        return RoundPhase.END;
    }
  };

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
          if (bet === null || bet === undefined || bet < 0) {
            throw `Invalid bet from player: ${bet}`;
          }
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
  _onSetPhaseCompleted = (phase, round) => {};
  setOnSetPhaseCompleted = (cb) => (this._onSetPhaseCompleted = cb);
}
