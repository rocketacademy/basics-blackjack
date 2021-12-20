class Dealer extends _Actor {
  static HOLE_CARD_POSITION = Hand.SECOND_CARD; // 2, as in second card
  /**
   * @param {Participant} participant
   */
  constructor(participant) {
    super(participant);

    /** @private @const {Round} */
    this._round = null;
  }

  setRound = (round) => (this._round = round);
  getRound = () => this._round;

  commence = () => {
    // CRA-V6-3.1
    this.shout("Place your bets, please");
    this._round.start();
  };
  _onCommence = () => {};
  shout = (desc) => {
    this._onShout(desc);
  };

  requestInitialBet = () => {
    console.group(`requested initial bet to dealer`);

    if (this._round.getPhase() !== RoundPhase.COMMENCE) {
      throw new Error(
        `[requestInitialBet] Error! Round phase should be ${RoundPhase.COMMENCE}`
      );
    }
    let seatGen = this._round.getSeatGenerator();
    let activeSeat = seatGen.next();
    activeSeat.requestInitialBet();
    console.groupEnd();
  };

  /**
   * @param {string} desc
   */
  _onShout = (desc) => {};
  setOnShout = (cb) => {
    this._onShout = cb;
  };
}
