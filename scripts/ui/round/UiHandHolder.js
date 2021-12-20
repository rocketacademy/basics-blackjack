class UiHandHolder extends Ui_Aggregate {
  constructor() {
    super();

    this._root.className += " blackjack-hand-holder";

    this._root.style.width = "130px";
    this._root.style.height = "160px";
    this._root.style.marginBottom = "20px";
    this._root.style.marginTop = "20px";
    this._root.style.marginLeft = "10px";
    this._root.style.marginRight = "10px";
    this._root.style.border = "1px dotted black";
    this._uiHands = [];

    /** @private { Object.<string,UiHand>} */
    this._uiHandsRef = {};
  }
  addUiHand = (uiHand) => {
    this._uiHands.push(uiHand);
    this._uiHandsRef = { [uiHand.id()]: uiHand, ...this._uiHandsRef };
    this.appendChildUi(uiHand);
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
