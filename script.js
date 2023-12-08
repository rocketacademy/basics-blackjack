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
var NUM_OF_PLAYER = 2;
var PLAYER_DRAW

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
  return shuffledDeck()[CARDS_TAKEN];
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

// i need a way to process a card drawn let function "play" go first
// 
var playerCard = function(){
  var val_cards = drawCard(), value
  console.log(val_cards)
  //by default
  value = val_cards.rank;
  //unless
  // if card drawn == ace
  if (val_cards.rank == 1){
    value = 11;
  }
  // if card drawn == face
  if(val_cards.rank > 10){
    value = 10;
  }
  //return value
  return {'value': value, 'card': val_cards.suit};
}

//dealer block
/*
The dealer has to hit if their hand is below 17.
*/

var playersDraw = function (input) {
  var playerCounter = 0, playerResult = [], initalCardsDrawn = NUM_OF_PLAYER * 2, playerInGame = 0, player = {};
  while(playerCounter != initalCardsDrawn){
    // player draws 2 cards here
    // let it be that the last in the array is the dealers draw
    playerCounter += 1
    playerInGame += 1
    // get the distribution order or player 1 player 2 player 1 player 2 
    if(playerInGame > NUM_OF_PLAYER){
      playerInGame = 1
    }
    console.log(playerInGame)
    player = {player : playerInGame, drawn: playerCard()} 
    playerResult.push(player)
  }
  PLAYER_DRAW = playerResult;
  return playerResult;
};

var getDealerDraw = function(){
  var draw = PLAYER_DRAW, dealersDraw,  i = 0;
  console.log(draw)
  while(i <= draw.length){ 
    console.log(draw[i])
    if(draw[i].player == 2){
      dealersDraw = draw
      i += 1
      return dealersDraw
    }
  }
}