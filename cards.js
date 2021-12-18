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

const logCards = (cards) => {
  cards.forEach((card) => console.log(card.getSuit() + card.getFaceVal()));
};

/**
 * Swap card positions in the deck
 * @param {Card[]} cards
 */
const swapCardsPosition = (cards, i, j) => {
  [cards[i], cards[j]] = [cards[j], cards[i]];
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
 * @param {Card[]} destCards
 */
const transferTopCard = (sourceCards, destCards) => {
  const card = sourceCards.pop();
  destCards.push(card);
};

/**
 * Deals two cards to hand
 * @param {Card[]} deck the deck to draw from
 * @param {Card[]} hand insert card to hand
 * @returns
 */
const dealToHand = (deck, hand) => {
  transferTopCard(deck, hand);
  transferTopCard(deck, hand);

  return { deck, hand };
};

const testIfTopCardTransferredFromDeck = () => {
  console.group();
  console.log("testIfTopCardTransferredFromDeck");
  const deck = generateStandardDeck();
  let expectedStartingDeckSize = 52;
  console.log(deck.length === expectedStartingDeckSize);
  const PersonHand = [];

  transferTopCard(deck, PersonHand);

  expectedStartingDeckSize -= 1;
  expectedPersonHandSize = 1;
  console.log(deck.length === expectedStartingDeckSize);
  console.log(PersonHand.length === expectedPersonHandSize);

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

/**
 * @typedef {Card[]} Hand
 */

/**
 * newHand
 * @returns {Hand}
 */
const newHand = () => {
  return [];
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
  const _hands = [newHand()];
  return {
    getPersonality: () => _person,
    getName: () => _person.getName(),
    getHands: () => _hands,
    getCredit: () => _person.getCredit(),
  };
};

/**
 *
 * @param {Participants[]} participants
 * @param {Card[]} deck
 */
const dealCards = (participants, deck) => {
  participants.forEach((participant) => {
    const participantHands = participant.getHands();
    participantHands.forEach((participantHand) =>
      dealToHand(deck, participantHand)
    );
  });
};

const shouldInitializedPersonCreditHundred = () => {
  console.group();
  console.log("shouldInitializedPersonCreditHundred");
  const person1 = newPerson("p1");
  const defaultCredit = 100;
  console.log(person1.getCredit() === defaultCredit);
  console.groupEnd();
};

shouldCardsOfParticipantsBeReference = () => {
  console.group();
  console.log("shouldCardsBeReference");

  // checking if we can assign variable to object property , then operate on the variable
  const participant = newParticipant(newPerson());
  const deck = generateStandardDeck();
  const participantHands = participant.getHands(); // this.

  const startHandsCount = 1;
  console.log(participantHands.length === startHandsCount);

  const participantHand = participantHands[0];
  transferTopCard(deck, participantHand);

  const handCardsCount = 1;
  console.log(participantHand.length == handCardsCount);
  console.groupEnd();
};

shouldTwoCardsBeDealtToThreeParticipantsFromStartDeck = () => {
  console.group();
  console.log("shouldTwoCardsBeDealtToThreeParticipantsFromStartDeck");

  const players = [newPerson(), newPerson(), newPerson()];

  const participants = [];
  for (const player of players) {
    participants.push(newParticipant(player));
  }

  const deck = generateStandardDeck();
  dealCards(participants, deck);

  const startDeckSize = 52;
  const cardsDealtPerParticipant = 2;

  const expectDeckSize =
    startDeckSize - participants.length * cardsDealtPerParticipant;
  console.log(expectDeckSize === deck.length);

  participants.forEach((participant) => {
    participant.getHands().forEach((hand) => {
      hand.length === cardsDealtPerParticipant;
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

const testTableHeadsUp = () => {
  console.group();
  console.log("testTableHeadsUp");
  const defaultRound = newTableHeadsUp();
  console.log(defaultRound.getPlayers().length === 1);
  const expectedDealerStartCredit = 10000;
  console.log(
    defaultRound.getDealer().getCredit() === expectedDealerStartCredit
  );

  console.groupEnd();
};

// ROUND

// Round Phase
const ROUND_PHASE_BET = "bet";
const ROUND_PHASE_DEAL = "deal";
const ROUND_PHASE_IN_PLAY = "in play";
const ROUND_PHASE_IN_END = "end";

const initiateRound = (table) => {};

// CARDS
testIfTopCardTransferredFromDeck();

// PERSONS
shouldInitializedPersonCreditHundred();
shouldCardsOfParticipantsBeReference();
shouldTwoCardsBeDealtToThreeParticipantsFromStartDeck();

// TABLE
testTableHeadsUp();
