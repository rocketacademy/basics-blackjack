// function to make a deck
function makeDeck() {
  var cardDeck = [];
  var suits = ["Spades", "Hearts", "Clubs", "Diamonds"];
  for (var currentSuit = 0; currentSuit < suits.length; currentSuit++) {
    for (cardCounter = 1; cardCounter <= 13; cardCounter++) {
      var cardRank = cardCounter;
      var cardName = cardRank;
      if (cardName == 1) {
        cardName = "Ace";
      } else if (cardName == 11) {
        cardRank = 10;
        cardName = "Jack";
      } else if (cardName == 12) {
        cardRank = 10;
        cardName = "Queen";
      } else if (cardName == 13) {
        cardRank = 10;
        cardName = "King";
      }
      var card = {
        name: cardName,
        suit: suits[currentSuit],
        rank: cardRank,
      };
      cardDeck.push(card);
    }
  }
  return cardDeck;
}

function getRandomIndex(max) {
  var randomIndex = Math.floor(Math.random() * max);
  return randomIndex;
}
//function to shuffle deck

function shuffleDeck(deckToBeShuffled) {
  for (
    currentIndex = 0;
    currentIndex < deckToBeShuffled.length;
    currentIndex++
  ) {
    var randomCardIndex = getRandomIndex(deckToBeShuffled.length);
    var randomCard = deckToBeShuffled[randomCardIndex];
    var currentCard = deckToBeShuffled[currentIndex];
    deckToBeShuffled[currentIndex] = randomCard;
    deckToBeShuffled[randomCardIndex] = currentCard;
  }
  return deckToBeShuffled;
}

// deals a card from deck
function dealASingleCard(hand) {
  hand.push(shuffledDeck.pop());
}
// deals the starting hand
function dealStartingHands() {
  for (var i = 0; i < 2; i++) {
    for (var j = 0; j < playerProfiles.length; j++) {
      dealASingleCard(playerProfiles[j].hand);
    }
    dealASingleCard(computerHand);
  }
}
//check for blackjack
function checkBlackJack(hand) {
  var playerCardOne = hand[0];
  var playerCardTwo = hand[1];
  var isBlackJack = false;

  if (
    (playerCardOne.name == "Ace" && playerCardTwo.rank == 10) ||
    (playerCardTwo.name == "Ace" && playerCardOne.rank == 10)
  ) {
    isBlackJack = true;
  }
  return isBlackJack;
}
//check for ban ban
function checkBanBan(hand) {
  var playerCardOne = hand[0];
  var playerCardTwo = hand[1];
  var isBanBan = false;

  if (playerCardOne.name == "Ace" && playerCardTwo.name == "Ace") {
    isBanBan = true;
  }
  return isBanBan;
}

// function checkFor777(player, computerHand) { // couldnt make it work 
//   for (var i = 0; i < 3; i++) {
//     if (player.hand[i].rank == 7) {
//       return true;
//     } else if (computerHand[i] == 7) {
//       return true;
//     } else {
//       return false;
//     }
//   }
// }

function calcLosses(player, computerHand) {
  var losses = player.bet;
  if (checkBanBan(computerHand)) {
    losses = player.bet * 3;
    return losses;
  } else if (checkBlackJack(computerHand)) {
    losses = player.bet * 2;
    return losses;
    // } else if (checkFor777(computerHand) == true) {
    //   losses = player.bet * 7;
    //   return losses;
  } else {
    return losses;
  }
}
function calcWinnnings(player) {
  var winnings = player.bet;
  if (checkBanBan(player.hand)) {
    winnings = player.bet * 3;
    return winnings;
  } else if (checkBlackJack(player.hand)) {
    winnings = player.bet * 2;
    return winnings;
    // } else if (checkFor777(player.hand) == true) {
    //   winnings = player.bet * 7;
    //   return winnings;
  } else {
    return winnings;
  }
}

function resetGameState() {
  for (var i = 0; i < playerProfiles.length; i++) {
    playerProfiles[i].hand = [];
  }
  computerHand = [];
}

function sumOfHand(hand) {
  // get sum of cards, if first 2 cards contain ace. ace = 11. if more than 2 cards, ace = 1. if first 2 cards
  var handContainingAce = 0;
  var sum = 0;
  for (counter = 0; counter < hand.length; counter++) {
    var currCard = hand[counter];
    if (currCard.name == "Ace") {
      handContainingAce += 1;
      sum += 11;
    } else {
      sum += currCard.rank;
    }
  }
  if (sum > 21 && handContainingAce > 0) {
    for (var aceCounter = 0; aceCounter < handContainingAce; aceCounter++) {
      sum -= 10;
      if (sum <= 21) {
        break;
      }
    }
  }
  return sum;
}

function handConversion(hand) {
  return hand.map((card) => `[${card.name} of ${card.suit}]`);
}
function displayPlayercards() {
  return `${playerProfiles[currentPlayerIndex].name}'s hand: ${handConversion(
    playerProfiles[currentPlayerIndex].hand
  )}<br>Total: ${sumOfHand(
    playerProfiles[currentPlayerIndex].hand
  )}<br><br>Dealer's hand: Card 1 (${handConversion([
    computerHand[0],
  ])}) -- Card 2 (*Hidden*) <br>Total: ${sumOfHand([computerHand[0]])}`;
}

function displayDealerCards() {
  return `Dealer's hand: ${handConversion(computerHand)}<br>Total: ${sumOfHand(
    computerHand
  )}`;
}

var totalSumOfCards = function (playerHandValue, comHandValue) {
  var totalHandValueMessage = `<br>Player total hand value: ${playerHandValue}<br>Dealer total hand value: ${comHandValue}`;
  return totalHandValueMessage;
};

function getPlayerProfile(playerName) {
  playerProfiles.push({
    id: currentPlayerIndex + 1,
    name: playerName,
    hand: [],
    bet: 0,
    points: 100,
    score: 0,
    bb: false,
    bj: false,
    bust: false,
    playing: true,
  });
}

function isLastPlayer() {
  if (currentPlayerIndex == playerProfiles.length - 1) {
    return true;
  }
}

function callNextPlayer() {
  if (isLastPlayer()) {
    return "All players have played, click submit to see Dealer's cards!";
  } else {
    return `${
      playerProfiles[currentPlayerIndex + 1].name
    } it's your turn! Click submit to continue.`;
  }
}

function endCurrentPlayerTurn() {
  if (isLastPlayer()) {
    gamestate = STATE_COMPUTER_TURN;
    currentPlayerIndex = 0;
    return;
  } else {
    currentPlayerIndex += 1;
    gamestate = STATE_CHECK_AUTOWIN;
  }
}

function getEliminatedPlayers() {}

function computeScore() {
  var results = "Results: <br>";
  if (sumOfHand(computerHand) > 21) {
    //run only if computer bust
    for (var i = 0; i < playerProfiles.length; i++) {
      listIndex = i + 1;
      if (sumOfHand(playerProfiles[i].hand) > 21) {
        //if player also bust = tie
        results += `${listIndex}. ${playerProfiles[i].name} total: ${sumOfHand(
          playerProfiles[i].hand
        )} (BUST) || Dealer's total: ${sumOfHand(
          computerHand
        )} (BUST) || Tie || Delta: +/- $0 || Wallet: $${
          playerProfiles[i].points
        } <br>`;
      } else {
        winnings = calcWinnnings(playerProfiles[i]); //player did not bust and wins
        playerProfiles[i].points += winnings;
        results += `${listIndex}. ${
          playerProfiles[i].name
        } || Total:${sumOfHand(
          playerProfiles[i].hand
        )} || Dealer's Total:${sumOfHand(computerHand)} (BUST) || Bet:${
          playerProfiles[i].bet
        } || Delta: +$${winnings} || Wallet: $${playerProfiles[i].points} <br>`;
      }
    }
    return results;
  }

  if (checkBanBan(computerHand) == true) {
    //run only if  computer banban
    for (var i = 0; i < playerProfiles.length; i++) {
      if (playerProfiles[i].bb == true) {
        listIndex = i + 1;
        results += `${listIndex}. ${
          playerProfiles[i].name
        } - BanBan! || Total:${sumOfHand(
          playerProfiles[i].hand
        )} || Dealer - BanBan! || Total:${sumOfHand(computerHand)} || TIE
         || Delta: +/- 0 || Wallet: $${playerProfiles[i].points} <br>`;
      } else {
        var losses = calcLosses(playerProfiles[i], computerHand);
        playerProfiles[i].points -= losses;
        listIndex = i + 1;
        results += `${listIndex}. ${
          playerProfiles[i].name
        } || Total:${sumOfHand(
          playerProfiles[i].hand
        )} || Dealer's Total:${sumOfHand(computerHand)} || Bet:${
          playerProfiles[i].bet
        } || Delta: -$${losses} || Wallet: $${playerProfiles[i].points} <br>`;
      }
    }
    return results;
  }
  if (checkBlackJack(computerHand) == true) {
    //run only with computer blackjack
    for (var i = 0; i < playerProfiles.length; i++) {
      // dealer blackjack game ends
      if (playerProfiles[i].bj == true) {
        listIndex = i + 1;
        results += `${listIndex}. ${
          playerProfiles[i].name
        } - BlackJack! || Total:${sumOfHand(
          playerProfiles[i].hand
        )} || Dealer - BlackJack! || Total:${sumOfHand(computerHand)} || TIE
        } || Delta: +/- 0 || Wallet: $${playerProfiles[i].points} <br>`;
      } else {
        var losses = calcLosses(playerProfiles[i], computerHand);
        playerProfiles[i].points -= losses;
        listIndex = i + 1;
        results += `${listIndex}. ${playerProfiles[i].name} - Total:${sumOfHand(
          playerProfiles[i].hand
        )} || Dealer - BlackJack || Total:${sumOfHand(computerHand)} || Bet:${
          playerProfiles[i].bet
        } || Delta: -$${losses} || Wallet: $${playerProfiles[i].points} <br>`;
      }
    }
    return results;
  }
  if (sumOfHand(computerHand) <= 21) {
    //run only if com did not bust
    for (i = 0; i < playerProfiles.length; i++) {
      if (playerProfiles[i].bb == true) {
        //current player banban, move next
        listIndex = i + 1;
        var winnings = calcWinnnings(playerProfiles[i]);
        playerProfiles[i].points += winnings;
        results += `${listIndex}. ${
          playerProfiles[i].name
        } || BanBan! || Total:${sumOfHand(
          playerProfiles[i].hand
        )} || Dealer's Total:${sumOfHand(computerHand)} || Bet:${
          playerProfiles[i].bet
        } || Delta: +$${winnings} || Wallet: $${playerProfiles[i].points} <br>`;
      } else if (playerProfiles[i].bj == true) {
        //current player bj, move next
        listIndex = i + 1;
        var winnings = calcWinnnings(playerProfiles[i]);
        playerProfiles[i].points += winnings;
        results += `${listIndex}. ${
          playerProfiles[i].name
        } || BlackJack! || Total:${sumOfHand(
          playerProfiles[i].hand
        )} || Dealer's Total:${sumOfHand(computerHand)} || Bet:${
          playerProfiles[i].bet
        } || Delta: +$${winnings} || Wallet: $${playerProfiles[i].points} <br>`;
      } else if (sumOfHand(playerProfiles[i].hand) > 21) {
        //player bust and lose
        listIndex = i + 1;
        var losses = calcLosses(playerProfiles[i], computerHand);
        playerProfiles[i].points -= losses;
        results += `${listIndex}. ${
          playerProfiles[i].name
        } || Total:${sumOfHand(
          playerProfiles[i].hand
        )} || Dealer's Total:${sumOfHand(computerHand)} || Bet:${
          playerProfiles[i].bet
        } || Delta: -$${losses} || Wallet: $${playerProfiles[i].points} <br>`;
      } else if (sumOfHand(playerProfiles[i].hand) <= 21) {
        listIndex = i + 1;
        //both dealer and player never bust (higher total score wins)
        if (sumOfHand(playerProfiles[i].hand) == sumOfHand(computerHand)) {
          listIndex = i + 1;
          results += `${listIndex}. ${
            playerProfiles[i].name
          } || Total: ${sumOfHand(
            playerProfiles[i].hand
          )} || Dealer's total: ${sumOfHand(
            computerHand
          )} || Tie || Delta: +/- $0 || Wallet: $${
            playerProfiles[i].points
          } <br>`;
        } else if (
          sumOfHand(playerProfiles[i].hand) > sumOfHand(computerHand)
        ) {
          listIndex = i + 1;
          var winnings = calcWinnnings(playerProfiles[i]);
          playerProfiles[i].points += winnings;
          results += `${listIndex}. ${
            playerProfiles[i].name
          } || Total:${sumOfHand(
            playerProfiles[i].hand
          )} || Dealer's Total:${sumOfHand(computerHand)} || Bet:${
            playerProfiles[i].bet
          } || Delta: +$${winnings} || Wallet: $${
            playerProfiles[i].points
          } <br>`;
        } else {
          //computer wins if the above condition = false
          listIndex = i + 1;
          var losses = calcLosses(playerProfiles[i], computerHand);
          playerProfiles[i].points -= losses;
          results += `${listIndex}. ${
            playerProfiles[i].name
          } || Total:${sumOfHand(
            playerProfiles[i].hand
          )} || Dealer's Total:${sumOfHand(computerHand)} || Bet:${
            playerProfiles[i].bet
          } || Delta: -$${losses} || Wallet: $${playerProfiles[i].points} <br>`;
        }
      }
    }
    return results;
  }
}

var getEliminatedPlayers = function () {
  var criterionToEliminate = function (player) {
    return player.points < 1;
  };
  return playerProfiles.filter(criterionToEliminate);
};

var getRemainingPlayers = function () {
  var criterionToRemain = function (player) {
    return player.points > 0;
  };
  return playerProfiles.filter(criterionToRemain);
};

var displayEliminatedPlayers = function (eliminatedPlayersArray) {
  var outputMsg = `Players with 0 points and thus will be eliminated:`;

  if (eliminatedPlayersArray.length < 1) {
    outputMsg += `<br> 1. ${null}`;
  } else {
    for (var i = 0; i < eliminatedPlayersArray.length; i += 1) {
      var listIndex = i + 1;
      outputMsg += `<br> ${listIndex}. ${eliminatedPlayersArray[i].name}<br>`;
    }
  }
  return outputMsg;
};

const STATE_CHOOSE_NUM_PLAYERS = "STATE_CHOOSE_NUM_PLAYERS";
const STATE_GET_PLAYER_NAME = "STATE_GET_PLAYER_NAME";
const STATE_COLLECT_BET = "STATE_COLLECT_BET";
const STATE_DEAL_STARTING_HAND = "STATE_DEAL_STARTING_HAND";
const STATE_CHECK_AUTOWIN = "STATE_CHECK_AUTOWIN";
const STATE_HIT_OR_STAND = "STATE_HIT_OR_STAND";
const STATE_COMPUTER_TURN = "STATE_COMPUTER_TURN";
const STATE_DISPLAY_RESULTS = "STATE_DISPLAY_RESULTS";
const STATE_COMPUTE_SCORE = "STATE_COMPUTE_SCORE";
const STATE_CHECK_REMAINING_PLAYERS = "STATE_CHECK_REMAINING_PLAYERS";
var gamestate = STATE_CHOOSE_NUM_PLAYERS;
var comHandHidden = true;
var fullyMadeDeck = makeDeck();
var shuffledDeck = shuffleDeck(fullyMadeDeck);
var computerHand = [];
var outputMessage = "";
var dealerThreshold = 15;
var playerProfiles = [];
var gameOver = false;
var initialNumberOfPlayers = 0;
var currentPlayerIndex = 0;

// MAIN 

function main(input) {
  if (gameOver == true) {
    return `Game Over, Please refresh your browser!`;
  }
  if (gamestate == STATE_CHOOSE_NUM_PLAYERS) {
    if (isNaN(input) == true || Number(input) <= 0) {
      outputMessage = "Invalid input! Please enter a number larger than 0!";
      return outputMessage;
    }
    initialNumberOfPlayers = Number(input);
    gamestate = STATE_GET_PLAYER_NAME;
    outputMessage = `${initialNumberOfPlayers} players will be participating! Player 1, please enter your name!`;
    return outputMessage;
  }

  if (gamestate == STATE_GET_PLAYER_NAME) {
    if (input.trim() == "") {
      outputMessage = "Please input your name to begin!";
      return outputMessage;
    }
    playerName = input;
    getPlayerProfile(playerName);

    if (playerProfiles[currentPlayerIndex].id == initialNumberOfPlayers) {
      gamestate = STATE_COLLECT_BET;
      currentPlayerIndex = 0;
      outputMessage = `Welcome ${
        playerProfiles[playerProfiles.length - 1].name
      }! <br> ${playerProfiles[0].name}, you have $${
        playerProfiles[0].points
      }.<br>Please make a bet!`;
    } else {
      var prevPlayerIndex = currentPlayerIndex;
      currentPlayerIndex += 1;
      outputMessage = `Welcome ${
        playerProfiles[prevPlayerIndex].name
      }! Player ${
        playerProfiles[prevPlayerIndex].id + 1
      }, Please enter your name!`;
    }
    return outputMessage;
  }
  if (gamestate == STATE_COLLECT_BET) {
    if (isNaN(input) == true || input <= 0) {
      outputMessage = "Invalid input! Please enter a number larger than 0!";
      return outputMessage;
    }
    if (input > playerProfiles[currentPlayerIndex].points) {
      outputMessage = `Insufficient amount! ${playerProfiles[currentPlayerIndex].name} you have $${playerProfiles[currentPlayerIndex].points} remaining, please enter a bet less than or equal to this.`;
      return outputMessage;
    }
    playerProfiles[currentPlayerIndex].bet = Number(input);

    if (isLastPlayer()) {
      gamestate = STATE_DEAL_STARTING_HAND;
      currentPlayerIndex = 0;
      outputMessage = `${
        playerProfiles[playerProfiles.length - 1].name
      },<br>Bet amount: $${
        playerProfiles[playerProfiles.length - 1].bet
      } <br> ${
        playerProfiles[currentPlayerIndex].name
      }, Press submit to deal cards and get starting hand!`;
    } else {
      var prevPlayerIndex = currentPlayerIndex;
      currentPlayerIndex += 1;
      outputMessage = `${playerProfiles[prevPlayerIndex].name},<br>Bet amount: $${playerProfiles[prevPlayerIndex].bet} <br> ${playerProfiles[currentPlayerIndex].name}, please enter your bet.`;
    }
    return outputMessage;
  }
  if (gamestate == STATE_DEAL_STARTING_HAND) {
    dealStartingHands();
    gamestate = STATE_CHECK_AUTOWIN;
  }
  if (gamestate == STATE_CHECK_AUTOWIN) {
    if (checkBanBan(computerHand)) {
      gamestate = STATE_DISPLAY_RESULTS;
      outputMessage = `Dealer has Ban Ban!`;
      return outputMessage;
    } else if (checkBlackJack(computerHand)) {
      gamestate = STATE_DISPLAY_RESULTS;
      outputMessage = `Dealer has Black Jack!`;
      return outputMessage;
    } else if (checkBanBan(playerProfiles[currentPlayerIndex].hand)) {
      playerProfiles[currentPlayerIndex].bb = true;
      outputMessage = `${
        playerProfiles[currentPlayerIndex].name
      } has Ban Ban!<br>${callNextPlayer()}`;
      endCurrentPlayerTurn();
      return outputMessage;
    } else if (checkBlackJack(playerProfiles[currentPlayerIndex].hand)) {
      playerProfiles[currentPlayerIndex].bj = true;
      outputMessage = `${
        playerProfiles[currentPlayerIndex].name
      } has Black Jack!<br>${callNextPlayer()}`;

      endCurrentPlayerTurn();
      return outputMessage;
    } else {
      gamestate = STATE_HIT_OR_STAND;
      var defaultOutput = displayPlayercards();
      return `${defaultOutput} <br> Please input either "hit" or "stand";`;
    }
  }
  if (gamestate == STATE_HIT_OR_STAND) {
    if (input != "hit" && input != "stand") {
      return "Invalid input! Please input either 'hit' or 'stand'! ";
    }
    var defaultOutput = displayPlayercards();
    var nextPlayer = callNextPlayer();
    if (input == "hit") {
      dealASingleCard(playerProfiles[currentPlayerIndex].hand);
      var defaultOutput = displayPlayercards();
      if (sumOfHand(playerProfiles[currentPlayerIndex].hand) > 21) {
        playerProfiles[currentPlayerIndex].bust = true;
        outputMessage = `${playerProfiles[currentPlayerIndex].name} has busted! <br>${defaultOutput}<br><br>${nextPlayer}`;
        endCurrentPlayerTurn();
        return outputMessage;
      } else {
        return `${defaultOutput}<br>Please enter "hit" to draw another card or "stand" to end your turn!`;
      }
    } else if (input == "stand") {
      if (isLastPlayer()) {
        outputMessage = `${playerProfiles[currentPlayerIndex].name} has chosen to stand.<br>${defaultOutput}<br><br>${nextPlayer}`;
        endCurrentPlayerTurn();
        return outputMessage;
      } else {
        outputMessage = `${
          playerProfiles[currentPlayerIndex].name
        } has chosen to stand.<br>${defaultOutput}<br><br>${
          playerProfiles[currentPlayerIndex + 1].name
        }, it's your turn. Press submit to see your hand.`;
        endCurrentPlayerTurn();
        return outputMessage;
      }
    }
  }
  if (gamestate == STATE_COMPUTER_TURN) {
    if (comHandHidden == true) {
      comHandHidden = false;
      return `${displayDealerCards()}<br><br>Press submit to see the dealer's next move!`;
    }
    var comHandSum = sumOfHand(computerHand);
    if (comHandSum <= dealerThreshold) {
      dealASingleCard(computerHand);
      var comHandSum = sumOfHand(computerHand);
      if (comHandSum > 21) {
        gamestate = STATE_DISPLAY_RESULTS;
        outputMessage = `Dealer hits and busted.<br>${displayDealerCards()}<br><br>Press submit to see the results!`;
        return outputMessage;
      } else {
        outputMessage = `Dealer hits!<br>${displayDealerCards()}<br><br>Press submit to see dealer's next move.`;
        return outputMessage;
      }
    } else {
      gamestate = STATE_DISPLAY_RESULTS;
      outputMessage = `Dealer has chosen to stand!<br>${displayDealerCards()}<br><br>Press submit to see the results!`;
    }
  }
  if (gamestate == STATE_DISPLAY_RESULTS) {
    var message = "";
    for (var i = 0; i < playerProfiles.length; i++) {
      message += `${playerProfiles[i].name}: ${handConversion(
        playerProfiles[i].hand
      )}<br>Total: ${sumOfHand(playerProfiles[i].hand)}<br>`;
    }
    gamestate = STATE_COMPUTE_SCORE;
    return `${message}<br>Dealer's hand: ${displayDealerCards()}`;
  }
  if (gamestate == STATE_COMPUTE_SCORE) {
    var getGameResults = computeScore();
    gamestate = STATE_CHECK_REMAINING_PLAYERS;
    return getGameResults;
  }
  if (gamestate == STATE_CHECK_REMAINING_PLAYERS) {
    var eliminatedPlayers = getEliminatedPlayers();
    var remainingPlayers = getRemainingPlayers();

    if (remainingPlayers.length < 1) {
      gameOver = true;
      return `${displayEliminatedPlayers(
        eliminatedPlayers
      )} <br><br>No more players remaining, press refresh to restart!`;
    }
    playerProfiles = remainingPlayers;
    resetGameState();
    gamestate = STATE_COLLECT_BET;
    currentPlayerIndex = 0;
    comHandHidden = true;
  }
  return `${displayEliminatedPlayers(
    eliminatedPlayers
  )}<br> has been eliminated!<br><br>${
    playerProfiles[0].name
  }, Please place your bets!`;
}
