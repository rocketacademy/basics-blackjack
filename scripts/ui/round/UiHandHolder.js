class UiHandHolder extends Ui_Aggregate {
  constructor() {
    super();

    this._root.className += " blackjack-hand-holder";

    this._root.style.width = "fit-content";
    this._root.style.height = "fit-content";
    this._root.style.border = "1px white dotted";
    this._root.style.justifyContent = "center";
    this._uiHands = [];

    /** @private { Object.<string,UiHand>} */
    this._uiHandsRef = {};
  }
  addUiHand = (uiHand) => {
    console.group(`addUiHand`);
    this._uiHands.push(uiHand);
    this._uiHandsRef = { [uiHand.id()]: uiHand, ...this._uiHandsRef };
    this.appendChildUi(uiHand);
    console.groupEnd();
  };
  count = () => this._uiHands.length;

  get = (index) => this._uiHands[index];
}

class UiSlider extends Ui_Component {
  constructor() {
    super(document.createElement("input"));
    this._style();
  }

  _style = () => {
    this._root.className += " black-jack-bet-slider";
    this._root.type = "range";
    this._root.step = 1;
    this._root.style.display = "flex";
    this._root.style.width = "80px";
  };
  setMin = (num = 0) => {
    this._root.min = num;
  };
  setMax = (num) => {
    this._root.max = num;
  };
  setValue = (val) => {
    this._root.value = val;
  };
  setOnRangeChange = (fn) => {
    this._root.oninput = fn;
  };
}
