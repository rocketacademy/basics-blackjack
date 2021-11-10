// make a deck of 52 cards
var makeDeck = function () {
  var cardDeck = [];
  var suits = ["♥️", "♦️", "♣️", "♠️"];

  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];

    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }

      var card = { name: cardName, suit: currentSuit, rank: rankCounter };

      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};

// getting random index from 0 (inclusive) to max (exclusive)
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// shuffe deck of 52 cards
var shuffleCards = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex += 1;
  }
  return cardDeck;
};

// checking if is a blackjack
var isBlackJack = function (hand) {
  // if 1st card is ace and 2nd card is 10, jack, queen, or king, OR
  if (
    (hand[0].rank == 1 && hand[1].rank >= 10 && hand[1].rank <= 13) ||
    // if 1st card is 10, jack, queen, or king, and 2nd card is ace
    (hand[0].rank >= 10 && hand[0].rank <= 13 && hand[1].rank == 1)
  ) {
    return true;
  }
};

// to calculate total score of hand
var calculateScore = function (hand) {
  var handIndex = 0;
  var handScore = 0;
  var numOfAces = 0;
  // this assumes all aces contribute to the score by 1
  while (handIndex < hand.length) {
    if (
      hand[handIndex].name == "king" ||
      hand[handIndex].name == "queen" ||
      hand[handIndex].name == "jack"
    ) {
      handScore += 10;
    } else if (hand[handIndex].name == "ace") {
      handScore += 11;
      numOfAces += 1;
    } else {
      console.log("within function handIndex: ", handIndex);
      handScore = handScore + hand[handIndex].rank;
      console.log("within function handScore: ", handScore);
    }

    handIndex += 1;
  }

  // adjust for variable ace
  // If there are aces in the hand
  // if deck is more than 21, ace will be 1

  while (numOfAces >= 1) {
    if (handScore > 21) {
      handScore -= 10;
    }
    numOfAces -= 1;
  }

  return handScore;
};

// return output for cards
var cardsDrawn = function (hand) {
  cardsIndex = 0;
  cardsHand = "";
  while (cardsIndex < hand.length) {
    cardsHand =
      cardsHand + `${hand[cardsIndex].name} of ${hand[cardsIndex].suit}<br>`;
    cardsIndex += 1;
  }

  return cardsHand;
};

// return first card - for dealer
var firstCard = function (hand) {
  var dealerFirstCard = `${hand[0].name} of ${hand[0].suit}<br>`; // CHECK FOR ERROR!!!
  return dealerFirstCard;
};

// When player presses the "hit" button
var buttonMode = "";
var hit = function () {
  console.log("THIS IS HIT!!!");
  playerHand.push(cardDeck.pop());
  myOutputValue =
    myOutputValue +
    "PLAYER: " +
    calculateScore(playerHand) +
    "<br>" +
    cardsDrawn(playerHand) +
    "<br> COMPUTER: <br>" +
    firstCard(compHand) +
    "<br> Please enter only hit or stand.";
};

// when player presses the "stand" button
var stand = function () {
  console.log("THIS IS STAND!!!");
  currentGameMode = CALCULATE_SCORE;
  myOutputValue =
    myOutputValue +
    cardsDrawn(playerHand) +
    "<br> COMPUTER: <br>" +
    firstCard(compHand) +
    "<br> Press submit to calculate score.";
};

// amount left and current bet output
var playerMoney = function () {
  var playerMoneyTracker =
    "Amt Left: $" +
    playerPoints +
    "<br> Current Bet: $" +
    playerBet +
    "<br><br>";
  return playerMoneyTracker;
};

// setting various game modes
var PLACE_BETS = "place bets";
var DEAL_HAND = "deal hand";
var CARDS_DRAWN = "cards drawn";
var HIT_OR_STAND = "hit or stand";
var CALCULATE_SCORE = "calculate score";
var PLAYER_ENTERS_ROOM = "start";

// set global variables for games
var playerHand = [];
var compHand = [];
var cardDeck = [];
var currentGameMode = PLAYER_ENTERS_ROOM;
var playerPoints = 100;
var playerBet = 0;
var myOutputValue = "";
var compFirstCard = "";

var main = function (input) {
  myOutputValue = playerMoney();

  console.log("game mode:", currentGameMode);

  if (currentGameMode == "start") {
    myOutputValue = myOutputValue + "Please place your bet.";
    console.log("player bet: ", playerBet);
    console.log("player points:", playerPoints);
    currentGameMode = PLACE_BETS;
    return myOutputValue;
  }

  console.log("game mode:", currentGameMode);

  if (currentGameMode == "place bets") {
    playerBet = Number(input);
    console.log(input);
    playerPoints = playerPoints - playerBet;
    console.log("game mode:", currentGameMode);
    console.log("player bet: ", playerBet);
    console.log("player points:", playerPoints);

    myOutputValue = playerMoney() + "Press submit to deal hand.";
    currentGameMode = DEAL_HAND;

    return myOutputValue;
  }

  if (currentGameMode == "deal hand") {
    console.log("game mode:", currentGameMode);
    // making and shuffling a deck
    cardDeck = shuffleCards(makeDeck());

    // giving out 2 cards to each player
    var dealingIndex = 0;
    while (dealingIndex < 2) {
      playerHand.push(cardDeck.pop());
      compHand.push(cardDeck.pop());
      dealingIndex += 1;
    }

    console.log("playerHand: ", playerHand);
    console.log("compHand: ", compHand);
    console.log("cardDeck: ", cardDeck);

    myOutputValue =
      myOutputValue +
      "Cards has been dealt. <br> Press submit to calculate cards.";
    currentGameMode = CARDS_DRAWN;

    return myOutputValue;
  }
  console.log("hereeee");

  if (currentGameMode == "cards drawn") {
    console.log("game mode:", currentGameMode);
    console.log("myOutputValue: ", myOutputValue);
    myOutputValue =
      myOutputValue +
      "PLAYER: " +
      calculateScore(playerHand) +
      "<br>" +
      cardsDrawn(playerHand);

    // a tie if both draws blackjack
    if (isBlackJack(playerHand) && isBlackJack(compHand)) {
      myOutputValue =
        myOutputValue +
        "<br>COMPUTER: <br>" +
        cardsDrawn(compHand) +
        "<br> A blackjack tie!";
      playerPoints += playerBet;
      myOutputValue = myOutputValue + "<br><br> Press submit to play again.";

      // reset mode & counters
      playerHand = [];
      compHand = [];
      cardDeck = [];
      currentGameMode = DEAL_HAND;

      //return myOutputValue;
    } // a blackjack win when either player or computer draws blackjack
    else if (isBlackJack(playerHand)) {
      myOutputValue =
        myOutputValue +
        "<br> COMPUTER: <br>" +
        cardsDrawn(compHand) +
        "<br> Blackjack, you win!";
      playerPoints += 3 * playerBet;
      myOutputValue = myOutputValue + "<br><br> Press submit to play again.";

      // reset mode & counters
      playerHand = [];
      compHand = [];
      cardDeck = [];
      playerBet = 0;
      currentGameMode = PLAYER_ENTERS_ROOM;

      //return myOutputValue;
    } else if (isBlackJack(compHand)) {
      myOutputValue =
        myOutputValue +
        "<br>COMPUTER: <br>" +
        cardsDrawn(compHand) +
        "<br> Blackjack, computer wins!";
      playerPoints -= 0.5 * playerBet;
      myOutputValue = myOutputValue + "<br><br> Press submit to play again.";

      // reset mode & counters
      playerHand = [];
      compHand = [];
      cardDeck = [];
      playerBet = 0;
      currentGameMode = PLAYER_ENTERS_ROOM;

      //return myOutputValue;
    } else {
      //if no blackjack, game continues with 1 dealer card shown
      compFirstCard = firstCard(compHand);
      myOutputValue =
        myOutputValue +
        "<br> COMPUTER: <br>" +
        compFirstCard +
        "<br> Please choose hit or stand then press the submit button.";
    }

    currentGameMode = HIT_OR_STAND;
    //return myOutputValue;
  }

  if (currentGameMode == "hit or stand") {
    console.log("game mode:", currentGameMode);
    myOutputValue = "PLAYER: " + calculateScore(playerHand) + "<br>";

    if (input == "") {
      myOutputValue =
        myOutputValue +
        cardsDrawn(playerHand) +
        "<br> COMPUTER: <br>" +
        compFirstCard +
        "<br> Please enter only hit or stand then press the submit button.";
    }
    /*
    if (buttonMode == hit) {
      return myOutputValue;
    }

    if (input == "hit") {
      // player chooses to hit or stand
      console.log("playerHand: ", playerHand);
      playerHand.push(cardDeck.pop());
      myOutputValue =
        "PLAYER: " +
        calculateScore(playerHand) +
        "<br>" +
        cardsDrawn(playerHand) +
        "<br> COMPUTER: <br>" +
        firstCard(compHand) +
        "<br> Please enter only hit or stand then press the submit button.";
    } else if (input == "stand") {
      currentGameMode = CALCULATE_SCORE;
      myOutputValue =
        myOutputValue +
        cardsDrawn(playerHand) +
        "<br> COMPUTER: <br>" +
        firstCard(compHand) +
        "<br> Press submit to calculate score.";
    } */
    //return myOutputValue;
  }

  if (currentGameMode == "calculate score") {
    // computer hit if hand is below 17
    while (calculateScore(compHand) < 17) {
      compHand.push(cardDeck.pop());
    }

    // count computer's score
    var compHandScore = calculateScore(compHand);
    console.log("compHandScore: ", compHandScore);

    // count player's score
    var playerHandScore = calculateScore(playerHand);
    console.log("playerHandScore: ", playerHandScore);

    // output message for player's and computer's hand and score
    myOutputValue =
      myOutputValue +
      "PLAYER: " +
      playerHandScore +
      "<br>" +
      cardsDrawn(playerHand) +
      "<br>COMPUTER: " +
      compHandScore +
      "<br>" +
      cardsDrawn(compHand);

    // player win if score is more than computer's score and not above 21
    if (
      (playerHandScore > compHandScore && playerHandScore <= 21) ||
      (playerHandScore <= 21 && compHandScore > 21)
    ) {
      playerPoints += 2 * playerBet;
      console.log("amount left: ", playerPoints);
      console.log("player bet: ", playerBet);
      myOutputValue =
        myOutputValue +
        "<br> Player Wins! <br><br> Press submit to play again.";
    }

    // player loses if score is less than computer's score and not above 21
    if (
      (playerHandScore < compHandScore && compHandScore <= 21) ||
      (compHandScore <= 21 && playerHandScore > 21)
    ) {
      // playerPoints -= playerBet;
      console.log("amount left: ", playerPoints);
      console.log("player bet: ", playerBet);
      myOutputValue = myOutputValue + "<br> Computer Wins!";

      if (playerPoints <= 0) {
        myOutputValue =
          myOutputValue +
          "<br><br> GAME OVER!!! YOU HAVE LOST ALL YOUR MONEY💸💸💸";
      } else {
        myOutputValue = myOutputValue + "<br><br> Press submit to play again.";
      }
    }

    // A tie if player and computer have same hand or both have hands above 21
    if (
      playerHandScore == compHandScore ||
      (playerHandScore > 21 && compHandScore > 21)
    ) {
      console.log("amount left: ", playerPoints);
      console.log("player bet: ", playerBet);
      playerPoints += playerBet;
      myOutputValue =
        myOutputValue + "<br> A tie! <br><br> Press submit to play again.";
    }

    // reset mode & counters
    playerHand = [];
    compHand = [];
    cardDeck = [];
    playerBet = 0;
    currentGameMode = PLAYER_ENTERS_ROOM;
    compFirstCard = "";
  }

  console.log("amount left: ", playerPoints);
  console.log("player bet: ", playerBet);
  return myOutputValue;
};
