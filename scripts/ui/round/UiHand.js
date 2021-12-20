class UiHand extends Ui_Component {
  _style = () => {
    this._root.style.border = "1px black dotted";
    this._root.style.height = "auto";
    this._root.style.marginBottom = "10%";
    this._root.style.marginTop = "10%";
    this._root.style.width = "80%";
    this._root.style.flexDirection = "column";
    this._root.style.justifyContent = "space-around";
    this._root.style.alignItems = "center";
  };

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

    this._root.setAttribute("id", this._id);
    this._root.className += " blackjack-hand";

    // Children
    this._uiCount = new Ui_Component();
    this._uiCardsHolder = this._newUiCardHolder(this._hand.getCards());
    this._uiBetAmount = new Ui_Text();
    this._uiWager = null;

    // Hooks

    this._hand.setOnPlaceYourInitialBet(() => {
      console.group(`uiHand, show display on place initial bet`);

      this._uiWager = this._newUiWager(this._hand.getWager());
      this.replaceChildrenUi(this._uiWager);
      console.groupEnd();
    });
    // Render
    this._style();
    this.replaceChildrenUi(this._uiCardsHolder);
  }

  id = () => this._id;

  /** Control Options */
  _newStandControl = (player, round, hand) => {
    const _uiButtonStand__ = new UiButtonStand();

    _uiButtonStand__.setOnMouseClick(() => {
      round.requestStand(hand);
    });
    return _uiButtonStand__;
  };
}

const newUiHand = (hand) => new UiHand(hand);
