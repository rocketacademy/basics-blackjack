class UiWager extends Ui_Component {
  constructor(wager) {
    super();
    this._wager = wager;
    this._root.style.height = "10px";
    this._root.style.height = "20px";
  }
}

class UiHand extends Ui_Component {
  /**
   *
   * @param {Card[]} cards
   */
  _newUiCardHolder = (cards) => {
    const uiCardHolder = new UiCardHolder();
    for (const c of cards) {
      const uiC = new UiCard(c);
      uiCardHolder.addUiCard(uiC);
    }
    return uiCardHolder;
  };

  /**
   *
   * @param {Wager} wager
   */
  _newUiWager = (wager) => {
    return new UiWager(wager);
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
    this._uiCardsHolder = this._newUiCardHolder(this._hand.getCards());
    this._uiBetAmount = new Ui_Text();
    this._uiWager = this._newUiWager(this._hand.getWager());

    // Hooks
    this._hand.setOnAddCard((card) => {
      console.log(`card transferred ${card.getString()}`);
      const uiCard = new UiCard(card);
      this._uiCardsHolder.addUiCard(uiCard);
      this._refreshUiCardsCount();
    });
    this.replaceChildrenUi(this._uiCardsHolder, this._uiWager);
  }

  _renderActiveDisplay = (phase, player, round) => {
    console.group(
      `Ui Hook[onActiveHand] phase[${phase}] player[${player.getName()}]`
    );

    switch (phase) {
      case RoundPhase.INITIAL_BET:
        const [_uIContainerBet__, _uiSlider__] = this._newMainBetControl(
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
    SET_UI_TEXT_CONTENT(this._uiCount, `[${this._hand.count()}]`);
  };

  /** Control Options */
  _newStandControl = (player, round, hand) => {
    const _uiButtonStand__ = new UiButtonStand();

    _uiButtonStand__.setOnMouseClick(() => {
      round.requestStand(hand);
    });
    return _uiButtonStand__;
  };

  _newMainBetControl = (player, round, hand) => {
    const credit = player.getPlayableCredit();

    const initMainBetValue = 0;
    const _uIContainerBet__ = new UiContainerMainBet();
    _uIContainerBet__.setButtonOnMouseClick((betValue) => {
      round.requestMainBet(player, hand, betValue);
    });
    const _uiSlider__ = new UiSlider();
    _uiSlider__.setMax(credit);
    _uiSlider__.setValue(initMainBetValue);

    _uiSlider__.setOnRangeChange((e) => {
      const v = e.target.value;
      _uiSlider__.value = v;
      _uIContainerBet__.setButtonValue(v);
    });
    return [_uIContainerBet__, _uiSlider__];
  };
}

const newUiHand = (hand) => new UiHand(hand);

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

  get = (index) => this._uiHands[index];
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
