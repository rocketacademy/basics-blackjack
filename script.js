// Deck is shuffled.
// User clicks Submit to deal cards.
// The cards are analysed for game winning conditions, e.g. Blackjack.
// The cards are displayed to the user.
// The user decides whether to hit or stand, using the submit button to submit their choice.
// The user's cards are analysed for winning or losing conditions.
// The computer decides to hit or stand automatically based on game rules.
// The game either ends or continue

// global variables
var playerHand = [];
var computerHand = [];
var playerWallet = 100;
var playerBet = [];
var gameMode = "bet";
var playerStandMode = false;
var twentyOne = 21;
var hitButtonClicked = false;
var standButtonClicked = false;
var winImage =
  '<img src="https://media2.giphy.com/media/LCdPNT81vlv3y/giphy.gif?cid=ecf05e47w20ihs4qbu8cetydzam5waeimxx77zkjyh9ncbc2&rid=giphy.gif&ct=g"/>';
var lossImage =
  '<img src="https://media2.giphy.com/media/1BXa2alBjrCXC/giphy.gif?cid=ecf05e47x0x0icxer36pa743cdroy3ne9x5sz5rqq5zwpwbq&rid=giphy.gif&ct=g"/>';
var tieImage =
  '<img src="https://media0.giphy.com/media/5QW76Ww9bquHdg1fTv/giphy.gif?cid=ecf05e47efismdrzkwr3unkcm7gixcav2ibhd0ciebl3xvq4&rid=giphy.gif&ct=g">';

var getBetAmount = function (input) {
  if (isNaN(input) == true || !Number(input) > 0) {
    return `Please enter your bet.`;
  } else playerBet.push(input);
  gameMode = "draw cards";
  return `You bet $${playerBet[playerBet.length - 1]}.`;
};

var calcBetWin = function () {
  var winAmount = parseInt(playerBet.pop());
  var totalCurrentWallet = (playerWallet += winAmount);
  console.log(`wallet amount: ${totalCurrentWallet}`);
  return `You won $${winAmount}<br>Current wallet size: $${totalCurrentWallet}<br><br>${winImage}`;
};

var calcBetLoss = function () {
  var lossAmount = parseInt(playerBet.pop());
  var totalCurrentWallet = (playerWallet -= lossAmount);
  console.log(`wallet amount: ${totalCurrentWallet}`);
  return `You loss $${lossAmount}<br>Current wallet size: $${totalCurrentWallet}<br><br>${lossImage}`;
};

// make deck
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["♥️", "♦️ ", "♣️", "♠️"];

  var emojiIcons = {
    1: "🅰️",
    2: "2️⃣",
    3: "3️⃣",
    4: "4️⃣",
    5: "5️⃣",
    6: "6️⃣",
    7: "7️⃣",
    8: "8️⃣",
    9: "9️⃣",
    10: "🔟",
    11: "🤴",
    12: "👸",
    13: "👑",
  };

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

      var emoji = emojiIcons[rankCounter];
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        emoji: emoji,
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
  return cardDeck;
};

// shuffle deck
// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
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

// create deck and shuffle deck
var deck = makeDeck();
var shuffledDeck = shuffleCards(deck);

// player draw 2 cards
var playerDrawCards = function () {
  var playerCardOne = shuffledDeck.pop();
  var playerCardTwo = shuffledDeck.pop();

  playerHand.push(playerCardOne, playerCardTwo);
  console.log("player hand");
  console.log(playerHand);

  return `Pl🦄yer draws ${playerCardOne.emoji} of ${playerCardOne.suit} and ${playerCardTwo.emoji} of ${playerCardTwo.suit}.`;
};

// computer draw 2 cards
var computerDrawCards = function () {
  var computerCardOne = shuffledDeck.pop();
  var computerCardTwo = shuffledDeck.pop();

  computerHand.push(computerCardOne, computerCardTwo);
  console.log("computer hand");
  console.log(computerHand);

  return `Rob🤖t draws 🃏 and ${computerCardTwo.emoji} of ${computerCardTwo.suit}.`;
};

// Comparing both hands and determining a winner. The possible scenarios are:
// A tie. When both the player and dealer have the same total hand values - or if both draw Blackjack
// A Blackjack win. When either player or dealer draw Blackjack.
// A normal win. When neither draw Blackjack, the winner is decided by whomever has the higher hand total.

// compute ranking
var getHandSum = function (hand) {
  var numAcesInHand = 0;
  var sum = 0;
  var counter = 0;
  while (counter < hand.length) {
    var currCard = hand[counter];

    // if card is jack, queen and king is 10 by default
    if (
      currCard.name == "jack" ||
      currCard.name == "queen" ||
      currCard.name == "king"
    ) {
      currCard.rank = 10;
    }

    // If card is Ace, value is 11 by default
    if (currCard.rank === 1) {
      numAcesInHand += 1;
      sum += 11;
    } else {
      sum += currCard.rank;
    }

    counter = counter + 1;
  }
  // If sum is greater than sum limit and hand contains Aces, convert Aces from value of 11
  // to value of 1, until sum is less than or equal to sum limit or there are no more Aces.
  if (sum > twentyOne && numAcesInHand > 0) {
    var aceCounter = 0;
    while (aceCounter < numAcesInHand) {
      sum -= 10;
      // If the sum is less than TWENTY_ONE before converting all Ace values from
      // 11 to 1, break out of the loop and return the current sum.
      if (sum <= twentyOne) {
        break; // break keyword causes the loop to finish
      }
      aceCounter = aceCounter + 1;
    }
  }
  return sum;
};

var playerTotalHandRank = function () {
  var playerHandRankSum = getHandSum(playerHand);
  console.log(`player total score: ${playerHandRankSum}`);
  return playerHandRankSum;
};

var computerTotalHandRank = function () {
  var computerHandRankSum = getHandSum(computerHand);
  console.log(`computer total score: ${computerHandRankSum}`);
  return computerHandRankSum;
};

var playAgain = function () {
  gameMode = "bet";
  playerHand = [];
  computerHand = [];
  playerStandMode = false;
  return `<br><br>Click submit to play again!`;
};

// compare hands
var compareHands = function (playerBet) {
  while (gameMode == "draw cards") {
    // computer blackjack
    if (computerTotalHandRank() == 21) {
      return `Rob🤖t wins with Blackjack 🔥 ${computerTotalHandRank()}!.${playAgain()}<br><br>${calcBetLoss()}`;
      // player blackjack
    } else if (playerTotalHandRank() == 21) {
      return `Pl🦄yer wins with Blackjack 🔥 ${playerTotalHandRank()}!.${playAgain()}<br><br>${calcBetWin()}`;
      // player and computer bust
    } else if (computerTotalHandRank() > 21 && playerTotalHandRank() > 21) {
      return `Both busted 😱! It is a t👔e between Pl🦄yer and Rob🤖t.<br><br>Pl🦄yer score: ${playerTotalHandRank()} and Rob🤖t score: ${computerTotalHandRank()}.${playAgain()}<br><br>Current wallet amount ${playerWallet}`;
      // computer bust
    } else if (computerTotalHandRank() > 21) {
      return `Pl🦄yer wins 🏆! Rob🤖t busted with ${computerTotalHandRank()}.<br><br>Pl🦄yer score: ${playerTotalHandRank()} and Rob🤖t score: ${computerTotalHandRank()}.${playAgain()}<br><br>${calcBetLoss()}`;
      // go to player hit or stand mode
    } else gameMode = "player turn";
    return `<br><br>Pl🦄yer current score is ${playerTotalHandRank()}<br><br>Click "Hit" or "Stand"`;
  }

  while (gameMode == "player turn") {
    // player blackjack
    if (playerTotalHandRank() == 21) {
      return `Pl🦄yer wins 🔥!<br><br>Pl🦄yer score is ${playerTotalHandRank()} and Rob🤖t score is ${computerTotalHandRank()}.${playAgain()}<br><br>${calcBetWin()}`;
      // player stand
    } else
      return `Pl🦄yer current score is ${playerTotalHandRank()}<br><br>Click "Hit" or "Stand"`;
  }

  while (gameMode == "computer turn") {
    // player and computer above 21
    if (computerTotalHandRank() > 21 && playerTotalHandRank() > 21) {
      return `Both busted 😱! It is a t👔e between Pl🦄yer and Rob🤖t.<br><br>Pl🦄yer score is ${playerTotalHandRank()} and Rob🤖t score is ${computerTotalHandRank()}.${playAgain()}<br><br>Current wallet amount ${playerWallet}<br><br>${tieImage}`;
      // computer bust > 21
    } else if (computerTotalHandRank() > 21 && playerTotalHandRank() <= 21) {
      return `Pl🦄yer wins 🏆! Rob🤖t busted with ${computerTotalHandRank()}.<br><br>Pl🦄yer score is ${playerTotalHandRank()} and Rob🤖t score is ${computerTotalHandRank()}.${playAgain()}<br><br>${calcBetWin()}`;
      // player bust > 21 but computer < 21
    } else if (computerTotalHandRank() <= 21 && playerTotalHandRank() > 21) {
      return `Rob🤖t wins 🏆! Pl🦄yer busted with ${playerTotalHandRank()}.<br><br>Pl🦄yer score is ${playerTotalHandRank()} and Rob🤖t score is ${computerTotalHandRank()}.${playAgain()}<br><br>${calcBetLoss()}`;
      // player larger than computer
    } else if (playerTotalHandRank() > computerTotalHandRank()) {
      return `Pl🦄yer wins 🙌 with a larger score!<br><br>Pl🦄yer score is ${playerTotalHandRank()} and Rob🤖t score is ${computerTotalHandRank()}.${playAgain()}<br><br>${calcBetWin()}`;
      // player smaller than computer
    } else if (playerTotalHandRank() < computerTotalHandRank()) {
      return `Rob🤖t wins 🥲 with a larger score!<br><br>Pl🦄yer score is ${playerTotalHandRank()} and Rob🤖t score is ${computerTotalHandRank()}.${playAgain()}<br><br>${calcBetLoss()}`;
      // player and computer tie
    } else if (playerTotalHandRank() == computerTotalHandRank()) {
      return `It is a t👔e between Pl🦄yer and Rob🤖t.<br><br>Pl🦄yer score is ${playerTotalHandRank()} and Rob🤖t score is ${computerTotalHandRank()}.${playAgain()}<br><br>Current wallet amount ${playerWallet}<br><br>${tieImage}`;
      // computer blackjack
    } else if (computerTotalHandRank() == 21) {
      return `Rob🤖t wins with Blackjack 🔥!<br><br>Pl🦄yer score is ${playerTotalHandRank()} and Rob🤖t score is ${computerTotalHandRank()}.${playAgain()}<br><br>${calcBetLoss()}`;
    }
  }
};
var playerHitCard = 0;

var playerHit = function () {
  playerHitCard = shuffledDeck.pop();
  playerHand.push(playerHitCard);
  console.log("player hit hand");
  console.log(playerHand);
  hitButtonClicked = false;
  return `Pl🦄yer hits and draws ${playerHitCard.emoji} of ${
    playerHitCard.suit
  }<br><br> ${compareHands()}`;
};

var playerStand = function () {
  playerStandMode = true;
  gameMode = "computer turn";
  standButtonClicked = false;
  return `Pl🦄yer stands firm 💪!<br><br>Pl🦄yer score is ${playerTotalHandRank()}.<br><br>Click submit ✔️`;
};

var computerHitOrStand = function () {
  //computer to hit if total score is below 16
  if (
    computerTotalHandRank() < 16 &&
    playerStandMode == true &&
    gameMode == "computer turn"
  ) {
    var computerHitCard = shuffledDeck.pop();
    computerHand.push(computerHitCard);
    console.log("computer hit hand");
    console.log(computerHand);

    return `Rob🤖t hits and draws ${computerHitCard.emoji} of ${
      computerHitCard.suit
    }.<br><br>Pl🦄yer score is ${playerTotalHandRank()} and Rob🤖t score is ${computerTotalHandRank()}.<br><br>Click submit ✔️`;

    // computer to proceed to compare hands if equals or above 16
  } else if (
    computerTotalHandRank() >= 16 &&
    playerStandMode == true &&
    gameMode == "computer turn"
  ) {
    return compareHands();
  }
};

// main blackjack
var main = function (input) {
  var myOutputValue = "";
  if (gameMode == "bet") {
    myOutputValue = getBetAmount(input);
    console.log("bet amount: " + playerBet);
  } else if (gameMode == "draw cards") {
    myOutputValue = `${playerDrawCards()} <br> ${computerDrawCards()} <br> ${compareHands()}`;
    console.log(`game mode: ${gameMode}`);
  } else if (gameMode == "player turn") {
    if (hitButtonClicked == true) {
      myOutputValue = playerHit();
    } else if (standButtonClicked == true) {
      myOutputValue = playerStand();
    }
    console.log(`game mode: ${gameMode}`);
    console.log(`hit button clicked: ${hitButtonClicked}`);
    console.log(`stand button clicked: ${standButtonClicked}`);
  } else if (gameMode == "computer turn") {
    myOutputValue = computerHitOrStand();
    console.log(`game mode: ${gameMode}`);
  }
  return myOutputValue;
};
