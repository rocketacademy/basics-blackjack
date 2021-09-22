//Initialise global variable for computer cards and player cards
var computerCards = []
var playerCards = []

//Initialise global variable for computer and player cards value
var computerCardsValue = 0
var playerCardsValue = 0

//Initialize global variable for ace card
var aceCard = false

//Initialize global variable for black jack
var blackJack = false

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

    //create a variable for suits emoji
    var suitEmoji

    if (suits[suitIndex] == 'hearts'){
      suitEmoji = '♥️';
    }else if (suits[suitIndex] == 'diamonds'){
      suitEmoji = '♦️';
    }else if (suits[suitIndex] == 'clubs'){
      suitEmoji = '♣';
    }else if (suits[suitIndex] == 'spades'){
      suitEmoji = '♠';
    }

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;

      //Create a variable for card value
      var cardValue = rankCounter

      //Create a variable for number emoji
      var numEmoji

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = 'ace';
        numEmoji = '🅰️'
      } else if (cardName == 2){
        numEmoji = '2️⃣'
      }else if (cardName == 3){
        numEmoji = '3️⃣'
      }else if (cardName == 3){
        numEmoji = '3️⃣'
      }else if (cardName == 4){
        numEmoji = '4️⃣'
      }else if (cardName == 5){
        numEmoji = '5️⃣'
      }else if (cardName == 6){
        numEmoji = '6️⃣'
      }else if (cardName == 7){
        numEmoji = '7️⃣'
      }else if (cardName == 8){
        numEmoji = '8️⃣'
      }else if (cardName == 9){
        numEmoji = '9️⃣'
      }else if (cardName == 10){
        numEmoji = '🔟'
      }
      else if (cardName == 11) {
        cardName = 'jack';
        cardValue = 10
        numEmoji = 'J'
      } else if (cardName == 12) {
        cardName = 'queen';
        cardValue = 10
        numEmoji = '👸'
      } else if (cardName == 13) {
        cardName = 'king';
        cardValue = 10
        numEmoji = '🤴'
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        value: cardValue,
        emoji: suitEmoji,
        number: numEmoji
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

  calcComputerCardsValue()
  calcPlayerCardsValue()

  //if computer hits blackjack or player hits blackjack
  if ((computerCardsValue == 21 && playerCardsValue !=21) ||
  (computerCardsValue != 21 && playerCardsValue == 21)){
    blackJack = true
    return compareCardsValue()
  }

  else return bananaImage + `<br>Your Bananas: ${playerCardsValue}<br><br>Computer First Card: ${computerCards[0].number} ${computerCards[0].emoji}<br>Your Cards: ${showPlayerCards()}<br><br>Type 'hit' for more bananas or 'stand' if you have enough bananas.`
}

var bananaImage = '<img src="https://th.bing.com/th/id/OIP.DT4i9tYI3l0Lt7psD5GlvAHaEK?pid=ImgDet&rs=1"/>';

//create a function for player to choose hit or stand
var playerHitOrStand = function(input){
  console.log('player hit or stand function is running');

  var myOutputValue = ''
  var bustImage = '<img src="https://c.tenor.com/aae3d8PF48AAAAAC/despicable-me-minion.gif"/>';

  //if input is hit, pop a card from the shuffled deck to player hands and calculate player cards value
  if (input == 'hit' && playerCardsValue < 21){

      playerCards.push(shuffledDeck.pop())

      console.log(`hit player cards -> ${showPlayerCards()}`)

      myOutputValue = `Your Bananas: ${calcPlayerCardsValue()}<br><br>Your Cards: ${showPlayerCards()}<br><br>`

      //if player cards value > 21, player bust
      if (playerCardsValue > 21){

        //if player bust, cannot draw cards anymore.
        myOutputValue = bustImage + '<br>' + myOutputValue + 'Oh no, you have bust. It is computer turn. Press submit.'

      //else, ask if player want to hit or stand  
      }else
        myOutputValue = bananaImage + '<br>' + myOutputValue + `Type 'hit' for more bananas or 'stand' if you have enough bananas.`

      return myOutputValue
      
    
  //else, it is computer's turn to hit or stand
  }else 
    return computerHitOrStand()
}

//create a function for computer/deal to hit or stand
var computerHitOrStand = function(){
  console.log(`computer hit or stand function is running`);
  
  while (calcComputerCardsValue() < 17){

    computerCards.push(shuffledDeck.pop())

  }

  if (calcComputerCardsValue() >= 17){
    return compareCardsValue()
  }
}

//create a function to compare the drawn cards value
var compareCardsValue = function(){
  console.log('compare cards value function is running')

  var message = `Computer Bananas: ${computerCardsValue}<br>Your Bananas: ${playerCardsValue}<br><br>Computer Cards: ${showComputerCards()}<br>Player Cards: ${showPlayerCards()}<br><br>`

  var winImage = '<img src="https://c.tenor.com/B_zYdea4l-4AAAAC/yay-minions.gif"/>';
  var loseImage = '<img src="https://c.tenor.com/jGobNIabMIkAAAAC/minion-minions.gif"/>';
  var tieImage = '<img src="https://c.tenor.com/jNcYEscYhwoAAAAC/stuart-bob.gif"/>';

  //if computer cards value is greater than player cards value, computer wins
    //if black jack = true and computer cards value = 21, computer wins
  if ((computerCardsValue > playerCardsValue && computerCardsValue < 22) || (computerCardsValue < 22 && playerCardsValue > 21) || (blackJack == true && computerCardsValue == 21)){
    message = loseImage + '<br>' + message + `Computer win! Press submit to play again!`
  }
  //if player cards value is greater than computer cards value, player wins
    //if black jack = true and player cards value = 21, player wins
  else if ((playerCardsValue > computerCardsValue && playerCardsValue < 22) || (playerCardsValue < 22 && computerCardsValue > 21) || (blackJack == true && playerCardsValue == 21)){
    message = winImage + '<br>' + message + `You win! Press submit to play again!`
  }
  //if computer cards value = player cards value, it's a tie
  else if ((playerCardsValue == computerCardsValue) || (playerCardsValue > 21 && computerCardsValue > 21)){
    message = tieImage + '<br>' + message + `It's a tie! Press submit to play again!`
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

//create a function to show player cards
var showPlayerCards = function(){
  console.log('show player cards function is running');
  var showOutput = ''
  var showIndex = 0
  while (showIndex < playerCards.length){
    showOutput = showOutput += playerCards[showIndex].number + ' ' + playerCards[showIndex].emoji + ' | '
    showIndex += 1
  }
  return showOutput
}

//create a function to show computer cards
var showComputerCards = function(){
  console.log('show computer cards function is running');
  var computerOutput = ''
  var computerIndex = 0
  while (computerIndex < computerCards.length){
    computerOutput = computerOutput += computerCards[computerIndex].number + ' ' + computerCards[computerIndex].emoji + ' | '
    computerIndex += 1
  }
  return computerOutput
}