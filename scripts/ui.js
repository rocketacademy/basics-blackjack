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
class UiActor {
  /**
   *
   * @param {Actor} actor
   */
  constructor(actor) {
    this._uiName = document.createElement("div");
    this._uiName.innerHTML = actor.getName();
    /** @private @constant {UiHand[]} */
    this._uiHands = actor.getHands().map((hand) => newUiHand(hand));
    /** @private @constant {Ui[]} */
    this._uiCredit = newUiCredit(actor.getCredit());
  }
  /**
   *
   * @returns {HTMLDivElement}
   */
  getUiName = () => this._uiName;
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
class UiRound {
  /**
   *
   * @param {Round} round
   */
  constructor(round) {
    this._round = round;

    this._uiPlayers = newUiPlayers(this._round.getPlayers());
    this._uiDealer = newUiDealer(this._round.getDealer());
  }

  getUiPlayers = () => this._uiPlayers;
  getUiDealer = () => this._uiDealer;
}
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

const testHeadsUpRoundActorsNameUi = () => {
  console.group();
  console.log("testHeadsUpRoundActorsNameUi");
  const table = newTableHeadsUp();
  const round = new Round(table);

  const uIRound = new UiRound(round);

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

  logAssert(...isUiForPlayerNameExist);

  logAssert(...isUiForDealerNameExist);

  console.groupEnd();
};

// HTML ROUND
testHeadsUpRoundActorsNameUi();
