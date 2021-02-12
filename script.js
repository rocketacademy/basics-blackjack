//https://github.com/chernhaw/swe101-blackjack.git
//https://swe101.rocketacademy.co/projects/project-3-blackjack



var playingCards = [];
var playerCards = [];
var computerCards = [];

var playerCardsAtHand = 0;
var computerCardAtHand = 0;

var gameState = 'Not Started';
var playerWon = function(playerCard, computerCard){
var outCome = "Playing";

  var index = 0;
  playerCardsAtHand = 0;
  computerCardAtHand = 0;
  while (index < playerCard.length){
    playerCardsAtHand = playerCardsAtHand +playerCard[index].rank;
    index=index+1;
  }
  index = 0;
  while (index < computerCard.length){
    computerCardAtHand = computerCardAtHand +computerCard[index].rank;
    index=index+1;
  }

  console.log ('Player Cards at Hand ->'+playerCardsAtHand+ ' Computer Cards at Hand ->'+computerCardAtHand);
  if( computerCardAtHand>21 ) {
    
    console.log("Computer Bust")
    return 'Computer Bust';
  } else if (playerCardsAtHand> 21){
    console.log("Player Bust")
    return 'Player Bust';
  } else if (playerCardsAtHand> computerCardAtHand){
    console.log("Player Won")
    return 'Player Won';
  } else if (playerCardsAtHand< computerCardAtHand){
    console.log("Computer Won")
    return 'Computer Won';
  } else {
    return 'Playing';
  }
}

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
      } else if (cardName == 12) {
        cardName = 'king';
      }

      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      // console.log(card.cardName);
      cardDeck.push(card);

      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};

var getRandomIndex = function (cardSize) {
  return Math.floor(Math.random() * cardSize);
};

var randomCardPicked = function () {
  // console.log('Playing card length' + playingCards.length);


  var cardSize = playingCards.length;
  var randomIndex = getRandomIndex(cardSize);
  console.log('Random Index: ' +randomIndex);
  var cardPicked = playingCards[randomIndex];
  playingCards.splice(randomIndex,1)

  
   console.log('Cards picked -> suit: ' + cardPicked.suit+' rank: '+cardPicked.rank+' name: '+cardPicked.name);

  return cardPicked;
};


var startGame = function(){
    playerCards = [];
    computerCards = [];
  
    playingCards=makeDeck();
    playerCards.push(randomCardPicked());
    computerCards.push(randomCardPicked());
}
/*
Introduction
Implement a simplified version of Blackjack. If you're not familiar with Blackjack, refer to this video for game rules. Our simplified rules are the following.
There will be only two players. One human and one computer.
The computer will always be the dealer. The dealer has to hit if their hand is below 17.
The player who is closer to 21 wins the hand. Aces can be 1 or 11.


The main function runs on each player's turn. The sequence of actions in the game might be the following.
Deck is shuffled.
User clicks Submit to deal cards.
The cards are analysed for game winning conditions, e.g. Blackjack.
The cards are displayed to the user.
The user decides whether to hit or stand, using the submit button to submit their choice. 
The user's cards are analysed for winning or losing conditions.
The computer decides to hit or stand automatically based on game rules.
The game either ends or continues.

First Version: Compare Initial Hands to Determine Winner
Aim for a playable game. A minimal version of Blackjack could just compare the ranks of the player's and dealer's cards. For now, we can leave out features such as Aces being 1 or 11, and the player and dealer choosing to hit or stand. Write pseudocode to guide your logic.
Compare the initially-drawn cards to determine a winner. Code with the understanding that your code will expand later to encompass other Blackjack functionality.
Test your code.

*/
var main = function (input) {
   
  if (gameState=='Not Started'){

     startGame();

  } else if (gameState=='Started'){
    if (input='Hit'){
      playerCards.push(randomCardPicked());
    }
    computerCards.push(randomCardPicked());
   
  }

  
  // check if player has won
  outCome = playerWon(playerCards, computerCards);
  console.log("Game state "+outCome)
  if (outCome !='Playing'){
    startGame();
  }

  var myOutputValue='Player Cards at Hand -> '+playerCardsAtHand
  + ' Computer Cards at Hand -> '
  +computerCardAtHand+'<br>'+playerWon(playerCards, computerCards);

   
  return myOutputValue;
};
