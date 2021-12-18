class UiImgCard extends Ui_Img {
  constructor(url) {
    super();
    this._root.src = url;
    this._root.alt = url;
    this._root.style.width = "auto";
    this._root.style.height = "auto";
    this._root.style.maxWidth = "120px";
    this._root.style.maxHeight = "120px";
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
      .getFaceValue()
      .toString()
      .padStart(2, "0")}-${card.getSuit()}.png`;

  constructor(card) {
    super(document.createElement("div"));
    this._card = card;
    this._id = card.getString();

    const url = UiCard.getUrl(card);
    this._uiImgFace = new UiImgCard(url);
    this._uiImgBack = new UiImgCard(`img/cards/JOKER-RED.png`);
    this._toggle(this._card.isFaceUp());
    this._card.setOnFlip(this._toggle);
  }

  id = () => this._id;

  _toggle = (isFaceUp) =>
    this.replaceChildrenUi(isFaceUp ? this._uiImgFace : this._uiImgBack);
}

/**
 * "Controlled" Component
 */
class UiCardsHolder extends Ui_Component {
  constructor() {
    super();
    this._root.className += "blackjack-card-holder";
    this._root.style.height = "fit-content";

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

  unfocusCards = (phase, upCardOnly) => {
    if (upCardOnly === undefined || upCardOnly === null) {
      throw `upCardOnly not specified`;
    }
    console.groupEnd();
  };
}

/**
 *
 * @param {Card[]} cards
 */
const newUiCardsHolder = (cards) => {
  const uiCardHolder = new UiCardsHolder();
  for (const c of cards) {
    const uiC = new UiCard(c);
    uiCardHolder.addUiCard(uiC);
  }
  return uiCardHolder;
};
