class UiTree extends Ui_Component {
  static UI_ROOT = document.getElementById("root-ui-blackjack");

  constructor() {
    super(document.createElement("div"));
  }

  _attachGlobalRoot = () => UiTree.UI_ROOT.replaceChildren(this.getRoot());
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
  __newUiPlayerHolders = (players) => {
    const uiPH = new UiPlayersHolder();

    for (const p of players) {
      const uiP = new UiPlayer(p);
      uiPH.addUiPlayer(uiP);
    }

    return uiPH;
  };
  /**
   *
   * @param {Round} round
   */
  constructor(round) {
    super();
    /** @private @const {Round} */
    this._round = round;
    this._root.style.border = "1px dotted black";
    this._root.style.flexDirection = "column";

    /** @private @const {UiPlayersHolder} */
    this._uiPlayersHolder = this.__newUiPlayerHolders(this._round.getPlayers());

    /** @private @const {UiDealer} */
    this._uiDealer = newUiDealer(this._round.getDealer());

    /** @private @const {UiPhaseDisplay} */
    this._uiPhaseDisplay = new UiPhaseDisplay();

    /** @private @const {RoundPhase} */
    this._phaseUi = this._round.getPhase();

    // Hooks
    this._round.setOnSetPhase((phase) => {
      this._refreshDisplayPhase(phase);
      console.log(`Ui Hook[setOnSetPhase] ${phase}`);
      switch (phase) {
        case RoundPhase.INITIAL_BET:
          this.replaceChildrenUi(
            this._uiPhaseDisplay,
            this._uiDealer,
            this._uiPlayersHolder
          );
          return;

        case RoundPhase.END:
          this.replaceChildrenUi(
            this._uiPhaseDisplay,
            this._uiDealer,
            this._uiPlayersHolder
          );
          return;
      }
    });
    this._round.setOnSetPhaseCompleted((phase, round) => {
      console.log(`Ui Hook[setOnSetPhaseCompleted]  ${phase}`);
      switch (phase) {
        case RoundPhase.IN_PLAY_DEALER:
          const endGameButton = this._newEndGameControl(round);
          this.replaceChildrenUi(
            this._uiPhaseDisplay,
            endGameButton,
            this._uiDealer,
            this._uiPlayersHolder
          );
          break;
      }
    });
    this._attachGlobalRoot();
  }
  _newEndGameControl = (round) => {
    const button = new UiButtonEndGame();
    button.setOnMouseClick(() => round.requestInitEndPhase());
    return button;
  };
  getUiPlayersHolder = () => this._uiPlayersHolder;
  getUiDealer = () => this._uiDealer;

  /**
   *
   * @param {number} id
   * @returns {UiPlayer}
   */
  getUiPlayerById = (id) => {
    return this._uiPlayersRef[id];
  };

  getUiPhaseDisplay = () => {
    return this._uiPhaseDisplay;
  };

  _initializeUiDealer = () => {};

  initializeRenderCallbacks = () => {};

  attachToGlobalRoot = () => {
    console.log("Attaching to global root");
  };

  _refreshDisplayPhase = (phase) => {
    const text = "ROUND STATUS: " + phase.desc();
    console.warn(`REPROP PHASE DISPLAY ${text}`);
    this._uiPhaseDisplay.setTextContent(text);
  };
}

/**
 *
 * @param {Round} round
 * @returns {UiRound}
 */
const NEW_UI_ROUND = (round) => new UiRound(round);
