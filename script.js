/*pseudocode 
1. create deck, shuffle, deal cards, evaluate winner
game states
- current game mode
- game start
- cards drawn
- final results 

general things to do 
  - define player and dealer with a global array
  var player = []
  var dealer = []
  - create and shuffle deck
  - draw 2 cards for player and dealer
  - win conditions
    -- blackjack 
    -- higher hand value
  - display hands of both player and computer and declare winner

2. player - hit or stand
psedocode for h/s - new game state for h/s and choice of h(add card)/s(compare card with player) must be there for player
3. dealer - hit or stand
psedocode for h/s - dealer must h/s ONLY after player h/s is done AND dealer MUST hit if total deal value is less than 17. if more than 17, choose to stand
4. variable value of Ace - either 1 or 11
if total hand value < 21, ace must be 11. else, ace is 1 (use calculatetotalValue function)
*/

//global variables - game state
var start = "game start";
var cardDrawn = "cards drawn";
var results = "results shown";
var hitOrStand = "hit or stand";
var gameStateNow = start;

//global arrays

//storing player and dealer cards
var player = [];
var dealer = [];

// empty array to hold deck of cards
var gameDeck = [];

//helper functions

//create new deck of cards
var createDeck = function () {
  // deck array
  var deck = [];
  var suits = ["Diamonds", "Clubs", "Hearts", "Spades"];
  var indexSuits = 0;
  while (indexSuits < suits.length) {
    var currSuit = suits[indexSuits];
    var indexRanks = 1;
    while (indexRanks <= 13) {
      var cardName = indexRanks;

      if (cardName == 1) {
        cardName = "Ace";
      }
      if (cardName == 11) {
        cardName = "Jack";
      }
      if (cardName == 12) {
        cardName = "Queen";
      }
      if (cardName == 13) {
        cardName = "King";
      }
      var card = {
        name: cardName,
        suit: currSuit,
        rank: indexRanks,
      };
      deck.push(card);
      indexRanks = indexRanks + 1;
    }
    indexSuits = indexSuits + 1;
  }
  return deck;
};

// number randomiser function for shuffling deck
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// shuffles the new deck
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

// creates and shuffles a new deck - together with 2 original helper fxns
var createNewDeck = function () {
  var newDeck = createDeck();
  var shuffledDeck = shuffleDeck(newDeck);
  return shuffledDeck;
};

// checking for black jack
var checkForBlackJack = function (handArray) {
  var player1 = handArray[0];
  var player2 = handArray[1];
  var verifyBlackjack = false;

  // ace + (10 or suits) - either order is fine for blackjack
  if (
    (player1.name == "Ace" && player2.rank >= 10) ||
    (player2.name == "Ace" && player1.rank >= 10)
  ) {
    verifyBlackjack = true;
  }

  return verifyBlackjack;
};

// check for total hand value in a round
var calculateHandValue = function (handArray) {
  var totalHandValue = 0;
  // ace card tracker variable
  var aceCounter = 0;

  // adding the ranks together
  var index = 0;
  while (index < handArray.length) {
    var currentCard = handArray[index];

    // king, queen, and jack are counted as 10.
    if (
      currentCard.name == "King" ||
      currentCard.name == "Queen" ||
      currentCard.name == "Jack"
    ) {
      totalHandValue = totalHandValue + 10;
    }
    // ace as 11
    else if (currentCard.name == "Ace") {
      totalHandValue = totalHandValue + 11;
      aceCounter = aceCounter + 1;
      // rest of them by their ranks
    } else {
      totalHandValue = totalHandValue + currentCard.rank;
    }
    index = index + 1;
  }

  // index reset back to 0 for ace counter
  index = 0;
  /*loops through tp find the number of aces found by ace counter and 
  only deduct 10 from total hand value when totalHandValue is more than 21*/
  while (index < aceCounter) {
    if (totalHandValue > 21) {
      totalHandValue = totalHandValue - 10;
    }
    index = index + 1;
  }

  return totalHandValue;
};

// player and dealers hand will be shown in a message
var displayPlayerAndDealerHands = function (playerHandArray, dealerHandArray) {
  var playerMessage = "Player hand:<br>";
  var index = 0;
  while (index < playerHandArray.length) {
    playerMessage =
      playerMessage +
      playerHandArray[index].name +
      " of " +
      playerHandArray[index].suit +
      "<br>";
    index = index + 1;
  }

  index = 0;
  var dealerMessage = "Dealer hand:<br>";
  while (index < dealerHandArray.length) {
    dealerMessage =
      dealerMessage +
      dealerHandArray[index].name +
      " of " +
      dealerHandArray[index].suit +
      "<br>";
    index = index + 1;
  }

  return playerMessage + "<br>" + dealerMessage;
};

// total hand values of the player and the dealer will be shown in a message
var displayHandTotalValues = function (playerHandValue, dealerHandValue) {
  var totalHandValueMessage =
    "<br>Player total hand value: " +
    playerHandValue +
    "<br>Dealer total hand value: " +
    dealerHandValue;
  return totalHandValueMessage;
};

//main function
var main = function (input) {
  var outputMessage = "";

  // start game mode
  if (gameStateNow == start) {
    // create deck
    gameDeck = createNewDeck();

    // give 2 cards each to player and dealer
    player.push(gameDeck.pop());
    player.push(gameDeck.pop());
    dealer.push(gameDeck.pop());
    dealer.push(gameDeck.pop());

    // check player and dealer cards
    console.log("Player Hand ==>");
    console.log(player);
    console.log("Dealer Hand ==>");
    console.log(dealer);

    // update game state
    gameStateNow = cardDrawn;

    // output message
    outputMessage =
      "Everyone has been dealt a card. Click button to calculate cards!";

    // return message
    return outputMessage;
  }

  // second game state
  if (gameStateNow == cardDrawn) {
    // check for blackjack
    var playerHasBlackJack = checkForBlackJack(player);
    var dealerHasBlackJack = checkForBlackJack(dealer);

    console.log("Does Player have Black Jack? ==>", playerHasBlackJack);
    console.log("Does Dealer have Black Jack? ==>", dealerHasBlackJack);

    // Condition when either player or dealer has black jack
    if (playerHasBlackJack == true || dealerHasBlackJack == true) {
      // Condition where both have black jack
      if (playerHasBlackJack == true && dealerHasBlackJack == true) {
        outputMessage =
          displayPlayerAndDealerHands(player, dealer) +
          "<br>Its a Blackjack Tie!";
      }
      // Condition when only player has black jack
      else if (playerHasBlackJack == true && dealerHasBlackJack == false) {
        outputMessage =
          displayPlayerAndDealerHands(player, dealer) +
          "<br>Player wins by Blackjack!";
      }
      // Condition when only dealer has black jack
      else {
        outputMessage =
          displayPlayerAndDealerHands(player, dealer) +
          "<br>Dealer wins by Blackjack!";
      }
    }

    // Condition where neither player nor dealer has black jack
    // ask player to input 'hit' or 'stand'
    else {
      outputMessage =
        displayPlayerAndDealerHands(player, dealer) +
        '<br> There are no Black Jacks. <br>Please input "hit" or "stand".';

      // update gameMode
      gameStateNow = hitOrStand;
    }

    // return message
    return outputMessage;
  }

  // third game state
  if (gameStateNow == hitOrStand) {
    // Condition where player inputs 'hit'
    if (input == "hit") {
      player.push(gameDeck.pop());
      outputMessage =
        displayPlayerAndDealerHands(player, dealer) +
        '<br> You drew another card. <br>Please input "hit" or "stand".';
    }

    // Condition where player inputs 'stand'
    else if (input == "stand") {
      // Calculate hands
      var playerHandTotalValue = calculateHandValue(player);
      var dealerHandTotalValue = calculateHandValue(dealer);

      // Dealer's hit or stand logic
      while (dealerHandTotalValue < 17) {
        dealer.push(gameDeck.pop());
        dealerHandTotalValue = calculateHandValue(dealer);
      }

      // Conditions for tied game
      if (
        playerHandTotalValue == dealerHandTotalValue ||
        (playerHandTotalValue > 21 && dealerHandTotalValue > 21)
      ) {
        outputMessage =
          displayPlayerAndDealerHands(player, dealer) +
          "<br>It's a Tie!" +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue);
      }

      // player win - player must be below 21 and higher than dealer
      else if (
        (playerHandTotalValue > dealerHandTotalValue &&
          playerHandTotalValue <= 21) ||
        (playerHandTotalValue <= 21 && dealerHandTotalValue > 21)
      ) {
        outputMessage =
          displayPlayerAndDealerHands(player, dealer) +
          "<br>Player wins!" +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue);
      }

      // dealer win - dealer must be below 21 and higher than player
      else {
        outputMessage =
          displayPlayerAndDealerHands(player, dealer) +
          "<br>Dealer wins!" +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue);
      }
      // update game mode
      gameStateNow = results;
    }

    // input validation
    else {
      outputMessage =
        'wrong input... only "hit" or "stand" are valid.<br><br>' +
        displayPlayerAndDealerHands(player, dealer);
    }
  }
  //results mode - release the results
  return outputMessage;
};
