const onClickChangePlayerHandler = () => {
  const thisPlayerId = this._round.getCurrentPlayer()?.id();
  this._round.changePlayer();
  const thatPlayerId = this._round.getCurrentPlayer()?.id();
  this.changeFocusUiPlayerById(thisPlayerId, thatPlayerId);
};
this._uiButtonDummy = new UiButton();
this._uiButtonDummy.setOnClick(onClickChangePlayerHandler);
