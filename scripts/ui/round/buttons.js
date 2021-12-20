class UiButtonEndGame extends Ui_Button {
  constructor() {
    super();

    this._root.style.width = "44px";
    this._root.style.height = "44px";
    this._root.textContent = "END";
    this._root.className += " blackjack-button-end-game";
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

class UiButtonStand extends Ui_Button {
  constructor() {
    super();
    this._root.textContent = "STAND";
  }

  setOnMouseClick = (cb) => (this._root.onclick = () => cb());
}
