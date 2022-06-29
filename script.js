//create game modes
var gameStart = "start of game";
var playerToHitOrStand = "hit or stand";
var whoWon = "who won";
var currentGameMode = gameStart;

//---------------------------------------------------------------------------------------------------//
//----------------------------------------beautifying functions--------------------------------------//
//---------------------------------------------------------------------------------------------------//

var outputBox = document.getElementById("output-div");
var subHeaderContainerDiv = document.getElementById("subHeaderContainer");
var mainButton = document.getElementById("submit-button");
var buttonContainer = document.getElementById("buttonContainer");
var hitButton = document.createElement("button");

var newSubHeader = document.createElement("p");
newSubHeader.innerText = "CARDS HAVE BEEN DEALT";

// var creatingHitAndhitButtons = function () {
//   var hitButton = document.createElement("button");
//   hitButton.innerText = "Hit";
//   var hitButton = document.createElement("button");
//   hitButton.innerText = "Stand";
//   buttonContainer.appendChild(hitButton);
//   buttonContainer.appendChild(hitButton);
//   buttonContainer.removeChild(mainButton);
// };

//---------------------------------------------------------------------------------------------------//
//-----------------------------for first game mode: gameStart----------------------------------------//
//---------------------------------------------------------------------------------------------------//

//function to make a new deck
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

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// function to shuffle cards
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

//create arrays for player and dealer hands
var playerHand = [];
var computerHand = [];
var shuffledDeck = [];

var displayHand = function (array) {
  var index = 0;
  var output = ``;
  while (index < array.length) {
    output = output + `${array[index].name} ${array[index].suit}</br>`;
    index += 1;
  }
  return output;
};

// to display player and computer's hands

var displayBothHands = function (playerHand, computerHand) {
  var output = ``;
  var displayPlayerHand = displayHand(playerHand);
  var displayComputerHand = displayHand(computerHand);
  output = `</br><u> Player's hand </u> ${displayPlayerHand}</br></br> <u> Computer's hand </u> ${displayComputerHand}</br></br>`;
  return output;
};

//---------------------------------------------------------------------------------------------------//
//--------------for second game mode: check to see if  there are blackjack wins ---------------------//
//---------------------------------------------------------------------------------------------------//

//  to check if there's blackjack first (when there's only 2 cards)

var checkForBlackjack = function (array) {
  var blackjackChecker = false;
  if (
    (array[0].name == "ace" && array[1].rank >= 10) ||
    (array[0].rank >= 10 && array[1].name == "ace")
  ) {
    blackjackChecker = true;
  }
  return blackjackChecker;
};

// to see if player or computer got blackjack
var anyoneWonBlackjack = false;

var winThroughBlackjack = function (playerHand, computerHand) {
  newSubHeader.innerText = "CARDS HAVE BEEN DEALT";
  newSubHeader.style.fontFamily = "britannic bold";
  //actual gameplay
  shuffledDeck = shuffleCards(makeDeck());
  //pop 2 cards from the shuffled deck into our player's and computer's hands
  var index = 0;
  while (index < 2) {
    playerHand.push(shuffledDeck.pop());
    computerHand.push(shuffledDeck.pop());
    index += 1;
  }
  console.log(playerHand, computerHand);

  var playerBlackjack = checkForBlackjack(playerHand);
  var computerBlackjack = checkForBlackjack(computerHand);
  console.log(
    "player blackjack?",
    playerBlackjack,
    "computer blackjack?",
    computerBlackjack
  );
  var output = ``;
  if (playerBlackjack == true && computerBlackjack == true) {
    anyoneWonBlackjack = true;
    currentGameMode = gameStart;
    mainButton.innerText = "Restart";
    output =
      `Both you and the computer have gotten blackjack! How amazing! It's a <b>tie</b>!</br>` +
      displayBothHands(playerHand, computerHand);
  } else if (playerBlackjack == true) {
    anyoneWonBlackjack = true;
    currentGameMode = gameStart;
    mainButton.innerText = "Restart";
    output =
      ` Player has gotten a blackjack and won!</br> ` +
      displayBothHands(playerHand, computerHand);
  } else if (computerBlackjack == true) {
    anyoneWonBlackjack = true;
    currentGameMode = gameStart;
    mainButton.innerText = "Restart";
    output =
      ` Computer has gotten a blackjack and won!</br>` +
      displayBothHands(playerHand, computerHand);
  } else {
    anyoneWonBlackjack = false;

    hitButton.innerText = "Hit";
    buttonContainer.appendChild(hitButton);
    mainButton.innerText = "Stand";

    output =
      `No one gotten blackjack! Let's move on with the game. Please click on the "hit" or "stand" button to proceed.</br>` +
      displayBothHands(playerHand, computerHand);
    currentGameMode = playerToHitOrStand;
  }
  return output;
};

//---------------------------------------------------------------------------------------------------//
//----------------------------for third game mode: hit or stand --------------------------------//
//---------------------------------------------------------------------------------------------------//

var hitOrStandStage = function () {
  buttonContainer.appendChild(hitButton);
  var output = ``;
  if (calculateHandScore(playerHand) == 21) {
    console.log("hit mode 1");
    output = `Congratulations you have hit the highest possible score! Click "See results" to see the final results. </br> ${displayBothHands(
      playerHand,
      computerHand
    )}`;
    while (calculateHandScore(computerHand) < 16) {
      computerHand.push(shuffledDeck.pop());
    }
    mainButton.innerText = "See results";
    buttonContainer.removeChild(hitButton);
    currentGameMode = whoWon;
    return output;
  }
  if (calculateHandScore(playerHand) > 21) {
    console.log("hit mode 2");
    output = `Your hand is already bust. Click "See results" to see the final results. </br> ${displayBothHands(
      playerHand,
      computerHand
    )}`;
    mainButton.innerText = "See results";
    buttonContainer.removeChild(hitButton);
    currentGameMode = whoWon;

    while (calculateHandScore(computerHand) < 16) {
      computerHand.push(shuffledDeck.pop());
    }
    return output;
  }
  if (
    calculateHandScore(playerHand) < 21 &&
    calculateHandScore(playerHand) >= 16
  ) {
    console.log("hit mode 3");

    while (calculateHandScore(computerHand) < 16) {
      computerHand.push(shuffledDeck.pop());
    }
    output =
      `You have chosen to stand. Click "See results" to see the final results. </br>` +
      displayBothHands(playerHand, computerHand);
    mainButton.innerText = "See results";
    buttonContainer.removeChild(hitButton);
    currentGameMode = whoWon;
    return output;
  }
  if (calculateHandScore(playerHand) < 16);
  {
    console.log("hit mode 4");
    //to force player to hit if hand points is less than 16
    output = `Your hand score should not be less than 16. Please click on the "hit" button above. </br> ${displayBothHands(
      playerHand,
      computerHand
    )}`;
  }
  return output;
};

//---------------------------------------------------------------------------------------------------//
//----------------------------for fourth game mode: to check who won --------------------------------//
//---------------------------------------------------------------------------------------------------//

// to calculate total score of either player or computer

var calculateHandScore = function (array) {
  var handScore = 0;
  var index = 0;
  var aceCounter = 0;
  while (index < array.length) {
    var currentCard = array[index];

    //to set rank for jack, queen and king to be 10
    if (
      currentCard.name == "jack" ||
      currentCard.name == "queen" ||
      currentCard.name == "king"
    ) {
      currentCard.rank = 10;
      handScore = handScore + currentCard.rank;
    }

    // to set ace to be 11 until total score > 21, then ace becomes 1
    else if (currentCard.name == "ace" && handScore <= 21) {
      aceCounter = 1;
      currentCard.rank = 11;
      handScore = handScore + currentCard.rank;
    } else {
      handScore = handScore + currentCard.rank;
    }
    index += 1;

    if (handScore > 21 && aceCounter > 0) {
      aceCounter = 0;
      handScore = handScore - 10;
    }
  }
  return handScore;
};

var winOrLose = function (playerHand, computerHand) {
  console.log("win or lose");
  var output = ``;
  var playerScore = calculateHandScore(playerHand);
  var computerScore = calculateHandScore(computerHand);
  console.log("player score", playerScore, "computer score", computerScore);
  newSubHeader.innerText = "✨ RESULTS ✨";
  newSubHeader.style.fontFamily = "brush script MT";
  mainButton.innerText = "Restart";
  if (playerScore >= 22 && computerScore >= 22) {
    output = `Both you and the computer have lost! </br> ${displayBothHands(
      playerHand,
      computerHand
    )}Player's score: ${playerScore}</br>Computer's score: ${computerScore}`;
  } else if (
    (playerScore <= 21 && computerScore >= 22) ||
    (playerScore <= 21 && playerScore > computerScore)
  ) {
    output = `Player has won! </br>  ${displayBothHands(
      playerHand,
      computerHand
    )} Player's score: ${playerScore}</br>Computer's score: ${computerScore}`;
  } else if (playerScore == computerScore && playerScore <= 21) {
    output = `It's a tie! </br>  ${displayBothHands(
      playerHand,
      computerHand
    )} Player's score: ${playerScore}</br>Computer's score: ${computerScore}`;
  } else {
    output = `Computer has won! </br> ${displayBothHands(
      playerHand,
      computerHand
    )} Player's score: ${playerScore}</br>Computer's score: ${computerScore}`;
  }
  return output;
};

//---------------------------------------------------------------------------------------------------//
//-------------------------------------------main function-------------------------------------------//
//---------------------------------------------------------------------------------------------------//
var main = function (input) {
  console.log("starting game mode", currentGameMode);
  var output = ``;
  if (currentGameMode == gameStart) {
    //to reset text alignment to left

    outputBox.style.alignItems = "start";
    outputBox.style.textAlign = "left";

    //add subheader text
    subHeaderContainerDiv.appendChild(newSubHeader);

    //reset arrays
    shuffledDeck = [];
    playerHand = [];
    computerHand = [];

    //game play
    output = winThroughBlackjack(playerHand, computerHand);
  } else if (currentGameMode == playerToHitOrStand) {
    output = hitOrStandStage();
  } else if (currentGameMode == whoWon) {
    console.log("testing");
    output = winOrLose(playerHand, computerHand);
    currentGameMode = gameStart;
  }
  console.log("ending game mode", currentGameMode);
  return output;
};

hitButton.addEventListener("click", () => {
  outputBox.innerHTML = main2();
});

var main2 = function () {
  var output = ``;
  if (calculateHandScore(playerHand) == 21) {
    output = `Congratulations you have hit the highest possible score! Click "See results" to see the final results. </br> ${displayBothHands(
      playerHand,
      computerHand
    )}`;
    while (calculateHandScore(computerHand) < 16) {
      computerHand.push(shuffledDeck.pop());
    }
    mainButton.innerText = "See results";
    buttonContainer.removeChild(hitButton);
    currentGameMode = whoWon;
  } else if (calculateHandScore(playerHand) > 21) {
    output = `Your hand is already bust. Click "See results" to see the final results. </br> ${displayBothHands(
      playerHand,
      computerHand
    )}`;
    while (calculateHandScore(computerHand) < 16) {
      computerHand.push(shuffledDeck.pop());
    }
    mainButton.innerText = "See results";
    buttonContainer.removeChild(hitButton);
    currentGameMode = whoWon;
  } else {
    playerHand.push(shuffledDeck.pop());
    output =
      `You have taken another card. Please enter "hit" above to take another card or enter "stand" to stop.</br> ` +
      displayBothHands(playerHand, computerHand);
  }
  return output;
};
