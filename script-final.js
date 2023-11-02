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
    //re-enable hit and stand buttons if the user baos
    var hitBtn = document.getElementById("hit-button");
    var standBtn = document.getElementById("stand-button");
    hitBtn.disabled = false;
    standBtn.disabled = false;
    // need to wipe the slate clean for dealer-cards and player-cards
    document.getElementById("dealer-cards").innerHTML = "";
    document.getElementById("player-cards").innerHTML = "";
    // create a image element to add the hidden card everytime INITIAL is called
    var hiddenImage = document.createElement("img");
    // then add the id and src
    hiddenImage.id = "hidden";
    hiddenImage.src = "./cards/BACK.png";
    // append it in the dealer-cards div
    document.getElementById("dealer-cards").append(hiddenImage);
    // change ah-chow src back to original one
    document.getElementById("ah-chow").src =
      "https://media.tenor.com/EX6You2MNyUAAAAC/chowyunfat-godofgamblers.gif";
    // "refresh" the player and dealer draws everytime we start a new game
    playerDrawsArray = [];
    dealerDrawsArray = [];
    // var aceDeck = [
    //   {
    //     name: "A",
    //     suit: "H",
    //     rank: 11,
    //   },
    //   {
    //     name: "A",
    //     suit: "S",
    //     rank: 11,
    //   },
    //   {
    //     name: "A",
    //     suit: "C",
    //     rank: 11,
    //   },
    // ];
    var deck = makeDeck();
    shuffled = shuffleDeck(deck);
    for (var i = 0; i < 2; i++) {
      playerDrawsArray[i] = shuffled.pop();
      dealerDrawsArray[i] = shuffled.pop();
      // PLAYER: can show both card images
      var cardImg = document.createElement("img");
      cardImg.src =
        "./cards/" +
        playerDrawsArray[i].name +
        "-" +
        playerDrawsArray[i].suit +
        ".png";
      document.getElementById("player-cards").append(cardImg);
    }
    // DEALER: only showing the card image for the 2nd drawn card and keeping BACK image for the first drawn card. We will show the first drawn card in STAY
    var cardImg = document.createElement("img");
    cardImg.src =
      "./cards/" +
      dealerDrawsArray[1].name +
      "-" +
      dealerDrawsArray[1].suit +
      ".png";
    document.getElementById("dealer-cards").append(cardImg);
    // // for ace testing purposes
    // playerDrawsArray[0] = aceDeck[0];
    // playerDrawsArray[1] = aceDeck[1];
    // playerDrawsArray[2] = aceDeck[2];
    // dealerDrawsArray[0] = aceDeck[0];
    // dealerDrawsArray[1] = aceDeck[1];
    // dealerDrawsArray[2] = aceDeck[2];
    playerScore = checkScore(playerDrawsArray, playerScore);
    dealerScore = checkScore(dealerDrawsArray, dealerScore);
    // player: do check for ace ace draw and reassign ace value accordingly
    if (checkIfAceInDrawAndScoreBurst(playerDrawsArray, playerScore)) {
      playerDrawsArray = reassignAceValue(playerDrawsArray, playerScore);
      playerScore = checkScore(playerDrawsArray, playerScore);
    }
    // dealer: do check for ace ace draw and reassign ace value accordingly
    if (checkIfAceInDrawAndScoreBurst(dealerDrawsArray, dealerScore)) {
      dealerDrawsArray = reassignAceValue(dealerDrawsArray, dealerScore);
      dealerScore = checkScore(dealerDrawsArray, dealerScore);
    }
    var blackjackResult = checkBlackjack(playerScore, dealerScore);
    if (blackjackResult == "Nil") {
      output = `<br>
    Player Score is ${playerScore}. Hit or Stand?`;
    } else if (blackjackResult == "Player")
      output = `Player drew ${playerDrawsArray[0].name} and ${playerDrawsArray[1].name}. Player BAN LAK! Press GO to play again!`;
    else if (blackjackResult == "Dealer")
      output = `Dealer drew ${dealerDrawsArray[0].name} and ${dealerDrawsArray[1].name}. Dealer BAN LAK! YOU DIE! Press GO to play again!`;
    else if (blackjackResult == "Both")
      output = `BOTH BAN LAK! Tie! Press GO to play again!`;
  }
  // HIT gameState
  else if (gameState == "HIT") {
    var playerArrayIndexNewDraw = checkIndexForNewDraw(playerDrawsArray);
    // add the drawn card to the last index of playerDrawsArray
    playerDrawsArray[playerArrayIndexNewDraw] = shuffled.pop();
    var cardImg = document.createElement("img");
    cardImg.src =
      "./cards/" +
      playerDrawsArray[playerArrayIndexNewDraw].name +
      "-" +
      playerDrawsArray[playerArrayIndexNewDraw].suit +
      ".png";
    document.getElementById("player-cards").append(cardImg);
    // recheck the score
    playerScore = checkScore(playerDrawsArray, playerScore);
    // After hitting, if playerScore burst AND there is an ace, we need to reassign ace
    if (checkIfAceInDrawAndScoreBurst(playerDrawsArray, playerScore)) {
      playerDrawsArray = reassignAceValue(playerDrawsArray, playerScore);
      // update the score after the reassignment
      playerScore = checkScore(playerDrawsArray, playerScore);
    }
    // condition that if playerScore burst, then dont let them hit or stand already
    if (playerScore > 21) {
      output = `<br>Player's score is now ${playerScore}. You have BAO and will now stand. Press GO to see results`;
      gameState = "STAND";
      // disable hit and stand buttons
      var hitBtn = document.getElementById("hit-button");
      var standBtn = document.getElementById("stand-button");
      hitBtn.disabled = true;
      standBtn.disabled = true;
    }
    // if playerScore within boundaries, go to this code
    else {
      output = `<br>Player's score is now ${playerScore}. Hit or Stand?`;
    }
  }
  // STAND gameState
  else if (gameState == "STAND") {
    while (dealerScore < 17) {
      var dealerArrayIndexNewDraw = checkIndexForNewDraw(dealerDrawsArray);
      dealerDrawsArray[dealerArrayIndexNewDraw] = shuffled.pop();
      var cardImg = document.createElement("img");
      cardImg.src =
        "./cards/" +
        dealerDrawsArray[dealerArrayIndexNewDraw].name +
        "-" +
        dealerDrawsArray[dealerArrayIndexNewDraw].suit +
        ".png";
      document.getElementById("dealer-cards").append(cardImg);
      // recheck the score
      dealerScore = checkScore(dealerDrawsArray, dealerScore);
      // input the ace logic in the while loop. Cos this will ensure that the draw and score gets updated to properly reflect the correct score
      if (checkIfAceInDrawAndScoreBurst(dealerDrawsArray, dealerScore)) {
        dealerDrawsArray = reassignAceValue(dealerDrawsArray, dealerScore);
        // update the score after the reassignment
        dealerScore = checkScore(dealerDrawsArray, dealerScore);
      }
    }
    // after dealer has finished drawing, open the BACK card by re-assigning the hidden ID in the html file to the first card name
    document.getElementById("hidden").src =
      "./cards/" +
      dealerDrawsArray[0].name +
      "-" +
      dealerDrawsArray[0].suit +
      ".png";
    result = checkResult(playerScore, dealerScore);
    output = `Ah Chow's score ${dealerScore}<br>Player's score ${playerScore}<br>Result is ${result}! Press GO to play again`;
    // disable hit and stand buttons
    var hitBtn = document.getElementById("hit-button");
    var standBtn = document.getElementById("stand-button");
    hitBtn.disabled = true;
    standBtn.disabled = true;
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
  var suits = ["S", "H", "C", "D"];

  for (var i = 0; i < suits.length; i++) {
    // for each suit, create the name and rank of the card
    var currentSuit = suits[i];
    // names are ace, 2 to 10, jack, queen and king
    // ranks are 1, 2 to 10, 11, 12 and 13
    // need a loop to iterate from 1 to and including 13 so we can get the currentRank. Then use if else to get the currentName
    var lastRank = 13;
    for (var currentRank = 1; currentRank <= lastRank; currentRank++) {
      var cardName = currentRank;
      if (currentRank == 1) cardName = "A";
      else if (currentRank == 11) cardName = "J";
      else if (currentRank == 12) cardName = "Q";
      else if (currentRank == 13) cardName = "K";
      var currentCard = {
        name: cardName,
        suit: currentSuit,
        rank: currentRank,
      };
      // additional line to convert J Q K rank to 10
      if (
        currentCard.name == "J" ||
        currentCard.name == "Q" ||
        currentCard.name == "K"
      )
        currentCard.rank = 10;
      // make ace default value 11
      if (currentCard.name == "A") currentCard.rank = 11;
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
  if (playerScoreParameter < 22 && dealerScoreParameter > 21) {
    // change the ah-chow element to the losing gif
    document.getElementById("ah-chow").src =
      "https://media.tenor.com/1B3KuSRuHRsAAAAC/embarrassing-fail.gif";
    result = "Player wins";
  }
  // Case 2 if dealer < 22 and player > 21 i.e. player bao
  else if (dealerScoreParameter < 22 && playerScoreParameter > 21)
    result = "Dealer wins";
  // Case 3 if both scores are < 22 i.e. never bao, go into another logic to check who is highest
  else if (playerScoreParameter < 22 && dealerScoreParameter < 22) {
    if (playerScoreParameter > dealerScoreParameter) {
      // change the ah-chow element to the losing gif
      document.getElementById("ah-chow").src =
        "https://media.tenor.com/1B3KuSRuHRsAAAAC/embarrassing-fail.gif";
      result = "Player wins";
    } else if (dealerScoreParameter > playerScoreParameter)
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
  var validAceIndex = drawsArray.findIndex(
    (card) => card.name == "A" && card.rank == 11
  );
  // if there is no ace with rank 11, then don't even bother to reassign cos will be undefined. If findIndex can't find an ace with rank 11, it will return -1. Then we will just return drawsArray without any reassignment
  if (validAceIndex == -1) {
    return drawsArray;
  }
  // else if validAceIndex != -1, then we carry on with the reassignment
  else if (validAceIndex != -1) {
    while (score > 21) {
      // finds the index of the ace with rank 11 in the drawsArray. This helps to assign the right number of aces in the event of multiple aces
      var validAceIndex = drawsArray.findIndex(
        (card) => card.name == "A" && card.rank == 11
      );
      // reassign this ace card's rank value from 11 to 1
      drawsArray[validAceIndex].rank = 1;
      // recheck the score
      score = checkScore(drawsArray, score);
    }
    // return the new drawsArray once completed
    return drawsArray;
  }
}

function checkIfAceInDrawAndScoreBurst(drawsArray, score) {
  return drawsArray.some((card) => card.name == "A") && score > 21;
}
