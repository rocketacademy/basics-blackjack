class UiImgCard extends Ui_Img {
  constructor(url) {
    super();
    this._root.src = url;
    this._root.alt = url;
    this._root.style.width = "auto";
    this._root.style.height = "7.2rem";
    this._root.style.padding = "14px";

    this._root.className += ` blackjack-card-img`;
  }
}

class UiCard extends Ui_Component {
  /**
   *
   * @param {Card} card
   * @returns {string}
   */

  static getUrl = (card) =>
    `static/img/cards/${card
      .getRank()
      .toString()
      .padStart(2, "0")}-${card.getSuitDesc()}.png`;

  constructor(card) {
    super(document.createElement("div"));

    // Domain
    this._card = card;

    // Root Configuration
    this._id = card.getString();
    this._root.className += `blackjack-card`;
    this._root.style.padding = "2px";
    this._root.style.width = "12px";
    this._root.style.height = "100%";

    // Children
    const urlFaceImg = UiCard.getUrl(card);
    this._uiImgFace = new UiImgCard(urlFaceImg);
    this._uiImgBack = new UiImgCard(`static/img/cards/JOKER-RED.png`);

    // Hooks
    this._card.setOnFlip(this._toggle);

    // First Render
    this._toggle(this._card.isFaceUp());
  }

  id = () => this._id;

  _toggle = (isFaceUp) =>
    this.replaceChildrenUi(isFaceUp ? this._uiImgFace : this._uiImgBack);
}
