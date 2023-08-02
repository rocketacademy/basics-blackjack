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

//create a card deck (helper function)
var createDeck = function () {
  var deck = []; //array for the card deck

  // 4 suits
  var suits = [HEARTS, DIAMONDS, SPADES, CLUBS];
  //create a loop so for each suit there's 13 cards of different rank
  var suitsCounter = 0;
  while (suitsCounter < 4) {
    var currentSuit = suits[suitsCounter];
    var rankCounter = 1;
    while (rankCounter <= 13) {
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

      deck.push(card);
      rankCounter = rankCounter + 1;
    }

    suitsCounter = suitsCounter + 1;
  }
  return deck;
};

//Get a random number for shuffling the deck
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the deck (helper function)
var shuffleCards = function (deck) {
  //we need to swap the current card with a random card
  var currentIndex = 0;
  while (currentIndex < deck.length) {
    var randomIndex = getRandomIndex(deck.length);

    var currentCard = deck[currentIndex];
    var randomCard = deck[randomIndex];

    deck[currentIndex] = randomCard;
    deck[randomIndex] = currentCard;

    currentIndex = currentIndex + 1;
  }
  return deck;
};
//Check if any of the players has a blackjack (helper function)
var checkForBlackjack = function (playerHand) {
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
  var aceCounter = 0;
  while (playerHandIndex < playerHand.length) {
    var newCard = playerHand[playerHandIndex];
    //all picture cards value has to be changed to 10:
    if (
      newCard.name === "jack" ||
      newCard.name === "queen" ||
      newCard.name === "king"
    ) {
      newCard.rank = 10;
      totalHandValue = totalHandValue + newCard.rank;
    } else if (newCard.name === "ace") {
      newCard.rank = 11;
      totalHandValue = totalHandValue + newCard.rank;

      aceCounter = aceCounter + 1;
    } else {
      totalHandValue = totalHandValue + newCard.rank;
    }

    playerHandIndex = playerHandIndex + 1;
  }
  var index = 0;
  while (index < aceCounter) {
    if (totalHandValue > 21) {
      totalHandValue = totalHandValue - 10;
    }
    index = index + 1;
  }
  return totalHandValue;
};
//display the hands value (helper function)
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

//show the game outcome (helper function)
var showGameResult = function () {
  var totalPlayerScore = calculateTotalHandValue(playerHand);
  var totalDealerScore = calculateTotalHandValue(dealerHand);

  var myOutputMessage =
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
    "<br>" +
    "<br>";
  var gameOutcome = "";
  // a tie
  if (totalDealerScore === totalPlayerScore) {
    //blackjack tie
    if (totalPlayerScore === 21) {
      gameOutcome = "Wooow! Both Player and Dealer got blackjack! It's a tie!";
    } //bust tie
    else if (totalPlayerScore > 21) {
      gameOutcome = "Oops! Both Player and Dealer busted! It's a tie!";
    } //regular tie
    else {
      gameOutcome = "Both dealer and player got same score! It's a tie!";
    }
    return myOutputMessage + gameOutcome;
  }

  // blackjack but not a tie:
  //1) blackjack + bust
  //2) just blackjack
  if (totalPlayerScore === 21) {
    if (totalDealerScore > 21) {
      gameOutcome = "What a game: Player got Blackjack and Dealer busts!";
    }
    if (totalDealerScore < 21) {
      gameOutcome = "Looks like Player got Blackjack! They win!";
    }
  }
  if (totalDealerScore === 21) {
    if (totalPlayerScore > 21) {
      gameOutcome = "What a game: Dealer got Blackjack and Player busts!";
    }

    //non-blackjack wins and non-bust losses
    if (totalPlayerScore < 21) {
      gameOutcome = "Looks like Dealer got Blackjack! They win!";
    }
  }

  if (totalPlayerScore < 21) {
    if (totalDealerScore > 21) {
      gameOutcome = "Bad luck for Dealer: he busts! Player wins!";
    }

    if (totalPlayerScore > totalDealerScore) {
      gameOutcome = "YAAY! Player wins!";
    }
  }

  if (totalDealerScore < 21) {
    if (totalPlayerScore > 21) {
      gameOutcome = "Oh no! Player busts! Dealer wins!";
    }
    if (totalDealerScore > totalPlayerScore) {
      gameOutcome = "Sorry, Player, you lose! Dealer wins!";
    }
  }
  myOutputMessage = myOutputMessage + gameOutcome;
  return myOutputMessage;
};

//MAIN FUNCTION:
//Game mode = GAME_START
//Deal the cards:
//Player gets 2 cards
//Computer gets 2 cards

var main = function (input) {
  var cardDeck = shuffleCards(createDeck());
  var myOutputMessage = "";
  if (gameState === GAME_START) {
    index = 0;
    while (index < 2) {
      playerHand.push(cardDeck.pop());

      dealerHand.push(cardDeck.pop());

      index = index + 1;
    } //cards are dealt

    myOutputMessage =
      "Player's hand: " +
      displayPlayerHand(playerHand) +
      "<br>" +
      "<br>" +
      "One card in Dealer's hand: " +
      dealerHand[0].name +
      " of " +
      dealerHand[0].suit +
      "<br>" +
      "<br>" +
      "Now please click 'Submit' again to continue the game.";
    gameState = CHECK_FOR_BLACKJACK;
    //once the cards are dealt, change the game state
    return myOutputMessage;
  }

  if (gameState === CHECK_FOR_BLACKJACK) {
    //show the cards in the output message
    var blackjackInFirstHand = "";

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

    var dealerHasBlackjack = checkForBlackjack(dealerHand);

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

      myOutputMessage =
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
        "Dealer's score: " +
        calculateTotalHandValue(dealerHand) +
        "<br>" +
        "<br>" +
        blackjackInFirstHand;
      gameState = GAME_OVER;
    } else {
      gameState = HIT_OR_STAND;

      myOutputMessage =
        "Please key in 'hit' if you'd like to draw one card or 'stand' if you think you got enough.";
    }
    return myOutputMessage;
  }
  //add hit or stand for player
  //the player can key in hit to draw one more card or stand to refrain from drawing
  if (gameState === HIT_OR_STAND) {
    //validate input:
    if (input !== "hit" && input !== "stand") {
      var errorMessage =
        "Oops, something went wrong! Please input either 'hit' or 'stand' to continue the game!";
      return errorMessage;
    }
    if (input === "hit") {
      playerHand.push(cardDeck.pop());

      var lastPlayerCardIndex = playerHand.length - 1;
      var newPlayerCard =
        playerHand[lastPlayerCardIndex].name +
        " of " +
        playerHand[lastPlayerCardIndex].suit;
      myOutputMessage =
        "Player drew a " +
        newPlayerCard +
        "<br>" +
        "<br>" +
        "Player's hand: " +
        displayPlayerHand(playerHand) +
        "<br>" +
        "Player's score: " +
        calculateTotalHandValue(playerHand) +
        "<br>" +
        "<br>" +
        "One card in Dealer's hand: " +
        dealerHand[0].name +
        " of " +
        dealerHand[0].suit +
        "<br>" +
        "<br>" +
        "Please key in 'hit' if you'd like to draw one card or 'stand' if you think you got enough. ";
      return myOutputMessage;
    } else {
      var dealerHandValue = calculateTotalHandValue(dealerHand);
      while (dealerHandValue < 17) {
        dealerHand.push(cardDeck.pop());
        dealerHandValue = calculateTotalHandValue(dealerHand);
      }
      gameState = COMPARE_HAND_VALUES;

      myOutputMessage = "Please click 'Submit' to see the game result.";
      return myOutputMessage;
    }
  }
  if (gameState === COMPARE_HAND_VALUES) {
    gameState = GAME_OVER;
    return showGameResult();
  }
  if (gameState === GAME_OVER) {
    myOutputMessage = "Game over! Please refresh the page to restart the game.";
  }
  return myOutputMessage;
};
