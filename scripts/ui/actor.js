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
    this._style();
  }

  _style = () => {
    this._root.style.justifyContent = "center";
    this._root.style.marginTop = "10px";
    this._root.style.marginBottom = "10px";
    this._root.textContent = name;
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
    this._uiHandsHolder = newUiHandsHolder(this._actor.getHands());
    /** @private @const {Ui[]} */
    this._uiCredit = newUiCredit(this._actor.getCredit());

    // Hooks
    this._actor.setOnNewHand((hand) => {
      console.group(`_addUiHands`);
      console.log(`adding ui hand`);
      const uiHand = new UiHand(hand);
      this._uiHandsHolder.addUiHand(uiHand);
      console.groupEnd();
    });
  }

  _style = () => {
    this._root.style.flexDirection = "column";
  };
  id = () => this._id;
  /** @returns {HTMLDivElement}*/
  getUiName = () => this._uiName;

  _setNameColor = (val) => {
    if (!val) {
      return;
    }
    setUiStyle(this.getUiName(), "color", val);
  };

  getUiHandById = (id) => this._uiHandsHolder.getHandById(id);
  getUiHandsCount = () => {
    return this._uiHandsHolder.count();
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
    this._setNameColor("red");
  }

  unfocusHandById = (handId, phase) => {
    if (!handId) {
      return;
    }
    this._uiHandsHolder.unfocusHandById(handId, phase, true);
  };

  focusHandById = (handId, phase, round) => {
    if (!handId) {
      return;
    }
    this._uiHandsHolder.focusHandById(handId, phase, this._actor, round);
  };

  unfocusThisPlayer = (phase) => {
    console.group(
      `unfocusThisPlayer Render:Unfocus, Component:Player [${this._actor.getName()}], Phase:${phase.desc()} `
    );
    switch (phase) {
      case RoundPhase.IN_PLAY_PLAYERS:
        this._uiHandsHolder.unfocusHands(phase, false);
        this.replaceChildrenUi(this._uiHandsHolder, this.getUiName());
        break;
      case RoundPhase.BET:
        this._uiHandsHolder.unfocusHands(phase, false);
        this._root.style.border = "1px solid black";
        this._root.style.borderRadius = "7px";
        this.replaceChildrenUi(this._uiHandsHolder, this.getUiName());
        break;
      default:
        this.replaceChildrenUi(this.getUiName());
        break;
    }
    console.groupEnd();
  };

  /**
   *
   * @param {RoundPhase} phase
   * @returns
   */
  focusThisPlayer = (phase) => {
    console.group(
      `focusThisPlayer Render:Focus, Component:Player [${this._actor.getName()}], Phase:${phase.desc()} `
    );
    switch (phase) {
      case RoundPhase.IN_PLAY_PLAYERS:
        this.replaceChildrenUi(this._uiHandsHolder, this.getUiName());
        break;
      case RoundPhase.BET:
        this._root.style.border = "1px solid turquoise";
        this._root.style.borderRadius = "7px";
        this.replaceChildrenUi(this._uiHandsHolder, this.getUiName());
        break;
      default:
        this.replaceChildrenUi(this.getUiName());
        break;
    }
    console.groupEnd();
  };
}
class UiDealer extends Ui_Actor {
  /**
   * @param {Dealer} dealer
   */
  constructor(dealer) {
    super(dealer);

    this._root.className += " blackjack-ui-dealer";

    this._style();
  }
  _style = () => {
    this._root.style.alignItems = "center";
    this._root.style.marginBottom = "25px";
  };
  /**
   *
   * @param {RoundPhase} phase
   * @returns
   */
  focusThisDealer = (phase) => {
    console.group(
      `Render:Active Phase:${phase.desc()} Player:${this._actor.getName()}`
    );
    switch (phase) {
      case RoundPhase.IN_PLAY_PLAYERS:
        this.replaceChildrenUi(this.getUiName(), this._uiHandsHolder);
        break;
      case RoundPhase.BET:
        this.replaceChildrenUi(this.getUiName(), this._uiHandsHolder);
        break;
      default:
        this.replaceChildrenUi(this.getUiName(), this._uiHandsHolder);
        break;
    }
    console.groupEnd();
  };

  unfocusThisDealer = (phase) => {
    if (phase === RoundPhase.BET) {
      console.log(
        `Phase ${phase.desc()} Render:Active Dealer with no of hands:  ${this.getUiHandsCount()}`
      );
      this._uiHandsHolder.unfocusHands(phase, true);
      this.replaceChildrenUi(this.getUiName(), this._uiHandsHolder);
    } else if (phase === RoundPhase.IN_PLAY_PLAYERS) {
      console.log(
        `Phase ${phase.desc()} Render:Active Dealer with no of hands:  ${this.getUiHandsCount()}`
      );
      this._uiHandsHolder.unfocusHands(phase, true);
      this.replaceChildrenUi(this.getUiName(), this._uiHandsHolder);
    }
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
