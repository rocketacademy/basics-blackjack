// logs

const LOG_ASSERT = (predicate, trueExpr, falseExpr) => {
  if (predicate === true) {
    if (trueExpr) {
      console.log(trueExpr);
    }
  } else if (predicate === false) {
    if (falseExpr) {
      console.warn(falseExpr);
    }
  } else {
    console.warn("assertion is not truthy");
  }
};

const uuidv4 = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
};
