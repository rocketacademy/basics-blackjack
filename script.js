// Create game states
// 0 - Number of Players
// 1 - Name of Players
// 2 - Bet of Players
// 3 - Players to Play the Game
// 4 - Dealer to Play the Game
var gameState = 0;

// Create global variables required for card game
var currentPlayer = 1;
var numPlayers = 1;
var globalDeck;
var playerStatus;

// Create card deck - an array with objects as entries.
// Attributes are rank, suit, suit icon, name.
var createDeck = function () {
  var cardDeck = [];
  var suits = [`Hearts`, `Diamond`, `Clubs`, `Spade`];
  var suitIcons = [`♥`, `♦`, `♣`, `♠`];
  var name = [
    `Ace`,
    `Two`,
    `Three`,
    `Four`,
    `Five`,
    `Six`,
    `Seven`,
    `Eight`,
    `Nine`,
    `Ten`,
    `Jack`,
    `Queen`,
    `King`,
  ];
  for (suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    var currentSuit = suits[suitIndex];
    var currentIcon = suitIcons[suitIndex];
    for (rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      var currentRank = rankCounter;
      var currentName = name[rankCounter - 1];
      if (rankCounter == 1) {
        var currentValue = 11;
      } else {
        var currentValue = Math.min(currentRank, 10);
      }
      var card = {
        rank: currentRank,
        suit: currentSuit,
        suitIcon: currentIcon,
        name: currentName,
        value: currentValue,
      };
      cardDeck.push(card);
    }
  }
  globalDeck = cardDeck;
  return cardDeck;
};

// Create player profile - an array with objects as entries.
// Takes in an argument specifying the number of players in the game.
// Attributes are name, credits, current hand and bet.
var createPlayers = function (numPlayers) {
  var outputArray = [];
  for (playerIndex = 1; playerIndex <= numPlayers; playerIndex += 1) {
    var playerName = "Player " + playerIndex;
    var playerCredits = 100;
    var currentHand = [];
    var player = {
      name: playerName,
      credits: playerCredits,
      hand: currentHand,
      bet: 0,
      score: [0],
      blackjack: false,
    };
    outputArray.push(player);
  }
  playerStatus = outputArray;
  return outputArray;
};

// Create dealer profile
// Attributes are name, credits and current hand.
var dealerStatus = { name: "Dealer", credits: 1000, hand: [], score: 0 };

// Create a helper function to generate a random number from 0 to N-1
var randomNumber = function (N) {
  var outputValue = Math.floor(Math.random() * N);
  return outputValue;
};

// Create a helper function to shuffle an array
var shuffleDeck = function (deck) {
  for (deckIndex = 0; deckIndex < deck.length; deckIndex += 1) {
    var currentCard = deck[deckIndex];
    var randomIndex = randomNumber(deck.length);
    var randomCard = deck[randomIndex];
    deck[deckIndex] = randomCard;
    deck[randomIndex] = currentCard;
  }
  return deck;
};

// Create a helper function to deal cards
var dealCards = function () {
  for (playerIndex = 0; playerIndex < numPlayers; playerIndex += 1) {
    var cardOne = globalDeck.pop();
    var cardTwo = globalDeck.pop();
    playerStatus[playerIndex].hand.push([cardOne, cardTwo]);
  }
  var cardOne = globalDeck.pop();
  var cardTwo = globalDeck.pop();
  dealerStatus.hand.push(cardOne, cardTwo);
};

// Initiate start of blackjack game
var initiateGame = function () {
  globalDeck = createDeck();
  globalDeck = shuffleDeck(globalDeck);
  dealCards();
};

// Create a helper function to update game state and do necessary actions in between states.
var updateGameState = function () {
  if (gameState < 4) {
    gameState += 1;
  } else {
    gameState = 2;
  }
  if (gameState == 3) {
    initiateGame();
  }
};

// Create helper function to update current player (and game state, if applicable)
// Only to be used in game states 1, 2 and 3
var updatePlayer = function () {
  if (currentPlayer < numPlayers) {
    currentPlayer += 1;
  } else {
    currentPlayer = 1;
    updateGameState();
  }
};

// Create a helper function to set number of players
var setNumPlayer = function (input) {
  if (Number.isInteger(Number(input))) {
    input = Number(input);
    numPlayers = input;
    var outputValue = `The game shall be initialised for ${numPlayers} players.`;
    createPlayers(numPlayers);
    updateGameState();
    return outputValue;
  } else {
    var outputValue = `Sorry that is an invalid input for number of players. Please input an integer.`;
    return outputValue;
  }
};

// Create a helper function to set names.
var setName = function (input) {
  playerStatus[currentPlayer - 1].name = input;
  var outputValue = `Welcome to the game, ${input}! Good luck!`;
  updatePlayer();
  return outputValue;
};

// Create a helper function to set bets
var setBet = function (input) {
  var currentPlayerName = playerStatus[currentPlayer - 1].name;
  if (
    Number.isInteger(Number(input)) &&
    Number(input) <= playerStatus[currentPlayer - 1].credits
  ) {
    input = Number(input);
    playerStatus[currentPlayer - 1].bet = input;
    playerStatus[currentPlayer - 1].credits -= input;
    console.log("Bet:" + playerStatus[currentPlayer - 1].bet);
    console.log("Credits:" + playerStatus[currentPlayer - 1].credits);
    var outputValue = `${currentPlayerName} has placed a bet of $${input}. <br>${currentPlayerName} currently has $${
      playerStatus[currentPlayer - 1].credits
    } in remaining credits. <br>Good Luck!`;
    updatePlayer();
    return outputValue;
  } else {
    var outputValue = `Sorry ${currentPlayerName}, this is an invalid input. Please input an integer and ensure that you have sufficient credit to place this bet. <br><br>You currently have $${
      playerStatus[currentPlayer - 1].credits
    } in credits.`;
    return outputValue;
  }
};

// Create a helper function to check value of a hand
var checkHandValue = function (hand) {
  var numberAces = 0;
  var currentValue = 0;
  for (cardIndex = 0; cardIndex < hand.length; cardIndex += 1) {
    if (hand[cardIndex].name == "Ace") {
      numberAces += 1;
    } else {
      currentValue += hand[cardIndex].value;
    }
  }
  // Decide on the value of the Ace
  if (numberAces > 0) {
    for (counter = 1; counter <= numberAces; counter += 1) {
      if (currentValue > 11 - numberAces) {
        currentValue += 1;
      } else {
        currentValue += 11;
      }
    }
  }
  return currentValue;
};

// Create a boolean helper function to check blackjack of a current hand
var checkBlackJack = function (hand) {
  var currentValue = checkHandValue(hand);
  if (currentValue == 21) {
    return true;
  } else {
    return false;
  }
};

// Create a boolean helper function to check if a hand has burst
var checkBurst = function (hand) {
  var currentValue = checkHandValue(hand);
  if (currentValue > 21) {
    return true;
  } else {
    return false;
  }
};

// Create a helper function to do actions if part/all of the current players' hand burst
var burstPlayer = function (handsIndex = "All") {
  var playerName = playerStatus[currentPlayer - 1].name;
  if (handsIndex != "All") {
    var outputValue = `<br>Bad luck, ${playerName}. 😥<br> Hand ${
      handsIndex + 1
    } has burst with the draw.`;
  } else {
    var outputValue = `<br><br>Unfortunate, ${playerName}. 🤯 As all your hands have burst, the dealer will automatically end your turn. Better luck next time.<br><br>`;
    updatePlayer();
    if (gameState == 3) {
      var playerName = playerStatus[currentPlayer - 1].name;
      outputValue += `${playerName} is next up. Click "Submit" to see your cards and decide on your options.`;
    } else {
      outputValue += `This is the end of the player phase of the game. Click "Submit" to see the outcome of the dealers turn.`;
    }
  }
  return outputValue;
};

// Create a helper function to hit current player. User has to indicate the hand to hit, e.g. Hand 1 or Hand 2 if current player has split the initial deal
var hitPlayer = function (handNumber = 0) {
  var hands = playerStatus[currentPlayer - 1].hand;
  var name = playerStatus[currentPlayer - 1].name;
  var numberHands = hands.length;
  var burstCounter = 0;

  // Write logic to hit player
  if (handNumber == 0) {
    for (counter = 0; counter < hands.length; counter += 1) {
      var newCard = globalDeck.pop();
      playerStatus[currentPlayer - 1].hand[counter].push(newCard);
    }
  } else if (handNumber <= playerStatus[currentPlayer - 1].hand.length) {
    var newCard = globalDeck.pop();
    playerStatus[currentPlayer - 1].hand[handNumber - 1].push(newCard);
  } else {
    return `Invalid input. You do not have the hand number index indicated.`;
  }

  // Write logic to check output, display current hands and check on burst.
  var outputValue = `After hitting, ${name} has the following hands:`;
  for (handsIndex = 0; handsIndex < hands.length; handsIndex += 1) {
    outputValue += `<br><b>Hand ${handsIndex + 1}:</b>`;
    for (handIndex = 0; handIndex < hands[handsIndex].length; handIndex += 1) {
      var card = hands[handsIndex][handIndex];
      outputValue += ` ${card.name} of ${card.suit}${card.suitIcon} |`;
    }
    if (checkBurst(hands[handsIndex]) == true) {
      burstCounter += 1;
      outputValue += burstPlayer(handsIndex);
    }
  }

  // Write logic in case of all hands bursting and ending the players turn.
  if (burstCounter == numberHands) {
    outputValue += burstPlayer();
  }

  return outputValue;
};

// Create a helper function to split the initial deal for current player. Bet is assumed to be doubled per original bet, i.e. original bet on each split hand.
var splitPlayer = function () {
  // Write logic to remove credit from player for the bet
  playerStatus[currentPlayer - 1].credits -=
    playerStatus[currentPlayer - 1].bet;

  // Write logic to do the card split
  var splitCard = playerStatus[currentPlayer - 1].hand[0].pop();
  playerStatus[currentPlayer - 1].hand.push([splitCard]);
  playerStatus[currentPlayer - 1].score.push(0);

  // Write logic to distribute additional card to each split
  for (counter = 0; counter < 2; counter += 1) {
    var newCard = globalDeck.pop();
    playerStatus[currentPlayer - 1].hand[counter].push(newCard);
  }

  // Write logic to check output and display current hands.
  var hands = playerStatus[currentPlayer - 1].hand;
  var name = playerStatus[currentPlayer - 1].name;
  var outputValue = `After splitting, ${name} has the following hands:`;
  for (handsIndex = 0; handsIndex < hands.length; handsIndex += 1) {
    outputValue += `<br><b>Hand ${handsIndex + 1}:</b>`;
    for (handIndex = 0; handIndex < hands[handsIndex].length; handIndex += 1) {
      var card = hands[handsIndex][handIndex];
      outputValue += ` ${card.name} of ${card.suit}${card.suitIcon} |`;
    }
  }
  return outputValue;
};

// Create a boolean helper function if current player is eligible to split
var splitEligibility = function () {
  var hand = playerStatus[currentPlayer - 1].hand;
  if (
    hand.length == 1 &&
    hand[0][0].rank == hand[0][1].rank &&
    playerStatus[currentPlayer - 1].bet <=
      playerStatus[currentPlayer - 1].credits
  ) {
    return true;
  } else {
    return false;
  }
};

// Create a helper function to carry out actions if a player stands/ends turn
var standPlayer = function () {
  var hands = playerStatus[currentPlayer - 1].hand;
  var playerName = playerStatus[currentPlayer - 1].name;
  var bet = playerStatus[currentPlayer - 1].bet;
  outputValue = `Your turn has ended, ${playerName}. Your current bet and score is as follows:<br><b>Bet:</b> $${bet}<br>`;
  for (handIndex = 0; handIndex < hands.length; handIndex += 1) {
    console.log(handIndex);
    var currentScore = checkHandValue(hands[handIndex]);
    console.log(`Current Score: ${currentScore}`);
    console.log(handIndex);
    playerStatus[currentPlayer - 1].score[handIndex] = currentScore;
    console.log(handIndex);
    outputValue += `<b>Hand ${handIndex + 1}</b>: ${currentScore}<br>`;
  }
  updatePlayer();
  if (gameState == 3) {
    var playerName = playerStatus[currentPlayer - 1].name;
    outputValue += `${playerName} is next up. Click "Submit" to see your cards and decide on your options.`;
  } else {
    outputValue += `This is the end of the player phase of the game. Click "Submit" to see the outcome of the dealers turn.`;
  }
  return outputValue;
};

// Create a helper function to display current players cards and available options
var displayPlayer = function () {
  var name = playerStatus[currentPlayer - 1].name;
  var hands = playerStatus[currentPlayer - 1].hand;
  var bet = playerStatus[currentPlayer - 1].bet;
  var credit = playerStatus[currentPlayer - 1].credits;

  var outputValue = `${name}, its your turn! You have placed a bet of ${bet}, with a remaining credit of $${credit}. Your hand is displayed below.`;

  for (handsIndex = 0; handsIndex < hands.length; handsIndex += 1) {
    outputValue += `<br><b>Hand ${handsIndex + 1}:</b>`;
    for (handIndex = 0; handIndex < hands[handsIndex].length; handIndex += 1) {
      var card = hands[handsIndex][handIndex];
      outputValue += ` ${card.name} of ${card.suit}${card.suitIcon} |`;
    }
  }

  // Check for potential blackjack condition and/or display available actions to player
  if (hands.length == 1) {
    if (checkBlackJack(hands[0]) == true) {
      outputValue += `Congratulations, you have hit blackjack! 🤑🤑🤑<br><br>`;
      playerStatus[currentPlayer - 1].blackjack = true;
      playerStatus[currentPlayer - 1].score[0] = 21;

      updatePlayer();
      if (gameState == 3) {
        var playerName = playerStatus[currentPlayer - 1].name;
        outputValue += `${playerName} is next up. Click "Submit" to see your cards and decide on your options.`;
      } else {
        outputValue += `This is the end of the player phase of the game. Click "Submit" to see the outcome of the dealers turn.`;
      }
      return outputValue;
    }
  }

  outputValue += `<br><br>You may input your desired action in the input field and click submit. Valid inputs are as follows:<br>
  "Hit" - Draw a card for ALL hands.<br>
  "Hit N" - Draw a card for hand N.<br>
  "Stand" - End your turn once you are satisfied with your card.`;

  if (splitEligibility() == true) {
    outputValue += `"Split" - Split your current identical cards into two seperate hands. This will draw one card for each hand and apply your original bet to each hand.`;
  }

  return outputValue;
};

// Create a helper function for player actions
var playerState = function (input = "") {
  console.log(input);
  var outputValue = `Sorry your input is invalid. `;

  if (input == "") {
    return displayPlayer();
  } else if (input == "Stand") {
    return standPlayer();
  } else if (input.includes("Hit")) {
    var inputList = input.split(" ");
    if (inputList.length == 2) {
      if (Number.isInteger(Number(inputList[1]))) {
        return hitPlayer(Number(inputList[1]));
      }
    } else if (inputList.length == 1 && inputList[0] == "Hit") {
      return hitPlayer();
    }
  } else if (input == "Split") {
    if (splitEligibility() == true) {
      return splitPlayer();
    } else {
      outputValue += "You are unable to split with your current hand.";
      return outputValue;
    }
  }

  // Output if invalid
  outputValue += `Valid inputs are as follows:<br>
  "Hit" - Draw a card for ALL hands.<br>
  "Hit N" - Draw a card for hand N.<br>
  "Stand" - End your turn once you are satisfied with your card.`;

  if (splitEligibility() == true) {
    outputValue += `"Split" - Split your current identical cards into two seperate hands. This will draw one card for each hand and apply your original bet to each hand.`;
  }

  return outputValue;
};

// Create a helper function for dealer actions
var dealerActions = function () {
  var dealerHand = dealerStatus.hand;
  var currentScore = checkHandValue(dealerHand);
  while (currentScore < 17) {
    var newCard = globalDeck.pop();
    dealerStatus.hand.push(newCard);
    currentScore = checkHandValue(dealerStatus.hand);
  }
  if (currentScore > 21) {
    dealerStatus.score = 0;
  } else {
    dealerStatus.score = currentScore;
  }

  // Display dealer cards

  var outputValue = "The dealers cards are as follows:<br>";
  dealerHand = dealerStatus.hand;

  for (counter = 0; counter < dealerHand.length; counter += 1) {
    outputValue += `${dealerHand[counter].name} of ${dealerHand[counter].suit} ${dealerHand[counter].suitIcon} | `;
  }

  return outputValue;
};

// Create a helper function for dealer state
var dealerState = function (input) {
  var outputValue = dealerActions();
  var dealerScore = dealerStatus.score;
  outputValue += `<br><br>Here is the results of the rounds:<br>`;
  // Count player scores, reset player hands
  for (playerIndex = 0; playerIndex < numPlayers; playerIndex += 1) {
    var playerHand = playerStatus[playerIndex].hand;
    var playerName = playerStatus[playerIndex].name;
    var playerBet = playerStatus[playerIndex].bet;
    var playerScore = playerStatus[playerIndex].score;
    var playerBlackjack = playerStatus.blackjack;

    outputValue += `<b>${playerName}:</b> <br> `;
    for (handIndex = 0; handIndex < playerHand.length; handIndex += 1) {
      var handScore = playerScore[handIndex];
      outputValue += `Hand ${handIndex + 1}: ${handScore}; <br> `;

      if (playerBlackjack == true) {
        playerStatus[playerIndex].credits += playerBet * 3;
        outputValue += `With a bet of $${playerBet}, you have won $${
          playerBet * 2
        }. You have a remaining credit of $${
          playerStatus[playerIndex].credits
        }<br>`;
      } else if (handScore > dealerScore) {
        playerStatus[playerIndex].credits += playerBet * 2;
        outputValue += `With a bet of $${playerBet}, you have won $${playerBet}. You have a remaining credit of $${playerStatus[playerIndex].credits}<br>`;
      } else if (handScore == dealerScore) {
        playerStatus[playerIndex].credits += playerBet;
        outputValue += `You have drawn with the dealer. You have a remaining credit of $${playerStatus[playerIndex].credits}<br>`;
      } else {
        outputValue += `You have lost this hand. You have a remaining credit of $${playerStatus[playerIndex].credits}<br>`;
      }
    }
    playerStatus[playerIndex].score = [0];
    playerStatus[playerIndex].bet = 0;
    playerStatus[playerIndex].hand = [];
    playerStatus[playerIndex].blackjack = false;
    outputValue += "-------------------------------------<br><br>";
  }
  // Reset Banker hands
  dealerStatus.hand = [];
  dealerStatus.score = 0;
  currentPlayer = 1;
  gameState = 2;

  outputValue += `We will now return to the betting phase to play another game.`;
  return outputValue;
};

// Main Function
// Note: To add transition from betting to player 1's turn.
var main = function (input) {
  if (gameState == 0) {
    return setNumPlayer(input);
  } else if (gameState == 1) {
    return setName(input);
  } else if (gameState == 2) {
    return setBet(input);
  } else if (gameState == 3) {
    return playerState(input);
  } else if (gameState == 4) {
    return dealerState(input);
  }
};

// Create a helper function to update state
var textUpdate = function () {
  if (gameState == 0) {
    return `Input Number of Players:`;
  } else if (gameState == 1) {
    return `Input the Name of Player ${currentPlayer}:`;
  } else if (gameState == 2) {
    return `Input the Bet for ${playerStatus[currentPlayer - 1].name}:`;
  } else if (gameState == 3) {
    return `Input Blackjack Action for ${
      playerStatus[currentPlayer - 1].name
    }:`;
  } else if (gameState == 4) {
    return `Results of Game Displayed:`;
  }
};
