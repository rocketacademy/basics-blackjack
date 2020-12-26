// Function 1
// Creates the deck of cards
var makeDeck = function () {
  var deck = [];
  // Create array of four suits and loop through each suit
  var suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // store current suit in variable
    var currentSuit = suits[suitIndex];
    // For each suit, create the each card
    var cardIndex = 1;
    while (cardIndex <= 13) {
      var cardName = cardIndex;
      // for special cards, the cardName has to be special
      if (cardName == 1) {
        cardName = 'ace';
      } else if (cardName == 11) {
        cardName = 'jack';
      } else if (cardName == 12) {
        cardName = 'queen';
      } else if (cardName == 13) {
        cardName = 'king';
      }
      // create particular card
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: cardIndex,
      };
      // add card to the deck
      deck.push(card);

      cardIndex++;
    }
    suitIndex++;
  }
  return deck;
};

// Function 2
// Shuffles the deck of cards
var shuffleTheDeck = function (inputDeck) {
  // loop through every card, and pick a random card to swap with
  var counter = 0;
  while (counter < inputDeck.length) {
    // draw the two cards to swap and store in temporary places
    var randomNumber = Math.floor(Math.random() * inputDeck.length);
    var drawnCard = inputDeck[counter];
    var randomCard = inputDeck[randomNumber];

    // Swap the card positions
    inputDeck[counter] = randomCard;
    inputDeck[randomNumber] = drawnCard;
    counter++;
  }
  // return the shuffled deck
  return inputDeck;
};

// Function 3
// computes total value of hand
var sumHand = function (initialInput) {
  var inputArray = initialInput.slice(); // to avoid modifying the original hand order
  var totalSum = 0;

  // if there is an ace, this has to be considered LAST. swap with last card
  for (var j = 0; j < inputArray.length; j++) {
    if (inputArray[j].rank == 1) {
      var tempHolder = inputArray[inputArray.length - 1];
      inputArray[inputArray.length - 1] = inputArray[j];
      inputArray[j] = tempHolder;
    }
  }

  // loop through and add the cards
  for (var i = 0; i < inputArray.length; i++) {
    // console.log(i);
    // console.log(inputArray[i].rank);
    if (inputArray[i].rank > 10) {
      // add 10 if it is a picture card
      // console.log('10');
      totalSum += 10;
    } else if (inputArray[i].rank > 1) {
      totalSum += inputArray[i].rank;
    } else if (inputArray[i].rank == 1) {
      // console.log('ace');
      if (totalSum < 11) {
        totalSum += 11;
      } else {
        totalSum += 1;
      }
    }
  }
  return totalSum;
};

// Function 4
// prints out and computes results
var printHandOutcome = function (playerHandArray, person) {
  var cardsPrint = `--- ${person} cards --- `;
  for (var i = 0; i < playerHandArray.length; i++) {
    cardsPrint = cardsPrint + '<br>' + playerHandArray[i].name
    + ' of ' + playerHandArray[i].suit;
  }
  cardsPrint = cardsPrint + '<br><br>' + `--- ${person} Total Value ---`
    + '<br>' + sumHand(playerHandArray)
    + '<br><br>';

  return cardsPrint;
};

// Function 5
// Check if player wins or loses
var checkWin = function (playerSum, dealerSum, currentGameMode) {
  var outcome;

  if (currentGameMode == 'playerTurn' || currentGameMode == 'playerSplitHand1' || currentGameMode == 'playerSplitHand2') {
    if (sumHand(playerSum) == 21) {
      // game mode playerturn and player gets 21 = win
      console.log('The player scored a perfect 21');
      outcome = 'win';
    } else if (sumHand(playerSum) > 21) {
      // game mode playerturn and player busts = lose
      console.log('The player busted!');
      outcome = 'lose';
    } else if (sumHand(playerSum) < 21) {
      // game mode playerturn and player doesn't bust = continue
      outcome = 'continue';
      console.log('The player is still safe. He can sit or stand.');
    } else {
      outcome = 'tie';
      console.log('There was a tie. Interesting.');
    }
  } else if (currentGameMode == 'dealerTurn') {
    if (sumHand(dealerSum) > 21) {
      // game mode dealerturn and dealer busts = win
      console.log('The dealer overdrew and busted.');
      outcome = 'win';
    } else {
      outcome = 'continue';
    }
  } else if (currentGameMode == 'resultsTime') {
    if (sumHand(dealerSum) < sumHand(playerSum)) {
      // game mode dealerturn and player > dealer = win
      console.log('Everyone opens their hands. The player had ' + sumHand(playerHand) + ' while the dealer had ' + sumHand(dealerHand));
      console.log('Player beat dealer. Player wins');
      outcome = 'win';
    } else if (sumHand(dealerSum) > sumHand(playerSum)) {
      // game mode dealerturn and player < dealer = lose
      console.log('Everyone opens their hands. The player had ' + sumHand(playerHand) + ' while the dealer had ' + sumHand(dealerHand));
      console.log('Dealer beat player. Dealer wins');
      outcome = 'lose';
    } else {
      outcome = 'tie';
      console.log('There was a tie. Interesting.');
    }
  }
  return outcome;
};

// Function 6
// Input validation
var inputValidation = function (playerInput, gameRoundCount) {
  var inputStatus = true;
  // for gameMode = playerTurn
  if (gameRoundCount > 1 && gameMode == 'playerTurn' && !(playerInput == 'hit' || playerInput == 'stand')) {
    inputStatus = false;
  }
  return inputStatus;
};

// Function 7
// Print out message depending on win/lose/tie outcome
// inputs: o
var printOutcomeMessage = function (outcome, p1Hand, p2Hand, p1Name, p2Name) {
  var outcomeMsg = '';
  var titleMsg = '';
  if (outcome == 'win') {
    titleMsg = '💰💰💰 YOU WIN!! :) <br><br>';
    outcomeMsg = titleMsg
    + printHandOutcome(p1Hand, p1Name)
    + printHandOutcome(p2Hand, p2Name);
  } else if (outcome == 'lose') {
    titleMsg = '💸💸💸 YOU LOSE :( <br><br>';
    outcomeMsg = titleMsg
    + printHandOutcome(p1Hand, p1Name)
    + printHandOutcome(p2Hand, p2Name);
  } else if (outcome == 'tie') {
    titleMsg = "!! TIE !!<br> 'no one won' <br><br>";
    outcomeMsg = titleMsg
    + printHandOutcome(p1Hand, p1Name)
    + printHandOutcome(p2Hand, p2Name);
  }

  return titleMsg + outcomeMsg;
};

var testDeck = [
  {
    name: 5,
    suit: 'hearts',
    rank: 5,
  },
  {
    name: 5,
    suit: 'clubs',
    rank: 5,
  },
];

// ######################################################################
// START OF GAME

// Step 0: Declare variables, set default game mode
var gameMode = 'dealCards';
var clickSubmitCount = 0;
var playerSplitStatus = 0;
var playerHand = [];
var playerSplitHand = [];
var dealerHand = [];
var hitStandMsg = 'Input (hit/stand)';

// Step 1: Create a new deck of cards
var mainDeck = makeDeck();

// Step 2: Shuffle that deck of cards
mainDeck = shuffleTheDeck(mainDeck);

// MAIN FUNCTION
// Each gameplay turn is represented by the main function
// Used console logs to tell story
var main = function (input) {
  clickSubmitCount++;
  var titleMsg;
  var myOutputValue;

  // Step 3: Deal to player, dealer, player, dealer
  if (gameMode == 'dealCards') {
    playerHand.push(testDeck[0]);// mainDeck.pop());
    dealerHand.push(mainDeck.pop());
    playerHand.push(testDeck[1]);// mainDeck.pop());
    dealerHand.push(mainDeck.pop());

    // story
    console.log('The cards were dealt');
    console.log('Player scored: ' + sumHand(playerHand));

    // Set up result in output message
    myOutputValue = 'PLAYER TURN <br><br>'
    + printHandOutcome(playerHand, 'Player');

    // player drew two identically ranked cards. Player offered option to split
    // otherwise, player can hit/stand
    if (playerHand[0].rank == playerHand[1].rank) {
      myOutputValue = myOutputValue + 'Would you like to split? (Y/N)';
      gameMode = 'playerSplit';
    } else {
      myOutputValue = myOutputValue + hitStandMsg;
      gameMode = 'playerTurn';
    }
  }

  // Step 3.1: If player offered split
  if (gameMode == 'playerSplit' && clickSubmitCount > 1) {
    if (input == 'Y') {
      titleMsg = 'You chose to split. Let\'s look at your first hand';
      playerSplitStatus = 1;
      gameMode = 'playerSplitHand1';
      playerSplitHand.push(playerHand.pop());
      playerHand.push(mainDeck.pop());
      playerSplitHand.push(mainDeck.pop());

      myOutputValue = titleMsg + '<br><br>'
      + printHandOutcome(playerHand, 'Player hand 1')
      + printHandOutcome(playerSplitHand, 'Player hand 2')
      + hitStandMsg;
    } else if (input == 'N') {
      titleMsg = 'You chose not to split';
      gameMode = 'playerTurn';
      myOutputValue = titleMsg + '<br><br>'
      + printHandOutcome(playerHand, 'Player')
      + hitStandMsg;
    }
    clickSubmitCount = 0;
  }

  // Step 4: Validate user input
  if (!inputValidation(input, clickSubmitCount)) {
    myOutputValue = '🙅‍♂️ Invalid input. <br> Please input \'hit\' or \'stand\' <br><br>'
    + printHandOutcome(playerHand, 'Player');
    return myOutputValue;
  }

  // Step 5.1: user HITS during player mode (get another card)
  if (gameMode == 'playerTurn' && input == 'hit') {
    playerHand.push(mainDeck.pop());
    myOutputValue = printHandOutcome(playerHand, 'Player') + hitStandMsg;
    // story
    console.log('Player hit. His hand is now: ' + sumHand(playerHand));
  }

  // Step 5.2.1: user HITS during playerSplitHand1
  if (gameMode == 'playerSplitHand1' && input == 'hit') {
    playerHand.push(mainDeck.pop());
    myOutputValue = printHandOutcome(playerHand, 'Player hand 1') + hitStandMsg;
  }

  // Step 5.2.2: user HITS during playerSplitHand2
  if (gameMode == 'playerSplitHand2' && input == 'hit') {
    playerSplitHand.push(mainDeck.pop());
    myOutputValue = printHandOutcome(playerSplitHand, 'Player hand 2') + hitStandMsg;
  }

  // Step 6: user STANDS during player mode.
  if (gameMode == 'playerTurn' && input == 'stand') {
    console.log('Player stand. His hand is now: ' + sumHand(playerHand));
    gameMode = 'dealerTurn';
  } else if (gameMode == 'playerSplitHand1' && input == 'stand') {
    gameMode = 'playerSplitHand2';
    myOutputValue = 'Let\'s move on to your 2nd hand <br><br>'
    + printHandOutcome(playerSplitHand, 'Player hand 2')
    + hitStandMsg;
  } else if (gameMode == 'playerSplitHand2' && input == 'stand') {
    gameMode = 'playerSplitEnd';
    myOutputValue = printHandOutcome(playerSplitHand, 'Player (split)') + 'Click next to see result';
  }

  // Step 7: Dealer's turn
  if (gameMode == 'dealerTurn') {
    console.log('Dealer opens his cards. He has ' + sumHand(dealerHand));

    while (sumHand(dealerHand) < 16) {
      dealerHand.push(mainDeck.pop());
      console.log('The dealer hand was less than 16. He drew another card. He now has ' + sumHand(dealerHand));
    }
    console.log('The dealer can no longer draw cards.');
    gameMode = 'resultsTime';
  }

  // Step 7: Update myOutputValue if the player wins or loses
  var outcome = checkWin(playerHand, dealerHand, gameMode);
  myOutputValue = 
  var outcome2 = checkWin(playerSplitHand, dealerHand, gameMode);

  if (outcome == 'win') {
    titleMsg = '💰💰💰 YOU WIN!! :) <br><br>';
    myOutputValue = titleMsg
    + printHandOutcome(playerHand, 'player')
    + printHandOutcome(dealerHand, 'Dealer');
  } else if (outcome == 'lose') {
    titleMsg = '💸💸💸 YOU LOSE :( <br><br>';
    myOutputValue = titleMsg
    + printHandOutcome(playerHand, 'player')
    + printHandOutcome(dealerHand, 'Dealer');
  } else if (outcome == 'tie') {
    titleMsg = "!! TIE !!<br> 'no one won' <br><br>";
    myOutputValue = titleMsg
    + printHandOutcome(playerHand, 'player')
    + printHandOutcome(dealerHand, 'Dealer');
  }

  return myOutputValue;
};
