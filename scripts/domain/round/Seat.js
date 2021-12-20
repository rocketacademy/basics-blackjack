class Seat {
  constructor() {
    /** @private {Player} */
    this._chair = null;
    /** @private @const {Player} */
    this._hands = new RootVertex();
    this._id = uuidv4();
  }

  getChair = () => this._chair;
  setChair = (chair) => {
    this._chair = chair;
  };
  createNewHand = () => {
    this._hands.pu;
  };
  id = () => this._id;
}
