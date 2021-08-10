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

//keeps track of dealer and player hands
var dealerHand = [];
var playerHand = [];

//keeps track of game mode - starts with pre-game
var GAME_MODE_PRE_GAME = `pre game`;
var GAME_MODE_INITIAL = `initial`;
var GAME_MODE_HIT_OR_STAND = `hit or stand`;
var GAME_MODE_END = `end turn`;
var gameMode = GAME_MODE_PRE_GAME;

//pre-game message
var instructions = `Hello, welcome to Blackjack!<br><br>
The rules of the game are as follows:<br>
1. The dealer will deal 2 cards to himself and each player<br>
2. Each player can choose to hit (draw another card) or stand (end turn)<br>
3. After all players are done, the dealer will hit if their score is less than 17<br>
4. Player wins if they score higher than the dealer without exceeding a total score of 21
<br><br>
Please type in your name to start.`

//keeps track of player name
var userName = ``;
var createUserName = function(name){
  userName = name
  return `Hello ${userName}! Click submit to deal cards.`
}

//deals initial hand
var dealInitialHand = function(){
  //dealer draws 2 cards from shuffled deck
  var dealerFaceUpCard = shuffledDeck.pop();
  var dealerFaceDownCard = shuffledDeck.pop();
  dealerHand.push(dealerFaceUpCard,dealerFaceDownCard);
  console.log(`dealer initial hand`,dealerHand);

  //player draws 2 cards from shuffled deck
  var playerCard1 = shuffledDeck.pop();
  var playerCard2 = shuffledDeck.pop();
  playerHand.push(playerCard1,playerCard2);
  console.log(`player initial hand`,playerHand);

  return `Dealer has ${dealerFaceUpCard.name}.<br>
  ${userName} has ${playerCard1.name} and ${playerCard2.name}.`
};

//keeps track of dealer and player scores
var dealerScore = 0;
var playerScore = 0;

//calculates player score
var calculatePlayerScore = function(playerHand){
  playerScore = 0;
  var playerAces = 0;
  var playerIndex = 0;
  while (playerIndex < playerHand.length){
    playerScore += playerHand[playerIndex].value;
    if(playerHand[playerIndex].value == 11){
      playerAces += 1;
    };
    playerIndex += 1;
  };
  //if player has more than 1 ace, 2nd ace onwards are counted as 1s to prevent bust
  if(playerAces > 0){
    playerScore -= 10*(playerAces-1);
    //if player score still busts, count 1st ace as 1 too.
    if(playerScore > 21){
      playerScore -= 10;
    }; 
  };
return playerScore;
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
var displayPlayerHand = function(playerHand){
  var playerHandMessage = `${userName}'s hand:<br>`
  var playerIndex = 0;
  while (playerIndex < playerHand.length){
    playerHandMessage += playerHand[playerIndex].name + `<br>`;
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

//compares scores of dealer and player to determine winner
var generateGameResult = function(playerScore,dealerScore){
  if((dealerScore >= playerScore && dealerScore <= 21 && playerScore <= 21) ||
    (playerScore > 21 && dealerScore <= 21)){
        return `Dealer wins!`
      }else if((dealerScore < playerScore && dealerScore <= 21 && playerScore <= 21) ||
        (dealerScore > 21 && playerScore <= 21)){
        return `${userName} wins!`
      } else if (dealerScore == playerScore ||
        (dealerScore > 21 && playerScore > 21)){
        return `It's a tie.`
      };
}; 

//if player chooses to hit, deals another card to player
//if player chooses to stand, ends turn
var playerHitOrStand = function(playerChoice){
  if(playerChoice == `hit`){
    var playerHitCard = shuffledDeck.pop();
    playerHand.push(playerHitCard);
    console.log(`player hand after hit`,playerHand);
    return `${userName} chose to ${playerChoice}. ${userName} drew ${playerHitCard.name}.`
  }else if (playerChoice == `stand`){
    gameMode = GAME_MODE_END;
    return `${userName} chose to ${playerChoice}. End turn.`;
  }else {
    return `You can only choose to hit or stand.`;
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
gameMode = GAME_MODE_END;
return dealerHitCardMessage;
};

//---MAIN FUNCTION----
var main = function (input) {
  var myOutputValue = ``;
  var playerHandMessage = ``;
  if(gameMode == GAME_MODE_PRE_GAME){
    if(input == ``){
      myOutputValue = instructions;
    }else{
      var nameMessage = createUserName(input);
      myOutputValue = nameMessage;
      gameMode = GAME_MODE_INITIAL;
    }
  }else if(gameMode == GAME_MODE_INITIAL){
    var initialHand = dealInitialHand();
    playerScore = calculatePlayerScore(playerHand);
    playerHandMessage = displayPlayerHand(playerHand);
    gameMode = GAME_MODE_HIT_OR_STAND;
    myOutputValue = `${initialHand}<br><br>
    Dealer face up card: ${dealerHand[0].name}<br><br>
    ${playerHandMessage}<br>
    ${userName} score: ${playerScore}`;
  }else if (gameMode == GAME_MODE_HIT_OR_STAND){
    var hitOrStand = playerHitOrStand(input);
    playerScore = calculatePlayerScore(playerHand);
    playerHandMessage = displayPlayerHand(playerHand);
    myOutputValue = `${hitOrStand}<br><br>
    Dealer face up card: ${dealerHand[0].name}<br><br>
    ${playerHandMessage}<br>
    ${userName} score: ${playerScore}`;
    if(playerScore > 21){
      gameMode = GAME_MODE_END;
      myOutputValue = `${userName} busted!`;
    };
  }else if (gameMode == GAME_MODE_END){
    playerScore = calculatePlayerScore(playerHand);
    playerHandMessage = displayPlayerHand(playerHand);
    dealerScore = calculateDealerScore(dealerHand);
    var dealerTurn = dealerHitOrStand(dealerScore);
    var dealerHandMessage = displayDealerHand(dealerHand);
    var gameResult = generateGameResult(playerScore,dealerScore)
    myOutputValue = `${dealerTurn}<br><br>
    ${gameResult}<br><br>
    ${dealerHandMessage}<br>
    Dealer score: ${dealerScore}<br><br>
    ${playerHandMessage}<br>
    ${userName} score: ${playerScore}`
    gameMode = GAME_MODE_INITIAL;
    shuffledDeck = playerHand.concat(dealerHand,shuffledDeck);
    shuffledDeck = shuffleCards(shuffledDeck);
    playerHand = [];
    dealerHand = [];
  };

  return myOutputValue;
};
