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

  static getTwoPlayersLoungePlayerBJDealerNoBlack = () => {
    //
    const lounge = new Lounge();
    const newPlayer1 = new Participant("Player 1");
    const newPlayer2 = new Participant("Player 2");

    const dealer = new Participant("Rigged Dealer Two Players", 10000);
    lounge.addPlayer(newPlayer1);
    lounge.addPlayer(newPlayer2);
    lounge.setDealer(dealer);
    lounge.__generateEmptyShoe();

    newPlayer2 === "blackjack";

    const card1 = Deck.newCard(Suit.CLUBS, FaceValue.TWO);
    const card2 = Deck.newCard(Suit.CLUBS, FaceValue.TWO);
    const card3 = Deck.newCard(Suit.CLUBS, FaceValue.TWO);
    const card4 = Deck.newCard(Suit.CLUBS, FaceValue.TWO);
    const card5 = Deck.newCard(Suit.CLUBS, FaceValue.TWO);
    const card6 = Deck.newCard(Suit.CLUBS, FaceValue.TWO);

    const card7 = Deck.newCard(Suit.CLUBS, FaceValue.SEVEN);
    const card8 = Deck.newCard(Suit.CLUBS, FaceValue.ACE); //p2
    const card9 = Deck.newCard(Suit.CLUBS, FaceValue.TEN);

    const card10 = Deck.newCard(Suit.CLUBS, FaceValue.EIGHT);
    const card11 = Deck.newCard(Suit.CLUBS, FaceValue.TEN); //p2
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

  static getTwoPlayersLoungePlayerBJDealerNoBlack = () => {
    const lounge = new Lounge();
    const newPlayer1 = new Participant("Player 1");
    const newPlayer2 = new Participant("Player 2");
    const newPlayer3 = new Participant("Player 3");
    const newPlayer4 = new Participant("Player 4");
    const newPlayer5 = new Participant("Player 5");
    const newPlayer6 = new Participant("Player 6");

    const dealer = new Participant("Rigged Dealer Three Players", 10000);
    lounge.addPlayer(newPlayer1);
    lounge.addPlayer(newPlayer2);
    lounge.addPlayer(newPlayer3);
    lounge.addPlayer(newPlayer4);
    lounge.addPlayer(newPlayer5);
    lounge.setDealer(dealer);
    lounge.__generateEmptyShoe();

    newPlayer1 === "no blackjack";
    newPlayer2 === "blackjack";

    const card1 = Deck.newCard(Suit.CLUBS, FaceValue.ACE);
    const card2 = Deck.newCard(Suit.CLUBS, FaceValue.ACE);
    const card3 = Deck.newCard(Suit.CLUBS, FaceValue.ACE);
    const card4 = Deck.newCard(Suit.CLUBS, FaceValue.ACE);
    const card5 = Deck.newCard(Suit.CLUBS, FaceValue.FIVE);
    const card6 = Deck.newCard(Suit.CLUBS, FaceValue.TEN); //D
    const card7 = Deck.newCard(Suit.CLUBS, FaceValue.TEN); //3
    const card8 = Deck.newCard(Suit.CLUBS, FaceValue.TEN); //2
    const card9 = Deck.newCard(Suit.CLUBS, FaceValue.THREE); //1
    const card10 = Deck.newCard(Suit.CLUBS, FaceValue.TWO); // A
    const card11 = Deck.newCard(Suit.CLUBS, FaceValue.TEN); //3
    const card12 = Deck.newCard(Suit.CLUBS, FaceValue.ACE); //2
    const card13 = Deck.newCard(Suit.CLUBS, FaceValue.QUEEN); //1

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
      card13,
    ].forEach(lounge.addCardToShoe);

    return lounge;
  };

  constructor() {}
}
