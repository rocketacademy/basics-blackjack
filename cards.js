// logs

const logCards = (cards) => {
  cards.forEach((card) => console.log(card.getSuit() + card.getFaceVal()));
};

const logAssert = (predicate, trueExpr, falseExpr) => {
  if (predicate === true) {
    if (trueExpr) {
      console.log(trueExpr);
    }
  } else if (predicate === false) {
    if (falseExpr) {
      console.log(falseExpr);
    }
  } else {
    console.warn("assertion is not truthy");
  }
};

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
 * @property {function} getFaceVal get face value of card
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
    getFaceVal: () => _faceVal,
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
const swapCardsPosition = (deck, i, j) => {
  [deck[i], deck[j]] = [deck[j], deck[i]];
};
const shuffleDeck = (cards) => {
  const cardsLength = cards.length;
  for (let i = 0; i < cardsLength; i++) {
    const shuffleLength = cardsLength - i;
    const swapSourceIndex = i;
    const swapTargetIndex = Math.floor(Math.random() * shuffleLength) + i;
    swapCardsPosition(cards, swapSourceIndex, swapTargetIndex);
  }
  return cards;
};

/**
 * Transfer one card from source to destination
 * @param {Card[]} sourceCards
 * @param {Hand} destCards
 */
const transferTopCardToHand = (sourceCards, hand) => {
  const card = sourceCards.pop();
  hand.addCard(card);
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
  logAssert(
    deck.length === expectedStartingDeckSize,
    undefined,
    `actual start size ${deck.length}. Expected ${expectedStartingDeckSize}`
  );
  const hand = newHand();

  transferTopCardToHand(deck, hand);

  const expectedDeckSizeAfterOneTransfer = expectedStartingDeckSize - 1;

  actualHandSize = hand.count();
  expectedHandSize = 1;
  logAssert(
    deck.length === expectedDeckSizeAfterOneTransfer,
    undefined,
    `Actual ${deck.length}. Expected${expectedDeckSizeAfterOneTransfer}`
  );
  logAssert(
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
const newPerson = (name, startCredit = 100) => {
  const _name = name;
  let _credit = startCredit;
  return {
    getName: () => _name,
    getCredit: () => _credit,
  };
};

// HAND

class Hand {
  constructor() {
    /** @private @const {Card[]} */
    this._cards = [];
    /** @private @const {number} */
    this._bet = 0;
  }

  setBet = (amt) => (this._bet = amt);
  addBet = (amt) => (this._bet += amt);
  getBet = () => this._bet;
  /**
   *
   * @param {Card} card
   */
  addCard = (card) => this._cards.push(card);
  count = () => this._cards.length;
}
/**
 * newHand
 * @returns {Hand}
 */
const newHand = () => {
  return new Hand();
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
  };
};

class Actor {
  /**
   *
   * @param {Participant} participant
   */
  constructor(participant) {
    this._participant = participant;

    /** @private @const {Hand[]} */
    this._hands = [];
  }

  getHands = () => this._hands;
  createNewHand = () => {
    const newHand = new Hand();
    this._hands.push(newHand);
    return newHand;
  };
  getParticipant = () => this._participant;
  getName = () => this._participant;
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

const newDealer = (participant) => {
  return new Dealer(participant);
};

/**
 * Creates a new hand for the actor, then deal two cards from the deck to the hand.
 * @param {Actor} actor
 * @param {Card[]} deck
 */
const dealNewHandToPlayer = (actor, deck) => {
  const hand = actor.createNewHand();
  dealToHand(deck, hand);
};

const dealnewHandsToPlayers = (actors, deck) => {
  for (const actor of actors) {
    dealNewHandToPlayer(actor, deck);
  }
};

const shouldInitializedPersonCreditHundred = () => {
  console.group();
  console.log("shouldInitializedPersonCreditHundred");
  const person1 = newPerson("p1");
  const expectedCredit = 100;

  logAssert(
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
  const player = newPlayer(newParticipant(newPerson()));
  const deck = generateStandardDeck();
  dealNewHandToPlayer(player, deck);
  const hands = player.getHands(); // this.

  const startHandsCount = 1;

  logAssert(
    hands.length === startHandsCount,
    undefined,
    `actual no. of hands ${hands.length} expected hands count ${startHandsCount}`
  );
  const hand = hands[0];

  const expectedHandCardsCount = 2;
  const gotHandCardsCount = hand.count();
  logAssert(
    gotHandCardsCount === expectedHandCardsCount,
    undefined,
    `${hand} actual no. of cards${gotHandCardsCount} expected no. of cards${expectedHandCardsCount}`
  );
  console.groupEnd();
};

shouldTwoCardsBeDealtToThreePlayersFromStartDeck = () => {
  console.group();
  console.log("shouldTwoCardsBeDealtToThreePlayersFromStartDeck");

  const persons = [newPerson(), newPerson(), newPerson()];

  const players = [];
  for (const person of persons) {
    players.push(newPlayer(newParticipant(person)));
  }

  const deck = generateStandardDeck();
  dealnewHandsToPlayers(players, deck);

  const startDeckSize = 52;
  const cardsDealtPerPlayer = 2;

  const expectDeckSizeAfterDealing =
    startDeckSize - players.length * cardsDealtPerPlayer;

  logAssert(
    expectDeckSizeAfterDealing === deck.length,
    undefined,
    `Actual deck size after deal ${expectDeckSizeAfterDealing}. Expected ${deck.length}`
  );

  players.forEach((player) => {
    player.getHands().forEach((hand) => {
      const gotLength = hand.count();

      logAssert(
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
  p1 = p1 || newPerson();
  const players = [p1];
  dealer = dealer || newPerson("", 10000);

  return newTable(players, dealer);
};

// ROUND

// Round Phase
const ROUND_PHASE_BET = "bet";
const ROUND_PHASE_DEAL = "deal";
const ROUND_PHASE_IN_PLAY = "in play";
const ROUND_PHASE_IN_END = "end";

class Round {
  /**
   *
   * @param {Table} table
   */
  constructor(table) {
    /** @private @const {!Player[]} */
    this._players = table.getPlayers().map((p) => newPlayer(p));
    /** @private @const {!Dealer} */
    this._dealer = newDealer(table.getDealer());

    this._phase = ROUND_PHASE_BET;
  }

  getPhase = () => this._phase;
  getPlayers = () => this._players;
}

class HtmlPlayer {
  /**
   * @param {Player} player
   */
  constructor(player) {
    this._html = document.createAttribute("div");
    this._html.innerHTML = player.getName();
  }

  getHTML = () => this._html;
  getHTMLNodeName = () => this._html.nodeName;
}

/**
 * @param {Player} player
 */
const newHtmlPlayer = (player) => {
  return new HtmlPlayer(player);
};

/**
 *
 * @param {Player[]} players
 * @returns {HtmlPlayer} html representation of the players
 */
const newHtmlPlayers = (players) => {
  return players.map((player) => newHtmlPlayer(player));
};

class HTMLRound {
  /**
   *
   * @param {Round} round
   */
  constructor(round) {
    this._round = round;

    this._htmlPlayers = newHtmlPlayers(this._round.getPlayers());
  }

  getHtmlPlayers = () => this._htmlPlayers;
}

const testHeadsUpTableInitialization = () => {
  console.group();
  console.log("testHeadsUpTableInitialization");
  const table = newTableHeadsUp();

  const expectedActorsCount = 2;
  logAssert(
    table.getActorsCount() === expectedActorsCount,
    undefined,
    `Expected no. of actors ${expectedActorsCount}`
  );
  const expectedDealerStartCredit = 10000;
  const actualDealerStartCredit = table.getDealer().getCredit();
  logAssert(
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
  const expectedInitialPhase = ROUND_PHASE_BET;
  logAssert(
    round.getPhase() === expectedInitialPhase,
    undefined,
    `Expected initial phase: ${expectedInitialPhase}`
  );
  console.groupEnd();
};

const testHeadsUpRoundPlayerHtml = () => {
  console.group();
  console.log("testHeadsUpRoundPlayerHtml");
  const table = newTableHeadsUp();
  const round = new Round(table);

  const htmlRound = new HTMLRound(round);

  const htmlPlayers = htmlRound.getHtmlPlayers();

  const htmlHeadsUpPlayer = htmlPlayers[0];

  logAssert(
    htmlHeadsUpPlayer.getHTMLNodeName().toLowerCase() === "div",
    undefined,
    "underlying type of htmlHeadsUpPlayer is not a html div"
  );
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

// HTML ROUND

testHeadsUpRoundPlayerHtml();
