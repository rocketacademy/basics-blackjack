// Deck is shuffled.
// User clicks Submit to deal cards.
// The cards are analysed for game winning conditions, e.g. Blackjack.
// The cards are displayed to the user.
// The user decides whether to hit or stand, using the submit button to submit their choice.
// The user's cards are analysed for winning or losing conditions.
// The computer decides to hit or stand automatically based on game rules.
// The game either ends or continues.

//Game State, default at start
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

//Initialize deck
var shuffledDeck = shuffleCards(makeDeck());
var main = function (input) {

  if(gameState == 'playerState'){
    numOfPlayer = Number(input)
    if(isNaN(numOfPlayer)||numOfPlayer==''){
      return `Error! Please enter a valid number!`
    }
    for(i=0;i<numOfPlayer;i++){
     playerList[i] = {id:i+1, profile:{score:0,bet:0,chips:100,bjState:0,burstState:0,turnDone:0,playerChoice:'stand'},hand:[]}
    }
    gameState = 'betState'
    return `There will be ${numOfPlayer} players.<br><br>Hi Player 1, please enter amount of chips to bet.`
  }
  
  if (gameState == "betState") {
    
    while(playerNumber<numOfPlayer){
    playerList[playerNumber].profile.bet = Number(input);
    
    if (isNaN(playerList[playerNumber].profile.bet)||input =='') {
      return `Error! Player ${playerNumber+1}, please enter a number!`;
    }
    if (playerList[playerNumber].profile.bet > playerList[playerNumber].profile.chips) {
      return `You do not have that much chips! Current chips: ${playerList[playerNumber].profile.chips}`;
    }
    var betMessage = `Hi Player ${playerNumber+1}! You chose to bet ${playerList[playerNumber].profile.bet} chips. Current chips left: ${playerList[playerNumber].profile.chips}`
    playerNumber+=1
    return betMessage;
  }
  gameState = "drawState";
  return `All players bet in! Press submit to start!`
}

  //State to draw initial hand
  if (gameState == "drawState") {
    
    //Initialize both computer and player hand
    initializeHand()

    //Compute score of computer and players
    comScore = addScore(comHand)    
    counter = 0
    while(counter<numOfPlayer){
      playerList[counter].profile.score = addScore(playerList[counter].hand)
      counter+=1
    }

    //Check if blackjack is obtained
    var blackJackMessage = blackJack() 
    gameState = 'playState' 
    return `Hands Initialized!<br><br>${blackJackMessage}<br>Press submit to continue.`
  }

  if (gameState == "playState") {
    while(turnNumber<numOfPlayer){
      if(playerList[turnNumber].profile.turnDone == 0){
        gameState = 'playState2'
        
        return `Hi Player ${turnNumber+1}, you drew:<br>${cardPrinter(playerList[turnNumber].hand)}Please choose to hit or stand<br>Current Score: ${playerList[turnNumber].profile.score}`
      }
      turnNumber +=1
      return `Player ${turnNumber+1}'s turn done, press submit for next player.`
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
      resetState()
      return `Computer Burst! Players that survived wins their bet! Player 1, please enter bet to start new game`
    }
    gameState ='resultState'
  }

  if(gameState == 'playState2'){
    while(turnNumber<numOfPlayer){
    playerList[turnNumber].playerChoice = input.toString()
    if(playerList[turnNumber].playerChoice == 'hit'){
      playerList[turnNumber].hand.push(shuffledDeck.pop())
      playerList[turnNumber].profile.score = addScore(playerList[turnNumber].hand)
      if(playerList[turnNumber].profile.score>BLACKJACK_LIMIT){
        playerList[turnNumber].profile.turnDone = 1
        playerList[turnNumber].profile.burstState =1
        playerList[turnNumber].profile.chips -= playerList[turnNumber].profile.bet
        var burstMessage = `Player ${turnNumber+1} burst! Sorry! Press submit for the next player!`
        turnNumber +=1
        gameState = 'playState'
        return burstMessage
      }else{
        var hitMessage = `Hi Player ${turnNumber+1}, you drew:<br>${cardPrinter(playerList[turnNumber].hand)}Please choose to hit or stand<br>Current Score: ${playerList[turnNumber].profile.score}`
        return hitMessage
      }}
      else if(playerList[turnNumber].playerChoice == 'stand'){
        playerList[turnNumber].profile.turnDone = 1
        gameState = 'playState'
        var standMessage = `Player ${turnNumber+1}'s turn done, press submit for next player.`
        turnNumber +=1
        return standMessage
      }
      else{
        return `Please choose to hit or stand to continue. Current Score: ${playerList[turnNumber].profile.score}`
      }
    }
    
    
  }
  if(gameState == 'resultState'){
    var resultMessage = ''
    i = 0
    while(i <numOfPlayer){
      if(playerList[i].profile.burstState==0 && playerList[i].profile.bjState == 0){
        winner = compareScore(playerList[i].profile.score,comScore)
        if(winner == 'player'){
        playerList[i].profile.chips += playerList[i].profile.bet
        resultMessage += `Player ${i+1} wins Computer with score of ${playerList[i].profile.score} versus ${comScore}<br>Current Chips: ${playerList[i].profile.chips}<br><br>`
        }
        if(winner == 'com'){
          playerList[i].profile.chips -= playerList[i].profile.bet
          resultMessage += `Player ${i+1} lost to Computer with score of ${playerList[i].profile.score} versus ${comScore}<br>Current Chips: ${playerList[i].profile.chips}<br><br>`
        }
        else{
          resultMessage += `Player ${i+1} draws with Computer with score of ${playerList[i].profile.score} versus ${comScore}<br>Current Chips: ${playerList[i].profile.chips}<br><br>`
        }
      }
      i+=1
    }
    resetState()
    return `${resultMessage}<br>Player 1 please enter bet to continue.`
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

  //If computer has blackjack, game is reset and players that do not have blackjack minus their chips*2
  if(comScore == BLACKJACK_LIMIT){
    message += `Computer BlackJack!<br><br>`
    for(i=0;i<numOfPlayer;i++){
      if(playerList[i].profile.score !=BLACKJACK_LIMIT){
        playerList[i].profile.chips -= (playerList[i].profile.bet*2)
      }
      if(playerList[i].profile.score == BLACKJACK_LIMIT){
        
        message += `Player ${i+1} BlackJack!<br><br>`
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
        message += `Player ${i+1} BlackJack!<br><br>`
        playerList[i].profile.bjState = 1
        playerList[i].profile.turnDone = 1 
        playerList[i].profile.chips += (playerList[i].profile.bet*2)
      }
    }
  } 
  return message
}

//Initialize hands
function initializeHand() {
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
