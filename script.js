gameDeck = [];
playerTotals = [];
playerHands = []; //Cards player has
compHand = []; //Cards COMPUTER has
cTotal = 0; //Sum of cards
playerNames = [];
currentPlayer = 0; //playerNames[currentPlayer]

currentMode = "0";
/*Modes:
0 - Input names
1 - Player(s) move. Will utilize playerNames[] indices as sub-modes
1b - Player switch (loops back to mode 1), or COMP move when all players done
2 - Determination
*/

//For when more than one name is entered into INPUT. Works with just one name.
var multipleNames = function (input) {
  //Splits input into multiple strings and puts into new array inputSplitter[]
  var inputSplitter = input.split(" ");
  //Modifies playerAdj[] array by adding elements in inputSplitter[] array
  playerNames.push.apply(playerNames, inputSplitter);
  console.log(`Player names: ${playerNames}.`);
};

//Creating deck
var mainDeck = function () {
  cardDeck = [];
  var cardSuits = ["♦️", "♣️", "♥️", "♠️"];

  //Outer loop: assigns suits
  for (suitsIndex = 0; suitsIndex < cardSuits.length; suitsIndex += 1) {
    var currentSuit = cardSuits[suitsIndex];

    //Inner Loop 1: Creating the number cards
    for (counter = 2; counter <= 11; counter += 1) {
      var cardNumber = counter;
      if (cardNumber == 11) {
        cardNumber = "Ace";
      }
      var cardAttributes = {
        name: cardNumber,
        suit: currentSuit,
        rank: counter,
      };

      //Add card to main deck
      cardDeck.push(cardAttributes);
    }
    //Inner Loop 2: Ensuring JQK have rank of 10
    for (i = 0; i < 3; i += 1) {
      var pictureCard = i;
      if (pictureCard == 0) {
        pictureCard = "Jack";
      }
      if (pictureCard == 1) {
        pictureCard = "Queen";
      }
      if (pictureCard == 2) {
        pictureCard = "King";
      }
      var cardAttributes = {
        name: pictureCard,
        suit: currentSuit,
        rank: 10,
      };
      //Add card to main deck
      cardDeck.push(cardAttributes);
    }
  }
  return cardDeck;
};

//Shuffle function
var shuffle = function (cardDeck) {
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

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

//Shuffle the deck, push to gameDeck[]
var shuffleTheDeck = function () {
  gameDeck = shuffle(mainDeck());
  console.log(`Game Deck:`);
  console.log(gameDeck);
};

//Initial function - mode 0
var initialCompDraw = function () {
  for (i = 0; i < 2; i += 1) {
    var compCard = gameDeck.pop();
    compHand.push(compCard);
  }
  console.log(`COMPUTER Hand: `);
  console.log(compHand);
};

var cardAssignment = function () {
  for (i = 0; i < 2; i += 1) {
    var compCard = gameDeck.pop();
    compHand.push(compCard);
  }
  console.log(`COMPUTER Hand: `);
  console.log(compHand);
};

//First assigns cards to players, but in a separate array, playerHands[].
//Using the indexes in that array to correspond to the names in playerNames[]
var initialPlayerCardAssign = function () {
  for (i = 0; i < playerNames.length; i += 1) {
    var cardsInHand = [];
    for (idx = 0; idx < 2; idx += 1) {
      var card = gameDeck.pop();
      cardsInHand.push(card);
    }
    playerHands[i] = [cardsInHand]; //Assigning the two cards to each index in playerHands[]
    console.log(cardsInHand);
  }
};

//Displays what cards the current player has in hand
var greyBoxCardOutput = function (currentPlayer) {
  var playerOutputValue = playerNames[currentPlayer] + "'s cards:";
  for (i = 0; i < playerHands[currentPlayer][0].length; i += 1) {
    playerOutputValue +=
      `<br/>` +
      playerHands[currentPlayer][0][i].name +
      playerHands[currentPlayer][0][i].suit;
  }
  console.log(`Showing player their hand`);
  return playerOutputValue;
};

//Ace points changer. Faith helped!
var aceChange = function (pasteInHandType) {
  if (pasteInHandType.length > 2) {
    for (var i in pasteInHandType) {
      if (pasteInHandType[i].name == "Ace") {
        pasteInHandType[i].rank = 1;
      }
    }
  }
};

//Sums up a player's hand and gives the total number
var playerScore = function (currentPlayer) {
  aceChange(playerHands[currentPlayer][0]);
  var pSum = 0;
  for (iTot = 0; iTot < playerHands[currentPlayer][0].length; iTot += 1) {
    pSum += Number(playerHands[currentPlayer][0][iTot].rank);
  }
  console.log(playerNames[currentPlayer] + `'s card score: ` + pSum);
  console.log(playerNames[currentPlayer] + `'s hand: `);
  console.log(playerHands[currentPlayer][0]);
  playerTotals[currentPlayer] = pSum;
  return pSum;
};

//Player adds cards - mode 1
var playerAction = function (input) {
  console.log(`Starting Player: ${currentPlayer}`);
  if (input == "") {
    console.log(`Drawing Player: ${currentPlayer}`);
    playerScore(currentPlayer);
    var playerCard = gameDeck.pop();
    playerHands[currentPlayer][0].push(playerCard);
    var playerOutputValue = greyBoxCardOutput(currentPlayer);
    console.log(`>>Player added card.`);
    playerScore(currentPlayer);
    myOutputValue =
      playerOutputValue +
      `<br><br>Total count: ${playerTotals[currentPlayer]}<br><br>Would you like to stay as you are or add an additional card? Click SUBMIT to add a card, or enter 'stay' to finish your turn`;
    return myOutputValue;
  } else if (input == "stay") {
    currentMode = "1b";
    currentPlayer += 1;
    console.log(`Player changed to: ` + playerNames[currentPlayer]);
    console.log(`Mode Changed: ` + currentMode);
  }
};

//Player Change - mode 1b
var playerChange = function () {
  if (currentPlayer < playerNames.length) {
    console.log(`Current Mode: ` + currentMode);
    console.log(`Current Player: ${currentPlayer}`);
    playerScore(currentPlayer);
    myOutputValue =
      `You have decided to keep your hand. ` +
      playerNames[currentPlayer] +
      `, it's your turn! <br><br>` +
      greyBoxCardOutput(currentPlayer) +
      `<br><br>Total count: ${playerTotals[currentPlayer]}<br><br>Would you like to stay as you are or add an additional card? Click SUBMIT to add a card, or enter 'stay' to finish your turn.`;
    currentMode = "1";
    console.log(`Mode Changed: ` + currentMode);
  } else if (currentPlayer == playerNames.length) {
    compScore();
    compAction();
    myOutputValue = `The final player has had their turn! <br><br>The dealer has also taken their turn because I coded it to run this way and save you a click (IDK how to talk my way out of this shortcut).<br><br>Click SUBMIT to see who won/lost!`;
  }
  return myOutputValue;
};

//Calculating COMP score
var compScore = function () {
  aceChange(compHand);
  var cSum = 0;
  for (iTot = 0; iTot < compHand.length; iTot += 1) {
    cSum += Number(compHand[iTot].rank);
  }
  console.log(`COMP card score: ` + cSum);
  cTotal = cSum;
  console.log(`COMP hand: `);
  console.log(compHand);
};

//COMP adds cards - mode 1b
var compAction = function () {
  console.log(`CHECK MODE: ` + currentMode);
  console.log(`COMP card score: ` + cTotal);
  while (cTotal < 17) {
    var compCard = gameDeck.pop();
    compHand.push(compCard);
    console.log(`>>COMPUTER added card.`);
    compScore(); //Necessary for pushing new score to cTotal global variable
  }
  cTotal += 1;
  if (cTotal >= 17) {
    currentMode = 2;
    console.log(`Mode changed to: ` + currentMode);
  }
};

/*Determination Rules:
Over 21 = LOSE
21 = WIN

Within 21 limit:
Bigger number = WIN
Smaller number = LOSE
Numbers same = DRAW
*/

//Determine the winner - mode 2
//BY RIGHT, function will go through all the conditions based off which player is being represented by the index (i), then return statement after statement as it loops through all the playerNames[] indices.
var determineWinner = function () {
  var outputStatements = [];
  var playAgainStatement = `<br><br>To play another round, enter 'again'.`;
  for (i = 0; i < playerNames.length; i += 1) {
    if (playerTotals[i] == cTotal) {
      var myOutputValue =
        playerNames[i] +
        `: You draw with the dealer! ${playerTotals[i]} vs. ${cTotal}<br><br>`;
    } else if (playerTotals[i] == 21 && cTotal !== 21) {
      var myOutputValue =
        playerNames[i] +
        `: You beat the dealer! ${playerTotals[i]} vs. ${cTotal}<br><br>`;
    } else if (cTotal == 21 && playerTotals[i] !== 21) {
      var myOutputValue =
        playerNames[i] +
        `: You lost to the dealer! ${playerTotals[i]} vs. ${cTotal}<br><br>`;
    } else if (cTotal < 21 && playerTotals[i] > 21) {
      var myOutputValue =
        playerNames[i] +
        `: You went BUST! ${playerTotals[i]} vs. ${cTotal}<br><br>`;
    } else if (playerTotals[i] > cTotal && playerTotals[i] <= 21) {
      var myOutputValue =
        playerNames[i] +
        `: You beat the dealer! ${playerTotals[i]} vs. ${cTotal}<br><br>`;
    } else if (playerTotals[i] > 21 && cTotal > 21) {
      var myOutputValue =
        playerNames[i] +
        `: Both parties went BUST! ${playerTotals[i]} vs. ${cTotal}<br><br>`;
    } else if (playerTotals[i] < cTotal && cTotal > 21) {
      var myOutputValue =
        playerNames[i] +
        `: You beat the dealer! ${playerTotals[i]} vs. ${cTotal}<br><br>`;
    } else if (playerTotals[i] < cTotal && cTotal <= 21) {
      var myOutputValue =
        playerNames[i] +
        `: You lost to the dealer! ${playerTotals[i]} vs. ${cTotal}<br><br>`;
    }
    outputStatements.push(myOutputValue);
  }
  console.log(outputStatements);
  return outputStatements + `<br><br>` + `<br><br>` + playAgainStatement;
};

//Function for repeat plays
var lagiSatu = function () {
  gameReset();
  initialPlayerCardAssign();
  initialCompDraw();
  playerScore(currentPlayer);
  currentMode = "1";
  console.log(`Mode changed: ` + currentMode);
  myOutputValue =
    playerNames[0] +
    `, you're up first.<br><br>` +
    greyBoxCardOutput(currentPlayer) +
    `<br><br>Total count: ${playerTotals[currentPlayer]}<br><br>Would you like to stay as you are or add an additional card? Click SUBMIT to add a card, or enter 'stay' to finish your turn.`;
  return myOutputValue;
};

//Resets everything but player points
var gameReset = function () {
  playerHands = []; //Reset player hand
  console.log(`Resetting playerHand. Player hand: `);
  console.log(playerHands);
  currentPlayer = 0;
  console.log(`Current player reset: ${currentPlayer}`);
  compHand = []; //Reset player hand
  console.log(`Resetting compHand. COMP hand: `);
  console.log(compHand);
  cTotal = 0; //Reset sum of cards
  console.log(`COMP count: ${cTotal}`);
};

var main = function (input) {
  console.log(`Current Mode: ` + currentMode);
  if (currentMode == "1") {
    myOutputValue = playerAction(input);
  }
  if (currentMode == "1b") {
    myOutputValue = playerChange();
    return myOutputValue;
  }
  if (currentMode == "0") {
    if (input == "help" || input == "Help") {
      return `Welcome to the help page. You may SUBMIT your name(s) at any time to begin!<br><br>HOW TO PLAY:<br />1) Players must
        either beat the dealer's hand, OR, get 21 with two cards<br />2) Players are dealt 2 cards each in their first turn.<br />3) Players may
        choose to draw more cards, or stay at however many cards they have.<br /><br />SPECIAL RULE:<br />1) Aces can count as either 1 or 11, but only 1 if
        your hand has 3 cards or more.`;
    }
    multipleNames(input);
    shuffleTheDeck();
    var nameSavedMessage = `Your names have been saved! `;
    initialPlayerCardAssign();
    initialCompDraw();
    playerScore(currentPlayer);
    currentMode = "1";
    console.log(`Mode changed: ` + currentMode);
    myOutputValue =
      nameSavedMessage +
      playerNames[0] +
      `, you're up first.<br><br>` +
      greyBoxCardOutput(currentPlayer) +
      `<br><br>Total count: ${playerTotals[currentPlayer]}<br><br>Would you like to stay as you are or add an additional card? Click SUBMIT to add a card, or enter 'stay' to finish your turn.`;
  }
  if (currentMode == "2") {
    if (input == "") {
      myOutputValue = determineWinner();
    }
    if (input == "again") {
      myOutputValue = `Another round has started! <br><br>` + lagiSatu();
    }
  }
  return myOutputValue;
};
