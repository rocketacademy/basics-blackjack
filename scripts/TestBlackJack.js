class TestBlackJack {
  constructor() {
    this._cbTest = [];
  }

  addTest = (desc, cb) => {
    this._cbTest.push({
      desc,
      cb,
    });
  };

  run = () => {
    for (const test of this._cbTest) {
      const desc = test.desc;
      console.group(desc);

      test.cb();
      console.groupEnd();
    }
  };
}
