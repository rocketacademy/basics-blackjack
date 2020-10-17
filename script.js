//
// GLOBAL VARIABLES
//

// declare deck
var deck = [];

// declare computer object
var computer = {
  hand: [],
  points: 0,
};

// declare players
var players = [];
var numberOfPlayers = 0;
var playerIndex = 0;

// declare hand statuses
var initialised = 'initialised';
var stay = 'stay';

// declare game modes
var enterNumberOfPlayers = 'enter the number of players';
var enterName = 'enter names';
var placeBets = 'place bets';
var dealCards = 'deal cards';
var hitOrStay = 'hit or stay';
var splitOrNot = 'player choose to split or not';

// initialise game mode
var gameMode = enterNumberOfPlayers;

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

// function: get points for selected hand
var getPoints = function (array) {
  // get score for each player by adding rank of each card in hand
  var index = 0;
  var points = 0;
  while (index < array.length) {
    points = points + array[index].rank;
    index = index + 1;
  }
  // if points is > 21, minus 10 from points if ace is found (makes ace 1 point)
  index = 0;
  while ((index < array.length) && (points > 21)) {
    if (array[index].name == 'ace') {
      points = points - 10;
    }
    index = index + 1;
  }
  return points;
};

// function: display card name
var getCardName = function (card) {
  var message = `${card.name} of `;
  if (card.suit == 'hearts') {
    message = message + '❤️️';
  } else if (card.suit == 'diamonds') {
    message = message + '♦️';
  } else if (card.suit == 'spades') {
    message = message + '♠';
  } else {
    message = message + '♣';
  }
  return message;
};

// function: display hand of player
var getPlayerHand = function (player) {
  var message = '';
  message = `${player.name}'s hand:<br>`;
  var handIndex = 0;
  while (handIndex < player.hand.length) {
    message = message + getCardName(player.hand[handIndex]) + '<br>';
    handIndex = handIndex + 1;
  }
  player.points = getPoints(player.hand);
  message = message + `<br>${player.name} has ${player.points} points.<br>`;
  return message;
};

// function: display split hand of player
var getPlayerSplitHand = function (player) {
  var message = '';
  message = `${player.name}'s split hand:<br>`;
  var handIndex = 0;
  while (handIndex < player.splitHand.length) {
    message = message + getCardName(player.splitHand[handIndex]) + '<br>';
    handIndex = handIndex + 1;
  }
  player.points = getPoints(player.splitHand);
  message = message + `<br>${player.name} has ${player.points} points.<br>`;
  return message;
};

// function: display computer hand
var getComputerHand = function () {
  var message = '';
  message = 'Computer\'s hand:<br>';
  var handIndex = 0;
  while (handIndex < computer.hand.length) {
    message = message + getCardName(computer.hand[handIndex]) + '<br>';
    handIndex = handIndex + 1;
  }
  computer.points = getPoints(computer.hand);
  message = message + `<br>Computer has ${computer.points} points.<br>`;
  return message;
};

// function: ask if user wants to split
var askForSplit = function () {
  players[playerIndex].askSplit = true;
  console.log(`${players[playerIndex].name} has a chance to split`);
  gameMode = splitOrNot;
  return `${players[playerIndex].name}, you have the chance to split hand. <br><br>${getPlayerHand(players[playerIndex])}<br>Would you like to split? Submit yes or no.`;
};

// function: reset game if computer turn has ended
var resetGame = function () {
  deck = shuffleCards(makeDeck());
  // clear hand of each player
  playerIndex = 0;
  while (playerIndex < numberOfPlayers) {
    players[playerIndex].hand.length = 0;
    players[playerIndex].splitHand.length = 0;
    players[playerIndex].handStatus = initialised;
    players[playerIndex].splitHandStatus = initialised;
    players[playerIndex].split = false;
    players[playerIndex].askSplit = false;
    players[playerIndex].points = 0;
    players[playerIndex].splitPoints = 0;
    playerIndex = playerIndex + 1;
  }
  computer = {
    hand: [],
    points: 0,
  };
  gameMode = placeBets;
  playerIndex = 0;
  console.log('**game reset**');
};

// function: check who won between playerhand and computer and return message
var whoWon = function (player) {
  var message = `${getPlayerHand(players[playerIndex])}<br>`;
  // get points
  computer.points = getPoints(computer.hand);
  player.points = getPoints(player.hand);

  // if user hand wins 21, win double the bet
  if (player.points == 21) {
    player.winnings = player.bet * 2;
    player.credits = player.credits + player.winnings;
    return message + `${player.name} won a blackjack and won ${player.winnings} credits. They now have ${player.credits} credits.`;
  }

  // if user bust, lose their bet
  if (player.points > 21) {
    player.winnings = player.bet;
    player.credits = player.credits - player.winnings;
    return message + `${player.name} bust and lost ${player.winnings} credits. They now have ${player.credits} credits.`;
  }

  // player win if player has more points or computer bust
  if (player.points > computer.points || computer.points > 21) {
    player.winnings = player.bet;
    player.credits = player.credits + player.winnings;
    return message + `${player.name} won ${player.winnings} credits. They now have ${player.credits} credits.`;
  }
  // player lose if computer has more or equal points
  if (computer.points >= player.points) {
    player.winnings = player.bet;
    player.credits = player.credits - player.winnings;
    return message + `${player.name} lost ${player.winnings} credits. They now have ${player.credits} credits.`;
  }
  return message;
};

// function: check who won between playersplithand and computer and return message
var whoWonSplit = function (player) {
  var message = `${getPlayerSplitHand(players[playerIndex])}<br>`;
  // get points
  computer.points = getPoints(computer.hand);
  player.splitPoints = getPoints(player.splitHand);

  // if user hand wins 21, win double the bet
  if (player.splitPoints == 21) {
    player.winnings = player.bet * 2;
    player.credits = player.credits + player.winnings;
    return message + `${player.name}'s splithand won a blackjack and won ${player.winnings} credits. They now have ${player.credits} credits.`;
  }

  // if user bust, lose their bet
  if (player.splitPoints > 21) {
    player.winnings = player.bet;
    player.credits = player.credits - player.winnings;
    return message + `${player.name}'s splithand bust and lost ${player.winnings} credits. They now have ${player.credits} credits.`;
  }

  // player win if player has more points or computer bust
  if (player.splitPoints > computer.points || computer.points > 21) {
    player.winnings = player.bet;
    player.credits = player.credits + player.winnings;
    return message + `${player.name}'s splithand won ${player.winnings} credits. They now have ${player.credits} credits.`;
  }
  // player lose if computer has more or equal points
  if (computer.points >= player.splitPoints) {
    player.winnings = player.bet;
    player.credits = player.credits - player.winnings;
    return message + `${player.name}'s splithand lost ${player.winnings} credits. They now have ${player.credits} credits.`;
  }
  return message;
};

// function: end the game and return message
var endGame = function () {
  var message = '';
  playerIndex = 0;
  // if computer points 16 or less, draw until at least 17
  while (computer.points < 17) {
    dealCard(computer.hand);
    computer.points = getPoints(computer.hand);
  }
  // show results of computer
  message = `${getComputerHand()}<br>`;
  // show results of players
  while (playerIndex < numberOfPlayers) {
    message = message + `${whoWon(players[playerIndex])}<br><br>`;
    // show result if player has splithand
    if (players[playerIndex].split == true) {
      message = message + `${whoWonSplit(players[playerIndex])}<br><br>`;
    }
    playerIndex = playerIndex + 1;
  }
  return message;
};

//
// MAIN FUNCTION
//

var main = function (input) {
  var myOutputValue = 'hello world';
  console.log(gameMode);

  // game mode: ask for number of players
  if (gameMode == enterNumberOfPlayers) {
    numberOfPlayers = input;
    gameMode = enterName;
    myOutputValue = `You have selected ${numberOfPlayers} players. <Br><br>Enter the name of Player 1 and click submit.`;
  }

  // game mode: ask for name
  else if (gameMode == enterName) {
    // initialise players
    if (playerIndex < numberOfPlayers) {
      players[playerIndex] = {
        name: input,
        handStatus: initialised,
        splitHandStatus: initialised,
        bet: 0,
        hand: [],
        splitHand: [],
        points: 0,
        split: false,
        askSplit: false,
        splitPoints: 0,
        credits: 500,
        winnings: 0,
      };
      // output message for all other players to enter name
      if (playerIndex !== numberOfPlayers - 1) {
        myOutputValue = `Welcome ${players[playerIndex].name}! <br><Br>Enter the next player's name and click submit.`;
        playerIndex = playerIndex + 1;
      }
      // output message for the last player and first player to place bet
      else {
        myOutputValue = `Welcome ${players[playerIndex].name}!<br><br>${players[0].name}, you have 500 credits. Enter your bet amount and click submit.`;
        playerIndex = 0;
        gameMode = placeBets;
      }
    }
  }

  // game mode: place bets
  else if (gameMode == placeBets) {
    // get each user's bet amount and store in bets array

    // input validation: if input is not a number or if the player has no existing bet
    if (Number.isNaN(Number(input)) || ((input == '') && (players[playerIndex].bet < 1))) {
      return 'Please enter a valid number. ';
      // if player runs out of credits, remove them from game
    } if (players[playerIndex].credits < 1) {
      players.splice(playerIndex, 1);
      return `You have run out of credits! You have ${players[playerIndex].credits} credits. You are out of the game!`;
    }
    // if player enters a new bet, change bet amount
    if (input !== '') {
      players[playerIndex].bet = Number(input);
    }
    // input validation: if player bet or entered a number more than the credits they have
    if ((players[playerIndex].bet > players[playerIndex].credits)
      || (Number(input) > players[playerIndex].credits)) {
      return `You have ${players[playerIndex].credits} credits. You cannot bet an amount more than the credits you have. <br><br>Please enter a new bet amount and submit.`;
    }
    // output message for valid bet for all other players
    if (playerIndex !== numberOfPlayers - 1) {
      myOutputValue = `${players[playerIndex].name}, you have bet ${players[playerIndex].bet} credits. <br><br>${players[(playerIndex + 1)].name}, please place your bet. You have ${players[(playerIndex + 1)].credits} credits.`;
      playerIndex = playerIndex + 1;
    }
    // output message for the last player to deal cards
    else {
      myOutputValue = `${players[playerIndex].name}, you have bet ${players[playerIndex].bet} credits. <br><br>Click submit to deal cards.`;
      playerIndex = 0;
      gameMode = dealCards;
    }
  }

  // game mode: deal cards
  else if (gameMode == dealCards) {
    // make and shuffle deck to begin game
    deck = shuffleCards(makeDeck());

    // deal 2 cards for each player
    playerIndex = 0;
    while (playerIndex < numberOfPlayers) {
      players[playerIndex].hand = [];
      dealCard(players[playerIndex].hand);
      dealCard(players[playerIndex].hand);
      playerIndex = playerIndex + 1;
    }

    // deal 2 cards for computer
    dealCard(computer.hand);
    dealCard(computer.hand);

    // message for all players, then start with player 1
    myOutputValue = `Computer shows:<br>${getCardName(computer.hand[0])}<br><br>`;
    playerIndex = 0;
    while (playerIndex < numberOfPlayers) {
      myOutputValue = myOutputValue + `${getPlayerHand(players[playerIndex])}<br>`;
      playerIndex = playerIndex + 1;
    }
    playerIndex = 0;
    // check split condition for current player and ask to split
    if (players[playerIndex].askSplit == false
      && (players[playerIndex].hand[0].rank == players[playerIndex].hand[1].rank)) {
      return myOutputValue + askForSplit();
    }
    myOutputValue = myOutputValue + `${players[playerIndex].name}, press submit to hit or enter stay to stay.`;
    gameMode = hitOrStay;
  }

  // game mode: hit or stay
  else if (gameMode == hitOrStay) {
    // if user input stay, go to split hand or next player turn or computer turn if no more players
    if (input == 'stay') {
      // MAIN HAND STAY
      if (players[playerIndex].handStatus !== stay) {
        players[playerIndex].handStatus = stay;
        myOutputValue = `${players[playerIndex].name}, you have chosen to stay.<br><br>`;
        // if player has a split hand, play for split hand
        if (players[playerIndex].split == true) {
          return myOutputValue + `${getPlayerSplitHand(players[playerIndex])}<br>Click submit to hit for split hand or submit stay to stay.`;
        }
        // go to next player
        if (playerIndex < numberOfPlayers - 1) {
          playerIndex = playerIndex + 1;
          // check split condition for next player
          if (players[playerIndex].askSplit == false
            && (players[playerIndex].hand[0].rank == players[playerIndex].hand[1].rank)) {
            return myOutputValue + askForSplit();
          }
          // if next player has no split hand
          myOutputValue = myOutputValue + `${getPlayerHand(players[playerIndex])}<br>The computer shows:<br>${getCardName(computer.hand[0])}<br><br>${players[playerIndex].name}, you have ${players[playerIndex].points} points.<br><br>Click submit to hit or submit stay to stay.`;
        }
        // if no more players, end the game
        else if (playerIndex == numberOfPlayers - 1) {
          myOutputValue = endGame();
          playerIndex = 0;
          myOutputValue = myOutputValue + `The game has been reset with the same players. ${players[playerIndex].name}, click submit to proceed with your current bet of ${players[playerIndex].bet} credits or enter your new bet and click submit.`;
          resetGame();
        }
      }
      // SPLIT HAND STAY
      if ((players[playerIndex].split == true) && (players[playerIndex].splitHandStatus !== stay)
      && (players[playerIndex].handStatus == stay)) {
        players[playerIndex].splitHandStatus = stay;
        myOutputValue = `${players[playerIndex].name}, you have chosen to stay for your split hand.<br><br>`;
        // go to next player if any
        if (playerIndex < numberOfPlayers - 1) {
          playerIndex = playerIndex + 1;
          // check split condition for next player
          if (players[playerIndex].askSplit == false
            && (players[playerIndex].hand[0].rank == players[playerIndex].hand[1].rank)) {
            return myOutputValue + askForSplit();
          }
          return myOutputValue + `${getPlayerHand(players[playerIndex])}<br>The computer shows:<br>${getCardName(computer.hand[0])}<br><br>${players[playerIndex].name}, you have ${players[playerIndex].points} points.<br><br>Click submit to hit or submit stay to stay.`;
        }
        // if no more players, end the game
        if (playerIndex == numberOfPlayers - 1) {
          myOutputValue = endGame();
          playerIndex = 0;
          myOutputValue = myOutputValue + `The game has been reset with the same players. ${players[playerIndex].name}, click submit to proceed with your current bet of ${players[playerIndex].bet} credits or enter your new bet and click submit.`;
          resetGame();
        }
      }
      // if '' input, automatically hit player with new card
    } else {
      // MAIN HAND HIT
      if (players[playerIndex].handStatus !== stay) {
        dealCard(players[playerIndex].hand);
        players[playerIndex].points = getPoints(players[playerIndex].hand);
        // check if player hand is >= 21
        if (players[playerIndex].points >= 21) {
          players[playerIndex].handStatus = stay;
          myOutputValue = `${getPlayerHand(players[playerIndex])}<br>You now have ${players[playerIndex].points} points. You can't draw any more cards.<br><br>`;
          // check if player has split hand
          if (players[playerIndex].split == true && players[playerIndex].splitHandStatus !== stay) {
            return myOutputValue + `${getPlayerSplitHand(players[playerIndex])}<br>The computer shows:<br>${getCardName(computer.hand[0])}<br><br>${players[playerIndex].name}, you have ${players[playerIndex].points} points.<br><br>Click submit to hit or submit stay to stay.`;
          }
          // check if there is a next player
          if (playerIndex < numberOfPlayers - 1) {
            playerIndex = playerIndex + 1;
            // check split condition for next player
            if (players[playerIndex].askSplit == false
            && (players[playerIndex].hand[0].rank == players[playerIndex].hand[1].rank)) {
              return myOutputValue + askForSplit();
            }
            // go to player main hand if no split
            return myOutputValue + `${getPlayerHand(players[playerIndex])}<br>The computer shows:<br>${getCardName(computer.hand[0])}<br><br>${players[playerIndex].name}, you have ${players[playerIndex].points} points.<br><br>Click submit to hit or submit stay to stay.`;
          }
          // if there are no more players, end the game
          if (playerIndex == numberOfPlayers - 1) {
            myOutputValue = endGame();
            playerIndex = 0;
            myOutputValue = myOutputValue + `The game has been reset with the same players. ${players[playerIndex].name}, click submit to proceed with your current bet of ${players[playerIndex].bet} credits or enter your new bet and click submit.`;
            resetGame();
          }
        }
        // if player hand has not hit 21
        else {
          myOutputValue = `${getPlayerHand(players[playerIndex])}<br>The computer shows: <br>${getCardName(computer.hand[0])}<br><br>${players[playerIndex].name}, you have ${players[playerIndex].points} points.<br><br>Click submit to hit or submit stay to stay.`;
        }
      }

      // SPLIT HAND HIT
      if ((players[playerIndex].split == true) && (players[playerIndex].splitHandStatus !== stay)
      && (players[playerIndex].handStatus == stay)) {
        dealCard(players[playerIndex].splitHand);
        players[playerIndex].splitPoints = getPoints(players[playerIndex].splitHand);
        // check if player hand is >= 21
        if (players[playerIndex].splitPoints >= 21) {
          players[playerIndex].splitHandStatus = stay;
          myOutputValue = `${getPlayerSplitHand(players[playerIndex])}<br>You now have ${players[playerIndex].splitPoints} points. You can't draw any more cards.<br><br>`;
          // check if there is a next player
          if (playerIndex < numberOfPlayers - 1) {
            playerIndex = playerIndex + 1;
            // check split condition for next player
            if (players[playerIndex].askSplit == false
              && (players[playerIndex].hand[0].rank == players[playerIndex].hand[1].rank)) {
              return myOutputValue + askForSplit();
            }
            return myOutputValue + `${getPlayerHand(players[playerIndex])}<br>The computer shows:<br>${getCardName(computer.hand[0])}<br><br>${players[playerIndex].name}, you have ${players[playerIndex].points} points.<br><br>Click submit to hit or submit stay to stay.`;
          }
          // if there are no more players, end the game
          if (playerIndex == numberOfPlayers - 1) {
            myOutputValue = endGame();
            playerIndex = 0;
            myOutputValue = myOutputValue + `The game has been reset with the same players. ${players[playerIndex].name}, click submit to proceed with your current bet of ${players[playerIndex].bet} credits or enter your new bet and click submit.`;
            resetGame();
          }
        }
        // if player hand has not hit 21
        else {
          myOutputValue = `${getPlayerSplitHand(players[playerIndex])}<br>The computer shows: <br>${getCardName(computer.hand[0])}<br><br>${players[playerIndex].name}, you have ${players[playerIndex].splitPoints} points.<br><br>Click submit to hit or submit stay to stay.`;
        }
      }
    }
  }

  // game mode: user split or not
  else if (gameMode == splitOrNot) {
    // if user wants to split
    if (input == 'yes') {
      players[playerIndex].split = true;
      // pop card into split hand
      players[playerIndex].splitHand.push(players[playerIndex].hand.pop());
      // deal 1 card to each hand
      dealCard(players[playerIndex].hand);
      dealCard(players[playerIndex].splitHand);
      // continue playing with player hand
      players[playerIndex].points = getPoints(players[playerIndex].hand);
      myOutputValue = `${getPlayerHand(players[playerIndex])}<br>Computer shows:<br>${getCardName(computer.hand[0])}<br><br>${players[playerIndex].name}, you have ${players[playerIndex].points} points.<br><br>Click submit to hit or submit stay to stay.`;
      gameMode = hitOrStay;
      // if user doesn't split, continue to play with current hand
    } else if (input == 'no') {
      players[playerIndex].split = false;
      players[playerIndex].splitHandStatus = stay;
      myOutputValue = `You have chosen not to split. <br><br>${getPlayerHand(players[playerIndex])}<br>Computer shows:<br>${getCardName(computer.hand[0])}<br><br>${players[playerIndex].name}, you have ${players[playerIndex].points} points.<br><br>Click submit to hit for your hand, or enter stay to end your turn.`;
      gameMode = hitOrStay;
      // if there is no input
    } else {
      myOutputValue = `Please enter a valid choice. <br><br>${getPlayerHand(players[playerIndex])} <br>Computer shows:<br> ${getCardName(computer.hand[0])} <br><br>Your score is ${players[playerIndex].points}.<br><br>Do you want to split? Type Yes to split and No to continue with one hand.`;
    }
  }
  return myOutputValue;
};
