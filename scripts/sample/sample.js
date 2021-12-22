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

  getTwoPlayersLoungePlayerBJDealerNoBlack;

  static getTwoPlayersLoungePlayerBJDealerNoBlack = () => {
    const lounge = new Lounge();
    const newPlayer1 = new Participant("Player 1");
    const newPlayer2 = new Participant("Player 2");

    const dealer = new Participant("Dealer Two Players", 10000);
    lounge.addPlayer(newPlayer1);
    lounge.addPlayer(newPlayer2);
    lounge.setDealer(dealer);
    lounge.__generateEmptyShoe();
    const card1 = Deck.newCard(Suit.CLUBS, FaceValue.TWO);
    const card2 = Deck.newCard(Suit.CLUBS, FaceValue.TWO);
    const card3 = Deck.newCard(Suit.CLUBS, FaceValue.TWO);
    const card4 = Deck.newCard(Suit.CLUBS, FaceValue.TWO);
    const card5 = Deck.newCard(Suit.CLUBS, FaceValue.TWO);
    const card6 = Deck.newCard(Suit.CLUBS, FaceValue.TWO);
    const card7 = Deck.newCard(Suit.CLUBS, FaceValue.SEVEN);
    const card8 = Deck.newCard(Suit.CLUBS, FaceValue.ACE);
    const card9 = Deck.newCard(Suit.CLUBS, FaceValue.TEN);
    const card10 = Deck.newCard(Suit.CLUBS, FaceValue.EIGHT);
    const card11 = Deck.newCard(Suit.CLUBS, FaceValue.TEN);
    const card12 = Deck.newCard(Suit.CLUBS, FaceValue.TEN);

    [
      card1,
      card2,
      card3,
      card4,
      card5,
      card6,
      card7,
      card8,
      card9,
      card10,
      card11,
      card12,
    ].forEach(lounge.addCardToShoe);

    return lounge;
  };

  constructor() {}
}
