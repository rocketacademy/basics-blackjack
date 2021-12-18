class HtmlButton {
  constructor() {
    this._html = null;
  }
}

class HtmlButtonHit extends HtmlButton {
  constructor() {
    super();
  }
}

class UiButtonStand extends HtmlButton {
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
    this._html = document.createElement("div");
    this._html.setAttribute("count", hand.count());
  }
}
class UiActor {
  /**
   *
   * @param {Actor} actor
   */
  constructor(actor) {
    this._htmlName = document.createElement("div");
    this._htmlName.innerHTML = actor.getName();
    /** @private @constant {HtmlHand[]} */
    this._htmlHands = actor.getHands().map((hand) => newHtmlHand(hand));
    /** @private @constant {Html[]} */
    this._htmlCredit = newHtmlCredit(actor.getCredit());
  }
  /**
   *
   * @returns {HTMLDivElement}
   */
  getHtmlName = () => this._htmlName;
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
    this._html = document.createElement("div");
    this.setValue(credit);
  }
  setValue = (credit) => this._html.setAttribute("value", credit);
}
class UiRound {
  /**
   *
   * @param {Round} round
   */
  constructor(round) {
    this._round = round;

    this._htmlPlayers = newHtmlPlayers(this._round.getPlayers());
    this._htmlDealer = newHtmlDealer(this._round.getDealer());
  }

  getHtmlPlayers = () => this._htmlPlayers;
  getHtmlDealer = () => this._htmlDealer;
}
/**
 * @param {Player} player
 * @returns {UiPlayer}
 */
const newHtmlPlayer = (player) => new UiPlayer(player);
/**
 *
 * @param {Player[]} players
 * @returns {UiPlayer} html representation of the players
 */
const newHtmlPlayers = (players) =>
  players.map((player) => newHtmlPlayer(player));

/**
 *
 * @param {Dealer} dealer
 * @returns {UiDealer}
 */
const newHtmlDealer = (dealer) => new UiDealer(dealer);

const newHtmlCredit = (credit) => new UiCredit(credit);

const testHeadsUpRoundActorsNameUi = () => {
  console.group();
  console.log("testHeadsUpRoundActorsNameUi");
  const table = newTableHeadsUp();
  const round = new Round(table);

  const htmlRound = new UiRound(round);

  const htmlPlayers = htmlRound.getHtmlPlayers();

  const htmlDealer = htmlRound.getHtmlDealer();

  const htmlHeadsUpPlayer = htmlPlayers[0];

  const isHtmlForPlayerNameExist = [
    htmlHeadsUpPlayer.getHtmlName().nodeName.toLowerCase() === "div",
    undefined,
    "isHtmlForPlayerName NOT Exist",
  ];

  const isHtmlForDealerNameExist = [
    htmlDealer.getHtmlName().nodeName.toLowerCase() === "div",
    undefined,
    "isHtmlForDealerName NOT Exist",
  ];

  logAssert(...isHtmlForPlayerNameExist);

  logAssert(...isHtmlForDealerNameExist);

  console.groupEnd();
};

// HTML ROUND
testHeadsUpRoundActorsNameUi();
