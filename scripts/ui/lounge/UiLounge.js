// TABLE

class UiPlayerForm extends Ui_Component {
  constructor() {
    super();
    this._root.style.height = "270px";
    this._root.style.marginTop = "50px";
    this._root.style.marginBottom = "30px";
    this._root.style.border = "1px solid black";
    this._root.style.width = "60px";
    this._root.style.borderRadius = "5px";

    this._id = uuidv4();
  }

  id = () => this._id;
}

class UiPlayerFormsHolder extends Ui_Component {
  _style = () => {
    this._root.style.flexDirection = "row";
    this._root.style.justifyContent = "space-around";
    this._root.style.marginTop = "30px";
  };

  constructor() {
    super();
    this._root.style.width = "100%";
    this._root.style.height = "100%";
    this._root.style.border = "1px solid black";
    this._root.style.borderRadius = "3px";

    this._uiPlayerForms = [];
    this._uiPlayerFormsRef = {};
  }
  /**
   *
   * @param {UiPlayerForm} uiPlayerForm
   */
  adduiPlayerForm = (uiPlayerForm) => {
    this._uiPlayerForms.push(uiPlayerForm);
    this._uiPlayerFormsRef = {
      [uiPlayerForm.id()]: uiPlayerForm,
      ...this._uiPlayerFormsRef,
    };

    const r = this._uiPlayerForms.slice().reverse();

    this._style();
    this.replaceChildrenUi(...r);
  };

  get = (index) => this._uiPlayerForms[index];
}

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

  _newUiPlayerForm = (p) => new UiPlayerForm(p);
  /**
   *
   * @param {Participant} players
   */
  _newUiPlayerForms = (players) => {
    const forms = new UiPlayerFormsHolder();
    for (const p of players) {
      const ui = this._newUiPlayerForm(p);
      forms.adduiPlayerForm(ui);
    }

    return forms;
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
    this._formsPlayer = this._newUiPlayerForms(this._lounge.getPlayers());

    this._lounge.setOnFormPlayer((participant) => {
      const ui = this._newUiPlayerForm(participant);
      this._formsPlayer.adduiPlayerForm(ui);
    });
    this._style();
    this.replaceChildrenUi(
      this._btnPlay,
      this._btnFormPlayer,
      this._formsPlayer
    );
  }

  _onStart = (lounge) => {};
  setOnStart = (cb) => (this._onStart = cb);
}
