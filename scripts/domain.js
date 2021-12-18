//CARD
const SUIT_CLUBS = "clubs";
const SUIT_DIAMONDS = "diamonds";
const SUIT_HEARTS = "hearts";
const SUIT_SPADES = "spades";

const FACE_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

const SUITS = [SUIT_CLUBS, SUIT_DIAMONDS, SUIT_HEARTS, SUIT_SPADES];

/**
 * @typedef {Object} Card
 * @property {function} getSuit get suit of card
 * @property {function} getFaceValue get face value of card
 */

/**
 * Creates a new card
 * @param {*} suit
 * @param {*} faceVal
 * @returns {Card}
 */
const createNewCard = (suit, faceVal) => {
  let _suit = suit;
  let _faceVal = faceVal;

  return {
    suit,
    faceVal,
    getSuit: () => _suit,
    getFaceValue: () => _faceVal,
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
    this._bet = 0;
    this._status = HandStatus.IN_PLAY;
  }

  setBet = (amt) => (this._bet = amt);
  addBet = (amt) => (this._bet += amt);
  getBet = () => this._bet;
  /**
   *
   * @param {Card} card
   */
  addCard = (card) => {
    this._cards.push(card);
  };
  count = () => this._cards.length;
  getFaceValue = () => {
    return this._cards.reduce((sum, currentCard, _) => {
      return (sum += currentCard.getFaceValue());
    }, 0);
  };
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

  getHands = () => this._hands;
  createNewHand = () => {
    const newHand = new Hand();
    this._hands.push(newHand);
    return newHand;
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

const shouldInitializedPersonCreditHundred = () => {
  console.group();
  console.log("shouldInitializedPersonCreditHundred");
  const person1 = newPerson("p1");
  const expectedCredit = 100;

  LOG_ASSERT(
    person1.getCredit() === expectedCredit,
    undefined,
    `startCredit ${expectedCredit}`
  );
  console.groupEnd();
};

shouldCardsOfParticipantsBeReferenceInARound = () => {
  console.group();
  console.log("shouldCardsBeReference");

  // checking if we can assign variable to object property , then operate on the variable
  const player = newPlayer(newParticipant(newPerson(`p1`)));
  const deck = generateStandardDeck();

  player.createNewHand();

  dealToHandsOfActor(player, deck);

  const hands = player.getHands(); // this.

  const startHandsCount = 1;

  LOG_ASSERT(
    hands.length === startHandsCount,
    undefined,
    `actual no. of hands ${hands.length} expected hands count ${startHandsCount}`
  );
  const hand = hands[0];

  const expectedHandCardsCount = 2;
  const gotHandCardsCount = hand.count();
  LOG_ASSERT(
    gotHandCardsCount === expectedHandCardsCount,
    undefined,
    `${hand} actual no. of cards${gotHandCardsCount} expected no. of cards${expectedHandCardsCount}`
  );
  console.groupEnd();
};

shouldTwoCardsBeDealtToThreePlayersFromStartDeck = () => {
  console.group();
  console.log("shouldTwoCardsBeDealtToThreePlayersFromStartDeck");

  const persons = [newPerson(`1`), newPerson(`2`), newPerson(`3`)];

  const players = [];
  for (const person of persons) {
    const player = newPlayer(newParticipant(person));
    player.createNewHand();
    players.push(player);
  }

  const deck = generateStandardDeck();
  dealToHandsOfActors(players, deck);

  const startDeckSize = 52;
  const cardsDealtPerPlayer = 2;

  const expectDeckSizeAfterDealing =
    startDeckSize - players.length * cardsDealtPerPlayer;

  LOG_ASSERT(
    expectDeckSizeAfterDealing === deck.length,
    undefined,
    `Actual deck size after deal ${deck.length}. Expected ${expectDeckSizeAfterDealing}`
  );

  players.forEach((player) => {
    player.getHands().forEach((hand) => {
      const gotLength = hand.count();

      LOG_ASSERT(
        gotLength === cardsDealtPerPlayer,
        undefined,
        `got hand.length ${gotLength} expected cardsDealtPerPlayer ${cardsDealtPerPlayer}`
      );
    });
  });
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
  static BID = new RoundPhase("bet");
  static SIT = new RoundPhase("SIT");
  static DEAL = new RoundPhase("deal");
  static IN_PLAY_PLAYERS = new RoundPhase("players");
  static IN_PLAY_DEALER = new RoundPhase("dealer");
  static END = new RoundPhase("end");

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
    this._phase = null;
    /** @private @const {number} */
    this._actorsCount = this.allActors().length;
    /** @private @const {number} */
    this._playersCount = this.getPlayers().length;
    /** @private @const {Player} */
    this._currentPlayer = null;

    this._nextPlayer = ((players) => {
      let index = 0;
      let length = players.length;
      return () => (index < length ? players[index++] : null);
    })(this.getPlayers());
  }
  /**
   *
   * @returns {RoundPhase}
   */
  getPhase = () => this._phase;
  getPlayers = () => this._players;
  getDealer = () => this._dealer;
  allActors = () => [...this.getPlayers(), this.getDealer()];
  dealCards = () => {
    dealToHandsOfActors(this.allActors(), this._deck);
  };
  deckSize = () => this._deck.length;
  setHands = () => createHands(this.allActors());
  getDealerHands = () => this._dealer.getHands();
  changePhase = (phase) => {
    this._phase = phase;
    if (this._phase === RoundPhase.SIT) {
      this.changePlayer();
    }
  };

  changePlayer = () => {
    const nextPlayer = this._nextPlayer();
    console.log(
      !!nextPlayer
        ? "player changed to " + nextPlayer.getName()
        : `no next player`
    );
    this.setCurrentPlayer(nextPlayer);
    return this.getCurrentPlayer();
  };
  setCurrentPlayer = (player) => {
    this._currentPlayer = player;
  };
  getCurrentPlayer = () => this._currentPlayer;
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
}

const testHeadsUpTableInitialization = () => {
  console.group();
  console.log("testHeadsUpTableInitialization");
  const table = newTableHeadsUp();

  const expectedActorsCount = 2;
  LOG_ASSERT(
    table.getActorsCount() === expectedActorsCount,
    undefined,
    `Expected no. of actors ${expectedActorsCount}`
  );
  const expectedDealerStartCredit = 10000;
  const actualDealerStartCredit = table.getDealer().getCredit();
  LOG_ASSERT(
    actualDealerStartCredit === expectedDealerStartCredit,
    undefined,
    `actual start credit: ${actualDealerStartCredit}. Expected ${expectedDealerStartCredit}`
  );
  console.groupEnd();
};

const testHeadsUpRoundInitialization = () => {
  console.group();
  console.log("testHeadsUpRoundInitialization");
  const table = newTableHeadsUp();
  const round = new Round(table);
  const expectedInitialPhase = RoundPhase.BET;
  LOG_ASSERT(
    round.getPhase() === expectedInitialPhase,
    undefined,
    `Expected initial phase: ${expectedInitialPhase}`
  );
  console.groupEnd();
};

const testHeadsUpDealRoundPhase = () => {
  console.group();
  console.log("testHeadsUpDealRoundPhase");
  const table = newTableHeadsUp();
  const round = new Round(table);
  round.setHands();
  round.dealCards();

  const startingDeckSize = 52;
  const cardsDealtPerActor = 2;
  const playerCount = 1;
  const dealerCount = 1;

  const expectedDeckSize =
    startingDeckSize - cardsDealtPerActor * (playerCount + dealerCount);
  const actualRemainingDeckSize = round.deckSize();

  const isRemainingDeckAfterDealCards = [
    expectedDeckSize === actualRemainingDeckSize,
    undefined,
    `isRemainingDeckAfterDealCards expected ${expectedDeckSize} got ${actualRemainingDeckSize}`,
  ];
  LOG_ASSERT(...isRemainingDeckAfterDealCards);

  console.groupEnd();
};

const testHeadsUpDrawlessFaceValueConcilliationExpectedLLN = () => {
  console.group();
  console.log("testHeadsUpDrawlessFaceValueConcilliationExpectedLLN");
  const roundCount = 10000;
  const startingCredit = 100;
  const typicalBetSize = 1;

  const lowerMargin = startingCredit - 5;
  const upperMargin = startingCredit + 5;
  for (let i = 0; i < 1; i++) {
    // fair and uniform play
    const table = newTableHeadsUp();
    for (let j = 0; j < roundCount; j++) {
      const round = new Round(table);
      const player = round.getPlayers()[0];

      round.setHands();
      player.getHands()[0].setBet(typicalBetSize);
      round.dealCards();
      round.concileAllPlayerHandsOnFaceValue();
      console.log(table.getPlayers()[0].getCredit());
    }
    const afterCredit = table.getPlayers()[0].getCredit();
    const isNearStartingCredit = [
      lowerMargin <= afterCredit && afterCredit <= upperMargin,
      undefined,
      `After credit ${afterCredit}. Not near starting credit after ${roundCount}`,
    ];
    LOG_ASSERT(...isNearStartingCredit);
  }
  console.groupEnd();
};

// CARDS
testIfTopCardTransferredFromDeck();

// PERSONS
shouldInitializedPersonCreditHundred();
shouldCardsOfParticipantsBeReferenceInARound();
shouldTwoCardsBeDealtToThreePlayersFromStartDeck();

// TABLE
testHeadsUpTableInitialization();

// ROUND
testHeadsUpRoundInitialization();

// PHASES

testHeadsUpDealRoundPhase();
// testHeadsUpDrawlessFaceValueConcilliationExpectedLLN();
