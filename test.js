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

newTestCollection.addTest(`test_Round_TwoPlayers`, () => {
  /**
   * should have 2 players and a dealer
   */
});

newTestCollection.run();
