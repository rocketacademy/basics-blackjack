// Function 1
// Creates the deck of cards
var makeDeck = function(){
  var deck = [];
  // Create array of four suits and loop through each suit
  var suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  var suitIndex = 0;
  while (suitIndex < suits.length){
    // store current suit in variable
    var currentSuit = suits[suitIndex];
    // For each suit, create the each card
    cardIndex = 1;
    while (cardIndex <= 13){
      var cardName = cardIndex;
      // for special cards, the cardName has to be special
      if (cardName == 1){
        cardName = 'ace';
      } else if (cardName == 11){
        cardName = 'jack';
      } else if (cardName == 12){
        cardName = 'queen';
      } else if (cardName == 13){
        cardName = 'king'
      }
      // create particular card
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: cardIndex,
      };
      // add card to the deck
      deck.push(card);

      cardIndex++;
    }
    suitIndex++;
  }
  return deck;
}

// Function 2
// Shuffles the deck of cards
var shuffleTheDeck = function(inputDeck){
  // loop through every card, and pick a random card to swap with
  var counter = 0;
  while (counter < inputDeck.length){
    // draw the two cards to swap and store in temporary places
    var randomNumber = Math.floor(Math.random() * inputDeck.length);
    var drawnCard = inputDeck[counter];
    var randomCard = inputDeck[randomNumber];
    
    // Swap the card positions
    inputDeck[counter] = randomCard;
    inputDeck[randomNumber] = drawnCard
    counter ++;
  }
  // return the shuffled deck
  return inputDeck;
}

// Function 3
// computes total value of hand
var sumHand = function(initialInput){
  var inputArray = initialInput; // to avoid modifying the original hand order
  var totalSum = 0;

  // if there is an ace, this has to be considered LAST. swap with last card
  for (var j = 0; j < inputArray.length; j++){
    if (inputArray[j].rank == 1){
      var tempHolder = inputArray[inputArray.length - 1];
      inputArray[inputArray.length - 1] = inputArray[j];
      inputArray[j] = tempHolder;
    }
  }

  // loop through and add the cards
  for (var i = 0; i < inputArray.length; i++){
    // console.log(i);
    // console.log(inputArray[i].rank);
    if (inputArray[i].rank > 10){
      // add 10 if it is a picture card
      // console.log('10');
      totalSum += 10;
    } else if (inputArray[i].rank > 1) {
        totalSum += inputArray[i].rank;
    } else if (inputArray[i].rank == 1){
        // console.log('ace');
        if (totalSum < 11){
          totalSum += 11;
        } else {
          totalSum += 1;
        }
    }
  }
  return totalSum;
} 

// Function 4
// prints out and computes results
var printHandOutcome = function(playerHandArray, person){
  var cardsPrint = `--- ${person}\'s cards --- `;
  for (var i = 0; i < playerHandArray.length; i++){
    cardsPrint = cardsPrint + '<br>' + playerHandArray[i].name 
    + ' of ' + playerHandArray[i].suit;
  }
  cardsPrint = cardsPrint + '<br><br>' + `--- ${person}\'s Total Value ---`
    + '<br>' + sumHand(playerHandArray);
  
  return cardsPrint;
}

// Function 5
// Check if player wins or loses
var checkWin = function(playerSum, dealerSum, currentGameMode){
  var outcome;

  if (currentGameMode == 'playerTurn'){

    if (sumHand(playerSum) == 21) {
      // game mode playerturn and player gets 21 = win
      console.log('The player scored a perfect 21');
      outcome = 'win';
    } else if (sumHand(playerSum) > 21) {
      // game mode playerturn and player busts = lose
      console.log('The player busted!')
      outcome = 'lose';
    } else if (sumHand(playerSum)< 21){
      // game mode playerturn and player doesn't bust = continue
      outcome = 'continue';
      console.log('The player is still safe. He can sit or stand.')
    } else {
      outcome = 'tie';
      console.log('There was a tie. Interesting.')
    }

  } else if (currentGameMode == 'dealerTurn'){
    
    if (sumHand(dealerSum) > 21){
      // game mode dealerturn and dealer busts = win
      console.log('The dealer overdrew and busted.')
      outcome = 'win';
    } else if (sumHand(dealerSum) < sumHand(playerSum)){
      // game mode dealerturn and player > dealer = win
      console.log('Everyone opens their hands. The player had ' + sumHand(playerHand) + ' while the dealer had ' + sumHand(dealerHand));
      console.log('Player beat dealer. Player wins') 
      outcome = 'win';
    } else if (sumHand(dealerSum) > sumHand(playerSum)){
      // game mode dealerturn and player < dealer = lose
      console.log('Everyone opens their hands. The player had ' + sumHand(playerHand) + ' while the dealer had ' + sumHand(dealerHand));
      console.log('Dealer beat player. Dealer wins') 
      outcome = 'lose';
    } else {
      outcome = 'tie';
      console.log('There was a tie. Interesting.')
    }
  }
  return outcome;
}

// Step 0: Declare variables, set default game mode
var gameMode = 'dealCards';
playerHand = [];
dealerHand = [];

// Step 1: Create a new deck of cards
var mainDeck = makeDeck();

// Step 2: Shuffle that deck of cards
mainDeck = shuffleTheDeck(mainDeck);


// MAIN FUNCTION
// Each gameplay turn is represented by the main function
// Used console logs to tell story
var main = function (input) {
  var myOutputValue;

  // Step 3: Deal to player, dealer, player, dealer
  if (gameMode == 'dealCards'){
    playerHand.push(mainDeck.pop());
    dealerHand.push(mainDeck.pop());
    playerHand.push(mainDeck.pop());
    dealerHand.push(mainDeck.pop());
    
    gameMode = 'playerTurn';

    myOutputValue = 'PLAYER TURN <br><br>' 
    + printHandOutcome(playerHand, 'Player')
    + '<br><br>' + 'input (hit/stand)';
    // story
    console.log('The cards were dealt');
    console.log('Player scored: ' + sumHand(playerHand));
  }

  // Step 5: user HITS during player mode (get another card)
  if (gameMode == 'playerTurn' && input == 'hit'){
    playerHand.push(mainDeck.pop());
    myOutputValue = 'PLAYER TURN <br><br>' 
    + printHandOutcome(playerHand, 'Player')
    + '<br><br>' + 'input (hit/stand)';
    // story
    console.log('Player hit. His hand is now: ' + sumHand(playerHand));
  }

  // Step 6: user STANDS during player mode. Dealer's turn
  if (gameMode == 'playerTurn' && input == 'stand'){
    console.log('Player stand. His hand is now: ' + sumHand(playerHand));
    console.log('Dealer opens his cards. He has ' + sumHand(dealerHand));
    gameMode = 'dealerTurn';
    while ( sumHand(dealerHand) < 16 ){
      dealerHand.push(mainDeck.pop());
      console.log('The dealer hand was less than 16. He drew another card. He now has ' + sumHand(dealerHand));
    }
    console.log('The dealer can no longer draw cards.')
  }

  // Step 7: Update myOutputValue if the player wins or loses
  if (checkWin(playerHand, dealerHand, gameMode) == 'win'){
    myOutputValue = "💰💰💰 YOU WIN!! :) <br><br>";
    myOutputValue = myOutputValue
    + printHandOutcome(playerHand, 'player')
    + '<br><br>' 
    + printHandOutcome(dealerHand, 'Dealer');

  } else if (checkWin(playerHand, dealerHand, gameMode) == 'lose'){
    myOutputValue = "💸💸💸 YOU LOSE :( <br><br>";
    myOutputValue = myOutputValue
    + printHandOutcome(playerHand, 'player')
    + '<br><br>'
    + printHandOutcome(dealerHand, 'Dealer');
  } else if (checkWin(playerHand, dealerHand, gameMode) == 'tie'){
    myOutputValue = "!! TIE !!<br> 'no one won' <br><br>";
    myOutputValue = myOutputValue
    + printHandOutcome(playerHand, 'player')
    + '<br><br>'
    + printHandOutcome(dealerHand, 'Dealer');
  }

  return myOutputValue;
};