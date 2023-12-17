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
var CARDS_DRAW_DROM_DECK = []
var DEALER_DRAW = []
var PLAYER_DRAW = []
var GAME_STATE = 1
var HIT_CARD = []

/* game state  
  1. player_draw = 1
  2. player decide to hit of stand = 2
  2. player_hit = 3
  3. player_stand = 4
  4. calculate = 5
*/
var PLAYER_TURN = 0
/*
player turn will determinep which player's turn to hit or stand
*/



function reset(){
  DEALER_DRAW = [];
  PLAYER_DRAW = [];
  HIT_CARD = [];
  GAME_STATE = 1;
  PLAYER_TURN = 0;
  CARDS_DRAW_DROM_DECK = [] 
  CARDS_TAKEN = 0; 
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
  /* 
  if player hit then draw a card
  after drawing a card, that card gets assigned to the player card data(their object)
  after that, print the new card in hand, 
  */
 
 var hitTotal = 0, hitCard = [], hitSuit = []
  draw = drawCard()
  
  // assign card player using PLAYER_TURN
  draw[0].player = PLAYER_TURN
  HIT_CARD.push(draw)
  if(PLAYER_TURN != 'DEALER'){
    PLAYER_DRAW[PLAYER_TURN - 1].hit = HIT_CARD
    // console.log(draw)
    console.log('Player Hit Length')
    console.log(PLAYER_DRAW[PLAYER_TURN - 1].hit.length)
    hitCardLength = HIT_CARD.length
    // count total
    for(i = 0; i < hitCardLength; i++){
      if(HIT_CARD[i][0].player == PLAYER_TURN){
        if(PLAYER_DRAW[PLAYER_TURN - 1].first[0].card.name == 'ace' || PLAYER_DRAW[PLAYER_TURN - 1].second[0].card.name == 'ace' && HIT_CARD[i][0].card.name == 'ace'){
        //PLAYER_DRAW[PLAYER_TURN - 1].total -= 10
        hitTotal += 1
      } 
        else{
          hitTotal += evaluateCards(HIT_CARD[i][0].card.name)
      }
        hitCard.push(HIT_CARD[i][0].card.name)
        hitSuit.push(HIT_CARD[i][0].card.suit)
        console.log('Hit Total')
        console.log(hitTotal)
      }
    }
    PLAYER_DRAW[PLAYER_TURN - 1].total += hitTotal
    
    // return PLAYER_DRAW[PLAYER_TURN - 1] HIT_CARD[0][0].card HIT_CARD[1][0].card
    // return PLAYER_DRAW[PLAYER_TURN - 1].totalfcurrent
    // TODO add more card info here
    // player first
    firstCard = PLAYER_DRAW[PLAYER_TURN - 1].first[0].card.name
    firstSuit = PLAYER_DRAW[PLAYER_TURN - 1].first[0].card.suit
    // player second
    secondCard = PLAYER_DRAW[PLAYER_TURN - 1].second[0].card.name
    secondSuit = PLAYER_DRAW[PLAYER_TURN - 1].second[0].card.suit
    // hits join()
    hitCardJoin = hitCard.join(' & ')
    hitSuitJoin = hitSuit.join(' & ')
    if(PLAYER_DRAW[PLAYER_TURN - 1].total > 21){
      output = `<center>Player ${PLAYER_TURN}</center>Current card Value: ${PLAYER_DRAW[PLAYER_TURN - 1].total} <br>FIRST CARD: <br>Card: ${firstCard}<br>Suit: ${firstSuit}<br>SECOND CARD: <br>Card: ${secondCard}<br>Suit: ${secondSuit}<br>HIT CARD(s): <br>Card: ${hitCardJoin}<br>Suit: ${hitSuitJoin}<br>Proceed to stand`
    }
    else{
      output = `<center>Player ${PLAYER_TURN}</center>Current card Value: ${PLAYER_DRAW[PLAYER_TURN - 1].total} <br>FIRST CARD: <br>Card: ${firstCard}<br>Suit: ${firstSuit}<br>SECOND CARD: <br>Card: ${secondCard}<br>Suit: ${secondSuit}<br>HIT CARD(s): <br>Card: ${hitCardJoin}<br>Suit: ${hitSuitJoin}<br>Would you like to hit or stand?`
    }
  }
  if(PLAYER_TURN == 'DEALER'){
    draw = drawCard()
    HIT_CARD.push(draw)
    DEALER_DRAW[0].hit = HIT_CARD
    console.log('Dealer Hit Length')
    console.log(DEALER_DRAW[0].hit.length)
    hitCardLength = HIT_CARD.length
    for(i = 0; i < hitCardLength; i++){
      if(HIT_CARD[i][0].player == PLAYER_TURN){
        if(DEALER_DRAW[0].first[0].card.name == 'ace' || DEALER_DRAW[0].second[0].card.name == 'ace' && HIT_CARD[i][0].card.name == 'ace'){
        //PLAYER_DRAW[PLAYER_TURN - 1].total -= 10
        hitTotal += 1
      } else if(DEALER_DRAW[0].first[0].card.name == 'ace' && DEALER_DRAW[0].second[0].card.name == 'ace'){
        DEALER_DRAW[0].total = 2

      }
        else{
          hitTotal += evaluateCards(HIT_CARD[i][0].card.name)
      }
        hitCard.push(HIT_CARD[i][0].card.name)
        hitSuit.push(HIT_CARD[i][0].card.suit)
        console.log('Hit Total')
        console.log(hitTotal)
      }
    }
    DEALER_DRAW[0].total += hitTotal
    output = 'Dealer drew a card'
    getResult()
     
  }
  return output
}


var stand = function(){
  // there need to be a part where if any of the players  total less than 16, they need to draw another card
  // The dealer has to hit if their hand is below 17.
  // when stand is hit, change player, change PLAYER_TURN += 1
  if(PLAYER_TURN == 'DEALER'){
    if(DEALER_DRAW[0].total <= 17){
      // or maybe just HIT? to keep dealer card a secret
      return `Dealer total is: ${DEALER_DRAW[0].total}, press HIT to draw another card.`
    }
    // else{
    //   //PLAYER_TURN = "DEALER"
    //   return getResult()
    // }
  }
  else{
    if(PLAYER_DRAW[0].total <= 16){
      return `Player ${PLAYER_TURN} total is: ${DEALER_DRAW[0].total}, press HIT to draw another card.`
    }
    else{
      PLAYER_TURN +=1
      return getResult()
    }
  }
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

function chance(total){
  var intensity = 2
  var giveChance = Math.floor(Math.random() * intensity)
  console.log(giveChance)
  if(total >= 17 && total < 19){
    intensity = 45
    giveChance = Math.floor(Math.random() * intensity)
    if(giveChance == 1){
      return true
    }
  }
  if(total == 20){
    intensity = 90
    giveChance = Math.floor(Math.random() * intensity)
    if(giveChance == 1){
      return true
    }
  }
  if (giveChance == 1){
    return true
  }
}


var getResult = function(){
  //local var
  var playerResult, output = [];
  // initiate draw
  if(GAME_STATE == 1){
    reset()
    playersDraw()
    console.log(DEALER_DRAW)
    GAME_STATE = 2
    PLAYER_TURN = 1
    for(i = 0; i < PLAYER_DRAW.length; i++){
      if(PLAYER_DRAW[i].total == 21){
        PLAYER_TURN += 1
        reset()
        return `Player ${PLAYER_DRAW[i].first[0].player}, Natural 21! press Play`
      }
    }
    if(DEALER_DRAW[0].total == 21){
      reset()
      return `Dealer drew Natural 21!, press Play to start new game`
    } 
  }


  if(GAME_STATE == 2){
    if(PLAYER_TURN == NUM_OF_PLAYER){
      PLAYER_TURN = "DEALER"
      // while(DEALER_DRAW[0].total <= 17 ){
      //   // var getChance = chance(DEALER_DRAW[0].total)
      //   // if(getChance){
      //   doHit = hit()
      //   }
      //   //return getResult()
      // }
    }
    if(PLAYER_TURN == 'DEALER'){
      if(DEALER_DRAW[0].total <= 17 ){
        //var getChance = chance(DEALER_DRAW[0].total)
        hit()
        // if(getChance){
        //   hit()
        // }
        //return getResult()
      }
      if(DEALER_DRAW[0].total > 17 ){
        GAME_STATE = 5
        return getResult()
      }
    }
  }
  if(PLAYER_TURN != 'DEALER'){
    // if()
    console.log(PLAYER_DRAW)
    firstCard = PLAYER_DRAW[PLAYER_TURN - 1].first[0].card.name
    firstSuit = PLAYER_DRAW[PLAYER_TURN - 1].first[0].card.suit
    // player second
    secondCard = PLAYER_DRAW[PLAYER_TURN - 1].second[0].card.name
    secondSuit = PLAYER_DRAW[PLAYER_TURN - 1].second[0].card.suit
      // player first
    // get cards here
    //output = `<center>Player ${PLAYER_TURN}</center> <br> hit or stand?
    output = `<center>Player ${PLAYER_TURN}<br>Hit or Stand?</center><br>Current card Value: ${PLAYER_DRAW[PLAYER_TURN - 1].total} <br>FIRST CARD: <br>Card: ${firstCard}<br>Suit: ${firstSuit}<br>SECOND CARD: <br>Card: ${secondCard}<br>Suit: ${secondSuit}<br>`
    
    return output
  }
    
  if(GAME_STATE == 5){ 
    GAME_STATE = 1
    for(i = 0; i < PLAYER_DRAW.length; i++){
      // console.log(PLAYER_DRAW[i])
      // traverse to player total
      playerResult = PLAYER_DRAW[i].total
      console.log(playerResult)
      dealerResult = DEALER_DRAW[0].total
      console.log(dealerResult)
      if (playerResult == 21){
        player = PLAYER_DRAW[i].first[0].player
        output.push(`<center>Blackjack! Player ${player} wins<center>`)
      }
      if (playerResult > 21){
        player = PLAYER_DRAW[i].first[0].player
        output.push(`<center>Player ${player} busted<center><br>`)
      }
      if(dealerResult == 21){
        // dealer = DEALER_DRAW[i].first[0].player
        player = PLAYER_DRAW[i].first[0].player
        output.push(`<center>Blackjack! Dealer wins over Player ${player}<center>`)
      }
      if(dealerResult > 21 && playerResult < 21){
        // dealer = DEALER_DRAW[i].first[0].player
        player = PLAYER_DRAW[i].first[0].player
        output.push(`<center>Dealer Busted, Player ${player} gets the win<enter><br>Player ${player} Total: ${PLAYER_DRAW[i].total}<br>Dealer Total: ${DEALER_DRAW[0].total}<br>`)
      }
      //
      if (playerResult > dealerResult && playerResult < 21){
        player = PLAYER_DRAW[i].first[0].player
        output.push(`<center>Player ${player} wins over Dealer<center><br>Player ${player} Total: ${PLAYER_DRAW[i].total}<br>Dealer Total: ${DEALER_DRAW[0].total}<br>`)
      }
      if (dealerResult > playerResult && dealerResult < 21){
        // dealer = DEALER_DRAW[i].first[0].player
        player = PLAYER_DRAW[i].first[0].player
        output.push(`<center>Dealer wins over Player ${player}<center><br>Player ${player} Total: ${PLAYER_DRAW[i].total}<br>Dealer Total: ${DEALER_DRAW[0].total}<br>`)
      }
      //add a condition if dealer and player equals
      // TODO add more card info 
      // traverse to dealer total
      // dealer will always be at [0] since its the same "player"
      if (dealerResult == playerResult){
        // use largest card suit to see who is the winner
        // dealer = DEALER_DRAW[i].first[0].player
        player = PLAYER_DRAW[i].first[0].player
        output.push(`<center>Player ${player} and Dealer ends with a Tie<center>`)
      }
    }
    //reset()
    joinOutput = output.join('<br>')
    console.log(joinOutput)
    
    return joinOutput;
  }
}