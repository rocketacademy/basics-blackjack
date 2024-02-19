//This ia a game of Blacjack!
//Assumes two users, player vs. dealer
//Allows player and dealer to hit or stand
//Calculates Blackjack win

//2 users; player vs. dealer (computer)
var player = "Player";
var dealer = "Dealer";
var playerHand = [];
var dealerHand = [];
var gameDeck = [];

//Modes to run the game
//1) Start game, 2) Calculate cards, 3) Player decides hit or stand, 4) Show results
var modeGameStart = "start game";
var modeCalculateValues = "calculate values of cards";
var modePlayerHitStand = "player hit or stand";
var modeShowResults = "show results";

//Start the game
var currentGameMode = modeGameStart;

//<----- DECK FUNCTIONS ----->

//Function to create a deck of cards
var createDeck = function () {
  var suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
  var ranks = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A",
  ];
  var deck = [];

  for (var suitIndex = 0; suitIndex < suits.length; suitIndex++) {
    for (var rankIndex = 0; rankIndex < ranks.length; rankIndex++) {
      var card = {
        rank: ranks[rankIndex],
        suit: suits[suitIndex],
      };

      //Assign value to the card
      if (
        ranks[rankIndex] === "J" ||
        ranks[rankIndex] === "Q" ||
        ranks[rankIndex] === "K"
      ) {
        card.value = 10;
      } else if (ranks[rankIndex] === "A") {
        card.value = 11;
      } else {
        card.value = parseInt(ranks[rankIndex]);
      }

      deck.push(card);
    }
  }

  return deck;
};

//Function to shuffle deck that is created by swapping card's position with another card in the deck, loops through the entire deck until all cards are shuffled

var shuffleDeck = function (shuffle) {
  // n is defined as the number of cards in the deck
  var n = shuffle.length;
  while (n > 1) {
    // Generate a random index between 0 and n (n > 1 so that while loop continues as long as n is greater than 1)
    // Math.random times n gives random number between 0 (inclusive) and n (exclusive), Math.floor to round down to integer
    //Then, n-- decrements the value of n after it's been used, ensuring that the random index will always be between 0 and n-1.
    var randomIndex = Math.floor(Math.random() * n--);
    //Temporarily stores the card at position 'n'
    var temp = shuffle[n];
    //Swap the current card with the card at the random index
    shuffle[n] = shuffle[randomIndex];
    shuffle[randomIndex] = temp;
  }
  return shuffle;
};

//Function to create AND shuffle deck
var prepareDeck = function () {
  var myDeck = createDeck();
  var shuffledDeck = shuffleDeck(myDeck);
  return shuffledDeck;
};

//Function to deal cards
//Use pop to hand out cards from deck (gameDeck)
//Use push to add to respective arrays (hand)
var dealCards = function (hand, numCards) {
  for (var i = 0; i < numCards; i++) {
    hand.push(gameDeck.pop());
  }
};

//<----- GAME FUNCTIONS ----->

//Check for Blackjack scenario first, because if player or dealer has Blackjack, automatically wins the game
var checkForBlackjack = function (handArray) {
  var userCardOne = handArray[0];
  var userCardTwo = handArray[1];
  var isBlackjack = false;

  var isTenCard = function (rank) {
    return rank === "10" || rank === "J" || rank === "Q" || rank === "K";
  };

  if (
    (userCardOne.rank === "A" && isTenCard(userCardTwo.rank)) ||
    (userCardTwo.rank === "A" && isTenCard(userCardOne.rank))
  ) {
    isBlackJack = true;
  }
  return isBlackjack;
};

//Calculate total value of hand
//Ace has assigned value of 11 unless total score becomes > 21, then assume value of 1

var calculateHandValue = function (handArray) {
  var handValue = 0;
  var hasAce = false;

  // Calculate the initial hand value
  for (var i = 0; i < handArray.length; i++) {
    var cardValue = handArray[i].value;
    handValue += cardValue;
    if (handArray[i].rank === "A") {
      hasAce = true;
    }
  }

  // If hand value exceeds 21 and there's an Ace, reduce Ace's value from 11 to 1
  if (handValue > 21 && hasAce) {
    handValue -= 10;
  }

  return handValue;
};

//Function to show player's hands and value
var displayPlayerHandValue = function (playerHandArray) {
  var playerHandMessage = "Player's hand:<br>";
  var playerValue = 0;

  // Loop through each card in the player's hand
  for (var i = 0; i < playerHandArray.length; i++) {
    var card = playerHandArray[i];
    playerHandMessage += `${card.rank} of ${card.suit}`;
    // Add emoji based on the suit
    if (card.suit === "Hearts") {
      playerHandMessage += "❤️";
    } else if (card.suit === "Diamonds") {
      playerHandMessage += "💎";
    } else if (card.suit === "Clubs") {
      playerHandMessage += "🍀";
    } else if (card.suit === "Spades") {
      playerHandMessage += "🧹";
    }
    playerHandMessage += "<br>";
    playerValue += card.value;
  }
  // Calculate total value of hand
  var playerValueMessage = `Player's value: ${playerValue}<br>`;

  return playerHandMessage + "<br>" + playerValueMessage + "<br>";
};

//Function to show dealer's hands and values
var displayDealerHandValue = function (dealerHandArray) {
  var dealerHandMessage = "Dealer's hand:<br>";
  var dealerValue = 0;

  // Loop through each card in the dealer's hand
  for (var i = 0; i < dealerHandArray.length; i++) {
    var card = dealerHandArray[i];
    dealerHandMessage += `${card.rank} of ${card.suit}`;
    // Add emoji based on the suit
    if (card.suit === "Hearts") {
      dealerHandMessage += " ❤️";
    } else if (card.suit === "Diamonds") {
      dealerHandMessage += "💎";
    } else if (card.suit === "Clubs") {
      dealerHandMessage += "🍀";
    } else if (card.suit === "Spades") {
      dealerHandMessage += "🧹";
    }
    dealerHandMessage += "<br>";
    dealerValue += card.value;
  }
  //Calculate total value of hand
  var dealerValueMessage = `Dealer's value: ${dealerValue}`;

  return dealerHandMessage + "<br>" + dealerValueMessage;
};

//<----- MAIN FUNCTION (YAY!) ----->

var main = function (input) {
  var outputMessage = "";

  // Check if user inputs "reset" to restart the game
  if (input.toLowerCase() === "reset") {
    // Reset all game variables to their initial values
    gameDeck = [];
    playerHand = [];
    dealerHand = [];
    currentGameMode = modeGameStart;

    // Inform the player that the game has been reset
    outputMessage = "Game has been reset. Please click to start a new game.";
    return outputMessage;
  }

  //Create and shuffle deck of cards
  if (currentGameMode === modeGameStart) {
    gameDeck = prepareDeck();
    //Deal cards
    dealCards(playerHand, 2);
    dealCards(dealerHand, 2);

    currentGameMode = modeCalculateValues;

    outputMessage =
      "Two cards have been dealt. Click again to view and evaluate your cards.";
    return outputMessage;
  }

  //Run cards for Blackjack first
  if (currentGameMode === modeCalculateValues) {
    var playerBlackjack = checkForBlackjack(playerHand);
    var dealerBlackjack = checkForBlackjack(dealerHand);
    var playerMessage = displayPlayerHandValue(playerHand);
    var dealerMessage = displayDealerHandValue(dealerHand);

    //console.log: check if either user has Blackjack
    console.log("Player hit Blackjack? " + playerBlackjack);
    console.log("Dealer hit Blackjack? " + dealerBlackjack);

    //if only player has Blackjack, player wins
    if (playerBlackjack && !dealerBlackjack) {
      outputMessage =
        playerMessage +
        dealerMessage +
        "<br> Player has Blackjack! Player wins!";
    }
    //if only dealer has Blackjack, dealer wins
    else if (!playerBlackjack && dealerBlackjack) {
      outputMessage =
        playerMessage +
        dealerMessage +
        "<br> Dealer has Blackjack! Dealer wins!";
    }
    //if both has Blackjack, it's a tie
    else if (playerBlackjack && dealerBlackjack) {
      outputMessage =
        playerMessage +
        dealerMessage +
        "<br> It's a tie! Both of dealer and player has Blackjack!";
    }

    //if neither has Blackjack, player will only get to view his cards to decide
    else {
      outputMessage =
        playerMessage +
        "<br> No one has Blackjack. The game continues! <br> Please input 'hit' for another card or else, input 'stand' to end your turn and see the results of this game.";
      currentGameMode = modePlayerHitStand;
    }
    return outputMessage;
  }

  //Let player decide to hit or stand
  if (currentGameMode === modePlayerHitStand) {
    input = input.toLowerCase();
    var playerMessage = displayPlayerHandValue(playerHand);
    if (input === "hit") {
      playerHand.push(gameDeck.pop());
      playerMessage = displayPlayerHandValue(playerHand);
      outputMessage =
        playerMessage +
        "<br> You drew another card.<br> Please input 'hit' for another card or else, input 'stand' to end your turn and see the results of this game.";
      return outputMessage;
    }
    //If player chooses to "stand", then dealer's turn to decide push or stand
    //Dealer to draw extra card if value is 16 and below
    else if (input === "stand") {
      while (calculateHandValue(dealerHand) <= 16) {
        dealerHand.push(gameDeck.pop());
        dealerMessage = displayDealerHandValue(dealerHand);
        //console.log check dealer's hand as of now
        console.log(dealerMessage);
      }
      //Once dealer's value is 17 or higher, the dealer stands
      currentGameMode = modeShowResults;
      var playerFinalValue = calculateHandValue(playerHand);
      var dealerFinalValue = calculateHandValue(dealerHand);
    }
  }
  //Check for bust (more than 21 in value)
  if (currentGameMode === modeShowResults) {
    var playerBust = playerFinalValue > 21;
    var dealerBust = dealerFinalValue > 21;

    // Check if both player and dealer bust
    if (playerBust && dealerBust) {
      return (
        "It's a tie! Both player and dealer bust.<br> Please input 'reset' to restart the game!<br><br>" +
        playerMessage +
        dealerMessage
      );
    } else if (playerBust) {
      return (
        "Dealer wins! Player busts. <br> Please input 'reset' to restart the game!<br><br>" +
        playerMessage +
        dealerMessage
      );
    } else if (dealerBust) {
      return (
        "Player wins! Dealer busts. <br> Please input 'reset' to restart the game!<br><br>" +
        playerMessage +
        dealerMessage
      );
    }
  }
  //Time to decide a winner!
  if (playerFinalValue == dealerFinalValue) {
    outputMessage =
      "It's a tie! Both player and dealer has the same value. <br> Please input 'reset' to restart the game!<br><br>" +
      playerMessage +
      dealerMessage;
  } else if (playerFinalValue < dealerFinalValue) {
    outputMessage =
      "Dealer wins! Dealer has a higher value than player. <br> Please input 'reset' to restart the game!<br><br>" +
      playerMessage +
      dealerMessage;
  } else {
    outputMessage =
      "Player wins! Player has a higher value than dealer. <br> Please input 'reset' to restart the game!<br>";
  }
};
