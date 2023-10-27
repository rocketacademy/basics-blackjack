/*

						                    INITIAL STATE
- global var gameState = "INITIAL"
- global var playerDrawsArray and dealerDrawsArray
- global var playerScore and dealerScore
- initialise deck
- shuffle deck and assign it as shuffled
- draw two cards sequentially for player and dealer
- checkBlackjack function
- blackjackResult = checkBlackjack (playerDrawsArrays, dealerDrawsArrays);
if bjresult = "Nil", output will need to display player's both cards, dealer's first card, player's scores, and ask whether want to hit or stand
gameState will change to what the input is -- do user validation
return output
else if bjresult = "Player", output will display the player's cards and say Blackjack. Press Submit to restart
else if bjresult = "Dealer", output will display the dealer's cards and say Blackjack. Press Submit to restart
else if bjresult = "Both", output will display both player and dealer's cards and say tied. Press Submit to restart

*/

var gameState = "INITIAL";

var shuffled = []; // an array of objects. Initialised globally so we can track back in the later gameStates

var playerDrawsArray = [];
var playerScore;

var dealerDrawsArray = [];
var dealerScore;

var main = function (input) {
  var output = ""; // output initialised outside of the gameState blocks to always refresh it no matter what gameState
  // statement below is to help convert the gameState to HIT or STAND based on player input
  if (input == "hit" || input == "stand") {
    gameState = input.toUpperCase();
  }
  // INITIAL gameState
  if (gameState == "INITIAL") {
    // "refresh" the player and dealer draws everytime we start a new game
    playerDrawsArray = [];
    dealerDrawsArray = [];
    var deck = makeDeck();
    shuffled = shuffleDeck(deck);
    for (var i = 0; i < 2; i++) {
      playerDrawsArray[i] = shuffled.pop();
      dealerDrawsArray[i] = shuffled.pop();
    }
    playerScore = checkScore(playerDrawsArray, playerScore);
    dealerScore = checkScore(dealerDrawsArray, dealerScore);
    // player: do check for ace ace draw and reassign ace value accordingly
    if (checkIfAceInDrawAndScoreBurst(playerDrawsArray, playerScore)) {
      playerDrawsArray = reassignAceValue(playerDrawsArray, playerScore);
    }
    // dealer: do check for ace ace draw and reassign ace value accordingly
    if (checkIfAceInDrawAndScoreBurst(dealerDrawsArray, dealerScore)) {
      dealerDrawsArray = reassignAceValue(dealerDrawsArray, dealerScore);
    }
    var blackjackResult = checkBlackjack(playerScore, dealerScore);
    if (blackjackResult == "Nil") {
      output = `Player drew ${playerDrawsArray[0].name} and ${playerDrawsArray[1].name}. <br> Score is ${playerScore} <br><br>
    Dealer drew ${dealerDrawsArray[0].name} and ${dealerDrawsArray[1].name}. Score is ${dealerScore} <br><br>
    Please input whether you'd like to hit or stand`;
    } else if (blackjackResult == "Player")
      output = `Player drew ${playerDrawsArray[0].name} and ${playerDrawsArray[1].name}. Player blackjack!`;
    else if (blackjackResult == "Dealer")
      output = `Dealer drew ${dealerDrawsArray[0].name} and ${dealerDrawsArray[1].name}. Dealer blackjack!`;
    else if (blackjackResult == "Both")
      output = `Player drew ${playerDrawsArray[0].name} and ${playerDrawsArray[1].name}. <br><br>Dealer drew ${dealerDrawsArray[0].name} and ${dealerDrawsArray[1].name}. <br><br> Tie!`;
  }
  // HIT gameState
  else if (gameState == "HIT") {
    var playerArrayIndexNewDraw = checkIndexForNewDraw(playerDrawsArray);
    // add the drawn card to the last index of playerDrawsArray
    playerDrawsArray[playerArrayIndexNewDraw] = shuffled.pop();
    // recheck the score
    playerScore = checkScore(playerDrawsArray, playerScore);
    // After hitting, if playerScore burst AND there is an ace, we need to reassign ace
    console.log(
      "Is ace in draw and score > 21? " +
        checkIfAceInDrawAndScoreBurst(playerDrawsArray, playerScore)
    );
    if (checkIfAceInDrawAndScoreBurst(playerDrawsArray, playerScore)) {
      playerDrawsArray = reassignAceValue(playerDrawsArray, playerScore);
    }
    // condition that if playerScore burst, then dont let them hit or stand already
    if (playerScore > 21) {
      output =
        `Player has drawn: ` +
        outputStatementForCardsDrawn(
          playerDrawsArray,
          playerArrayIndexNewDraw,
          output
        ) +
        `Player's score is now ${playerScore}. You have BAO and will now stand. Press Submit to see results`;
      gameState = "STAND";
    }
    // if playerScore within boundaries, go to this code
    else {
      output =
        `Player has drawn: ` +
        outputStatementForCardsDrawn(
          playerDrawsArray,
          playerArrayIndexNewDraw,
          output
        ) +
        `Player's score is now ${playerScore}. Please input whether you'd like to hit or stand`;
    }
  }
  // STAND gameState
  else if (gameState == "STAND") {
    while (dealerScore < 17) {
      var dealerArrayIndexNewDraw = checkIndexForNewDraw(dealerDrawsArray);
      dealerDrawsArray[dealerArrayIndexNewDraw] = shuffled.pop();
      // recheck the score
      dealerScore = checkScore(dealerDrawsArray, dealerScore);
    }
    result = checkResult(playerScore, dealerScore);
    output =
      `Player has drawn: ` +
      outputStatementForCardsDrawn(
        playerDrawsArray,
        playerArrayIndexNewDraw,
        output
      ) +
      `<br><br>Dealer has drawn: ` +
      outputStatementForCardsDrawn(
        dealerDrawsArray,
        dealerArrayIndexNewDraw,
        output
      ) +
      `<br><br>
      Based on Player's score of ${playerScore} and Dealer's score of ${dealerScore}, result is ${result}! Press Submit to play again`;
    gameState = "INITIAL";
  }
  return output;
};

// HELPER FUNCTIONS

// helper function to make deck
var makeDeck = function () {
  // create the empty array that will be used to store the card objects
  var createdDeck = [];

  // create an array to store the suits
  var suits = ["spades", "hearts", "clubs", "diamonds"];

  for (var i = 0; i < suits.length; i++) {
    // for each suit, create the name and rank of the card
    var currentSuit = suits[i];
    // names are ace, 2 to 10, jack, queen and king
    // ranks are 1, 2 to 10, 11, 12 and 13
    // need a loop to iterate from 1 to and including 13 so we can get the currentRank. Then use if else to get the currentName
    var lastRank = 13;
    for (var currentRank = 1; currentRank <= lastRank; currentRank++) {
      var cardName = currentRank;
      if (currentRank == 1) cardName = "ace";
      else if (currentRank == 11) cardName = "jack";
      else if (currentRank == 12) cardName = "queen";
      else if (currentRank == 13) cardName = "king";
      var currentCard = {
        name: cardName,
        suit: currentSuit,
        rank: currentRank,
      };
      // additional line to convert J Q K rank to 10
      if (
        currentCard.name == "jack" ||
        currentCard.name == "queen" ||
        currentCard.name == "king"
      )
        currentCard.rank = 10;
      // make ace default value 11
      if (currentCard.name == "ace") currentCard.rank = 11;
      createdDeck.push(currentCard);
    }
  }
  return createdDeck;
};

var getRandomIndex = function (cardDeckLength) {
  var randomIndex = Math.floor(Math.random() * cardDeckLength); //returns a value from 0 to 51
  return randomIndex;
};

var shuffleDeck = function (cardDeck) {
  for (var i = 0; i < cardDeck.length; i++) {
    var currentCardIndex = i;
    var currentCard = cardDeck[currentCardIndex];
    var randomCardIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomCardIndex];
    // reassign the currentCard as the randomCard
    // problem with the below code is i never go back to the index and reassign. Im just reassigning the variables
    // currentCard = randomCard;
    // instead, I should reassign the value at the currentCard's index with the randomCard value
    cardDeck[currentCardIndex] = randomCard;
    // likewise we reassign the value at the randomCard index with the currentCard value
    cardDeck[randomCardIndex] = currentCard;
    // and randomCard as currentCard
    // randomCard = currentCard;
  }
  return cardDeck;
};

var checkScore = function (drawsArray, score) {
  var score = 0; // we set it to zero because for future taking care of ace 11 or 1
  for (var i = 0; i < drawsArray.length; i++) {
    score = score + drawsArray[i].rank;
  }
  return score;
};

var checkBlackjack = function (playerScore, dealerScore) {
  var blackjack = "";
  if (playerScore == 21 && dealerScore == 21) blackjack = "Both";
  else if (playerScore == 21) blackjack = "Player";
  else if (dealerScore == 21) blackjack = "Dealer";
  else blackjack = "Nil";
  return blackjack;
};

var checkIndexForNewDraw = function (drawsArray) {
  var indexNewDraw = drawsArray.length;
  return indexNewDraw;
};

var outputStatementForCardsDrawn = function (
  drawsArray,
  indexNewDraw,
  outputStatement
) {
  for (var i = 0; i < drawsArray.length; i++) {
    if (i != indexNewDraw) {
      // if statement to help control the comma and space
      outputStatement = outputStatement + `${drawsArray[i].name}, `;
    }
    // for when it is the last element
    else {
      outputStatement = outputStatement + `${drawsArray[i].name}.<br>`;
    }
  }
  return outputStatement;
};

var checkResult = function (playerScoreParameter, dealerScoreParameter) {
  var result = "";
  // Case 1 if player < 22 and dealer > 21 i.e. dealer bao
  if (playerScoreParameter < 22 && dealerScoreParameter > 21)
    result = "Player wins";
  // Case 2 if dealer < 22 and player > 21 i.e. player bao
  else if (dealerScoreParameter < 22 && playerScoreParameter > 21)
    result = "Dealer wins";
  // Case 3 if both scores are < 22 i.e. never bao, go into another logic to check who is highest
  else if (playerScoreParameter < 22 && dealerScoreParameter < 22) {
    if (playerScoreParameter > dealerScoreParameter) result = "Player wins";
    else if (dealerScoreParameter > playerScoreParameter)
      result = "Dealer wins";
    else result = "Tie";
  }
  // Case 4 if both bao
  else if (playerScoreParameter > 21 && dealerScoreParameter > 21)
    result = "Tie";
  return result;
};

// if there is ace in the draw and the score is > 21, this function will help to reassign the ace value from 11 to 1 and return the respective drawsArray
function reassignAceValue(drawsArray, score) {
  console.log("Starting reassignmenet of ace");
  while (score > 21) {
    // finds the index of the ace with rank 11 in the drawsArray. This helps to assign the right number of aces in the event of multiple aces
    var aceIndex = drawsArray.findIndex(
      (card) => card.name == "ace" && card.rank == 11
    );
    console.log("Ace index " + aceIndex);
    // reassign this ace card's rank value from 11 to 1
    drawsArray[aceIndex].rank = 1;
    console.log("Reassigned ace rank " + drawsArray[aceIndex].rank);
    // recheck the score
    score = checkScore(drawsArray, score);
    console.log("Updated score" + score);
  }
  // return the new drawsArray once completed
  return drawsArray;
}

function checkIfAceInDrawAndScoreBurst(drawsArray, score) {
  return drawsArray.some((card) => card.name == "ace") && score > 21;
}
