//to generate deck
var makeDeck = function () {
  var cardDeck = [];
  var suits = ["spades", "hearts", "clubs", "diamonds"];

  // Loop over the suits array
  for (suitIndex = 0; suitIndex < suits.length; suitIndex++) {
    var currentSuit = suits[suitIndex];
    for (rankCounter = 1; rankCounter <= 13; rankCounter++) {
      var cardName = rankCounter;
      var cardValue = rankCounter;

      //added card value because jack, queen, king has value of 10
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

      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: cardValue,
      };

      cardDeck.push(card);
    }
  }

  return cardDeck;
};
// randomise card order
function randomiser(max) {
  return Math.floor(Math.random() * max);
}
// shuffle deck
function shuffleCards(cardDeck) {
  for (index in cardDeck) {
    var randomIndex = randomiser(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[index];
    cardDeck[index] = randomCard;
    cardDeck[randomIndex] = currentCard;
  }
  return cardDeck;
}
//for hand points
function handPoints(hand) {
  var totalPoints = 0;
  for (const card of hand) {
    totalPoints += card.value;
  }
  return totalPoints;
}
//to store card value on player hand
var playerHand = [];

//to store card value of dealer hand
var dealerHand = [];

//initialise game mode with staty
var gameMode = "start";

//to store player and dealer points eg combination of 2 cards give how many points
var playerPoints = 0;
var dealerPoints = 0;

//to store player and dealer score
var playerWins = 0;
var dealerWins = 0;

var stand;

var main = function (input) {
  var shuffledDeck = shuffleCards(makeDeck());
  if (gameMode == "start") {
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

    playerPoints = handPoints(playerHand);
    dealerPoints = handPoints(dealerHand);
    console.log("dealer starting points:", dealerPoints);

    //if an ace card is drawn for player,
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
        console.log("final player points:", playerPoints);
      }
    }

    //if an ace card is drawn for dealer,
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
        console.log("final player points:", dealerPoints);
      }
    }

    //comparisons
    // if player gets 21 points, player wins
    if (playerPoints == 21 && dealerPoints != 21) {
      // player instant win
      return (
        "You have drawn " +
        playerHand[0].name +
        " " +
        playerHand[0].suit +
        " and " +
        playerHand[1].name +
        " " +
        playerHand[1].suit +
        "<br><br>" +
        "You won! Current points:" +
        playerPoints +
        "<br><br>" +
        'Please press "Submit" to play again.'
      );
    }

    // change mode
    gameMode = "draw";
    return (
      "You have drawn " +
      playerHand[0].name +
      " " +
      playerHand[0].suit +
      " and " +
      playerHand[1].name +
      " " +
      playerHand[1].suit +
      "<br><br>" +
      "Would you like to Hit or Stand?"
    );
  }

  if (gameMode == "draw") {
    myOutputValue =
      "Your current points: " +
      playerPoints +
      "<br><br>" +
      "Would you like to hit or stand?";

    // player choose stand
    if (input.toLowerCase() == "stand") {
      if (input.toLowerCase() == "stand" || stand == "forced") {
        // dealer draws AFTER player stands if points less than 17
        for (j = 0; j < 5; j++) {
          for (j = 0; j < 3; j++) {
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
          myOutputValue =
            "You have " + playerPoints + ". Dealer has" + dealerPoints;

          if (playerPoints != 21) {
            playerScoreDiff = Math.abs(playerPoints - 21);
          }
          if (dealerPoints != 21) {
            dealerScoreDiff = Math.abs(dealerPoints - 21);
          }
          // announce winner
          if (playerPoints == 21 || playerScoreDiff < dealerScoreDiff) {
            playerWins += 1;
            myOutputValue +=
              "<br><br>" +
              'You win! Press "Submit" to play again. ' +
              "<br><br>" +
              "Player wins: " +
              playerWins +
              "Dealer wins: " +
              dealerWins;
          } else {
            dealerWins += 1;
            myOutputValue +=
              "Dealer wins! Player wins: " +
              playerWins +
              "Dealer wins: " +
              dealerWins +
              "<br><br>" +
              'Press "Submit" to play again.';
          }
          mode = "start";
          return myOutputValue;
        }
        // player choose hit
        if (input.toLowerCase() == "hit") {
          var playerCards = "You have drawn: ";

          playerHand.push(shuffledDeck.pop());
          // cannot draw more than 5 cards
          if (playerHand.length != 5) {
            playerHand.push(shuffledDeck.pop());
          } else {
            console.log("force stand");
            stand = "forced";
            myOutputValue =
              "You cannot draw more than 5 cards." +
              "<br><br>" +
              "Please enter 'stand' to see if you've won.";
            return myOutputValue;
          }

          console.log("player hits:", playerHand);

          //player points
          playerPoints = handPoints(playerHand);
          console.log("player points:", playerPoints);
          // checking ace values either 1/11
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
          myOutputValue =
            playerCards +
            "Your current points: " +
            playerPoints +
            "Would you like to hit or stand";
        }
        return myOutputValue;
      }
    }
  }
};
