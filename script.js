//create GameMode
var GAMEMODE = "Game Start";
var GAMEMODE_START = "Game Start";
var GAMEMODE_BETTING = "Betting time";
var GAMEMODE_CARDS_DRAWN = "Game Cards Drawn";
var GAMEMODE_HIT_OR_STAND = "Hit or Stand";
//Global var for arrays
var computerArray = [];
var playerArray = [];

//Global vars for betting
var playersPot = 100;
var bet = 0;

//Global vars for deck making...
var cardColors = ["red", "red", "black", "black"];
var suits = ["♥", "♦", "♣", "♠"];
var myOutputValue = "";

//////////////////////////////////////////////////////////////////
//Gifs for win/lose
var comImage = document.querySelector("#computer-img");

var mainImage = "https://i.gifer.com/74xC.gif";

var imgPlayerWin =
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnVvdmF1ejE0azVqczFheDRiMm10cHVjZnU5NXZjODFvMDJtZWRmYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3IcEq6Cq9R9ErPoZIK/giphy.gif";

var imgComputerWin =
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExemRvcDV1cjdvbWNhd3AwbDBidDRrdHNvcjE5Y2E1dmhobmlvZmFndyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/meJM4BcF1K6elGxBnn/giphy.gif";

var imgTie =
  "https://media0.giphy.com/media/BvBm716X0ldV6/giphy.gif?cid=ecf05e47ey89i8uiuc3rijc7kot2s4oq0ueqlgx1h2i20i6j&ep=v1_gifs_search&rid=giphy.gif&ct=g";

//////////////////////////////////////////////////////////////////
//Button element...
var buttonStart = document.querySelector("#start-button");
var buttonBet = document.querySelector("#bet-button");
var buttonHit = document.querySelector("#hit-button");
var buttonStand = document.querySelector("#stand-button");
var buttonRestart = document.querySelector("#restart-button");
var inputBar = document.querySelector("#input-field");

inputBar.style.display = "none";
buttonStart.style.display = "inline";
buttonBet.style.display = "none";
buttonHit.style.display = "none";
buttonStand.style.display = "none";
buttonRestart.style.display = "none";

var buttonsForGameStart = function () {
  inputBar.style.display = "inline";
  buttonBet.style.display = "inline";
  buttonStart.style.display = "none";
  buttonRestart.style.display = "none";
};

var buttonsAfterBet = function () {
  inputBar.style.display = "none";
  buttonBet.style.display = "none";
  buttonStart.style.display = "inline";
};

var buttonsForHitorStand = function () {
  buttonStart.style.display = "none";
  buttonHit.style.display = "inline";
  buttonStand.style.display = "inline";
};

var buttonToRestart = function () {
  buttonHit.style.display = "none";
  buttonStand.style.display = "none";
  buttonRestart.style.display = "inline";
};

//////////////////////////////////////////////////////////////////
//create function for making a shuffled deck...
var shuffleDeck = function () {
  //Creating a deck...
  var cardDeck = [];
  //for every suit, there is 13 cards and 1 color at the same index
  var counter = 0;
  while (counter < suits.length) {
    var cardSuit = suits[counter];
    var cardColor = cardColors[counter];

    var rankingCounter = 1;
    while (rankingCounter <= 13) {
      var cardRank = rankingCounter;
      var cardName = rankingCounter;
      var cardValue = rankingCounter;

      // to make the card name be ace, jack, queen, king...
      if (cardName === 1) {
        cardName = "Ace";
        cardValue = 1;
      }
      if (cardName === 11) {
        cardName = "Jack";
        cardValue = 10;
      }
      if (cardName === 12) {
        cardName = "Queen";
        cardValue = 10;
      }
      if (cardName === 13) {
        cardName = "King";
        cardValue = 10;
      }
      var card = {
        name: cardName,
        color: cardColor,
        suit: cardSuit,
        rank: cardRank,
        value: cardValue,
      };
      cardDeck.push(card);
      rankingCounter += 1;
    }
    counter += 1;
  }

  //Now to shuffle the deck...
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = Math.floor(Math.random() * 52);
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

  return cardDeck;
};
var shuffledDeck = shuffleDeck();

//////////////////////////////////////////////////////////////////

//Bet phase...
//player inputs the amount of money to bet, then presses submit.
var bettingPhase = function () {
  myOutputValue = `Greetings player! You've got $${playersPot}<br>Please input the bet amount and submit.`;
  GAMEMODE = GAMEMODE_BETTING;
  return myOutputValue;
};

//when player bets
var betting = function (input) {
  if (input <= playersPot && input !== "") {
    bet = input;
    myOutputValue = `You've bet ${input}!<br> Now it's time to play!`;
    GAMEMODE = GAMEMODE_CARDS_DRAWN;
    buttonsAfterBet();
    return myOutputValue;
  }
  myOutputValue = `Please bet within your means...`;
  return myOutputValue;
};

//total amount in pot string
var totalPotValue = function (playersPot) {
  myOutputValue = `You've got $${playersPot}!`;
};
var potValueString = totalPotValue(playersPot);
//////////////////////////////////////////////////////////////////

//function for drawing first 4 cards...
var drawFirstCards = function (playerArray, computerArray) {
  //4 cards total drawn first by player and computer.
  playerArray.push(shuffledDeck.pop());
  computerArray.push(shuffledDeck.pop());
  playerArray.push(shuffledDeck.pop());
  computerArray.push(shuffledDeck.pop());
};

//function to check for initial blackjack
var checkForBlackjack = function (array) {
  // Check player hand
  var card01 = array[0];
  var card02 = array[1];
  var isBlackjack = false;

  //if there is blackjack, return true
  if (
    (card01.name === "Ace" && card02.rank >= 10) ||
    (card01.rank >= 10 && card02.name === "Ace") ||
    (card01.name === "Ace" && card02.name === "Ace")
  ) {
    isBlackjack = true;
  }
  return isBlackjack;
};

//function for to check for initial blackjack string
var initialBlackjack = function (
  playerBlackjack,
  computerBlackjack,
  resultsOfCards
) {
  //tie
  if (playerBlackjack == true && computerBlackjack == true) {
    comImage.src = imgTie;
    myOutputValue = `${resultsOfCards}It's a tie!<br>You've got $${playersPot}!`;
    restart();
    return myOutputValue;
  }
  //lose
  if (playerBlackjack == false && computerBlackjack == true) {
    playersPot = playersPot - Number(bet) * 2;
    comImage.src = imgComputerWin;
    var resultsOfCards = displayPlayerAndDealersHands(
      playerArray,
      computerArray
    );
    myOutputValue = `${resultsOfCards}You lose!<br>You've got $${playersPot}!`;
    restart();
    return myOutputValue;
  }
  //win
  if (playerBlackjack == true && computerBlackjack == false) {
    playersPot = playersPot + Number(bet) * 2;
    comImage.src = imgPlayerWin;
    var resultsOfCards = displayPlayerAndDealersHands(
      playerArray,
      computerArray
    );
    myOutputValue = `${resultsOfCards}You win!<br>You've got $${playersPot}!`;
    restart();
    return myOutputValue;
  }
};

//////////////////////////////////////////////////////////////////

// function to add values of cards...
var totalHandValue = function (array) {
  var handValues = 0;
  var aceCounter = 0;
  //create loop to add up the values
  var counter = 0;
  while (counter < array.length) {
    var currentCard = array[counter];
    if (currentCard.name === "Ace") {
      handValues = handValues + 10;
      aceCounter += 1;
    }
    handValues = handValues + currentCard.value;
    counter += 1;
  }
  counter = 0;
  while (counter < aceCounter) {
    if (handValues > 21) {
      handValues = handValues - 10;
    }
    counter += 1;
  }
  if (currentCard.name === "Ace" && array.length === 4) {
    handValues = handValues - 10;
    return handValues;
  }
  return handValues;
};

// String for cards drawn...(before win/lose)
var displayPlayerAndDealersHandsHidden = function (playerArray, computerArray) {
  //computer string
  var computerMessage = "Computers Hand:<br>🌌👾<br>";
  var counter = 1;
  while (counter < computerArray.length) {
    computerMessage =
      computerMessage +
      `${computerArray[counter].name}${computerArray[counter].suit}<br>`;
    counter += 1;
  }

  //player string
  var playerMessage = `Players Hand:<br>`;
  var counter = 0;
  while (counter < playerArray.length) {
    playerMessage =
      playerMessage +
      `${playerArray[counter].name}${playerArray[counter].suit}<br>`;
    counter += 1;
  }
  return `${computerMessage}<br> ${playerMessage}`;
};

// String for cards drawn...
var displayPlayerAndDealersHands = function (playerArray, computerArray) {
  //computer string
  var computerMessage = "Computers Hand:<br>";
  var counter = 0;
  while (counter < computerArray.length) {
    computerMessage =
      computerMessage +
      `${computerArray[counter].name}${computerArray[counter].suit}<br>`;
    counter += 1;
  }

  //player string
  var playerMessage = `Players Hand:<br>`;
  var counter = 0;
  while (counter < playerArray.length) {
    playerMessage =
      playerMessage +
      `${playerArray[counter].name}${playerArray[counter].suit}<br>`;
    counter += 1;
  }
  return `${computerMessage}<br> ${playerMessage}`;
};

//if player hits
var hit = function () {
  playerArray.push(shuffledDeck.pop());
  var resultsOfCards = displayPlayerAndDealersHandsHidden(
    playerArray,
    computerArray
  );
  var playerTotalHandValue = totalHandValue(playerArray);
  if (playerArray.length > 4 && playerTotalHandValue < 22) {
    comImage.src = imgPlayerWin;
    playersPot = playersPot + Number(bet) * 2;
    var resultsOfCards = displayPlayerAndDealersHands(
      playerArray,
      computerArray
    );
    myOutputValue = `${resultsOfCards}You win!<br>You've got $${playersPot}!`;
    restart();
    return myOutputValue;
  }
  myOutputValue = `${resultsOfCards}Choose if you want to hit or stand`;
  return myOutputValue;
};

//if player stands
var stand = function () {
  var playerTotalHandValue = totalHandValue(playerArray);
  var computerTotalHandValue = totalHandValue(computerArray);
  //computer needs to draw if less than 17...
  while (computerTotalHandValue < 17) {
    computerArray.push(shuffledDeck.pop());
    var computerTotalHandValue = totalHandValue(computerArray);
  }
  var resultsOfCards = displayPlayerAndDealersHandsHidden(
    playerArray,
    computerArray
  );
  if (
    playerTotalHandValue === computerTotalHandValue ||
    (playerTotalHandValue > 21 && computerTotalHandValue > 21)
  ) {
    var resultsOfCards = displayPlayerAndDealersHands(
      playerArray,
      computerArray
    );
    comImage.src = imgTie;
    myOutputValue = `${resultsOfCards}<br>It's a tie!<br>You've got $${playersPot}!`;
    restart();
    return myOutputValue;
  } else if (
    (playerTotalHandValue > computerTotalHandValue &&
      playerTotalHandValue < 22) ||
    computerTotalHandValue > 21
  ) {
    comImage.src = imgPlayerWin;
    playersPot = playersPot + Number(bet);
    var resultsOfCards = displayPlayerAndDealersHands(
      playerArray,
      computerArray
    );
    myOutputValue = `${resultsOfCards}You win!<br>You've got $${playersPot}!`;
    restart();
    return myOutputValue;
  } else {
    comImage.src = imgComputerWin;
    playersPot = playersPot - Number(bet);
    var resultsOfCards = displayPlayerAndDealersHands(
      playerArray,
      computerArray
    );
    myOutputValue = `${resultsOfCards}You lose!<br>You've got $${playersPot}!`;
    restart();
    return myOutputValue;
  }
};
//////////////////////////////////////////////////////////////////
//restart game...
var restart = function () {
  buttonToRestart();
  shuffledDeck = shuffleDeck();
  computerArray = [];
  playerArray = [];
  GAMEMODE = GAMEMODE_START;
};

//////////////////////////////////////////////////////////////////

var main = function (input) {
  if (GAMEMODE === "Game Start") {
    comImage.src = mainImage;
    var bettingStage = bettingPhase();
    buttonsForGameStart();
    return bettingStage;
  }
  if (GAMEMODE === GAMEMODE_BETTING) {
    var toBet = betting(input);
    return toBet;
  }
  if (GAMEMODE === GAMEMODE_CARDS_DRAWN) {
    buttonsForHitorStand();
    drawFirstCards(playerArray, computerArray);
    var playerBlackjack = checkForBlackjack(playerArray);
    var computerBlackjack = checkForBlackjack(computerArray);
    var resultsOfCards = displayPlayerAndDealersHandsHidden(
      playerArray,
      computerArray
    );
    if (playerBlackjack == true || computerBlackjack == true) {
      var checkBlackjack = initialBlackjack(
        playerBlackjack,
        computerBlackjack,
        resultsOfCards
      );
      return checkBlackjack;
    }
    myOutputValue = `${resultsOfCards}Choose if you want to hit or stand`;
    GAMEMODE = GAMEMODE_HIT_OR_STAND;
    return myOutputValue;
  }
};
