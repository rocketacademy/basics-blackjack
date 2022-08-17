//===== GLOBAL VARIABLES=====

var WELCOME_MODE = "WELCOME_MODE";
var GAME_CARDS_DRAWN = "GAME_CARDS_DRAWN";
var HIT_OR_STAND_MODE = "HIT_OR_STAND_MODE";
currentMode = "WELCOME_MODE";

//===== STORE HANDS ======

var playerHand = [];
var dealerHand = [];

//Declare variable to hold deck of cards
var gameDeck = "empty at the start";
// ======================GAME FUNCTIONS===================
//====== MAKE DECK FUNCTION ======
var makeDeck = function () {
  var cardDeck = [];
  //make 52 cards
  //rank 1-13
  // 1-4 suits hearts, diamonds, clubs, spades
  // 1-10 and jack, queen, kind and ace
  // loop 1
  // rank 1-10
  var suitIndex = 0;
  var suits = ["♥ ", "◆ ", "♣️ ", "♠️ "];
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    //loop 2
    // suite hearts spades
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;

      // 1, 11, 12, 13, FOR BJ, change rank to 10
      if (cardName == 1) {
        cardName = "Ace";
      } else if (cardName == 11) {
        cardName = "Jack";
      } else if (cardName == 12) {
        cardName = "Queen";
      } else if (cardName == 13) {
        cardName = "King";
      }

      //Create a new card with the current name, suit and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      cardDeck.push(card);
      rankCounter = rankCounter + 1;
    }
    suitIndex = suitIndex + 1;
  }
  return cardDeck;
};

//Deal card function
var dealCardToHand = function (hand) {
  hand.push(deck.pop());
};
// Get a random index ranging from 0 (inclusive) to max (exclusive).
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

//Create Deck Function
var createNewDeck = function () {
  var newDeck = makeDeck();
  // Shuffle the deck and save it in a new variable shuffledDeck to communicate that we have shuffled the deck.
  var shuffledDeck = shuffleCards(newDeck);
  return shuffledDeck;
};

//Check whether Blackjack is true function
var checkForBlackjack = function (handArray) {
  var playerCardOne = handArray[0];
  var playerCardTwo = handArray[1];
  var isBlackjack = false;
  if (
    (playerCardOne.name == "Ace" && playerCardTwo == 10) ||
    (playerCardTwo.name == "Ace" && playerCardOne == 10)
  ) {
    isBlackjack = true;
  }
  return isBlackjack;
};

// Calculate Total Hand Value Function
var calculateTotalHandValue = function (handArray) {
  var totalHandValue = 0;
  var aceCounter = 0;
  //loop through player or dealer hand and add up values
  var index = 0;
  while (index < handArray.length) {
    var currentCard = handArray[index];

    //For Jack, Queen, King, change value to 0
    if (
      currentCard.name == "Jack" ||
      currentCard.name == "Queen" ||
      currentCard.name == "King"
    ) {
      totalHandValue = totalHandValue + 10;
    } else if (currentCard.name == "Ace") {
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

//Function that displays player and dealer hands totals in a message
var displayHandsTotals = function (playerHand, dealerHand) {
  var displayPlayerPoints =
    "Player's Totals: " + calculateTotalHandValue(playerHand);
  var displayDealerPoints =
    "Karen's Totals: " + calculateTotalHandValue(dealerHand);
  return displayPlayerPoints + "<br>" + displayDealerPoints;
};

//Function that displays playes and dealer hands in a message
var displayPlayerAndDealerHands = function (playerHandArray, dealerHandArray) {
  //player
  var playerMessage = "Player's Hand: ";
  var handIndex = 0;

  while (handIndex < playerHandArray.length) {
    var currentCard = playerHandArray[handIndex];
    playerMessage = playerMessage + currentCard.name + currentCard.suit;
    handIndex = handIndex + 1;
  }
  //banker
  var dealerMessage = "Karen's Totals: ";
  var handIndex = 0;
  while (handIndex < dealerHandArray.length) {
    var currentCard = dealerHandArray[handIndex];
    dealerMessage = dealerMessage + currentCard.name + currentCard.suit;
    handIndex = handIndex + 1;
  }
  return playerMessage + "<br>" + dealerMessage;
};

//Version 4
//Determine whether Aces should have 1 or 11 in a hand
// If totalhandvalue < 10, ace = 11
// If total handvalue < 21, ace = 1

//====== MAIN FUNCTION =====
var main = function (input) {
  var outputMessage = "";
  //First click
  if (currentMode == WELCOME_MODE) {
    console.log("Check current mode: " + currentMode);
    gameDeck = createNewDeck();
    console.log(gameDeck);

    // Draw 2 cards from the top of the deck

    playerHand.push(gameDeck.pop());
    playerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());

    console.log("Player Hand ==>");
    console.log(playerHand);
    console.log("Dealer Hand: ==>");
    console.log(dealerHand);

    //change the game mode
    currentMode = GAME_CARDS_DRAWN;

    outputMessage =
      "Karen deals all the cards on the table, with a disgruntled look on her face. Click the 'submit' button again to see the results.";
    return outputMessage;
  }
  if (currentMode == GAME_CARDS_DRAWN) {
    console.log("Check current mode: " + currentMode);

    // force input player hand
    /*  playerHand = [
      { name: "queen", suit: "hearts", rank: 10 },
      { name: "ace", suit: "diamonds", rank: 1 },
    ];
    */

    // Check for Blackjack
    var playerHasBlackjack = checkForBlackjack(playerHand);
    var dealerHasBlackjack = checkForBlackjack(dealerHand);

    console.log("Does Player have Blackjack? ==>", playerHasBlackjack);
    console.log("Does Dealer have Blackjack? ==>", dealerHasBlackjack);

    // Both BJ = Tie

    if (playerHasBlackjack && dealerHasBlackjack) {
      outputMessage =
        "Karen: It's a double Blackjack, which means nobody won. Too bad, try again, loser.";
      // Player BJ = Player Wins
    } else if (playerHasBlackjack && dealerHasBlackjack == false) {
      outputMessage =
        "Karen: Oh, you had a Blackjack? Let me check with the manager to see if your pesky ass cheated.";
      // Dealer BJ = Player Loses
    } else if (dealerHasBlackjack && playerHasBlackjack == false) {
      outputMessage = "Karen: I win the Blackjack. TRY AGAIN NEXT TIME LOSER!";
    } else {
      //No BJ = Proceed
      //Tabulate total points
      /*displayPlayerPoints =
        Number(playerHand[0]["rank"]) + Number(playerHand[1]["rank"]);
      displayBankerPoints =
        Number(dealerHand[0]["rank"]) + Number(dealerHand[1]["rank"]);
        */

      // Change to hit or stand mode
      currentMode = HIT_OR_STAND_MODE;
      console.log("Check current mode: " + currentMode);
      outputMessage = `${displayPlayerAndDealerHands(
        playerHand,
        dealerHand
      )} <br> ${displayHandsTotals(
        playerHand,
        dealerHand
      )}<br><br>It's your move, key in 'hit' or 'stand' in the input box and click the submit button to proceed.`;
    }
    return outputMessage;
  }
  // Hit or stand mode
  if (currentMode == HIT_OR_STAND_MODE) {
    // Hit
    if (input == !"hit" && input == !"stand") {
      outputMessage =
        "Karen: Do you even understand English? Key in 'hit' or 'stand' ONLY. Try better. <br><br>" +
        displayPlayerAndDealerHands(playerHand, dealerHand) +
        "<br>" +
        displayHandsTotals(playerHand, dealerHand);
    } else if (input == "hit") {
      playerHand.push(gameDeck.pop());
      console.log("Check player hand ==>");
      console.log(playerHand);
      console.log(calculateTotalHandValue(playerHand));
      if (calculateTotalHandValue(playerHand) > 21) {
        outputMessage = `You have busted. <br> Karen smiles gleefully and mocks you. <br><br> ${displayPlayerAndDealerHands(
          playerHand,
          dealerHand
        )} <br> ${displayHandsTotals(
          playerHand,
          dealerHand
        )} <br><br> Try Again?`;
      } else {
        outputMessage = `You have chosen to hit. <br><br> ${displayPlayerAndDealerHands(
          playerHand,
          dealerHand
        )} <br> ${displayHandsTotals(
          playerHand,
          dealerHand
        )} <br> Do you want to hit or stand?`;
      }
      return outputMessage;
    }
    // Stand
  } else if (input == "stand")
    outputMessage = `You have chosen to stand. <br><br> ${displayPlayerAndDealerHands(
      playerHand,
      dealerHand
    )} <br> ${displayHandsTotals(playerHand, dealerHand)}`;
  calculateTotalHandValue(dealerHand);
  calculateTotalHandValue(playerHand);

  while (calculateTotalHandValue(dealerHand) < 17) {
    //dealer to hit
    dealerHand.push(gameDeck.pop());
    calculateTotalHandValue(dealerHand);
  }
  if (calculateTotalHandValue(dealerHand) > 21) {
    outputMessage =
      "Karen Busted! <br> Karen: Oh, you won? Let me check with the manager, I think you obviously cheated<br>Refresh to play again.<br><br>" +
      displayPlayerAndDealerHands(playerHand, dealerHand) +
      "<br>" +
      displayHandsTotals(playerHand, dealerHand);
  } else if (
    calculateTotalHandValue(playerHand) > calculateTotalHandValue(dealerHand)
  ) {
    outputMessage =
      "Karen: Oh, you won? Let me check with the manager, I think you obviously cheated<br>Refresh to play again.<br><br>" +
      displayPlayerAndDealerHands(playerHand, dealerHand) +
      "<br>" +
      displayHandsTotals(playerHand, dealerHand);
  } else if (
    calculateTotalHandValue(playerHand) == calculateTotalHandValue(dealerHand)
  ) {
    outputMessage =
      "Karen: It's a tie. Try again peasant.<br>Refresh to play again.<br><br>" +
      displayPlayerAndDealerHands(playerHand, dealerHand) +
      "<br>" +
      displayHandsTotals(playerHand, dealerHand);
  } else {
    outputMessage =
      "Karen: I knew you were going to lose, but I didn't expect it to be THIISSS pathetic. Try harder loser.<br><br>" +
      displayPlayerAndDealerHands(playerHand, dealerHand) +
      "<br>" +
      displayHandsTotals(playerHand, dealerHand);
  }
  return outputMessage;
};
