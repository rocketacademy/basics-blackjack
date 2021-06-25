// Game modes stored in variables
const DEAL_CARDS = "deal cards";
const PLAYER_ACTION = "player hits or stands";
const COMPUTER_CALCULATES = "computer calculates";
const FINAL_RESULT = "final result";

// Declare user inputs as variables
const INPUT_HIT = "hit";
const INPUT_STAND = "stand";
const INPUT_CHANGE_ACE = "change ace";
const CHANGE_ACE_MODE = "change ace mode";
const POSITION = "position";
const ACE_ONE = "ace 1";
const ACE_ELEVEN = "ace 11";

// Global variables
var playerCards = [];
var computerCards = [];
var cardDeck = [];
var shuffledDeck;
var createDeck;
var playerPoints = 0;
var computerPoints = 0;
var aceIndex = 0;
var aceValue = 0;

// Current game mode
var gameMode = DEAL_CARDS;

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

var checkForAce = function (input) {
  if (gameMode == CHANGE_ACE_MODE) {
    aceIndex = Number(input) - 1;
    console.log(aceIndex + `ace index`);
    if (playerCards[aceIndex].name != "Ace") {
      gameMode = PLAYER_ACTION;
      return `You can only change the value of aces`;
    } else if (playerCards[aceIndex].name == "Ace") {
      gameMode = PLAYER_ACTION;
      return `You have chosen to change the value of the ace card in positon: ${aceIndex} <br>, please type either ace 1 or ace 11 to change the value`;
    }
  }
};

var changeAceValue = function (input) {
  if (input == ACE_ELEVEN) {
    aceValue = Number(11);
  } else if (input == ACE_ONE) {
    aceValue = Number(1);
  }
  console.log(`acevalue` + aceValue);
  playerCards[aceIndex].value = aceValue;
  gameMode = PLAYER_ACTION;
  return `You have changed the value of ${playerCards[aceIndex].name} of ${playerCards[aceIndex].emojiSuit} to ${aceValue}`;
};
// // Draw extra card for player and output results

var playerDrawsExtraCard = function () {
  playerCards.push(shuffledDeck.pop());

  var playerCardMessage = `You current cards are: `;
  playerCounter = 0;
  while (playerCounter < playerCards.length) {
    playerPoints = playerPoints + playerCards[playerCounter].value;
    playerCardMessage =
      playerCardMessage +
      `<br> ${playerCards[playerCounter].name} of ${playerCards[playerCounter].emojiSuit}`;
    // If player bursts, output results and reset game
    if (playerPoints > 21) {
      gameMode = DEAL_CARDS;
      return (
        `You've burst and lost! <br> Your score is ${playerPoints} <br> ` +
        playerCardMessage
      );
    }
    // If player gets blackjack, output results and reset game
    if (playerPoints == 21) {
      gameMode = DEAL_CARDS;
      return `You've gotten blackjack and won!`;
    }

    playerCounter += 1;
  }

  return `Your total points are: ${playerPoints} <br> ` + playerCardMessage;
};

var calculateComputerScore = function () {
  // Add computer score for first two cards
  computerPoints = computerCards[0].value + computerCards[1].value;
  if (playerPoints > 21) {
    return `Player burst, com auto wins!`;
  }
  // If two card score >= 17 and <= 21, change gameMode to compare with player score
  if (computerPoints >= 17 && computerPoints < 21) {
    gameMode = FINAL_RESULT;
    return `Computer's points are ${computerPoints}`;
  }
  // If computer gets blackjack, output results and reset game
  else if (computerPoints == 21) {
    gameMode = DEAL_CARDS;
    return `Computer has gotten Blackjack and won!`;
  } else {
    // Otherwise computer draws card until it reaches at least 17, gets blackjack or bursts
    while (computerPoints < 17) {
      computerCards.push(shuffledDeck.pop());
      computerPoints =
        computerPoints + computerCards[computerCards.length - 1].value;
      // If computer gets at least 17, change game mode and compare with player
      if (computerPoints >= 17 && computerPoints < 21) {
        gameMode = FINAL_RESULT;
        return `Computer's points are ${computerPoints}`;
      }
      // If computer gets blackjack after drawing cards, return winning statement and reset game
      if (computerPoints == 21) {
        gameMode = DEAL_CARDS;

        return `Computer has gotten Blackjack and won!`;
      }
      // If computer bursts, output results and reset game
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
    return `Player, you have won with a score of ${playerPoints} and the computer got ${computerPoints}!`;
  } else if (playerPoints < computerPoints) {
    return `Player, you have lost! Computer had a score of ${computerPoints}`;
  } else {
    return `Player its a draw!`;
  }
};

var main = function (input) {
  var myOutputValue = "";

  if (gameMode == DEAL_CARDS) {
    // Empty global variables for subsequent rounds
    playerCards = [];
    computerCards = [];
    playerPoints = 0;
    computerPoints = 0;
    // Create a deck of cards
    createDeck = makeDeck();
    // Shuffle deck of cards
    shuffledDeck = shuffleDeck(cardDeck);

    // Deal two cards to player and computer
    myOutputValue = dealCards();
  }
  // Allow player to hit or stand
  if (gameMode == PLAYER_ACTION) {
    if (input == INPUT_CHANGE_ACE) {
      gameMode = CHANGE_ACE_MODE;
      return `Please type in the position of the ace that you want to change`;
    }
    if (input == ACE_ELEVEN || input == ACE_ONE) {
      myOutputValue = changeAceValue(input);
    }
    if (input == INPUT_HIT) {
      myOutputValue = playerDrawsExtraCard();
    }
    if (input == INPUT_STAND) {
      gameMode = COMPUTER_CALCULATES;
    }
  }
  if (gameMode == CHANGE_ACE_MODE) {
    myOutputValue = checkForAce(input);
  }

  // Check if computer has enough cards and add if necessary
  if (gameMode == COMPUTER_CALCULATES) {
    myOutputValue = calculateComputerScore();
  }
  // Compaure player and computer cards
  if (gameMode == FINAL_RESULT) {
    myOutputValue = determineFinalResult();
    gameMode = DEAL_CARDS;
  }

  return myOutputValue;
};
