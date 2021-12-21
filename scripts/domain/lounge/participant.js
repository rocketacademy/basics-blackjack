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

    console.group(`Participant decreaseCredit Amount: ${amt}`);
    const prev = this._credit;
    console.log(`prev ${prev}`);
    this._credit = this._credit - amt;
    const current = this._credit;

    console.log(`current ${current}`);

    console.log(`${this._name} ${prev} -> ${current}`);
    console.groupEnd();
  };
  increaseCredit = (amt) => {
    if (!amt) {
      throw new Error(`increaseCredit. amt not specified`);
    }

    console.group(`Participant increaseCredit Amount: ${amt}`);

    const prev = this._credit;
    console.log(`prev ${prev}`);
    this._credit = this._credit + amt;
    const current = this._credit;
    console.log(`current ${current}`);

    console.log(`${this._name} ${prev} -> ${current}`);
    console.groupEnd();
  };
}
