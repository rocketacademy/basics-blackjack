class Actor {
  static FIRST_CARD = 0;
  static SECOND_CARD = 1;
  static THIRD_CARD = 2;
  static FOURTH_CARD = 3;
  static FIFTH_CARD = 4;

  /**
   *
   * @param {Participant} participant
   */
  constructor(participant) {
    this._id = uuidv4();

    /** @private @const {Participant} */
    this._participant = participant;

    /** @private @const {Hand[]} */
    this._hands = [];
  }

  id = () => this._id;

  /**
   * @returns {Hand[]}
   */
  getHands = () => this._hands;
  createNewHand = () => {
    const newHand = new Hand();
    this._hands.push(newHand);
    this._onNewHand(newHand);
    return newHand;
  };

  getParticipant = () => this._participant;
  getName = () => this._participant.getName();
  getCredit = () => this._participant.getCredit();
  decreaseCredit = (amt) => this._participant.decreaseCredit(amt);
  increaseCredit = (amt) => this._participant.increaseCredit(amt);

  _onNewHand = (hand) => {};
  setOnNewHand = (cb) => {
    this._onNewHand = cb;
  };
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

  getPlayableCredit = () => {
    const inBid = this.getHands().reduce((sum, hand) => {
      const bet = hand.getBet() || 0;
      return bet + sum;
    }, 0);

    return this.getCredit - inBid;
  };
}
/**
 *
 * @param {Participant} participant
 */
const newPlayer = (participant) => {
  return new Player(participant);
};

class Dealer extends Actor {
  static HOLE_CARD_POSITION = Actor.SECOND_CARD; // 2, as in second card
  /**
   * @param {Participant} participant
   */
  constructor(participant) {
    super(participant);
  }

  flipHoleCard = () => {
    const hands = this.getHands();

    const expectsNoOfHand = 1;
    if (hands.length !== expectsNoOfHand) {
      throw new Error(
        `Breaking! Expecting ${expectsNoOfHand}, or the logic will need reworks.`
      );
    }

    const hand = hands[0];
    hand.flipPosition(Dealer.HOLE_CARD_POSITION);
  };
}

const newDealer = (participant) => new Dealer(participant);

/**
 * Deal two cards from the deck to hands of actor.
 * @param {Actor} actor
 * @param {Card[]} deck
 */
const dealToHandsOfActor = (actor, deck) => {
  const hands = actor.getHands();
  for (const hand of hands) {
    dealToHandTwoOpen(deck, hand);
  }
};

const dealToHandsOfActors = (actors, deck) => {
  for (const actor of actors) {
    dealToHandsOfActor(actor, deck);
  }
};
