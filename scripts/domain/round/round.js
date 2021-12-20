// ROUND

// Round Phase

class RoundPhase {
  static _NULL = new RoundPhase(null);
  // CRA-V6-1.24
  static COMMENCE = new RoundPhase("COMMENCE");
  static INITIAL_BET = new RoundPhase("INITIAL BET");
  static INITIAL_DEAL = new RoundPhase("INITIAL DEAL");
  static IN_PLAY_PLAYERS = new RoundPhase("PLAY_PLAYERS");
  static IN_PLAY_DEALER = new RoundPhase("PLAY_DEALER");
  static END = new RoundPhase("END");

  constructor(desc) {
    this._desc = desc;
  }

  desc = () => this._desc;
}

class Round {
  __resetHooks = () => {
    this._onFinish = (lounge, isContinue) => {
      throw new Error(`Error. Callback[_onFinish] must be configured`);
    };
    this.setOnFinish = (fn) => {
      this._onFinish = fn;
    };
  };
  _newSeat = (player) => {
    if (!player) {
      throw new Error(`Player argument should not be null`);
    }

    const s = new Seat();
    s.setChair(player);
    return s;
  };

  _newSeatList = (players) => {
    const list = new LinkedList();

    const elements = players.map((p) => this._newSeat(p));
    list.relist(elements);
    return list;
  };

  /**
   *
   * @param {Lounge} lounge
   */
  constructor(lounge) {
    /** @private {Lounge} */
    this._lounge = lounge;

    this._phase = RoundPhase._NULL;
    this._dealer = new Dealer(lounge.getDealer());
    this._dealer.setRound(this);

    const players = lounge.getPlayers();
    this._seatList = this._newSeatList(players);

    this.__resetHooks();
  }

  getRootSeat = () => this._seatList.getRoot().getElement();
  peekFirstChair = () =>
    this._seatList.getRoot().next().getElement().getChair();

  getPhase = () => this._phase;
  _setPhase = (phase) => {
    this._phase = phase;

    this._onSetPhase(this._phase);
  };

  _onSetPhase = (phase) => {};

  setOnSetPhase = (cb) => {
    this._onSetPhase = cb;
  };
  /**
   *
   * @returns {Dealer}
   */
  getDealer = () => this._dealer;

  getSeatGenerator = () => {
    return this._seatList.getElementGenerator();
  };

  start = () => {
    console.group(`round.start`);
    this._setPhase(RoundPhase.COMMENCE);
    this._dealer.requestInitialBet();
    console.groupEnd();
  };
  finish = (isContinue) => {
    if (!(isContinue === false || isContinue === true)) {
      throw new Error(`Continue or not?`);
    }
    this._onFinish(this._lounge, isContinue);
    this.__resetHooks();
  };
}

newRound = (lounge) => {
  let reject = false;
  let rejectDescription = [];
  if (!lounge.getDealer()) {
    reject = true;
    rejectDescription.push(`newRound require a dealer.`);
  }
  if (!(lounge.getPlayers().length > 0)) {
    reject = true;
    rejectDescription.push(`newRound require at least one player.`);
  }

  if (reject) {
    throw new Error(rejectDescription.join(" "));
  }

  return new Round(lounge);
};
