var playerHand = [];
var playerCurrent = 0;
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
    var image = `<img src = "https://c.tenor.com/RFRPkimHjfcAAAAC/zach-galifianakis-very-bad-trip-meme.gif">`;
    if (input != "hit" && input != "stand") {
      return (
        `${displayFirstTwoCards()} <br><br><b>Your cards: </b>${displayCards(
          playerHand
        )}<br><b>Current total:</b> ${playerCurrent} <br><br> <b>Computer's cards:</b><br> ?? of ?? <br> ${
          computerHand[1].name
        } ${
          computerHand[1].suit
        } <br><b>Current total:</b> ?? <br><br> Please choose to "Hit" or "Stand"` +
        image
      );
    }
    if (input.toLowerCase() == "hit") {
      playerHand.push(deck.pop());
      var nextCard = playerHand[playerHand.length - 1];
      playerCurrent = sumOfCardValues(playerHand);
      for (var i = 0; i < playerHand.length; i++) {
        if (
          playerHand[i].name == "Ace" &&
          playerHand[i].value == 11 &&
          sumOfCardValues(playerHand) > 21
        ) {
          playerHand[i].value = 1;
          playerCurrent = sumOfCardValues(playerHand) - 10;
        }
      }

      if (playerCurrent <= 21) {
        var image = `<img src = "https://c.tenor.com/Fp0JJdxY6msAAAAC/yes-sweating.gif">`;
        myOutputValue =
          `You were dealt a ${nextCard.name} ${
            nextCard.suit
          }. <br><br><b>Your cards: </b>${displayCards(
            playerHand
          )}<br><b>Current total:</b> ${playerCurrent} <br><br> <b>Computer's cards:</b><br> ?? of ?? <br> ${
            computerHand[1].name
          } ${
            computerHand[1].suit
          } <br><b>Current total:</b> ?? <br><br> Please choose to "Hit" or "Stand"` +
          image;
      }
      if (playerCurrent >= 22) {
        var image = `<img src = "https://64.media.tumblr.com/4d7bf0aff8250cd7cb77ddfa73d21b9a/tumblr_miyo4heYss1qedb29o1_500.gif">`;
        deal.disabled = false;
        hit.disabled = true;
        stand.disabled = true;
        myOutputValue =
          `You were dealt a ${nextCard.name} ${
            nextCard.suit
          }. ${displayTotalValue()} <br><br> You have <b>BUSTED!</b><br> Click "Deal" again to start a new round` +
          image;
        resetFunction();
      }
      return myOutputValue;
    }

    if (input.toLowerCase() == "stand") {
      var j = 0;
      while (computerCurrent <= 16) {
        computerHand.push(deck.pop());
        compNewCards[i] = computerHand[computerHand.length - 1];
        j++;
        computerCurrent = sumOfCardValues(computerHand);
        for (var i = 0; i < computerHand.length; i++) {
          if (
            computerHand[i].name == "Ace" &&
            sumOfCardValues(computerHand) > 21
          ) {
            computerHand[i].value = 1;
            computerCurrent = sumOfCardValues(computerHand) - 10;
          }
        }
      }
      if (computerCurrent > 16 && computerCurrent < 22) {
        var displayMessage = determineWinner(playerCurrent, computerCurrent);
        myOutputValue = `The computer drew ${j} card(s) ${displayTotalValue()} <br><br> ${displayMessage}`;
      } else if (computerCurrent > 21) {
        var image = `<img src = "https://c.tenor.com/rO6Fh2KNm3sAAAAM/baby-yes.gif">`;
        deal.disabled = false;
        hit.disabled = true;
        stand.disabled = true;
        myOutputValue =
          `The computer drew ${j} card(s) ${displayTotalValue()} <br><br> The computer bust, you won!` +
          image;
      }
    }
    resetFunction();
    return myOutputValue;
  }
};

//Deck generation
var deck = [];
var suits = ["♦️", "♣️", "♥️", "♠️"];
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
    var randomIndex = Math.floor(Math.random() * deck.length);
    var chosenCard1 = deck[i];
    var chosenCard2 = deck[randomIndex];

    deck[randomIndex] = chosenCard1;
    deck[i] = chosenCard2;
  }
};

var dealCardsToPlayers = function () {
  for (var i = 0; i < 2; i++) {
    playerHand.push(deck.pop());
    computerHand.push(deck.pop());
  }
};

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

//check for blackjack
var checkForInstaWin = function () {
  if (
    sumOfCardValues(playerHand) == 21 &&
    sumOfCardValues(computerHand) == 21
  ) {
    var image = `<img src = "https://i.giphy.com/media/bcrOR2stk6tKIxqPOZ/giphy.webp">`;
    myOutputValue =
      `${displayFirstTwoCards()}${displayTotalValue()}<br><br> Both you and the computer got a <b>blackjack</b>! It's a tie! <br>Click "Deal" to start a new round!` +
      image;
    resetFunction();
  } else if (sumOfCardValues(playerHand) == 21) {
    var image = `<img src = "https://media0.giphy.com/media/26BGvkTon3hpPBswE/giphy.gif?cid=790b76111c7ed3ce44d2bc6d6d955d589e185bf81c9db8d4&rid=giphy.gif&ct=g">`;
    myOutputValue =
      `${displayFirstTwoCards()}${displayTotalValue()}<br><br> you have <b>BLACKJACK!</b> You won! <br>Click "Deal" to start a new round!` +
      image;
    resetFunction();
  } else if (sumOfCardValues(computerHand) == 21) {
    var image = `<img src = "https://i.pinimg.com/originals/42/1a/ee/421aee6986e10a74dbc52aae7c3965ac.gif">`;
    myOutputValue =
      `${displayFirstTwoCards()}${displayTotalValue()}<br><br> The computer has a <b>BLACKJACK!</b> You lost! <br>Click "Deal" to start a new round!` +
      image;
    resetFunction();
  } else {
    gameMode = "hit or stand";
    deal.disabled = true;
    hit.disabled = false;
    stand.disabled = false;
    myOutputValue = `${displayFirstTwoCards()}${displayTotalValue()}<br><br>Please click <b>"hit"</b> or <b>"stand"</b> `;
  }
  return myOutputValue;
};

var determineWinner = function (currentHandofPlayer, currentHandofComputer) {
  if (currentHandofPlayer > currentHandofComputer) {
    var image = `<img src = "https://c.tenor.com/rO6Fh2KNm3sAAAAM/baby-yes.gif">`;
    deal.disabled = false;
    hit.disabled = true;
    stand.disabled = true;
    return `You won! Click "Deal" to play again` + image;
  }
  if (currentHandofPlayer < currentHandofComputer) {
    var image = `<img src = "https://i.pinimg.com/originals/42/1a/ee/421aee6986e10a74dbc52aae7c3965ac.gif">`;
    deal.disabled = false;
    hit.disabled = true;
    stand.disabled = true;
    return `You lost! ): Click "Deal" to play again` + image;
  } else
    var image = `<img src = "https://i.giphy.com/media/bcrOR2stk6tKIxqPOZ/giphy.webp">`;
  deal.disabled = false;
  hit.disabled = true;
  stand.disabled = true;
  return `It's a tie! Click "Deal" to play again` + image;
};

//function to display first two cards
var displayFirstTwoCards = function () {
  return `You were dealt a ${playerHand[0].name} ${playerHand[0].suit} and  ${playerHand[1].name}  ${playerHand[1].suit}. <br> The computer was dealt a ?? of ?? and ${computerHand[1].name}  ${computerHand[1].suit}.`;
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
      displayedCards + `<br> ${currentPlayer[i].name} ${currentPlayer[i].suit}`;
  }
  return displayedCards;
};

var resetFunction = function () {
  playerHand = [];
  computerHand = [];
  gameMode = "deal the cards";
  playerCurrent = 0;
  computerCurrent = 0;
};
