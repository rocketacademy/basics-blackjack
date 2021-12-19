// TABLE

class Lounge {
  constructor() {
    /** @private @const {Partipants[]} */
    this._players = [];
  }
  getPlayers = () => this._players;
}
