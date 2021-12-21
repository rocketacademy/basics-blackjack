class Deck {
  static RANGE_SUIT = [Suit.CLUBS, Suit.DIAMONDS, Suit.HEARTS, Suit.SPADES];
  static RANGE_FACE_VALUE = [
    FaceValue.ACE,
    FaceValue.TWO,
    FaceValue.THREE,
    FaceValue.FOUR,
    FaceValue.FIVE,
    FaceValue.SIX,
    FaceValue.SEVEN,
    FaceValue.EIGHT,
    FaceValue.NINE,
    FaceValue.TEN,
    FaceValue.JACK,
    FaceValue.QUEEN,
    FaceValue.KING,
  ];
  static POINT_TWENTY_ONE = 21;
  static POINT_DEALER_DRAW_TO = 16;
  static POINT_DEALER_STAND_TO = 17;

  static newCard = (suit, faceValue) => {
    const card = new Card(suit, faceValue);
    card.flip(false);
    return card;
  };
  static STANDARD_DECK = Deck.RANGE_SUIT.reduce(
    (cards, suit) => [
      ...cards,
      ...Deck.RANGE_FACE_VALUE.map((faceVal) => Deck.newCard(suit, faceVal)),
    ],
    []
  );

  /**
   *
   * @param {number} sets
   * @returns {Card[]}
   */
  static generateDeck = (sets = 1) => {
    if (!(1 <= sets && sets < 8)) {
      throw new Error(`Non-Compliance: 
        CRA-V6-2.1`);
    }
    let cards = [];
    while (sets-- > 0) {
      cards = cards.concat(this.STANDARD_DECK.slice(0));
    }
    return cards;
  };
}
