//GLOBAL VAR//
//set up players - hands, cards
var playerHand = [];
var dealerHand = [];
var currPlayerScore = 0;
var currDealerScore = 0;

const playerPrefix = "Player's ";
const dealerPrefix = "Dealer's ";

//GAME MODES//
var GAME_OVER = false;

//BUTTON TRIGGERS//
var hit_button = false;
var stand_button = false;
var player_response = false;

//deals two cards each to player and dealer
//player decides if they want to hit or stand -must hit if hand below 17-
//scoring: sum of card ranks, except face cards = 10, ace = 1 || 11
//eval: winning hand is hand closest to 21. above 21 is a bust

//INIT FN//
//set up deck
deck = makeDeck();
shuffledDeck = shuffleCards(deck);

var myOutputValue = "Hit 'Deal' to start playing.";
displayInstructions(myOutputValue);

//MAIN FN//
var main = function () {
  return myOutputValue;
};

//HELPER FUNCTIONS//
function displayInstructions(myOutputValue) {
  var output = document.querySelector("#output-div");
  output.innerHTML = myOutputValue;
  return output;
}

function displayHand(hand) {
  var output = "";
  output += `current hand is:<br><br>`;
  for (var i = 0; i < hand.length; i++) {
    output += `${hand[i].name} of ${hand[i].suit}<br>`;
  }
  return output;
}

function getPlayerRes(currPlayerScore) {
  if (currPlayerScore < 17) {
    myOutputValue += `<br>Your current score of ${currPlayerScore} is less than 17. Please 'Hit'.`;
    player_response = true;
  } else if (17 <= currPlayerScore && currPlayerScore <= 21) {
    myOutputValue += `<br>Your current score is ${currPlayerScore}. Would you like to 'Hit' or 'Stand'?`;
    player_response = true;
  } else {
    myOutputValue += `<br> Press 'Stand' to get result.`;
    player_response = true;
  }
}

///////////////
//DEAL BUTTON//
var dealButton = document.querySelector("#deal-button");
dealButton.addEventListener("click", function () {
  playerHand = [];
  dealerHand = [];
  currPlayerScore = 0;
  currDealerScore = 0;
  var hands = dealCards();
  playerHand = hands.playerHand;
  dealerHand = hands.dealerHand;
  //playerHand[0].rank = 1; //for checking Ace Values
  console.log("Player Hand:", playerHand);
  currPlayerScore = Math.abs(calcCardRank(playerHand));
  currDealerScore = Math.abs(calcCardRank(dealerHand));
  console.log("Player Score:", currPlayerScore);
  console.log("Dealer Score:", currDealerScore);
  //myOutputValue = `Your current hand is:<br><br>`;
  var output = displayHand(playerHand);
  myOutputValue = playerPrefix + output;
  //console.log(myOutputValue);
  getPlayerRes(currPlayerScore);
  displayInstructions(myOutputValue);
});

///////////////
//HIT BUTTON//
var hitButton = document.querySelector("#hit-button");
hitButton.addEventListener("click", function () {
  // Set result to input value
  hit_button = true;
  if (hit_button == true && player_response == true) {
    dealCards();
    var output = displayHand(playerHand);
    myOutputValue = playerPrefix + output;
    console.log(playerHand);
    currPlayerScore = Math.abs(calcCardRank(playerHand));
    getPlayerRes(currPlayerScore);
  } else {
    player_response = false;
    myOutputValue = "You can't hit now.";
  }
  displayInstructions(myOutputValue);
  return myOutputValue;
});

////////////////
//STAND BUTTON//
var standButton = document.querySelector("#stand-button");
standButton.addEventListener("click", function () {
  // Set result to input value
  stand_button = true;
  console.log("STAND pressed!");

  if (stand_button == true && player_response == true) {
    getDealerPlay(); //getDealerPlay() function
    var playerHandMsg = displayHand(playerHand);
    var playerMsg = playerPrefix + playerHandMsg;
    var dealerHandMsg = displayHand(dealerHand);
    var dealerMsg = dealerPrefix + dealerHandMsg;
    var finalMsg = `<br><br> Hit 'stand' again to get the result.`;
    myOutputValue = displayInstructions(
      playerMsg + "<br> " + dealerMsg + finalMsg
    );
    player_response = false;
  }

  if (stand_button == true && player_response == false) {
    myOutputValue = displayInstructions(checkWinner()); //console.log("calls check winner function")
    console.log(myOutputValue);
  }

  return myOutputValue;
});

function getDealerPlay() {
  if (currDealerScore < 16) {
    dealDealerCards();
    currDealerScore = Math.abs(calcCardRank(dealerHand));
  }
  return;
}

function checkWinner() {
  var results = [];
  var resultOutput = `${playerPrefix} score: ${currPlayerScore} vs. ${dealerPrefix} score: ${currDealerScore}.<br>`;
  myOutputValue = "";
  results.push(currPlayerScore, currDealerScore);

  //Scenario 1A - player wins
  if (!isOver21(currPlayerScore) && currPlayerScore > currDealerScore) {
    resultOutput += "Player Wins.<br>";
  }

  if (!isOver21(currDealerScore) && currDealerScore > currPlayerScore) {
    resultOutput += "Dealer Wins.<br>";
  }
  if (isOver21(currDealerScore) && currPlayerScore <= 21) {
    resultOutput += "Player Wins.<br>";
  }
  //Scernario 2 - dealer wins
  if (isOver21(currPlayerScore) && currDealerScore <= 21) {
    resultOutput += "Dealer Wins.<br>";
  }
  //scenario 3 - draw
  if (currDealerScore == currPlayerScore) {
    resultOutput += "It's a draw.<br>";
  }
  //scenario 4 - both bust - draw
  if (isOver21(currPlayerScore) && isOver21(currDealerScore)) {
    resultOutput += "Both went bust!";
  }

  myOutputValue += resultOutput;
  console.log(resultOutput);
  return myOutputValue;
}

function dealDealerCards() {
  if (dealerHand.length > 0) {
    dealerHand.push(shuffledDeck.pop());
  }
  return dealerHand;
}

function calcCardRank(arr) {
  //loops through the hand
  var scores = [];
  var scoreAce1 = 0;
  var scoreAce11 = 0;

  for (var i = 0; i < arr.length; i++) {
    //checks if have face card and set score to 10
    //else if checks if contains ace, sets score to either 1 or 11
    //else uses rank as score
    if (arr[i].rank > 10) {
      scoreAce1 += 10; //score if ace is 1
      scoreAce11 += 10; //score if ace is 10
    } else if (containsAce(arr[i])) {
      scoreAce1 += 1; //score if ace is 1
      scoreAce11 += 11; //score if ace is 10
    } else {
      //sums up the score
      scoreAce1 += arr[i].rank;
      scoreAce11 += arr[i].rank;
    }
  }
  scores.push(scoreAce1, scoreAce11);
  console.log("Scores:", scores);
  //runs scores through the eval score function to determine what the best hand should be
  var score = evalScore(scores);
  console.log("Hand score:", score);
  return score;
}

function evalScore(scores) {
  //returns the highest score less than and closest to 21
  var scoreChecker = [];
  for (var i = 0; i < scores.length; i++) {
    if (isOver21(scores[i])) {
      scoreChecker.push(-1 * scores[i]);
    } else {
      scoreChecker.push(scores[i]);
    }
  }
  console.log("Score Checker:", scoreChecker);
  return Math.max(...scoreChecker);
}

function containsAce(card) {
  if (card.rank == 1) {
    return true;
  }
  return false;
}

function isLessThan17(score) {
  if (score < 17) {
    return true;
  }
  return false;
}

function isOver21(score) {
  if (score > 21) {
    return true;
  }
  return false;
}

//this function deals cards (including dealer)
function dealCards() {
  if (playerHand.length > 0) {
    playerHand.push(shuffledDeck.pop());
  } else
    for (var i = 0; i < 2; i++) {
      playerHand.push(shuffledDeck.pop());
      dealerHand.push(shuffledDeck.pop());
    }
  return { playerHand: playerHand, dealerHand: dealerHand };
}

//this functions creates a deck upon page load
function makeDeck() {
  var deck = [];
  var suits = ["diamonds", "clubs", "hearts", "spades"];
  //loop 1: loops through the suits
  for (let suitCounter = 0; suitCounter < suits.length; suitCounter++) {
    currentSuit = suits[suitCounter];
    //console.log(suits[suitCounter]);
    //loop 2
    let cardCounter = 1;
    for (cardCounter; cardCounter < 14; cardCounter++) {
      var currentRank = cardCounter;
      var currentSuit = suits[suitCounter];
      var name = cardCounter;
      if (currentRank == 1) {
        name = "ace";
      }
      if (currentRank == 11) {
        name = "jack";
      }
      if (currentRank == 12) {
        name = "queen";
      }
      if (currentRank == 13) {
        name = "king";
      }

      var currentCard = { rank: currentRank, suit: currentSuit, name: name };
      deck.push(currentCard);
    }
  }
  console.log(deck);
  return deck;
}

// this functions gets a random index ranging from 0 (inclusive) to max (exclusive).
function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
}

// this functions huffles the elements in the cardDeck array
function shuffleCards(cardDeck) {
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
}
