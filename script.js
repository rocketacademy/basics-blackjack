// ################ MAKE DECK ################
function makeDeck() {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["spades", "hearts", "clubs", "diamonds"];

  // Loop over the suits array
  for (suitIndex = 0; suitIndex < suits.length; suitIndex++) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    for (rankCounter = 1; rankCounter <= 13; rankCounter++) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;
      var cardValue = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name and set cardValue accordingly
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
        cardValue = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        cardValue = 10;
      } else if (cardName == 13) {
        cardName = "king";
        cardValue = 10;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: cardValue,
      };

      // Add the new card to the deck
      cardDeck.push(card);
    }
  }

  // Return the completed card deck
  return cardDeck;
}

// ================ randomiser ================
function randomiser(max) {
  return Math.floor(Math.random() * max);
}

// ################ SHUFFLE DECK ################
function shuffleCards(cardDeck) {
  // Loop over the card deck array once
  for (index in cardDeck) {
    //(i = 0; i < cardDeck.length; i++) {
    // Select a random index in the deck
    var randomIndex = randomiser(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[index];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[index] = randomCard;
    cardDeck[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return cardDeck;
}

// ################ HAND POINTS ################
function handPoints(hand) {
  var totalPoints = 0;

  // ---------- TOTAL POINTS ----------
  for (const card of hand) {
    totalPoints += card.value;
  }

  //  --------- ACE CHECKER ----------
  for (const aceChecker of hand) {
    if (aceChecker.name == "ace") {
      if (totalPoints <= 11) {
        totalPoints += 10;
      }
    }
  }

  return totalPoints;
}

// ################ START MODE ################
function initialDeal(playerPoints, dealerPoints, deck) {
  for (i = 0; i < 2; i++) {
    playerHand.push(deck.pop());
    dealerHand.push(deck.pop());
  }

  // count points
  playerPoints = handPoints(playerHand);
  dealerPoints = handPoints(dealerHand);

  // BANLUCK
  if (
    playerPoints == 21 &&
    dealerPoints != 21
    // || (playerHand[0].name == "ace" && playerHand[1].name == "ace")
  ) {
    // player instant win
    myOutputValue = `You have drawn<br><br>${playerHand[0].name} of ${playerHand[0].suit}<br>${playerHand[1].name} of ${playerHand[1].suit}<br><br>Your current points is ${playerPoints}<br>You won! Press 'Submit' to play again.`;
    return myOutputValue;
  }

  // change mode
  mode = "draw";

  myOutputValue = `You have drawn<br><br>${playerHand[0].name} of ${playerHand[0].suit}<br>${playerHand[1].name} of ${playerHand[1].suit}<br><br>Your current points is ${playerPoints}<br>Hit or stand?`;

  return myOutputValue;
}

// ################ WINNER CHECK ##################
function winnerCheck(playerPoints, dealerPoints) {
  // compare scores
  var playerScoreDiff = 0;
  var dealerScoreDiff = 0;
  myOutputValue = `You had ${playerPoints}. Dealer had ${dealerPoints}.`;

  // check score diff
  if (playerPoints != 21) {
    playerScoreDiff = Math.abs(playerPoints - 21);
  }
  if (dealerPoints != 21) {
    dealerScoreDiff = Math.abs(dealerPoints - 21);
  }

  // announce winner
  if (playerPoints == 21 || playerScoreDiff < dealerScoreDiff) {
    playerWins += 1;
    myOutputValue += `<br>You win! <br>Press 'Submit' to play again. <br><br>Player wins: ${playerWins}<br>Dealer wins: ${dealerWins}`;
  } else {
    dealerWins += 1;
    myOutputValue += `<br>Dealer wins! <br>Press 'Submit' to play again. <br><br>Player wins: ${playerWins}<br>Dealer wins: ${dealerWins}`;
  }
  return myOutputValue;
}

// ################ GLOBAL VAR ################
var deck = makeDeck();
var playerHand = [];
var dealerHand = [];
var mode = "start";
var playerPoints = 0;
var dealerPoints = 0;
var playerWins = 0;
var dealerWins = 0;
var stand;

// ################ MAIN FUNCTION ################
var main = function (input) {
  var myOutputValue = "";
  var shuffledDeck = shuffleCards(deck);

  if (mode == "start") {
    // reset hand and points
    playerHand = [];
    dealerHand = [];
    playerPoints = 0;
    dealerPoints = 0;

    return initialDeal(playerPoints, dealerPoints, shuffledDeck);
  }
  if (mode == "draw") {
    myOutputValue = `Your current points is ${playerPoints}<br>Hit or stand?`;

    // -------------------- STAND --------------------
    if (input.toLowerCase() == "stand" || stand == "forced") {
      stand = "";
      // dealer draws AFTER player stands if points less than 17
      for (j = 0; j < 3; j++) {
        if (dealerPoints < 17) {
          dealerHand.push(shuffledDeck.pop());
          dealerPoints = handPoints(dealerHand);
        }
      }
      playerPoints = handPoints(playerHand);
      var winner = winnerCheck(playerPoints, dealerPoints);
      mode = "start";
      return winner;

      // // compare scores
      // var playerScoreDiff = 0;
      // var dealerScoreDiff = 0;
      // myOutputValue = `You had ${playerPoints}. Dealer had ${dealerPoints}.`;

      // // check score diff
      // if (playerPoints != 21) {
      //   playerScoreDiff = Math.abs(playerPoints - 21);
      // }
      // if (dealerPoints != 21) {
      //   dealerScoreDiff = Math.abs(dealerPoints - 21);
      // }

      // // announce winner
      // if (playerPoints == 21 || playerScoreDiff < dealerScoreDiff) {
      //   playerWins += 1;
      //   myOutputValue += `<br>You win! <br>Press 'Submit' to play again. <br><br>Player wins: ${playerWins}<br>Dealer wins: ${dealerWins}`;
      // } else {
      //   dealerWins += 1;
      //   myOutputValue += `<br>Dealer wins! <br>Press 'Submit' to play again. <br><br>Player wins: ${playerWins}<br>Dealer wins: ${dealerWins}`;
      // }
      // mode = "start";
      // return myOutputValue;
    }

    // -------------------- HIT --------------------
    if (input.toLowerCase() == "hit") {
      var playerCards = "You have drawn<br><br>";

      // cannot draw more than 5 cards
      if (playerHand.length != 5) {
        playerHand.push(shuffledDeck.pop());
      } else {
        stand = "forced";
        myOutputValue =
          "You cannot draw more than 5 cards.<br>Press 'Submit' to see if you've won.";
        return myOutputValue;
      }

      // ---------- PLAYER POINTS ----------
      playerPoints = handPoints(playerHand);

      for (k = 0; k < playerHand.length; k++) {
        playerCards += `${playerHand[k].name} of ${playerHand[k].suit}<br>`;
      }
      myOutputValue = `${playerCards}<br>Your current points is ${playerPoints}<br>Hit or stand?`;
    }
    return myOutputValue;
  }
};
