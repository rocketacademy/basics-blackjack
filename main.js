/**
 * Assumes control of the root element assigned to the application
 */

const COMMENCE_ROUND = (lounge) => {
  const round = newRound(lounge);
  const uiRound = new UiRound(round);
  uiRound
    .setOnFinish((lounge, isContinue) => {
      if (isContinue === true) {
        COMMENCE_ROUND(lounge);
      } else if (isContinue === false) {
        COMMENCE_LOUNGE(lounge);
      }
    })
    .render();
  return [round, uiRound];
};

const COMMENCE_LOUNGE = (lounge) => {
  const uiLounge = new UiLounge(lounge).render();
  return [lounge, uiLounge];
};

const REMOVE_ROOT_CHILDREN = () => {
  while (ROOT_BLACKJACK_ELEMENT.hasChildNodes()) {
    ROOT_BLACKJACK_ELEMENT.removeChild(ROOT_BLACKJACK_ELEMENT.lastChild);
  }
};

const main = () => {
  REMOVE_ROOT_CHILDREN();
  if (ROOT_BLACKJACK_ELEMENT) {
    COMMENCE_ROUND(Sample.getTwoPlayersLounge());
  }
};

main();
