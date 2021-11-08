// Deck is shuffled.
// User clicks Submit to deal cards.
// The cards are analysed for game winning conditions, e.g. Blackjack.
// The cards are displayed to the user.
// The user decides whether to hit or stand, using the submit button to submit their choice.
// The user's cards are analysed for winning or losing conditions.
// The computer decides to hit or stand automatically based on game rules.
// The game either ends or continue

// global variables
var playerHand = [];
var computerHand = [];
var gameMode = "draw cards";
var playerHitOrStandMode = false;

// make deck
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

// shuffle deck
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

// create deck and shuffle deck
var deck = makeDeck();
var shuffledDeck = shuffleCards(deck);

// player draw 2 cards
var playerDrawCards = function () {
  var playerCardOne = shuffledDeck.pop();
  var playerCardTwo = shuffledDeck.pop();

  playerHand.push(playerCardOne, playerCardTwo);
  console.log("player hand");
  console.log(playerHand);

  return `Player has ${playerCardOne.name} of ${playerCardOne.suit} and ${playerCardTwo.name} of ${playerCardTwo.suit}`;
};

// computer draw 2 cards
var computerDrawCards = function () {
  var computerCardOne = shuffledDeck.pop();
  var computerCardTwo = shuffledDeck.pop();

  computerHand.push(computerCardOne, computerCardTwo);
  console.log("computer hand");
  console.log(computerHand);

  return `Computer has ${computerCardOne.name} of ${computerCardOne.suit} and ${computerCardTwo.name} of ${computerCardTwo.suit}`;
};

// Comparing both hands and determining a winner. The possible scenarios are:
// A tie. When both the player and dealer have the same total hand values - or if both draw Blackjack
// A Blackjack win. When either player or dealer draw Blackjack.
// A normal win. When neither draw Blackjack, the winner is decided by whomever has the higher hand total.

// compute ranking
var getHandSum = function (hand) {
  var numAcesInHand = 0;
  var sum = 0;
  var counter = 0;
  while (counter < hand.length) {
    var currCard = hand[counter];
    // If card is Ace, value is 11 by default
    if (currCard.rank === 1) {
      numAcesInHand += 1;
      sum += 11;
    } else {
      sum += currCard.rank;
    }
    counter = counter + 1;
  }
  return sum;
};

var playerTotalHandRank = function () {
  var playerHandRankSum = getHandSum(playerHand);
  console.log(`player total score: ${playerHandRankSum}`);
  return playerHandRankSum;
};

var computerTotalHandRank = function () {
  var computerHandRankSum = getHandSum(computerHand);
  console.log(`computer total score: ${computerHandRankSum}`);
  return computerHandRankSum;
};

var playAgain = function () {
  gameMode = "draw cards";
  playerHand = [];
  computerHand = [];
  playerHitOrStandMode = false;
  return `<br><br>Click submit to play again!`;
};

// compare hands
var compareHands = function (input) {
  while (gameMode == "draw cards") {
    // computer blackjack
    if (computerTotalHandRank() == 21) {
      return `Computer wins with Blackjack ${computerTotalHandRank()}!. ${playAgain()}`;
      // player blackjack
    } else if (playerTotalHandRank() == 21) {
      return `Player wins with Blackjack ${playerTotalHandRank()}!. ${playAgain()}`;
      // player and computer bust
    } else if (computerTotalHandRank() > 21 && playerTotalHandRank() > 21) {
      return `It is a tie between Player and Computer.<br><br>Player score: ${playerTotalHandRank()} and Computer score: ${computerTotalHandRank()}. ${playAgain()}`;
      // computer bust
    } else if (computerTotalHandRank() > 21) {
      return `Player wins! Computer busted with ${computerTotalHandRank()}.<br><br>Player score: ${playerTotalHandRank()} and Computer score: ${computerTotalHandRank()}. ${playAgain()}`;
      // go to player hit or stand mode
    } else gameMode = "player turn";
    return `Player score: ${playerTotalHandRank()} and Computer score: ${computerTotalHandRank()}<br><br>hit or stand.`;
  }

  while (gameMode == "player turn") {
    // player blackjack
    if (playerTotalHandRank() == 21) {
      return `Player wins with Blackjack (21)!<br><br>Player score: ${playerTotalHandRank()} and Computer score: ${computerTotalHandRank()}. ${playAgain()}`;
      // player stand
    } else
      return `Player score: ${playerTotalHandRank()} and Computer score: ${computerTotalHandRank()}<br><br>hit or stand.`;
  }

  while (gameMode == "computer turn") {
    // player and computer above 21
    if (computerTotalHandRank() > 21 && playerTotalHandRank() > 21) {
      return `It is a tie between Player and Computer.<br><br>Player score: ${playerTotalHandRank()} and Computer score: ${computerTotalHandRank()}. ${playAgain()}`;
      // computer bust > 21
    } else if (computerTotalHandRank() > 21 && playerTotalHandRank() < 21) {
      return `Player wins! Computer busted with ${computerTotalHandRank()}.<br><br>Player score: ${playerTotalHandRank()} and Computer score: ${computerTotalHandRank()}. ${playAgain()}`;
      // player bust > 21 but computer < 21
    } else if (computerTotalHandRank() < 21 && playerTotalHandRank() > 21) {
      return `Computer wins! Player busted with ${playerTotalHandRank()}.<br><br>Player score: ${playerTotalHandRank()} and Computer score: ${computerTotalHandRank()}. ${playAgain()}`;
      // player larger than computer
    } else if (playerTotalHandRank() > computerTotalHandRank()) {
      return `Player wins!<br><br>Player score: ${playerTotalHandRank()} and Computer score: ${computerTotalHandRank()}. ${playAgain()}`;
      // player smaller than computer
    } else if (playerTotalHandRank() < computerTotalHandRank()) {
      return `Computer wins!<br><br>Player score: ${playerTotalHandRank()} and Computer score: ${computerTotalHandRank()}. ${playAgain()}`;
      // player and computer tie
    } else if (playerTotalHandRank() == computerTotalHandRank()) {
      return `It is a tie between Player and Computer.<br><br>Player score: ${playerTotalHandRank()} and Computer score: ${computerTotalHandRank()}. ${playAgain()}`;
      // computer blackjack
    } else if (computerTotalHandRank() == 21) {
      return `Computer wins with Blackjack (21)!<br><br>Player score: ${playerTotalHandRank()} and Computer score: ${computerTotalHandRank()}. ${playAgain()}`;
    }
  }
};

var playerHitOrStand = function (input) {
  // player choose to hit
  if (input == "hit" && gameMode == "player turn") {
    var playerHitCard = shuffledDeck.pop();
    playerHand.push(playerHitCard);
    console.log("player hit hand");
    console.log(playerHand);

    return `Player hits: ${playerHitCard.name} of ${
      playerHitCard.suit
    }.<br><br> ${compareHands()}`;
    // player choose to stand
  } else if (input == "stand" && gameMode == "player turn") {
    playerHitOrStandMode = true;
    gameMode = "computer turn";

    return `Player stands.<br><br>Player score: ${playerTotalHandRank()} and Computer score: ${computerTotalHandRank()}.<br><br>Click submit.`;
    // if input is empty
  } else if (input == "" && gameMode == "player turn") {
    return `Please enter hit or stand.`;
  }
};

var computerHitOrStand = function () {
  //computer to hit if total score is below 16
  if (
    computerTotalHandRank() < 16 &&
    playerHitOrStandMode == true &&
    gameMode == "computer turn"
  ) {
    var computerHitCard = shuffledDeck.pop();
    computerHand.push(computerHitCard);
    console.log("computer hit hand");
    console.log(computerHand);

    return `Computer hits: ${computerHitCard.name} of ${
      computerHitCard.suit
    }.<br><br>Player score: ${playerTotalHandRank()} and Computer score: ${computerTotalHandRank()}.<br><br>Click submit.`;

    // computer to proceed to compare hands if equals or above 16
  } else if (
    computerTotalHandRank() >= 16 &&
    playerHitOrStandMode == true &&
    gameMode == "computer turn"
  ) {
    return compareHands();
  }
};

// main blackjack
var main = function (input) {
  var myOutputValue = "";
  if (gameMode == "draw cards") {
    myOutputValue = `${playerDrawCards()} <br> ${computerDrawCards()} <br> ${compareHands()}`;
    console.log(`game mode: ${gameMode}`);
  } else if (gameMode == "player turn") {
    myOutputValue = playerHitOrStand(input);
    console.log(`game mode: ${gameMode}`);
  } else if (gameMode == "computer turn") {
    myOutputValue = computerHitOrStand();
    console.log(`game mode: ${gameMode}`);
  }
  return myOutputValue;
};
