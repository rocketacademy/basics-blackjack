// The participant of a Playing Area

const PARTICIPANT_AVATAR_URL_DEFAULT = "static/img/avatar/default.png";
const PARTICIPANT_AVATAR_URL_ = "";
const WHACKYISEEYOURCOLORS = [
  "turquoise",
  "#9b111e",
  "red",
  "orange",
  "#8b4513",
  "green",
  "blue",
  "violet",
  "purple",
  "pink",
];

let WHACKYISEEYOURCOLORS_I = 0;
class Participant {
  constructor(name = "nameless", credit = 100) {
    /** @private @const {string} */
    this._name = null;
    /** @private @const {number} */
    this._credit = credit;

    this._imgUrl = null;

    this._fakeId = uuidv4();

    this._colorTag = WHACKYISEEYOURCOLORS[WHACKYISEEYOURCOLORS_I];
    WHACKYISEEYOURCOLORS_I += 1;
    console.warn(` color tag ${this._colorTag}`);
    this.setName(name);
  }

  getWhackyColor = () => this._colorTag;

  updateName = (name) => {
    this.setName(name);
  };
  setName = (nn) => {
    this._name = nn;
    this.onnamechange(this._name);
  };
  onnamechange = () => {};
  setOnNameChange = (cb) => (this.onnamechange = cb);
  iid = () => this._fakeId;

  getImgUrl = () => {
    return this._imgUrl || PARTICIPANT_AVATAR_URL_;
  };
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
    if (amt === undefined || amt === null) {
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
