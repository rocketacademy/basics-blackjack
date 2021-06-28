// Project 3: Blackjack

// ---players---
var PLAYER;
var COMPUTER;
var username;
var currentPlayer = PLAYER;
var computerHand = [];
var playerHand = [];
var playerTotal;
var computerTotal;

// ---game variables---
var blackjack = false;
var totalWithoutAce = 0;
var ace = [];
var deck;

// ---modes---
var ASK_USERNAME_MODE = "ask name";
var DEAL_CARDS_MODE = "deal cards";
var HIT_STAND_MODE = "hit or stand";
var gameMode = ASK_USERNAME_MODE;

var main = function (input) {
  var myOutputValue;
  if (gameMode == ASK_USERNAME_MODE) {
    username = input;
    gameMode = DEAL_CARDS_MODE;
    myOutputValue = `Hey ${username}, ready for a game of <b>♣️BLACKJACK♠️</b>? <br> Click submit to begin!`;
  } else if (gameMode == DEAL_CARDS_MODE) {
    myOutputValue = stdDealCards();
    var blackjackWinner = checkForBlackjack();

    // Game only proceeds if no one gets a blackjack from dealt cards
    if (blackjack == false) {
      gameMode = HIT_STAND_MODE;
      myOutputValue += `<br><br> Enter "hit" to draw another card or click submit to stand.`;
    } else if (blackjack == true) {
      // Someone gets a blackjack so game ends and restarts
      myOutputValue += `<br><br> ${blackjackWinner} <br><br> Click submit to play again!`;
      resetGame();
    }
  } else if (gameMode == HIT_STAND_MODE) {
    myOutputValue = hitStandChoice(input);
  }

  myOutputValue += `<br><br><small><i> Enter "help" for game instructions.</i></small>`;

  if (input == "help") {
    //triggers instructions
    myOutputValue = instructions;
    resetGame();
    gameMode = DEAL_CARDS_MODE;
  }

  return myOutputValue;
};

// Draws a specified number of cards for any user and pushes it into their hand
var drawCard = function (userHand, number) {
  var counter = 0;
  while (counter < number) {
    userHand.push(deck.pop());
    counter += 1;
  }
};

// Distributes cards to player and computer
var stdDealCards = function () {
  var myOutputValue;
  deck = shuffleCards(makeDeck());
  // Draws 2 player cards and 2 computer cards
  drawCard(playerHand, 2);
  drawCard(computerHand, 2);

  // Prints out cards for computer and player
  var playerCards = displayCards(playerHand);
  var computerCards = displayOneCard(computerHand, 1);
  console.log(computerCards);

  // Check variableAce logic for both player and computer
  variableAce(playerHand, playerTotal);
  variableAce(computerHand, computerTotal);
  playerTotal = totalCards(playerHand);
  computerTotal = totalCards(computerHand);

  myOutputValue = `${username}, you drew: <br> ${playerCards} <br> Your total: <b>${playerTotal}</b>  <br><br> Computer drew: <br> ${computerCards} <i> 1 face-down card</i>`;

  checkForBlackjack();
  if (blackjack == true) {
    // Reveals face down card if computer gets blackjack
    var facedownCard = displayOneCard(computerHand, 2);
    myOutputValue += `: ${facedownCard}`;
  }

  return myOutputValue;
};

// Prints out all cards in hand of any player
var displayCards = function (userHand) {
  var counter = 0;
  var returnString = ``;
  while (counter < userHand.length - 1) {
    var currCard = userHand[counter];
    returnString += `${currCard.name} of ${currCard.suit} <br>`;
    counter += 1;
  }
  var lastCard = userHand[userHand.length - 1];
  returnString += `${lastCard.name} of ${lastCard.suit}`;
  return returnString;
};

// Prints out only first card of player
var displayOneCard = function (userHand, cardPositionInArray) {
  var counter = 0;
  var returnString = ``;
  while (counter < userHand.length) {
    var currCard = userHand[counter];
    if (currCard == userHand[cardPositionInArray - 1]) {
      returnString += `${currCard.name} of ${currCard.suit} <br>`;
    }
    counter += 1;
  }
  console.log(returnString);
  return returnString;
};

// Verifies if there is card of a specified value in hand
var getIsCardValueInHand = function (userHand, cardValue) {
  var counter = 0;
  var cardRankInHand = false;
  while (counter < userHand.length) {
    var currCard = userHand[counter];
    if (currCard.value == cardValue) {
      cardRankInHand = true;
    }
    counter += 1;
  }
  return cardRankInHand;
};

// Verifies if there is any Ace in hand
var getIsAceInHand = function (userHand, userTotal) {
  totalWithoutAce = 0;
  var counter = 0;
  var cardRankInHand = false;

  while (counter < userHand.length) {
    var currCard = userHand[counter];
    if (currCard.rank == 1) {
      cardRankInHand = true;
      ace.push(currCard);
      // ace card pushed into ace array
    }
    counter += 1;
  }
  console.log(cardRankInHand);
  if (cardRankInHand == true) {
    totalWithoutAce = userTotal - ace[0].value;
    console.log(totalWithoutAce);
  }
  return cardRankInHand;
};

// logic here a bit faulty pls check!!!!!!
// Changes value of Ace in hand from 1 to 11
var variableAce = function (userHand, userTotal) {
  userTotal = totalCards(userHand);
  var counter = 0;
  var aceInHand = getIsAceInHand(userHand, userTotal);
  // checks if there is 10/J/Q/K in hand
  var tenInHand = getIsCardValueInHand(userHand, 10);

  // changes value of ace to 11 if there is ace in hand and if:
  // there is a card of value 10 in hand or;
  // total value of other cards in hand is less than or equal to 10
  if (
    (aceInHand == true && tenInHand == true && totalWithoutAce <= 10) ||
    (aceInHand == true && totalWithoutAce <= 10)
  ) {
    while (counter < ace.length) {
      var currCard = ace[counter];
      currCard.value = 11;
      counter += 1;
    }
  }
  if (totalWithoutAce > 10) {
    counter = 0;
    while (counter < ace.length) {
      var currCard = ace[counter];
      currCard.value = 1;
      counter += 1;
    }
  }
  // more than one ace
  if (ace.length > 1) {
    counter = 1;
    while (counter < ace.length) {
      var currCard = ace[counter];
      currCard.value = 1;
      counter += 1;
    }
  }
  ace = resetArray(ace);
};

// Totals value of cards for any user
var totalCards = function (userHand) {
  var counter = 0;
  var total = 0;
  while (counter < userHand.length) {
    var currCardValue = userHand[counter].value;
    total += currCardValue;
    counter += 1;
  }
  return total;
};

// sth wrong here i think
// Checks if total in hand is 21 (blackjack!)
var checkForBlackjack = function () {
  var myOutputValue;
  var playerTotal = totalCards(playerHand);
  var computerTotal = totalCards(computerHand);

  if (playerTotal == 21 && computerTotal == 21) {
    blackjack = true;
    myOutputValue = `You both got <center><b>♣️BLACKJACK♠️</b></center> It's a push, no one wins! 🙃`;
  } else if (playerTotal == 21) {
    blackjack = true;
    myOutputValue = `You got <center><b>♣️BLACKJACK♠️</b></center> You win! 🙂`;
  } else if (computerTotal == 21) {
    blackjack = true;
    myOutputValue = `The computer got <center><b>♣️BLACKJACK♠️</b></center> You lose! 😔`;
  }
  return myOutputValue;
};

// Determines winner based on winning conditions
var generateOutcome = function () {
  playerTotal = totalCards(playerHand);
  computerTotal = totalCards(computerHand);

  var playerCards = displayCards(playerHand);
  var computerCards = displayCards(computerHand);
  var nearestBlackjack = nearestToBlackJack(playerTotal, computerTotal);
  var blackjackWinner = checkForBlackjack();

  //Output messages
  var total = `${username}: ${playerTotal} <br> Computer: ${computerTotal} <br>`;
  var printCards = `${username}, you drew: <br> ${playerCards} <br><br> Computer drew: <br> ${computerCards}`;
  var endingMessage = `<br><br> ${printCards} <br> <br> Click submit to play another game of <b>♣️BLACKJACK♠️</b> again!`;

  if (blackjack == false) {
    // Tie
    if (playerTotal == computerTotal) {
      myOutputValue = `${total} You both have the same total. It's a push, no one wins! 😭`;
    } // Player busts
    else if (playerTotal > 21) {
      myOutputValue = `${total} You bust and lost! 🥲`;
    } // Computer busts
    else if (computerTotal > 21) {
      myOutputValue = `${total} The computer bust! You WON!!!!  😆`;
    } // Both bust
    else if (computerTotal > 21 && playerTotal > 21) {
      myOutputValue = `${total} Nobody wins! You both bust! ☹️`;
    } // Player closer to 21 wins
    else if (nearestBlackjack == playerTotal) {
      myOutputValue = ` ${total} You WON!!!!! 🥳`;
    } // Computer closer to 21 wins
    else if (nearestBlackjack == computerTotal) {
      myOutputValue = `${total} You lost! 😩`;
    }
  } else myOutputValue = `${total} <br> ${blackjackWinner}`;

  myOutputValue += endingMessage;
  resetGame();

  return myOutputValue;
};

// Finds nearest number to 21 out of two values a and b
var nearestToBlackJack = function (a, b) {
  a1 = Math.abs(a - 21);
  b1 = Math.abs(b - 21);
  if (a1 < b1) {
    return a;
  }
  if (b1 < a1) {
    return b;
  }
};

var hitStandChoice = function (input) {
  var playerCards = displayCards(playerHand);
  var playerTotal = totalCards(playerHand);
  var hitMessage = `You should continue to hit as your total at <b>${playerTotal}</b> is less than 17. <br> Enter "hit" to draw another card.`;

  if (input == `hit`) {
    drawCard(playerHand, 1);
    variableAce(playerHand, playerTotal);
    playerCards = displayCards(playerHand);
    playerTotal = totalCards(playerHand);
    myOutputValue = `You drew a card. Your hand is now <br> ${playerCards} <br> Your total now: <b>${playerTotal}</b> <br><br> Enter "hit" to draw another card or click submit to stand.`;

    // Player must hit if total still less than 17 after drawing once
    if (playerTotal < 17) {
      myOutputValue += `<br><br> ${hitMessage}`;
    }
    // Player bust leads to end of game
    if (playerTotal > 21) {
      computerHitOrStand();
      myOutputValue = generateOutcome();
    }
  } else if (playerTotal < 17) {
    //Ensures player remembers to hit
    myOutputValue = hitMessage;
  } else {
    computerHitOrStand();
    myOutputValue = generateOutcome();
  }
  return myOutputValue;
};

// Computer hit or stand logic
var computerHitOrStand = function () {
  var computerTotal = totalCards(computerHand);
  while (computerTotal < 17) {
    //draws cards for computer until at least 1
    drawCard(computerHand, 1);
    variableAce(computerHand, computerTotal);
    computerTotal = totalCards(computerHand);
  }
};

// Clears out all objects in an array
var resetArray = function (array) {
  array = [];
  return array;
};

// Resets game for user to play again
var resetGame = function () {
  playerHand = resetArray(playerHand);
  computerHand = resetArray(computerHand);
  ace = resetArray(ace);
  blackjack = false;
  totalWithoutAce = 0;
  console.log(totalWithoutAce);
  gameMode = DEAL_CARDS_MODE;
};

// Generate deck of 52 playing cards
// Added "value" key for easier tabulation; (J,Q,K = 10)
var makeDeck = function () {
  var deck = [];

  var suitIndex = 0;
  var suits = ["hearts ❤️", "diamonds ♦️", "clubs ♣️", "spades ♠️"];

  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];

    var rankCounter = 1;

    while (rankCounter <= 13) {
      var cardName = rankCounter;
      var value = rankCounter;

      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }

      if (value == 11 || (value == 12) | (value == 13)) {
        value = 10;
      }

      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: value,
      };
      deck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return deck;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive); for use in ShuffleCards
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle deck of cards
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

// game instructions for user
var instructions = `
<center><strong>♣️BLACKJACK♠️ INSTRUCTIONS</strong></center><br>
1. Objective: beat the dealer's hand without going over 21. <br><br>
2. You will be dealt two cards at the start of the game. The total value of the cards will be calculated for you. <br>
<i> Face cards are worth 10. Aces are worth 1 or 11, whichever makes a better hand. </i> <br><br>
3. Each player starts with two cards, one of the dealer's cards is hidden until the end. <br><br>
4. Enter '<i>hit</i>' to draw another card or click submit to "stand" (hold your total and end your turn). <br><br>
5. If you go over 21 you bust, and the dealer wins regardless of the dealer's hand. <br><br>
6. If you are dealt 21 from the start (Ace & 10), you got a blackjack.<br><br>
Click <b>Submit</b> to start a new game! 
`;

// simplified blackjack
// two players
// computer is dealer
// dealer hits if hand is below 17
// player closer to 21 wins hand,
// aces can be 1 or 11

// fourth

// [
//   {
//     name: "10",
//     suit: "diamonds",
//     rank: 10,
//     value: 10,
//   },
//   {
//     name: "jack",
//     suit: "diamonds",
//     rank: 11,
//     value: 11,
//   },
// ];
