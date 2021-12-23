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

class Ui_Actor extends Ui_Component {
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
    console.log(actor);
    // Domain
    this._actor = actor;
    // Root Configuration
    this._id = actor.id();

    // Children

    /** @private @const {UiName} */
    this._uiName = this._newUiName();
    /** @private @const {UiCredit} */
    this._uiCredit = new UiCredit(this._actor.getCredit());
  }

  id = () => this._id;
}
