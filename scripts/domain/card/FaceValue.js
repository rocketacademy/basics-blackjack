class FaceValue {
  // Only Ace have soft value.
  static ACE = new FaceValue(1, 1, 11);

  /** CRA-V6-3.4.2 */
  static TWO = new FaceValue(2, 2);
  static THREE = new FaceValue(3, 3);
  static FOUR = new FaceValue(4, 4);
  static FIVE = new FaceValue(5, 5);
  static SIX = new FaceValue(6, 6);
  static SEVEN = new FaceValue(7, 7);
  static EIGHT = new FaceValue(8, 8);
  static NINE = new FaceValue(9, 9);
  static TEN = new FaceValue(10, 10);

  // Pictures
  static JACK = new FaceValue(11, 10);
  static QUEEN = new FaceValue(12, 10);
  static KING = new FaceValue(13, 10);

  /**
   *
   * @param {number} rank
   * @param {number} hardValue
   * @param {number} softValue
   */
  constructor(rank, hardValue, softValue = null) {
    this._rank = rank;
    this._hardValue = hardValue;
    this._softValue = softValue;
  }

  getRank = () => this._rank;

  getFaceString = () => {
    switch (this._rank) {
      case 1:
        return "ACE";
      case 2:
        return "TWO";
      case 3:
        return "THREE";

      case 4:
        return "FOUR";

      case 5:
        return "FIVE";

      case 6:
        return "SIX";

      case 7:
        return "SEVEN";

      case 8:
        return "EIGHT";

      case 9:
        return "NINE";

      case 10:
        return "TEN";

      case 11:
        return "JACK";

      case 12:
        return "QUEEN";

      case 13:
        return "KING";
    }
  };
  getHardValue = () => this._hardValue;
  getSoftValue = () => {
    if (!this._softValue) {
      throw new Error(`Null soft value should not be access`);
    }

    return this._softValue;
  };
}
