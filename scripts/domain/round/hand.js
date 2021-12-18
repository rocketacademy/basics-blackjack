// HAND

class HandStatus {
  static IN_PLAY = new HandStatus();
  static SETTLED = new HandStatus();
  constructor() {}
}

class Hand {
  constructor() {
    /** @private @const {Card[]} */
    this._cards = [];
    /** @private @const {number} */
    this._mainBet = null;
    this._sponsor = null;
    this._status = HandStatus.IN_PLAY;
    this._id = uuidv4();
  }
  desc = () => `${this._cards.forEach((c) => `(${c.getString()})`)}`;
  id = () => this._id;

  setBet = (amt) => {
    this._mainBet = amt;
    this._onSetBet(this._mainBet);
  };
  addBet = (amt) => this.setBet(this._mainBet + amt);
  setSponsor = (player) => (this._sponsor = player);

  getBet = () => this._mainBet;
  /**
   *
   * @param {Card} card
   */
  addCard = (card) => {
    this._cards.push(card);
    this._onAddCard(card);
  };

  getCards = () => this._cards;
  count = () => this._cards.length;
  getFaceValue = () => {
    return this._cards.reduce((sum, currentCard, _) => {
      return (sum += currentCard.getFaceValue());
    }, 0);
  };

  // Hooks
  _onAddCard = (card) => {};
  setOnAddCard = (cb) => (this._onAddCard = cb);
  _onSetBet = (bet) => {};
  setOnSetBet = (cb) => {
    this._onSetBet = cb;
  };
  flipPosition = (position) => {
    const card = this._cards[position];
    if (card === null || card === undefined) {
      throw new Error(
        `Breaking, please check logic. No card to flip on position ${position}`
      );
    }

    card.flip(true);
  };
  signalActive = (isActive, phase, player, round) => {
    const anyNUll = [isActive, phase, player, round].some(
      (o) => o === undefined || o === null
    );
    if (anyNUll) {
      throw `Ui Hook[onActiveSignal] active[${isActive}] phase[${phase.desc()}] player[${player}] round[${round}]`;
    }

    this._onActiveSignal(isActive, phase, player, round);
  };
  _onActiveSignal = (isActive, phase, player, round) => {
    throw `No Default [_onActiveSignal]`;
  };
  setOnActiveSignal = (cb) => (this._onActiveSignal = cb);
}

// Domain
// Root Configuration
// Children

/**
 * newHand
 * @returns {Hand}
 */
const newHand = () => {
  return new Hand();
};

/**
 *
 * @param {Actor} actors
 */
const createHands = (actors) => {
  for (const actor of actors) {
    actor.createNewHand();
  }
};
