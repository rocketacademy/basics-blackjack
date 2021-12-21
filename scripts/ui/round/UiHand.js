class UiHand extends Ui_Component {
  _style = () => {
    this._root.style.border = "1px white dotted";
    this._root.style.height = "auto";
    this._root.style.marginBottom = "10%";
    this._root.style.marginTop = "10%";
    this._root.style.width = "90%";
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
      const uiC = this._newUiCard(c);
      uiCardHolder.addUiCard(uiC);
    }
    return uiCardHolder;
  };
  _newUiCard = (c) => new UiCard(c);

  /**
   *
   * @param {Wager} wager
   */
  _newUiWager = (wager) => {
    if (!wager) {
      throw new Error(`uiHand._newUiWager null arg`);
    }
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
    this._uiCardHolder = this._newUiCardHolder(this._hand.getCards());
    this._uiBetAmount = new Ui_Text();
    const placeholder = new Ui_Text();
    this._uiWager = placeholder;

    // Hooks
    console.log(`Hooking setWhenGoingToAskForInitialBet`);
    this._hand.setWhenGoingToAskForInitialBet(() => {
      console.group(`uiHand, invoking setWhenGoingToAskForInitialBet`);
      console.log(this._hand.getWager());
      this._uiWager = this._newUiWager(this._hand.getWager());
      this.replaceChildrenUi(this._uiWager);
      console.groupEnd();
    });

    this._hand.setOnWhatDoYouWantToDoOnSubsequentDeal((dealer, options) => {
      console.group(`uiHand, invoke setOnWhatDoYouWantToDoOnSubsequentDeal`);

      const optionsUiButtons = [];
      let buttonStand = null;
      if (options.canStand) {
        buttonStand = new UiButtonStand();
        buttonStand.setOnMouseClick(() => {
          dealer.requestStand(this._hand);
          this.replaceChildrenUi(this._uiCardHolder, this._uiWager);
        });

        optionsUiButtons.push(buttonStand);
      }

      this.replaceChildrenUi(
        this._uiCardHolder,
        this._uiWager,
        ...optionsUiButtons
      );
      console.groupEnd();
    });

    this._hand.setOnAddCard((card) => {
      console.group(`uiHand, show display on add card`);
      const uiC = this._newUiCard(card);
      this._uiCardHolder.addUiCard(uiC);
      this.replaceChildrenUi(this._uiCardHolder, this._uiWager);
      console.groupEnd();
    });

    // Render
    this._style();
  }

  id = () => this._id;
}

const newUiHand = (hand) => {
  if (!hand) {
    throw new Error(`null arg`);
  }
  return new UiHand(hand);
};
