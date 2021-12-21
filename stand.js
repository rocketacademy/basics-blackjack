//function to make a deck of cards
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["Hearts", "Diamonds", "Clubs", "Spades"];

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
      var cardValue = rankCounter;
      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "Ace";
        cardValue = 11;
      } else if (cardName == 11) {
        cardName = "Jack";
        cardValue = 10;
      } else if (cardName == 12) {
        cardName = "Queen";
        cardValue = 10;
      } else if (cardName == 13) {
        cardName = "King";
        cardValue = 10;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: cardValue,
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

// Shuffle the deck and save it in a new variable shuffledDeck
// to communicate that we have shuffled the deck.
//function for player and dealer to draw 2 cards and push it into their arrays
var drawCards = function () {
  console.log(shuffledDeck);
  //1 card
  playerHand.push(shuffledDeck.pop());
  //2 cards
  playerHand.push(shuffledDeck.pop());
  console.log(`playerHand`);
  console.log(playerHand);
  //1 card
  dealerHand.push(shuffledDeck.pop());
  //2 cards
  dealerHand.push(shuffledDeck.pop());
  console.log(`dealerHand`);
  console.log(dealerHand);
};

//function to add the values of the cards
//if there is JQK, value = 10
//if there is ace, value is 1 or 11
//loop through hands to add the values up for 2 or more cards
//function must work for both dealer and player (not person-specific)
var checkScore = function (cardArray) {
  console.log(cardArray);
  var valueInHand = 0;
  for (var i = 0; i < cardArray.length; i += 1) {
    console.log("running");
    if (cardArray[i].value == 10) {
      valueInHand = valueInHand + 10;
    } else if (cardArray[i].value == 11) {
      valueInHand = valueInHand + 11;
    } else {
      valueInHand = valueInHand + cardArray[i].rank;
    }
  }
  console.log(`card value:`);
  console.log(valueInHand);
  return valueInHand;
};

var fifteenRun = function (input) {
  if (currentGameMode == FIFTEEN_RUN) {
    if (playerValue == 15 && input == 1) {
      myOutputValue = `You have chosen to surrender.`;
      currentGameMode = END_GAME;
    } else if (playerValue == 15 && input == 2) {
      myOutputValue = `You have chosen to continue.`;
      currentGameMode = PLAYER_HIT_STAND;
    }
    if (dealerValue == 15) {
      myOutputValue = `The total value of the dealer's cards is 15. The dealer choose to surrender and not play this round.`;
      currentGameMode = END_GAME;
    } else return ` Please enter either 1 or 2 only.`;
  }
  return myOutputValue;
};

//global variables for different games modes and player/dealer hands
GAME_START = "game start get cards";
CHECK_BLACKJACK = "check for blackjack";
PLAYER_HIT_STAND = "player to choose hit/stand";
DEALER_HIT_STAND = "dealer to choose hit/stand";
CHECK_WHO_WIN = "check who win";
END_GAME = "the game ends and restarts";
FIFTEEN_RUN = "player can run at 15";
SURRENDER_CONTINUE = "player can choose to surrender or continue";
var currentGameMode = GAME_START;
var playerHand = [];
var dealerHand = [];
var playerValue = 0;
var dealerValue = 0;
var shuffledDeck = shuffleCards(makeDeck());

//function to display player/dealer hand in a loop
var displayAllCards = function (playerHandArray, dealerHandArray) {
  var playerMessage = `<b>Player's Card: </b><br><br>`;
  var dealerMessage = `<br><b>Dealer's Card: </b><br><br>`;
  for (var i = 0; i < playerHandArray.length; i += 1) {
    console.log("running player display");
    playerMessage =
      playerMessage +
      playerHandArray[i].name +
      " of " +
      playerHandArray[i].suit +
      `<br>`;
  }
  for (var i = 0; i < dealerHandArray.length; i += 1) {
    console.log("running dealer display");
    dealerMessage =
      dealerMessage +
      dealerHandArray[i].name +
      " of " +
      dealerHandArray[i].suit +
      `<br>`;
  }

  return playerMessage + dealerMessage + "<br>";
};

//function for game flow
var stand = function () {
  currentGameMode = PLAYER_HIT_STAND;
  if (currentGameMode == PLAYER_HIT_STAND) {
    var startSentence = displayAllCards(playerHand, dealerHand);
    var playerValue = checkScore(playerHand);
    var dealerValue = checkScore(dealerHand);
    while (dealerValue < 17) {
      dealerHand.push(shuffledDeck.pop());
      console.log(`dealer's hand after stand:`);
      console.log(dealerHand);
      dealerValue = checkScore(dealerHand);
    }
    if (dealerValue >= 17) {
      var playerValue = checkScore(playerHand);
      var dealerValue = checkScore(dealerHand);
      endGameMessage =
        startSentence +
        `<u>Player Value: ${playerValue} <br> Dealer Value: ${dealerValue}</u> <br>`;
      //condition if both busted
      if (playerValue >= 21 && dealerValue >= 21) {
        myOutputValue =
          endGameMessage + `It's a tie! Both dealer and player busted.`;
      }
      //condition if both not busted but player value is more than dealer.
      if (playerValue > dealerValue && dealerValue <= 21 && playerValue <= 21) {
        myOutputValue = endGameMessage + `<br> Player win.`;
      }
      //condition if dealer busted
      if (playerValue <= 21 && dealerValue >= 21) {
        myOutputValue = endGameMessage + `<br> Player win. Dealer Busted.`;
      }
      //condition if both not busted but dealer more than player
      if (dealerValue > playerValue && dealerValue <= 21 && playerValue <= 21) {
        myOutputValue = endGameMessage + `<br> Dealer win.`;
      }
      //condition if player busted
      if (dealerValue <= 21 && playerValue >= 21) {
        myOutputValue = endGameMessage + `<br>  Dealer win. Player Busted.`;
      }
      //condition if both same value and not busted
      if (
        dealerValue == playerValue &&
        dealerValue <= 21 &&
        playerValue <= 21
      ) {
        myOutputValue = endGameMessage + `<br> It's a tie!`;
      }
      currentGameMode = END_GAME;
      return myOutputValue;
    }
    myOutputValue =
      startSentence +
      `You have chosen to stand with a total score of ${playerValue}. Dealer's turn. Please click submit again.`;
    currentGameMode = CHECK_WHO_WIN;
    console.log(currentGameMode);
    return myOutputValue;
  }
  // End game. Reset all the global variables for a new game.
  if (currentGameMode == END_GAME) {
    playerHand = [];
    dealerHand = [];
    dealerValue = 0;
    dealerValue = 0;
    shuffledDeck = shuffleCards(makeDeck());
    myOutputValue = `Please press "Submit" to restart the game!`;
    currentGameMode = GAME_START;
    return myOutputValue;
  }
};
