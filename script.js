// There will be only two players. One human and one computer (for the Base solution).
// The computer will always be the dealer.
// Each player gets dealt two cards to start.
// The player goes first, and decides if they want to hit (draw a card) or stand (end their turn).
// The dealer has to hit if their hand is below 17.
// Each players' score is the total of their card ranks. Jacks/Queen/Kings are 10. Aces can be 1 or 11. How to let player choose whether Ace is 1 or 11?
// The player who is closer to, but not above 21 wins the hand.

// REQUIRED STATES
// State 1 - Player draws 2 cards. Chooses to Hit or Stand
// State 2 - Player chose to Hit, draw 1 card. Chooses to Hit or Stand. If Hit, draw an extra card
// State 3 - If player draws an Ace, they can choose whether the Ace value is 1 or 11
// State 4 - Player chooses to Stand, compares scores and declares winner.
// State 5 - If Player or Computer exceeds 21, they automatically lose
// Declare Game modes
var DRAW_CARDS = "DRAW_CARDS";
var HIT_OR_STAND = "HIT_OR_STAND";
var ACE_CARD = "ACE_CARD";
var SHOW_RESULTS = "SHOW_RESULTS";

var gameMode = DRAW_CARDS;

// Create arrays to hold player &
var playerHand = [];
var computerHand = [];

var cardDeck = [];

// ============================================================
// ============================================================
// ==================[ MAIN FUNCTION START ]===================
// ============================================================
// ============================================================

var main = function (input) {
  var myOutputValue = "";

  // GAME STARTS FROM DRAWING CARDS
  if (gameMode == DRAW_CARDS) {
    // create a card cardDeck
    cardDeck = createNewDeck();

    // push 2 cards into each array from the deck
    playerHand.push(cardDeck.pop());
    playerHand.push(cardDeck.pop());
    computerHand.push(cardDeck.pop());
    computerHand.push(cardDeck.pop());

    console.log(playerHand);
    console.log(computerHand);

    // check whether either player or computer draws a blackjack
    var playerDrawsBlackJack = checkForBlackJack(playerHand);
    var computerDrawsBlackJack = checkForBlackJack(computerHand);

    // if either player or computer has a blackjack
    if (playerDrawsBlackJack == true || computerDrawsBlackJack == true) {
      // if both player and computer has a blackjack
      if (playerDrawsBlackJack == true && computerDrawsBlackJack == true) {
        myOutputValue = `${displayPlayerCards(
          playerHand
        )} <br><br> ${displayComputerCards(computerHand)}<br>
          <h2>Its a Black Jack Tie!</h2> <br> <i><mark><b>Press Submit to restart the game</b></mark></i>`;
        resetGame();
      }
      // if only player has a blackjack
      else if (
        playerDrawsBlackJack == true &&
        computerDrawsBlackJack == false
      ) {
        myOutputValue = `
          ${displayPlayerCards(playerHand)} <br><br>
          ${displayComputerCards(computerHand)}<br>
          <h2>Player wins by Black Jack!</h2> <br> <i><mark><b>Press Submit to restart the game</b></mark></i>`;
        resetGame();
      }
      // else, if only computer has a blackjack
      else {
        myOutputValue = `
          ${displayPlayerCards(playerHand)} <br><br>
          ${displayComputerCards(computerHand)}<br>
          <h2>Computer wins by Black Jack!</h2> <br> <i><mark><b>Press Submit to restart the game</b></mark></i>`;
        resetGame();
      }
    }

    // If neither player or computer has blackjac, ask player to input 'hit' or 'stand'
    else {
      myOutputValue = `<h4><i>No Blackjacks were drawn.</i></h4> <br> ${displayPlayerCards(
        playerHand
      )} <br> ${displayOneComputerCard(computerHand)} <br>
      <br>  <br><br><i><mark><b>Please input either "hit" or "stand" to continue.</b></mark></i>`;

      // change game mode
      gameMode = HIT_OR_STAND;
    }
    return myOutputValue;
  }

  // GAME MODE BECOMES HIT OR STAND
  if (gameMode == HIT_OR_STAND) {
    // if player inputs "hit"
    if (input == "hit") {
      playerHand.push(cardDeck.pop());
      myOutputValue = `
        ${displayPlayerCards(playerHand)} <br> ${displayOneComputerCard(
        computerHand
      )}
      <br><br><br><i><mark><b>Please input either "hit" or "stand" to continue.</b></mark></i>`;
    }

    // if player inputs "stand"
    else if (input == "stand") {
      var playerHandTotalValue = calculateTotalHandValue(playerHand);
      var computerHandTotalValue = calculateTotalHandValue(computerHand);

      // if computer draws less than 17, computer draws another card
      while (computerHandTotalValue < 17) {
        computerHand.push(cardDeck.pop());
        console.log(computerHand);
        computerHandTotalValue = calculateTotalHandValue(computerHand);
      }

      // if player and computer has the same total value, or if both player and computer exceeds 21
      if (playerHandTotalValue == computerHandTotalValue) {
        myOutputValue = `${displayPlayerCards(playerHand)} 
          <br> ${displayComputerCards(computerHand)}
          <br><h2>It's a Tie!</h2>
          ${displayTotalValue(
            playerHandTotalValue,
            computerHandTotalValue
          )} <br><br>
          <i><mark><b>Press Submit to restart the game.</b></mark></i>`;
      }
      if (playerHandTotalValue > 21 && computerHandTotalValue > 21) {
        myOutputValue = `${displayPlayerCards(playerHand)} 
          <br> ${displayComputerCards(computerHand)}
          <br><h2>As both players have exceeded 21, no one wins!</h2>
          ${displayTotalValue(
            playerHandTotalValue,
            computerHandTotalValue
          )} <br><br>
          <i><mark><b>Press Submit to restart the game.</b></mark></i>`;
      }

      // player wins if:
      // player total value is more than computer total value, and does not exceed 21
      // player total value is less than 21, and computer exceeds 21
      else if (
        (playerHandTotalValue > computerHandTotalValue &&
          playerHandTotalValue <= 21) ||
        (playerHandTotalValue <= 21 && computerHandTotalValue > 21)
      ) {
        myOutputValue = `${displayPlayerCards(playerHand)} 
          <br> ${displayComputerCards(computerHand)}
          <br><h2>You win!</h2>
          ${displayTotalValue(
            playerHandTotalValue,
            computerHandTotalValue
          )} <br><br>
          <i><mark><b>Press Submit to restart the game.</b></mark></i>`;
      }

      // else, computer wins
      else {
        myOutputValue = `${displayPlayerCards(playerHand)} 
          <br> ${displayComputerCards(computerHand)}
          <br><h2>Computer wins!</h2>
          ${displayTotalValue(
            playerHandTotalValue,
            computerHandTotalValue
          )}<br><br>
          <i><mark><b>Press Submit to restart the game.</b></mark></i>`;
      }
      resetGame();
    }

    // if player inputs anything but "hit" or "stand"
    else {
      myOutputValue =
        `<h3><i><b><mark>Please input either "hit" or "stand" to continue.</mark></b></i></h3> <br><br>` +
        displayPlayerCards(playerHand);
    }

    // return output message
    return myOutputValue;
  }
};

// ============================================================
// ============================================================
// ===================[ MAIN FUNCTION END ]====================
// ============================================================
// ============================================================

// create a function that creates a cardDeck of cards
var createDeck = function () {
  // array that stores the cards
  var cardDeck = [];
  var suits = ["◆ Diamonds ◆", "♣ Clubs ♣", "♥ Hearts ♥", "♠️ Spades ♠️"];
  var index = 0;
  while (index < suits.length) {
    var currentSuit = suits[index];
    var indexRanks = 1;

    while (indexRanks <= 13) {
      var cardName = indexRanks;
      // create separate variable to manipulate the rankings
      var cardRanking = indexRanks;
      if (cardName == 1) {
        cardName = "Ace";
      }
      if (cardName == 11) {
        cardName = "Jack";
        cardRanking = 10;
      }
      if (cardName == 12) {
        cardName = "Queen";
        cardRanking = 10;
      }
      if (cardName == 13) {
        cardName = "King";
        cardRanking = 10;
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: cardRanking,
      };
      cardDeck.push(card);
      indexRanks = indexRanks + 1;
    }
    index += 1;
  }
  return cardDeck;
};

// Function that generates a random number, used by shuffle cardDeck function
var getRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
};

// Function that shuffles a cardDeck, used by createNewDeck function
var shuffleDeck = function (cards) {
  var index = 0;
  while (index < cards.length) {
    var randomIndex = getRandomIndex(cards.length);
    var currentItem = cards[index];
    var randomItem = cards[randomIndex];
    cards[index] = randomItem;
    cards[randomIndex] = currentItem;
    index += 1;
  }
  return cards;
};

// Function that creates and shuffles a cardDeck
var createNewDeck = function () {
  var newDeck = createDeck();
  var shuffledDeck = shuffleDeck(newDeck);
  return shuffledDeck;
};

// Create a function that checks if a blackjack is drawn
var checkForBlackJack = function (drawnCardsArray) {
  var playerCardOne = drawnCardsArray[0];
  var playerCardTwo = drawnCardsArray[1];
  var wasBlackJackDrawn = false;
  // blackjack can only be drawn is one card is an ace, and the other is a card with ranking 10
  if (
    (playerCardTwo.name == "ace" && playerCardOne.rank >= 10) ||
    (playerCardOne.name == "ace" && playerCardTwo.rank >= 10)
  ) {
    wasBlackJackDrawn = true;
  }

  return wasBlackJackDrawn;
};

// Function that calculates a hand
var calculateTotalHandValue = function (drawnCardsArray) {
  var totalHandValue = 0;
  // Counter to keep track of the number of aces
  var aceCounter = 0;
  var index = 0;
  while (index < drawnCardsArray.length) {
    var currentCard = drawnCardsArray[index];
    // assign 10 to picture cards
    if (
      currentCard.name == "king" ||
      currentCard.name == "queen" ||
      currentCard.name == "jack"
    ) {
      totalHandValue = totalHandValue + 10;
    }
    // ace will be 11 by default due to the blackjack condition
    else if (currentCard.name == "ace") {
      totalHandValue = totalHandValue + 11;
      aceCounter = aceCounter + 1;
    } else {
      // by default all other cards values are the same
      totalHandValue = totalHandValue + currentCard.rank;
    }
    index += 1;
  }

  // reset index for ace counter
  index = 0;
  while (index < aceCounter) {
    if (totalHandValue > 21) {
      totalHandValue = totalHandValue - 10;
    }
    index += 1;
  }

  return totalHandValue;
};

// Function that displays player cards
var displayPlayerCards = function (playerDrawnCardsArray) {
  var playerMessage = "<h4>You drew:</h4>";
  var index = 0;
  while (index < playerDrawnCardsArray.length) {
    playerMessage = `${playerMessage} 🂠 ${playerDrawnCardsArray[index].name} of ${playerDrawnCardsArray[index].suit} <br>`;
    index += 1;
  }
  return playerMessage;
};

// Function that displays 1 computer card
var displayOneComputerCard = function (computerDrawnCardsArray) {
  var computerMessage = "<h4>The computer drew:</h4>";
  computerMessage = `<b>${computerMessage}</b> 🂠
    ${computerDrawnCardsArray[0].name} of ${computerDrawnCardsArray[0].suit} <br>
    🂠 ⍰ of ⍰`;
  return computerMessage;
};

// Function that displays all computer cards
var displayComputerCards = function (computerDrawnCardsArray) {
  index = 0;
  var computerMessage = "<h4><b>The computer drew:</b></h4>";
  while (index < computerDrawnCardsArray.length) {
    computerMessage = `${computerMessage}
      🂠 ${computerDrawnCardsArray[index].name} of 
      ${computerDrawnCardsArray[index].suit} <br>`;
    index += 1;
  }

  return computerMessage;
};

// function that displays both player and computer values
var displayTotalValue = function (playerTotalValue, computerTotalValue) {
  var totalValueDisplay = `<br><b>Player total hand value:
    ${playerTotalValue}
    <br>
    Computer total hand value:
    ${computerTotalValue}</b>`;
  return totalValueDisplay;
};

// function to reset the game
var resetGame = function () {
  // reset to first mode
  gameMode = DRAW_CARDS;
  // clear all arrays
  playerHand = [];
  computerHand = [];
  cardDeck = [];
};
