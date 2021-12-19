class UiTree extends Ui_Component {
  static UI_ROOT = ROOT_BLACKJACK_ELEMENT;

  constructor() {
    super(document.createElement("div"));
  }

  _attachGlobalRoot = () => UiTree.UI_ROOT.replaceChildren(this.getRoot());
  detachGlobalRoot = () =>
    this.getRoot().parentNode.removeChild(this.getRoot());
  render = () => {
    this._attachGlobalRoot();
  };
}

class UiLounge extends UiTree {
  constructor(lounge) {
    super();
  }
}

class UiPlayersHolder extends Ui_Aggregate {
  constructor() {
    super();
    // Root Configuration
    this._style();
    this._root.className += ` blackjack-holder-player`;

    // Children
    /** @private @const {UiPlayer[]}} */
    this._uIPlayers = [];
    /** @private @const {Object.<string,UiPlayer>}} */
    this._uiPlayersRef = {};
  }

  _style = () => {
    this._root.style.flexDirection = "row";
    this._root.style.justifyContent = "space-around";
  };

  addUiPlayer = (uiPlayer) => {
    this._uIPlayers.push(uiPlayer);
    this._uiPlayersRef = { [uiPlayer.id()]: uiPlayer, ...this._uiPlayersRef };
    this.appendChildUi(uiPlayer);
  };
}

class UiPhaseDisplay extends Ui_Text {
  constructor() {
    super(document.createElement("div"));
  }
}

class UiRound extends UiTree {
  /**
   * 
   * // TEMP
   __newUiPlayerHolders = (players) => {
    const uiPH = new UiPlayersHolder();

    for (const p of players) {
      const uiP = new UiPlayer(p);
      uiPH.addUiPlayer(uiP);
    }

    return uiPH;
  };
   */

  _style = () => {
    this._root.style.border = "1px dotted black";
    this._root.style.flexDirection = "column";
  };
  /**
   *
   * @param {Round} round
   */
  constructor(round) {
    super();
    // Domain
    /** @private @const {Round} */
    this._round = round;

    this._style();

    /** @private @const {UiPlayersHolder} */
    //TEMP this._uiPlayersHolder = this.__newUiPlayerHolders(this._round.getPlayers());

    /** @private @const {UiDealer} */
    //TEMP this._uiDealer = newUiDealer(this._round.getDealer());

    /** @private @const {UiPhaseDisplay} */
    // this._uiPhaseDisplay = new UiPhaseDisplay();

    // Hooks
  }

  getUiPlayersHolder = () => this._uiPlayersHolder;
  getUiDealer = () => this._uiDealer;

  setOnFinish = (cb) => {
    this._round.setOnFinish(cb);
    return this;
  };
}
