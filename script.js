var cardDeck = []; // Initialise an empty deck array
var suits = ["♥", "♦", "♣", "♠"]; // Initialise an array of the 4 suits in our deck. We will loop over this array

var gameStage = `shuffleNdeal`; // or hitOrStay // determine which stage of game
var playerTurn = `player`; // or comp or result // determine whos turn, player, comp or result
var cardDealt = ``; // card drawn by cardDeck.pop
var playerHand = []; // card dealt with only name + suit (excludes value)
var compHand = [];
var playerSum = 0; // total sum of cards in hand (from cardDealt.values)
var compSum = 0;
var playerCardNameOnly = []; // card dealt with only name
var compCardNameOnly = [];
var noOfAces = 0; // no of aces in comp hand https://stackoverflow.com/questions/5667888/counting-the-occurrences-frequency-of-array-elements
var compLoseOrDraw = false; // if comp lose/draw -> true
var aceIndex = 0; // index for loop to determine how many aces to change from 11 to 1

var main = function (input) {
  var myOutputValue = ``;
  if (gameStage == `shuffleNdeal`) {
    // execute all the function to make deck, shuffle, and deal
    makeDeck();
    shuffleCards();
    dealCards();

    // determine if any blackjack during first deal
    myOutputValue = blackjack();
    gameStage = `hitOrStay`;
  } else if (gameStage == `hitOrStay`) {
    // execute if player/comp to hit/stay
    myOutputValue = hitCards(input);
  }
  return myOutputValue;
};

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

  // conditional for player to change ace to 1 or 11
  // playerCardNameOnly.includes(`Ace`) -> check if array has a Ace
  if (input == `ace one` && playerCardNameOnly.includes(`Ace`) == true) {
    playerSum = playerSum - 10;
    playerTurn = `player`;
    message =
      `<br>` +
      `You chose Ace to be 1. Your new total sum above!` +
      `<br>` +
      `Player, enter "hit" or "stay"`;
  } else if (
    input == `ace eleven` &&
    playerCardNameOnly.includes(`Ace`) == true
  ) {
    playerSum = playerSum + 10;
    playerTurn = `player`;
    message =
      `<br>` +
      `You chose Ace to be 11. Your new total sum above!` +
      `<br>` +
      `Player, enter "hit" or "stay"`;
  }

  if (playerTurn == `player`) {
    if (input == `hit`) {
      cardDealt = cardDeck.pop();
      playerHand.push(cardDealt.name + ` ` + cardDealt.suit);
      playerCardNameOnly.push(cardDealt.name);
      playerSum = playerSum + cardDealt.value;

      gameStage = `hitOrStay`;

      // if player total hand after hitting is >21, immediately comp turn
      if (playerSum > 21) {
        playerTurn = `comp`;
        message =
          `Computer : ${compHand[0]}, ??? (Total: ??)` +
          `<br>` +
          `<br>` +
          `Player, you bust! Click submit again and computer will make his move!`;

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
    }
  } else if (playerTurn == `comp`) {
    playerTurn = `result`;

    // if comp hand less than 17 in hand -> hit until equal or more than 17
    while (compSum < 17) {
      cardDealt = cardDeck.pop();
      compHand.push(cardDealt.name + ` ` + cardDealt.suit);
      compCardNameOnly.push(cardDealt.name);
      compSum = compSum + cardDealt.value;
    }
    if (compSum <= 21 && playerSum <= 21 && compSum == playerSum) {
      compLoseOrDraw = true;
      message =
        `Computer : ` +
        compHand +
        ` (Total: ` +
        compSum +
        `) ` +
        compBust() +
        `<br>` +
        `<br>` +
        `It's a draw!`;
    } else if (compSum > 21 && playerSum > 21) {
      compLoseOrDraw = true;
      message =
        `Computer : ` +
        compHand +
        ` (Total: ` +
        compSum +
        `) ` +
        compBust() +
        `<br>` +
        `<br>` +
        `Both bust! Draw!`;
    } else if (compSum > playerSum) {
      if (compSum <= 21) {
        message =
          `Computer : ` +
          compHand +
          ` (Total: ` +
          compSum +
          `) ` +
          compBust() +
          `<br>` +
          `<br>` +
          `Computer wins! `;
      } else {
        compLoseOrDraw = true;
        message =
          `Computer : ` +
          compHand +
          ` (Total: ` +
          compSum +
          `) ` +
          compBust() +
          `<br>` +
          `<br>` +
          `Player wins! `;
      }
    } else if (compSum < playerSum) {
      if (playerSum <= 21) {
        compLoseOrDraw = true;
        message =
          `Computer : ` +
          compHand +
          ` (Total: ` +
          compSum +
          `) ` +
          compBust() +
          `<br>` +
          `<br>` +
          `Player wins! `;
      } else {
        message =
          `Computer : ` +
          compHand +
          ` (Total: ` +
          compSum +
          `) ` +
          compBust() +
          `<br>` +
          `<br>` +
          `Computer wins! `;
      }
    }
  }
  // comp considered to have lost when bust, less than payer, or draw
  // if compLoseOrDraw == true -> if theres a Ace inside comp hand -> then comp can try to win by reducing the Ace value to 1 (default 11)
  // after reduction, will hit again by changing playerTurn = `comp`
  if (playerTurn == `result`) {
    noOfAces = compCardNameOnly.filter((x) => x === `Ace`).length;
    if (compLoseOrDraw == true && noOfAces > 0) {
      // aceIndex is global because it will record latest number of Ace, since can keep drawing Aces
      while (aceIndex < noOfAces) {
        compSum = compSum - 10;
        aceIndex += 1;
      }
      compLoseOrDraw = false;
      playerTurn = `comp`;
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

  return (
    `Player : ` +
    playerHand +
    ` (Total: ` +
    playerSum +
    `) ` +
    playerBust() +
    `<br>` +
    message
  );
};

// determine if any blackjack after starting deal
var blackjack = function () {
  var message = ``;
  if (
    compCardNameOnly.filter((x) => x === `Ace`) == 2 &&
    playerCardNameOnly.filter((x) => x === `Ace`) !== 2
  ) {
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
      `Refresh to restart!`;
  } else if (
    compCardNameOnly.filter((x) => x === `Ace`) !== 2 &&
    playerCardNameOnly.filter((x) => x === `Ace`) == 2
  ) {
    message =
      `Computer : ` +
      compHand +
      ` (Total: ` +
      compSum +
      `)` +
      `<br>` +
      `<br>` +
      `Player got a Double Aces! Computer wins!` +
      `<br>` +
      `<br>` +
      `Refresh to restart!`;
  } else if (playerSum == 21 && compSum !== 21) {
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
      `Refresh to restart!`;
  } else if (playerSum !== 21 && compSum == 21) {
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
      `Refresh to restart!`;
  } else if (
    (playerSum == 21 && compSum == 21) ||
    (playerSum == 22 && compSum == 22)
  ) {
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
      `Refresh to restart!`;
  } else {
    message =
      `Computer : ` +
      compHand[0] +
      `,???` +
      ` (Total: ??)` +
      `<br>` +
      `<br>` +
      `No Blackjack! Player, enter "hit" or "stay"`;
  }
  return (
    `Player : ` + playerHand + ` (Total: ` + playerSum + `)` + `<br>` + message
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
