class UiImgPlayerAvatar extends Ui_Img {
  constructor(url) {
    super();
    this._root.src = url;
    this._root.alt = url;
    this._root.style.width = "auto";
    this._root.style.height = "auto";
    this._root.style.minWidth = "10px";
    this._root.style.maxWidth = "30px";
    this._root.style.maxHeight = "30px";
    this._root.style.border = "1px dotted grey";

    this._root.className += ` blackjack-player-avatar`;
  }
}

class UiMoneyBars extends Ui_Component {
  constructor() {
    super();
    this._root.className += ` blackjack-bar-money--`;
    this._root.style.flexDirection = "row";
    this._root.style.marginLeft = "5px";
    this._uiCurrentMoneyBarContainer = new UiCurrentMoneyContainer();
    this._uiMainBetBarContainer = new UiMainBetContainer();
    this._uiDoubleBetBarContainer = new UiDoubleBetContainer();
    this._uiPayoutBarContainer = new UiPayoutContainer();

    this.replaceChildrenUi(
      this._uiCurrentMoneyBarContainer,
      this._uiDoubleBetBarContainer,
      this._uiMainBetBarContainer,
      this._uiPayoutBarContainer
    );
  }

  setCurrentMoney = (credit) => {
    this._uiCurrentMoneyBarContainer.setMoney(credit);
  };

  setMainBetStaked = (stakedBet, currentMoney) => {
    this._uiMainBetBarContainer.setMoney(stakedBet);

    this.setCurrentMoney(currentMoney);
  };

  setMainBetCollected = (currentMoney) => {
    this._uiMainBetBarContainer.setBackgroundColor("black");
    this._uiMainBetBarContainer.setBorder("2px solid #FFA500");

    this.setCurrentMoney(currentMoney);
  };
  setDoubleBetStaked = (stakedBet, currentMoney) => {
    this._uiDoubleBetBarContainer.setMoney(stakedBet);

    this.setCurrentMoney(currentMoney);
  };
  setDoubleBetDealerCollected = (currentMoney) => {
    this._uiDoubleBetBarContainer.setBackgroundColor("#808080");
    this._uiDoubleBetBarContainer.setBorder("2px solid #FF4500");
    this.setCurrentMoney(currentMoney);
  };

  setPayoutMoney = (payout) => {
    this._uiPayoutBarContainer.setMoney(payout);
  };
}

class UiPlayer extends Ui_Actor {
  _newUiMoneyBars = (credit) => {
    const uiBars = new UiMoneyBars();
    uiBars.setCurrentMoney(credit);
    return uiBars;
  };
  _style = () => {
    this._root.style.border = "1px dotted grey";
    this._root.style.height = "fit-content";
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
    this._player = player;
    // Root Configuration
    this._root.className += " blackjack-player";

    this._uiAvatar = new UiImgPlayerAvatar(player.getImgUrl());

    this._uiMoneyBar = this._newUiMoneyBars(player.getCredit());

    this._player.setOnMainBetStaked((bet) => {
      this._uiMoneyBar.setMainBetStaked(bet, this._player.getCredit());
    });
    this._player.setOnDoubleBetStaked((bet) => {
      console.group(`ui play setOnDoubleBetStaked`);
      this._uiMoneyBar.setDoubleBetStaked(bet, this._player.getCredit());
      console.groupEnd();
    });

    this._player.setOnMainBetCollectedByDealer(() => {
      this._uiMoneyBar.setMainBetCollected(this._player.getCredit());
    });

    this._player.setOnDoubleBetCollectedByDealer(() => {
      this._uiMoneyBar.setDoubleBetDealerCollected(this._player.getCredit());
    });
    this._player.setOnPayout((payout) => {
      this._uiMoneyBar.setPayoutMoney(payout);
    });
    this._style();
    this.replaceChildrenUi(this._uiAvatar, this._uiMoneyBar);
  }
}
