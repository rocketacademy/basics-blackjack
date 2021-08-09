var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];
    console.log("current suit", currentSuit);

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
// Get a random index ranging from 0 (inclusive) to max (exclusive).
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
// Shuffle the deck and save it in a new variable shuffledDeck
// to communicate that we have shuffled the deck.
var cardDeck = makeDeck();
var shuffledDeck = shuffleCards(cardDeck);

var playerArray = [];
var computerArray = [];
var playerScore = 0;
var computerScore = 0;
var currentGameMode = "deal cards";

var showPlayersDeck = function (playerArray) {
  var message = `Here is your current deck <br><br>`;
  var messageCounter = 0;
  while (messageCounter < playerArray.length) {
    message =
      message +
      `${playerArray[messageCounter].rank} of ${playerArray[messageCounter].suit}, `;
    messageCounter = messageCounter + 1;
  }
  return message;
};

var calculateScore = function (cardArray) {
  if (cardArray == playerArray) {
    var scoreCounterPlayer = 0;
    while (scoreCounterPlayer < cardArray.length) {
      playerScore = playerScore + playerArray[scoreCounterPlayer].rank;
      scoreCounterPlayer = scoreCounterPlayer + 1;
    }
  } else if (cardArray == computerArray) {
    var scoreCounterComputer = 0;
    while (scoreCounterComputer < computerArray.length) {
      computerScore = computerScore + computerArray[scoreCounterComputer].rank;
      scoreCounterComputer = scoreCounterComputer + 1;
    }
  }
};

var main = function (input) {
  var myOutputValue = "";
  //Deal Cards
  if (currentGameMode == "deal cards") {
    var computerCounter = 0;
    while (computerCounter < 2) {
      var computerCard = shuffledDeck.pop();
      computerArray.push(computerCard);
      computerCounter = computerCounter + 1;
    }
    console.log("computer array", computerArray);
    console.log("player array", playerArray);

    var playerCounter = 0;
    while (playerCounter < 2) {
      var playerCard = shuffledDeck.pop();
      playerArray.push(playerCard);
      playerCounter = playerCounter + 1;
    }

    //getting player score
    calculateScore(playerArray);
    console.log("player score", playerScore);

    //getting computer score
    calculateScore(computerArray);
    console.log("computer score", computerScore);

    myOutputValue = `${showPlayersDeck(playerArray)} <br><br>
    Your current score is ${playerScore}.`;
    currentGameMode = "user wants to hit";
  }

  //Player wants to hit
  if (currentGameMode == "user wants to hit") {
    if (input == "hit") {
      var extraPlayerCard = shuffledDeck.pop();
      playerArray.push(extraPlayerCard);
      playerScore = playerScore + extraPlayerCard.rank;
      console.log("player hand", playerArray);
      console.log("player score", playerScore);
      myOutputValue = `${showPlayersDeck(playerArray)} <br><br>
    Your current score is ${playerScore}.`;
    } else if (input == "stand") {
      currentGameMode = "computer wants to hit";
    }
  }
  //Computer wants to hit
  if (currentGameMode == "computer wants to hit") {
    while (computerScore <= 17) {
      var extraComputerCard = shuffledDeck.pop();
      computerArray.push(extraComputerCard);
      computerScore = computerScore + extraComputerCard.rank;
    }
    console.log("computer hand", computerArray);
    console.log("computer score", computerScore);
    currentGameMode = "comparing scores";
  }

  if (currentGameMode == "comparing scores") {
    // Construct an output string to communicate which cards were drawn
    var myOutputValue = `Computer has ${computerScore} <br><br>
    Player has ${playerScore} <br><br>`;

    // Compare computer and player cards by rank attribute
    // If computer card rank is greater than player card rank, computer wins
    if (
      (playerScore > computerScore && playerScore < 21) ||
      computerScore > 21
    ) {
      myOutputValue =
        myOutputValue +
        "Congratulations! Player wins! <br><br> Click Submit to play again.";
      // Else if computer card rank is less than player card rank, player wins
    } else if (
      (playerScore < computerScore && computerScore < 21) ||
      playerScore > 21
    ) {
      myOutputValue =
        myOutputValue +
        "Computer wins! Better Luck Next Time! <br><br> Click Submit to play again.";
      // Otherwise (i.e. ranks are equal), it's a tie
    } else {
      myOutputValue =
        myOutputValue + "It's a tie. <br><br>Click Submit to play again.";
    }
    console.log("player score", playerScore);
    console.log("computer score", computerScore);

    currentGameMode = "deal cards";
  }
  return myOutputValue;
};
