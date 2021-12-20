class _Actor {
  /**
   *
   * @param {Participant} participant
   */
  constructor(participant) {
    this._participant = participant;

    this._id = uuidv4();
  }

  id = () => this._id;

  getName = () => this._participant.getName();
  getCredit = () => this._participant.getCredit();
  decreaseCredit = (amt) => this._participant.decreaseCredit(amt);
}
