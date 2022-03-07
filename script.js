// Blackjack Base Game Walkthrough
// 1. Playable game with minimum functions: creating deck, shuffling, dealing cards, evaluating winner
// 2. Ability for the player to hit or stand
// 3. Ability for the dealer to hit or stand
// Variable value of Ace - either '1' or '11'

// ===== ===== Pseudocode for Version 1 ===== ===== //
// 1. Define player and dealer
// 2. Create and shuffle a game deck
// 3. Draw 2 cards for player and dealer respectively
// 4. Win conditions
//      -- blackjack
//      -- higher hand value
// 5. Display hands of both player and dealer and declare winner

// ===== ===== Pseudocode for Version 2 ===== ===== //
// 1. Extra game mode -> "hit or stand"
// 2. Functionality for user to input hit or stand

// ===== ===== Pseudocode for Version 3 ===== ===== //
// 1. Dealer to hit or stand ONLY AFTER player choose to stand
// 2. If dealer hand value is less than 17, dealer hits
// 3. If dealer hand value is more than 17, dealer stands

// ===== ===== Pseudocode for Version 4 ===== ===== //
// If totalHandValue, including an ace, is less than 21, ace value is 11
// When totalHandValue, including an ace, is more than 21, ace value is reduced to 1

// ===== ===== Pseudocode for Version 5 ===== ===== //
// Added buttons for player
// Added global image variables for various stages of the game
// Score board to keep track of the points and rounds played

// Disable hit, stand and show buttons before game starts
document.querySelector("#hit-button").disabled = true;
document.querySelector("#stand-button").disabled = true;
document.querySelector("#show-button").disabled = true;

/*=====================================*/
/*======= GLOBAL VARIABLES ============*/
/*=====================================*/

// Declare game modes
var GAME_START = "game start";
var GAME_CARDS_DRAWN = "cards drawn";
var GAME_HIT_OR_STAND = "hit or stand";
var GAME_PLAYER_HIT = "player choose hit";
var GAME_PLAYER_STAND = "player choose stand";
var GAME_DEALER_SHOW = "show dealer hand";
var GAME_RESULTS_SHOWN = "results shown";
var currentGameMode = GAME_START;

// Declare variables to store player and dealer hands
// Use arrays as each hand will be holding multiple card objects
var playerHand = [];
var dealerHand = [];

// Declare variables to hold deck of cards
var gameDeck = [];

// Declare variables to keep track of scores and rounds played
var playerWin = 0;
var playerBlackjackWin = 0;
var dealerWin = 0;
var dealerBlackjackWin = 0;
var gameRoundTie = 0;
var gameRoundBlackjackTie = 0;
var roundsPlayed = 0;

// Declare image variables for various stages of the game
var cardsDealtImage =
  '<img src="https://tenor.com/view/monster-club-trading-card-game-monster-card-game-card-game-yugiohtcg-gif-22971405.gif"/ class = "center">';
var playerHitImage =
  '<img src="https://tenor.com/view/goiocina16-gif-24944037.gif"/ class = "center">';
var playerStandImage =
  '<img src="https://tenor.com/view/poker-face-poker-partypoker-gif-14470006.gif"/ class = "center">';
var gameTieImage =
  '<img src="https://tenor.com/view/snoopy-pokerdog-dogdealer-cards-game-gif-9473795.gif"/ class = "center">';
var playerWinImage =
  '<img src="https://tenor.com/view/fresh-off-the-boat-deal-with-it-poker-winning-grandmother-gif-4010717.gif"/ class = "center">';
var playerExceed21Image =
  '<img src="https://tenor.com/view/angry-gaming-flip-table-board-game-gif-4570388.gif"/ class = "center">';
var dealerWinImage =
  '<img src="https://tenor.com/view/snoopy-poker-gamble-flush-full-house-gif-12184039.gif"/ class = "center">';

/*=====================================*/
/*====== DECK CREATION FUNCTIONS ======*/
/*=====================================*/

// Create card deck generation function with loops
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck; loop over this array
  var suits = ["hearts ♥️", "diamonds ♦️", "clubs ♣️", "spades ♠️"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // rankCounter starts at 1 and not 0, and ends at 13 and not 12
    // This is an example of a loop without an array
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;

      // Set respective cardName according to rank, example if rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace 🅰";
      } else if (cardName == 2) {
        cardName = "two 2️⃣";
      } else if (cardName == 3) {
        cardName = "three 3️⃣";
      } else if (cardName == 4) {
        cardName = "four 4️⃣";
      } else if (cardName == 5) {
        cardName = "five 5️⃣";
      } else if (cardName == 6) {
        cardName = "six 6️⃣";
      } else if (cardName == 7) {
        cardName = "seven 7️⃣";
      } else if (cardName == 8) {
        cardName = "eight 8️⃣";
      } else if (cardName == 9) {
        cardName = "nine 9️⃣";
      } else if (cardName == 10) {
        cardName = "ten 🔟";
      } else if (cardName == 11) {
        cardName = "jack 👨🏻‍🦰";
      } else if (cardName == 12) {
        cardName = "queen 👸🏻";
      } else if (cardName == 13) {
        cardName = "king 🤴🏻";
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
      rankCounter++;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex++;
  }

  // Return the completed card deck
  return cardDeck;
};

// Initialise the card deck representation as an array of objects
var deck = makeDeck();

// Get a random index ranging from 0 (inclusive) to max (exclusive)
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
    //Increment currentIndex
    currentIndex++;
  }
  // Return the shuffled deck
  return cardDeck;
};

// Function that create and shuffles a deck
var createNewDeck = function () {
  var newDeck = makeDeck();
  shuffledDeck = shuffleCards(newDeck);
  return shuffledDeck;
};

/*=====================================*/
/*========= GAME FUNCTIONS ============*/
/*=====================================*/

// Function to start game: deal 2 cards to player and dealer
var startGame = function () {
  playerHand.push(gameDeck.pop());
  playerHand.push(gameDeck.pop());
  dealerHand.push(gameDeck.pop());
  dealerHand.push(gameDeck.pop());

  console.log("Player hand ==> ");
  console.log(playerHand);
  console.log("Dealer hand ==> ");
  console.log(dealerHand);

  document.querySelector("#play-button").disabled = false;
  document.querySelector("#hit-button").disabled = true;
  document.querySelector("#stand-button").disabled = true;
};

// Functions that checks a hand for blackjack
var checkForBlackjack = function (handArray) {
  // Check player hand
  var playerCardOne = handArray[0];
  var playerCardTwo = handArray[1];
  var isBlackjack = false;
  // If there is a blackjack, return true
  if (
    (playerCardOne.name == "ace 🅰" && playerCardTwo.rank >= 10) ||
    (playerCardOne.rank >= 10 && playerCardTwo.name == "ace 🅰")
  ) {
    isBlackjack = true;
  }

  // else return false - don't need statement because variable is already set to false
  return isBlackjack;
};

// Function that calculates a hand
var calculateTotalHandValue = function (handArray) {
  var totalHandValue = 0;
  // Counter to keep track of the number of aces found within the given hand
  var aceCounter = 0;

  // Loop through player or dealer hand and add up the values
  var index = 0;
  while (index < handArray.length) {
    var currentCard = handArray[index];

    // For jack, queen, king, value is 10 by default
    if (
      currentCard.name == "jack 👨🏻‍🦰" ||
      currentCard.name == "queen 👸🏻" ||
      currentCard.name == "king 🤴🏻"
    ) {
      totalHandValue = totalHandValue + 10;
    }
    // For ace, value is 11 by default
    else if (currentCard.name == "ace 🅰") {
      totalHandValue = totalHandValue + 11;
      aceCounter++;
    }
    // Else, all other numbered cards are valued by their ranks
    else {
      totalHandValue = totalHandValue + currentCard.rank;
    }
    index++;
  }

  // Reset index for ace counter
  index = 0;
  while (index < aceCounter) {
    if (totalHandValue > 21) {
      totalHandValue = totalHandValue - 10;
    }
    index++;
  }

  return totalHandValue;
};

// Function that displays the player and dealer hands in a message
var displayPlayerAndDealerHands = function (playerHandArray, dealerHandArray) {
  // Player hand
  var playerMessage = "<b>Player Hand</b>:<br>";
  var index = 0;
  while (index < playerHandArray.length) {
    playerMessage =
      playerMessage +
      "- " +
      playerHandArray[index].name +
      " of " +
      playerHandArray[index].suit +
      "<br>";
    index++;
  }

  // Dealer hand
  index = 0;
  var dealerMessage = "<b>Dealer Hand</b>:<br>";
  while (index < dealerHandArray.length) {
    dealerMessage =
      dealerMessage +
      "- " +
      dealerHandArray[index].name +
      " of " +
      dealerHandArray[index].suit +
      "<br>";
    index++;
  }

  return playerMessage + "<br>" + dealerMessage;
};

// Function that displays the total hand values of the player and the dealer in a message
var displayHandTotalValues = function (playerHandValue, dealerHandValue) {
  var totalHandValueMessage =
    "<br> Player total hand value: " +
    playerHandValue +
    "<br>Dealer total hand value: " +
    dealerHandValue;
  return totalHandValueMessage;
};

// Functions when Player click "Hit" button
var playerHit = function (playerHand) {
  // Progress the gameMode from GAME_HIT_OR_STAND
  currentGameMode = GAME_PLAYER_HIT;
  // deal player with another card
  playerHand.push(gameDeck.pop());
};

// Functions when Player click "Stand" button
var playerStand = function () {
  // Progress the gameMode from GAME_PLAYER_HIT
  currentGameMode = GAME_PLAYER_STAND;
  // Coordinate the correct buttons to progress game further
  document.querySelector("#hit-button").disabled = true;
  document.querySelector("#stand-button").disabled = true;
  document.querySelector("#show-button").disabled = false;
};

// Fuctions when Player click "Show" button
var showDealerHand = function () {
  currentGameMode = GAME_DEALER_SHOW;
};

// Function to reset the game
var resetGame = function () {
  // Coordinate the correct buttons to progress game further
  document.querySelector("#play-button").disabled = false;
  document.querySelector("#hit-button").disabled = true;
  document.querySelector("#stand-button").disabled = true;
  document.querySelector("#show-button").disabled = true;

  playerHand = [];
  dealerHand = [];

  // Create the game deck
  gameDeck = createNewDeck();
  console.log(gameDeck);
  currentGameMode = GAME_START;
};

/*=====================================*/
/*========= MAIN FUNCTIONS ============*/
/*=====================================*/

var main = function () {
  var outputMessage = "";

  // FIRST CLICK
  if (currentGameMode == GAME_START) {
    // Create the game deck
    gameDeck = createNewDeck();
    console.log(gameDeck);
    // Deal 2 cards to player and dealer respectively
    startGame();

    // Progress the gameMode
    currentGameMode = GAME_CARDS_DRAWN;

    // Write and return the appropriate output message
    outputMessage = `Everyone has been dealt their respective cards!
    <br><br> Click the <b>"Play"</b> button again to evaluate the cards!
    <br><br>${cardsDealtImage}`;

    // return appropriate message
    return outputMessage;
  }

  // SECOND CLICK
  if (currentGameMode == GAME_CARDS_DRAWN) {
    // Check for blackjack
    var playerHasBlackjack = checkForBlackjack(playerHand);
    var dealerHasBlackjack = checkForBlackjack(dealerHand);

    console.log("Does Player have Blackjack? ==>", playerHasBlackjack);
    console.log("Does Dealer have Blackjack? ==>", dealerHasBlackjack);

    // Condition when either player or dealer has black jack

    // Both player and dealer has blackjack -> tie
    if (playerHasBlackjack == true && dealerHasBlackjack == true) {
      gameRoundBlackjackTie++;
      roundsPlayed++;
      outputMessage = `${displayPlayerAndDealerHands(playerHand, dealerHand)}
    <br><b>It is a blackjack tie!</b>
    <br><br>${gameTieImage}
    <br><b>Score</b>:<br> Player win by total hand value: ${playerWin} | Player win by Blackjack: ${playerBlackjackWin} | <br><br> Dealer win by total hand value: ${dealerWin} | Dealer win by Blackjack: ${dealerBlackjackWin} | <br><br> Tie by hand value: ${gameRoundTie} | Tie by Blackjack: ${gameRoundBlackjackTie}
    <br><br> Round(s) played: ${roundsPlayed}
    <br><br> Click the <b>"Play"</b> button to play again!!`;
      // Restart Game
      resetGame();
      // return appropriate message
      return outputMessage;
    }

    // Only player has blackjack -> player wins
    if (playerHasBlackjack == true && dealerHasBlackjack == false) {
      playerBlackjackWin++;
      roundsPlayed++;
      outputMessage = `${displayPlayerAndDealerHands(playerHand, dealerHand)}
    <br><b>Player wins by blackjack!</b>
    <br><br>${playerWinImage}
    <br><b>Score</b>:<br> Player win by total hand value: ${playerWin} | Player win by Blackjack: ${playerBlackjackWin} | <br><br> Dealer win by total hand value: ${dealerWin} | Dealer win by Blackjack: ${dealerBlackjackWin} | <br><br> Tie by hand value: ${gameRoundTie} | Tie by Blackjack: ${gameRoundBlackjackTie}
    <br><br> Round(s) played: ${roundsPlayed}
    <br><br> Click the <b>"Play"</b> button to play again!!`;
      // Restart Game
      resetGame();
      // return appropriate message
      return outputMessage;
    }

    // Only dealer has blackjack -> dealer wins
    if (playerHasBlackjack == false && dealerHasBlackjack == true) {
      dealerBlackjackWin++;
      roundsPlayed++;
      outputMessage = `${displayPlayerAndDealerHands(playerHand, dealerHand)}
    <br><b>Dealer wins by blackjack!</b>
    <br><br>${dealerWinImage}
    <br><b>Score</b>:<br> Player win by total hand value: ${playerWin} | Player win by Blackjack: ${playerBlackjackWin} | <br><br> Dealer win by total hand value: ${dealerWin} | Dealer win by Blackjack: ${dealerBlackjackWin} | <br><br> Tie by hand value: ${gameRoundTie} | Tie by Blackjack: ${gameRoundBlackjackTie}
    <br><br> Round(s) played: ${roundsPlayed}
    <br><br> Click the <b>"Play"</b> button to play again!!`;
      // Restart Game
      resetGame();
      // return appropriate message
      return outputMessage;
    }

    // No blackjack -> game continues
    // Change game mode
    currentGameMode = GAME_HIT_OR_STAND;
    // Coordinate the correct buttons to progress game further
    document.querySelector("#play-button").disabled = true;
    document.querySelector("#hit-button").disabled = false;
    document.querySelector("#stand-button").disabled = false;
    document.querySelector("#show-button").disabled = true;

    outputMessage =
      displayPlayerAndDealerHands(playerHand, dealerHand) +
      '<br> There are no Black Jacks. <br>Please click <b>"Hit"</b> button to hit or <b>"Stand"</b> button to stand.';

    // return appropriate message
    return outputMessage;
  }

  //if ((currentGameMode = GAME_HIT_OR_STAND)) {
  // Player Hit
  if (currentGameMode == GAME_PLAYER_HIT) {
    // Calculate the total hand value of both player and dealer
    var playerHandTotalValue = calculateTotalHandValue(playerHand);
    var dealerHandTotalValue = calculateTotalHandValue(dealerHand);

    outputMessage = `${displayPlayerAndDealerHands(playerHand, dealerHand)}
      <br> You drew another card. <br> Please click the <b>"Hit"</b> button to hit or <b>"Stand"</b> to stand.
      <br><br> ${playerHitImage}`;

    // Player hand value exceed 21, dealer automatic wins
    if (playerHandTotalValue > 21) {
      dealerWin++;
      roundsPlayed++;
      outputMessage = `${displayPlayerAndDealerHands(playerHand, dealerHand)}
        <br><b>Sorry, player hand value exceed 21. Dealer wins!</b>
        ${displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue)}
        <br><br>${playerExceed21Image}
        <br><b>Score</b>:<br> Player win by total hand value: ${playerWin} | Player win by Blackjack: ${playerBlackjackWin} | <br><br> Dealer win by total hand value: ${dealerWin} | Dealer win by Blackjack: ${dealerBlackjackWin} | <br><br> Tie by hand value: ${gameRoundTie} | Tie by Blackjack: ${gameRoundBlackjackTie}
        <br><br> Round(s) played: ${roundsPlayed}
        <br><br> Click the <b>"Play"</b> button to play again!!`;
      // Restart Game
      resetGame();
    }
    // return appropriate message
    return outputMessage;
  }

  // Player Stand
  if (currentGameMode == GAME_PLAYER_STAND) {
    outputMessage = `${displayPlayerAndDealerHands(playerHand, dealerHand)}
      <br> You chose to stand. <br> Please click the <b>"Show"</b> button to proceed.
      <br><br>${playerStandImage}`;
    // Calculate the total hand value of both player and dealer
    var playerHandTotalValue = calculateTotalHandValue(playerHand);
    var dealerHandTotalValue = calculateTotalHandValue(dealerHand);

    // Dealer's hit or stand logic
    while (dealerHandTotalValue < 17) {
      dealerHand.push(gameDeck.pop());
      dealerHandTotalValue = calculateTotalHandValue(dealerHand);
    }
    // return appropriate message
    return outputMessage;
  }

  // Compare total hand value
  if ((currentGameMode = GAME_DEALER_SHOW)) {
    // Calculate the total hand value of both player and dealer
    var playerHandTotalValue = calculateTotalHandValue(playerHand);
    var dealerHandTotalValue = calculateTotalHandValue(dealerHand);

    // Conditions for tied game
    if (
      playerHandTotalValue == dealerHandTotalValue ||
      (playerHandTotalValue > 21 && dealerHandTotalValue > 21)
    ) {
      gameRoundTie++;
      roundsPlayed++;
      outputMessage = `${displayPlayerAndDealerHands(playerHand, dealerHand)}
          <br><b>It is a tie!</b>
          ${displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue)}
          <br><br>${gameTieImage}
          <br><b>Score</b>:<br> Player win by total hand value: ${playerWin} | Player win by Blackjack: ${playerBlackjackWin} | <br><br> Dealer win by total hand value: ${dealerWin} | Dealer win by Blackjack: ${dealerBlackjackWin} | <br><br> Tie by hand value: ${gameRoundTie} | Tie by Blackjack: ${gameRoundBlackjackTie}
          <br><br> Round(s) played: ${roundsPlayed}
          <br><br> Click the <b>"Play"</b> button to play again!!`;
    }

    // Conditions for player win
    else if (
      (playerHandTotalValue > dealerHandTotalValue &&
        playerHandTotalValue <= 21) ||
      (playerHandTotalValue <= 21 && dealerHandTotalValue > 21)
    ) {
      playerWin++;
      roundsPlayed++;
      outputMessage = `${displayPlayerAndDealerHands(playerHand, dealerHand)}
          <br><b>Player wins!</b>    
          ${displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue)}
          <br><br>${playerWinImage}
          <br><b>Score</b>:<br> Player win by total hand value: ${playerWin} | Player win by Blackjack: ${playerBlackjackWin} | <br><br> Dealer win by total hand value: ${dealerWin} | Dealer win by Blackjack: ${dealerBlackjackWin} | <br><br> Tie by hand value: ${gameRoundTie} | Tie by Blackjack: ${gameRoundBlackjackTie}
          <br><br> Round(s) played: ${roundsPlayed}
          <br><br> Click the <b>"Play"</b> button to play again!!`;
    }

    // Dealer wins when above two conditions are not met
    else if (
      (playerHandTotalValue < dealerHandTotalValue &&
        dealerHandTotalValue <= 21) ||
      (dealerHandTotalValue <= 21 && playerHandTotalValue > 21)
    ) {
      dealerWin++;
      roundsPlayed++;
      outputMessage = `${displayPlayerAndDealerHands(playerHand, dealerHand)}
          <br><b>Dealer wins!</b>
          ${displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue)}
          <br><br>${dealerWinImage}
          <br><b>Score</b>:<br> Player win by total hand value: ${playerWin} | Player win by Blackjack: ${playerBlackjackWin} | <br><br> Dealer win by total hand value: ${dealerWin} | Dealer win by Blackjack: ${dealerBlackjackWin} | <br><br> Tie by hand value: ${gameRoundTie} | Tie by Blackjack: ${gameRoundBlackjackTie}
          <br><br> Round(s) played: ${roundsPlayed}
          <br><br> Click the <b>"Play"</b> button to play again!!`;
    }
    // Restart Game
    resetGame();

    // return output message
    return outputMessage;
  }
};
