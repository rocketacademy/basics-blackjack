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
// Based on gameMode, win/lose/continue
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
    if (sumHand() > 21) {
      // game mode dealerturn and dealer busts = win
      console.log('The dealer overdrew and busted.');
      outcome = 'win';
    } else {
      outcome = 'continue';
    }
  } else if (currentGameMode == 'resultsTime') {
    if ((sumHand(dealerSum) < sumHand(playerSum)) && playerSum < 21) {
      // game mode dealerturn and player > dealer = win
      console.log('Everyone opens their hands. The player had ' + sumHand(playerHand) + ' while the dealer had ' + sumHand(dealerHand));
      console.log('Player beat dealer. Player wins');
      outcome = 'win';
    } else if ((sumHand(dealerSum) > sumHand(playerSum) && dealerSum < 21)) {
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
// inputs: outcome from function 5, the two people's hand and names
var printOutcomeMessage = function (outcome, p1Hand, p2Hand, p1Name, p2Name) {
  var outcomeMsg = '';
  var titleMsg = '';
  if (outcome == 'win') {
    titleMsg = `💰💰💰 ${p1Name.toUpperCase()} WIN!! :) <br><br>`;
    outcomeMsg = printHandOutcome(p1Hand, p1Name)
    + printHandOutcome(p2Hand, p2Name);
    return titleMsg + outcomeMsg;
  } if (outcome == 'lose') {
    titleMsg = `💸💸💸 ${p1Name.toUpperCase()} LOSE :( <br><br>`;
    outcomeMsg = printHandOutcome(p1Hand, p1Name)
    + printHandOutcome(p2Hand, p2Name);
    return titleMsg + outcomeMsg;
  } if (outcome == 'tie') {
    titleMsg = "!! TIE !!<br> 'no one won' <br><br>";
    outcomeMsg = printHandOutcome(p1Hand, p1Name)
    + printHandOutcome(p2Hand, p2Name);
    return titleMsg + outcomeMsg;
  }
};

// Function 8
// For each player, print out cards. compute score.
var printPlayerHands = function(inputFunction){
  var listOfHands = "====== THE TABLE ======";
  for (var i = 0; i < inputFunction.length; i++){
    if (i == 0) {
      listOfHands += "<br> 👨 Dealer: <br>";
    } else{
      if (playerResults[i] == "stand"){
        listOfHands += "<br> 👍 ";
      } else if (playerResults[i] == "pending"){
        listOfHands += "<br> ⌛ "; 
      } else if (playerResults[i].substring(0, 3) == "win"){
        listOfHands += "<br> 💰 "; 
      } else if (playerResults[i].substring(0, 3) == "tie"){
        listOfHands += "<br> 😅 "; 
      } else{
        listOfHands += "<br> 💸 "; 
      }
      listOfHands += "Player " + i + ": <br>";
    }
    for (var j = 0; j < inputFunction[i].length; j++){
      listOfHands += inputFunction[i][j].rank + " ";
    }
    listOfHands += "(Total = " + sumHand(inputFunction[i]) +") ";
  }
  return listOfHands;
}


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
// game modes: inputPlayerCount -> dealCards -> playerNTurn -> 
var gameMode = 'inputPlayerCount';
var numberOfPlayers = 0;
var currentPlayer = 0;
// var resultMode = 'nobodyLostYet';
// var clickSubmitCount = 0;
// var playerSplitStatus = 0;
var individualHands = [];
var playerResults = [];
var hitStandMsg = 'Input (hit/stand)';

// Step 1: Create a new deck of cards
var mainDeck = makeDeck();

// Step 2: Shuffle that deck of cards
mainDeck = shuffleTheDeck(mainDeck);

// MAIN FUNCTION
// Each gameplay turn is represented by the main function
// Used console logs to tell story
var main = function (input) {
  // clickSubmitCount++;
  var titleMsg;
  var myOutputValue;
  console.log("======");
  console.log("gamemode: " + gameMode);

  // Step 3: Input number of players
  if (gameMode == 'inputPlayerCount') {
    if (isNaN(input) || input == "" ){
      myOutputValue = "Please input a number!";
    } else{
      numberOfPlayers = input;
      for (var i = 0; i <= numberOfPlayers; i++){
        individualHands.push([]);
        playerResults.push("pending")
      }

      console.log("players: " + numberOfPlayers);
      console.log("hands: " + individualHands);
      gameMode = "dealCards"
      myOutputValue = `Shuffling deck...<br>Click Submit to continue!`;
      return myOutputValue;
    }
  };

  // Step 4: Deal cards to each player
  if (gameMode == 'dealCards'){
    for (var i = 0; i < 2; i++){
      for(var j = 0; j <= numberOfPlayers; j++){
      individualHands[j].push(mainDeck.pop())
    }
    }
    myOutputValue = "Player 1 will now take his turn. Click Submit to continue.";
    gameMode = "playerTakeTurns";
    return myOutputValue;
  }

  // Step 6: If Dealer's turn
  if (gameMode == "dealerTurn"){
    while (sumHand(individualHands[0]) < 16) {
      individualHands[0].push(mainDeck.pop());
      console.log('The dealer hand was less than 16. He drew another card. He now has ' + sumHand(individualHands[0]));
    }
    console.log('The dealer can no longer draw cards.');
    gameMode = 'resultsTime';
  }

  // Step 5: Players take turns to hit/stand
  if (gameMode == "playerTakeTurns"){
    // If variable is 0, the 1st player should go first.
    if (currentPlayer == 0){
      currentPlayer = 1;
    }
    
    // Player action
    console.log("Current Player: " + currentPlayer);
    if (input == "h"){
      individualHands[currentPlayer].push(mainDeck.pop())
    } 
    if (input == "s") {
      myOutputValue = "Player " + currentPlayer + " chose to stand.";
      playerResults[currentPlayer] = "stand";
      console.log("stand master" + playerResults[currentPlayer]);
      currentPlayer += 1;
      if (currentPlayer > numberOfPlayers){
        myOutputValue += "<br><br> The Dealer will now take his turn. Click Submit to continue.";
        gameMode = "dealerTurn";
      }else{
        myOutputValue += "<br><br> Player "+ currentPlayer+" will now take his turn. Click Submit to continue.";
      }
      
      return myOutputValue;
    }

    myOutputValue = "Player " + currentPlayer + ", do you hit or stand? (h/s)";
  }

  // Step 7: Results
  if(gameMode == "resultsTime"){
    outputResults = "RESULTS: "
    for (var i = 1; i <= numberOfPlayers; i++){
      if (sumHand(individualHands[i]) == 21) {
        playerResults[i] = "win 1.5x";
      } else if (sumHand(individualHands[i]) > 21){
        playerResults[i] = "bust";
      } else if (sumHand(individualHands[0]) > 21){
        playerResults[i] = "win 2x"
      } else if (sumHand(individualHands[i]) > sumHand(individualHands[0])){
        playerResults[i] = "win 2x"
      } else if (sumHand(individualHands[i]) < sumHand(individualHands[0])){
        playerResults[i] = "lose"
      } else if (sumHand(individualHands[i]) = sumHand(individualHands[0])){
        playerResults[i] = "tie; no money lost!"
      }
      outputResults += "<br>Player " + i + ": " + playerResults[i];
    }
    myOutputValue = "The Game has ended. Congratulations to all lucky winners!"
    myOutputValue += "<br><br>" + outputResults;
  }

  
  return myOutputValue;
};
