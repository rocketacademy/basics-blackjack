//card deck generation code

var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["♥", "♦", "♣", "♠"];

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
        cardName = "Ace";
      } else if (cardName == 11) {
        cardName = "Jack";
      } else if (cardName == 12) {
        cardName = "Queen";
      } else if (cardName == 13) {
        cardName = "King";
      }

      //giving a value to each card

      if (cardName == "Ace") {
        var cardValue = 11;
      } else if (
        cardName == "Jack" ||
        cardName == "King" ||
        cardName == "Queen"
      ) {
        cardValue = 10;
      } else cardValue = rankCounter;

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: cardValue,
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

//card shuffling function

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

//BLACK JACK GAME

//game mode
var currentGameMode = "player enter name";
var createMyDeck = function () {
  var blackjackdeck = makeDeck();
  var shuffledDeck = shuffleCards(blackjackdeck);
  return shuffledDeck;
};

//global variables
var blackjackdeck = ``;
var playerHand = [];
var computerHand = [];
var playerScore = "";
var computerScore = "";
var myOutputValue = "";
var playerName = ``;
var playerBet = ``;
var playerGains = ``;
var playerRemainingCredits = 100;

//function to check playername validation
var checkIfPlayerNameValid = function (input) {
  if (isNaN(Number(input))) {
    return true;
  }
  return false;
};

//function to check if bet input is valid
var checkIfBetIsValid = function (input) {
  if (Number(input)) {
    return true;
  }
  return false;
};

//function to add money to credit if player wins
var addPlayerCreditCauseWin = function (playerBet) {
  playerGains = Number(playerBet * 2);
  playerRemainingCredits = Number(playerRemainingCredits) + playerGains;
  return playerRemainingCredits;
};

//function to keep back bet if it's a tie
var keepPlayerCreditSame = function (playerBet) {
  playerGains = Number(playerBet);
  playerRemainingCredits = Number(playerRemainingCredits) + playerGains;
  return playerRemainingCredits;
};

//function to calculate total hand with consideration of ace value
var calcTotalHand = function (cardHand) {
  var index = 0;
  var totalHand = 0;
  var aceCounter = 0;
  while (index < cardHand.length) {
    var currentCard = cardHand[index];
    if (currentCard.name == "Ace") {
      totalHand = totalHand + 11;
      aceCounter += 1;
    } else {
      totalHand = totalHand + cardHand[index].value;
    }
    index += 1;
  }
  index = 0;
  while (index < aceCounter) {
    if (totalHand > 21) {
      totalHand = totalHand - 10;
    }
    index += 1;
  }
  return totalHand;
};

//function to check if blackjack
var checkIfBlackJack = function (cardHand) {
  var index = 0;
  var totalHand = 0;
  var aceCounter = 0;
  while (index < cardHand.length) {
    var currentCard = cardHand[index];
    if (currentCard.name == "Ace") {
      totalHand = totalHand + 11;
      aceCounter += 1;
    } else {
      totalHand = totalHand + cardHand[index].value;
    }
    index += 1;
  }
  index = 0;
  while (index < aceCounter) {
    if (totalHand > 21) {
      totalHand = totalHand - 10;
    }
    index += 1;
  }
  if (totalHand == 21) {
    return true;
  }
  return false;
};

//function to check if bust
var checkIfBust = function (cardHand) {
  var index = 0;
  var totalHand = 0;
  var aceCounter = 0;
  while (index < cardHand.length) {
    var currentCard = cardHand[index];
    if (currentCard.name == "Ace") {
      totalHand = totalHand + 11;
      aceCounter += 1;
    } else {
      totalHand = totalHand + cardHand[index].value;
    }
    index += 1;
  }
  index = 0;
  while (index < aceCounter) {
    if (totalHand > 21) {
      totalHand = totalHand - 10;
    }
    index += 1;
  }
  if (totalHand > 21) {
    return true;
  }
  return false;
};

//displaying total cards on hand (with dealer having one card face-down) - before final result is out
var displayHandsPartial = function (playerHand, computerHand) {
  var playerHandStatement = `<b><u>Player Hand:<br></u></b>`;
  var index = 0;
  while (index < playerHand.length) {
    playerHandStatement =
      playerHandStatement +
      playerHand[index].name +
      " of " +
      playerHand[index].suit +
      "<br>";
    index += 1;
  }
  var computerHandStatement = "<b><u>Computer Hand:<br></u></b>";
  index = 1;
  while (index < computerHand.length) {
    computerHandStatement =
      computerHandStatement +
      `* of * [🙈face-down card]<br>` +
      computerHand[index].name +
      " of " +
      computerHand[index].suit +
      "<br>";
    index += 1;
  }
  var combinedHandStatement =
    playerHandStatement + "<br>" + computerHandStatement;
  return combinedHandStatement;
};

//displaying total cards on hand - all cards face-up
var displayHandsFull = function (playerHand, computerHand) {
  var playerHandStatement = `<b><u>Player Hand:<br></u></b>`;
  var index = 0;
  while (index < playerHand.length) {
    playerHandStatement =
      playerHandStatement +
      playerHand[index].name +
      " of " +
      playerHand[index].suit +
      "<br>";
    index += 1;
  }
  var computerHandStatement = "<b><u>Computer Hand:<br></u></b>";
  index = 0;
  while (index < computerHand.length) {
    computerHandStatement =
      computerHandStatement +
      computerHand[index].name +
      " of " +
      computerHand[index].suit +
      "<br>";
    index += 1;
  }
  var combinedHandStatement =
    playerHandStatement + "<br>" + computerHandStatement;
  return combinedHandStatement;
};

var main = function (input) {
  if (currentGameMode == "player enter name") {
    var isPlayerNameInputValid = checkIfPlayerNameValid(input);
    if (!isPlayerNameInputValid) {
      return `Oopsy daisy...please enter your name to begin the game!`;
    }
    playerName = input;
    currentGameMode = "place bet";
    image = '<img src="ears.gif"/>';
    return (myOutputValue =
      `Hi there ${playerName}! Welcome to the game of Blackjack!<br>You have 100 credits to play with!<br>Please begin by entering the amount you want to bet!<br>` +
      image);
  }
  if (currentGameMode == "place bet") {
    playerBet = 0;
    playerGains = 0;
    playerBet = Number(input);
    var isBetInputValid = checkIfBetIsValid(input);
    if (playerRemainingCredits == 0) {
      image = '<img src="nomoney2.gif"/>';
      return (
        `🚨Hey! Your pockets are empty!🚨 No more playing - go earn some money!🏃‍♀️🏃‍♂️<br><br><b><u>Remaining Credits = ${playerRemainingCredits}</u></b><br>` +
        image
      );
    }
    if (!isBetInputValid) {
      image = '<img src="oops.gif"/>';
      return (
        `Oopsy...please enter a valid bet number to begin the game!<br><br><b><u>Remaining Credits = ${playerRemainingCredits}</u></b><br>` +
        image
      );
    }
    if (playerBet > playerRemainingCredits) {
      image = '<img src="angry.gif"/>';
      return (
        `Don't spend more than you saved! Please enter something within your means!🙈<br><br><b><u>Remaining Credits = ${playerRemainingCredits}</u></b><br>` +
        image
      );
    }
    currentGameMode = "deal cards";
    playerRemainingCredits = Number(playerRemainingCredits) - playerBet;
    image = '<img src="cheer.gif"/>';
    return (myOutputValue =
      `${playerName}, you have decided to place a bet of <b><u>${playerBet}</u></b>!<br><br><b><u>Remaining Credits = ${playerRemainingCredits}</u></b><br><br>All the best, click to begin!<br>` +
      image);
  }
  if (currentGameMode == "deal cards") {
    // User clicks Submit to deal cards
    //dealer gives player and himself two cards each
    playerHand = [];
    computerHand = [];
    blackjackdeck = createMyDeck();
    console.log(blackjackdeck);
    var playerCard1 = blackjackdeck.pop();
    playerHand.push(playerCard1);
    var playerCard2 = blackjackdeck.pop();
    playerHand.push(playerCard2);
    var computerCard1 = blackjackdeck.pop();
    computerHand.push(computerCard1);
    var computerCard2 = blackjackdeck.pop();
    computerHand.push(computerCard2);
    console.log(`${playerName} Hand`);
    console.log(playerHand);
    console.log("Computer Hand");
    console.log(computerHand);
    currentGameMode = "cards dealt";
    image = '<img src="excited.gif"/>';
    return (myOutputValue =
      `${playerName}, cards have been dealt! Click to see your hand!<br>` +
      image);
  }
  if (currentGameMode == "cards dealt") {
    //to check for blackjack
    var showHand = displayHandsPartial(playerHand, computerHand);
    var playerTotalHand = calcTotalHand(playerHand);
    var computerTotalHand = calcTotalHand(computerHand);

    var doesPlayerHaveBlackJack = checkIfBlackJack(playerHand);
    var doesComputerHaveBlackJack = checkIfBlackJack(computerHand);
    console.log("Does player have blackjack");
    console.log(doesPlayerHaveBlackJack);
    console.log(`Does computer have blackjack`);
    console.log(doesComputerHaveBlackJack);

    var genericTotalHandStatementPartial = `${playerName} has a total hand value of ${playerTotalHand} while Dealer has a total hand value of **. <br>`;
    var genericTotalHandStatementFull = `${playerName} has a total hand value of ${playerTotalHand} while Dealer has a total hand value of ${computerTotalHand}.<br>`;
    var didPlayerBust = checkIfBust(playerHand);
    var didComputerBust = checkIfBust(computerHand);

    //situations where computer & player DOES NOT BUST
    if (doesComputerHaveBlackJack && doesPlayerHaveBlackJack) {
      image = '<img src="even.gif"/>';
      currentGameMode = "place bet";
      myOutputValue =
        showHand +
        "<br>" +
        genericTotalHandStatementFull +
        `<br> Both ${playerName} and the Dealer have blackjack! It's a tie!<br>` +
        image;
      var gameIsTie = keepPlayerCreditSame(playerBet);
      playerRemainingCredits = gameIsTie;
    }
    if (
      doesComputerHaveBlackJack &&
      !doesPlayerHaveBlackJack &&
      !didPlayerBust
    ) {
      currentGameMode = "place bet";
      image = '<img src="sad.gif"/>';
      myOutputValue =
        showHand +
        "<br>" +
        genericTotalHandStatementFull +
        `<br>Dealer has blackjack! Dealer Wins!<br>` +
        image;
    }
    if (
      !doesComputerHaveBlackJack &&
      !didComputerBust &&
      doesPlayerHaveBlackJack
    ) {
      image = '<img src="win.gif"/>';
      currentGameMode = "place bet";
      myOutputValue =
        showHand +
        "<br>" +
        genericTotalHandStatementFull +
        `<br>${playerName} has blackjack! ${playerName} wins!<br>` +
        image;
      var gameWin = addPlayerCreditCauseWin(playerBet);
      playerRemainingCredits = gameWin;
    }
    if (
      !doesComputerHaveBlackJack &&
      !doesPlayerHaveBlackJack &&
      !didPlayerBust &&
      !didComputerBust
    ) {
      currentGameMode = "hit or stand";
      if (playerTotalHand == computerTotalHand) {
        image = '<img src="think.gif"/>';
        myOutputValue =
          showHand +
          "<br>" +
          genericTotalHandStatementPartial +
          "<br> Game is tight!<br>Decide if you would like to continue the game by entering 'hit' or 'stand'<br>" +
          image;
      } else if (playerTotalHand > computerTotalHand) {
        image = '<img src="think.gif"/>';
        myOutputValue =
          showHand +
          "<br>" +
          genericTotalHandStatementPartial +
          "<br> Hmmm...do you think you have the upper hand?<br>Decide if you would like to continue the game by entering 'hit' or 'stand'<br>" +
          image;
      } else {
        image = '<img src="think.gif"/>';
        myOutputValue =
          showHand +
          "<br>" +
          genericTotalHandStatementPartial +
          "<br>Hmmm...would you still like to take a chance?<br>Decide if you would like to continue the game by entering 'hit' or 'stand'<br>" +
          image;
      }
    }
    console.log(playerRemainingCredits);
    return myOutputValue;
  }
  if (currentGameMode == "hit or stand") {
    if (input != "hit" || input != "stand") {
      image = '<img src="oops.gif"/>';
      myOutputValue =
        `Uhoh..Invalid input! Please indicate either "hit" or "stand"!<br><br>` +
        image +
        displayHandsPartial(playerHand, computerHand);
    }
    if (input == "hit") {
      image = '<img src="think.gif"/>';
      playerHand.push(blackjackdeck.pop());
      myOutputValue =
        displayHandsPartial(playerHand, computerHand) +
        `<br>${playerName}, you drew another card. <br> Please continue by indicating "hit" or "stand"!<br>` +
        image;
    } else if (input == "stand") {
      var playerTotalHand = calcTotalHand(playerHand);
      var computerTotalHand = calcTotalHand(computerHand);
      var doesPlayerHaveBlackJack = checkIfBlackJack(playerHand);
      var doesComputerHaveBlackJack = checkIfBlackJack(computerHand);
      console.log("Does player have blackjack");
      console.log(doesPlayerHaveBlackJack);
      console.log(`Does computer have blackjack`);
      console.log(doesComputerHaveBlackJack);

      //computer only makes a move after player chooses to stand
      //computer deals one more card if total hand <17
      //if computer has total hand >=17, does not take one more card

      while (computerTotalHand < 17) {
        computerHand.push(blackjackdeck.pop());
        computerTotalHand = calcTotalHand(computerHand);
      }
      var showHand = displayHandsFull(playerHand, computerHand);
      var didPlayerBust = checkIfBust(playerHand);
      var didComputerBust = checkIfBust(computerHand);

      var genericTotalHandStatement = `${playerName} has a total hand value of ${playerTotalHand} while Dealer has a total hand value of ${computerTotalHand}.<br>`;
      currentGameMode = "place bet";
      if (!didComputerBust && !didPlayerBust) {
        if (playerTotalHand == computerTotalHand) {
          image = '<img src="even.gif"/>';
          myOutputValue =
            showHand +
            "<br>" +
            genericTotalHandStatement +
            "<br> It's a tie!<br>" +
            image +
            `<br>`;
          if (doesComputerHaveBlackJack && doesPlayerHaveBlackJack) {
            myOutputValue = myOutputValue + ` Both players have blackjack!<br>`;
          }
          myOutputValue =
            myOutputValue +
            `<br><br>Enter another bet amount and click to continue playing!<br><br>If you would like to end the game and let another player go at it, refresh the page and we will see you next time!`;
          var gameIsTie = keepPlayerCreditSame(playerBet);
          playerRemainingCredits = gameIsTie;
          console.log(playerRemainingCredits);
        }
        if (playerTotalHand > computerTotalHand) {
          image = '<img src="win.gif"/>';
          myOutputValue =
            showHand +
            "<br>" +
            genericTotalHandStatement +
            `<br>Hooray! ${playerName}, you won! Dealer Lost!<br>` +
            image +
            `<br>`;
          if (doesPlayerHaveBlackJack) {
            myOutputValue =
              myOutputValue + `${playerName}, you have blackjack!`;
          }
          myOutputValue =
            myOutputValue +
            `<br><br>Enter another bet amount and click to continue playing!<br><br>If you would like to end the game and let another player go at it, refresh the page and we will see you next time!`;
          var gameWin = addPlayerCreditCauseWin(playerBet);
          playerRemainingCredits = gameWin;
        }
        if (playerTotalHand < computerTotalHand) {
          image = '<img src="sad.gif"/>';
          myOutputValue =
            showHand +
            "<br>" +
            genericTotalHandStatement +
            `<br>Sadded...${playerName}, you lost! Dealer Won!<br>` +
            image +
            `<br>`;
          if (doesComputerHaveBlackJack) {
            myOutputValue = myOutputValue + ` Dealer has blackjack!`;
          }
          myOutputValue =
            myOutputValue +
            `<br><br>Enter another bet amount and click to continue playing!<br><br>If you would like to end the game and let another player go at it, refresh the page and we will see you next time!`;
        }
      }
      if (didComputerBust && !didPlayerBust) {
        image = '<img src="win.gif"/>';
        myOutputValue =
          showHand +
          "<br>" +
          genericTotalHandStatement +
          `<br>Dealer Busted! ${playerName}, you win!<br>` +
          image +
          `<br>`;
        if (doesPlayerHaveBlackJack) {
          myOutputValue = myOutputValue + ` You got blackjack!`;
        }
        myOutputValue =
          myOutputValue +
          `<br><br>Enter another bet amount and click to continue playing!<br><br>If you would like to end the game and let another player go at it, refresh the page and we will see you next time!`;
        var gameWin = addPlayerCreditCauseWin(playerBet);
        playerRemainingCredits = gameWin;
      }
      if (!didComputerBust && didPlayerBust) {
        image = '<img src="sad.gif"/>';
        myOutputValue =
          showHand +
          "<br>" +
          genericTotalHandStatement +
          `<br>Ahhh...${playerName}, you've busted! Dealer Wins!<br>` +
          image +
          `<br>`;
        if (doesComputerHaveBlackJack) {
          myOutputValue = myOutputValue + ` Dealer has blackjack!`;
        }
        myOutputValue =
          myOutputValue +
          `<br><br>Enter another bet amount and click to continue playing! <br><br>If you would like to end the game and let another player go at it, refresh the page and we will see you next time!`;
      }
      if (didComputerBust && didPlayerBust) {
        image = '<img src="even.gif"/>';
        myOutputValue =
          showHand +
          "<br>" +
          genericTotalHandStatement +
          `<br>That ended with a bang! ${playerName}, you and the dealer busted!<br><br>` +
          image +
          `<br><br>Enter another bet amount and click to continue playing!<br><br>If you would like to end the game and let another player go at it, refresh the page and we will see you next time!`;
      }
    }
    return myOutputValue;
  }
};
