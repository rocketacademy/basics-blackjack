//GLOBAL STATE
var gameMode = "player1";
var cardDeck = [];
//cards drawn
var playerHand = [];
var computerHand = [];
//counters for loops
var index = 0;
var computerIndex = 0;
//tracking of totalscores
var playerTotalScore = 0;
var computerTotalScore = 0;

//GENERATE 52 CARDS
var makeDeck = function () {
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

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // Add the new card to the deck
      cardDeck.push(card);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // Return the completed card deck
  return cardDeck;
};

//Generate random index
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

//To shuffle the deck
var shuffleCards = function (deck) {
  //Loop the array once
  var currentIndex = 0;
  while (currentIndex < deck.length) {
    //Select a random index
    var randomIndex = getRandomIndex(deck.length);
    //Select a card that correspond to the randomIndex
    var randomCard = deck[randomIndex];
    //Select a card that correspond with currentIndex
    var currentCard = deck[currentIndex];
    //Swap the 2 positions to shuffle
    deck[currentIndex] = randomCard;
    deck[randomIndex] = currentCard;
    currentIndex += 1;
  }
  return deck;
};

//generate deck
var generateDeck = makeDeck();
//shuffle deck
var shuffledDeck = shuffleCards(generateDeck);
//Player and computer draw 2 cards each alternately
playerHand[0] = shuffledDeck.pop();
computerHand[0] = shuffledDeck.pop();
playerHand[1] = shuffledDeck.pop();
computerHand[1] = shuffledDeck.pop();

//output of cards on hand in array
var playerOutput = [];
playerOutput[0] = "<br>" + playerHand[0].name + " of " + playerHand[0].suit;
playerOutput[1] = "<br>" + playerHand[1].name + " of " + playerHand[1].suit;
var computerOutput = [];
computerOutput[0] =
  "<br>" + computerHand[0].name + " of " + computerHand[0].suit;
computerOutput[1] =
  "<br>" + computerHand[1].name + " of " + computerHand[1].suit;

//define blackjack
var playerblackjack = false;
if (
  (playerHand[0].name == "ace" &&
    playerHand[1].rank <= 13 &&
    playerHand[1].rank >= 10) ||
  (playerHand[1].name == "ace" &&
    playerHand[0].rank <= 13 &&
    playerHand[0].rank >= 10)
) {
  playerblackjack = true;
}
var computerBlackJack = false;
if (
  (computerHand[0].name == "ace" &&
    computerHand[1].rank <= 13 &&
    computerHand[1].rank >= 10) ||
  (computerHand[1].name == "ace" &&
    computerHand[0].rank <= 13 &&
    computerHand[0].rank >= 10)
) {
  computerBlackJack = true;
}

//main function
var main = function (input) {
  //input validation
  var myOutputValue = "Please input hit or stand";
  if (gameMode == "player1") {
    myOutputValue =
      "Player drew the following cards: <br> " +
      playerOutput +
      "<br><br> Computer drew the following cards: <br>" +
      computerOutput;
    //player blackjack, computer did not
    if (playerblackjack == true && computerBlackJack == false) {
      myOutputValue =
        myOutputValue + "<br><br>Player drew a Blackjack. Player won!";
    }
    //computer blackjack, player did not
    else if (playerblackjack == false && computerBlackJack == true) {
      myOutputValue =
        myOutputValue + "<br><br>Computer drew a Blackjack. Computer won!";
    }
    //both blackjack
    else if (playerblackjack == true && computerBlackJack == true) {
      myOutputValue =
        myOutputValue + "<br><br>Player and Computer drew Blackjack. Tie!";
    } else {
      gameMode = "hitOrStand";
      return (
        myOutputValue +
        "<br><br>Player 1. Please type whether you want to hit or stand."
      );
    }
  }
  if (gameMode == "hitOrStand" && input == "hit") {
    playerHand.push(shuffledDeck.pop());
    playerOutput.push(
      "<br>" + playerHand[2 + index].name + " of " + playerHand[2 + index].suit
    );
    index += 1;
    return (
      "Player has drew " +
      playerHand[1 + index].name +
      " of " +
      playerHand[1 + index].suit +
      ".<br> Player has the following cards: <br>" +
      playerOutput +
      "<br><br> Computer has the following cards: <br>" +
      computerOutput +
      "<br><br> Please type whether you want to hit or stand."
    );
  }
  if (gameMode == "hitOrStand" && input == "stand") {
    //change ace and picture card to number
    var counter = 0;
    while (counter < playerHand.length) {
      if (
        playerHand[counter].name == "jack" ||
        playerHand[counter].name == "queen" ||
        playerHand[counter].name == "king"
      ) {
        playerHand[counter].name = 10;
      }
      if (playerHand[counter].name == "ace" && playerHand.length == 2) {
        playerHand[counter].name = 11;
      } else if (playerHand[counter].name == "ace" && playerHand.length == 3) {
        playerHand[counter].name = 10;
      } else if (playerHand[counter].name == "ace" && playerHand.length > 3) {
        playerHand[counter].name = 1;
      }
      counter += 1;
    }
    //sum the total score
    counter = 0;
    while (counter < playerHand.length) {
      playerTotalScore = playerTotalScore + playerHand[counter].name;
      counter += 1;
    }
    //convert computer's cards to score
    counter = 0;
    while (counter < computerHand.length) {
      if (
        computerHand[counter].name == "jack" ||
        computerHand[counter].name == "queen" ||
        computerHand[counter].name == "king"
      ) {
        computerHand[counter].name = 10;
      }
      if (computerHand[counter].name == "ace" && computerHand.length == 2) {
        computerHand[counter].name = 11;
      } else if (
        computerHand[counter].name == "ace" &&
        computerHand.length == 3
      ) {
        computerHand[counter].name = 10;
      } else if (
        computerHand[counter].name == "ace" &&
        computerHand.length > 3
      ) {
        computerHand[counter].name = 1;
      }
      counter += 1;
    }
    //computer score
    counter = 0;
    while (counter < computerHand.length) {
      computerTotalScore = computerTotalScore + computerHand[counter].name;
      counter += 1;
    }
    gameMode = "computerTurn";
    return (
      "You have ended your turn. Your score is " +
      playerTotalScore +
      ". It is now computer's turn. Click submit to proceed."
    );
  }
  //computer's turn
  //computer must draw if computerTotalScore is less than 17
  if (gameMode == "computerTurn" && computerTotalScore < 17) {
    computerHand.push(shuffledDeck.pop());
    computerOutput.push(
      "<br>" +
        computerHand[2 + computerIndex].name +
        " of " +
        computerHand[2 + computerIndex].suit
    );
    counter = 0;
    while (counter < computerHand.length) {
      if (
        computerHand[counter].name == "jack" ||
        computerHand[counter].name == "queen" ||
        computerHand[counter].name == "king"
      ) {
        computerHand[counter].name = 10;
      }
      if (computerHand[counter].name == "ace" && computerHand.length == 2) {
        computerHand[counter].name = 11;
      } else if (
        computerHand[counter].name == "ace" &&
        computerHand.length == 3
      ) {
        computerHand[counter].name = 10;
      } else if (
        computerHand[counter].name == "ace" &&
        computerHand.length > 3
      ) {
        computerHand[counter].name = 1;
      }
      counter += 1;
    }
    //computer score
    counter = 0;
    computerTotalScore = 0;
    while (counter < computerHand.length) {
      computerTotalScore = computerTotalScore + computerHand[counter].name;
      counter += 1;
    }
    computerIndex += 1;
    myOutputValue =
      "Computer has drew " +
      computerHand[1 + computerIndex].name +
      " of " +
      computerHand[1 + computerIndex].suit +
      ".<br> Player has the following cards: <br>" +
      playerOutput +
      "<br><br> Computer has the following cards: <br>" +
      computerOutput +
      "<br><br> Please click submit to proceed.";
  } else if (
    //list out all winning condition
    gameMode == "computerTurn" &&
    computerTotalScore >= 17 &&
    ((playerTotalScore < 22 && playerTotalScore > computerTotalScore) ||
      (playerTotalScore < 22 && computerTotalScore > 21))
  ) {
    myOutputValue =
      "Player has the following cards: <br>" +
      playerOutput +
      "<br> Total Score: " +
      playerTotalScore +
      "<br><br> Computer has the following cards: <br>" +
      computerOutput +
      "<br> Total Score: " +
      computerTotalScore +
      "<br><br> Player won!.";
  } else if (
    gameMode == "computerTurn" &&
    computerTotalScore >= 17 &&
    computerTotalScore < 22 &&
    (playerTotalScore < computerTotalScore ||
      (playerTotalScore > 21 && computerTotalScore < 22))
  ) {
    myOutputValue =
      "Player has the following cards: <br>" +
      playerOutput +
      "<br> Total Score: " +
      playerTotalScore +
      "<br><br> Computer has the following cards: <br>" +
      computerOutput +
      "<br> Total Score: " +
      computerTotalScore +
      "<br><br> Computer won!.";
  } else if (
    gameMode == "computerTurn" &&
    computerTotalScore >= 17 &&
    (playerTotalScore == computerTotalScore ||
      (playerTotalScore > 21 && computerTotalScore > 21))
  ) {
    myOutputValue =
      "Player has the following cards: <br>" +
      playerOutput +
      "Total Score: " +
      playerTotalScore +
      "<br><br> Computer has the following cards: <br>" +
      computerOutput +
      "Total Score: " +
      computerTotalScore +
      "<br><br> Draw!.";
  }
  return myOutputValue;
};
