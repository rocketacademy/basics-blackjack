// There will be only two players. One human and one computer (for the Base solution).
// The computer will always be the dealer.
// Each player gets dealt two cards to start.
// The player goes first, and decides if they want to hit (draw a card) or stand (end their turn).
// The dealer has to hit if their hand is below 17.
// Each players' score is the total of their card ranks. Jacks/Queen/Kings are 10. Aces can be 1 or 11.
// The player who is closer to, but not above 21 wins the hand.

// User clicks Submit to deal cards.
// The cards are analysed for game winning conditions, e.g. Blackjack.
// The cards are displayed to the user.
// The user decides whether to hit or stand, using the submit button to submit their choice.
// The user's cards are analysed for winning or losing conditions.
// The computer decides to hit or stand automatically based on game rules.
// The game either ends or continues.

// winning condition: closest to 21 and not the same sum with dealer

// Function to make the deck
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
      var blackJackRank = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
        blackJackRank = 11;
      } else if (cardName == 11) {
        cardName = "jack";
        blackJackRank = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        blackJackRank = 10;
      } else if (cardName == 13) {
        cardName = "king";
        blackJackRank = 10;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: blackJackRank,
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

// Function to shuffle deck
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = Math.floor(Math.random() * cardDeck.length);
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
var deck = [];
deck = makeDeck();
var shuffledDeck = shuffleCards(deck);

// function to deal 2 cards in the beginning
var dealCards = function (initialCardsDealt) {
  var initialCardsDealt = [];
  var numberOfCardsDealtInTheBeginning = 2;
  for (let i = 0; i < numberOfCardsDealtInTheBeginning; i++) {
    var dealtCards = shuffledDeck.pop();
    initialCardsDealt.push(dealtCards);
  }
  return initialCardsDealt;
};

//function to show the name and the suit of the cards on hand
var toDisplayCardsOnHand = function (playerOrComputer) {
  var cardsOnHandObject = playerOrComputer;
  var cardsOnHandArray = "";
  for (let j = 0; j < cardsOnHandObject.length; j++) {
    cardsOnHandArray = `${cardsOnHandArray} 
      ${cardsOnHandObject[j].name} of
      ${cardsOnHandObject[j].suit},`;
  }
  return cardsOnHandArray;
};

// function to calculate the sum of the cards
var sumRankCardsOnHand = function (playerOrComputer) {
  var cardsOnHandObject = playerOrComputer;
  var totalRank = 0;
  for (let k = 0; k < cardsOnHandObject.length; k++) {
    totalRank = totalRank + cardsOnHandObject[k].rank;
  }
  // to account that ace can be 11 or 1
  for (let l = 0; l < playerOrComputer.length; l++) {
    if (playerOrComputer[l].name == "ace") {
      aceCounter = aceCounter + 1;
    }
  }
  // console.log(aceCounter);
  if (aceCounter > 0 && totalRank > 21) {
    totalRank = totalRank - (aceCounter - 1) * 10;
    // console.log(totalRank);
    if (totalRank > 21) {
      totalRank = totalRank - 10;
      // console.log(totalRank);
    }
  }
  aceCounter = 0;
  return totalRank;
};

// function for the phase one, dealing two cards
var getTwoCards = function () {
  playerCards = dealCards();
  computerCards = dealCards();
  console.log(playerCards);
  console.log(computerCards);
  playerCardsString = toDisplayCardsOnHand(playerCards);
  computerCardsString = toDisplayCardsOnHand(computerCards);
  playerCardsSum = sumRankCardsOnHand(playerCards);
  computerCardSum = sumRankCardsOnHand(computerCards);
  if (computerCardSum == 21 || playerCardsSum == 21) {
    outcome = generateEarlyWinningConditions();
    return outcome;
  }
  gameMode = HITORSTANDPHASE;
  return `${playerHandMessage}: ${playerCardsString} with sum = ${playerCardsSum}<br>${computerHandMessage}: ${computerCardsString} with sum = ${computerCardSum}<br><br>${hitOrStandMessage}`;
};

// function to hit or stand for player
var toHitInPlayerPhase = function (dealtCards) {
  dealtCards = shuffledDeck.pop();
  console.log(dealtCards);
  playerCards.push(dealtCards);
  playerCardsString = toDisplayCardsOnHand(playerCards);
  playerCardsSum = sumRankCardsOnHand(playerCards);
  if (
    playerCardsSum > 21 ||
    playerCardsSum == 21 ||
    playerCardsSum == computerCardSum
  ) {
    outcome = generateEarlyWinningConditions();
    return outcome;
  }
  return `${playerHandMessage}: ${playerCardsString} with sum = ${playerCardsSum}<br>${computerHandMessage}: ${computerCardsString} with sum = ${computerCardSum}<br><br>${hitOrStandMessage}`;
};

var generateEarlyWinningConditions = function () {
  if (gameMode == DEALERPHASE) {
    if (computerCardSum > 21) {
      gameMode = DEALINGPHASE;
      return `Computer drew ${
        computerCards.length - 2
      } card(s) and went over 21. You won!<br><br>${playerHandMessage}: ${playerCardsString} with sum = ${playerCardsSum}<br>${computerHandMessage}: ${computerCardsString} with sum = ${computerCardSum}<br><br>${REPLAY}`;
    }
    if (computerCardSum == 21) {
      gameMode = DEALINGPHASE;
      return `Computer drew ${
        computerCards.length - 2
      } card(s) and got 21. You lost!<br><br>${playerHandMessage}: ${playerCardsString} with sum = ${playerCardsSum}<br>${computerHandMessage}: ${computerCardsString} with sum = ${computerCardSum}<br><br>${REPLAY}`;
    }
  }
  if (playerCardsSum > 21) {
    gameMode = DEALINGPHASE;
    return `You went over 21, you lose!<br><br>${playerHandMessage}: ${playerCardsString} with sum = ${playerCardsSum}<br>${computerHandMessage}: ${computerCardsString} with sum = ${computerCardSum}<br><br>${REPLAY}`;
  }
  if (playerCardsSum == 21) {
    gameMode = DEALERPHASE;
    return `You got 21!! You haven't won yet, it is now computer's turn. Please click 'submit' to continue.<br><br>${playerHandMessage}: ${playerCardsString} with sum = ${playerCardsSum}<br>${computerHandMessage}: ${computerCardsString} with sum = ${computerCardSum}`;
  }
  if (playerCardsSum == computerCardSum) {
    return `Your sum is equivalent to computer. You need to be higher than computer win.<br><br>${playerHandMessage}: ${playerCardsString} with sum = ${playerCardsSum}<br>${computerHandMessage}: ${computerCardsString} with sum = ${computerCardSum}<br><br>${hitOrStandMessage}`;
  }
  if (computerCardSum == 21) {
    gameMode = DEALINGPHASE;
    return `You lost! Computer got 21.<br><br>${playerHandMessage}: ${playerCardsString} with sum = ${playerCardsSum}<br>${computerHandMessage}: ${computerCardsString} with sum = ${computerCardSum}<br><br>${REPLAY}`;
  }
};

var toHitInComputerPhase = function (dealtCards) {
  if (computerCardSum >= 17) {
    var result = toWinOrLose();
    return result;
  }
  while (computerCardSum < 17) {
    dealtCards = shuffledDeck.pop();
    console.log(dealtCards);
    computerCards.push(dealtCards);
    computerCardsString = toDisplayCardsOnHand(computerCards);
    computerCardSum = sumRankCardsOnHand(computerCards);
  }
  if (computerCardSum > 21 || computerCardSum == 21) {
    var outcome = generateEarlyWinningConditions();
    return outcome;
  }
  var results = toWinOrLose();
  return `Computer drew ${computerCards.length - 2} card(s).${results}`;
};

var toWinOrLose = function (finalResults) {
  gameMode = DEALINGPHASE;
  if (playerCardsSum > computerCardSum) {
    finalResults = `You won!<br><br>${playerHandMessage}: ${playerCardsString} with sum = ${playerCardsSum}<br>${computerHandMessage}: ${computerCardsString} with sum = ${computerCardSum}<br><br>${REPLAY}`;
    return finalResults;
  }
  finalResults = `You lost!<br><br>${playerHandMessage}: ${playerCardsString} with sum = ${playerCardsSum}<br>${computerHandMessage}: ${computerCardsString} with sum = ${computerCardSum}<br><br>${REPLAY}`;
  return finalResults;
};

// global variables
var DEALINGPHASE = "Dealing phase";
var gameMode = DEALINGPHASE;
var HITORSTANDPHASE = "Player's hit or stand phase";
var DEALERPHASE = "Dealer's turn";
var playerHandMessage = `Player's cards`;
var computerHandMessage = `Computer's cards`;
var hitOrStandMessage = `Would you like to hit or stand?`;
var playerCards = [];
var computerCards = [];
var playerCardsString = "";
var computerCardsString = "";
var playerCardsSum = 0;
var computerCardSum = 0;
var REPLAY = "Click 'submit' to replay.";
var aceCounter = 0;

var main = function (input) {
  var myOutputValue = "";

  if (gameMode == DEALINGPHASE) {
    myOutputValue = getTwoCards();
    //if dealer gets 21 from the start, player lose straight away
    // phase two = hit or stand phase
  } else if (gameMode == HITORSTANDPHASE) {
    myOutputValue = "Please enter 'hit' or 'stand'";
    if (input == "hit") {
      myOutputValue = toHitInPlayerPhase();
    }
    if (input == "stand") {
      gameMode = DEALERPHASE;
      myOutputValue =
        "You have decided to stand, it is now dealer's turn. Please click 'submit' to continue.";
    }
  } else if (gameMode == DEALERPHASE) {
    myOutputValue = toHitInComputerPhase();
  }
  return myOutputValue;
};
