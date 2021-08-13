//to generate deck
var makeDeck = function () {
  var cardDeck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  //loop over suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      var valueCard =rankCounter; 

      if (cardName == 1) {
        cardName = "ace";
        valueCard = 11
      } else if (cardName == 11) {
        cardName = "jack";
        valueCard = 10
      } else if (cardName == 12) {
        cardName = "queen";
        valueCard = 10
      } else if (cardName == 13) {
        cardName = "king";
        valueCard =10
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
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
var deal_TWOCARDS = "deal_TWOCARDS";
var DRAWCARDS = "DRAWCARDS";
var HIT = "HIT";
var STAND = "STAND";

//initialise game mode to start with dealing two cards
var gameMode = deal_TWOCARDS;
​
//to store player and dealer points eg combination of 2 cards give how many points
var playerPoints = 0;
var dealerPoints = 0;
​
//to store player and dealer score
var playerWins = 0;
var dealerWins = 0;

​
var main = function (input) {
  var shuffledDeck = shuffleCards(makeDeck());
  if (gameMode = deal_TWOCARDS) {
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
​
    playerPoints = handPoints(playerHand);
    dealerPoints = handPoints(dealerHand);
    console.log("dealer starting points:", dealerPoints);
​
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
​
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
​
    //if player/dealer scores 21 or busts
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

    //if dealer gets 21 points, dealer wins
    if (dealerPoints == 21 && playerPoints != 21){
      return  "You have drawn " +
        playerHand[0].name +
        " " +
        playerHand[0].suit +
        " and " +
        playerHand[1].name +
        " " +
        playerHand[1].suit + 
        "<br><br>" +
        "Dealer has drawn drawn " +
        dealerHand[0].name +
        " " +
        dealerHand[0].suit +
        " and " +
        dealerHand[1].name +
        " " +
        dealerHand[1].suit +
        "<br><br>" +
        "You lost! Current points:" +
        playerPoints +
        "<br><br>" +
        'Please press "Submit" to play again.'
    }

    //BUSTS
    if (dealerPoints > 21) {
      return "Dealer busts. You have drawn " +
        playerHand[0].name +
        " " +
        playerHand[0].suit +
        " and " +
        playerHand[1].name +
        " " +
        playerHand[1].suit + 
        "<br><br>" +
        "Dealer has drawn drawn " +
        dealerHand[0].name +
        " " +
        dealerHand[0].suit +
        " and " +
        dealerHand[1].name +
        " " +
        dealerHand[1].suit +
        "<br><br>" +
        "You won! Current points:" +
        playerPoints +
        "<br><br>" + "Your points: " + playerPoints +
       "<br><br>" + "Dealer points: " + dealerPoints +
       "Please press 'Submit' to play again."
    }

    if (playerPonts > 21){
      return "You bust. You have drawn " +
        playerHand[0].name +
        " " +
        playerHand[0].suit +
        " and " +
        playerHand[1].name +
        " " +
        playerHand[1].suit + 
        "<br><br>" +
        "Dealer has drawn" +
        dealerHand[0].name +
        " " +
        dealerHand[0].suit +
        " and " +
        dealerHand[1].name +
        " " +
        dealerHand[1].suit +
        "<br><br>" +
        "You lost! Current points:" +
        playerPoints +
        "<br><br>" + "Your points: " + playerPoints +
       "<br><br>" + "Dealer points: " + dealerPoints +
       "Please press 'Submit' to play again."
    }
  ​}
​   if (gameMode == DRAWCARDS) {
    myOutputValue =
      "Your current points: " +
      playerPoints +
      "<br><br>" +
      "Would you like to hit or stand?";
    }
​
    // player choose stand
    if (gameMode == STAND){
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
​
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
      }
    }
​
    // player choose hit
    else if (input.toLowerCase() == "hit") {
      gameMode = STAND
      var playerCards = "You have drawn: ";
​
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
​
      console.log("player hits:", playerHand);
​
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
};
