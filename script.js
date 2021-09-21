//Create a standard 52-card deck, from 10.3
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits
  var suits = ["♥️", "♦️", "♣️", "♠️"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }
      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      // Add the new card to the deck
      cardDeck.push(card);
      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }
    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }
  // Return the completed card deck
  return cardDeck;
};

var getRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
};
// Deck is shuffled.
/**
 * Shuffle elements in the cardDeck array. Return the shuffled deck.
 */
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex to shuffle the next pair of cards
    currentIndex += 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

// Initialise the shuffled card deck before the game starts.
var deck = shuffleCards(makeDeck());
var blackjackLimit = 21;
var playerHand = [];
var computerHand = [];

// User clicks Submit to deal cards.
var dealCard = function (){
  playerHand.push(deck.pop());
  computerHand.push(deck.pop());
  playerHand.push(deck.pop());
  computerHand.push(deck.pop());
};

// The cards are analysed for game winning conditions, e.g. Blackjack.
var getHandSum = function(userHand) {
  var numAcesInHand = 0;
  var sum = 0;
  var x = 0
  
  while (x<userHand.length){
    var currentCard = userHand[x];
    if (currentCard.rank >=2 && currentCard.rank <=10){
      sum = sum + currentCard.rank;
    } else if (currentCard.rank >=11 && currentCard.rank <=13){
      sum = sum + 10;
    } else if (currentCard.rank == 1) {
      numAcesInHand = numAcesInHand + 1
      sum = sum + 11
    };
     x +=1;
     console.log(userHand)
  };
  if (sum > blackjackLimit && numAcesInHand > 0){
  x = 0
  while (x < numAcesInHand){
    sum = sum - 10
    x +=1
  if (sum <= blackjackLimit) {
  break;
};
};
};
console.log(sum);
return sum;
};
// The user decides whether to hit or stand, using the submit button to submit their choice.
// The user's cards are analysed for winning or losing conditions.
// The computer decides to hit or stand automatically based on game rules.
// The game either ends or continues.
var MODE_DEAL_CARDS = "deal and display player cards and 1 computer card";
var MODE_HIT_OR_STAND = "get another card or stay"
var MODE_COMPARE_CARD_SUM = "compare sum";
var mode = MODE_DEAL_CARDS;


var printCardsInHand = function(userHand){
  var cardsInHandString = '';
  for(var x=0;x<userHand.length;x+=1){
  cardsInHandString += `[${userHand[x].name} of ${userHand[x].suit}] `;
  }
return cardsInHandString
};


var playerHandSum = 0
var computerHandSum = 0
var computerStandLimit = 17


var main = function (input) {
  // Deal cards
if (mode == MODE_DEAL_CARDS) {
// Show player cards and first computer card
// Ask player whether they want to hit or stand
  dealCard(deck);
  playerHandSum = getHandSum(playerHand);
  computerHandSum = getHandSum(computerHand);
  var myOutputValue = `Your cards are ${playerHand[0].name}, ${playerHand[1].name} with a total of ${playerHandSum} and first computer card is ${computerHand[0].name}. <br><br> Do you want to Hit or Stand? Type your answer and Submit`;
  mode = MODE_HIT_OR_STAND;
// If Hit, deal another card to player and check player hand sum
} else if (mode == MODE_HIT_OR_STAND){
  if (input == 'hit'){
    playerHand.push(deck.pop());
    playerHandSum = getHandSum(playerHand);
        console.log(playerHandSum)
        console.log(blackjackLimit);
        console.log(playerHand);

// If player hand sum is less than 21, ask if they want to Hit or Stand
    if (playerHandSum <= blackjackLimit){
    myOutputValue = `Your cards are ${printCardsInHand(playerHand)} with a total of ${playerHandSum}. <br><br> Hit or Stand?`;
    mode = MODE_HIT_OR_STAND;
// If > than 21, Game over
    } else if (playerHandSum > blackjackLimit){
      myOutputValue = `Your card total is ${playerHandSum}. Game over!`;
    }
// If player chooses to Stand, check computer Hand.
// If less than 17, draw another card.
  } else if (input == 'stand'){
    for(var y = 0; y<= computerHand.length; y+=1){

      if (computerHandSum <= computerStandLimit){
      computerHand.push(deck.pop());
      computerHandSum = getHandSum(computerHand);
        console.log(computerHand)
        console.log(computerHandSum);
// If computer hand sum is greater than 21, player automatically wins.
        if (computerHandSum > blackjackLimit){
        myOutputValue = `Your cards are ${printCardsInHand(playerHand)} with a total of ${playerHandSum}.<br><br> Computer's cards are ${printCardsInHand(computerHand)} with a total of ${computerHandSum}. <br><br> Congratulations, Player wins! <p> Refresh the page to restart the game`;
        };
// If more than 17, Computer automatically stands.
// Compare player hand and computer hand to determine winner.
    } else if(computerHandSum > computerStandLimit){
      if (playerHandSum > computerHandSum){
        myOutputValue = `Your cards are ${printCardsInHand(playerHand)} with a total of ${playerHandSum}.<br><br> Computer's cards are ${printCardsInHand(computerHand)} with a total of ${computerHandSum}. <br><br> Congratulations, Player wins! <p> Refresh the page to restart the game`;
      } else if (playerHandSum < computerHandSum && computerHandSum <= blackjackLimit){
        myOutputValue = `Your cards are ${printCardsInHand(playerHand)} with a total of ${playerHandSum}.<br><br> Computer's cards are ${printCardsInHand(computerHand)} with a total of ${computerHandSum}. <br><br> Boo, Computer wins :( <p> Refresh the page to restart the game`;
      };
    }
    }
  }
}
  return myOutputValue;
};
