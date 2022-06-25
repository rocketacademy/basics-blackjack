//FUNCTION 1 - Create deck.
var makeDeck = function () {
  var cardDeck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var emoji = ["♥️", "♦️", "♣️", "♠️"];

  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var currentEmoji = emoji[suitIndex];

    var cardCounter = 1;

    while (cardCounter <= 13) {
      // By default, the card name is the same as cardCounter
      // By default, card rank is the same as cardCounter.
      var cardName = cardCounter;
      var cardRank = cardCounter;

      // If counter is 1, 11, 12, or 13, set cardName to the ace or face card's name
      // Also set card rank for ace to 11, jack/queen/king to 10.
      // Let default card rank for ace to be 11, so that we can identify if anyone has ace later by sorting array, and also if score > 21 when ace is 11, we can allow ace to be 1 so that the score can be decreased below 21.
      if (cardName == 1) {
        cardName = "Ace";
        cardRank = 11;
      } else if (cardName == 11) {
        cardName = "Jack";
        cardRank = 10;
      } else if (cardName == 12) {
        cardName = "Queen";
        cardRank = 10;
      } else if (cardName == 13) {
        cardName = "King";
        cardRank = 10;
      }

      // Create a new card with the current name, suit, emoji and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: cardRank,
        emoji: currentEmoji,
      };

      // Add the new card to the deck
      cardDeck.push(card);

      cardCounter += 1;
    }

    suitIndex += 1;
  }

  return cardDeck;
};

//FUNCTION 2 - Shuffle deck.
// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex = currentIndex + 1;
  }
  return cardDeck;
};

//FUNCTION 3a - DRAW HAND. i.e. Pop 2 initial cards from deck and store in array of playercard or computercard (whichever is applicable).
var drawHand = function (shuffledDeck, cardArray) {
  var initialCard1 = shuffledDeck.pop();
  var initialCard2 = shuffledDeck.pop();
  cardArray.push(initialCard1);
  cardArray.push(initialCard2);

  return cardArray;
};

//FUNCTION 3b - DRAW CARD. i.e. pop 1 card every time either player or computer has to HIT (draw a card). Then store into respective array.
var drawCard = function (shuffledDeck, cardArray) {
  var cardDrawn = shuffledDeck.pop();
  cardArray.push(cardDrawn);

  return cardArray;
};

//FUNCTION 4 -Calculate score of current array.
//FUNCTION 4A - Create function to compare ranks of objects in array, with largest put before smallest.
var sortFromLargest = function compare(a, b) {
  if (a.rank > b.rank) {
    return -1;
  }
  if (a.rank < b.rank) {
    return 1;
  }
  return 0;
};

//FUNCTION 4B - Create function to sort current array from largest to smallest.
//Create outer loop to sum up each card rank of card array as their default values. Ace = 11.
//Store summed up value as initial score variable.
//If initial score sum is <21, exit outer loop, return initial score.

//If initial score sum is >21, create inner loop to detect if there is ace (or aces) within the card array.
//If there is ace within card array, minus 10 to give ace a value of 1. Store as final score. See if final score <=21. If still more, repeat loop.
//Until there is no more ace left and final score sum is still more than 21, OR the final score sum is less than 21.
//Exit inner loop, return final score. Exit outer loop.

//If initial score sum is >21, but there is no ace within card array, exit inner loop, make final score = initial score. Return final score. Exit outer loop.
var calculateScore = function (cardArray) {
  var sortedCardArray = cardArray.sort(sortFromLargest);
  var currentInitialScore = 0;
  var currentFinalScore = 0;
  console.log(sortedCardArray);
  var i = 0;
  while (i < sortedCardArray.length) {
    currentInitialScore += sortedCardArray[i].rank;
    i += 1;
  }
  console.log(currentInitialScore);
  if (currentInitialScore > 21) {
    currentFinalScore = currentInitialScore;
    var j = 0;
    while (j < sortedCardArray.length) {
      if (sortedCardArray[j].rank == 11 && currentFinalScore > 21) {
        currentFinalScore -= 10;
        j += 1;
      } else if (sortedCardArray[j].rank < 11) {
        currentFinalScore = currentInitialScore;
      }
      return currentFinalScore;
    }
  } else return currentInitialScore;
};

//FUNCTION 5 - Create loop to provide the result sentence for n number of cards drawn. To display each card's attributes within the array.
var resultOutput = function (cardArray) {
  var output = "";
  var k = 0;
  while (k < cardArray.length) {
    if (k == cardArray.length - 1) {
      output += `and ${cardArray[k].name} ${cardArray[k].emoji}`;
    } else output += `${cardArray[k].name} ${cardArray[k].emoji}, `;

    k += 1;
  }
  return output;
};

//GLOBAL VARIABLES.
//Global game stage.
//Player card array and computer card array.
//Player score and computer score.
//Shuffled deck created.
var currentGameStage = "waiting for game to start";
var shuffledDeck = shuffleCards(makeDeck());
var playerCardArray = [];
var computerCardArray = [];
var playerCurrentScore = 0;
var computerCurrentScore = 0;
var myOutputValue = ``;

//MAIN FUNCTION - PLAY GAME & CHANGE GAME STAGES.
var main = function (input) {
  //At initial game stage, let player know what will happen.
  //Change game stage to player 1 draw turn.
  if (currentGameStage == "waiting for game to start") {
    myOutputValue = `You will be given two cards by the computer dealer.`;
    currentGameStage = "player 1 draw turn";
  }

  //At player 1 draw turn stage, let player know what are the hands dealt, and current score.
  //Run FUNCTION 3a and 4B for the computer dealt hand. Store computer current score and drawn hand into global variables.
  //Use FUNCTION 3a and 4b for the player dealt hand. Store player current score and drawn hand into global variables.
  //Ask player to choose to hit or stand.
  //Change game stage to player 1 choose hit or stand.
  else if (currentGameStage == "player 1 draw turn") {
    console.log(shuffledDeck);
    var playerHandDrawn = drawHand(shuffledDeck, playerCardArray);

    console.log(playerHandDrawn);
    var computerHandDrawn = drawHand(shuffledDeck, computerCardArray);
    playerCurrentScore = calculateScore(playerCardArray);
    computerCurrentScore = calculateScore(computerCardArray);
    var playerSentence = resultOutput(playerCardArray);
    var computerSentence = resultOutput(computerCardArray);

    myOutputValue = `You have drawn ${playerSentence}. <br> Your initial hand gives a score of ${playerCurrentScore}. <br><br> Computer has drawn ${computerSentence}. <br> Computer's initial hand gives a score of ${computerCurrentScore}.<br><br> If you want to draw another card, submit "hit". <br>OR<br> If you are satisfied with your cards, submit "stand" to end your turn.`;
    currentGameStage = "player 1 hit or stand";
  }

  //At player 1 choose hit or stand stage.
  //If player 1 choose hit, draw 1 card with Function 3b, calculate current score with Function 4b.
  //If current score after drawing is > 21, force end player turn and start computer turn.
  //If current score after drawing is <=21, retain game stage. Player 1 can choose again.
  //If player 1 choose stand, end player turn. Change game stage to computer turn.
  //If player 1 choose anything else, invalidate their input.
  else if (currentGameStage == "player 1 hit or stand") {
    if (input == "hit") {
      var playerDrawnCard = drawCard(shuffledDeck, playerCardArray);
      playerCurrentScore = calculateScore(playerCardArray);
      var playerSentence = resultOutput(playerCardArray);
      if (playerCurrentScore > 21) {
        myOutputValue = `Too bad, you have burst!<br><br> Your hand is ${playerSentence}. <br> Your current hand score is ${playerCurrentScore}.<br><br> Your turn ends. The computer dealer will go next. Click "submit" to continue. `;
        currentGameStage = "computer turn";
      } else if (playerCurrentScore <= 21) {
        myOutputValue = `You have drawn ${playerSentence}. <br> Your current hand score is ${playerCurrentScore}. Computer's initial hand gives a score of ${computerCurrentScore}.<br><br> If you want to draw another card, submit "hit". <br>OR<br> If you are satisfied with your cards, submit "stand" to end your turn. `;
        currentGameStage = "player 1 hit or stand";
      }
    } else if (input == "stand") {
      myOutputValue = `Your turn ends. The computer dealer will go next. Click "submit" to continue.`;
      currentGameStage = "computer turn";
    } else
      myOutputValue = `Please enter a valid option "hit" or "stand" to continue.`;
  }

  //At computer turn stage.
  //If computer initial hand score is < 17, draw card. Run Function 3b to draw 1 card, run Function 4b to calculate score.
  //Keep doing above action till score >= 17.
  //If computer hand score >=17, exit turn.
  //Change game stage to compare score stage.
  else if (currentGameStage == "computer turn") {
    if (computerCurrentScore < 17) {
      myOutputValue = `The computer dealer will draw cards as he has less than 17. Click "submit" to continue.`;
      while (computerCurrentScore < 17) {
        var computerDrawnCard = drawCard(shuffledDeck, computerCardArray);
        computerCurrentScore = calculateScore(computerCardArray);
      }
    } else
      myOutputValue = `Computer dealer turn has ended. Click "submit" to find out the winner!`;
    currentGameStage = "compare scores";
  }

  //At compare score stage.
  //Rules for player winning = player <= 21 and more than computer score, or computer score > 21 and player <=21..
  //Rules for player losing = player > 21 and computer <=21,  or player < computer score and computer score <=21
  //Otherwise, tie.
  // Start new round. Change game stage to waiting for game to start.
  // Reset global variables of card arrays. Shuffle the deck.
  else if (currentGameStage == "compare scores") {
    var computerSentence = resultOutput(computerCardArray);
    var myTieImage =
      '<img src="https://c.tenor.com/aF0ipAtOk9cAAAAC/spy-x-family-anya.gif" />';
    var myWinImage =
      '<img src="https://c.tenor.com/jiRSjXlEuF0AAAAd/waku-waku-excited.gif" />';
    var myLoseImage =
      '<img src="https://c.tenor.com/ineX8L6KwUQAAAAC/spy-x-family-anime.gif" />';
    if (
      (playerCurrentScore > computerCurrentScore && playerCurrentScore <= 21) ||
      (playerCurrentScore <= 21 && computerCurrentScore > 21)
    ) {
      myOutputValue = `Congratulations!! You won! <br> ${myWinImage} <br> Your score is ${playerCurrentScore} and you are closest to 21! <br> <br> The dealer's hand is ${computerSentence}. <br> The dealer's score is ${computerCurrentScore}.<br><br>Click submit to start a new round!`;
    } else if (
      (playerCurrentScore < computerCurrentScore &&
        computerCurrentScore <= 21) ||
      (playerCurrentScore > 21 && computerCurrentScore <= 21)
    ) {
      myOutputValue = `Unfortunately, you lost. <br> ${myLoseImage} <br> Your score is ${playerCurrentScore}. <br> <br> The dealer's hand is ${computerSentence}. <br> The dealer's score is ${computerCurrentScore} and is closest to 21!<br><br>Click submit to start a new round!`;
    } else
      myOutputValue = `Phew, you tied. <br> ${myTieImage} <br> Your score is ${playerCurrentScore}. <br> <br> The dealer's hand is ${computerSentence}. <br> The dealer's score is ${computerCurrentScore}. <br><br>Click submit to start a new round!`;

    currentGameStage = "waiting for game to start";
    shuffledDeck = shuffleCards(makeDeck());
    playerCardArray = [];
    computerCardArray = [];
  }
  return myOutputValue;
};
