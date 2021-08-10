// define all global variables here 
var playerHand = [] 
var computerHand = [] 
var playerCard1 ; 
var playerCard2 ; 
var compCard1 ; 
var compCard2 ;
var shuffledDeck ;
var myOutputValue = '';
var currentMode = ''; 
var add1stCardToPlayer = '';
var addCardToComp = ''; 
var playerPointsTotal = '';
var compPointsTotal = '';
var add2ndCardToPlayer = '' ;

// ---------------- main function -----------------
var main = function (input) {

// input conditions here to output when page first loads game mode and input blank 
if (currentMode == '' && input == ''){
  // deal 2 cards 
  deal = firstDeal () ; 
  console.log ('check current mode '+currentMode) 
}

  // check for blackjack, else show player their cards
  if (currentMode == '' && input == '' && playerCard1.rank + playerCard2.rank == 21){
  return myOutputValue = "Player gets blackjack! Player drew "+playerCard1.name+' of '+playerCard1.suit+
  ' and '+playerCard2.name+' of '+playerCard2.suit+'.'
} else if (currentMode == '' && input == '' && compCard1.rank+compCard2.rank == 21){
  return myOutputValue = "Computer gets blackjack! Computer drew "+compCard1.name+' of '+compCard1.suit+
  ' and '+compCard2.name+' of '+compCard2.suit+'.' 
} else if (currentMode == '' && input == '' && playerCard1.rank + playerCard2.rank != 21){
  currentMode = 'start'
  return myOutputValue = "Player drew "+playerCard1.name+' of '+playerCard1.suit+
  ' and '+playerCard2.name+' of '+playerCard2.suit+'.'+'<br><br><br>'+'Please choose to hit or stand.'
}

// hit and stand modes only activate when currentmode is start 
if (currentMode == 'start' && input == 'hit'){
 return hitMe (input);
} else if (currentMode == 'start' && input == 'stand'){
  return standHere (input);
}
// choose whether to reinitialize game -> switch current mode again 

return myOutputValue; 
}; 


// player chooses to hit -> only adds one card
var hitMe = function (input){
  add1stCardToPlayer = shuffledDeck.pop()
  playerPointsTotal = playerCard1.rank + playerCard2.rank + add1stCardToPlayer.rank 
  if (playerPointsTotal > 21 && currentMode == 'start'){
    return 'Computer wins you have exploded.'+'<b><br>'+'Computer\'s cards are: '
    +compCard1.name+' of '+compCard1.suit+' and '+compCard2.name+' of '+compCard2.suit+'.'
    +'<br><br>'+'Your cards are: '+playerCard1.name+' of '+playerCard1.suit+
    ', '+playerCard2.name+' of '+playerCard2.suit+' and '+add1stCardToPlayer.name+' of '+add1stCardToPlayer.suit+'.'
  } else if (playerPointsTotal <= 21 && currentMode == 'start'){
    currentMode = 'hitting'
    return 'Your total points now is '+playerPointsTotal+'.'+'<br><br>'+
    'Do you want to take another card? Y/N' 
  } // this part does not work 
 else{
  return yesNoHit (input) ;
  }
}

// this does not run 
var yesNoHit = function (input){
  if (input == 'Y' && currentMode == 'hitting'){
    add2ndCardToPlayer = shuffledDeck.pop()
    playerPointsTotal += add2ndCardToPlayer.rank
    return 'Your total points now is '+playerPointsTotal+'.'+'<br><br>'+
    'Do you want to take another card? Y/N' 
  } else {
    return 'Computer\'s turn' 
  }
}

// player choose to stand -> add one card only for computer
// condition to only take more cards if less than 17
var standHere = function (input) {
  if (compCard1.rank + compCard2.rank <= 17){
  addCardToComp = shuffledDeck.pop() 
  compPointsTotal = compCard1.rank + compCard2.rank + addCardToComp.rank 
  } else if (compCard1.rank + compCard2.rank >= 18) {
  compPointsTotal = compCard1.rank + compCard2.rank 
  }
// need to resolve the undefined of undefined if no cards are added 
  if (compPointsTotal > 21 || compPointsTotal < playerPointsTotal) {
    return 'Player wins. Player\'s cards are: '+playerCard1.name+' of '+playerCard1.suit+
    ' and '+playerCard2.name+' of '+playerCard2.suit+'.'+'<br><br>'+
    'Computer\'s cards are: '+ compCard1.name+' of '+compCard1.suit+
    ', '+compCard2.name+' of '+compCard2.suit+' and '+addCardToComp.name+' of '+addCardToComp.suit+'.'
  } else if (compPointsTotal > playerPointsTotal && compPointsTotal <= 21) {
    return 'Computer wins. Player\'s cards are: '+playerCard1.name+' of '+playerCard1.suit+
    ' and '+playerCard2.name+' of '+playerCard2.suit+'.'+'<br><br>'+
    'Computer\'s cards are: '+ compCard1.name+' of '+compCard1.suit+
    ', '+compCard2.name+' of '+compCard2.suit+' and '+addCardToComp.name+' of '+addCardToComp.suit+'.'
  }
}

// dealing of first hand 
var firstDeal = function () {
  playerCard1 = shuffledDeck.pop() ;
  playerCard2 = shuffledDeck.pop() ;
  compCard1 = shuffledDeck.pop() ;
  compCard2 = shuffledDeck.pop() ;
  return firstDeal;
};


// make deck of cards 
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
      var cardName = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = 'ace';
      } else if (cardName == 11) {
        cardName = 'jack';
      } else if (cardName == 12) {
        cardName = 'queen';
      } else if (cardName == 13) {
        cardName = 'king';
      }

      if (suits == 'hearts'){
        currentSuit = '❤️'
      } else if (suits == 'diamonds') {
        currentSuit = '♦️'
      } else if (suits == 'clubs') {
        currentSuit = '♣️'
      } else if (suits == 'spades') {
        currentSuit = '♠️'
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

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
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
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

// generates a shuffled deck at page load 
var shuffledDeck = shuffleCards(makeDeck());