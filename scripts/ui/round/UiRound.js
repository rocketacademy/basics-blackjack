class Ui_ButtonEndView extends Ui_Button {
  constructor() {
    super();
    this._root.style.width = "100px";
    this._root.style.height = "22px";
    this._root.style.display = "flex";
    this._root.style.textAlign = "center";
  }

  setOnMouseClick = (cb) => (this._root.onclick = () => cb());
}

class UiButtonNewRound extends Ui_ButtonEndView {
  constructor() {
    super();
    this._root.style.backgroundColor = "blue";

    this._root.textContent = "New Round";
    this._root.className += " blackjack-button-new-round";
  }
}

class UiButtonGoToLounge extends Ui_ButtonEndView {
  constructor() {
    super();
    this._root.style.backgroundColor = "red";

    this._root.textContent = "Go To Lounge";
    this._root.className += " blackjack-button-go-to-lounge";
  }
}

class UiPhaseDisplay extends Ui_Text {
  constructor() {
    super(document.createElement("div"));

    this._root.className += " blackjack-display-round-phase";
  }
}

class UiEndWrap extends Ui_Aggregate {
  constructor() {
    super();
    this._root.style.display = "flex";
    this._root.style.justifyContent = "center";
  }

  addUiButton = (uiB) => {
    this.appendChildUi(uiB);
  };
}
class UiRound extends Ui_Tree {
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
    this._root.style.padding = "15px";
    this._root.style.flexDirection = "column";
    this._root.style.height = "100%";
    this._root.style.minHeight = "450px";
    this._root.style.marginBottom = "20px";
    this._root.style.justifiyContent = "center";
  };

  _newUiSeatHolder = (generator) => {
    const uiSH = new UiSeatHolder();

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
    this._uiSeatHolder = this._newUiSeatHolder(seatGen);
    // this._uiSeats = [new Ui_Component(), new Ui_Component()];

    /** @private @const {UiPhaseDisplay} */
    this._uiPhaseDisplay = new UiPhaseDisplay();

    this._uiDealer.addOnEndView((dealer) => {
      console.group(`ui round dealer request restart callback `);
      const btnR = new UiButtonNewRound();
      const btnL = new UiButtonGoToLounge();

      const newUiWrap = new UiEndWrap();
      newUiWrap.addUiButton(btnR);
      newUiWrap.addUiButton(btnL);

      btnR.setOnMouseClick(() => {
        dealer.requestNewRound();
      });

      btnL.setOnMouseClick(() => {
        dealer.requestGoToLounge();
      });

      this.replaceChildrenUi(
        this._uiDealer,
        this._uiPhaseDisplay,
        this._uiSeatHolder,
        newUiWrap
      );
      console.groupEnd();
    });
    // Domain Hooks

    this._round.setOnSetPhase((phase) => {
      console.group(`on Set Phase ui Callback`);
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
  setOnFinish = (bootstrapCb) => {
    this._round.setOnFinish((lounge, isContinue) => {
      this.detachGlobalRoot();

      bootstrapCb(lounge, isContinue);
    });
    return this;
  };
}
