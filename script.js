/////////////// Pseudocode ////////////////////
// First Version: Compare Initial Hands to Determine Winner
// Aim for a playable game. The essence of blackjack requires:
// 1. Two players - a player and a dealer (computer).
// 2. A deck of cards.
// 3. A starting hand of 2 cards for each player.
// 4. Comparing both hands and determining a winner. The possible scenarios are:
// 4.1 A tie. When both the player and dealer have the same total hand values - or if both draw Blackjack
// 4.2 Blackjack win. When either player or dealer draw Blackjack.
// 4.3 normal win. When neither draw Blackjack, the winner is decided by whomever has the higher hand total.

// Global variables
var GAME_START = "game start";
var GAME_CARDS_DRAWN = "cards are drawn";
var GAME_RESULTS_SHOWN = "results are shown";
var GAME_HIT_OR_STAND = "hit or stand";
var currentGameMode = GAME_START;

// Each player multiple cards
var playerCards = [];
var dealerCards = [];

// Empty deck of cards
var shuffledDeck = [];

////// Deck helper functions //////

// A deck of cards
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

// Random number generator
var randomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle card function
var shuffleCards = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomCardIndex = randomIndex(cardDeck.length);
    // Assign random card and current card to exchange value
    var randomCard = cardDeck[randomCardIndex];
    var currentCard = cardDeck[currentIndex];
    cardDeck[randomCardIndex] = currentCard;
    cardDeck[currentIndex] = randomCard;
    currentIndex += 1;
  }
  return cardDeck;
};

///// Helper functions ///////

// Checks for black jack
var checkForBlackJack = function (cardsOnHand) {
  // Loop through 2 cards
  var playerCardOne = cardsOnHand[0];
  var playerCardTwo = cardsOnHand[1];
  var isBlackJack = false;

  // 2 possibilities
  if (
    (playerCardOne.name == "ace" && playerCardTwo.rank >= 10) ||
    (playerCardTwo.name == "ace" && playerCardOne.rank >= 10)
  ) {
    isBlackJack = true;
  }

  return isBlackJack;
};

// Calculate one player cards value
var calculateTotalHandValue = function (cardsOnHand) {
  var totalCardsValue = 0;
  // Counter for number of aces
  var aceCounter = 0;

  // Loop through cards to add up the ranks
  var index = 0;
  while (index < cardsOnHand.length) {
    var currCard = cardsOnHand[index];

    // King, queen, and jack = 10
    if (
      currCard.name == "king" ||
      currCard.name == "queen" ||
      currCard.name == "jack"
    ) {
      totalCardsValue = totalCardsValue + 10;
    }
    // Ace = 11
    else if (currCard.name == "ace") {
      totalCardsValue = totalCardsValue + 11;
      aceCounter = aceCounter + 1;
      // Other numbered cards are valued by their ranks
    } else {
      totalCardsValue = totalCardsValue + currCard.rank;
    }
    index = index + 1;
  }

  // Reset ace counter
  index = 0;
  // Loop for aces found, deduct 10 totalCardsValue
  // when totalCardsValue > 21.
  while (index < aceCounter) {
    if (totalCardsValue > 21) {
      totalCardsValue = totalCardsValue - 10;
    }
    index = index + 1;
  }

  return totalCardsValue;
};

// Displays each players card value
var displayPlayerAndDealerCards = function (
  playerCardsArray,
  dealerCardsArray
) {
  var playerMessage = "Player hand:<br>";
  var index = 0;
  while (index < playerCardsArray.length) {
    playerMessage =
      playerMessage +
      (index + 1) +
      ". " +
      playerCardsArray[index].name +
      " of " +
      playerCardsArray[index].suit +
      "<br>";
    index = index + 1;
  }

  index = 0;
  var dealerMessage = "Dealer hand:<br>";
  while (index < dealerCardsArray.length) {
    dealerMessage =
      dealerMessage +
      (index + 1) +
      ". " +
      dealerCardsArray[index].name +
      " of " +
      dealerCardsArray[index].suit +
      "<br>";
    index = index + 1;
  }

  return playerMessage + "<br>" + dealerMessage;
};

// Displays total cards values of each players
var displayHandTotalValues = function (playerCardsValue, dealerCardsValue) {
  var totalHandValueMessage =
    "<br>Player cards value: " +
    playerCardsValue +
    "<br>Dealer cards value: " +
    dealerCardsValue;
  return totalHandValueMessage;
};

////// Main function //////////
var main = function (input) {
  // Default output msg
  var outputMessage = "";

  // FIRST CLICK
  if (currentGameMode == GAME_START) {
    // create shuffled cards
    shuffledDeck = shuffleCards(makeDeck());

    // Reset each player cards
    playerCards = [];
    dealerCards = [];

    // deal 2 cards to each players
    playerCards.push(shuffledDeck.pop());
    playerCards.push(shuffledDeck.pop());
    dealerCards.push(shuffledDeck.pop());
    dealerCards.push(shuffledDeck.pop());

    // check
    console.log("playerCards", playerCards);
    console.log("dealerCards", dealerCards);

    // update gameMode
    currentGameMode = GAME_CARDS_DRAWN;

    outputMessage = "Click submit to calculate cards!";

    return outputMessage;
  }

  // SECOND CLICK
  if (currentGameMode == GAME_CARDS_DRAWN) {
    // check for blackjack
    var playerHasBlackJack = checkForBlackJack(playerCards);
    var dealerHasBlackJack = checkForBlackJack(dealerCards);

    // check
    console.log("playerHasBlackJack", playerHasBlackJack);
    console.log("dealerHasBlackJack", dealerHasBlackJack);

    // Either one has black jack
    if (playerHasBlackJack == true || dealerHasBlackJack == true) {
      // Both have black jack
      if (playerHasBlackJack == true && dealerHasBlackJack == true) {
        outputMessage =
          displayPlayerAndDealerCards(playerCards, dealerCards) +
          "<br>Black Jack Tie!";
      }
      // Only player has black jack
      else if (playerHasBlackJack == true && dealerHasBlackJack == false) {
        outputMessage =
          displayPlayerAndDealerCards(playerCards, dealerCards) +
          "<br>Player wins by Black Jack!";
      }
      // Only dealer has black jack
      else {
        outputMessage =
          displayPlayerAndDealerCards(playerCards, dealerCards) +
          "<br>Dealer wins by Black Jack!";
      }
    }

    // Neither one has black jack
    // Ask for player to input 'hit' or 'stand'
    else {
      outputMessage =
        displayPlayerAndDealerCards(playerCards, dealerCards) +
        '<br> No one Black Jacks. <br>Please input "hit" or "stand".';

      // update gameMode
      currentGameMode = GAME_HIT_OR_STAND;
    }

    return outputMessage;
  }

  // THIRD CLICK
  if (currentGameMode == GAME_HIT_OR_STAND) {
    // Hit
    if (input == "hit") {
      playerCards.push(shuffledDeck.pop());
      outputMessage =
        displayPlayerAndDealerCards(playerCards, dealerCards) +
        '<br> You just drew another card. <br>Please input "hit" or "stand".';
    }

    // Stand
    else if (input == "stand") {
      // Calculate hands
      var playerCardsTotalValue = calculateTotalHandValue(playerCards);
      var dealerCardsTotalValue = calculateTotalHandValue(dealerCards);

      // Dealer's hit or stand logic
      while (dealerCardsTotalValue < 17) {
        dealerCards.push(shuffledDeck.pop());
        dealerCardsTotalValue = calculateTotalHandValue(dealerCards);
      }

      // Tied game
      if (
        playerCardsTotalValue == dealerCardsTotalValue ||
        (playerCardsTotalValue > 21 && dealerCardsTotalValue > 21)
      ) {
        outputMessage =
          displayPlayerAndDealerCards(playerCards, dealerCards) +
          "<br>Its a Tie!" +
          displayHandTotalValues(playerCardsTotalValue, dealerCardsTotalValue);
      }

      // Player win
      else if (
        (playerCardsTotalValue > dealerCardsTotalValue &&
          playerCardsTotalValue <= 21) ||
        (playerCardsTotalValue <= 21 && dealerCardsTotalValue > 21)
      ) {
        outputMessage =
          displayPlayerAndDealerCards(playerCards, dealerCards) +
          "<br>Player wins!" +
          displayHandTotalValues(playerCardsTotalValue, dealerCardsTotalValue);
      }

      // Dealer wins
      else {
        outputMessage =
          displayPlayerAndDealerCards(playerCards, dealerCards) +
          "<br>Dealer wins!" +
          displayHandTotalValues(playerCardsTotalValue, dealerCardsTotalValue);
      }

      // Re-start
      currentGameMode = GAME_START;
    }

    // Input validation ('hit' or 'stand')
    else {
      outputMessage =
        'Wrong input. Please input "hit" or "stand" only.<br><br>' +
        displayPlayerAndDealerCards(playerCards, dealerCards);
    }

    return outputMessage;
  }
};
