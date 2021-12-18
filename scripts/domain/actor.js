



class Actor {
    /**
     *
     * @param {Participant} participant
     */
    constructor(participant) {
      /** @private @const {Participant} */
      this._participant = participant;
  
      /** @private @const {Hand[]} */
      this._hands = [];
      this._id = uuidv4();
    }
    /**
     * @returns {Hand[]}
     */
    getHands = () => this._hands;
    createNewHand = () => {
      const newHand = new Hand();
      this._hands.push(newHand);
      this.onNewHand(newHand);
      return newHand;
    };
    onNewHand = (hand) => {};
    setOnNewHand = (cb) => {
      this.onNewHand = cb;
    };
    getParticipant = () => this._participant;
    getName = () => this._participant.getName();
    getCredit = () => this._participant.getCredit();
    decreaseCredit = (amt) => this._participant.decreaseCredit(amt);
    increaseCredit = (amt) => this._participant.increaseCredit(amt);
    id = () => this._id;
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
    /**
     * @param {Participant} participant
     */
    constructor(participant) {
      super(participant);
    }
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
      dealToHand(deck, hand);
    }
  };
  
  const dealToHandsOfActors = (actors, deck) => {
    for (const actor of actors) {
      dealToHandsOfActor(actor, deck);
    }
  };