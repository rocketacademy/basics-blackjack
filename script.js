DEALING = "dealing";
HIT = "hit";
STAND = "stand";
mode = DEALING;

// Shuffle cards first
// Computer and Player each has 2 cards upon "Submit"
/**
 * Winning conditions:
 * --> Cards need to be above 17
 * --> Cards need to be 21 for BlackJack
 * ---> Computer (Dealer) has to be higher than Player
 **/
// Player and Computer's cards are first checked for Blackjack. If no, then player's cards are displayed for user to determine whether Hit or Stand.
// The game continues

var computer = [];
var player = [];
var computerSum = 0;
var playerSum = 0;
var aceIndex = 0;

// After shuffling the cards, return an array of 2 cards for each
var draw2Cards = function () {
  var card1 = deck.pop();
  var card2 = deck.pop();
  return [card1, card2];
};

/**
 * Create a standard 52-card deck
 */
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["♥️", "♦️", "♣", "♠️"];

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

// Initialise the shuffled card deck before the game starts.
var deck = shuffleCards(makeDeck());

var main = function (input) {
  // Before the game begins
  if (mode == DEALING && input == "") {
    computer = draw2Cards();
    player = draw2Cards();
    // Show the cards for HIT or STAND
    computerOutput = showCards(computer, "COMPUTER");
    playerOutput = showCards(player, "PLAYER");
    mode = "";
    return `**Computer** has ${computerOutput} <br><br> **Player** has ${playerOutput}. <br><br> Type HIT to HIT or Submit to STAND!`;
  }

  if (input.toLowerCase() == HIT) {
    mode = HIT;
    player.push(deck.pop());
    playerOutput = showCards(player, "PLAYER");
    return `**Player** has ${playerOutput} <br><br> **Computer** has ${computerOutput}`;
  }

  // Sum the cards
  computerSum = sumCards(computer);
  playerSum = sumCards(player);

  // Analyse for winning
  return winConditions(computerSum, playerSum);
};

// Generate output showing the total number of cards + rank + suits. Return Strings
var showCards = function (array, input) {
  var len = 0;
  var outputArr = [];
  var sum = sumCards(array);
  // This checks if the array of dictionay contains "ace", if yes, then call checkAce
  if (array.some((code) => code.name === "ace")) {
    checkAce(sum, array);
  }
  // This sum contains the new Ace rank from 1 to 11.
  sum = sumCards(array);
  if (input == "COMPUTER") {
    // After accounting the change, check if the sum is still below 17.
    while (sum < 17) {
      array.push(deck.pop());
      sum = sumCards(array);
      checkAce(sum, array);
    }
    // Display all of Computer's cards except the 1st card to the player
    len = 1;
    sum = "XX";
  }

  // for Player only, displaying both cards
  while (len < array.length) {
    outputArr.unshift([
      "<br> " +
        array[len].name +
        " with " +
        array[len].rank +
        " of " +
        array[len].suit,
    ]);
    len += 1;
  }
  return `<br> ${array.length} cards with total rank of ${sum} given ${outputArr}`;
};

// Take in array of cards. Sum the rank of cards. Return Number
var sumCards = function (array) {
  var len = 1;
  var output = array[0].rank;
  while (len <= array.length - 1) {
    output += array[len].rank;
    len += 1;
  }
  return output;
};

// Take in the total rank of the cards and set up winning conditions. Return Strings
var winConditions = function (com, play) {
  var output = "";
  mode = DEALING;
  if (com == 21) {
    return "Computer Wins! BLACKJACK 21";
  } else if (play == 21) {
    return "Player Wins! BLACKJACK 21";
  }

  if (play < 17) {
    return "Player can't continue with total rank < 17!";
  }

  if (com > 21 && play < 21) {
    output = "Computer Bust. Player Wins.";
  } else if (play > 21 && com < 21) {
    output = "Player Bust. Computer Wins.";
  } else if (com > play && com < 21) {
    output = "Computer Wins";
  } else if (play > com && play < 21) {
    output = "Player Wins";
  } else if (play == com) {
    output = "Thats a draw. Try Again!";
  } else {
    output = "Both Bust. Try Again!";
  }
  return output;
};

// Alternative scenarios for Ace
// Execute the change of Ace's rank from 1 to 11 if checkAce function is True
var changeAce = function (array) {
  var len = 0;
  while (len < array.length) {
    if (array[len].name == "ace") {
      aceIndex = len;
      array[len].rank = 11;
      // Only 1 Ace will be modified
      len = array.length;
    }
    len += 1;
  }
  return array;
};

// If the cards chosen contains Ace, function checks if it is better to change Ace from 1 to 11
var checkAce = function (sum, array) {
  if (sum == 11) {
    return changeAce(array);
  }
  // If Ace is 11, check if the total will be greater than sum but still less than 21
  var aceTotal = sum + 10;
  if (aceTotal < 21 && aceTotal > sum) {
    return changeAce(array);
  }

  // Change back to 1 if changing the Ace to 11 exceeds 21.
  if (sum > 21) {
    if (array[aceIndex].name == "ace") {
      array[aceIndex].rank = 1;
    }
  }
};
