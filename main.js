const main = () => {
  if (ROOT_BLACKJACK_ELEMENT) {
  }
};

const test_Lounge_TwoPlayerLounge = () => {
  const lounge = Sample.getSampleTwoPlayersLounge();
  const expectedPlayerCount = 2;
  const actualPlayerCount = lounge.playerCount();
  const expectedDealerCount = 1;
  const actualDealerCount = lounge.dealerCount();
  LOG_ASSERT(
    ...[
      expectedPlayerCount === actualPlayerCount,
      ``,
      `Expected: ${expectedPlayerCount} Got: ${actualPlayerCount}`,
    ]
  );
  LOG_ASSERT(
    ...[
      expectedDealerCount === actualDealerCount,
      ``,
      `Expected: ${expectedDealerCount} Got: ${actualDealerCount}`,
    ]
  );
};
test_Lounge_TwoPlayerLounge();

const test_Round_TwoPlayers = () => {
  /**
   * should have 2 players and a dealer
   */

  const lounge = Sample.getSampleTwoPlayersLounge();
};

//TODO
const test_Ui_Round_Start_TowPlayerLounge = () => {
  /**
   *
   */

  const lounge = Sample.getSampleTwoPlayersLounge();
};
