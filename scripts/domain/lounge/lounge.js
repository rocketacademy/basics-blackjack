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
   * @param {number} sets
   */
  generateShoe = (sets, isToRiffle = true) => {
    this._shoe = Deck.generateDeck(sets);
    if (isToRiffle) {
      const le = this._shoe.length;
      for (let i = 0; i < le; i += 1) {
        const j = Math.floor(Math.random() * (le - i)) + i;
        [this._shoe[j], this._shoe[i]] = [this._shoe[i], this._shoe[j]];
      }
    }
  };

  __generateEmptyShoe = () => {
    this._shoe = Deck.generateEmptyDeck();
  };
  addCardToShoe = (card) => {
    this._shoe.push(card);
  };
  getShoe = () => this._shoe;
  shoeSize = () => this._shoe.length;
}
