var humanPlayerCards = [];
var computerDealerCards = [];
var humanPlayerScore = 0;
var computerDealerScore = 0;
var allPlayerHands = [];
var gameStarted = false;

// create a new deck of cards
var buildDeck = function () {
  // 3 properties of the object
  // 1: suit (4 types)
  // 2: rank (1-13)
  // 3: name (13 types)
  var suits = ["Diamonds", "Clubs", "Hearts", "Spades"];
  var cardDeck = [];
  var suitCounter = 0;
  var cardName = "";
  while (suitCounter < suits.length) {
    //set suit
    var currentSuit = suits[suitCounter];

    // set rank and name
    var rankCounter = 1;
    var currentRank = 1;
    var cardValue = 1;
    while (rankCounter <= 13) {
      currentRank = rankCounter;
      if (rankCounter == 11) {
        cardName = "Jack";
        cardValue = 10;
      } else if (rankCounter == 12) {
        cardName = "Queen";
        cardValue = 10;
      } else if (rankCounter == 13) {
        cardName = "King";
        cardValue = 10;
      } else if (rankCounter == 1) {
        cardName = "Ace";
        cardValue = 1;
      } else {
        cardName = currentRank;
        cardValue = currentRank;
      }

      //create a new card
      var singleCard = {
        suit: currentSuit,
        rank: currentRank,
        name: cardName,
        pointValue: cardValue,
      };
      cardDeck.push(singleCard);
      rankCounter += 1;
    }
    suitCounter += 1;
  }
  return cardDeck;
};

// function to shuffle a new deck
var shuffleDeck = function () {
  var cardDeck = buildDeck();
  for (var i = 1; i < cardDeck.length; i++) {
    var j = Math.floor(Math.random() * 52);
    var currentCard = cardDeck[i];
    var randomCard = cardDeck[j];
    cardDeck[i] = randomCard;
    cardDeck[j] = currentCard;
  }
  return cardDeck;
};

//get a shuffled deck
var freshShuffledDeck = shuffleDeck();
// needs to be global variable because might need to add to hand

//evaluate to see who actually won the game (if there was no blackjack win condition)
var gameEvaluation = function (playerScore, computerScore) {
  //point message that gets reused a lot
  var pointMessage = `Your total points: ${playerScore}<br>
    Dealer's total points: ${computerScore}<br><br>`;

  //if anyone goes above 21, they lose
  if (playerScore > 21 && computerScore < 21) {
    return `You lose because you bust your hand.<br><br>` + pointMessage;
  } else if (computerScore > 21 && playerScore < 21) {
    return (
      `You win! The dealer lost as they bust their hand.<br><br>` + pointMessage
    );
  } else if (computerScore > 21 && playerScore > 21) {
    return `It's a tie -- you both bust.<br><br>` + pointMessage;
  } else if (playerScore > computerScore) {
    return `You win!<br><br>` + pointMessage;
  } else if (playerScore < computerScore) {
    return `You lose :( <br><br>` + pointMessage;
  } else {
    return `It was a tie <br><br>` + pointMessage;
  }
};

//evaluates a player's hand to return their total number of points
var evaluateHand = function (playerHand) {
  var handIndex = 0;
  var sumPoints = 0;

  //blackjack can only be won with 2 cards
  if (playerHand.length == 2) {
    //check for blackjack
    if (playerHand[0].name == "Ace" || playerHand[1].name == "Ace") {
      // add 10 since in order to win by blackjack, the ace must be considered an "11"
      sumPoints = playerHand[0].pointValue + playerHand[1].pointValue + 10;
      if (sumPoints == 21) {
        return "blackjack";
      } else {
        // no blackjack, but counted the ace as an "11"
        return sumPoints;
      }
    }
    // no ace
    sumPoints = playerHand[0].pointValue + playerHand[1].pointValue;
    return sumPoints;
  }

  // to evaluate hands larger than 2 cards
  while (handIndex < playerHand.length) {
    //get cards
    if (playerHand[handIndex].name == "Ace") {
      sumPoints += 10;
    }
    sumPoints += playerHand[handIndex].pointValue;
    handIndex += 1;
  }
  handIndex = 0;

  //check if user busted because we chose to represent their ace as "11", if so, treat as "ace"
  if (sumPoints > 21) {
    for (var i = 0; i < playerHand.length; i++) {
      //don't minus any more points if there was more than one ace contributing to the 11 and the user is no longer in a "bust" position
      if (sumPoints > 21) {
        if (playerHand[i].name == "Ace") {
          sumPoints = sumPoints - 10;
        }
      } else {
        return sumPoints;
      }
    }
  }

  return sumPoints;
};

//just to get the cards currently in each player's hand
var printHandsMessage = function (playerHand, computerHand) {
  var playerIndex = 0;
  var cardsHeld = "<i>These were the cards in your hand</i>:<br>";
  while (playerIndex < playerHand.length) {
    cardsHeld += `${playerHand[playerIndex].name} of ${playerHand[playerIndex].suit}<br>`;
    playerIndex += 1;
  }
  var computerHeld = "<i>These were the cards the Dealer had</i>:<br>";
  var dealerIndex = 0;
  while (dealerIndex < computerHand.length) {
    computerHeld += `${computerHand[dealerIndex].name} of ${computerHand[dealerIndex].suit}<br>`;
    dealerIndex += 1;
  }
  return cardsHeld + "<br>" + computerHeld;
};

var dealPlayerCard = function () {
  humanPlayerCards.push(freshShuffledDeck.pop());
  return humanPlayerCards;
};

var dealComputerCard = function () {
  computerDealerCards.push(freshShuffledDeck.pop());
  return computerDealerCards;
};

// single player mode
var initiateBlackJack = function () {
  // Step 1: deal cards
  // human gets card first
  dealPlayerCard();
  //dealer gets next card
  dealComputerCard();

  // Step 2: human player gets second card, and so does computer
  dealPlayerCard();
  dealComputerCard();

  //start evaluating current standing
  humanPlayerScore = evaluateHand(humanPlayerCards);
  computerDealerScore = evaluateHand(computerDealerCards);

  //Exception cases: either player got blackjack, game ends immediately
  if (humanPlayerScore == "blackjack") {
    return (
      `You win with Blackjack!<br><br>` +
      printHandsMessage(humanPlayerCards, computerDealerCards)
    );
  }
  if (computerDealerScore == "blackjack") {
    return (
      `You lose as the dealer won with a Blackjack!<br><br>` +
      printHandsMessage(humanPlayerCards, computerDealerCards)
    );
  }

  // Unless someone got blackjack, return the current hands
  allPlayerHands.push(humanPlayerCards, computerDealerCards);

  return allPlayerHands;
};

var main = function (input) {
  //make sure we only deal the cards once
  if (gameStarted == false) {
    initiateBlackJack();
    gameStarted = true;
  }

  //get state of current hands
  var currentHands = function () {
    return (
      `The current hands are as follows:<br><br>` +
      printHandsMessage(humanPlayerCards, computerDealerCards)
    );
  };

  // Ask user if they want to hit or stand?
  var hitStandMessage = `<br><i>Would you like another card?</i><br>Input "<b>hit</b>" if you would like to be dealt another card, or "<b>stand</b>" if you would like to keep your current hand.`;
  var resetMessage = `<br><br>If you would like to play again, enter "<b>reset</b>" to shuffle the deck and deal new cards.`;

  var finalReturn = currentHands() + hitStandMessage;

  // Evaluate user input for hit or stand
  if (input == "stand") {
    //keep the score
    humanPlayerScore = evaluateHand(humanPlayerCards);
    computerDealerScore = evaluateHand(computerDealerCards);

    //if dealer has < 17 points, must draw another card (until above 17)
    while (computerDealerScore < 17) {
      dealComputerCard();
      computerDealerScore = evaluateHand(computerDealerCards);
    }

    finalReturn =
      gameEvaluation(humanPlayerScore, computerDealerScore) +
      printHandsMessage(humanPlayerCards, computerDealerCards) +
      resetMessage;
  } else if (input == "hit") {
    // deal player one more card
    dealPlayerCard();
    // re-calculate scores
    humanPlayerScore = evaluateHand(humanPlayerCards);
    computerDealerScore = evaluateHand(computerDealerCards);

    // if user busts out, reflect message and end game
    if (humanPlayerScore > 21) {
      return (
        gameEvaluation(humanPlayerScore, computerDealerScore) +
        printHandsMessage(humanPlayerCards, computerDealerCards) +
        resetMessage
      );
    }
    finalReturn = currentHands() + hitStandMessage + resetMessage;
  } else if (input == "reset") {
    finalReturn =
      "We've shuffled the cards, hit submit to start playing with the fresh deck.";
    //reset all values to reset the game
    humanPlayerCards = [];
    gameStarted = false;
    computerDealerCards = [];
    humanPlayerScore = 0;
    computerDealerScore = 0;
    allPlayerHands = [];
  }
  return finalReturn;
};
