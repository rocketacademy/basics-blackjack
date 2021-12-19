class Actor {
  /**
   *
   * @param {Participant} participant
   */
  constructor(participant) {}
}

/**
 *
 * @param {*} participant
 * @returns
 */
class Player extends Actor {
  /**
   *
   * @param {Participant} participant
   */
  constructor(participant) {
    super(participant);
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
