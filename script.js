// Blackjack Base Game Walkthrough
// 1. playable game with minimal functions: creating deck, shuffling, dealing cards, evaluating winner
// 2. ability for player to hit or stand
// 3. ability for computer to hit or stand
// 4, variable value of Ace to be either "1" or "11"

// Pseudocode for V1
// 1. define player and dealer
// 2. create and shuffle a game deck
// 3. draw 2 cards for player and dealer respectively
// 4. win conditions
//      -- blackjack
//      -- higher hand value
// 5. display hands of both player and dealer and declare winner

// Pseudocode for V2
// 1. extra game mode to "hit" or "stand"
// 2. functionality for user to input hit or stand

// Pseudocode for V3
// 1. Dealer to hit or stand ONLY AFTER player choose to stand
// 2. If dealer hand value is less than 17, dealer hits
// 3. If dealer hand value is more than 17, dealer stands

// Pesudocode for V4
// If totalHandValue, including an ace, is less than 21, ace value is 11
// when totalHandValue, including an ace, is more than 21, ace value is reduced to 1.

// ------------DEFINING GLOBAL VARIABLES------------

//declare game modes
var GAME_START = "game start";
var GAME_CARDS_DRAWN = "cards drawn";
var GAME_RESULTS_SHOWN = "results shown";
var GAME_HIT_OR_STAND = "hit or stand";
var currentGameMode = GAME_START;

// Declare variables to store player and dealer hands
// Using arrays as each hand will be holding multiple card objects
var playerHand = [];
var dealerHand = [];

// Declare variable to hold deck of cards
var gameDeck = "";

// makeDeck function

var createDeck = function () {
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

// shuffle deck function
// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
var shuffleDeck = function (cardDeck) {
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

// Function that creates and shuffles a deck
var createNewDeck = function () {
  var newDeck = createDeck();
  var shuffledDeck = shuffleDeck(newDeck);
  return shuffledDeck;
};

// Function that checks a hand for blackjack
var checkForBlackJack = function (handArray) {
  // Check player hand
  var playerCardOne = handArray[0];
  var playerCardTwo = handArray[1];
  var isBlackJack = false;
  // if there is blackjack, return true
  // possible scenarios:
  // 1st card ace, 2nd card 10 or picture cards
  // 1st card 10 or picture cards, 2nd card ace
  if (
    (playerCardOne.name == "ace" && playerCardTwo.rank >= 10) ||
    (playerCardOne.rank >= 10 && playerCardTwo.name == "ace")
  ) {
    isBlackJack = true;
  }

  // else return false  - don't need statement because variable already set to false
  return isBlackJack;
};

// Function that calculates a hand
var calculateTotalHandValue = function (handArray) {
  var totalHandValue = 0;
  var aceCounter = 0;
  // looping through player or dealer hand
  var index = 0;
  while (index < handArray.length) {
    var currentCard = handArray[index];
    if (
      currentCard.name == "jack" ||
      currentCard.name == "queen" ||
      currentCard.name == "king"
    ) {
      totalHandValue = totalHandValue + 10;
    } else if (currentCard.name == "ace") {
      totalHandValue = totalHandValue + 11;
      aceCounter = aceCounter + 1;
    } else {
      totalHandValue = totalHandValue + currentCard.rank;
    }
    index = index + 1;
    while (index < aceCounter) {
      if (totalHandValue > 21) {
        totalHandValue = totalHandValue - 10;
      }
      index = index + 1;
    }
  }

  index = 0;
  while (index < aceCounter) {
    if (totalHandValue > 21) {
      totalHandValue = totalHandValue - 10;
    }
    index = index + 1;
  }
  return totalHandValue;
};

// Function that displays the player and dealer hands in a message
var displayPlayerAndDealerHands = function (playerHandArray, dealerHandArray) {
  // Player hand
  var playerMessage = "Your cards: <br>";
  var index = 0;
  while (index < playerHandArray.length) {
    playerMessage =
      playerMessage +
      "- " +
      playerHandArray[index].name +
      " of " +
      playerHandArray[index].suit +
      "<br>";
    index = index + 1;
  }
  index = 0;
  var dealerMessage = "Dealer's cards:<br>";
  while (index < dealerHandArray.length) {
    dealerMessage =
      dealerMessage +
      "- " +
      dealerHandArray[index].name +
      " of " +
      dealerHandArray[index].suit +
      "<br>";
    index = index + 1;
  }

  return playerMessage + "<br>" + dealerMessage;
};

// Function that displays the total hand values of both the player and dealer in a message
var displayHandTotalValues = function (playerHandValue, dealerHandValue) {
  var totalHandValueMessage =
    "<br><br>Player total hand value: " +
    playerHandValue +
    "<br>Dealer total hand value: " +
    dealerHandValue;
  return totalHandValueMessage;
};

// MAIN FUNCTION TIME

var main = function (input) {
  var outputMessage = "";
  // FIRST CLICK
  if (currentGameMode == GAME_START) {
    // Create game deck
    gameDeck = createNewDeck();
    console.log(gameDeck);

    // Deal 2 cards to player and dealer respectively
    playerHand.push(gameDeck.pop());
    playerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());

    console.log("player hand ==> ");
    console.log(playerHand);
    console.log("dealer hand ==> ");
    console.log(dealerHand);

    // progress to next game mode
    currentGameMode = GAME_CARDS_DRAWN;
    // write and return the appropriate output message
    outputMessage =
      "The cards has been dealt by the dealer. Click on the 'Submit' button to proceed!";
    return outputMessage;
  }

  // SECOND CLICK
  if (currentGameMode == GAME_CARDS_DRAWN) {
    // // test checkForBlackjack function
    // playerHand = [
    //   { name: "queen", suit: "clubs", rank: 12 },
    //   { name: "ace", suit: "diamonds", rank: 1 },
    // ];
    // dealerHand = [
    //   { name: "ace", suit: "clubs", rank: 1 },
    //   { name: 10, suit: "spades", rank: 10 },
    // ];
    // check for blackjack
    var playerHasBlackjack = checkForBlackJack(playerHand);
    var dealerHasBlackjack = checkForBlackJack(dealerHand);

    console.log("Does player have Blackjack? ==?", playerHasBlackjack);
    console.log("Does dealer have Blackjack? ==?", dealerHasBlackjack);

    if (playerHasBlackjack == true || dealerHasBlackjack == true) {
      // both player and dealer has blackjack -> tie
      if (playerHasBlackjack == true && dealerHasBlackjack == true) {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "It is a blackjack tie!";
      }
      // only player has blackjack -> player wins
      else if (playerHasBlackjack == true && dealerHasBlackjack == false) {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "<br>Player wins by blackjack!";
      }

      // only dealer has blackjack -> dealer wins
      else {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "Dealer wins by blackjack!";
      }
      console.log(outputMessage);
    } else {
      outputMessage =
        displayPlayerAndDealerHands(playerHand, dealerHand) +
        "<br> There are no Blackjacks. <br> Please input 'hit' or 'stand'. ";
      console.log(outputMessage);
      // no blackjack -> game continues

      // change game mode
      currentGameMode = GAME_HIT_OR_STAND;
    }
    // appropriate output message
    return outputMessage;
  }
  if (currentGameMode == GAME_HIT_OR_STAND) {
    // Player Hit
    if (input == "hit") {
      playerHand.push(gameDeck.pop());
      outputMessage =
        displayPlayerAndDealerHands(playerHand, dealerHand) +
        "<br> You drew another card. <br> Please input 'hit' or 'stand'.";
    }
    // Player Stand
    else if (input == "stand") {
      // calculate the total hand value of both player and dealer
      var playerHandTotalValue = calculateTotalHandValue(playerHand);
      var dealerHandTotalValue = calculateTotalHandValue(dealerHand);

      while (dealerHandTotalValue < 17) {
        dealerHand.push(gameDeck.pop());
        dealerHandTotalValue = calculateTotalHandValue(dealerHand);
      }

      // console.log("Player Total Hand Value ==> ", playerHandTotalValue);
      // console.log("Dealer Total Hand Value ==> ", dealerHandTotalValue);

      // playerHandTotalValue = 11;
      // dealerHandTotalValue = 11;

      // compare total hand value
      // same value -> tie
      if (playerHandTotalValue == dealerHandTotalValue) {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "<br>It's a tie!" +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue);
      }
      // player higher value -> player wins
      else if (playerHandTotalValue > dealerHandTotalValue) {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "<br> Woohoo You win!!" +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue);
      }
      // dealer higher value -> dealer wins
      else {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "<br>Dealer wins!" +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue);
      }
    }
    // Input validation
    else {
      outputMessage =
        "Oops wrong input... please type either 'hit' or 'stand' to proceed. <br><br>" +
        displayPlayerAndDealerHands(playerHand, dealerHand);
    }
    return outputMessage;
  }
};
