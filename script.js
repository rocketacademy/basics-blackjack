//create GameMode
var GAMEMODE = "Betting Page";
var GAMEMODE_BET_PAGE = "Betting Page";
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
  return myOutputValue;
};

//when player bets
var betting = function (input) {
  if (input < playersPot && input !== "") {
    bet = input;
    myOutputValue = `You've bet ${input}!<br> Now it's time to play!`;
    GAMEMODE = GAMEMODE_CARDS_DRAWN;
    return myOutputValue;
  }
  myOutputValue = `Please bet within your means...`;
  //player presses submit again...
  //buttons will change to hit or stay...
  //GAMEMODE changes to hit or stay phase...
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
    (card01.rank >= 10 && card02.name === "Ace")
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
    myOutputValue = `${resultsOfCards}It's a tie!<br>You've got $${playersPot}!`;
    restart();
    return myOutputValue;
  }
  //lose
  if (playerBlackjack == false && computerBlackjack == true) {
    playersPot = playersPot - Number(bet) * 2;
    myOutputValue = `${resultsOfCards}You lose!<br>You've got $${playersPot}!`;
    restart();
    return myOutputValue;
  }
  //win
  if (playerBlackjack == true && computerBlackjack == false) {
    playersPot = playersPot + Number(bet) * 2;
    myOutputValue = `${resultsOfCards}You win!<br>You've got $${playersPot}!`;
    restart();
    return myOutputValue;
  }
};

//////////////////////////////////////////////////////////////////

// function to add values of cards...
var totaHandValue = function (array) {
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

//////////////////////////////////////////////////////////////////
//restart game...
var restart = function () {
  shuffledDeck = shuffleDeck();
  computerArray = [];
  playerArray = [];
  GAMEMODE = GAMEMODE_BET_PAGE;
};

var main = function (input) {
  if (GAMEMODE === "Betting Page") {
    var bettingStage = bettingPhase();
    GAMEMODE = GAMEMODE_BETTING;
    return bettingStage;
  }
  if (GAMEMODE === GAMEMODE_BETTING) {
    var toBet = betting(input);
    return toBet;
  }
  if (GAMEMODE === GAMEMODE_CARDS_DRAWN) {
    drawFirstCards(playerArray, computerArray);
    var playerBlackjack = checkForBlackjack(playerArray);
    var computerBlackjack = checkForBlackjack(computerArray);
    var resultsOfCards = displayPlayerAndDealersHands(
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
  if (GAMEMODE === GAMEMODE_HIT_OR_STAND) {
    //when player hits
    if (input === "hit") {
      playerArray.push(shuffledDeck.pop());
      var resultsOfCards = displayPlayerAndDealersHands(
        playerArray,
        computerArray
      );
      myOutputValue = `${resultsOfCards}Choose if you want to hit or stand`;
      return myOutputValue;
    }

    //when player stands
    else if (input === "stand") {
      var playerTotalHandValue = totaHandValue(playerArray);
      var computerTotalHandValue = totaHandValue(computerArray);
      //computer needs to draw if less than 17...
      while (computerTotalHandValue < 17) {
        computerArray.push(shuffledDeck.pop());
        var computerTotalHandValue = totaHandValue(computerArray);
      }
      var resultsOfCards = displayPlayerAndDealersHands(
        playerArray,
        computerArray
      );
      if (
        playerTotalHandValue === computerTotalHandValue ||
        (playerTotalHandValue > 21 && computerTotalHandValue > 21)
      ) {
        myOutputValue = `${resultsOfCards}<br>It's a tie!<br>You've got $${playersPot}!`;
        restart();
        return myOutputValue;
      } else if (
        (playerTotalHandValue > computerTotalHandValue &&
          playerTotalHandValue < 22) ||
        computerTotalHandValue > 21
      ) {
        playersPot = playersPot + Number(bet);
        myOutputValue = `${resultsOfCards}You win!<br>You've got $${playersPot}!`;
        restart();
        return myOutputValue;
      } else {
        playersPot = playersPot - Number(bet);
        myOutputValue = `${resultsOfCards}You lose!<br>You've got $${playersPot}!`;
        restart();
        return myOutputValue;
      }
    }
    //when player doesn't input hit or stand
    myOutputValue = `please choose if you want to hit or stand with your dealt cards...<br>${displayPlayerAndDealersHands(
      playerArray,
      computerArray
    )}`;
    return myOutputValue;
  }
};
