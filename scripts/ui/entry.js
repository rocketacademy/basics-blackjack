class UiTree extends Ui_Component {
  static UI_ROOT = document.getElementById("root-ui-blackjack");

  constructor() {
    super(document.createElement("div"));
  }

  _attachGlobalRoot = () => UiTree.UI_ROOT.replaceChildren(this.getRoot());
}

class UiPlayersHolder extends Ui_Component {
  constructor() {
    super();
    this._root.style.flexDirection = "row";
    this._root.style.justifyContent = "space-around";
    /** @private @const {UiPlayer[]}} */
    this._uIPlayers = [];
    /** @private @const {Object.<string,UiPlayer>}} */
    this._uiPlayersRef = {};
  }

  addUiPlayer = (uiPlayer) => {
    this._uIPlayers.push(uiPlayer);
    this._uiPlayersRef = { [uiPlayer.id()]: uiPlayer, ...this._uiPlayersRef };
    this.appendChildUi(uiPlayer);
  };
  unfocusUiPlayers = (phase) => {
    for (const uiP of this._uIPlayers) {
      uiP.unfocusThisPlayer(phase);
    }
  };

  changeFocusUiPlayerById = (
    uiPlayerIdToBeUnfocused,
    uiPlayerIdToBeFocused,
    phase
  ) => {
    const [uiPlayerToBeUnfocused, uiPlayerToBeFocused] = [
      this._uiPlayersRef[uiPlayerIdToBeUnfocused],
      this._uiPlayersRef[uiPlayerIdToBeFocused],
    ];
    uiPlayerToBeUnfocused?.unfocusThisPlayer(phase);
    uiPlayerToBeFocused?.focusThisPlayer(phase);
  };

  changeFocusUiHandById = (
    prevPlayerId,
    prevHandId,
    newPlayerId,
    newHandId,
    phase,
    round
  ) => {
    const [prevUiPlayer, newUiPlayer] = [
      this._uiPlayersRef[prevPlayerId],
      this._uiPlayersRef[newPlayerId],
    ];
    prevUiPlayer?.unfocusHandById(prevHandId, phase);
    newUiPlayer?.focusHandById(newHandId, phase, round);
  };
}

class UiPhaseDisplay extends Ui_Text {
  constructor() {
    super(document.createElement("div"));
  }
}

/**
 *
 * @param {Player[]} players
 * @returns {UiPlayersHolder}
 */
const newUiPlayersHolder = (players) => {
  const newUiPlayersHolder = new UiPlayersHolder();
  for (p of players) {
    const uiP = new UiPlayer(p);
    newUiPlayersHolder.addUiPlayer(uiP);
  }
  return newUiPlayersHolder;
};

class UiRound extends UiTree {
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
    this._uiPlayersHolder = newUiPlayersHolder(this._round.getPlayers());

    /** @private @const {UiDealer} */
    this._uiDealer = newUiDealer(this._round.getDealer());

    /** @private @const {UiPhaseDisplay} */
    this._uiPhaseDisplay = new UiPhaseDisplay();

    /** @private @const {RoundPhase} */
    this._phaseUi = this._round.getPhase();
  }

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

  initializeComponents = () => {};

  initializeRenderCallbacks = () => {
    this._round.setOnSetCurrentPlayer(
      (prevPlayerId, currentPlayerId, phase) => {
        this._uiPlayersHolder.changeFocusUiPlayerById(
          prevPlayerId,
          currentPlayerId,
          phase
        );
      }
    );

    this._round.setOnSetCurrentHand(
      (prevPlayerId, prevHandId, newPlayerId, newHandId, phase) => {
        this._uiPlayersHolder.changeFocusUiHandById(
          prevPlayerId,
          prevHandId,
          newPlayerId,
          newHandId,
          phase,
          this._round
        );
      }
    );
    this._round.setOnSetPhase((phase) => {
      this._refreshDisplayPhase();
      switch (phase) {
        case RoundPhase.BET:
          console.log(`on phase change refresh for round phase bet`);
          this.replaceChildrenUi(
            this._uiPhaseDisplay,
            this._uiDealer,
            this._uiPlayersHolder
          );
          break;
      }
    });

    this._round.setOnSetPhaseCompleted((phase) => {
      console.log("setOnSetPhaseCompleted");
      this._uiDealer.unfocusThisDealer(phase);
      this._uiPlayersHolder.unfocusUiPlayers(phase);
    });
  };

  attachToGlobalRoot = () => {
    console.log("Attaching to global root");
    this._attachGlobalRoot();
  };

  _refreshDisplayPhase = () => {
    const text = "ROUND STATUS: " + this._round.getPhase()?.desc();
    console.warn(`REPROP PHASE DISPLAY ${text}`);
    this._uiPhaseDisplay.setTextContent(text);
  };

  /**
   *
   * @param {UiPlayer} uiPlayer
   * @param {RoundPhase} phase
   */
  focusUiPlayer = (uiPlayer, phase) => {
    if (!uiPlayer) {
      return;
    }
    uiPlayer.focusThisPlayer(phase);
  };
  /**
   *
   * @param {UiPlayer} uiPlayer
   * @returns
   */
  unfocusUiPlayer = (uiPlayer, phase) => {
    if (!uiPlayer) {
      return;
    }
    uiPlayer.unfocusThisPlayer(phase);
  };
}

/**
 *
 * @param {Round} round
 * @returns {UiRound}
 */
const NEW_UI_ROUND = (round) => {
  const uiRound = new UiRound(round);
  uiRound.initializeComponents();
  uiRound.initializeRenderCallbacks();
  uiRound.attachToGlobalRoot();
  return uiRound;
};
