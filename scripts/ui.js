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
}

class UiButtonBet extends UiButton {
  constructor() {
    super();
    this.uIDesc = new UiText();
    this.uIDesc.setTextContent("BET");
    this.uIBetValue = new UiText();
    this._betValue = null;
    this._root.style.fontSize = "11px";
    this._root.style.display = "flex";
    this.replaceChildrenUi(this.uIDesc, this.uIBetValue);
  }

  setBetValue = (v) => {
    this._betValue = v;
    this.uIBetValue.setTextContent(`: ${this._betValue}`);
  };

  getButtonValue = () => this._betValue;

  setOnMouseClick = (cb) => (this._root.onclick = () => cb(this._betValue));
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

class UiText extends UiComponent {
  constructor(element) {
    super(element);
  }

  setTextContent = (text) => {
    this._root.textContent = text;
  };

  getTextContent = () => {
    return this._root.textContent;
  };
}
class UiPhaseDisplay extends UiText {
  constructor() {
    super(document.createElement("div"));
  }
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

    this._id = hand.id();
    this._root.setAttribute("id", this._id);
    this._root.setAttribute("class", "blackjack-hand");
    this._root.style.width = "100px";
    this._root.style.height = "200px";
    this._root.style.border = "1px solid black";
    this._hand.setOnAddCard((card) => {
      console.log(`card transferred ${card.getString()}`);
      this._refreshUiCards();
    });

    this._uiBetAmount = new UiText();

    this._refreshUiCards();
  }
  id = () => this._id;

  _refreshUiCards = () => {
    this._uiCount.getRoot().textContent = `[${this._hand.count()}]`;
  };
  unfocus = (phase) => {
    console.group(`Phase [${phase.desc()}] unfocus ui hand [${this.id()}]`);
    if (phase === RoundPhase.BET) {
      this.replaceChildrenUi(this._uiCount, this._uiBetAmount);
    }
    console.groupEnd();
  };
  focus = (phase, player, round) => {
    console.group(`Phase [${phase.desc()}] focus ui hand [${this.id()}]`);
    if (phase === RoundPhase.BET) {
      this._hand.setOnSetBet((betValue) => {
        this._uiBetAmount.setTextContent(`Bet Value${betValue}`);
      });
      const [_uiButtonBet__, _uiSlider__] = newBetControl(
        player,
        round,
        this._hand
      );
      this.replaceChildrenUi(this._uiCount, _uiButtonBet__, _uiSlider__);
    }
    console.groupEnd();
  };
}

class UiSlider extends UiComponent {
  constructor() {
    super(document.createElement("input"));
    this._root.className += " black-jack-bet-slider";
    this._root.type = "range";
    this._root.step = 1;
  }

  setMin = (num = 0) => {
    this._root.min = num;
  };
  setMax = (num) => {
    this._root.max = num;
  };
  setValue = (val) => {
    this._root.value = val;
  };
  setOnRangeChange = (fn) => {
    this._root.oninput = fn;
  };
}
const newBetControl = (player, round, hand) => {
  const credit = player.getCredit();

  const initBetValue = 0;
  const _uiButtonBet__ = new UiButtonBet();
  _uiButtonBet__.setOnMouseClick((betValue) => {
    console.log("clicked??");

    console.log(player, round, betValue);
    round.requestBet(player, hand, betValue);
  });
  const _uiSlider__ = new UiSlider();
  _uiSlider__.setMax(credit);
  _uiSlider__.setValue(initBetValue);

  _uiSlider__.setOnRangeChange((e) => {
    const v = e.target.value;
    _uiSlider__.value = v;
    _uiButtonBet__.setBetValue(v);
  });
  return [_uiButtonBet__, _uiSlider__];
};
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

    this._uiHandsRef = this._uiHands.reduce((refs, thisUiP) => {
      const id = thisUiP.id();
      return { ...refs, [id]: thisUiP };
    }, {});

    /** @private @const {Ui[]} */
    this._uiCredit = newUiCredit(this._actor.getCredit());

    // IMPORTANT FOR REFERENCE
    this._id = actor.id();
  }
  /**
   *
   * @returns {HTMLDivElement}
   */
  getUiName = () => this._uiName;
  setNameColor = (val) => {
    if (!val) {
      return;
    }
    setUiStyle(this.getUiName(), "color", val);
  };
  setOnNewHand = (cb) => this._actor.setOnNewHand(cb);

  _addUiHand = (hand) => {
    console.group(`_addUiHands`);
    console.log(`adding ui hand`);
    const uiHand = newUiHand(hand);
    this._uiHands.push(uiHand);
    this._uiHandsRef = { [hand.id()]: uiHand, ...this._uiHandsRef };
    console.log(`replace children of uiActor`);
    this.replaceChildrenUi(this._uiName, ...this.getUiHands());
    console.groupEnd();
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

    this._initComponent();
  }

  id = () => this._id;
  _initComponent = () => {
    this.setNameColor("red");
  };

  unfocusHandById = (handId, phase) => {
    if (!handId) {
      return;
    }
    const uiHand = this._uiHandsRef[handId];
    uiHand.unfocus(phase);
  };

  focusHandById = (handId, phase, round) => {
    if (!handId) {
      return;
    }
    const uiHand = this._uiHandsRef[handId];
    uiHand.focus(phase, this._actor, round);
  };

  unfocusThisPlayer = (phase) => {
    console.group(
      `Render:Unfocus, Component:Player [${this._actor.getName()}], Phase:${phase.desc()} `
    );
    switch (phase) {
      case RoundPhase.IN_PLAY_PLAYERS:
        this.replaceChildrenUi(this.getUiName(), ...this.getUiHands());
        break;
      case RoundPhase.BET:
        for (const uiH of this.getUiHands()) {
          uiH.unfocus(phase);
        }
        this._root.style.border = "1px solid black";
        this._root.style.borderRadius = "7px";
        this.replaceChildrenUi(this.getUiName(), ...this.getUiHands());
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
  focus = (phase) => {
    console.group(
      `Render:Focus, Component:Player [${this._actor.getName()}], Phase:${phase.desc()} `
    );
    switch (phase) {
      case RoundPhase.IN_PLAY_PLAYERS:
        this.replaceChildrenUi(this.getUiName(), ...this.getUiHands());
        break;
      case RoundPhase.BET:
        this._root.style.border = "1px solid turquoise";
        this._root.style.borderRadius = "7px";
        this.replaceChildrenUi(this.getUiName(), ...this.getUiHands());
        break;
      default:
        this.replaceChildrenUi(this.getUiName());
        break;
    }
    console.groupEnd();
  };
}
class UiDealer extends UiActor {
  /**
   * @param {Dealer} dealer
   */
  constructor(dealer) {
    super(dealer);
    this._initComponent();
  }

  _initComponent = () => {
    this.setNameColor();
  };

  /**
   *
   * @param {RoundPhase} phase
   * @returns
   */
  focus = (phase) => {
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

  unfocusThisDealer = (phase) => {
    if (phase === RoundPhase.BET) {
      console.log(
        `Phase ${phase.desc()} Render:Active Dealer with no of hands:  ${
          this.getUiHands().length
        }`
      );
      for (const uiH of this.getUiHands()) {
        uiH.unfocus(phase);
      }
      this.replaceChildrenUi(this.getUiName(), ...this.getUiHands());
    }
  };
}

class UiTree extends UiComponent {
  static UI_ROOT = document.getElementById("root-ui-blackjack");

  constructor() {
    super(document.createElement("div"));
  }

  _attachGlobalRoot = () => UiTree.UI_ROOT.replaceChildren(this.getRoot());
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

    /** @private @const {UiDealer} */
    this._uiDealer = null;

    /** @private @const {UiPhaseDisplay} */
    this._uiPhaseDisplay = null;

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

  getUiPhaseDisplay = () => {
    return this._uiPhaseDisplay;
  };
  _initializeUiDisplayPhase = () => {
    this._uiPhaseDisplay = new UiPhaseDisplay();
  };

  _initializeUiDealer = () => {
    this._uiDealer = newUiDealer(this._round.getDealer());
  };
  _initializeUiPlayers = () => {
    this._uiPlayers = newUiPlayers(this._round.getPlayers());

    this._uiPlayers.forEach((uIP) => {
      uIP.setOnNewHand((hand) => {
        uIP._addUiHand(hand);
      });
    });
    this._uiPlayersRef = this._uiPlayers.reduce((refs, thisUiP) => {
      const id = thisUiP.id();
      return { ...refs, [id]: thisUiP };
    }, {});
  };
  initializeComponents = () => {
    this._initializeUiDisplayPhase();
    this._initializeUiPlayers();
    this._initializeUiDealer();
  };

  initializeRenderCallbacks = () => {
    this._uiDealer.setOnNewHand((hand) => {
      this._uiDealer._addUiHand(hand);
    });

    this._round.setOnChangeBetTurn(
      (prevPlayer, prevHand, newPlayer, newHand, phase) => {
        const [prevPlayerId, newPlayerId] = [prevPlayer?.id(), newPlayer?.id()];
        this.changeFocusUiPlayerById(prevPlayerId, newPlayerId, phase);
        const [prevHandId, newHandId] = [prevHand?.id(), newHand?.id()];

        this.changeFocusUiHandbyId(
          prevPlayerId,
          prevHandId,
          newPlayerId,
          newHandId,
          phase
        );
      }
    );

    this._round.setOnSetPhase((phase) => {
      this._refreshDisplayPhase();
      switch (phase) {
        case RoundPhase.BET:
          console.log(`on phase change refresh for round phase bet`);

          this.replaceChildrenUi(
            this._uiPhaseDisplay,
            this._uiDealer,
            ...this.getUiPlayers()
          );
          break;
      }
    });

    this._round.setOnSetPhaseCompleted((phase) => {
      console.log("setOnSetPhaseCompleted");
      this._uiDealer.unfocusThisDealer(phase);
      for (const uIP of this.getUiPlayers()) {
        uIP.unfocusThisPlayer(phase);
      }
    });
  };

  attachToGlobalRoot = () => {
    console.log("Attaching to global root");
    this._attachGlobalRoot();
  };

  _refreshDisplayPhase = () => {
    const text = "ROUND STATUS: " + this._round.getPhase()?.desc();
    console.warn(`REPROP PHASE DISPLAY ${text}`);
    this._uiPhaseDisplay.setTextContent(text);
  };

  changeFocusUiPlayerById = (unfocusPlayerId, focusPlayerId, phase) => {
    const [unfocusUiPlayer, focusUiPlayer] = [
      this.getUiPlayerById(unfocusPlayerId),
      this.getUiPlayerById(focusPlayerId),
    ];
    this.changeFocusUiPlayer(unfocusUiPlayer, focusUiPlayer, phase);
  };

  changeFocusUiHandbyId = (
    prevPlayerId,
    prevHandId,
    newPlayerId,
    newHandId,
    phase
  ) => {
    const [prevUiPlayer, newUiPlayer] = [
      this.getUiPlayerById(prevPlayerId),
      this.getUiPlayerById(newPlayerId),
    ];
    prevUiPlayer?.unfocusHandById(prevHandId, phase);
    newUiPlayer?.focusHandById(newHandId, phase, this._round);
  };
  /**
   *
   * @param {UiPlayer} unfocusUiPlayer
   * @param {UiPlayer} focusUiPlayer
   * @param {RoundPhase} phase
   */
  changeFocusUiPlayer = (unfocusUiPlayer, focusUiPlayer, phase) => {
    this.unfocusUiPlayer(unfocusUiPlayer, phase);
    this.focusUiPlayer(focusUiPlayer, phase);
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
    uiPlayer.focus(phase);
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
    uiPlayer.unfocusThisPlayer(phase);
  };
}

/**
 *
 * @param {Round} round
 * @returns {UiRound}
 */
const newUiRound = (round) => {
  const uiRound = new UiRound(round);
  uiRound.initializeComponents();
  uiRound.initializeRenderCallbacks();
  uiRound.attachToGlobalRoot();
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
  const uiRound = newUiRound(round);
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
  round.requestBet(player2, handPlayer2_1, 1); // End of bets, // [BET] --> DEAL --> [IN_PLAY_PLAYER]

  expectedPhase = RoundPhase.IN_PLAY_PLAYERS;
  actualPhase = round.getPhase();
  LOG_ASSERT(
    expectedPhase === actualPhase,
    `Phase 00003 DONE`,
    `? Phase 00003 ${expectedPhase.desc()} ${actualPhase.desc()}`
  );

  round.requestStand(handPlayer1_1);
  round.requestStand(handPlayer2_1); // End of players, // [IN_PLAY_PLAYER] --> IN_PLAY_DEALER --> [END]

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
console.log(`---test_Main_Ui_Til_BET TEST---`);

const test_Main_Ui_Til_BET = () => {
  console.group("test_Main_Ui_Til_BET");
  const table = newTableTwoPlayers();
  const round = new Round(table);
  const uiRound = newUiRound(round);
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

  const expectPhaseDisplayValue = `ROUND STATUS: BETTING`;
  const gotPhaseDisplayValue = uiRound.getUiPhaseDisplay().getTextContent();
  LOG_ASSERT(
    expectPhaseDisplayValue === gotPhaseDisplayValue,
    ``,
    `expected ${expectPhaseDisplayValue} got ${gotPhaseDisplayValue}`
  );

  const gotDealerUiHandsLength = uiRound.getUiDealer().getUiHands().length;
  const gotDealerHandsLength = round.getDealer().getHands().length;
  LOG_ASSERT(1 === gotDealerHandsLength, ``, `Dealer should have one hand`);
  LOG_ASSERT(
    gotDealerUiHandsLength === gotDealerHandsLength,
    ``,
    `Ui Dealer does not reflect actual no. of hands`
  );
  console.groupEnd();
};

test_Main_Ui_Til_BET();
