//create deck
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
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
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
// shuffle deck
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
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
  // Return the shuffled deck
  return cardDeck;
};
var deck = shuffleCards(makeDeck());
//Max blackjack = 21
var sumLimit = 21;
//dealer has to hit 16
var dealerHit = 16;
var playerHasChosenToStand = false;
var gameOver = false;
var welcomeMessage = true;
var usernameInput = false;
dealCards = false;

var computerHand = [];
var playerHand = [];

//User clicks submit to deal cards
var dealPlayerHand = function (hand) {
  hand.push(deck.pop());
};
//Sum of cards in hand
var getHandSum = function (hand) {
  var numAcesInHand = 0;
  var sum = 0;
  for (let i = 0; i < hand.length; i += 1) {
    var currCard = hand[i];
    //If card rank is 2-10, value is same as rank
    if (currCard.rank >= 2 && currCard.rank <= 10) {
      sum += currCard.rank;
      //If card rank is 11-13 (Jack, Queen, King, value = 10)
    } else if (currCard.rank >= 11 && currCard.rank <= 13) {
      sum += 10;
    } else if (currCard.rank == 1) {
      numAcesInHand += 1;
      sum += 11;
    }
  }
  //If sum is greater than sum limit and hand contains aces, convert Aces from 11 to 1, until sum is less than or equal to sum limit or there are no more aces
  if (sum > sumLimit && numAcesInHand > 0) {
    for (let i = 0; i < numAcesInHand; i = +1) {
      sum -= 10;
      //if sum is less than sumlimit before converting all ace values from 11 to 1, break out of the loop and return current sum
      if (sum <= sumLimit) {
        break;
      }
    }
  }
  return sum;
};

var isBlackjack = function (hand) {
  return hand.length == 2 && getHandSum(hand) == sumLimit;
};
var convertHandToString = function (hand) {
  return `[${hand.map((card) => card.name)}]`;
};

var getDefaultOutput = function () {
  return `Player has hand ${convertHandToString(
    playerHand
  )} with sum ${getHandSum(playerHand)}. <br> 
  Computer has hand ${convertHandToString(computerHand)} with sum ${getHandSum(
    computerHand
  )}`;
};

var main = function (input) {
  //username section
  if (welcomeMessage == true) {
    myOutputValue = "Welcome to a game of Blackjack! Please input your name!";
    welcomeMessage = false;
    return myOutputValue;
  }
  if (usernameInput == false && input != "") {
    var username = input;
    usernameInput = true;
    welcomeMessage = false;
    myOutputValue = `Hello ${username}! Press submit to get your hand`;
    dealCards = true;
    return myOutputValue;
  }
  if (gameOver) {
    return `Game over! Refresh the page to start a new game`;
  }
  if (playerHand.length == 0 && dealCards == true) {
    dealPlayerHand(playerHand);
    dealPlayerHand(computerHand);
    dealPlayerHand(playerHand);
    dealPlayerHand(computerHand);
    if (isBlackjack(computerHand)) {
      gameOver = true;
      return `${getDefaultOutput()}<br>
      Computer got blackjack. You lose! Please refresh to play again`;
    }
    if (isBlackjack(playerHand)) {
      gameOver = true;
      return `${getDefaultOutput()} <br>
      You got blackjack! You WIN! Please refresh to play again`;
    }
    return `${getDefaultOutput()}<br>
    Please type "hit" or "stand", then press submit`;
  }
  if (!playerHasChosenToStand) {
    if (input !== "hit" && input !== "stand") {
      return `Please either input 'hit' or 'stand'`;
    }
    if (input == "hit") {
      dealPlayerHand(playerHand);
      if (getHandSum(playerHand > sumLimit)) {
        gameOver = true;
        return `${getDefaultOutput()} <br>
        Player has busted and loses. Please refresh to play again`;
      }
    }
    if (input == "stand") {
      playerHasChosenToStand = true;
    }
  }
  var computerHandSum = getHandSum(computerHand);
  if (computerHandSum <= dealerHit) {
    dealPlayerHand(computerHand);
    computerHandSum = getHandSum(computerHand);
    if (computerHandSum > sumLimit) {
      gameOver = true;
      return `${getDefaultOutput()} <br>
    Computer busted and you win! Please refresh to play again`;
    }
  }
  if (playerHasChosenToStand && computerHandSum > dealerHit) {
    gameOver = true;
    if (
      getHandSum(playerHand) > computerHandSum &&
      getHandSum(playerHand) < sumLimit
    ) {
      return `${getDefaultOutput()} <br>
    Player wins! Please refresh to play again`;
    }
    return `${getDefaultOutput()}<br>
  Computer wins! Please refresh to play again`;
  }
  return `${getDefaultOutput()}<br>
playerHasChosenToStand is ${playerHasChosenToStand} <br>
If player has not yet chosen to stand, please enter "hit" or "stand". <br>
else submit to see computer next move`;
};
