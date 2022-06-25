const DEALCARD = "dealCard";
const PLAYGAME = "playGame";
const INPUT_HIT_STAND = "inputHitStand";
const INSTRUCTION = "instruction";

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

//image for game result
var imageRainMoney = `<img src="https://c.tenor.com/agZ8PxiYWPsAAAAi/pepemoney-money-rain.gif/" width="20%">`;
var imageBlackjack = `<img src="https://c.tenor.com/x5jwK4cZEnsAAAAM/pepe-hype-hands-up.gif" width="20%">`;
var imagePlayerWin = `<img src=https://c.tenor.com/PwFNvM2V9BgAAAAi/hype-pepe-pepe.gif" width="20%"">`;
var imagePlayerLose = `<img src="https://c.tenor.com/w-tjf_bXRgIAAAAj/mike-mikeford.gif" width="20%"">`;
var imageGameTie = `<img src="https://c.tenor.com/BTsc4MhnlXQAAAAM/pepe-rana.gif" width="30%"">`;
var imageGameOver = `<img src="https://media3.giphy.com/media/fdGbhuUQpGQkkuuzIr/giphy.gif?cid=790b7611f49ab47c57959f26ab5e96a908d1700bb661f797&rid=giphy.gif&ct=ts" width="30%"">`;
var imageBust = `<img src="https://c.tenor.com/IXHsj8PPhhMAAAAj/pepega-aim-gun.gif" width="20%"">`;
var imageWinLetter = `<img src="https://studio.code.org/v3/assets/4GexL5YqegQ5GkD8FgvdxoUJGA7ss8mteRIAQxjGEAw/2-.gif" width="20%"">`;
var imageLoseLetter = `<img src="https://studio.code.org/v3/assets/dBECKjaLdbXVOjEdIQm-wOtL6aXmbq3m-4IHq5Znqq8/youlose.gif" width="30%"">`;
var imageAddOn = `<img src="https://c.tenor.com/EZm07tiVCgEAAAAj/gstarludi-peepo.gif" width="20%"">`;
var imageHitStand = `<img src="https://c.tenor.com/OTRbTTjByUkAAAAj/gstarludi-gamble.gif" width="20%"">`;
var imageHitStand2 = `<img src="https://c.tenor.com/oSawKS_St84AAAAj/gstarludi-gamble.gif" width="20%"">`;

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

//function to play game (deal card,check blackjack, calculate score)
var playBlackjack = function () {
  var gameResult = "";

  //check for blackjack winning condition
  if (isBlackjack(playerCardsArray)) {
    gameResult = `Player Blackjack!!<br>${imageWinLetter} ${imageBlackjack}`;
    bettingResult = BET_BLACKJACK;
  } else if (isBlackjack(computerCardsArray)) {
    gameResult = `Dealer Blackjack!<br>${imageLoseLetter} ${imageBlackjack}`;
    bettingResult = BET_LOSE;
  } else if (isBlackjack(playerCardsArray) && isBlackjack(computerCardsArray)) {
    gameResult = ` It's a tie! Both Blackjack!!<br>${imageBlackjack}`;
    bettingResult = BET_TIE;
  }
  //check for bust condition
  else if (isBust(playerScore) && !isBust(computerScore)) {
    gameResult = `Player Bust!<br>${imageLoseLetter} ${imageBust}`;
    bettingResult = BET_LOSE;
  } else if (!isBust(playerScore) && isBust(computerScore)) {
    gameResult = `Dealer Bust!<br>${imageWinLetter} ${imageBust}`;
    bettingResult = BET_WIN;
  } else if (isBust(playerScore) && isBust(computerScore)) {
    gameResult = `It's a tie, both player and dealer Bust!<br>${imageGameTie}`;
    bettingResult = BET_TIE;
  } else if (!isBust(playerScore) && !isBust(computerScore)) {
    if (playerScore < computerScore) {
      gameResult = `Player has lower score, you lose!<br>${imageLoseLetter} ${imagePlayerLose}`;
      bettingResult = BET_LOSE;
    } else if (playerScore > computerScore) {
      gameResult = `Player has higher score, you win!<br>${imageWinLetter} ${imagePlayerWin}`;
      bettingResult = BET_WIN;
    } else if (playerScore == computerScore) {
      gameResult = `It's a tie, both has same score!<br>${imageGameTie}`;
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

  var outputMsg = `Pepe's Card 🐸 : ${computerCardMsg}<br>Your Card 😎 : ${playerCardMsg}<br>`;

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
    bettingPointsMsg = `Your remaining is ${bettingPoints}coins. Please select wager amount.`;
  } else {
    bettingPointsMsg = `Game Over, you have used up all your coins!<br>${imageGameOver} `;
  }

  return bettingPointsMsg;
};

//function to reset parameters before next round
var resetRound = function () {
  playerScore = 0;
  computerScore = 0;
  playerCardsArray = [];
  computerCardsArray = [];
  aceCounter = 0;
  wagerPoints = 0;
};

var main = function (input) {
  var myOutputValue = "";
  if (gameMode == INSTRUCTION) {
    myOutputValue = `You have ${bettingPoints}coins to start.<br>Please select wager amount and click continue.<br>${imageRainMoney}`;

    //change start button to continue button
    document.querySelector("#submit-button").innerText = "Continue";

    gameMode = DEALCARD;
  } else if (gameMode == DEALCARD) {
    //enable Submit button
    document.querySelector("#submit-button").disabled = false;

    //check if player have enough betting points to use as wager
    if (Number(input) > bettingPoints) {
      myOutputValue = `You do not have enough coins!<br>You have wagered ${wagerPoints}coins and have ${bettingPoints}coins left.<br>Please select wager amount and click continue.`;
    }
    //check if player did not input any wager
    else if (input == "" && wagerPoints == 0) {
      myOutputValue = `You have not placed any bet!`;
    }
    //player input wager and add on wager
    else if (Number(input) <= bettingPoints && !(input == "")) {
      wagerPoints += Number(input);
      bettingPoints -= Number(input);
      myOutputValue = `You have wagered ${wagerPoints}coins and have ${bettingPoints}coins left.<br>Do you want to add on?<br>Click continue to confirm coins amount.<br>${imageAddOn}`;
    }
    //player done input wager and click continue
    else if (input == "" && !(wagerPoints == 0)) {
      //make deck and shuffle deck
      cardDeck = createCardDeck();
      shuffledCardDeck = shuffleCardDeck(cardDeck);

      //deal 2 cards to player
      dealCard(playerCardsArray);
      dealCard(playerCardsArray);

      //deal 1 cards to computer
      dealCard(computerCardsArray);

      myOutputValue = `${playerDealerCardMsg()}<br>Please select "hit" or "stand".<br>${imageHitStand}`;

      //enable hit and stand button
      document.querySelector("#hit-button").disabled = false;
      document.querySelector("#stand-button").disabled = false;
      //disable Submit button
      document.querySelector("#submit-button").disabled = true;

      gameMode = INPUT_HIT_STAND;
    }
  } else if (gameMode == INPUT_HIT_STAND) {
    if (input == "hit") {
      //add card to player if he input "hit"
      dealCard(playerCardsArray);

      //reprint player & dealer dealed card message
      myOutputValue = `${playerDealerCardMsg()} <br>Please select "hit" or "stand".<br>${imageHitStand2}`;
    } else if (input == "stand") {
      //deal 2nd card for dealer
      dealCard(computerCardsArray);

      //calculate score for both player and computer
      playerScore = calcScore(playerCardsArray);
      computerScore = calcScore(computerCardsArray);

      //computer top up card to be more than 17 score
      computerTopUpCard();

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
        //change button to Retart and enable it for new round
        document.querySelector("#submit-button").innerText = "Restart!";
        document.querySelector("#submit-button").disabled = false;
        bettingPoints = 100;
      }

      //disable hit and stand button
      document.querySelector("#hit-button").disabled = true;
      document.querySelector("#stand-button").disabled = true;
    } else {
      myOutputValue = `Error, please select "hit" or "stand".`;
    }
  }

  return myOutputValue;
};
