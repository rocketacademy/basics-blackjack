/*Base
Gameplay Description
The main function runs on each player's turn. The sequence of actions in the game might be the following.
Deck is shuffled.
User clicks Submit to deal cards.
The cards are analysed for game winning conditions, e.g. Blackjack.
The cards are displayed to the user.
The user decides whether to hit or stand, using the submit button to submit their choice.
The user's cards are analysed for winning or losing conditions.
The computer decides to hit or stand automatically based on game rules.
The game either ends or continues.*/

/*Global Variables*/
// Game State
// -1 = Introduction
// 0 = After player and dealer draw, pend player action
// 1 = After player is done (player says "stand")
// 2 = End game state
var gameState = 0;

// Player Wallet
var playerWalletBalance = 100;

// Cards
var cardDeck = [];
var shuffledDeck = [];
var bankerCards = [];
var bankerCardValue = "";
var playerCards = [];
var playerCardValue = "";

// Output Values
var playerOutput = "";
var bankerOutput = "";
var myOutputValue = "";

// Initialise the card deck representation as an array of objects
var makeDeck = function () {
  // Initialise an empty deck array
  cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["♥️", "♦️", "♣️ ", " ♠️ "];

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
      var cardPoint = rankCounter;

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

      // If rank is 11, 12, or 13, set cardPoint to 10
      if (cardPoint == 11) {
        cardPoint = 10;
      } else if (cardPoint == 12) {
        cardPoint = 10;
      } else if (cardPoint == 13) {
        cardPoint = 10;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        points: cardPoint,
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

// Check for blackjack
var checkForBlackjack = function (card1, card2) {
  if (card1 == 1 || card2 == 1) {
    if (card1 + card2 > 10) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

// Check for winner
var checkForWinner = function () {
  myOutputValue = `${playerOutput}<br>Total value : ${playerCardValue}<br><br>${bankerOutput}<br>Total value : ${bankerCardValue}`;
  gameState = 0;
  if (playerCardValue > 21 && bankerCardValue > 21) {
    myOutputValue =
      myOutputValue + "<br><br>Both Banker and Player bust, it's a tie!";
  } else if (playerCardValue > 21) {
    myOutputValue = myOutputValue + "<br><br>Player bust, Banker won!";
  } else if (bankerCardValue > 21) {
    myOutputValue = myOutputValue + "<br><br>Banker bust, Player won!";
  } else if (playerCardValue > bankerCardValue) {
    myOutputValue = myOutputValue + "<br><br>Player won!";
  } else if (playerCardValue < bankerCardValue) {
    myOutputValue = myOutputValue + "<br><br>Banker won!";
  } else if (playerCardValue == bankerCardValue) {
    myOutputValue = myOutputValue + "<br><br>It's a tie!";
  }
  myOutputValue = myOutputValue + " Click to start the next round.";
};

// End the game if either player has Blackjack
var blackjackOutcome = function () {
  if (
    checkForBlackjack(playerCards[0].rank, playerCards[1].rank) &&
    checkForBlackjack(bankerCards[0].rank, bankerCards[1].rank)
  ) {
    console.log("in tie condition");
    gameState = 0;
    bankerOutput = `Banker drew ${bankerCards[0].name} of ${bankerCards[0].suit} | ${bankerCards[1].name} of ${bankerCards[1].suit} `;
    myOutputValue =
      `${playerOutput}<br>Total value : ${playerCardValue}<br><br>${bankerOutput}` +
      "<br><br>Both Player and Banker got Blackjack, it's a tie! Click to start the next round.";
  } else if (checkForBlackjack(playerCards[0].rank, playerCards[1].rank)) {
    console.log("in player BJ condition");
    gameState = 0;
    bankerOutput = `Banker drew ${bankerCards[0].name} of ${bankerCards[0].suit} | ${bankerCards[1].name} of ${bankerCards[1].suit} `;
    myOutputValue =
      `${playerOutput}<br>Total value : ${playerCardValue}<br><br>${bankerOutput}` +
      "<br><br>You got Blackjack, you won! 🙂 Click to start the next round.";
  } else if (checkForBlackjack(bankerCards[0].rank, bankerCards[1].rank)) {
    console.log("in banker BJ condition");
    gameState = 0;
    bankerOutput = `Banker drew ${bankerCards[0].name} of ${bankerCards[0].suit} | ${bankerCards[1].name} of ${bankerCards[1].suit} `;
    myOutputValue =
      `${playerOutput}<br>Total value : ${playerCardValue}<br><br>${bankerOutput}` +
      "<br><br>Banker got Blackjack, you lost! 😢 Click to start the next round.";
  }
};

// For player to take as many cards as needed
var playerHits = function () {
  playerCards.push(shuffledDeck.pop());
  playerOutput =
    playerOutput +
    ` | ${playerCards[playerCards.length - 1].name} of ${
      playerCards[playerCards.length - 1].suit
    } `;
  playerCardValue = calculateCardValue(playerCards);
  myOutputValue = `${playerOutput}<br>Total value : ${playerCardValue}<br><br>${bankerOutput}<br><br>Please input "hit" (to draw another card from deck) or "stand" (to not draw any card). `;
  return myOutputValue;
};

// Loop for banker to take card if hand < 17
var bankersTurn = function () {
  console.log("in banker function");
  bankerOutput = `Banker drew ${bankerCards[0].name} of ${bankerCards[0].suit} | ${bankerCards[1].name} of ${bankerCards[1].suit} `;
  console.log(bankerOutput);
  while (bankerCardValue < 17) {
    console.log("in While");
    bankerCards.push(shuffledDeck.pop());
    bankerOutput =
      bankerOutput +
      ` | ${bankerCards[bankerCards.length - 1].name} of ${
        bankerCards[bankerCards.length - 1].suit
      } `;
    console.log(bankerOutput);
    bankerCardValue = calculateCardValue(bankerCards);
    console.log(bankerCardValue);
  }
  checkForWinner();
  // myOutputValue = `${playerOutput}<br>Total value : ${playerCardValue}<br><br>${bankerOutput}<br>Total value : ${bankerCardValue}`;
  return myOutputValue;
};

// For hand with "ace" and value of other cards < 10, let ace's value be 11
var calculateCardValue = function (cardsOnHand) {
  var totalCardVal = 0;
  var aceCount = 0;
  var loopcount = 0;
  console.log(cardsOnHand);
  while (loopcount < cardsOnHand.length) {
    console.log(cardsOnHand[0].points);
    if (cardsOnHand[loopcount].points == 1) {
      aceCount += 1;
    }
    totalCardVal = totalCardVal + cardsOnHand[loopcount].points;
    loopcount += 1;
  }

  for (let aceLoop = 0; aceLoop < aceCount; aceLoop++) {
    if (totalCardVal < 12) {
      totalCardVal = totalCardVal + 10;
    }
  }
  loopcount += 1;

  return totalCardVal;
};

// First round of card draw
var readCards = function (input) {
  if (gameState == 0) {
    gameState += 1;
    // Create the cardDeck
    bankerCards = [];
    playerCards = [];
    playerCardValue = "";
    cardDeck = makeDeck();

    // Shuffle the deck and save it in a new variable shuffledDeck
    shuffledDeck = shuffleCards(cardDeck);

    // Draw 2 cards from the top of the deck
    bankerCards.push(shuffledDeck.pop());
    playerCards.push(shuffledDeck.pop());
    bankerCards.push(shuffledDeck.pop());
    playerCards.push(shuffledDeck.pop());

    playerCardValue = calculateCardValue(playerCards);
    bankerCardValue = calculateCardValue(bankerCards);

    // Loop to return computer and player cards by rank attribute
    playerOutput = `You drew ${playerCards[0].name} of ${playerCards[0].suit} | ${playerCards[1].name} of ${playerCards[1].suit}`;
    bankerOutput = `Banker drew ${bankerCards[0].name} of ${bankerCards[0].suit} | Covered `;
    myOutputValue =
      `${playerOutput}<br>Total value : ${playerCardValue}<br><br>${bankerOutput}` +
      `<br><br>Please input "hit" (to draw another card from deck) or "stand" (to not draw any card). `;

    console.log(checkForBlackjack(playerCards[0].rank, playerCards[1].rank));
    console.log(checkForBlackjack(bankerCards[0].rank, bankerCards[1].rank));

    blackjackOutcome();
    return myOutputValue;
  } else if (gameState == 1 && input == "hit") {
    myOutputValue = playerHits();
    return myOutputValue;
  } else if (gameState == 1 && input == "stand") {
    gameState += 1;
    myOutputValue = bankersTurn();
    return myOutputValue;
  }
};

var main = function (input) {
  if (gameState == 1 && input != "hit" && input != "stand") {
    return `Please input a valid response<br><br>${myOutputValue}`;
  } else {
    readCards(input);
    // Return the fully-constructed output string
    return myOutputValue;
  }
};
