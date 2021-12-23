// TABLE

class UiPersist extends Ui_Component {
  constructor() {
    super();
    this._root.style.textAlign = "center";
    this._root.style.alignSelf = "center";
    this._root.style.height = "fit-content";
  }
}

class UiNameInput extends Ui_Component {
  constructor() {
    super(document.createElement("INPUT"));
    this._root.type = "text";
    this._root.className += " textinputnamelounge";
    this._root.style.height = "fit-content";
    this._root.style.width = "90%";
    this._root.style.marginTop = "5px";
    this._root.style.border = "1px solid lightgrey";
    this._root.style.textAlign = "center";
    this._root.style.alignSelf = "center";
    this._root.style.color = "grey";
    this._root.style.backgroundColor = "white";
  }

  setName = (n) => (this._root.value = n);

  setOnValueChange = (cb) => {
    this._root.addEventListener("input", cb);
  };
}
class UiPlayerForm extends Ui_Component {
  _newPlayerName = (name) => {
    const t = new UiName();
    t.setName(name);

    return t;
  };

  _newPlayerNameInput = (name) => {
    const t = new UiNameInput();
    t.setName(name);
    return t;
  };
  constructor(participant) {
    super();

    this._p = participant;
    this._root.style.height = "270px";
    this._root.style.marginTop = "50px";
    this._root.style.marginBottom = "30px";
    this._root.style.border = "1px solid black";
    this._root.style.width = "150px";
    this._root.style.float = "top";
    this._root.style.borderRadius = "5px";
    this._root.style.justifyContent = "flex-start";
    this._root.style.flexDirection = "column";
    this._root.className += " ui-player-name";

    this._name = this._newPlayerName(this._p.getName());

    this._name.setStyle("color", this._p.getWhackyColor());

    this._nameinput = this._newPlayerNameInput(this._p.getName());

    this._persist = new UiPersist();
    this._persist.replaceChildrenUi(this._name);

    this._iid = this._p.iid();

    this._p.setOnNameChange(() => {
      this._name.setName(this._p.getName());
      // this._nameinput.setName(this._participant.getName())
    });

    this._nameinput.setOnValueChange((evt) => {
      this._p.updateName(evt.target.value);
    });

    this.replaceChildrenUi(this._persist, this._nameinput);
  }

  id = () => this._iid;
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
    console.warn(players);
    const forms = new UiPlayerFormsHolder();
    for (const p of players) {
      console.warn(p);
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
