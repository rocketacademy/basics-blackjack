// This file relies on the fact that the following declarations have been made
// in runtime:
//            domain.js

// ui.js
// The DOM nodes and elements to represent POJO.

/**
 *
 * @param {UiComponent} ui
 * @param {string} property
 * @param {string} value
 */
const setUiStyle = (ui, property, value) => {
  ui.getRoot().style[property] = value;
};

/**
 *
 * @param {UiComponent} ui
 * @param {string} value
 */
const setUiTextContent = (ui, value) => {
  ui.getRoot().textContent = value;
};

class UiComponent {
  /**
   *
   * @param {HTMLElement} element
   */
  constructor(element) {
    this._root = element;
  }

  getRoot = () => this._root;
  replaceChildrenUi = (...uiS) => {
    const nodeOfUis = uiS.map((ui) => ui.getRoot());
    this._root.replaceChildren(...nodeOfUis);
  };

  /**
   * @param {UiComponent}
   *
   */
  appendChildUi = (ui) => this._root.appendChild(ui.getRoot());
}
class UiButton extends UiComponent {
  constructor() {
    super(document.createElement("button"));
  }
  setOnClick = (onClick) => {
    onClick =
      onClick ||
      (() => {
        console.log("UiButtonChangePlayer no clicks found");
      });
    this._root.addEventListener("click", onClick);
  };
}

class UiButtonChangePlayer extends UiButton {
  constructor(args) {
    super();
    this._root.textContent = "Change Player";
  }
}
class UiButtonHit extends UiButton {
  constructor() {
    super();
    this._root.textContent = "Hit";
  }
}

class UiButtonBid extends UiButton {
  constructor() {
    super();
    this._root.textContent = "Bid";
  }
}

class UiButtonStand extends UiButton {
  constructor() {
    super();
    this._root.textContent = "Stand";
  }
}
class UiPhaseDisplay extends UiComponent {
  constructor() {
    super(document.createElement("div"));
  }

  setTextContent = (text) => {
    this._root.textContent = text;
  };
}

class UiHand extends UiComponent {
  /**
   *
   * @param {Hand} hand
   */
  constructor(hand) {
    super(document.createElement("div"));
    this._root.setAttribute("count", hand.count());
    this._root.textContent(count + hand.count());
  }
}

class UiCredit extends UiComponent {
  /**
   * @param {number} credit
   *
   */
  constructor(credit) {
    super(document.createElement("div"));
    this.setValue(credit);
  }
  setValue = (credit) => this._root.setAttribute("value", credit);
}

class UiName extends UiComponent {
  /** @param {!string} name */
  constructor(name) {
    super(document.createElement("div"));
    this._root.textContent = name;
  }
}
class UiActor extends UiComponent {
  /**
   *
   * @param {Actor} actor
   */
  constructor(actor) {
    super(document.createElement("div"));
    this._actor = actor;
    /** @private @const {UiName} */
    this._uiName = new UiName(this._actor.getName());
    /** @private @const {UiHand[]} */
    this._uiHands = actor.getHands().map((hand) => newUiHand(hand));
    /** @private @const {Ui[]} */
    this._uiCredit = newUiCredit(this._actor.getCredit());

    // IMPORTANT FOR REFERENCE
    this._id = actor.id();

    this.initComponent();
  }
  /**
   *
   * @returns {HTMLDivElement}
   */
  getUiName = () => this._uiName;
  initComponent = () => {
    this.appendChildUi(this._uiName);
  };

  setNameColor = (val) => {
    if (!val) {
      return;
    }
    setUiStyle(this.getUiName(), "color", val);
  };
}
class UiPlayer extends UiActor {
  /**
   * @param {Player} player
   */
  constructor(player) {
    super(player);

    this._buttonPass = new UiButtonStand();
    this._buttonBid = new UiButtonBid();
    this.initComponent();
  }

  id = () => this._id;
  initComponent = () => {
    this.setNameColor("red");
  };

  renderModeAudience = () => {
    this.replaceChildrenUi(this.getUiName());
  };

  /**
   *
   * @param {RoundPhase} phase
   * @returns
   */
  renderModeActive = (phase) => {
    console.group(
      `Render:Active Phase:${phase.desc()} Player:${this._actor.getName()}`
    );
    switch (phase) {
      case RoundPhase.IN_PLAY_PLAYERS:
        this.replaceChildrenUi(this.getUiName(), this._buttonPass);
        break;
      case RoundPhase.BID:
        this.replaceChildrenUi(this.getUiName(), this._buttonBid);
        break;
      default:
        this.replaceChildrenUi(this.getUiName());
        break;
    }
    console.groupEnd();
  };
  setOnClickButtonPass = (cb) => this._buttonPass.setOnClick(cb);
  setOnClickButtonBid = (cb) => this._buttonBid.setOnClick(cb);
}
class UiDealer extends UiActor {
  /**
   * @param {Dealer} dealer
   */
  constructor(dealer) {
    super(dealer);
    this.initComponent();
  }

  initComponent = () => {
    this.setNameColor();
  };
}

class UiTree extends UiComponent {
  static UI_ROOT = document.getElementById("root-ui-blackjack");

  constructor() {
    super(document.createElement("div"));
  }

  attachGlobalRoot = () => UiTree.UI_ROOT.replaceChildren(this.getRoot());
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

    /** @private @const {UiDealer[]} */
    this._uiDealer = null;

    /** @private @const {UiPhaseDisplay} */
    this._uiPhaseDisplay = null;

    /** @private @const {UiButton} */
    this._uiButtonDummy = null;

    /** @private @const {RoundPhase} */
    this._phaseUi = this._round.getPhase();
  }

  getUiPlayers = () => this._uiPlayers;
  getUiDealer = () => this._uiDealer;

  _refreshDisplayPhase = () => {
    this._uiPhaseDisplay.setTextContent(
      "ROUND STATUS: " + this._round.getPhase()?.desc()
    );
  };

  initializeUiDisplayPhase = () => {
    this._uiPhaseDisplay = new UiPhaseDisplay();
    this._refreshDisplayPhase();
  };

  initializeButtonDummy = () => {
    this._uiButtonDummy = new UiButton();
    setUiTextContent(this._uiButtonDummy, "round dummy button");
  };

  initializeUiDealer = () => {
    this._uiDealer = newUiDealer(this._round.getDealer());
  };

  /**
   *
   * @param {RoundPhase} phase
   */
  initialize = () => {
    this.initializeUiDisplayPhase();

    this.initializeUiPlayers();
    this.initializeButtonDummy();
    this.initializeUiDealer();

    this.attachGlobalRoot();
  };

  initializeUiPlayers = () => {
    this._uiPlayers = newUiPlayers(this._round.getPlayers());

    this._uiPlayers.forEach((uIP) => {
      this.unfocusUiPlayer(uIP);
      uIP.setOnClickButtonPass(this.onClickStandHandler);
      uIP.setOnClickButtonBid(this.onClickBidHandler);
    });
    this._uiPlayersRef = this._uiPlayers.reduce((refs, thisUiP) => {
      const id = thisUiP.id();
      return { ...refs, [id]: thisUiP };
    }, {});
  };
  changeFocusUiPlayerById = (unfocusPlayerId, focusPlayerId, phase) => {
    const [unfocusUiPlayer, focusUiPlayer] = [
      this.getUiPlayerById(unfocusPlayerId),
      this.getUiPlayerById(focusPlayerId),
    ];
    this.changeFocusUiPlayer(unfocusUiPlayer, focusUiPlayer, phase);
  };

  changeFocusUiPlayer = (unfocusPlayer, focusPlayer, phase) => {
    this.unfocusUiPlayer(unfocusPlayer, phase);
    this.focusUiPlayer(focusPlayer, phase);
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
    uiPlayer.renderModeActive(phase);
    const root = uiPlayer.getRoot();
    root.style.border = "1px solid turquoise";
    root.style.borderRadius = "7px";
  };
  /**
   *
   * @param {UiPlayer} uiPlayer
   * @returns
   */
  unfocusUiPlayer = (uiPlayer) => {
    if (!uiPlayer) {
      return;
    }
    uiPlayer.renderModeAudience();
    const root = uiPlayer.getRoot();
    root.style.border = "1px solid grey";
    root.style.borderRadius = "7px";
  };
  /**
   * Called when intent is to change round phase in tandem with round phase
   * @param {RoundPhase} phase
   */
  _changeRoundPhase = (phase) => {
    this._round.changePhase(phase);

    const prevThisPhase = this._phaseUi;

    const thisPhase = this._round.getPhase();
    if (prevThisPhase === thisPhase) {
      return;
    }
    this._phaseUi = thisPhase;

    console.log(
      "Ui: phase was changed " +
        prevThisPhase?.desc() +
        " -> " +
        thisPhase.desc()
    );
    this._refreshDisplayPhase();

    if (thisPhase === RoundPhase.SIT) {
      this.replaceChildrenUi(
        this._uiPhaseDisplay,
        this._uiDealer,
        ...this._uiPlayers,
        this._uiButtonDummy
      );
      this._changeRoundPhase(RoundPhase.BID);
    } else if (thisPhase === RoundPhase.BID) {
      const id = this._round.getCurrentPlayer().id();
      this.focusUiPlayerById(id, thisPhase);
    } else if (thisPhase === RoundPhase.IN_PLAY_PLAYERS) {
      const id = this._round.getCurrentPlayer().id();
      this.focusUiPlayerById(id, thisPhase);
    }
  };
  focusUiPlayerById = (id, phase) => {
    const thisUiPlayer = this.getUiPlayerById(id);
    this.focusUiPlayer(thisUiPlayer, phase);
  };

  /**
   *
   * @param {number} id
   * @returns {UiPlayer}
   */
  getUiPlayerById = (id) => {
    return this._uiPlayersRef[id];
  };

  onClickSitHandler = () => {
    this._changeRoundPhase(RoundPhase.SIT);
  };
  onClickPlayPlayersHandler = () => {
    this._changeRoundPhase(RoundPhase.IN_PLAY_PLAYERS);
  };
  onClickStandHandler = () => {
    const prevId = this._round.getCurrentPlayer()?.id();
    this._round.changePlayer();
    const currentId = this._round.getCurrentPlayer()?.id();

    const thisPhase = this._round.getPhase();
    this.changeFocusUiPlayerById(prevId, currentId, thisPhase);
    this._changeRoundPhase(thisPhase);
  };

  onClickBidHandler = () => {
    const prevId = this._round.getCurrentPlayer()?.id();
    this._round.changePlayer();
    const currentId = this._round.getCurrentPlayer()?.id();

    const thisPhase = this._round.getPhase();
    this.changeFocusUiPlayerById(prevId, currentId, thisPhase);
    this._changeRoundPhase(thisPhase);
  };
}

/**
 *
 * @param {Round} round
 * @returns {UiRound}
 */
const newUiRound = (round) => {
  const uiRound = new UiRound(round);
  uiRound.initialize();

  return uiRound;
};

/**
 * @param {Player} player
 * @returns {UiPlayer}
 */
const newUiPlayer = (player) => new UiPlayer(player);
/**
 *
 * @param {Player[]} players
 * @returns {UiPlayer[]} tree representation of the players
 */
const newUiPlayers = (players) => players.map((player) => newUiPlayer(player));

/**
 *
 * @param {Dealer} dealer
 * @returns {UiDealer}
 */
const newUiDealer = (dealer) => new UiDealer(dealer);

const newUiCredit = (credit) => new UiCredit(credit);

const test_HeadsUp_UiRound_ChangeRoundPhase_Start_Render = () => {
  console.group();
  console.log("testHeadsUpRoundActorsNameUi");
  const table = newTableHeadsUp();
  const round = new Round(table);

  const uIRound = newUiRound(round);
  uIRound.onClickSitHandler();
  const uiPlayers = uIRound.getUiPlayers();

  const uiDealer = uIRound.getUiDealer();

  const uiHeadsUpPlayer = uiPlayers[0];

  const isUiForPlayerNameExist = [
    uiHeadsUpPlayer.getUiName().getRoot().nodeName.toLowerCase() === "div",
    undefined,
    "isUiForPlayerName NOT Exist",
  ];

  const isUiForDealerNameExist = [
    uiDealer.getUiName().getRoot().nodeName.toLowerCase() === "div",
    undefined,
    "isUiForDealerName NOT Exist",
  ];

  const expectedDefaultDealerName = `D`;
  const actualDealerName = uiDealer.getUiName().getRoot().textContent;
  const isUiForDealerNameDefault = [
    actualDealerName === expectedDefaultDealerName,
    undefined,
    `isUiForDealerNameDefault name got ${actualDealerName} want ${expectedDefaultDealerName}`,
  ];

  LOG_ASSERT(...isUiForPlayerNameExist);
  LOG_ASSERT(...isUiForDealerNameExist);
  LOG_ASSERT(...isUiForDealerNameDefault);

  console.groupEnd();
};

// Ui ROUND
test_HeadsUp_UiRound_ChangeRoundPhase_Start_Render();

const main = () => {
  const table = newTableTwoPlayers();
  const round = new Round(table);
  const uiRound = newUiRound(round);
  uiRound.onClickSitHandler();
};

console.log(`---MAIN---`);
main();
