class UiHand extends Ui_Component {
  /**
   *
   * @param {Card[]} cards
   */
  _newUiCardsHolder = (cards) => {
    const uiCardHolder = new UiCardsHolder();
    for (const c of cards) {
      const uiC = new UiCard(c);
      uiCardHolder.addUiCard(uiC);
    }
    return uiCardHolder;
  };

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
    this._uiCardsHolder = this._newUiCardsHolder(this._hand.getCards());
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
      console.group(
        `Ui Hook[onActiveSignal] active[${isActive}] phase[${phase}] player[${player}] round[${round}]`
      );
      if (isActive === true) {
        this._renderActiveDisplay(phase, player, round);
      } else {
        this._renderInactiveDisplay(phase, player, round);
      }
      console.groupEnd();
    });

    // First Render
    this._refreshUiCardsCount();
    this.replaceChildrenUi(this._uiCount, this._uiCardsHolder);
  }

  _renderInactiveDisplay = (phase, player, round) => {
    console.group(
      `Ui Hook[onInActiveHand] phase[${phase}] player[${player.getName()}]`
    );

    switch (phase) {
      case RoundPhase.BET:
        this.replaceChildrenUi(this._uiCount, this._uiCardsHolder);
        break;
      case RoundPhase.IN_PLAY_PLAYERS:
        this.replaceChildrenUi(this._uiCount, this._uiCardsHolder);
        break;
    }
    console.groupEnd();
  };
  _renderActiveDisplay = (phase, player, round) => {
    console.group(
      `Ui Hook[onActiveHand] phase[${phase}] player[${player.getName()}]`
    );

    switch (phase) {
      case RoundPhase.BET:
        const [_uIContainerBet__, _uiSlider__] = this._newBetControl(
          player,
          round,
          this._hand
        );
        this.replaceChildrenUi(
          this._uiCount,
          this._uiCardsHolder,
          _uIContainerBet__,
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
    console.groupEnd();
  };
  _style = () => {
    this._root.style.width = "fit-content";
    this._root.style.height = "fit-content";
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
    const _uIContainerBet__ = new UiContainerMainBet();
    _uIContainerBet__.setButtonOnMouseClick((betValue) => {
      round.requestMainBet(player, hand, betValue);
    });
    const _uiSlider__ = new UiSlider();
    _uiSlider__.setMax(credit);
    _uiSlider__.setValue(initBetValue);

    _uiSlider__.setOnRangeChange((e) => {
      const v = e.target.value;
      _uiSlider__.value = v;
      _uIContainerBet__.setButtonValue(v);
    });
    return [_uIContainerBet__, _uiSlider__];
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
    this._root.style.display = "flex";
    this._root.style.width = "80px";
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
