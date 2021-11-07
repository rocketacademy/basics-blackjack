// Pseudocode
// 1.First we initiate the game
// 2.Create card deck
// 3.Shuffle the deck
// 4.The player will be given two cards (Player, here are your cards, do you want to deal)
// 5.If the player type hit, one card will be given
// 6.If the dealer is below 17, a card will be hit
// 7.Else, if the player stand, the computer will compute the toal score
// 8.If the player or computer is above 21, they lose
// 9.If one of them is close, they win

/* ================================================== */
/* ================ GLOBAL VARIABLES ================ */
/* ================================================== */

var playerHand = [];
var computerHand = [];
var currentGameMode = "start game";
var cardsDrawn = "cards drawn";
var gameHitOrStand = "Hit/stand";
var winImage = `<img src="https://c.tenor.com/Z_IV0-4w2vEAAAAC/yes-winning.gif"/>`;
var loseImage = `<img src="https://media.giphy.com/media/d2lcHJTG5Tscg/giphy.gif"/>`;
var tieImage = `<img src="https://media.giphy.com/media/3orifeagG1UwX4DeO4/giphy.gif"/>`;
var dealerBlackjack = `<img src="https://media.giphy.com/media/l2SpMVOjXhleZzggE/giphy.gif"/>`;
var playerBJ = `https://media.giphy.com/media/l1IXY77djUsHH6S8o/giphy.gif`;

/* ================================================== */
/* =========== DECK CREATION FUNCTIONS ============== */
/* ================================================== */

var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var emoji = ["♥️", "♦️", "♣️", "♠️"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];
    var currentEmoji = emoji[suitIndex];

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
        emoji: currentEmoji,
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

/* ================================================= */
/* ================ GAME FUNCTIONS ================ */
/* ================================================ */

//function that draws cards
var drawCardPlayer = function () {
  //shuffle cards
  var entireDeck = shuffleCards(makeDeck());
  //player draw cards
  var playerDeck = entireDeck.pop();
  // playerHand.push(playerDeck);
  return playerDeck;
};

//function that draws cards
var drawCardComputer = function () {
  //shuffle cards
  entireDeck = shuffleCards(makeDeck());
  //computer draw cards
  var computerDeck = entireDeck.pop();
  return computerDeck;
};

// Function that displays the player and dealers hand in a message
var displayPlayerAndDealerHands = function (playerHandArray, dealerHandArray) {
  var playerMessage = "Player hand:<br>";
  var index = 0;
  while (index < playerHandArray.length) {
    playerMessage =
      playerMessage +
      "- " +
      playerHandArray[index].name +
      " of " +
      playerHandArray[index].suit +
      playerHandArray[index].emoji +
      "<br>";

    index = index + 1;
  }

  index = 0;
  var dealerMessage = "Dealer hand:<br>";
  while (index < dealerHandArray.length) {
    dealerMessage =
      dealerMessage +
      "- " +
      dealerHandArray[index].name +
      " of " +
      dealerHandArray[index].suit +
      dealerHandArray[index].emoji +
      "<br>";
    index = index + 1;
  }

  return playerMessage + "<br>" + dealerMessage;
};

// Function that checks a hand for black jack
var checkForBlackJack = function (deckOfCards) {
  // Loop through player hand
  // if there is a blackjack return true
  // else return false
  var playerCardOne = deckOfCards[0];
  var playerCardTwo = deckOfCards[1];
  var isBlackJack = false;

  // Possible black jack scenerios
  // First card is Ace +  Second card is 10 or suits
  // Second card is Ace +  First card is 10 or suits
  if (
    (playerCardOne.name == "ace" && playerCardTwo.rank >= 10) ||
    (playerCardTwo.name == "ace" && playerCardOne.rank >= 10)
  ) {
    isBlackJack = true;
  }

  return isBlackJack;
};

var rankPlayer = function (input) {
  var index = 0;
  var totalPlayerRank = 0;
  var aceCounter = 0;
  var playerLength = input.length;
  while (index < playerLength) {
    var playerDeckRank = input[index];

    if (
      playerDeckRank.name == "jack" ||
      playerDeckRank.name == "queen" ||
      playerDeckRank.name == "king"
    ) {
      totalPlayerRank += 10;
    } else if (playerDeckRank.name == "ace") {
      totalPlayerRank += 11;
      aceCounter += 1;
      if (computerAce > 1) {
        totalPlayerRank = totalPlayerRank - (aceCounter - 1) * 10;
      }
    } else {
      totalPlayerRank += playerDeckRank.rank;
    }
    index++;
    console.log(totalPlayerRank);
  }

  return Number(totalPlayerRank);
};

var rankComputer = function (input) {
  var i = 0;
  var computerLength = input.length;
  var totalComputerRank = 0;
  var aceCounter = 0;
  while (i < computerLength) {
    var dealerDeckRank = input[i];
    if (
      dealerDeckRank.name == "jack" ||
      dealerDeckRank.name == "queen" ||
      dealerDeckRank.name == "king"
    ) {
      totalComputerRank += 10;
    } else if (dealerDeckRank.name == "ace") {
      totalComputerRank += 11;
      aceCounter += 1;
    } else {
      totalComputerRank += dealerDeckRank.rank;
    }
    i++;
    console.log(totalComputerRank);
  }
  i = 0;
  while (i < aceCounter) {
    if (totalComputerRank > 21) {
      totalComputerRank = totalComputerRank - 10;
    }
    i++;
  }
  return Number(totalComputerRank);
};

// Function that displays the total hand values of the player and the dealer in a message
var displayHandTotalValues = function (playerHandValue, dealerHandValue) {
  var totalHandValueMessage =
    "<br>Player total hand value: " +
    playerHandValue +
    "<br>Dealer total hand value: " +
    dealerHandValue;
  return totalHandValueMessage;
};
/* ================================================= */
/* ================= MAIN FUNCTION ================ */
/* ================================================ */

var main = function (input) {
  var outputMessage = "";

  // FIRST MODE
  if (currentGameMode == "start game") {
    // deal 2 cards to player and dealer
    playerHand.push(drawCardPlayer());
    computerHand.push(drawCardComputer());
    playerHand.push(drawCardPlayer());
    computerHand.push(drawCardComputer());

    // update gameMode
    currentGameMode = cardsDrawn;

    // reassign output message
    outputMessage =
      "Everyone has been dealt a card. Please click the submit button to calculate cards!";
    // return message
    return outputMessage;
  }

  // SECOND MODE
  if (currentGameMode == cardsDrawn) {
    // check for blackjack
    var playerHasBlackJack = checkForBlackJack(playerHand);
    var dealerHasBlackJack = checkForBlackJack(computerHand);

    // Condition when either player or dealer has black jack
    if (playerHasBlackJack == true || dealerHasBlackJack == true) {
      // Condition where both have black jack
      if (playerHasBlackJack == true && dealerHasBlackJack == true) {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, computerHand) +
          "<br>Its a Black Jack Tie!";
      }
      // Condition when only player has black jack
      else if (playerHasBlackJack == true && dealerHasBlackJack == false) {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, computerHand) +
          "<br>Player wins by Black Jack!";
      }
      // Condition when only dealer has black jack
      else {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, computerHand) +
          "<br>Dealer wins by Black Jack!" +
          dealerBlackjack;
      }
    }
    // Condition where neither player nor dealer has black jack
    // ask player to input 'hit' or 'stand'
    else {
      console.log(rankComputer(computerHand));
      console.log(rankPlayer(playerHand));
      outputMessage =
        displayPlayerAndDealerHands(playerHand, computerHand) +
        '<br> There are no Black Jacks. <br>Please input "hit" or "stand".';

      // update gameMode
      currentGameMode = gameHitOrStand;
    }

    // return message
    return outputMessage;
  }

  //(Hit or stand mode)
  //Player hit
  if (currentGameMode == gameHitOrStand) {
    if (input == "hit") {
      playerHand.push(drawCardPlayer());
      console.log(drawCardPlayer());

      outputMessage =
        displayPlayerAndDealerHands(playerHand, computerHand) +
        '<br>Please input "hit" or "stand".';

      //Player stand
    } else if (input == "stand") {
      //caculate rank
      var playerTotalHandRank = rankPlayer(playerHand);
      var dealerTotalHandRank = rankComputer(computerHand);

      while (dealerTotalHandRank < 17) {
        computerHand.push(drawCardComputer());
        dealerTotalHandRank = rankComputer(computerHand);
      }
      //conditions if both tie
      if (
        playerTotalHandRank == dealerTotalHandRank ||
        (playerTotalHandRank > 21 && dealerTotalHandRank > 21)
      ) {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, computerHand) +
          "<br>Its a Tie!" +
          displayHandTotalValues(playerTotalHandRank, dealerTotalHandRank) +
          tieImage;
      }
      // Conditions for player win
      else if (
        (playerTotalHandRank > dealerTotalHandRank &&
          playerTotalHandRank <= 21) ||
        (playerTotalHandRank <= 21 && dealerTotalHandRank > 21)
      ) {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, computerHand) +
          "<br>Player wins!" +
          displayHandTotalValues(playerTotalHandRank, dealerTotalHandRank) +
          winImage;
      }
      // Dealer wins when above two conditions are not met
      else {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, computerHand) +
          "<br>Dealer wins!" +
          displayHandTotalValues(playerTotalHandRank, dealerTotalHandRank) +
          loseImage;
      }
    } else {
      outputMessage =
        "Please input either hit or stand.<br><br>" +
        displayPlayerAndDealerHands(playerHand, computerHand);
    }
  }
  return outputMessage;
};
