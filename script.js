//blackjack base game walkthru
//playable game with minumum functions: creating deck, shuffling, dealing cards, evaluating winner
//2. ability for the player to hit or stand
//3. ability for the dealer to hit or stand
//4. var val of ace - 1 or 11

//=====Psedocode for version 1======
//1. define player and dealer
//2. create and shuffle a game deck
//3. draw 2 cards for player and dealer respectively
//4. win conditions
//        -- blackjack
//        -- higher hand value
//5. display hands of both player and dealer and declare winner

//======= ======== Psedocode for version 2 ======== ========//
//1. extra game mode "hit" or "stand"
//2. functionality for user to input hit or stand

//======= ======= Psedocode for version 3 ======== ========//
//1. dealer to hit or stand ONLY AFTER player choose to stand
//2. if deal hand value is < 17,  dealer hits
//3. if dealer hand value is > 17, dealer stands

//======= ======= Psedocode for version 4 ======== ========//
//1. if totalHandValue, incl ace < 21, ace value is 11
//2. when totalHandvalue, incl an ace > 21, ace value is reduced to 1.

// ===============================================================//
// ========================= GLOBAL VARIABLES ====================//
// ===============================================================//

//Declare game modes

var GAME_START = "GAME START";
var GAME_CARDS_DRAWN = "cards drawn";
var GAME_RESULTS_SHOWN = "results shown";
var GAME_HIT_OR_STAND = "hit or stand";
var currentGameMode = GAME_START;

// declare variables to store player and dealer hands
// we always use arrays as each hand will be holding multiple card objects
var playerHand = [];
var dealerHand = [];

//Declare variable to hold deck of cards
var gameDeck = "empty at the start";

//CREATE DECK//

// Function that creates a deck of cards, used by createNewDeck function
var createDeck = function () {
  // deck array
  var deck = [];
  // for 'while loop' to create suits for cards
  var suits = ["Diamonds", "Clubs", "Hearts", "Spades"];
  var indexSuits = 0;
  while (indexSuits < suits.length) {
    var currSuit = suits[indexSuits];
    // 13 ranks... ace to king - rank to define "card positions"
    var indexRanks = 1;
    while (indexRanks <= 13) {
      var cardName = indexRanks;
      // define card value - differentiate from rank: 'ace' = 1 / 11, 'jack' & 'queen' & 'king' = 10
      if (cardName == 1) {
        cardName = "ace";
        // define ace value as 11 all the way. if handValue > 10, -11 to total value
        // vs. coding a function to redefine the value for ace
      }
      if (cardName == 11) {
        cardName = "jack";
      }
      if (cardName == 12) {
        cardName = "queen";
      }
      if (cardName == 13) {
        cardName = "king";
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

// Function that generates a random number, used by shuffle deck function
var getRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
};

// Function that shuffles a deck, used by createNewDeck function
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

// Function that creates and shuffles a deck
var createNewDeck = function () {
  var newDeck = createDeck();
  var shuffledDeck = shuffleDeck(newDeck);
  return shuffledDeck;
};

//Function that calculate a hand
var calculateTotalHandValue = function (handArray) {
  var totalHandValue = 0;
  var aceCounter = 0;

  // loop through player or dealer hand add up the values
  var index = 0;
  while (index < handArray.length) {
    var currentCard = handArray[index];

    // for jack, queen, king, value is 10
    if (
      currentCard.name == "jack" ||
      currentCard.name == "queen" ||
      currentCard.name == "king"
    ) {
      totalHandValue = totalHandValue + 10;
    } else if (currentCard.name == "ace, ") {
      totalHandValue = totalHandValue + 11;
      aceCounter = aceCounter + 1;
    } else {
      totalHandValue = totalHandValue + currentCard.rank;
    }
    index = index + 1;
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

//keep below
// Function that displays the player and dealer hands in a message
var displayPlayerAndDealerHand = function (playerHandArray, dealerHandArray) {
  //Player hand
  var playerMessage = "Player Hand:<b>";
  var index = 0;
  while (index < playerHandArray.length) {
    playerMessage =
      playerMessage +
      "-" +
      playerHandArray[index].name +
      "of" +
      playerHandArray[index].suit +
      "<br>";
    index = index + 1;
  }

  //Dealer hand
  index = 0;
  var dealerMessage = "Dealer Hand: br>";
  while (index < playerHandArray.length) {
    dealerMessage =
      dealerMessage +
      "-" +
      dealerHandArray[index].name +
      "of" +
      dealerHandArray[index].suit +
      "<br>";
    index = index + 1;
  }
  return playerMessage + "<br>" + dealerMessage;
  //keep above
};
//Function that displays the total hand values of the player and dealer in a message
var displayHandTotalValues = function (playerHandVaue, dealerHandValue) {
  var calculateTotalHandValueMessage =
    "<br>Player total hand value: " +
    playerHandValue +
    "<br>Dealer total hand value: " +
    dealerHandValue;
  return calculateTotalHandValueMessage;
};

//Function that checks a hand for blackjack
var checkForBlackjack = function (handArray) {
  //chrck player hand
  var playerCardOne = handArray[0];
  var playerCardTwo = handArray[1];
  var isBlackjack = false;

  // if there is blackjack, return true
  //possible scenarios:
  //1st card ace, 2nd card 10 or picture cards
  //1st card 10 or picture cards, 2nd card,ace
  if (
    (playerCardOne.name == "ace" && playerCardTwo.rank >= 10) ||
    (playerCardOne.rank >= 10 && playerCardTwo.name == "ace")
  ) {
    isBlackjack = true;
  }
  // else return false - don't need statement because variable already set to false
  return isBlackjack;
};

//Function that calculates a hand
var calculateTotalHandValue = function (handArray) {
  var totalHandValue = 0;
  //loop through player or dealer hand and add up the values
  var index = 0;
  while (index < handArray.length) {
    var currentCard = handArray[index];
  }
  // for jack, queen, king, value is 10
  if (
    currentCard.name == "jack" ||
    currentCard.name == "queen" ||
    currentCard.name == "king"
  ) {
    totalHandValue = totalHandValue + 10;
  } else {
    totalHandValue = totalHandValue + currentCard.rank;
  }
  index = index + 1;
  return totalHandValue;

  //================================================
  //=============== MAIN FUNCTIONS =================
  //================================================

  var main = function (input) {
    var outputMessage = "";

    //FIRST CLICK
    if (currentGameMode == GAME_START) {
      //create the game deck
      gameDeck = createNewDeck();
      console.log(gameDeck);

      // deal 2 cards to player and dealer respectively
      playerHand.push(gameDeck.pop());
      playerHand.push(gameDeck.pop());
      dealerHand.push(gameDeck.pop());
      dealerHand.push(gameDeck.pop());

      console.log("player hand ==> ");
      console.log(playerHand);
      console.log("dealer hand ==>");
      console.log(dealerHand);

      // progress the gameMode
      currentGameMode = GAME_CARDS_DRAWN;
      // write and return the appropriate ouput msg
      outputMessage =
        'Everyone has been dealt a card. Click "submit" button to evaluate cards!';

      return outputMessage;
    }

    // SECOND CLICK
    if (currentGameMode == GAME_CARDS_DRAWN) {
      //test checkForBlackjack function
      (playerHand = [
        { name: "queen", suit: "clubs", rank: 12 },
        { name: "ace", suit: "diamonds", rank: 1 },
      ]),
        (dealerHand = [
          { name: "ace", suit: "clubs", rank: 1 },
          { name: 10, suit: "spades", rank: 10 },
        ]);

      //check for blackjack
      var playerHasBlackjack = checkForBlackjack(playerHand); //ok//
      var dealerHasBlackjack = checkForBlackjack(dealerHand); //ok//

      //console.log("Does Player have Blackjack? ==?", playerHasBlackjack);
      //console.log("Does dealer have Blackjack? ==?", dealerHasBlackjack);

      playerHasBlackjack = true;
      dealerHasBlackjack = true;

      if (playerHasBlackjack == true || dealerHasBlackjack == true) {
        //both player and dealer has blackjack - tie
        if (playerHasBlackjack == true && dealerHasBlackjack == true) {
          outputMessage = "It's a blackjack tie!";
        }
        // only player has blackjack - player wins
        else if (playerHasBlackjack == true && dealerHasBlackjack == false) {
          outputMessage =
            displayPlayerAndDealerHands(playerHand, dealerHand) +
            "<br>Player wins by Blackjack!";
        }
        // only dealer has blackjack - dealer wins
        else {
          outputMessage =
            displayPlayerAndDealerHands(playerHand, dealerHand) +
            "<br>Dealer wins by Blackjack";
        }
        console.log(outputMessage);
      }
    } else {
      outputMessage =
        displayPlayerAndDealerHands(playerHand, dealerHand) +
        "<br>There is no blackjack!";
      console.log(outputMessage);

      // no blackjack - continue the game

      // calculate the total hand value of both player and dealer
      var playerHandTotalValue = calculateTotalHandValue(playerHand);
      var dealerHandTotalValue = calculateTotalHandValue(dealerHand);
      //playerHandTotalValue = 6;
      //dealerHandTotalValue = 11;

      //compare total hand value
      // same value => tie
      if (playerHandTotalValue == dealerHandTotalValue) {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "</br>It is a tie" +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue);
      }
      //player higher value => player wins
      else if (playerHandTotalValue > dealerHandTotalValue) {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "<br>Player wins!" +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue);
      }

      //dealer higher value => dealer wins
      else {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "<br>Dealer wins!" +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue);
      }
      //change game mode
      currentGameMode = GAME_RESULTS_SHOWN;

      //appropriate output message
      return outputMessage;
    }
  };
};
