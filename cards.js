//CARD
const SUIT_CLUBS = "clubs";
const SUIT_DIAMONDS = "diamonds";
const SUIT_HEARTS = "hearts";
const SUIT_SPADES = "spades";

const FACE_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

const SUITS = [SUIT_CLUBS, SUIT_DIAMONDS, SUIT_HEARTS, SUIT_SPADES];

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
const generateDeck = () => {
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

const swapDeckPosition = (cards, i, j) => {
  [cards[i], cards[j]] = [cards[j], cards[i]];
};
const shuffleDeck = (cards) => {
  const cardsLength = cards.length;
  for (let i = 0; i < cardsLength; i++) {
    const shuffleLength = cardsLength - i;
    const swapSourceIndex = i;
    const swapTargetIndex = Math.floor(Math.random() * shuffleLength) + i;
    swapDeckPosition(cards, swapSourceIndex, swapTargetIndex);
  }

  return cards;
};

const transferTopCard = (sourceCardStack, destCardStack) => {
  const card = sourceCardStack.pop();
  destCardStack.push(card);
};

const dealToParticipant = (deck, participantHand) => {
  transferTopCard(deck, participantHand);
  transferTopCard(deck, participantHand);

  return { deck, participantHand };
};

const testIfTopCardTransferredFromDeck = () => {
  console.group();
  console.log("testIfTopCardTransferredFromDeck");
  const deck = generateDeck();
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

const newPerson = (name, startCredit = 100) => {
  const _name = name;
  let _credit = startCredit;
  return {
    getName: () => _name,
    getCredit: () => _credit,
  };
};

const newParticipant = (person) => {
  const _person = person;
  const _hands = [[]];

  return {
    getPersonality: () => _person,
    getName: () => _person.getName(),
    getHands: () => _hands,
    getCredit: () => _person.getCredit(),
  };
};

const shouldInitializedPersonCreditHundred = () => {
  console.group();
  console.log("shouldInitializedPersonCreditHundred");
  const person1 = newPerson("p1");
  const defaultCredit = 100;
  console.log(person1.getCredit() === defaultCredit);
  console.groupEnd();
};

const dealCards = (participants, deck) => {
  participants.forEach((participant) => {
    const participantHands = participant.getHands();
    participantHands.forEach((participantHand) =>
      dealToParticipant(deck, participantHand)
    );
  });
};

shouldCardsOfPersonBeReference = () => {
  console.group();
  console.log("shouldCardsBeReference");

  // checking if we can assign variable to object property , then operate on the variable
  const participant = newParticipant(newPerson());
  const deck = generateDeck();
  const participantHands = participant.getHands();

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

  const deck = generateDeck();
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

// ROUND

const ROUND_PHASE_BET = "bet";
const ROUND_PHASE_DEAL = "deal";
const ROUND_PHASE_IN_PLAY = "in play";
const ROUND_PHASE_IN_END = "in play";

const newRound = (players, dealer) => {
  const _players = players;
  const _dealer = dealer;
  let _phase = ROUND_PHASE_BET;
  return {
    getPlayers: () => _players,
    getDealer: () => _dealer,
    getPhase: () => _phase,
  };
};

const newDefaultRound = () => {
  const p1 = newParticipant(newPerson());
  const p2 = newParticipant(newPerson("", 10000));
  const players = [p1];
  const dealer = p2;

  return newRound(players, dealer);
};

const testDefaultRoundIsHeadsUp = () => {
  console.group();
  console.log("testDefaultRoundIsHeadsUp");
  const defaultRound = newDefaultRound();
  console.log(defaultRound.getPlayers().length === 1);
  const expectedDealerStartCredit = 10000;
  console.log(
    defaultRound.getDealer().getCredit() === expectedDealerStartCredit
  );

  console.groupEnd();
};
// CARDS
testIfTopCardTransferredFromDeck();

// PERSONS
shouldInitializedPersonCreditHundred();
shouldCardsOfPersonBeReference();
shouldTwoCardsBeDealtToThreeParticipantsFromStartDeck();

// GAME
testDefaultRoundIsHeadsUp();
