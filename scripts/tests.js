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
    `${hand.id()} actual no. of cards${gotHandCardsCount} expected no. of cards${expectedHandCardsCount}`
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
const testLoungeInitialization = () => {
  console.group();
  console.log("testLoungeInitialization");
  const lounge = newLoungeHeadsUp();

  const expectedActorsCount = 2;
  LOG_ASSERT(
    lounge.getActorsCount() === expectedActorsCount,
    undefined,
    `Expected no. of actors ${expectedActorsCount}`
  );
  const expectedDealerStartCredit = 10000;
  const actualDealerStartCredit = lounge.getDealer().getCredit();
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
  const lounge = newLoungeHeadsUp();
  const round = new Round(lounge);
  const expectedInitialPhase = RoundPhase._NULL;
  const gotPhase = round.getPhase();
  LOG_ASSERT(
    gotPhase === expectedInitialPhase,
    undefined,
    `Expected initial phase: ${expectedInitialPhase} got: ${gotPhase}`
  );
  console.groupEnd();
};

const testHeadsUpDealRoundPhase = () => {
  console.group();
  console.log("testHeadsUpDealRoundPhase");
  const lounge = newLoungeHeadsUp();
  const round = new Round(lounge);
  round.setHands_tt();
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
    const lounge = newLoungeHeadsUp();
    for (let j = 0; j < roundCount; j++) {
      const round = new Round(lounge);
      const player = round.getPlayers()[0];

      round.setHands_tt();
      player.getHands()[0].setBet(typicalBetSize);
      round.dealCards();
      round.concileAllPlayerHandsOnFaceValue();
      console.log(lounge.getPlayers()[0].getCredit());
    }
    const afterCredit = lounge.getPlayers()[0].getCredit();
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
testLoungeInitialization();

// ROUND
testHeadsUpRoundInitialization();

// PHASES

testHeadsUpDealRoundPhase();
// testHeadsUpDrawlessFaceValueConcilliationExpectedLLN();

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
