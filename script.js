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

//keeps track of game mode - starts with initial
var GAME_MODE_INITIAL = `initial`;
var GAME_MODE_HIT_OR_STAND = `hit or stand`;
var GAME_MODE_END = `end turn`;
var gameMode = GAME_MODE_INITIAL;

//deals initial hand
var dealInitialHand = function(){
  //dealer draws 2 cards from shuffled deck
  var dealerFaceUpCard = shuffledDeck.pop();
  var dealerFaceDownCard = shuffledDeck.pop();
  dealerHand.push(dealerFaceUpCard,dealerFaceDownCard);
  console.log(`dealer hand`,dealerHand);

  //player draws 2 cards from shuffled deck
  var playerCard1 = shuffledDeck.pop();
  var playerCard2 = shuffledDeck.pop();
  playerHand.push(playerCard1,playerCard2);
  console.log(`player hand`,playerHand);

  return `Dealer has ${dealerFaceUpCard.name}.<br>
  Player has ${playerCard1.name} and ${playerCard2.name}.<br>`
};

//keeps track of dealer and player scores
var dealerScore = 0;
var playerScore = 0;

//calculates dealer score
var calculateDealerScore = function(){
  dealerScore = 0;
  var dealerIndex = 0;
  while (dealerIndex < dealerHand.length){
    dealerScore += dealerHand[dealerIndex].value;
    dealerIndex += 1;
  };
return dealerScore;
};

//calculates player score
var calculatePlayerScore = function(playerHand){
  playerScore = 0;
  var playerIndex = 0;
  while (playerIndex < playerHand.length){
    playerScore += playerHand[playerIndex].value;
    playerIndex += 1;
  };
return playerScore;
};

//displays player hand
var displayPlayerHand = function(playerHand){
  var playerHandMessage = `Player hand:<br>`
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
  if(dealerScore >= playerScore ||
    (playerScore > 21 && dealerScore <= 21)){
        return `Dealer wins!`
      }else if(dealerScore < playerScore ||
        (dealerScore > 21 && playerScore <= 21)){
        return `Player wins!`
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
    return `Player chose to ${playerChoice}. Player drew ${playerHitCard.name}.`
  }else if (playerChoice == `stand`){
    gameMode = GAME_MODE_END;
    return `Player chose to ${playerChoice}. End turn.`;
  }else {
    return `You can only choose to hit or stand.`;
  };
};

//---MAIN FUNCTION----
var main = function (input) {
  var myOutputValue = ``;
  var playerHandMessage = ``;
  
  if(gameMode == GAME_MODE_INITIAL){
    var initialHand = dealInitialHand();
    playerScore = calculatePlayerScore(playerHand);
    playerHandMessage = displayPlayerHand(playerHand);
    gameMode = GAME_MODE_HIT_OR_STAND;
    myOutputValue = `${initialHand}<br><br>
    Dealer face up card: ${dealerHand[0].name}<br><br>
    ${playerHandMessage}<br>
    Player score: ${playerScore}`;
  }else if (gameMode == GAME_MODE_HIT_OR_STAND){
    var hitOrStand = playerHitOrStand(input);
    playerScore = calculatePlayerScore(playerHand);
    playerHandMessage = displayPlayerHand(playerHand);
    myOutputValue = `${hitOrStand}<br><br>
    Dealer face up card: ${dealerHand[0].name}<br><br>
    ${playerHandMessage}<br>
    Player score: ${playerScore}`;
    if(playerScore > 21){
      gameMode = GAME_MODE_END;
      myOutputValue = `Player busted!`;
    };
  }else if (gameMode == GAME_MODE_END){
    playerScore = calculatePlayerScore(playerHand);
    playerHandMessage = displayPlayerHand(playerHand);
    dealerScore = calculateDealerScore(dealerHand);
    var dealerHandMessage = displayDealerHand(dealerHand);
    var gameResult = generateGameResult(playerScore,dealerScore)
    myOutputValue = `${gameResult}<br><br>
    ${dealerHandMessage}<br>
    Dealer score: ${dealerScore}<br><br>
    ${playerHandMessage}<br>
    Player score: ${playerScore}`
    gameMode = GAME_MODE_INITIAL;
    shuffledDeck = playerHand.concat(dealerHand,shuffledDeck);
    playerHand = [];
    dealerHand = [];
  };

  return myOutputValue;
};
