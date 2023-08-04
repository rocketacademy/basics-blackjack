////////////////////////////
// Helper functions
var makeDeck = function () {
  var cardDeck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];

    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;

      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }

      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      cardDeck.push(card);

      rankCounter += 1;
    }

    suitIndex += 1;
  }

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

var cardDeck = shuffleCards(makeDeck());

///////////////////////////////////////////////
// State/Global variables
// constant winning value of blackjack
var twentyOne = 21;
// Dealer will always submit "hit" if its sum is below 16
var dealerHitThreshold = 16;
// If player has submitted "stand", player can no longer submit "hit", until game is over
var playerHasChosenToStand = false;
// Keep track of when the game ends to prevent further moves (i.e., "hit" and "stand")
var gameOver = false;

var playerHand = [];
var computerHand = [];

var outputDiv = document.getElementById("output-div");
var divContainer = document.getElementById("container");

var myImage =
  '<img src = "https://media.tenor.com/No8u0Yip0lwAAAAC/so-pissed.gif"/>';

var myImage2 =
  '<img src = "https://media.tenor.com/kfJ-3t3IFdgAAAAM/1inch-1inch-exchange.gif"/>';

var myImage3 = `<img src = "https://media.tenor.com/cxsA-a-8uz0AAAAC/tom-and-jerry-jerry-the-mouse.gif" />`;

///////////////////////////////
// More helper functions

// Deal a card to the given hand
var dealCardToHand = function (hand) {
  hand.push(cardDeck.pop());
  // dealCardToHand pushes a card from cardDeck to the hand
};

// calculate sum of card ranks in given hand
var getHandSum = function (hand) {
  var sum = 0;
  var numberOfAces = 0;
  for (var i = 0; i < hand.length; i += 1) {
    var currCard = hand[i];
    if (currCard.rank === 1) {
      numberOfAces += 1;
      sum += 11;
    } else {
      sum += currCard.rank;
    }
  }

  if (sum > twentyOne && numberOfAces > 0) {
    for (var j = 0; j < numberOfAces; j += 1) {
      sum -= 10;
      // this ensures that if the player/computer has a sum of above 21 and they have aces in their hand, we convert the aces from 11 to 1 to ensure it is fair
      // sum is reduced by 10 for each ace in the hand
      if (sum <= twentyOne) {
        break;
        // this ensures that once the sum is below 21, we break out of the loop
      }
    }
  }
  return sum;
};

var convertHandToString = function (hand) {
  // Declare a cards variable with an empty string
  var cards = "";

  for (var i = 0; i < hand.length; i += 1) {
    if (i > 0) {
      cards += ", ";
    }
    cards += hand[i].name;
  }
  return cards;
};

var getDefaultOutput = function () {
  return `Player has ${convertHandToString(playerHand)} with sum ${getHandSum(
    playerHand
  )}. <br> Computer has ${convertHandToString(
    computerHand
  )} with sum ${getHandSum(computerHand)}</br>`;
};

// Return true or false whether the hand contains a blackjack (21 with two cards) combination
var isBlackjack = function (hand) {
  return hand.length === 2 && getHandSum(hand) === twentyOne;
  // returns true if the hand contains only 2 cards and the sum of the two cards is 21
};

//////////////////////////////////
// MAIN FUNCTION
var main = function (input) {
  if (gameOver) {
    setTimeout(function () {
      window.location.reload();
    }, 3000);
    return `The game is over. Please wait 3 seconds for a new game to start 😄`;
  }

  if (playerHand.length === 0) {
    dealCardToHand(playerHand);
    dealCardToHand(computerHand);

    dealCardToHand(playerHand);
    dealCardToHand(computerHand);
    console.log(playerHand, computerHand);
    if (getHandSum(playerHand) > twentyOne) {
      gameOver = true;

      outputDiv.classList.add("color-change-lose");

      setTimeout(function () {
        outputDiv.classList.remove("color-change-lose");
      }, 3000);

      return `${getDefaultOutput()}. Player has over 21 and lost<br />Please press submit again to restart the game<br /><br />${myImage}`;
    } else if (getHandSum(computerHand) > twentyOne) {
      gameOver = true;
      outputDiv.classList.add("color-change-win");

      setTimeout(function () {
        outputDiv.classList.remove("color-change-win");
      }, 3000);
      return `${getDefaultOutput()}. You won! Computer has over 21 and lost<br />Please press submit again to restart the game<br /><br />${myImage2}`;
    } else if (getHandSum(playerHand) < 16) {
      return `${getDefaultOutput()} <br />Hint: Psst, you need to hit...<br />Enter hit to draw another card or enter stand to, well, just stand 😅`;
    } else if (getHandSum(playerHand) == 16) {
      return `${getDefaultOutput()} <br />Hint: Could go either way. Press hit if you're feeling lucky 😋<br />Enter hit to draw another card or enter stand to, well, just stand 😅`;
    } else {
      return `${getDefaultOutput()} <br />Hint: Might want to stand on this one 😳<br />Enter hit to draw another card or enter stand to, well, just stand 😅`;
    }
  }

  if (isBlackjack(playerHand)) {
    gameOver = true;
    outputDiv.classList.add("color-change-win");

    setTimeout(function () {
      outputDiv.classList.remove("color-change-win");
    }, 3000);
    return `Player has blackjack and wins. Please press submit again to restart the game!<br /><br />${myImage2}`;
  }

  if (isBlackjack(computerHand)) {
    gameOver = true;
    outputDiv.classList.add("color-change-lose");

    setTimeout(function () {
      outputDiv.classList.remove("color-change-lose");
    }, 3000);
    return `Computer has blackjack and wins. Please press submit again to restart the game!<br /><br />${myImage}`;
  }

  if (!playerHasChosenToStand) {
    if (input !== "hit" && input !== "stand") {
      console.log(playerHasChosenToStand);
      return `Please submit "hit" or "stand"`;
    }

    if (input === "hit") {
      dealCardToHand(playerHand);
      if (getHandSum(playerHand) > twentyOne) {
        gameOver = true;
        outputDiv.classList.add("color-change-lose");

        setTimeout(function () {
          outputDiv.classList.remove("color-change-lose");
        }, 3000);
        return `<br>${getDefaultOutput()}</br>Player has over 21 and lost. Please press submit again to restart the game! <br /><br />${myImage}`;
      }
    }

    if (input === "stand") {
      playerHasChosenToStand = true;
    }
  }

  // computer's turn now
  var computerCardRankSum = getHandSum(computerHand);
  if (computerCardRankSum <= dealerHitThreshold) {
    dealCardToHand(computerHand);

    computerCardRankSum = getHandSum(computerHand);
    if (computerCardRankSum > twentyOne) {
      gameOver = true;
      outputDiv.classList.add("color-change-win");

      setTimeout(function () {
        outputDiv.classList.remove("color-change-win");
      }, 3000);

      return `${getDefaultOutput()} <br> You won!. Computer has over 21 and lost. Please press submit again to restart the game!<br /><br />${myImage2}`;
    }
  }
  if (
    getHandSum(playerHand) <= twentyOne &&
    getHandSum(computerHand) <= twentyOne
  ) {
    gameOver = true;
    if (getHandSum(playerHand) > getHandSum(computerHand)) {
      outputDiv.classList.add("color-change-win");

      setTimeout(function () {
        outputDiv.classList.remove("color-change-win");
      }, 3000);

      return `${getDefaultOutput()}. Player wins this round. Please press submit again to restart the game! <br /><br />${myImage2}`;
    } else if (getHandSum(playerHand) < getHandSum(computerHand)) {
      outputDiv.classList.add("color-change-lose");

      setTimeout(function () {
        outputDiv.classList.remove("color-change-lose");
      }, 3000);
      return `${getDefaultOutput()}. Computer wins this round. Please press submit again to restart the game!<br /><br />${myImage}`;
    } else {
      return `${getDefaultOutput()}. Since both player and computer have the same number. It's a draw!<br/>Please press submit again to restart the game<br /><br />${myImage3}`;
    }
  }

  // if both player and computer has chosen to stand (i.e., input === "stand" and computerCardRankSum > dealerHitThreshold)
  if (playerHasChosenToStand && computerCardRankSum > dealerHitThreshold) {
    // we end the game so we can't call the function after this if block
    gameOver = true;

    if (
      getHandSum(playerHand) > getHandSum(computerHand) &&
      getHandSum(playerHand) <= twentyOne
    ) {
      outputDiv.classList.add("color-change-win");

      setTimeout(function () {
        outputDiv.classList.remove("color-change-win");
      }, 3000);
      return `${getDefaultOutput()}. <br /> Player wins this round! Please press submit again to restart the game! <br /><br />${myImage2}`;
    } else if (
      getHandSum(computerHand) > getHandSum(playerHand) &&
      getHandSum(computerHand) <= twentyOne
    ) {
      outputDiv.classList.add("color-change-lose");

      setTimeout(function () {
        outputDiv.classList.remove("color-change-lose");
      }, 3000);

      return `${getDefaultOutput()}. <br /> Computer wins this round! Please press submit again to restart the game!<br /><br />${myImage}`;
    }
  }

  return `${getDefaultOutput()}. Since both player and computer has sum of below the dealerHitThreshold of 16. It's a draw!<br />Please press submit again to restart the game<br /><br />${myImage3}`;
};

function showNotification(message, duration) {
  const messageBox = document.getElementById("messageBox");
  messageBox.textContent = message;
  messageBox.style.display = "block";
  messageBox.classList.add("fadeInOut");

  setTimeout(function () {
    messageBox.style.display = "none";
    messageBox.classList.remove("fadeInOut");
  }, duration);
}

document.addEventListener("DOMContentLoaded", function () {
  showNotification(
    "Small hint: Computer will not draw a card if its hand is greater than 16",
    5000
  );
});
