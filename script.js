var deck = [];
var playerHand = [];
var computerHand = [];
var playerScore;
var computerScore;
var displayPlayerHand = [];
var displayComputerHand = [];
var winner = "";
var input;

// Draw a card
var drawCard = function (numCards, hand) {
  for (var i = 0; i < numCards; i += 1) {
    var newCard = deck.pop();
    hand.push(newCard);
  }
  return newCard;
};

// Display card
var displayCard = function (hand) {
  var showCard = [];
  for (var i = 0; i < hand.length; i += 1) {
    showCard.push(hand[i].name);
  }
  return showCard;
};

// Calculate score
var calculateScore = function (hand) {
  var score = 0;
  for (var i = 0; i < hand.length; i += 1) {
    score = score + hand[i].value;
  }
  return score;
};

// Create & shuffle the deck
var startButton = document.getElementById("start-button");
startButton.addEventListener("click", function () {
  deck = [];
  playerHand = [];
  computerHand = [];
  displayPlayerHand = [];
  displayComputerHand = [];

  var unshuffledDeck = makeDeck();
  var shuffledDeck = shuffleCards(unshuffledDeck);
  deck = shuffledDeck;
  console.log("fresh deck", deck.length);

  // Draws 2 cards for player
  var playerDraws = drawCard(2, playerHand);
  displayPlayerHand = displayCard(playerHand);
  playerScore = calculateScore(playerHand);

  // Draws 2 cards for computer
  var computerDraws = drawCard(2, computerHand);
  displayComputerHand = displayCard(computerHand);
  computerScore = calculateScore(computerHand);

  console.log("Player's first hand", playerHand);
  console.log("Computer's first hand", computerHand);
  console.log("First hand, player's score", playerScore);
  console.log("First hand, computer's score", computerScore);

  // Message
  var output = document.getElementById("output-div");

  if (playerScore < 21 && computerScore < 21) {
    output.innerHTML = `1st round <br><br> Your hand: ${displayPlayerHand} <br> Score: ${playerScore} <br><br> Computer's hand: ${displayComputerHand[0]}, second card (face down). <br><br> Number of cards in deck: ${deck.length} <br><br> To continue, press Hit or Stand.`;
  } else {
    output.innerHTML = `1st round <br><br> ${clearOutcomes()}`;
  }
});

// Hit button
var hitButton = document.getElementById("hit-button");
hitButton.addEventListener("click", function () {
  var playerDraws = drawCard(1, playerHand);
  displayPlayerHand = displayCard(playerHand);
  playerScore = calculateScore(playerHand);

  // Message
  var output = document.getElementById("output-div");

  if (playerScore < 21 && computerScore < 21) {
    output.innerHTML = `Your hand: ${displayPlayerHand} <br> Score: ${playerScore} <br><br> Computer's hand: ${displayComputerHand[0]}, second card (face down). <br><br> Number of cards in deck: ${deck.length} <br><br> To continue, press Hit or Stand.`;
  } else {
    output.innerHTML = clearOutcomes();
  }
});

// Stand button
var hitButton = document.getElementById("stand-button");
hitButton.addEventListener("click", function () {
  var output = document.getElementById("output-div");
  if (computerScore < 17) {
    while (computerScore < 17) {
      console.log("Computer's hand", computerHand);
      console.log("Computer's score", computerScore);
      var computerDraws = drawCard(1, computerHand);
      displayComputerHand = displayCard(computerHand);
      computerScore = calculateScore(computerHand);
    }
    if (computerScore < 21 && playerScore < 21) {
      output.innerHTML = determineWinner();
    } else {
      output.innerHTML = clearOutcomes();
    }
  } else {
    if (computerScore < 21 && playerScore < 21) {
      output.innerHTML = determineWinner();
    } else {
      output.innerHTML = clearOutcomes();
    }
  }
});

//Reset Game
var resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", function () {
  deck = [];
  playerHand = [];
  computerHand = [];
  displayPlayerHand = [];
  displayComputerHand = [];

  var output = document.getElementById("output-div");
  output.innerText = `The game has been reset. Press Start to play a new game.`;
});

// Create a deck of cards
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["♥️", "♦️", "♣️", "♠️"];

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
      var val = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
        val = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        val = 10;
      } else if (cardName == 13) {
        cardName = "king";
        val = 10;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName + " of " + currentSuit,
        suit: currentSuit,
        rank: rankCounter,
        value: val,
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

// Shuffle card code
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

// Helper functions for scores
var playerBlackJack = function (playerScore) {
  return playerScore == 21;
};

var computerBlackJack = function (computerScore) {
  return computerScore == 21;
};

var playerBurst = function (playerScore) {
  return playerScore > 21;
};

var computerBurst = function (computerScore) {
  return computerScore > 21;
};

// Display messages for Black Jack, Burst or Tie
var clearOutcomes = function () {
  var message = "";
  // Player wins: player = 21 AND computer != 21
  if (playerBlackJack(playerScore)) {
    console.log("Player wins: player = 21 AND computer != 21");
    winner = "player";
    message = displayMsg();
    return message;
  }

  // Computer wins: computer = 21 AND player != 21
  else if (computerBlackJack(computerScore)) {
    console.log("Computer wins: computer = 21 AND player != 21");
    winner = "computer";
    message = displayMsg();
    return message;
  }
  // Player wins: computer exceeds 21
  else if (computerBurst(computerScore)) {
    console.log("Player wins: computer exceeds 21");
    winner = "player";
    message = displayMsg();
    return message;
  }

  // Computer wins: player exceeds 21
  else if (playerBurst(playerScore)) {
    console.log("Computer wins: player exceeds 21");
    winner = "computer";
    message = displayMsg();
    return message;
  }
  // Tie: both score 21
  if (playerBlackJack(playerScore) && computerBlackJack(computerScore)) {
    console.log("Tie - same score");
    winner = "tie";
    message = displayMsg();
    return message;
  }
  // Tie: both exceed 21
  if (playerBurst(playerScore) && computerBurst(computerScore)) {
    console.log("Tie - both exceed");
    winner = "tie";
    message = displayMsg();
    return message;
  }
};

var determineWinner = function () {
  var message = "";
  if (playerScore > computerScore) {
    winner = "player";
    message = displayMsg();
    return message;
  } else if (computerScore > playerScore) {
    winner = "computer";
    message = displayMsg();
    return message;
  } else if ((playerScore = computerScore)) {
    winner = "tie";
    message = displayMsg();
    return message;
  }
};

var displayMsg = function () {
  if (winner == "player") {
    return `You win! <br> <br> Your hand: ${displayPlayerHand} <br> Score: ${playerScore} <br><br> Computer's hand: ${displayComputerHand} <br> Score: ${computerScore}`;
  } else if (winner == "computer") {
    return `Computer wins!  <br> <br> Your hand: ${displayPlayerHand} <br> Score: ${playerScore} <br><br> Computer's hand: ${displayComputerHand} <br> Score: ${computerScore}`;
  } else if (winner == "tie") {
    return `It's a tie! <br> <br> Your hand: ${displayPlayerHand} <br> Score: ${playerScore} <br><br> Computer's hand: ${displayComputerHand} <br> Score: ${computerScore}`;
  }
};
