class Seat {
  /**
   *
   * @param {Player} player
   */
  constructor(player) {
    this._chair = player;
  }

  getChair = () => this._chair;
}
