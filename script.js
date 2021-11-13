var makeDeck = function () {
  //Initialize empty deck array
  var deck = [];
  //initialize an array of the 4 suits in deck
  var suits = [`hearts`, `diamonds`, `clubs`, `spades`];
  var emoji = [`♥`, `♦️`, `♣`, `♠️`];

  //loop over suits array
  for (var suitIndex = 0; suitIndex < suits.length; suitIndex++) {
    var currentSuit = suits[suitIndex];

    //loop from 1 to 13 to create all cards for a given suit
    for (var rankCounter = 1; rankCounter <= 13; rankCounter++) {
      var cardName = rankCounter;

      //if rank is 1, 11, 12, 13, change card name to ace, jack, queen, king
      if (cardName == 1) {
        cardName = `Ace`;
      } else if (cardName == 11) {
        cardName = `Jack`;
      } else if (cardName == 12) {
        cardName = `Queen`;
      } else if (cardName == 13) {
        cardName = `King`;
      }

      //create a new card object with name, suit, rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        emoji: emoji[suitIndex],
      };

      //change jack, queen, king to rank 10
      if (card.rank == 11 || card.rank == 12 || card.rank == 13) {
        card.rank = 10;
      }

      //add card to the deck
      deck.push(card);
    }
  }
  return deck;
};

var deck = makeDeck();

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

  counter = counter + 1;
}

// shuffle deck
var shuffledDeck = shuffleCards(deck);

// game modes  input name , player hand  ,
var gameMode = "inputName";
var playerName = "";
var yourBetAmount = 0;
var playerScore = 0;
var yourCardDeck = [];
var dealerDeck = [];

var printCard = function (card) {
  cardPic = `<div id="blackcard">${card.name}<br><span class="emoji">${card.emoji}</span></div>`;

  if (card.suit == "hearts" || card.suit == "diamonds") {
    cardPic = `<div id="redcard">${card.name}<br><span class="emoji">${card.emoji}</span></div>`;
  }

  return cardPic;
};

var printDeck = function (yourCardDeck) {
  var count = 0;
  var printYourDeck = [];
  while (count < yourCardDeck.length) {
    printYourDeck.push(printCard(yourCardDeck[count]));
    count = count + 1;
  }
  myOutput = printYourDeck.toString();
  return myOutput;
};

// modes inputName , betAmount, deal2cards , decidehit/Stay , dealerMode 2card autohit
var main = function (input) {
  if (input == "end") {
    gameMode = "inputName";
    playerName = "";
    yourBetAmount = 0;
    playerScore = 0;
    yourCardDeck = [];
    dealerDeck = [];
    deck = makeDeck();
    shuffledDeck = shuffleCards(deck);

    console.log(shuffledDeck.length);

    return "<br>input your name and press 🟢 submit to start a new game<br><br>";
  }
  if (gameMode == "inputName") {
    playerName = input;

    gameMode = "betAmount";
    return (
      "<br/><br/><br/>" +
      "🥂 Hi " +
      playerName +
      ", welcome to the 'No Limit Blackjack Table'" +
      "<br><br/>" +
      "👉  Please type in your betting amount 💰💰💰 in the orange bar above and press 🟢 Submit" +
      "<br/><br/><br/><br/>"
    );
  }
  if (gameMode == "betAmount") {
    yourBetAmount = input;
    gameMode = "ace1/11";
    return (
      "<br/><br/>" +
      "Hi " +
      playerName +
      ", you can decide the Rank of Ace to be either '1' or '11'" +
      "<br/>" +
      "👉 Type in your choice: 1 or 11 in the orange bar above and press 🟢 Submit" +
      "<br/><br/><br/>" +
      "Note : 👑 King, 👸🏻 Queen and 👨‍🎨 Jack , have the Rank 10 " +
      "<br/><br/><br/>"
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
    return (
      "<br>" +
      "<br>" +
      "<br>" +
      "♠️♣️♦️❤️ Press the 🟢 Submit button now ❤️♦️♣️♠️ " +
      "<br>" +
      "🤞 Dealer will shuffle the deck and pull out two cards for you." +
      "<br>" +
      "<br>" +
      "<br>" +
      "<br>"
    );
  }

  if (gameMode == "dealCards") {
    var card1 = shuffledDeck.pop();
    var card2 = shuffledDeck.pop();
    playerScore = card1.rank + card2.rank;
    yourCardDeck = [];
    yourCardDeck.push(card1, card2);
    console.log(yourCardDeck);

    if (playerScore == 21) {
      gameMode = "endGame/newGame";
      decision1 =
        ". WOW you got Perfect Blackjack, you have doubled your money." +
        "<br>" +
        "<br>";
      ("🔴 end  or  🟣 continue ?");
    }
    if (playerScore > 21) {
      gameMode = "endGame/newGame";
      decision1 =
        ". Bad Luck! You got Busted" +
        "<br>" +
        "<br>" +
        "🔴  end or  🟣 continue ?";
    }
    if (playerScore < 21) {
      gameMode = "hitStand";
      decision1 = "<br>" + "<br>" + " 🟡 hit   or   🔵 stand ?";
    }

    return (
      playerName +
      ", your Score is : " +
      playerScore +
      decision1 +
      "<br>" +
      "<br>" +
      printDeck(yourCardDeck)
    );
  }

  if (gameMode == "hitStand") {
    if (input == "hit") {
      var cardN = shuffledDeck.pop();
      playerScore = playerScore + cardN.rank;
      yourCardDeck.push(cardN);

      console.log(cardN.rank, playerScore);

      if (playerScore == 21) {
        gameMode = "endGame/newGame";
        decision2 =
          ". Perfect Blackjack ! you doubled your money to : " +
          yourBetAmount * 2 +
          "<br>" +
          "🔴 end or 🟣 continue ? ";
      }
      if (playerScore > 21) {
        gameMode = "endGame/newGame";
        decision2 =
          ". Bad Luck ! you got busted" + "<br>" + "🔴 end or 🟣 continue ? ";
      }
      if (playerScore < 21) {
        decision2 = "<br>" + "🟡 hit  or  🔵 stand ? ";
      }

      return (
        "Now your score is : " +
        playerScore +
        decision2 +
        "<br>" +
        "<br>" +
        printDeck(yourCardDeck)
      );
    }

    if (input == "stand") {
      gameMode = "dealer";
      var dealerCard1 = shuffledDeck.pop();
      var dealerCard2 = shuffledDeck.pop();
      var dealerScore = dealerCard1.rank + dealerCard2.rank;

      console.log(dealerCard1, dealerCard2);

      dealerDeck.push(dealerCard1, dealerCard2);
      console.log(dealerDeck);

      if (dealerScore < 17) {
        var dealerCard3 = shuffledDeck.pop();
        dealerScore = dealerScore + dealerCard3.rank;
        console.log(dealerCard3);
        dealerDeck.push(dealerCard3);
        console.log(dealerDeck);
      }

      if (dealerScore == playerScore) {
        gameMode = "endGame/newGame";
        decision3 = " It's a Draw. " + "<br>" + "🔴 end or 🟣 continue ? ";
      }

      if (dealerScore > playerScore) {
        gameMode = "endGame/newGame";
        decision3 =
          "Dealer Won, " +
          playerName +
          ", you lost your bet amt : " +
          yourBetAmount +
          "<br>" +
          "🔴 end or 🟣 continue ? ";
      }

      if (dealerScore < playerScore) {
        gameMode = "endGame/newGame";
        decision3 =
          "WOW! " +
          playerName +
          ", you won,  you doubled your money to: " +
          yourBetAmount +
          "<br>" +
          "🔴 end or 🟣 continue ? ";
      }
      if (dealerScore > 21) {
        gameMode = "endGame/newGame";
        decision3 =
          "Dealer got Busted ! " +
          playerName +
          ", you doubled your money to: " +
          yourBetAmount * 2 +
          "<br>" +
          "🔴 end or 🟣 continue ? ";
      }

      return (
        decision3 +
        "<br>" +
        "<br>" +
        printDeck(dealerDeck) +
        "   Dealer scored: " +
        dealerScore +
        "<br>" +
        printDeck(yourCardDeck) +
        "     You scored: " +
        playerScore
      );
    }
  }
  if (gameMode == "endGame/newGame") {
    if (input == "continue") {
      gameMode = "betAmount";
      yourBetAmount = 0;
      playerScore = 0;
      yourCardDeck = [];
      dealerDeck = [];

      console.log(shuffledDeck.length);

      return "Hi " + playerName + ", type in, how much you want to bet ?";
    }
  }
};
