/* 
Aim for a playable game. The essence of blackjack requires:
Two players - a player and a dealer (computer).
A deck of cards.
A starting hand of 2 cards for each player.
Comparing both hands and determining a winner. The possible scenarios are:
A tie. When both the player and dealer have the same total hand values - or if both draw Blackjack
A Blackjack win. When either player or dealer draw Blackjack.
A normal win. When neither draw Blackjack, the winner is decided by whomever has the higher hand total.

1. Define player and dealer
2. Create and shuffle a game deck
3. Draw 2 cards for player and dealer respectively
4. Win conditions 
-- blackjack
-- higher hand value
5. Display hands of both players and declare winner
*/

// -- Version 1 with Tutorial -- //
// -- Version 2 with Tutorial -- //
// 1. extra game mode "hit or stand"
// 2. functionaity for user to input hit or stand.

/* ================================ GLOBAL VARIABLES ================================ */

// declare game modes
var GAME_START = "game start";
var GAME_CARDS_DRAWN = "cards drawn";
var GAME_RESULTS_SHOWN = "results shown";
var GAME_HIT_OR_STAND = "hit or stand";
var currentGameMode = GAME_START;

// declare variables to store player and dealer hands by using arrays as each hand will be holding multiple card objects
var playerHand = [];
var dealerHand = [];

// declare variable to hold deck of cards
var gameDeck = "empty at the start";

// function that creates a deck of cards, used by createNewDeck function
var createDeck = function () {
  // Initialise an empty deck array
  var deck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["Diamonds", "Clubs", "Hearts", "Spades"];
  var indexSuits = 0;
  while (indexSuits < suits.length) {
    var currentSuit = suits[indexSuits];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice indexRanks starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var indexRanks = 1;
    while (indexRanks <= 13) {
      // By default, the card name is the same as indexRanks
      var cardName = indexRanks;

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
        rank: indexRanks,
      };

      // Add the new card to the deck
      deck.push(card);

      // Increment indexRanks to iterate over the next rank
      indexRanks += 1;
    }

    // Increment the suit index to iterate over the next suit
    indexSuits += 1;
  }

  // Return the completed card deck
  return deck;
};

// function that generates a random number, used by shuffleDeck function
var getRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
};

// function that shuffles a deck
var shuffleDeck = function (cards) {
  var index = 0;
  while (index < cards.length) {
    var randomIndex = getRandomIndex(cards.length);
    var currentItem = cards[index];
    var randomItem = cards[randomIndex];
    cards[index] = randomItem;
    cards[randomIndex] = currentItem;
    index = index + 1;
  }
  return cards;
};

// function that creates and shuffles a deck
var createNewDeck = function () {
  var newDeck = createDeck();
  var shuffledDeck = shuffleDeck(newDeck);
  return shuffledDeck;
};

/* ================================ GAME FUNCTIONS ================================ */

// function that checks a hand for blackjacK
var checkForBlackjack = function (handArray) {
  //check player hand
  var playerCardOne = handArray[0];
  var playerCardTwo = handArray[1];
  var isBlackjack = false;

  // if there is a blackjack, return true
  // possible scenarios:
  // 1st card ace, 2nd card 10 or picture cards
  // 1st card 10 or picture cards, 2nd card, ace
  if (
    (playerCardOne.name == "ace" && playerCardTwo.rank >= 10) ||
    (playerCardOne.rank >= 10 && playerCardTwo.name == "ace")
  ) {
    isBlackjack = true;
  }
  return isBlackjack;
};

// function that calculates a hand
var calculateTotalHandValue = function (handArray) {
  var totalHandValue = 0;
  // loop through player or dealer hand and add up the values
  var index = 0;
  while (index < handArray.length) {
    var currentCard = handArray[index];

    // for jack, queen, king, value is 10
    if (
      currentCard.name == "jack" ||
      currentCard.name == "queen" ||
      currentCard.name == "king"
    ) {
      totalHandValue = totalHandValue + 10;
    } else {
      totalHandValue = totalHandValue + currentCard.rank;
    }
    index = index + 1;
  }
  return totalHandValue;
};

// function that displayers the player and dealer hands in a message
var displayPlayerAndDealerHands = function (playerHandArray, dealerHandArray) {
  // player hand
  var playerMessage = "<b>Player Hand:</b><br>";
  var index = 0;
  while (index < playerHandArray.length) {
    playerMessage =
      playerMessage +
      "• " +
      playerHandArray[index].name +
      " of " +
      playerHandArray[index].suit +
      "<br>";
    index = index + 1;
  }
  // dealer hand
  var dealerMessage = "<b>Dealer Hand:</b><br>";
  var index = 0;
  while (index < dealerHandArray.length) {
    dealerMessage =
      dealerMessage +
      "• " +
      dealerHandArray[index].name +
      " of " +
      dealerHandArray[index].suit +
      "<br>";
    index = index + 1;
  }
  return playerMessage + "<br>" + dealerMessage;
};

// function thay displayes the total hand values of the player and the dealer in a message
var displayHandTotalValues = function (playerHandValue, dealerHandValue) {
  var totalHandValueMessage =
    "<br><br>Player total hand value: " +
    playerHandValue +
    "<br>Dealer total hand value: " +
    dealerHandValue;
  return totalHandValueMessage;
};

/* ================================ MAIN FUNCTIONS ================================ */

var main = function (input) {
  var outputMessage = "";
  // first click / start game
  if (currentGameMode == GAME_START) {
    // create the game deck
    gameDeck = createNewDeck();
    console.log(gameDeck);

    // deal 2 cards to player and dealer
    playerHand.push(gameDeck.pop());
    playerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());

    console.log("player hand ==> ");
    console.log(playerHand);
    console.log("dealer hand ==>");
    console.log(dealerHand);

    // change to game cards drawn mode
    currentGameMode = GAME_CARDS_DRAWN;
    outputMessage =
      "Everyone has been dealt a card. Click the submit button to check out the cards!";
    return outputMessage;
  }

  // second click / draw
  if (currentGameMode == GAME_CARDS_DRAWN) {
    // test checkForBlackjack function
    // playerHand = [
    //   { name: "queen", suit: "clubs", rank: 12 },
    //   { name: "ace", suit: "diamonds", rank: 1 },
    // ];
    // dealerHand = [
    //   { name: "ace", suit: "clubs", rank: 1 },
    //   { name: 10, suit: "spades", rank: 10 },
    // ];

    var playerHasBlackjack = checkForBlackjack(playerHand);
    var dealerHasBlackjack = checkForBlackjack(dealerHand);

    console.log("Does Player have Blackjack? ==?", playerHasBlackjack);
    console.log("Does dealer have Blackjack? ==?", dealerHasBlackjack);

    // playerHasBlackjack = true;
    // dealerHasBlackjack = true;

    if (playerHasBlackjack == true || dealerHasBlackjack == true) {
      // both player and dealer have blackjack = tie
      if (playerHasBlackjack == true && dealerHasBlackjack == true) {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "It is a blackjack tie!";
      }
      // only player has blackjack = player wins
      else if (playerHasBlackjack == true && dealerHasBlackjack == false) {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "Player wins by blackjack!";
      }
      // only dealer has blackjack = dealer wins
      else {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "Dealer wins blackjack!";
        console.log(outputMessage);
      }
    } else {
      outputMessage =
        displayPlayerAndDealerHands(playerHand, dealerHand) +
        "There is no blackjack!";
      console.log(outputMessage);
      // no blackjack, game continues

      // change game mode
      currentGameMode = GAME_HIT_OR_STAND;

      // appropriate output message
      return outputMessage;
    }
  }

  // hit or stand
  if (currentGameMode == GAME_HIT_OR_STAND) {
    // player hit
    if (input == "hit") {
      playerHand.push(gameDeck.pop());
      outputMessage =
        displayPlayerAndDealerHands(playerHand, dealerHand) +
        '<br> You drew another card. <br>Please input "hit" or "stand". ';
    }

    // player stand
    else if (input == "stand") {
      // calculate the total hand value of both player and dealer
      var playerHandTotalValue = calculateTotalHandValue(playerHand);
      var dealerHandTotalValue = calculateTotalHandValue(dealerHand);

      playerHandTotalValue = 11;
      dealerHandTotalValue = 9;

      // compare total hand value
      // same value: tie
      if (playerHandTotalValue == dealerHandTotalValue) {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "<br>🃏 It is a tie!" +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue);
      }
      // player higher value: player wins
      else if (playerHandTotalValue > dealerHandTotalValue) {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "<br>🃏 Player wins!" +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue);
      }
      // dealer higher value: dealer wins
      else {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "<br>🃏 Dealer wins!" +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue);
      }
    }

    // input validation
    else {
      outputMessage =
        'Please input only "hit" or "stand" in the box. <br><br>' +
        displayPlayerAndDealerHands(playerHand, dealerHand);
    }

    return outputMessage;
  }
};
