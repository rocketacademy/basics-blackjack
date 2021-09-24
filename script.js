// Declaration of variables
var playerArray = [];
var computerArray = [];
var playerValue = 0;
var computerValue = 0;
var playerHand = [];
var computerHand = [];
var myOutputValue = "";
var playerWallet = 20;
var betValue = 2;
var multiplier = 1;
var noOfAces_Player = 0;
var noOfAces_Computer = 0;
var deck = [];
var yesImage = '<img src="https://c.tenor.com/Ud36Rrav628AAAAC/yes-baby.gif"/>';
var damnitImage =
  '<img src="https://c.tenor.com/TO4pjcXk3OwAAAAM/angry-seccato.gif"/>';
var bankruptImage =
  '<img src="https://c.tenor.com/JC3PMZZdsO0AAAAM/wheel-of-fortune-wheel.gif"/>';
var drawImage =
  '<img src="https://c.tenor.com/Nrdj_o8Kj3kAAAAC/standoff-dominic-toretto.gif"/>';
var casinoImage =
  '<img src="https://c.tenor.com/ueqZ53hTwzsAAAAM/gagarin-partners-cpa-casino.gif"/>';
var makeDeck = function () {
  // create the empty deck at the beginning
  var deck = [];

  var suits = ["♥️", "♦️", "♣️", "♣️"];

  var emojiNames = {
    1: "A",
    2: "2️⃣",
    3: "3️⃣",
    4: "4️⃣",
    5: "5️⃣",
    6: "6️⃣",
    7: "7️⃣",
    8: "8️⃣",
    9: "9️⃣",
    10: "🔟",
    11: "🕺🏽",
    12: "👸🏽",
    13: "🤴🏽",
  };

  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // make a variable of the current suit
    var currentSuit = suits[suitIndex];

    // loop to create all cards in this suit
    // rank 1-13
    var counter = 1;
    while (counter <= 13) {
      var rankCounter = counter;
      var cardName = rankCounter;

      // 1, 11, 12 ,13
      // for BlackJack only, change the card rank for the face cards to 10.
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        rankCounter = 10;
        cardName = "jack";
      } else if (cardName == 12) {
        rankCounter = 10;
        cardName = "queen";
      } else if (cardName == 13) {
        rankCounter = 10;
        cardName = "king";
      }

      var emojiName = emojiNames[counter];
      // make a single card object variable
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        emojiName: emojiName,
      };

      // add the card to the deck
      deck.push(card);

      counter = counter + 1;
    }
    suitIndex = suitIndex + 1;
  }

  return deck;
};
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};
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
var DEALCARDS = "dealCards";
var HITORSTAND = "hitOrStand";
var END = "end";
var RESET = "reset";
var CHOOSEBET = "chooseBet";
var START = "start";
gameMode = START;

// Function: Reset all variables to base values
var resetValues = function () {
  deck = makeDeck();
  playerArray = [];
  computerArray = [];
  playerValue = 0;
  computerValue = 0;
  playerHand = [];
  computerHand = [];
  noOfAces_Player = 0;
  noOfAces_Computer = 0;
};

// Function: Add card name and suit into your hand + computer's hand
var createHand = function () {
  for (i = 0; i < playerArray.length; i++) {
    playerHand.push(`${playerArray[i].name} ${playerArray[i].suit}`);
  }
  for (i = 0; i < computerArray.length; i++) {
    computerHand.push(`${computerArray[i].name} ${computerArray[i].suit}`);
  }
};

// Function: Display your hand + computer's hand
var displayHand = function () {
  return `Your hand: ${playerHand.join(
    ", "
  )} with a sum of ${playerValue}.<br/><br/>Computer's hand: ${computerHand.join(
    ", "
  )} with a sum of ${computerValue}.<br/><br/>`;
};

var displayWallet = function () {
  return `<br/>You have $${playerWallet} in your wallet.<br/><br/>`;
};
// Function: Deal 2 cards to player and computer respectively
var deal2Cards = function (deck) {
  playerArray.push(deck.pop());
  playerArray.push(deck.pop());
  computerArray.push(deck.pop());
  computerArray.push(deck.pop());
};

// Function: Sum all values in the array
var sumArrayValues = function (array, value) {
  for (i = 0; i < array.length; i++) {
    if (array[i].name == "ace") {
      value += 11;
      if (array == playerArray) {
        noOfAces_Player += 1;
      } else if (array == computerArray) {
        noOfAces_Computer += 1;
      }
    } else {
      value += array[i].rank;
    }
  }
  if (array[0].name == "ace" && array[1].name == "ace") {
    value = 21;
  }
  return value;
};

// Function: Add last card in deck to playerArray + add number to playerValue.
var hitCard = function (array, value) {
  array.push(deck.pop());
  if (array[array.length - 1].name == "ace") {
    if (array.length == 3) {
      if (value > 11) {
        value += 1;
      } else {
        value += 10;
      }
    } else if (array.length > 3) {
      value += 1;
    }
  } else {
    value += array[array.length - 1].rank;
  }
  return value;
};

var playerWin = function () {
  playerWallet += betValue;
  myOutputValue =
    `You won $${betValue}!<br/><br/>` +
    yesImage +
    `<br/>` +
    displayHand() +
    displayWallet();
  gameMode = RESET;
};

var playerLose = function () {
  playerWallet -= betValue;
  myOutputValue =
    `You lost $${betValue}! <br/><br/>` +
    damnitImage +
    `<br/>` +
    displayHand() +
    displayWallet();
  gameMode = RESET;
};

var draw = function () {
  myOutputValue =
    `It's a draw! <br/><br/>` +
    drawImage +
    `<br/>` +
    displayHand() +
    displayWallet();
  gameMode = RESET;
};

// Function: Determine if player or computer got blackjack, if not, continue game
var determineBlackJack = function (playerValue, computerValue) {
  if (playerValue == 21 && computerValue == 21) {
    draw();
  } else if (noOfAces_Player == 2) {
    multiplier = 3;
    betValue = betValue * multiplier;
    createHand();
    playerWin();
    myOutputValue = "Two Aces! " + myOutputValue;
  } else if (playerValue == 21) {
    multiplier = 2;
    betValue = betValue * multiplier;
    createHand();
    playerWin();
    myOutputValue = "Blackjack! " + myOutputValue;
  } else if (noOfAces_Computer == 2) {
    multiplier = 3;
    betValue = betValue * multiplier;
    createHand();
    playerLose();
    myOutputValue = "The computer has two Aces! " + myOutputValue;
  } else if (computerValue == 21) {
    multiplier = 2;
    betValue = betValue * multiplier;
    createHand();
    playerLose();
    myOutputValue = "The computer got a Blackjack! " + myOutputValue;
  } else {
    createHand();
    console.log(playerHand);
    myOutputValue =
      `Your hand: <br/><br/>${playerHand.join(
        ", "
      )} <br/><br/>with a sum of ${playerValue}.<br/><br/>` +
      "Do you want to hit another card or stand? <br/><br/>Type h for hit or s for stand";
    gameMode = HITORSTAND;
  }
};

// Function: Determine if player lost. If not, continue.
var hitResult = function () {
  playerValue = hitCard(playerArray, playerValue);
  myOutputValue = `You drew ${playerArray[playerArray.length - 1].name} of ${
    playerArray[playerArray.length - 1].suit
  }.<br/><br/>Your hand is now ${playerValue}.<br/><br/>`;
  if (playerValue > 21) {
    myOutputValue =
      myOutputValue +
      `You still have a chance to draw if the computer's hand exceeds 21. Key in 'go' to see the results!`;
    gameMode = END;
  } else {
    myOutputValue =
      myOutputValue +
      `Type h to hit again, or type s for stand if you are happy with your hand.`;
  }
};

// Function: Computer draw cards until > 16. Compare with player to determine winner. Change gameMode to RESET
var tabulateResult = function () {
  while (computerValue < 16) {
    computerValue = hitCard(computerArray, computerValue);
  }
  // If 5 cards + Value < 21: multiplier = 3x
  if (playerArray.length > 4) {
    multiplier = 2;
    betValue = betValue * multiplier;
    if (playerValue < 22) {
      playerWin();
    } else {
      playerLose();
    }
  } else if (computerArray.length > 4) {
    multiplier = 2;
    betValue = betValue * multiplier;
    if (computerValue < 22) {
      playerLose();
    } else {
      playerWin();
    }
    // If computer and player both exceed 21 - draw
  } else if (computerValue > 21 && playerValue > 21) {
    draw();
    // If computer exceeds 21 - player wins
  } else if (computerValue > 21) {
    playerWin();
    // If player exceeds 21 - player loses
  } else if (playerValue > 21) {
    playerLose();
  } else {
    // Compare player's and computer's values to determine winner
    if (playerValue > computerValue) {
      playerWin();
    } else if (playerValue < computerValue) {
      playerLose();
    } else {
      draw();
    }
  }
};

// MAIN FUNCTION
var main = function (input) {
  console.log(gameMode);
  console.log(playerWallet);

  // START
  if (gameMode == START) {
    console.log(START);
    myOutputValue = `How much do you want to bet? You have $${playerWallet} in your wallet. <br/><br/>Click 'Submit' to deal cards.`;
    gameMode = CHOOSEBET;
  }

  // Part 0: Place bet
  else if (gameMode == CHOOSEBET) {
    if (0 < parseInt(input) && parseInt(input) <= playerWallet) {
      betValue = parseInt(input);
      console.log("betValue: " + betValue);
      gameMode = DEALCARDS;
    } else {
      myOutputValue = `Please place your bet properly. You have $${playerWallet} in your wallet. <br/><br/>Click 'Submit' to deal cards.`;
    }
  }

  // Part 1: DEALCARDS
  if (gameMode == DEALCARDS) {
    // *Player returns cards to deck - reset playerValue, playerArray, computerValue & computerArray
    resetValues();
    // 1. Deck is shuffled.
    deck = makeDeck();
    shuffleCards(deck);
    // 2. User clicks Submit to deal 2 cards to player and computer respectively.
    deal2Cards(deck);
    // Cards are summed up to get playerValue and computerValue
    playerValue = sumArrayValues(playerArray, playerValue);
    computerValue = sumArrayValues(computerArray, computerValue);
    // The cards are analysed for game winning conditions, e.g. Blackjack.
    determineBlackJack(playerValue, computerValue);

    // Part 2: HITORSTAND
  } else if (gameMode == HITORSTAND) {
    // If user hits, add last card in deck to playerArray + add number to playerValue. Determine if player lost. If not, continue.
    if (input == "h") {
      console.log(myOutputValue);
      hitResult();
    }
    // If user stands,prompt user to hit if playerValue < 16.  If not, move on to computer's turn (gameMode: END)
    else if (input == "s") {
      if (playerValue < 16) {
        myOutputValue = "Your hand is below 16. <br/><br/>Type h to hit again";
        gameMode = HITORSTAND;
      } else if (playerValue >= 16) {
        gameMode = END;
      }
    } else {
      myOutputValue = "Please type 'h' for hit or 's' for stand to continue.";
    }
  }
  // Part 3: END
  // Computer draw cards until > 16. Compare with player to determine winner. Change gameMode to RESET
  if (gameMode == END) {
    tabulateResult();
    console.log("computerArray: " + computerArray);
    console.log("playerArray: " + playerArray);
  }

  // Part 4: RESET
  // If gameMode is RESET, ask player to click 'Submit' to play again
  if (gameMode == RESET) {
    if (playerWallet > 0) {
      myOutputValue = myOutputValue + "Click 'Submit' to play again!";
      gameMode = START;
    } else {
      playerWallet = 20;
      myOutputValue =
        myOutputValue +
        "...<br/><br/>Oops, you are BANKRUPT! <br/><br/>" +
        bankruptImage +
        "<br/><br/>Hey, cheer up, here's $20. Click 'Submit' to play again! ";
      gameMode = START;
    }
  }
  return myOutputValue;
};
