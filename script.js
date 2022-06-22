/*
The main function runs on each player's turn. The sequence of actions in the game might be the following.
Deck is shuffled.
User clicks Submit to deal cards.
The cards are analysed for game winning conditions, e.g. Blackjack.
The cards are displayed to the user.
The user decides whether to hit or stand, using the submit button to submit their choice.
The user's cards are analysed for winning or losing conditions.
The computer decides to hit or stand automatically based on game rules.
The game either ends or continues.

Note that for the main function to perform different logic on user input, for example when a player decides to hit or stand, we may wish to consider using a new game mode.
*/

// Helper functions from template
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

// Modify card deck creation for blackjack
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
    // Blackjack - need separate counter since max is rank 10 but 13 cards still needed
    var cardCounter = 1;
    while (cardCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var rankCounter = cardCounter;
      var cardName = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      // Blackjack - all picture cards are now rank 10
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
        rankCounter = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        rankCounter = 10;
      } else if (cardName == 13) {
        cardName = "king";
        rankCounter = 10;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // Add the new card to the deck
      cardDeck.push(card);

      // Increment cardCounter to iterate over the next rank
      cardCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // Return the completed card deck
  return cardDeck;
};

// High Card
// Initialise the card deck representation as an array of objects
// Modify template code to generate deck with function call
var deck = makeDeck();

// Shuffle the deck and save it in a new variable shuffledDeck
// to communicate that we have shuffled the deck.
var shuffledDeck = shuffleCards(deck);

// Global variables
// Winning value, minimum value to hit, player's decision, game end, list to store player and dealer hand
var BLACKJACK = 21;
var dealerHitMin = 16;
var playerDecision = false;
var endGame = false;
var playerHand = [];
var dealerHand = [];

// Helper function 1 - deal cards to hand (push to list)
var dealCard = function (hand) {
  var cardDealt = shuffledDeck.pop();
  hand.push(cardDealt);
};

// Helper function 2 - check hand value (variable ace values to consider here)
var checkHandValue = function (hand) {
  var numOfAce = 0;
  var handValue = 0;
  var cardInHandCounter = 0;
  while (cardInHandCounter < hand.length) {
    var currentCard = hand[cardInHandCounter];
    // Let ace be 11 by default so easier to win
    if (currentCard.rank == 11) {
      numOfAce += 1;
      handValue += 11;
    }
    handValue += currentCard.rank;
    cardInHandCounter += 1;
  }

  // If > 21 but have ace, change ace value to 1
  if (handValue > BLACKJACK && numOfAce > 0) {
    var aceCardCounter = 0;
    while (aceCardCounter < numOfAce) {
      handValue -= 10;
      // If < 21 at first, obtain original sum by exiting loop and go back up
      if (handValue <= BLACKJACK) {
        break;
      }
      aceCardCounter += 1;
    }
  }
  return handValue;
};

// Helper function 3 - check hand for blackjack (compare initial hand to determine winner), return bool
var checkBlackjack = function (hand) {
  return hand.length == 2 && checkHandValue(hand) == BLACKJACK;
};

// Helper function 4 - display hand
var displayHand = function (hand) {
  var cardsInHand = "";
  var currentCardIndex = 0;

  while (currentCardIndex < hand.length) {
    cardsInHand += `${cardsInHand}, ${hand[currentCardIndex].name} of ${hand[currentCardIndex].suit}`;
    currentCardIndex += 1;
  }
  return cardsInHand;
};

// Helper function 5 - display output message
var displayOutputMessage = function () {
  return `Player hand: ${displayHand(
    playerHand
  )}. Total Value: ${checkHandValue(playerHand)} <br>
          Dealer hand: ${displayHand(
            dealerHand
          )}. Total Value: ${checkHandValue(dealerHand)}`;
};

/* 
// High Card
var main = function (input) {
  // Draw 2 cards from the top of the deck
  var computerCard = shuffledDeck.pop();
  var playerCard = shuffledDeck.pop();

  // Construct an output string to communicate which cards were drawn
  var myOutputValue =
    "Computer had " +
    computerCard.name +
    " of " +
    computerCard.suit +
    ". Player had " +
    playerCard.name +
    " of " +
    playerCard.suit +
    ". ";

  // Compare computer and player cards by rank attribute
  // If computer card rank is greater than player card rank, computer wins
  if (computerCard.rank > playerCard.rank) {
    // Add conditional-dependent text to the output string
    myOutputValue = myOutputValue + "Computer wins.";
    // Else if computer card rank is less than player card rank, player wins
  } else if (computerCard.rank < playerCard.rank) {
    myOutputValue = myOutputValue + "Player wins!";
    // Otherwise (i.e. ranks are equal), it's a tie
  } else {
    myOutputValue = myOutputValue + "It's a tie.";
  }

  // Return the fully-constructed output string
  return myOutputValue;
};

*/

// Template
var main = function (input) {
  // Check if game ended already
  if (endGame) {
    return ` ~ Game End ~ <br> 
    Refresh to play again!`;
  }

  // Deal Hands if hand empty (initial) - length is 0
  if (playerHand.length == 0) {
    // Call Helper function 1, 2 times for cards
    dealCard(playerHand);
    dealCard(dealerHand);
    dealCard(playerHand);
    dealCard(dealerHand);

    // Check blackjack - call Helper function 3
    if (checkBlackjack(dealerHand)) {
      endGame = true;
      return `${displayOutputMessage()} <br> 
    Dealer wins by black jack!`;
    }

    if (checkBlackjack(playerHand)) {
      endGame = true;
      return `${displayOutputMessage()} <br>
    Player wins by black jack!`;
    }
    return `${displayOutputMessage()} <br>
    Please enter "hit" or "stand" and then click Submit`;
  }

  // Player's action - hit or stand (2nd version)
  if (!playerDecision) {
    // Input validation
    if (input !== "hit" && input !== "stand") {
      return `Please input "hit" or "stand" only.`;
    }

    // Hit - deal card to player - call Helper function 1
    if (input == "hit") {
      dealCard(playerHand);
      // Check if > 21 - call Helper function 2
      if (checkHandValue(playerHand) > BLACKJACK) {
        endGame = true;
        return `${displayOutputMessage()} <br>
        Player has busted and lost. Refresh to play again!`;
      }
    }

    // Stand - change player decision
    if (input == "stand") {
      playerDecision = true;
    }
  }

  // Dealer's action - hit or stand (3rd version)
  // Dealer hit if <= min - call Helper function 1, else stand
  var dealerHandValue = checkHandValue(dealerHand);
  if (dealerHandValue <= dealerHitMin) {
    dealCard(dealerHand);
    // Update after new dealing
    dealerHandValue = checkHandValue(dealerHand);
    // Check if > 21 - call Helper function 2
    if (dealerHandValue > BLACKJACK) {
      endGame = true;
      return `${displayOutputMessage()} <br>
        Dealer has busted and lost. Refresh to play again!`;
    }
  }

  // Stand - check winner, end game
  if (playerDecision && dealerHandValue > dealerHitMin) {
    playerDecision = true;
    if (checkHandValue(playerHand) > dealerHandValue) {
      return `${displayOutputMessage()} <br>
      Player wins! Refresh to play again!`;
    }
    return `${displayOutputMessage()} <br>
      Dealer wins! Refresh to play again!`;
  }
  return `${displayOutputMessage()} <br>
  Player's decision to stand: ${playerDecision} <br>
  If player has not yet decided, please enter "hit" or "stand" and then click Submit. Click Submit to check Dealer's move.`;
};
