class UiButtonBet extends Ui_Button {
  constructor() {
    super();
    // RootConfiguration
    this._root.className += "blackjack-button-bet";
    this._root.style.fontSize = "11px";

    // Properties

    this._betValue = null;

    // Children
    this.uIDesc = new Ui_Text();
    this.uIDesc.setTextContent("BET");
    this.uIBetValue = new Ui_Text();

    // First Render
    this.replaceChildrenUi(this.uIDesc, this.uIBetValue);
  }

  setBetValue = (v) => {
    this._betValue = v;
    this.uIBetValue.setTextContent(`: ${this._betValue}`);
  };

  getButtonValue = () => this._betValue;

  setOnMouseClick = (cb) => (this._root.onclick = () => cb(this._betValue));
}

class UiButtonchangeTurn extends Ui_Button {
  constructor(args) {
    super();
    this._root.textContent = "Change Player";
  }
}
class UiButtonHit extends Ui_Button {
  constructor() {
    super();
    this._root.textContent = "Hit";
  }
}

class UiButtonStand extends Ui_Button {
  constructor() {
    super();
    this._root.textContent = "STAND";
  }

  setOnMouseClick = (cb) => (this._root.onclick = () => cb());
}
