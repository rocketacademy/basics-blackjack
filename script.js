var gameMode = 0;
var userName = '';
var computerPoint = 0;
var playerPoint = 0;
var playerHand = [];
var computerHand = [];
var computerCard = [];
var playerCard = [];

var main = function (input) {

  var deck = makeDeck();
  var shuffledDeck = shuffleCards(deck);
  var myOutputValue ='';

  if(gameMode == 0){
    computerCard = shuffledDeck.pop();
    playerCard = shuffledDeck.pop();

    playerHand.push(playerCard)
    computerHand.push(computerCard)

    computerCard = shuffledDeck.pop();
    playerCard = shuffledDeck.pop();

    playerHand.push(playerCard);
    computerHand.push(computerCard);

    console.log (playerHand)
    console.log(computerHand)

    userName = input
    myOutputValue = 'You are now playing Blackjack.<br>First, enter your username'
    gameMode = 1
  }

  if(gameMode == 0.5){

    playerHand = []
    computerHand = []

    computerCard = shuffledDeck.pop();
    playerCard = shuffledDeck.pop();

    playerHand.push(playerCard);
    computerHand.push(computerCard);

    computerCard = shuffledDeck.pop();
    playerCard = shuffledDeck.pop();

    playerHand.push(playerCard);
    computerHand.push(computerCard);

    console.log(playerHand);
    console.log(computerHand);
    myOutputValue = 'Player and computer have draw two cards from the deck.<br>Press the "Submit" button again to display cards'
    gameMode = 1
    return myOutputValue
  }

  if(gameMode == 1){

    var computerPoint = displayComputerValue(computerHand)
    var playerPoint = displayPlayerValue(playerHand)

    if(input == "hit"){
      playerCard = shuffledDeck.pop();
      playerHand.push(playerCard);
      
      var playerPoint = displayPlayerValue(playerHand)

      myOutputValue = displayHand(playerHand,computerHand) + '<br> You draw a card. Please input "hit" or "stand".'
    }
    else if (input == "stand"){

    }
    else {
      myOutputValue = 'Please type "hit" or "stand" only.<br>'+ displayHand(playerHand,computerHand)
    }
  }

  //verify game result
  if(gameMode == 2){ 

    var computerPoint = displayComputerValue(computerHand)
    var playerPoint = displayPlayerValue(playerHand)

    console.log(computerPoint)
    console.log(playerPoint)
    
    var playerHasBlackJack = checkBlackJack(playerPoint)
    var computerHasBlackJack = checkBlackJack(computerPoint)

    while (computerPoint < 17){
      computerHand.push(shuffledDeck.pop())
      computerPoint = displayComputerValue(computerHand)
    }
    var restartMessage = 'Press the "Submit" button to restart.';
    var outputMessage = displayHand(playerHand, computerHand);
    
    if (playerHasBlackJack == true || computerHasBlackJack == true){
      if(playerHasBlackJack == true && computerHasBlackJack == true){
        myOutputValue = outputMessage+'<br>Computer has '+displayComputerValue(computerHand)+' points.<br>'+userName+' has '+displayPlayerValue(playerHand)+' points.<br>It is a blackjack tie!<br>'+restartMessage
        gameMode = 0.5
      }
      else if (playerHasBlackJack == true && computerHasBlackJack == false){
        myOutputValue = outputMessage+'<br>Computer has '+displayComputerValue(computerHand)+ ' points.<br>'+userName+' has '+displayPlayerValue(playerHand)+' points.<br>'+userName+ 'has win by blackjack!<br>'+restartMessage
        gameMode = 0.5
      }
      else {
        myOutputValue = outputMessage+'<br>Computer has '+displayComputerValue(computerHand)+ ' points. <br>'+userName+' has '+displayPlayerValue(playerHand)+' points.<br>Computer has win by blackjack!<br>'+restartMessage
        gameMode = 0.5
      }
    }

    if (playerPoint == computerPoint){
      myOutputValue = outputMessage+'<br>Computer has '+displayComputerValue(computerHand)+' points.<br>'+userName+' has '+displayPlayerValue(playerHand)+' points.<br>It is a tie!<br>'+restartMessage
      gameMode = 0.5
    }
    else if (playerPoint > computerPoint && playerPoint < 22 || computerPoint > 21 && playerPoint < 22){
      myOutputValue = outputMessage+'<br>Computer has '+displayComputerValue(computerHand)+ ' points.<br>'+userName+' has '+displayPlayerValue(playerHand)+' points.<br>'+userName+ 'has win!<br>'+restartMessage
      gameMode = 0.5
    }
    else if (computerPoint > playerPoint && computerPoint < 22 || playerPoint > 21 && computerPoint < 22){
      myOutputValue = outputMessage+'<br>Computer has '+displayComputerValue(computerHand)+ ' points. <br>'+userName+' has '+displayPlayerValue(playerHand)+' points.<br>Computer has win!<br>'+restartMessage
      gameMode = 0.5
    }
    
  }
  return myOutputValue;
};


// Output message with hand array loop (works for after each draw)
var displayHand = function(playerHand, computerHand){
  var playerCards = '';
  var index = 0;
  while(index < playerHand.length){
    playerCards += 'Player Hand: ' +playerHand[index].name + ' of '+playerHand[index].suit+ '<br>';
    index++
  }

  var computerCards = '';
  index = 0;
  while (index < computerHand.length){
    computerCards += 'Computer Hand: ' + computerHand[index].name+ ' of '+computerHand[index].suit+ '<br>'
    index++
  }
  return playerCards + '<br>' + computerCards;
}

// Output message with hand value combined (works for after each draw)
var displayPlayerValue = function (playerHand) {
  var playerValue = 0;
  var index = 0;
  var aceCount = 0;

  while (index < playerHand.length) {
    playerValue += playerHand[index].value;

    if (playerHand[index].value == 11){
      aceCount++
    }
    index++
  }

  while (aceCount > 0 && playerValue > 21){
    playerValue -= 10
    aceCount--
  }
  return playerValue;
}

var displayComputerValue = function (computerHand) {
  var computerValue = 0;
  var index = 0;
  var aceCount = 0;

  while (index < computerHand.length) {
    computerValue += computerHand[index].value;

    if (computerHand[index].value == 11){
      aceCount++
    }
    index++
  }

  while (aceCount > 0 && computerValue > 21){
    computerValue -= 10
    aceCount--
  }
  return computerValue;
}

var checkBlackJack = function(handValue){
  var blackJack = false
  if(handValue === 21){
    return blackJack = true
  }
  return blackJack;
}


var makeDeck = function () {
  var cardDeck = [];
  var suits = ["❤️", "♦️", "♣️", "♠️"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
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

      var cardValue = rankCounter;

      if(cardName == "ace"){
        cardValue = 11
      }

      if(rankCounter == 11){
        cardValue = 10
      }
      else if(rankCounter == 12){
        cardValue = 10
      }
      else if(rankCounter == 13){
        cardValue = 10
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: cardValue,
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

var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

var shuffleCards = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);

    var randomCard = cardDeck[randomIndex];

    var currentCard = cardDeck[currentIndex];

    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;

    currentIndex = currentIndex + 1;
  }

  return cardDeck;
};
