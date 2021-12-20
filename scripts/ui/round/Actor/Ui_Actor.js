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
    this._root.textContent = this.name;
    this._root.class += " blackjack-name";
    this._root.style.height = "20px";
    this._root.style.width = "auto";
  };

  /** @param {!string} name */
  constructor(name) {
    super(document.createElement("div"));
    // Domain
    this.name = name;
    this._style();
  }
}

class Ui_Actor extends Ui_Component {
  _style = () => {
    this._root.style.flexDirection = "column";
    this._root.style.height = "150px";
    this._root.style.width = "fit-content";
    this._root.style.minWidth = "200px";

    this._root.style.border = "1px solid black";
    this._root.style.alignItems = "center";

    this._uiName.setStyle("color", "red");
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
    this._uiName = new UiName(this._actor.getName());
    /** @private @const {UiCredit} */
    this._uiCredit = new UiCredit(this._actor.getCredit());

    this._style();
  }

  id = () => this._id;
}
