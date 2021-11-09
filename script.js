// Function to make deck
var makeDeck = function () {
  var cardDeck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }
      var card = { name: cardName, suit: currentSuit, rank: rankCounter };
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};

var cardDeck = makeDeck();
var index = 0;
while (index < cardDeck.length) {
  console.log(cardDeck[index].name);
  var cardTitle = cardDeck[index].name + " of " + cardDeck[index].suit;
  console.log(cardTitle);
  index = index + 1;
}

var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

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

//--------------- ROUGH NOTES --------------------------

// there are 2 players -- player and computer
// each player draws 2 cards
// each player decides to hit or stand
// computer has to draw if the sum of its hand < 17
// sum of cards' rules --> j/q/k = 10, ace = 1 or 11 (maybe 1st ace is 11, then second is 1?)
// win scenarios:
// if player > computer
// if computer > player
// if player or computer blackjack
// if computer > 21

// --------------- GLOBAL VARIABLES -------------------------

var gameMode = 0;
var playerHand = [];
var computerHand = [];

//---------------- HELPER FUNCTIONS??? ----------------------

//---------------- FUNCTION TO CALC SUM OF HAND -------------
var calcSumOfHand = function (handArray) {
  var i = 0;
  var totalSumOfHand = 0;
  //create variable to track the number of aces. if there is one ace, then replace the value to 11
  var totalNumOfAces = 0;

  //ie if player holds 2 cards, sum will add the two cards over 2 loops in this while loop
  while (i < handArray.length) {
    var currentCard = handArray[i];
    //+11 if there is ace
    if (currentCard.name == "ace") {
      totalSumOfHand = totalSumOfHand + 11;
      totalNumOfAces += 1;
    }
    //+10 for j/q/k
    else if (
      currentCard.name == "king" ||
      currentCard.name == "queen" ||
      currentCard.name == "jack"
    ) {
      totalSumOfHand = totalSumOfHand + 10;
    } else {
      totalSumOfHand = totalSumOfHand + currentCard.rank;
    }
    i += 1;
  }
  return totalSumOfHand;
};

// --------------- FUNCTION TO CHECK BLACKJACK... which i didnt use in the end ----------------

var gotBlackjack = function (sumOfHand) {
  var blackjackTrueFalse = false;
  if (sumOfHand == 21) {
    blackjackTrueFalse = true;
  }
  return blackjackTrueFalse;
};

// --------------- FUNCTION to condense the display of cards in myOutputValue -------------

var displayListOfCards = function (handArray) {
  var listOfCards = "";
  var i = 0;
  while (i < handArray.length) {
    var currentCard = handArray[i];
    listOfCards = listOfCards + `${currentCard.name} of ${currentCard.suit}, `;
    i += 1;
  }
  return listOfCards;
};

//---------------- CODE STARTS HERE ---------------------------
var main = function (input) {
  var myOutputValue = `Please type in either hit to draw one more card, or stand if your current sum is enough.`;
  var cardDeck = makeDeck();
  var shuffledDeck = shuffleCards(cardDeck);

  // GAMEMODE = 0, DRAW CARDS FIRST
  if (gameMode == 0) {
    console.log("game mode = 0, drawing cards for players");
    var playerCard1 = shuffledDeck.pop();
    var playerCard2 = shuffledDeck.pop();
    var computerCard1 = shuffledDeck.pop();
    var computerCard2 = shuffledDeck.pop();

    // gameMode = 0, checking if cards were successfully drawn for each player
    console.log("player card 1", playerCard1);
    console.log("player card 2", playerCard2);
    console.log("computer card 1", computerCard1);
    console.log("computer card 2", computerCard2);

    // gameMode = 0, push them into arrays to store them for later
    playerHand.push(playerCard1);
    playerHand.push(playerCard2);
    computerHand.push(computerCard1);
    computerHand.push(computerCard2);

    // gameMode = 0, calc the sum of each hand --> then determine if there is blackjack

    sumPlayerHand = calcSumOfHand(playerHand);
    sumComputerHand = calcSumOfHand(computerHand);

    // gameMode = 0, check if the calc of each hand is correct
    console.log("gamemode = 0, sum of player's hand", sumPlayerHand);
    console.log("gamemode = 0, sum of computer's hand", sumComputerHand);

    // gameMode = 0, blackjack y/n?
    // blackjack scenarios --> if sumPlayerHand = 21, or sumComputerHand = 21
    // if player = 21, player wins
    // if computer = 21, computer wins
    // if both = 21, it's a tie
    // if both less than 21, ask player if wanna hit / stand --> progress game mode

    if (sumPlayerHand == 21 && sumComputerHand < 21) {
      myOutputValue = `Player's Cards: ${displayListOfCards(
        playerHand
      )}<BR>PLAYER WINS.<BR><BR>Click submit to play again.`;

      playerHand = [];
      computerHand = [];
      gameMode = 0;
      return myOutputValue;
    } else if (sumPlayerHand < 21 && sumComputerHand == 21) {
      myOutputValue = `Player's Cards: ${displayListOfCards(
        playerHand
      )}<BR>Computer's Cards: ${displayListOfCards(
        computerHand
      )}<BR><BR>COMPUTER WINS.<BR>Click submit to play again.`;

      playerHand = [];
      computerHand = [];
      gameMode = 0;
      return myOutputValue;
    } else if (sumPlayerHand == 21 && sumComputerHand == 21) {
      myOutputValue = `Player's Cards: ${displayListOfCards(
        playerHand
      )}<BR>Computer's Cards: ${displayListOfCards(
        computerHand
      )}<BR><BR>YOU BOTH BLACKJACKED.<BR>Click submit to play again.`;

      playerHand = [];
      computerHand = [];
      gameMode = 0;
      return myOutputValue;
    } else if (sumPlayerHand < 21 && sumComputerHand < 21) {
      gameMode = 1;
      myOutputValue = `Player's Cards: ${displayListOfCards(
        playerHand
      )}<BR><BR>Type hit to draw one more card, or stand if your total sum is enough.`;
    }
  }

  // GAMEMODE = 1, create two scenarios, taking the player's hit or stand input

  // GAMEMODE = 1, if player inputs "hit" --> draw another card
  if (gameMode == 1 && input == "hit") {
    playerHand.push(shuffledDeck.pop());
    // calc players' total sum again
    sumPlayerHand = calcSumOfHand(playerHand);
    console.log("gamemode = 1, sum of player's hand", sumPlayerHand);

    //if players total sum < 21, ask if they wanna hit (so return to gameMode = 1) or stand (progress to another gameMode)
    if (sumPlayerHand < 21) {
      myOutputValue = `Player's Cards: ${displayListOfCards(
        playerHand
      )}<BR><BR>Type hit to draw one more card, or stand if your total sum is enough.`;
    }
    // if players' total sum > 21, player lose --> reveal computers' cards in gameMode 2
    else {
      gameMode = 3;
      myOutputValue = `Player's Cards: ${displayListOfCards(
        playerHand
      )}<BR><BR>Wa so suay. Click submit again to see computers' cards.`;
    }

    return myOutputValue;
  }

  // GAMEMODE = 1, if player inputs "stand" --> progress game mode
  if (gameMode == 1 && input == "stand") {
    gameMode = 2;
    myOutputValue = `Sure ah, enough ah! Click submit again to reveal computers' cards.`;
    return myOutputValue;
  }

  // GAMEMODE = 2, to show computers' cards
  // if sumComputerHand < 17, create new game mode for computer to draw one more card
  // if sumComputerHand > 17, immediately compare to CONCLUDE THE GAME!!!! :D (done)
  // if sumComputerHand > sumPlayerHand --> computer wins (done)
  // if sumComputerHand < sumPlayerHand --> player wins (done)
  // if computer = player --> tie (done)

  if (gameMode == 2) {
    if (sumComputerHand >= 17 && sumComputerHand <= 21) {
      //does it work if there are so many if statements in an if statement lol
      if (sumComputerHand > sumPlayerHand || sumPlayerHand > 21) {
        myOutputValue = `GameMode 2<BR><BR>Player's Cards: ${displayListOfCards(
          playerHand
        )}<BR>Computer's Cards: ${displayListOfCards(
          computerHand
        )}<BR><BR>Wa so suay. Computer wins.`;
      } else if (sumComputerHand < sumPlayerHand && sumPlayerHand <= 21) {
        myOutputValue = `GameMode 2<BR><BR>Player's Cards: ${displayListOfCards(
          playerHand
        )}<BR>Computer's Cards: ${displayListOfCards(
          computerHand
        )}<BR><BR>You win.`;
      } else if (sumComputerHand == sumPlayerHand) {
        myOutputValue = `GameMode 2<BR><BR>Player's Cards: ${displayListOfCards(
          playerHand
        )}<BR>Computer's Cards: ${displayListOfCards(
          computerHand
        )}<BR><BR>You tied.`;
      }
    }
    if (sumComputerHand < 17) {
      gameMode = 3;
      myOutputValue = `Game mode 2<BR><BR>Player's Cards: ${displayListOfCards(
        playerHand
      )}<BR>Computer's Cards: ${displayListOfCards(
        computerHand
      )}<BR><BR>Computer needs to draw more cards. Click to see if you suay or not.`;
    }
    return myOutputValue;
  }

  // GAMEMODE = 3, allow computer to draw more cards, and then compare again.

  if (gameMode == 3) {
    while (sumComputerHand < 17) {
      var newComputerCard = shuffledDeck.pop();
      computerHand.push(newComputerCard);
      sumComputerHand = calcSumOfHand(computerHand);
    }
    if (sumComputerHand > sumPlayerHand && sumComputerHand <= 21) {
      myOutputValue = `GameMode 3<BR><BR>Player's Cards: ${displayListOfCards(
        playerHand
      )}<BR>Computer's Cards: ${displayListOfCards(
        computerHand
      )}<BR><BR>Wa so suay. Computer wins.`;
    } else if (sumComputerHand < sumPlayerHand && sumPlayerHand <= 21) {
      myOutputValue = `GameMode 3<BR><BR>Player's Cards: ${displayListOfCards(
        playerHand
      )}<BR>Computer's Cards: ${displayListOfCards(
        computerHand
      )}<BR><BR>You win.`;
    } else if (sumComputerHand == sumPlayerHand) {
      myOutputValue = `GameMode 3<BR><BR>Player's Cards: ${displayListOfCards(
        playerHand
      )}<BR>Computer's Cards: ${displayListOfCards(
        computerHand
      )}<BR><BR>You tied.`;
    } else if (sumComputerHand > 21) {
      myOutputValue = `GameMode 3<BR><BR>Player's Cards: ${displayListOfCards(
        playerHand
      )}<BR>Computer's Cards: ${displayListOfCards(
        computerHand
      )}<BR><BR>Haha yall both more than 21. Both lose leh.`;
    } else {
      myOutputValue = `GameMode 3<BR><BR>Player's Cards: ${displayListOfCards(
        playerHand
      )}<BR>Computer's Cards: ${displayListOfCards(
        computerHand
      )}<BR><BR>Wa so suay. Computer wins.`;
    }
    return myOutputValue;
  }

  return myOutputValue;
};
