// ==================== Generate deck of 52 cards ====================
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

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "Ace";
      } else if (cardName == 11) {
        cardName = "Jack";
      } else if (cardName == 12) {
        cardName = "Queen";
      } else if (cardName == 13) {
        cardName = "King";
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

var deck = makeDeck();

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
var shuffledDeck = shuffleCards(deck);

// ==================== V1 - Compare initial hands to determine winner ====================
// two players - one player and one computer
// a deck of cards
// a starting hand of 2 cards for each player
// comparing both hands and determining a winner

// Create global variables to store each player's cards
var playerHands = [];
var dealerHands = [];

// Store the value of each player's hands into a variable
var playerValue = "";
var dealerValue = "";

// Create a helper function to draw 2 cards for each player
var drawCards = function (input) {
  // Input is a numerical value to determine number of cards drawn by player
  var cardsDrawn = []; // ??? QUESTION: what's the diff between setting this as global variable vs within a function?
  var i = 0;
  while (i < input) {
    cardsDrawn.push(shuffledDeck.pop());
    i += 1;
  }
  return cardsDrawn;
};

// Derive a method to calculate the hand values
// In blackjack, ace can be 1 or 11, jack/queen/king are 10.
// Ace will have a value of 11 unless that would give the player or dealer a score in excess of 21
var calcCardValue = function (input) {
  //input is an array of card objects with name, suit and rank
  var value = Number(0);
  var i = 0;
  while (i < input.length) {
    // for jack, queen, king, value = 10
    if (input[i].rank == 11 || input[i].rank == 12 || input[i].rank == 13) {
      value += 10;

      // for ace, value = 11 or 1 if adding 11 gives an excess of 21
    } else if (input[i].rank == 1) {
      if (value + 11 <= 21) {
        value += 11;
      } else {
        value += 1;
      }

      // for all other cards, value is as is.
    } else {
      value += input[i].rank;
    }
    i += 1;
  }
  return value;
};

/* 
// Compare value function has been shifted to V2
// Create a helper function with winning conditions
var compareHands = function (player, dealer) {
  // Inputs are 2 numerical values
  var outputValue = "";
  if (player == dealer) {
    if (player == Number(21)) {
      outputValue = "Tie. Both drew Blackjack.";
    } else {
      outputValue = "Tie.";
    }
  } else if (player == Number(21)) {
    outputValue = "Player wins by Blackjack!";
  } else if (dealer == Number(21)) {
    outputValue = "Dealer wins by Blackjack!";
  } else if (player > dealer && player != Number(21)) {
    outputValue = "Player wins";
  } else if (player < dealer && dealer != Number(21)) {
    outputValue = "Dealer wins";
  }
  return outputValue;
};
*/

// Create a function to reveal the cards drawn by each player
var revealCards = function (input) {
  // Input is an object with card arrays
  var cardsInHand = "";
  var i = 0;
  while (i < input.length) {
    cardsInHand += `${input[i].name} of ${input[i].suit} <br>`;
    i += 1;
  }
  return cardsInHand;
};

/*
// Main function shifted to V2 
var gameMode = "deal cards";

var main = function (input) {
  var outputMsg = "";
  if (gameMode == "deal cards") {
    gameMode = "compare cards";
    playerHands = drawCards(2);
    dealerHands = drawCards(2);
    outputMsg = `<i> The dealer deals 2 cards to each player... </i><br><br> Click 'Submit' for the winner.`;
  } else if (gameMode == "compare cards") {
    gameMode = "deal cards";
    // Store the value of each player's hands into a variable
    var playerValue = calcCardValue(playerHands);
    var dealerValue = calcCardValue(dealerHands);
    outputMsg = `Player (${playerValue}):<br>${revealCards(
      playerHands
    )}<br> Dealer (${dealerValue}):<br> ${revealCards(
      dealerHands
    )} <br> <b>${compareHands(playerValue, dealerValue)}</b>`;
  }
  return outputMsg;
};
*/

// ==================== V2 - Add Player Hit or Stand ====================

var haveBlackjack = function (input) {
  // Input is an array of card objects
  var gotBlackjack = false;
  if (
    input[0].name == "Ace" &&
    (input[1].name == "King" ||
      input[1].name == "Queen" ||
      input[1].name == "Jack" ||
      input[1].name == "10")
  ) {
    gotBlackjack = true;
  } else if (
    input[1].name == "Ace" &&
    (input[0].name == "King" ||
      input[0].name == "Queen" ||
      input[0].name == "Jack" ||
      input[0].name == "10")
  ) {
    gotBlackjack = true;
  }
  return gotBlackjack;
};

var compareHands = function (player, dealer) {
  // Inputs are 2 numerical values
  var outputValue = "";
  if (player == dealer) {
    if (player == Number(21)) {
      if (
        haveBlackjack(playerHands) == true &&
        haveBlackjack(dealerHands) == true
      ) {
        outputValue = "Tie with Blackjack.";
      } else {
        outputValue = `Tie with 21.`;
      }
    } else {
      outputValue = "It's a Tie.";
    }
  } else if (haveBlackjack(playerHands) == true) {
    outputValue = "Player wins with Blackjack!";
  } else if (haveBlackjack(dealerHands) == true) {
    outputValue = "Dealer wins with Blackjack!";
  } else if (player > dealer && !(player > Number(21))) {
    outputValue = "Player wins.";
  } else if (player < dealer && !(dealer > Number(21))) {
    outputValue = "Dealer wins.";
  } else if (player > 21) {
    if (dealer > 21) {
      outputValue = `It's a Tie - both bust.`;
    } else {
      outputValue = `Player bust. Dealer wins.`;
    }
  } else if (dealer > 21) {
    if (player > 21) {
      outputValue = `It's a Tie - both bust.`;
    } else {
      outputValue = `Dealer bust. Player wins. `;
    }
  }
  return outputValue;
};

/*
// Main function shifted to V3
var gameMode = "deal cards";

var main = function (input) {
  var outputMsg = "";
  if (gameMode == "deal cards") {
    gameMode = "compare cards";
    playerHands = drawCards(2);
    dealerHands = drawCards(2);
    playerValue = calcCardValue(playerHands);
    dealerValue = calcCardValue(dealerHands);
    outputMsg = `<i> The dealer deals 2 cards to each player... </i><br><br> Click 'Submit' to begin.`;
  } else if (gameMode == "compare cards") {
    gameMode = "player to hit or stand";
    outputMsg = `Player (${playerValue}):<br>${revealCards(
      playerHands
    )}<br> Dealer (${dealerValue}):<br> ${revealCards(
      dealerHands
    )} <br> Player, enter <b>'h'</b> to hit or <b>'s'</b> to stand.`;
  } else if (gameMode == "player to hit or stand") {
    var playerInput = input.toLowerCase();
    if (!(playerInput == "h" || playerInput == "s")) {
      outputMsg = `Invalid input. Player, enter <b>'h'</b> to hit or <b>'s'</b> to stand. <br><br> Player (${playerValue}):<br>${revealCards(
        playerHands
      )}<br> Dealer (${dealerValue}):<br> ${revealCards(dealerHands)}`;
    } else if (playerInput == "h") {
      playerHands.push(shuffledDeck.pop());
      playerValue = calcCardValue(playerHands);
      outputMsg = `Player (${playerValue}):<br>${revealCards(
        playerHands
      )}<br> Dealer (${dealerValue}):<br> ${revealCards(
        dealerHands
      )} <br> Player, enter <b>'h'</b> to hit or <b>'s'</b> to stand.`;
    } else if (playerInput == "s") {
      gameMode = "game over";
      outputMsg = `Player (${playerValue}):<br>${revealCards(
        playerHands
      )}<br> Dealer (${dealerValue}):<br> ${revealCards(
        dealerHands
      )} <br> <b>${compareHands(playerValue, dealerValue)}</b>`;
    }
  } else if (gameMode == "game over") {
    //gameMode = "deal cards"; // comment this out unless want game to keep running on 'Submit'
    outputMsg = `End of Game. Refresh to restart.`;
  }
  return outputMsg;
};
*/

// ==================== V3 - Add Dealer Hit or Stand ====================
// Dealer to hit if 16 or under, to stand if 17 or higher

var shouldDealerHit = function (input) {
  // Takes in a numerical input of dealer hand value
  if (input <= 16) {
    return true;
  }
  return false;
};

var gameMode = "deal cards";

var main = function (input) {
  var outputMsg = "";
  if (gameMode == "deal cards") {
    gameMode = "compare cards";
    playerHands = drawCards(2);
    dealerHands = drawCards(2);
    playerValue = calcCardValue(playerHands);
    dealerValue = calcCardValue(dealerHands);
    outputMsg = `<i> The dealer deals 2 cards to each player... </i><br><br> Click 'Submit' to begin.`;
  } else if (gameMode == "compare cards") {
    gameMode = "player to hit or stand";
    outputMsg = `Player (${playerValue}):<br>${revealCards(
      playerHands
    )}<br> Dealer (${dealerValue}):<br> ${revealCards(
      dealerHands
    )} <br> Player, enter <b>'h'</b> to hit or <b>'s'</b> to stand.`;
  } else if (gameMode == "player to hit or stand") {
    var playerInput = input.toLowerCase();
    if (!(playerInput == "h" || playerInput == "s")) {
      outputMsg = `Invalid input. Player, enter <b>'h'</b> to hit or <b>'s'</b> to stand. <br><br> Player (${playerValue}):<br>${revealCards(
        playerHands
      )}<br> Dealer (${dealerValue}):<br> ${revealCards(dealerHands)}`;
    } else if (playerInput == "h") {
      playerHands.push(shuffledDeck.pop());
      playerValue = calcCardValue(playerHands);
      if (playerValue > 21) {
        gameMode = "game over";
        while (shouldDealerHit(dealerValue) == true) {
          dealerHands.push(shuffledDeck.pop());
          dealerValue = calcCardValue(dealerHands);
        }
        outputMsg = `Player (${playerValue}):<br>${revealCards(
          playerHands
        )}<br> Dealer (${dealerValue}):<br> ${revealCards(
          dealerHands
        )} <br><b>${compareHands(playerValue, dealerValue)}</b>`;
      } else {
        outputMsg = `Player (${playerValue}):<br>${revealCards(
          playerHands
        )}<br> Dealer (${dealerValue}):<br> ${revealCards(
          dealerHands
        )} <br> Player, enter <b>'h'</b> to hit or <b>'s'</b> to stand.`;
      }
    } else if (playerInput == "s") {
      gameMode = "game over";
      while (shouldDealerHit(dealerValue) == true) {
        dealerHands.push(shuffledDeck.pop());
        dealerValue = calcCardValue(dealerHands);
      }
      outputMsg = `Player (${playerValue}):<br>${revealCards(
        playerHands
      )}<br> Dealer (${dealerValue}):<br> ${revealCards(
        dealerHands
      )} <br><b>${compareHands(playerValue, dealerValue)}</b>`;
    }
  } else if (gameMode == "game over") {
    outputMsg = `End of Game. Refresh to restart.`;
  }
  return outputMsg;
};
