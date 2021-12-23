class UiButtonPlay extends Ui_ButtonHand {
  constructor() {
    super();

    this._root.className += " -lounge-button-play";
    this._root.style.alignSelf = "center";
    this._root.textContent = "Start";
  }
}

class UiLounge extends Ui_Tree {
  _newUiButtonPlay = () => {
    const btn = new UiButtonPlay();
    btn.setOnMouseClick(() => {
      if (!this._lounge.hasPlayablePlayers()) {
        return;
      }

      this._onStart(this._lounge);
      this.detachGlobalRoot();
    });

    return btn;
  };
  constructor(lounge) {
    super();

    this._lounge = lounge;

    this._btnPlay = this._newUiButtonPlay();

    this._style();
    this.replaceChildrenUi(this._btnPlay);
  }

  _onStart = (lounge) => {};
  setOnStart = (cb) => (this._onStart = cb);
}
