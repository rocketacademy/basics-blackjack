// Blackjack (Base)

/* ========================================================================== */
// Conditions for Blackjack:
// 1. 2 Players in total: Player and Dealer
// 2. Create and shuffle game deck for game
// 3. 2 cards will be given to the player and dealer for each game.
// 4. Check for blackjack during the 1st round of the game, if not blackjack then the game will continue onwards
// 5. The player goes first, and decides if they want to hit (draw a card) or stand (end their turn).
// 6. The dealer has to hit if their hand is below 17.
// 7. Each players' score is the total of their card ranks. Jacks/Queen/Kings are 10. Aces can be 1 or 11.
// 8. Win Condition is give when
//     -- draws a blackjack
//     -- higher value among the 2 players
// 9. Tie Condition is when both player have the same value
// 10. both player and dealer will be shown to determine the winner
/* ========================================================================== */

// Determine the player and dealer in each game and store the cards
var playerHand = [];
var dealerHand = [];

// To store the deck of cards
var gameDeck = [];

// Declaring the game modes at the start of game
var gameStart = "game start";
var gameDrawCards = "draw cards";
var gameHitOrStand = "hit or stand";
var gameReset = "reset game";
var currGameMode = gameStart;

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Helper function to shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex = currentIndex + 1;
  }
  return cardDeck;
};

// Helper function that create a deck of 52 cards
var makeDeck = function () {
  var cardDeck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }

      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};

// Creating a new function and deck to shuffle the cards
var createNewDeck = function () {
  var newDeck = makeDeck();
  var shuffledDeck = shuffleCards(newDeck);
  return shuffledDeck;
};

// Checking for whether there is blackjack for either the player or dealer
var checkForBlackjack = function (handArray) {
  var playerFirstCard = handArray[0];
  var playerSecondCard = handArray[1];
  var isBlackjack = false;
  // to get blackjack combination: 1. 1st card Ace, 2nd card 10 or any picture card || 2. 1st card 10 or any picture card, 2nd card must be ace
  if (
    (playerFirstCard.name == "ace" && playerSecondCard.rank >= 10) ||
    (playerFirstCard.rank >= 10 && playerSecondCard.name == "ace")
  ) {
    isBlackjack = true;
  }
  return isBlackjack;
};

var calculateHandValue = function (handArray) {
  var totalHandValue = 0;
  var aceCounter = 0;
  var index = 0;
  while (index < handArray.length) {
    var currentCard = handArray[index];
    if (
      currentCard.name == "jack" ||
      currentCard.name == "queen" ||
      currentCard.name == "king"
    ) {
      totalHandValue = totalHandValue + 10;
    } else if (currentCard.name == "ace") {
      totalHandValue = totalHandValue + 11;
      aceCounter = aceCounter + 1;
    } else {
      totalHandValue = totalHandValue + currentCard.rank;
    }
    index = index + 1;
  }
  index = 0;
  while (index < aceCounter) {
    if (totalHandValue > 21) {
      totalHandValue = totalHandValue - 10;
    }
    index = index + 1;
  }
  return totalHandValue;
};

// Helper function to show the player and dealers cards
var showPlayerAndDealerCards = function (playerHandArray, dealerHandArray) {
  var playerMessage = `👩🏻‍💼 Player Hand: <br>`;
  var index = 0;
  while (index < playerHandArray.length) {
    playerMessage = `${playerMessage}: ${playerHandArray[index].name} of ${playerHandArray[index].suit} <br>`;
    index = index + 1;
  }
  index = 0;
  var dealerMessage = "💻 Dealer Hand: <br>";
  while (index < dealerHandArray.length) {
    dealerMessage = `${dealerMessage} : ${dealerHandArray[index].name} of ${dealerHandArray[index].suit} <br>`;
    index = index + 1;
  }
  return `${playerMessage} <br> ${dealerMessage}`;
};

var showHandValue = function (playerHandValue, dealerHandValue) {
  var handValueMessage = `<br> Player hand value: ${playerHandValue} <br> Dealer hand value: ${dealerHandValue}`;
  return handValueMessage;
};

// Restart game helper function where it reset the whole game.
var restartGame = function () {
  currGameMode = gameStart;
  playerHand = [];
  dealerHand = [];
  gameDeck = [];
};

var main = function (input) {
  var myOutputValue = "";
  //start the game by dealing the cards to the player and dealer
  if (currGameMode == gameStart) {
    gameDeck = createNewDeck();
    console.log("gameDeck", gameDeck);

    // 2 cards are given to player and dealer and store it in the array
    playerHand.push(gameDeck.pop());
    playerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());

    console.log("player hand", playerHand);
    console.log("dealer hand", dealerHand);

    //Changing game mode to the draw cards
    currGameMode = gameDrawCards;
    myOutputValue = `Everyone has been deal with 2 cards each! 🃏 <br> Click submit to view the cards for both players 🔑`;

    return myOutputValue;
  }
  // player will click on submit to continue the game
  if (currGameMode == gameDrawCards) {
    // continue the game and check whether any players has blackjack before the game is continue. scenarios || 1. player and dealer playjack -> tie || 2. player blackjack -> player wins || 3. dealer blackjack -> dealer wins || 4. If no blackjack -> the game continues
    var playerHasBlackjack = checkForBlackjack(playerHand);
    var dealerHasBlackjack = checkForBlackjack(dealerHand);

    console.log("player blackjack", playerHasBlackjack);
    console.log("dealer blackjack", dealerHasBlackjack);

    // Check for blackjack at the initial draw, continue and change game mode if there is no blackjack at the initial round
    if (playerHasBlackjack == true || dealerHasBlackjack == true) {
      if (playerHasBlackjack == true && dealerHasBlackjack == true) {
        myOutputValue = `${showPlayerAndDealerCards(
          playerHand,
          dealerHand
        )} <br> This is a tie as both of player and dealer has blackjack <br> <br> Click on submit to restart the game.`;
        currGameMode = gameReset;
      }
      if (playerHasBlackjack == true && dealerHasBlackjack == false) {
        myOutputValue = `${showPlayerAndDealerCards(
          playerHand,
          dealerHand
        )} <br> Player wins as player draws a blackjack! <br> <br> Click on submit to restart the game.`;
        currGameMode = gameReset;
      }
      if (playerHasBlackjack == false && dealerHasBlackjack == true) {
        myOutputValue = `${showPlayerAndDealerCards(
          playerHand,
          dealerHand
        )} <br> Dealer wins as dealer draws a blackjack! <br> <br> Click on submit to restart the game.`;
        currGameMode = gameReset;
      }
    }

    // If there is no blackjack for both players then the game will continue and display the below, player can either draw more cards or continue on with the game without drawing any cards
    if (playerHasBlackjack == false && dealerHasBlackjack == false) {
      myOutputValue = `${showPlayerAndDealerCards(
        playerHand,
        dealerHand
      )} <br> There are no Black Jacks. <br> Please input "hit" or "stand" to continue the game.`;

      // update gameMode
      currGameMode = gameHitOrStand;
    }
    console.log("currGameMode", currGameMode);
    return myOutputValue;
  }

  //There will be a change in game mode to hit or stand
  if (currGameMode == gameHitOrStand) {
    console.log("Choose Hit");
    // if player input 'hit' then the game will run the code to draw another deck and store in the array
    if (input == "hit") {
      playerHand.push(gameDeck.pop());
      console.log("Player hands", playerHand);
      myOutputValue = `${showPlayerAndDealerCards(
        playerHand,
        dealerHand
      )} <br> You drew another card. <br> Please input "hit" or "stand" to continue the game.`;
    }
    console.log("Choose Stand", myOutputValue);

    // if player input 'stand' then the game will run this code to continue the game and calculate the winner
    if (input == "stand") {
      var playerHandTotalValue = calculateHandValue(playerHand);
      var dealerHandTotalValue = calculateHandValue(dealerHand);

      while (dealerHandTotalValue < 17) {
        dealerHand.push(gameDeck.pop());
        dealerHandTotalValue = calculateHandValue(dealerHand);
      }

      if (
        playerHandTotalValue == dealerHandTotalValue ||
        (playerHandTotalValue > 21 && dealerHandTotalValue > 21)
      ) {
        myOutputValue = `${showPlayerAndDealerCards(
          playerHand,
          dealerHand
        )} <br> Its a Tie! 👏🏻 <br> ${showHandValue(
          playerHandTotalValue,
          dealerHandTotalValue
        )} <br> <br> Click on submit to restart the game.`;
        currGameMode = gameReset;
      } else if (
        (playerHandTotalValue > dealerHandTotalValue &&
          playerHandTotalValue <= 21) ||
        (playerHandTotalValue <= 21 && dealerHandTotalValue > 21)
      ) {
        myOutputValue = `${showPlayerAndDealerCards(
          playerHand,
          dealerHand
        )} <br> Player wins! 🎉  <br> ${showHandValue(
          playerHandTotalValue,
          dealerHandTotalValue
        )} <br> <br> Click on submit to restart the game.`;
        currGameMode = gameReset;
      }

      // Dealer wins when above two conditions are not met
      else {
        myOutputValue = `${showPlayerAndDealerCards(
          playerHand,
          dealerHand
        )} <br> Dealer wins! 😢 <br> ${showHandValue(
          playerHandTotalValue,
          dealerHandTotalValue
        )} <br> <br> Click on submit to restart the game.`;
        currGameMode = gameReset;
      }
      console.log(currGameMode);
    }
    if (input != "hit" && input != "stand") {
      myOutputValue = `Wrong input! <br><br>  Please input either 'hit' or 'stand' to continue the game<br> <br> 
      ${showPlayerAndDealerCards(playerHand, dealerHand)} `;
      console.log("input not hit or stand");
    }
    return myOutputValue;
  }
  // This code will run when the game mode is game reset
  if (currGameMode == gameReset) {
    if (input == "") {
      restartGame();
      console.log("check game mode", currGameMode);
      myOutputValue = `You have start a new game! Click on submit to continue playing a new round! 🔜 `;
      console.log(
        "check if array is reset for both players",
        playerHand,
        dealerHand
      );
    }
    return myOutputValue;
  }
};
