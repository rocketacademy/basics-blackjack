//There will be only two players. One human and one computer (for the Base solution).
// The computer will always be the dealer.
// Each player gets dealt two cards to start.
// The player goes first, and decides if they want to hit (draw a card) or stand (end their turn).
// The dealer has to hit if their hand is below 17.
// Each players' score is the total of their card ranks. Jacks/Queen/Kings are 10. Aces can be 1 or 11.
// The player who is closer to, but not above 21 wins the hand.

//Clobal variables

var GAME_START = "start the game";
var CHECK_FOR_BLACKJACK = "check if any player got blackjack";
var HIT_OR_STAND = "players can choose to hit or stand";
var COMPARE_HAND_VALUES = "compare the hand values";
var GAME_OVER = "game over";
var gameState = GAME_START;
var cardDeck = "";
var HEARTS = "♥️";
var DIAMONDS = "♦️";
var SPADES = "♠️";
var CLUBS = "♣️";
var ACE = "ace";
var JACK = "jack";
var QUEEN = "queen";
var KING = "king";

var playerHand = [];
var dealerHand = [];

//1. create a card deck (helper function)
var createDeck = function () {
  var deck = []; //array for the card deck
  console.log(deck);
  // 4 suits
  var suits = [HEARTS, DIAMONDS, SPADES, CLUBS];
  //create a loop so for each suit there's 13 cards of different rank
  var suitsCounter = 0;
  while (suitsCounter < 4) {
    console.log("suitsCounter", suitsCounter);
    var currentSuit = suits[suitsCounter];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      console.log("rank counter", rankCounter);
      var cardName = rankCounter;
      if (rankCounter === 1) {
        cardName = ACE;
      }
      if (rankCounter === 11) {
        cardName = JACK;
      }
      if (rankCounter === 12) {
        cardName = QUEEN;
      }
      if (rankCounter === 13) {
        cardName = KING;
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      console.log("card", card);
      deck.push(card);
      rankCounter = rankCounter + 1;
    }

    suitsCounter = suitsCounter + 1;
  }
  return deck;
};

//2. Get a random number for shuffling the deck
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

//3. Shuffle the deck (helper function)
var shuffleCards = function (deck) {
  //we need to swap the current card with a random card
  var currentIndex = 0;
  while (currentIndex < deck.length) {
    console.log("currentIndex", currentIndex);
    var randomIndex = getRandomIndex(deck.length);
    console.log("random index", randomIndex);
    var currentCard = deck[currentIndex];
    var randomCard = deck[randomIndex];
    console.log(currentCard);
    console.log(randomCard);
    deck[currentIndex] = randomCard;
    deck[randomIndex] = currentCard;
    console.log("random card", randomCard);
    console.log("current card", currentCard);
    currentIndex = currentIndex + 1;
  }
  return deck;
};
var checkForBlackjack = function (playerHand) {
  //5. Check if any of the players has a blackjack (helper function)
  // if both player and dealer got a score of 21, it's a blackjack tie
  //if the player gets a score of 21 and the dealer's score isn't 21, the player wins
  //if the dealer gets a score of 21 and the player's score isn't 21, the dealer wins
  //otherwise the game continues
  var isBlackjack = false;
  var playerFirstCard = playerHand[0];
  var playerSecondCard = playerHand[1];
  if (
    (playerFirstCard.name === "ace" && playerSecondCard.rank >= 10) ||
    (playerSecondCard.name === "ace" && playerFirstCard.rank >= 10)
  ) {
    isBlackjack = true;
  }
  return isBlackjack;
};

//calculate the total hand value (helper function)
var calculateTotalHandValue = function (playerHand) {
  var totalHandValue = 0; //it is a sum of all the cards in player hand
  var playerHandIndex = 0;
  while (playerHandIndex < playerHand.length) {
    var newCardValue = playerHand[playerHandIndex].rank;
    //all picture cards value has to be changed to 10:
    if (newCardValue === 11 || newCardValue === 12 || newCardValue === 13) {
      newCardValue = 10;
    }
    totalHandValue = totalHandValue + newCardValue;
    console.log("total player hand value: ", totalHandValue);
    playerHandIndex = playerHandIndex + 1;
  }
  return totalHandValue;
};

var displayPlayerHand = function (playerHand) {
  playerHandCounter = 0;
  var playerCards = "";

  while (playerHandCounter < playerHand.length) {
    playerCards =
      playerCards +
      "<br>" +
      playerHand[playerHandCounter].name +
      " of " +
      playerHand[playerHandCounter].suit;
    playerHandCounter = playerHandCounter + 1;
  }
  return playerCards;
};

//MAIN FUNCTION:
//Game mode = GAME_START
//Deal the cards:
//Player gets 2 cards
//Computer gets 2 cards

var main = function (input) {
  var cardDeck = shuffleCards(createDeck());
  var myOutputMessage = "";
  var cardsShown = "";
  if (gameState === GAME_START) {
    index = 0;
    while (index < 2) {
      playerHand.push(cardDeck.pop());
      console.log("player hand: ", playerHand);
      dealerHand.push(cardDeck.pop());
      console.log("dealer hand: ", dealerHand);
      index = index + 1;
    } //cards are dealt
    gameState = CHECK_FOR_BLACKJACK;
    cardsShown =
      "Player's hand: " +
      displayPlayerHand(playerHand) +
      "<br>" +
      "<br>" +
      "Dealer's hand: " +
      displayPlayerHand(dealerHand) +
      "<br>" +
      "<br>";

    myOutputMessage =
      cardsShown + "Now please click 'Submit' again to continue the game.";

    //once the cards are dealt, change the game state
    return myOutputMessage;
  }

  cardsShown =
    "Player's hand: " +
    displayPlayerHand(playerHand) +
    "<br>" +
    "Player's score: " +
    calculateTotalHandValue(playerHand) +
    "<br>" +
    "<br>" +
    "Dealer's hand: " +
    displayPlayerHand(dealerHand) +
    "<br>" +
    "Deales's score: " +
    calculateTotalHandValue(dealerHand) +
    "<br>";
  if (gameState === CHECK_FOR_BLACKJACK) {
    //show the cards in the output message
    var blackjackInFirstHand = "";
    var totalPlayerScore = 0;
    var totalDealerScore = 0;
    var firstRoundOutcome = "";
    // create a helper function "check for blackjack" and call it out here
    //Testing if checking for blackjack function works:
    // (playerHand[0] = {
    //   name: "10",
    //   suit: HEARTS,
    //   rank: 10,
    // }),
    //   (playerHand[1] = {
    //     name: "ace",
    //     suit: HEARTS,
    //     rank: 1,
    //   });
    // (dealerHand[0] = {
    //   name: "ace",
    //   suit: SPADES,
    //   rank: 1,
    // }),
    //   (dealerHand[1] = {
    //     name: "4",
    //     suit: DIAMONDS,
    //     rank: 4,
    //   });
    var playerHasBlackjack = checkForBlackjack(playerHand);
    console.log("Player has blackjack", playerHasBlackjack);
    var dealerHasBlackjack = checkForBlackjack(dealerHand);
    console.log("Dealer has blackjack", dealerHasBlackjack);
    if (playerHasBlackjack === true || dealerHasBlackjack === true) {
      //if they both have blackjack, it's a tie
      //if  only player has blackjack, player wins
      //otherwise dealer wins
      if (playerHasBlackjack === true && dealerHasBlackjack === true) {
        blackjackInFirstHand =
          "Wooow! Both Player and Dealer got blackjack! It's a tie!";
      } else if (playerHasBlackjack === true) {
        blackjackInFirstHand = "Looks like Player got blackjack! They win!";
      } else {
        blackjackInFirstHand = "Looks like Dealer got blackjack! They win!";
      }

      myOutputMessage = cardsShown + blackjackInFirstHand;
      gameState = GAME_OVER;
    } else {
      gameState = HIT_OR_STAND;
      console.log("game state", gameState);
      myOutputMessage = "Please key in 'hit' or 'stand'.";
    }
    return myOutputMessage;
  }
  //add hit or stand for player
  //the player can key in hit to draw one more card or stand to refrain from drawing
  if (gameState === HIT_OR_STAND) {
    //validate input:
    if (input !== "hit" && input !== "stand") {
      var errorMessage =
        "Oops,something went wrong! Please input either 'hit' or 'stand' to continue the game!";
      return errorMessage;
    }
    if (input === "hit") {
      playerHand.push(cardDeck.pop());
      console.log("player hand: ", playerHand);
      var lastPlayerCardIndex = playerHand.length - 1;
      var newPlayerCard =
        playerHand[lastPlayerCardIndex].name +
        " of " +
        playerHand[lastPlayerCardIndex].suit;
      return (
        "Player drew a " +
        newPlayerCard +
        "<br>" +
        "<br>" +
        cardsShown +
        "<br>" +
        "<br>" +
        "Please key in 'hit' or 'stand'. "
      );
    } else {
      gameState = COMPARE_HAND_VALUES;
      return "Please click 'Submit' to see the game result.";
    }
  }
  if (gameState === COMPARE_HAND_VALUES) {
    totalPlayerScore = calculateTotalHandValue(playerHand);
    console.log("Player's score:", totalPlayerScore);
    totalDealerScore = calculateTotalHandValue(dealerHand);
    console.log("Dealer's score", totalDealerScore);
    //bust for both players:
    if (totalPlayerScore > 21 && totalPlayerScore === totalDealerScore) {
      firstRoundOutcome = "Oops! Both Player and Dealer busted! It's a tie!";
    }
    //winning conditions:
    //player wins if a) dealer's score is more that 21 and player's score is less
    if (totalPlayerScore < 21 && totalDealerScore > 21) {
      firstRoundOutcome = "Dealer busted! Player wins!";
    }
    // b) player's score is under 21 and greater than dealer's score
    if (totalPlayerScore < 21 && totalPlayerScore > totalDealerScore) {
      firstRoundOutcome = "Player wins!";
    }
    //dealer wins:
    if (totalDealerScore < 21 && totalPlayerScore > 21) {
      firstRoundOutcome = "Player busted! Dealer wins!";
    }
    if (totalDealerScore < 21 && totalDealerScore > totalPlayerScore) {
      firstRoundOutcome = "Dealer wins!";
    }

    // a tie
    if (totalDealerScore === totalPlayerScore) {
      firstRoundOutcome = "Both dealer and player got same score! It's a tie!";
    }
    gameState = GAME_OVER;
    myOutputMessage = myOutputMessage + firstRoundOutcome;
    return myOutputMessage;
  }
  if (gameState === GAME_OVER) {
    myOutputMessage = "Game over! Please refresh the page to restart the game.";
  }
  return myOutputMessage;
};
