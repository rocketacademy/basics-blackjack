//first make a deck of cards
var cardsDeck = [];
var shuffledDeck = [];

//---------------CARD RESULTS ------------------------------
var deckOfCards = [];
var playerCards = [];
var computerCards = [];
var sumOfCardsResults = [];

//---------------GAME MODE ------------------------------

var placeBet = "placeBet";
var blackJackMode = "blackJackMode";
var gameResult = "to show results";
var gameStart = "start of the game, shuffle cards";
var gameEnd = "end of game to show results";
var gameForPlayerToDecide = "for player to decide hit or stand";
var gameMode = placeBet;
var playerPoints = 100;

//---------------PLAYER POINTS ---------------------------------
var sumOfPlayer = 0;
var sumOfComputer = 0;
var playerBet = 0;

//---------------OUTPUT MESSAGES ---------------------------------
var newComputerMsg = "";
var outputMsg = "";

//---------------HELPER FUNCTIONS ------------------------------

//===============TO MAKE CARD DECK===================================================
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  const suitsPicture = ["♥", "♦", "♣", "♠"];

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

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "Ace";
      } else if (cardName == 11) {
        cardName = "Jack";
      } else if (cardName == 12) {
        cardName = "Queen";
      } else if (cardName == 13) {
        cardName = "King";
      }
      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        suitPicture: currentSuitPicture,
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

// to assign new key-value pair to the object in array - such that it will loop through the whole array and assign 10 to queen, jack and king
var assignValueToCards = function (newDeck) {
  var valueOfCard = 0;
  for (let i = 0; i < newDeck.length; i += 1) {
    if (newDeck[i].rank >= 11 && newDeck[i].rank <= 13) {
      valueOfCard = 10;
      newDeck[i].valueOfCard = 10;
    }
    if (newDeck[i].rank >= 2 && newDeck[i].rank <= 10) {
      valueOfCard = newDeck[i].rank;
      newDeck[i].valueOfCard = newDeck[i].rank;
    }
    //for ace card, the value can be 1 or 11 hence assign card value to an array of 2 values
    if (newDeck[i].rank == 1) {
      newDeck[i].valueOfCard = 1;
    }
  }
  return newDeck;
};

//=============== FUNCTIONS RELATED TO CARD GAME  ==============================

//--------------FUNCTIONS TO DETERMINE WINNING CONDITION -------------
var findSumOfHand = function (cards) {
  var sum = 0;
  for (let i = 0; i < cards.length; i += 1) {
    sum += cards[i].valueOfCard;
  }

  // if there is an Ace present and total sum is less than 12, add 10 to the total sum; else no
  for (let j = 0; j < cards.length; j += 1) {
    if (cards[j].name == "Ace" && sum < 12) {
      sum = sum + 10;
    }
  }
  return sum;
};
//--------------FUNCTIONS TO DRAW CARDS-------------------------------------------------
var drawCard = function () {
  var cardDrawn = shuffledDeck.pop();
  return cardDrawn;
};

//computer will check for initial hand condition and decide whether to draw cards
var checkIfComputerShouldDraw = function (computerHand) {
  var totalSumOfComputerCards = findSumOfHand(computerHand);

  //run a loop, while the sum of cards<17, computer should draw cards until the condition is not fufilled
  while (totalSumOfComputerCards < 17) {
    var computerNextCard = drawCard();
    console.log(totalSumOfComputerCards);
    computerHand.push(computerNextCard);
    totalSumOfComputerCards = findSumOfHand(computerHand);
  }
  return computerHand;
};

//to create output message based on the cards
var craftOutputMessage = function (hand) {
  var message = ``;
  for (let i = 0; i < hand.length; i += 1) {
    message += `Card ${i + 1}: ${hand[i].name} of ${hand[i].suitPicture} <br>`;
  }
  return message;
};

//--------------FUNCTIONS TO DETERMINE WINNING CONDITIONS-----------------------------

//function to craft mesage for dealer cards
var computerPlay = function (dealersInitialCard) {
  //call out function to determine the final cards for dealer
  var computerFinalCards = checkIfComputerShouldDraw(dealersInitialCard);
  sumOfComputer = findSumOfHand(computerFinalCards);
  newComputerMsg = `<br><br><b>Dealer's card:</b> <br>${craftOutputMessage(
    computerFinalCards
  )} Sum: ${sumOfComputer}`;
  return newComputerMsg;
};

//to check for winning condition if no blackjack at the start. To compare sum of player card vs sum of computer card
var toCheckWin = function (playerCardSum, computerCardSum) {
  var restartGameMsg = `Please enter your bet and hit the "Play" button to start another round`;
  var computerResultsMsg = computerPlay(computerCards);
  outputMsg += computerResultsMsg;
  var combinedMsg = `${outputMsg} <br><br> ${restartGameMsg}<br><br>`;
  if (playerCardSum > 21 && computerCardSum > 21) {
    return `<b>BUST!!!</b><br><br> Both dealer and player have points over 21.<br><br> ${combinedMsg}`;
  } // if both <21, compare by result
  if (playerCardSum < 22 && computerCardSum < 22) {
    if (playerCardSum > computerCardSum) {
      playerPoints += playerBet;
      return `<b>Player wins!!!</b><br><br>${combinedMsg}You have $${playerPoints}`;
    }
    if (playerCardSum == computerCardSum) {
      return `<b>It is a tie!</b><br><br>${combinedMsg}You have $${playerPoints}`;
    }
    if (playerCardSum < computerCardSum) {
      playerPoints -= playerBet;
      return `<b>Dealer wins!</b><br><br>${combinedMsg}You have $${playerPoints}`;
    }
  }
  if (playerCardSum > 21 && computerCardSum <= 21) {
    playerPoints -= playerBet;
    return `<b>Player bust! Dealer wins!!</b><br>${combinedMsg}You have $${playerPoints}`;
  }
  if (playerCardSum <= 21 && computerCardSum > 21) {
    playerPoints += playerBet;
    console.log(playerPoints);
    return `<b>Player wins! Dealer bust!!</b><br> ${combinedMsg}You have $${playerPoints}`;
  }
};

//to check blackJack condition fufilled?
var checkIfBlackJack = function (cardsOfPlayer, cardsOfDealer) {
  //Case1: YES BLACKJACK
  if (sumOfPlayer == 21 || sumOfComputer == 21) {
    gameMode = blackJackMode;
    if (gameMode == blackJackMode) {
      gameMode = placeBet;
      if (sumOfPlayer == 21 && sumOfComputer == 21) {
        return `<b>It is a tie!</b> <br>${outputMsg} BlackJack for both<br><br>You have $${playerPoints}`;
      }
      if (sumOfComputer == 21) {
        console.log(sumOfComputer);
        playerPoints -= playerBet;
        return `<b>Dealer wins!</b><br> ${outputMsg} BlackJack!<br><br>You have $${playerPoints}`;
      }
      if (sumOfPlayer == 21) {
        playerPoints += playerBet;
        return `<b>Player wins!</b><br>${outputMsg} BlackJack!<br><br>You have $${playerPoints}`;
      }
    }

    //Case2: NO BLACKJACK
  } else {
    gameMode = gameForPlayerToDecide;
    outputMsg = `<b>Player's hand:</b> <br> ${craftOutputMessage(
      playerCards
    )} Sum: ${sumOfPlayer}`;
    return `${outputMsg} <br><br> Please enter "hit" to continue drawing another card or "stand" to stop.`;
  }
};

// ======================= MAIN FUNCTION============================================================

//for placing bet
var showBet = function (input) {
  playerBet = 0;

  //enter placebet game mode
  if (gameMode == placeBet) {
    //if player points != 0 and player's input is more than what they currently have (do not allow negative sum)
    if (input > playerPoints && playerPoints > 0) {
      return `You have $${playerPoints}. Do not bet more than what you have. `;
    }

    //this is when player do not have any money, then refresh page to restart game
    if (playerPoints <= 0) {
      return `Please refresh the page to restart the game`;
    }
    gameMode = gameStart;
    console.log(gameMode);
    //realised input keeps on giving me a string result, hence to turn into a number
    playerBet += parseInt(input);
    console.log(playerPoints);
    betMsg = `You now have $${
      playerPoints - playerBet
    }. Your bet is: $${playerBet}.<br> <br>Now press the "Play" button to start the game `;
    return betMsg;
  }
  return `Please press the "Play" button to start the game`;
};

//function for hit button
var hit = function () {
  console.log(playerPoints);
  console.log(gameMode);
  if (gameMode == gameForPlayerToDecide) {
    var playerNextCard = drawCard();
    playerCards.push(playerNextCard);
    sumOfPlayer = findSumOfHand(playerCards);
    var newMsg = craftOutputMessage(playerCards);
    outputMsg = `<b>Player's card:</b><br> ${newMsg} Sum: ${sumOfPlayer}
  `;
    return `${outputMsg} <br><br> Please press "hit" to continue drawing a card or press "stand" to stop`;
  } else
    return `Please enter your bet then press the "Play" button to start playing the game`;
};

//function for stand button
var stand = function () {
  var computerFinalCards = checkIfComputerShouldDraw(computerCards);
  sumOfComputer = findSumOfHand(computerFinalCards);
  if (gameMode == gameForPlayerToDecide) {
    gameMode = placeBet;
    console.log("player", sumOfPlayer);
    console.log("dealer", sumOfComputer);
    return toCheckWin(sumOfPlayer, sumOfComputer);
  } else
    return `Please enter your bet then press the "Play" button to start playing the game`;
};

//function for play button
var play = function () {
  //start the game
  sumOfPlayer = 0;
  sumOfComputer = 0;
  //gameMode is now gameStart
  // entering the inital game state- to shuffle cards and deal 2 cards each to each player
  if (gameMode == gameStart) {
    //whenever entering gameStart mode then the cards will be made and shuffled
    gameMode = gameForPlayerToDecide;
    cardsDeck = makeDeck();
    deckOfCards = assignValueToCards(cardsDeck);
    shuffledDeck = shuffleCards(deckOfCards);
    console.log(shuffledDeck);
    // to deal 2 cards to each player
    playerCards = shuffledDeck.splice(0, 2);
    computerCards = shuffledDeck.splice(0, 2);
    outputMsg = `<b>Player's hand:</b> <br> ${craftOutputMessage(
      playerCards
    )} <br>Dealer's hand: <br>${craftOutputMessage(computerCards)}`;

    //to store cards sum in global variable
    sumOfPlayer = findSumOfHand(playerCards);
    sumOfComputer = findSumOfHand(computerCards);
    return checkIfBlackJack(playerCards, computerCards);
  } else return `Please enter your bet`;
};

console.log(play());
