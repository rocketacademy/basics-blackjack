//
// GLOBAL VARIABLES
//

// declare card arrays
var deck = [];
var playerHand = [];
var playerSplitHand = [];
var computerHand = [];

// declare player scores
var playerScore = 0;
var playerSplitScore = 0;
var computerScore = 0;

// declare game modes
var dealCards = 'deal cards';
var hitOrStay = 'hit or stay';
var endTurn = 'end turn';
var splitOrNot = 'player choose to split or not';
var playerSplit = false;

// declare message types for player hand
var naturalWin = 'natural win';
var playerBust = 'player bust';
var playerWin = 'player win';
var computerBust = 'computer bust';
var computerWin = 'computer win';
var tie = 'tie';

// declare alt message types for player split hand
var splitWin = 'split hand win';
var splitNaturalWin = 'split hand natural win';
var splitLose = 'split hand lose';
var splitTie = 'split hand tied';
var splitWinAgainstBust = 'split win against bust';

// initialise game mode and message type
var gameMode = dealCards;
var messageType = '';
var altMessageType = '';

//
// HELPER FUNCTIONS
//

// function: make deck in order
var makeDeck = function () {
  deck = [];
  var suits = ['diamonds', 'hearts', 'clubs', 'spades'];
  var suitIndex = 0;

  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      if (cardName == 1) {
        cardName = 'ace';
      } else if (cardName == 11) {
        cardName = 'jack';
      } else if (cardName == 12) {
        cardName = 'queen';
      } else if (cardName == 13) {
        cardName = 'king';
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      deck.push(card);
      rankCounter = rankCounter + 1;
    }
    suitIndex = suitIndex + 1;
  }
  // for blackjack rules, change rank for picture cards to 10 and ace to 11
  var index = 0;
  while (index < deck.length) {
    if (deck[index].name == 'jack' || (deck[index].name == 'queen') || (deck[index].name == 'king')) {
      deck[index].rank = 10;
    } else if (deck[index].name == 'ace') {
      deck[index].rank = 11;
    }
    index = index + 1;
  }
  return deck;
};

// function: get random integer to shuffle cards
var getRandomInteger = function (cardsLength) {
  var randomInteger = Math.floor(Math.random() * cardsLength);
  return randomInteger;
};

// function: shuffle cards
var shuffleCards = function (cards) {
  var index = 0;
  while (index < cards.length) {
    var randomIndex = getRandomInteger(cards.length);
    var currentCard = cards[index];
    var randomCard = cards[randomIndex];

    cards[index] = randomCard;
    cards[randomIndex] = currentCard;
    index = index + 1;
  }
  return cards;
};

// function: deal card from deck to selected hand
var dealCard = function (array) {
  array.push(deck.pop());
};

// function: get score for selected hand
var getScore = function (array) {
  // get score for each player by adding rank of each card in hand
  var index = 0;
  var score = 0;
  while (index < array.length) {
    score = score + array[index].rank;
    index = index + 1;
  }
  // if score is > 21, minus 10 from score if ace is found (makes ace 1 point)
  index = 0;
  while ((index < array.length) && (score > 21)) {
    if (array[index].name == 'ace') {
      score = score - 10;
    }
    index = index + 1;
  }
  console.log(array);
  console.log(score);
  return score;
};

// function: get hand list to show in myoutputalue
var getHand = function (array) {
  var index = 0;
  var message = '';
  while (index < array.length) {
    message = message + `${array[index].name} of ${array[index].suit}<br>`;
    index = index + 1;
  }
  return message;
};

// function: reset game if computer turn has ended
var shouldResetGame = function () {
  if (gameMode == endTurn) {
    deck = shuffleCards(makeDeck());
    playerHand = [];
    playerSplitHand = [];
    computerHand = [];
    playerScore = 0;
    playerSplitScore = 0;
    computerScore = 0;
    playerSplit = false;
    gameMode = dealCards;
    console.log('**game reset**');
  }
};

// function: check who won
var whoWon = function () {
  // additional message types for player split hand
  if (playerSplit == true) {
    // if splithand tie
    if (computerScore == playerSplitScore) {
      altMessageType = splitTie;
      // if splithand win natural
    } else if (playerSplitScore == 21) {
      altMessageType = splitNaturalWin;
      // if splithand win because computer went bust
    } else if (computerScore > 21) {
      altMessageType = splitWinAgainstBust;
      // if splithand win with higher score
    } else if (playerSplitScore > computerScore) {
      altMessageType = splitWin;
      // if splithand lose
    } else if (playerSplitScore < computerScore) {
      altMessageType = splitLose;
    }
  }
  // message types for player's main hand
  // end turn if there is a win or loss, else stay in hitOrStay mode
  // tie if scores are the same when computer stay
  if ((gameMode == endTurn) && (computerScore == playerScore)) {
    messageType = tie;
    gameMode = endTurn;
  // player win if natural blackjack
  } else if ((playerScore == 21) && (playerHand.length == 2)) {
    messageType = naturalWin;
    gameMode = endTurn;
    // player win if score is 21 or more than computer when turn ends
  } else if ((playerScore == 21) || ((gameMode == endTurn) && (playerScore > computerScore))) {
    messageType = playerWin;
    gameMode = endTurn;
    // player lose if bust
  } else if (playerScore > 21) {
    messageType = playerBust;
    gameMode = endTurn;
    // player win if computer bust
  } else if (computerScore > 21) {
    messageType = computerBust;
    gameMode = endTurn;
    // computer win if playerscore less then computer when turn ends
  } else if ((gameMode == endTurn) && (computerScore > playerScore)) {
    messageType = computerWin;
    gameMode = endTurn;
    // if no one won/lost yet, show hit or stay message
  } else {
    messageType = hitOrStay;
    // change to (from dealCards mode) or maintain hitOrStay mode
    gameMode = hitOrStay;
  }
  console.log(gameMode);
  return messageType;
};

// function: show messages based on whoWon function
var getMessage = function () {
  var message = '';
  // beginning text to signal if split happened
  if (playerSplit == true) {
    message = message + `Your hand was split! You had two ${playerHand[0].name}s.<br><br>`;
  }
  // win-lose-tie messages for player original hand
  if (messageType == naturalWin) {
    message = message + 'Your hand had a natural win!';
  } else if (messageType == playerBust) {
    message = message + 'Your hand went bust!';
  } else if (messageType == playerWin) {
    message = message + 'Your hand wins!';
  } else if (messageType == computerBust) {
    message = message + 'Lucky you! The computer went bust.';
  } else if (messageType == tie) {
    message = message + 'Your hand tied with the computer!';
  } else {
    message = message + 'The computer won against your hand!';
  }
  message = message + `<br><br>You had ${playerScore} points and the computer had ${computerScore} points.<br><br>`;
  // end message with footer for original hand if there is no split
  if (playerSplit == false) {
    message = message + `Your hand was: <br>${getHand(playerHand)}<br>The computer had:<br>${getHand(computerHand)} <br>Click submit to play again.`;
  }
  // win-lose-tie messages if player has split hand
  if (playerSplit == true) {
    if (altMessageType == splitNaturalWin) {
      message = message + 'Natual win for your split hand!';
    } else if (altMessageType == splitWin) {
      message = message + 'Your split hand won!';
    } else if (altMessageType == splitTie) {
      message = message + 'Your split hand tied with the computer!';
    } else if (altMessageType == splitWinAgainstBust) {
      message = message + 'Lucky for your split hand, the computer went bust!';
    } else {
      message = message + 'The computer won against your split hand!';
    }
    // end message with split hand footer if there was split
    message = message + `<br><br>You had ${playerSplitScore} points for your split hand and the computer had ${computerScore} points.<br><br> Your hand was: <br>${getHand(playerHand)}<br>Your split hand was: <br>${getHand(playerSplitHand)}<br>The computer had:<br>${getHand(computerHand)}<br>Click submit to play again.`;
  }
  // if mode is still hitOrStay
  if (messageType == hitOrStay) {
    message = `Your cards are: <br>${getHand(playerHand)} <br>The computer shows: <br>${computerHand[0].name} of ${computerHand[0].suit} <br><br>Your score is ${playerScore}. <br><br>Click submit to hit or enter stay to stay.`;
  }

  return message;
};

//
// MAIN FUNCTION
//

var main = function (input) {
  var myOutputValue = 'hello world';

  // game mode: deal cards
  if (gameMode == dealCards) {
    // make and shuffle deck to begin game
    deck = shuffleCards(makeDeck());

    // deal 2 cards for each player
    dealCard(playerHand);
    dealCard(computerHand);
    dealCard(playerHand);
    dealCard(computerHand);

    // if both cards are the same rank, give user choice to split
    if (playerHand[0].rank == playerHand[1].rank) {
      playerScore = getScore(playerHand);
      computerScore = getScore(computerHand);
      myOutputValue = `Your cards are: <br>${getHand(playerHand)} <br>The computer shows: <br>${computerHand[0].name} of ${computerHand[0].suit} <br><br>Your score is ${playerScore}.<br><br>Do you want to split? Type Yes to split and No to continue with one hand.`;
      gameMode = splitOrNot;
      console.log(`player split ${playerSplit}`);

      // if cards are not the same rank
    } else {
      // get scores for each player
      playerScore = getScore(playerHand);
      computerScore = getScore(computerHand);

      // check if player won or continue game
      myOutputValue = getMessage(whoWon());
      shouldResetGame();
    }

    // game mode: hit or stay
  } else if (gameMode == hitOrStay) {
    // if user input stay, go to computer turn
    if (input == 'stay') {
      playerScore = getScore(playerHand);
      computerScore = getScore(computerHand);
      // while computer score is < 17, computer hit until score is >= 17
      while (computerScore < 17) {
        dealCard(computerHand);
        computerScore = getScore(computerHand);
      }
      gameMode = endTurn;
      // check if player won/lost
      myOutputValue = getMessage(whoWon());
      shouldResetGame();

      // if no input, automatically hit player with new card
    } else {
      dealCard(playerHand);
      playerScore = getScore(playerHand);

      // check if player won/lost or continue hit or stay
      myOutputValue = getMessage(whoWon());
      shouldResetGame();
    }

    // game mode: user split or not
  } else if (gameMode == splitOrNot) {
    // if user wants to split
    if (input == 'yes') {
      playerSplit = true;
      // pop card into split hand
      playerSplitHand.push(playerHand.pop());
      // deal 1 card to each hand
      dealCard(playerHand);
      dealCard(playerSplitHand);
      // if computer score < 17, deal card to computer
      while (computerScore < 17) {
        dealCard(computerHand);
        computerScore = getScore(computerHand);
      }

      // get scores for each hand
      playerScore = getScore(playerHand);
      playerSplitScore = getScore(playerSplitHand);
      computerScore = getScore(computerHand);
      gameMode = endTurn;

      // check if player's hand and split hand won/lost
      myOutputValue = getMessage(whoWon());
      shouldResetGame();

      // if user doesn't split, continue to play with current hand
    } else if (input == 'no') {
      // get score for each player
      playerScore = getScore(playerHand);
      computerScore = getScore(computerHand);
      myOutputValue = 'You have chosen not to split. Click submit to hit for your hand, or enter stay to end your turn.';
      gameMode = hitOrStay;
      // if there is no input
    } else {
      myOutputValue = `Please enter a valid choice. <br><br>Your cards are: <br>${getHand(playerHand)} <br>The computer shows: <br>${computerHand[0].name} of ${computerHand[0].suit} <br><br>Your score is ${playerScore}.<br><br>Do you want to split? Type Yes to split and No to continue with one hand.`;
    }
  }
  return myOutputValue;
};
