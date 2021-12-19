class UiDealer extends Ui_Actor {
  _style = () => {
    this._root.style.marginBottom = "25px";
    this._root.style.alignSelf = "center";
    this._root.style.borderRadius = "25px";
  };

  /**
   * @param {Dealer} dealer
   */
  constructor(dealer) {
    super(dealer);
    // Root Configuration
    this._root.className += " blackjack-dealer";
    this._style();

    // Render
    this.replaceChildrenUi(this._uiName, this._uiHandsHolder);
  }
}
