// Project #3 - Blackjack

// Game States & Modes
var gameState = "deal";

// Arrays
var playerCards = [];
var dealerCards = [];

// Make deck function
var makeDeck = function () {
  var cardDeck = [];
  var suits = ["♦️", "♣️", "♥️", "♠️"];
  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;

      if (cardName == 1) {
        cardName = "Ace";
      } else if (cardName == 11) {
        cardName = "Jack";
      } else if (cardName == 12) {
        cardName = "Queen";
      } else if (cardName == 13) {
        cardName = "King";
      }
      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      // Add the new card to the deck
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};

//Create card deck and shuffle it
var createShuffledDeck = function () {
  cardDeck = makeDeck();
  var shuffledDeck = shuffleCards(cardDeck);
  return shuffledDeck;
};

// Get a random index
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
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
    currentIndex = currentIndex + 1;
  }
  return cardDeck;
};

// Deal first two cards to player and dealer
var dealFirstHand = function () {
  // Draw and remove
  playerCards.push(shuffledDeck.pop());
  dealerCards.push(shuffledDeck.pop());
  playerCards.push(shuffledDeck.pop());
  dealerCards.push(shuffledDeck.pop());

  return showPlayerHand(playerCards);
};

// Check for Blackjack
var checkBlackjack = function (inputArray) {
  var isBlackjack = false;
  var cardOne = inputArray[0];
  var cardTwo = inputArray[1];
  if (
    (cardOne.name == "Ace" && cardTwo.rank >= 10) ||
    (cardTwo.name == "Ace" && cardOne.rank >= 10) ||
    (cardOne.name == "Ace" && cardTwo.name == "Ace")
  ) {
    return (isBlackjack = true);
  }
  return isBlackjack;
};

// Loop through arrays to calculate value of current hands
var calculateHandValue = function (inputArray) {
  var handValue = 0;
  var aceCounter = 0;
  // Main loop
  for (let counter = 0; counter < inputArray.length; counter += 1) {
    var currentCard = inputArray[counter];
    if (
      currentCard.name == "Jack" ||
      currentCard.name == "Queen" ||
      currentCard.name == "King"
    ) {
      handValue = handValue + 10;
      // Return Ace as 11 as a default
    } else if (currentCard.name == "Ace") {
      aceCounter = aceCounter + 1;
      handValue = handValue + 11;
    } else {
      handValue = handValue + currentCard.rank;
    }
  }
  // Variable Ace logic loop
  for (let index = 0; index < aceCounter; index += 1) {
    // Double Ace Scenario
    if (handValue == 22 && inputArray.length == 2) {
      handValue = handValue - 1;
      // Above 21, Ace is always a "1"
    } else if (handValue > 21) {
      handValue = handValue - 10;
      // Below 21, Ace should count as 10
    } else if (handValue <= 21 && inputArray.length > 2) {
      handValue = handValue - 1;
    }
  }
  return handValue;
};

// Loop to update Player's hand throughout game
var showPlayerHand = function (playerCards) {
  var playerMessage = "<strong>Player's hand:<br></strong>";
  for (let counter = 0; counter < playerCards.length; counter += 1) {
    playerMessage =
      playerMessage +
      playerCards[counter].name +
      " of " +
      playerCards[counter].suit +
      "<br>";
  }
  return playerMessage + "Hand value: " + calculateHandValue(playerCards);
};

// Loop for dealer's hand
var showdealerHand = function (dealerCards) {
  var dealerMessage = "<strong>Dealer's hand:<br></strong> ";
  for (let counter = 0; counter < dealerCards.length; counter += 1) {
    dealerMessage =
      dealerMessage +
      dealerCards[counter].name +
      " of " +
      dealerCards[counter].suit +
      "<br>";
  }
  return dealerMessage + "Hand value: " + calculateHandValue(dealerCards);
};

// Restart Game
var restartGame = function () {
  gameState = "deal";
  playerCards = [];
  dealerCards = [];
  // Only deal button should be activated on game restart
  document.querySelector("#deal-button").disabled = false;
  document.querySelector("#hit-button").disabled = true;
  document.querySelector("#stand-button").disabled = true;
  return "<br><br> Ready for another round? Press the deal button for a new hand.";
};

// Deal Button Functionality
var button = document.querySelector("#deal-button");
button.addEventListener("click", function () {
  var input = document.querySelector("#deal-button");
  var result = dealMain(input.value);
  var checkLimit = calculateHandValue(playerCards);
  var playerBlackjack = checkBlackjack(playerCards);
  var dealerBlackjack = checkBlackjack(dealerCards);
  // Anything less than 16, player can only hit, disable stand button
  if (checkLimit < 16) {
    document.querySelector("#stand-button").disabled = true;
    document.querySelector("#hit-button").disabled = false;
    // Blackjack - both hit and stand buttons disabled
  } else if (
    (playerBlackjack == true && dealerBlackjack == true) ||
    (playerBlackjack == true && dealerBlackjack == false) ||
    (playerBlackjack == false && dealerBlackjack == true)
  ) {
    document.querySelector("#hit-button").disabled = true;
    document.querySelector("#stand-button").disabled = true;
    // Otherwise, hit and stand should be operational by default
  } else {
    document.querySelector("#stand-button").disabled = false;
    document.querySelector("#hit-button").disabled = false;
  }

  var output = document.querySelector("#output-div");
  output.innerHTML = result;
});

// Hit Button Functionality
var button = document.querySelector("#hit-button");
button.addEventListener("click", function () {
  var input = document.querySelector("#hit-button");
  var result = hitMain(input.value);
  var checkLimit = calculateHandValue(playerCards);
  // Player under limit and less than 5 cards, have to hit
  if (checkLimit < 16 && playerCards.length < 5) {
    document.querySelector("#stand-button").disabled = true;
    // Player at 21 or over limit, have to stand
  } else if (checkLimit >= 21) {
    document.querySelector("#hit-button").disabled = true;
    document.querySelector("#stand-button").disabled = false;
    // Player under or = 21, and more than 5 cards, instant win, hit disabled
  } else if (checkLimit <= 21 && playerCards.length >= 5) {
    document.querySelector("#hit-button").disabled = true;
    document.querySelector("#stand-button").disabled = false;
    // Else, stand should be enabled by default
  } else {
    document.querySelector("#stand-button").disabled = false;
  }
  var output = document.querySelector("#output-div");
  output.innerHTML = result;
});

// Stand Button Functionality
var button = document.querySelector("#stand-button");
button.addEventListener("click", function () {
  var input = document.querySelector("#stand-button");
  var result = standMain(input.value);
  var output = document.querySelector("#output-div");
  output.innerHTML = result;
});

// Images
var firstTwoCardsImage =
  '<img src="https://media.giphy.com/media/e683aBpYMgrKhOg0gJ/giphy.gif" class = "center">';
var tieImage =
  '<img src = "https://media.giphy.com/media/cqcsaDCht6hmZX7e6d/giphy-downsized-large.gif" class = "center">';
var dealerWinImage =
  '<img src = "https://media.giphy.com/media/NY3tXwOBUwQYq7lbXx/giphy.gif" class="center">';
var playerWinImage =
  '<img src = "https://media.giphy.com/media/WjubYDzkPDMiVg8Zn2/giphy.gif" class="center">';
var playerHitImage =
  '<img src = "https://media.giphy.com/media/Hloo0Lv97Sw72owSRA/giphy.gif" class="center">';

// Main Function #1 - Deal Button
var dealMain = function (input) {
  // Game State deal - deal first hand to players and dealer
  if (gameState == "deal") {
    shuffledDeck = createShuffledDeck();
    playerFirstTwoCards = dealFirstHand();

    // Blackjack Check
    var playerBlackjack = checkBlackjack(playerCards);
    var dealerBlackjack = checkBlackjack(dealerCards);

    // Two Blackjacks
    if (playerBlackjack == true && dealerBlackjack == true) {
      outputMessage =
        "<br><br>Both players got Blackjack! It's a tie.<br><br>" +
        restartGame() +
        "<br><br>" +
        tieImage;
      // Player Blackjack
    } else if (playerBlackjack == true && dealerBlackjack == false) {
      outputMessage =
        "<br><br>Blackjack! Player wins." +
        restartGame() +
        "<br><br>" +
        playerWinImage;
      // Dealer Blackjack
    } else if (playerBlackjack == false && dealerBlackjack == true) {
      outputMessage =
        "<br><br>Dealer got a Blackjack! Dealer wins.<br><br>" +
        restartGame() +
        "<br><br>" +
        dealerWinImage;
    } else {
      outputMessage =
        "<br><br> Press 'hit' to draw a card or 'stand' to view results.<br><br>" +
        firstTwoCardsImage;
      gameState = "choose";
      document.querySelector("#deal-button").disabled = true;
    }
    return playerFirstTwoCards + outputMessage;
  }
};

// Main Function #2 - Hit Button
var hitMain = function (input) {
  if (gameState == "choose") {
    outputMessage =
      "<br><br> Press 'hit' to draw a card or 'stand' to view results.<br><br>" +
      playerHitImage;
    playerCards.push(shuffledDeck.pop());

    return (
      "<strong>🃏 You drew a card 🃏<br><br></strong>" +
      showPlayerHand(playerCards) +
      outputMessage
    );
  }
};

// Main Function #3 - Stand Button
var standMain = function (input) {
  var playerTotal = calculateHandValue(playerCards);
  var dealerTotal = calculateHandValue(dealerCards);
  // Dealer Hit functionality
  while (dealerTotal < 17) {
    dealerCards.push(shuffledDeck.pop());
    dealerTotal = calculateHandValue(dealerCards);
  }
  gameState = "results";

  if (gameState == "results") {
    var allScores =
      showPlayerHand(playerCards) +
      "<br><br><br>" +
      showdealerHand(dealerCards);

    // Tie Scenario - #1 Player and dealer tie but less than 21, #2 Both bust, #3 Computer and Player both hit 5-card instant win condition
    if (
      (playerTotal == dealerTotal && playerTotal <= 21) ||
      (playerTotal > 21 && dealerTotal > 21) ||
      (playerTotal <= 21 &&
        playerCards.length >= 5 &&
        dealerTotal <= 21 &&
        dealerCards.length >= 5)
    ) {
      outputMessage =
        "<strong>😐 It's a tie. How boring. 😐<br><br></strong>" +
        allScores +
        "<br><br>" +
        tieImage;
    }
    // Player Win - #1 Player > dealer but less than 21, #2 dealer bust only. #3 >5 cards below 21
    else if (
      (playerTotal > dealerTotal && playerTotal <= 21) ||
      (playerTotal <= 21 && dealerTotal > 21) ||
      (playerTotal <= 21 && playerCards.length >= 5)
    ) {
      outputMessage =
        "<strong>🏆 Player wins! Let's goooooo! 🏆<br><br></strong>" +
        allScores +
        "<br><br>" +
        playerWinImage;
    }
    // dealer Win
    else {
      outputMessage =
        "<strong>🤖 Dealer wins! Better luck next time chump. 🤖<br><br></strong>" +
        allScores +
        "<br><br>" +
        dealerWinImage;
    }
    // Update game state to replay

    return outputMessage + restartGame();
  }
};
