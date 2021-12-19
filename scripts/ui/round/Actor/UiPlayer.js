class UiPlayer extends Ui_Actor {
  /**
   * @param {Player} player
   */
  constructor(player) {
    super(player);

    // Root Configuration
    this._root.className += " blackjack-player";
    this._root.style.border = "1px solid blue";
    this._root.style.borderRadius = "7px";

    this.replaceChildrenUi(this._uiName, this._uiHandsHolder);
  }
}
