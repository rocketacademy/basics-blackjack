class Sample {
  static getDefaultLounge = () => {
    const lounge = new Lounge();
    lounge.addPlayer(new Participant());
    lounge.setDealer(new Participant());
    lounge.generateShoe(1);

    return lounge;
  };
  static getTwoPlayersLounge = () => {
    const lounge = new Lounge();
    const newPlayer1 = new Participant("Player 1");
    const newPlayer2 = new Participant("Player 2");

    const dealer = new Participant("Dealer Two Players", 10000);
    lounge.addPlayer(newPlayer1);
    lounge.addPlayer(newPlayer2);
    lounge.setDealer(dealer);
    lounge.generateShoe(4);
    return lounge;
  };
  constructor() {}
}
