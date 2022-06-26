//FUNCTION 1 - Create deck.
var makeDeck = function () {
  var cardDeck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var emoji = ["♥️", "♦️", "♣️", "♠️"];

  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var currentEmoji = emoji[suitIndex];

    var cardCounter = 1;

    while (cardCounter <= 13) {
      // By default, the card name is the same as cardCounter
      // By default, card rank is the same as cardCounter.
      var cardName = cardCounter;
      var cardRank = cardCounter;

      // If counter is 1, 11, 12, or 13, set cardName to the ace or face card's name
      // Also set card rank for ace to 11, jack/queen/king to 10.
      // Let default card rank for ace to be 11, so that we can identify if anyone has ace later by sorting array, and also if score > 21 when ace is 11, we can allow ace to be 1 so that the score can be decreased below 21.
      if (cardName == 1) {
        cardName = "Ace";
        cardRank = 11;
      } else if (cardName == 11) {
        cardName = "Jack";
        cardRank = 10;
      } else if (cardName == 12) {
        cardName = "Queen";
        cardRank = 10;
      } else if (cardName == 13) {
        cardName = "King";
        cardRank = 10;
      }

      // Create a new card with the current name, suit, emoji and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: cardRank,
        emoji: currentEmoji,
      };

      // Add the new card to the deck
      cardDeck.push(card);

      cardCounter += 1;
    }

    suitIndex += 1;
  }

  return cardDeck;
};

//FUNCTION 2 - Shuffle deck.
// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
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

//FUNCTION 3a - DRAW HAND. i.e. Pop 2 initial cards from deck and store in array of playercard or computercard (whichever is applicable).
var drawHand = function (shuffledDeck, cardArray) {
  var initialCard1 = shuffledDeck.pop();
  var initialCard2 = shuffledDeck.pop();
  cardArray.push(initialCard1);
  cardArray.push(initialCard2);

  return cardArray;
};

//FUNCTION 3b - DRAW CARD. i.e. pop 1 card every time either player or computer has to HIT (draw a card). Then store into respective array.
var drawCard = function (shuffledDeck, cardArray) {
  var cardDrawn = shuffledDeck.pop();
  cardArray.push(cardDrawn);

  return cardArray;
};

//FUNCTION 4 -Calculate score of current array.
//FUNCTION 4A - Create function to compare ranks of objects in array, with largest put before smallest.
var sortFromLargest = function compare(a, b) {
  if (a.rank > b.rank) {
    return -1;
  }
  if (a.rank < b.rank) {
    return 1;
  }
  return 0;
};

//FUNCTION 4B - Create function to sort current array from largest to smallest.
//Create outer loop to sum up each card rank of card array as their default values. Ace = 11.
//Store summed up value as initial score variable.
//If initial score sum is <21, exit outer loop, return initial score.

//If initial score sum is >21, create inner loop to detect if there is ace (or aces) within the card array.
//If there is ace within card array, minus 10 to give ace a value of 1. Store as final score. See if final score <=21. If still more, repeat loop.
//Until there is no more ace left and final score sum is still more than 21, OR the final score sum is less than 21.
//Exit inner loop, return final score. Exit outer loop.

//If initial score sum is >21, but there is no ace within card array, exit inner loop, make final score = initial score. Return final score. Exit outer loop.
var calculateScore = function (cardArray) {
  var sortedCardArray = cardArray.sort(sortFromLargest);
  var currentInitialScore = 0;
  var currentFinalScore = 0;
  console.log(sortedCardArray);
  var i = 0;
  while (i < sortedCardArray.length) {
    currentInitialScore += sortedCardArray[i].rank;
    i += 1;
  }
  console.log(currentInitialScore);
  if (currentInitialScore > 21) {
    currentFinalScore = currentInitialScore;
    var j = 0;
    while (j < sortedCardArray.length) {
      if (sortedCardArray[j].rank == 11 && currentFinalScore > 21) {
        currentFinalScore -= 10;
        j += 1;
      } else if (sortedCardArray[j].rank < 11) {
        currentFinalScore = currentInitialScore;
      }
      return currentFinalScore;
    }
  } else return currentInitialScore;
};

//FUNCTION 5 - Create loop to provide the result sentence for n number of cards drawn. To display each card's attributes within the array.
var outputResult = function (cardArray) {
  var output = "";
  var k = 0;
  while (k < cardArray.length) {
    if (k == cardArray.length - 1) {
      output += `and ${cardArray[k].name} ${cardArray[k].emoji}`;
    } else output += `${cardArray[k].name} ${cardArray[k].emoji}, `;

    k += 1;
  }
  return output;
};

//FUNCTION 6 FOR MULTIPLAYER - Create loop to show all players' final hands at the end of the round when win/lose/tie is determined.
//Info taken from global variable allplayercard array.
//Outer loop is for player 1 to n.
//Inner loop is for cards 1 to n for each player.
//Extract out attributes of each card as result string.
var showAllPlayerHands = function (numberOfPlayers) {
  var playerCounter = 0;
  var result = "";
  while (playerCounter < numberOfPlayers) {
    var innerCardCounter = 0;
    while (innerCardCounter < allPlayerCardArray[playerCounter].length) {
      if (innerCardCounter == 0) {
        result +=
          "Player " +
          String(Number(playerCounter + 1)) +
          ": " +
          String(allPlayerCardArray[playerCounter][innerCardCounter].name) +
          String(allPlayerCardArray[playerCounter][innerCardCounter].emoji) +
          ", ";
      } else if (
        innerCardCounter + 1 ==
        allPlayerCardArray[playerCounter].length
      ) {
        result +=
          "& " +
          String(allPlayerCardArray[playerCounter][innerCardCounter].name) +
          String(allPlayerCardArray[playerCounter][innerCardCounter].emoji) +
          ".<br>";
      } else {
        result +=
          String(allPlayerCardArray[playerCounter][innerCardCounter].name) +
          String(allPlayerCardArray[playerCounter][innerCardCounter].emoji) +
          ", ";
      }
      innerCardCounter += 1;
    }
    playerCounter += 1;
  }
  return result;
};

//FUNCTION 7 FOR MULTIPLAYER BETTING - Create loop to show all players' coins at the end of the round when win/lose/tie is determined.
var showAllPlayerCoins = function (numberOfPlayers) {
  var playerCounter = 0;
  var result = "";
  while (playerCounter < numberOfPlayers) {
    result +=
      "Player " +
      String(Number(playerCounter + 1)) +
      ": " +
      allPlayerCoins[playerCounter] +
      " coins <br>";
    playerCounter += 1;
  }
  return result;
};

//GLOBAL VARIABLES.
//Global game stage.
//Player card array and computer card array.
//Player score and computer score.
//Shuffled deck created.
var currentGameStage = "waiting for number of players";
var shuffledDeck = shuffleCards(makeDeck());
var playerCardArray = [];
var computerCardArray = [];
var playerCurrentScore = 0;
var computerCurrentScore = 0;
var myOutputValue = ``;
//For MULTIPLAYER: number of players, all player cards, all player scores, current player.
var numberOfPlayers = 0;
var allPlayerCardArray = [];
var allPlayerScoreArray = [];
var currentPlayer = 1;
//For BETTING: all player coins, all player bets.
var allPlayerCoins = [];
var allPlayerBets = [];
//FOR GIF OUTPUTS
var myHitOrStandImage =
  '<img src="https://c.tenor.com/tzJXjXSW7I4AAAAC/miyuki-miyuki-shirogane.gif" />';
var myPlayerBustImage =
  '<img src="https://c.tenor.com/OlB9hb8iBOIAAAAC/kaguya-sama-love-is-war-kaguya-sama.gif" />';
var myComputerTurnImage =
  '<img src="https://c.tenor.com/jmzhEvYQG6EAAAAC/shirogane-miyuki.gif" />';
var myLoseImage =
  '<img src="https://c.tenor.com/U1Uw6JT3_UcAAAAd/kaguya-kaguya-sama.gif" />';
var myTieImage =
  '<img src="https://c.tenor.com/dM4ts2v4ahoAAAAC/o-kawaii-koto-thinking.gif" />';
var myWinImage =
  '<img src="https://c.tenor.com/DFiy9xMYmPwAAAAC/happy-kaguya.gif" />';
var myComputerBustImage =
  '<img src="https://c.tenor.com/Y492NC5j5LIAAAAd/kaguya-kaguya-sama-love-is-war.gif" />';
var myPlayerBankruptImage =
  '<img src="https://c.tenor.com/shqkQ-_efj4AAAAC/kaguya-kaguya-sama.gif" />';

//FUNCTION 8 - create 100 coins per player at the start of the game.
//Betting rules: if one player goes to 0, game ends.
//Need to create betting game stage after users have been input, to say how much each person wants to bet. Player input and create coins at same time.
//If user gets 21 in 2 cards (ace + 10/jack/queen/king), 1.5 times amount bet received.
//At the end of each round, loop to calculate number of coins and see if anyone reaches 0. Reach 0 = game ends.
var createCoins = function (numberOfPlayers) {
  var playerCoinCounter = 0;
  while (playerCoinCounter < numberOfPlayers) {
    allPlayerCoins.push(100);
    playerCoinCounter += 1;
  }
};

//FUNCTION 9A - Preparation for hit/stand buttons.
//If player choose hit, draw 1 card with Function 3b, calculate current score with Function 4b.
//Let player know their current hand and current score.
//If current score after drawing is > 21, force end player turn and start next player turn. Push final hand into global all player card array. Push final score into global all player score array. Shift to next player turn stage.
//If current score after drawing is <=21, retain game stage. Player can choose again.
var playerHit = function () {
  drawCard(shuffledDeck, playerCardArray);
  playerCurrentScore = calculateScore(playerCardArray);
  var playerSentence = outputResult(playerCardArray);
  if (playerCurrentScore > 21) {
    allPlayerCardArray.push(playerCardArray);
    console.log(allPlayerCardArray);
    allPlayerScoreArray.push(playerCurrentScore);
    myOutputValue = `Too bad, you have bust!<br>${myPlayerBustImage}<br><br> Your hand is ${playerSentence}. <br> Your current hand score is ${playerCurrentScore}.<br><br> Your turn ends. Click "submit" to continue. `;
    currentGameStage = "next player turn";
  } else if (playerCurrentScore <= 21) {
    myOutputValue = `You have drawn ${playerSentence}. <br> Your current hand score is ${playerCurrentScore}.<br><br> Computer has drawn ${computerCardArray[0].name} ${computerCardArray[0].emoji} as their first card. <br><br> If you want to draw another card, submit "hit". <br><b>OR</b><br> If you are satisfied with your cards, submit "stand" to end your turn. <br><br> ${myHitOrStandImage}`;
    currentGameStage = "player hit or stand";
  }
};

//FUNCTION 9B - Preparation for hit/stand buttons.
//If player choose stand, end player turn. Push final hand into global all player card array. Push final score into global all player score array. Change game stage to next player turn stage.
var playerStand = function () {
  myOutputValue = `Your turn ends. Click "submit" to continue.`;
  allPlayerCardArray.push(playerCardArray);
  console.log(allPlayerCardArray);
  allPlayerScoreArray.push(playerCurrentScore);
  currentGameStage = "next player turn";
};

//MAIN FUNCTION - PLAY GAME & CHANGE GAME STAGES.
var main = function (input) {
  //Ask players to key in how many players in the game.
  //Shift to confirming how many players.
  if (currentGameStage == "waiting for number of players") {
    myOutputValue = `Please type in how many players there are.`;
    currentGameStage = "number of players confirmed";
  }

  //Store input as number of players.
  //Call FUNCTION 8 to create coins for n players.
  //Shift to betting stage. Explain to players they will each receive 100 coins.
  else if (currentGameStage == "number of players confirmed") {
    if (Number.isNaN(Number(input)) || input == "") {
      myOutputValue = `Please enter a number.`;
    } else {
      numberOfPlayers = input;
      createCoins(numberOfPlayers);
      myOutputValue = `${input} player(s) registered. <br><br> You may place your bets next. <br> Each player starts with 100 coins. <br><br> `;
      currentGameStage = "wait for betting turn";
    }
  }

  //Give a intermediate stage for players to start entering bets.
  //This is to loop back later at the end of the round, to restart a new round if all players' coins are more than 0.
  //Ask player 1 to enter bet.
  //Shift to betting turn stage.
  else if (currentGameStage == "wait for betting turn") {
    myOutputValue = `Player 1 please enter the amount of coins you want to bet for this round.`;
    currentGameStage = "player betting turn";
  }

  //Create loop for n players to enter their bets respectively.
  //Bets are stored in global variable for all bets.
  //After the n th player finishes betting, change the output message and change stage to computer dealt cards.
  else if (currentGameStage == "player betting turn") {
    if (
      Number.isNaN(Number(input)) ||
      input == "" ||
      input > allPlayerCoins[currentPlayer - 1]
    ) {
      myOutputValue = `Please enter a valid number not more than your number of coins..`;
    } else {
      if (currentPlayer < numberOfPlayers) {
        allPlayerBets.push(input);
        myOutputValue = `Player ${
          currentPlayer + 1
        } please enter the amount of coins you want to bet for this round. `;
        currentPlayer += 1;
      } else if (currentPlayer == numberOfPlayers) {
        allPlayerBets.push(input);
        myOutputValue = `All bets have been placed! <br><br> Please click submit to start the game. `;
        currentGameStage = "computer dealt cards turn";
        currentPlayer = 1;
      }
    }
  }

  //Run FUNCTION 3a and 4B for the computer dealt hand. Store computer current score and drawn hand into global variables.
  //Change game state to waiting for game to start.
  else if (currentGameStage == "computer dealt cards turn") {
    drawHand(shuffledDeck, computerCardArray);
    computerCurrentScore = calculateScore(computerCardArray);
    console.log(allPlayerBets);
    myOutputValue = `Computer dealer has been dealt his cards. Please click submit to continue.`;
    currentGameStage = "waiting for game to start";
  }

  //Let current player know what will happen.
  //Change game stage to player draw turn.
  else if (currentGameStage == "waiting for game to start") {
    myOutputValue = `Welcome Player ${currentPlayer}. You will be given two cards by the computer dealer.`;
    currentGameStage = "player draw turn";
  }

  //At player draw turn stage, let player know what hand is dealt, and current score of player.
  //Use FUNCTIOn 3a and 4B.
  //Pop 2 cards for player, store cards in global array. Store score in global variable.
  //Ask player to choose to hit or stand.
  //Change game stage to player choose hit or stand.
  else if (currentGameStage == "player draw turn") {
    var playerHandDrawn = drawHand(shuffledDeck, playerCardArray);

    console.log(playerHandDrawn);
    playerCurrentScore = calculateScore(playerCardArray);
    var playerSentence = outputResult(playerCardArray);

    myOutputValue = `Hi Player ${currentPlayer}. You have drawn ${playerSentence}. <br> Your initial hand gives a score of ${playerCurrentScore}. <br><br> Computer has drawn ${computerCardArray[0].name} ${computerCardArray[0].emoji} as their first card. <br><br> If you want to draw another card, submit "hit". <br><b>OR</b><br> If you are satisfied with your cards, submit "stand" to end your turn. <br><br> ${myHitOrStandImage}`;
    currentGameStage = "player hit or stand";
  }

  //At player choose hit or stand stage.
  //If player choose hit, run FUNCTION 9A.
  //If player choose stand, run FUNCTION 9B.
  //If player choose anything else, invalidate their input.
  else if (currentGameStage == "player hit or stand") {
    if (input == "hit") {
      playerHit();
    } else if (input == "stand") {
      playerStand();
    } else
      myOutputValue = `Please enter a valid option "hit" or "stand" to continue.`;
  }

  //At next player game stage.
  //This game stage is for intermediate stage between each player to change control.
  //Reset global variables player card array and player current score.
  //Once ready, click submit & change to waiting for game to start stage, for next player.
  //If n th player has finished, change game stage to computer turn.
  else if (currentGameStage == "next player turn") {
    playerCardArray = [];
    playerCurrentScore = 0;
    currentPlayer += 1;
    if (currentPlayer <= numberOfPlayers) {
      myOutputValue = `Please pass the control to Player ${currentPlayer} and click "submit".`;
      currentGameStage = "waiting for game to start";
    } else if (currentPlayer > numberOfPlayers) {
      myOutputValue = `The computer dealer will go next. Please click "submit" to continue.`;
      currentGameStage = "computer turn";
    }
  }

  //At computer turn stage.
  //If computer initial hand score is < 17, draw card. Run Function 3b to draw 1 card, run Function 4b to calculate score.
  //Keep doing above action till score >= 17.
  //If computer hand score >=17, exit turn.
  //Change game stage to compare score stage.
  else if (currentGameStage == "computer turn") {
    if (computerCurrentScore < 17) {
      myOutputValue = `The computer dealer will draw cards as he has less than 17. <br> ${myComputerTurnImage} <br>Click "submit" to continue.`;
      while (computerCurrentScore < 17) {
        drawCard(shuffledDeck, computerCardArray);
        computerCurrentScore = calculateScore(computerCardArray);
      }
    } else
      myOutputValue = `Computer dealer turn has ended. Click "submit" to find out the winner!`;
    currentGameStage = "compare scores";
  }

  //At compare score stage.
  //Rules for player winning = player <= 21 and more than computer score, or computer score > 21 and player <=21
  //Rules for player losing = player > 21 and computer <=21,  or player < computer score and computer score <=21
  //Otherwise, tie.
  //First see if computer > 21 or less than 21.
  //If computer > 21, run loop to determine outcome of each player. Player can either win or tie. Assign coins according to bets made and outcome. Start creating output sentences for each player, with outcome and score.
  //If computer <=21, run loop to determine outcome of each player. Player can win, lose or tie. Assign coins according to bets made and outcome. Start creating output sentences for each player, with outcome and score.
  else if (currentGameStage == "compare scores") {
    //Create output sentence for computer's cards in computer hand.
    var computerSentence = outputResult(computerCardArray);
    myOutputValue = "";
    if (computerCurrentScore > 21) {
      var z = 1;
      while (z <= numberOfPlayers) {
        if (allPlayerScoreArray[z - 1] <= 21) {
          if (
            allPlayerScoreArray[z - 1] == 21 &&
            allPlayerCardArray[z - 1].length == 2
          ) {
            allPlayerCoins[z - 1] += Number(allPlayerBets[z - 1]) * 1.5;
          } else {
            allPlayerCoins[z - 1] += Number(allPlayerBets[z - 1]);
          }
          myOutputValue += `Player ${z} wins! <br> ${myWinImage} <br> Your score is ${
            allPlayerScoreArray[z - 1]
          } and you are closer to 21 than the dealer is! <br><br><br>  `;
        } else if (allPlayerScoreArray[z - 1] > 21) {
          allPlayerCoins[z - 1] += 0;
          myOutputValue += `Player ${z} ties! <br> ${myTieImage} <br> Your score is ${
            allPlayerScoreArray[z - 1]
          }. <br><br><br>`;
        }
        z += 1;
      }
    } else if (computerCurrentScore <= 21) {
      var z = 1;
      while (z <= numberOfPlayers) {
        if (
          allPlayerScoreArray[z - 1] <= 21 &&
          allPlayerScoreArray[z - 1] > computerCurrentScore
        ) {
          if (
            allPlayerScoreArray[z - 1] == 21 &&
            allPlayerCardArray[z - 1].length == 2
          ) {
            allPlayerCoins[z - 1] += Number(allPlayerBets[z - 1]) * 1.5;
          } else {
            allPlayerCoins[z - 1] += Number(allPlayerBets[z - 1]);
          }
          myOutputValue += `Player ${z} wins! <br> ${myWinImage} <br> Your score is ${
            allPlayerScoreArray[z - 1]
          } and you are closer to 21 than the dealer is!  <br><br><br>`;
        } else if (allPlayerScoreArray[z - 1] == computerCurrentScore) {
          allPlayerCoins[z - 1] += 0;
          myOutputValue += `Player ${z} ties!<br> ${myTieImage} <br> Your score is ${
            allPlayerScoreArray[z - 1]
          } <br><br><br>`;
        } else {
          allPlayerCoins[z - 1] -= Number(allPlayerBets[z - 1]);
          myOutputValue += `Player ${z} loses! <br> ${myLoseImage} <br> Your score is ${
            allPlayerScoreArray[z - 1]
          } and the dealer is closer to 21 than you are! <br><br><br>`;
        }
        z += 1;
      }
    }

    //Create table showing all players (from player 1 to n)'s cards in their hands, and current coin balance.
    console.log(allPlayerCoins);
    var playerAllHands = showAllPlayerHands(numberOfPlayers);
    var playerCoinBalance = showAllPlayerCoins(numberOfPlayers);

    if (computerCurrentScore > 21) {
      myOutputValue += `The dealer has bust! <br>The dealer's hand is ${computerSentence}. <br> The dealer's score is ${computerCurrentScore}. <br>${myComputerBustImage}<br><br> `;
    } else {
      myOutputValue += `The dealer's hand is ${computerSentence}. <br> The dealer's score is ${computerCurrentScore}. <br><br> `;
    }
    myOutputValue += `<b><u>HANDS OF EACH PLAYER</u></b> <br> ${playerAllHands} <br><b><u>PLAYER COIN BALANCE</u></b> <br> ${playerCoinBalance} <br>`;

    //Check if any player has gone bankrupt (coin balance = 0), if so, end game, shift to end game stage.
    //If all players more than 0 coins, shift game stage to new betting turn.
    //Reset shuffled deck, and all global variables that need to be reset. Shift current player back to player 1.
    var q = 0;
    while (q < numberOfPlayers) {
      if (allPlayerCoins[q] == 0) {
        myOutputValue += ` As Player ${
          q + 1
        } has gone bankrupt, the game ends! <br>${myPlayerBankruptImage}<br> Please refresh the page to start a new game.`;
        q = numberOfPlayers;
        currentGameStage = "end game";
      } else {
        q += 1;
        if (q + 1 > numberOfPlayers) {
          myOutputValue += `Click "submit" to start a new round!`;
          currentGameStage = "wait for betting turn";
          shuffledDeck = shuffleCards(makeDeck());
          playerCardArray = [];
          computerCardArray = [];
          allPlayerCardArray = [];
          allPlayerScoreArray = [];
          currentPlayer = 1;
          allPlayerBets = [];
        }
      }
    }
  }

  //End game stage.
  //This stage is so that player cannot interact with the game anymore.
  else if (currentGameStage == "end game") {
    myOutputValue = `The game has ended. Please refresh the page to start a new game.`;
  }

  return myOutputValue;
};
