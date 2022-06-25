//function to create a deck of card
//note: cardDeck is an array which stores cards as objects which has three attributes : name,rank,suits
var createCardDeck = function () {
  var cardDeck = [];
  var suits = ["♥", "♦", "♠", "♣"];

  var suitsIndex = 0;
  while (suitsIndex < suits.length) {
    var currentSuit = suits[suitsIndex];

    //loop 1 to 13
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = "";
      if (rankCounter == 1) {
        cardName = "ace";
      } else if (rankCounter == 11) {
        cardName = "jack";
      } else if (rankCounter == 12) {
        cardName = "queen";
      } else if (rankCounter == 13) {
        cardName = "king";
      } else {
        cardName = rankCounter;
      }

      var card = {
        name: cardName,
        rank: rankCounter,
        suit: currentSuit,
      };

      cardDeck.push(card);

      rankCounter += 1;
    }

    suitsIndex += 1;
  }

  return cardDeck;
};

//random index from 0 (inclusive) to max (not inclusive)
var getRandomIndex = function (max) {
  return (randomIndex = Math.floor(Math.random() * max));
};

//function to shuffle deck of card
//note: exchange position of current card and random card
var shuffleCardDeck = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];

    //swap current card with random card
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;

    currentIndex += 1;
  }
  return cardDeck;
};

//function to deal cards to player and dealer
var dealCard = function (cardsArray) {
  var card = shuffledCardDeck.pop();
  cardsArray.push(card);
};

//function to calculate score
var calcScore = function (cardsArray) {
  var aceCounter = 0;
  var initialScore = 0;
  var totalScore = 0;
  var cardIndex = 0;

  while (cardIndex < cardsArray.length) {
    var currentCard = cardsArray[cardIndex];
    //if card is jack/queen/king, score is 10
    if (
      currentCard.rank == 11 ||
      currentCard.rank == 12 ||
      currentCard.rank == 13
    ) {
      initialScore += 10;
    }
    // if there's ace on hand , let ace initial score = 11 and keep track number of aces using aceCounter
    else if (currentCard.rank == 1) {
      initialScore += 11;
      aceCounter += 1;
    }
    //any other card from 2-10
    else {
      initialScore += currentCard.rank;
    }
    cardIndex += 1;
  }

  //if no ace OR no bust, total score is same as initial score
  if (aceCounter == 0 || initialScore <= bustScore) {
    totalScore = initialScore;
  }
  //if initial score is bust, deduct 10 from initial score value the number of aces times until score not bust
  if (initialScore > bustScore) {
    var counter = 0;
    totalScore = initialScore;

    while (counter < aceCounter) {
      if (totalScore > bustScore) {
        totalScore -= 10;
      }
      counter += 1;
    }
  }

  return totalScore;
};

//function to determine if player/dealer drew blackjack
var isBlackjack = function (cardsArray) {
  //two cards on hand and sum of score is 21 is blackjack
  if (calcScore(cardsArray) == 21 && cardsArray.length == 2) {
    return true;
  }
  return false;
};

//function to determine if player/dealer bust
var isBust = function (score) {
  if (score > bustScore) {
    return true;
  }
  return false;
};

//function to play game (deal card,check blackjack, calculalte score)
var playBlackjack = function () {
  var gameResult = "";

  //check for blackjack winning condition
  if (isBlackjack(playerCardsArray)) {
    gameResult = `player blackjack`;
    bettingResult = BET_BLACKJACK;
  } else if (isBlackjack(computerCardsArray)) {
    gameResult = `comp blackjack`;
    bettingResult = BET_LOSE;
  } else if (isBlackjack(playerCardsArray) && isBlackjack(computerCardsArray)) {
    gameResult = ` tie, both blackjack`;
    bettingResult = BET_TIE;
  }
  //check for bust condition
  else if (isBust(playerScore) && !isBust(computerScore)) {
    gameResult = `player bust`;
    bettingResult = BET_LOSE;
  } else if (!isBust(playerScore) && isBust(computerScore)) {
    gameResult = `computer bust`;
    bettingResult = BET_WIN;
  } else if (isBust(playerScore) && isBust(computerScore)) {
    gameResult = `it's a tie, both player computer bust`;
    bettingResult = BET_TIE;
  } else if (!isBust(playerScore) && !isBust(computerScore)) {
    if (playerScore < computerScore) {
      gameResult = `player lower score, lose`;
      bettingResult = BET_LOSE;
    } else if (playerScore > computerScore) {
      gameResult = `player higher score , win `;
      bettingResult = BET_WIN;
    } else if (playerScore == computerScore) {
      gameResult = `it's a tie`;
      bettingResult = BET_TIE;
    }
  }

  return gameResult;
};

//function to top up computer's card after player "stand"
var computerTopUpCard = function () {
  while (computerScore < dealerSoft17) {
    //computer add card and update re-calculate computer scoer
    dealCard(computerCardsArray);
    computerScore = calcScore(computerCardsArray);
  }
};

//function to output message for card dealed, given an array of cards
var dealCardMsg = function (cardsArray) {
  dealCardIndex = 0;
  allDealCardMsg = "";
  while (dealCardIndex < cardsArray.length) {
    currDealCard = cardsArray[dealCardIndex];
    allDealCardMsg += `${currDealCard.name} of ${currDealCard.suit},`;
    dealCardIndex += 1;
  }
  return allDealCardMsg;
};

//function to ouput BOTH player & dealer's card
var playerDealerCardMsg = function () {
  var playerCardMsg = dealCardMsg(playerCardsArray);
  var computerCardMsg = dealCardMsg(computerCardsArray);

  var outputMsg = `player drew ${playerCardMsg}<br>computer drew ${computerCardMsg}<br>`;

  return outputMsg;
};

//function to calculate player's betting points after result
var calcBettingPoints = function () {
  //add back initial wager points to player's stack before calculating
  bettingPoints += wagerPoints;
  var bettingPointsMsg = "";
  if (bettingResult == BET_WIN) {
    bettingPoints += wagerPoints;
  } else if (bettingResult == BET_LOSE) {
    bettingPoints -= wagerPoints;
  } else if (bettingResult == BET_TIE) {
    bettingPoints += Number(0);
  } else if (bettingResult == BET_BLACKJACK) {
    bettingPoints += wagerPoints * 1.5;
  }

  if (bettingPoints > 0) {
    bettingPointsMsg = `Your remaining is ${bettingPoints}coins. Please select wager amount and click submit.`;
  } else {
    bettingPointsMsg = `Game Over, you have used up all your coins! `;
  }

  return bettingPointsMsg;
};

var resetRound = function () {
  playerScore = 0;
  computerScore = 0;
  playerCardsArray = [];
  computerCardsArray = [];
  aceCounter = 0;
  wagerPoints = 0;
};

const DEALCARD = "dealCard";
const PLAYGAME = "playGame";
const INPUT_HIT_STAND = "inputHitStand";
const INSTRUCTION = "instruction";
//const RESET = "reset";
var gameMode = INSTRUCTION;
var playerCardsArray = [];
var computerCardsArray = [];
var playerScore = 0;
var computerScore = 0;
var bustScore = Number(21);
var dealerSoft17 = Number(17);
var shuffledCardDeck = [];

var bettingPoints = 100;
var wagerPoints = 0;
var bettingResult = "";

//to record player's betting outcome
const BET_WIN = "betWin";
const BET_LOSE = "betLose";
const BET_TIE = "betTie";
const BET_BLACKJACK = "betBlackJack";

var main = function (input) {
  var myOutputValue = "";
  if (gameMode == INSTRUCTION) {
    myOutputValue = `Welcome to Blackjack Game!<br>You have ${bettingPoints}coins to start.<br>Please select wager amount and click submit. `;
    gameMode = DEALCARD;
  } else if (gameMode == DEALCARD) {
    //check if player have enough betting points to use as wager
    if (Number(input) > bettingPoints) {
      myOutputValue = `You do not have enough coins!<br>You have wagered ${wagerPoints}coins and have ${bettingPoints}coins left.<br>Please select wager amount and click submit to continue.`;
    } else if (input == "" && wagerPoints == 0) {
      myOutputValue = `You have not placed any bet!`;
    } else if (Number(input) <= bettingPoints && !(input == "")) {
      wagerPoints += Number(input);
      bettingPoints -= Number(input);
      myOutputValue = `You have wagered ${wagerPoints}coins and have ${bettingPoints}coins left. Do you want to add on?<br>Click Submit to confirm coins amount.`;
      console.log("wager", wagerPoints);
      console.log("betting", bettingPoints);
    } else if (input == "" && !(wagerPoints == 0)) {
      //make deck and shuffle deck
      cardDeck = createCardDeck();
      shuffledCardDeck = shuffleCardDeck(cardDeck);

      //deal 2 cards to player
      dealCard(playerCardsArray);
      dealCard(playerCardsArray);

      //deal 1 cards to computer
      dealCard(computerCardsArray);

      myOutputValue = `${playerDealerCardMsg()}<br>player plz input "hit" or "stand"`;

      gameMode = INPUT_HIT_STAND;
    }
  } else if (gameMode == INPUT_HIT_STAND) {
    if (input == "hit") {
      //add card to player if he input "hit"
      dealCard(playerCardsArray);

      //reprint player & dealer dealed card message
      myOutputValue = `${playerDealerCardMsg()} <br>player plz input "hit" or "stand"`;
    } else if (input == "stand") {
      //deal 2nd card for dealer
      dealCard(computerCardsArray);

      //calculate score for both player and computer
      playerScore = calcScore(playerCardsArray);
      computerScore = calcScore(computerCardsArray);

      //computer top up card to be more than 17 score
      computerTopUpCard();
      console.log("player score", playerScore);
      console.log("comp score", computerScore);
      //console.log("player card", playerCardsArray);
      //console.log("comp card", computerCardsArray);

      //determine winner
      myOutputValue = `${playerDealerCardMsg()} <br>${playBlackjack()}<br>`;

      //update betting points
      myOutputValue += calcBettingPoints();

      //reset for next round
      resetRound();
      if (bettingPoints > 0) {
        gameMode = DEALCARD;
      } else {
        //reset gameMode and betting points if game over
        gameMode = INSTRUCTION;
        bettingPoints = 100;
      }
    } else {
      myOutputValue = `Error, plz input hit/stand`;
    }
  }

  return myOutputValue;
};
