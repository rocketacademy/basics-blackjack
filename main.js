const test_Main_HeadsUp = () => {
  const table = newTableTwoPlayers();
  const round = new Round(table);
  const uiRound = newUiRound(round);
  const player1 = round.getPlayers()[0];
  const player2 = round.getPlayers()[1];

  let expectedPhase = RoundPhase._NULL;
  let actualPhase = round.getPhase();

  LOG_ASSERT(
    expectedPhase === actualPhase,
    `Phase 00001 DONE`,
    `? Phase 00001`
  );
  round.requestInitSitPhase(); // [_NULL] --> SIT --> [BET]

  expectedPhase = RoundPhase.BET;
  actualPhase = round.getPhase();
  LOG_ASSERT(
    expectedPhase === actualPhase,
    `Phase 00002 DONE`,
    `? Phase 00002 ${expectedPhase.desc()} ${actualPhase.desc()}`
  );
  const handPlayer1_1 = player1.getHands()[0];
  LOG_ASSERT(!!handPlayer1_1, undefined, `handPlayer1_1 missing`);
  round.requestBet(player1, handPlayer1_1, 1);
  const handPlayer2_1 = player2.getHands()[0];
  round.requestBet(player2, handPlayer2_1, 1); // End of bets, // [BET] --> DEAL --> [IN_PLAY_PLAYER]

  expectedPhase = RoundPhase.IN_PLAY_PLAYERS;
  actualPhase = round.getPhase();
  LOG_ASSERT(
    expectedPhase === actualPhase,
    `Phase 00003 DONE`,
    `? Phase 00003 ${expectedPhase.desc()} ${actualPhase.desc()}`
  );

  round.requestStand(handPlayer1_1);
  round.requestStand(handPlayer2_1); // End of players, // [IN_PLAY_PLAYER] --> IN_PLAY_DEALER --> [END]

  expectedPhase = RoundPhase.END;
  actualPhase = round.getPhase();
  LOG_ASSERT(
    expectedPhase === actualPhase,
    `Phase 00004 END DONE`,
    `? Phase 00004 Expects ${expectedPhase.desc()} Got ${actualPhase.desc()}`
  );
};

console.log(`---MAIN TEST---`);
test_Main_HeadsUp();
console.log(`---test_Main_Ui_Til_BET TEST---`);

const test_Main_Ui_Til_BET = () => {
  console.group("test_Main_Ui_Til_BET");
  const table = newTableTwoPlayers();
  const round = new Round(table);
  const uiRound = newUiRound(round);
  const player1 = round.getPlayers()[0];
  const player2 = round.getPlayers()[1];

  let expectedPhase = RoundPhase._NULL;
  let actualPhase = round.getPhase();

  LOG_ASSERT(
    expectedPhase === actualPhase,
    `Phase 00001 DONE`,
    `? Phase 00001`
  );
  round.requestInitSitPhase(); // [_NULL] --> SIT --> [BET]

  expectedPhase = RoundPhase.BET;
  actualPhase = round.getPhase();
  LOG_ASSERT(
    expectedPhase === actualPhase,
    `Phase 00002 DONE`,
    `? Phase 00002 ${expectedPhase.desc()} ${actualPhase.desc()}`
  );

  const expectPhaseDisplayValue = `ROUND STATUS: BETTING`;
  const gotPhaseDisplayValue = uiRound.getUiPhaseDisplay().getTextContent();
  LOG_ASSERT(
    expectPhaseDisplayValue === gotPhaseDisplayValue,
    ``,
    `expected ${expectPhaseDisplayValue} got ${gotPhaseDisplayValue}`
  );

  const gotDealerUiHandsLength = uiRound.getUiDealer().getUiHandsCount();
  const gotDealerHandsLength = round.getDealer().getHands().length;
  LOG_ASSERT(1 === gotDealerHandsLength, ``, `Dealer should have one hand`);
  LOG_ASSERT(
    gotDealerUiHandsLength === gotDealerHandsLength,
    ``,
    `Ui Dealer does not reflect actual no. of hands`
  );
  console.groupEnd();
};

test_Main_Ui_Til_BET();
