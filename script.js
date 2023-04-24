// 1. Make the base game : Create Deck, Shuffle Deck, Deal cards, & choosing winner
// 2. Ability for player & Dealer to hit and stand

//  make player & dealer functions
//  create & shuffle deck
//  win conditions after drawing card
//  Display hands of player and winner.

let playerHand = [];
let dealerHand = [];
let playerScore = 0;
let dealerScore = 0;
let playerName;
let playerResult = false;
let dealerResult = false;

let currentGameMode = "Game Start";
let gameCardsDrawn = "Cards Drawn";
let gameResults = "Show Results";

// Make Deck Function
let makeDeck = function () {
  let cardDeck = [];
  let suits = ["hearts", "diamonds", "clubs", "spades"];
  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    let currentSuit = suits[suitIndex];
    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = rankCounter;
      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }
      // Create a new card with the current name, suit, and rank
      let card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      // console.log("card", card);
      // Add the new card to the deck
      cardDeck.push(card);
    }
  }
  return cardDeck;
};

// Generate random number for shuffleDeck
let getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle Card Function
let shuffleCards = function (makeDeck) {
  // Loop over the card deck array once
  for (
    let currentIndex = 0;
    currentIndex < makeDeck.length;
    currentIndex += 1
  ) {
    // Select a random index in the deck
    let randomIndex = getRandomIndex(makeDeck.length);
    // console.log("randomIndex", randomIndex);
    // Select the card that corresponds to randomIndex
    let randomCard = makeDeck[randomIndex];
    // console.log("randomCard", randomCard);
    // Select the card that corresponds to currentIndex
    let currentCard = makeDeck[currentIndex];
    // console.log("currentCard", currentCard);
    // Swap positions of randomCard and currentCard in the deck
    makeDeck[currentIndex] = randomCard;
    // console.log("currentIndex", currentIndex);
    // console.log("cardDeck[currentIndex]", cardDeck[currentIndex]);
    makeDeck[randomIndex] = currentCard;
    // console.log("cardDeck[randomIndex]", cardDeck[randomIndex]);
  }
  // Return the shuffled deck
  return makeDeck;
};

// Making Shuffled Deck
let createShuffledDeck = function () {
  let newDeck = makeDeck();
  let newShuffledDeck = shuffleCards(newDeck);
  return newShuffledDeck;
};

//Making Black Jack result function
let checkResult = function (totalScore) {
  let blackJack = false;
  if (totalScore == 21) blackJack = true;
  return blackJack;
};

// Calculate Total value
var calculateTotalValue = function (handCard) {
  let totalHandValue = 0;
  for (let currentIndex = 0; currentIndex < handCard.length; currentIndex += 1)
    totalHandValue += handCard[currentIndex].rank;
  return totalHandValue;
};

// Displaying player and dealer hands
let displayPlayerAndDealerHands = function () {
  let playerCardNumber = 0;
  let dealerCardNumber = 0;
  let playerCardType;
  let playerTotal = 0;
  let dealerTotal = 0;
  let playerOutputResult = `${playerName} has: `;
  let dealerOutputResult = "Dealer has: ";
  for (
    let currentIndex = 0;
    currentIndex < playerHand.length;
    currentIndex += 1
  ) {
    playerCardNumber = playerHand[currentIndex].rank;
    playerCardType = playerHand[currentIndex].suit;
    playerOutputResult += playerCardNumber + ", " + playerCardType + ", ";
    playerTotal += playerCardNumber;
  }
  playerOutputResult += " with sum " + playerTotal;
  for (
    let currentIndex = 0;
    currentIndex < dealerHand.length;
    currentIndex += 1
  ) {
    dealerCardNumber = dealerHand[currentIndex].rank;
    dealerCardType = dealerHand[currentIndex].suit;
    dealerOutputResult += dealerCardNumber + ", " + dealerCardType + ", ";
    dealerTotal += dealerCardNumber;
  }
  dealerOutputResult += " with sum " + dealerTotal;
  let outputResult = playerOutputResult + "<br>" + dealerOutputResult;
  return outputResult;
};

let compareDecks = function (isStand) {
  outputResult = displayPlayerAndDealerHands();

  playerScore = calculateTotalValue(playerHand);
  playerResult = checkResult(playerScore);

  dealerScore = calculateTotalValue(dealerHand);
  dealerResult = checkResult(dealerScore);

  if (playerScore > 21) {
    outputResult += `<br> <br>${playerName} has burst! You lost!😐😪 <br>Please refresh to play again`;
  } else if (dealerScore > 21) {
    outputResult +=
      "<br><br>Dealer has burst! You won!🎉🎉 <br>Please refresh to play again!👍";
  } else if (playerResult == true && dealerResult == true) {
    outputResult += "<br>Its a Black Jack Tie!";
  }
  // Player Wins
  else if (playerResult == true && dealerResult == false) {
    outputResult += "<br>Player wins by Black Jack! 😱😱🔥🔥";
  }
  // Dealer Wins
  else if (playerResult == false && dealerResult == true) {
    outputResult +=
      "<br><br>Dealer wins by Black Jack!😪<br> Refresh to defeat him😋";
  }
  //Both lose
  else if (playerResult == false && dealerResult == false && !isStand) {
    outputResult +=
      "<br><br>Please enter 'hit' or 'stand', then press Submit 😎😎";
  }
  //Player types stand and player wins
  else if (isStand && playerScore > dealerScore) {
    outputResult += `<br>Congratulations !! ❤❤<br>${playerName} wins!🎉🎉 Please refresh to play again.👍👍`;
  }
  //Player types stand and dealer wins
  else if (isStand && dealerScore > playerScore) {
    outputResult += "<br>Dealer wins!🤡🤡 Please refresh to play again.";
  } else if (playerResult == dealerResult && isStand) {
    outputResult += "<br><br>Its a draw!! 😎😎";
  }
  return outputResult;
};

var main = function (input) {
  let result = "";
  if (currentGameMode == "Game Start") {
    currentGameMode = "Draw Card";
    return `Welcome to a new game of BlackJack!!👀👀 Please input your name😉😉`;
  }
  // Using game modes to draw Card
  if (currentGameMode == "Draw Card") {
    playerName = input;
    cardDeck = createShuffledDeck();
    console.log(cardDeck);
    // Making player Hand
    playerHand.push(cardDeck.pop());
    playerHand.push(cardDeck.pop());
    console.log(playerHand);
    // Making Dealer Hand
    dealerHand.push(cardDeck.pop());
    dealerHand.push(cardDeck.pop());
    console.log(dealerHand);
    currentGameMode = "Cards Drawn";
    console.log(result);
    // isSubmit = input;
    // console.log(input);
  }
  // Comparing card and values
  if (currentGameMode == "Cards Drawn") {
    console.log(playerResult);
    console.log(dealerResult);
    result = compareDecks(false);
    currentGameMode = "Hit or Stand";
  }
  if (currentGameMode == "Hit or Stand") {
    if (input == "hit") {
      playerHand.push(cardDeck.pop());
      if (dealerScore < 17) {
        dealerHand.push(cardDeck.pop());
      }
      result = compareDecks(false);
    }
    if (input == "stand") {
      if (dealerScore < 17) {
        dealerHand.push(cardDeck.pop());
      }
      result = compareDecks(true);
    }
  }

  return result;
};
