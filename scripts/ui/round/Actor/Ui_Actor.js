class UiCredit extends Ui_Component {
  /**
   * @param {number} credit
   *
   */
  constructor(credit) {
    super(document.createElement("div"));
    this.setValue(credit);
  }
  setValue = (credit) => this._root.setAttribute("value", credit);
}

class UiName extends Ui_Component {
  _style = () => {
    this._root.style.justifyContent = "center";
    this._root.style.marginTop = "10px";
    this._root.style.marginBottom = "10px";
    this._root.class += " blackjack-name";
    this._root.style.height = "20px";
    this._root.style.width = "auto";
  };

  /** @param {!string} name */
  constructor() {
    super(document.createElement("div"));
    // Domain
    this._style();
  }

  setName = (n) => (this._root.textContent = n);
}

class Ui_Actor extends Ui_Component {
  _style = () => {
    this._root.style.flexDirection = "column";
    this._root.style.height = "150px";
    this._root.style.width = "fit-content";
    this._root.style.minWidth = "200px";

    this._root.style.border = "1px white dotted";
    this._root.style.alignItems = "center";

    this._uiName.setStyle("color", "#008080");
    this._uiName.setStyle("fontWeight", "bold");
    this._uiName.setStyle("fontStyle", "italic");
  };

  _newUiName = () => {
    const uiN = new UiName();
    uiN.setName(this._actor.getName());

    return uiN;
  };

  /**
   *
   * @param {_Actor} actor
   */
  constructor(actor) {
    super(document.createElement("div"));
    // Domain
    this._actor = actor;
    // Root Configuration
    this._id = actor.id();

    // Children

    /** @private @const {UiName} */
    this._uiName = this._newUiName();
    /** @private @const {UiCredit} */
    this._uiCredit = new UiCredit(this._actor.getCredit());

    this._style();
  }

  id = () => this._id;
}
