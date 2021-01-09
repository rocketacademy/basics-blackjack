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
// Input validation
var inputValidation = function (playerInput, gameRoundCount) {
  var inputStatus = true;
  // for gameMode = playerTurn
  if (gameRoundCount > 1 && gameMode == 'playerTurn' && !(playerInput == 'hit' || playerInput == 'stand')) {
    inputStatus = false;
  }
  return inputStatus;
};

// Function 5
// For each player, print out cards. compute score.
var printPlayerHands = function(allPlayerHandsArray){
  var listOfHands = "====== THE TABLE ======";
  for (var i = 0; i < allPlayerHandsArray.length; i++){
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
      listOfHands += "Player " + i + ": <br> ";
    }
    listOfHands += "(Total = " + sumHand(allPlayerHandsArray[i]) +") <br> ";
    listOfHands += " ";
    for (var j = 0; j < allPlayerHandsArray[i].length; j++){
      listOfHands += "\xa0___\xa0";
    }
    listOfHands += "<br>";
    for (var j = 0; j < allPlayerHandsArray[i].length; j++){
      // listOfHands += allPlayerHandsArray[i][j].rank + " ";
      listOfHands += makeASCIIcard(allPlayerHandsArray[i][j]) ;
    }
    listOfHands += "<br>";
    for (var j = 0; j < allPlayerHandsArray[i].length; j++){
      // listOfHands += "----";
      listOfHands += "|___|";
    }
    // listOfHands += "<br> (Total = " + sumHand(allPlayerHandsArray[i]) +") ";
  }
  return listOfHands;
}

// Function 6
// ASCII-fication of cards
    //  ___
    // |8 ♠️|
    // |___|
var makeASCIIcard = function(cardObject){
  var cardStrImg = "";
  var cardTitle = "";
  var cardSuit = ""

  if (cardObject.suit == "clubs"){
    cardSuit = "♣️";
  } else if (cardObject.suit == "diamonds"){
    cardSuit = "♦️"; 
  } else if (cardObject.suit == "hearts"){
    cardSuit = "♥️";
  } else if (cardObject.suit == "spades"){
    cardSuit = "♠️";
  }

  if (isNaN(cardObject.name)){
    cardTitle = cardObject.name.substring(0, 1).toUpperCase() + " ";
  } else if (cardObject.rank == 10) {
    cardTitle = cardObject.rank;
  } else {
    cardTitle = cardObject.rank + " ";
  }
  cardStrImg += "|" + cardTitle + cardSuit + "|";
  return cardStrImg;
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
// game modes: inputPlayerCount -> playerTakeTurns -> dealerTurn -> 
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
