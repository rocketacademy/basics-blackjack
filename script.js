//define global variables
var cardDeck = [];
var gameMode = "initial draw";
var computerCardArray = [];
var playerCardArray = [];
var computerCardScore = 0;
var playerCardScore = 0;
var computerCardResults = [];
var playerCardResults = [];

//create deck
var makeDeck = function () {
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  // Loop over the suits array

  for (var suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    for (var rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;
      var score = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
        score = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        score = 10;
      } else if (cardName == 13) {
        cardName = "king";
        score = 10;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        score: score,
      };

      // Add the new card to the deck
      cardDeck.push(card);
    }
  }

  // Return the completed card deck
  return cardDeck;
};

//shuffle deck. shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once

  for (
    var currentIndex = 0;
    currentIndex < cardDeck.length;
    currentIndex += 1
  ) {
    // Select a random index in the deck
    var randomIndex = Math.floor(Math.random() * cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
  }
  // Return the shuffled deck
  return cardDeck;
};

var calcScoresComputer = function () {
  //calculate the score of the cards on computer's hand
  for (var j = 0; j < computerCardArray.length; j += 1) {
    if (computerCardArray[j].name == "ace" && computerCardScore < 11) {
      console.log(`Current Com Score = ${computerCardScore}`);
      computerCardArray[j].score = 11;
      console.log(
        `Card is ${computerCardArray[j].name} Card score: ${computerCardArray[j].score}`
      );
    }
    computerCardScore += computerCardArray[j].score;
  }
};

var calcScoresPlayer = function () {
  //calculate the score of the cards on player's hand
  for (var k = 0; k < playerCardArray.length; k += 1) {
    if (playerCardArray[k].name == "ace" && playerCardScore < 11) {
      console.log(`Current Player Score = ${playerCardScore}`);
      playerCardArray[k].score = 11;
      console.log(
        `Card is ${playerCardArray[k].name} Card score: ${playerCardArray[k].score}`
      );
    }
    playerCardScore += playerCardArray[k].score;
  }
};

var pushCardsIntoResultsArray = function () {
  for (var i = 0; i < computerCardArray.length; i += 1) {
    var computerCardString = `${computerCardArray[i].suit} of ${computerCardArray[i].name}`;
    computerCardResults.push(computerCardString);
  }
  for (var j = 0; j < playerCardArray.length; j += 1) {
    var playerCardString = `${playerCardArray[j].suit} of ${playerCardArray[j].name}`;
    playerCardResults.push(playerCardString);
  }
};

var determineWinner = function () {
  var whoWin = "";

  if (playerCardScore > computerCardScore || playerCardScore == 21) {
    whoWin = "Player wins!";
  } else if (playerCardScore == computerCardScore) {
    whoWin = "It's a draw!";
  } else {
    whoWin = "Computer wins!";
  }

  return `${whoWin}`;
};

var resetGame = function () {
  cardDeck = [];
  computerCardArray = [];
  playerCardArray = [];
  computerCardScore = 0;
  playerCardScore = 0;
  gameMode = "initial draw";
};

var shuffleAndIssueTwoCards = function () {
  var shuffledDeck = shuffleCards(cardDeck);
  //give out cards to computer and player and push into their arrays
  for (var i = 0; i < 4; i += 1) {
    if (i == 0 || i == 2) {
      computerCardArray.push(shuffledDeck.pop());
    } else if (i == 1 || i == 3) {
      playerCardArray.push(shuffledDeck.pop());
    }
  }
};

var main = function (input) {
  //if start of game, create a new shuffled deck and issue 2 cards each
  if (gameMode == "initial draw") {
    makeDeck();
    shuffleAndIssueTwoCards();
    //end game if either player or computer hits 21 straightaway
    calcScoresComputer();
    calcScoresPlayer();
    if (computerCardScore == 21 || playerCardScore == 21) {
      var findWinner = determineWinner();
      return findWinner;
    }
    gameMode = "post initial draw";
    return `Computer drew ${computerCardArray[0].name} & ${computerCardArray[1].name}. Total score is ${computerCardScore}. <br> Player drew ${playerCardArray[0].name} & ${playerCardArray[1].name}. Total score is ${playerCardScore}. <br> <br> Enter either "hit" or "stand".`;
  }
  if (gameMode == "post initial draw") {
    gameMode = input;

    if (gameMode == "hit") {
      playerCardArray.push(cardDeck.pop());
      calcScoresPlayer();
      gameMode = "post initial draw";
      return `You drew ${
        playerCardArray[playerCardArray.length - 1].name
      }. Player score is ${playerCardScore}. Do you want to "hit" or "stand"?`;
    } else if (gameMode == "stand") {
      if (computerCardScore < 17) {
        computerCardArray.push(cardDeck.pop());
        calcScoresComputer();
      }
      gameMode = "determine winner";
      return `Click submit to see who wins~`;
    }
  }

  if (gameMode == "determine winner") {
    //calcuate the scores and see who wins
    pushCardsIntoResultsArray();
    findWinner = determineWinner();

    //reset game
    resetGame;

    //output
    return `${findWinner}<br><br> Player hand: ${playerCardResults} <br> Dealers hand: ${computerCardResults}`;
  }
};
