class Sample {
  static getSampleLounge = () => {
    return new Lounge();
  };
  static getSampleTwoPlayersLounge = () => {
    const lounge = new Lounge();
    const newPlayer1 = new Participant("Player 1");
    const newPlayer2 = new Participant("Player 2");

    const dealer = new Participant("Dealer 2 Player", 1000);
    lounge.addPlayer(newPlayer1);
    lounge.addPlayer(newPlayer2);
    lounge.setDealer(dealer);
    return lounge;
  };
  constructor() {}
}
