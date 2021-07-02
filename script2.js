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
var currentPlayer = 1;
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
var GAME_MODE_START_GAME = "GAME_MODE_START_GAME";
var GAME_MODE_PLAYER_TURN = "GAME_MODE_PLAYER_TURN";
var GAME_MODE_PLAYER_HIT = "GAME_MODE_PLAYER_HIT";
var GAME_MODE_PLAYER_STAND = "GAME_MODE_PLAYER_STAND";
var GAME_MODE_EVALUATE_WIN = "GAME_MODE_EVALUATE_WIN";
// initialise game mode
var gameMode = GAME_MODE_WELCOME;
// hit or stand message to player after every hit
var hitOrStandMessage = "";

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
var playerDrawCard = function (currentPlayer) {
  console.log("drawing player card..");
  // player draws the first card from the top of the deck
  var playerCard = shuffledDeck.pop();
  // increase the number of hits for current player
  numberOfHits_player += 1;

  // Create local variable storing currentplayer's cards
  var playerIndex = currentPlayer - 1;
  var playerCardsArray = playerArray[playerIndex].cardsArray;
  // Push the new card in the playerCardsArray
  playerCardsArray.push(playerCard);
  // Replace this array in the respective object index in the global objects array
  playerArray[playerIndex].cardsArray = playerCardsArray;

  console.log(
    `player ${currentPlayer} draws card number ${numberOfHits_player}..`
  );
  console.log(playerCard);
  console.log("playerCardsArray");
  console.log(playerCardsArray);

  // return the newly drawn card
  return playerCard;
};

// Function to create display message of current card drawn by player
var cardMessage = function (playerName, playerCard) {
  return (
    playerName +
    " draws " +
    playerCard.name +
    " of " +
    playerCard.suit +
    ".<br>"
  );
};

// Function to sum up card ranks of any player
var sumOfRanks = function (cardsArray) {
  var index = 0;
  var sumOfRanks = 0;
  console.log("cardsArray.length");
  console.log(cardsArray.length);
  while (index < cardsArray.length) {
    var card = cardsArray[index];
    console.log(card);
    var cardRank = card.rank;
    sumOfRanks = sumOfRanks + cardRank;
    index += 1;
  }
  return sumOfRanks;
};

// Function to determine if player 'n' is bust
var determineBust = function (playerIndex) {
  // Get player object
  playerObject = playerArray[playerIndex];
  // Get  array of player's cards from global array
  playerCards = playerObject.cardsArray;
  // Sum up player's cards
  var sumOfCards = 0;
  // check if the player bust - if sumOfCards is above 21, return true
  sumOfCards = sumOfRanks(playerCards);
  if (sumOfCards > 21) {
    return true;
  }
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

  // assign dealerCardsArray to the attribute in the dealerObj
  var dealerObj = playerArray[playerArray.length - 1];
  dealerObj.cardsArray = dealerCardsArray;

  // Store the sum of total ranks in the attribute totalRank
  dealerObj.totalRank = sumOfRanks(dealerObj.cardsArray);
};

// Function to check who got blackjack and returns array of winners
var checkBlackJack = function () {
  // local array to store names of blackjack winners
  var blackJackWinners = [];
  // create loop to check which players won blackjack and push them into global array blackJackWinners
  var index = 0;
  while (index < numberOfPlayers) {
    if (playerArray[index].totalRank == 21) {
      console.log("player that got blackjack..");
      console.log(playerArray[index].name);
      blackJackWinners.push(playerArray[index].name);
    }
    index += 1;
  }
  // if dealer won blackjack, push it to the array
  if (sumOfRanks(dealerCardsArray) == 21) {
    blackJackWinners.push("dealer");
  }
  // If one or more won blackjack, output console message
  if (blackJackWinners.length > 0) {
    console.log("blackjack winners:");
    console.log(blackJackWinners);
  } else {
    console.log("Nobody got blackjack");
  }
  return blackJackWinners;
};

// Function to check who got the highest rank among the remaining players who didn't get blackjack
var checkHighestRank = function (remainingPlayers) {
  var index = 0;
  // Variable to store the highest rank player
  var highestRank = 0;
  // Array to store the winner object later
  var winner = [];
  while (index < remainingPlayers.length) {
    var playerObject = remainingPlayers[index];
    var playerRank = playerObject.totalRank;
    if (playerRank > highestRank) {
      highestRank = playerRank;
      winner.push(playerObject);
    }
    index += 1;
  }
  // Output the winner if there is one
  if (winner.length > 0) {
    var nameOfWinner = winner[0].name;
    return nameOfWinner;
  }
  // otherwise, return empty string
  return "";
};

// Check who tied

// Function to reset game conditions for the next round
var resetGame = function () {
  // reset the numberOfHits, numberOfRounds, currentPlayer, playerCardsArray, dealerCardsArray & list of cards, playerArray
  numberOfHits_player = 0;
  numberOfHits_dealer = 0;
  numberOfRounds = 0;
  currentPlayer = 1;

  listOfCards_player = "";
  listOfCards_dealer = "";

  dealerCardsArray = [];
  playerArray = [];
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

  // If gameMode is GAME_MODE_NUMBER_OF_PLAYERS, create player object variables and change gameMode to GAME_MODE_NAMES to prompt user to enter player names
  if (gameMode == GAME_MODE_NUMBER_OF_PLAYERS) {
    if (
      input == "" ||
      input.charAt(input.length - 1) == " " ||
      isNaN(input) == true
    ) {
      console.log("Invalid input. Prompt user to enter number of players");
      myOutputValue =
        "Please enter the number of players playing this game. A maximum of 4 players is allowed.";
      return myOutputValue;
    }

    // store input as the global variable numberOfPlayers
    console.log("number of players entered");
    console.log(input);
    numberOfPlayers = input;

    // if this is not the first round, make sure to empty previous round's cards from players' hands and the totalRank
    if (numberOfRounds > 0) {
      var index = 0;
      while (index < numberOfPlayers) {
        playerArray[index].cardsArray = [];
        playerArray[index].totalRank = 0;
        index += 1;
      }
    }
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

    // Create an object for the dealer
    var dealerObj = {
      name: "dealer",
      playerNumber: 0,
      cardsArray: dealerCardsArray,
      totalRank: sumOfRanks(dealerCardsArray),
      wins: 0,
    };
    // Push dealerObj to the playerarray
    playerArray.push(dealerObj);

    // Change game mode to GAME_MODE_NAMES
    gameMode = GAME_MODE_NAMES;

    // create message to enter names of players
    myOutputValue = `You have chosen a ${numberOfPlayers}-player game. Please enter ${numberOfPlayers} names separated by a comma.`;
    return myOutputValue;
  }

  // If gameMode is GAME_MODE_NAME, ask the user to input their name and change gameMode to GAME_MODE_PLAYER_HIT
  if (gameMode == GAME_MODE_NAMES) {
    // create array to store all names
    var names = input.split(",");
    console.log("names:");
    console.log(names);
    console.log("array length");
    console.log(names.length);
    //input validation - user must enter correct number of names
    if (names.length == numberOfPlayers) {
      // loop to push each name to respective player object in global array
      var index = 0;
      while (index < names.length) {
        playerArray[index].name = names[index];
        index += 1;
      }

      // create a list of names
      var nameList = "";
      var index = 0;
      while (index < names.length) {
        nameList = nameList + `${names[index]},`;
        index += 1;
      }
      // remove the comma at the end of the string
      nameList = nameList.slice(0, -1);
      console.log(nameList);

      // change game mode to GAME_MODE_START_GAME
      gameMode = GAME_MODE_START_GAME;

      // Create message of game instructions
      myOutputValue = `Hello ${nameList}! Let's start the game! <br><br><b> GAME INSTRUCTIONS </b><br> Each player can hit or stand. When your cards add up to 21, you win blackjack. When your cards exceed 21, you bust.<br><br> Press submit to start the game.`;
      return myOutputValue;
    }
    // If player wishes to modify the number of players, prompt user to enter 'back' to return to previous game mode
    if (input == "back") {
      gameMode = GAME_MODE_NUMBER_OF_PLAYERS;
      console.log("return to previous game mode:");
      console.log(gameMode);
      myOutputValue =
        "Please enter the number of players playing this game. A maximum of 4 players is allowed.";
      return myOutputValue;
    }
    // Otherwise, user has not entered the correct number of names. Prompt user to enter the correct number of names.
    console.log(
      `Invalid input for name. Prompt user to enter ${numberOfPlayers} names`
    );
    myOutputValue = `Oops! Please enter exactly ${numberOfPlayers} names separated by commas.`;
    return myOutputValue;
  }

  // If gameMode is GAME_MODE_START_GAME, increment the no. of rounds, make and shuffle deck, and change gameMode to GAME_MODE_START_GAME
  if (gameMode == GAME_MODE_START_GAME) {
    // increment no. of rounds
    numberOfRounds += 1;
    console.log("current round:");
    console.log(numberOfRounds);
    // if this is not the first round
    if (numberOfRounds > 1) {
      var index = 0;
      while (index < playerArray.length) {
        // make sure to empty previous round's cards from players' hands and the totalRank
        playerArray[index].cardsArray = [];
        playerArray[index].totalRank = 0;
        index += 1;
        // reset number of hits  and cardsarray for dealer
        numberOfHits_dealer = 0;
        dealerCardsArray = [];
      }
    }
    // make and shuffle deck
    shuffledDeck = shuffleCards(makeDeck());
    console.log("shuffling deck..");
    // change game mode to GAME_MODE_PLAYER_HIT
    gameMode = GAME_MODE_PLAYER_HIT;
    myOutputValue = `Round ${numberOfRounds} begins now <br><br> ${
      playerArray[currentPlayer - 1].name
    } starts first. Press submit to start hitting.`;
    return myOutputValue;
  }

  // Change gameMode to GAME_MODE_PLAYER_HIT
  if (gameMode == GAME_MODE_PLAYER_HIT) {
    // If player enters 'stand'
    if (input == "stand" && numberOfHits_player > 0) {
      // change gameMode to GAME_MODE_PLAYER_STAND
      gameMode = GAME_MODE_PLAYER_STAND;
      console.log("game mode:");
      console.log(gameMode);
      return `You chose to stand. Press submit for the next player's turn.`;
    }

    // Draw card for player and store it in a new variable
    var newCard = playerDrawCard(currentPlayer);

    // Create message stating the card drawn
    var playerObject = playerArray[currentPlayer - 1];
    var playerCardMessage = cardMessage(playerObject.name, newCard);

    // Create message listing player's total cards
    var playerCardsArray = playerObject.cardsArray;
    listOfCards_player = listCards(playerCardsArray, `${playerObject.name}`);
    console.log("playerCardsArray.length");
    console.log(playerCardsArray.length);

    // Calculate total rank of player's existing cards
    var totalRank = sumOfRanks(playerCardsArray);
    console.log(`player ${currentPlayer}'s total rank: `);
    console.log(totalRank);
    // push it into the player object
    playerObject.totalRank = totalRank;

    // Conditions to check if the player can still continue hitting (<21), got blackjack (=21) or got bust (>21)
    hitOrStandMessage =
      "Your cards are still below 21. To hit again, press submit. To stand, enter 'stand' and submit.";
    if (totalRank == 21) {
      hitOrStandMessage = "Blackjack! Enter 'stand' for the next player's turn";
    }
    if (determineBust(currentPlayer - 1) == true) {
      hitOrStandMessage =
        "Oops! You bust and should not continue hitting. Enter 'stand' for the next player's turn.";
    }
    myOutputValue =
      playerCardMessage +
      listOfCards_player +
      "<br>" +
      `Total rank: ${totalRank} <br>` +
      hitOrStandMessage;
    return myOutputValue;
  }

  // If gameMode is GAME_MODE_PLAYER_STAND
  if (gameMode == GAME_MODE_PLAYER_STAND) {
    console.log("current player number");
    console.log(currentPlayer);
    // If it is the last player, draw cards for dealer
    if (currentPlayer == numberOfPlayers) {
      dealerDrawCard();

      // get the dealer object variable
      var dealerObj = playerArray[playerArray.length - 1];

      // Get the dealer's total rank from dealerObj in playerArray
      var dealerRank = dealerObj.totalRank;
      console.log("sum of dealer cards ranks");
      console.log(dealerRank);

      // Logic for dealer to hit or stand: If dealer's cards are less than 17, it must hit. If sumOfRanks is between 17 and 19 inclusive, it randomly decides whether it hits.
      while (dealerObj.totalRank < 17) {
        dealerDrawCard();
      }
      while (dealerObj.totalRank >= 17 && dealerObj.totalRank <= 19) {
        var randomInteger = getRandomIndex(2);
        console.log("drawing random integer 0 or 1..");
        console.log(randomInteger);
        if (randomInteger == 1) {
          dealerDrawCard();
        }
      }

      // create string to display dealer cards
      var dealerCardsDisplay = "";
      var cardIndex = 0;
      while (cardIndex < dealerObj.cardsArray.length) {
        var dealerCard = dealerObj.cardsArray[cardIndex];
        dealerCardsDisplay =
          dealerCardsDisplay + `${dealerCard.name} of ${dealerCard.suit} <br>`;
        cardIndex += 1;
      }

      // change gameMode to GAME_MODE_EVALUATE_WIN
      gameMode = GAME_MODE_EVALUATE_WIN;
      myOutputValue =
        "All players have finished. The dealer has drawn the following cards: <br>" +
        dealerCardsDisplay +
        "<br> Press submit to see who won!";
      return myOutputValue;
    }
    // Otherwise, it is the next player's turn.
    // increment current player number by 1
    currentPlayer += 1;
    console.log("next player number:");
    console.log(currentPlayer);
    // change gameMode to GAME_MODE_PLAYER_HIT
    gameMode = GAME_MODE_PLAYER_HIT;
    // create welcome message for next player
    myOutputValue = `Welcome ${
      playerArray[currentPlayer - 1].name
    }! You're player number ${currentPlayer}. Press submit to start hitting.`;
    return myOutputValue;
  }

  // If gameMode is GAME_MODE_EVALUATE_WIN
  if (gameMode == GAME_MODE_EVALUATE_WIN) {
    // Create the main scoreboard
    var scoreBoard = "<b>Total Ranks: </b><br>";
    var index = 0;
    while (index < playerArray.length) {
      var playerObj = playerArray[index];
      scoreBoard =
        scoreBoard +
        `Player ${index + 1}, ${playerObj.name}: ${playerObj.totalRank} <br>`;
      index += 1;
    }

    // Check who got bust and who didn't
    var arrayOfBustPlayers = [];
    var arrayOfRemainingPlayers = [];
    // Loop to create message to bust players
    var messageForBustPlayers = "";
    var playerIndex = 0;
    while (playerIndex < playerArray.length) {
      var playerObj = playerArray[playerIndex];
      if (determineBust(playerIndex) == true) {
        // If this player is bust, push it into the arrayOfBustPlayers
        arrayOfBustPlayers.push(playerObj);
        var name = playerArray[playerIndex].name;
        messageForBustPlayers =
          messageForBustPlayers + name + ", you're bust!<br>";
      } else {
        // If this player is not bust, push it into the arrayOfRemainingPlayers
        arrayOfRemainingPlayers.push(playerObj);
      }
      playerIndex += 1;
    }

    // Check for blackjack winners among those who didn't bust and store them in array
    var blackJackWinners = checkBlackJack(arrayOfRemainingPlayers);
    // Create the message declaring blackjack winners (if any)
    var blackJackMessage = "<b> BlackJack winners: </b><br>";
    // Create the message who got the highest rank
    var playerWithHighestRank = "";

    // If there are blackjack winners, declare them
    if (blackJackWinners.length > 0) {
      // Create a loop to: (i) create message list of winners (ii) track each one's win in the playerArray attribute
      var index = 0;
      while (index < blackJackWinners.length) {
        blackJackMessage = blackJackMessage + blackJackWinners[index] + "<br>";
        var playerIndex = 0;
        while (playerIndex < playerArray.length) {
          var playerObj = playerArray[playerIndex];
          if (playerObj.name == blackJackWinners[index]) {
            playerObj.wins += 1;
            console.log(`${playerObj.name}: no. of wins`);
            console.log(playerObj.wins);
          }
          playerIndex += 1;
        }
        index += 1;
      }
    }
    // Otherwise, if nobody got blackjack, declare it and check who got the highest rank among remaining players
    else {
      blackJackMessage = "<b>NOBODY GOT BLACKJACK hur hur</b>";
      playerWithHighestRank = checkHighestRank(arrayOfRemainingPlayers);
    }

    // create message for player with highest rank
    var messageForHighestPlayer = "";
    // If there is someone with the highest rank, increment the number of wins in playerarray object attribute "wins"
    if (playerWithHighestRank !== "") {
      messageForHighestPlayer = `${playerWithHighestRank}, you won!`;
      var index = 0;
      while (index < playerArray.length) {
        if (playerArray[index].name == playerWithHighestRank) {
          playerArray[index].wins += 1;
        }
        index += 1;
      }
    }

    // Create a loop to create message tracking the number of wins
    var cumulativeWins = "<b> Number of wins: </b><br>";
    var index = 0;
    while (index < playerArray.length) {
      var playerObj = playerArray[index];
      cumulativeWins =
        cumulativeWins +
        `${playerObj.name}: ${playerObj.wins} / ${numberOfRounds}<br>`;
      index += 1;
    }

    // check who tied

    // to restart game with same group of players,
    // (i) change gameMode to GAME_MODE_START_GAME
    gameMode = GAME_MODE_START_GAME;

    // (ii) reset currentPlayer to 1
    currentPlayer = 1;

    // Output final messages and scoreboard
    myOutputValue =
      `<b> ~ROUND ${numberOfRounds} RESULTS~ </b><br>` +
      blackJackMessage +
      "<br>" +
      messageForBustPlayers +
      "<br>" +
      messageForHighestPlayer +
      "<br><br>" +
      scoreBoard +
      "<br>" +
      cumulativeWins +
      "Press submit to play another round! To restart the game with a new set of players, hit the refresh button!";
    return myOutputValue;
  }

  // // if user enters 'restart', reset gameMode to GAME_MODE_WELCOME
  // if (input == "restart" && gameMode == GAME_MODE_START_GAME) {
  //   gameMode = GAME_MODE_WELCOME;
  //   resetGame();
  //   return "You have chosen to restart the game. Press submit for the next step";
  // }
};
