// Different game modes set as constants
var GAME_MODE_START_MODE = 'start mode';
var GAME_MODE_PLAYER_CHOICE = 'player choice';
var GAME_MODE_DEALER_CHOICE = 'dealer choice';
var GAME_MODE_COMPARE_HANDS = 'compare hands';
var GAME_MODE_START_AGAIN = 'start again';

// Declare and initialise global variables
var userName = '';
var gameMode = '';
var myOutputValue = '';
var dealerChoice = '';
var playerHand = [];
var dealerHand = [];

// Generate a regular card deck
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ['♥', '♦', '♣', '♠'];

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
        cardName = 'ace';
      } else if (cardName == 11) {
        cardName = 'jack';
      } else if (cardName == 12) {
        cardName = 'queen';
      } else if (cardName == 13) {
        cardName = 'king';
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

// Generate a blackjack deck by converting rank of face cards (jack, queen, king) to 10
// Treat Ace as 11 by default
function makeBlackjackDeck(cardDeck) {
  for (var i = 0; i < cardDeck.length; i += 1) {
    if (cardDeck[i].name == 'jack'
    || cardDeck[i].name == 'queen'
    || cardDeck[i].name == 'king') {
      cardDeck[i].rank = 10;
    }
    else if (cardDeck[i].name == 'ace') {
      cardDeck[i].rank = 11;
    }
  }
  return cardDeck;
}

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

// Check whether card is an Ace
function isCardAce(card) {
  return card.name == 'ace';
}

// Check whether hand has an Ace
function hasAnAce(hand) {
  for (var i = 0; i < hand.length; i += 1) {
    if (hand[i].name == 'ace') {
      return true;
    }
  }
  return false;
}

// Calculate the score and reassign the value of an ace to 1 if player would otherwise go bust
function calculateScore(hand) {
  var initialScore = 0;
  var index = 0;
  while (index < hand.length) {
    initialScore += hand[index].rank;
    index += 1;
  }
  var finalScore = initialScore;
  // If score > 21 and hand contains an ace, loop over the hand.
  // During the loop, subtract 10 from the score if the card is an ace
  // Break the loop once the score is below 21
  if (finalScore > 21 && hasAnAce(hand)) {
    for (var i = 0; i < hand.length; i += 1) {
      if (isCardAce(hand[i])) {
        finalScore -= 10;
        if (finalScore <= 21) {
          break;
        }
      }
    }
  }
  return finalScore;
}

// Restart game by switching modes and assiging empty values to each player's hand array
function restartGame() {
  gameMode = GAME_MODE_START_MODE;
  playerHand = [];
  dealerHand = [];
  return `So ${userName}, ready to play again? <br><br> Click Submit to deal a new hand. Fingers crossed 🤞🏾`;
}

// Display a string of the hand
function displayHand(hand) {
  var stringOfHand = '';
  var i = 0;
  // Loop over all but last element of the array to avoid the floating comma at the end
  while (i < hand.length - 1) {
    stringOfHand += `${hand[i].name} of ${hand[i].suit}, `;
    i += 1;
  }
  var lastCard = hand[hand.length - 1];
  stringOfHand += `${lastCard.name} of ${lastCard.suit}`;

  return stringOfHand;
}

// Calculate player score and determine next action
function playerMove(hand) {
  var playerScore = calculateScore(hand);
  var playerHandString = displayHand(hand);
  var genericOutput = `Your score is ${playerScore} with a hand of: ${playerHandString}. <br>`;
  // If player goes bust, restart game
  if (playerScore > 21) {
    gameMode = GAME_MODE_START_AGAIN;
    return `${genericOutput} Bad luck ${userName}! You go bust. <br><br> Click Submit to try your luck again 🍀.`;
  }
  // If player scores blackjack, restart game
  if (playerScore == 21 && hand.length == 2) {
    gameMode = GAME_MODE_START_AGAIN;
    return `${genericOutput} Winner winner Chicken Dinner 🍗 <br><br> ${userName} you scored blackjack 💸`;
  }
  // Otherwise ask for for player input
  gameMode = GAME_MODE_PLAYER_CHOICE;
  return `${genericOutput} <br> Would you like to hit or stick?`;
}

// Calculate dealer score and determine next action
function dealerMove(hand) {
  var dealerScore = calculateScore(hand);
  var dealerHandString = displayHand(hand);
  var genericOutput = `Dealer scores ${dealerScore} with a hand of: ${dealerHandString}. <br>`;

  if (dealerScore > 21) {
    gameMode = GAME_MODE_START_AGAIN;
    return `${genericOutput} <br> Dealer goes bust. <br> Well done ${userName}, you win!`;
  }
  if (dealerScore == 21 && hand.length == 2) {
    gameMode = GAME_MODE_START_AGAIN;
    return `${genericOutput} Too bad. Dealer wins with Blackjack!`;
  }
  // If dealer scores 17 or above and is not bust, they must stick
  if (dealerScore >= 17 && dealerScore <= 21) {
    console.log('dealer must stick');
    dealerChoice = 'stick';
    gameMode = GAME_MODE_COMPARE_HANDS;
    return `${genericOutput} <br> Dealer sticks. Click Submit to find out who won.`;
  }
  // If dealer scores below 17, they must hit
  if (dealerScore < 17) {
    console.log('dealer must hit');
    dealerChoice = 'hit';
    return `${genericOutput} <br> Dealer must hit. Click Submit to deal another card.`;
  }
}

// Start with blackjack deck deck
var bjCardDeck = makeBlackjackDeck(makeDeck());
// Start with a shuffled deck
var deck = shuffleCards(bjCardDeck);
// Initially, deal two cards each to player and dealer
function dealHands() {
  console.log('start mode');

  // Computer first deals a card to the user
  var playerCard = deck.pop();
  // Computer then deals a card for itself (the dealer)
  var dealerCard = deck.pop();

  // Computer deals a second card to the user
  var playerSecondCard = deck.pop();
  // Computer deals a second card to itself, faced down
  var dealerFaceDown = deck.pop();
  // Store both cards in an array corresponding to each player's hand.
  playerHand.push(playerCard, playerSecondCard);
  dealerHand.push(dealerCard, dealerFaceDown);

  // Calculate and display player score
  // If player has not got a blackjack, ask user to input whether to hit or stick
  return playerMove(playerHand);
}

// Automatically determine dealer action based on pre-defined rules from dealerMove()
function dealerTurn() {
  console.log('dealer choice mode');
  var dealerOutcome = dealerMove(dealerHand);

  // Deal another card if dealer must hit
  if (dealerChoice == 'hit') {
    console.log('dealer hits');
    dealerHand.push(deck.pop());
  }
  if (dealerChoice == 'stick') {
    console.log('dealer sticks');
    return dealerOutcome;
  }
  return dealerOutcome;
}

// Take user input and accordingly deal another card or end turn and pass to dealer
function playerTurn(input) {
  console.log('player choice mode');
  var playerChoice = input;
  // If player enters hit, deal another card and recalculate score
  if (playerChoice == 'hit') {
    console.log('player hits');
    playerHand.push(deck.pop());
    return playerMove(playerHand);
  }
  // If player sticks, switch mode to dealer turn.
  if (playerChoice == 'stick') {
    console.log('player sticks');
    gameMode = GAME_MODE_DEALER_CHOICE;
    return `That's the end of your turn ${userName}. <br> Click Submit to pass the turn over to the dealer`;
  }
  // Prompt user to enter a valid input
  return `${userName}, please enter 'hit' if you wish to draw another card or 'stick' if not. <br><br> If you 'stick', your turn is over and the dealer with reveal their hand.`;
}

// If neither player has scored blackjack, nor gone bust, compare hands and notify winner
function compareHands() {
  if (calculateScore(playerHand) > calculateScore(dealerHand)) {
    gameMode = GAME_MODE_START_AGAIN;
    return `Nice job ${userName}, you win! <br><br> Click Submit to play again.`;
  }
  if (calculateScore(playerHand) == calculateScore(dealerHand)) {
    gameMode = GAME_MODE_START_AGAIN;
    return 'Honours even. It\'s a tie! <br><br> Click Submit to play again.';
  }
  gameMode = GAME_MODE_START_AGAIN;
  return `Too bad ${userName}. Dealer wins! <br><br> Click Submit to play again.`;
}

var main = function (input) {
  // Welcome user and take in first input as user name for personalisation
  if (!userName) {
    userName = input;
    console.log(userName);
    // Switch mode to start mode
    gameMode = GAME_MODE_START_MODE;
    if (!input) {
      return 'Welcome to Blackjack ♡♢♤♧ <br> Before we start, how would you like to be addressed?';
    }
  }
  if (gameMode == GAME_MODE_START_MODE) {
    return dealHands();
  }

  if (gameMode == GAME_MODE_PLAYER_CHOICE) {
    return playerTurn(input);
  }

  if (gameMode == GAME_MODE_DEALER_CHOICE) {
    return dealerTurn();
  }

  if (gameMode == GAME_MODE_COMPARE_HANDS) {
    return compareHands();
  }

  if (gameMode == GAME_MODE_START_AGAIN) {
    return restartGame();
  }

  return `Oops. There has been a technical glitch. Send all cash reserves to ${userName}.`;
};
