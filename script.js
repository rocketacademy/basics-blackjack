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
var card1 = {};
var card2 = {};
var dealerCards = [];

var printCard = function (card) {
  cardPic = `<div id="blackcard">${card.name}<br><span class="emoji">${card.emoji}</span></div>`;

  if (card.suit == "hearts" || card.suit == "diamonds") {
    cardPic = `<div id="redcard">${card.name}<br><span class="emoji">${card.emoji}</span></div>`;
  }

  return cardPic;
};

// modes inputName , betAmount, deal2cards , decidehit/Stay , dealerMode 2card autohit
var main = function (input) {
  if (gameMode == "inputName") {
    playerName = input;
    gameMode = "betAmount";
    return (
      "🥂 Hi " +
      playerName +
      ", welcome to the 'No Limit Blackjack Table'" +
      "<br>" +
      "👉 Please type in your betting amount 💰💰💰 in the orange bar above !"
    );
  }
  if (gameMode == "betAmount") {
    yourBetAmount = input;
    gameMode = "ace1/11";
    return (
      "🥂 Great " +
      playerName +
      ", today seems to be your lucky day, 💰 you have bet: " +
      yourBetAmount +
      "<br>" +
      "🤞 You can decide the Rank of Ace to be either 1 or 11" +
      "<br>" +
      "👉 Type in your choice: 1 or 11 in the orange bar above."
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
      "🃎 Ace will have Rank: " +
      input +
      " for this round" +
      "<br>" +
      "♣️♠️♦️❤️ So it's now the Blackjack time. 👍 Press the 'Submit' button now" +
      "<br>" +
      "🃏🃏 Dealer will shuffle the deck and pull out two cards for you."
    );
  }

  if (gameMode == "dealCards") {
    card1 = shuffledDeck.pop();
    card2 = shuffledDeck.pop();
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
        ". you want 'hit' or 'stay' ?" +
        "<br>" +
        "Type in your decision 'hit' or 'stay' in the orange bar above.";
    }

    return (
      playerName +
      ", your Score is : " +
      playerScore +
      decision1 +
      "<br>" +
      "<br>" +
      printCard(card1) +
      printCard(card2)
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
          ". Perfect Blackjack! you doubled your money to" +
          yourBetAmount * 2 +
          "<br>" +
          "You want to 'end' or 'continue' the game? " +
          "<br>" +
          " Type in your decision 'end' or 'continue' in the orange bar above";
      }
      if (playerScore > 21) {
        gameMode = "endGame/newGame";
        decision2 =
          ". Bust, you lost your bet amount" +
          yourBetAmount +
          "<br>" +
          "You want to 'end' or 'continue' the game ? " +
          "<br>" +
          " Type in your decision 'end' or 'continue' in the orange bar above";
      }
      if (playerScore < 21) {
        decision2 =
          ". You want 'hit' or 'stay' ?" +
          "<br>" +
          "Type in your decision 'hit' or 'stay' in the orange bar above.";
      }
      return (
        "Now your score is : " +
        playerScore +
        decision2 +
        "<br>" +
        "<br>" +
        printCard(card3)
      );
    }

    if (input == "stay") {
      gameMode = "dealer";
      var dealerCard1 = shuffledDeck.pop();
      var dealerCard2 = shuffledDeck.pop();
      var dealerScore = dealerCard1.rank + dealerCard2.rank;

      console.log(dealerCard1, dealerCard2);

      if (dealerScore < 17) {
        var dealerCard3 = shuffledDeck.pop();
        dealerScore = dealerScore + dealerCard3.rank;
        console.log(dealerCard3);
      }
      if (dealerScore > playerScore) {
        gameMode = "endGame/newGame";
        decision3 =
          "Dealer Won, " +
          playerName +
          ", you lost your bet amt : " +
          yourBetAmount +
          "<br>" +
          "select end or continue ?";
      }
      if (dealerScore > 21) {
        gameMode = "endGame/newGame";
        decision3 =
          "Dealer Bust" +
          playerName +
          " you doubled your money to: " +
          yourBetAmount * 2 +
          "<br>" +
          "select end or continue ?";
      }

      return (
        "Dealer scored: " +
        dealerScore +
        " and you scored: " +
        playerScore +
        "<br>" +
        decision3
      );
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
