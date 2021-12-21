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
class UiContainerMainBet extends Ui_Component {
  constructor() {
    super();

    this._root.style.position = "relative";
    this._root.style.justifyItems = "center";
    this._root.style.alignItems = "center";
    this._uIImg = new UiImgChip("static/img/buttons/chip.png");
    this._uiButton = new UiButtonMainBet();

    this.replaceChildrenUi(this._uIImg, this._uiButton);
  }

  getButtonValue = () => this._uiButton.getButtonValue();
  setButtonValue = (v) => this._uiButton.setBetValue(v);
  setButtonOnMouseClick = (cb) => this._uiButton.setOnMouseClick(cb);
}

class UiWager extends Ui_Component {
  _style = () => {
    this._root.style.height = "90%";
    this._root.style.border = "1px white dotted";
    this._root.style.width = "90%";
    this._root.style.flexDirection = "column";
    this._root.style.justifyContent = "center";
    this._root.style.alignItems = "center";
  };

  /**
   *
   * @param {Wager} wager
   */
  constructor(wager) {
    super();
    this._wager = wager;
    this._root.className += " blackjack-wager";

    this._uIContainerBet__ = new UiContainerMainBet();

    // Hooks
    this._wager.setOnWhatIsYourInitialBet((wager, dealer, playableCredit) => {
      console.group(`ui wager notified setOnWhatIsYourInitialBet `);
      console.groupEnd();

      const initMainBetValue = 0;
      this._uIContainerBet__.setButtonOnMouseClick((betValue) => {
        dealer.placeInitialBet(wager, betValue);
      });

      const _uiSlider__ = new UiSlider();
      _uiSlider__.getRoot().className += " blackjack-wager-slider";
      _uiSlider__.setMax(playableCredit);
      _uiSlider__.setValue(initMainBetValue);

      _uiSlider__.setOnRangeChange((e) => {
        const v = e.target.value;
        _uiSlider__.value = v;
        this._uIContainerBet__.setButtonValue(v);
      });

      this.replaceChildrenUi(this._uIContainerBet__, _uiSlider__);
    });

    this._wager.setOnBetChange((bet) => {
      this._uIContainerBet__.setButtonValue(bet);
    });

    this._wager.setOnInitialBetStaked((bet) => {
      console.group(`ui wager notified InitialBetStaked `);
      this.replaceChildrenUi(this._uIContainerBet__);
      this._uIContainerBet__.setButtonOnMouseClick(() => {});
      console.groupEnd();
    });

    this._style();
  }

  _newInitialBetControl = (wager, dealer, playableCredit) => {};
}
