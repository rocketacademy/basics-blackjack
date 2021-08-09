// var main = function (input) {
//   var myOutputValue = "hello world";
//   return myOutputValue;
// };

//Draw card from top
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

// Shuffle cards
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

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
  return cardDeck;
};

var cardDeck = shuffleCards(makeDeck());

// the rules of the game
// objective is to obtain total score closest to 21
// everyone given 2 cards at first
// over 21 point bust
// need to draw more cards if point is below 17 points
// Jack, Queen King equals to 10 points each
// Ace can either be 1 or 11 points

// Max point is 21
var sumLimit = 21;
// Dealer always hits until sum > 16
var dealerHitThreshold = 16;
// Player chose to stand where player no longer hit until end of game - Michelle, why is this false not true?
var playerChoseToStand = false;
// Keep track of game ends
var gameOver = false;

var playerHand = [];
var computerHand = [];

// Deal a card to the given hand
var dealCardToHand = function (hand) {
  hand.push(cardDeck.pop());
};

// Get sum of card in hand
var getHandSum = function (hand) {
  var numAcesInHand = 0;
  var sum = 0;

  var counter = 0;
  while (counter < hand.length) {
    var currCard = hand[counter];
    if (currCard.rank >= 2 && currCard.rank <= 10) {
      sum += currCard.rank;
      // if card rank is 11-13 (j,q,k), value is 10
    } else if (currCard.rank >= 11 && currCard.rank <= 13) {
      sum += 10;
      // if card is Ace, value is 11 by default
    } else if (currCard.rank === 1) {
      numAcesInHand += 1;
      sum += 11;
    }
    counter = counter + 1;
  }
  // // dont understand this part
  // for (let i = 0; i < hand.length; i += 1) {
  //   var currCard = hand[i];
  //   // if card rank is 2-10, value same as rank
  //   if (currCard.rank >= 2 && currCard.rank <= 10) {
  //     sum += currCard.rank;
  //     // if card rank is 11-13 (j,q,k), value is 10
  //   } else if (currCard.rank >= 11 && currCard.rank <= 13) {
  //     sum += 10;
  //     // if card is Ace, value is 11 by default
  //   } else if (currCard.rank === 1) {
  //     numAcesInHand += 1;
  //     sum += 11;
  //   }
  // }
  // if sum is greater than sum limit and hand contains Aces, convert Aces to value of 1 until sum is <= to sum limit

  if (sum > sumLimit && numAcesInHand > 0) {
    var sumCounter = 0;
    while (sumCounter < numAcesInHand) {
      sum = sum - 10;
      if (sum <= sumLimit) {
        break;
      }
    }
  }
  //   // dont understand this part. What does 'break' here means?
  //   for (let i = 0; i < numAcesInHand; i += 1) {
  //     sum -= 10;
  //     if (sum <= sumLimit) {
  //       break;
  //     }
  //   }
  // }
  return sum;
};

// Return whether hand contains a Blackjack combination
var isBJ = function (hand) {
  return hand.length == 2 && getHandSum(hand) == sumLimit;
};

// Convert hand to a string where objects within the array are stringified - I dont understand this part. What is .map function?

// The map() method in JavaScript creates an array by calling a specific function on each element present in the parent array. - need to understand more

var convertHandToString = function (hand) {
  var handCounter = 0;
  var result = "";
  while (handCounter < hand.length) {
    result = result + ` ${hand[handCounter].name} `;
    handCounter = handCounter + 1;
  }
  // return `[${hand.map((card) => card.name)}];`;
  console.log("result", result);
  return result;
};

var getDefaultOutput = function () {
  return `Player has hand (${convertHandToString(
    playerHand
  )}) <br> with total points: ${getHandSum(
    playerHand
  )}. <br><br> Computer has hand (${convertHandToString(
    computerHand
  )}) with total points: ${getHandSum(computerHand)}.`;
};

var main = function (input) {
  if (gameOver) {
    return "Game over 😢. Please refresh to play again.";
  }

  // if initial hands not dealt, deal initial hands
  if (playerHand.length === 0) {
    var dealCardCounter = 0;
    while (dealCardCounter < 2) {
      dealCardToHand(playerHand);
      dealCardToHand(computerHand);
      dealCardCounter = dealCardCounter + 1;
    }

    console.log("player hand", playerHand);
    console.log("computer hand", computerHand);
    if (isBJ(computerHand)) {
      gameOver = true;
      return `${getDefaultOutput()} <br><br> Computer has Blackjack 🂡 and wins. Please refresh to start the game again.`;
    }

    if (isBJ(playerHand)) {
      gameOver = true;
      return `${getDefaultOutput()} <br><br> Player has Blackjack 🂡 and wins. Please refresh to start the game again.`;
    }

    // cards are displayed to user
    return `${getDefaultOutput()} <br><br> Please enter 👉 "hit" or "stand", then press Submit button`;
  }

  // Begins a new action where player needs to decide to hit or stand
  if (!playerChoseToStand) {
    if (input !== "hit" && input !== "stand") {
      return 'Please input either 👉 "hit" or "stand" to continue the game of Blackjack 🂡';
    }
    if (input === "hit") {
      dealCardToHand(playerHand);
      if (getHandSum(playerHand) > sumLimit) {
        gameOver = true;
        return `${getDefaultOutput()} <br><br> Player has busted 😢 and loses. Please refresh to play again.`;
      }
    }
    if (input === "stand") {
      playerChoseToStand = true;
    }
  }
  // computer decides to hit or stand
  var computerHandSum = getHandSum(computerHand);
  // computer has <= 16 and needs to get more cards
  if (computerHandSum <= dealerHitThreshold) {
    dealCardToHand(computerHand);
    computerHandSum = getHandSum(computerHand);
    if (computerHandSum > sumLimit) {
      gameOver = true;
      return `${getDefaultOutput()}<br><br> Computer has busted and loses. Please refresh to play again.`;
    }
  }
  // if both players have not busted and choose to stand. Decide who wins. Both >= 16 but <=21
  if (playerChoseToStand && computerHandSum > dealerHitThreshold) {
    gameOver = true;
    if (getHandSum(playerHand) > computerHandSum) {
      return `${getDefaultOutput()}<br><br> Player has a higher score. Player wins 🏆! Please refresh to play again.`;
    }
    return `${getDefaultOutput()}<br><br> Computer has a higher score. Computer wins 🏆! Please refresh to play again.`;
  }
  // If game is not over yet, show current game status
  return `${getDefaultOutput()}<br><br> If player has not chosen to stand, please enter 👉 "hit" or "stand". <br><br> Else, please click on "Submit" button to see Computer's next move.`;
};
