class UiChair extends Ui_Text {
  constructor(chair) {
    super();
    this._chair = chair;

    this._root.style.width = "40px";
    this._root.style.height = "13px";
  }
}
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
   * @param {Player} Chair
   */
  _newUiChair = (chair) => {
    const uiC = new UiChair(chair);

    return uiC;
  };

  _newUiHand = (h) => newUiHand(h);
  _newUiHandsHolder = (generator) => {
    const uiHH = new UiHandsHolder();

    let limiter = 7;
    let hand = generator.next();
    console.log(hand);
    while (hand) {
      uiHH.addUiHand(this._newUiHand(hand));
      hand = generator.next();
      limiter -= 1;
    }

    return uiHH;
  };
  /**
   *
   * @param {Seat} seat
   */
  constructor(seat) {
    super();

    this._seat = seat;
    this._id = seat.id();

    this._uiChair = this._newUiChair(this._seat.getChair());
    /** @private @const {UiHandsHolder} */
    this._uiHandsHolder = this._newUiHandsHolder(this._seat.getHandGenerator());

    this._seat.setOnCreateNewHand((hand) => {
      this._uiHandsHolder.addUiHand(this._newUiHand(hand));
    });

    this._style();
    this.replaceChildrenUi(this._uiChair, this._uiHandsHolder);
  }

  id = () => this._id;

  getUiHand = (pos) => {
    if (pos === undefined || pos === null) {
      throw new Error(`require not null arg pos`);
    }

    return this._uiHandsHolder.get(pos);
  };

  uiHandCount = () => this._uiHandsHolder.count();
}

/**
 *
 * @param {Seat} seat
 * @returns
 */
const newUiSeat = (seat) => {
  if (!seat.getChair()) {
    throw new Error(`Non-compliance CRA-V6-3.13`);
  }
  return new UiSeat(seat);
};
