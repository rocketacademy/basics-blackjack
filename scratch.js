const onClickchangeTurnHandler = () => {
  const thisPlayerId = this._round.getCurrentPlayer()?.id();
  this._round.changeTurn();
  const thatPlayerId = this._round.getCurrentPlayer()?.id();
  this.changeFocusUiPlayerById(thisPlayerId, thatPlayerId);
};
this._uiButtonDummy = new UiButton();
this._uiButtonDummy.setOnClick(onClickchangeTurnHandler);

TEST;

// const test_HeadsUp_UiRound_ChangeRoundPhase_Start_Render = () => {
//   console.group();
//   console.log("testHeadsUpRoundActorsNameUi");
//   const table = newTableHeadsUp();
//   const round = new Round(table);

//   const uIRound = newUiRound(round);
//   uIRound.onClickSitHandler();
//   const uiPlayers = uIRound.getUiPlayers();

//   const uiDealer = uIRound.getUiDealer();

//   const uiHeadsUpPlayer = uiPlayers[0];

//   const isUiForPlayerNameExist = [
//     uiHeadsUpPlayer.getUiName().getRoot().nodeName.toLowerCase() === "div",
//     undefined,
//     "isUiForPlayerName NOT Exist",
//   ];

//   const isUiForDealerNameExist = [
//     uiDealer.getUiName().getRoot().nodeName.toLowerCase() === "div",
//     undefined,
//     "isUiForDealerName NOT Exist",
//   ];

//   const expectedDefaultDealerName = `D`;
//   const actualDealerName = uiDealer.getUiName().getRoot().textContent;
//   const isUiForDealerNameDefault = [
//     actualDealerName === expectedDefaultDealerName,
//     undefined,
//     `isUiForDealerNameDefault name got ${actualDealerName} want ${expectedDefaultDealerName}`,
//   ];

//   LOG_ASSERT(...isUiForPlayerNameExist);
//   LOG_ASSERT(...isUiForDealerNameExist);
//   LOG_ASSERT(...isUiForDealerNameDefault);

//   console.groupEnd();
// };

// Ui ROUND
// test_HeadsUp_UiRound_ChangeRoundPhase_Start_Render();

renderModeAudience = (phase) => {
  this.getUiHands().forEach((uiHand) => uiHand.render(phase));
  if (phase === RoundPhase.BET) {
    this.replaceChildrenUi(this.getUiName(), ...this.getUiHands());
  } else {
    this.replaceChildrenUi(this.getUiName(), ...this.getUiHands());
  }
};

/**
 *
 * @param {RoundPhase} phase
 * @returns
 */
renderModeActive = (phase) => {
  console.group(
    `Render:Active Phase:${phase.desc()} Player:${this._actor.getName()}`
  );
  switch (phase) {
    case RoundPhase.IN_PLAY_PLAYERS:
      this.replaceChildrenUi(this.getUiName(), ...this.getUiHands());
      break;
    case RoundPhase.BET:
      this.replaceChildrenUi(this.getUiName(), ...this.getUiHands());
      break;
    default:
      this.replaceChildrenUi(this.getUiName());
      break;
  }
  console.groupEnd();
};
