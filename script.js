// Deck is shuffled.
// User clicks Submit to deal cards.
// The cards are analysed for game winning conditions, e.g. Blackjack.
// The cards are displayed to the user.
// The user decides whether to hit or stand, using the submit button to submit their choice.
// The user's cards are analysed for winning or losing conditions.
// The computer decides to hit or stand automatically based on game rules.
// The game either ends or continues.

//Game State, default at player choosing state
var gameState = "playerState";

//Global array for computer and players
var comHand = []
var playerList = []
var numOfPlayer = 0
var playerNumber = 0
var comScore = 0
var turnNumber = 0

//Blackjack limit
var BLACKJACK_LIMIT = 21;


var main = function (input) {
  //Initialize deck
  var shuffledDeck = shuffleCards(makeDeck());

  if(gameState == 'playerState'){
    //Check if input is valid number
    numOfPlayer = Number(input)
    if(isNaN(numOfPlayer)||numOfPlayer==''){
      return `Error! Please enter a valid number!`
    }
    //Initialize player profiles
    for(i=0;i<numOfPlayer;i++){
     playerList[i] = {id:i+1, profile:{score:0,bet:0,chips:100,bjState:0,burstState:0,turnDone:0,playerChoice:'stand'},hand:[]}
    }
    //Move gameState to betting
    gameState = 'betState'
    return `There will be ${numOfPlayer} players.<br><br>Hi Player 1, please enter amount of chips to bet.`
  }
  //Betting state
  if (gameState == "betState") {
    
    while(playerNumber<numOfPlayer){
    //Collect input from each player as bet amount
    playerList[playerNumber].profile.bet = Number(input);
    //Check valid number for bet amount
    if (isNaN(playerList[playerNumber].profile.bet)||input =='') {
      return `Error! Player ${playerNumber+1}, please enter a number!`;
    }
    //If bet amount more than current chips, return error
    if (playerList[playerNumber].profile.bet > playerList[playerNumber].profile.chips) {
      return `You do not have that much chips Player ${playerNumber+1}! Current chips: ${playerList[playerNumber].profile.chips}`;
    }
    //Show player bet amoung and current chips
    var betMessage = `Hi Player ${playerNumber+1}! You chose to bet ${playerList[playerNumber].profile.bet} chips. Current chips left: ${playerList[playerNumber].profile.chips}<br><br>Continue entering bet for next player (Once everyone is done click submit to continue)`
    playerNumber+=1
    return betMessage;
  }
  //Move gameState to drawing state
  gameState = "drawState";
  return `All players bet in! Press submit to start!`
}

  //State to draw initial hand
  if (gameState == "drawState") {
    
    //Initialize both computer and player hand
    initializeHand(shuffledDeck)

    //Compute score of computer and players
    comScore = addScore(comHand)    
    counter = 0
    while(counter<numOfPlayer){
      //Add score of current hand to profile
      playerList[counter].profile.score = addScore(playerList[counter].hand)
      counter+=1
    }

    //Move gameState to playing state
    gameState = 'playState' 

    //Check if blackjack is obtained
    var blackJackMessage = blackJack() 

    return `Hands Initialized!<br><br>${blackJackMessage}<br><br>Press submit to continue.`
  }

  //First stage of gameplay
  if (gameState == "playState") {
    while(turnNumber<numOfPlayer){
      //Check if player has not completed playing (e.g. blackjack)
      if(playerList[turnNumber].profile.turnDone == 0){
        //Move to stage 2
        gameState = 'playState2'
        //Display current hand to player
        return `Hi Player ${turnNumber+1}, you drew:<br>${cardPrinter(playerList[turnNumber].hand)}Please choose to hit or stand<br>Current Score: ${playerList[turnNumber].profile.score}`
      }
      //If player is done, move to next player
      turnNumber +=1
      
      return `Player ${turnNumber+1}'s turn done, press submit to continue.`
    }
    //If computer score is lower than 16, draw another card
    while(comScore<16){
      comHand.push(shuffledDeck.pop())
      comScore = addScore(comHand)
    }
    if(comScore>BLACKJACK_LIMIT){
      for(i=0;i<numOfPlayer;i++){
        if(playerList[i].profile.burstState==0&&playerList[i].profile.bjState ==0){
          playerList[i].profile.chips += playerList[i].profile.bet
        }
      }
      //Once computer burst, return game back to initial stage
      resetState()
      return `Computer Burst! ╰(*°▽°*)╯ Players that survived wins their bet! Player 1, please enter bet to start new game`
    }
    //Move to compare results
    gameState ='resultState'
  }
  //Stage 2 of gameplay
  if(gameState == 'playState2'){
    while(turnNumber<numOfPlayer){
    //Collect input for player decision 
    playerList[turnNumber].playerChoice = input.toString()

    //If player choose to hit, push another card to hand and calculate score
    if(playerList[turnNumber].playerChoice == 'hit'){
      playerList[turnNumber].hand.push(shuffledDeck.pop())
      playerList[turnNumber].profile.score = addScore(playerList[turnNumber].hand)

      //If player burst after drawing card, show burstmessage and stop player's turn
      if(playerList[turnNumber].profile.score>BLACKJACK_LIMIT){
        playerList[turnNumber].profile.turnDone = 1
        playerList[turnNumber].profile.burstState =1
        playerList[turnNumber].profile.chips -= playerList[turnNumber].profile.bet
        var burstMessage = `Player ${turnNumber+1} burst! (╯°□°）╯︵ ┻━┻ Sorry! Press submit for the next player!`
        turnNumber +=1
        gameState = 'playState'
        return burstMessage
      }
      //Show current hand and score and return to ask for hit or stand
      else{
        var hitMessage = `Hi Player ${turnNumber+1}, you drew:<br>${cardPrinter(playerList[turnNumber].hand)}Please choose to hit or stand<br>Current Score: ${playerList[turnNumber].profile.score}`
        return hitMessage
      }}
      //If player choose to stand, move to next player 
      else if(playerList[turnNumber].playerChoice == 'stand'){
        playerList[turnNumber].profile.turnDone = 1
        gameState = 'playState'
        var standMessage = `Player ${turnNumber+1}'s turn done, press submit for next player.`
        turnNumber +=1
        return standMessage
      }
      //If player did not choose to hit or stand, prevent game from moving forward
      else{
        return `Please choose to hit or stand to continue. Current Score: ${playerList[turnNumber].profile.score}`
      }
    }
    
    
  }
  //Results state 
  if(gameState == 'resultState'){
    //Initialize message for results display
    var resultMessage = `Computer has a score of ${comScore}<br><br>Computer drew:<br>`
    resultMessage += `${cardPrinter(comHand)}<br>`
    
    i = 0
    while(i <numOfPlayer){
      //if player has not burst or obtain blackjack, compare score with computer
      if(playerList[i].profile.burstState==0 && playerList[i].profile.bjState == 0){
        winner = compareScore(playerList[i].profile.score,comScore)
        //If player wins, add bet amount to chips
        if(winner == 'player'){
        playerList[i].profile.chips += playerList[i].profile.bet
        resultMessage += `Player ${i+1} wins Computer with score of ${playerList[i].profile.score} versus ${comScore}<br>Current Chips: ${playerList[i].profile.chips}<br><br>`
        }
        //If player loses to computer, lose bet amount
        if(winner == 'com'){
          playerList[i].profile.chips -= playerList[i].profile.bet
          resultMessage += `Player ${i+1} lost to Computer with score of ${playerList[i].profile.score} versus ${comScore}<br>Current Chips: ${playerList[i].profile.chips}<br><br>`
        }
        if(winner == 'draw'){
          resultMessage += `Player ${i+1} draws with Computer with score of ${playerList[i].profile.score} versus ${comScore}<br>Current Chips: ${playerList[i].profile.chips}<br><br>`
        }
      }
      //Display those who burst or obtained blackjack
      if(playerList[i].profile.burstState==1){
        resultMessage += `Player ${i+1} burst with score of ${playerList[i].profile.score}<br>Current Chips: ${playerList[i].profile.chips}<br><br>`
      }
      if(playerList[i].profile.bjState==1){
        resultMessage += `Player ${i+1} has obtained BlackJack!<br>Current Chips: ${playerList[i].profile.chips}<br><br>`
      }
      i+=1
    }
    //Reset game back to betting stage
    resetState()
    return `${resultMessage}<br>Player 1 please enter bet to continue.`
  }
  if(gameState =='endState'){
    return `Game has ended! Please refresh the page to play again!`
  }
}

//Function to check if any players run out of chips
function chipsChecker(list){
  for(i=0;i<numOfPlayer;i++){
    if(list[i].profile.chips==0){
      gameState = 'endState'
      return `Player ${i+1} has ran out of chips! Game Over!`
    }
  }
}

//Function to reset game
function resetState() {
  for(i=0;i<numOfPlayer;i++){
    playerList[i].hand= []
    playerList[i].profile.score = 0
    playerList[i].profile.turnDone = 0
    playerList[i].profile.burstState = 0
    playerList[i].profile.playerChoice = 'stand'
  }
  turnNumber =0
  playerNumber = 0
  comHand = [];
  gameState = "betState";
}

//Function to print cards drawn
function cardPrinter(list) {
  message = "";
  for (i = 0; i < list.length; i++) {
    message += `${list[i].name} of ${list[i].suit}<br>`;
  }
  return message;
}

//function to add score from value of cards
function addScore(hand) {
  var score = 0;
  var numberOfAce = 0;

  for (i = 0; i < hand.length; i++) {
    if (hand[i].rank == 1) {
      numberOfAce += 1;
    }
    if (hand[i].rank > 10) {
      score += 10;
    } else {
      score = score + hand[i].rank;
    }
  }
  //If score is much lower than 21, count Ace as 11
  for (i = 0; i < numberOfAce; i++) {
    if (score + 10 <= BLACKJACK_LIMIT) {
      score += 10;
    }
  }
  return score;
}

//Function to compare score
function compareScore(player, com) {
  if (player > com) {
    return `player`
  } else if (com > player) {
    return `com`
  } else {
    return `draw`;
  }
}

//Checker for BlackJack
function blackJack() {
  var message = ''
  //If no blackjack obtained, return no blackjack message
  if(comScore != BLACKJACK_LIMIT){
    for(i=0;i<numOfPlayer;i++){
      if(playerList[i].profile.score!=BLACKJACK_LIMIT){
        message+=''
      }
    }
    return `No BlackJack obtained!`
  }
  //If computer has blackjack, game is reset and players that do not have blackjack minus their chips*2
  if(comScore == BLACKJACK_LIMIT){
    message += `Computer BlackJack! (⊙_⊙;)<br><br>`
    for(i=0;i<numOfPlayer;i++){
      if(playerList[i].profile.score !=BLACKJACK_LIMIT){
        playerList[i].profile.chips -= (playerList[i].profile.bet*2)
      }
      if(playerList[i].profile.score == BLACKJACK_LIMIT){
        
        message += `Player ${i+1} BlackJack! (❁´◡``❁)<br><br>`
      }
    }
    resetState()
    return `${message} Press submit to play again!`
  }
  //Else game continues while players with blackjack gets chips and stop playing 
  else{
    gameState = 'playState'
    for(i=0;i<numOfPlayer;i++){
      if(playerList[i].profile.score==BLACKJACK_LIMIT){
        message += `Player ${i+1} BlackJack! (⌐■_■)<br><br>`
        playerList[i].profile.bjState = 1
        playerList[i].profile.turnDone = 1 
        playerList[i].profile.chips += (playerList[i].profile.bet*2)
      }
    }
  } 
  return `${message}`
}

//Initialize hands
function initializeHand(shuffledDeck) {
  for(i=0;i<numOfPlayer;i++){
    playerList[i].hand.push(shuffledDeck.pop())
    playerList[i].hand.push(shuffledDeck.pop())
  }
  for (i = 0; i < 2; i++) {
    comHand[i] = shuffledDeck.pop();
  }
}

//Get random number from range of max
function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
}

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
}

//Function to create deck
function makeDeck() {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = [`heart ❤️`, "diamonds ♦", "clubs ♣", "spades ♤"];
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
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
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
