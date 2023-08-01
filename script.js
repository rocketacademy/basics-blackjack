//There will be only two players. One human and one computer (for the Base solution).
// The computer will always be the dealer.
// Each player gets dealt two cards to start.
// The player goes first, and decides if they want to hit (draw a card) or stand (end their turn).
// The dealer has to hit if their hand is below 17.
// Each players' score is the total of their card ranks. Jacks/Queen/Kings are 10. Aces can be 1 or 11.
// The player who is closer to, but not above 21 wins the hand.

//Clobal variables

var GAME_START = "start the game";
var COMPARE_FIRST_HAND_VALUES = "compare the first hand values";
var CHECK_FOR_BLACKJACK = "check if any player got blackjack";
var GAME_OVER = "game over";
var gameState = GAME_START;
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
//Game mode = GAME_START
//4. Deal the cards:
//Player gets 2 cards
//Computer gets 2 cards

var main = function (input) {
  var myOutputMessage = "";

  var cardDeck = shuffleCards(createDeck());
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
    myOutputMessage =
      "The cards have been dealt. " +
      "<br>" +
      "<br>" +
      "You got a " +
      playerHand[0].name +
      " of " +
      playerHand[0].suit +
      " and a " +
      playerHand[1].name +
      " of " +
      playerHand[0].suit +
      "." +
      "<br>" +
      "<br>" +
      "One of the cards in Dealer's hand is a " +
      dealerHand[0].name +
      " of " +
      dealerHand[0].suit +
      "." +
      "<br>" +
      "<br>" +
      "Now please click 'Submit' again to see the game outcome.";

    //once the cards are dealt, change the game state
    return myOutputMessage;
  }

  if (gameState === CHECK_FOR_BLACKJACK) {
    //show the cards in the output message
    myOutputMessage =
      "You got a " +
      playerHand[0].name +
      " of " +
      playerHand[0].suit +
      " and a " +
      playerHand[1].name +
      " of " +
      playerHand[0].suit +
      "." +
      "<br>" +
      "<br>" +
      "One of the cards in Dealer's hand is a " +
      dealerHand[0].name +
      " of " +
      dealerHand[0].suit +
      "." +
      "<br>" +
      "<br>";
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
      myOutputMessage = myOutputMessage + blackjackInFirstHand;
      gameState = GAME_OVER;
      return myOutputMessage;
    } else {
      gameState = COMPARE_FIRST_HAND_VALUES;
    }
  }

  if (gameState === COMPARE_FIRST_HAND_VALUES) {
    gameState = GAME_OVER;
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
    myOutputMessage = myOutputMessage + firstRoundOutcome;
    return myOutputMessage;
  }
  if (gameState === GAME_OVER) {
    myOutputMessage = "Game over! Please refresh the page to restart the game.";
  }
  return myOutputMessage;
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

//6. calculate the total hand value (helper function)
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
