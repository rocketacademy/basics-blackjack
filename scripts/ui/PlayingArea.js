class PlayingArea {
  constructor(root) {
    this._uiRoot = root || ROOT_BLACKJACK_ELEMENT;
  }

  newRoundOfPlay = (lounge) => {
    console.group(`newRoundOfPlay`);
    const round = newRound(lounge);
    const uiRound = new UiRound(round);

    uiRound.setUiParentRoot(this._uiRoot);
    uiRound
      .setOnFinish((lounge, isContinue) => {
        if (isContinue === true) {
          new PlayingArea(this._uiRoot).newRoundOfPlay(lounge);
        } else if (isContinue === false) {
          new PlayingArea(this._uiRoot).commenceLounge(lounge);
        }
      })
      .render();

    console.groupEnd();

    return [round, uiRound];
  };

  commenceLounge = (lounge) => {
    console.group(`commenceLounge`);
    const uiLounge = new UiLounge(lounge);
    uiLounge.setUiParentRoot(this._uiRoot);
    uiLounge.render();
    console.groupEnd();
    return [lounge, uiLounge];
  };

  renderRound = (lounge) => {
    const round = newRound(lounge);
    const uiRound = new UiRound(round);
    uiRound.setUiParentRoot(this._uiRoot);

    uiRound.render();
    return [round, uiRound];
  };
}
