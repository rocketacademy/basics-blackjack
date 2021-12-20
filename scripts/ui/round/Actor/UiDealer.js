class UiDealer extends Ui_Actor {
  _style = () => {
    this._root.style.marginBottom = "25px";
    this._root.style.alignSelf = "center";
    this._root.style.borderRadius = "25px";
  };

  _newUiText = () => {
    const t = new Ui_Text();
    t._root.style.height = "12px";
    t._root.style.width = "fit-content";

    return t;
  };

  /**
   * @param {Dealer} dealer
   */
  constructor(dealer) {
    super(dealer);

    this._dealer = dealer;
    // Root Configuration
    this._root.className += " blackjack-dealer";

    this._uiMsgDisplay = this._newUiText();

    //
    this._dealer.setOnShout((desc) => {
      console.group(`on Shout Callback`);
      this._uiMsgDisplay.setTextContent(desc);
      console.groupEnd();
    });
    // Render
    this._style();
    this.replaceChildrenUi(this._uiName, this._uiMsgDisplay);
  }

  getUiMsgDisplay = () => this._uiMsgDisplay;
}
