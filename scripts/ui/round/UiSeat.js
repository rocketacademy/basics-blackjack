class UiChairDisplay extends Ui_Text {
  constructor(chair) {
    super();
    this._chair = chair;
    this._root.className += " blackjack-chair-display";

    this._root.style.width = "70px";
    this._root.style.height = "25px";
    this._root.style.marginTop = "7px";
    this._root.style.border = "1px white dotted";
    this._root.style.overflow = "hidden";
    this._root.style.alignSelf = "center";
    this._root.style.justifyContent = "center";
    this._root.style.fontStyle = "italic";

    this._root.textContent = chair.getName();
  }
}

//TODO the size of the seat ui should be determined by the size of the hand ui
class UiSeat extends Ui_Component {
  _style = () => {
    this._root.style.flexDirection = "column";
    this._root.style.height = "fit-content";
    this._root.style.minHeight = "210px";
    this._root.style.width = "fit-content";
    this._root.style.padding = "10px 6px 20px 6spx";
    this._root.style.borderRadius = "5px";

    this._root.style.border = "1px solid black";
    this._root.style.alignItems = "center";
  };
  /**
   * @param {Player} Chair
   */
  _newUiChairDisplay = (chair) => {
    const uiC = new UiChairDisplay(chair);
    return uiC;
  };

  _newUiHand = (h) => newUiHand(h);
  _newUiHandHolder = (generator) => {
    const uiHH = new UiHandHolder();

    let limiter = 7;
    let hand = generator.next();
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
    this._root.className += " blackjack-seat";
    this._uiChair = this._newUiChairDisplay(this._seat.getChair());
    /** @private @const {UiHandHolder} */
    this._UiHandHolder = this._newUiHandHolder(this._seat.getHandGenerator());

    this._seat.setOnCreateNewHand((hand) => {
      this._UiHandHolder.addUiHand(this._newUiHand(hand));
    });

    this._style();
    this.replaceChildrenUi(this._uiChair, this._UiHandHolder);
  }

  id = () => this._id;

  getUiHand = (pos) => {
    if (pos === undefined || pos === null) {
      throw new Error(`require not null arg pos`);
    }

    return this._UiHandHolder.get(pos);
  };

  uiHandCount = () => this._UiHandHolder.count();
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
