// shuufle deck function
//innput nname
//submit - deal 2 cards
// game check  ace can be 1 or 11
// dealer < gamer <21
// above 21 bust
// gamers decides first : hit / stand
// dealer : auto hit <17

// no of players
// no. of decks
//

// hard coded card deck
var deck = [
  {
    name: "ace",
    suit: "hearts",
    rank: 1,
  },
  {
    name: "2",
    suit: "hearts",
    rank: 2,
  },
  {
    name: "3",
    suit: "hearts",
    rank: 3,
  },
  {
    name: "4",
    suit: "hearts",
    rank: 4,
  },
  {
    name: "5",
    suit: "hearts",
    rank: 5,
  },
  {
    name: "6",
    suit: "hearts",
    rank: 6,
  },
  {
    name: "7",
    suit: "hearts",
    rank: 7,
  },
  {
    name: "8",
    suit: "hearts",
    rank: 8,
  },
  {
    name: "9",
    suit: "hearts",
    rank: 9,
  },
  {
    name: "10",
    suit: "hearts",
    rank: 10,
  },
  {
    name: "jack",
    suit: "hearts",
    rank: 11,
  },
  {
    name: "queen",
    suit: "hearts",
    rank: 12,
  },
  {
    name: "king",
    suit: "hearts",
    rank: 13,
  },
  {
    name: "ace",
    suit: "diamonds",
    rank: 1,
  },
  {
    name: "2",
    suit: "diamonds",
    rank: 2,
  },
  {
    name: "3",
    suit: "diamonds",
    rank: 3,
  },
  {
    name: "4",
    suit: "diamonds",
    rank: 4,
  },
  {
    name: "5",
    suit: "diamonds",
    rank: 5,
  },
  {
    name: "6",
    suit: "diamonds",
    rank: 6,
  },
  {
    name: "7",
    suit: "diamonds",
    rank: 7,
  },
  {
    name: "8",
    suit: "diamonds",
    rank: 8,
  },
  {
    name: "9",
    suit: "diamonds",
    rank: 9,
  },
  {
    name: "10",
    suit: "diamonds",
    rank: 10,
  },
  {
    name: "jack",
    suit: "diamonds",
    rank: 11,
  },
  {
    name: "queen",
    suit: "diamonds",
    rank: 12,
  },
  {
    name: "king",
    suit: "diamonds",
    rank: 13,
  },
  {
    name: "ace",
    suit: "clubs",
    rank: 1,
  },
  {
    name: "2",
    suit: "clubs",
    rank: 2,
  },
  {
    name: "3",
    suit: "clubs",
    rank: 3,
  },
  {
    name: "4",
    suit: "clubs",
    rank: 4,
  },
  {
    name: "5",
    suit: "clubs",
    rank: 5,
  },
  {
    name: "6",
    suit: "clubs",
    rank: 6,
  },
  {
    name: "7",
    suit: "clubs",
    rank: 7,
  },
  {
    name: "8",
    suit: "clubs",
    rank: 8,
  },
  {
    name: "9",
    suit: "clubs",
    rank: 9,
  },
  {
    name: "10",
    suit: "clubs",
    rank: 10,
  },
  {
    name: "jack",
    suit: "clubs",
    rank: 11,
  },
  {
    name: "queen",
    suit: "clubs",
    rank: 12,
  },
  {
    name: "king",
    suit: "clubs",
    rank: 13,
  },
  {
    name: "ace",
    suit: "spades",
    rank: 1,
  },
  {
    name: "2",
    suit: "spades",
    rank: 2,
  },
  {
    name: "3",
    suit: "spades",
    rank: 3,
  },
  {
    name: "4",
    suit: "spades",
    rank: 4,
  },
  {
    name: "5",
    suit: "spades",
    rank: 5,
  },
  {
    name: "6",
    suit: "spades",
    rank: 6,
  },
  {
    name: "7",
    suit: "spades",
    rank: 7,
  },
  {
    name: "8",
    suit: "spades",
    rank: 8,
  },
  {
    name: "9",
    suit: "spades",
    rank: 9,
  },
  {
    name: "10",
    suit: "spades",
    rank: 10,
  },
  {
    name: "jack",
    suit: "spades",
    rank: 11,
  },
  {
    name: "queen",
    suit: "spades",
    rank: 12,
  },
  {
    name: "king",
    suit: "spades",
    rank: 13,
  },
];

///shuffle
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

var shuffleCards = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex = currentIndex + 1;
  }
  return cardDeck;
};

// setting rank as per black jack rules
var counter = 0;
while (counter < deck.length) {
  if (
    deck[counter].name == "jack" ||
    deck[counter].name == "queen" ||
    deck[counter].name == "king"
  ) {
    deck[counter].rank = 10;
  }
  if (deck[counter].name == "ace") {
    deck[counter].rank == 11;
  }
  counter = counter + 1;
}

// shuffle deck
var shuffledDeck = shuffleCards(deck);

// game modes  input name , player hand  ,
var gameMode = "inputName";
var playerName = "";
var yourBetAmount = 0;
var playerScore = 0;

// modes inputName , betAmount, deal2cards , decidehit/Stay , dealerMode 2card autohit
var main = function (input) {
  if (gameMode == "inputName") {
    playerName = input;
    gameMode = "betAmount";
    return "Hi " + playerName + ", type in, how much you want to bet ?";
  }
  if (gameMode == "betAmount") {
    yourBetAmount = input;
    gameMode = "ace1/11";
    return (
      playerName +
      "you have bet:" +
      yourBetAmount +
      "<br>" +
      "select ACE value 1 or 11 for this round "
    );
  }

  if (gameMode == "ace1/11") {
    gameMode = "dealCards";
    var counter = 0;
    while (counter < shuffledDeck.length) {
      if (shuffledDeck[counter].name == "ace") {
        shuffledDeck[counter].rank == input;
      }
      counter = counter + 1;
    }
    return " press submit for dealer to pull out two cards for you,from shuffled deck";
  }

  if (gameMode == "dealCards") {
    var card1 = shuffledDeck.pop();
    var card2 = shuffledDeck.pop();
    playerScore = card1.rank + card2.rank;
    if (playerScore == 21) {
      gameMode = "endGame/newGame";
      decision1 =
        "perfect Blackjack , congrats" + "<br>" + "select end/continue ?";
    }
    if (playerScore > 21) {
      gameMode = "endGame/newGame";
      decision1 = "Bust, you lost your bet" + "<br>" + "select end/continue ?";
    }
    if (playerScore < 21) {
      gameMode = "hitStay";
      decision1 =
        playerName +
        ", you want to hit/stay ? '<br>'note:- hit: want one more card , stay : want Dealer to show his cards";
    }

    return (
      playerName +
      " you bet  " +
      yourBetAmount +
      "<br>" +
      " you got " +
      card1.suit +
      " " +
      card1.name +
      " & " +
      card2.suit +
      card2.name +
      " Your Score is :" +
      playerScore +
      "<br>" +
      decision1
    );
  }

  if (gameMode == "hitStay") {
    if (input == "hit") {
      var card3 = shuffledDeck.pop();
      playerScore = playerScore + card3.rank;

      console.log(card3.rank, playerScore);

      if (playerScore == 21) {
        gameMode = "endGame/newGame";
        decision2 =
          "perfect Blackjack , congrats! you doubled your money to" +
          yourBetAmount * 2 +
          "<br>" +
          "select end/continue ?";
      }
      if (playerScore > 21) {
        gameMode = "endGame/newGame";
        decision2 =
          "Bust, you lost your bet amount" +
          yourBetAmount +
          "<br>" +
          "select end/continue ?";
      }
      if (playerScore < 21) {
        decision2 =
          playerName +
          ", you want to hit/stay ? '<br>'note:- hit: want one more card , stay : want Dealer to show his cards";
      }
      return decision2;
    }

    if (input == "stay") {
      gameMode = "dealer";
      var dealerCard1 = shuffledDeck.pop();
      var dealerCard2 = shuffledDeck.pop();
      var dealerScore = dealerCard1.rank + dealerCard2.rank;
      if (dealerScore < 17) {
        var dealerCard3 = shuffledDeck.pop();
        dealerScore = dealerScore + dealerCard3.rank;
      }
      if (dealerScore > 21) {
        gameMode = "endGame/newGame";
        decision3 =
          "Dealer Bust" +
          playerName +
          " you doubled your money to" +
          yourBetAmount * 2 +
          "<br>" +
          "select end/continue ?";
      }
      if (dealerScore > playerScore) {
        gameMode = "endGame/newGame";
        decision3 =
          "Dealer Won" +
          playerName +
          " you lost your bet amt" +
          yourBetAmount +
          "<br>" +
          "select end/continue ?";
      }

      return decision3;
    }
  }
  if (gameMode == "endGame/newGame") {
    if (input == "end") {
      gameMode = "inputName";
      return "input your name and press submit to start a new game";
    }
    if (input == "continue") {
      gameMode = "betAmount";
      playerScore = 0;
      yourBetAmount = 0;
      return "Hi " + playerName + ", type in, how much you want to bet ?";
    }
  }
};
