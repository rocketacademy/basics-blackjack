class UiTree extends Ui_Component {
  static UI_ROOT = ROOT_BLACKJACK_ELEMENT;

  constructor() {
    super();
    /** @private {HTMLElement} */
    this._parentRoot = null;
  }

  _reAttachGlobalRoot = () => {
    console.group("Attaching to global root");
    console.log(this._parentRoot);
    this.detachGlobalRoot();
    this.attachGlobalRoot();
    console.groupEnd();
  };

  attachGlobalRoot = () => {
    this._parentRoot.appendChild(this.getRoot());
  };
  detachGlobalRoot = () => {
    console.group(`detachGlobalRoot`);
    this._parentRoot.removeChild(this.getRoot());
    console.groupEnd();
  };
  getParentRoot = () => this._parentRoot;
  render = () => {
    this.attachGlobalRoot();
  };

  /**
   * @param {HTMLElement} root
   */
  setUiParentRoot = (root) => {
    this._parentRoot = root;
  };
}

class UiLounge extends UiTree {
  constructor(lounge) {
    super();
  }
}

class UiSeatsHolder extends Ui_Aggregate {
  _style = () => {
    this._root.style.flexDirection = "row";
    this._root.style.justifyContent = "space-around";
  };

  constructor() {
    super();
    // Root Configuration
    this._root.className += ` blackjack-holder-seats`;

    // Children
    /** @private @const {UiSeat[]}} */
    this._uiSeats = [];
    /** @private @const {Object.<string,UiSeat>}} */
    this._uiSeatsRef = {};

    this._style();
  }

  /**
   *
   * @param {UiSeat} uiSeat
   */
  addUiSeat = (uiSeat) => {
    this._uiSeats.push(uiSeat);
    this._uiSeatsRef = { [uiSeat.id()]: uiSeat, ...this._uiSeatsRef };
    this.appendChildUi(uiSeat);
  };

  get = (index) => this._uiSeats[index];
}

class UiPlayersHolder extends Ui_Aggregate {
  constructor() {
    super();
    // Root Configuration
    this._style();
    this._root.className += ` blackjack-holder-player`;

    // Children
    /** @private @const {UiPlayer[]}} */
    this._uIPlayers = [];
    /** @private @const {Object.<string,UiPlayer>}} */
    this._uiPlayersRef = {};
  }

  _style = () => {
    this._root.style.flexDirection = "row";
    this._root.style.justifyContent = "space-around";
  };

  addUiPlayer = (uiPlayer) => {
    this._uIPlayers.push(uiPlayer);
    this._uiPlayersRef = { [uiPlayer.id()]: uiPlayer, ...this._uiPlayersRef };
    this.appendChildUi(uiPlayer);
  };
}

class UiPhaseDisplay extends Ui_Text {
  constructor() {
    super(document.createElement("div"));
  }
}

class UiRound extends UiTree {
  /**
   *
   * @param {Dealer} dealer
   * @returns {UiDealer}
   */
  _newUiDealer = (dealer) => {
    if (!dealer) {
      throw new Error(`no dealer`);
    }
    const uiD = new UiDealer(dealer);
    return uiD;
  };

  _style = () => {
    this._root.style.border = "1px dotted black";
    this._root.style.borderRadius = "15px";
    this._root.style.flexDirection = "column";
  };

  _newUiSeatsHolder = (generator) => {
    const uiSH = new UiSeatsHolder();

    let limiter = 7;
    let seat = generator.next();
    while (seat) {
      if (limiter == 0) {
        throw new Error(`Non-compliance CRA-V6-Appendix “A”`);
      }
      uiSH.addUiSeat(newUiSeat(seat));
      seat = generator.next();
      limiter -= 1;
    }

    return uiSH;
  };

  /**
   *
   * @param {Round} round
   */
  constructor(round) {
    super();
    // Domain
    /** @private @const {Round} */
    this._round = round;
    this._root.id = `${uuidv4()}`;
    this._root.className += ` ui-blackjack-round`;
    /** @private @const {UiPlayersHolder} */
    //TEMP this._uiPlayersHolder = this.__newUiPlayerHolders(this._round.getPlayers());

    /** @private @const {UiDealer} */
    this._uiDealer = this._newUiDealer(this._round.getDealer());

    const seatGen = this._round.getSeatGenerator();

    /** @private @const {UiSeat[]} */
    this._uiSeatHolder = this._newUiSeatsHolder(seatGen);
    // this._uiSeats = [new Ui_Component(), new Ui_Component()];

    /** @private @const {UiPhaseDisplay} */
    this._uiPhaseDisplay = new UiPhaseDisplay();

    // Hooks

    this._round.setOnSetPhase((phase) => {
      console.group(`on Set Phase Callback`);
      this._uiPhaseDisplay.setTextContent(phase.desc());
      console.groupEnd();
    });

    this._style();
    this.replaceChildrenUi(
      this._uiDealer,
      this._uiPhaseDisplay,
      this._uiSeatHolder
    );
  }

  getUiDealer = () => this._uiDealer;
  getUiRoundPhaseDisplay = () => this._uiPhaseDisplay;

  getUiSeat = (pos) => {
    if (pos === undefined || pos === null) {
      throw new Error(`require not null arg pos`);
    }

    return this._uiSeatHolder.get(pos);
  };
  setOnFinish = (cb) => {
    this._round.setOnFinish((lounge, isContinue) => {
      cb(lounge, isContinue);
      this.detachGlobalRoot();
    });
    return this;
  };
}
