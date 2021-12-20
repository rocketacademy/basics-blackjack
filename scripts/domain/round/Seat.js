class Seat {
  constructor() {
    /** @private {Player} */
    this._chair = null;
    this._handList = new LinkedList();
    this._id = uuidv4();
  }
  getHandGenerator = () => {
    return this._handList.getElementGenerator();
  };

  getChair = () => this._chair;
  setChair = (chair) => {
    this._chair = chair;
  };
  _createNewHand = () => {
    const newHand = new Hand();
    this._handList.addElementTail(newHand);
    this._onCreateNewHand(newHand);
    return newHand;
  };
  setOnCreateNewHand = (cb) => {
    this._onCreateNewHand = cb;
  };

  createInitialHand = () => {
    if (!this._handList.isTrivial) {
      throw new Error(`This method is to create the first hand only`);
    }
    const hand = this._createNewHand();
    hand.setController(this._chair);

    return hand;
  };

  callForInitialBet = (dealer) => {
    const hand = this.createInitialHand(dealer);
    hand.placeYourInitialBet(dealer);
  };
  id = () => this._id;
}
