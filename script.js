// Deck is shuffled.
// User clicks Submit to deal cards.
// The cards are analysed for game winning conditions, e.g. Blackjack.
// The cards are displayed to the user.
// The user decides whether to hit or stand, using the submit button to submit their choice.
// The user's cards are analysed for winning or losing conditions.
// The computer decides to hit or stand automatically based on game rules.
// The game either ends or continues.

//Game State, default at start
var gameState ='drawState'

//Global array for computer and player

var comHand = []
var playerHand = []
var playerScore = 0
var comScore = 0

var BLACKJACK_LIMIT = 21

//Initialize deck
var shuffledDeck = shuffleCards(makeDeck())
var main = function (input) {
  
  
  
  
  //Start of game
  if(gameState == 'drawState'){
    
    //Initialize both computer and player hand
    initializeHand(shuffledDeck)
    console.log(`Player Initial Score: ${addScore(playerHand)}`)
    console.log(`Com Initial Score: ${addScore(comHand)}`)
    //Check if blackjack is obtained
    if(addScore(playerHand)==BLACKJACK_LIMIT||addScore(comHand)==BLACKJACK_LIMIT){
    return `${blackJack(addScore(playerHand),addScore(comHand))}<br>Player drew<br>${cardPrinter(playerHand)}<br>Computer drew<br>${cardPrinter(comHand)}`
    }
    else{
      //Move on to next stage of game
      gameState ='playState'
      //Display player current hand
      return `Player drew <br>${cardPrinter(playerHand)}<br>Please choose to hit or stand`
    }
  }
  
  if(gameState== 'playState'){
    var playerChoice = input.toLowerCase()
    //Return error if player does not enter one of the two choices 
    if(playerChoice!='hit'&&playerChoice!='stand'){
      return `Error! Please choose to hit (draw another card) or stand (keep playing wit current hand)`
    }
    //If player choose to hit, draw another card for player
    if(playerChoice == 'hit'){
      playerHand[2] = shuffledDeck.pop()
    }
    console.log(`Player Score: ${addScore(playerHand)}`)
    //If player has more than 21, lose immediately
    if(addScore(playerHand)>BLACKJACK_LIMIT){
      var results = `Player Burst! Player drew<br>${cardPrinter(playerHand)}<br> Press Submit to play again`
      resetState()
      return results
    }
    //If computer score is lower than 16, draw another card
    if(addScore(comHand)<=16){
      comHand[2]= shuffledDeck.pop()
    }
    gameState = 'resultState'
    console.log(comHand)
    return `Player currently has ${addScore(playerHand)}<br>${cardPrinter(playerHand)}`    
  }
  if(gameState == 'resultState'){
    var results = `${compareScore(addScore(playerHand),addScore(comHand))}<br> Press Submit to play again!`
    resetState()
    return results
  }
  
}


//Function to reset game
function resetState(){
  playerHand = []
  comHand = []
  playerScore =0
  comScore = 0
  gameState = 'drawState'
  return `Press Submit to play again!`
}


//Function to print cards drawn
function cardPrinter(list){
  message = ''
  for(i=0;i<list.length;i++){
    message += `${list[i].name} of ${list[i].suit}<br>`
  }
  return message 
}


//function to add score from value of cards
function addScore(hand){
  var score = 0 
  var numberOfAce = 0
  
  
  for(i=0;i<hand.length;i++){
    if(hand[i].rank==1){
      numberOfAce +=1
    }
    if(hand[i].rank>10){
      score +=10;
    }else {
    score = score + hand[i].rank
    }
  }
  for(i=0;i<numberOfAce;i++){
    if(score+10<=BLACKJACK_LIMIT){
      score+=10
    }
  }
  return score
}




//Function to compare score
function compareScore(player,com){
  if(player>com){
    return `Player Wins!🎊<br>`
  }
  else if(com>player){
    return `Computer Wins!🎊<br>`
  }
  else{
    return `Draw!🃏`
  }
}




//Checker for BlackJack 
function blackJack(player,com){
  var blackJackMessage = ''
  if(player == 21 || com==21){
    if(player == 21 && com==21){
    blackJackMessage += `Both BlackJack!🤩🤩 WOW!`
    } 
    else if(com ==21){
    blackJackMessage += `Computer BlackJack!🤩`
    }
    else{
    blackJackMessage += `Player BlackJack!🤩`
    }
  }
  return blackJackMessage 
}


//Initialize hands
function initializeHand(deck){
  comHand = []
  playerHand = []
for(i=0;i<2;i++){
  comHand[i] = [{name:'',suit:'',rankCounter:0,value:0}]
  playerHand[i] = [{name:'',suit:'',rankCounter:0,value:0}]
  comHand[i] = deck.pop()
  playerHand[i]=deck.pop()
}

return comHand, playerHand
}

//Get random number from range of max
function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
function shuffleCards(cardDeck) {
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

//Function to create deck
function makeDeck(){
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = [`heart ❤️`, 'diamonds ♦', 'clubs ♣', 'spades ♤'];
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
}