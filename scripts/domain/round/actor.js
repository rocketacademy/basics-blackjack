class Actor {
  /**
   *
   * @param {Participant} participant
   */
  constructor(participant) {
    this._participant = participant;
  }
}

class Dealer extends Actor {
  static HOLE_CARD_POSITION = Hand.SECOND_CARD; // 2, as in second card
  /**
   * @param {Participant} participant
   */
  constructor(participant) {
    super(participant);
  }
}
