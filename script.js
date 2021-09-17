// Creating a deck
var makeDeck = function () {
  //Initialise card deck
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

// Shuffling the deck
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

var shuffledDeck = shuffleCards(makeDeck());

//Check that a shuffled deck exists
console.log(shuffledDeck);

//Helper function to check for player's immediate win upon dealing
var checkTwentyOne = function (playerDrawOne, playerDrawTwo) {
  var firstValue = playerDrawOne;
  var secondValue = playerDrawTwo;
  if (firstValue > 10) {
    firstValue = 10;
  }
  if (secondValue > 10) {
    secondValue = 10;
  }
  if (firstValue == 1) {
    firstValue = 11;
  }
  if (secondValue == 1) {
    secondValue = 11;
  }
  if (firstValue + secondValue > 21 && firstValue == 11) {
    firstValue = 1;
  }
  if (firstValue + secondValue > 21 && secondValue == 11) {
    secondValue = 1;
  }
  console.log(firstValue);
  console.log(secondValue);
  currentTotal = firstValue + secondValue;
  console.log(currentTotal);
  if (firstValue + secondValue == 21) {
    return 1;
  } else return -1;
};

// Initialise starting conditions
var gameMode = "";
var playerHand = [];
var dealerHand = [];
var firstCheckResult;
var currentTotal;

var main = function (input) {
  var myOutputValue;
  if (gameMode == "") {
    var dealCounter = 0;
    while (dealCounter < 2) {
      var playerCard = shuffledDeck.pop();
      var dealerCard = shuffledDeck.pop();
      console.log(playerCard);
      console.log(dealerCard);
      playerHand.push(playerCard);
      dealerHand.push(dealerCard);
      dealCounter += 1;
    }
    gameMode = "firstCheck";
    myOutputValue = `You drew ${playerHand[0].name} of ${playerHand[0].suit} and ${playerHand[1].name} of ${playerHand[1].suit}.`;
  }
  if (gameMode == "firstCheck") {
    //Check if player's hand adds up to 21
    firstCheckResult = checkTwentyOne(playerHand[0].rank, playerHand[1].rank);
    //If player's hand adds up to 21, immediate win for player. Else change game mode to hit or stand.
    if (firstCheckResult == 1) {
      return `You won! ${myOutputValue} These add up to 21.`;
    } else if (firstCheckResult == -1) {
      gameMode = "hitOrStand";
      return `${myOutputValue} These do not add up to 21. Type "h" to hit and "s" to stand. Just so you know, the dealer's 1st card is ${dealerHand[0].name} of ${dealerHand[0].suit}.`;
    }
  }
  if (gameMode == "hitOrStand") {
    //If player calls for a hit, add a new card to array. Share total value of cards at present.
    //If player calls to stand, change game mode to evaluation.
  }
  return myOutputValue;
};
