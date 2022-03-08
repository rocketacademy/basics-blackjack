var gameMode = "player draw";
var playerCards = [];
var computerCards = [];
var playerScore = "";
var computerScore = "";
var cardDeck = [];

var makeDeck = function () {
  // Initialise an empty deck array
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
      var cardScore = rankCounter;
      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
        cardScore = 11;
      } else if (cardName == 11) {
        cardName = "jack";
        cardScore = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        cardScore = 10;
      } else if (cardName == 13) {
        cardName = "king";
        cardScore = 10;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        score: cardScore,
      };

      // Add the new card to the deck
      cardDeck.push(card);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }
  return cardDeck;
};
// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function () {
  return Math.floor(Math.random() * 52);
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

var shuffledDeck = shuffleCards(makeDeck());

var playerDraw = function () {
  document.getElementById("submit-button").innerText = "Enter";
  for (i = 0; i < 2; i++) {
    var playerPop = shuffledDeck.pop();
    playerCards.push(playerPop);
  }
  gameMode = "player redraw";
  document.getElementById("image").src = "";
  return `You drew ${playerCards[0].name} of ${playerCards[0].suit} and ${playerCards[1].name} of ${playerCards[1].suit}. 
  <br> Please enter hit or stand.`;
};

var playerReDraw = function (input) {
  myOutputValue = "";
  if (input.toLowerCase() == "stand") {
    document.getElementById("submit-button").innerText = "Computer draw";
    gameMode = "computer draw";
    myOutputValue = `Your current cards are:`;
    for (i = 0; i < playerCards.length; i++) {
      myOutputValue = `${myOutputValue} <br> ${playerCards[i].name} of ${playerCards[i].suit}.`;
    }
    return myOutputValue;
  }
  if (input.toLowerCase() == "hit") {
    var playerPop = shuffledDeck.pop();
    playerCards.push(playerPop);
    myOutputValue = `Your current cards are:`;

    for (i = 0; i < playerCards.length; i++) {
      myOutputValue = `${myOutputValue} <br> ${playerCards[i].name} of ${playerCards[i].suit}.`;
    }

    return `You drew ${playerPop.name} of ${playerPop.suit}! <br> ${myOutputValue}`;
  } else gameMode = "player redraw";
  document.getElementById("image").src =
    "https://c.tenor.com/ccKGLQKF7zIAAAAC/omaru-polka-hololive.gif";
  return `Please enter hit or stand!`;
};

var computerDraw = function () {
  document.getElementById("submit-button").innerText = "Results";
  myOutputValue = "The computer draws:";
  var computerRolls = 2;
  for (var i = 0; i < computerRolls; i++) {
    var computerPop = shuffledDeck.pop();
    computerCards.push(computerPop);
    computerScore = parseInt(computerScore + computerCards[i].score);
    if (computerScore > 21 && computerCards[i].name == "ace" && i > 1) {
      computerScore = parseInt(computerScore - 10);
    }
    if (computerScore < 17 && i >= 1) {
      computerRolls = computerRolls + 1;
    }
  }

  for (var i = 0; i < computerCards.length; i++) {
    myOutputValue = `${myOutputValue} <br> ${computerCards[i].name} of ${computerCards[i].suit}.`;
    gameMode = "result";
  }

  document.getElementById("image").src =
    "https://c.tenor.com/3MbwjGHJsLgAAAAC/hololive-omaru-polka.gif";
  return `${myOutputValue}`;
};

var result = function () {
  document.getElementById("submit-button").innerText = "Restart";
  myOutputValue = "";
  for (i = 0; i < playerCards.length; i++) {
    playerScore = parseInt(playerScore + playerCards[i].score);
    if (playerScore > 21 && playerCards[i].name == "ace" && i > 1) {
      playerScore = parseInt(playerScore - 10);
    }
  }
  if (playerScore > 21 && computerScore < 22) {
    document.getElementById("image").src =
      "https://c.tenor.com/c9DNtyx6uQQAAAAC/omaru-polka-hololive.gif";
    myOutputValue = `Your score is ${playerScore} points while the computer has ${computerScore} points.
      <br> You went over 21 points!
      <br> You lose!`;
  } else if (playerScore < 22 && computerScore > 21) {
    document.getElementById("image").src =
      "https://c.tenor.com/cIZZ381Qf6wAAAAC/omaru-polka-holo-no-graffiti.gif";
    myOutputValue = `Your score is ${playerScore} points while the computer has ${computerScore} points.
      <br> Computer went over 21 points!
      <br> You win!`;
  } else if (playerScore == computerScore) {
    document.getElementById("image").src =
      "https://c.tenor.com/sdqQHMreSuAAAAAC/omaru-polka-spin.gif";
    myOutputValue = `Your score is ${playerScore} points while the computer has ${computerScore} points.
      <br> You both have the same number of points!`;
  } else if (playerScore > computerScore) {
    document.getElementById("image").src =
      "https://c.tenor.com/cIZZ381Qf6wAAAAC/omaru-polka-holo-no-graffiti.gif";
    myOutputValue = `Your score is ${playerScore} points while the computer has ${computerScore} points.
      <br> You win!`;
  } else if (playerScore < computerScore) {
    document.getElementById("image").src =
      "https://c.tenor.com/c9DNtyx6uQQAAAAC/omaru-polka-hololive.gif";
    myOutputValue = `Your score is ${playerScore} points while the computer has ${computerScore} points.`;
  }

  gameMode = "restart";

  return `${myOutputValue}
  <br> Please click to play again!`;
};

var restart = function () {
  document.getElementById("submit-button").innerText = "Draw";
  document.getElementById("image").src =
    "https://c.tenor.com/7vCmlPVBJnwAAAAC/omaru-polka.gif";
  gameMode = "player draw";
  playerCards = [];
  computerCards = [];
  playerScore = "";
  computerScore = "";
  cardDeck = [];
  makeDeck();
  return `Next round!`;
};

var main = function (input) {
  console.log(gameMode);
  if (gameMode == "player draw") return playerDraw();
  if (gameMode == "player redraw") return playerReDraw(input);
  if (gameMode == "computer draw") return computerDraw();
  if (gameMode == "result") return result();
  if (gameMode == "restart") return restart();
};
