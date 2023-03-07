//global variables

//declare game modes
var GAME_START = "game start";
var GAME_CARDS_DRAWN = "cards drawn";
var GAME_RESULTS_SHOWN = "results shown";
var GAME_HIT_OR_STAND = "hit or stand";
var currentGameMode = GAME_START;

var playerHand = [];
var dealerHand = [];

var gameDeck = "empty at the start";
//create new deck function
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
    // Note rankCounter starts at 1 and not 0, and ends at 13 and not 12.
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

//Function that creates and shuffle a deck
var createNewDeck = function () {
  var newDeck = createDeck();
  var shuffledDeck = shuffleDeck(newDeck);
  return shuffledDeck;
};

//=========================GAME FUNCTION======================================
//=========================GAME FUNCTION======================================
//=========================GAME FUNCTION======================================

var checkForBlackjack = function (handArray) {
  // Check player hand
  var playerCardOne = handArray[0];
  var playerCardTwo = handArray[1];
  var isBlackjack = false;
  var isBanBan = false;
  // if there is Blackj, return true
  //
  if ((playerCardOne.name == "ace" && playerCardTwo.rank >= 10) || (playerCardOne.rank >= 10 && playerCardTwo.name == "ace")) {
    isBlackjack = true;
  }
  else if (playerCardOne.name == "ace" && playerCardTwo.rank == "ace" ) {
      isBlackjack = true;
         }
    // no need one more else, optional..
   return isBlackjack;
};

//var to calculate total hand value
var calculateTotalHandValue = function (handArray) {
  var totalHandValue = 0;
  var aceCounter = 0;
  // loop through player or d hand and add up the values
  var index = 0;
  while (index < handArray.length) {
    var currentCard = handArray[index];

    // for J Q K, VALUE IS 10
    if (
      currentCard.name == "jack" ||
      currentCard.name == "queen" ||
      currentCard.name == "king"
    ) {
      totalHandValue = totalHandValue + 10;
    } else if (currentCard.name == "ace") {
      totalHandValue = totalHandValue + 11;
      aceCounter++;
    } else {
      totalHandValue = totalHandValue + currentCard.rank;
    }
    index++;
  }

  index = 0;
  while (index < aceCounter) {
    if (totalHandValue > 21) {
      totalHandValue = totalHandValue - 10;
    }
    index++;
  }

  return totalHandValue;
};

//function thjat displays BOTH P and D hand in a msg
var displayPlayerAndDealersHands = function (playerHandArray, dealerHandArray) {
  // P hand
  var playerMessage = "You have drawn:<br>";
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
  // D Hand
   var dealerMessage = "Dealer's hand:<br>" 
   var index = 0;
   while (index < dealerHandArray.length) {
    dealerMessage =
    dealerMessage +
       "- " +
       dealerHandArray[index].name +
       " of " +
       dealerHandArray[index].suit +
       "<br>";
     index = index + 1;
   }  return playerMessage + "<br>" + dealerMessage;
};

//function that displays P hand and ONLY of D hand
var displayPlayerHandsDealerOneHidden = function (playerHandArray,dealerHandArray) {
  // P hand
  var playerMessage = "You have drawn:<br>";
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
  var dealerMessage = "Dealer's hand:<br>" + "- " + dealerHandArray[0].name + " of " + dealerHandArray[0].suit + "<br>" + "- ??? <br>" ;   
  return playerMessage + "<br>" + dealerMessage;
};

//Function that dispalys total hand values of P and D

var displayHandTotalValues = function (playerHandValue, dealerHandValue) {
  var totalHandValueMessage =
    "<br> Player total hand value: " +
    playerHandValue +
    "<br> Dealer total hand value: " +
    dealerHandValue;
  return totalHandValueMessage;
};

//=========================MAIN FUNCTION======================================
//=========================MAIN FUNCTION======================================
//=========================MAIN FUNCTION======================================
var main = function (input) {
  var outputMessage = "";
  // first submit is to create a game deck

  if (currentGameMode == GAME_START) {
    gameDeck = createNewDeck();
    console.log(gameDeck);

    //to deal 2 cards to player and dealer
    playerHand.push(gameDeck.pop());
    playerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());

    console.log("playerHand : ", playerHand);
    console.log("playerHandTotalValue : ", playerHandTotalValue);
    console.log("dealerHand : ", dealerHand);
    console.log("dealerHandTotalValue : ", dealerHandTotalValue);

    //progress gameMode

    currentGameMode = GAME_CARDS_DRAWN;
    //analyse whether there are win cons/ write and return the output message
    outputMessage =
      " Welcome to a simulated game of Blackjack! <br> By clicking 'submit' you acknowledge the simulator is for entertainment purposes and not for gambling. <br> If you agree, click the 'submit' button to proceed.";
    return outputMessage;
    //
  }

  //second click
  if (currentGameMode == GAME_CARDS_DRAWN);  {
    // test check for blackjack
    // playerHand = [
    //   { name: "ace", suit: "clubs", rank: 13 },
    //   { name: "ace", suit: "diamonds", rank: 13 },
    // ];
    // dealerHand = [
    //   { name: "two", suit: "clubs", rank: 2 },
    //   { name: "ace", suit: "diamonds", rank: 13 },
    // ];
    var playerHasBlackjack = checkForBlackjack(playerHand);
    var dealerHasBlackjack = checkForBlackjack(dealerHand);
    console.log("Does Player have Black Jack? ==>", playerHasBlackjack);
    console.log("Does Dealer have Black Jack? ==>", dealerHasBlackjack);
    var playerHandTotalValue = calculateTotalHandValue(playerHand);
    var dealerHandTotalValue = calculateTotalHandValue(dealerHand);
    
    //check for blackjack
    if (playerHasBlackjack == true || dealerHasBlackjack == true) {
      // both p and d has blackjack = tie
      if (playerHasBlackjack == true && dealerHasBlackjack == true) {
        outputMessage =
          displayPlayerAndDealersHands(playerHand, dealerHand) + displayHandTotalValues("BLACKJACK", "BLACKJACK") + "<br><br> It is a blackjack tie! Click submit to restart!<br>";
          playerHand =[];
          dealerHand =[];
          currentGameMode = GAME_START;
      }
      // only p has blackj > p wins
      else if (playerHasBlackjack == true && dealerHasBlackjack == false) {
        outputMessage = displayPlayerAndDealersHands(playerHand, dealerHand) + displayHandTotalValues("BLACKJACK", dealerHandTotalValue) + "<br><br> HUAT AH! You have been visited by CAI SHEN YE and won by blackjack! Click submit to restart! <br>";
          playerHand =[];
          dealerHand =[];
          currentGameMode = GAME_START;
      }
      // only d has blackj > d wins
      else if (playerHasBlackjack == false && dealerHasBlackjack == true){
        outputMessage =
          displayPlayerAndDealersHands(playerHand, dealerHand) + displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue) + "<br><br> You lost :( The dealer drew a blackjack! Click submit to restart! <br>";
          playerHand =[];
          dealerHand =[];
          currentGameMode = GAME_START;
      }
      return outputMessage;
    } else {
      outputMessage =
        displayPlayerHandsDealerOneHidden(playerHand,dealerHand) +
        '<br> There are no Blackjacks. <br> Please input "hit" to draw another card or "stand" to tabulate the results.';
      // update gameMode
      currentGameMode = GAME_HIT_OR_STAND;
    }
  }
  if (currentGameMode == GAME_HIT_OR_STAND) {
    //player hit
    if (input == "hit") {
      playerHand.push(gameDeck.pop());
      outputMessage =
        displayPlayerAndDealersHands(playerHand, dealerHand) +
        "<br><br> You drew another card. <br> Please input 'hit' to draw another card or 'stand' to tabulate the results.";
    }

    //player stand
    else if (input == "stand") {
      //calcualte total hand value of both p and d
      var playerHandTotalValue = calculateTotalHandValue(playerHand);
      var dealerHandTotalValue = calculateTotalHandValue(dealerHand);

      while (dealerHandTotalValue < 17) {
        dealerHand.push(gameDeck.pop());
        dealerHandTotalValue = calculateTotalHandValue(dealerHand);
      }

      //compare total hand value
      // if player > 22 = lose
      if (playerHandTotalValue >21) {
        outputMessage =
          displayPlayerAndDealersHands(playerHand, dealerHand) +
          "<br><br> GAME OVER! YOU LOST! Your hand value exceeded 21! Click submit to restart! <br>" +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue);
          playerHand =[];
          dealerHand =[];
          currentGameMode = GAME_START;
      }
      // if d > 22 = win!!
      else if (dealerHandTotalValue > 21) {
        outputMessage =
          displayPlayerAndDealersHands(playerHand, dealerHand) +
          "<br><br> YOU WON! The dealer hand value exceeded 21! Click submit to restart! <br>" +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue);
          playerHand =[];
          dealerHand =[];
          currentGameMode = GAME_START;
      }
    // if tie
      else if (playerHandTotalValue == dealerHandTotalValue) {
        outputMessage =
          displayPlayerAndDealersHands(playerHand, dealerHand) + displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue) + "<br><br> It is a tie!! Click submit to restart! <br>";
          playerHand =[];
          dealerHand =[];
          currentGameMode = GAME_START;
      }
         //if p > d, p wins
      else if (playerHandTotalValue > dealerHandTotalValue){
        outputMessage = displayPlayerAndDealersHands(playerHand, dealerHand) + displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue) + "<br><br> Player Wins!!! Click submit to restart! <br>";}
      // if d > p,  d wins
      else {
        outputMessage =
          displayPlayerAndDealersHands(playerHand, dealerHand) + displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue) + "<br><br> Dealer Wins!!! Click submit to restart! <br>"; 
          playerHand =[];
          dealerHand =[];
          currentGameMode = GAME_START;
      }
     }
        // appropriate output message
    return outputMessage;
    }

  return outputMessage;
};
