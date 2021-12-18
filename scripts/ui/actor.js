class UiCredit extends Ui_Component {
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

class UiName extends Ui_Component {
  /** @param {!string} name */
  constructor(name) {
    super(document.createElement("div"));
    // Domain
    this.name = name;

    this._style();
  }

  _style = () => {
    this._root.style.justifyContent = "center";
    this._root.style.marginTop = "10px";
    this._root.style.marginBottom = "10px";
    this._root.textContent = this.name;
    this._root.class += `blackjack-name`;
  };
}

class Ui_Actor extends Ui_Component {
  /**
   *
   * @param {Actor} actor
   */
  constructor(actor) {
    super(document.createElement("div"));
    // Domain
    this._actor = actor;
    // Root Configuration
    this._id = actor.id();
    this._style();

    // Children

    /** @private @const {UiName} */
    this._uiName = new UiName(this._actor.getName());
    /** @private @const {UiHandsHolder} */
    this._uiHandsHolder = this._newUiHandsHolder(this._actor.getHands());
    /** @private @const {Ui[]} */
    this._uiCredit = newUiCredit(this._actor.getCredit());

    // Hooks
    this._actor.setOnNewHand((hand) => {
      console.group(`Ui Hook[On New Hand]`);
      const uiHand = new UiHand(hand);
      this._uiHandsHolder.addUiHand(uiHand);
      console.groupEnd();
    });
  }
  _style = () => {
    this._root.style.flexDirection = "column";
    this._root.style.height = "300px";
    this._root.style.width = "400px";
    this._root.style.border = "1px solid black";
    this._root.style.alignItems = "center";
  };
  _setNameColor = (val) => {
    if (!val) {
      return;
    }
    setUiStyle(this.getUiName(), "color", val);
  };

  id = () => this._id;

  getUiName = () => this._uiName;

  getUiHandsCount = () => {
    return this._uiHandsHolder.count();
  };

  /**
   *
   * @param {Hands[]} hands
   * @returns {UiHandsHolder}
   */
  _newUiHandsHolder = (hands) => {
    const uiHandsHolder = new UiHandsHolder();
    for (const h of hands) {
      const uiH = new UiHand(h);
      uiHandsHolder.addUiHand(uiH);
    }
    return uiHandsHolder;
  };
}

class UiPlayer extends Ui_Actor {
  /**
   * @param {Player} player
   */
  constructor(player) {
    super(player);

    // Root Configuration
    this._root.className += " blackjack-player";
    this._root.style.border = "1px solid blue";
    this._root.style.borderRadius = "7px";
    this._setNameColor("red");

    this.replaceChildrenUi(this.getUiName(), this._uiHandsHolder);
  }
}
class UiDealer extends Ui_Actor {
  /**
   * @param {Dealer} dealer
   */
  constructor(dealer) {
    super(dealer);
    // Root Configuration
    this._root.className += " blackjack-dealer";
    this._style();

    // Render
    this.replaceChildrenUi(this.getUiName(), this._uiHandsHolder);
  }
  _style = () => {
    this._root.style.marginBottom = "25px";
    this._root.style.alignSelf = "center";
  };
}
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
