// ==================  Deck Creation ================= \\
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
};

// ==================  Deck Shuffling ================= \\
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
// ==================  Misc Variables ================= \\
// prepared deck
var deck = shuffleCards(makeDeck())
var playerCards = [];
var dealerCards = [];
var burstSum = 22
var playerSum;
var dealerSum;
var myOutputValue = ''

// ==================  Game Modes ================= \\
var gameMode = ''
var initialDeal;
var playerHitOrStand;
var dealerHitOrStand;
var results
// 
var currentGameMode = initialDeal

// ==================  Card Dealing Function ================= \\
var dealCardToPlayer = function() {
  playerCards.push(deck.pop());
};

var dealCardToDealer = function() {
  dealerCards.push(deck.pop());
};

// ==================  Output Messages ================= \\
var playerWonMessage = `You Won!`
var playerLostMessage = `You Lost!`
var drawMessage = `It is a draw!`
var refreshMessage = `Please refresh the game to start a new game.`


// ==================  Main Function ================= \\
var main = function(){
  if(playerCards.length == 0 && currentGameMode == initialDeal){
    dealCardToPlayer();
    dealCardToDealer();
  }
  if(playerCards.length == 1 && currentGameMode == initialDeal){
    dealCardToPlayer();
    dealCardToDealer();
  }
  var sumUpCards = function(){
  playerSum = Number(playerCards[0].rank + playerCards[1].rank)
  dealerSum = Number(dealerCards[0].rank + dealerCards[1].rank)
  console.log(`It reached here`)
  }
  if(playerCards.length == 2){
  compareSums();

  console.log (playerCards)
  console.log (dealerCards)
  console.log(playerSum)
  console.log(dealerSum)
  }
  return myOutputValue
}

// ==================  Sum Comparing Function ================= \\
  var compareSums = function(){
    // Check if either players got Black Jack
    checkBlackJack();
    //player hits burst value
    if (playerSum >= burstSum && dealerSum < burstSum){
      myOutputValue = playerLostMessage
      console.log(`Player burst, dealer did not`)
      return myOutputValue
    }
    //dealer hits burst value
    if (playerSum < burstSum && dealerSum >= burstSum){
      myOutputValue = playerWonMessage
      console.log(`Dealer burst, player did not`)
      return myOutputValue
    }
    
    //player total is less than dealer
    if (playerSum < dealerSum && dealerSum < burstSum && playerSum < burstSum){
      myOutputValue = playerLostMessage
      console.log(`Player lost, both did not burst`)
      return myOutputValue
    }
    if (playerSum > dealerSum && dealerSum < burstSum && playerSum < burstSum){
      myOutputValue = playerWonMessage
      console.log(`Player won, both did not burst`)
      return myOutputValue
    }
    // player total is equal to dealer
    if (playerSum == dealerSum && playerSum < burstSum && dealerSum < burstSum){
      myOutputValue = drawMessage
      console.log('Draw, both did not burst')
      return myOutputValue
    }
  }

// ==================  Sum Comparing Function ================= \\
var checkBlackJack = function(){
  if(dealerCards.length == 2 && dealerSum == 21){
    myOutputValue = playerLostMessage
    console.log(`Dealer got Black Jack`)
    return myOutputValue
  } else if (playerCards.length == 2 && playerSum == 21){
    myOutputValue = playerWonMessage
    console.log(`Player got Black Jack`)
    return myOutputValue
  }
}