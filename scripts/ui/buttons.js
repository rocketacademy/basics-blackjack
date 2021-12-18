class UiButtonEndGame extends Ui_Button {
  constructor() {
    super();

    this._root.style.width = "44px";
    this._root.style.height = "44px";
    this._root.textContent = "END";
    this._root.className += " blackjack-button-end-game";
  }
  setOnMouseClick = (cb) => (this._root.onclick = () => cb());
}

class UiImgChip extends Ui_Img {
  constructor(url) {
    super();
    this._root.src = url;
    this._root.alt = url;
    this._root.style.width = "auto";
    this._root.style.height = "auto";
    this._root.style.maxWidth = "44px";
    this._root.style.maxHeight = "44px";
    this._root.className += ` blackjack-img-bet-chip`;
  }
}

class UiContainerMainBet extends Ui_Component {
  constructor() {
    super();

    this._root.style.position = "relative";
    this._root.style.justifyItems = "center";
    this._root.style.alignItems = "center";

    this._uIImg = new UiImgChip("img/buttons/chip.png");
    this._uiButton = new UiButtonMainBet();

    this.replaceChildrenUi(this._uIImg, this._uiButton);
  }

  getButtonValue = () => this._uiButton.getButtonValue();
  setButtonValue = (v) => this._uiButton.setBetValue(v);
  setButtonOnMouseClick = (cb) => this._uiButton.setOnMouseClick(cb);
}

class UiButtonMainBet extends Ui_Button {
  constructor() {
    super();
    // Root Configuration
    this._root.className += "blackjack-button-bet";
    this._root.style.fontSize = "11px";
    this._root.style.position = "absolute";
    this._root.style.color = "pink";
    this._root.style.top = "50%";
    this._root.style.left = "50%";
    this._root.style.backgroundColor = "transparent";
    this._root.style.backgroundRepeat = "no-repeat";
    this._root.style.border = "none";
    this._root.style.outline = "none";
    this._root.style.transform = "translate(-50%,-50%)";

    // Properties

    this._betValue = null;

    // Children
    this._uITexDesc = new Ui_Text();
    this._uITexDesc.setTextContent("BET");
    this._uITextBetValue = new Ui_Text();

    // First Render
    this.replaceChildrenUi(this._uITextBetValue);
  }

  setBetValue = (v) => {
    this._betValue = v;
    this._uITextBetValue.setTextContent(`${this._betValue}`);
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
