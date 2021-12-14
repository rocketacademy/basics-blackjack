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

const dealToPerson = (deck, PersonHand) => {
  transferTopCard(deck, PersonHand);
  transferTopCard(deck, PersonHand);

  return { deck, PersonHand };
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
  const _hand = [];
  let _credit = startCredit;
  return {
    getName: () => _name,
    getHand: () => _hand,
    getCredit: () => _credit,
  };
};

const shouldInitializedPersonEmptyHanded = () => {
  console.group();
  console.log("shouldInitializedPersonEmptyHanded");
  const person1 = newPerson("p1");
  console.log(person1.getHand().length === 0);
  console.groupEnd();
};

const dealCards = (persons, deck) => {
  persons.forEach((person) => {
    const personHand = person.getHand();
    dealToPerson(deck, personHand);
  });
};

shouldCardsOfPersonBeReference = () => {
  console.group();
  console.log("shouldCardsBeReference");

  // checking if we can assign variable to object property , then operate on the variable
  const Person = newPerson();
  const deck = generateDeck();
  const PersonHand = Person.getHand();
  transferTopCard(deck, PersonHand);

  console.log(Person.getHand().length == 1);
  console.groupEnd();
};

shouldTwoCardsBeDealtToThreePersonsFromStartDeck = () => {
  console.group();
  console.log("shouldTwoCardsBeDealtToThreePersonsFromStartDeck");
  const persons = [newPerson("1"), newPerson("2"), newPerson("3")];
  const deck = generateDeck();
  dealCards(persons, deck);

  const startDeckSize = 52;
  const cardsDealtPerPerson = 2;
  const expectDeckSize = startDeckSize - persons.length * cardsDealtPerPerson;
  console.log(expectDeckSize === deck.length);
  persons.forEach((p) => {
    console.log(p.getHand().length === cardsDealtPerPerson);
  });
  console.groupEnd();
};

// ROUND

const ROUND_PHASE_DEAL = "deal";
const ROUND_PHASE_IN_PLAY = "in play";
const ROUND_PHASE_IN_END = "in play";

const newRound = (players, dealer) => {
  const _players = players;
  const _dealer = dealer;
  return {
    getPlayers: () => _players,
    getDealer: () => _dealer,
  };
};

const newDefaultRound = () => {
  const person1 = newPerson();
  const person2 = newPerson("max", 10000);
  const players = [person1];
  const dealer = person2;

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
shouldInitializedPersonEmptyHanded();
shouldCardsOfPersonBeReference();
shouldTwoCardsBeDealtToThreePersonsFromStartDeck();

// GAME
testDefaultRoundIsHeadsUp();
