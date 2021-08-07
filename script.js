var main = function (input) {
  var myOutputValue = "hello world";
  //at the beginning, draw cards
  console.log("P: ", playerHand, " C: ", computerHand);
  //compare sum
  var sumOfPlayerHand = totalSumOfHand(playerHand);
  console.log("sumOfPlayerHand", sumOfPlayerHand);
  var sumOfComputerHand = totalSumOfHand(computerHand);
  console.log("sumOfComputerHand", sumOfComputerHand);

  if (sumOfPlayerHand == 21 && sumOfComputerHand == 21) {
    myOutputValue = "Everyone Ban Luck!";
    if (sumOfPlayerHand == 21 && sumOfComputerHand != 21) {
      myOutputValue = "Player Ban Luck!";
    } else if (sumOfPlayerHand != 21 && sumOfComputerHand == 21) {
      myOutputValue = "Computer Ban Luck!";
    }
  } else if (sumOfPlayerHand < 21 && sumOfPlayerHand > sumOfComputerHand) {
    myOutputValue = "Player Wins!";
  } else if (sumOfComputerHand < 21 && sumOfComputerHand > sumOfPlayerHand) {
    myOutputValue = "Computer Wins!";
  } else if (
    sumOfComputerHand < 21 &&
    sumOfPlayerHand < 21 &&
    sumOfComputerHand == sumOfPlayerHand
  ) {
    myOutputValue = "ZAO (i.e. it's a tie)";
  }
  return myOutputValue;
};

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
      var value = rankCounter;
      if (rankCounter == 1) {
        value = 1;
      } else if (rankCounter == 11) {
        value = 10;
      } else if (rankCounter == 12) {
        value = 10;
      } else if (rankCounter == 13) {
        value = 10;
      }
      // Create a new card with the current name, suit, and rank (and value)
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: value,
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

//create playing deck
var playingDeck = shuffleCards(makeDeck());

var generateHand = function () {
  var hand = [];
  for (var i = 0; i < 2; i += 1) {
    hand.push(playingDeck.pop());
  }
  return hand;
};
var playerHand = generateHand(playingDeck);
var computerHand = generateHand(playingDeck);

var totalSumOfHand = function (hand) {
  var sum = 0;
  for (var i = 0; i < hand.length; i += 1) {
    var sum = sum + hand[i].value;
  }
  return sum;
};
