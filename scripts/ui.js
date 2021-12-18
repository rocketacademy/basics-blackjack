// This file relies on the fact that the following declarations have been made
// in runtime:
//            domain.js

// ui.js
// The DOM nodes and elements to represent POJO.

class UiComponent {
  /**
   *
   * @param {HTMLElement} element
   */
  constructor(element) {
    this._root = element;
  }

  getRoot = () => this._root;
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

class UiButtonStand extends UiButton {
  constructor() {
    super();
    this._root.textContent = "Stand";
  }
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

class UiTree extends UiComponent {
  static UI_ROOT = document.getElementById("root-ui-blackjack");

  constructor() {
    super(document.createElement("div"));
  }

  attachGlobalRoot = () => UiTree.UI_ROOT.replaceChildren(this.getRoot());
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
    this._uiName = new UiName(this._actor.getName());

    /** @private @constant {UiHand[]} */
    this._uiHands = actor.getHands().map((hand) => newUiHand(hand));
    /** @private @constant {Ui[]} */
    this._uiCredit = newUiCredit(this._actor.getCredit());

    this.initComponent();
  }
  /**
   *
   * @returns {HTMLDivElement}
   */
  getUiName = () => this._uiName;
  initComponent = () => {
    this._root.appendChild(this._uiName.getRoot());
  };
}
class UiPlayer extends UiActor {
  /**
   * @param {Player} player
   */
  constructor(player) {
    super(player);
    // IMPORTANT FOR REFERENCE
    this._id = player.id();
    // this._buttonChangePlayer = new UiButtonChangePlayer();
    this._buttonChangePlayer = new UiButton();

    this.initComponent();
  }

  id = () => this._id;
  initComponent = () => {
    this.setNameColor();
    this._root.appendChild(this._buttonChangePlayer.getRoot());
  };
  setNameColor = (color = `red`) => {
    this.getUiName().getRoot().style.color = color;
  };

  setOnClickButtonChangePlayer = (cb) =>
    this._buttonChangePlayer.setOnClick(cb);
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

  setNameColor = (color = `blue`) => {
    this.getUiName().getRoot().style.color = color;
  };
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

class UiPhaseDisplay extends UiComponent {
  constructor() {
    super(document.createElement("div"));
  }

  setTextContent = (text) => {
    this._root.textContent = text;
  };
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

    /** @private @constant {UiButton} */
    this._uiButtonDummy = null;
  }

  getUiPlayers = () => this._uiPlayers;
  getUiDealer = () => this._uiDealer;

  refreshDisplayPhase = () => {
    this._uiPhaseDisplay.setTextContent(
      "ROUND STATUS: " + this._round.getPhase()?.desc()
    );
  };

  initializeUiDisplayPhase = () => {
    this._uiPhaseDisplay = new UiPhaseDisplay();
    this.refreshDisplayPhase();
  };

  initializeButtonDummy = () => {
    this._uiButtonDummy = new UiButton();
    this._uiButtonDummy.getRoot().textContent = "round dummy button";
  };

  initializeUiDealer = () => {
    this._uiDealer = newUiDealer(this._round.getDealer());
  };

  replaceChildrenUi = (uiS) => {
    const nodeOfUis = uiS.map((ui) => ui.getRoot());
    this._root.replaceChildren(...nodeOfUis);
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
      // uIP.setOnClickButtonChangePlayer(onClickChangePlayerHandler);
    });
    this._uiPlayersRef = this._uiPlayers.reduce((refs, thisUiP) => {
      const id = thisUiP.id();
      return { ...refs, [id]: thisUiP };
    }, {});
  };
  changeFocusUiPlayerById = (unfocusPlayerId, focusPlayerId) => {
    const [unfocusUiPlayer, focusUiPlayer] = [
      this.getUiPlayerById(unfocusPlayerId),
      this.getUiPlayerById(focusPlayerId),
    ];
    this.changeFocusUiPlayer(unfocusUiPlayer, focusUiPlayer);
  };

  changeFocusUiPlayer = (unfocusPlayer, focusPlayer) => {
    this.unfocusUiPlayer(unfocusPlayer);
    this.focusUiPlayer(focusPlayer);
  };
  /**
   *
   * @param {UiPlayer} uiPlayer
   */
  focusUiPlayer = (uiPlayer) => {
    if (!uiPlayer) {
      return;
    }
    const root = uiPlayer.getRoot();
    root.style.border = "1px solid turquoise";
    root.style.borderRadius = "7px";
  };

  unfocusUiPlayer = (uiPlayer) => {
    if (!uiPlayer) {
      return;
    }
    const root = uiPlayer.getRoot();
    root.style.border = "1px solid grey";
    root.style.borderRadius = "7px";
  };
  /**
   * Called when intent is to change round phase
   * @param {RoundPhase} phase
   */
  _changePhase = (phase) => {
    const prevPhase = this._round.getPhase();
    this._round.changePhase(phase);
    const thisPhase = this._round.getPhase();

    if (prevPhase === phase) {
      return;
    }
    if (thisPhase === RoundPhase.SIT) {
      this.refreshDisplayPhase();
      const id = this._round.getCurrentPlayer().id();
      this.focusUiPlayerById(id);
      this.replaceChildrenUi([
        this._uiPhaseDisplay,
        this._uiDealer,
        ...this._uiPlayers,
        this._uiButtonDummy,
      ]);
    }
  };
  focusUiPlayerById = (id) => {
    const thisUiPlayer = this.getUiPlayerById(id);
    this.focusUiPlayer(thisUiPlayer);
  };

  /**
   *
   * @param {number} id
   * @returns {UiPlayer}
   */
  getUiPlayerById = (id) => {
    return this._uiPlayersRef[id];
  };
  onClickStartHandler = () => {
    this._changePhase(RoundPhase.SIT);
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
  uIRound.onClickStartHandler();
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
  uiRound.onClickStartHandler();
};

main();
