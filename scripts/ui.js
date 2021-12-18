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

class UiImg extends UiComponent {
  constructor() {
    super(document.createElement("img"));
  }
}

class UiImgCard extends UiImg {
  constructor(url) {
    super();
    this._root.src = url;
    this._root.alt = url;
    this._root.style.width = "40px";
    this._root.style.height = "40px";
  }
}

class UiCard extends UiComponent {
  /**
   *
   * @param {Card} card
   * @returns {string}
   */
  static getUrl = (card) =>
    `img/cards/${card
      .getFaceValue()
      .toString()
      .padStart(2, "0")}-${card.getSuit()}.png`;

  constructor(card) {
    super(document.createElement("div"));
    this._card = card;
    this._id = card.getString();
    const url = UiCard.getUrl(card);
    this._uiImgFace = new UiImgCard(url);
    this._uiImgBack = new UiImgCard(`img/cards/JOKER-RED.png`);
    this.replaceChildrenUi(this._uiImgBack);
  }

  id = () => this._id;
}

/**
 * "Controlled" Component
 */
class UiCardsHolder extends UiComponent {
  constructor() {
    super();
    this._root.className += "blackjack-card-holder";
    this._root.style.height = "50px";

    this._uiCards = [];
    this._cardsRef = {};
  }
  /**
   *
   * @param {UiCard} uiCard
   */
  addUiCard = (uiCard) => {
    this._uiCards.push(uiCard);
    this._uiCardsRef = { [uiCard.id()]: uiCard, ...this._uiCardsRef };
    this.appendChildUi(uiCard);
  };
}

/**
 *
 * @param {Card[]} cards
 */
const newUiCardsHolder = (cards) => {
  const uiCardHolder = new UiCardsHolder();
  for (const c of cards) {
    const uiC = new UiCard(c);
    uiCardHolder.addUiCard(uiC);
  }

  return uiCardHolder;
};

class UiHand extends UiComponent {
  /**
   *
   * @param {Hand} hand
   */
  constructor(hand) {
    super(document.createElement("div"));
    /** @private @const {Hand} */
    this._hand = hand;

    this._uiCount = new UiComponent();

    this._uiCardsHolder = newUiCardsHolder(this._hand.getCards());

    this._id = this._hand.id();
    this._root.setAttribute("id", this._id);
    this._root.setAttribute("class", "blackjack-hand");
    this._root.style.width = "100px";
    this._root.style.height = "200px";
    this._root.style.border = "1px solid black";
    this._hand.setOnAddCard((card) => {
      console.log(`card transferred ${card.getString()}`);
      const uiCard = new UiCard(card);
      this._uiCardsHolder.addUiCard(uiCard);
      this._refreshUiCardsCount();
    });

    this._uiBetAmount = new UiText();
    this._refreshUiCardsCount();
  }
  id = () => this._id;

  _refreshUiCardsCount = () => {
    setUiTextContent(this._uiCount, `[${this._hand.count()}]`);
  };
  unfocus = (phase) => {
    console.group(`Phase [${phase.desc()}] unfocus ui hand [${this.id()}]`);
    if (phase === RoundPhase.BET) {
      this.replaceChildrenUi(
        this._uiCount,
        this._uiCardsHolder,
        this._uiBetAmount
      );
    }
    console.groupEnd();
  };
  focus = (phase, player, round) => {
    if (!round) {
      throw `no round?`;
    }

    if (!player) {
      throw `no player?`;
    }
    console.group(`Phase [${phase.desc()}] focus ui hand [${this.id()}]`);
    if (phase === RoundPhase.BET) {
      this._hand.setOnSetBet((betValue) => {
        this._uiBetAmount.setTextContent(`Bet Value [${betValue}]`);
      });
      const [_uiButtonBet__, _uiSlider__] = newBetControl(
        player,
        round,
        this._hand
      );
      this.replaceChildrenUi(
        this._uiCount,
        this._uiCardsHolder,
        _uiButtonBet__,
        _uiSlider__
      );
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
  const credit = player.getPlayableCredit();

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

class UiHandsHolder extends UiComponent {
  constructor() {
    super();

    this._hands = [];

    /** @private { Object.<string,UiHand>} */
    this._handsRef = {};
  }
  addUiHand = (uiHand) => {
    this.appendChildUi(uiHand);
    this._hands.push(uiHand);
    this._handsRef = { [uiHand.id()]: uiHand, ...this._handsRef };
  };

  unfocusAll = (phase) => {
    for (const [id, uiH] of Object.entries(this._handsRef)) {
      uiH.unfocus(phase);
    }
  };

  focusHandById = (id, phase, player, round) => {
    this._handsRef[id].focus(phase, player, round);
  };
  unfocusHandById = (id, phase) => {
    this._handsRef[id].unfocus(phase);
  };
  count = () => this._hands.length;
}

/**
 *
 * @param {Hands[]} hands
 * @returns {UiHandsHolder}
 */
const newUiHandsHolder = (hands) => {
  const uiHandsHolder = new UiHandsHolder();
  for (const h of hands) {
    const uiH = new UiHand(h);
    uiHandsHolder.addUiHand(uiH);
  }
  return uiHandsHolder;
};
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

    this._uiHandsHolder = newUiHandsHolder(this._actor.getHands());

    /** @private @const {Ui[]} */
    this._uiCredit = newUiCredit(this._actor.getCredit());

    // IMPORTANT FOR REFERENCE
    this._id = actor.id();

    this._actor.setOnNewHand((hand) => {
      console.group(`_addUiHands`);
      console.log(`adding ui hand`);

      const uiHand = new UiHand(hand);
      this._uiHandsHolder.addUiHand(uiHand);
      console.groupEnd();
    });
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

  getUiHandById = (id) => this._uiHandsHolder.getHandById(id);
  getUiHandsCount = () => {
    return this._uiHandsHolder.count();
  };
}

const newUiHand = (hand) => {
  return new UiHand(hand);
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
    this._uiHandsHolder.unfocusHandById(handId, phase);
  };

  focusHandById = (handId, phase, round) => {
    if (!handId) {
      return;
    }
    this._uiHandsHolder.focusHandById(handId, phase, this._actor, round);
  };

  unfocusThisPlayer = (phase) => {
    console.group(
      `Render:Unfocus, Component:Player [${this._actor.getName()}], Phase:${phase.desc()} `
    );
    switch (phase) {
      case RoundPhase.IN_PLAY_PLAYERS:
        this.replaceChildrenUi(this.getUiName(), this._uiHandsHolder);
        break;
      case RoundPhase.BET:
        this._uiHandsHolder.unfocusAll(phase);
        this._root.style.border = "1px solid black";
        this._root.style.borderRadius = "7px";
        this.replaceChildrenUi(this.getUiName(), this._uiHandsHolder);
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
      `Render:Focus, Component:Player [${this._actor.getName()}], Phase:${phase.desc()} `
    );
    switch (phase) {
      case RoundPhase.IN_PLAY_PLAYERS:
        this.replaceChildrenUi(this.getUiName(), this._uiHandsHolder);
        break;
      case RoundPhase.BET:
        this._root.style.border = "1px solid turquoise";
        this._root.style.borderRadius = "7px";
        this.replaceChildrenUi(this.getUiName(), this._uiHandsHolder);
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
  }

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
      this._uiHandsHolder.unfocusAll(phase);
      this.replaceChildrenUi(this.getUiName(), this._uiHandsHolder);
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
    uiPlayer.focusThisPlayer(phase);
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

  const gotDealerUiHandsLength = uiRound.getUiDealer().getUiHandsCount();
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
