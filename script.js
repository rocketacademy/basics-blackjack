var deck = shuffleCards(createDeck());
var dealerCards = [];
var playerCards = [];

//check if Blackjack
var isBlackjack = function(hand){
  if(hand.length == 2 && cardsSum(hand) == 21){
    return true;
  }else {
    return false;
  }
}

//Deal card
var dealCard = function (hand) {
  hand.push(deck.pop());
};

//Get sum of cards
var cardsSum = function (hand) {
  var sum = 0;
  var aceCount = 0;
  for (card in hand){
    if(card.name == 'ace'){
      sum += 11;
      aceCount += 1;
    }else {
      sum += card.number;
    }
  }

  //if sum is more than 21
  if (sum > 21 && aceCount > 0){
    for(let x = 0; x < aceCount; x++){
      sum -= 10;
      if (sum <= 21){
        break;
      }
    }
    
  }
  return sum;
}



var main = function (input) {
  var myOutputValue = ``;

  //Player deal cards when click submit button
  if(input == ''){

    if(playerCards.length === 0){
      //First card
      dealCard(playerCards);
      dealCard(dealerCards);
      //Second card
      dealCard(playerCards);
      dealCard(dealerCards);

      myOutputValue = `Your cards are ${playerCards}. Please type 'hit' to draw more cards, or 'stand' to end your turn`;

      //if Blackjack
      if (isBlackjack(playerCards)){
        myOutputValue = `Blackjack! Your cards are ${playerCards}.You've won! Click submit to play again.`;
        resetGame();
      }
    }
  }

  //if player wants to draw more cards
  if(input == `hit`){
    dealCard(playerCards);
    if(cardsSum(playerCards) > 21){
      myOutputValue = `You lose! Your cards are ${playerCards}. Click submit to play again.`;
      resetGame();
    }else{
      myOutputValue = `You drew a new card. Your cards are ${playerCards}. Please type 'hit' to draw more cards, or 'stand' to end your turn.`;
    }
  }
  //if player does not want to draw more cards
  if(input == `stand`){
    if(cardsSum(dealerCards) <= 16){
      dealCard(dealerCards);
      var dealerSum = cardsSum(dealerCards);
      if(dealerSum <= 21 && dealerSum > cardsSum(playerCards)){
        myOutputValue = `You lose! Your cards are ${playerCards} and dealer's cards are ${dealerCards}. Click submit to play again.`;
        resetGame();
      }else if(dealerSum > 21){
        myOutputValue = `You win! Dealer's cards busted! Click submit to play again.`;
        resetGame();
      }else{
        myOutputValue = `.`;
      }
    }
    if(cardsSum(dealerCards) >= 17){
      if(cardsSum(dealerCards) > cardsSum(playerCards)){
        myOutputValue = `You lose! Your cards are ${playerCards} and dealer's cards are ${dealerCards}. Click submit to play again.`;
        resetGame();
      }else if(cardsSum(dealerCards) < cardsSum(playerCards)){
        myOutputValue = `You win! Your cards are ${playerCards} and dealer's cards are ${dealerCards}. Click submit to play again.`;
        resetGame();
      }else {
        myOutputValue = `It's a draw! Click submit to play again.`;
        resetGame();
      }
      
    }
  

  }


  return myOutputValue;
};

//Shuffle cards
var createDeck = function() {
  var deck = [];
  var allSuits = ['club', 'heart', 'spade', 'diamond'];
  for (suit in allSuits) {
    //Number on card
    var cardNumber = 1;
    while(cardNumber <= 13){
      var card = cardNumber;

      //Assign number to cards
      if (card == 1){
        card = 'ace';
      }else if (card == 11){
        card = 'jack';
      }else if (card == 12){
        card = 'queen';
      }else if (card ==13){
        card = 'king';
      }

      //generate card
      var finalCard = {
        name: card,
        suit: suit,
        number: cardNumber,
      };
      
      //add card to deck
      deck.push(finalCard);

      cardNumber += 1;
    }

  }
  return deck;
}

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

//Reset game
var resetGame = function(){
  dealerCards = [];
  playerCards = [];
  deck = shuffleCards(createDeck());
}