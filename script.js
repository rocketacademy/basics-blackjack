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
  var suits = ["hearts", "diamonds", "clubs", "spades"];
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
        rankCounter = "10";
      } else if (cardName == 12) {
        cardName = "Queen";
        rankCounter = "10";
      } else if (cardName == 13) {
        cardName = "King";
        rankCounter = "10";
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
var checkForBlackjack = function () {
  var isBlackjack = false;
  if (
    (playerHand[0]["name"] == "ace" && playerHand[1]["rank"] == 10) ||
    (playerHand[1]["name"] == "ace" && playerHand[0]["rank"] == 10) ||
    (dealerHand[0]["name"] == "ace" && dealerHand[1]["rank"] == 10) ||
    (dealerHand[1]["name"] == "ace" && dealerHand[0]["rank"] == 10)
  ) {
    isBlackjack = true;
  }
  return isBlackjack;
};

//====== MAIN FUNCTION =====
var main = function () {
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
      "Karen deals all the cards on the table, with a disgruntled look on her face. Click the 'submit' button to see the results.";
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
    var outputMessage = "";

    if (playerHasBlackjack && dealerHasBlackjack) {
      outputMessage =
        "It's a double Blackjack for both Karen and you. Too bad, try again, loser.";
      // Player BJ = Player Wins
    } else if (playerHasBlackjack && dealerHasBlackjack == false) {
      outputMessage =
        "Oh, you had a Blackjack? Let me check with the manager to see if your pesky ass cheated.";
      // Dealer BJ = Player Loses
    } else if (dealerHasBlackjack && playerHasBlackjack == false) {
      outputMessage = "Karen wins a Blackjack. TRY AGAIN NEXT TIME LOSER!";
    } else {
      //No BJ = Proceed
      // Calculate total hand value
      playerHandValue =
        Number(playerHand[0]["rank"]) + Number(playerHand[1]["rank"]);
      dealerHandValue =
        Number(dealerHand[0]["rank"]) + Number(dealerHand[1]["rank"]);

      //Tie
      if (playerHandValue == dealerHandValue) {
        outputMessage = "It's a tie. Try again peasant.";
        //Player Win
      } else if (playerHandValue > dealerHandValue) {
        outputMessage =
          "Oh, you won? Let me check with the manager, I think you obviously cheated.";
        //Player Lose
      } else {
        outputMessage =
          "I knew you were going to lose, but I didn't expect it to be THIISSS pathetic. Try harder loser.";
      }
      myOutputValue = `Player hand: ${playerHand[0]["name"]} of ${playerHand[0]["suit"]}, ${playerHand[1]["name"]} of ${playerHand[1]["suit"]}. <br> Karen's hand: ${dealerHand[0]["name"]} of ${dealerHand[0]["suit"]}, ${dealerHand[1]["name"]} of ${dealerHand[1]["suit"]}. <br> ${outputMessage}.`;
    }
  }
  return myOutputValue;
};
