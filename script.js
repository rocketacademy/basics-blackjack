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
  var dealerCard1 = shuffledDeck.pop();
  var dealerCard2 = shuffledDeck.pop();
  dealerHand.push(dealerCard1,dealerCard2);

  //player draws 2 cards from shuffled deck
  var playerCard1 = shuffledDeck.pop();
  var playerCard2 = shuffledDeck.pop();
  playerHand.push(playerCard1,playerCard2);

  return `Dealer has ${dealerCard1.name} and ${dealerCard2.name}.<br>
  Player has ${playerCard1.name} and ${playerCard2.name}.<br>`
};

// //generates game result from dealer and player scores
// var generateGameResult = function(){
  
//   //calculate scores of dealer and player 
//   var dealerScore = dealerHand[0].value + dealerHand[1].value
//   var playerScore = playerHand[0].value + playerHand[1].value

//   //compares scores of dealer and player to determine winner
//   if(dealerScore >= playerScore){
//     return `Dealer wins!`
//   }else if(dealerScore < playerScore){
//     return `Player wins!`
//   } else {
//     return `It's a tie.`
//   };
// };

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
var calculatePlayerScore = function(){
  playerScore = 0;
  var playerIndex = 0;
  while (playerIndex < playerHand.length){
    playerScore += playerHand[playerIndex].value;
    playerIndex += 1;
  };
return playerScore;
};

////compares scores of dealer and player to determine winner
var generateGameResult = function(playerScore,dealerScore){
  if(dealerScore >= playerScore ||
    (playerScore >= 21 && dealerScore < 21)){
        return `Dealer wins!`
      }else if(dealerScore < playerScore ||
        (dealerScore >=21 && playerScore < 21)){
        return `Player wins!`
      } else if (dealerScore == playerScore ||
        (dealerScore >= 21 && playerScore >= 21)){
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
  
  if(gameMode == GAME_MODE_INITIAL){
    var initialHand = dealInitialHand();
    dealerScore = calculateDealerScore();
    playerScore = calculatePlayerScore();
    gameMode = GAME_MODE_HIT_OR_STAND;
    myOutputValue = `${initialHand}<br>
    Dealer score: ${dealerScore}<br>
    Player score: ${playerScore}`;
  }else if (gameMode == GAME_MODE_HIT_OR_STAND){
    var hitOrStand = playerHitOrStand(input);
    dealerScore = calculateDealerScore();
    playerScore = calculatePlayerScore();
    myOutputValue = `${hitOrStand}<br>
    Dealer score: ${dealerScore}<br>
    Player score: ${playerScore}`;
    if(playerScore >= 21){
      gameMode = GAME_MODE_END;
      myOutputValue = `Player busted!`;
    }
  }else if (gameMode == GAME_MODE_END){
    var gameResult = generateGameResult(playerScore,dealerScore)
    myOutputValue = `${gameResult}<br>
    Dealer score: ${dealerScore}<br>
    Player score: ${playerScore}`
    gameMode = GAME_MODE_INITIAL;
    shuffledDeck = playerHand.concat(dealerHand,shuffledDeck);
    playerHand = [];
    dealerHand = [];
  };

  return myOutputValue;
};
