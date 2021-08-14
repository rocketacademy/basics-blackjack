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
var handMessage ;
var dealIndex;

// ---------------- main function -----------------
var main = function (input) {

// input conditions here to output when page first loads game mode and input blank 
if (currentMode == '' && input == ''){
  // deal 2 cards 
  deal = firstDeal () ; 
  playerPointsTotal = sumArray (playerHand);
  compPointsTotal = sumArray (computerHand); 
  console.log ('check current mode '+currentMode) 
}

  // check for blackjack, else show player their cards
  if (currentMode == '' && input == '' && checkForAce(playerHand)> -1 && playerPointsTotal + 10 == 21){
   myOutputValue = "Player gets blackjack! Player drew "+handyMessage(playerHand)+'.'
   reset ();
} else if (currentMode == '' && input == '' && checkForAce(computerHand)> -1 && compPointsTotal + 10 == 21){
  myOutputValue = "Computer gets blackjack! Computer drew "+handyMessage(computerHand)+'.' 
  reset ();
} else if (currentMode == '' && input == '' && playerPointsTotal != 21){
  currentMode = 'start'
   myOutputValue = "Player drew "+handyMessage(playerHand)+'<br><br><br>'+'Please choose to hit or stand.'
}

// hit and stand modes only activate when currentmode is start 
if ((currentMode == 'start' && input == 'hit')){
 myOutputValue = hitMe (input);
} else if (currentMode == 'start' && input == 'stand'){
  myOutputValue = standHere (input);
} else if (currentMode == 'hitting'){
  myOutputValue = yesNoHit (input) ; 
}

return myOutputValue; 
}; 


// player chooses to hit 
var hitMe = function (input){
  var hitMeMessage = '' ;
  add1stCardToPlayer = shuffledDeck.pop()
  playerHand.push (add1stCardToPlayer); 
  console.log ('card when hit', add1stCardToPlayer)
  console.log ('player hand after hitting', playerHand)
  playerPointsTotal = sumArray (playerHand);
  playerMessage = handyMessage(playerHand);
  compMessage = handyMessage(computerHand); 
  if (playerPointsTotal > 21 && (currentMode == 'start' || currentMode == 'hitting')){
    hitMeMessage = 'Computer wins you have exploded.'+'<b><br>'+'Computer\'s cards are: '
    +compMessage+'.'+'<br><br>'+'Your cards are: '+handyMessage (playerHand)+'.'
    reset ();
  } else if (playerPointsTotal <= 21 && currentMode == 'start'){
    currentMode = 'hitting'
    hitMeMessage = 'Your cards now are: '+'<br<br>'+playerMessage+'<br><br>'+'Your total points now is '+playerPointsTotal+'.'+'<br><br>'+
    'Do you want to take another card? Y/N' 
  } else if (playerPointsTotal <= 21 && currentMode == 'hitting'){
  hitMeMessage = yesNoHit (input) ;
  } 
  return hitMeMessage; 
}

// function to return yes or no to take more cards (capped at 5 dragon)
var yesNoHit = function (input){
  var yesNoMessage = '' ;
  if (input == 'Y' && currentMode == 'hitting'){
    add1stCardToPlayer = shuffledDeck.pop()
    playerHand.push (add1stCardToPlayer); 
    console.log ('yes to taking card', add1stCardToPlayer)
    console.log ('player hand', playerHand)
    playerPointsTotal = sumArray (playerHand);
    console.log ('hitting', playerPointsTotal)
  
    if (playerPointsTotal <= 21 && currentMode == 'hitting' && playerHand.length <= 4){
      yesNoMessage = 'Your total points now is '+playerPointsTotal+'.'+'<br><br>'+
      'Do you want to take another card? Y/N' 
    } else if (playerPointsTotal <= 21 && currentMode == 'hitting' && playerHand.length >= 5){
      yesNoMessage = "YOU WIN 🐉🔥🐉🔥🐉🔥🐉🔥🐉🔥"
      reset ();
    }else {
      yesNoMessage = "you ded. game ends"
      reset ();
    } 
  } // this is to run computer taking cards after player's turn ends
  else if (input == 'N' && currentMode == 'hitting'){  
    currentMode = 'computer'; 
    yesNoMessage = standHere() ;
}

return yesNoMessage ;
}; 


// player choose to stand 
// computer to only take more cards if less than 17
var standHere = function (input) {
  var standMessage = '' ; 
  
  // loop starts here 
  compPointsTotal = sumArray(computerHand);
  console.log ('computer points b4 loop', compPointsTotal)
  if (compPointsTotal <= 17){
    dealIndex = computerHand.length ; 
    while (dealIndex < 5 && compPointsTotal <= 17){
      addCardToComp = shuffledDeck.pop()
      computerHand.push (addCardToComp); 
      console.log ('auto take card', addCardToComp)
      console.log ('computer hand', computerHand)
      console.log ('computer points in loop', compPointsTotal)
      compPointsTotal = sumArray (computerHand);
      dealIndex += 1;
  } if (compPointsTotal >= 18) {
    dealIndex = 5; 
  } else {
    dealIndex = 5;
  } 
}

  if (compPointsTotal > 21 || compPointsTotal < playerPointsTotal) {
    standMessage = 'Player wins.'+'<Br><br>'+'Player\'s cards are: '+'<Br<br>'+handyMessage(playerHand)+'.'+'<br><br>'+
    'Computer\'s cards are: '+ handyMessage(computerHand)+'.'
    reset ();
  } else if (compPointsTotal > playerPointsTotal && compPointsTotal <= 21) {
    standMessage = 'Computer wins.'+'<Br><br>'+'Player\'s cards are: '+'<Br<br>'+handyMessage(playerHand)+'.'+'<br><br>'+
    'Computer\'s cards are: '+handyMessage(computerHand)+'.'
    reset ();
  } else if (compPointsTotal = playerPointsTotal) {
    standMessage = 'DRAW. lame.'+'<Br><br>'+'Player\'s cards are: '+handyMessage(playerHand)+'.'+'<br><br>'+
    'Computer\'s cards are: '+handyMessage(computerHand)+'.'
    reset ();
  }
  return standMessage ; 
};


// reinitialize game to start 
var reset = function () {
  playerHand = [];
  computerHand = [];
  currentMode = ''; 
  playerPointsTotal = ''; 
  compPointsTotal = '';
}; 

// function to check for ace 
var checkForAce = function (a) {
  aceArray = a;
  var getIndexOfAce = aceArray.findIndex((x) => x.name === "ace");
  if (getIndexOfAce > -1) {
    return getIndexOfAce;
  }
};

// generic function to sum hand arrays
var sumArray = function (a) {
  var array = a;
  var sum = 0;
  var sumIndex = 0;
  while (sumIndex < array.length) {
    sum += array[sumIndex].rank;
    sumIndex += 1;
  }
  sumIndex = 0;
  return sum;
};

// generic function to return output message w drawn cards 
var handyMessage = function (a) {
  var handMsgArray = a;
  var handMsgIndex = 0;
  var handMessage = "";
  while (handMsgIndex < handMsgArray.length) {
    handMessage += `${handMsgArray[handMsgIndex].name} of ${handMsgArray[handMsgIndex].suit}<br>`;
    handMsgIndex += 1;
  }
  return handMessage;
};

// dealing of first hand 
var firstDeal = function () {
  playerCard1 = shuffledDeck.pop() ;
  playerCard2 = shuffledDeck.pop() ;
  compCard1 = shuffledDeck.pop() ;
  compCard2 = shuffledDeck.pop() ;
  playerHand.push (playerCard1, playerCard2); 
  computerHand.push (compCard1,compCard2); 
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
      var rank = rankCounter; 

      


      // // Create a new card with the current name, suit, and rank
      // var card = {
      //   name: cardName,
      //   suit: currentSuit,
      //   rank: rankCounter,
      // };

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = 'ace';
      } else if (cardName == 11) {
        cardName = 'jack';
        rank = 10
      } else if (cardName == 12) {
        cardName = 'queen';
        rank = 10 
      } else if (cardName == 13) {
        cardName = 'king';
        rank = 10 
      }


      if (currentSuit == 'hearts'){
        currentSuit = '❤️'
      } else if (currentSuit == 'diamonds') {
        currentSuit = '♦️'
      } else if (currentSuit == 'clubs') {
        currentSuit = '♣️'
      } else if (currentSuit == 'spades') {
        currentSuit = '♠️'
      }

    // Create a new card with the current name, suit, and rank
    var card = {
      name: cardName,
      suit: currentSuit,
      rank: rank,
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