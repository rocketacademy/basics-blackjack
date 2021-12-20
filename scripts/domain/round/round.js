// ROUND

// Round Phase

class RoundPhase {
  static _NULL = new RoundPhase(null);
  // CRA-V6-1.24
  static COMMENCE = new RoundPhase("PLACE YOUR BETS, PLEASE");
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

  /**
   *
   * @param {Lounge} lounge
   */
  constructor(lounge) {
    /** @private {Lounge} */
    this._lounge = lounge;

    this._phase = RoundPhase._NULL;
    this._rootQueueSeat = new RootVertex();
    this._dealer = new Dealer(lounge.getDealer());
    this._dealer.setRound(this);
    const players = lounge.getPlayers();
    let thisVertexSeat = this._rootQueueSeat;
    for (const player of players) {
      const vertexSeat = new Vertex(newSeat(new Player(player)));
      thisVertexSeat.setNext(vertexSeat);
      thisVertexSeat = vertexSeat;
    }

    this.__resetHooks();
  }

  getRootSeat = () => this._rootQueueSeat.getElement();
  peekFirstChair = () => this._rootQueueSeat.peekNextElement().getChair();

  getPhase = () => this._phase;

  /**
   *
   * @returns {Dealer}
   */
  getDealer = () => this._dealer;

  getSeatGenerator = () => {
    return this._rootQueueSeat.getElementGenerator();
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
