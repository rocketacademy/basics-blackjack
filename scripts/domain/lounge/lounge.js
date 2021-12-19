// TABLE

class Lounge {
  /**
   *
   * @param {Person[]} players
   * @param {Person} dealer
   */
  constructor(players, dealer) {
    /** @private @const {!Partipants[]} */
    this._players = players.map((player) => newParticipant(player));

    /** @private @const {!Partipants} */
    this._dealer = newParticipant(dealer);
  }

  getPlayers = () => this._players;
  getDealer = () => this._dealer;
  getActorsCount = () => this.getPlayers().length + (!!this.getDealer ? 1 : 0);
}

/**
 *
 * @param {Person[]} players
 * @param {Person} dealer
 * @returns {Table}
 */
const newLounge = (players, dealer) => {
  return new Lounge(players, dealer);
};

/**
 *
 * @param {Person} p1
 * @param {Person} dealer
 * @returns
 */
const newTableHeadsUp = (p1, dealer) => {
  p1 = p1 || newPerson(`p1`);
  const players = [p1];
  dealer = dealer || newPerson("D", 10000);

  return newLounge(players, dealer);
};

/**
 *
 * @param {Person} p1
 * @param {Person} dealer
 * @returns
 */
const newLoungeTwoPlayers = (p1, p2, dealer) => {
  p1 = p1 || newPerson(`p1`);
  p2 = p2 || newPerson(`p2`);
  const players = [p1, p2];
  dealer = dealer || newPerson("D_AgainstTwoPlayers", 10000);
  return newLounge(players, dealer);
};
