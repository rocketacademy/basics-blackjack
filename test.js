const newTestCollection = new TestBlackJack();

newTestCollection.addTest(`test_Lounge_TwoPlayersLounge`, () => {
  const lounge = Sample.getTwoPlayersLounge();
  const expectedPlayerCount = 2;
  const actualPlayerCount = lounge.playerCount();
  LOG_ASSERT(
    ...[
      expectedPlayerCount === actualPlayerCount,
      ``,
      `[Player Count] Expected: ${expectedPlayerCount} Got: ${actualPlayerCount}`,
    ]
  );

  const expectedDealerCount = 1;
  const actualDealerCount = lounge.dealerCount();
  LOG_ASSERT(
    ...[
      expectedDealerCount === actualDealerCount,
      ``,
      `[Dealer Count] Expected: ${expectedDealerCount} Got: ${actualDealerCount}`,
    ]
  );

  const expectedShoeSize = 52 * 4;
  const initialShoeSize = lounge.shoeSize();
  LOG_ASSERT(
    ...[
      expectedShoeSize === initialShoeSize,
      ``,
      `[Deck Size] Expected: ${expectedShoeSize} Got: ${initialShoeSize}`,
    ]
  );
});

newTestCollection.addTest(`test_Round_Init`, () => {
  const lounge = Sample.getDefaultLounge();
  const round = newRound(lounge);

  const expectedPhase = RoundPhase._NULL;
  LOG_ASSERT(
    expectedPhase === round.getPhase(),
    ``,
    `Expected Phase ${expectedPhase}`
  );

  const expectedRootSeat = null;
  LOG_ASSERT(
    expectedRootSeat === round.getRootSeat(),
    ``,
    `Expected Root Seat ${expectedRootSeat}`
  );
});

newTestCollection.addTest(`test_Round_TwoPlayers_Init`, () => {
  const lounge = Sample.getTwoPlayersLounge();
  const round = newRound(lounge);

  const expectedPhase = RoundPhase._NULL;
  LOG_ASSERT(
    expectedPhase === round.getPhase(),
    ``,
    `Expected Phase ${expectedPhase}`
  );

  const expectedRootSeat = null;
  LOG_ASSERT(
    expectedRootSeat === round.getRootSeat(),
    ``,
    `Expected Root Seat ${expectedRootSeat}`
  );

  const expectedFirstPlayerName = `Player 1`;
  const actualFirstPlayerName = round.peekFirstChair().getName();

  LOG_ASSERT(
    expectedFirstPlayerName === actualFirstPlayerName,
    ``,
    `First Player Name expected ${expectedFirstPlayerName} got ${actualFirstPlayerName}`
  );

  const expectRoundOfDealer = round;
  const actualRoundOfDealer = round.getDealer().getRound();

  LOG_ASSERT(
    expectRoundOfDealer === actualRoundOfDealer,
    ``,
    `Dealer should be roundAware`
  );
});

newTestCollection.addTest(`test_Round_TwoPlayers_Render`, () => {
  const lounge = Sample.getTwoPlayersLounge();

  const parentRoot = TestBlackJack.newStubRoot();
  const [round, uiRound] = new PlayingArea(parentRoot).renderRound(lounge);

  const expectedChildrenOf_parentRoot = uiRound.getRoot();
  const actualChildrenOf_parentRoot = parentRoot.childNodes[0];
  LOG_ASSERT(
    expectedChildrenOf_parentRoot === actualChildrenOf_parentRoot,
    ``,
    `FAIL! ui not attached`
  );
  LOG_ASSERT(
    1 === parentRoot.children.length,
    ``,
    `Should have one and only children of parentRoot`
  );
});

newTestCollection.addTest(`test_PlayingArea_TwoPlayers`, () => {
  const lounge = Sample.getTwoPlayersLounge();
  const parentRoot = TestBlackJack.newStubRoot();

  LOG_ASSERT(
    parentRoot.childNodes.length === 0,
    ``,
    `Parent root not childless.`
  );

  const [round, uiRound] = new PlayingArea(parentRoot).commenceRound(lounge);

  const actualParentRoot = uiRound.getParentRoot();
  LOG_ASSERT(actualParentRoot === parentRoot, ``, `Parent root not immutable.`);

  const expectedChildrenOf_parentRoot_beforeRoundFinish = uiRound.getRoot();
  const actualChildrenOf_parentRoot_beforeRoundFinish =
    parentRoot.childNodes[0];

  LOG_ASSERT(
    expectedChildrenOf_parentRoot_beforeRoundFinish ===
      actualChildrenOf_parentRoot_beforeRoundFinish,
    ``,
    `FAIL! ui not attached beforeRoundFinish ${actualChildrenOf_parentRoot_beforeRoundFinish}`
  );

  LOG_ASSERT(
    1 === parentRoot.children.length,
    ``,
    `Should have one and only children of parentRoot`
  );

  round.finish(true);

  const actualChildrenOf_parentRoot_afterRoundFinish = parentRoot.children[0];
  LOG_ASSERT(
    expectedChildrenOf_parentRoot_beforeRoundFinish !==
      actualChildrenOf_parentRoot_afterRoundFinish,
    ``,
    `FAIL! round ui attached after finish`
  );
  LOG_ASSERT(
    1 === parentRoot.children.length,
    ``,
    `Should still have one and only children of parentRoot. Attach some element, any element.`
  );
});

newTestCollection.addTest(`test_Round_generating players of seats`, () => {
  const lounge = Sample.getTwoPlayersLounge();

  const parentRoot = TestBlackJack.newStubRoot();

  const [round, uiRound] = new PlayingArea(parentRoot).commenceRound(lounge);

  const seatGenerator = round.getSeatGenerator();

  const seat1 = seatGenerator.next();
  const chair1 = seat1.getChair();
  const expectedFirstChairName = `Player 1`;
  const actualFirstChairName = chair1.getName();

  LOG_ASSERT(
    expectedFirstChairName === actualFirstChairName,
    ``,
    `expectedFirstChairName ${expectedFirstChairName} got ${actualFirstChairName} `
  );
});

newTestCollection.addTest(`test_Round_generating players of seats`, () => {
  const parentRoot = TestBlackJack.newStubRoot();

  const lounge = Sample.getTwoPlayersLounge();

  const [round, uiRound] = new PlayingArea(parentRoot).commenceRound(lounge);
});

newTestCollection.run();
