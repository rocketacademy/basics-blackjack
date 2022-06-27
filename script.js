// All the face cards have a value of 10. The functions are exclusively for BlackJack deck.
var myImageWin =
  '<img src = "https://c.tenor.com/Sk82dtcF6bUAAAAC/winner-winner-chicken-dinner.gif"/>';
var myImageLose =
  '<img src = "https://c.tenor.com/7LEypD_uye4AAAAC/im-sorry-im-a-loser.gif"/>';

// generate an empty deck variable at first
var createDeck = function () {
  var deck = [];
  //generate variable of cards with numbers but diff pics
  var suits = ["hearts♥️", "diamonds♦️", "clubs♣️", "spades♠️"];

  //generate variable of existing suit
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];

    // generate loop to create all cards in the suit, with an assumption of standard 52-card pack.

    var counter = 1;
    while (counter <= 13) {
      var valueCounter = counter;
      var cardName = valueCounter;

      // assign 4 values to four of the face cards, namely: 1, 11, 12 ,13
      // Change the value for the face cards to 10.
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        valueCounter = 10;
        cardName = "jack";
      } else if (cardName == 12) {
        valueCounter = 10;
        cardName = "queen";
      } else if (cardName == 13) {
        valueCounter = 10;
        cardName = "king";
      }

      // make a single card object variable
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: valueCounter,
      };

      // add the card to the deck
      deck.push(card);
      counter = counter + 1;
    }
    suitIndex = suitIndex + 1;
  }
  return deck;
};

var obtainRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
};

var shuffleCards = function (cards) {
  var index = 0;

  while (index < cards.length) {
    var randomIndex = obtainRandomIndex(cards.length);

    var currentItem = cards[index];

    var randomItem = cards[randomIndex];

    cards[index] = randomItem;
    cards[randomIndex] = currentItem;

    index = index + 1;
  }

  return cards;
};
var deck = shuffleCards(createDeck());

// Store player's cards and computer's cards in separate arrays
var playerHand = [];
var computerHand = [];

// The maximum sum in Blackjack is 21. Here, we name a constant value in integer.
var TWENTY_ONE = 21;
// Dealer has to hit if their hand is below 17.
var dealerHitLimit = 16;
// If player has chosen to stand, then player can no longer hit until game is over.
var playerHasChosenToStand = false;
// Create one more variable to determine when the game ends and execute the results.
var gameOver = false;

// Deal a card to the given hand
var dealCardToHand = function (hand) {
  hand.push(deck.pop());
};

// Obtain sum of cards in hand
var getHandSum = function (hand) {
  var numOfAcesInHand = 0;
  var sum = 0;
  var counter = 0;
  while (counter < hand.length) {
    var currCard = hand[counter];
    // Aces can be 1 or 11.
    if (currCard.rank === 1) {
      numOfAcesInHand += 1;
      sum += 11;
    } else {
      sum += currCard.rank;
    }
    counter = counter + 1;
  }
  // Convert Aces from value of 11 to value of 1 when sum is greater than sum limit and hand contains Aces, until sum is <= to sum limit or there are no more Aces.
  if (sum > TWENTY_ONE && numOfAcesInHand > 0) {
    var aceCounter = 0;
    while (aceCounter < numOfAcesInHand) {
      sum -= 10;
      // If the sum is less than TWENTY_ONE before converting all Ace values from 11 to 1, break out the loop and return the current sum.
      if (sum <= TWENTY_ONE) {
        break; // break will causes loop to finish
      }
      aceCounter = aceCounter + 1;
    }
  }
  return sum;
};

// Create a variable to determine whether the hand contains a Blackjack combination
var isBlackJackCombination = function (hand) {
  return hand.length === 2 && getHandSum(hand) === TWENTY_ONE;
};

// Convert hand to a string where objects within the array are stringified
var convertHandToString = function (hand) {
  var cards = "Cards of ";
  var handIndex = 0;

  while (handIndex < hand.length) {
    cards = cards + hand[handIndex].name + " " + hand[handIndex].suit;
    if (handIndex != hand.length - 1) {
      cards += ", ";
    }
    handIndex = handIndex + 1;
  }
  return cards;
};

var getDefaultOutput = function () {
  return `Player hand: ${convertHandToString(
    playerHand
  )} with a sum of ${getHandSum(playerHand)}. <br>
    Computer/dealer hand: ${convertHandToString(
      computerHand
    )} with a sum of ${getHandSum(computerHand)}.<br>`;
};

var main = function (input) {
  if (gameOver) {
    return "The game is over. Please refresh the page to play again.♣️♠️♦️♥️";
  }

  // If initial hands have not been dealt, deal initial hands
  if (playerHand.length === 0) {
    // User clicks submit button to deal cards.
    // Deal first card for player then computer
    dealCardToHand(playerHand);
    dealCardToHand(computerHand);

    // Deal second card for player then computer
    dealCardToHand(playerHand);
    dealCardToHand(computerHand);

    // The cards are analyzed for any game winning conditions. (Blackjack)
    // If computer has Blackjack, computer auto wins because computer is dealer
    if (isBlackJackCombination(computerHand)) {
      gameOver = true;
      // Computer wins, return
      return `${getDefaultOutput() + myImageLose} <br>
        Computer has Blackjack and wins. Please refresh the page to play again.♣️♠️♦️♥️`;
    }

    // If player has Blackjack and computer does not, player wins
    if (isBlackJackCombination(playerHand)) {
      gameOver = true;
      // Player wins, return
      return `${getDefaultOutput()} <br>
        Player has Blackjack and wins. Please refresh the page to play again.♣️♠️♦️♥️`;
    }

    // The cards are displayed to the user.
    return `${getDefaultOutput()} <br>
      Please enter "hit" or "stand", then press Submit`;
  }

  // Then begins a new action, where the user has to decide something: do they hit or stand.
  if (!playerHasChosenToStand) {
    // If user input is neither "hit" nor "stand" prompt user
    if (input !== "hit" && input !== "stand") {
      return 'Please input either "hit" or "stand" as possible moves in Blackjack';
    }

    if (input === "hit") {
      dealCardToHand(playerHand);
      // If bust, show player that she busts
      if (getHandSum(playerHand) > TWENTY_ONE) {
        gameOver = true;
        return `${getDefaultOutput() + myImageLose} <br>
          Player has busted 21 points and loses. Please refresh the page to play again.♣️♠️♦️♥️`;
      }
    }

    if (input === "stand") {
      playerHasChosenToStand = true;
    }
  }

  // The computer also decides to hit or stand.
  // Computer hits if sum less than or equal to dealer hit limit
  // Otherwise, computer stays
  var computerHandSum = getHandSum(computerHand);
  if (computerHandSum <= dealerHitLimit) {
    dealCardToHand(computerHand);
    // Update computer hand sum after dealing new card
    computerHandSum = getHandSum(computerHand);
    // If bust, show computer that she busts
    if (computerHandSum > TWENTY_ONE) {
      gameOver = true;
      return `${getDefaultOutput() + myImageWin} <br>
      Computer has busted beyond 21 points and loses. Please refresh the page to play again.♣️♠️♦️♥️`;
    }
  }

  // If player and computer have both not busted and chosen to stand, decide who wins
  if (playerHasChosenToStand && computerHandSum > dealerHitLimit) {
    // The game is always over after this point
    gameOver = true;
    // If player hand sum is greater than computer hand sum, player wins!
    if (getHandSum(playerHand) > computerHandSum) {
      return `${getDefaultOutput() + myImageWin} <br>
        Congratulations! The player wins! Please refresh the page to play again.♣️♠️♦️♥️`;
    }
    // Else, computer wins
    return `${getDefaultOutput() + myImageLose} <br>
      Computer wins! Please refresh the page to play again.♣️♠️♦️♥️`;
  }

  // If game is not yet over, show current game status
  return `${getDefaultOutput()} <br>
    Wow, you're at ${getHandSum(playerHand)} right now!<br>
    Do you want to hit or stand? Please type hit or stand and click submit.♣️♠️♦️♥️`;
};
