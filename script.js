// Create a standard 52-card deck
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

/**
 * Get a random index ranging from 0 (inclusive) to max (exclusive).
 */
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

/**
 * Shuffle elements in the cardDeck array. Return the shuffled deck.
 */
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
    // Increment currentIndex to shuffle the next pair of cards
    currentIndex += 1;
  }
  // Return the shuffled deck
  return cardDeck;
};
//initialise shuffled card deck before the game starts
var deck = shuffleCards(makeDeck());

//Set up Blackjack rules
// The maximum valid sum in Blackjack is 21.
var cardSumLimit = 21;
// Dealer always hits until she reaches a sum greater than 16.
var dealerHitThreshold = 16;
// If player has chosen to stand, then player can no longer hit until game is over
var playerStand = false;
// Keep track of when the game ends to prevent further moves
var gameOver = false;

//hand arrays for player and computer
var playerHand = [];
var computerHand = [];

//deal card function
var dealCard = function (hand) {
  hand.push(deck.pop());
};

//calculating value of cards on "hand"
var cardValue = function (hand) {
  var numAces = 0;
  var sumValue = 0;
  for (let i = 0; i < hand.length; i += 1) {
    var currentCard = hand[i];
    //if card rank 2 - 10, value is same as rank
    if (currentCard.rank > 1 && currentCard.rank < 11) {
      sumValue += currentCard.rank;
    }
    // if card rank is 11,12,13 = jack, queen,king, cardValue = 10
    else if ((currentCard.rank > 10 && currentCard.rank, 14)) {
      sumValue += 10;
    }
    // if card rank is 1 = ace
    else if (currentCard.rank == 1) {
      numAces += 1;
      sumValue += 11;
    }
  }
  //if sumValue is greater than cardSumLimit and hand contans Aces, convert Aces from value of 11 to 1, until sumValue is less than or eual to cardSumLimit or no more Aces
  if (sumValue > cardSumLimit && numAces > 0) {
    for (let i = 0; i < numAces; i += 1) {
      sumValue -= 10;
      //if sumvalue is less than cardsumlimit before converting Aces, break out of the loop and return the current sumValue
      if (sumValue <= cardSumLimit) {
        break;
      }
    }
  }
  return sumValue;
};

//game ends if hand contains blackjack
var blackJack = function (hand) {
  return hand.length === 2 && cardValue(hand) === cardSumLimit;
};

//convert hand array to string
var handString = function (hand) {
  return `[${hand.map((card) => card.name)}]`;
};

var getDefaultOutput = function () {
  return `Player has hand ${handString(playerHand)} with sum ${cardValue(
    playerHand
  )}. <br>
    Dealer has hand ${handString(computerHand)} with sum ${cardValue(
    computerHand
  )}.`;
};
var currentMode = 0;

var main = function (input) {
  if (gameOver) {
    return "The game is over. Please refresh to play again.";
  }

  // If initial hands have not been dealt, deal initial hands
  if (playerHand.length === 0) {
    // User clicks submit button to deal cards.
    // Deal first card for player then computer
    dealCard(playerHand);
    dealCard(computerHand);

    // Deal second card for player then computer
    dealCard(playerHand);
    dealCard(computerHand);

    // The cards are analyzed for any game winning conditions. (Blackjack)
    // If computer has Blackjack, computer auto wins because computer is dealer
    if (blackJack(computerHand)) {
      gameOver = true;
      // Computer wins, return
      return `${getDefaultOutput()} <br>
        Computer has Blackjack and wins. Please refresh to play again.`;
    }

    // If player has Blackjack and computer does not, player wins
    if (blackJack(playerHand)) {
      gameOver = true;
      // Player wins, return
      return `${getDefaultOutput()} <br>
        Player has Blackjack and wins. Please refresh to play again.`;
    }

    // The cards are displayed to the user.
    return `${getDefaultOutput()} <br>
      Please enter "hit" or "stand", then press Submit`;
  }

  // Then begins a new action, where the user has to decide something: do they hit or stand.
  if (!playerStand) {
    // If user input is neither "hit" nor "stand" prompt user
    if (input !== "hit" && input !== "stand") {
      return 'Please input either "hit" or "stand" as possible moves in Blackjack';
    }

    if (input === "hit") {
      dealCard(playerHand);
      // If bust, show player that she busts
      if (cardValue(playerHand) > cardSumLimit) {
        gameOver = true;
        return `${getDefaultOutput()} <br>
          Player has busted and loses. Please refresh to play again.`;
      }
    }

    if (input === "stand") {
      playerStand = true;
    }
  }

  // The computer also decides to hit or stand.
  // Computer hits if sum less than or equal to dealer hit threshold
  // Otherwise, computer stays
  var computerHandSum = cardValue(computerHand);
  if (computerHandSum <= dealerHitThreshold) {
    dealCard(computerHand);
    // Update computer hand sum after dealing new card
    computerHandSum = cardValue(computerHand);
    // If bust, show computer that she busts
    if (computerHandSum > cardSumLimit) {
      gameOver = true;
      return `${getDefaultOutput()} <br>
      Computer has busted and loses. Please refresh to play again.`;
    }
  }

  // If player and computer have both not busted and chosen to stand, decide who wins
  if (playerStand && computerHandSum > dealerHitThreshold) {
    // The game is always over after this point
    gameOver = true;
    // If player hand sum is greater than computer hand sum, player wins!
    if (cardValue(playerHand) > computerHandSum) {
      return `${getDefaultOutput()} <br>
        Player wins! Please refresh to play again.`;
    }
    // Else, computer wins
    return `${getDefaultOutput()} <br>
      Computer wins! Please refresh to play again.`;
  }

  // If game is not yet over, show current game status
  return `${getDefaultOutput()} <br>
    playerStand is ${playerStand} <br>
    If player has not yet chosen to stand, please enter "hit" or "stand". <br>
    Else, press Submit to see Computer's next move.`;
};
