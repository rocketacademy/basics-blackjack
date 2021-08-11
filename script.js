// 2 players - 1 human, 1 computer
// Dealer wins if hand is <17, the computer is the dealer
// Hand closer to 21 = wins
// Aces = 1 or 11

var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
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
      var value = rankCounter;
      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        value = 11;
        cardName = "ace";
      } else if (cardName == 11) {
        value = 10;
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
        value = 10;
      } else if (cardName == 13) {
        value = 10;
        cardName = "king";
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        cardValue: value,
      };
      // Add the new card to the deck
      cardDeck.push(card);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // Return the completed card deck
  return cardDeck;
};

// To get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle card deck
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
  // Return shuffled card deck
  return cardDeck;
};

// Shuffle deck and save into new variable shuffledDeck to show that deck has been shuffled.
var shuffledDeck = shuffleCards(makeDeck());
var gameMode = "username";
var userName = "";
var userChoice = "";
var computerHand = [];
var playerHand = [];
// Computer hand and player hand array
var computerCard1 = shuffledDeck.pop();
computerHand.push(computerCard1);
var playerCard1 = shuffledDeck.pop();
playerHand.push(playerCard1);
var computerCard2 = shuffledDeck.pop();
computerHand.push(computerCard2);
var playerCard2 = shuffledDeck.pop();
playerHand.push(playerCard2);
var sumOfCards = function () {
  var sumOfComputerCards =
    computerHand[0].cardValue + computerHand[1].cardValue;
  var sumOfPlayerCards = playerHand[0].cardValue + playerHand[1].cardValue;
};
var main = function (input) {
  var myOutputValue = "hello world";
  if (gameMode == "username") {
    userName = input;
    gameMode = "game start";
    myOutputValue = `Welcome to Blackjack, ${userName}! <br><br> To begin, please enter "start".`;
    console.log(`username is ${userName}`);
    return myOutputValue;
  }
  //Draw 2x card for Computer and 2x card for Player

  if (gameMode == "game start" && input == "start") {
    gameMode = "decide";
    myOutputValue = `${userName} drew ${playerCard1.name} ${playerCard2.suit} and ${playerCard2.name} ${playerCard2.suit}. <br> Total: ${playerHand} <br><br> To draw another card, please enter "Hit". <br> Otherwise please enter "Stand". `;
    return myOutputValue;
  }

  if (input == "Hit" && gameMode == "decide") {
    userChoice = input;
    while (computerHand < 17 && gameMode == "computer auto") {
      var computerCard3 = shuffledDeck.pop();
      computerHand += computerCard3.cardValue;
    }
    var playerCard3 = shuffledDeck.pop();
    playerHand += playerCard3.cardValue;
    gameMode = "computer auto";
    myOutputValue = `Player chose ${userChoice} to draw another card. <br><br> Cards drew so far are : <br> ${playerCard1.name} ${playerCard1.suit} , <br> ${playerCard2.name} ${playerCard2.suit} , <br> ${playerCard3.name} ${playerCard3.suit}. <br> Total: ${playerHand}`;
    console.log(`Player choose to Hit`);
    return myOutputValue;
  }

  if (input == "Stand" && gameMode == "decide") {
    userChoice = input;
    while (computerHand < 17 && gameMode == "computer auto") {
      var computerCard3 = shuffledDeck.pop();
      computerHand += computerCard3.cardValue;
    }
    gameMode = "compare";
    myOutputValue = `Player chose ${userChoice} to not draw another card. <br><br> Cards drew so far are : <br> ${playerCard1.name} ${playerCard1.suit} , <br> ${playerCard2.name} ${playerCard2.suit}. <br> Total: ${playerHand}`;
    console.log(`Player choose to Stand.`);
    return myOutputValue;
  }

  if (computerHand > playerHand && gameMode == "compare") {
    gameMode = "restart";
    myOutputValue = `Computer Won! <br> Computer drew: <br> ${computerCard1.name} ${computerCard1.suit} , <br> ${computerCard2.name} ${computerCard2.suit} , <br> ${computerCard3.name} ${computerCard3.suit}. <br> Total: ${computerHand}. <br><br> Player drew: <br> ${playerCard1.name} ${playerCard1.suit} , <br> ${playerCard2.name} ${playerCard2.suit} , <br> ${playerCard3.name} ${playerCard3.suit}. <br> Total: ${playerHand}.`;
    console.log(`Computer Won!`);
    return myOutputValue;
  }

  if (computerHand < playerHand && gameMode == "compare") {
    gameMode = "restart";
    myOutputValue = `Player Won! <br> Player drew: <br> ${playerCard1.name} ${playerCard1.suit} , <br> ${playerCard2.name} ${playerCard2.suit} , <br> ${playerCard3.name} ${playerCard3.suit}. <br> Total: ${playerHand}. <br><br> Computer drew: <br> ${computerCard1.name} ${computerCard1.suit} , <br> ${computerCard2.name} ${computerCard2.suit} , <br> ${computerCard3.name} ${computerCard3.suit}. <br> Total: ${computerHand}.`;
    console.log(`Player Won!`);
    return myOutputValue;
  }
  // Add dealer hit or stand
  // Dealer add cards to their hand

  if (gameMode == "restart") {
    gameMode = "username";
    myOutputValue = `Game restarts. Please enter Username again.`;
    console.log(`Game restarts . Mode: ${gameMode}`);
    return myOutputValue;
  }
  var myOutputValue = `Invalid Entry. <br><br> Please try again.`;
  return myOutputValue;
};
