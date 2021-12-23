/**
 *
 * @param {Ui_Component} ui
 * @param {string} value
 */
const SET_UI_TEXT_CONTENT = (ui, value) => {
  ui.getRoot().textContent = value;
};

class Ui_Component {
  /**
   *
   * @param {HTMLElement} element
   */
  constructor(element) {
    this._root = element ? element : document.createElement("div");
    this._root.style.display = "flex";
  }

  getRoot = () => this._root;
  replaceChildrenUi = (...uiS) => {
    const nodeOfUis = uiS.map((ui) => ui.getRoot());
    this._root.replaceChildren(...nodeOfUis);
  };

  addChildrenUi = (ui) => {
    this._root.appendChild(ui.getRoot());
  };

  /**
   * @param {Ui_Component}
   *
   */
  appendChildUi = (ui) => this._root.appendChild(ui.getRoot());

  setStyle = (prop, value) => {
    this._root.style[prop] = value;
  };
}

class Ui_Button extends Ui_Component {
  constructor() {
    super(document.createElement("button"));

    this._root.style.display = "block";
    this._root.style.height = "fit-content";
    this._root.style.width = "fit-content";
    this._root.style.width = "fit-content";
  }
}

class Ui_Text extends Ui_Component {
  constructor(element) {
    super(element);
  }

  setTextContent = (text) => {
    this._root.textContent = text;
  };

  getTextContent = () => this._root.textContent;
}

class Ui_Img extends Ui_Component {
  constructor() {
    super(document.createElement("img"));
  }
}

class Ui_Aggregate extends Ui_Component {
  constructor() {
    super();
  }
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
