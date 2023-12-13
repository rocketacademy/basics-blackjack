/*
Introduction
Implement a simplified version of Blackjack. If you're not familiar with Blackjack, refer to this video for game rules. Our simplified rules are the following. Please read all the requirements before starting it!
There will be only two players. One human and one computer (for the Base solution).
The computer will always be the dealer.
Each player gets dealt two cards to start.
The player goes first, and decides if they want to hit (draw a card) or stand (end their turn).
The dealer has to hit if their hand is below 17.
Each players' score is the total of their card ranks. Jacks/Queen/Kings are 10. Aces can be 1 or 11.
The player who is closer to, but not above 21 wins the hand.

Base
Gameplay Description
The main function runs on each player's turn. The sequence of actions in the game might be the following.
Deck is shuffled.
User clicks Submit to deal cards.
The cards are analysed for game winning conditions, e.g. Blackjack.
The cards are displayed to the user.
The user decides whether to hit or stand, using the submit button to submit their choice.
The user's cards are analysed for winning or losing conditions.
The computer decides to hit or stand automatically based on game rules.
The game either ends or continues.


*/

var CARDS_TAKEN = 0;
var NUM_OF_PLAYER = 3;
var PLAYER_DRAW
var CARDS_DRAW_DROM_DECK = []
var DEALER_DRAW = []
var PLAYER_DRAW = []

function reset (){
  //CARDS_TAKEN = 0;
  //NUM_OF_PLAYER = 3;
  //PLAYER_DRAW
  //CARDS_DRAW_DROM_DECK = []
  DEALER_DRAW = []
  PLAYER_DRAW = []  
}

// deck algorithm
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ['spades', 'hearts', 'clubs','diamonds'];

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

      // Create a new card with the current name, suit, and rank
      var cards = {player : "", card: {name: cardName,suit: currentSuit,rank: rankCounter}
      };

      // Add the new card to the deck
      cardDeck.push(cards);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // Return the completed card deck
  return cardDeck;
};


// shuffle deck
var shuffledDeck = function(){
  // shuffle the card's index
  let deck = makeDeck()
  let shuffled = deck.sort(() => Math.random() - 0.5)
  return shuffled
}

//draw card. draw from the top array CARDS_TAKEN + 1 // i have to find a way to get alternating cards
var drawCard = function(){
  CARDS_TAKEN += 1
  shuffle = shuffledDeck()
  draw = shuffle.splice(0, 1)
  DECK = shuffle
  CARDS_DRAW_DROM_DECK.push(draw)
  return draw;
}

//player block
// in player block
/*
1. player gets 2 cards
2. player goes before dealer. choose to hit or stand
3. return player sum
*/
// var player = function(){
//   let card_A = cardValue()
//   let card_B = cardValue()
//   console.log(card_A)
//   console.log(card_B)
//   //assign function to variable so as to not draw another card
//   return [card_A, card_B]
// if player hit
var hit = function(){
  let hit_card = drawCard()
  console.log(hit_card)
  return [hit_card]
}

var stand = function(){
  return NaN
}


function evaluateCards(name){
  // var suits = ['jack', 'queen', 'king'];
  if(name == 'jack' || name == 'queen' || name == 'king'){
    return 10;
  }
  else if(name == 'ace'){
    return 11;
  }
  else{
    return name;
  }
}

function alternate(num01, num02){
  if(num01 == num02 ){
    num01 = 0
    return num01
  } 
  else {
    return num01
  }
}

var playersDraw = function (input) {
  //local var
  var draw01 = [], player = 0, dealerIndex = [], playerIndex = [], playerArray = [], playerTotal = 0;
  //player draw
  for(i = 0; i < NUM_OF_PLAYER * 2; i++){
    for(j = 0; j < 1; j++){
      draw01.push(drawCard())
      player += 1
      if(player == NUM_OF_PLAYER + 1){
        player = 1  
      }
      draw01[i][0].player = player 
      // 
      if(draw01[i][0].player == NUM_OF_PLAYER){
        draw01[i][0].player = 'dealer'  
      }
        // PLAYER_DRAW.push({total : 0, first: draw01[player - 1], second: draw01[(player * 2) - 1]})
      // console.log(draw01)
      // console.log(draw01.length) 
    }  
  }
  for(i = 0; i < draw01.length; i++){
    if(draw01[i][0].player == 'dealer' ){
      // console.log("Dealer Index: " + draw01.indexOf(draw01[i]))
      dealerIndex.push(draw01.indexOf(draw01[i]))    
    }
    else{
      // console.log("Player Index: " + draw01.indexOf(draw01[i]))
      playerIndex.push(draw01.indexOf(draw01[i]))    
    }
  }
  // console.log(dealerIndex)
  // console.log(playerIndex)
  // console.log(draw01)
  var total = evaluateCards(draw01[dealerIndex[0]][0].card.name) + evaluateCards(draw01[dealerIndex[1]][0].card.name) 
  DEALER_DRAW.push({total : total, first: draw01[dealerIndex[0]], second: draw01[dealerIndex[1]]})
  players = NUM_OF_PLAYER -1
  for(i = 0; i < playerIndex.length / 2; i++){
    playerTotal = evaluateCards(draw01[playerIndex[i]][0].card.name) + evaluateCards(draw01[playerIndex[i + players]][0].card.name)
    // console.log(i)
    // console.log(playerTotal)
    //i have to put this in a player : "", index: []
    PLAYER_DRAW.push({total : playerTotal, first: draw01[playerIndex[i]], second: draw01[playerIndex[i + players]]})
  }
}


var getResult = function(){
  //local var
  var playerResult, output = [];
  // initiate draw
  playersDraw()
  // 
  for(i = 0; i < PLAYER_DRAW.length; i++){
    // console.log(PLAYER_DRAW[i])
    // traverse to player total
    playerResult = PLAYER_DRAW[i].total
    console.log(playerResult)
    dealerResult = DEALER_DRAW[0].total
    console.log(dealerResult)
    if (playerResult == 21){
      player = PLAYER_DRAW[0].first[0].player
      output.push(`player ${player} wins`)
    }
    if(dealerResult == 21){
      // dealer = DEALER_DRAW[i].first[0].player
      player = PLAYER_DRAW[0].first[0].player
      output.push(`Dealer wins over Player ${player}`)
    }
    //
    if (playerResult > dealerResult && playerResult < 21){
      player = PLAYER_DRAW[0].first[0].player
      output.push(`player ${player} wins`)
    }
    if (dealerResult > playerResult && dealerResult < 21){
      // dealer = DEALER_DRAW[i].first[0].player
      player = PLAYER_DRAW[0].first[0].player
      output.push(`Dealer wins over Player ${player}`)
    }
    // traverse to dealer total
    // dealer will always be at [0] since its the same "player"
  }
  //reset hand
  reset()
  return output;
}