class UiTree extends Ui_Component {
  static UI_ROOT = document.getElementById("root-ui-blackjack");

  constructor() {
    super(document.createElement("div"));
  }

  _attachGlobalRoot = () => UiTree.UI_ROOT.replaceChildren(this.getRoot());
}

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

    /** @private @const {UiPlayer[]} */
    this._uiPlayers = null;

    /** @private @const {Object.<id:string,uiPlayer:UiPlayer>}} */
    this._uiPlayersRef = null;

    /** @private @const {UiDealer} */
    this._uiDealer = null;

    /** @private @const {UiPhaseDisplay} */
    this._uiPhaseDisplay = null;

    /** @private @const {RoundPhase} */
    this._phaseUi = this._round.getPhase();
  }

  getUiPlayers = () => this._uiPlayers;
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
  _initializeUiDisplayPhase = () => {
    this._uiPhaseDisplay = new UiPhaseDisplay();
  };

  _initializeUiDealer = () => {
    this._uiDealer = newUiDealer(this._round.getDealer());
  };
  _initializeUiPlayers = () => {
    this._uiPlayers = newUiPlayers(this._round.getPlayers());

    this._uiPlayersRef = this._uiPlayers.reduce((refs, thisUiP) => {
      const id = thisUiP.id();
      return { ...refs, [id]: thisUiP };
    }, {});
  };
  initializeComponents = () => {
    this._initializeUiDisplayPhase();
    this._initializeUiPlayers();
    this._initializeUiDealer();
  };

  initializeRenderCallbacks = () => {
    this._round.setOnChangeBetTurn(
      (prevPlayer, prevHand, newPlayer, newHand, phase) => {
        const [prevPlayerId, newPlayerId] = [prevPlayer?.id(), newPlayer?.id()];
        this.changeFocusUiPlayerById(prevPlayerId, newPlayerId, phase);
        const [prevHandId, newHandId] = [prevHand?.id(), newHand?.id()];

        this.changeFocusUiHandbyId(
          prevPlayerId,
          prevHandId,
          newPlayerId,
          newHandId,
          phase
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
            ...this.getUiPlayers()
          );
          break;
      }
    });

    this._round.setOnSetPhaseCompleted((phase) => {
      console.log("setOnSetPhaseCompleted");
      this._uiDealer.unfocusThisDealer(phase);
      for (const uIP of this.getUiPlayers()) {
        uIP.unfocusThisPlayer(phase);
      }
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

  changeFocusUiPlayerById = (unfocusPlayerId, focusPlayerId, phase) => {
    const [unfocusUiPlayer, focusUiPlayer] = [
      this.getUiPlayerById(unfocusPlayerId),
      this.getUiPlayerById(focusPlayerId),
    ];
    this.changeFocusUiPlayer(unfocusUiPlayer, focusUiPlayer, phase);
  };

  changeFocusUiHandbyId = (
    prevPlayerId,
    prevHandId,
    newPlayerId,
    newHandId,
    phase
  ) => {
    const [prevUiPlayer, newUiPlayer] = [
      this.getUiPlayerById(prevPlayerId),
      this.getUiPlayerById(newPlayerId),
    ];
    prevUiPlayer?.unfocusHandById(prevHandId, phase);
    newUiPlayer?.focusHandById(newHandId, phase, this._round);
  };
  /**
   *
   * @param {UiPlayer} unfocusUiPlayer
   * @param {UiPlayer} focusUiPlayer
   * @param {RoundPhase} phase
   */
  changeFocusUiPlayer = (unfocusUiPlayer, focusUiPlayer, phase) => {
    this.unfocusUiPlayer(unfocusUiPlayer, phase);
    this.focusUiPlayer(focusUiPlayer, phase);
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
const newUiRound = (round) => {
  const uiRound = new UiRound(round);
  uiRound.initializeComponents();
  uiRound.initializeRenderCallbacks();
  uiRound.attachToGlobalRoot();
  return uiRound;
};
