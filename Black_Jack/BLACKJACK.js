// To start the game,
// Function for Player to enter name & greet them asking to play. 
var hello = function(cardmsg){
  return "Hello " + name + "<br><br>Let's play Black Jack ♦️♥️♣️♠️<br><br>" + cardmsg + "<br><br> Enter DRAW for another card or PASS for computer's turn.."
}

//Function to generate the card decks
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ['♥️', '♦️', '♣️', '♠️'];
  
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
        cardName = 'Ace';
      } else if (cardName == 11) {
        cardName = 'Jack';
      } else if (cardName == 12) {
        cardName = '👸🏽';
      } else if (cardName == 13) {
        cardName = '🤴🏽';
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

//Function Shuffle decks
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

//Function to deal 2 card from the shuffled cards
//This function is usable for when player enters Draw/beginning of the game
var dealCards = function (playerChoice, currentPlayerCard){
  console.log(typeof currentPlayerCard, playerChoice);
  if(playerChoice ==  draw ){
    var newCard = shuffledCards.pop()
    currentPlayerCard.push(newCard)
    return
  }
  // check who is playing, push to whose hand. 
  var card1 = shuffledCards.pop()
  var card2 = shuffledCards.pop()
  currentPlayerCard.push(card1,card2)
  // console.log [card1,card2];
  return 
}

//Function to generate a message that includes the name, suit and the message Repeatedly. 
//as long as condition is met. 
var playerChoiceMessage = function(){
  var message = "Your cards are "

//loop through the array, and 
//access the items of the object
//store the items you want inside the local variable
console.log(playerCard.length);
for (let i = 0; i < playerCard.length; i ++){
  console.log("loopy");
  var card = playerCard[i]

  message += card.name
  message += card.suit
  message += '  '
 card.rank
console.log(card.rank);
}
return message
}

// Function to add the cards
// if sum of cards is less than 17 &, Player draw another card. 
// if sum of all cards is more than 17 but less than 21, check if player wants to draw another card. 
var sumOfCards = function (playerCard){
    var totalCards= 0;
    for (let i = 0; i < playerCard.length; i++) {
      sum += playerCard[i].rank;
    }
    console.log(sum);
  return sum
  }


//Function that determines if Player wants to pass/draw 
// if draw, player draws 1 card, check if sum of all card is less than 17, draw card.  
// if pass, check if sum of 2 card is not less than 17 before
// computer can draw card/pass.
var drawCard = function (newCard){
  newCard.push (shuffledCards.pop())
}
//Function if Player input != to draw/pass
// prompt them to enter draw/pass
var invalidInput = function (playerInput){
  if (playerInput != draw &&
    playerInput != pass) {
      
      return true
    }
  }
  //Function if Player/computer Win//Function if Player/Computer Lose//Function to monitor scoreBoard//Function to endGame.
  //Checks who is
var runDrawLogic = function(){
  dealCards(draw, playerCard)
  playerDrawCount += 1
}


var winningLogic = function(hand){
  var score = 0;
  for (let i = 0; i < hand.length; i++) {
    score += hand[i].rank;
  }
  return score
}

var resetGame = function(){
  gameState = "Enter Name"
  playerDrawCount = 0
 
}

//Function that checks the total score of the players.
var calculateScore = function(){
  var playerScore = winningLogic(playerCard)
  var computerScore = winningLogic(computerCard)
  var endGameMsg = "<br><br>Your Score is "+ playerScore+"<br><br>My Score is "+ computerScore+"<br><br>Enter your Name to play again";
  console.log(playerScore, computerScore);
  
  if (playerScore == 21 && computerScore < 21){
    return " Its a BLACK JACK for you! " + endGameMsg
  }
  if (computerScore == 21 && playerScore < 21){
    return " Its a BLACK JACK for me! " + endGameMsg
  }
  if (playerScore < 22 && computerScore > 21){
    return " You Win. " + endGameMsg
  }
  if (computerScore < 22 && playerScore > 21){
    return "I Win. " + endGameMsg
  }
  if (computerScore < 21 && computerScore > playerScore){
    return " I win. " + endGameMsg
  }
  if (playerScore < 21 && playerScore > computerScore){
    return " You win. " + endGameMsg
  }
  if (playerScore < 22 && playerScore == computerScore){
    return " We are draw. " + endGameMsg 
  }
}

  // Global variables
  var gameState = "Enter Name";
  var name = "";
  var player = "";
  var computer = "";
  // game logic global variable
  var playerCard = [];
  var computerCard = [];
  var pass = "pass";
  var draw = "draw";
  var playerWin = "";
  var playerLose = "";
  var computerWin = "";
  var computerLose = "";
  var playerDrawCount = 0
  
  var shuffledCards = shuffleCards(makeDeck())
  
  // MAIN FUNCTION!!!!! Call all your other functions
  var main = function (input){
    //if game state is Enter Name, player is to input their name, and be greeted.
    console.log(gameState);

    if (gameState == "Enter Name"){
      name = input;
      gameState = "gameStart";
      dealCards('p',playerCard) // pushes cards into the playerCard []

      var cardInfo = playerChoiceMessage()
      var greeting = hello(cardInfo) // returning the return value of the hello function.
      return greeting;
    }

    //Change state to game start to distribute the deck.
    if (gameState == "gameStart"){
      if (invalidInput(input)){
          return "Oops INVALID INPUT! <br><br> Enter DRAW for another card or PASS for computer's turn."
        }

      if (input == draw){
        if (playerDrawCount == 3){
          return "You've exceed your draw limit. Enter 'pass' for computer's turn"
          }
        runDrawLogic()
      } 
      if (input == pass){
        gameState = "calculateScore"
        dealCards('j',computerCard)
        console.log(computerCard);
      }

      if (gameState == "calculateScore"){
        gameState = "Enter Name"
        resetGame()
        return calculateScore()
      }
      // compare player and computer hand. 
      // at Game Start state, Card must be distributed to the player and compute. 2 each.
      console.log(playerCard);
     var message = playerChoiceMessage()

    return message

    }
      console.log("card suit ----> ",cardSuit1,"card name ----> ",cardName1, "card rank ---> ");
  
      
  }


// compare between playercard v computer