// TABLE

class Lounge {
  constructor() {
    /** @private @const {Partipants[]} */
    this._players = [];
    this._dealer = null;
    /** @private @const {Card[]} */
    this._shoe = null;
  }
  getPlayers = () => this._players;
  addPlayer = (p) => this._players.push(p);
  setDealer = (d) => (this._dealer = d);
  getDealer = () => this._dealer;
  playerCount = () => this._players.length;
  dealerCount = () => (!!this._dealer ? 1 : 0);
  participantCount = () => this.playerCount() + this.dealerCount();
  /**
   *
   * @param {number} decks
   */
  generateShoe = (sets) => {
    this._shoe = Deck.generateDeck(sets);
  };
  getShoe = () => this._shoe;
  shoeSize = () => this._shoe.length;
}
