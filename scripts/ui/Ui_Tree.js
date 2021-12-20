class Ui_Tree extends Ui_Component {
  static UI_ROOT = ROOT_BLACKJACK_ELEMENT;
  constructor() {
    super();
    /** @private {HTMLElement} */
    this._parentRoot = null;
  }

  _reAttachGlobalRoot = () => {
    console.group("Attaching to global root");
    console.log(this._parentRoot);
    this.detachGlobalRoot();
    this.attachGlobalRoot();
    console.groupEnd();
  };

  attachGlobalRoot = () => {
    this._parentRoot.appendChild(this.getRoot());
  };
  detachGlobalRoot = () => {
    console.group(`detachGlobalRoot`);
    this._parentRoot.removeChild(this.getRoot());
    console.groupEnd();
  };
  getParentRoot = () => this._parentRoot;
  render = () => {
    this.attachGlobalRoot();
  };

  /**
   * @param {HTMLElement} root
   */
  setUiParentRoot = (root) => {
    this._parentRoot = root;
  };
}
