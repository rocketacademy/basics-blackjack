class UiButtonPlay extends Ui_ButtonHand {
  constructor(args) {
    super();

    this._root.className += " -lounge-button-play";

    this._root.style.alignSelf = "center";

    this._root.textContent = "Start";
  }
}

class UiLounge extends Ui_Tree {
  constructor(lounge) {
    super();

    this._lounge = lounge;

    this._btnPlay = new UiButtonPlay();

    this._style();
    this.replaceChildrenUi(this._btnPlay);
  }
}
