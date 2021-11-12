// define global variables

var BLACKJACK_LIMIT = 21;
var COMPUTER_LIMIT = 17;

var playersArray = [];
var numOfPlayers = 0;
var currentPlayerNum = 0;
var currentPlayer = "";

var computerHand = [];
var computerHandSum = 0;

// Standard Messages
var playerHandMessage = "<br> Your Current Hand:  ";
var playerSumMessage = "<br><br> Your score: ";
var computerHandMessage = "<br><br> Dealer's Hand: ";
var computerSumMessage = "<br><br> Dealer's score: ";
var fullStandardMessage =
  playerHandMessage +
  playerSumMessage +
  computerHandMessage +
  computerSumMessage;

var playerWinImage =
  '<img src="https://c.tenor.com/UqCt0UVxGBwAAAAM/jack-black-rock-on.gif">';

var playerLoseImage =
  '<img src="https://c.tenor.com/aNB_j5rIEJYAAAAM/this-blows-saxophone.gif">';

var playerBlackjackImage =
  '<img src="https://c.tenor.com/taYZlTZwB-MAAAAM/bitcoin-btc.gif">';
// == CREATE DECK == //

// create standard deck

var makeDeck = function () {
  var cardDeck = [];
  var suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
  var suitEmoji = ["♥", "♦", "♣️", "♠️"];
  var cardEmoji = [
    "🅰️",
    "2️⃣",
    "3️⃣",
    "4️⃣",
    "5️⃣",
    "6️⃣",
    "7️⃣",
    "8️⃣",
    "9️⃣",
    "🔟",
    "🎃",
    "👸🏻👸🏽👸🏾",
    "🤴🏻🤴🏽🤴🏿",
  ];
  var suitIndex = 0;

  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var currentSuitEmoji = suitEmoji[suitIndex];

    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      var currentCardEmoji = cardEmoji[rankCounter - 1];

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
        cardEmoji: currentCardEmoji,
        suitEmoji: currentSuitEmoji,
      };

      cardDeck.push(card);

      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};

var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

//shuffle the deck of cards
var shuffleCards = function (cards) {
  var currentIndex = 0;
  while (currentIndex < cards.length) {
    var randomIndex = getRandomIndex(cards.length);
    var randomCard = cards[randomIndex];
    var currentCard = cards[currentIndex];
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;

    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cards;
};

// Create deck for BlackJack - 1. Standard Deck 2. Shuffle standard deck

var gameDeck = shuffleCards(makeDeck());

// Create player list/array

var createListOfPlayers = function (playerName) {
  playersArray.push({
    id: playersArray.length + 1,
    name: playerName,
    hand: [],
    sum: 0,
    bet: 0,
    score: 100,
    playerHandMessage: "<br>" + playerName + "'s hand: ",
    playerSumMessage: "<br> Sum of " + playerName + "'s hand: ",
  });
};

// == HELPER FUNCTIONS == //

// Helper function to sum hand

var sumHand = function (hand) {
  var numOfAces = 0;
  var sum = 0;
  var counter = 0;

  while (counter < hand.length) {
    var currentCard = hand[counter];

    if (currentCard.rank == 1) {
      numOfAces = numOfAces + 1;
      sum = sum + 11;
    } else if (currentCard.rank > 10) {
      sum = sum + 10;
    } else if (
      currentCard.rank == 1 &&
      numOfAces > 0 &&
      sum + 11 > BLACKJACK_LIMIT
    ) {
      sum = sum + 1;
    } else {
      sum = sum + currentCard.rank;
    }

    counter += 1;
  }
  return sum;
};

// helper function to output cards in hand for messages

var displayCards = function (hand) {
  console.log("enter display card function");
  var cards = "";
  var handCounter = 0;

  while (handCounter < hand.length) {
    console.log("enter displaycard while loop");
    console.log("hand counter" + handCounter);
    console.log("hand length" + hand.length);
    cards =
      cards +
      "<br>" +
      hand[handCounter].cardEmoji +
      " of " +
      hand[handCounter].suitEmoji +
      " .";
    handCounter = handCounter + 1;
  }

  console.log("hand counter: " + handCounter + ". hand: " + cards);
  return cards;
};

//Helper function to determine winners

var determineWinner = function () {
  computerHandMessage = computerHandMessage + displayCards(computerHand);
  computerSumMessage = computerSumMessage + computerHandSum;
  currentPlayer = playersArray[currentPlayerNum];
  playerHandMessage = playerHandMessage + displayCards(currentPlayer.hand);
  playerSumMessage = playerSumMessage + currentPlayer.sum;

  var winningMessage =
    "<br><br> You won! Click submit for next player's turn. <br><br>" +
    playerWinImage;
  var winningLastPlayerMessage =
    "<br><br> You won! Click refresh to start a new round. <br><br>" +
    playerWinImage;
  var losingMessage =
    "<br><br> You lost! Click submit for next player's turn. <br><br>" +
    playerLoseImage;
  var losingLastPlayerMessage =
    "<br><br> You lost! Click refresh to start a new round. <br><br>" +
    playerLoseImage;
  var playerBlackjackMessage =
    "<br><br> You won! Click submit for next player's turn. <br><br>" +
    playerBlackjackImage;
  var lastPlayerBlackjackMessage =
    "<br><br> You won! Click refresh to start a new round. <br><br>" +
    playerBlackjackImage;

  fullStandardMessage =
    playerHandMessage +
    playerSumMessage +
    computerHandMessage +
    computerSumMessage;

  var gameResultMessage = "";

  // both player and computer exceeds blackjack

  if (
    currentPlayer.sum > BLACKJACK_LIMIT &&
    computerHandSum > BLACKJACK_LIMIT
  ) {
    if (currentPlayer.id == playersArray.length) {
      gameResultMessage =
        fullStandardMessage +
        "<br> Both player and dealer lose. Refresh to play again! <br><br>" +
        playerLoseImage;
    } else
      gameResultMessage =
        fullStandardMessage +
        "<br> Both player and dealer lose. Click submit for next player's turn. <br><br>" +
        playerLoseImage;
  }

  // player exceeds blackjack
  else if (currentPlayer.sum > BLACKJACK_LIMIT) {
    if (currentPlayer.id == playersArray.length) {
      gameResultMessage =
        playerHandMessage +
        computerHandMessage +
        "<br> Sum of your hand is " +
        currentPlayer.sum +
        ", greater than 21." +
        losingLastPlayerMessage;
    } else
      gameResultMessage =
        playerHandMessage +
        computerHandMessage +
        "<br> Sum of your hand is " +
        currentPlayer.sum +
        ", greater than 21." +
        losingMessage;
  }

  // computer excedes Blackjack
  else if (computerHandSum > BLACKJACK_LIMIT) {
    if (currentPlayer.id == playersArray.length) {
      gameResultMessage =
        playerHandMessage +
        computerHandMessage +
        "<br> Sum of computer's hand is " +
        computerHandSum +
        ", greater than 21." +
        winningLastPlayerMessage;
    } else
      gameResultMessage =
        playerHandMessage +
        computerHandMessage +
        "<br> Sum of computer's hand is " +
        computerHandSum +
        ", greater than 21." +
        winningMessage;
    // is player or computer hand = 21? either wins
  } else if (
    currentPlayer.sum == BLACKJACK_LIMIT &&
    computerHandSum == BLACKJACK_LIMIT
  ) {
    if (currentPlayer.id == playersArray.length) {
      gameResultMessage =
        fullStandardMessage +
        "BLACKJACK! Both you and the computer won. Refresh to play again! <br><br> " +
        playerWinImage;
    } else
      gameResultMessage =
        fullStandardMessage +
        "BLACKJACK! Both you and the computer won. Click submit for next player's turn." +
        playerLoseImage;
  } else if (currentPlayer.sum == BLACKJACK_LIMIT) {
    if (currentPlayer.id == playersArray.length) {
      gameResultMessage =
        fullStandardMessage + "BLACKJACK! " + winningLastPlayerMessage;
    } else
      gameResultMessage = fullStandardMessage + "BLACKJACK! " + winningMessage;
  } else if (computerHandSum == BLACKJACK_LIMIT) {
    if (currentPlayer.id == playersArray.length) {
      gameResultMessage =
        fullStandardMessage + " COMPUTER BLACKJACK! " + losingLastPlayerMessage;
    } else
      gameResultMessage =
        fullStandardMessage + " COMPUTER BLACKJACK! " + losingMessage;
  }
  // if player or computer hand is less than 21, compare for winner
  else if (computerHandSum > currentPlayer.sum) {
    if (currentPlayer.id == playersArray.length) {
      gameResultMessage = fullStandardMessage + losingLastPlayerMessage;
    } else gameResultMessage = fullStandardMessage + losingMessage;
  } else if (computerHandSum < currentPlayer.sum) {
    if (currentPlayer.id == playersArray.length) {
      gameResultMessage = fullStandardMessage + winningLastPlayerMessage;
    } else gameResultMessage = fullStandardMessage + winningMessage;
  }

  playerHandMessage = "<br> Your Current Hand:  ";
  playerSumMessage = "<br><br> Your score: ";
  computerHandMessage = "<br><br> Dealer's Hand: ";
  computerSumMessage = "<br><br> Dealer's score: ";
  fullStandardMessage =
    playerHandMessage +
    playerSumMessage +
    computerHandMessage +
    computerSumMessage;

  return gameResultMessage;
};

// function to deal first two cards to players and computer

var firstHandDealt = function () {
  console.log("enter first hand dealt");
  console.log(gameDeck.pop());

  var cardsDealtPerPax = 0;
  // var cardsDealtPlayer = 0;
  // var cardsDealtComputer = 0;

  while (cardsDealtPerPax < 2) {
    console.log("dealing cards to computer");
    //while cards dealt per person is less than two
    // deal to computer
    computerHand.push(gameDeck.pop());
    computerHandSum = sumHand(computerHand);
    //cardsDealtComputer = cardsDealtComputer + 1;

    // while current player index is less than no of players, deal to players
    //while (currentPlayerNum < playersArray.length) {
    currentPlayer = playersArray[currentPlayerNum];
    currentPlayer.hand.push(gameDeck.pop());
    currentPlayer.sum = sumHand(currentPlayer.hand);

    cardsDealtPerPax += 1;
    //currentPlayerNum += 1;
    //console.log(displayCards(currentPlayer.hand));
  }

  //currentPlayerNum = 0; //reset

  //cardsDealtPlayer += 1;

  return (
    "Player " +
    currentPlayer.id +
    ", your first two cards have been dealt. Click submit to continue."
  );
};

var changeToNextPlayerOrEndGame = function (main) {
  computerHand = [];
  console.log("enter change to next player function");
  console.log("current player num = " + currentPlayerNum);
  console.log("array length " + playersArray.length);

  currentPlayerNum = currentPlayerNum + 1;
  currentPlayer = playersArray[currentPlayerNum];
  gameMode = FIRST_HAND_MODE;

  if (currentPlayerNum >= playersArray.length) {
    return "All players have gone, and this round has ended. Click refresh to play again.";
  } else
    return (
      "Player " +
      currentPlayer.id +
      ", " +
      currentPlayer.name +
      ", it is now your turn. <br><br> Click submit to deal hand."
    );
};

// main function

var ENTER_PLAYER_NUM_MODE = "ENTER NUMBER OF PLAYERS";
var ENTER_PLAYER_NAME_MODE = "ENTER PLAYER NAME";
var FIRST_HAND_MODE = "FIRST HAND MODE";
var CHOOSE_HIT_OR_STAND = "CHOOSE HIT OR STAND";
var HITTING_OR_STANDING = "HITTING OR STANDING";
var TRANSITION_TO_NEXT_PLAYER = "TRANSITION TO NEXT PLAYER";
var gameMode = ENTER_PLAYER_NUM_MODE;

var main = function (input) {
  // start mode - ensure player hand has nothing inside
  currentPlayer = playersArray[currentPlayerNum];

  var myOutputValue =
    "Did you enter 'hit' or 'stand' correctly? <br> Or if the round has ended, press refresh to start a new game.";

  console.log("game start");
  console.log("game mode: " + gameMode);

  // ENTER NUMBER OF PLAYERS

  if (gameMode == ENTER_PLAYER_NUM_MODE) {
    numOfPlayers = input;
    gameMode = ENTER_PLAYER_NAME_MODE;

    myOutputValue =
      "Hello! You have chosen a  " +
      numOfPlayers +
      "-person game. Player 1, please begin by typing in your name.";

    if (isNaN(input) || input == "") {
      gameMode = ENTER_PLAYER_NUM_MODE;
      myOutputValue = "Please enter a number.";
    }

    return myOutputValue;
  }

  // STORE NUMBER OF PLAYERS

  if (gameMode == ENTER_PLAYER_NAME_MODE) {
    var playerName = input;
    createListOfPlayers(playerName);
    console.log(playersArray);

    var myOutputValue =
      "Welcome! " +
      playerName +
      "👋🏻 <br> Next player, please key in your name.";

    if (playersArray.length == numOfPlayers) {
      gameMode = FIRST_HAND_MODE;
      myOutputValue =
        "Hello, " +
        playerName +
        "!👋🏻 <br><br> You are the final player. <br> <br> Now that all players have entered your names, click submit to deal cards";
    }

    return myOutputValue;
  }

  // DEAL FIRST TWO CARDS TO PLAYERS AND COMPUTER

  if (gameMode == FIRST_HAND_MODE) {
    console.log("enter game mode 2");
    gameMode = CHOOSE_HIT_OR_STAND;
    console.log("test 2");
    //console.log(firstHandDealt());
    return firstHandDealt();
  }

  // DETERMINE WHETHER OR NOT OT ENTER HIT/STAND MODE, THEN OUTPUT MESSAGE TO GUIDE PLAYER TO 'HIT' OR STAND
  // if neither hands >= 21, then enter mode for player to enter hit/stand
  // player inputs "hit" (draw another card), or "stand" (end game at current results)

  if (gameMode == CHOOSE_HIT_OR_STAND) {
    console.log("enter hit stand mode");
    console.log("current player is player " + currentPlayer.id);
    console.log("current player hand is " + displayCards(currentPlayer.hand));

    myOutputValue =
      currentPlayer.playerHandMessage +
      displayCards(currentPlayer.hand) +
      currentPlayer.playerSumMessage +
      currentPlayer.sum +
      "<br><br> Now enter 'hit' to draw another card, or 'stand' to end game. <br><br> Btw, the computer's first card is the " +
      computerHand[0].cardEmoji +
      " of " +
      computerHand[0].suitEmoji;

    gameMode = HITTING_OR_STANDING;

    if (
      currentPlayer.sum >= BLACKJACK_LIMIT ||
      computerHandSum >= BLACKJACK_LIMIT
    ) {
      gameMode = TRANSITION_TO_NEXT_PLAYER;
      myOutputValue = determineWinner();
    }

    return myOutputValue;
  }

  //IF CONDITION TO ENTER HIT STAND MODE ABOVE IS MET, THEN ENTER HITTING/STANDING MODE WHERE PLAYER INPUTS EITHER OPTION

  if (gameMode == HITTING_OR_STANDING) {
    // computer to "hit" if sum of computer hand is < 17
    if (computerHandSum < COMPUTER_LIMIT) {
      console.log(
        "computer hits again as computer first hand is " +
          displayCards(computerHand)
      );
      computerHand.push(gameDeck.pop());
      computerHandSum = sumHand(computerHand);
    }

    // Player chooses to hit or stand
    // If "hit", push card into hand
    // If total is still less than 21, offer the option to hit/stand again

    if (input.toLowerCase() == "hit") {
      console.log("player chooses to hit");
      currentPlayer.hand.push(gameDeck.pop());
      currentPlayer.sum = sumHand(currentPlayer.hand);

      // if sum of player hand is still less than 21, offer another opportunity to hit/stand
      if (currentPlayer.sum < BLACKJACK_LIMIT) {
        return (
          currentPlayer.playerHandMessage +
          displayCards(currentPlayer.hand) +
          currentPlayer.playerSumMessage +
          currentPlayer.sum +
          "<br> You've chosen to 'hit'. You can choose 'hit' again to draw another card, or 'stand' to end game."
        );
      }

      gameMode = TRANSITION_TO_NEXT_PLAYER;
      // if sum of player cards is >= over 21, determine winner
      return determineWinner();
    }

    if (input.toLowerCase() == "stand") {
      // if player enters stand mode, end game and determine winner
      gameMode = TRANSITION_TO_NEXT_PLAYER;
      return determineWinner();
    }

    // if player enters hit mode, deal another card into player hand
  }

  if (gameMode == TRANSITION_TO_NEXT_PLAYER) {
    return changeToNextPlayerOrEndGame();
  }

  return myOutputValue;
};
