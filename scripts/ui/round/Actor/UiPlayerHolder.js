class UiPlayerHolder extends Ui_Aggregate {
  constructor() {
    super();
    // Root Configuration
    this._style();
    this._root.className += ` blackjack-holder-player`;
    this._root.style.position = "absolute";
    this._root.style.flexDirection = "column";
    this._root.style.borderStyle = "dotted";

    this._root.style.paddingRight = "12px";
    this._root.style.borderRadius = "4px";

    this._root.style.paddingBottom = "12px";

    this._root.style.borderTopWidth = "0px";
    this._root.style.borderLeftWidth = "0px";
    this._root.style.borderBottomWidth = "1px";
    this._root.style.borderBottomWidth = "1px";
    this._root.style.borderRightWidth = "1px";
    this._root.style.borderColor = "black";
    // Children
    /** @private @const {UiPlayer[]}} */
    this._uIPlayers = [];
    /** @private @const {Object.<string,UiPlayer>}} */
    this._uiPlayersRef = {};
  }

  _style = () => {
    this._root.style.flexDirection = "row";
    this._root.style.justifyContent = "space-around";
  };

  addUiPlayer = (uiPlayer) => {
    this._uIPlayers.push(uiPlayer);
    this._uiPlayersRef = { [uiPlayer.id()]: uiPlayer, ...this._uiPlayersRef };
    this.appendChildUi(uiPlayer);
  };
}
