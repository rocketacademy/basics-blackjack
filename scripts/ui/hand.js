class UiHand extends Ui_Component {
  /**
   *
   * @param {Hand} hand
   */
  constructor(hand) {
    super(document.createElement("div"));
    /** @private @const {Hand} */

    // Domain
    this._hand = hand;

    // Root Configuration
    this._id = this._hand.id();

    this._style();
    this._root.setAttribute("id", this._id);
    this._root.className += " blackjack-hand";

    // Children
    this._uiCount = new Ui_Component();
    this._uiCardsHolder = newUiCardsHolder(this._hand.getCards());
    this._uiBetAmount = new Ui_Text();

    // Hooks
    this._hand.setOnAddCard((card) => {
      console.log(`card transferred ${card.getString()}`);
      const uiCard = new UiCard(card);
      this._uiCardsHolder.addUiCard(uiCard);
      this._refreshUiCardsCount();
    });

    this._hand.setOnSetBet((betValue) => {
      this._uiBetAmount.setTextContent(`Bet Value [${betValue}]`);
    });

    this._hand.setOnActiveSignal((isActive, phase, player, round) => {
      if (isActive === true) {
        this._hand.renderActiveDisplay(isActive, phase, player, round);
      }
    });

    this._hand.setOnActiveSignal((phase) => {
      this.replaceChildrenUi(this._uiCount, this._uiCardsHolder);
    });

    // First Render
    this._refreshUiCardsCount();

    this.replaceChildrenUi(this._uiCount, this._uiCardsHolder);
  }

  renderActiveDisplay = (phase, player, round) => {
    switch (phase) {
      case RoundPhase.BET:
        const [_uiButtonBet__, _uiSlider__] = this._newBetControl(
          player,
          round,
          this._hand
        );
        this.replaceChildrenUi(
          this._uiCount,
          this._uiCardsHolder,
          _uiButtonBet__,
          _uiSlider__
        );
        break;
      case RoundPhase.IN_PLAY_PLAYERS:
        const children = [this._uiCount, this._uiCardsHolder];
        const _uiButtonStand__ = this._newStandControl(
          player,
          round,
          this._hand
        );
        children.push(_uiButtonStand__);
        this.replaceChildrenUi(...children);
        break;
    }
  };
  _style = () => {
    this._root.style.width = "100px";
    this._root.style.height = "100px";
    this._root.style.padding = "10px 10px 10px 10px";
    this._root.style.border = "1px solid black";
    this._root.style.marginLeft = "10px";
    this._root.style.marginTop = "10px";
    this._root.style.marginRight = "10px";
    this._root.style.flexDirection = "column";
    this._root.style.justifyContent = "space-around";
    this._root.style.alignItems = "center";
  };
  id = () => this._id;

  _refreshUiCardsCount = () => {
    setUiTextContent(this._uiCount, `[${this._hand.count()}]`);
  };

  /** Control Options */
  _newStandControl = (player, round, hand) => {
    const _uiButtonStand__ = new UiButtonStand();

    _uiButtonStand__.setOnMouseClick(() => {
      round.requestStand(hand);
    });
    return _uiButtonStand__;
  };

  _newBetControl = (player, round, hand) => {
    const credit = player.getPlayableCredit();

    const initBetValue = 0;
    const _uiButtonBet__ = new UiButtonBet();
    _uiButtonBet__.setOnMouseClick((betValue) => {
      round.requestBet(player, hand, betValue);
    });
    const _uiSlider__ = new UiSlider();
    _uiSlider__.setMax(credit);
    _uiSlider__.setValue(initBetValue);

    _uiSlider__.setOnRangeChange((e) => {
      const v = e.target.value;
      _uiSlider__.value = v;
      _uiButtonBet__.setBetValue(v);
    });
    return [_uiButtonBet__, _uiSlider__];
  };
}
class UiHandsHolder extends Ui_Aggregate {
  constructor() {
    super();

    this._uiHands = [];

    /** @private { Object.<string,UiHand>} */
    this._uiHandsRef = {};
  }
  addUiHand = (uiHand) => {
    this._uiHands.push(uiHand);
    this._uiHandsRef = { [uiHand.id()]: uiHand, ...this._uiHandsRef };
    this.appendChildUi(uiHand);
  };
  count = () => this._uiHands.length;
}
class UiSlider extends Ui_Component {
  constructor() {
    super(document.createElement("input"));
    this._style();
  }

  _style = () => {
    this._root.className += " black-jack-bet-slider";
    this._root.type = "range";
    this._root.step = 1;
    this._root.style.display = "block";
  };
  setMin = (num = 0) => {
    this._root.min = num;
  };
  setMax = (num) => {
    this._root.max = num;
  };
  setValue = (val) => {
    this._root.value = val;
  };
  setOnRangeChange = (fn) => {
    this._root.oninput = fn;
  };
}

const newUiHand = (hand) => {
  return new UiHand(hand);
};
