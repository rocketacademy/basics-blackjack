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

  const [round, uiRound] = new PlayingArea(parentRoot).newRoundOfPlay(lounge);

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

  const [round, uiRound] = new PlayingArea(parentRoot).newRoundOfPlay(lounge);

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

newTestCollection.addTest(`test_Round_TwoPlayer_Commence`, () => {
  const parentRoot = TestBlackJack.newStubRoot();

  const lounge = Sample.getTwoPlayersLounge();

  const [round, uiRound] = new PlayingArea(parentRoot).newRoundOfPlay(lounge);

  console.group(`Commence - Dealer Shout`);

  round.getDealer().commence();
  const e__roundphase = RoundPhase.COMMENCE;
  const a__roundphase = round.getPhase();
  LOG_ASSERT(
    a__roundphase === e__roundphase,
    ``,
    `Round should be aware when dealer commence the round.`
  );

  const e__dealerMsgDisplay = `Place your bets, please`;
  const a__dealerMsgDisplay = uiRound
    .getUiDealer()
    .getUiMsgDisplay()
    .getTextContent();

  LOG_ASSERT(
    e__dealerMsgDisplay === a__dealerMsgDisplay,
    ``,
    `Non-compliance CRA-V6-3.1 Expects ${e__dealerMsgDisplay} Got: ${a__dealerMsgDisplay}`
  );

  const e__roundPhaseDisplay = `COMMENCE`;
  const a__roundPhaseDisplay = uiRound
    .getUiRoundPhaseDisplay()
    .getTextContent();
  LOG_ASSERT(
    e__roundPhaseDisplay === a__roundPhaseDisplay,
    ``,
    `COMMENCE display round phase error.`
  );

  const firstSeatIndex = 0;
  const e__firstSeatHtmlChildrenCount = 2; // count : chair display and hands holder

  const a__firstUiSeat = uiRound.getUiSeat(firstSeatIndex);
  const a__firstSeatHtmlChildrenCount =
    a__firstUiSeat.getRoot().childNodes.length;
  LOG_ASSERT(
    a__firstSeatHtmlChildrenCount === e__firstSeatHtmlChildrenCount,
    ``,
    `firstSeatHtmlChildrenCount e__ ${e__firstSeatHtmlChildrenCount} a__ ${a__firstSeatHtmlChildrenCount}`
  );

  const firstHandIndex = 0;
  const a__firstHandUi = a__firstUiSeat.getUiHand(firstHandIndex);

  const e__uiHandCount = 1;
  const a__uiHandCount = a__firstUiSeat.uiHandCount();
  LOG_ASSERT(
    e__uiHandCount === a__uiHandCount,
    ``,
    `e__uiHandCount ${e__uiHandCount} a__: ${a__uiHandCount}`
  );

  const e__firstHandHtemlChildrenCount = 1; // count : wager[area] only. no display for cards
  const a__firstHandHtemlChildrenCount =
    a__firstHandUi.getRoot().childNodes.length;

  LOG_ASSERT(
    e__firstHandHtemlChildrenCount === a__firstHandHtemlChildrenCount,
    ``,
    `e__firstHandHtemlChildrenCount ${e__firstHandHtemlChildrenCount} a__: ${a__firstHandHtemlChildrenCount}`
  );
  console.groupEnd();
});

newTestCollection.run();

testMain = (() => {
  const lounge = Sample.getTwoPlayersLounge();
  const [round, _] = new PlayingArea().newRoundOfPlay(lounge);
  round.getDealer().commence();
})();
