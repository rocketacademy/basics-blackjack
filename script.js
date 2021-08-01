// Deck is shuffled.
// User clicks Submit to deal cards.
// The cards are analysed for game winning conditions, e.g. Blackjack.
// The cards are displayed to the user.
// The user decides whether to hit or stand, using the submit button to submit their choice.
// The user's cards are analysed for winning or losing conditions.
// The computer decides to hit or stand automatically based on game rules.
// The game either ends or continues.

//Game State, default at start
var gameState ='start'

//Global array for computer and player

var comHand = []
var playerHand = []
var playerScore = 0
var comScore = 0


//Global variable for winner
var winner = []

var shuffledDeck = shuffleCards(makeDeck())
var main = function (input) {
  
  var myOutputValue = '';
  
  
  
  //Start of game
  if(gameState == 'start'){
    
    //Initialize both computer and player hand
    initializeHand(shuffledDeck)
    //Check if blackjack is obtained
    if(addScore(playerHand)==21||addScore(comHand)==21){
    return `${blackJack(playerScore,comScore)}<br>Player drew<br>${cardPrinter(playerHand)}<br>Computer drew<br>${cardPrinter(comHand)}`
    }
    else{
      gameState ='draw'
      return `Player drew <br>${cardPrinter(playerHand)}<br>Please choose to hit or stand`
    }
  }
  if(gameState== 'draw'){
    playerChoice = input.toLowerCase()
    if(playerChoice == 'hit'){
      playerHand[2] = shuffledDeck.pop()
    }
    if(addScore(comHand)<=16){
      comHand[2]= shuffledDeck.pop()
    }
    if(addScore(playerHand)>21||addScore(comHand)>21){
      if(addScore(playerHand)>21&&addScore(comHand)>21){
        return `Both exceed limit of 21 points! Try Again!`
      }
      else if(addScore(comHand)>21){
        return `Computer exceeded 21 points! Player Wins!`
      }
      else{
        return `Player exceeded 21 points! Computer wins!`
      }
    }
    gameState = 'results'
    
    return `Player currently has<br>${cardPrinter(playerHand)}`    
  }
  if(gameState == 'results'){
    return `${compareScore(addScore(playerHand),addScore(comHand))}`
  }
  return myOutputValue;
};


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
  score = 0

  var length = hand.length
  
  for(i=0;i<hand.length;i++){
    var score = score + hand[i].value
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

return comHand, playerHand, playerScore, comScore
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
    var cardValue = 1
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;
      
      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = 'ace';
        cardValue =11;
      } else if (cardName == 11) {
        cardName = 'jack';
        cardValue = 10;
      } else if (cardName == 12) {
        cardName = 'queen';
        cardValue =10;
      } else if (cardName == 13) {
        cardName = 'king';
        cardValue=10;
      }
      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: cardValue
      };
      // Add the new card to the deck
      cardDeck.push(card);
      // Increment rankCounter to iterate over the next rank
      cardValue +=1
      rankCounter += 1;
    }
    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }
  // Return the completed card deck
  return cardDeck;
}