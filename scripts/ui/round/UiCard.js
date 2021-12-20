class UiImgCard extends Ui_Img {
  constructor(url) {
    super();
    this._root.src = url;
    this._root.alt = url;
    this._root.style.width = "auto";
    this._root.style.height = "auto";
    this._root.style.maxWidth = "90px";
    this._root.style.maxHeight = "90px";
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
    `img/cards/${card
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
    // Children
    const urlFaceImg = UiCard.getUrl(card);
    this._uiImgFace = new UiImgCard(urlFaceImg);
    this._uiImgBack = new UiImgCard(`img/cards/JOKER-RED.png`);

    // Hooks
    this._card.setOnFlip(this._toggle);

    // First Render
    this._toggle(this._card.isFaceUp());
  }

  id = () => this._id;

  _toggle = (isFaceUp) =>
    this.replaceChildrenUi(isFaceUp ? this._uiImgFace : this._uiImgBack);
}

/**
 * "Controlled" Component
 */
class UiCardHolder extends Ui_Aggregate {
  constructor() {
    super();

    // Root Configuration

    this._root.className += "blackjack-card-holder";
    this._root.style.height = "fit-content";
    // Children

    this._uiCards = [];
    this._cardsRef = {};
  }
  /**
   *
   * @param {UiCard} uiCard
   */
  addUiCard = (uiCard) => {
    this._uiCards.push(uiCard);
    this._uiCardsRef = { [uiCard.id()]: uiCard, ...this._uiCardsRef };
    this.appendChildUi(uiCard);
  };
}
