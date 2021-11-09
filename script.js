// Deck is shuffled.
// User clicks Submit to deal cards.
// The cards are analysed for game winning conditions, e.g. Blackjack.
// The cards are displayed to the user.
// The user decides whether to hit or stand, using the submit button to submit their choice.
// The user's cards are analysed for winning or losing conditions.
// The computer decides to hit or stand automatically based on game rules.
// The game either ends or continues.


var createDeck =function (){
  var cardDeck =[];
  var suits =['Spades ♠️', 'Hearts ♥️', 'Clubs ♣️', 'Diamonds ♦️'];
  var suitIndex = 0;
  while (suitIndex < suits.length){
    var currentSuit = suits[suitIndex];
    var rankIndex = 1;
    while (rankIndex <= 13){
      var cardName = rankIndex;
      if (cardName == 1){
        cardName = 'Ace';
      }
      if (cardName == 11){
        cardName = 'Jack';
      }
      if (cardName == 12){
        cardName = 'Queen';
      }
      if (cardName == 13){
        cardName = 'King';
      }
      var card ={
        name : cardName,
        suit : currentSuit,
        rank : rankIndex
      };
      cardDeck.push(card);
      rankIndex += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
}


var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};


var shuffleCards = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex += 1;
  }
  return cardDeck;
};


var createNewDeck = function(){
  var newDeck = createDeck();
  var shuffledDeck = shuffleCards(newDeck);
  return shuffledDeck;
}


var dealerHand =[];
var playerHand =[];
var gameMode = 'start';
var myOutputValue ='';

var checkForBlackJack = function (handArray){
  var playerCard1 = handArray[0];
  var playerCard2 = handArray[1];
  var hasBlackJack = false;
  if ((playerCard1.name == 'Ace' && playerCard2.rank >=10) ||
      (playerCard2.name == 'Ace' && playerCard1.rank >=10) ||
      (playerCard1.name == 'Ace' && playerCard2.rank == 'Ace')){
        hasBlackJack = true;
      }
      return hasBlackJack;
}

var main = function (input) {
var outputMessage = '';

//first click 'submit'
  if (gameMode == 'start'){
    cardDeck = createNewDeck();
    console.log(cardDeck);

    playerHand.push(cardDeck.pop());
    playerHand.push(cardDeck.pop());
    dealerHand.push(cardDeck.pop());
    dealerHand.push(cardDeck.pop());

    console.log(`player hand:`);
    console.log(playerHand);
    console.log(`dealer hand:`);
    console.log(dealerHand);

    gameMode = 'cards drawn';

    var outputMessage = `Player had <br>
                        ${playerHand[0].name} of ${playerHand[0].suit}and <br>
                        ${playerHand[1].name} of ${playerHand[1].suit}<br><br>
                        Computer had <br>
                        ${dealerHand[0].name} of ${dealerHand[0].suit}and <br>
                        ${dealerHand[1].name} of ${dealerHand[1].suit}` 
                        ;
    return outputMessage;
  }
 
//second click 'submit'
  if (gameMode == 'cards drawn'){
    var playerHasBlackJack = checkForBlackJack(playerHand);
    var dealerHasBlackJack = checkForBlackJack(dealerHand);

    console.log (`Does player has blackjack? `, playerHasBlackJack);
    console.log (`Does dealer has blackjack? `, dealerHasBlackJack);


  }
 

  return myOutputValue;
};

