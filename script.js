var cardDeck = []; // Initialise an empty deck array
var suits = ["♥", "♦", "♣", "♠"]; // Initialise an array of the 4 suits in our deck. We will loop over this array

var gameStage = `noOfPlayers`; // or playerName or shuffleNdeal or hitOrStay // determine which stage of game
var playerTurn = `player`; // or comp // determine whos turn, player, comp

var playerIndex = 0;
var nameArray = [];
var noOfPlayers = ``;
var bankRoll = 100;
var allPlayerBankroll = [];
var bet = ``;
var cardDealt = ``; // card drawn by cardDeck.pop

var playerHand = []; // card dealt with only name + suit (excludes value)
var compHand = [];

var playerSum = 0; // total sum of cards in hand (from cardDealt.values)
var compSum = 0;

var playerCardNameOnly = []; // card dealt with only name
var compCardNameOnly = [];

var playerNoOfAces = ``; // no of aces in player hand https://stackoverflow.com/questions/5667888/counting-the-occurrences-frequency-of-array-elements
var noOfAces = 0;

var playerAceIndex = 0; // index for loop to determine how many aces to change from 11 to 1
var aceIndex = 0;

var compLoseOrDraw = ``; // if comp lose or draw -> true

/////////////////////////// MAIN STARTS ///////////////////////////
var main = function (input) {
  var myOutputValue = ``;
  console.log(gameStage);
  if (gameStage == `noOfPlayers`) {
    console.log(gameStage);
    noOfPlayers = parseInt(input);
    while (playerIndex < noOfPlayers) {
      allPlayerBankroll.push(parseInt(100));
      playerIndex += 1;
    }
    playerIndex = 0;

    // execute all the function to make deck, shuffle
    // make as many decks as players so the deck will not run out so fast
    while (playerIndex < noOfPlayers) {
      makeDeck();
      playerIndex += 1;
    }
    playerIndex = 0;

    shuffleCards();
    myOutputValue =
      `There are ${noOfPlayers} players.` +
      `<br>` +
      `Key in your names! Add a "/" in between.` +
      `<br>` +
      `For example, Tom/Dick/Harry`;
    gameStage = `playerName`;
  } else if (gameStage == `playerName`) {
    if (input !== ``) {
      nameArray = input.split(`/`); // split the name into array at every "/"
      if (nameArray.length == noOfPlayers) {
        gameStage = `shuffleNdeal`;
        myOutputValue =
          `Hello ${nameArray}, welcome to the game!` +
          `<br>` +
          `<br>` +
          `${nameArray[0]}, submit your bet for the round! Minimum of 1, maximum of 100`;
      } else {
        myOutputValue =
          `You did not key in ${noOfPlayers} names.` +
          `<br>` +
          `Please key in your names! Add a "/" in between.` +
          `<br>` +
          `For example, Tom/Dick/Harry`;
      }
    } else {
      myOutputValue =
        `Please key in your names! Add a "/" in between.` +
        `<br>` +
        `For example, Tom/Dick/Harry`;
    }
  } else if (gameStage == `shuffleNdeal`) {
    if (allPlayerBankroll[playerIndex] > 0) {
      if (input > 0 && input <= allPlayerBankroll[playerIndex]) {
        bet = parseInt(input);
        myOutputValue = `${nameArray[playerIndex]}, you bet ${bet}! Click submit to deal cards!`;
        gameStage = `blackjack`;
      } else {
        myOutputValue =
          `${nameArray[playerIndex]}, please enter a bet, minimum of 1, maximum of ` +
          allPlayerBankroll[playerIndex] +
          `.`;
      }
    } else {
      if (playerIndex + 1 == noOfPlayers) {
        var currentPlayer = nameArray[playerIndex];
        playerIndex = 0;
        var nextPlayer = nameArray[playerIndex];
      } else if (playerIndex >= 0 && playerIndex + 1 < noOfPlayers) {
        currentPlayer = nameArray[playerIndex];
        playerIndex += 1;
        nextPlayer = nameArray[playerIndex];
      }

      myOutputValue =
        currentPlayer +
        `, you are bankrupt! ` +
        `<br>` +
        nextPlayer +
        `, submit your bet for next round!`;
      console.log(`here`);
    }
  } else if (gameStage == `blackjack`) {
    // deal firt two cards and determine if any blackjack during first deal
    dealCards();
    myOutputValue = blackjack();
  } else if (gameStage == `hitOrStay`) {
    // determine if player/comp to hit/stay
    myOutputValue = hitCards(input);
  }

  // determine what kind of return message
  if (allPlayerBankroll.every((item) => item === 0) == true) {
    // if all bankrupt https://stackoverflow.com/questions/21860216/how-do-i-know-an-array-contains-all-zero0-in-javascript#:~:text=With%20every%20%2C%20you%20are%20going,item%20%3D%3E%20item%20%3D%3D%3D%200)%3B
    return (
      `All bankrupt! Refresh to restart game!` + `<br>` + `<br>` + scoreboard()
    );
  } else if (allPlayerBankroll[playerIndex] <= 0) {
    console.log(`here2`);

    if (playerIndex + 1 == noOfPlayers) {
      var currentPlayer = nameArray[playerIndex];
      playerIndex = 0;
      var nextPlayer = nameArray[playerIndex];
    } else if (playerIndex >= 0 && playerIndex + 1 < noOfPlayers) {
      currentPlayer = nameArray[playerIndex];
      playerIndex += 1;
      nextPlayer = nameArray[playerIndex];
    }

    // playerIndex += 1;
    return (
      currentPlayer +
      `, you are bankrupt! ` +
      `<br>` +
      nextPlayer +
      `, submit your bet for next round!` +
      `<br>` +
      `<br>` +
      myOutputValue +
      `<br>` +
      `<br>` +
      `Cards left: ` +
      cardDeck.length +
      `<br>` +
      `<br>` +
      scoreboard()
    );
  } else if (cardDeck.length == 0) {
    return (
      `Not enough cards in the deck! Refresh page to play again!` +
      `<br>` +
      `<br>` +
      myOutputValue +
      `<br>` +
      `<br>` +
      `Cards left: ` +
      cardDeck.length +
      `<br>` +
      `<br>` +
      scoreboard()
    );
  } else {
    return (
      myOutputValue +
      `<br>` +
      `<br>` +
      `Cards left: ` +
      cardDeck.length +
      `<br>` +
      `<br>` +
      scoreboard()
    );
  }
};
/////////////////////////// MAIN ENDS ///////////////////////////

// copied from 10.2
var makeDeck = function () {
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      var count = cardName;
      if (cardName == 1) {
        cardName = "Ace";
        count = 11;
      } else if (cardName == 11) {
        cardName = "Jack";
        count = 10;
      } else if (cardName == 12) {
        cardName = "Queen";
        count = 10;
      } else if (cardName == 13) {
        cardName = "King";
        count = 10;
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: count,
      };
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// copied from 10.1
var shuffleCards = function () {
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

// deal cards at the start
var dealCards = function () {
  // refresh all the global variable here
  playerTurn = `player`;
  playerHand = [];
  playerSum = 0;
  playerCardNameOnly = [];
  compHand = [];
  compSum = 0;
  compCardNameOnly = [];
  playerNoOfAces = 0;
  playerAceIndex = 0;
  noOfAces = 0;
  aceIndex = 0;
  compLoseOrDraw = ``;

  var deal = 1;

  // deal <= 2 because need deal two cards
  while (deal <= 2) {
    // cardDeck.pop() to generate last card -> card drawn/dealt
    // push same card into playerHand to keep as area to show in output
    // push same card to playerCardNameOnly to find if theres a Ace
    // determine total playerSum
    cardDealt = cardDeck.pop();
    playerHand.push(cardDealt.name + ` ` + cardDealt.suit);
    playerCardNameOnly.push(cardDealt.name);
    playerSum = playerSum + cardDealt.value;

    // repeat same for comp
    cardDealt = cardDeck.pop();
    compHand.push(cardDealt.name + ` ` + cardDealt.suit);
    compCardNameOnly.push(cardDealt.name);
    compSum = compSum + cardDealt.value;

    deal += 1;
  }
};

// function to hit or stay
var hitCards = function (input) {
  var message = ``;
  var points = ``;
  if (playerTurn == `player`) {
    playerNoOfAces = playerCardNameOnly.filter((x) => x === `Ace`).length;
    // conditional for player to change ace to 1 or 11
    // playerCardNameOnly.includes(`Ace`) -> check if array has a Ace
    // playerAceIndex less than playerNoOfAces -> he still have aces not changed to 1
    if (
      input == `ace one` &&
      playerCardNameOnly.includes(`Ace`) == true &&
      playerAceIndex < playerNoOfAces
    ) {
      playerSum = playerSum - 10;
      playerAceIndex = playerAceIndex + 1;
      message =
        `Computer : ${compHand[0]}, ??? (Total: ??)` +
        `<br>` +
        `<br>` +
        `You chose ${playerAceIndex} of your Aces to be 1. Your new total sum above!` +
        `<br>` +
        `Player, enter "hit" or "stay"`;
    } else if (
      input == `ace eleven` &&
      playerCardNameOnly.includes(`Ace`) == true &&
      playerAceIndex <= playerNoOfAces &&
      playerAceIndex > 0
    ) {
      playerSum = playerSum + 10;
      playerAceIndex = playerAceIndex - 1;
      message =
        `Computer : ${compHand[0]}, ??? (Total: ??)` +
        `<br>` +
        `<br>` +
        `You chose ${playerAceIndex} of your Aces to be 1. Your new total sum above!` +
        `<br>` +
        `Player, enter "hit" or "stay"`;
    } else if (input == `hit`) {
      cardDealt = cardDeck.pop();
      playerHand.push(cardDealt.name + ` ` + cardDealt.suit);
      playerCardNameOnly.push(cardDealt.name);
      playerSum = playerSum + cardDealt.value;
      playerNoOfAces = playerCardNameOnly.filter((x) => x === `Ace`).length;
      points = nameArray[playerIndex] + `: ` + allPlayerBankroll[playerIndex];
      // if player total hand after hitting is >21, either immediately comp turn OR change for any remaining Aces not changed to 1 and continue to hit or stay
      if (playerSum > 21) {
        if (playerAceIndex < playerNoOfAces) {
          playerSum = playerSum - 10;
          playerAceIndex = playerAceIndex + 1;
          message =
            `Computer : ${compHand[0]}, ??? (Total: ??)` +
            `<br>` +
            `<br>` +
            `You chose ${playerAceIndex} of your Aces to be 1. Your new total sum above!` +
            `<br>` +
            `Player, enter "hit" or "stay"`;
        } else {
          playerTurn = `comp`;
          message =
            `Computer : ${compHand[0]}, ??? (Total: ??)` +
            `<br>` +
            `<br>` +
            `Player, you bust! Click submit again and computer will make his move!`;
        }
        // if player total hand after hitting is <21, check if want to hit again
      } else if (playerSum <= 21) {
        message =
          `Computer : ${compHand[0]}, ??? (Total: ??)` +
          `<br>` +
          `<br>` +
          `Player, enter "hit" or "stay"`;
      }
    } else if (input == `stay`) {
      playerTurn = `comp`;
      message =
        `Computer : ${compHand[0]}, ??? (Total: ??)` +
        `<br>` +
        `<br>` +
        `Computer's turn, click submit and computer will make his move!`;
    } else {
      message =
        `Computer : ${compHand[0]}, ??? (Total: ??)` +
        `<br>` +
        `<br>` +
        `Player, enter "hit" or "stay"`;
    }
  }
  // standard message for displaying player hand status
  var playerMessage =
    `${nameArray[playerIndex]} : ` +
    playerHand +
    ` (Total: ` +
    playerSum +
    `) ` +
    playerBust();

  if (playerTurn == `comp`) {
    // if comp hand less than 17 in hand -> hit until equal or more than 17
    while (compSum < 17) {
      cardDealt = cardDeck.pop();
      compHand.push(cardDealt.name + ` ` + cardDealt.suit);
      compCardNameOnly.push(cardDealt.name);
      compSum = compSum + cardDealt.value;
    }
    noOfAces = compCardNameOnly.filter((x) => x === `Ace`).length;
    console.log(compHand);
    if (compSum <= 21 && playerSum <= 21 && compSum == playerSum) {
      compLoseOrDraw = true;
      playerTurn = `player`;
      gameStage = `shuffleNdeal`; // start betting for next round

      points = nameArray[playerIndex] + `: ` + allPlayerBankroll[playerIndex];

      // determine who is next player
      if (playerIndex + 1 == noOfPlayers) {
        playerIndex = 0;
      } else if (playerIndex >= 0 && playerIndex + 1 < noOfPlayers) {
        playerIndex += 1;
      }

      message =
        `Computer : ` +
        compHand +
        ` (Total: ` +
        compSum +
        `) ` +
        compBust() +
        `<br>` +
        `<br>` +
        `It's a draw!` +
        `<br>` +
        `<br>` +
        nameArray[playerIndex] +
        `, submit your bet for next round!`;
    } else if (compSum > 21 && playerSum > 21) {
      compLoseOrDraw = true;
      playerTurn = `player`;
      gameStage = `shuffleNdeal`;

      points = nameArray[playerIndex] + `: ` + allPlayerBankroll[playerIndex];

      if (playerIndex + 1 == noOfPlayers) {
        playerIndex = 0;
      } else if (playerIndex >= 0 && playerIndex + 1 < noOfPlayers) {
        playerIndex += 1;
      }

      message =
        `Computer : ` +
        compHand +
        ` (Total: ` +
        compSum +
        `) ` +
        compBust() +
        `<br>` +
        `<br>` +
        `Both bust! Draw!` +
        `<br>` +
        `<br>` +
        nameArray[playerIndex] +
        `, submit your bet for next round!`;
    } else if (compSum > playerSum) {
      if (compSum <= 21) {
        compLoseOrDraw = false;
        allPlayerBankroll[playerIndex] = allPlayerBankroll[playerIndex] - bet;
        playerTurn = `player`;
        gameStage = `shuffleNdeal`;

        points = nameArray[playerIndex] + `: ` + allPlayerBankroll[playerIndex];

        if (playerIndex + 1 == noOfPlayers) {
          playerIndex = 0;
        } else if (playerIndex >= 0 && playerIndex + 1 < noOfPlayers) {
          playerIndex += 1;
        }

        message =
          `Computer : ` +
          compHand +
          ` (Total: ` +
          compSum +
          `) ` +
          compBust() +
          `<br>` +
          `<br>` +
          `Computer wins!` +
          `<br>` +
          `<br>` +
          nameArray[playerIndex] +
          `, submit your bet for next round!`;
      }
      // if comp loses or draw, if there are any Aces not changed to 1, bankroll wil not adjust yet because need to execute line 415 to reduce Ace to 1 and draw again to try to win player
      else {
        compLoseOrDraw = true;
        if (aceIndex == noOfAces) {
          allPlayerBankroll[playerIndex] = allPlayerBankroll[playerIndex] + bet;

          points =
            nameArray[playerIndex] + `: ` + allPlayerBankroll[playerIndex];

          if (playerIndex + 1 == noOfPlayers) {
            playerIndex = 0;
          } else if (playerIndex >= 0 && playerIndex + 1 < noOfPlayers) {
            playerIndex += 1;
          }
        } else {
          allPlayerBankroll[playerIndex] = allPlayerBankroll[playerIndex];

          points =
            nameArray[playerIndex] + `: ` + allPlayerBankroll[playerIndex];
        }
        playerTurn = `player`;
        gameStage = `shuffleNdeal`;

        message =
          `Computer : ` +
          compHand +
          ` (Total: ` +
          compSum +
          `) ` +
          compBust() +
          `<br>` +
          `<br>` +
          `Player wins!` +
          `<br>` +
          `<br>` +
          nameArray[playerIndex] +
          `, submit your bet for next round!`;
      }
    } else if (compSum < playerSum) {
      if (playerSum <= 21) {
        compLoseOrDraw = true;
        if (aceIndex == noOfAces) {
          allPlayerBankroll[playerIndex] = allPlayerBankroll[playerIndex] + bet;

          points =
            nameArray[playerIndex] + `: ` + allPlayerBankroll[playerIndex];

          if (playerIndex + 1 == noOfPlayers) {
            playerIndex = 0;
          } else if (playerIndex >= 0 && playerIndex + 1 < noOfPlayers) {
            playerIndex += 1;
          }
        } else {
          allPlayerBankroll[playerIndex] = allPlayerBankroll[playerIndex];

          points =
            nameArray[playerIndex] + `: ` + allPlayerBankroll[playerIndex];
        }
        playerTurn = `player`;
        gameStage = `shuffleNdeal`;
        message =
          `Computer : ` +
          compHand +
          ` (Total: ` +
          compSum +
          `) ` +
          compBust() +
          `<br>` +
          `<br>` +
          `Player wins!` +
          `<br>` +
          `<br>` +
          nameArray[playerIndex] +
          `, submit your bet for next round!`;
      } else {
        compLoseOrDraw = false;
        allPlayerBankroll[playerIndex] = allPlayerBankroll[playerIndex] - bet;
        playerTurn = `player`;
        gameStage = `shuffleNdeal`;

        points = nameArray[playerIndex] + `: ` + allPlayerBankroll[playerIndex];

        if (playerIndex + 1 == noOfPlayers) {
          playerIndex = 0;
        } else if (playerIndex >= 0 && playerIndex + 1 < noOfPlayers) {
          playerIndex += 1;
        }

        message =
          `Computer : ` +
          compHand +
          ` (Total: ` +
          compSum +
          `) ` +
          compBust() +
          `<br>` +
          `<br>` +
          `Computer wins!` +
          `<br>` +
          `<br>` +
          nameArray[playerIndex] +
          `, submit your bet for next round!`;
      }
    }

    // comp considered to have lost when bust, less than player, or draw
    // if compLoseOrDraw == true -> if theres a Ace inside comp hand -> then comp can try to win by reducing the Ace value to 1 (default 11)
    // after reduction, will hit again by changing playerTurn = `comp

    if (compLoseOrDraw == true) {
      if (noOfAces > 0 && aceIndex < noOfAces) {
        compSum = compSum - 10;
        aceIndex += 1; // changes one ace at a time
        compLoseOrDraw = false;
        playerTurn = `comp`;
        gameStage = `hitOrStay`;
        message =
          `Computer : ` +
          compHand +
          ` (Total: ` +
          compSum +
          `) ` +
          compBust() +
          `<br>` +
          `<br>` +
          `Computer chosen ` +
          aceIndex +
          ` his Ace(s) to be 1. Click submit for computer to draw card again!`;
      }
    }
  }

  return (
    points +
    `<br>` +
    `Bet: ` +
    bet +
    `<br>` +
    `<br>` +
    `Remember you can change your Ace(s) to 1 or 11 by entering "ace one" or "ace eleven" !` +
    `<br>` +
    `<br>` +
    playerMessage +
    `<br>` +
    message
  );
};

// determine if any blackjack after starting deal
var blackjack = function () {
  var message = ``;
  var playerMessageTwo = ``;
  var points = ``;

  //check for double Aces
  if (
    compCardNameOnly.filter((x) => x === `Ace`).length == 2 &&
    playerCardNameOnly.filter((x) => x === `Ace`).length !== 2
  ) {
    allPlayerBankroll[playerIndex] = allPlayerBankroll[playerIndex] - bet;

    points = nameArray[playerIndex] + `: ` + allPlayerBankroll[playerIndex];

    playerMessageTwo =
      `${nameArray[playerIndex]} : ` +
      playerHand +
      ` (Total: ` +
      playerSum +
      `) `;

    if (playerIndex + 1 == noOfPlayers) {
      playerIndex = 0;
    } else if (playerIndex >= 0 && playerIndex + 1 < noOfPlayers) {
      playerIndex += 1;
    }

    message =
      `Computer : ` +
      compHand +
      ` (Total: ` +
      compSum +
      `)` +
      `<br>` +
      `<br>` +
      `Computer got a Double Aces! Computer wins!` +
      `<br>` +
      `<br>` +
      `${nameArray[playerIndex]}, submit your bet for next round!`;

    gameStage = `shuffleNdeal`; // return to betting
  } else if (
    compCardNameOnly.filter((x) => x === `Ace`).length !== 2 &&
    playerCardNameOnly.filter((x) => x === `Ace`).length == 2
  ) {
    allPlayerBankroll[playerIndex] = allPlayerBankroll[playerIndex] + bet;

    points = nameArray[playerIndex] + `: ` + allPlayerBankroll[playerIndex];

    playerMessageTwo =
      `${nameArray[playerIndex]} : ` +
      playerHand +
      ` (Total: ` +
      playerSum +
      `) `;

    if (playerIndex + 1 == noOfPlayers) {
      playerIndex = 0;
    } else if (playerIndex >= 0 && playerIndex + 1 < noOfPlayers) {
      playerIndex += 1;
    }

    message =
      `Computer : ` +
      compHand +
      ` (Total: ` +
      compSum +
      `)` +
      `<br>` +
      `<br>` +
      `Player got a Double Aces! Player wins!` +
      `<br>` +
      `<br>` +
      `${nameArray[playerIndex]}, submit your bet for next round!`;

    gameStage = `shuffleNdeal`;
  } else if (playerSum == 21 && compSum !== 21) {
    allPlayerBankroll[playerIndex] = allPlayerBankroll[playerIndex] + bet;

    points = nameArray[playerIndex] + `: ` + allPlayerBankroll[playerIndex];

    playerMessageTwo =
      `${nameArray[playerIndex]} : ` +
      playerHand +
      ` (Total: ` +
      playerSum +
      `) `;

    if (playerIndex + 1 == noOfPlayers) {
      playerIndex = 0;
    } else if (playerIndex >= 0 && playerIndex + 1 < noOfPlayers) {
      playerIndex += 1;
    }

    message =
      `Computer : ` +
      compHand +
      ` (Total: ` +
      compSum +
      `)` +
      `<br>` +
      `<br>` +
      `Player got a Blackjack! Player wins!` +
      `<br>` +
      `<br>` +
      `${nameArray[playerIndex]}, submit your bet for next round!`;

    gameStage = `shuffleNdeal`;
  } else if (playerSum !== 21 && compSum == 21) {
    allPlayerBankroll[playerIndex] = allPlayerBankroll[playerIndex] - bet;

    points = nameArray[playerIndex] + `: ` + allPlayerBankroll[playerIndex];

    playerMessageTwo =
      `${nameArray[playerIndex]} : ` +
      playerHand +
      ` (Total: ` +
      playerSum +
      `) `;

    if (playerIndex + 1 == noOfPlayers) {
      playerIndex = 0;
    } else if (playerIndex >= 0 && playerIndex + 1 < noOfPlayers) {
      playerIndex += 1;
    }

    message =
      `Computer : ` +
      compHand +
      ` (Total: ` +
      compSum +
      `)` +
      `<br>` +
      `<br>` +
      `Computer got a Blackjack! Computer wins!` +
      `<br>` +
      `<br>` +
      `${nameArray[playerIndex]}, submit your bet for next round!`;

    gameStage = `shuffleNdeal`;
  } else if (
    (playerSum == 21 && compSum == 21) ||
    (playerSum == 22 && compSum == 22)
  ) {
    points = nameArray[playerIndex] + `: ` + allPlayerBankroll[playerIndex];

    playerMessageTwo =
      `${nameArray[playerIndex]} : ` +
      playerHand +
      ` (Total: ` +
      playerSum +
      `) `;

    if (playerIndex + 1 == noOfPlayers) {
      playerIndex = 0;
    } else if (playerIndex >= 0 && playerIndex + 1 < noOfPlayers) {
      playerIndex += 1;
    }

    message =
      `Computer : ` +
      compHand +
      ` (Total: ` +
      compSum +
      `)` +
      `<br>` +
      `<br>` +
      `Both Blackjack! Draw!` +
      `<br>` +
      `<br>` +
      `${nameArray[playerIndex]}, submit your bet for next round!`;

    gameStage = `shuffleNdeal`;
  } else {
    points = nameArray[playerIndex] + `: ` + allPlayerBankroll[playerIndex];

    playerMessageTwo =
      `${nameArray[playerIndex]} : ` +
      playerHand +
      ` (Total: ` +
      playerSum +
      `) `;
    gameStage = `hitOrStay`;

    // ??? for one of comp's card because one card of dealer is face down
    message =
      `Computer : ` +
      compHand[0] +
      `,???` +
      ` (Total: ??)` +
      `<br>` +
      `<br>` +
      `No Blackjack! ${nameArray[playerIndex]}, enter "hit" or "stay"`;
  }
  return (
    points +
    `<br>` +
    `Bet: ` +
    bet +
    `<br>` +
    `<br>` +
    `Remember you can change your Ace(s) to 1 or 11 by entering "ace one" or "ace eleven" !` +
    `<br>` +
    `<br>` +
    playerMessageTwo +
    `<br>` +
    message
  );
};

// auto BUST! string fucntion for the output
var playerBust = function () {
  if (playerSum > 21) {
    return `BUST!`;
  } else {
    return ``;
  }
};

var compBust = function () {
  if (compSum > 21) {
    return `BUST!`;
  } else {
    return ``;
  }
};

var scoreboard = function () {
  var message = ``;
  var playerNo = 0;
  while (playerNo < noOfPlayers) {
    message =
      message +
      nameArray[playerNo] +
      `: ` +
      allPlayerBankroll[playerNo] +
      `<br>`;
    playerNo += 1;
  }
  playerNo = 0;
  return message;
};
