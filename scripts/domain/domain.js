//CARD
const SUIT_CLUBS = "CLUBS";
const SUIT_DIAMONDS = "DIAMONDS";
const SUIT_HEARTS = "HEARTS";
const SUIT_SPADES = "SPADES";

const FACE_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

const SUITS = [SUIT_CLUBS, SUIT_DIAMONDS, SUIT_HEARTS, SUIT_SPADES];

/**
 * @typedef {Object} Card
 * @property {number} getSuit get suit of card
 * @property {number} getFaceValue get face value of card
 */

/**
 * Creates a new card
 * @param {string} suit
 * @param {number} faceVal
 * @returns {Card}
 */
const createNewCard = (suit, faceVal) => {
  /** @private @const {string} */
  let _suit = suit;
  /** @private @const {number} */
  let _faceVal = faceVal;

  return {
    suit,
    faceVal,
    getSuit: () => _suit,
    getFaceValue: () => _faceVal,
    getString: () => `${_suit}${_faceVal}`,
  };
};

/**
 * Generates a standard deck of cards
 * @returns {Card[]}
 */
const generateStandardDeck = () => {
  const deck = [];
  for (let suit of SUITS) {
    for (let faceValue of FACE_VALUES) {
      deck.push(createNewCard(suit, faceValue));
    }
  }
  return deck;
};

/**
 * Swap card positions in the deck
 * @param {Card[]} deck
 */
const shuffleDeck = (deck) => {
  const length = deck.length;
  for (let i = 0; i < length; i += 1) {
    const j = Math.floor(Math.random() * (length - i)) + i;
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

/**
 * Transfer one card from source to destination
 * @param {Card[]} sourceCards
 * @param {Hand} destCards
 */
const transferTopCardToHand = (sourceCards, hand) => {
  hand.addCard(sourceCards.pop());
};

/**
 * Deals two cards to hand
 * @param {Card[]} deck the deck to draw from
 * @param {Hand} hand insert card to hand
 * @returns
 */
const dealToHand = (deck, hand) => {
  transferTopCardToHand(deck, hand);
  transferTopCardToHand(deck, hand);
  return { deck, hand };
};

//PERSON

/**
 * @typedef {Object} Person
 * @property {function() => string} getName Get name of person
 * @property {function() => number} getCredit Get credit of person
 */

/**
 *
 * @returns {Person}
 */
const newPerson = (name = "nameless homie", startCredit = 100) => {
  const _name = name;
  let _credit = startCredit;
  return {
    getName: () => _name,
    getCredit: () => _credit,
    decreaseCredit: (amt) => (_credit -= amt),
    increaseCredit: (amt) => (_credit += amt),
  };
};

// HAND

class HandStatus {
  static IN_PLAY = new HandStatus();
  static SETTLED = new HandStatus();
  constructor() {}
}

class Hand {
  constructor() {
    /** @private @const {Card[]} */
    this._cards = [];
    /** @private @const {number} */
    this._bet = null;
    this._sponsor = null;
    this._status = HandStatus.IN_PLAY;
    this._id = uuidv4();
  }
  setBet = (amt) => {
    this._bet = amt;
    this._onSetBet(this._bet);
  };
  addBet = (amt) => this.setBet(this._bet + amt);
  setSponsor = (player) => (this._sponsor = player);

  getBet = () => this._bet;
  /**
   *
   * @param {Card} card
   */
  addCard = (card) => {
    this._cards.push(card);
    this._onAddCard(card);
  };

  getCards = () => this._cards;
  count = () => this._cards.length;
  getFaceValue = () => {
    return this._cards.reduce((sum, currentCard, _) => {
      return (sum += currentCard.getFaceValue());
    }, 0);
  };
  _onAddCard = (card) => {};
  setOnAddCard = (cb) => (this._onAddCard = cb);
  _onSetBet = (bet) => {};
  setOnSetBet = (cb) => {
    this._onSetBet = cb;
  };
  desc = () => `${this._cards.forEach((c) => `(${c.getString()})`)}`;
  id = () => this._id;
}
/**
 * newHand
 * @returns {Hand}
 */
const newHand = () => {
  return new Hand();
};

/**
 *
 * @param {Actor} actors
 */
const createHands = (actors) => {
  for (const actor of actors) {
    actor.createNewHand();
  }
};

// PARTICIPANT

/**
 *
 * @typedef {Object} Participant
 * @property {function() => Person} getPersonality
 * @property {function() => string} getName
 * @property {function() => Hand[]} getHands
 * @property {function() => number} getCredit
 */

/**
 *
 * @param {Person} person
 * @returns {Participant}
 */
const newParticipant = (person) => {
  const _person = person;

  return {
    getPersonality: () => _person,
    getName: () => _person.getName(),
    getCredit: () => _person.getCredit(),
    decreaseCredit: (amt) => _person.decreaseCredit(amt),
    increaseCredit: (amt) => _person.increaseCredit(amt),
  };
};

class Actor {
  /**
   *
   * @param {Participant} participant
   */
  constructor(participant) {
    /** @private @const {Participant} */
    this._participant = participant;

    /** @private @const {Hand[]} */
    this._hands = [];
    this._id = uuidv4();
  }
  /**
   * @returns {Hand[]}
   */
  getHands = () => this._hands;
  createNewHand = () => {
    const newHand = new Hand();
    this._hands.push(newHand);
    this.onNewHand(newHand);
    return newHand;
  };
  onNewHand = (hand) => {};
  setOnNewHand = (cb) => {
    this.onNewHand = cb;
  };
  getParticipant = () => this._participant;
  getName = () => this._participant.getName();
  getCredit = () => this._participant.getCredit();
  decreaseCredit = (amt) => this._participant.decreaseCredit(amt);
  increaseCredit = (amt) => this._participant.increaseCredit(amt);
  id = () => this._id;
}

/**
 *
 * @param {*} participant
 * @returns
 */

class Player extends Actor {
  /**
   *
   * @param {Participant} participant
   */
  constructor(participant) {
    super(participant);
  }

  getPlayableCredit = () => {
    const inBid = this.getHands().reduce((sum, hand) => {
      const bet = hand.getBet() || 0;
      return bet + sum;
    }, 0);

    return this.getCredit - inBid;
  };
}
/**
 *
 * @param {Participant} participant
 */
const newPlayer = (participant) => {
  return new Player(participant);
};

class Dealer extends Actor {
  /**
   * @param {Participant} participant
   */
  constructor(participant) {
    super(participant);
  }
}

const newDealer = (participant) => new Dealer(participant);

/**
 * Deal two cards from the deck to hands of actor.
 * @param {Actor} actor
 * @param {Card[]} deck
 */
const dealToHandsOfActor = (actor, deck) => {
  const hands = actor.getHands();
  for (const hand of hands) {
    dealToHand(deck, hand);
  }
};

const dealToHandsOfActors = (actors, deck) => {
  for (const actor of actors) {
    dealToHandsOfActor(actor, deck);
  }
};
const testIfTopCardTransferredFromDeck = () => {
  console.group();
  console.log("testIfTopCardTransferredFromDeck");
  const deck = generateStandardDeck();
  let expectedStartingDeckSize = 52;
  LOG_ASSERT(
    deck.length === expectedStartingDeckSize,
    undefined,
    `actual start size ${deck.length}. Expected ${expectedStartingDeckSize}`
  );
  const hand = newHand();

  transferTopCardToHand(deck, hand);

  const expectedDeckSizeAfterOneTransfer = expectedStartingDeckSize - 1;

  actualHandSize = hand.count();
  expectedHandSize = 1;
  LOG_ASSERT(
    deck.length === expectedDeckSizeAfterOneTransfer,
    undefined,
    `Actual ${deck.length}. Expected${expectedDeckSizeAfterOneTransfer}`
  );
  LOG_ASSERT(
    actualHandSize === expectedHandSize,
    undefined,
    `Actual hand size ${actualHandSize}. Expected${expectedHandSize}`
  );
  console.groupEnd();
};

// TABLE

class Table {
  /**
   *
   * @param {Person[]} players
   * @param {Person} dealer
   */
  constructor(players, dealer) {
    /** @private @const {!Partipants[]} */
    this._players = players.map((player) => newParticipant(player));

    /** @private @const {!Partipants} */
    this._dealer = newParticipant(dealer);
  }

  getPlayers = () => this._players;
  getDealer = () => this._dealer;
  getPhase = () => this._phase;
  getActorsCount = () => this.getPlayers().length + (!!this.getDealer ? 1 : 0);
}

/**
 *
 * @param {Person[]} players
 * @param {Person} dealer
 * @returns {Table}
 */
const newTable = (players, dealer) => {
  return new Table(players, dealer);
};

/**
 *
 * @param {Person} p1
 * @param {Person} dealer
 * @returns
 */
const newTableHeadsUp = (p1, dealer) => {
  p1 = p1 || newPerson(`p1`);
  const players = [p1];
  dealer = dealer || newPerson("D", 10000);

  return newTable(players, dealer);
};

/**
 *
 * @param {Person} p1
 * @param {Person} dealer
 * @returns
 */
const newTableTwoPlayers = (p1, p2, dealer) => {
  p1 = p1 || newPerson(`p1`);
  p2 = p2 || newPerson(`p2`);
  const players = [p1, p2];
  dealer = dealer || newPerson("D_AgainstTwoPlayers", 10000);
  return newTable(players, dealer);
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

  _onSetPhase = (phase) => {};

  setOnSetPhase = (fn) => (this._onSetPhase = fn);
  _setPhase = (phase) => {
    const prevPhase = this._phase;
    this._phase = phase;
    console.warn(`Changing Phase ${prevPhase.desc()} -> ${this._phase.desc()}`);
    this._onSetPhase(this._phase);
  };

  _onSetPhaseCompleted = (phase) => {};
  setOnSetPhaseCompleted = (fn) => (this._onSetPhaseCompleted = fn);
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
  _initInPlayDealer = () => {
    this._setPhase(RoundPhase.IN_PLAY_DEALER);
    //TODO - Reconcilliation
    this.requestInitEndPhase();
  };
  _initInPlayPlayers = () => {
    this._setPhase(RoundPhase.IN_PLAY_PLAYERS);
    this._resetInPlayPlayerTurn();
    this._changeInPlayPlayerTurn();
  };

  _initEnd = () => {
    this._setPhase(RoundPhase.END);
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
    this.setCurrentHand(hand);
    this.setCurrentPlayer(player);

    const [afterPlayer, afterHand] = [
      this.getCurrentPlayer(),
      this.getCurrentHand(),
    ];

    this._onChangeBetTurn(
      beforePlayer,
      beforeHand,
      afterPlayer,
      afterHand,
      this._phase
    );
  };
  _resetInPlayPlayerTurn = () => {
    this._nextTurn = this._nextHandGenerator(this.getPlayers());
  };
  _changeInPlayPlayerTurn = () => {
    const { hand, actor: player } = this._nextTurn();
    console.log(`Playing Turn for ${player?.getName()} on ${hand?.id()}`);
    this.setCurrentHand(hand);
    this.setCurrentPlayer(player);
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
    this._currentPlayer = player;
  };
  setCurrentHand = (hand) => {
    this._currentHand = hand;
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
    const nextHand = this._nextHandGenerator(this.getActors());
    let { hand, actor } = nextHand();
    while (hand) {
      console.log(`Dealing to Actor [${actor.getName()}] Hand [${hand.id()}]`);
      dealToHand(this._deck, hand);
      const newHand = nextHand();
      hand = newHand.hand;
      actor = newHand.actor;
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

  _onChangeBetTurn = (prevPlayer, prevHand, newPlayer, newHand, phase) => {};
  setOnChangeBetTurn = (fn) => (this._onChangeBetTurn = fn);
}
