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
    this._root = element ? element : document.createElement("div");
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
        console.log("UiButtonchangeTurn no clicks found");
      });
    this._root.addEventListener("click", onClick);
  };
}

class UiButtonchangeTurn extends UiButton {
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

class UiButtonStandAll extends UiButton {
  constructor() {
    super();
    this._root.textContent = "Stand All";
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
    this._hand = hand;

    this._uiCount = new UiComponent();
    this._uiButtonBet = new UiButton();

    this._hand.setOnAddCard((card) => {
      console.log(`card transferred ${card.getString()}`);
      this._refreshUiCards();
    });
    this._refreshUiCards();
  }

  _refreshUiCards = () => {
    this._uiCount.getRoot().textContent = `[${this._hand.count()}]`;
  };

  render = (phase) => {
    console.group(`rendering ui hand on ${phase.desc()}`);
    if (phase === RoundPhase.BET) {
      this.replaceChildrenUi(this._uiCount, this._uiButtonBet);
    }
    console.groupEnd();
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
  setOnNewHand = (cb) => this._actor.setOnNewHand(cb);

  _addUiHand = (hand) => {
    this._uiHands.push(newUiHand(hand));
  };

  getUiHands = () => {
    return this._uiHands;
  };
}

const newUiHand = (hand) => {
  return new UiHand(hand);
};
/**
 *
 * @param {Actor} actor
 * @returns
 */
const newUiHands = (actor) => {
  return actor.getHands().map((hand) => newUiHand(hand));
};
class UiPlayer extends UiActor {
  /**
   * @param {Player} player
   */
  constructor(player) {
    super(player);

    this._uIButtonStandAll = new UiButtonStandAll();
    /** @private {UiHand[]} */
    this._uiHands = newUiHands(this._actor);
    this.initComponent();
  }

  id = () => this._id;
  initComponent = () => {
    this.setNameColor("red");
  };

  renderModeAudience = (phase) => {
    this.getUiHands().forEach((uiHand) => uiHand.render(phase));
    if (phase === RoundPhase.BET) {
      this.replaceChildrenUi(this.getUiName(), ...this.getUiHands());
    } else {
      this.replaceChildrenUi(this.getUiName(), ...this.getUiHands());
    }
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
        this.replaceChildrenUi(
          this.getUiName(),
          this._uIButtonStandAll,
          ...this.getUiHands()
        );
        break;
      case RoundPhase.BET:
        this.replaceChildrenUi(this.getUiName(), ...this.getUiHands());
        break;
      default:
        this.replaceChildrenUi(this.getUiName());
        break;
    }
    console.groupEnd();
  };
  setOnClickButtonStandAll = (cb) => this._uIButtonStandAll.setOnClick(cb);
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
        this.replaceChildrenUi(this.getUiName(), ...this._uiHands());
        break;
      case RoundPhase.BET:
        this.replaceChildrenUi(this.getUiName(), ...this._uiHands());
        break;
      default:
        this.replaceChildrenUi(this.getUiName(), ...this._uiHands());
        break;
    }

    console.groupEnd();
  };

  renderModeAudience = (phase) => {
    if (phase === RoundPhase.BET) {
      this.replaceChildrenUi(this.getUiName(), ...this.getUiHands());
    } else {
      this.replaceChildrenUi(this.getUiName(), ...this.getUiHands());
    }
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

  /**
   *
   * @param {number} id
   * @returns {UiPlayer}
   */
  getUiPlayerById = (id) => {
    return this._uiPlayersRef[id];
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
    this._uiDealer.setOnNewHand((hand) => {
      this._uiDealer._addUiHand(hand);
    });
  };
  initializeUiPlayers = () => {
    this._uiPlayers = newUiPlayers(this._round.getPlayers());

    this._uiPlayers.forEach((uIP) => {
      uIP.setOnClickButtonStandAll(this.onClickStandAllHandler);
      uIP.setOnNewHand((hand) => {
        uIP._addUiHand(hand);
      });
    });
    this._uiPlayersRef = this._uiPlayers.reduce((refs, thisUiP) => {
      const id = thisUiP.id();
      return { ...refs, [id]: thisUiP };
    }, {});
  };
  initialize = () => {
    this.initializeUiDisplayPhase();

    this.initializeUiPlayers();
    this.initializeButtonDummy();
    this.initializeUiDealer();

    this.attachGlobalRoot();
  };

  _refreshDisplayPhase = () => {
    this._uiPhaseDisplay.setTextContent(
      "ROUND STATUS: " + this._round.getPhase()?.desc()
    );
  };

  _refreshUiPlayers = () => {
    const phase = this._phaseUi;
    this._uiPlayers.forEach((uIP) => {
      this.unfocusUiPlayer(uIP, phase);
    });
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
  unfocusUiPlayer = (uiPlayer, phase) => {
    if (!uiPlayer) {
      return;
    }
    uiPlayer.renderModeAudience(phase);
    const root = uiPlayer.getRoot();
    root.style.border = "1px solid grey";
    root.style.borderRadius = "7px";
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

const test_Main_HeadsUp = () => {
  const table = newTableTwoPlayers();
  const round = new Round(table);
  const player1 = round.getPlayers()[0];
  const player2 = round.getPlayers()[1];

  let expectedPhase = RoundPhase._NULL;
  let actualPhase = round.getPhase();

  LOG_ASSERT(
    expectedPhase === actualPhase,
    `Phase 00001 DONE`,
    `? Phase 00001`
  );
  round.requestInitSitPhase(); // [_NULL] --> SIT --> [BET]

  expectedPhase = RoundPhase.BET;
  actualPhase = round.getPhase();
  LOG_ASSERT(
    expectedPhase === actualPhase,
    `Phase 00002 DONE`,
    `? Phase 00002 ${expectedPhase.desc()} ${actualPhase.desc()}`
  );
  const handPlayer1_1 = player1.getHands()[0];
  LOG_ASSERT(!!handPlayer1_1, undefined, `handPlayer1_1 missing`);
  round.requestBet(player1, handPlayer1_1, 1);
  const handPlayer2_1 = player2.getHands()[0];
  round.requestBet(player2, handPlayer2_1, 1);

  expectedPhase = RoundPhase.IN_PLAY_PLAYERS;
  actualPhase = round.getPhase();
  LOG_ASSERT(
    expectedPhase === actualPhase,
    `Phase 00003 DONE`,
    `? Phase 00003 ${expectedPhase.desc()} ${actualPhase.desc()}`
  );

  round.requestStand(handPlayer1_1);
  round.requestStand(handPlayer2_1);

  expectedPhase = RoundPhase.END;
  actualPhase = round.getPhase();
  LOG_ASSERT(
    expectedPhase === actualPhase,
    `Phase 00004 END DONE`,
    `? Phase 00004 Expects ${expectedPhase.desc()} Got ${actualPhase.desc()}`
  );
};

console.log(`---MAIN TEST---`);
test_Main_HeadsUp();
