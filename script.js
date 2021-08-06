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

  for (const card of hand) {
    // -------------------- TOTAL POINTS --------------------
    totalPoints += card.value;
  }

  return totalPoints;
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

    for (i = 0; i < 2; i++) {
      playerHand.push(shuffledDeck.pop());
      dealerHand.push(shuffledDeck.pop());
    }
    console.log("dealer:", dealerHand);
    console.log("player:", playerHand);

    // count points
    playerPoints = handPoints(playerHand);
    dealerPoints = handPoints(dealerHand);
    console.log("dealer starting points:", dealerPoints);

    // check ace value - player
    for (const pCard of playerHand) {
      if (pCard.name == "ace") {
        console.log("ace check", pCard);
        if (playerPoints < 21) {
          pCard.value = 11;
          console.log("ace value", pCard.value);
        } else if (playerPoints > 21) {
          pCard.value = 1;
          console.log("ace value", pCard.value);
        }
        playerPoints = handPoints(playerHand);
      }
    }
    console.log("final player points:", playerPoints);

    // check ace value - dealer
    for (const dCard of dealerHand) {
      if (dCard.name == "ace") {
        console.log("ace check", dCard);
        if (dealerPoints < 21) {
          dCard.value = 11;
          console.log("ace value", dCard.value);
        } else if (dealerPoints > 21) {
          dCard.value = 1;
          console.log("ace value", dCard.value);
        }
        playerPoints = handPoints(dealerHand);
      }
    }
    console.log("final player points:", dealerPoints);

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
  if (mode == "draw") {
    myOutputValue = `Your current points is ${playerPoints}<br>Hit or stand?`;

    // -------------------- STAND --------------------
    if (input.toLowerCase() == "stand") {
      // dealer draws AFTER player stands if points less than 17
      for (j = 0; j < 5; j++) {
        if (dealerPoints < 17) {
          dealerHand.push(shuffledDeck.pop());
          dealerPoints = handPoints(dealerHand);
          console.log("dealer hand:", dealerHand);
          console.log("dealer points:", dealerPoints);
        }
      }
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
        myOutputValue += `<br>You win! <br><br>Player wins: ${playerWins}<br>Dealer wins: ${dealerWins}`;
      } else {
        dealerWins += 1;
        myOutputValue += `<br>Dealer wins! <br><br>Player wins: ${playerWins}<br>Dealer wins: ${dealerWins}`;
      }
      mode = "start";
      return myOutputValue;
    }

    // -------------------- HIT --------------------
    if (input.toLowerCase() == "hit") {
      var playerCards = "You have drawn<br><br>";

      playerHand.push(shuffledDeck.pop());
      console.log("player hits:", playerHand);

      // ---------- PLAYER POINTS ----------
      playerPoints = handPoints(playerHand);
      console.log("player points:", playerPoints);

      // check ace value
      for (const card of playerHand) {
        if (card.name == "ace") {
          console.log("ace check", card);
          if (playerPoints < 21) {
            card.value = 11;
            console.log("ace value", card.value);
          } else if (playerPoints > 21) {
            card.value = 1;
            console.log("ace value", card.value);
          }
          playerPoints = handPoints(playerHand);
        }
      }
      console.log("final player points:", playerPoints);

      for (k = 0; k < playerHand.length; k++) {
        playerCards += `${playerHand[k].name} of ${playerHand[k].suit}<br>`;
      }
      myOutputValue = `${playerCards}<br>Your current points is ${playerPoints}<br>Hit or stand?`;
    }
    return myOutputValue;
  }
};
