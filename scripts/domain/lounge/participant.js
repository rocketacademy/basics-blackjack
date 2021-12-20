// The participant of a Playing Area
class Participant {
  constructor(name = "nameless", credit = 100) {
    /** @private @const {string} */
    this._name = name;
    /** @private @const {number} */
    this._credit = credit;
  }
  getName = () => this._name;
  getCredit = () => this._credit;
  decreaseCredit = (amt) => {
    if (!amt) {
      throw new Error(`decreaseCredit. amt not specified`);
    }

    this._credit -= amt;
  };
  increaseCredit = (amt) => (this._credit += amt);
}
