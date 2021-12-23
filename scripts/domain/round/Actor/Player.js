/**
 *
 * @param {Participant} participant
 * @returns
 */
class Player extends _Actor {
  /**
   *
   * @param {Participant} participant
   */
  constructor(participant) {
    super(participant);
  }

  awardPayout = (amt) => {
    this._participant.increaseCredit(amt);
    this._onPayout(amt);
  };
  stakeMainBet = (amt) => {
    this._participant.decreaseCredit(amt);
    this._onMainBetStaked(amt);
  };
  returnAnyBet = (amt) => {
    this._participant.increaseCredit(amt);
  };
  makanMainBetNotif = () => {
    this._onnMainBetCollected();
  };

  stakeDouble = (amt) => {
    this._participant.decreaseCredit(amt);
    this._onDoubleBetStaked(amt);
  };
  returnDoubleBet = (amt) => {
    this._participant.decreaseCredit(amt);
  };
  makanDoubleBetNotif = () => {
    this._onDoubleBetCollected();
  };
  getColor = () => this._participant.getWhackyColor();
  _onMainBetStaked = () => {};
  _onDoubleBetStaked = () => {};
  _onnMainBetCollected = () => {};
  _onDoubleBetCollected = () => {};
  _onPayout = () => {};
  setOnDoubleBetStaked = (cb) => (this._onDoubleBetStaked = cb);
  setOnMainBetCollectedByDealer = (cb) => (this._onnMainBetCollected = cb);
  setOnMainBetStaked = (cb) => (this._onMainBetStaked = cb);

  setOnDoubleBetCollectedByDealer = (cb) => (this._onDoubleBetCollected = cb);
  setOnPayout = (cb) => (this._onPayout = cb);
}
