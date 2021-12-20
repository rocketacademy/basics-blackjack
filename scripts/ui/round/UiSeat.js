class UiSeat extends Ui_Component {
  _style = () => {
    this._root.style.flexDirection = "column";
    this._root.style.height = "200px";
    this._root.style.width = "fit-content";
    this._root.style.minWidth = "150px";

    this._root.style.border = "1px solid black";
    this._root.style.alignItems = "center";
  };
  /**
   *
   * @param {Seat} seat
   */
  constructor(seat) {
    super();
    this._id = seat.id();
    this._style();
  }

  id = () => this._id;
}

const newUiSeat = (seat) => {
  if (!seat.getChair()) {
    throw new Error(`Non-compliance CRA-V6-3.13`);
  }
  return new UiSeat(seat);
};
