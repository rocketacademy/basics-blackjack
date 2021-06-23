// Game modes stored in variables
var DEAL_CARDS = "deal cards";
var PLAYER_ACTION = "player hits or stands";
var COMPUTER_CALCULATES = "computer calculates";
var FINAL_RESULT = "final result";

// Declare user inputs as variables
var INPUT_HIT = "hit";
var INPUT_STAND = "stand";

// Global variables
var playerCards = [];
var computerCards = [];
var cardDeck = [];
var shuffledDeck;
var createDeck;
var playerPoints = 0;
var computerPoints = 0;

// Current game mode
gameMode = DEAL_CARDS;

// Create a deck of cards
var makeDeck = function () {
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var emojiSuits = ["❤️", "♦️", "♣️", "♠️"];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var currentEmojiSuit = emojiSuits[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardValue = rankCounter;
      if (rankCounter == 1) {
        cardValue = 11;
      } else if (rankCounter == 11 || rankCounter == 12 || rankCounter == 13) {
        cardValue = 10;
      }
      var cardName = rankCounter;
      if (cardName == 1) {
        cardName = "Ace";
      } else if (cardName == 11) {
        cardName = "Jack";
      } else if (cardName == 12) {
        cardName = "Queen";
      } else if (cardName == 13) {
        cardName = "King";
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        emojiSuit: currentEmojiSuit,
        rank: rankCounter,
        value: cardValue,
      };
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};

var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle deck of cards
var shuffleDeck = function (cardDeck) {
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

// Deal card to player and computer, repeat twice
var dealCards = function () {
  dealCounter = 0;
  while (dealCounter < 2) {
    playerCards.push(shuffledDeck.pop());
    computerCards.push(shuffledDeck.pop());
    dealCounter += 1;
  }
  if (
    // If player gets blackjack, declare winner and reset game
    playerCards[0].value + playerCards[1].value == 21 &&
    computerCards[0].value + computerCards[1].value != 21
  ) {
    gameMode = DEAL_CARDS;
    return `YOU HAVE GOTTEN BLACKJACK AND WIN! 🥳 <br><br> You have drawn a ${playerCards[0].name} of ${playerCards[0].emojiSuit} and a ${playerCards[1].name} of ${playerCards[1].emojiSuit}`;
  } else if (
    // If both get blackjack, declare draw and reset game
    playerCards[0].value + playerCards[1].value == 21 &&
    computerCards[0].value + computerCards[1].value == 21
  ) {
    gameMode = DEAL_CARDS;
    return `You both drew blackjacks! Its a draw!`;
  } else {
    gameMode = PLAYER_ACTION;
    // Otherwise inform player of current cards and ask if they want to hit or stand
    return `Player, you have drawn a ${playerCards[0].name} of ${playerCards[0].emojiSuit} and a ${playerCards[1].name} of ${playerCards[1].emojiSuit}. <br><br> Please enter 'hit' if you would like more cards <br><br> Please enter 'stand' if you do not want anymore cards `;
  }
};

// Draw extra card for player and output results
// If player bursts, output results and reset game
var playerDrawsExtraCard = function () {
  playerCards.push(shuffledDeck.pop());

  var playerCardMessage = `You current cards are: `;
  playerCounter = 0;
  while (playerCounter < playerCards.length) {
    playerPoints = playerPoints + playerCards[playerCounter].value;
    playerCardMessage =
      playerCardMessage +
      `<br> ${playerCards[playerCounter].name} of ${playerCards[playerCounter].emojiSuit}`;
    if (playerPoints > 21) {
      gameMode = DEAL_CARDS;
      return (
        `You've burst and lost! <br> Your score is ${playerPoints} <br> ` +
        playerCardMessage
      );
    }

    playerCounter += 1;
  }

  return `Your total points are: ${playerPoints} <br> ` + playerCardMessage;
};

var calculateComputerScore = function () {
  // Add computer score for first two cards
  computerPoints = computerCards[0].value + computerCards[1].value;
  // If two card score >= 17 and <= 21, change gameMode to compare with player score
  if (computerPoints >= 17 && computerPoints <= 21) {
    gameMode = FINAL_RESULT;
    return `Computer's points are ${computerPoints}`;
  }
  // If computer gets blackjack, output results and reset game
  if (computerPoints == 21) {
    gameMode = DEAL_CARDS;
    return `Computer has gotten Blackjack and won!`;
  } else {
    // Otherwise computer draws card until it reaches at least 17 or bursts
    while (computerPoints < 17) {
      computerCards.push(shuffledDeck.pop());
      computerPoints =
        computerPoints + computerCards[computerCards.length - 1].value;
      if (computerPoints >= 17 && computerPoints <= 21) {
        gameMode = FINAL_RESULT;
        return `Computer's points are ${computerPoints}`;
      }
      if (computerPoints > 21) {
        gameMode = DEAL_CARDS;
        return `The computer has burst, you win!`;
      }
    }
  }
};
// Compare player results to computer results and output winner
var determineFinalResult = function () {
  gameMode = DEAL_CARDS;
  if (playerPoints > computerPoints) {
    return `Player, you have won!`;
  } else if (playerPoints < computerPoints) {
    return `Player, you have lost!`;
  } else {
    return `Player its a draw!`;
  }
};

var main = function (input) {
  var myOutputValue = "";

  if (gameMode == DEAL_CARDS) {
    // Create a deck of cards
    createDeck = makeDeck();
    // Shuffle deck of cards
    shuffledDeck = shuffleDeck(cardDeck);

    // Deal two cards to player and computer
    myOutputValue = dealCards();
  }
  if (gameMode == PLAYER_ACTION) {
    if (input == INPUT_HIT) {
      myOutputValue = playerDrawsExtraCard();
    } else if (input == INPUT_STAND) {
      gameMode = COMPUTER_CALCULATES;
    }
  }
  if (gameMode == COMPUTER_CALCULATES) {
    myOutputValue = calculateComputerScore();
  }
  if (gameMode == FINAL_RESULT) {
    myOutputValue = determineFinalResult();
    gameMode = DEAL_CARDS;
  }
  return myOutputValue;
};
