// makeDeckFunction
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ['hearts', 'diamonds', 'clubs', 'spades'];

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
// Initialise the shuffled card deck before the game starts.
var deck = shuffleCards(makeDeck());

// Variables for storing data

var playerHand = [];
var dealerHand = [];
var blackJackLimit = 21;
var dealerHitTill = 16;

// tracking end of turn for player
var playerHasChosenToStand = false;
// Tracking game scenario
var gameMode = 'gameStart';
var gameOver = false;

var dealCardToHand = function (hand) {
  hand.push(deck.pop());
};

// total up card value of hand
var getHandSum = function (hand) {
  var numAcesInHand = 0;
  var sum = 0;
  for (let i = 0; i < hand.length; i += 1) {
    var currCard = hand[i];
    // If card rank is 2-10, value is same as rank
    if (currCard.rank >= 2 && currCard.rank <= 10) {
      sum += currCard.rank;
      // If card rank is 11-13, i.e. Jack, Queen, or King, value is 10
    } else if (currCard.rank >= 11 && currCard.rank <= 13) {
      sum += 10;
      // If card is Ace, value is 11 by default
    } else if (currCard.rank == 1) {
      numAcesInHand += 1;
      sum += 11;
    }
  }
  // If sum is greater than sum limit and hand contains Aces, convert Aces from value of 11
  // to value of 1, until sum is less than or equal to sum limit or there are no more Aces.
  if (sum > blackJackLimit && numAcesInHand > 0) {
    for (let i = 0; i < numAcesInHand; i += 1) {
      sum -= 10;
      // If the sum is less than BlackJackLimit before converting all Ace values from
      // 11 to 1, break out of the loop and return the current sum.
      if (sum <= blackJackLimit) {
        break;
      }
    }
  }
  return sum;
};

// Variable for Blackjack Combination to be used to determining Blackjack
var isBlackjack = function (hand) {
  return hand.length == 2 && getHandSum(hand) == blackJackLimit;
};

// Convert hand to a string where objects within the array are stringified(NH)
var showCardInString = function (hand) {
  return `[${hand.map((card) => card.name)}]`;
};

var getDefaultOutput = function () {
  return `Player has in their hand <strong>${showCardInString(playerHand)} </strong> with a total score of <strong>${getHandSum(playerHand)}</strong>. <br>
    Computer has in their hand  <strong>${showCardInString(dealerHand)}</strong> with a total score of <strong>${getHandSum(dealerHand)}</strong>.`;
};

var main = function (input) {
  // Start initial Game
  if (gameMode == 'gameStart') {
    // Submit to deal the first hand to player and computer
    dealCardToHand(playerHand);
    dealCardToHand(dealerHand);

    // Dealing second hand to player and computer
    dealCardToHand(playerHand);
    dealCardToHand(dealerHand);

    // Check first if Blackjack
    // Computer wins if Blackjack is true for computer.
    if (isBlackjack(dealerHand)) {
      gameOver = true;
      gameMode = 'gameStart';

      // Computer wins, return
      return `${getDefaultOutput()} <br>
        Blackjack! Computer wins! Please refresh/click submit to play again.`;
    }

    // If player has blackjack and computer does not, player wins.
    if (isBlackjack(playerHand)) {
      gameOver = true;
      gameMode = 'gameStart';

      // Player wins, return
      return `${getDefaultOutput()} <br>
        Blackjack! You win! Please refresh/click submit to play again.`;
    }
    gameMode = 'hitOrStand';
    // The cards are displayed to the user.
    return `${getDefaultOutput()} <br>
      Please enter <strong>"hit" or "stand" </strong>, then press Submit`;
  }

  // Player has to decide to hit or stand
  if (gameMode = 'hitOrStand') {
    // If user inputs something else, tell user they can only input hit or stand
    if (input !== 'hit' && input !== 'stand') {
      return `Player has in their hand <strong>${showCardInString(playerHand)} </strong> with a total score of <strong>${getHandSum(playerHand)}</strong>. <br>
    Computer has in their hand <strong>${showCardInString(dealerHand)}</strong> with a total score of <strong>${getHandSum(dealerHand)}</strong>. <br> <strong>Please input either "hit" or "stand" as possible moves in Blackjack.</strong>`;
    }

    if (input == 'hit') {
      dealCardToHand(playerHand);
      // if player busts during hit, player loses
      if (getHandSum(playerHand) > blackJackLimit) {
        gameOver = true;
        gameMode = 'gameStart';

        return `${getDefaultOutput()} <br>
          You have busted! You lose!. Please refresh to play again.`;
      }
    }

    if (input == 'stand') {
      playerHasChosenToStand = true;
    }
  }

  // Computer must have number greater than dealerHitsTill
  // Computer hits till sum in hand is greater than dealerHitsTill

  var dealerHandSum = getHandSum(dealerHand);
  if (dealerHandSum <= dealerHitTill) {
    dealCardToHand(dealerHand);
    // Sum computer's hand
    dealerHandSum = getHandSum(dealerHand);
    // If computer busts, it loses
    if (dealerHandSum > blackJackLimit) {
      gameOver = true;
      return `${getDefaultOutput()} <br>
      Computer has busted! You win! Please refresh to play again.`;
    }
  }

  // If player and computer have both not busted and chosen to stand, decide who wins
  if (playerHasChosenToStand && dealerHandSum > dealerHitTill) {
    // The game is always over after this point
    gameOver = true;
    // If player hand sum is greater than computer hand sum, player wins!
    if (getHandSum(playerHand) > dealerHand) {
      return `${getDefaultOutput()} <br>
        You win! Please refresh to play again.`;
    }
    // Else, computer wins!
    return `${getDefaultOutput()} <br>
      You lose! Please refresh to play again.`;
  }

  // If game is not yet over, show current game status
  return `${getDefaultOutput()} <br>
    Player, please enter <strong>"hit" or "stand"</strong>. <br>
    Else, press Submit to see Computer's next move.`;
};
