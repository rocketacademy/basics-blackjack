const newTestCollection = new TestBlackJack();

newTestCollection.addTest(`test_Lounge_TwoPlayersLounge`, () => {
  const lounge = Sample.getSampleTwoPlayersLounge();

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

//TODO

newTestCollection.addTest(`test_Round_Init`, () => {
  const round = new Round(new Lounge());

  const expectedPhase = RoundPhase._NULL;
  LOG_ASSERT(
    expectedPhase === round.getPhase(),
    ``,
    `Expected Phase ${expectedPhase}`
  );

  const expectedRootSeat = null;
  LOG_ASSERT(
    expectedRootSeat === round.getCurrentSeat(),
    ``,
    `Expected Root Seat ${expectedRootSeat}`
  );
});

//TODO

newTestCollection.addTest(`test_Round_TwoPlayers_Init`, () => {
  const lounge = Sample.getSampleTwoPlayersLounge();
  const round = new Round(lounge);

  const expectedPhase = RoundPhase._NULL;
  LOG_ASSERT(
    expectedPhase === round.getPhase(),
    ``,
    `Expected Phase ${expectedPhase}`
  );

  const expectedRootSeat = null;
  LOG_ASSERT(
    expectedRootSeat === round.getCurrentSeat(),
    ``,
    `Expected Root Seat ${expectedRootSeat}`
  );

  const expectedNextPlayerName = `Player 1`;
  const actualNextPlayerName = round.peekNextSeat().getChair().getName();
  LOG_ASSERT(
    expectedNextPlayerName === actualNextPlayerName,
    ``,
    `First Player Name expected ${expectedNextPlayerName} got ${actualNextPlayerName}`
  );
});

const RENDER_ROUND = (lounge) => {
  const round = new Round(lounge);
  const uiRound = new UiRound(round);
  uiRound.render();
  return [round, uiRound];
};

/**
 * Assumes control of the root element assigned to the application
 */

const COMMENCE_ROUND = (lounge) => {
  const round = new Round(lounge);
  const uiRound = new UiRound(round);
  uiRound
    .setOnFinish((lounge, isContinue) => {
      if (isContinue === true) {
        COMMENCE_ROUND(lounge);
      } else if (isContinue === false) {
        COMMENCE_LOUNGE(lounge);
      }
    })
    .render();
  return [round, uiRound];
};

const COMMENCE_LOUNGE = (lounge) => {
  const uiLounge = new UiLounge(lounge).render();
  return [lounge, uiLounge];
};

newTestCollection.addTest(`test_ROUND_Render`, () => {
  const lounge = Sample.getSampleTwoPlayersLounge();
  const [_, uiRound] = RENDER_ROUND(lounge);

  const expectedChildrenOf_ROOT_BLACKJACK_ELEMENT = uiRound.getRoot();
  const actualChildrenOf_ROOT_BLACKJACK_ELEMENT =
    ROOT_BLACKJACK_ELEMENT.children[0];
  LOG_ASSERT(
    expectedChildrenOf_ROOT_BLACKJACK_ELEMENT ===
      actualChildrenOf_ROOT_BLACKJACK_ELEMENT,
    ``,
    `FAIL! ui not attached`
  );
  LOG_ASSERT(
    1 === ROOT_BLACKJACK_ELEMENT.children.length,
    ``,
    `Should have one and only children of ROOT_BLACKJACK_ELEMENT`
  );
});

newTestCollection.addTest(`test_PlayingArea_TwoPlayers`, () => {
  const lounge = Sample.getSampleTwoPlayersLounge();
  const [round, uiRound] = COMMENCE_ROUND(lounge);

  const expectedChildrenOf_ROOT_BLACKJACK_ELEMENT_beforeRoundFinish =
    uiRound.getRoot();
  const actualChildrenOf_ROOT_BLACKJACK_ELEMENT_beforeRoundFinish =
    ROOT_BLACKJACK_ELEMENT.children[0];
  LOG_ASSERT(
    expectedChildrenOf_ROOT_BLACKJACK_ELEMENT_beforeRoundFinish ===
      actualChildrenOf_ROOT_BLACKJACK_ELEMENT_beforeRoundFinish,
    ``,
    `FAIL! ui not attached`
  );
  LOG_ASSERT(
    1 === ROOT_BLACKJACK_ELEMENT.children.length,
    ``,
    `Should have one and only children of ROOT_BLACKJACK_ELEMENT`
  );

  round.finish(true);

  const actualChildrenOf_ROOT_BLACKJACK_ELEMENT_afterRoundFinish =
    ROOT_BLACKJACK_ELEMENT.children[0];
  LOG_ASSERT(
    expectedChildrenOf_ROOT_BLACKJACK_ELEMENT_beforeRoundFinish !==
      actualChildrenOf_ROOT_BLACKJACK_ELEMENT_afterRoundFinish,
    ``,
    `FAIL! round ui attached after finish`
  );
  LOG_ASSERT(
    1 === ROOT_BLACKJACK_ELEMENT.children.length,
    ``,
    `Should have one and only children of ROOT_BLACKJACK_ELEMENT`
  );
});

newTestCollection.run();
