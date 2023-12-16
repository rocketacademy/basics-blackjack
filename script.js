// Blackjack (base version)
// There will be only two players. One human and one computer (for the Base solution).
// The computer will always be the dealer.
// Each player gets dealt two cards to start.
// The player goes first, and decides if they want to hit (draw a card) or stand (end their turn).
// The dealer has to hit if their hand is below 17.
// Each players' score is the total of their card ranks. Jacks/Queen/Kings are 10. Aces can be 1 or 11.
// The player who is closer to, but not above 21 wins the hand.


var currentDeck = [];
var playerHand =[];
var dealerHand =[];
var playerPoints = 0;
var dealerPoints = 0;
var winnerIs = "";
var mode = "";

var main = function (input) {  
var greeting = "";

// Set game mode to intro
  if (input.toLowerCase() == "") {
    mode = "introGame";
    greeting =  "Enter 's' to start";
  }

 // Set game mode to new game
  if (input.toLowerCase() == "s") {
    mode = "newGame";
    playerHand =[];
    dealerHand =[];
    currentDeck = makeDeck();
    currentDeck = shuffleCards(currentDeck);

    // deal two cards for player and dealer
    playerHand.push(currentDeck.pop());
    playerPoints += playerHand.value;
    dealerHand.push(currentDeck.pop());
    playerHand.push(currentDeck.pop());
    playerPoints += playerHand.value;
    dealerHand.push(currentDeck.pop());
    
    // draw card for dealer if points are < 17 
    console.log(getPoints(dealerHand));
    while( getPoints(dealerHand) <17 ){
      dealerHand.push(currentDeck.pop());
    }
    greeting = 
    `Player hand ${displayCards(playerHand)} with total points: ${getPoints(playerHand)} <br>
    Dealer hand  ${displayCards(dealerHand)} with total points: ${getPoints(dealerHand)} <br> 
    Draw Card [y/n]?`
  };

// Set game mode to draw cards
if (input.toLowerCase() == "y") {
  playerHand.push(currentDeck.pop());
  
  greeting = 
  `Player hand ${displayCards(playerHand)} with total points: ${getPoints(playerHand)} <br>
  Dealer hand  ${displayCards(dealerHand)} with total points: ${getPoints(dealerHand)} <br> 
  Draw Card [y/n]?`
};

// Set game mode to end game 
if (input.toLowerCase() == "n") {
  
  // check who is winner for player and dealer
  var whoIsWinner = winStatus();

  greeting = 
  `Player hand ${displayCards(playerHand)} with total points: ${getPoints(playerHand)} <br>
  Dealer hand  ${displayCards(dealerHand)} with total points: ${getPoints(dealerHand)} <br> 
  ${whoIsWinner} <br>
  Enter  's'  to play again`      
  }
  return greeting;   
};

// returns the number of points in hand 
// returns the number of points for Aces when points >22
function getPoints(hand) {
  var points = 0;
  for (var i = 0; i < hand.length; i++){
   points += hand[i].value;
  }
  var numberAces = getAces(hand);
  if (points >22){
    points = points - numberAces * 10 
  }
  return points;
 };

 //returns the number of aces in hand
 function getAces(hand){
   var aces = 0;
   for (i in hand){
    if(hand[i].name == "A"){
    aces += 1
    }
   }
   return aces;
 };

// display cards held by player and comp
var displayCards = function (hand){
  var displayCardsInHand = [];
  for (i in hand) {
    displayCardsInHand.push(hand[i].name, hand[i].suit);
  }
  return displayCardsInHand.join(" ");
};

// determine winner for player and dealer
var winStatus = function (){

  playerPoints = getPoints(playerHand);
  dealerPoints = getPoints(dealerHand);

 winnerIs = "You Draw!"

  if (playerPoints > dealerPoints && playerPoints <22){
    winnerIs = "You Win!"
  }
  if  (dealerPoints > playerPoints && dealerPoints <22){
    winnerIs = "Dealer Wins!";
  }
 if (playerPoints >22 && dealerPoints >22){
    winnerIs = "You & Dealer Bust!"
  }
  if (playerPoints >22){
    winnerIs = "Dealer Wins, You Bust!"
  }
  if  (dealerPoints >22){
    winnerIs = "You Win, Dealer Bust!";
  }

return winnerIs;
};

var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  var suits = ['♥️', '♦️', '♣', '♠️'];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      var cardValue = rankCounter;

      // Set cardName, cardValue for J, Q, K, A cards
      if (cardName == 1) {
        cardName = 'A';
        cardValue = 11;
      } else if (cardName == 11) {
        cardName = 'J';
        cardValue = 10;
      } else if (cardName == 12) {
        cardName = 'Q';
        cardValue = 10;
      } else if (cardName == 13) {
        cardName = 'K';
        cardValue = 10;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: cardValue,
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

// Shuffle Function
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