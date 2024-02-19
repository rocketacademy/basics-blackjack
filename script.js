// creating a deck of cards
const makeDeck = () => {
  var newDeck = [];
  for (let i = 1; i <= 13; i += 1) {
    var suits = ["♦", "♥", "♣", "♠"];
    for (let j = 0; j < suits.length; j += 1) {
      var name = `${i}`;
      if (name === "1") {
        name = "A";
      } else if (name === "11") {
        name = "J";
      } else if (name === "12") {
        name = "Q";
      } else if (name === "13") {
        name = "K";
      }

      var card = {
        value: i,
        suit: suits[j],
        name,
      };
      newDeck.push(card);
    }
  }
  return newDeck;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);

// Shuffle an array of cards
const shuffleCards = (deck) => {
  // Loop over the card deck array once
  for (let currentIndex = 0; currentIndex < deck.length; currentIndex += 1) {
    // Select a random index in the deck
    const randomIndex = getRandomIndex(deck.length);
    // Select the card that corresponds to randomIndex
    const randomCard = deck[randomIndex];
    // Select the card that corresponds to currentIndex
    const currentCard = deck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    deck[currentIndex] = randomCard;
    deck[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return deck;
};

//function to check whether player hand has black jack
var isBlackJackCheck = function (handArray) {
  var handArrayCard1 = handArray[0];
  var handArrayCard2 = handArray[1];
  var isBlackJack = false;
  if (
    (handArrayCard1.name == "A" && handArrayCard2.value >= 10) ||
    (handArrayCard2.name == "A" && handArrayCard1.value >= 10)
  ) {
    isBlackJack = true;
  } else {
    isBlackJack = false;
  }
  return isBlackJack;
};

//function to check hand value
var calcTotalHandValue = function (handArray) {
  var aceCounter = 0;
  var totalHandValue = 0;
  for (var a = 0; a < handArray.length; a++) {
    var currentHandArrayCard = handArray[a];
    if (
      currentHandArrayCard.name == "J" ||
      currentHandArrayCard.name == "Q" ||
      currentHandArrayCard.name == "K"
    ) {
      totalHandValue = totalHandValue + 10;
    } else if (currentHandArrayCard.name == "A") {
      totalHandValue = totalHandValue + 11;
      aceCounter = aceCounter + 1;
    } else {
      totalHandValue = totalHandValue + currentHandArrayCard.value;
    }
  }

  for (var b = 0; b < aceCounter; b++) {
    //this is to see how many Ace are there in the hand. If more than 1 and the total value busted, the value of Ace is set to 1. Note that we will need to check isBlack first before using this funciton
    if (totalHandValue > 21) {
      totalHandValue = totalHandValue - 10;
    }
  }
  return totalHandValue;
};

// function to display hands
var displayHand = function (playerHandArray, computerHandArray) {
  var playerHandMessage = "Player Hand:<br>";
  for (var k = 0; k < playerHandArray.length; k++) {
    playerHandMessage =
      playerHandMessage +
      playerHandArray[k].name +
      " " +
      playerHandArray[k].suit +
      "<br>";
  }

  var computerHandMessage = "Computer Hand:<br>";
  for (l = 0; l < computerHandArray.length; l++) {
    computerHandMessage =
      computerHandMessage +
      computerHandArray[l].name +
      " " +
      computerHandArray[l].suit +
      "<br>";
  }

  return `${playerHandMessage} <br> ${computerHandMessage}`;
};

//global variables
var deck = makeDeck();
var shuffledDeck = shuffleCards(deck);
var playerHand = [];
var computerHand = [];
var playerHandValue = 0;
var computerHandValue = 0;
var gameMode = "first_draw";

var main = function (input) {
  if (gameMode == "first_draw") {
    var playerCard1 = shuffledDeck.pop();
    playerHand.push(playerCard1);
    var playerCard2 = shuffledDeck.pop();
    playerHand.push(playerCard2);

    var computerCard1 = shuffledDeck.pop();
    computerHand.push(computerCard1);
    var computerCard2 = shuffledDeck.pop();
    computerHand.push(computerCard2);
    console.log(playerHand);
    console.log(computerHand);

    var outputHandMessage = displayHand(playerHand, computerHand);
    playerHandValue = calcTotalHandValue(playerHand);
    computerHandValue = calcTotalHandValue(computerHand);

    if (isBlackJackCheck(playerHand) == true) {
      playerHand = [];
      computerHand = [];
      gameMode = "first_draw";
      return `${outputHandMessage} <br> The Player hand value: ${playerHandValue} <br> The Computer hand value: ${computerHandValue} <br> The Player has BlackJack. Player win instantly! <br> Please refresh the browser to restart.`;
    } else if (isBlackJackCheck(computerHand) == true) {
      return `${outputHandMessage} <br> The Player hand value: ${playerHandValue} <br> The Computer hand value: ${computerHandValue} <br> The Computer has BlackJack. Computer win instantly! <br> Please refresh the browser to restart.`;
    } else if (
      isBlackJackCheck(playerHand) == true &&
      isBlackJackCheck(computerHand) == true
    ) {
      return `${outputHandMessage} <br> The Player hand value: ${playerHandValue} <br> The Computer hand value: ${computerHandValue} <br> Both the Player and Computer have BlackJack! Its a tie! <br> Please refresh the browser to restart.`;
    } else {
      gameMode = "player_hit_or_stand";
      console.log(gameMode);
      return `${outputHandMessage} <br> The Player hand value: ${playerHandValue} <br> The Computer hand value: ${computerHandValue} <br> Enter "hit" or "stand" to continue the game, <br> NOTE: once you enter "stand", its computer's turn and you will not longer be able to draw cards.`;
    }
  } else if (
    gameMode == "player_hit_or_stand" &&
    input != "hit" &&
    input != "stand"
  ) {
    return `Please choose "hit" or "stand" only to continue the game.`;
  } else if (gameMode == "player_hit_or_stand") {
    console.log(gameMode);
    if (input == "hit") {
      var playerAddCard = shuffledDeck.pop();
      playerHand.push(playerAddCard);
      playerHandValue = calcTotalHandValue(playerHand);
      outputHandMessage = displayHand(playerHand, computerHand);
      if (playerHandValue < 22) {
        return `${outputHandMessage} <br> The Player hand value: ${playerHandValue} <br> The Computer hand value: ${computerHandValue} <br> Enter "hit" or "stand" to continue the game, <br> NOTE: once you enter "stand", its computer's turn and you will not longer be able to draw cards.`;
      } else if (playerHandValue < 22 && playerHand.length > 4) {
        gameMode = "computer_draw";
        return `${outputHandMessage} <br> The Player hand value: ${playerHandValue} <br> The Computer hand value: ${computerHandValue} <br> You have drew the max card. Enter "stand" for the computer's turn <br> NOTE: once you enter "stand", its computer's turn and you will not longer be able to draw cards.`;
      } else {
        return `${outputHandMessage} <br> The Player hand value: ${playerHandValue} <br> The Computer hand value: ${computerHandValue} <br> You have busted and lost. <br> Please refresh the browser to restart.`;
      }
    }

    if (input == "stand") {
      gameMode = "computer_draw";
      outputHandMessage = displayHand(playerHand, computerHand);
      if (playerHandValue < computerHandValue) {
        return `${outputHandMessage} <br> The Player hand value: ${playerHandValue} <br> The Computer hand value: ${computerHandValue} <br> You decided to give up and lost! <br> Please refresh the browser to restart`;
      } else {
        return `${outputHandMessage} <br> The Player hand value: ${playerHandValue} <br> The Computer hand value: ${computerHandValue} <br> Press submit again to go to computer's turn. <br> Note: You will not longer be able to draw cards.`;
      }
    }
  } else if (gameMode == "computer_draw") {
    var computerAddCard = shuffledDeck.pop();
    computerHand.push(computerAddCard);
    computerHandValue = calcTotalHandValue(computerHand);
    outputHandMessage = displayHand(playerHand, computerHand);
    if (computerHandValue < 17 && computerHandValue <= playerHandValue) {
      return `${outputHandMessage} <br> The Player hand value: ${playerHandValue} <br> The Computer hand value: ${computerHandValue} <br> Press submit again.`;
    } else if (computerHandValue < 17 && computerHandValue > playerHandValue) {
      return `${outputHandMessage} <br> The Player hand value: ${playerHandValue} <br> The Computer hand value: ${computerHandValue} <br> Computer won! <br>Please refresh the browser to restart.`;
    } else if (
      computerHandValue >= 17 &&
      computerHandValue < 22 &&
      computerHand.length > 4 &&
      computerHandValue > playerHandValue
    ) {
      return `${outputHandMessage} <br> The Player hand value: ${playerHandValue} <br> The Computer hand value: ${computerHandValue} <br> Computer has drew the max card. You lose! <br> Please refresh the browser to restart.`;
    } else if (
      computerHandValue >= 17 &&
      computerHandValue < 22 &&
      computerHand.length > 4 &&
      computerHandValue == playerHandValue
    ) {
      return `${outputHandMessage} <br> The Player hand value: ${playerHandValue} <br> The Computer hand value: ${computerHandValue} <br> Computer has drew the max card. You tie! <br> Please refresh the browser to restart.`;
    } else if (
      computerHandValue >= 17 &&
      computerHandValue < 22 &&
      computerHand.length > 4 &&
      computerHandValue < playerHandValue
    ) {
      return `${outputHandMessage} <br> The Player hand value: ${playerHandValue} <br> The Computer hand value: ${computerHandValue} <br> Computer has drew the max card. You win! <br> Please refresh the browser to restart.`;
    } else if (
      computerHandValue >= 17 &&
      computerHandValue < 22 &&
      computerHandValue <= playerHandValue
    ) {
      return `${outputHandMessage} <br> The Player hand value: ${playerHandValue} <br> The Computer hand value: ${computerHandValue} <br> Press submit again. <br>Please refresh the browser to restart.`;
    } else if (
      computerHandValue >= 17 &&
      computerHandValue < 22 &&
      computerHandValue > playerHandValue
    ) {
      return `${outputHandMessage} <br> The Player hand value: ${playerHandValue} <br> The Computer hand value: ${computerHandValue} <br> Computer decided to stop draw. You lose! <br>Please refresh the browser to restart.`;
    } else if (computerHandValue > 22) {
      return `${outputHandMessage} <br> The Player hand value: ${playerHandValue} <br> The Computer hand value: ${computerHandValue} <br> Computer have busted. You win! <br>Please refresh the browser to restart.`;
    }
  }
};
