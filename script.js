
//objective is to get blackjack, or get higher value (>=16 and <= 21)
//deck is shuffled and 2 cards are dealt to player and computer
//if card value is below 16, initiate deal card again
//if card value is 21, card limit is reached
//if card value is > 21, bust
//if two cards are drawn and one is A while the other is J,Q or K, blackjack
//winner is the first to get blackjack, or has higher value

var GAME_MODE_DEAL_CARDS = 'deal'
var GAME_MODE_HIT_OR_STAND = 'hit or stand' // ask for another card or next turn
var GAME_MODE_DETERMINE_WINNER = 'winner' // compare card values to determine winner
var PLAYER = 'player'
var COMPUTER = 'computer'
var currentGameMode = GAME_MODE_DEAL_CARDS; //initialise dealing of cards
var currentPlayer = 'player'
var gameOver = false;

//=======================Create 52-card deck=====================
var makeDeck = function () {
  // create the empty deck at the beginning
  var deck = [];
  var suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // make a variable of the current suit
    var currentSuit = suits[suitIndex];
    // loop to create all cards in this suit
    // rank 1-13
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;

      // 1, 11, 12 ,13
      if (cardName == 1) {
        cardName = 'ace';
      } else if (cardName == 11) {
        cardName = 'jack';
      } else if (cardName == 12) {
        cardName = 'queen';
      } else if (cardName == 13) {
        cardName = 'king';
      }

      // make a single card object variable
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // add the card to the deck
      deck.push(card);
      rankCounter = rankCounter + 1;
      console.log(rankCounter)
    }
    suitIndex = suitIndex + 1;
    console.log(suitIndex)
  }
  return deck;
};

var getRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
};

var shuffleCards = function (cards) {
  var index = 0;

  while (index < cards.length) {
    var randomIndex = getRandomIndex(cards.length);
    var currentItem = cards[index];
    var randomItem = cards[randomIndex];
    cards[index] = randomItem;
    cards[randomIndex] = currentItem;
    index = index + 1;
  }

  console.log(cards)
  return cards;
};
//=======================Shuffle cards once=====================
var deck = makeDeck();
var shuffledDeck = shuffleCards(deck);

// Return a string of ranks and suits of cards in the hand array
var printCards = function (hand) {
  var returnString = '';
  // Iterate until hand.length - 1 so we can avoid the extra comma at the end of return string
  for (var i = 0; i < hand.length - 1; i += 1) {
    var newCard = `${hand[i].name} of ${hand[i].suit}`
    returnString = returnString + ',' + newCard;
  }
  return returnString;
};

//deal cards to hands
var dealCardToHand = function () {
  for (var i = 0; i < 2; i ++) {
    hand.push(shuffledDeck.pop())
  }
  return hand;
};

//=======================Store player and computer's cards=====================
var playerHand = [];
var computerHand = [];
let maxCardLimit = 21; //max value before bust is 21
let dealerMinValue = 16; // dealer has to minimally deal 16
let numOfCards = 0;
//=======================Main function=====================
var main = function (input){
  var myOutputValue = '';
  currentGameMode = GAME_MODE_DEAL_CARDS
  var genericOutput = `Your cards: ${printCards(playerHand)} <br>Computer's cards: ${printCards(computerHand)}.`
  // draw one new card for player and computer each
  playerHand.push(shuffledDeck.pop())
  computerHand.push(shuffledDeck.pop())
  // generate another card for each player
  playerHand.push(shuffledDeck.pop())
  computerHand.push(shuffledDeck.pop())
  if (playerHand.length == 2){ 
    currentGameMode == GAME_MODE_HIT_OR_STAND
    console.log(`game mode: ${currentGameMode}`)
    console.log (`player hand ${printCards(playerHand)}, com hand: ${printCards(computerHand)}`)
    myOutputValue = `${genericOutput}<br>
    Please type 'hit' or 'stand' to decide if you wish to draw cards or end your turn.`
    }
//=======================Determine if player hits or stands=====================
if (input.toLowerCase().includes('hit')){
  currentGameMode = GAME_MODE_HIT_OR_STAND
  currentPlayer = PLAYER
  console.log(`input: ${input}, game mode: ${currentGameMode}`)
  // draw one card for player and computer each
  playerHand = dealCardToHand(deck)
  // add new card to player's hand array
  playerHand.push(deck.pop())
  if (cardTotalSum > maxCardLimit){
  gameOver = true;
  myOutputValue = `${genericOutput}<br>Player went bust! Hit refresh to start again.`
  }
  else if (cardTotalSum < maxCardLimit)
  myOutputValue = `${genericOutput}<br>Please type 'hit' or 'stand' to decide if you wish to draw cards or end your turn.`
  }
if (input.toLowerCase().includes('stand')){
  currentGameMode = GAME_MODE_HIT_OR_STAND
  console.log(`input: ${input}, game mode: ${currentGameMode}`)
  currentPlayer = COMPUTER
  myOutputValue = `${genericOutput}<br>Player chose to stand. Press submit for Computer's turn.`
}
return myOutputValue;
}

//=======================Determine winner=====================
var winner = function (){
  if (playerCard.rank > computerCard.rank
    && input.toLowerCase().includes('stand')){
    myOutputValue = `You win! Hit refresh to play again.`
  } 
  if (computerCard.rank > playerCard.rank
    && input.toLowerCase().includes('stand')){
    myOutputValue = `You lose! Hit refresh to play again.`
  } 

}

//=======================Calculate sum total of cards=====================
var calcHandTotal = function (hand){
  var cardTotalSum = 0;
  for (var i = 0; i < hand.length; i+=1){
    var cardTotalSum = cardTotalSum + hand[i].value;
  }
  return cardTotalSum;
}

var playerHandTotal = 0;
var comHandTotal = 0;
console.log (`player total: ${playerHandTotal}, com total: ${comHandTotal}`)
// generate total value of hands
playerHandTotal = calcHandTotal(playerHand)
computerHandTotal = calcHandTotal(computerHand)
//=======================Blackjack logic=====================
var blackJack = function (){
  var myOutputValue = ''
  //player has blackjack
  if (playerHand.length == 2 
    && cardTotalSum == maxCardLimit){
      console.log('blackjack')
    if (blackJack(playerHand)){
      gameOver = true;
      myOutputValue = `Player has blackjack! ${genericOutput}.`
  }
} if (computerHand.length == 2
  && cardTotalSum == maxCardLimit){
    console.log('com blackjack')
    if (blackJack(computerHand)){
    gameOver = true
    myOutputValue = `Computer has blackjack! ${genericOutput}.`
  }
}
}
//=======================Determine whether ace is 1 or 11 =====================  
if (playerHand.length == 2 || computerHand.length == 2){
if (card.rank >= 2 && card.rank <=10){
//ace is 10 if the other card is less than or equal to 10
cardTotalSum += card.rank
} else if (card.rank >= 11 && card.rank <= 13){
cardTotalSum += 10; // ace is 11 if other card is jack, queen, king
} else if (card.rank == 1){
numAces +=1;
cardTotalSum +=11
}
}

//=======================Determine if computer hits or stands=====================
if (currentPlayer == COMPUTER &&
  currentGameMode == GAME_MODE_HIT_OR_STAND){
    var computerHitOrStand = function (){
    console.log ('com hit or stand')
    if (computerHand.length >= 2){
      if (cardTotalSum < dealerMinValue){
        // draw one card for player and computer each
       var newComputerCard = shuffledCardDeck.pop();
      // add new card to player's hand and com's hand arrays
       computerHand.push(newComputerCard)
        myOutputValue = `Computer chose to hit. ${genericOutput}. ${winner()}`
      }
      if (cardTotalSum > maxCardLimit){
        gameOver = true;
        myOutputValue = `Computer chose to hit. ${genericOutput}. <br>Computer went bust! Hit refresh to start again.`
      }
      myOutputValue = `${genericOutput}`
  }
}
  }
