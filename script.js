//to store the cards for display
var playerCards = [];
var computerCard = [];

//to store the value of the cards for calculation
var computerArray = [];
var playerArray = [];

var initial = "initial mode";
var gameMode = initial;
var computerScore = 0;
var playerScore = 0;
var gameOver = false;

// for image
var youWin =
  '<img src="https://c.tenor.com/m1VMTi9N1A8AAAAi/you-win-you-did-it.gif"/>';
var youLose =
  '<img src="https://c.tenor.com/FhF7cOauHTcAAAAC/oyun-bitti-loser.gif"/>';

// MAKE DECK FUNCTION to build up deck of cards//
https: var makeDeck = function () {
  var cardDeck = [];
  var suits = ["hearts ♥", "diamonds ♦", "clubs ♣", "spades ♠"];
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

      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};

// RANDOMIZE CARD //
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// SHUFFLING DECK to shuffle all the cards //
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

var extract;
// to take out one card at a time from the card deck to player deck
var drawOutCardPlayer = function () {
  extract = cards.pop();
  playerArray.push(extract);
  console.log(extract.name);
  return extract.name + " of " + extract.suit;
};

// to take out one card at a time from the card deck to computer deck
var drawOutCardComputer = function () {
  extract = cards.pop();
  computerArray.push(extract);
  console.log(extract.name);
  return extract.name + " of " + extract.suit;
};

//to get the value from the cards for further calculation
var getValue = function (cards) {
  if (cards.name == "ace") return 1;
  if (cards.name == "jack") return 10;
  if (cards.name == "queen") return 10;
  if (cards.name == "king") return 10;
  else {
    return cards.name;
  }
};

// to get total number of cards that have been take out from the deck
var getSum = function (arrayOfCard) {
  var sum = 0;
  var aceCard = false;
  var arrayLength = arrayOfCard.length;
  var counter = 0;
  //loop as many as total cards in deck that have been popped out
  while (counter < arrayLength) {
    console.log("ARRAY LENGTH : " + counter);
    console.log(getValue(arrayOfCard[counter]));
    //adding only the value that have been set on getValue function
    sum += getValue(arrayOfCard[counter]);
    //if value is ace then it's true that have ace in that particular deck
    if (arrayOfCard[counter].name === "ace") {
      console.log("------------ACE IS HERE-------");
      aceCard = true;
    }
    counter += 1;
  }
  //if have ace, and check if the total will be over 21 or not. if not, then value of ace will be added by 10.
  if (aceCard && sum + 10 <= 21) {
    return sum + 10;
  }
  return sum;
};

// to create a message that can be use for different mode
var validMessage = function () {
  return (
    "Computer Cards : " +
    computerCard +
    "<br>" +
    "Sum of Computer Cards :" +
    getSum(computerArray) +
    "<br><br>" +
    "Player Cards : " +
    playerCards +
    "<br>" +
    "Sum of Player Cards :" +
    getSum(playerArray)
  );
};

var getMessage = function () {
  scoreUpdates();
  // first message after clicking submit to give basic information
  if (gameMode == initial) {
    // check the game to identify the gameOver whether it's true or false
    checkGame();
    if (gameOver) {
      return validMessage() + "<br><br>" + checkGame();
    } else {
      return validMessage() + "<br><br>" + 'Enter "hit" or "stand".';
    }
  }
  // enter hit as input in main function
  if (gameMode == "hit mode") {
    //draw out one more card
    playerCards.push(drawOutCardPlayer());
    // check the game to identify the gameOver whether it's true or false
    checkGame();
    if (!gameOver) {
      return validMessage() + "<br><br>" + 'Please enter "hit" or "stand".';
    }
    return validMessage() + "<br><br>" + checkGame();
  }
  // enter stand as input in main function
  if (gameMode == "stand mode") {
    //draw out card if computer score is below or equal to 17
    if (computerScore <= 17) {
      computerCard.push(drawOutCardComputer());
      // check the game to identify the gameOver whether it's true or false
      checkGame();
      if (computerScore > 17) {
        //resultMessage = "computer score kurang dri 17";
        gameOver = true;
      }
    } else if (computerScore > 17) {
      checkGame();
      //resultMessage = "computer score lebih dri 17";
      gameOver = true;
    }
    //checkGame();
    //computerCard.push(drawOutCardComputer());
    if (!gameOver) {
      return validMessage() + "<br><br>" + 'Please enter "hit" or "stand".';
    }
    return validMessage() + "<br><br>" + checkGame();
  }
};

//for updating the scores
var scoreUpdates = function () {
  computerScore = getSum(computerArray);
  playerScore = getSum(playerArray);
};

//to check if the game is end. by various way of ending
var checkGame = function () {
  var resultMessage = "";
  scoreUpdates();
  if (gameOver) {
    //console.log("game over" + gameOver == 1);
    while (
      computerScore < playerScore &&
      playerScore <= 21 &&
      computerScore <= 21
    ) {
      computerArray.push(drawOutCardComputer);
      scoreUpdates();
    }
  }
  if (playerScore == 21) {
    resultMessage =
      "PLAYER BLACKJACK ! <br> Congratulation ~ Player wins <br>" +
      youWin +
      "<br> Refresh game to play again";
    gameOver = true;
  } else if (computerScore == 21) {
    resultMessage =
      "COMPUTER BLACKJACK ! Computer wins !! <br>" +
      youLose +
      "<br> Refresh game to play again";
    gameOver = true;
  } else if (playerScore > 21) {
    resultMessage =
      "Player went over 21 <br> Computer wins !! <br>" +
      youLose +
      "<br> Refresh game to play again";
    gameOver = true;
  } else if (computerScore > 21) {
    resultMessage =
      "Congratulation ~ Player wins <br>" +
      youWin +
      "<br> Refresh game to play again";
    gameOver = true;
  } else if (gameOver) {
    //console.log("game over" + gameOver == 1);
    if (playerScore > computerScore) {
      console.log("PLAYER SCORE > COMPUTER SCORE");
      resultMessage =
        "Congratulation ~ Player wins <br>" +
        youWin +
        "<br> Refresh game to play again";
    } else {
      console.log("COMPUTER SCORE > PLAYER SCORE");
      resultMessage =
        "Computer wins !! <br>" + youLose + "<br> Refresh game to play again";
    }
  }
  return resultMessage;
};

// global variable so that it wont change everytime the game mode is updated
var cards = shuffleCards(makeDeck());
computerCard = [drawOutCardComputer(), drawOutCardComputer()];
playerCards = [drawOutCardPlayer(), drawOutCardPlayer()];

var main = function (input) {
  //set all input to lowercase
  input = input.toLowerCase();
  var myOutputValue = "";

  // check if the gameOver is true
  if (gameOver) {
    return "End of Game ! <br> Please refresh your page";
  }
  //press submit to get initial message
  if (!input && gameMode == initial) {
    console.log(gameMode);
    return getMessage();
  }
  if (input != "hit" && input != "stand") {
    console.log("not hit or stand");
    return 'Please enter only "hit" or "stand".';
  }
  if (input == "hit") {
    console.log("======HIT HERE=======");
    gameMode = "hit mode";
    myOutputValue = getMessage();
  }
  if (input == "stand") {
    console.log("=======STAND HERE======");
    gameMode = "stand mode";
    myOutputValue = getMessage();
  }
  return myOutputValue;
};
