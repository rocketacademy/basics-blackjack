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
