//
//Global Variables
//
//1. Players hands
var playerHand = [];
var dealerHand = [];

//2. Array for deck of games during game
var gameDeck = [];

//3. Game modes
var beginBlackJack = "Begin of Blackjack";
var cardsDrawn = "cards are drawn / The cards have been drawn";
var finalResults = "results are shown / Comparing of results";
var toHitOrStand = "hit or stand / To hit or Stand";
var currentGameMode = beginBlackJack;

//Game helper functions down below
//1. function to create deck
var createDeck = function () {
  // deck array
  var deck = [];
  var suits = ["Diamonds", "Clubs", "Hearts", "Spades"];
  var indexSuits = 0;
  while (indexSuits < suits.length) {
    var currSuit = suits[indexSuits];
    var indexRanks = 1;
    while (indexRanks <= 13) {
      var cardName = indexRanks;
      if (cardName == 1) {
        cardName = "Ace";
        // define ace value as 11 unless handValue > 10, then Ace will count as 1
      }
      if (cardName == 11) {
        cardName = "Jack";
      }
      if (cardName == 12) {
        cardName = "Queen";
      }
      if (cardName == 13) {
        cardName = "King";
      }
      var card = {
        name: cardName,
        suit: currSuit,
        rank: indexRanks,
      };
      deck.push(card);
      indexRanks = indexRanks + 1;
    }
    indexSuits = indexSuits + 1;
  }
  return deck;
};

//2. Function that generates a random number, used by shuffle deck function
var getRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
};

//3. Function to shuffle deck
var shuffleDeck = function (cards) {
  var index = 0;
  while (index < cards.length) {
    var randomIndex = getRandomIndex(cards.length);
    var currentItem = cards[index];
    var randomItem = cards[randomIndex];
    cards[index] = randomItem;
    cards[randomIndex] = currentItem;
    index = index + 1;
  }
  return cards;
};

//4. Function that creates and shuffles a new deck
var createNewDeck = function () {
  var newDeck = createDeck();
  var shuffledDeck = shuffleDeck(newDeck);
  return shuffledDeck;
};

//5. functions to check if player or computer draws blackjack upon card dealing
var checkForBlackJack = function (handArray) {
  var playerCardOne = handArray[0];
  var playerCardTwo = handArray[1];
  //if player hand does not contain blackjack, to return as false
  var isBlackJack = false;
  // conditions for blackjack - ACE + suits/10 on hand (either first or 2nd card)
  if (
    (playerCardOne.name == "Ace" && playerCardTwo.rank >= 10) ||
    (playerCardTwo.name == "Ace" && playerCardOne.rank >= 10)
  ) {
    isBlackJack = true;
  }

  return isBlackJack;
};

//6. Function to calculate the total hand value
var calculateTotalHandValue = function (handArray) {
  //beginning total hand value is 0
  var totalHandValue = 0;
  // Counter to keep track of the number of aces found within the given hand
  var aceCounter = 0;

  // Loop through player or dealers hand and add up the ranks
  var index = 0;
  while (index < handArray.length) {
    var currCard = handArray[index];

    // In blackjack, the value of king, queen, and jack are counted as 10 by default
    if (
      currCard.name == "King" ||
      currCard.name == "Queen" ||
      currCard.name == "Jack"
    ) {
      totalHandValue = totalHandValue + 10;
    }
    // We count the value of ace as 11 by default
    else if (currCard.name == "Ace") {
      totalHandValue = totalHandValue + 11;
      aceCounter = aceCounter + 1;
      // increase the ace counter so that we can keep track with the Ace cards dealt
      // Else, all other numbered cards are valued by their ranks
    } else {
      totalHandValue = totalHandValue + currCard.rank;
    }
    index = index + 1;
    //loop is completed once all the cards are added ie index = handarray.length
  }

  // To reset the index so that can resolve the Ace counter with respect to the hand value ie ACE to be 1 or 11 based on hand value
  index = 0;
  while (index < aceCounter) {
    if (totalHandValue > 21) {
      totalHandValue = totalHandValue - 10;
    }
    index = index + 1;
  }

  return totalHandValue;
};

// 7. Function that displays the player and dealers hand in a message
var displayPlayerAndDealerHands = function (playerHandArray, dealerHandArray) {
  var playerMessage = "The Player's hand are:<br>";
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
  var dealerMessage = "The Dealer's hand are:<br>";
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

// 8. Function that displays the total hand values of the player and the dealer
var displayHandTotalValues = function (playerHandValue, dealerHandValue) {
  var totalHandValueMessage =
    "<br>The Player total hand value is: " +
    playerHandValue +
    "<br>The Dealer total hand value is: " +
    dealerHandValue;
  return totalHandValueMessage;
};

//
//
//Main Function
//
//

var main = function (input) {
  var outputMessage = "";

  // Player first click to start the game (ie to run the shuffle deck and drawing of cards)
  if (currentGameMode == beginBlackJack) {
    // create a deck of cards
    gameDeck = createNewDeck();

    // deal 2 cards to player and dealer
    playerHand.push(gameDeck.pop());
    playerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());

    // check player and dealer cards
    console.log("Player Hand ==>");
    console.log(playerHand);
    console.log("Dealer Hand ==>");
    console.log(dealerHand);

    // Game mode moves to next stage after both player and dealer have drawn their cards
    currentGameMode = cardsDrawn;

    // reassign output message
    outputMessage =
      "Both the Player and Dealer have drawn their cards. Please click SUBMIT button to calculate the total card values!";

    // return message
    return outputMessage;
  }

  // Player has clicked submit to do the calculation of the cards
  if (currentGameMode == cardsDrawn) {
    // First we check if either or both players have blackjack
    var playerHasBlackJack = checkForBlackJack(playerHand);
    var dealerHasBlackJack = checkForBlackJack(dealerHand);

    console.log("Does Player have Black Jack? ==>", playerHasBlackJack);
    console.log("Does Dealer have Black Jack? ==>", dealerHasBlackJack);

    // Condition when either player or dealer has black jack
    if (playerHasBlackJack == true || dealerHasBlackJack == true) {
      // When both have black jack
      if (playerHasBlackJack == true && dealerHasBlackJack == true) {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "<br>Its a Black Jack Tie! Please refresh page to start a new game";
      }
      // When player has black jack
      else if (playerHasBlackJack == true && dealerHasBlackJack == false) {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "<br>Player wins by Black Jack! Please refresh page to start a new game";
      }
      // When dealer has black jack
      else {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "<br>Dealer wins by Black Jack! Please refresh page to start a new game";
      }
    }

    // If neither the player or dealer has backjack, we move on the game
    // ask player to input 'hit' or 'stand'
    else {
      outputMessage =
        displayPlayerAndDealerHands(playerHand, dealerHand) +
        '<br> No one has blackjacks. <br>Please input "hit" to draw a card or "stand" to remain.';

      // Change gamemode to Hit or Stand game mode
      currentGameMode = toHitOrStand;
    }

    return outputMessage;
  }

  // Player to input "Hit" or "Stand" and click submit button
  if (currentGameMode == toHitOrStand) {
    if (input == "hit") {
      playerHand.push(gameDeck.pop());
      outputMessage =
        displayPlayerAndDealerHands(playerHand, dealerHand) +
        '<br> You have drawn another card. <br>Please input "hit" or "stand" to continue.';
    }

    // When player inputs 'stand', to calculate the total hand value of player and dealer and resolve the Game outcome
    else if (input == "stand") {
      var playerHandTotalValue = calculateTotalHandValue(playerHand);
      var dealerHandTotalValue = calculateTotalHandValue(dealerHand);

      // Need to resolve Dealer's hit or stand logic before we can resolve the game outcome
      while (dealerHandTotalValue < 17) {
        dealerHand.push(gameDeck.pop());
        dealerHandTotalValue = calculateTotalHandValue(dealerHand);
      }

      // Tied game outcome from burst or both player and dealer have same number
      if (
        playerHandTotalValue == dealerHandTotalValue ||
        (playerHandTotalValue > 21 && dealerHandTotalValue > 21)
      ) {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "<br>It is a Tied Game! Both Player and Computer have tied!<br>Please refresh page to start a new game.<br><br>" +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue);
      }

      // Conditions for player win
      else if (
        (playerHandTotalValue > dealerHandTotalValue &&
          playerHandTotalValue <= 21) ||
        (playerHandTotalValue <= 21 && dealerHandTotalValue > 21)
      ) {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "<br>Congratulations! Player wins! <br>Please refresh page to start a new game.<br><br>" +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue);
      }

      // Dealer wins when above two conditions are not met
      else {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "<br>Dealer wins! <br>Please refresh page to start a new game.<br><br>" +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue);
      }
      currentGameMode = finalResults;
    }

    // If player does not input correctly
    //Ask player to only input 'hit' or 'stand'
    else {
      outputMessage =
        'Your last input was wrong. Please type only "hit" or "stand".<br><br>' +
        displayPlayerAndDealerHands(playerHand, dealerHand);
    }

    return outputMessage;
  }
};
