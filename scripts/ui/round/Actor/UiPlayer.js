class UiImgPlayerAvatar extends Ui_Img {
  constructor(url) {
    super();
    this._root.src = url;
    this._root.alt = url;
    this._root.style.width = "auto";
    this._root.style.height = "100%";
    this._root.style.minWidth = "10px";
    this._root.style.maxWidth = "30px";
    this._root.style.maxHeight = "30px";
    this._root.style.border = "1px dotted grey";

    this._root.className += ` blackjack-img-bet-chip`;
  }
}

class Ui_ProgressBar extends Ui_Component {
  _convertToPx = (money) => {
    return 0.8 * money;
  };
  constructor() {
    super();

    this._root.style.height = "auto";
    this._root.style.width = "0px";
    this._root.style.justifyContent = "center";
    this._root.style.alignItems = "center";
    this._root.style.verticalAlign = "middle";
    this._root.style.color = "white";
    this._root.style.textAlign = "center";
    this._root.style.fontSize = "0.6rem";
  }

  setMoney = (money) => {
    this._root.style.width = this._convertToPx(money) + "px";
    this._root.textContent = `${money}`;
  };
}
class UiCurrentMoneyBar extends Ui_ProgressBar {
  constructor() {
    super();

    this._root.className += ` blackjack-bar-money-initial`;
    this._root.style.backgroundColor = "#585858";
    this._root.style.textAlign = "center";
  }
}

class UiMainBetBar extends Ui_ProgressBar {
  constructor() {
    super();

    this._root.className += ` blackjack-bar-money-mainBet`;
    this._root.style.backgroundColor = "#FFD700";
  }
}

class UiDoubledBetBar extends Ui_ProgressBar {
  constructor() {
    super();
    this._root.className += ` blackjack-bar-money-sideBet`;
    this._root.style.backgroundColor = "#FF4500";
  }
}

class UiPayoutBar extends Ui_ProgressBar {
  constructor() {
    super();
    this._root.className += ` blackjack-bar-money-payout`;

    this._root.style.backgroundColor = "#8FBC8F";
  }
}

class UiMoneyBar extends Ui_Component {
  constructor() {
    super();
    this._root.className += ` blackjack-bar-money--`;
    this._root.style.flexDirection = "row";
    this._root.style.marginLeft = "5px";
    this._uiCurrentMoneyBar = new UiCurrentMoneyBar();
    this._uiMainBetBar = new UiMainBetBar();
    this._uiDoubleBetBar = new UiDoubledBetBar();
    this._uiPayoutBar = new UiPayoutBar();

    this.replaceChildrenUi(
      this._uiCurrentMoneyBar,
      this._uiDoubleBetBar,
      this._uiMainBetBar,
      this._uiPayoutBar
    );
  }
  _convertToRem = (money) => null;
  setCurrentMoney = (credit) => {
    this._uiCurrentMoneyBar.setMoney(credit);
  };
}

class UiPlayer extends Ui_Actor {
  _newUiMoneyBar = (credit) => {
    const uiBar = new UiMoneyBar();
    uiBar.setCurrentMoney(credit);
    return uiBar;
  };
  _style = () => {
    this._root.style.border = "1px dotted grey";
    this._root.style.height = "25px";
    this._root.style.width = "fit-content";
    this._root.style.minWidth = "70px";
    this._root.style.marginLeft = "7px";
    this._root.style.marginTop = "7px";
    this._root.style.borderRadius = "7px";
    this._root.style.padding = "4px";
  };
  /**
   * @param {Player} player
   */
  constructor(player) {
    super(player);
    this._style();
    // Root Configuration
    this._root.className += " blackjack-player";

    this._uiAvatar = new UiImgPlayerAvatar(player.getImgUrl());

    this._uiMoneyBar = this._newUiMoneyBar(player.getCredit());
    this.replaceChildrenUi(this._uiAvatar, this._uiMoneyBar);
  }
}
