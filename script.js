var SHUFFLED_DECK = []
var PLAYERDECK = []
var PLAYERSUM = []
var CURRENT_PLAYER = 0 //var to indicate which player is playing
var PLAYERLIST = []
var PLAYERBLACKJACK = []
var PLAYERRESULTS = []
var DEALER_HAND = []
var TOTAL_PLAYER = 0 //total number of players
var CONTENTFORPLAYER = ''
var CONTENT_FOR_DEALERS = '' 
var DEALER_SUM = 0

//game states
var STARTING = 'choose_player_number'
var GAME_STATE_FIRST_TWO_CARDS = 'first_two_cards'
var GAME_STATE_DEALING_SUBSEQUENT_PLAYS = 'subsequent_deals'
var GAME_STATE_RESULTS = 'results'

//starting game state
var game_state = STARTING


//output message
var myOutputValue = ''

var main = function(input){
  if(game_state == STARTING){
    CURRENT_PLAYER = 0
    add_player(input)
    SHUFFLED_DECK = (shuffleCards(makeDeck()))

    DEALER_HAND.push(SHUFFLED_DECK.pop())
    DEALER_HAND.push(SHUFFLED_DECK.pop())
    DEALER_SUM = calculatehandvalue(DEALER_HAND)    

    firstroundplayer()

    myOutputValue += `<br> <br> First 2 cards are dealt! <br>
    For your information, dealer's first card is ${DEALER_HAND[0].name} ${DEALER_HAND[0].suit} <br>
    <br> Player 1, it is your turn now! Press 'hit' to draw more card or 'stand' end your turn. 
    <br> Here are your first 2 cards: ${generatecontent(PLAYERDECK[CURRENT_PLAYER])}`



    game_state = GAME_STATE_DEALING_SUBSEQUENT_PLAYS //change state
    
  return myOutputValue
  }

  if(game_state == GAME_STATE_DEALING_SUBSEQUENT_PLAYS){

    if(CURRENT_PLAYER == (TOTAL_PLAYER-1)){
      if(input == 'stand'){
        
        game_state = GAME_STATE_RESULTS
        myOutputValue = `Player ${CURRENT_PLAYER+1}, you have ended your turn! Your total value is ${PLAYERSUM[CURRENT_PLAYER]}.
        Below are your cards <br> ${generatecontent(PLAYERDECK[CURRENT_PLAYER])} <br> 
        <br> Press 'results' to reveal dealers' hand and see the winners!`
        
        console.log(`current play = ${CURRENT_PLAYER} vs total player ${TOTAL_PLAYER}, game state = ${game_state}`)
        console.log(PLAYERSUM)
      }
      
      if(input == 'hit'){
        PLAYERDECK[CURRENT_PLAYER].push(SHUFFLED_DECK.pop())
        PLAYERSUM[CURRENT_PLAYER] = calculatehandvalue(PLAYERDECK[CURRENT_PLAYER])
        console.log(PLAYERSUM)

        if(checkingbust(PLAYERSUM[CURRENT_PLAYER]) == true){
          
          game_state = GAME_STATE_RESULTS
          myOutputValue = `Sorry player ${CURRENT_PLAYER+1}, better luck next time <br>
          Your total value is ${PLAYERSUM[CURRENT_PLAYER]}.
          Below are your cards ${generatecontent(PLAYERDECK[CURRENT_PLAYER])} <br> <br>
          Press 'results' to reveal dealers' hand and see the winners!`
          
          
          console.log(`current play = ${CURRENT_PLAYER} vs total player ${TOTAL_PLAYER}, game state = ${game_state}`)
          console.log(PLAYERSUM)
        return myOutputValue
        }
    
        myOutputValue = `Your total value is ${PLAYERSUM[CURRENT_PLAYER]}.
        Below are your cards ${generatecontent(PLAYERDECK[CURRENT_PLAYER])} <br>
        <br> Press 'hit' to draw again or 'stand' to pass the turn`

      return myOutputValue
      }
    }
    else{
      hitting_or_standing(input)
    }
  }

  if(game_state == GAME_STATE_RESULTS){
  
    console.log(DEALER_SUM)

    if(input == 'results'){
      
      if(DEALER_SUM<17){
        while(DEALER_SUM < 17){
          DEALER_HAND.push(SHUFFLED_DECK.pop())
          DEALER_SUM += calculatehandvalue(DEALER_HAND)
        }
      }

      else{
        var summary_text = `Please find the results below <br> Dealers value: ${DEALER_SUM} <br> Dealer Cards: ${generatecontent(DEALER_HAND)} <br>`
        for (let i = 0; i < PLAYERSUM.length; i++){
          if((PLAYERSUM[i] == 21) ||
             (PLAYERSUM[i] > DEALER_SUM && PLAYERSUM <= 21)){
              PLAYERRESULTS[i] = `win`
              }
          if((PLAYERSUM <= 21) && (PLAYERSUM == DEALER_SUM)){
             (PLAYERRESULTS[i] = `tie`)
          }
          else{
            PLAYERRESULTS[i] = `lost`
          }
            
          summary_text += `<br> Player ${i+1}: ${PLAYERRESULTS[i]}. Total value: ${PLAYERSUM[i]}`
        }
        game_state = STARTING
        myOutputValue = `${summary_text} <br> <br> Play again by inputting the number of players!`
      }
      return myOutputValue 
    }
  }

  return myOutputValue
}

//helper function to create new arrays to store values for each player 
var add_player = function (input) {
  TOTAL_PLAYER = Number(input) //getting new players
  var player_index = 0 //create index for the loop
  while(player_index < TOTAL_PLAYER){ //loop to add players to player list array
    PLAYERLIST[player_index] = `Player ${(player_index+1)}` 
    player_index = player_index + 1
  }
  myOutputValue = `${TOTAL_PLAYER} players will participate in this game`
}

// Function to make a deck of cars
var makeDeck = function () {
  var cardDeck = [];
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
        cardName = 'ace'
      } else if (cardName == 11) {
        cardName = 'jack'
      } else if (cardName == 12) {
        cardName = 'queen';
      } else if (cardName == 13) {
        cardName = 'king';
      }

      // Create a new variable for value counter 
      var valueCounter = 0
      if(cardName == 'jack' || cardName == 'queen' || cardName == 'king'){
        valueCounter = 10
      }
      else(
        valueCounter = rankCounter
      )

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: valueCounter
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

// Function to get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Function to shuffle the elements in the cardDeck array
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


// Function to play blackjack first round
var firstroundplayer = function(){
  //Draw card and update card value
  var current_player = 0 
  // var currentdeck = playerdeck[current_player]
  while(current_player<TOTAL_PLAYER){
    // var currentdeck = playerdeck[current_player]
    
    PLAYERDECK[current_player] = []
    PLAYERDECK[current_player].push(SHUFFLED_DECK.pop())
    PLAYERDECK[current_player].push(SHUFFLED_DECK.pop())

    PLAYERBLACKJACK[current_player] = checkforblackjack(PLAYERDECK[current_player])
    PLAYERSUM[current_player] = calculatehandvalue(PLAYERDECK[current_player])

    current_player += 1
  }
  return CONTENTFORPLAYER
}

var hitting_or_standing = function(input){
  
  if(input == 'hit'){
    PLAYERDECK[CURRENT_PLAYER].push(SHUFFLED_DECK.pop())
    PLAYERSUM[CURRENT_PLAYER] = calculatehandvalue(PLAYERDECK[CURRENT_PLAYER])
    
    if(checkingbust(PLAYERSUM[CURRENT_PLAYER]) == true){

      myOutputValue = `Sorry player ${CURRENT_PLAYER+1}, better luck next time <br>
      Your total value is ${PLAYERSUM[CURRENT_PLAYER]}.
      Below are your cards ${generatecontent(PLAYERDECK[CURRENT_PLAYER])} <br> <br>
      Now it is Player ${CURRENT_PLAYER+2}'s turn`
      
      CURRENT_PLAYER += 1
      console.log(PLAYERSUM)
    return myOutputValue
    }

    myOutputValue = `Your total value is ${PLAYERSUM[CURRENT_PLAYER]}.
    Below are your cards ${generatecontent(PLAYERDECK[CURRENT_PLAYER])} <br>
    <br> Press 'hit' to draw again or 'stand' to pass the turn`
    console.log(PLAYERSUM)
  }
  if(input == 'stand'){

    myOutputValue = `Player ${CURRENT_PLAYER+1}, you have ended your turn! Your total value is ${PLAYERSUM[CURRENT_PLAYER]}.
    Below are your cards <br> ${generatecontent(PLAYERDECK[CURRENT_PLAYER])} <br> 
    <br> Now it is Player ${CURRENT_PLAYER+2}'s turn`
    CURRENT_PLAYER +=1
    console.log(PLAYERSUM)
  }
}


var checkingbust = function(input){
  var bust = false
  if (input>21){
    bust = true
  return bust
  }
}

var generatecontent = function(playerdeck){
  var index = 0
  var content_for_cards = ''
  while(index<playerdeck.length){
    content_for_cards += `<br> Card ${index+1} is ${playerdeck[index].name} ${playerdeck[index].suit}`
    index +=1
  }
return content_for_cards
}
  
var calculatehandvalue = function(playerdeck){
  var index = 0
  var totalhandvalue = 0
  while(index < playerdeck.length){
    totalhandvalue += playerdeck[index].value
    index += 1
  }
  return totalhandvalue
}

var checkforblackjack = function(playerdeck){
  var firstcard = playerdeck[0]
  var secondcard = playerdeck[1]
  var isblackjack = false 
  if((firstcard.name == 'ace' && secondcard.value == 10) ||
    (secondcard.name == 'ace' && firstcard.value == 10)){
      isblackjack = true
    }
  return isblackjack
}

var create_buttons = function(){
  var hit_button = document.createElement("button")
  hit_button.innerHTML = `Hit!`
  document.body.appendChild(hit_button)

  var stand_button = document.createElement("button")
  stand_button.innerHTML = `Stand!`
  document.body.appendChild(stand_button)
}
