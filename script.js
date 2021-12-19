var gameMode = `HOW_MANY_PLAYERS`;
var randomCard = [];

var playerCards = [[], [], [], [], []];

var dealerCards = [];

var playerPoints = 0;
var dealerPoints = 0;

var playerMoney = [{}, {}, {}, {}, {}];
var numberOfPlayer = 0;

var counter = 0;
var playerCounter = 0;
var betCounter = 0;
var main = function (input) {
  if (gameMode == `HOW_MANY_PLAYERS`) {
    return numberOfPlayers(input);
  } else if (gameMode == `PLAYERS_NAME`) {
    return playerNames(input);
  } else if (gameMode == `PLAYER_BET`) {
    return playerChooseBet(input);
  } else if (gameMode == ``) {
    randomCard = shuffleCards(makeDeck());
    dealerCards.push(randomCard.pop(0));
    for (a = 0; a < numberOfPlayer; a++) {
      playerCards[a].push(randomCard.pop());
      playerCards[a].push(randomCard.pop());
      console.log(playerCards);
    }
    //deal player 2 cards and 1 for the computer
    //blackjack wins straight

    gameMode = `PLAYER_DRAW`;
    return playerDrawCard();
  } else if (gameMode == `PLAYER_DRAW`) {
    //over here player can draw another card from the deck
    //if the player draws over 21, he will lose

    return playerDraw(input);
  } else if (gameMode == `DEALER_DRAW`) {
    //over here player has decided that he has enough points, computer turn to draw
    return dealerDraw();
  } else if (gameMode == `SHOWDOWN`) {
    //if dealer draws equal or greater than 17, compare players and dealer point
    //restarts the game
  }
};

var numberOfPlayers = function (input) {
  if (input > 0 && input < 6) {
    numberOfPlayer = input;
    gameMode = `PLAYERS_NAME`;
    return `alright, there are ${input} players on this table, what are your names?`;
  } else {
    return inputNumber(input);
  }
};

var playerNames = function (input) {
  if (counter < numberOfPlayer) {
    if (input != ``) {
      playerMoney[counter].token = 100;
      playerMoney[counter].name = input;
      counter = counter + 1;
      if (counter == numberOfPlayer) {
        gameMode = `PLAYER_BET`;
        return `welcome ${
          playerMoney[counter - 1].name
        }, <BR>everyone is here, lets gamble<BR><BR>${
          playerMoney[0].name
        } please place your bet`;
      }
      return `welcome ${playerMoney[counter - 1].name} <BR>next player name, ${
        numberOfPlayer - counter
      } player left`;
    } else {
      return `please enter a name`;
    }
  }
  gameMode = `PLAYER_BET`;
  counter = 0;
  return `everyone is here, lets gamble<BR><BR>${playerMoney[0].name} please place your bet`;
};

var playerChooseBet = function (input) {
  if (input > 0 && input <= playerMoney[betCounter].token) {
    playerMoney[betCounter].bet = input;
    betCounter = betCounter + 1;
    if (betCounter == numberOfPlayer) {
      gameMode = ``;
      return `${
        playerMoney[betCounter - 1].name
      }, you will be betting ${input} for the next round <BR>all players bet placed, lets deal the cards!`;
    }
    return `${
      playerMoney[betCounter - 1].name
    }, you will be betting ${input} for the next round <BR> ${
      playerMoney[betCounter].name
    }, how much would you like to bet? <BR><BR>you have ${
      playerMoney[betCounter].token
    } token`;
  } else if (
    isNaN(input) ||
    input == `` ||
    input > playerMoney[betCounter].token ||
    input < 0
  ) {
    return `please bet within 1 to ${playerMoney[betCounter].token}`;
  } else {
    gameMode = ``;
    return `all players bet placed, lets deal the cards!`;
  }
};
var playerDrawCard = function (input) {
  var playerBlackjack = blackJackChecker(playerCards);
  if (playerBlackjack == `true`) {
    gameMode = ``;

    return `Dealer card: <BR>${dealerCards[0].name} of ${emoji(
      dealerCards[0].suit
    )}<BR><BR>Player card:<BR>${playerCards[0].name} of ${emoji(
      playerCards[0].suit
    )} and ${playerCards[1].name} of ${emoji(
      playerCards[1].suit
    )}<BR><BR>BLACKJACK!! you won, seems like it's your lucky day, click submit to play again`;
  } else {
    gameMode = `PLAYER_DRAW`;
    return `Dealer card: <BR>${dealerCards[0].name} of ${emoji(
      dealerCards[0].suit
    )}<BR>dealer current point: ${scoreCounter(
      dealerCards
    )}<BR><BR>${displayPlayerDealerHand(playerCards)}<BR><BR>${
      playerMoney[0].name
    } would you like to hit or stand?`;
  }
};

var playerDraw = function (input) {
  console.log(playerCounter);
  var playerBlackjack = blackJackChecker(playerCards[playerCounter]);
  if (playerBlackjack == `true`) {
    playerCounter = playerCounter + 1;
    return `${outputMessage()}${
      playerMoney[playerCounter - 1].name
    } you gotten a blackjack! won double the amount<BR>${
      playerMoney[playerCounter].name
    }, its your turn now, would you like to hit or stand?`;
  } else if (input == `hit` && scoreCounter(playerCards[playerCounter]) < 21) {
    playerCards[playerCounter].push(randomCard.pop());
    if (scoreCounter(playerCards[playerCounter]) > 21) {
      playerCounter = playerCounter + 1;
      if (playerCounter == numberOfPlayer) {
        gameMode = `DEALER_DRAW`;
        return `${outputMessage()}${
          playerMoney[playerCounter - 1].name
        } you BUST! you have went over 21. dealer will draw now`;
      } else if (playerCards[playerCounter] == 21) {
        return `${outputMessage()}${
          playerMoney[playerCounter - 1].name
        }, your point is 21, are you i suggest you stand`;
      } else {
        return `${outputMessage()}${
          playerMoney[playerCounter - 1].name
        } you BUST! you have went over 21. <BR>${
          playerMoney[playerCounter].name
        }, its your turn now, would you like to hit or stand`;
      }
    }
    return `${outputMessage()}${
      playerMoney[playerCounter].name
    }, its still your turn, would you like to hit or stand?`;
  }
  if (input == `stand`) {
    playerCounter = playerCounter + 1;
    if (playerBlackjack == `true`) {
      playerCounter = playerCounter + 1;
      return `${outputMessage()}${
        playerMoney[playerCounter - 1].name
      } you gotten a blackjack! <BR>${
        playerMoney[playerCounter].name
      }, its your turn now, would you like to hit or stand?`;
    } else if (playerCounter >= numberOfPlayer) {
      gameMode = `DEALER_DRAW`;
      return `${outputMessage()}everyone are done, Dealer will draw now`;
    } else
      return `${outputMessage()}${
        playerMoney[playerCounter].name
      }, its your turn now, would you like to hit or stand?`;
  }
  return `${outputMessage()}${
    playerMoney[playerCounter].name
  }, please input hit or stand`;
};

var dealerDraw = function () {
  dealerCards.push(randomCard.pop(0));
  var dealerBlackjack = blackJackChecker(dealerCards);
  if (dealerBlackjack == `true`) {
    for (var p = 0; p < numberOfPlayer; p++) {
      playerMoney[p].token = playerMoney[p].token - playerMoney[p].bet;
    }
    var myOutput = `${outputMessage()} <BR><BR>dealer got blackjack! everyone lose. <BR>${
      playerMoney[0].name
    } please place bet for next round, you have ${playerMoney[0].token} `;
    gameMode = ``;
    reset();
    return myOutput;
  }
  if (scoreCounter(dealerCards) < 17) {
    for (a = scoreCounter(dealerCards); a < 17; a = scoreCounter(dealerCards)) {
      dealerCards.push(randomCard.pop(0));
    }
  }

  if (scoreCounter(dealerCards) > 16 && scoreCounter(dealerCards) < 22) {
    for (var z = 0; z < numberOfPlayer; z++) {
      if (
        scoreCounter(playerCards[z]) < scoreCounter(dealerCards) ||
        scoreCounter(playerCards[z]) > 21
      ) {
        console.log(`within loop for dealer win ${z}`);
        playerMoney[z].token = playerMoney[z].token - playerMoney[z].bet;
      } else if (
        scoreCounter(playerCards[z]) > scoreCounter(dealerCards) &&
        scoreCounter(playerCards[z]) < 22
      ) {
        console.log(`within loop for dealer win ${z}`);
        playerMoney[z].token =
          Number(playerMoney[z].token) + Number(playerMoney[z].bet);
      }
    }
    var myOutput = `${outputMessage()} <BR><BR>dealer point was: ${scoreCounter(
      dealerCards
    )} <BR>players with points over 21 or less than dealer lose,  <BR><BR>${
      playerMoney[0].name
    } please place bet for next round, you have ${playerMoney[0].token}`;
    gameMode = `PLAYER_BET`;
    reset();
    return myOutput;
  }
  if (scoreCounter(dealerCards) > 21) {
    for (var w = 0; w < numberOfPlayer; w++) {
      if (scoreCounter(playerCards[w]) < 22) {
        playerMoney[w].token =
          Number(playerMoney[w].token) + Number(playerMoney[w].bet);
        console.log(`within dealer bust ${w}`);
      }
    }
    var myOutput = `${outputMessage()} <BR><BR>dealer bust, players that didnt bust won! <BR><BR>${
      playerMoney[0].name
    } please place bet for next round, you have ${playerMoney[0].token}`;
    gameMode = `PLAYER_BET`;
    reset();
    return myOutput;
  }
};

//----------------------------------------------------------FUNCTIONS---------------------------------------------------------------
//----------------------------------------------------------FUNCTIONS---------------------------------------------------------------
//----------------------------------------------------------FUNCTIONS---------------------------------------------------------------
var reset = function () {
  playerCards = [[], [], [], [], []];

  dealerCards = [];

  playerPoints = 0;
  dealerPoints = 0;

  counter = 0;
  playerCounter = 0;
  betCounter = 0;
};
var inputNumber = function (input) {
  if (isNaN(input) || input == ``) {
    return `please choose the number of players, 1 to 5`;
  } else {
    if (input != 1 || input != 2 || input != 3 || input != 5 || input != 4) {
      return `please choose the number of players, 1 to 5`;
    }
  }
};
var blackJackChecker = function (cards) {
  var cardOne = cards[0];
  var cardTwo = cards[1];
  if (cardOne.rank == 1) {
    if (cardTwo.rank >= 10) {
      return `true`;
    }
  }
  if (cardOne.rank >= 10) {
    if (cardTwo.rank == 1) {
      return `true`;
    }
  }
};
var shuffleCards = function (cardDeck) {
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
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // Add the new card to the deck
      cardDeck.push(card);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // Return the completed card deck
  console.log(cardDeck);
  return cardDeck;
};
var emoji = function (input) {
  if (input == `hearts`) {
    return (input = `♥`);
  } else if (input == `diamonds`) {
    return (input = `♦`);
  } else if (input == `spades`) {
    return (input = `♠`);
  } else {
    return (input = `♣`);
  }
};
var displayPlayerDealerHand = function (input) {
  let message2 = "";
  for (let i = 0; i < numberOfPlayer; i++) {
    let message1 = "";
    for (let k = 0; k < playerCards[i].length; k++) {
      message1 += `${playerCards[i][k].name} of ${emoji(
        playerCards[i][k].suit
      )}<BR>`;
    }
    message2 += `${
      playerMoney[i].name
    }'s cards: <BR>${message1}current point: ${scoreCounter(
      playerCards[i]
    )}<BR>token left: ${playerMoney[i].token}<BR>bet this round: ${
      playerMoney[i].bet
    } <BR><BR>`;
  }
  return `${message2}`;
};
var scoreCounter = function (cardsToScore) {
  var aceCounter = 0;
  var totalScore = 0;
  for (a = 0; a < cardsToScore.length; a++) {
    var currentCard = cardsToScore[a];
    if (currentCard.rank >= 10) {
      totalScore = totalScore + 10;
    } else if (currentCard.rank == 1 && aceCounter == 0) {
      totalScore = totalScore + 11;
      aceCounter = aceCounter + 1;
    } else {
      totalScore = totalScore + currentCard.rank;
    }
  }
  for (b = 0; b < aceCounter; b++) {
    if (totalScore > 21) {
      totalScore = totalScore - 10;
    }
  }
  return totalScore;
};
var outputMessage = function () {
  var dealerCardshow = ``;
  for (a = 0; a < dealerCards.length; a++) {
    dealerCardshow = `${dealerCardshow}${dealerCards[a].name} of ${emoji(
      dealerCards[a].suit
    )}<BR>`;
  }
  return `Dealer card: <BR>${dealerCardshow}dealer current point: ${scoreCounter(
    dealerCards
  )}<BR><BR>${displayPlayerDealerHand(playerCards)} <BR><BR>`;
};

//----------------------------------------------------------FUNCTIONS---------------------------------------------------------------
//----------------------------------------------------------FUNCTIONS---------------------------------------------------------------
//----------------------------------------------------------FUNCTIONS---------------------------------------------------------------
