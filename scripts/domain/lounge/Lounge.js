class Lounge {
  static MAX_PLAYERS = 5;
  constructor() {
    /** @private @const {Partipants[]} */
    this._players = [];
    this._dealer = null;
    /** @private @const {Card[]} */
    this._shoe = null;

    this._fakeId = 1;
  }
  //
  getPlayers = () => this._players;
  addPlayer = (p) => {
    this._players.push(p);
    this._onAddPlayer(p);
  };
  setDealer = (d) => (this._dealer = d);
  getDealer = () => this._dealer;
  playerCount = () => this._players.length;
  dealerCount = () => (!!this._dealer ? 1 : 0);
  participantCount = () => this.playerCount() + this.dealerCount();

  isFull = () => {
    console.log(`full ${this.playerCount()}`);
    return Lounge.MAX_PLAYERS === this.playerCount();
  };
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
  hasPlayablePlayers = () => {
    return this._players.some((p) => p.getCredit() > 0);
  };
  __generateEmptyShoe = () => {
    this._shoe = Deck.generateEmptyDeck();
  };
  addCardToShoe = (card) => {
    this._shoe.push(card);
  };
  getShoe = () => this._shoe;
  shoeSize = () => this._shoe.length;

  formPlayer = () => {
    this._fakeId += 1;
    const player = new Participant(`Player ${this._fakeId}`);
    this.addPlayer(player);
  };
  _onAddPlayer = (participant) => {};
  setOnFormPlayer = (cb) => (this._onAddPlayer = cb);
}
