var mode = "game-start";
var playerHand = [];
var computerHand = [];
var gameDeck = [];
var myOutputValue = "";
var drawedCard = [];
var playerScore = "";
var computerScore = "";
var endScore = [];

//Output messages
var bothLose = "Both hand lose<br>Your vs computer score:<br>";
var playerLose = "You lose<br>Your vs computer score:<br>";
var playerWin = "You won<br>Your vs computer score:<br>";
var playerTie = "It's a tie<br>Your vs computer score:<br>";

var main = function (input) {
  gameDeck = shuffleCards(makeDeck());
  if (mode == "game-start") {
    drawCard(2, playerHand);
    drawCard(2, computerHand);
    console.log(playerHand, computerHand);
    mode = "hit-or-stand";
  } else if (mode == "hit-or-stand") {
    if (input == "hit") {
      drawCard(1, playerHand);
      computerMoves();
    } else if (input == "stand") {
      playerStand();
    }
  }

  console.log(playerScore, computerScore);

  checkIfEndGame();
  return (
    displayHand(playerHand) +
    "<br>Your score: " +
    playerScore +
    "<br><br>" +
    myOutputValue
  );
};

//Function for computer to move
var computerMoves = function () {
  if (computerScore < 21) {
    drawCard(1, computerHand);
  }
};

//Function to stand
var playerStand = function () {
  endScore = [playerScore, computerScore];
  if (playerScore < 21 && computerScore < 21) {
    if (playerScore > computerScore) {
      myOutputValue = playerWin + endScore;
    } else if (playerScore < computerScore) {
      myOutputValue = playerLose + endScore;
    } else if (playerScore == computerScore) {
      myOutputValue = playerTie + endScore;
    }
  }
};

//Function to detect if game ends
var checkIfEndGame = function () {
  playerScore = calculateScore(playerHand, playerScore);
  computerScore = calculateScore(computerHand, computerScore);
  endScore = [playerScore, computerScore];
  if (playerScore > 21) {
    if (computerScore > 21) {
      myOutputValue = bothLose + endScore;
    } else if (computerScore < 21) {
      myOutputValue = playerLose + endScore;
    }
  } else if (playerScore == 21) {
    if (computerScore != 21) {
      myOutputValue = playerWin + endScore;
    } else if (computerScore == 21) {
      myOutputValue = playerTie + endScore;
    }
  }
};

//Function to calculate score
var calculateScore = function (handOfWho, scoreOfWho) {
  var score = 0;
  for (let counter = 0; counter < handOfWho.length; counter += 1) {
    var getCardName = handOfWho[counter]["name"];
    if (
      getCardName == "Jack" ||
      getCardName == "Queen" ||
      getCardName == "King"
    ) {
      score = score + 10;
    } else if (scoreOfWho + 11 < 21 && getCardName == "Ace") {
      playerHand[counter]["rank"] = 11;
      score = score + playerHand[counter]["rank"];
    } else {
      score = score + handOfWho[counter]["rank"];
    }
  }
  return score;
};

//Function to display cards in hand
var displayHand = function (handOfWho) {
  var Message = "";
  for (let index = 0; index < handOfWho.length; index += 1) {
    Message = Message + handOfWho[index]["name"] + handOfWho[index]["suit"];
  }
  return Message;
};

// Function to draw a card with how many cards
var drawCard = function (times, handOfWho) {
  for (let counter = 0; counter < times; counter += 1) {
    handOfWho.push(gameDeck.pop());
  }
  return handOfWho;
};

// Get 52 cards in a deck
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["♥", "♦", "♣", "♠"];

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
        cardName = "Ace";
      } else if (cardName == 11) {
        cardName = "Jack";
      } else if (cardName == 12) {
        cardName = "Queen";
      } else if (cardName == 13) {
        cardName = "King";
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
