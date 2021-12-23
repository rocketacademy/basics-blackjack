(() => {
  /**
   * test-dealerblackjack
   * Test when dealer will be dealt blackjack
   */

  //TODO
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

  newTestCollection.run();

  console.warn(`-----------test-playerblackjack-dealernoblackjs-----------`);
  const lounge = Sample.getStubFivePlayersDealerBlackjack();
  const [round, _] = new PlayingArea().newRoundOfPlay(lounge);
  round.getDealer().commence();
})();
