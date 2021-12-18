class UiImgCard extends Ui_Img {
  constructor(url) {
    super();
    this._root.src = url;
    this._root.alt = url;
    this._root.style.width = "40px";
    this._root.style.height = "40px";
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
    this.replaceChildrenUi(this._uiImgBack);
  }

  id = () => this._id;

  reveal = () => {
    this.replaceChildrenUi(this._uiImgFace);
  };
}

/**
 * "Controlled" Component
 */
class UiCardsHolder extends Ui_Component {
  constructor() {
    super();
    this._root.className += "blackjack-card-holder";
    this._root.style.height = "50px";

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
    console.group(`unfocusCards upCardOnly ? ${upCardOnly}`);
    for (let i = 0; i < this._uiCards.length; i++) {
      if (i == 1 && upCardOnly) {
        continue;
      }
      this._uiCards[i].reveal();
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
