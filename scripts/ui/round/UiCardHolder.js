/**
 * "Controlled" Component
 */
class UiCardHolder extends Ui_Aggregate {
  constructor() {
    super();

    // Root Configuration

    this._root.className += " blackjack-card-holder";
    this._root.style.height = "120px";
    this._root.style.width = "90px";
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
