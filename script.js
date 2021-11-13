var playerCards = [];
var dealerCards = [];
var gameMode = "CardDealMode";
var playerTotalSum = 0;
var dealerTotalSum = 0;
var playerBlackjack = false;
var dealerBlackjack = false;
var playerBusted = false;
var dealerBusted = false;
var myOutputValue = "";
var playerHitOrStand = "hit";
var playerTotalPoints = 100;
var playersBet = 0;

var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
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
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

var cardDeck = makeDeck();
var shuffledCards = shuffleCards(cardDeck);

var calculateTotalSum = function (cards) {
  var index = 0;
  var totalSum = 0;
  while (index < cards.length) {
    totalSum = totalSum + getPointValue(cards[index], totalSum);
    index += 1;
  }
  return totalSum;
};

var getPointValue = function (card, totalSum) {
  var cardName = card.name;
  var pointValue = cardName;
  if (cardName == "jack" || cardName == "queen" || cardName == "king") {
    pointValue = 10;
  } else if (cardName == "ace") {
    if (totalSum <= 10) {
      pointValue = 11;
    } else if (totalSum <= 20) {
      pointValue = 1;
    }
  }

  return pointValue;
};

var formatOutput = function (playerName, cards, totalSum) {
  var myOutputString = playerName + " hand: ";
  var index = 0;
  var emoji = "";
  var cardOutput = "";
  while (index < cards.length) {
    if (cards[index].suit == "hearts") {
      // var suits = ["hearts", "diamonds", "clubs", "spades"];
      emoji = "♥";
    } else if (cards[index].suit == "diamonds") {
      emoji = "♦";
    } else if (cards[index].suit == "clubs") {
      emoji = "♣";
    } else if (cards[index].suit == "spades") {
      emoji = "♠";
    }

    if (!(playerName == "Dealer" && index == 0)) {
      if (index != cards.length - 1) {
        cardOutput =
          cardOutput +
          cards[index].name +
          " of " +
          cards[index].suit +
          "(" +
          emoji +
          ")" +
          ", ";
      } else {
        cardOutput =
          cardOutput +
          cards[index].name +
          " of " +
          cards[index].suit +
          "(" +
          emoji +
          ")";
      }
    }

    index += 1;
  }

  if (playerName == "Dealer") {
    cardOutput = "Facedown card, " + cardOutput;
  }
  myOutputString = myOutputString + cardOutput;
  myOutputString = myOutputString + " with sum " + totalSum + "." + "<br>";

  if (playerName == "Player") {
    myOutputString =
      myOutputString +
      "Players total points: " +
      playerTotalPoints +
      " (Players bet is 20)" +
      "<br>";
  }
  return myOutputString;
}; // end of format output

var cardDealMode = function () {
  playersBet = 20;
  playerTotalPoints = playerTotalPoints - 20;

  var myOutputMessage = "";
  var resultOutput = "";
  playerCards.push(shuffledCards.pop());

  playerCards.push(shuffledCards.pop());

  dealerCards.push(shuffledCards.pop());

  dealerCards.push(shuffledCards.pop());

  playerTotalSum = calculateTotalSum(playerCards);

  dealerTotalSum = calculateTotalSum(dealerCards);

  myOutputMessage = formatOutput("Player", playerCards, playerTotalSum);
  myOutputMessage =
    myOutputMessage + formatOutput("Dealer", dealerCards, dealerTotalSum);

  if (playerTotalSum == 21 && dealerTotalSum == 21) {
    playerBlackjack = true;
    dealerBlackjack = true;
    playerTotalPoints = playerTotalPoints + playersBet;
    myOutputMessage = formatOutput("Player", playerCards, playerTotalSum);
    myOutputMessage =
      myOutputMessage + formatOutput("Dealer", dealerCards, dealerTotalSum);
    resultOutput = "🏆 Both has blackjack!! Its a tie!! 🏆";
  } else if (playerTotalSum == 21) {
    playerBlackjack = true;
    resultOutput = "🏆 Player wins by blackjack!! 🏆";
    playerTotalPoints = playerTotalPoints + 1.5 * playersBet;
    myOutputMessage = formatOutput("Player", playerCards, playerTotalSum);
    myOutputMessage =
      myOutputMessage + formatOutput("Dealer", dealerCards, dealerTotalSum);
  } else if (dealerTotalSum == 21) {
    dealerBlackjack = true;
    resultOutput = "🏆 Dealer wins by blackjack!! 🏆";

    myOutputMessage = formatOutput("Player", playerCards, playerTotalSum);
    myOutputMessage =
      myOutputMessage + formatOutput("Dealer", dealerCards, dealerTotalSum);
  } else if (playerTotalSum == dealerTotalSum) {
    resultOutput = "Its a tie for this round!!";
  } else if (playerTotalSum > dealerTotalSum) {
    resultOutput = "Player leads!!";
  } else if (dealerTotalSum > playerTotalSum) {
    resultOutput = "Dealer leads!!";
  }

  myOutputMessage =
    myOutputMessage +
    "<br>" +
    "==========================================" +
    "<br>" +
    "<b>" +
    resultOutput +
    "</b>" +
    "<br>" +
    "==========================================";

  if (playerBlackjack || dealerBlackjack) {
    myOutputValue =
      myOutputMessage +
      "<br>" +
      "Game is over 😎. Please refresh(🔃) to start a new game!!";
    gameMode = "gameEnded";
    disableButtons();
  } else {
    myOutputValue =
      myOutputMessage +
      "<br>" +
      "Please enter 'hit' or 'stand', then press Submit or " +
      "<br>" +
      "press 'hit' button or 'stand' button";
    gameMode = "hitOrStandMode";
    hitButton.disabled = false;
    hitButton.style.opacity = 1;
    standButton.disabled = false;
    standButton.style.opacity = 1;

    submitButton.innerText = "Submit";
    submitButton.style.fontWeight = "bold";
  }
}; // end of card deal mode

var hitOrStandMode = function (input) {
  if (input == "hit") {
    hit();
  } else if (input == "stand" || playerHitOrStand == "stand") {
    stand();
  }
}; // end of hit or stand mode

var hit = function () {
  var extraMessage = "";
  var myOutputMessage = "";
  var resultOutput = "";

  playerCards.push(shuffledCards.pop());
  playerTotalSum = calculateTotalSum(playerCards);

  myOutputMessage = formatOutput("Player", playerCards, playerTotalSum);
  myOutputMessage =
    myOutputMessage + formatOutput("Dealer", dealerCards, dealerTotalSum);

  if (playerTotalSum > 21) {
    playerBusted = true;
    resultOutput = " Player got busted";

    extraMessage = "click submit to see dealers next move";
    playerHitOrStand = "stand";
    hitButton.disabled = true;
    hitButton.style.opacity = "0.7";
  } else {
    extraMessage =
      "Please enter 'hit' or 'stand', then press Submit or " +
      "<br>" +
      "press 'hit' button or 'stand' button";
  }

  if (resultOutput != "") {
    myOutputMessage =
      myOutputMessage +
      "<br>" +
      "==========================================" +
      "<br>" +
      "<b>" +
      resultOutput +
      "</b>" +
      "<br>" +
      "==========================================";
    +extraMessage;
  }
  myOutputValue = myOutputMessage + "<br>" + extraMessage;

  return myOutputValue;
};

var stand = function () {
  var extraMessage = "";
  var myOutputMessage = "";
  var resultOutput = "";
  playerTotalSum = calculateTotalSum(playerCards);
  dealerTotalSum = calculateTotalSum(dealerCards);

  myOutputMessage = formatOutput("Player", playerCards, playerTotalSum);
  myOutputMessage =
    myOutputMessage + formatOutput("Dealer", dealerCards, dealerTotalSum);

  while (dealerTotalSum < 17) {
    dealerCards.push(shuffledCards.pop());
    dealerTotalSum = calculateTotalSum(dealerCards);
    myOutputMessage = formatOutput("Player", playerCards, playerTotalSum);
    myOutputMessage =
      myOutputMessage + formatOutput("Dealer", dealerCards, dealerTotalSum);
    if (dealerTotalSum > 21) {
      dealerBusted = true;

      gameMode = "gameEnded";
      extraMessage =
        "Game is over 😎. Please refresh(🔃) to start a new game!!";
      disableButtons();
    }
    if (playerBusted && dealerBusted) {
      playerTotalPoints = playerTotalPoints + playersBet;
      myOutputMessage = formatOutput("Player", playerCards, playerTotalSum);
      myOutputMessage =
        myOutputMessage + formatOutput("Dealer", dealerCards, dealerTotalSum);
      resultOutput = "Player and dealer got busted!!";
      gameMode = "gameEnded";
      extraMessage =
        "Game is over 😎. Please refresh(🔃) to start a new game!!";
      disableButtons();
    }
  }

  if (!playerBusted && !dealerBusted) {
    if (playerTotalSum == dealerTotalSum) {
      playerTotalPoints = playerTotalPoints + playersBet;
      myOutputMessage = formatOutput("Player", playerCards, playerTotalSum);
      myOutputMessage =
        myOutputMessage + formatOutput("Dealer", dealerCards, dealerTotalSum);
      resultOutput = "🏆 Its a tie!! 🏆";
      gameMode = "gameEnded";
      extraMessage =
        "Game is over 😎. Please refresh(🔃) to start a new game!!";
      disableButtons();
    } else if (playerTotalSum > dealerTotalSum) {
      playerTotalPoints = playerTotalPoints + 2 * playersBet;
      myOutputMessage = formatOutput("Player", playerCards, playerTotalSum);
      myOutputMessage =
        myOutputMessage + formatOutput("Dealer", dealerCards, dealerTotalSum);
      resultOutput = "🏆 Player wins!! 🏆";
      gameMode = "gameEnded";
      extraMessage =
        "Game is over 😎. Please refresh(🔃) to start a new game!!";
      disableButtons();
    } else if (dealerTotalSum > playerTotalSum) {
      resultOutput = "🏆 Dealer wins!! 🏆";
      gameMode = "gameEnded";
      extraMessage =
        "Game is over 😎. Please refresh(🔃) to start a new game!!";
      disableButtons();
    }
  } else if (playerBusted && !dealerBusted) {
    resultOutput = "🏆 Player got busted. Dealer wins!! 🏆";
    gameMode = "gameEnded";
    extraMessage = "Game is over 😎. Please refresh(🔃) to start a new game!!";
    disableButtons();
  } else if (dealerBusted && !playerBusted) {
    playerTotalPoints = playerTotalPoints + 2 * playersBet;
    myOutputMessage = formatOutput("Player", playerCards, playerTotalSum);
    myOutputMessage =
      myOutputMessage + formatOutput("Dealer", dealerCards, dealerTotalSum);
    resultOutput = "🏆 Dealer got busted. Player wins!! 🏆";
    gameMode = "gameEnded";
    extraMessage = "Game is over 😎. Please refresh(🔃) to start a new game!!";
    disableButtons();
  }

  myOutputMessage =
    myOutputMessage +
    "<br>" +
    "==========================================" +
    "<br>" +
    "<b>" +
    resultOutput +
    "</b>" +
    "<br>" +
    "==========================================";

  myOutputValue = myOutputMessage + "<br>" + extraMessage;
  return myOutputValue;
}; // end of stand

var disableButtons = function () {
  submitButton.disabled = true;
  submitButton.style.opacity = "0.7";
  hitButton.disabled = true;
  hitButton.style.opacity = "0.7";
  standButton.disabled = true;
  standButton.style.opacity = "0.7";
};
var main = function (input) {
  if (gameMode == "CardDealMode") {
    cardDealMode();
  } else if (gameMode == "hitOrStandMode") {
    hitOrStandMode(input);
  } else if (gameMode == "gameEnded") {
    disableButtons();
  }
  return myOutputValue;
};
