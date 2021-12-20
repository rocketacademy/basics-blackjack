class UiSeatHolder extends Ui_Aggregate {
  _style = () => {
    this._root.style.flexDirection = "row";
    this._root.style.justifyContent = "space-around";
  };

  constructor() {
    super();
    // Root Configuration
    this._root.className += ` blackjack-holder-seats`;
    // Children
    /** @private @const {UiSeat[]}} */
    this._uiSeats = [];
    /** @private @const {Object.<string,UiSeat>}} */
    this._uiSeatsRef = {};

    this._style();
  }

  /**
   *
   * @param {UiSeat} uiSeat
   */
  addUiSeat = (uiSeat) => {
    this._uiSeats.push(uiSeat);
    this._uiSeatsRef = { [uiSeat.id()]: uiSeat, ...this._uiSeatsRef };

    const r = this._uiSeats.slice().reverse();
    console.warn(this._uiSeats);
    console.warn(r);
    this.replaceChildrenUi(...r);
  };

  get = (index) => this._uiSeats[index];
}
