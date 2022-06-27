// Blackjack Project

// Global Variable
var cardDeck;
var playerHand = [];
var computerHand = [];
var userHitStand = false;
var computerHitStand = false;
var playerWon = false;
var computerWon = false;
var playerBlackjack = false;
var computerBlackjack = false;
var myOutputValue = '';
var userStand = false;
var playerValue = {
  value: 0,
  isace11: false,
};
var computerValue = {
  value: 0,
  isace11: false,
};

// Function makeDeck
// Purpose: To generate the card deck
var makeDeck = function () {
  // Initialise an empty deck array
  cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ['hearts', 'diamonds', 'clubs', 'spades'];

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
        cardName = 'ace';
      } else if (cardName == 11) {
        cardName = 'jack';
      } else if (cardName == 12) {
        cardName = 'queen';
      } else if (cardName == 13) {
        cardName = 'king';
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
};

// Generate a Card Deck
makeDeck();

// Function getRandomCard
// Purpose: Returns a random card from the deck
var getRandomCard = function() {
  return cardDeck[Math.floor(Math.random()*cardDeck.length)];
};

// Function startGame
// Purpose: Give player and computer 2 cards each
var startGame = function() {
  playerHand.push(getRandomCard());
  playerHand.push(getRandomCard());
  computerHand.push(getRandomCard());
  computerHand.push(getRandomCard());
  document.querySelector("#hit-button").disabled = false;
  document.querySelector("#stand-button").disabled = false;
  document.querySelector("#newgame-button").disabled = true;
};

// Function calculateHandValue
// Purpose: Calculate the Hand Value for both the player and computer
var calculateHandValue = function(hand, userValue) {
  var value = 0
  for (var i = 0;i < hand.length;i++) {
    if (isNaN(hand[i].name)) {
      if(hand[i].name === "ace") {
        if (userValue.isace11 === true) {
          value += 1;
        } else {
          value += 11;
          userValue.isace11 = true;
        }
      } else {
        value += 10;
      }
    } else {
      value += hand[i].name;
    }
  }
  userValue.value = value
};

// Function checkUserInput
// Purpose: To check whether the user enter "hit" or "stand"
var checkUserInput = function(userInput) {
  if (userInput === "hit" || userInput === "stand") {
    return false;
  }
  return true;
};

/*// Function addingValue
// Purpose: Adding the values
var addingValue = function (userValue, userHand) {
  var card = getRandomCard();
  userHand.push(card);
  if (card.name === "ace" && userValue.isace11 === true) {
    userValue.value += 1;
  } else if (card.name === "ace" && (userValue.value+11) <= 21) {
    userValue.value += 11;
    userValue.isace11 = true;
  } else if (card.name === "ace") {
    userValue.value += 1;
  } else if (isNaN(card.name)) {
    if ((userValue.value + 10) >= 21 && userValue.isace11 === true) {
      userValue.value = userValue.value - 10 + 10;
      userValue.isace11 = false;
    } else {
      userValue.value += 10;
    }
  } else {
    if ((userValue.value + card.name) >= 21 && userValue.isace11 === true) {
      userValue.value = userValue.value - 10 + card.name;
      userValue.isace11 = false;
    } else {
      userValue.value += card.name;
    }
  }
};*/

// Function addingValue
// Purpose: Adding the values
var addingValue = function (userValue, userHand) {
  var card = getRandomCard();
  userHand.push(card);
  if (card.name === "ace") {
    if (userValue.isace11 === true) {
      userValue.value += 1;
    } else if ((userValue.value+11) <= 21) {
      userValue.value += 11;
      userValue.isace11 = true;
    } else {
      userValue.value += 1;
    }
  } else if (isNaN(card.name)) {
    if ((userValue.value + 10) >= 21 && userValue.isace11 === true) {
      userValue.value = userValue.value - 10 + 10;
      userValue.isace11 = false;
    } else {
      userValue.value += 10;
    }
  } else {
    if ((userValue.value + card.name) >= 21 && userValue.isace11 === true) {
      userValue.value = userValue.value - 10 + card.name;
      userValue.isace11 = false;
    } else {
      userValue.value += card.name;
    }
  }
};

// Function printOutput
// Purpose: Print output message
var printOutput = function() {
  myOutputValue = ''
  myOutputValue += `Player has: `
  for (var i = 0; i < playerHand.length; i++) {
    if (i === playerHand.length - 1) {
      myOutputValue += `${playerHand[i].name}`
    } else {
      myOutputValue += `${playerHand[i].name},`
    }
  }
  myOutputValue += ` with a sum of ${playerValue.value}<br>Computer has: `;
  if (userStand === true || computerBlackjack === true || playerBlackjack === true) {
    for (var i = 0; i < computerHand.length; i++) {
      if (i === computerHand.length - 1) {
        myOutputValue += `${computerHand[i].name}`
      } else {
        myOutputValue += `${computerHand[i].name},`
      }
    }
    myOutputValue += ` with a sum of ${computerValue.value}<br>`;
  } else {
    myOutputValue += "??,";
      for (var i = 1; i < computerHand.length; i++) {
        if (i === computerHand.length - 1) {
          myOutputValue += `${computerHand[i].name}<br>`
        } else {
          myOutputValue += `${computerHand[i].name},`
        }
    }
  }
  if (playerBlackjack === true || playerWon === true) {
    myOutputValue += `Player has Won. Press New Game to start a new game`;
    document.querySelector("#container").style.backgroundColor = "#7FFF00";
    return;
  } else if (computerBlackjack === true || computerWon === true) {
    myOutputValue += `Computer has Won. Press New Game to start a new game`;
    document.querySelector("#container").style.backgroundColor = "#CD5C5C";
    return;
  } else if (userStand === true) {
    myOutputValue += `Draw. Press New Game to start a new game`;
    return;
  }
  if (!userHitStand || !computerHitStand) {
    myOutputValue += `Please click "hit" or "stand"`;
  }
};

// Function checkWinCondition
// Purpose: Check whether player or computer won
var checkWinCondition = function() {
  if (playerValue.value > computerValue.value && playerValue.value <= 21) {
    playerWon = true;
  } else if (playerValue.value < computerValue.value && computerValue.value > 21 && playerValue.value <= 21) {
    playerWon = true;
  } else if (playerValue.value > 21 && computerValue.value > 21){
    return;
  }else if (playerValue.value === computerValue.value){
    return;
  } else {
    computerWon = true;
  }
};

// Function resetGameState
// Purpose: Reset Game State of the program
var resetGameState = function() {
  userHitStand = false;
  computerHitStand = false;
  userStand = false;
  document.querySelector("#hit-button").disabled = true;
  document.querySelector("#stand-button").disabled = true;
  document.querySelector("#newgame-button").disabled = false;
}

// Function gameReset
// Purpose: Reset all the values stored
var gameReset = function() {
  document.querySelector("#container").style.backgroundColor = "lightblue";
  playerWon = false;
  computerWon = false;
  playerBlackjack = false;
  computerBlackjack = false;
  myOutputValue = '';
  playerHand = [];
  computerHand = [];
  playerValue = {
    value: 0,
    isace11: false,
  };
  computerValue = {
    value: 0,
    isace11: false,
  };
};

// Main Function
var main = function (input) {
  console.log(input);
  if (userHitStand === false) {
    gameReset();
    startGame();
    calculateHandValue(playerHand,playerValue);
    calculateHandValue(computerHand,computerValue);
    if (playerValue.value === 21) {
      playerBlackjack = true;
      printOutput();
      resetGameState();
      return myOutputValue;
    } else if (computerValue.value === 21) {
      computerBlackjack = true;
      printOutput();
      resetGameState();
      return myOutputValue;
    }
    printOutput();
    userHitStand = true;
  }
  else if (computerHitStand === false) {
    if (checkUserInput(input)) {
      return `Please enter "hit" or "stand"`;
    }
    if (input === "hit") {
      addingValue(playerValue, playerHand);
      printOutput();
    } else {
      userStand = true;
      while (computerValue.value < 17) {
        addingValue(computerValue, computerHand);
      }
      checkWinCondition();
      printOutput();
      resetGameState();
    }
  }
  return myOutputValue;
};