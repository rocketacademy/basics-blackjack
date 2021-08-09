
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

//=======================Store player and computer's cards=====================
var playerHand = [];
var computerHand = [];
var maxCardLimit = 21; //max value before bust is 21
var dealerMinValue = 16; // dealer has to minimally deal 16
var gameOver = false;

//=======================Create 52-card deck=====================
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ['hearts', 'diamonds', 'clubs', 'spades'];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];
    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardRank = rankCounter;
      var cardName = rankCounter;
      
      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = 'ace';
        cardRank = 11
      } else if (cardName == 11) {
        cardName = 'jack'
        cardRank = 10;
      } else if (cardName == 12) {
        cardName = 'queen';
        cardRank = 10;
      } else if (cardName == 13) {
        cardName = 'king';
        cardRank = 10
      } 


      // Create a new card with the current name, suit, rank and value
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: cardRank
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
return cardDeck;}


//=======================Get random index=====================
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

//=======================Shuffle cards=====================
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
}
var deck = shuffleCards(makeDeck());//shuffle cards once

//=======================Main function=====================
var main = function (input){
  var myOutputValue = ''
  currentGameMode = GAME_MODE_DEAL_CARDS
  if (gameOver){
    return `Game Over! Hit refresh to play again.`
} else if (!gameOver
  && input == 'hit' || input == 'stand'){
  currentGameMode = GAME_MODE_HIT_OR_STAND
}
return myOutputValue;
}
//=======================Deal cards=====================
 if(currentGameMode == GAME_MODE_DEAL_CARDS){
  var dealCardstoHand = function(hand){
  makeDeck();//run function once to create new deck
  hand.push(deck.pop())
  if (hand.length == 0){
  var dealCardstoHand = deck.pop();
  //click submit to deal cards to player then computer
  dealCardstoHand(playerHand);
  dealCardstoHand(computerHand);
  var declarePlayerHand = `${playerHand.name} of ${playerHand.suit}`
  var declareComputerHand = `${computerHand.name} of ${computerHand.suit}`
  console.log (`player card 1: ${declarePlayerHand}, com card 1: ${declareComputerHand }`)
  //click submit to deal cards to player then computer again
  }
  if (hand.length == 1){
  var dealCardstoHand = deck.pop();
  dealCardstoHand(playerHand);
  dealCardstoHand(computerHand);
  console.log (`player card 2: ${declarePlayerHand}, com card 2: ${declareComputerHand }`)
  }
  if (hand.length == 2){
  currentGameMode == GAME_MODE_HIT_OR_STAND
  console.log(`game mode: ${currentGameMode}`)
  myOutputValue = `Player's cards are ${declarePlayerHand}<br>
  Computer's cards are ${declareComputerHand}.
  Please type 'hit' or 'stand' to decide if you wish to draw cards or end your turn.`
  }
}}
//=======================Determine card total value=====================
var determineCardTotal = function(hand){
  var cardTotal = 0
  var numAces = 0
  var card = hand[0]
  if (hand.length == 2){
    if (card.rank >= 2 && card.rank <=10){
      //ace is 10 if the other card is less than or equal to 10
      cardTotal += card.rank
    } else if (card.rank >= 11 && card.rank <= 13){
      cardTotal += 10; // ace is 11 if other card is jack, queen, king
    } else if (card.rank == 1){
      numAces +=1;
      determineCardTotal +=11
    }
}
return determineCardTotal(hand);
}
//=======================Determine winner=====================
var winner = function (){
  if (determineCardTotal(playerHand) > determineCardTotal(computerHand)
  && playerHand.rank > computerHand.rank){
    myOutputValue = `Player wins!`
  }
  else if (determineCardTotal(computerHand)> determineCardTotal(playerHand)
  && computerHand.rank > playerHand.rank){
    myOutputValue = `Computer wins!`
  }
  return myOutputValue;
}
//=======================Generic Output for hand=====================
var declarePlayerHand = `${playerHand.name} of ${playerHand.suit}`
var declareComputerHand = `${computerHand.name} of ${computerHand.suit}`
var genericOutput = `Player has ${declarePlayerHand} with total value ${determindCardTotal(playerHand)} <br>
    Computer has ${declareComputerHand} with total value ${determineCardTotal(computerHand)}.${winner()}`

//=======================Blackjack logic=====================
var blackJack = function (hand){
  if (hand.length == 2
    && determineCardTotal == maxCardLimit)
    if (blackJack(playerHand)){
      gameOver = true;
      myOutputValue = `Player has blackjack! ${genericOutput}.`
    }else if (blackJack(computerHand)){
      gameOver = true
      myOutputValue = `Computer has blackjack! ${genericOutput}.`
    }
    return myOutputValue;
  }

//=======================Determine if player should hit or stand=====================
if (currentGameMode == GAME_MODE_HIT_OR_STAND){
currentPlayer = PLAYER
console.log(`game mode: ${currentGameMode}`)
if (input != 'hit' && input != 'stand'){
console.log ('input validation')
myOutputValue = `Oops. Please type 'hit' or 'stand' to decide if you wish to draw cards or end your turn.`
}
if (input == 'hit'){
  console.log(`input: ${input}, game mode: ${currentGameMode}`)
  dealCardsToHand(playerHand);
  if (playerHandTotal > maxCardLimit){
  gameOver = true;
  myOutputValue = `Player went bust!`
  }
  else if (playerHandTotal < maxCardLimit)
  myOutputValue = `Player's cards are ${declarePlayerHand}<br>
      Computer's cards are ${declareComputerHand }.
      Please type 'hit' or 'stand' to decide if you wish to draw cards or end your turn.`
} else if (input == 'stand'){
  console.log(`input: ${input}, game mode: ${currentGameMode}`)
  currentPlayer = COMPUTER
  myOutputValue `Player chose to stand. Press submit for Computer's turn.`
}
}

// //=======================Determine if computer should hit=====================
// if (currentGameMode = GAME_MODE_HIT_OR_STAND){
// var determineCardTotal = function(computerHand){
// if (determineCardTotal <= dealerMinValue){
// dealCardsToHand(computerHand);
// computerHandTotal = determineCardTotal(computerHand)
// } if (determineCardTotal > maxCardLimit){
//   gameOver = true;
//   return `Game over! Computer went bust!`
// } else if (input == 'stand' && determineCardTotal > maxCardLimit){
//   gameOver = true
//   return `Game over! Player went bust`
// }
// if (input == 'stand' && determineCardTotal < maxCardLimit){
// currentGameMode = GAME_MODE_DETERMINE_WINNER
// }
// }
// }


  

