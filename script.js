//
// MAKE DECK
//
//
var makeDeck = function () {
  var cardDeck = [];

  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;
      var cardValue = rankCounter;

      if (cardName == 1) {
        cardName = "ace";
        cardValue = 1;
      } else if (cardName == 11) {
        cardName = "jack";
        cardValue = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        cardValue = 10;
      } else if (cardName == 13) {
        cardName = "king";
        cardValue = 10;
      }

      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        score: cardValue,
      };

      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};
//
//
//
//
//
//
//
// SHUFFLE DECK
//
//
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};
//
//
//
//
//
//
//
//START MAIN FUNCTION
//
//
var shuffledDeck = shuffleCards(makeDeck());
var playerDeck = shuffledDeck.splice(0, 26);
var computerDeck = shuffledDeck;
var currentGameMode = "draw card";

var playerCards = [];
var computerCards = [];
console.log("player cards: ");
console.log(playerCards);
console.log("computer cards: ");
console.log(computerCards);

var main = function (input) {
  var myOutputValue = "";
  var playerScore = 0;
  var computerScore = 0;

  // Create a function to calcualte player's total score.
  var calculatePlayerScore = function () {
    var playerIndex = 0;
    while (playerIndex < playerCards.length) {
      playerScore = playerScore + playerCards[playerIndex].score;
      playerIndex = playerIndex + 1;
    }
    // if (playerCards[0].score == 10 && playerCards[1].name == "ace") {
    //   playerScore = 21;
    // }
    return playerScore;
  };

  // Create a function to calcualte computer's total score.
  var calculateComputerScore = function () {
    var computerIndex = 0;
    while (computerIndex < computerCards.length) {
      computerScore = computerScore + computerCards[computerIndex].score;
      computerIndex = computerIndex + 1;
    }
    return computerScore;
  };

  // Start the game and deal 2 cards for each player
  if (currentGameMode == "draw card") {
    var drawCounter = 0;
    while (drawCounter < 2) {
      playerCards.push(playerDeck.pop());
      computerCards.push(computerDeck.pop());
      drawCounter = drawCounter + 1;
    }

    // calculate total score for each player
    playerScore = calculatePlayerScore();
    computerScore = calculateComputerScore();

    myOutputValue =
      "You drew a " +
      playerCards[0].name +
      " and " +
      playerCards[1].name +
      ". Your score = " +
      playerScore +
      "<br><br>Computer drew " +
      computerCards[0].name +
      " and " +
      computerCards[1].name +
      ". Computer score = " +
      computerScore +
      "<br><br> Enter 'hit' to draw another card, or 'stand' to end your turn.";

    currentGameMode = "hit or stand";

    // If computer score < 17, computer has to draw card again
    if (computerScore < 17) {
      myOutputValue =
        "You drew a " +
        playerCards[0].name +
        " and " +
        playerCards[1].name +
        ". Your score = " +
        playerScore +
        "<br><br>Computer drew " +
        computerCards[0].name +
        " and " +
        computerCards[1].name +
        ". Computer score = " +
        computerScore +
        "<br><br> Computer has to draw again. Click submit to continue.";

      currentGameMode = "computer draws";
    }
  } else if (currentGameMode == "hit or stand") {
    // If player chooses to stand
    if (input == "stand") {
      computerScore = calculateComputerScore();
      playerScore = calculatePlayerScore();
      myOutputValue = endGame(playerScore, computerScore);
    }
    // If player chooses to hit
    if (input == "hit") {
      playerCards.push(playerDeck.pop());
      playerScore = calculatePlayerScore();
      computerScore = calculateComputerScore();

      var newPlayerIndex = playerCards.length - 1;

      myOutputValue =
        "You drew " +
        playerCards[newPlayerIndex].name +
        ". Your score = " +
        playerScore +
        ". Computer score = " +
        computerScore +
        "<br><br> Enter 'hit' to draw another card, or 'stand' to end your turn.";

      console.log("player score: " + playerScore);
      console.log("computer score" + computerScore);

      // If player's new score exceeds 21, game automatically ends.
      if (playerScore > 21) {
        myOutputValue =
          "You drew " +
          playerCards[newPlayerIndex].name +
          ". Your score = " +
          playerScore +
          ". Computer score = " +
          computerScore +
          "<br><br> Yikes! You lost, your score exceeded 21. Better luck next time! <br><br> Click submit to play again.";
        currentGameMode = "draw card";
        playerCards = [];
        computerCards = [];
      }

      // If player chooses to stand
      if (input == "stand") {
        computerScore = calculateComputerScore();
        playerScore = calculatePlayerScore();
        myOutputValue = endGame(playerScore, computerScore);
      }
    }
  } else if ((currentGameMode = "computer draws")) {
    computerCards.push(computerDeck.pop());
    computerScore = calculateComputerScore();
    console.log("computer score: " + computerScore);
    playerScore = calculatePlayerScore();

    var newComputerIndex = computerCards.length - 1;

    myOutputValue =
      "Computer drew " +
      computerCards[newComputerIndex].name +
      ". Your score = " +
      playerScore +
      ". Computer score = " +
      computerScore +
      "<br><br> Your turn. Enter 'hit' to draw another card, or 'stand' to end your turn.";

    currentGameMode = "hit or stand";

    if (computerScore > 21) {
      myOutputValue =
        "Computer drew " +
        computerCards[newComputerIndex].name +
        ". Your score = " +
        playerScore +
        ". Computer score = " +
        computerScore +
        "<br><br> You win! Computer's score exceeded 21. Click submit to play again";
      currentGameMode = "draw card";
      playerCards = [];
      computerCards = [];
    }
  }
  return myOutputValue;
};
//
//
//
//
//
//
//
// CREATE END GAME FUNCTION
//
//
var endGame = function (playerScore, computerScore) {
  var myOutputValue = "";

  // Computer wins by points
  if (playerScore < computerScore && computerScore <= 21) {
    scoreDifference = computerScore - playerScore;
    myOutputValue =
      "Your score: " +
      playerScore +
      " |  Computer score = " +
      computerScore +
      "<br><br> Ops, better luck next time! Computer wins by " +
      scoreDifference +
      " points more than you.";
  }
  // // Computer exceeds 21 points
  // if (computerScore > 21 && playerScore < 21) {
  //   myOutputValue = "You win! Computer's score exceeded 21.";
  // }
  // Player wins by points
  if (playerScore > computerScore && playerScore <= 21) {
    scoreDifference = playerScore - computerScore;
    myOutputValue =
      "Your score: " +
      playerScore +
      " |  Computer score = " +
      computerScore +
      "<br><br> Nice one! You won by " +
      scoreDifference +
      " points more than computer!";
  }
  // // Player exceeds 21 points
  // if (playerScore > 21 && computerScore < 21) {
  //   myOutputValue =
  //     "Yikes! You lost, your score exceeded 21. Better luck next time!";
  // }
  // Its a draw
  if (playerScore == computerScore) {
    myOutputValue =
      "Huh. Its a draw. That's neither here nor there. Let's play another round!";
  }
  return myOutputValue;
};
// 3. The cards are analysed for game winning conditions, e.g. Blackjack.
// 4. The cards are displayed to the user.
// 5. The user decides whether to hit or stand, using the submit button to submit their choice.
// 6. The user's cards are analysed for winning or losing conditions.
// 7. The computer decides to hit or stand automatically based on game rules.
// 8. The game either ends or continues.
