class UiInnerWrap extends Ui_Text {
  constructor() {
    super();

    this._root.style.display = "inline-block";
  }
}

class UiInnerWrap2 extends Ui_Text {
  constructor() {
    super();

    this._root.style.overflow = "visible";
  }
}

class UiMoneyLabel extends Ui_Text {
  constructor() {
    super();

    this._root.style.fontSize = "0.6rem";
    this._root.style.float = "left";
    this._root.style.width = "auto";
    this._root.style.display = "inline-block";
    this._root.style.overflow = "visible";

    this._root.className += ` blackjack-ui-money-label`;
  }

  setMoney = (money) => {
    console.group(`UiMoneyLabel setMoney`);
    this.setTextContent(money);
    console.groupEnd();
  };
}

class Ui_ProgressUnifire extends Ui_Component {
  static PROGRESS_WIDTH = 400 / (5 / 2); // unit 1 + possible 1.5 payout
  static HACKY_REM_PER_CREDIT = Ui_ProgressUnifire.PROGRESS_WIDTH / 100;

  static setHACKY_REM_PER_CREDIT = (interval) => {
    if (Number.isNaN(interval)) {
      throw new Error(`interval should be a number`);
    }
    Ui_ProgressUnifire.HACKY_REM_PER_CREDIT =
      Ui_ProgressUnifire.PROGRESS_WIDTH / interval;
  };
  static CONVERT_TO_PX = (money) => {
    return Ui_ProgressUnifire.HACKY_REM_PER_CREDIT * money;
  };

  constructor() {
    super();
  }
}
class Ui_ProgressBar2 extends Ui_ProgressUnifire {
  constructor() {
    super();
    this._root.className += ` blackjack-ui-money-progress-bar`;

    this._root.style.height = "0.5rem";
    this._root.style.lineHeight = "0.5rem";
    this._root.style.width = "0px";
    this._root.style.justifyContent = "center";
    this._root.style.alignItems = "center";
    this._root.style.color = "white";
    this._root.style.textAlign = "center";
    this._root.style.float = "left";
    this._root.style.color = "black";
    this._root.style.fontWeight = "bold";
    this._root.style.textAlign = "center";

    this._innerWrap = new UiMoneyLabel();
    this.replaceChildrenUi(this._innerWrap);
  }
  setBackgroundColor = (val) => {
    this._root.style.backgroundColor = val;
  };
  setMoney = (money) => {
    console.group(`Ui_ProgressBar setMoney`);
    this._root.style.width = Ui_ProgressUnifire.CONVERT_TO_PX(money) + "px";
    this._innerWrap.setTextContent(money);
    console.groupEnd();
  };
}

class Ui_ProgressBar extends Ui_ProgressUnifire {
  _newInnerWrap = () => {
    return new UiInnerWrap();
  };

  constructor() {
    super();
    this._root.className += ` blackjack-ui-money-progress-bar`;

    this._root.style.height = "0.5rem";
    this._root.style.lineHeight = "0.5rem";
    this._root.style.width = "0px";
    this._root.style.justifyContent = "center";
    this._root.style.alignItems = "center";
    this._root.style.verticalAlign = "middle";
    this._root.style.color = "white";
    this._root.style.textAlign = "center";
    this._root.style.overflow = "hidden";
  }
  setBackgroundColor = (val) => {
    this._root.style.backgroundColor = val;
  };

  setBorder = (val) => {
    this._root.style.border = val;
  };
  setMoney = (money) => {
    console.group(`Ui_ProgressBar setMoney`);
    const px = Ui_ProgressUnifire.CONVERT_TO_PX(money);
    console.log(px);
    this._root.style.width = px + "px";
    console.groupEnd();
  };
}

class UiPayoutBar extends Ui_ProgressBar {
  constructor() {
    super();
    this._root.className += ` blackjack-bar-money-payout`;
    this._root.className += ` blackjack-ui-money-hider`;
    this._root.style.backgroundColor = "#8FBC8F";
  }
}

class UiDoubledBetBar extends Ui_ProgressBar {
  constructor() {
    super();
    this._root.className += ` blackjack-ui-money-hider`;
    this._root.className += ` blackjack-bar-money-sideBet`;

    const initialMainBetColor = "#FF4500";

    this._root.style.backgroundColor = initialMainBetColor;
  }
}

class UiMainBetBar extends Ui_ProgressBar {
  constructor() {
    super();

    this._root.className += ` blackjack-bar-money-mainBet`;
    this._root.className += ` blackjack-ui-money-hider`;
    const initialMainBetColor = "#FFA500";
    this._root.style.backgroundColor = initialMainBetColor;
  }
}

class UiCurrentMoneyBar extends Ui_ProgressBar {
  constructor() {
    super();

    this._root.className += ` blackjack-bar-money-initial`;
    this._root.className += ` blackjack-ui-money-hider`;
    const initialCurrentMoneyColor = "#D3D3D3";
    this._root.style.color = "black";
    this._root.style.fontWeight = "bold";
    this._root.style.backgroundColor = initialCurrentMoneyColor;
    this._root.style.textAlign = "center";
  }
}

class UiPayoutBar2 extends Ui_ProgressBar2 {
  constructor() {
    super();
    this._root.className += ` blackjack-bar-money-payout`;
  }
}

class UiDoubledBetBar2 extends Ui_ProgressBar2 {
  constructor() {
    super();
    this._root.className += ` blackjack-bar-money-sideBet`;
  }
}

class UiMainBetBar2 extends Ui_ProgressBar2 {
  constructor() {
    super();

    this._root.className += ` blackjack-bar-money-mainBet`;
  }
}

class UiCurrentMoneyBar2 extends Ui_ProgressBar2 {
  constructor() {
    super();

    this._root.className += ` blackjack-bar-money-initial`;
  }
}
