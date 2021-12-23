class UiButtonPlay extends Ui_ButtonHand {
  constructor() {
    super();

    this._root.className += " -lounge-button-play";
    this._root.style.alignSelf = "center";
    this._root.textContent = "Start";
  }
}

class UiButtonFormPlayer extends Ui_ButtonHand {
  constructor() {
    super();

    this._root.className += " -lounge-button-play";
    this._root.style.alignSelf = "center";
    this._root.textContent = "+Player";
  }
}

class UiLounge extends Ui_Tree {
  _newUiButtonFormPlayer = () => {
    const btn = new UiButtonFormPlayer();
    btn.setOnMouseClick(() => {
      if (this._lounge.isFull()) {
        return;
      }
      this._lounge.formPlayer();
    });
    return btn;
  };

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
    this._btnFormPlayer = this._newUiButtonFormPlayer();

    this._style();
    this.replaceChildrenUi(this._btnPlay, this._btnFormPlayer);
  }

  _onStart = (lounge) => {};
  setOnStart = (cb) => (this._onStart = cb);
}
