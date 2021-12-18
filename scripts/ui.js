// This file relies on the fact that the following declarations have been made
// in runtime:
//            domain.js

// ui.js
// The DOM nodes and elements to represent POJO.

class UiButton {
  constructor() {
    this._ui = null;
  }
}

class UiButtonHit extends UiButton {
  constructor() {
    super();
  }
}

class UiButtonStand extends UiButton {
  constructor() {
    super();
  }
}
class UiHand {
  /**
   *
   * @param {Hand} hand
   */
  constructor(hand) {
    this._ui = document.createElement("div");
    this._ui.setAttribute("count", hand.count());
  }
}

class UiTree {
  static UI_ROOT = document.getElementById("root-ui-blackjack");

  constructor() {
    this._root = document.createElement("div");
  }

  getRoot = () => this._root;

  attachGlobalRoot = () => UiTree.UI_ROOT.replaceChildren(this.getRoot());
}

class UiName {
  /** @param {!string} name */
  constructor(name) {
    this._root = document.createElement("div");
    this._root.textContent = name;
  }

  getRoot = () => this._root;
}
class UiActor {
  /**
   *
   * @param {Actor} actor
   */
  constructor(actor) {
    this._actor = actor;
    this._root = document.createElement("div");
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
  getRoot = () => this._root;
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
    this.initComponent();
  }

  id = () => this._id;
  initComponent = () => {
    this.setNameColor();
  };
  setNameColor = (color = `red`) => {
    this.getUiName().getRoot().style.color = color;
  };
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
class UiCredit {
  /**
   * @param {number} credit
   *
   */
  constructor(credit) {
    this._ui = document.createElement("div");
    this.setValue(credit);
  }
  setValue = (credit) => this._ui.setAttribute("value", credit);
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
  }

  getUiPlayers = () => this._uiPlayers;
  getUiDealer = () => this._uiDealer;
  /**
   *
   * @param {RoundPhase} phase
   */
  initialize = () => {
    /** @private @const {UiPlayer[]} */
    this._uiPlayers = newUiPlayers(this._round.getPlayers());
    this._uiPlayersRef = this._uiPlayers.reduce((refs, thisUiP) => {
      const id = thisUiP.id();
      return { ...refs, [id]: thisUiP };
    }, {});
    /** @private @const {UiDealer[]} */
    this._uiDealer = newUiDealer(this._round.getDealer());

    for (const uiP of this._uiPlayers) {
      this._root.appendChild(uiP.getRoot());
    }
    this._root.appendChild(this._uiDealer.getRoot());
    this.attachGlobalRoot();
  };

  /**
   *
   * @param {UiPlayer} uiPlayer
   */
  focusUiPlayer = (uiPlayer) => {
    const root = uiPlayer.getRoot();
    root.style.border = "1px solid turquoise";
    root.style.borderRadius = "7px";
  };

  unfocusUiPlayer = (uiPlayer) => {
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
    if (prevPhase === phase) {
      return;
    }
    this._round.changePhase(phase);
    const thisPhase = this._round.getPhase();
    if (thisPhase === RoundPhase.START) {
      const id = this._round.getCurrentPlayer().id();
      const thisUiPlayer = this.getUiPlayerById(id);
      this.focusUiPlayer(thisUiPlayer);
    }
  };
  getUiPlayerById = (id) => {
    return this._uiPlayersRef[id];
  };
  start = () => {
    this._changePhase(RoundPhase.START);
  };

  bet = () => {
    this._changePhase(RoundPhase.BID);
  };
}

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
 * @returns {UiPlayer} tree representation of the players
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
  uIRound.start();
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
