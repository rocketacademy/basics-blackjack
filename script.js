var deck = [];
var userName = [];
var DEALER_ARRAY_OF_CARDS = [];
var PLAYER_ARRAY_OF_CARDS = [];
var gameMode = "Enter Player Name";
var GLOBAL_DEALERSCORE = 0;
var GLOBAL_PLAYERSCORE = 0;
var BET_AMOUNT = 0;
var CAPITAL = 100;
var anyoneBJ = false;

var main = function (input) {
  var BJimage =
    '<img src="https://media.istockphoto.com/photos/blackjack-spades-picture-id155428832?k=20&m=155428832&s=612x612&w=0&h=2uVeWUxa8E86H52kFutx5TJN8rPWddQ2qyteZM04TmQ="/>';
  var WINimage =
    '<img src="https://media1.giphy.com/media/2gtoSIzdrSMFO/giphy.gif"/>';
  var LOSEimage =
    '<img src="https://studio.code.org/v3/assets/Nz46a971-jrid5b_mNfMJxVgk_1R22dASJY8LDKBIOM/youlose.gif"/>';

  // Dealer to hit or stand
  if (gameMode == "Dealer's Turn") {
    if (GLOBAL_DEALERSCORE >= 17 && GLOBAL_DEALERSCORE <= 21) {
      dealerChoice = "2";
      dealerDrawAdditionalCard(dealerChoice);
    }
    if (GLOBAL_DEALERSCORE <= 16) {
      dealerChoice = "1";
      dealerDrawAdditionalCard(dealerChoice);
    }
  }
  // Player to decide to hit or skip
  if (gameMode == "Player's Turn") {
    playerDrawAdditionalCard(input);
  }
  // Deal cards and detects if player/dealer gets Blackjack
  if (gameMode == "Deal Cards" || gameMode == "New Game") {
    // Emptying the array before the start of a new round
    DEALER_ARRAY_OF_CARDS.splice(0, DEALER_ARRAY_OF_CARDS.length);
    PLAYER_ARRAY_OF_CARDS.splice(0, PLAYER_ARRAY_OF_CARDS.length);
    // Alternate turns when dealing cards
    DEALER_ARRAY_OF_CARDS.push(deck.pop());
    PLAYER_ARRAY_OF_CARDS.push(deck.pop());
    DEALER_ARRAY_OF_CARDS.push(deck.pop());
    PLAYER_ARRAY_OF_CARDS.push(deck.pop());

    //Tabulating Score for first 2 cards
    if (
      DEALER_ARRAY_OF_CARDS[0].rank == 1 ||
      DEALER_ARRAY_OF_CARDS[1].rank == 1
    ) {
      GLOBAL_DEALERSCORE = tabulateScorewithACE11pts(DEALER_ARRAY_OF_CARDS);
    } else {
      GLOBAL_DEALERSCORE = tabulateScorewithACE1pt(DEALER_ARRAY_OF_CARDS);
    }

    if (
      PLAYER_ARRAY_OF_CARDS[0].rank == 1 ||
      PLAYER_ARRAY_OF_CARDS[1].rank == 1
    ) {
      GLOBAL_PLAYERSCORE = tabulateScorewithACE11pts(PLAYER_ARRAY_OF_CARDS);
    } else GLOBAL_PLAYERSCORE = tabulateScorewithACE1pt(PLAYER_ARRAY_OF_CARDS);

    // Detecting for Blackjack
    var anyoneBJ = false;
    var dealerBJ = detectBJ(DEALER_ARRAY_OF_CARDS[0], DEALER_ARRAY_OF_CARDS[1]);
    var playerBJ = detectBJ(PLAYER_ARRAY_OF_CARDS[0], PLAYER_ARRAY_OF_CARDS[1]);
    if (dealerBJ == true) {
      gameMode = "New Game";
      CAPITAL = CAPITAL - BET_AMOUNT;
      myOutputValue =
        "Dealer got " +
        DEALER_ARRAY_OF_CARDS[0].name +
        DEALER_ARRAY_OF_CARDS[0].suit +
        " and " +
        DEALER_ARRAY_OF_CARDS[1].name +
        DEALER_ARRAY_OF_CARDS[1].suit +
        ". Dealer wins with BLACKJACK!<br> <br> Next Round <br> Your balance is $" +
        CAPITAL +
        "<br> Enter a new betting amount." +
        BJimage;
    } else if (playerBJ == true) {
      gameMode = "New Game";
      CAPITAL = Number(CAPITAL) + Number(BET_AMOUNT) * 1.5;
      myOutputValue =
        userName[0] +
        " got " +
        PLAYER_ARRAY_OF_CARDS[0].name +
        PLAYER_ARRAY_OF_CARDS[0].suit +
        " and " +
        PLAYER_ARRAY_OF_CARDS[1].name +
        PLAYER_ARRAY_OF_CARDS[1].suit +
        ". " +
        userName[0] +
        " wins!<br> <br> Next Round <br> Your balance is $" +
        CAPITAL +
        "<br> Enter a new betting amount." +
        BJimage;
    } else {
      myOutputValue =
        "Dealer's Hand: " +
        DEALER_ARRAY_OF_CARDS[0].name +
        DEALER_ARRAY_OF_CARDS[0].suit +
        " and " +
        DEALER_ARRAY_OF_CARDS[1].name +
        DEALER_ARRAY_OF_CARDS[1].suit +
        ".<br>" +
        userName[0] +
        "'s Hand: " +
        PLAYER_ARRAY_OF_CARDS[0].name +
        PLAYER_ARRAY_OF_CARDS[0].suit +
        " and " +
        PLAYER_ARRAY_OF_CARDS[1].name +
        PLAYER_ARRAY_OF_CARDS[1].suit +
        ". <br> <br> Type 1 to Hit for another card. Type 2 to Stand and end turn";

      gameMode = "Player's Turn";
    }
  }

  if (gameMode == "Betting Amount") {
    if (isNaN(Number(input)) == true || !input) {
      return (myOutputValue = "Sorry, please enter a number");
    } else {
      gameMode = "Deal Cards";
      BET_AMOUNT = input;
      return (myOutputValue =
        userName[0] +
        " has decided to bet $" +
        BET_AMOUNT +
        " <br> <br> Press Submit to start game");
    }
  }
  if (gameMode == "Enter Player Name") {
    makeDeck();
    shuffleDeck(deck);
    userName.push(input);
    gameMode = "Betting Amount";
    myOutputValue =
      userName[0] +
      " has joined the table with a capital of $100! <br> <br>Choose the amount you want to bet!";
  }
  // Round end: either one has above 21
  if (GLOBAL_PLAYERSCORE > 21) {
    CAPITAL = CAPITAL - BET_AMOUNT;
    gameMode = "Betting Amount";
    myOutputValue =
      "Your last drawn was " +
      PLAYER_ARRAY_OF_CARDS[PLAYER_ARRAY_OF_CARDS.length - 1].name +
      PLAYER_ARRAY_OF_CARDS[PLAYER_ARRAY_OF_CARDS.length - 1].suit +
      ".<br>" +
      userName[0] +
      " has busted with " +
      GLOBAL_PLAYERSCORE +
      "pts. <br> Dealer has " +
      GLOBAL_DEALERSCORE +
      "pts. <br> <br> Dealer wins! <br> Your balance is $" +
      CAPITAL +
      "<br> Enter a new betting amount.<br>" +
      LOSEimage;
  }
  if (GLOBAL_DEALERSCORE > 21) {
    CAPITAL = Number(CAPITAL) + Number(BET_AMOUNT);
    gameMode = "Betting Amount";
    myOutputValue =
      "Dealer's last drawn was " +
      DEALER_ARRAY_OF_CARDS[DEALER_ARRAY_OF_CARDS.length - 1].name +
      DEALER_ARRAY_OF_CARDS[DEALER_ARRAY_OF_CARDS.length - 1].suit +
      ".<br> Dealer has busted with " +
      GLOBAL_DEALERSCORE +
      "pts. <br>" +
      userName[0] +
      " has " +
      GLOBAL_PLAYERSCORE +
      "pts. <br> <br>" +
      userName[0] +
      " wins! <br> Your balance is $" +
      CAPITAL +
      "<br> Enter a new betting amount. <br>" +
      WINimage;
  }
  // Round end: comparison mode with both below 21
  if (gameMode == "Higher Points") {
    // Tie
    if (GLOBAL_PLAYERSCORE == GLOBAL_DEALERSCORE) {
      gameMode = "Betting Amount";
      myOutputValue =
        "Its a tie. Both dealer and " +
        userName[0] +
        " have " +
        GLOBAL_DEALERSCORE +
        "pts. <br> <br> Next Round <br> Your balance is $" +
        CAPITAL +
        "<br> Enter a new betting amount.";
    }
    // Dealer win
    if (GLOBAL_DEALERSCORE > GLOBAL_PLAYERSCORE) {
      gameMode = "Betting Amount";
      CAPITAL = CAPITAL - BET_AMOUNT;
      myOutputValue =
        "Dealer won! Dealer has " +
        GLOBAL_DEALERSCORE +
        "pts against " +
        userName[0] +
        "'s " +
        GLOBAL_PLAYERSCORE +
        "pts.<br> <br> Next Round <br> Your balance is $" +
        CAPITAL +
        "<br> Enter a new betting amount.<br>" +
        LOSEimage;
    }
    //Player win
    if (GLOBAL_DEALERSCORE < GLOBAL_PLAYERSCORE) {
      gameMode = "Betting Amount";
      CAPITAL = Number(CAPITAL) + Number(BET_AMOUNT);
      myOutputValue =
        userName[0] +
        " won! Dealer has " +
        GLOBAL_DEALERSCORE +
        "pts against " +
        userName[0] +
        "'s " +
        GLOBAL_PLAYERSCORE +
        "pts.<br> <br> Next Round <br> Your balance is $" +
        CAPITAL +
        "<br> Enter a new betting amount.<br>" +
        WINimage;
    }
  }

  return (
    myOutputValue +
    "<br> <br> Dealer current points: " +
    GLOBAL_DEALERSCORE +
    "<br>" +
    userName[0] +
    " current points: " +
    GLOBAL_PLAYERSCORE
  );
};

// Deck Creation Function
var makeDeck = function () {
  // first loop being the smaller loop (4 suits)
  var suitIndex = 0;
  //  var suits = ["Spades♠", "Hearts♥", "Clubs♣", "Diamonds♦"];
  var suits = ["♠", "♥", "♣", "♦"];
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    // second loop being the bigger loop (1-13)
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      if (cardName == 1) {
        cardName = "Ace";
      } else if (cardName == 11) {
        cardName = "Jack";
      } else if (cardName == 12) {
        cardName = "Queen";
      } else if (cardName == 13) {
        cardName = "King";
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      rankCounter = rankCounter + 1;
      deck.push(card);
    }
    suitIndex = suitIndex + 1;
  }
  return deck;
};
// Card Shuffling Function
var getShuffleIndex = function (numberofcards) {
  return Math.floor(Math.random() * numberofcards);
};
var shuffleDeck = function (deck) {
  // loop the deck array
  var currentIndex = 0;
  while (currentIndex < deck.length) {
    var shuffleIndex = getShuffleIndex(deck.length);
    var randomCard = deck[shuffleIndex];
    var currentCard = deck[currentIndex];
    deck[currentIndex] = randomCard;
    deck[shuffleIndex] = currentCard;
    currentIndex = currentIndex + 1;
  }
  return deck;
};

// Player Hit or Stand Function
var playerDrawAdditionalCard = function (playerChoice) {
  if (playerChoice == "1") {
    playerNewCard = deck.pop();
    PLAYER_ARRAY_OF_CARDS.push(playerNewCard);
    var playerArrayIndex = 0;
    while (playerArrayIndex < PLAYER_ARRAY_OF_CARDS.length) {
      if (
        PLAYER_ARRAY_OF_CARDS[playerArrayIndex].rank == 1 &&
        GLOBAL_PLAYERSCORE <= 11
      ) {
        GLOBAL_PLAYERSCORE = tabulateScorewithACE11pts(PLAYER_ARRAY_OF_CARDS);
      } else {
        GLOBAL_PLAYERSCORE = tabulateScorewithACE1pt(PLAYER_ARRAY_OF_CARDS);
      }
      playerArrayIndex = playerArrayIndex + 1;
    }
    local_playerscore = GLOBAL_PLAYERSCORE;
    return (myOutputValue =
      "You got " +
      playerNewCard.name +
      playerNewCard.suit +
      ". <br> Dealer's Hand is " +
      GLOBAL_DEALERSCORE +
      ".<br> " +
      userName[0] +
      "'s Hand is " +
      GLOBAL_PLAYERSCORE +
      ". <br> <br> Type 1 to Hit for another card. Type 2 to Stand and end turn");
  } else if (playerChoice == "2") {
    gameMode = "Dealer's Turn";
    myOutputValue =
      "You decided not to draw a card. <br> Dealer's Hand is " +
      GLOBAL_DEALERSCORE +
      ". <br> " +
      userName[0] +
      "'s hand is " +
      GLOBAL_PLAYERSCORE +
      "<br> Dealer's Turn!";
  }
  return myOutputValue;
};
// Computer Hit or Stand Function
var dealerDrawAdditionalCard = function (dealerChoice) {
  if (dealerChoice == "1") {
    dealerNewCard = deck.pop();
    DEALER_ARRAY_OF_CARDS.push(dealerNewCard);
    var dealerArrayIndex = 0;
    while (dealerArrayIndex < DEALER_ARRAY_OF_CARDS.length) {
      if (
        DEALER_ARRAY_OF_CARDS[dealerArrayIndex].rank == 1 &&
        GLOBAL_DEALERSCORE <= 11
      ) {
        GLOBAL_DEALERSCORE = tabulateScorewithACE11pts(DEALER_ARRAY_OF_CARDS);
      } else {
        GLOBAL_DEALERSCORE = tabulateScorewithACE1pt(DEALER_ARRAY_OF_CARDS);
      }
      dealerArrayIndex = dealerArrayIndex + 1;
    }

    return (myOutputValue =
      "Dealer got " +
      dealerNewCard.name +
      dealerNewCard.suit +
      ". <br> Dealer's Hand is " +
      GLOBAL_DEALERSCORE +
      ".<br> " +
      userName[0] +
      "'s Hand is " +
      GLOBAL_PLAYERSCORE +
      ".");
  } else if (dealerChoice == "2") {
    gameMode = "Higher Points";
    return (myOutputValue =
      "Dealer is above 17, he must stand. <br> Dealer's Hand is " +
      GLOBAL_DEALERSCORE +
      ".<br>" +
      userName[0] +
      "'s hand is " +
      GLOBAL_PLAYERSCORE);
  }
  return myOutputValue;
};
// Detection of BlackJack Function
var detectBJ = function (card1, card2) {
  if (
    (card1.rank == 1 && card2.rank >= 10) ||
    (card2.rank == 1 && card1.rank >= 10)
  ) {
    var anyoneBJ = true;
    return anyoneBJ;
  }
};

// if total points is equal or less than 10, and there is an ace, ACE will be 11 pts
// if there is ACE and the score is below 11, Ace will be considered as 11pts for calculation
var tabulateScorewithACE11pts = function (cardsArray) {
  var score = 0;
  var arrayIndex = 0;
  console.log("got ACE");
  while (arrayIndex < cardsArray.length) {
    if (cardsArray[arrayIndex].rank == 1) {
      //console.log("11 points");
      score = score + 11;
    } else if (cardsArray[arrayIndex].rank < 10) {
      //console.log("below 10 points");
      score = score + cardsArray[arrayIndex].rank;
    } else {
      //console.log("10 points");
      score = score + 10;
    }
    arrayIndex = arrayIndex + 1;
  }
  return score;
};

var tabulateScorewithACE1pt = function (cardsArray) {
  var score = 0;
  var arrayIndex = 0;
  console.log("ACE is assuming as 1 pt");
  while (arrayIndex < cardsArray.length) {
    if (cardsArray[arrayIndex].rank < 10) {
      score = score + cardsArray[arrayIndex].rank;
    } else {
      score = score + 10;
    }
    arrayIndex = arrayIndex + 1;
  }
  return score;
};
