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

class UiActor {
  /**
   *
   * @param {Actor} actor
   */
  constructor(actor) {
    this._root = document.createElement("div");
    this._uiName = document.createElement("div");
    this._uiName.innerHTML = actor.getName();
    /** @private @constant {UiHand[]} */
    this._uiHands = actor.getHands().map((hand) => newUiHand(hand));
    /** @private @constant {Ui[]} */
    this._uiCredit = newUiCredit(actor.getCredit());

    this.formComponent();
  }
  /**
   *
   * @returns {HTMLDivElement}
   */
  getUiName = () => this._uiName;
  getRoot = () => this._root;
  formComponent = () => {
    this._root.appendChild(this._uiName);
  };
}
class UiPlayer extends UiActor {
  /**
   * @param {Player} player
   */
  constructor(player) {
    super(player);
  }
}
class UiDealer extends UiActor {
  /**
   * @param {Dealer} dealer
   */
  constructor(dealer) {
    super(dealer);
  }
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
  /**
   * @param {RoundPhase} phase
   */
  _setRoundPhase = (phase) => {
    this._round.setPhase(phase);
  };

  _getRoundPhase = () => this._round.getPhase();
  getUiPlayers = () => this._uiPlayers;
  getUiDealer = () => this._uiDealer;
  /**
   *
   * @param {RoundPhase} phase
   */
  initialize = () => {
    /** @private @const {UiPlayer[]} */
    this._uiPlayers = newUiPlayers(this._round.getPlayers());
    /** @private @const {UiDealer[]} */
    this._uiDealer = newUiDealer(this._round.getDealer());

    console.log(this._uiDealer.getRoot());
    for (const uiP of this._uiPlayers) {
      this._root.appendChild(uiP.getRoot());
    }
    this._root.appendChild(this._uiDealer.getRoot());
    this.attachGlobalRoot();
  };
  /**
   * Called when intent is to change round phase
   * @param {RoundPhase} phase
   */
  _changePhase = (phase) => {
    const prevPhase = this._getRoundPhase();
    if (prevPhase === phase) {
      return;
    }
    this._setRoundPhase(phase);
    const thisPhase = this._getRoundPhase();
    if (thisPhase === RoundPhase.START) {
    }
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
    uiHeadsUpPlayer.getUiName().nodeName.toLowerCase() === "div",
    undefined,
    "isUiForPlayerName NOT Exist",
  ];

  const isUiForDealerNameExist = [
    uiDealer.getUiName().nodeName.toLowerCase() === "div",
    undefined,
    "isUiForDealerName NOT Exist",
  ];

  LOG_ASSERT(...isUiForPlayerNameExist);
  LOG_ASSERT(...isUiForDealerNameExist);

  console.groupEnd();
};

// Ui ROUND
test_HeadsUp_UiRound_ChangeRoundPhase_Start_Render();
