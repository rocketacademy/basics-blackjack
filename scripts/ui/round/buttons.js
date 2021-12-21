class UiButtonNewRound extends Ui_Button {
  constructor() {
    super();

    this._root.style.width = "22px";
    this._root.style.height = "22px";
    this._root.textContent = "NEW ROUND";
    this._root.className += " blackjack-button-new-round";
  }
  setOnMouseClick = (cb) => (this._root.onclick = () => cb());
}

class UiButtonGoToLounge extends Ui_Button {
  constructor() {
    super();

    this._root.style.width = "22px";
    this._root.style.height = "22px";
    this._root.textContent = "LOUNGE";
    this._root.className += " blackjack-button-go-to-lounge";
  }
  setOnMouseClick = (cb) => (this._root.onclick = () => cb());
}

class UiButtonchangeTurn extends Ui_Button {
  constructor(args) {
    super();
    this._root.textContent = "Change Player";
  }
}
class UiButtonHit extends Ui_Button {
  constructor() {
    super();
    this._root.textContent = "Hit";
  }
}
