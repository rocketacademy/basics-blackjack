// Game modes stored in a constant
const DEAL_CARDS = "deal cards";
const PLAYER_ACTION = "player hits or stands";
const CHANGE_ACE_MODE = "change ace mode";
const COMPUTER_CALCULATES = "computer calculates";
const FINAL_RESULT = "final result";

// Declare user inputs as a constant
const INPUT_HIT = "hit";
const INPUT_STAND = "stand";
const INPUT_CHANGE_ACE = "change ace";
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
var aceCounter = 0;

// Current game mode
var gameMode = DEAL_CARDS;

// Create a deck of cards
var makeDeck = function () {
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var emojiSuits = ["♥️", "♦️", "♣️", "♠️"];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var currentEmojiSuit = emojiSuits[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // Create new object attribute for cards to represent their value
      var cardValue = rankCounter;
      if (rankCounter == 1) {
        // Set ace to be 11 points, so that blackjack condition can be fulfilled. Player can change value later
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

// Deal a card to player and computer, repeat twice
var dealCards = function () {
  dealCounter = 0;
  while (dealCounter < 2) {
    playerCards.push(shuffledDeck.pop());
    computerCards.push(shuffledDeck.pop());
    dealCounter += 1;
  }
  // Add player and computer scores for first two cards
  playerPoints = playerCards[0].value + playerCards[1].value;
  computerPoints = computerCards[0].value + computerCards[1].value;
  if (
    // If player gets blackjack, declare winner and reset game
    playerPoints == 21 &&
    computerPoints != 21
  ) {
    gameMode = DEAL_CARDS;
    return `YOU HAVE GOTTEN BLACKJACK AND WIN! 🥳 <br><br> Your cards: <br>${playerCards[0].name} of ${playerCards[0].emojiSuit} <br>${playerCards[1].name} of ${playerCards[1].emojiSuit} <br> Your points: ${playerPoints} <br><br> Computer's cards: <br> ${computerCards[0].name} of ${computerCards[0].emojiSuit} <br>${computerCards[1].name} of ${computerCards[1].emojiSuit}<br> Computer's points: ${computerPoints}`;
  } else if (
    // If both get blackjack, declare draw and reset game
    playerPoints == 21 &&
    computerPoints == 21
  ) {
    gameMode = DEAL_CARDS;
    return `You both drew blackjacks! Its a draw! Your cards: <br>${playerCards[0].name} of ${playerCards[0].emojiSuit} <br>${playerCards[1].name} of ${playerCards[1].emojiSuit}  <br> Your points: ${playerPoints}<br><br> Computer's cards: <br> ${computerCards[0].name} of ${computerCards[0].emojiSuit} <br>${computerCards[1].name} of ${computerCards[1].emojiSuit}<br> Computer's points: ${computerPoints}`;
  } else if (playerPoints > 21) {
    gameMode = PLAYER_ACTION;
    return `You will burst and lose unless you change your ace card's value! <br><br> Type 'change ace' to change its value.<br><br> Your cards: <br>${playerCards[0].name} of ${playerCards[0].emojiSuit} <br>${playerCards[1].name} of ${playerCards[1].emojiSuit}  <br> Your points: ${playerPoints}`;
  } else {
    gameMode = PLAYER_ACTION;
    // Otherwise inform player of current cards and ask if they want to hit, stand or change ace value
    return `Your cards: <br>${playerCards[0].name} of ${playerCards[0].emojiSuit} <br>${playerCards[1].name} of ${playerCards[1].emojiSuit}  <br> Your points: ${playerPoints} <br><br> Please enter 'hit' if you would like more cards <br><br> Please enter 'stand' if you do not want anymore cards <br><br> Please enter 'change ace' if you would like to change the value of an ace card`;
  }
};

// If player wants to change ace value, ensure they are selecting ace card in array, otherwise inform them of this condition
var checkForAce = function (input) {
  if (gameMode == CHANGE_ACE_MODE) {
    aceIndex = Number(input) - 1;
    if (playerCards[aceIndex].name != "Ace") {
      gameMode = PLAYER_ACTION;
      // Run while loop to output all player card names and suits in output statement
      var aceInvalidOutput = `You can only change the value of aces. <br><br> Your cards are: `;
      aceCounter = 0;
      while (aceCounter < playerCards.length) {
        aceInvalidOutput =
          aceInvalidOutput +
          `<br> ${playerCards[aceCounter].name} of ${playerCards[aceCounter].emojiSuit}`;
        aceCounter += 1;
      }
      return (
        aceInvalidOutput +
        `<br> Your points: ${playerPoints}<br><br> Please enter 'hit' if you would like more cards <br><br> Please enter 'stand' if you do not want anymore cards <br><br> Please enter 'change ace' if you would like to change the value of an ace card`
      );
      // If player selects ace card in their array, switch mode and allow them to change ace value
    } else if (playerCards[aceIndex].name == "Ace") {
      gameMode = PLAYER_ACTION;
      return `You have chosen to change the value of the ace card in positon: ${input} <br> Please type either 'ace 1' or 'ace 11' to change the value`;
    }
  }
};

// If ace card is correctly selected, allow user to enter string to change ace value
var changeAceValue = function (input) {
  if (input == ACE_ELEVEN) {
    aceValue = Number(11);
    playerPoints = playerPoints + 10;
  } else if (input == ACE_ONE) {
    aceValue = Number(1);
    playerPoints = playerPoints - 10;
  }
  playerCards[aceIndex].value = aceValue;
  gameMode = PLAYER_ACTION;
  // Run while loop to output all player card names and suits in output statement
  var aceChangeOutput = `You have changed the value of ${playerCards[aceIndex].name} of ${playerCards[aceIndex].emojiSuit} to ${aceValue}. <br><br> Your cards are: `;
  aceCounter = 0;
  while (aceCounter < playerCards.length) {
    aceChangeOutput =
      aceChangeOutput +
      `<br> ${playerCards[aceCounter].name} of ${playerCards[aceCounter].emojiSuit}`;
    aceCounter += 1;
  }
  return (
    aceChangeOutput +
    `<br> Your points: ${playerPoints}<br><br> Please enter 'hit' if you would like more cards <br><br> Please enter 'stand' if you do not want anymore cards <br><br> Please enter 'change ace' if you would like to change the value of an ace card`
  );
};

// Allow player to draw extra card
var playerDrawsExtraCard = function () {
  playerCards.push(shuffledDeck.pop());
  var playerCardMessage = `Your cards are: `;
  var endMessage = "";
  // Update player points
  playerCounter = playerCards.length - 1;
  while (playerCounter < playerCards.length) {
    playerPoints = playerPoints + playerCards[playerCounter].value;
    endMessage = `<br> Your points: ${playerPoints}<br><br> Please enter 'hit' if you would like more cards <br><br> Please enter 'stand' if you do not want anymore cards <br><br> Please enter 'change ace' if you would like to change the value of an ace card`;
    playerCounter += 1;
  }
  // Run while loop to output all player card names and suits in output statement
  aceCounter = 0;
  while (aceCounter < playerCards.length) {
    playerCardMessage =
      playerCardMessage +
      `<br> ${playerCards[aceCounter].name} of ${playerCards[aceCounter].emojiSuit}`;
    aceCounter += 1;
  }
  // If player bursts, output results and reset game
  if (playerPoints > 21) {
    // However, if player draws ace, allow them to change value
    counter = playerCards.length - 1;
    while (counter < playerCards.length) {
      if (playerCards[counter].name == "Ace") {
        gameMode = PLAYER_ACTION;
        return `You will burst and lose unless you change your ace card's value! <br><br> Type 'change ace' to change its value.<br><br> ${playerCardMessage}`;
      }
      counter += 1;
    }
    // Also, if player bursts and has an ace with value 11, allow them to change value
    secondCounter = 0;
    while (secondCounter < playerCards.length) {
      if (
        playerCards[secondCounter].name == "Ace" &&
        playerCards[secondCounter].value == 11
      ) {
        gameMode = PLAYER_ACTION;
        return `You will burst and lose unless you change your ace card's value! <br><br> Type 'change ace' to change its value.<br><br> ${playerCardMessage}`;
      }
      secondCounter += 1;
    }
    gameMode = DEAL_CARDS;
    return `You've burst and lost! <br><br>  ${playerCardMessage} <br> Your points: ${playerPoints}<br><br> Click submit to start a new game!`;
  }
  // If player gets blackjack, output results and reset game
  if (playerPoints == 21) {
    gameMode = DEAL_CARDS;
    return `You've gotten blackjack and won! <br><br>${playerCardMessage}<br><br> Click submit to start a new game!`;
  }

  return playerCardMessage + endMessage;
};

// Calculate computer's score and automatically draw more if necessary
var calculateComputerScore = function () {
  // If two card score >= 17 and < 21, change game mode to compare with player's score
  if (computerPoints >= 17 && computerPoints < 21) {
    gameMode = FINAL_RESULT;
  }
  // If computer gets blackjack, output results and reset game
  else if (computerPoints == 21) {
    gameMode = DEAL_CARDS;
    return `Computer has gotten Blackjack and won! <br><br>Computer's cards: <br> ${computerCards[0].name} of ${computerCards[0].emojiSuit} <br>${computerCards[1].name} of ${computerCards[1].emojiSuit}<br> Computer's points: ${computerPoints}`;
  } else {
    // Otherwise computer draws card until it reaches at least 17, gets blackjack or bursts
    while (computerPoints < 17) {
      computerCards.push(shuffledDeck.pop());
      computerPoints =
        computerPoints + computerCards[computerCards.length - 1].value;
      // Run while loop to generate all computer card names and suits
      var computerCardMessage = `Computer's cards are: `;
      computerCounter = 0;
      while (computerCounter < computerCards.length) {
        computerCardMessage =
          computerCardMessage +
          `<br> ${computerCards[computerCounter].name} of ${computerCards[computerCounter].emojiSuit}`;
        computerCounter += 1;
      }
      // If computer gets at least 17, change game mode and compare with player
      if (computerPoints >= 17 && computerPoints < 21) {
        gameMode = FINAL_RESULT;
      }
      // If computer gets blackjack after drawing cards, return winning statement and reset game
      if (computerPoints == 21) {
        gameMode = DEAL_CARDS;
        return `Computer has gotten Blackjack and won! <br><br>
          ${computerCardMessage} 
          <br> Computer's points: ${computerPoints}<br><br> Click submit to start a new game!`;
      }
      // If computer bursts, output results and reset game
      if (computerPoints > 21) {
        gameMode = DEAL_CARDS;
        return `The computer has burst, you win!<br><br>
          ${computerCardMessage} 
          <br> Computer's points: ${computerPoints}<br><br> Click submit to start a new game!`;
      }
    }
  }
};
// If above conditions are all not met, compare player results to computer results and output winner
var determineFinalResult = function () {
  gameMode = DEAL_CARDS;
  // Run while loop to generate all computer card names and suits
  var computerCardMessage = `Computer's cards are: `;
  computerCounter = 0;
  while (computerCounter < computerCards.length) {
    computerCardMessage =
      computerCardMessage +
      `<br> ${computerCards[computerCounter].name} of ${computerCards[computerCounter].emojiSuit}`;
    computerCounter += 1;
  }
  // Run while loop to generate all player card names and suits
  var playerCardMessage = `Your cards are: `;
  aceCounter = 0;
  while (aceCounter < playerCards.length) {
    playerCardMessage =
      playerCardMessage +
      `<br> ${playerCards[aceCounter].name} of ${playerCards[aceCounter].emojiSuit}`;
    aceCounter += 1;
    // Combine player and computer output statements
    var finalOutput = `<br><br> ${playerCardMessage} <br><br> ${computerCardMessage} <br><br> Click submit to start a new game!`;
  }
  // Determine game outcome
  if (playerPoints > computerPoints) {
    return `Player, you have won! ${finalOutput}`;
  } else if (playerPoints < computerPoints) {
    return `Player, you have lost! ${finalOutput} `;
  } else {
    return `Player its a draw! ${finalOutput} `;
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
  // Run while loop to generate all player card names and suits to be used below
  aceCounter = 0;
  var playerCardMessage = `Your cards are: `;
  while (aceCounter < playerCards.length) {
    playerCardMessage =
      playerCardMessage +
      `<br> ${playerCards[aceCounter].name} of ${playerCards[aceCounter].emojiSuit}`;
    aceCounter += 1;
  }
  // Allow player to hit, stand or change ace value
  if (gameMode == PLAYER_ACTION) {
    if (input == INPUT_CHANGE_ACE) {
      gameMode = CHANGE_ACE_MODE;
      return `Please type in the position of the ace that you want to change <br><br> ${playerCardMessage}`;
    }
    // Change player's ace card based on input and update player's points
    if (input == ACE_ELEVEN || input == ACE_ONE) {
      myOutputValue = changeAceValue(input);
    }
    // Allow player to draw extra card and update player's points
    if (input == INPUT_HIT) {
      myOutputValue = playerDrawsExtraCard();
    }
    // Allow player to stand and switch to next mode
    if (input == INPUT_STAND) {
      // Ensure that player meets minimum game score required, else change game mode back
      if (playerPoints < 17) {
        gameMode = PLAYER_ACTION;

        return `Player, you need at least 17 points. Please type 'hit' to draw another card. <br><br> ${playerCardMessage}`;
      }
      gameMode = COMPUTER_CALCULATES;
    }
  }
  // Ensure player has selected an ace card
  if (gameMode == CHANGE_ACE_MODE) {
    myOutputValue = checkForAce(input);
  }

  // Check if computer has enough cards and add if necessary
  if (gameMode == COMPUTER_CALCULATES) {
    myOutputValue = calculateComputerScore();
  }
  // Compare player and computer cards and determine winner
  if (gameMode == FINAL_RESULT) {
    myOutputValue = determineFinalResult();
    gameMode = DEAL_CARDS;
  }

  return myOutputValue;
};
