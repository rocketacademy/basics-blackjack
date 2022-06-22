//constants
var WIN = "win";
var LOSE = "lose";
var DRAW = "draw";

var DEALING = 0;
var PLAYING = 1;
var PLAYERSELECTION = 2;

// Global variables
var noOfPlayers = 0;
var playerHands = [];
var aiHand = [];
var gameMode = PLAYERSELECTION;
var aiRiskThreshold = 17;
var currentPlayer = 0;

var makeDeck = function () {
  var deck = [];
  var suits = ["♠", "♣", "♥", "♦"];
  var values = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];
  for (countSuit = 0; countSuit < suits.length; countSuit++) {
    for (let countValues = 0; countValues < values.length; countValues++) {
      deck.push({ value: values[countValues], suit: suits[countSuit] });
    }
  }
  return deck;
};

var draw = function (hand, deck) {
  var drawnCard = deck.pop();
  hand.push(drawnCard);
};

var handGenerator = function (noOfPlayers) {
  for (var i = 0; i < noOfPlayers; i++) {
    playerHands.push([]);
  }
};

var deal = function (listOfHands, noOfCards, deck) {
  for (var i = 0; i < noOfCards; i++) {
    for (var j = 0; j < listOfHands.length; j++) {
      draw(listOfHands[j], deck);
    }
  }
};

var shuffleDeck = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    // Generate random number
    var j = Math.floor(Math.random() * (i + 1));

    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
};

var handValueCounter = function (hand) {
  var totalValue = 0;
  var noOfAces = 0;
  for (var i = 0; i < hand.length; i++) {
    if (hand[i].value == "J" || hand[i].value == "Q" || hand[i].value == "K") {
      totalValue += 10;
    } else if (hand[i].value == "A") {
      noOfAces += 1;
    } else {
      totalValue += Number(hand[i].value);
    }
  }
  for (var i = 0; i < noOfAces; i++) {
    if (totalValue + 11 <= 21) {
      totalValue += 11;
    } else {
      totalValue += 1;
    }
  }
  return totalValue;
};

var winChecker = function (hand1, hand2) {
  if (handValueCounter(hand1) > 21 && handValueCounter(hand2) > 21) {
    return DRAW;
  } else if (handValueCounter(hand1) > 21) {
    return LOSE;
  } else if (handValueCounter(hand2) > 21) {
    return WIN;
  } else {
    if (handValueCounter(hand1) > handValueCounter(hand2)) {
      return WIN;
    } else if (handValueCounter(hand1) < handValueCounter(hand2)) {
      return LOSE;
    } else {
      return DRAW;
    }
  }
};

var totalWinChecker = function (listOfHands, ai) {
  var output = [];
  for (var i = 0; i < listOfHands.length; i++) {
    output.push(winChecker(listOfHands[i], ai));
  }
  return output;
};

var bjChecker = function (hand) {
  if (handValueCounter(hand) == 21 && hand.length == 2) {
    return true;
  }
  return false;
};

var totalBjChecker = function (listOfHands) {
  var output = [];
  for (var i = 0; i < listOfHands.length; i++) {
    if (bjChecker(listOfHands[i])) {
      output.push(i + 1);
    }
  }
  return output;
};

var handDisplay = function (hand) {
  var text = ``;
  for (var i = 0; i < hand.length; i++) {
    text += `${hand[i].value + hand[i].suit}  `;
  }
  return text;
};

var statusDisplay = function (handlist, ai, slice) {
  var status = "<br>";
  for (var i = 0; i < handlist.length; i++) {
    status +=
      `<br>Player cards drawn (${handValueCounter(handlist[i])}): ` +
      handDisplay(handlist[i]);
  }
  if (slice) {
    status +=
      `<br><br>AI cards drawn (${handValueCounter(ai.slice(slice))}):<br>??  ` +
      handDisplay(ai.slice(slice));
  } else {
    status +=
      `<br><br>AI cards drawn (${handValueCounter(ai.slice(slice))}): ` +
      handDisplay(ai.slice(slice));
  }
  return status;
};

var ai = function (deck) {
  var currentScore = handValueCounter(aiHand);
  if (currentScore < aiRiskThreshold) {
    draw(aiHand, deck);
  }
};

// true to enable submit button
var toggleButtons = function (state) {
  if (state == true) {
    document.getElementById("hit-button").disabled = true;
    document.getElementById("stand-button").disabled = true;
    document.getElementById("submit-button").disabled = false;
  } else {
    document.getElementById("hit-button").disabled = false;
    document.getElementById("stand-button").disabled = false;
    document.getElementById("submit-button").disabled = true;
  }
};

// game to display buttons, start to display player selection
var toggleGameUI = function (state) {
  var opening = document.getElementById("opening");
  var startButton = document.getElementById("start-button");
  var inputField = document.getElementById("input-field");
  var instructions = document.getElementById("instructions");
  var submitButton = document.getElementById("submit-button");
  var hitButton = document.getElementById("hit-button");
  var standButton = document.getElementById("stand-button");
  if (state == "game") {
    opening.style.display = "none";
    inputField.style.display = "none";
    startButton.style.display = "none";
    instructions.style.display = "block";
    submitButton.style.display = "inline";
    hitButton.style.display = "inline";
    standButton.style.display = "inline";
  } else if (state == "start") {
    opening.style.display = "block";
    inputField.style.display = "block";
    startButton.style.display = "block";
    instructions.style.display = "none";
    submitButton.style.display = "none";
    hitButton.style.display = "none";
    standButton.style.display = "none";
  }
};

// all numbers in blackjackcheck start with 1, not 0. compensated by +1 in the function for totalbjchecker itself
var main = function (input) {
  if (gameMode == PLAYERSELECTION) {
    if (Number(input) > 0 && Number(input) < 8) {
      noOfPlayers = input;
      gameMode = DEALING;
      toggleGameUI("game");
      return "";
    } else {
      return "Please key in a player number between 0 and 8.";
    }
  }
  if (gameMode == DEALING) {
    aiHand = [];
    playerHands = [];
    handGenerator(noOfPlayers);
    sampleDeck = shuffleDeck(makeDeck());
    deal([...playerHands, aiHand], 2, sampleDeck);
    blackjackCheck = totalBjChecker([...playerHands, aiHand]);
    if (blackjackCheck.length == noOfPlayers + 1) {
      return (
        "It's a tie! Press Submit again to start a new round." +
        statusDisplay(playerHands, aiHand, 0)
      );
    } else if (blackjackCheck.includes(noOfPlayers + 1)) {
      return (
        "Blackjack! AI wins! Press Submit again to start a new round." +
        statusDisplay(playerHands, aiHand, 0)
      );
    } else if (blackjackCheck.length) {
      gameMode = PLAYING;
      currentPlayer = 1;
      return (
        `Blackjack! Player ${blackjackCheck.join(
          ", "
        )} wins! Press Submit again to continue.` +
        statusDisplay(
          playerHands.filter((x, i) => blackjackCheck.includes(i + 1)),
          aiHand,
          1
        )
      );
    } else {
      gameMode = PLAYING;
      currentPlayer = 1;
      toggleButtons(false);
      return (
        "Cards have been dealt; player 1 hit or stand?" +
        statusDisplay([playerHands[currentPlayer - 1]], aiHand, 1)
      );
    }
  }
  if (
    gameMode == PLAYING &&
    currentPlayer < noOfPlayers + 1 &&
    !blackjackCheck.includes(currentPlayer)
  ) {
    if (input == "h") {
      draw(playerHands[currentPlayer - 1], sampleDeck);
      if (handValueCounter(playerHands[currentPlayer - 1]) > 21) {
        toggleButtons(true);
        currentPlayer += 1;
        return (
          "Oops! Looks like you bust. Press Submit again to continue." +
          statusDisplay([playerHands[currentPlayer - 2]], aiHand, 1)
        );
      }
      return (
        `Player ${currentPlayer} hit or stand?` +
        statusDisplay([playerHands[currentPlayer - 1]], aiHand, 1)
      );
    } else if (input == "s" && currentPlayer == noOfPlayers) {
      toggleButtons(true);
      currentPlayer += 1;
      return (
        "Alright, now it's the AI's turn. Press Submit again to continue." +
        statusDisplay([playerHands[currentPlayer - 2]], aiHand, 1)
      );
    } else if (input == "s") {
      toggleButtons(true);
      currentPlayer += 1;
      return (
        `Alright, now it will be player ${currentPlayer}'s turn. Press Submit again to continue.` +
        statusDisplay([playerHands[currentPlayer - 2]], aiHand, 1)
      );
    }
  } else if (
    gameMode == PLAYING &&
    currentPlayer < noOfPlayers + 1 &&
    blackjackCheck.includes(currentPlayer)
  ) {
    toggleButtons(true);
    currentPlayer += 1;
    return "This player has won a blackjack this round. Press continue to move on to the next player.";
  }
  if (currentPlayer > noOfPlayers) {
    console.log("efe");
    toggleButtons(true);
    ai(sampleDeck);

    var winners = totalWinChecker(playerHands, aiHand);
    var winStatement = "";
    for (var i = 0; i < winners.length; i++) {
      winStatement += `Player ${i + 1}: ${winners[i]}<br>`;
    }
    gameMode = DEALING;
    currentPlayer = 0;
    return winStatement + statusDisplay(playerHands, aiHand, 0);
  }
};

// Gameplay
// Check if any blackjacks after dealing, end the game if there is at least one blackjack
// Player chooses to hit or stand until done
// AI hits or stand until done. It should choose to hit as long as current total is < 21 and less than player total
// check winner
