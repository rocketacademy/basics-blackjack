//Blackjack Base Game Walkthrough
//1. playable game with minimum functions: creating deck, shuffling, dealing cards, evaluating winner
//2. ability for the player to hit or stand
//3. ability for the computer to hit or stand
//4. variable value of Ace - either '1' or '11'

//----version 1-----
// 1. define player and computer
// 2. create and shuffle a game deck
// 3. draw 2 cards for player and computer respectively
// 4. win conditions: blackjack or higher hand value
// 5. display hands of both player and computer and declare winner

//----version 2----
//1. extra game mode for "hit" or "stand"
//2. functonality for user to input "hit" or "stand"
//2a. if "hit", player will draw an additional card
//2b. if "stand", player and computer card value will be compared

//----version 3----
//1. Computer to hit or stand only after player choose to stand
//2. if computer hand value is less than 17, computer hits
//3. if value is more than 17, computer chooses to stand

//----version 4----
//1. if totalHandValue including Ace is less than 21, ace value is 11
//2. if totalHandValue including Ace is more than 21, ace value is 1

// Declare game modes
var StartMode = "game start";
var cardsDrawnMode = "cards drawn";
var resultsMode = "results shown";
var hitOrStand = "hit or stand";
var gameOver = false;
var currentGameMode = StartMode;

// Declare variables to store player and computer play modes
// We use arrays as each hand will be holding multiple card objects
var player = [];
var computer = [];

// Variable for the deck of cards
var gameDeck = "empty at the start";

//make deck function
var deck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["♥️", "♦️", "♣️", "♠️"];

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

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Card Shuffling Function
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

// Function that creates and shuffles a deck
var createNewDeck = function () {
  var newDeck = deck();
  var shuffledDeck = shuffleCards(newDeck);
  return shuffledDeck;
};

//Game Functions
var checkForBlackJack = function (handArray) {
  //check for player hand
  var playerCardOne = handArray[0];
  var playerCardTwo = handArray[1];
  var isBlackJack = false;
  //if there is a black jack, return true
  //1st card ace, 2nd card 10 or picture cards
  //1st card 10 or picture cards, 2nd card, ace
  if (
    (playerCardOne.name == "ace" && playerCardTwo.rank >= 10) ||
    (playerCardOne.rank >= 10 && playerCardTwo.name == "ace")
  ) {
    isBlackJack = true;
  }
  //else return false
  return isBlackJack;
};

var calculateTotalHandValue = function (handArray) {
  var totalHandValue = 0;
  var aceCounter = 0;

  //loop through player or computer hand and add up the values
  var index = 0;
  while (index < handArray.length) {
    var currentCard = handArray[index];

    //for picture cards (king, queen, jack), the value is 10
    if (
      currentCard.name == "king" ||
      currentCard.name == "queen" ||
      currentCard.name == "jack"
    ) {
      totalHandValue = totalHandValue + 10;
    } else if (currentCard.name == "ace") {
      //default ace value will be 11
      totalHandValue = totalHandValue + 11;
      aceCounter = aceCounter + 1;
    } else {
      totalHandValue = totalHandValue + currentCard.rank;
    }
    index = index + 1;
  }

  index = 0;
  while (index < aceCounter) {
    //when total value is more than 21, minus 10 so that the ace value will be reduced to a value of 1
    if (totalHandValue > 21) {
      totalHandValue = totalHandValue - 10;
    }
  }
  return totalHandValue;
};

//Function to display player and computer's hands
var displayPlayerandComputerHands = function (
  playerHandArray,
  computerHandArray
) {
  var playerMessage = "Player hand:<br>";
  var index = 0;
  while (index < playerHandArray.length) {
    playerMessage =
      playerMessage +
      "- " +
      playerHandArray[index].name +
      " of " +
      playerHandArray[index].suit +
      "<br>";
    index = index + 1;
  }

  index = 0;
  var computerMessage = "Computer hand:<br>";
  while (index < computerHandArray.length) {
    computerMessage =
      computerMessage +
      "- " +
      computerHandArray[index].name +
      " of " +
      computerHandArray[index].suit +
      "<br>";
    index = index + 1;
  }

  return playerMessage + "<br>" + computerMessage;
};

// Function that displays the total hand values of the player and the computer in a message
var displayHandTotalValues = function (playerHandValue, computerHandValue) {
  var totalHandValueMessage =
    "<br>Player total hand value: " +
    playerHandValue +
    "<br>Computer total hand value: " +
    computerHandValue;
  return totalHandValueMessage;
};

var main = function (input) {
  var outputMessage = " ";
  //FIRST CLICK
  if (currentGameMode == StartMode) {
    // Create the game deck
    gameDeck = createNewDeck();
    console.log(gameDeck);
    // Deal 2 cards to player and computer respectively
    player.push(gameDeck.pop());
    player.push(gameDeck.pop());
    computer.push(gameDeck.pop());
    computer.push(gameDeck.pop());

    console.log("player hand: ");
    console.log(player);
    console.log("computer hand: ");
    console.log(computer);
    // progress the gameMode
    currentGameMode = cardsDrawnMode;
    // write and return the appropriate output message

    outputMessage = `Everyone has been dealt a card. Click the "submit" button to proceed.`;

    return outputMessage;
  }

  //SECOND CLICK
  if (currentGameMode == cardsDrawnMode) {
    //test checkForBlackJack function

    var playerBlackJack = checkForBlackJack(player);
    var computerBlackJack = checkForBlackJack(computer);

    if (playerBlackJack == true || computerBlackJack == true) {
      //both player and computer have blackjack ==> tie
      if (playerBlackJack == true && computerBlackJack == true) {
        outputMessage =
          displayPlayerandComputerHands(player, computer) +
          "<br>Its a Black Jack Tie! Refresh to play again.";
      }
      //player has blackjack ==> player wins
      else if (playerBlackJack == true && computerBlackJack == false) {
        outputMessage =
          displayPlayerandComputerHands(player, computer) +
          "<br>Player wins by blackjack. Refresh to play again.";
      }
      //computer has blackjack > computer wins
      else {
        outputMessage =
          displayPlayerandComputerHands(player, computer) +
          "<br>Computer wins by blackjack. Refresh to play again.";
      }
    }
    //neither has black jack ==> ask to continue
    else {
      outputMessage = `${displayPlayerandComputerHands(
        player,
        computer
      )}<br>There are no black jacks. <br>Please input "hit" or "stand" to continue.`;
      currentGameMode = hitOrStand;
    }
    return outputMessage;
  }

  //THIRD CLICK

  if (currentGameMode == hitOrStand) {
    //HIT MODE!!!
    if (input == "hit") {
      player.push(gameDeck.pop());
      outputMessage = `${displayPlayerandComputerHands(
        player,
        computer
      )}<br>You drew another card. <br>Please input "hit" or "stand".`;

      if (calculateTotalHandValue(player) > 21) {
        gameOver = true;
        outputMessage = `${displayPlayerandComputerHands(
          player,
          computer
        )}<br>Player has busted and loses. Please refresh to play again.`;
      }
    }

    //STAND MODE!!!
    else if (input == "stand") {
      //calculate total hand value
      var playerHandTotalValue = calculateTotalHandValue(player);
      var computerHandTotalValue = calculateTotalHandValue(computer);

      //computer determines if it should hit or stand
      while (computerHandTotalValue < 17) {
        computer.push(gameDeck.pop());
        computerHandTotalValue = calculateTotalHandValue(computer);
      }

      if (calculateTotalHandValue(computer) > 21) {
        gameOver = true;
        outputMessage = `${displayPlayerandComputerHands(
          player,
          computer
        )}<br>Computer has busted and loses. Please refresh to play again.`;
      }

      //same value -> tie
      if (playerHandTotalValue == computerHandTotalValue) {
        outputMessage =
          displayPlayerandComputerHands(player, computer) +
          "<br>It's a tie!" +
          displayHandTotalValues(playerHandTotalValue, computerHandTotalValue);
      }
      //player has higher value > player wins
      else if (
        (playerHandTotalValue > computerHandTotalValue &&
          playerHandTotalValue <= 21) ||
        (playerHandTotalValue <= 21 && computerHandTotalValue > 21)
      ) {
        outputMessage =
          displayPlayerandComputerHands(player, computer) +
          "<br>Player wins!" +
          displayHandTotalValues(playerHandTotalValue, computerHandTotalValue);
      }
      //computer has higher value > computer wins
      else {
        outputMessage =
          displayPlayerandComputerHands(player, computer) +
          "<br>Computer wins!" +
          displayHandTotalValues(playerHandTotalValue, computerHandTotalValue);
      }
    }

    //if input is not "hit" or "stand"
    else {
      outputMessage = `ERROR! Please input either "hit" or "stand" <br><br>${displayPlayerandComputerHands(
        player,
        computer
      )}`;
    }
  }

  console.log("Player total hand value ==> ", playerHandTotalValue);
  console.log("Computer total hand value ==> ", computerHandTotalValue);

  //write the output message
  return outputMessage;
};
