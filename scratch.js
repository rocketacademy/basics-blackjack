const onClickchangeTurnHandler = () => {
  const thisPlayerId = this._round.getCurrentPlayer()?.id();
  this._round.changeTurn();
  const thatPlayerId = this._round.getCurrentPlayer()?.id();
  this.changeFocusUiPlayerById(thisPlayerId, thatPlayerId);
};
this._uiButtonDummy = new UiButton();
this._uiButtonDummy.setOnClick(onClickchangeTurnHandler);
