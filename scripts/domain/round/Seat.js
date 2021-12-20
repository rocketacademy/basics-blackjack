class Seat {
  constructor() {
    /** @private {Player} */
    this._chair = null;

    this._id = uuidv4();
  }

  getChair = () => this._chair;
  setChair = (chair) => {
    this._chair = chair;
  };

  id = () => this._id;
}

const newSeat = (player) => {
  if (!player) {
    throw new Error(`Player argument should not be null`);
  }

  const s = new Seat();
  s.setChair(player);
  return s;
};
