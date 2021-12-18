// logs

const LOG_ASSERT = (predicate, trueExpr, falseExpr) => {
  if (predicate === true) {
    if (trueExpr) {
      console.log(trueExpr);
    }
  } else if (predicate === false) {
    if (falseExpr) {
      console.log(falseExpr);
    }
  } else {
    console.warn("assertion is not truthy");
  }
};
