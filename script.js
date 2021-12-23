//---------------HELPER FUNCTIONS ------------------------------
//===============TO MAKE CARD DECK==============================
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
  var suitsPicture = ["♥", "♦", "♣", "♠"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];
    var currentSuitPicture = suitsPicture[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;
      var cardValue = rankCounter;
      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "Ace";
        cardValue = 11;
      } else if (cardName == 11) {
        cardName = "Jack";
        cardValue = 10;
      } else if (cardName == 12) {
        cardName = "Queen";
        cardValue = 10;
      } else if (cardName == 13) {
        cardName = "King";
        cardValue = 10;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: cardValue,
        picture: currentSuitPicture,
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

//===============TO MAKE SHUFFLED DECK==========================
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

// Shuffle the deck and save it in a new variable shuffledDeck
// to communicate that we have shuffled the deck.
//===============TO DRAW CARDS FOR PLAYER AND DEALER=============
var drawCards = function () {
  console.log(`---DECK SHUFFLED---`);
  console.log(shuffledDeck);
  //1 card
  playerHand.push(shuffledDeck.pop());
  //2 cards
  playerHand.push(shuffledDeck.pop());
  console.log(`playerHand:`);
  console.log(playerHand);
  //1 card
  dealerHand.push(shuffledDeck.pop());
  //2 cards
  dealerHand.push(shuffledDeck.pop());
  console.log(`dealerHand:`);
  console.log(dealerHand);
};

//function to add the values of the cards
//if there is JQK, value = 10
//if there is ace, value is 1 or 11
//loop through hands to add the values up for 2 or more cards
//function must work for both dealer and player (not person-specific)
//===============TO CAL VALUE OF CARDS============================
var checkScore = function (cardArray) {
  console.log(cardArray);
  var valueInHand = 0;
  for (var i = 0; i < cardArray.length; i += 1) {
    console.log("running");
    if (cardArray[i].value == 10) {
      valueInHand = valueInHand + 10;
    } else if (cardArray[i].value == 11 && cardArray.length <= 2) {
      valueInHand = valueInHand + 11;
    } else if (cardArray[i].value == 11 && cardArray.length > 2) {
      valueInHand = valueInHand + 11;
    } else {
      valueInHand = valueInHand + cardArray[i].rank;
    }
  }
  console.log(`card value:`);
  console.log(valueInHand);
  return valueInHand;
};

//===============TO CHECK PLAYER ACE============================
var checkPlayerAce = function () {
  // If the player score > 21, then check each of his card to see if there's an Ace.
  // If there is Ace, minus 10.
  var playerAceCounter = 0;
  while (playerAceCounter < playerHand.length) {
    if (playerHand[playerAceCounter].value == 11) {
      playerValue = playerValue - 10;
      playerHand[playerAceCounter].value = 1;
      playerAceCounter = playerHand.length;
    }
    playerAceCounter++;
  }
};

//===============TO CHECK dealer ACE============================
var checkDealerAce = function () {
  // If the player score > 21, then check each of his card to see if there's an Ace.
  // If there is Ace, minus 10.
  var dealerAceCounter = 0;
  while (dealerAceCounter < dealerHand.length) {
    if (dealerHand[dealerAceCounter].value == 11) {
      dealerValue = dealerValue - 10;
      dealerHand[dealerAceCounter].value = 1;
      dealerAceCounter = dealerHand.length;
    }
    dealerAceCounter++;
  }
};

//---------------GLOBAL VARIABLES AND CONSTANTS AND GAME MODES------------------------------
PLACE_BET = "player to place amount of bet";
GAME_START = "game start get cards";
CHECK_BLACKJACK = "check for blackjack";
PLAYER_HIT_STAND = "player to choose hit/stand";
DEALER_HIT_STAND = "dealer to choose hit/stand";
CHECK_WHO_WIN = "check who win";
END_GAME = "the game ends and restarts";
FIFTEEN_RUN = "player can run at 15";
SURRENDER_CONTINUE = "player can choose to surrender or continue";
var currentGameMode = PLACE_BET;
var playerHand = [];
var dealerHand = [];
var playerValue = 0;
var dealerValue = 0;
var playerBet = 0;
var playerMoney = 100;
var totalCounter = 0;
var totalWin = 0;
var restartGameMessage = `Click on <b>Restart</b> to play another round! <br><br>`;
var winningImage =
  '<br><br><img src="https://c.tenor.com/bQrjUlPjAnsAAAAC/despicable-me-minions.gif" width ="30%" height = "30%"/>';
var losingImage =
  '<br><br><img src="https://c.tenor.com/bAPQ2tejx6YAAAAd/crying-minions.gif" width ="30%" height = "30%"/>';
var tieImage =
  '<br><br><img src="https://c.tenor.com/1xECoN4OqNgAAAAC/yeah-happy.gif" width ="30%" height = "30%"/>';
var shuffledDeck = shuffleCards(makeDeck());

//------HELPER FUNCTIONS TO TO DISPLAY MESSAGES ---------------
//===============TO DISPLAY PLAYER MESSAGE=============================
var playerDisplay = function (playerHandArray) {
  var playerMessage = `<b>Player's Card: </b><br><br>`;
  for (var i = 0; i < playerHandArray.length; i += 1) {
    console.log("running player display");
    playerMessage =
      playerMessage +
      playerHandArray[i].name +
      " of " +
      playerHandArray[i].suit +
      " " +
      playerHandArray[i].picture +
      `<br>`;
  }
  return playerMessage;
};
//===============TO DISPLAY DEALER MESSAGE=============================
var dealerDisplay = function (dealerHandArray) {
  var dealerMessage = `<br><b>Dealer's Card: </b><br><br>`;
  for (var i = 0; i < dealerHandArray.length; i += 1) {
    console.log("running dealer display");
    dealerMessage =
      dealerMessage +
      dealerHandArray[i].name +
      " of " +
      dealerHandArray[i].suit +
      " " +
      dealerHandArray[i].picture +
      `<br>`;
  }
  return dealerMessage + `<br>`;
};
//===============TO DISPLAY ONE DEALER CARD MESSAGE=============================
var displayOneDealerCard = function (dealerHandArray) {
  var dealerMessage = `<br><b>Dealer's Card: </b><br><br>`;
  dealerMessage =
    dealerMessage +
    dealerHandArray[0].name +
    " of " +
    dealerHandArray[0].suit +
    " " +
    dealerHandArray[0].picture +
    `<br>`;
  return dealerMessage + `<br>`;
};
//===============MAIN FUNCTIONS=============================

////---------------BETTING FUNCTION (FIRST BUTTON) ------------------------------
var betAmount = function (input) {
  currentGameMode = PLACE_BET;
  if (currentGameMode == PLACE_BET) {
    console.log("---PLAYER PLACE BET---");
    playerBet = Number(input);
    console.log("player bet: " + playerBet);
    playerMoney = playerMoney - playerBet;
    console.log("amount of money player left: " + playerMoney);
    myOutputValue = `Your Bet: $${input}. <br> Amount of money left: $${playerMoney}.<br><br> Press <b>Start</b> to start the game. Good luck!`;
    currentGameMode = GAME_START;
    return myOutputValue;
  }
};
//---------------START FUNCTION (FIRST BUTTON) ------------------------------
var start = function () {
  totalCounter = totalCounter + 1;
  console.log("---START GAME---");
  console.log(`playerHand:`);
  console.log(playerHand);
  drawCards();
  var dealerValue = checkScore(dealerHand);
  var playerValue = checkScore(playerHand);
  var startPlayerSentence = playerDisplay(playerHand);
  var oneDealer = displayOneDealerCard(dealerHand);
  if (currentGameMode == GAME_START) {
    console.log("current game mode: " + currentGameMode);
    playerValue = playerHand[0].value + playerHand[1].value;
    console.log(`playerValue:`);
    console.log(playerValue);
    dealerValue = dealerHand[0].value + dealerHand[1].value;
    console.log(`dealerValue:`);
    console.log(dealerValue);
    //===============BLACKJACK CONDITION=============================
    if (playerValue >= 21 && dealerValue >= 21) {
      playerMoney = playerMoney + playerBet;
      myOutputValue =
        `Everyone has their cards. Your cards are <br><br>` +
        startPlayerSentence +
        `<br> You and the dealer both got a Blackjack! It's a tie! You have won ${totalWin} out of ${totalCounter}. <br><br> The dealer returns you $${playerBet}. You now have $${playerMoney}. ${restartGameMessage} ` +
        tieImage;
      currentGameMode = END_GAME;
    }
    if (playerValue < 21 && dealerValue >= 21) {
      myOutputValue =
        `Everyone has their cards. Your cards are <br><br>` +
        startPlayerSentence +
        `<br> The dealer got a Blackjack! You lost! You have won ${totalWin} out of ${totalCounter}. <br><br> You lost $${playerBet}. You now have $${playerMoney}. ${restartGameMessage}` +
        losingImage;
      currentGameMode = END_GAME;
    }
    if (playerValue >= 21 && dealerValue < 21) {
      playerMoney = playerMoney + playerBet + playerBet;
      totalWin += 1;
      myOutputValue =
        `Everyone has their cards. Your cards are <br><br>` +
        startPlayerSentence +
        `<br> You got a Blackjack! You won! You have won ${totalWin} out of ${totalCounter}. <br><br> You won $${playerBet}. You now have $${playerMoney}. ${restartGameMessage}` +
        winningImage;
      currentGameMode = END_GAME;
    } else {
      myOutputValue =
        `Everyone has their cards. Your cards are <br><br>` +
        startPlayerSentence +
        `Total Player Score: ${playerValue} <br>` +
        oneDealer +
        `No blackjack! Game continues! Please click <b>Hit</b> to add more cards or <b>Stand</b>.`;
    }
    return myOutputValue;
    //   }
    //    if (currentGameMode == GAME_START || currentGameMode == PLAYER_HIT_STAND || currentGameMode == DEALER_HIT_STAND || currentGameMode == END_GAME ) {
    //      return `Please click either `
    // };
  }
};
//---------------HIT FUNCTION (SECOND BUTTON) ------------------------------
var hit = function () {
  currentGameMode = PLAYER_HIT_STAND;
  var oneDealer = displayOneDealerCard(dealerHand);
  // var dealerValue = checkScore(dealerHand);
  var playerValue = checkScore(playerHand);
  playerHand.push(shuffledDeck.pop());
  console.log(`player's card after hit:`);
  console.log(playerHand);
  var startPlayerSentence = playerDisplay(playerHand);
  var playerValue = checkScore(playerHand);
  if ((currentGameMode = PLAYER_HIT_STAND)) {
    if (playerValue < 15) {
      myOutputValue =
        startPlayerSentence +
        `You have drawn a ${playerHand[playerHand.length - 1].name} of 
        ${
          playerHand[playerHand.length - 1].suit
        }.<br> Total Score: ${playerValue} <br> You should hit for more cards.<br><Br>` +
        oneDealer;
    }
    if (playerValue > 21) {
      checkPlayerAce();
    }

    if (playerValue > 21) {
      myOutputValue =
        startPlayerSentence +
        `You have drawn a ${playerHand[playerHand.length - 1].name} of 
        ${
          playerHand[playerHand.length - 1].suit
        }.<br><br> Total Score: ${playerValue} <br><br> BUSTED! Dealer's turn. Please click <b>stand</b>.<br><br>`;
      oneDealer;
      currentGameMode = DEALER_HIT_STAND;
    } else {
      myOutputValue =
        startPlayerSentence +
        `You have drawn a ${playerHand[playerHand.length - 1].name} of 
        ${
          playerHand[playerHand.length - 1].suit
        }.<br><br> Total Score: ${playerValue} <br>` +
        oneDealer +
        `Please input click on hit to add more cards or click on stand.`;
    }
    return myOutputValue;
  }
};
//---------------STAND FUNCTION (THIRD BUTTON) ------------------------------
var stand = function () {
  totalCounter = totalCounter + 1;
  currentGameMode = DEALER_HIT_STAND;
  if (currentGameMode == DEALER_HIT_STAND) {
    var startPlayerSentence = playerDisplay(playerHand);
    var playerValue = checkScore(playerHand);
    var dealerValue = checkScore(dealerHand);

    while (dealerValue < 17) {
      dealerHand.push(shuffledDeck.pop());
      console.log(`dealer's hand after stand:`);
      console.log(dealerHand);
      dealerValue = checkScore(dealerHand);
    }
    if (dealerValue > 21) {
      checkDealerAce();
    }

    if (dealerValue >= 17) {
      var startDealerSentence = dealerDisplay(dealerHand);
      var playerValue = checkScore(playerHand);
      var dealerValue = checkScore(dealerHand);
      //===============WINNING CONDITION=============================
      endGameMessage =
        startPlayerSentence +
        startDealerSentence +
        `<u>Player Value: ${playerValue} <br> Dealer Value: ${dealerValue}</u> <br>`;
      //condition if both busted
      if (playerValue >= 21 && dealerValue >= 21) {
        playerMoney = playerMoney + playerBet;
        myOutputValue =
          endGameMessage +
          `It's a tie! Both dealer and player busted. You have won ${totalWin} out of ${totalCounter}. Click on restart to play another round! <br><br> The dealer returns you $${playerBet}. You now have $${playerMoney}.` +
          tieImage;
      }
      //condition if both not busted but player value is more than dealer.
      if (playerValue > dealerValue && dealerValue <= 21 && playerValue <= 21) {
        playerMoney = playerMoney + playerBet + playerBet;
        totalWin = totalWin + 1;
        myOutputValue =
          endGameMessage +
          `<br> Player win. You have won ${totalWin} out of ${totalCounter}. ${restartGameMessage} You won $${playerBet}. You now have $${playerMoney}.` +
          winningImage;
      }
      //condition if dealer busted
      if (playerValue <= 21 && dealerValue >= 21) {
        playerMoney = playerMoney + playerBet + playerBet;
        totalWin = totalWin + 1;
        myOutputValue =
          endGameMessage +
          `<br> Player win. Dealer Busted. You have won ${totalWin} out of ${totalCounter}. ${restartGameMessage} You won $${playerBet}.You now have $${playerMoney}.` +
          winningImage;
      }
      //condition if both not busted but dealer more than player
      if (dealerValue > playerValue && dealerValue <= 21 && playerValue <= 21) {
        myOutputValue =
          endGameMessage +
          `<br> Dealer win. You have won ${totalWin} out of ${totalCounter}. ${restartGameMessage} You lost $${playerBet}. You now have $${playerMoney}.` +
          losingImage;
      }
      //condition if player busted
      if (dealerValue <= 21 && playerValue > 21) {
        myOutputValue =
          endGameMessage +
          `<br>  Dealer win. Player Busted. You have won ${totalWin} out of ${totalCounter}. ${restartGameMessage} You lost $${playerBet}. You now have $${playerMoney}.` +
          losingImage;
      }
      //condition if both same value and not busted
      if (
        dealerValue == playerValue &&
        dealerValue <= 21 &&
        playerValue <= 21
      ) {
        playerMoney = playerMoney + playerBet;
        myOutputValue =
          endGameMessage +
          `<br> It's a tie! ${restartGameMessage} <br><br> The dealer returns you $${playerBet}. You now have $${playerMoney}. ` +
          tieImage;
      }
      currentGameMode = END_GAME;
      return myOutputValue;
    }
  }
};
// End game. Reset all the global variables for a new game.
var restart = function () {
  currentGameMode = END_GAME;
  if (currentGameMode == END_GAME) {
    console.log(currentGameMode);
    playerHand = [];
    dealerHand = [];
    playerValue = 0;
    dealerValue = 0;
    shuffledDeck = shuffleCards(makeDeck());
    myOutputValue = `Please place your bet for another game!`;
    currentGameMode = GAME_START;
    return myOutputValue;
  }
};
