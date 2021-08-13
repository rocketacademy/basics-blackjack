//generates card deck
var makeDeck = function () {
  var cardDeck = [];
  var suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      var cardValue = rankCounter;
      if (cardName == 1) {
        cardName = 'ace';
        cardValue = 11;
      } else if (cardName == 11) {
        cardName = 'jack';
        cardValue = 10;
      } else if (cardName == 12) {
        cardName = 'queen';
        cardValue = 10;
      } else if (cardName == 13) {
        cardName = 'king';
        cardValue = 10;
      };
      var card = {
        name: cardName + ` of ` + currentSuit,
        suit: currentSuit,
        rank: rankCounter,
        value: cardValue
      };
      cardDeck.push(card);
      rankCounter += 1;
    };
    suitIndex += 1;
  };
  return cardDeck;
};

//original card deck
var cardDeck = makeDeck();

//get a random index ranging from 0 (inclusive) to max (exclusive)
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

//shuffles card deck
var shuffleCards = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex = currentIndex + 1;
  };
  return cardDeck;
};

//shuffled card deck
var shuffledDeck = shuffleCards(cardDeck);

//keeps track of game mode - starts with pre-game
var GAME_MODE_PRE_GAME = `pre game`;
var GAME_MODE_BETTING = `betting`;
var GAME_MODE_INITIAL = `initial`;
var GAME_MODE_HIT_OR_STAND = `hit or stand`;
var GAME_MODE_END = `end turn`;
var gameMode = GAME_MODE_PRE_GAME;

//pre-game message
var instructions = `Hello, welcome to Blackjack!<br><br>
The rules of the game are as follows:<br>
1. The goal of blackjack is to have a hand that totals higher than the dealer's but doesn't total higher than 21<br>
2. If your hand totals higher than 21, it is called a bust, which means you are out of the game<br>
3. Before the game starts, all players place a bet<br>
4. The dealer will deal 2 face up cards to each player, and a face up card and face down card to himself<br>
5. Cards 2-10 are scored using their face value, and J Q K are equal to 10, but aces can be 1 or 11<br>
6. If your 2 face up cards total 21, you win 1.5 times your bet<br>
7. Otherwise, each player can choose to hit (draw another card) or stand (end turn)<br>
8. If you bust, the dealer wins your bet<br>
9. After all players are done, the dealer will hit if their score is less than 17<br>
10. If the dealer busts, every player still in the game wins 2 times their bet<br>
11. If dealer does not bust, players who score higher than the dealer win 2 times their bet<br>
12. Everyone else loses their bet to the dealer
<br><br>
Please enter number of players to start.`

//keeps track of number of players
var numPlayers = 0;
var createNumPlayers = function(number){
  numPlayers = Number(number);
  return `There are ${numPlayers} players in this game.`;
};

//creates player hands
var createPlayerHands = function() {
  var playerHands = [];
  var playerIndex = 1;
    while (playerIndex <= numPlayers) {
      var playerHand = {
        player: playerIndex,
        hand:[],
        bank: 100,
        bet: 0,
        score: 0,
        result: ``
      };
      playerHands.push(playerHand);
      playerIndex += 1;
    };
  return playerHands;
};

//keeps track of dealer and player hands
var dealerHand = [];
var playerHands = [];

//keeps track of which player's turn it is - start with player 1
var playerTurn = 0;
// var allPlayersHaveGone = false;

//moves to next player's turn until every player has gone
var nextTurn = function(){
  playerTurn += 1;
  if(playerTurn > (numPlayers-1)){
    playerTurn = 0;
    // allPlayersHaveGone = true;
  };
  return `It's player ${playerHands[playerTurn].player}'s turn.`
};

//creates a player's bet on their turn
var createBet = function(input,playerTurn){
  var bet = Number(input);
  playerHands[playerTurn].bank -= bet;
  //checks that bet is not blank and is a number
  if (Number.isNaN(bet) ||
  bet == `` ){
    return `Please enter a number to place a bet.<br>
    Player ${playerHands[playerTurn].player} bank: $${playerHands[playerTurn].bank}`;
  //checks if player has enough in bank to bet
  }else if(playerHands[playerTurn].bank < 0){
    playerHands[playerTurn].bank +=bet;
    return `Player ${playerHands[playerTurn].player} doesn't have enough in the bank!<br>
    Player ${playerHands[playerTurn].player} bank: ${playerHands[playerTurn].bank}`;
  } else if (playerHands[playerTurn].player < numPlayers){
    playerHands[playerTurn].bet = bet;
    var playerBetMessage = `Player ${playerHands[playerTurn].player} bet $${playerHands[playerTurn].bet}.`
    var nextTurnMessage = nextTurn();
    return `${playerBetMessage}<br>${nextTurnMessage}`
  }else{
    playerHands[playerTurn].bet = bet;
    playerBetMessage = `Player ${playerHands[playerTurn].player} bet $${playerHands[playerTurn].bet}.`
    nextTurnMessage = nextTurn();
    gameMode = GAME_MODE_INITIAL;
    return `${playerBetMessage}<br>Click submit to deal cards.`;
  };
};

//deals initial hand
var dealInitialHand = function(){
  //dealer draws 2 cards from shuffled deck
  var dealerFaceUpCard = shuffledDeck.pop();
  var dealerFaceDownCard = shuffledDeck.pop();
  dealerHand.push(dealerFaceUpCard,dealerFaceDownCard);

  //each player is dealt 2 cards from shuffled deck
  var playerIndex = 0;
  while(playerIndex < numPlayers){
  var playerCard1 = shuffledDeck.pop();
  var playerCard2 = shuffledDeck.pop();
  playerHands[playerIndex].hand.push(playerCard1,playerCard2);
  playerIndex += 1;
  };

  return `Cards have been dealt. Dealer has ${dealerFaceUpCard.name}.<br>
  Click to move to Player 1's hand.`
};

//calculates player score
var calculatePlayerScore = function(playerHands, playerTurn){
  playerHands[playerTurn].score = 0;
  var playerAces = 0;
  var playerIndex = 0;
  while (playerIndex < playerHands[playerTurn].hand.length){
    playerHands[playerTurn].score += playerHands[playerTurn].hand[playerIndex].value;
    if(playerHands[playerTurn].hand[playerIndex].value == 11){
      playerAces += 1;
    };
    playerIndex += 1;
  };
  //if player has more than 1 ace, 2nd ace onwards are counted as 1s to prevent bust
  if(playerAces > 0){
    playerHands[playerTurn].score -= 10*(playerAces-1);
    //if player score still busts, count 1st ace as 1 too.
    if(playerHands[playerTurn].score > 21){
      playerHands[playerTurn].score -= 10;
    }; 
  };
return playerHands[playerTurn].score;
};

//calculates dealer score
var calculateDealerScore = function(dealerHand){
  dealerScore = 0;
  var dealerAces = 0;
  var dealerIndex = 0;
  while (dealerIndex < dealerHand.length){
    dealerScore += dealerHand[dealerIndex].value;
    if(dealerHand[dealerIndex].value == 11){
      dealerAces += 1;
    };
    dealerIndex += 1;
  };
  //if dealer has more than 1 ace, 2nd ace onwards are counted as 1s to prevent bust
  if(dealerAces > 0){
    dealerScore -= 10*(dealerAces-1);
    //if dealer score still busts, count 1st ace as 1 too.
    if(dealerScore > 21){
      dealerScore -= 10;
    }; 
  };
return dealerScore;
};

//displays player hand
var displayPlayerHand = function(playerHands, playerTurn){
  var playerHandMessage = `Player ${playerHands[playerTurn].player}'s hand:<br>`
  var playerIndex = 0;
  while (playerIndex < playerHands[playerTurn].hand.length){
    playerHandMessage += playerHands[playerTurn].hand[playerIndex].name + `<br>`;
    playerIndex += 1;
  };
return playerHandMessage;
};

//displays dealer hand
var displayDealerHand = function(dealerHand){
  var dealerHandMessage = `Dealer hand:<br>`
  var dealerIndex = 0;
  while (dealerIndex < dealerHand.length){
    dealerHandMessage += dealerHand[dealerIndex].name + `<br>`;
    dealerIndex += 1;
  };
return dealerHandMessage;
};

// //if player chooses to hit, deals another card to player
// //if player chooses to stand, ends turn
// var playerHitOrStand = function(playerChoice,playerTurn){
//   var playerScore = calculatePlayerScore(playerHands,playerTurn);
//   var playerHandMessage = displayPlayerHand(playerHands,playerTurn);
//   var currentPlayerMessage = `Dealer face up card: ${dealerHand[0].name}<br><br>
//       ${playerHandMessage}<br>
//       Player ${playerHands[playerTurn].player}'s score: ${playerHands[playerTurn].score}`
//   if (playerHands[playerTurn].player < numPlayers){
//     if(playerChoice == `hit`){
//     var playerHitCard = shuffledDeck.pop();
//     var currentPlayerHand = playerHands[playerTurn].hand;
//     currentPlayerHand.push(playerHitCard);
//     playerScore = calculatePlayerScore(playerHands,playerTurn);
//     playerHandMessage = displayPlayerHand(playerHands,playerTurn);
//     currentPlayerMessage = `Dealer face up card: ${dealerHand[0].name}<br><br>
//       ${playerHandMessage}<br>
//       Player ${playerHands[playerTurn].player}'s score: ${playerHands[playerTurn].score}`
//     return `Player ${playerHands[playerTurn].player} chose to ${playerChoice}. Player ${playerHands[playerTurn].player} drew ${playerHitCard.name}.<br><br>
//       ${currentPlayerMessage}`;
//     }else if (playerChoice == `stand`){
//     currentPlayerMessage = `Dealer face up card: ${dealerHand[0].name}<br><br>
//       ${playerHandMessage}<br>
//       Player ${playerHands[playerTurn].player}'s score: ${playerHands[playerTurn].score}`
//     var nextTurnMessage = nextTurn();
//     return `Player ${playerHands[playerTurn].player} chose to ${playerChoice}. End turn.<br><br>
//       ${currentPlayerMessage}<br><br>
//       ${nextTurnMessage}`;
//     }else {
//     return `${currentPlayerMessage}<br><br>
//       Player ${playerHands[playerTurn].player}, hit or stand?`;
//     };
//   }else{
//     if(playerChoice == `hit`){
//       playerHitCard = shuffledDeck.pop();
//       currentPlayerHand = playerHands[playerTurn].hand;
//       currentPlayerHand.push(playerHitCard);
//       currentPlayerHand.push(playerHitCard);
//       playerScore = calculatePlayerScore(playerHands,playerTurn);
//       playerHandMessage = displayPlayerHand(playerHands,playerTurn);
//       currentPlayerMessage = `Dealer face up card: ${dealerHand[0].name}<br><br>
//         ${playerHandMessage}<br>
//         Player ${playerHands[playerTurn].player}'s score: ${playerHands[playerTurn].score}`
//       return `Player ${playerHands[playerTurn].player} chose to ${playerChoice}. Player ${playerHands[playerTurn].player} drew ${playerHitCard.name}.<br><br>
//         ${currentPlayerMessage}`
//       }else if (playerChoice == `stand`){
//       currentPlayerMessage = `Dealer face up card: ${dealerHand[0].name}<br><br>
//         ${playerHandMessage}<br>
//         Player ${playerHands[playerTurn].player}'s score: ${playerHands[playerTurn].score}`
//       nextTurnMessage = nextTurn();
//       gameMode = GAME_MODE_END;
//       return `Player ${playerHands[playerTurn].player} chose to ${playerChoice}. End turn.<br><br>
//         All players have finished. Click to see results.`;
//       }else {
//         return `${currentPlayerMessage}<br><br>Player ${playerHands[playerTurn].player}, hit or stand?`;
//       };
//   };
// };

//if player chooses to hit, deals another card to player
//if player chooses to stand, ends turn
var playerHitOrStand = function(playerChoice,playerTurn){
  var playerScore = calculatePlayerScore(playerHands,playerTurn);
  var playerHandMessage = displayPlayerHand(playerHands,playerTurn);
  var currentPlayerMessage = `Dealer face up card: ${dealerHand[0].name}<br><br>
      ${playerHandMessage}<br>
      Player ${playerHands[playerTurn].player}'s score: ${playerHands[playerTurn].score}`
  if(playerChoice == `hit`){
    var playerHitCard = shuffledDeck.pop();
    var currentPlayerHand = playerHands[playerTurn].hand;
    currentPlayerHand.push(playerHitCard);
    playerScore = calculatePlayerScore(playerHands,playerTurn);
    playerHandMessage = displayPlayerHand(playerHands,playerTurn);
    currentPlayerMessage = `Dealer face up card: ${dealerHand[0].name}<br><br>
      ${playerHandMessage}<br>
      Player ${playerHands[playerTurn].player}'s score: ${playerHands[playerTurn].score}`
    return `Player ${playerHands[playerTurn].player} chose to ${playerChoice}. Player ${playerHands[playerTurn].player} drew ${playerHitCard.name}.<br><br>
      ${currentPlayerMessage}`;
  }else if (playerChoice == `stand`){
    currentPlayerMessage = `Dealer face up card: ${dealerHand[0].name}<br><br>
      ${playerHandMessage}<br>
      Player ${playerHands[playerTurn].player}'s score: ${playerHands[playerTurn].score}`
    var nextTurnMessage = nextTurn();
    var standMessage = `Player ${playerHands[playerTurn].player} chose to ${playerChoice}. End turn.<br><br>
      ${currentPlayerMessage}<br><br>
      ${nextTurnMessage}`;
    if(playerHands[playerTurn].player == playerHands.length){
      gameMode = GAME_MODE_END;
      standMessage = `Player ${playerHands[playerTurn].player} chose to ${playerChoice}. End turn.<br><br>
        All players have finished. Click to see results.`
      };
    return standMessage;
    }else {
    return `${currentPlayerMessage}<br><br>
      Player ${playerHands[playerTurn].player}, hit or stand?`;
    };
};

//if dealer score is less than 17, dealer has to hit (deal another card to dealer)
//if dealer score is 17 or more dealer stands (ends turn)
var dealerHitOrStand = function(dealerScore){
  var dealerHitCardMessage = `Dealer hit cards: `
  if(dealerScore >= 17){
    dealerHitCardMessage += `NIL`;
  };
  while(dealerScore < 17){
    var dealerHitCard = shuffledDeck.pop();
    dealerHand.push(dealerHitCard);
    dealerScore = calculateDealerScore(dealerHand);
    dealerHitCardMessage += dealerHitCard.name +` `;
  };
return dealerHitCardMessage;
};

// //compares scores of dealer and player at end of game to determine winner and bets
// var generateGameResult = function(playerHands,playerTurn,dealerScore){
//   //if dealer busts, all remaining player wins 2 times bet
//   if(dealerScore > 21 && playerHands[playerTurn].score <= 21){
//     var betWon = (playerHands[playerTurn].bet*2);
//     playerHands[playerTurn].bank += betWon;
//     return `Dealer busted!<br>
//     Player ${playerHands[playerTurn].player} wins $${betWon}.<br>
//     Player ${playerHands[playerTurn].player} bank: $${playerHands[playerTurn].bank}`
//     //if dealer does not bust, players who score higher than dealer win 2 times bet
//       }else if(dealerScore < playerHands[playerTurn].score  && dealerScore <= 21 && playerHands[playerTurn].score <= 21){
//         var betWon = (playerHands[playerTurn].bet*2);
//         playerHands[playerTurn].bank += betWon;
//         return `Player ${playerHands[playerTurn].player} wins!<br>
//         Player ${playerHands[playerTurn].player} wins $${betWon}.<br>
//         Player ${playerHands[playerTurn].player} bank: $${playerHands[playerTurn].bank}`
//         //players who score equal to dealer or lower lose their bet
//       } else if (dealerScore >= playerHands[playerTurn].score && dealerScore <= 21 && playerHands[playerTurn].score <= 21){
//         return `Dealer wins!<br>
//         You lost your bet.<br>
//         ${playerHands[playerTurn].player} bank: $${playerHands[playerTurn].bank}`
//       };
// }; 

//compares scores of dealer and player at end of game to determine winner and bets
var generateGameResult = function(playerHands,dealerScore){
  var playerIndex = 0;
  while(playerIndex < playerHands.length){
    //if player is has remained till end of game
    if(playerHands[playerIndex].result == ``){
      playerScore = calculatePlayerScore(playerHands,playerIndex);
      //if dealer busts, player wins 2 times bet
      if(dealerScore > 21){
        var betWon = (playerHands[playerIndex].bet*2);
        playerHands[playerIndex].bank += betWon;
        playerHands[playerIndex].result = `win`;
        return `Dealer busted!<br>
        Player ${playerHands[playerIndex].player} wins $${betWon}.<br>
        Player ${playerHands[playerIndex].player} bank: $${playerHands[playerIndex].bank}`
      //if dealer does not bust
      }else{
        //players who score higher than dealer win 2 times bet
        if(dealerScore < playerHands[playerIndex].score){
          var betWon = (playerHands[playerIndex].bet*2);
          playerHands[playerIndex].bank += betWon;
          playerHands[playerIndex].result = `win`;
          return `Player ${playerHands[playerIndex].player} wins!<br>
          Player ${playerHands[playerIndex].player} wins $${betWon}.<br>
          Player ${playerHands[playerIndex].player} bank: $${playerHands[playerIndex].bank}`
        //players who score equal to dealer or lower lose their bet
        }else if(dealerScore >= playerHands[playerIndex].score){
          playerHands[playerIndex].result = `lose`;
          return `Player ${playerHands[playerIndex].player} lost!<br>
          ${playerHands[playerIndex].player} bank: $${playerHands[playerIndex].bank}`
        };
      };
    playerIndex += 1;
    };
  }; 
};


//restarts game
var gameRestart = false;
var restartGame = function(){
  gameMode = GAME_MODE_BETTING;
  //shuffles new deck
  shuffledDeck = shuffleCards(cardDeck);
  //clears 
  playerHands = createPlayerHands(numPlayers);
  //clears dealer hand
  dealerHand = [];
  //start from player 1 again
  playerTurn = 0;
  gameRestart = false;
};

//---MAIN FUNCTION----
// var main = function (input) {
//   var myOutputValue = ``;
//   var playerHandMessage = ``;
//   if(gameMode == GAME_MODE_PRE_GAME){
//     if(input == ``){
//       myOutputValue = instructions;
//     }else{
//       var numPlayerMessage = createNumPlayers(input);
//       playerHands = createPlayerHands(numPlayers);
//       // playerBanks = createPlayerBanks(numPlayers);
//       // playerBets = createPlayerBets(numPlayers);
//       myOutputValue = `${numPlayerMessage}<br>Player 1, how much do you want to bet?`;
//       gameMode = GAME_MODE_BETTING;
//     };
//   }else if (gameMode == GAME_MODE_BETTING){
//     var bettingMessage = createBet(input,playerTurn);
//     myOutputValue = bettingMessage;
//   }else if(gameMode == GAME_MODE_INITIAL){
//     var initialHand = dealInitialHand();
//     //playerScore = calculatePlayerScore(playerHand);
//     //playerHandMessage = displayPlayerHand(playerHand);
//     gameMode = GAME_MODE_HIT_OR_STAND;
//     myOutputValue = `${initialHand}`;
//     //<br><br>
//     //Dealer face up card: ${dealerHand[0].name}<br><br>
//     //${playerHandMessage}<br>
//     //${userName}'s score: ${playerScore}<br><br>
//     //${userName}, hit or stand?;
//   }else if (gameMode == GAME_MODE_HIT_OR_STAND){
//     playerScore = calculatePlayerScore(playerHands,playerTurn);
//     playerHandMessage = displayPlayerHand(playerHands,playerTurn);
//     myOutputValue = `Dealer face up card: ${dealerHand[0].name}<br><br>
//     ${playerHandMessage}<br>
//     Player ${playerHands[playerTurn].player} score: ${playerHands[playerTurn].score}<br><br>` 
//     if(playerHands[playerTurn].score == 21){
//       var betWon = (playerHands[playerTurn].bet*1.5);
//       playerHands[playerTurn].bank += betWon;
//       // gameRestart = true;
//       myOutputValue += `<br><br>${userName} wins $${betWon}.<br>
//       ${userName}'s bank: $${playerBank}`
//     }else {
//     var hitOrStand = playerHitOrStand(input);
//     playerScore = calculatePlayerScore(playerHand);
//     playerHandMessage = displayPlayerHand(playerHand);
//     myOutputValue = `${hitOrStand}<br><br>
//     Dealer face up card: ${dealerHand[0].name}<br><br>
//     ${playerHandMessage}<br>
//     ${userName}'s score: ${playerScore}`;
//     if(playerScore > 21){
//       gameRestart = true;
//       myOutputValue += `<br><br>${userName} busted!<br>
//       You lost your bet.<br>
//       ${userName}'s bank: $${playerBank}`;
//     };
//   };
//   }else if (gameMode == GAME_MODE_END){
//     playerScore = calculatePlayerScore(playerHand);
//     playerHandMessage = displayPlayerHand(playerHand);
//     dealerScore = calculateDealerScore(dealerHand);
//     var dealerTurn = dealerHitOrStand(dealerScore);
//     var dealerHandMessage = displayDealerHand(dealerHand);
//     var gameResult = generateGameResult(playerScore,dealerScore)
//     myOutputValue = `${dealerTurn}<br><br>
//     ${dealerHandMessage}<br>
//     Dealer score: ${dealerScore}<br><br>
//     ${playerHandMessage}<br>
//     ${userName}'s score: ${playerScore}<br><br>
//     ${gameResult}`
//     gameRestart = true;
//   };

//   if(gameRestart == true){
//     var restart = restartGame();
//   };

//   return myOutputValue;
// };

var main = function (input) {
  var myOutputValue = ``;
  var playerHandMessage = ``;
  //display instructions and take input on number of players in the round
  if(gameMode == GAME_MODE_PRE_GAME){
    if(input == ``){
      myOutputValue = instructions;
    }else{
      var numPlayerMessage = createNumPlayers(input);
      playerHands = createPlayerHands(numPlayers);
      myOutputValue = `${numPlayerMessage}<br>Player 1, how much do you want to bet?`;
      gameMode = GAME_MODE_BETTING;
    };
  //each player places their bets for the round
  }else if (gameMode == GAME_MODE_BETTING){
    var bettingMessage = createBet(input,playerTurn);
    myOutputValue = bettingMessage;
  //dealer deals initial hand
  }else if(gameMode == GAME_MODE_INITIAL){
    var initialHand = dealInitialHand();
    gameMode = GAME_MODE_HIT_OR_STAND;
    myOutputValue = `${initialHand}`;
  }else if (gameMode == GAME_MODE_HIT_OR_STAND){
    var playerScore = calculatePlayerScore(playerHands,playerTurn);
    playerHandMessage = displayPlayerHand(playerHands,playerTurn);
    myOutputValue = `Dealer face up card: ${dealerHand[0].name}<br><br>
      ${playerHandMessage}<br>
      Player ${playerHands[playerTurn].player} score: ${playerHands[playerTurn].score}<br><br>`;
    //if player's initial hand is 21, win 1.5 times of bet
    if(playerHands[playerTurn].hand.length == 2 &&
      playerHands[playerTurn].score == 21){
      var betWon = (playerHands[playerTurn].bet*1.5);
      playerHands[playerTurn].bank += betWon;
      playerHands[playerTurn].result = `immediate win`;
      var immediateWinMessage =`Player ${playerHands[playerTurn].player} wins $${betWon}.<br>
        Player ${playerHands[playerTurn].player}'s bank: $${playerHands[playerTurn].bank}`;
      nextTurnMessage = nextTurn();
      myOutputValue += `${immediateWinMessage}<br><br>${nextTurnMessage}`;
    //if not, each player chooses to hit or stand
    }else {
      var hitOrStand = playerHitOrStand(input,playerTurn);
      // playerScore = calculatePlayerScore(playerHands,playerTurn);
      // playerHandMessage = displayPlayerHand(playerHands,playerTurn);
      myOutputValue = `${hitOrStand}`
        // <br><br>
        // Dealer face up card: ${dealerHand[0].name}<br><br>
        // ${playerHandMessage}<br>
        // Player ${playerHands[playerTurn].player}'s score: ${playerHands[playerTurn].score}`;
      //if player busts, they lose their bet
      if(playerHands[playerTurn].score > 21){
        playerHands[playerTurn].result = `bust`;
        var bustedMessage = `<br><br>Player ${playerHands[playerTurn].player} busted!<br>
          You lost your bet.<br>
          Player ${playerHands[playerTurn].player}'s bank: $${playerHands[playerTurn].bank}`;
        nextTurnMessage = nextTurn();
        myOutputValue += `${bustedMessage}<br><br>${nextTurnMessage}`;
      };
    };
  }else if(gameMode == GAME_MODE_END){
    //after all players are done, dealer hits or stands
    dealerScore = calculateDealerScore(dealerHand);
    var dealerTurn = dealerHitOrStand(dealerScore);
    var dealerHandMessage = displayDealerHand(dealerHand);
    //generate result for all remaining players
    var gameResult = generateGameResult(playerHands,dealerScore)
    myOutputValue = `${dealerTurn}<br><br>
    ${dealerHandMessage}<br>
    Dealer score: ${dealerScore}<br><br>
    ${gameResult}`
    gameRestart = true;
  };

  //restart game
  if(gameRestart == true){
    var restart = restartGame();
  };

  return myOutputValue;
};