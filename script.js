var playerHand = [];
var playerCurrent = 0;
var AcesPosition = [];
var computerHand = [];
var computerCurrent = 0;
var compNewCards = [{}];
var gameMode = "deal the cards";
var myOutputValue = "";

var main = function (input) {
  if (gameMode == "deal the cards") {
    //generate deck, shuffle, and deal the cards
    generateDeck();
    shuffleCards();
    dealCardsToPlayers();

    //calculate value of cards for both players
    playerCurrent = sumOfCardValues(playerHand);
    computerCurrent = sumOfCardValues(computerHand);

    //check for blackjack, and if not, ask user to hit or stand
    checkForInstaWin();
    return `${myOutputValue}`;
  }

  //hit or stand game mode
  if (gameMode == "hit or stand") {
    if (input != "hit" && input != "stand") {
      return `Please choose to "Hit" or "Stand" ${displayTotalValue()} <br><br> Please enter <b>"hit"</b> or <b>"stand"</b>`;
    }
    if (input.toLowerCase() == "hit") {
      playerHand.push(deck.pop());
      var nextCard = playerHand[playerHand.length - 1];
      playerCurrent = sumOfCardValues(playerHand);
      if (playerCurrent <= 21) {
        myOutputValue = `You were dealt a ${nextCard.name} of ${
          nextCard.suit
        }. ${displayTotalValue()} <br><br> Please enter <b>"hit"</b> or <b>"stand"</b>`;
      }
      if (playerCurrent >= 22) {
        deal.disabled = false;
        hit.disabled = true;
        stand.disabled = true;
        myOutputValue = `You were dealt a ${nextCard.name} of ${
          nextCard.suit
        }. ${displayTotalValue()} <br><br> You have <b>BUSTED!</b><br> Click "submit" again to start a new round`;
        resetFunction();
      }
      return myOutputValue;
    }

    if (input.toLowerCase() == "stand") {
      var i = 0;
      while (computerCurrent <= 16) {
        computerHand.push(deck.pop());
        compNewCards[i] = computerHand[computerHand.length - 1];
        i++;
        computerCurrent = sumOfCardValues(computerHand);
      }
      if (computerCurrent > 16 && computerCurrent < 22) {
        var displayMessage = determineWinner(playerCurrent, computerCurrent);
        myOutputValue = `The computer drew ${i} card(s) ${displayTotalValue()} <br><br> ${displayMessage}`;
      } else if (computerCurrent > 21) {
        deal.disabled = false;
        hit.disabled = true;
        stand.disabled = true;
        myOutputValue = `The computer drew ${i} card(s) ${displayTotalValue()} <br><br> The computer bust, you won!`;
      }
    }
    resetFunction();
    return myOutputValue;
  }
};

var determineWinner = function (currentHandofPlayer, currentHandofComputer) {
  if (currentHandofPlayer > currentHandofComputer) {
    deal.disabled = false;
    hit.disabled = true;
    stand.disabled = true;
    return `You won! Click "Submit" to play again`;
  }
  if (currentHandofPlayer < currentHandofComputer) {
    deal.disabled = false;
    hit.disabled = true;
    stand.disabled = true;
    return `You lost! ): Click "Submit" to play again`;
  } else deal.disabled = false;
  hit.disabled = true;
  stand.disabled = true;
  return `It's a tie! Click "Submit" to play again`;
};

var resetFunction = function () {
  playerHand = [];
  computerHand = [];
  gameMode = "deal the cards";
  playerCurrent = 0;
  computerCurrent = 0;
};

//check for blackjack
var checkForInstaWin = function () {
  if (sumOfCardValues(playerHand) == 21) {
    myOutputValue = `${displayFirstTwoCards()}${displayTotalValue()}<br><br> you have <b>BLACKJACK!</b> You won!`;
    resetFunction();
  } else if (sumOfCardValues(computerHand) == 21) {
    myOutputValue = `${displayFirstTwoCards()}${displayTotalValue()}<br><br> The computer has a <b>BLACKJACK!</b> You lost!`;
    resetFunction();
  } else if (
    sumOfCardValues(playerHand) == 21 &&
    sumOfCardValues(computerHand) == 21
  ) {
    myOutputValue = `${displayFirstTwoCards()}${displayTotalValue()}<br><br> Both you and the computer got a <b>blackjack</b>! It's a tie!`;
    resetFunction();
  } else {
    gameMode = "hit or stand";
    deal.disabled = true;
    hit.disabled = false;
    stand.disabled = false;
    myOutputValue = `${displayFirstTwoCards()}${displayTotalValue()}<br><br>Please enter <b>"hit"</b> or <b>"stand"</b>`;
  }
  return myOutputValue;
};

//add cards sum for both players, if value of sum < 11 and one of the cards is an Ace, then Ace becomes 11
var sumOfCardValues = function (currentHand) {
  var finalValue = 0;
  for (var i = 0; i < currentHand.length; i++) {
    if (finalValue < 11 && currentHand[i].name == "Ace") {
      currentHand[i].value = 11;
    }
    finalValue = finalValue + currentHand[i].value;
  }

  return finalValue;
};

var dealCardsToPlayers = function () {
  for (var i = 0; i < 2; i++) {
    playerHand.push(deck.pop());
    computerHand.push(deck.pop());
  }
};
//Deck generation
var deck = [];
var suits = ["Spades", "Hearts", "Clubs", "Diamonds"];
var cardsDefaultName = [
  "Ace",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "Jack",
  "Queen",
  "King",
];
var generateDeck = function () {
  for (var i = 0; i < cardsDefaultName.length; i++) {
    for (var j = 0; j < suits.length; j++) {
      deck.push({ name: cardsDefaultName[i], value: i + 1, suit: suits[j] });
    }
  }
  changeFaceCardNames();
};

var changeFaceCardNames = function () {
  for (var i = 0; i < deck.length; i++) {
    if (deck[i].name == "Jack") {
      deck[i].value = 10;
    }
    if (deck[i].name == "Queen") {
      deck[i].value = 10;
    }
    if (deck[i].name == "King") {
      deck[i].value = 10;
    }
  }
};

//shuffle cards function
var shuffleCards = function () {
  for (let i = 0; i < deck.length; i++) {
    var randomIndex = randomCardGenerator();
    var chosenCard1 = deck[i];
    var chosenCard2 = deck[randomIndex];

    deck[randomIndex] = chosenCard1;
    deck[i] = chosenCard2;
  }
};

var randomCardGenerator = function () {
  var randomCardChosen = Math.floor(Math.random() * deck.length);
  return randomCardChosen;
};

//function to display first two cards
var displayFirstTwoCards = function () {
  return `You were dealt a ${playerHand[0].name} of ${playerHand[0].suit} and  ${playerHand[1].name} of ${playerHand[1].suit}. <br> The computer was dealt a ${computerHand[0].name} of ${computerHand[0].suit} and ${computerHand[1].name} of ${computerHand[1].suit}.`;
};

//function to display current total value
var displayTotalValue = function () {
  return `<br><br><b>Your cards: </b>${displayCards(
    playerHand
  )}<br><b>Current total:</b> ${playerCurrent} <br><br> <b>Computer's cards:</b>${displayCards(
    computerHand
  )}<br><b>Current total:</b> ${computerCurrent}`;
};

//function to display player's cards
var displayCards = function (currentPlayer) {
  var displayedCards = ``;
  for (var i = 0; i < currentPlayer.length; i++) {
    displayedCards =
      displayedCards +
      `<br> ${currentPlayer[i].name} of ${currentPlayer[i].suit}`;
  }
  return displayedCards;
};
