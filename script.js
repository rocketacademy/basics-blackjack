//GLOBAL VAR//
//set up players - hands, cards
var playerHand = [];
var dealerHand = [];

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

var counter = 0;

while (GAME_OVER !== true) {
  console.log("game running...");
  counter++;
  if (counter == 2) {
    GAME_OVER = true;
    console.log("Game Over.");
  }
}
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

function displayHand(playerHand) {
  var output = "";
  output += `Your current hand is:<br><br>`;
  for (var i = 0; i < playerHand.length; i++) {
    output += `${playerHand[i].name} of ${playerHand[i].suit}<br>`;
  }
  return output;
}

function getPlayerRes() {
  if (currPlayerScore < 17) {
    myOutputValue += `<br>Your current score is less than 17. Please 'Hit'.`;
    player_response = true;
  } else if (currPlayerScore >= 17) {
    myOutputValue += `<br>Would you like to 'Hit' or 'Stand'?`;
    player_response = true;
  } else {
    myOutputValue += `<br> Press 'Stand' to get result.`;
    player_response = true;
  }
}

var dealButton = document.querySelector("#deal-button");
dealButton.addEventListener("click", function () {
  var hands = dealCards();
  playerHand = hands.playerHand;
  dealerHand = hands.dealerHand;
  //playerHand[0].rank = 1; //for checking Ace Values
  console.log("Player Hand:", playerHand);
  currPlayerScore = calcCardRank(playerHand);
  currDealerScore = calcCardRank(dealerHand);
  //console.log(currPlayerScore);
  //myOutputValue = `Your current hand is:<br><br>`;
  myOutputValue = displayHand(playerHand);
  console.log(myOutputValue);
  getPlayerRes();
  displayInstructions(myOutputValue);
});

var hitButton = document.querySelector("#hit-button");
hitButton.addEventListener("click", function () {
  // Set result to input value
  hit_button = true;
  if (hit_button == true && player_response == true) {
    dealCards();
    myOutputValue = displayHand(playerHand);
    console.log(playerHand);
    calcCardRank(playerHand);
    //myOutputValue = displayInstructions(output);
    getPlayerRes();
    displayInstructions(myOutputValue);
  } else {
    myOutputValue = "You can't hit now.";
  }
  return myOutputValue;
});

var standButton = document.querySelector("#stand-button");
standButton.addEventListener("click", function () {
  // Set result to input value
  stand_button = true;
  if (stand_button == true && player_response == true) {
    console.log("calls check winner function"); //getWinner();
    player_response = false;
  }
});

function calcCardRank(arr) {
  //loops through the hand
  var scores = [];
  var score1 = 0;
  var score2 = 0;

  for (var i = 0; i < arr.length; i++) {
    //checks if have face card and set score to 10
    //else if checks if contains ace, sets score to either 1 or 11
    //else uses rank as score
    if (arr[i].rank > 10) {
      score1 += 10; //score if ace is 1
      score2 += 10; //score if ace is 10
    } else if (containsAce(arr[i])) {
      score1 += 1; //score if ace is 1
      score2 += 11; //score if ace is 10
    } else {
      //sums up the score
      score1 += arr[i].rank;
      score2 += arr[i].rank;
    }
  }
  scores.push(score1, score2);
  //console.log(typeof score1);
  //console.log(typeof score2);
  console.log("Scores:", scores);
  //runs scores through the eval score function to determine what the best hand should be
  var score = evalScore(scores);
  return score;
}

function evalScore(scores) {
  //returns the highest score less than and closest to 21
  var scoreChecker = [];
  for (var i = 0; i < scores.length; i++) {
    if (isOver21(scores[i])) {
      scoreChecker.push(0);
    } else {
      scoreChecker.push(scores[i]);
    }
  }
  console.log("Score Checker:", scoreChecker);
  return Math.max(...scoreChecker);
}

function checkWinner() {}

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
