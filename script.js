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
var loseImage = `<img src="https://c.tenor.com/MydQJj-l-u0AAAAC/matthewmole-back-to-you.gif"/>`;
var tieImage = `<img src="https://media.giphy.com/media/3orifeagG1UwX4DeO4/giphy.gif"/>`;
var dealerBlackjack = `<img src="https://media.giphy.com/media/l2SpMVOjXhleZzggE/giphy.gif"/>`;
var playerWinBlackJack = `<img src = "https://media.giphy.com/media/l1IXY77djUsHH6S8o/giphy.gif">`;
var placeBet = `<img src = "http://images2.fanpop.com/image/photos/9300000/Gambling-futurama-9351565-320-240.gif">`;
var totalPlayerBet = 100;
var dealerBet = 100;
var betPlaced = 0;
var betPlacedDealer = 0;

/* ================================================== */
/* =========== DECK CREATION FUNCTIONS ============== */
/* ================================================== */

var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var emoji = ["❤️", "🔶", "♣️", "♠️"];

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
        cardName = "🂡";
      } else if (cardName == 11) {
        cardName = "🃏";
      } else if (cardName == 12) {
        cardName = "👸";
      } else if (cardName == 13) {
        cardName = "👑";
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
var displayPlayerAndDealerHands = function (
  playerHandArray,
  dealerHandArray,
  number
) {
  var playerMessage = "Player hand:<br>";
  var index = 0;
  if (number == 1) {
    while (index < playerHandArray.length) {
      playerMessage =
        playerMessage +
        "- " +
        playerHandArray[index].name +
        " of " +
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
        dealerHandArray[index].emoji +
        "<br>";
      index = index + 1;
    }
  } else if (number == 2) {
    while (index < playerHandArray.length) {
      playerMessage =
        playerMessage +
        "- " +
        playerHandArray[index].name +
        " of " +
        playerHandArray[index].emoji +
        "<br>";

      index = index + 1;
    }

    index = 0;
    var dealerMessage = "One of Dealer hand is:<br>";
    dealerMessage =
      dealerMessage +
      "- " +
      dealerHandArray[index].name +
      " of " +
      dealerHandArray[index].emoji +
      "<br>";
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
      playerDeckRank.name == "🃏" ||
      playerDeckRank.name == "👸" ||
      playerDeckRank.name == "👑"
    ) {
      totalPlayerRank += 10;
      console.log(totalPlayerRank);
    } else if (playerDeckRank.name == "🂡") {
      totalPlayerRank += 11;
      aceCounter += 1;

      if (
        playerDeckRank.name == "🃏" ||
        playerDeckRank.name == "👸" ||
        playerDeckRank.name == "👑"
      ) {
        totalPlayerRank = totalPlayerRank - aceCounter * 10;
        //if there is more than 1 ace, other aces will remain as one
      } else if (aceCounter > 1) {
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
      dealerDeckRank.name == "🃏" ||
      dealerDeckRank.name == "👸" ||
      dealerDeckRank.name == "👑"
    ) {
      totalComputerRank += 10;
    } else if (dealerDeckRank.name == "🂡") {
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

    // update gameMode and score
    if (totalPlayerBet <= 0 || dealerBet <= 0) {
      if (totalPlayerBet > 0 && dealerBet <= 0) {
        outputMessage =
          "You won all of the rounds! Please click refresh to play a new game";
      } else if (totalPlayerBet <= 0 && dealerBet > 0) {
        outputMessage = "Dealer wins! Please click refresh to play a new game";
      }
    } else {
      currentGameMode = cardsDrawn;
      // reassign output message
      outputMessage = `Everyone has been dealt a card. </br></br> Place your bet amount and click the submit button to calculate cards! </br></br> Your bet amount is ${totalPlayerBet} ${placeBet}`;
    }
    // return message
    return outputMessage;
  }

  // SECOND MODE
  if (currentGameMode == cardsDrawn) {
    betPlaced = Number(input);
    betPlacedDealer = Number(input);
    console.log(betPlaced);
    //ask for betting amount
    if (totalPlayerBet - betPlaced >= 0) {
      console.log(totalPlayerBet);
      console.log(dealerBet);
      // check for blackjack
      var playerHasBlackJack = checkForBlackJack(playerHand);
      var dealerHasBlackJack = checkForBlackJack(computerHand);

      // Condition when either player or dealer has black jack
      if (playerHasBlackJack == true || dealerHasBlackJack == true) {
        // Condition where both have black jack
        if (playerHasBlackJack == true && dealerHasBlackJack == true) {
          outputMessage =
            displayPlayerAndDealerHands(playerHand, computerHand, 2) +
            "<br>Its a Black Jack Tie!";
          currentGameMode = "end game";
        }
        // Condition when only player has black jack
        else if (playerHasBlackJack == true && dealerHasBlackJack == false) {
          outputMessage =
            displayPlayerAndDealerHands(playerHand, computerHand, 2) +
            "<br>Player wins by Black Jack!" +
            playerWinBlackJack;
          totalPlayerBet = totalPlayerBet + betPlaced;
          dealerBet = Number(dealerBet - betPlacedDealer);
          currentGameMode = "end game";
        }
        // Condition when only dealer has black jack
        else {
          outputMessage =
            displayPlayerAndDealerHands(playerHand, computerHand, 1) +
            "<br>Dealer wins by Black Jack!" +
            dealerBlackjack;
          totalPlayerBet = totalPlayerBet - betPlaced;
          dealerBet = Number(dealerBet + betPlacedDealer);
          currentGameMode = "end game";
        }
      }
      // Condition where neither player nor dealer has black jack
      // ask player to input 'hit' or 'stand'
      else {
        console.log(rankComputer(computerHand));
        console.log(rankPlayer(playerHand));
        outputMessage =
          displayPlayerAndDealerHands(playerHand, computerHand, 2) +
          '<br> There are no Black Jacks. <br>Please input "hit" or "stand".';

        // update gameMode
        currentGameMode = gameHitOrStand;
      }
    } else {
      outputMessage = "Please input a lower amount";
      console.log(totalPlayerBet);
      console.log(dealerBet);
    }
    // return message
    return outputMessage;
  }

  //(Hit or stand mode)
  //Player hit
  if (currentGameMode == gameHitOrStand) {
    if (input == "hit") {
      var playerTotalHandRank = rankPlayer(playerHand);
      //check to see if the total is more than 21
      if (playerTotalHandRank > 21) {
        outputMessage = "You have busted! Press submit to restart the game";
        totalPlayerBet = totalPlayerBet - betPlaced;
        dealerBet = Number(dealerBet + betPlacedDealer);
        console.log(totalPlayerBet);
        console.log(dealerBet);
        currentGameMode = "end game";
      } else {
        playerHand.push(drawCardPlayer());
        console.log(drawCardPlayer());
        playerTotalHandRank = rankPlayer(playerHand);
        //check to see if total is more than 21
        if (playerTotalHandRank > 21) {
          outputMessage = "You have busted! Press submit to restart the game";
          totalPlayerBet = totalPlayerBet - betPlaced;
          dealerBet = Number(dealerBet + betPlacedDealer);
          console.log(totalPlayerBet);
          console.log(dealerBet);
          currentGameMode = "end game";
        } else {
          outputMessage =
            displayPlayerAndDealerHands(playerHand, computerHand, 2) +
            '<br>Please input "hit" or "stand".';
        }
      }
    }
    //Player stand
    else if (input == "stand") {
      //caculate rank
      playerTotalHandRank = rankPlayer(playerHand);
      var dealerTotalHandRank = rankComputer(computerHand);
      currentGameMode = "stand";

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
          displayPlayerAndDealerHands(playerHand, computerHand, 1) +
          "<br>Its a Tie!" +
          displayHandTotalValues(playerTotalHandRank, dealerTotalHandRank) +
          tieImage +
          "</br> Please press the submit button to play again";
        currentGameMode = "end game";
      }
      // Conditions for player win
      else if (
        (playerTotalHandRank > dealerTotalHandRank &&
          playerTotalHandRank <= 21) ||
        (playerTotalHandRank <= 21 && dealerTotalHandRank > 21)
      ) {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, computerHand, 1) +
          "<br>Player wins!" +
          displayHandTotalValues(playerTotalHandRank, dealerTotalHandRank) +
          winImage +
          "</br> Please press the submit button to play again";
        totalPlayerBet = totalPlayerBet + betPlaced;
        dealerBet = Number(dealerBet - betPlacedDealer);
        currentGameMode = "end game";
      }
      // Dealer wins when above two conditions are not met
      else {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, computerHand, 1) +
          "<br>Dealer wins!" +
          displayHandTotalValues(playerTotalHandRank, dealerTotalHandRank) +
          loseImage +
          "</br> Please press the submit button to play again";
        totalPlayerBet = totalPlayerBet - betPlaced;
        dealerBet = Number(dealerBet + betPlacedDealer);
        currentGameMode = "end game";
      }
    } else {
      outputMessage =
        "Please input either hit or stand.<br><br>" +
        displayPlayerAndDealerHands(playerHand, computerHand, 2);
    }
  } //The game restarts
  else if (currentGameMode == "end game") {
    currentGameMode = "start game";
    playerHand = [];
    computerHand = [];
    outputMessage = "Please click submit to start the game";
  }
  return outputMessage;
};
