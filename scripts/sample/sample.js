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
    const newPlayer1 = new Participant("Baller");
    const newPlayer2 = new Participant("All-or-nothing");
    const newPlayer3 = new Participant("Luckydale");
    const newPlayer4 = new Participant("Alex Cruise");
    const newPlayer5 = new Participant("Bobby Cruise");

    const dealer = new Participant("Rigged Dealer 5 Players", 10000);
    lounge.addPlayer(newPlayer1);
    lounge.addPlayer(newPlayer2);
    lounge.addPlayer(newPlayer3);
    lounge.addPlayer(newPlayer4);
    lounge.addPlayer(newPlayer5);
    lounge.setDealer(dealer);
    lounge.generateShoe(2);

    const card1 = Deck.newCard(Suit.CLUBS, FaceValue.ACE);
    const card2 = Deck.newCard(Suit.CLUBS, FaceValue.ACE);
    const card3 = Deck.newCard(Suit.CLUBS, FaceValue.ACE);
    const card4 = Deck.newCard(Suit.CLUBS, FaceValue.ACE);
    const card5 = Deck.newCard(Suit.CLUBS, FaceValue.ACE);
    const card6 = Deck.newCard(Suit.CLUBS, FaceValue.ACE); //D
    const card7 = Deck.newCard(Suit.CLUBS, FaceValue.EIGHT); //4-3
    const card8 = Deck.newCard(Suit.CLUBS, FaceValue.TEN); //3-3
    const card9 = Deck.newCard(Suit.CLUBS, FaceValue.ACE); //1-3
    const card10 = Deck.newCard(Suit.CLUBS, FaceValue.THREE); //5
    const card11 = Deck.newCard(Suit.CLUBS, FaceValue.SEVEN); //4
    const card12 = Deck.newCard(Suit.CLUBS, FaceValue.SIX); //3
    const card13 = Deck.newCard(Suit.CLUBS, FaceValue.ACE); //2
    const card14 = Deck.newCard(Suit.CLUBS, FaceValue.KING); //1
    const card15 = Deck.newCard(Suit.CLUBS, FaceValue.JACK); // D
    const card16 = Deck.newCard(Suit.CLUBS, FaceValue.TEN); // 5
    const card17 = Deck.newCard(Suit.CLUBS, FaceValue.SIX); // 4
    const card18 = Deck.newCard(Suit.CLUBS, FaceValue.FIVE); //3
    const card19 = Deck.newCard(Suit.CLUBS, FaceValue.QUEEN); //2
    const card20 = Deck.newCard(Suit.CLUBS, FaceValue.KING); //1

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
      card14,
      card15,
      card16,
      card17,
      card18,
      card19,
      card20,
    ].forEach(lounge.addCardToShoe);

    return lounge;
  };

  constructor() {}
}
