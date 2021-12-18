class UiHand extends Ui_Component {
  /**
   *
   * @param {Hand} hand
   */
  constructor(hand) {
    super(document.createElement("div"));
    /** @private @const {Hand} */
    this._hand = hand;

    this._uiCount = new Ui_Component();

    this._uiCardsHolder = newUiCardsHolder(this._hand.getCards());

    this._id = this._hand.id();
    this._root.setAttribute("id", this._id);
    this._root.setAttribute("class", "blackjack-hand");
    this._root.style.width = "100px";
    this._root.style.height = "200px";
    this._root.style.border = "1px solid black";
    this._hand.setOnAddCard((card) => {
      console.log(`card transferred ${card.getString()}`);
      const uiCard = new UiCard(card);
      this._uiCardsHolder.addUiCard(uiCard);
      this._refreshUiCardsCount();
    });

    this._uiBetAmount = new Ui_Text();
    this._refreshUiCardsCount();
  }
  id = () => this._id;

  _refreshUiCardsCount = () => {
    setUiTextContent(this._uiCount, `[${this._hand.count()}]`);
  };
  unfocusThisHand = (phase, upCardOnly) => {
    console.group(`Phase [${phase.desc()}] unfocus ui hand [${this.id()}]`);
    this._uiCardsHolder.unfocusCards(phase, upCardOnly);
    if (phase === RoundPhase.BET) {
      this.replaceChildrenUi(
        this._uiCount,
        this._uiCardsHolder,
        this._uiBetAmount
      );
    } else if (phase === RoundPhase.IN_PLAY_PLAYERS) {
      this.replaceChildrenUi(
        this._uiCount,
        this._uiCardsHolder,
        this._uiBetAmount
      );
    }
    console.groupEnd();
  };
  focusThisHand = (phase, player, round) => {
    if (!round) {
      throw `no round?`;
    }

    if (!player) {
      throw `no player?`;
    }
    console.group(
      `focusThisHand Phase [${phase.desc()}] focus ui hand [${this.id()}]`
    );

    switch (phase) {
      case RoundPhase.BET:
        this._hand.setOnSetBet((betValue) => {
          this._uiBetAmount.setTextContent(`Bet Value [${betValue}]`);
        });
        const [_uiButtonBet__, _uiSlider__] = newBetControl(
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

        const _uiButtonStand__ = newStandControl(player, round, this._hand);
        children.push(_uiButtonStand__);
        this.replaceChildrenUi(...children);
    }
    console.groupEnd();
  };
}
class UiHandsHolder extends Ui_Component {
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

  unfocusHands = (phase, upCardOnly) => {
    console.group(`UNFOCUSING HANDS upcard only ? ${upCardOnly}`);
    for (const [id, uiH] of Object.entries(this._uiHandsRef)) {
      uiH.unfocusThisHand(phase, upCardOnly);
    }
    console.groupEnd();
  };

  focusHandById = (id, phase, player, round) => {
    this._uiHandsRef[id].focusThisHand(phase, player, round);
  };
  unfocusHandById = (id, phase) => {
    this._uiHandsRef[id].unfocusThisHand(phase, true);
  };
  count = () => this._uiHands.length;
}
class UiSlider extends Ui_Component {
  constructor() {
    super(document.createElement("input"));
    this._root.className += " black-jack-bet-slider";
    this._root.type = "range";
    this._root.step = 1;
  }

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
const newBetControl = (player, round, hand) => {
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

const newStandControl = (player, round, hand) => {
  const _uiButtonStand__ = new UiButtonStand();

  _uiButtonStand__.setOnMouseClick(() => {
    round.requestStand(hand);
  });
  return _uiButtonStand__;
};
/**
 *
 * @param {Hands[]} hands
 * @returns {UiHandsHolder}
 */
const newUiHandsHolder = (hands) => {
  const uiHandsHolder = new UiHandsHolder();
  for (const h of hands) {
    const uiH = new UiHand(h);
    uiHandsHolder.addUiHand(uiH);
  }
  return uiHandsHolder;
};

const newUiHand = (hand) => {
  return new UiHand(hand);
};
