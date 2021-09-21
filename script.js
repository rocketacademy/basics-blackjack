//Initialise global variable for computer cards and player cards
var computerCards = []
var playerCards = []

//Initialise global variable for computer and player cards value
var computerCardsValue = 0
var playerCardsValue = 0

//Initialize global variable for ace card
var aceCard = false

var main = function (input) {
  
  //if player array is empty, deal cards to computer and player
  if (playerCards.length == 0 && input == ''){
    return dealCards()
  }

  //play the game
  else
    return playerHitOrStand(input)
  
};

var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ['hearts', 'diamonds', 'clubs', 'spades'];

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

      //Create a variable for card value
      var cardValue = rankCounter

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = 'ace';
      } else if (cardName == 11) {
        cardName = 'jack';
        cardValue = 10
      } else if (cardName == 12) {
        cardName = 'queen';
        cardValue = 10
      } else if (cardName == 13) {
        cardName = 'king';
        cardValue = 10
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
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // Return the completed card deck
  return cardDeck;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
var shuffleCards = function () {

  //Initialise variable for make Deck function
  var deckCard = makeDeck()

  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < deckCard.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(deckCard.length);
    // Select the card that corresponds to randomIndex
    var randomCard = deckCard[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = deckCard[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    deckCard[currentIndex] = randomCard;
    deckCard[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return deckCard;
};

//var shuffledDeck = shuffleCards()
var shuffledDeck = shuffleCards()

//Create a function to deal 2 cards to player and computer
var dealCards = function(){
  console.log('deal cards function is running')

  //create a loop to add 2 cards to computer and player cards array
  var cardsCounter = 0

  while (cardsCounter < 2){

    computerCards.push(shuffledDeck.pop())
    console.log(`computer cards ${computerCards[cardsCounter].name} of ${computerCards[cardsCounter].suit}`)

    playerCards.push(shuffledDeck.pop())
    console.log(`player cards ${playerCards[cardsCounter].name} of ${playerCards[cardsCounter].suit}`)

    cardsCounter += 1

  }
  return `Computer first card is ${computerCards[0].name} of ${computerCards[0].suit}.<br>Player, you have ${playerCards[0].name} of ${playerCards[0].suit} and ${playerCards[1].name} of ${playerCards[1].suit}.<br>You have ${calcPlayerCardsValue()} points.<br><br>Do you want to hit or stand?`
}

//create a function for player to choose hit or stand
var playerHitOrStand = function(input){
  console.log('player hit or stand function is running');

  var myOutputValue = ''

  //if input is hit, pop a card from the shuffled deck to player hands and calculate player cards value
  if (input == 'hit' && playerCardsValue < 21){

      playerCards.push(shuffledDeck.pop())

      //initalize variable to know the index of player last card
      var playerLastCard = playerCards.length - 1

      console.log(`hit playerCards -> ${playerCards[playerLastCard].name} of ${playerCards[playerLastCard].suit}`)

      myOutputValue = `Player, you have drawn ${playerCards[playerLastCard].name} of ${playerCards[playerLastCard].suit}.<br>You have ${calcPlayerCardsValue()} points.<br><br>`

      //if player cards value > 21, player bust
      if (playerCardsValue > 21){

        //aceValue()
        //if player bust, cannot draw cards anymore. change mode to stand
        myOutputValue = myOutputValue + 'You have bust. It is computer turn. Press submit'

      //else, ask if player want to hit or stand  
      }else
        myOutputValue = myOutputValue + 'Do you want to hit or stand?'

      return myOutputValue
      
    
  //else, it is computer's turn to hit or stand
  }else 
    return computerHitOrStand()
}

//create a function for computer/deal to hit or stand
var computerHitOrStand = function(){
  console.log(`computer hit or stand function is running`);
  
  if (calcComputerCardsValue() < 17){

    computerCards.push(shuffledDeck.pop())

    var computerLastCard = computerCards.length - 1
    console.log(`hit computer card -> ${computerCards[computerLastCard].name} of ${computerCards[computerLastCard].suit}`);

    }
  if (calcComputerCardsValue() > 16){
    return compareCardsValue()
  }
}

//create a function to compare the drawn cards value
var compareCardsValue = function(){
  console.log('compare cards value function is running')

  var message = `Computer cards value: ${computerCardsValue}<br>Player cards value: ${playerCardsValue}<br><br>`

  //if computer cards value is greater than player cards value, computer wins
  if ((computerCardsValue > playerCardsValue && computerCardsValue < 22) || (computerCardsValue < 22 && playerCardsValue > 21)){
    message = message + `Computer win! Press submit to play again!`
  }
  //if player cards value is greater than computer cards value, player wins
  else if ((playerCardsValue > computerCardsValue && playerCardsValue < 22) || (playerCardsValue < 22 && computerCardsValue > 21)){
    message = message + `Player win! Press submit to play again!`
  }
  //if computer cards value = player cards value, it's a tie
  else if ((playerCardsValue == computerCardsValue) || (playerCardsValue > 21 && computerCardsValue > 21)){
    message = message + `It's a tie! Press submit to play again!`
  }

  //reset computer and player cards array and reshuffle cards
  computerCards = []
  playerCards = []
  shuffledDeck = shuffleCards()

  return message
}

//create a function to calculate player card value
var calcPlayerCardsValue = function(){
  console.log(`calculate player cards value is running`);

  //reset player cards value
  playerCardsValue = 0

  var playerCardIndex = 0

  while(playerCardIndex < playerCards.length){

    playerCardsValue += playerCards[playerCardIndex].value

    if (playerCards[playerCardIndex].name == 'ace'){
      aceCard = true
    }

    playerCardIndex += 1
  }

  //if aceCard = true and player cards value is < 12, add 10 to player cards value
  if (aceCard == true && playerCardsValue < 12){
    console.log('ace card is running');
    playerCardsValue += 10 
  }
  console.log(`player cards value -> ${playerCardsValue}`);

  //reset ace card to false
  aceCard = false

return playerCardsValue
}

//create a function to calculate computer card value
var calcComputerCardsValue = function(){
  console.log(`calculate computer cards value is running`);

  //reset computer cards value
  computerCardsValue = 0

  var computerCardIndex = 0

  while (computerCardIndex < computerCards.length){
    computerCardsValue += computerCards[computerCardIndex].value

    if (computerCards[computerCardIndex].name == 'ace'){
      aceCard = true
    }
    computerCardIndex += 1
  }

  //if aceCard = true and computer cards value is < 12, add 10 to computer cards value
  if (aceCard == true && computerCardsValue < 12){
    console.log('ace card is running');
    computerCardsValue += 10 
  }
  console.log(`computer cards value -> ${computerCardsValue}`);
  //reset ace card to false
  aceCard = false


return computerCardsValue
}