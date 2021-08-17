//to generate deck
var makeDeck = function () {
  var cardDeck = [];
  var suits = ["Hearts", "Diamonds", "Clubs", "Spades"];

  //loop over suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      var valueCard = rankCounter;
      if (cardName == 1) {
        cardName = "Ace";
        valueCard = 11;
      } else if (cardName == 11) {
        cardName = "Jack";
        valueCard = 10;
      } else if (cardName == 12) {
        cardName = "Queen";
        valueCard = 10;
      } else if (cardName == 13) {
        cardName = "King";
        valueCard = 10;
      }
      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: valueCard,
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
var shuffleCards = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};
//to store card value on player hand
var playerHand = [];

//to store card value of dealer hand
var dealerHand = [];

//game modes:
var dealTwoCards = "dealTwoCards";
var actionHitStand = "actionHitStand";

//initialise game mode to start with dealing two cards
var gameMode = dealTwoCards;

//to store player and dealer points eg combination of 2 cards give how many points
var playerPoints = 0;
var dealerPoints = 0;

//to store player and dealer score
var playerWins = 0;
var dealerWins = 0;

//keep track whether player bets already or not
var trackBet = false;

//to store player betting points
var gamePoints = 100;

//to store player bets temporarily
var playerBet = 0;

//to store player and dealer last action
var playerLastAction = "";
var dealerLastAction = "";
var handPoints = function (hand) {
  var score = 0;
  for (var i = 0; i < hand.length; i++) {
    score += hand[i].value;
  }
  return score;
};

// If player or dealer deals ACE card
var aceCards = function (hand) {
  handValue = handPoints(hand);
  for (var i = 0; i < hand.length; i++) {
    if (hand[i].name == "ace" && handValue > 21) {
      hand[i].value = 1;
      handValue -= 10;
    }
  }
  return hand, handValue;
};
// Compare player and dealer scores
var compareScores = function (playerPoints, dealerPoints) {
  var returnStringFinal = "";
  var returnStringPlayer = "You have drawn ";
  for (var i = 0; i < playerHand.length; i++) {
    if (i == playerHand.length - 1) {
      returnStringPlayer +=
        " and " + playerHand[i].name + " of " + playerHand[i].suit;
    } else {
      returnStringPlayer += playerHand[i].name + " of " + playerHand[i].suit;
    }
    if (playerHand.length > 2 && i < playerHand.length - 2) {
      returnStringPlayer += ", ";
    }
  }
  returnStringPlayer += "<br><br>";
  var returnStringDealer = "Dealer has drawn ";
  for (var i = 0; i < dealerHand.length; i++) {
    if (i == dealerHand.length - 1) {
      returnStringDealer +=
        " and " + dealerHand[i].name + " of " + dealerHand[i].suit;
    } else {
      returnStringDealer += dealerHand[i].name + " of " + dealerHand[i].suit;
    }
    if (dealerHand.length > 2 && i < dealerHand.length - 2) {
      returnStringDealer += ", ";
    }
  }
  returnStringDealer += "<br><br>";
  if (playerLastAction == "stand" && dealerLastAction == "stand") {
    var returnStringWinner = "It's a tie!";
    if (playerPoints > dealerPoints) {
      gamePoints += playerBet * 2;
      returnStringWinner = "You won!";
    } else if (playerPoints < dealerPoints) {
      returnStringWinner = "You lost!";
    }
    returnStringFinal +=
      returnStringPlayer +
      returnStringDealer +
      "Your points: " +
      playerPoints +
      "<br>Dealer points: " +
      dealerPoints +
      "<br><br>" +
      returnStringWinner;
  }
  //if player/dealer scores 21 or busts
  // if player gets 21 points, player wins
  else if (playerPoints == 21 && dealerPoints != 21) {
    // player instant win
    gamePoints += playerBet * 2;
    returnStringFinal +=
      returnStringPlayer + "You won! Current points:" + playerPoints;
  }
  //if dealer gets 21 points, dealer wins
  else if (dealerPoints == 21 && playerPoints != 21) {
    returnStringFinal +=
      returnStringDealer + "You lost! Current points:" + playerPoints;
  }
  //BUSTS
  else if (dealerPoints > 21) {
    gamePoints += playerBet * 2;
    returnStringFinal +=
      "Dealer busts. " +
      returnStringPlayer +
      returnStringDealer +
      "You won!" +
      "<br><br>" +
      "Your points: " +
      playerPoints +
      "<br><br>" +
      "Dealer points: " +
      dealerPoints;
  } else if (playerPoints > 21) {
    returnStringFinal +=
      "You bust." +
      returnStringPlayer +
      returnStringDealer +
      "You lost!" +
      "<br><br>" +
      "Your points: " +
      playerPoints +
      "<br><br>" +
      "Dealer points: " +
      dealerPoints;
  } else if (playerPoints < 21 && dealerPoints < 21) {
    gameMode = actionHitStand;
    return (
      returnStringPlayer +
      "Current points:" +
      playerPoints +
      "<br><br>Hit or Stand?"
    );
  }
  gameMode = dealTwoCards;
  trackBet = false;
  return (
    returnStringFinal +
    "<br><br>You have " +
    gamePoints +
    " game points!<br><br>Press 'Submit' to play again!"
  );
};
var shuffledDeck;
var main = function (input) {
  var returnString = "";
  if (gameMode == dealTwoCards) {
    if (input == "") {
      console.log("Empty hands!");
      playerHand = [];
      dealerHand = [];
      playerPoints = 0;
      dealerPoints = 0;
      if (trackBet) {
        playerLastAction = "hit";
        dealerLastAction = "hit";
        shuffledDeck = shuffleCards(makeDeck());
        console.log("Start new game, deal two cards!");
        for (i = 0; i < 2; i++) {
          playerHand.push(shuffledDeck.pop());
          dealerHand.push(shuffledDeck.pop());
        }
      }
      console.log("dealer:", dealerHand);
      console.log("player:", playerHand);
    }
    if (!trackBet) {
      if (gamePoints == 0) {
        gameMode = dealTwoCards;
        gamePoints += 100;
        returnString +=
          "You don't have any game points.<br><br>Press 'Submit' to earn 100 game points for FREEEE!";
      } else if (input <= gamePoints && input > 0) {
        gamePoints -= input;
        playerBet = input;
        returnString +=
          "Your Bet: " +
          playerBet +
          "<br>Your Remaining Game Points: " +
          gamePoints +
          "<br><br>Press 'Submit' to start the game!";
        trackBet = true;
      } else if (input > gamePoints || input < 0) {
        returnString +=
          "Your Game Points: " +
          gamePoints +
          "<br>Bet is invalid! Please enter a valid bet amount to start the game!";
      } else {
        returnString +=
          "Your Game Points: " +
          gamePoints +
          "<br>Please enter a bet to start the game!";
      }
    }
  } else if (
    (input.toLowerCase() == "hit" || input.toLowerCase() == "stand") &&
    gameMode == actionHitStand
  ) {
    // player choose stand
    if (input.toLowerCase() == "stand") {
      playerLastAction = "stand";
      returnString += "You stand!<br><br>";
    }
    // player choose hit
    else if (input.toLowerCase() == "hit") {
      playerLastAction = "hit";
      playerHand.push(shuffledDeck.pop());
      playerPoints = handPoints(playerHand);
      returnString += "You hit!<br><br>";
    }
    // dealer draws if points less than 17
    if (dealerPoints < 17) {
      dealerLastAction = "hit";
      dealerHand.push(shuffledDeck.pop());
      dealerPoints = handPoints(dealerHand);
      returnString += "Dealer hits!<br><br>";
    } else {
      dealerLastAction = "stand";
      returnString += "Dealer stands!<br><br>";
    }
  } else if (gameMode == actionHitStand) {
    returnString += "Please decide to hit or stand!<br><br>";
  }
  if (playerHand.length > 0 && dealerHand.length > 0 && trackBet) {
    playerHand, (playerPoints = aceCards(playerHand));
    dealerHand, (dealerPoints = aceCards(dealerHand));
    returnString += compareScores(playerPoints, dealerPoints);
  }
  return returnString;
};
