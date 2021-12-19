// TABLE

class Lounge {
  constructor() {
    /** @private @const {Partipants[]} */
    this._players = [];
    this._dealer = null;
  }
  getPlayers = () => this._players;
  addPlayer = (p) => this._players.push(p);
  setDealer = (d) => (this._dealer = d);
  playerCount = () => this._players.length;
  participantCount = () => this.playerCount() + this.dealerCount();
  dealerCount = () => (!!this._dealer ? 1 : 0);
}
