////////// BLACKJACK - MORE COMFORTABLE: MULTIPLAYER WITH NAMES //////////

//// GLOBAL VARIABLES ////
// deck and shuffled deck
var deck;
var shuffledDeck;
// number of players
var numberOfPlayers = 0;
// array to store player objects with these attributes: name, playerNumber, cardsArray, totalRank, wins
var playerArray = [];
// current player number
var currentPlayer = 0;
// array to track the dealer's cards
var dealerCardsArray = [];
// string message on list of currentplayer's cards
var listOfCards_player = "";
// string message on list of dealer's cards
var listOfCards_dealer = "";
// number of hits for currentplayer and dealer
var numberOfHits_player = 0;
var numberOfHits_dealer = 0;
// number of wins for dealer
var numberOfWins_dealer = 0;
// number of rounds
var numberOfRounds = 0;
// game modes
var GAME_MODE_WELCOME = "GAME_MODE_WELCOME";
var GAME_MODE_NUMBER_OF_PLAYERS = "GAME_MODE_NUMBER_OF_PLAYERS";
var GAME_MODE_NAMES = "GAME_MODE_NAMES";
var GAME_MODE_INSTRUCTIONS = "GAME_MODE_INSTRUCTIONS";
var GAME_MODE_PLAYER_HIT = "GAME_MODE_PLAYER_HIT";
var GAME_MODE_PLAYER_STAND = "GAME_MODE_PLAYER_STAND";
var GAME_MODE_EVALUATE_WIN = "GAME_MODE_EVALUATE_WIN";
// initialise game mode
var gameMode = GAME_MODE_WELCOME;
// hit or stand message to player after every hit
var hitOrStandMessage = "";
// winner message after the game ends
var winnerMessage = "";

//// HELPER FUNCTIONS ////
// make deck of 52 cards
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];

  // Create an array of 4 suits
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var suitIndex = 0;

  // Create an outer loop through the 4 suits
  while (suitIndex < suits.length) {
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var card = {
        name: rankCounter,
        suit: suits[suitIndex],
        rank: rankCounter,
      };
      if (rankCounter == 1) {
        card.name = "ace";
      } else if (rankCounter == 11) {
        card.name = "jack";
      } else if (rankCounter == 12) {
        card.name = "queen";
      } else if (rankCounter == 13) {
        card.name = "king";
      }
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};

// Function to get a random index ranging from 0 (inclusive) to max (exclusive)
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Function to shuffle the elements in the cardDeck array
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
    currentIndex += 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

// Function to draw card for current player
var playerDrawCard = function (playerNumber) {
  // player draws the first card from the top of the deck
  var playerCard = shuffledDeck.pop();
  // increase the number of hits for current player
  numberOfHits_player += 1;

  // Create local variable storing currentplayer's cards
  var playerCardsArray = [];
  // If the card is an ace, determine the value of its rank
  if (containsAce(playerCard) == true) {
    determineAceValue(playerCard, playerCardsArray);
  }
  // Store the new card in the playerCardsArray
  playerCardsArray.push(playerCard);
  // Push this array to the respective object index in the global objects array
  playerArray[playerNumber].cardsArray = playerCardsArray;

  console.log(
    `player ${playerNumber} draws card number ${numberOfHits_player}..`
  );
  console.log(playerCard);
  console.log("playerCardsArray");
  console.log(playerCardsArray);
};

// Function to sum up card ranks of any player
var sumOfRanks = function (cardsArray) {
  var index = 0;
  var sumOfRanks = 0;
  while (index < cardsArray.length) {
    var card = cardsArray[index];
    var cardRank = card.rank;
    sumOfRanks = sumOfRanks + cardRank;
    index += 1;
  }
  return sumOfRanks;
};

// Function to determine if player 'n' is bust
var determineBust = function (playerNumber) {
  // Sum up player's cards
  var sumOfCards = 0;
  // check if the player bust - if sumOfCards is above 21, return true
  sumOfCards = sumOfRanks(playerArray[playerNumber - 1].cardsArray);
  if (sumOfCards > 21) {
    return true;
  }

  // check if the dealer bust - if sumOfCards is above 21, return true
  // if (string == "dealer") {
  //sumOfCards = sumOfRanks(dealerCardsArray);
  //if (sumOfCards > 21) {
  //return true;
  //}
  // }

  return false;
};

// Function to create list of cards message for current player
var listCards = function (cardsArray, string) {
  // Create heading for message
  listOfCards = `<b> ${string}'s cards: </b><br>`;

  // Create loop through all cards in cardsArray
  var cardCount = 0;
  while (cardCount < cardsArray.length) {
    var card = cardsArray[cardCount];
    listOfCards = listOfCards + card.name + " of " + card.suit + "<br>";
    if (cardsArray[cardCount].name == "ace") {
      listOfCards = listOfCards + `(rank: ${card.rank}) <br>`;
    }
    cardCount += 1;
  }
  return listOfCards;
};

// Function to determine winner

// Function to check if a newly drawn card contains an ace (version 3)
var containsAce = function (newCard) {
  var name = newCard.name;
  if (name == "ace") {
    console.log("~New card is an ace~");
    return true;
  }
  return false;
};

// Function to determine the value of an Ace: 1 or 11 (version 3)
var determineAceValue = function (aceCard, cardsArray) {
  // If existing hand is empty OR the sum of ranks in existing hand is less than or equal 10, change value of ace to 11. Otherwise, the value of the ace remains as 1
  if (sumOfRanks(cardsArray) <= 10 || cardsArray.length == 0) {
    console.log("~Changing ace rank to 11~");
    aceCard.rank = 11;
  }
};

// Function for dealer to draw a card
var dealerDrawCard = function () {
  // Dealer draws the first card from the top of the deck
  var dealerCard = shuffledDeck.pop();

  // If the card is an ace, determine the value of its rank
  if (containsAce(dealerCard) == true) {
    determineAceValue(dealerCard, dealerCardsArray);
  }

  // Store the new card in the dealerCardsArray and increase the no. of hits
  dealerCardsArray.push(dealerCard);
  numberOfHits_dealer += 1;

  console.log(`dealer draws card number ${numberOfHits_dealer}..`);
  console.log(dealerCard);
};

// Function to reset game conditions for the next round
var resetGame = function () {
  // reset the numberOfHits, playerCardsArray, dealerCardsArray & list of cards
  numberOfHits_player = 0;
  numberOfHits_dealer = 0;

  listOfCards_player = "";
  listOfCards_dealer = "";

  var index = 0;
  while (index < numberOfPlayers) {
    playerArray.cardsArray = [];
    index += 1;
  }
  dealerCardsArray = [];
};

//// MAIN FUNCTION ////
var main = function (input) {
  // Default output value
  var myOutputValue = "";
  console.log("Game mode:");
  console.log(gameMode);

  // If gameMode is GAME_MODE_WELCOME, change gameMode to GAME_MODE_NUMBER_OF_PLAYERS and output welcome message
  if (gameMode == GAME_MODE_WELCOME) {
    // Change gameMode to GAME_MODE_NUMBER_OF_PLAYERS
    gameMode = GAME_MODE_NUMBER_OF_PLAYERS;
    console.log("Game mode:");
    console.log(gameMode);
    // Create welcome message
    myOutputValue = `Welcome to BlackJack! A maximum of 4 players can play against the computer. The computer will be the dealer. Press submit for the next step.`;
    console.log("myOutputValue");
    console.log(myOutputValue);
    return myOutputValue;
  }
  if (gameMode == GAME_MODE_NUMBER_OF_PLAYERS) {
    if (
      input == "" ||
      input.charAt(input.length - 1) == " " ||
      Number(input) == NaN
    ) {
      console.log("Prompt user to enter number of players");
      myOutputValue =
        "Please enter the number of players playing this game. A maximum of 4 players is allowed.";
      return myOutputValue;
    }

    // store input as the global variable numberOfPlayers
    console.log("number of players entered");
    console.log(input);
    numberOfPlayers = input;
    // Create n objects of players, each with the attributes: name, playerNumber, cardsArray, totalRank, wins
    var index = 0;
    while (index < numberOfPlayers) {
      var player = {
        name: "",
        playerNumber: index + 1,
        cardsArray: [],
        totalRank: 0,
        wins: 0,
      };
      console.log("New player object added");
      console.log("player" + player.playerNumber);
      //Push object into playerArray
      playerArray.push(player);
      index += 1;
    }
    console.log("Number of players in array");
    console.log(playerArray.length);
    // Change game mode to GAME_MODE_NAMES
    gameMode = GAME_MODE_NAMES;

    // create message to enter names of players
    myOutputValue = `You have chosen a ${numberOfPlayers}-player game. Please enter ${numberOfPlayers} names separated by a comma.`;
    return myOutputValue;
  }

  // If gameMode is GAME_MODE_NAME, ask the user to input their name
  if (gameMode == GAME_MODE_NAMES) {
    // create array to store all names
    var names = input.split(",");
    //input validation - user must enter correct number of names
    if (input == "" || input == " " || names.length !== numberOfPlayers) {
      console.log(
        `Invalid input for name. Prompt user to enter ${numberOfPlayers} names`
      );
      myOutputValue = `Oops! Please enter exactly ${numberOfPlayers} names separated by commas.`;
      return myOutputValue;
    }

    // loop to push each name to respective player object in global array
    var index = 0;
    while (index < names.length) {
      playerArray[index].name = names[index];
    }

    // Create a list of names
    var nameList = "";
    var index = 0;
    while (index < names.length) {
      nameList = nameList + `${names[index]},`;
      index += 1;
    }
    if (namesList.charAt(names.length - 1) == ",") {
      namesList = namesList.slice(0, -1);
    }
    // Change game mode to GAME_MODE_INSTRUCTIONS
    gameMode = GAME_MODE_INSTRUCTIONS;

    // increment current player number by 1
    currentPlayer += 1;

    // Create message of game instructions
    myOutputValue = `Hello ${namesList}! Let's start the game! <br> Each player can hit or stand. When your cards add up to 21, you win blackjack. When your cards exceed 21, you bust. Player ${currentPlayer}, ${
      playerArray[currentPlayer - 1].name
    } goes first. <br> Press submit to draw your first card.`;
    return myOutputValue;
  }
};
