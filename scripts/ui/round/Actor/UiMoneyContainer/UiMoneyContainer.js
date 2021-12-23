class Money_Container extends Ui_Component {
  /**
   *
   * @param {UiBar} uiBar
   */
  constructor(uiBar, uiBar2) {
    super();
    this._root.className += " money-container--";
    this._root.style.flexDirection = "column";
    this._root.style.overflow = "hidden";

    this._bar = uiBar;
    this._label = uiBar2;
  }
  setMoney = (amt) => {
    this._bar.setMoney(amt);
    this._label.setMoney(amt);
  };

  setBackgroundColor = (color) => this._bar.setBackgroundColor(color);
  setBorder = (val) => this._bar.setBorder(val);
}

class UiCurrentMoneyContainer extends Money_Container {
  constructor() {
    super(new UiCurrentMoneyBar(), new UiCurrentMoneyBar2());
    this.replaceChildrenUi(this._bar, this._label);
    // this.replaceChildrenUi(this._bar);
  }
}

class UiMainBetContainer extends Money_Container {
  constructor() {
    super(new UiMainBetBar(), new UiMainBetBar2());
    this.replaceChildrenUi(this._bar, this._label);
    // this.replaceChildrenUi(this._bar);
  }
}

class UiDoubleBetContainer extends Money_Container {
  constructor() {
    super(new UiDoubledBetBar(), new UiDoubledBetBar2());
    this.replaceChildrenUi(this._bar, this._label);
    // this.replaceChildrenUi(this._bar);
  }
}

class UiPayoutContainer extends Money_Container {
  constructor() {
    super(new UiPayoutBar(), new UiDoubledBetBar2());
    this.replaceChildrenUi(this._bar, this._label);
    // this.replaceChildrenUi(this._bar);
  }
}
