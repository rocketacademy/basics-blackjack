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
        name: cardName + ` of ` + currentSuit,
        suit: currentSuit,
        rank: rankCounter,
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

var main = function (input) {

  //dealer draws 2 cards from shuffled deck
  var dealerCard1 = shuffledDeck.pop();
  var dealerCard2 = shuffledDeck.pop();

  //player draws 2 cards from shuffled deck
  var playerCard1 = shuffledDeck.pop();
  var playerCard2 = shuffledDeck.pop();

  //output cards drawn by dealer and player
  var myOutputValue = `Dealer has ${dealerCard1.name} and ${dealerCard2.name}.<br>
  Player has ${playerCard1.name} and ${playerCard2.name}.<br>`;

  //compare scores of dealer and player to determine winner
  var dealerScore = dealerCard1.rank + dealerCard2.rank
  var playerScore = playerCard1.rank + playerCard2.rank
  if(dealerScore >= playerScore){
    myOutputValue = myOutputValue + `Dealer wins!`
  }else if(dealerScore < playerScore){
    myOutputValue = myOutputValue + `Player wins!`
  } else {
    myOutputValue = myOutputValue + `It's a tie.`
  };
  
  return myOutputValue;
};
