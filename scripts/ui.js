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

class HtmlButtonStand extends HtmlButton {
  constructor() {
    super();
  }
}
class HtmlHand {
  /**
   *
   * @param {Hand} hand
   */
  constructor(hand) {
    this._html = document.createElement("div");
    this._html.setAttribute("count", hand.count());
  }
}
class HtmlActor {
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
class HtmlPlayer extends HtmlActor {
  /**
   * @param {Player} player
   */
  constructor(player) {
    super(player);
  }
}
class HtmlDealer extends HtmlActor {
  /**
   * @param {Dealer} dealer
   */
  constructor(dealer) {
    super(dealer);
  }
}
class HtmlCredit {
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
class HTMLRound {
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
 * @returns {HtmlPlayer}
 */
const newHtmlPlayer = (player) => new HtmlPlayer(player);
/**
 *
 * @param {Player[]} players
 * @returns {HtmlPlayer} html representation of the players
 */
const newHtmlPlayers = (players) =>
  players.map((player) => newHtmlPlayer(player));

/**
 *
 * @param {Dealer} dealer
 * @returns {HtmlDealer}
 */
const newHtmlDealer = (dealer) => new HtmlDealer(dealer);

const newHtmlCredit = (credit) => new HtmlCredit(credit);

const testHeadsUpRoundActorsNameHtml = () => {
  console.group();
  console.log("testHeadsUpRoundPlayerHtml");
  const table = newTableHeadsUp();
  const round = new Round(table);

  const htmlRound = new HTMLRound(round);

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
testHeadsUpRoundActorsNameHtml();
