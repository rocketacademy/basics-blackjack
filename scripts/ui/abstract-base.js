// This file relies on the fact that the following declarations have been made
// in runtime:

/**
 *
 * @param {Ui_Component} ui
 * @param {string} property
 * @param {string} value
 */
const setUiStyle = (ui, property, value) => {
  ui.getRoot().style[property] = value;
};

/**
 *
 * @param {Ui_Component} ui
 * @param {string} value
 */
const setUiTextContent = (ui, value) => {
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

  /**
   * @param {Ui_Component}
   *
   */
  appendChildUi = (ui) => this._root.appendChild(ui.getRoot());
}

class Ui_Button extends Ui_Component {
  constructor() {
    super(document.createElement("button"));

    this._root.style.display = "block";
    this._root.style.height = "fit-content";
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

  getTextContent = () => {
    return this._root.textContent;
  };
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
