class UiDealer extends Ui_Actor {
  _style = () => {
    this._root.style.alignSelf = "center";
    this._root.style.flexDirection = "column";
    this._root.style.border = "1px white dotted";
    this._root.style.borderRadius = "25px";
    this._root.style.height = "200px";

    this._root.style.minHeight = "fit-content";
    this._root.style.width = "fit-content";
    this._root.style.minWidth = "200px";
    this._root.style.padding = "10px 10px 15px 10px";

    this._root.style.alignItems = "center";

    this._uiName.setStyle("color", "#008080");
    this._uiName.setStyle("fontWeight", "bold");
    this._uiName.setStyle("fontStyle", "italic");
  };

  _newUiMsgDisplay = () => {
    const t = new Ui_Text();
    t._root.style.height = "30px";
    t._root.style.fontWeight = "bold";
    t._root.style.width = "fit-content";
    t._root.className += " blackjack-display-dealer-message";

    return t;
  };
  _newUiHandHolder = () => {
    const uiHH = new UiHandHolder();
    const r = uiHH.getRoot();

    return uiHH;
  };

  _newUiHand = (h) => newUiHand(h);

  /**
   * @param {Dealer} dealer
   */
  constructor(dealer) {
    super(dealer);

    this._dealer = dealer;
    // Root Configuration
    this._root.className += " blackjack-dealer";

    this._uiMsgDisplay = this._newUiMsgDisplay();

    this._uiHandHolder = this._newUiHandHolder();

    this._dealer.setOnShout((desc) => {
      console.group(`on Shout Callback`);
      this._uiMsgDisplay.setTextContent(desc);
      console.groupEnd();
    });
    this._dealer.setOwnNewHand(() => {
      const uiH = this._newUiHand(this._dealer.getHand());
      this._uiHandHolder.addUiHand(uiH);
      this.getRoot().style.height = "200px";
      this.replaceChildrenUi(this._uiName, this._uiHandHolder);
    });

    this._dealer.addOnEndView(() => {
      console.group(`ui dealer  dealer restart buttons callback`);

      console.groupEnd();
    });

    // Render
    this._style();
    this.replaceChildrenUi(this._uiName, this._uiMsgDisplay);
  }

  addOnEndView = (cb) => {
    this._dealer.addOnEndView(cb);
  };
  getUiMsgDisplay = () => this._uiMsgDisplay;
}
