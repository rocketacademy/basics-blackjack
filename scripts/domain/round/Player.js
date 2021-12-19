/**
 *
 * @param {Participant} participant
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

  getName = () => this._participant.getName();
}
