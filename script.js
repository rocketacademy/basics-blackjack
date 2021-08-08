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

//calculates dealer score
var calculateDealerScore = function(){
  var dealerScore = 0;
  var dealerIndex = 0;
  while (dealerIndex < dealerHand.length){
    dealerScore += dealerHand[dealerIndex].value;
    dealerIndex += 1;
  };
return `Dealer score: ${dealerScore}`;
};

//calculates player score
var calculatePlayerScore = function(){
  var playerScore = 0;
  var playerIndex = 0;
  while (playerIndex < playerHand.length){
    playerScore += playerHand[playerIndex].value;
    playerIndex += 1;
  };
return `Player score: ${playerScore}`;
};

var main = function (input) {
  var myOutputValue = ``

  if(gameMode == GAME_MODE_INITIAL){
    var initialHand = dealInitialHand();
    var dealerScore = calculateDealerScore();
    var playerScore = calculatePlayerScore();
    myOutputValue = `${initialHand}<br>
    ${dealerScore}<br>
    ${playerScore}`
  };
  
  

  return myOutputValue;
};
