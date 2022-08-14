// game modes
var gameStart = "game start";
var gameCardsDrawn = "cards drawn";
var gameResultsShown = "results shown";
var gameHitOrStand = "hit or stand";
var currentGameMode = gameStart;

var playerHand = [];
var dealerHand = [];

// deck generation
var makeDeck = function () {
  var cardDeck = [];
  var suits = ["♥️", "♦️", "♣️", "♠️"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;
      // By default, the card value is the same as rankCounter
      var valueCounter = rankCounter;

      if (cardName == 1) {
        valueCounter = 11;
      } else if (cardName > 9) {
        valueCounter = 10;
      }

      if (cardName == 1) {
        cardName = "Ace";
      } else if (cardName == 11) {
        cardName = "Jack";
      } else if (cardName == 12) {
        cardName = "Queen";
      } else if (cardName == 13) {
        cardName = "King";
      }

      // Create a new card with the current name, suit, rank and value
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: valueCounter,
      };

      // Add the new card to the deck
      cardDeck.push(card);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  return cardDeck;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// shuffle deck
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];

    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;

    currentIndex = currentIndex + 1;
  }
  return cardDeck;
};

// execute deck generation
var deck = makeDeck();
// create shuffled deck
var shuffledDeck = shuffleCards(deck);

//calculate number of aces in player hand
var calcNumberOfAces = function (hand) {
  var acesFound = false;
  var numberOfAces = 0;
  for (card of hand) {
    if (card.name == "ace") {
      acesFound = true;
      numberOfAces += 1;
    }
  }
  return numberOfAces;
};

// calculate total hand value
var calcHandValue = function (hand) {
  var handValue = 0;
  var aceCounter = calcNumberOfAces(hand);
  for (card of hand) {
    handValue += card.value;
  }
  if (handValue > 21 && aceCounter >= 1) {
    handValue = handValue - 10;
  }
  console.log("number of aces:", aceCounter);
  return handValue;
};

// print player and dealer cards drawn
var printCardsDrawn = function (playerHandArray, dealerHandArray) {
  var playerCardsInHand = "";
  for (card of playerHandArray) {
    playerCardsInHand += `${card.name} of ${card.suit}<br>`;
  }
  var printPlayerDraw = `Player hand: <br>` + playerCardsInHand;

  var dealerCardsInHand = "";
  for (card of dealerHandArray) {
    dealerCardsInHand += `${card.name} of ${card.suit}<br>`;
  }
  var printDealerDraw = `<br> Dealer hand: <br>` + dealerCardsInHand;

  return printPlayerDraw + printDealerDraw;
};

//print player cards
var printPlayerCards = function (playerHandArray) {
  var playerCardsInHand = "";
  for (card of playerHandArray) {
    playerCardsInHand += `${card.name} of ${card.suit}<br>`;
  }
  return (printPlayerDraw = `Player hand: <br>` + playerCardsInHand);
};

//print dealer cards
var printDealerCards = function (dealerHandArray) {
  var dealerCardsInHand = "";
  for (card of dealerHandArray) {
    dealerCardsInHand += `${card.name} of ${card.suit}<br>`;
  }
  return (printDealerDraw = `<br> Dealer hand: <br>` + dealerCardsInHand);
};

// runs on each player's turn

var main = function (input) {
  var myOutputValue = "";
  if (currentGameMode == gameStart) {
    playerHand.push(shuffledDeck.pop());
    playerHand.push(shuffledDeck.pop());
    dealerHand.push(shuffledDeck.pop());
    dealerHand.push(shuffledDeck.pop());

    currentGameMode = gameCardsDrawn;
    return (myOutputValue =
      "The dealer has dealt the cards. Click Submit to evaluate your cards.");
  }

  if (currentGameMode == gameCardsDrawn) {
    var playerTotalHandValue = calcHandValue(playerHand);
    var dealerTotalHandValue = calcHandValue(dealerHand);

    // blackjacks
    if (playerTotalHandValue == 21 || dealerTotalHandValue == 21) {
      if (playerTotalHandValue == 21 && dealerTotalHandValue == 21) {
        myOutputValue =
          printCardsDrawn(playerHand, dealerHand) +
          "<br>Both of you got blackjack, congrats!";
      } else if (playerTotalHandValue == 21 && dealerTotalHandValue != 21) {
        myOutputValue =
          printCardsDrawn(playerHand, dealerHand) +
          "<br>You got blackjack, congrats!";
      } else {
        myOutputValue =
          printCardsDrawn(playerHand, dealerHand) +
          "<br>Dealer got blackjack, congrats!";
      }
    }
    // no blackjack
    else {
      console.log("dealer's hand: ", dealerHand);
      console.log("dealer hand value: ", dealerTotalHandValue);
      myOutputValue =
        printPlayerCards(playerHand) +
        `<br>Your hand value is ${playerTotalHandValue}. <br>Would you like to hit or stand?`;
    }
    currentGameMode = gameHitOrStand;
    return myOutputValue;
  }

  //player choosing hit or stand
  if (currentGameMode == gameHitOrStand) {
    var playerTotalHandValue = calcHandValue(playerHand);
    var dealerTotalHandValue = calcHandValue(dealerHand);

    //player hit
    if (input == "hit") {
      playerHand.push(shuffledDeck.pop());
      playerTotalHandValue = calcHandValue(playerHand);
      currentGameMode == gameCardsDrawn;
      myOutputValue =
        printPlayerCards(playerHand) +
        `<br>You drew another card. Your hand value is now ${playerTotalHandValue}.<br>Would you like to hit or stand?`;
    }
    // player stand
    else if (input == "stand") {
      //dealer's turn to hit or stand
      while (dealerTotalHandValue < 18 && dealerHand.length < 6) {
        dealerHand.push(shuffledDeck.pop());
        dealerTotalHandValue = calcHandValue(dealerHand);
      }
      console.log("dealer's hand 2: ", dealerHand);
      console.log("dealer hand value 2: ", dealerTotalHandValue);

      //compare player and dealer total values
      // player > 21
      if (playerTotalHandValue > 21 && dealerTotalHandValue < 22) {
        myOutputValue =
          printCardsDrawn(playerHand, dealerHand) +
          `<br>You hand value is more than 21, busted! Dealer's hand value is ${dealerTotalHandValue}. Dealer wins.<br>Refresh the page for a new game.`;
      }
      //dealer > 21
      else if (dealerTotalHandValue > 21 && playerTotalHandValue < 22) {
        myOutputValue =
          printCardsDrawn(playerHand, dealerHand) +
          "<br>Dealer's hand value is more than 21, busted! You win!<br>Refresh the page for a new game.";
      }
      // both player and dealer > 21
      else if (playerTotalHandValue > 21 && dealerTotalHandValue > 21) {
        myOutputValue =
          printCardsDrawn(playerHand, dealerHand) +
          "<br>Both your hand values are more than 21, busted! It's a draw!<br>Refresh the page for a new game.";
      }
      // both blackjack
      else if (playerTotalHandValue == 21 && dealerTotalHandValue == 21) {
        myOutputValue =
          printCardsDrawn(playerHand, dealerHand) +
          "<br>You both got blackjack, congrats! <br>Refresh the page for a new game.";
      }
      // player blackjack
      else if (playerTotalHandValue == 21 && dealerTotalHandValue < 21) {
        myOutputValue =
          printCardsDrawn(playerHand, dealerHand) +
          "<br>You got blackjack, congrats!<br>Refresh the page for a new game.";
      }
      // draw
      else if (playerTotalHandValue == dealerTotalHandValue) {
        myOutputValue =
          printCardsDrawn(playerHand, dealerHand) +
          `<br>Your final hand value is ${playerTotalHandValue}. Dealer's hand value is ${dealerTotalHandValue}.<br>It's a draw!<br>Refresh the page for a new game.`;
      }
      //player higher hand
      else if (playerTotalHandValue > dealerTotalHandValue) {
        myOutputValue =
          printCardsDrawn(playerHand, dealerHand) +
          `<br>Your final hand value is ${playerTotalHandValue}. Dealer's hand value is ${dealerTotalHandValue}.<Br>You win!<br>Refresh the page for a new game.`;
      }
      // player lower hand
      else {
        myOutputValue =
          printCardsDrawn(playerHand, dealerHand) +
          `<br>Your final hand value is ${playerTotalHandValue}. Dealer's hand value is ${dealerTotalHandValue}.<br>Dealer wins!<br>Refresh the page for a new game. `;
      }
    } else {
      myOutputValue = `Please only enter "hit" or "stand".`;
    }
    currentGameMode == gameResultsShown;
    return myOutputValue;
  }
};
