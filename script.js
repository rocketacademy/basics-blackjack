////////////VARIABLES////////////
var gameStart = 'gameStart';
var gameCardDrawn = 'gameCardDrawn';
var gameResultShown = 'gameResultShown';
var gameHitOrStand = 'gameHitOrStand';
var currentGameMode = gameStart;

var playerHand = [];
var dealerHand = [];

var gameDeck = [];

////////////DECK////////////
var createDeck = function () {
  var deck = [];
  var suits = ['Diamonds', 'Clubs', 'Hearts', 'Spades'];
  var indexSuits = 0;
  while (indexSuits < suits.length) {
    var currSuit = suits[indexSuits];
    var indexRanks = 1;
    while (indexRanks <= 13) {
      var cardName = indexRanks;
      if (cardName == 1) {
        cardName = 'ace';
      }
      if (cardName == 11) {
        cardName = 'jack';
      }
      if (cardName == 12) {
        cardName = 'queen';
      }
      if (cardName == 13) {
        cardName = 'king';
      }
      var card = {
        name: cardName,
        suit: currSuit,
        rank: indexRanks,
      };
      deck.push(card);
      indexRanks = indexRanks + 1;
    }
    indexSuits = indexSuits + 1;
  }
  return deck;
};

var getRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
};

var shuffleDeck = function (cards) {
  var index = 0;
  while (index < cards.length) {
    var randomIndex = getRandomIndex(cards.length);
    var currentItem = cards[index];
    var randomItem = cards[randomIndex];
    cards[index] = randomItem;
    cards[randomIndex] = currentItem;
    index = index + 1;
  }
  return cards;
};

var createNewDeck = function () {
  var newDeck = createDeck();
  var shuffledDeck = shuffleDeck(newDeck);
  return shuffledDeck;
};

////////////CHECK FOR BLACKJACK FUNCTION////////////
var checkForBlackJack = function (handArray) {
  var playerCardOne = handArray[0];
  var playerCardTwo = handArray[1];
  var isBlackJack = false;

  if (
    (playerCardOne.name == 'ace' && playerCardTwo.rank >= 10) ||
    (playerCardTwo.name == 'ace' && playerCardOne.rank >= 10)
  ) {
    isBlackJack = true;
  }
  return isBlackJack;
};

////////////CALCULATE TOTAL VALUE FUNCTION////////////
var calculateTotalHandValue = function (handArray) {
  var totalHandValue = 0;
  var aceCounter = 0;

  var index = 0;
  while (index < handArray.length) {
    var currentCard = handArray[index];
    if (currentCard.name == 'king' || currentCard.name == 'queen' || currentCard.name == 'jack') {
      totalHandValue = totalHandValue + 10;
    }
    else if (currentCard.name == 'ace') {
      totalHandValue = totalHandValue + 11;
      aceCounter = aceCounter + 1;
    } else {
      totalHandValue = totalHandValue + currentCard.rank;
    }
    index = index + 1;
  }

  index = 0;

  while (index < aceCounter) {
    if (totalHandValue > 21) {
      totalHandValue = totalHandValue - 10;
    }
    index = index + 1;
  }
  return totalHandValue;
};


////////////DISPLAY HANDS FUNCTION////////////
var displayPlayerAndDealerHands = function (playerHandArray, dealerHandArray) {
  var playerMessage = 'Player hand:<br>';
  var index = 0;
  while (index < playerHandArray.length) {
    playerMessage = playerMessage + '- ' + playerHandArray[index].name + ' of ' + playerHandArray[index].suit + '<br>';
    index = index + 1;
  }

  index = 0;
  var dealerMessage = 'Dealer hand:<br>';
  while (index < dealerHandArray.length) {
    dealerMessage = dealerMessage + '- ' + dealerHandArray[index].name + ' of ' + dealerHandArray[index].suit + '<br>';
    index = index + 1;
  }

  return playerMessage + '<br>' + dealerMessage;
};

var displayHandTotalValues = function (playerHandValue, dealerHandValue) {
  var totalHandValueMessage = '<br>Player total hand value: ' + playerHandValue + '<br>Dealer total hand value: ' + dealerHandValue;
  return totalHandValueMessage;
};

////////////MAIN FUNCTION////////////
var main = function (input) {
  var outputMessage = '';

  // first click
  if (currentGameMode == gameStart) {
    gameDeck = createNewDeck();

    playerHand.push(gameDeck.pop());
    playerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());
    console.log("playerHand", playerHand);
    console.log("dealerHand", dealerHand);

    currentGameMode = gameCardDrawn;
    outputMessage = 'Cards are dealt. Click submit button to calculate cards!';
    return outputMessage;
  }

  // second click
  if (currentGameMode == gameCardDrawn) {
    var playerHasBlackJack = checkForBlackJack(playerHand);
    var dealerHasBlackJack = checkForBlackJack(dealerHand);
    console.log("playerHasBlackJack", playerHasBlackJack);
    console.log("dealerHasBlackJack", dealerHasBlackJack);

    if (playerHasBlackJack == true || dealerHasBlackJack == true) {
      if (playerHasBlackJack == true && dealerHasBlackJack == true) {
        outputMessage = displayPlayerAndDealerHands(playerHand, dealerHand) + '<br>Its a Tie! Both have Black Jack!';
      }
      else if (playerHasBlackJack == true && dealerHasBlackJack == false) {
        outputMessage = displayPlayerAndDealerHands(playerHand, dealerHand) + '<br>Player wins! Black Jack!';
      }
      else {
        outputMessage = displayPlayerAndDealerHands(playerHand, dealerHand) + '<br>Dealer wins! Black Jack!';
      }
    }
    else {
      outputMessage = displayPlayerAndDealerHands(playerHand, dealerHand) + '<br> There are no Black Jacks. <br>Please input "hit" or "stand".';

      currentGameMode = gameHitOrStand;
    }
    return outputMessage;
  }

  // third click
  if (currentGameMode == gameHitOrStand) {
    if (input == 'hit') {
      playerHand.push(gameDeck.pop());
      outputMessage = displayPlayerAndDealerHands(playerHand, dealerHand) + '<br> You drew another card. <br>Please input "hit" or "stand".';
    }

    else if (input == 'stand') {
     
      var playerHandTotalValue = calculateTotalHandValue(playerHand);
      var dealerHandTotalValue = calculateTotalHandValue(dealerHand);

      while (dealerHandTotalValue < 17) {
        dealerHand.push(gameDeck.pop());
        dealerHandTotalValue = calculateTotalHandValue(dealerHand);
      }
      if ((playerHandTotalValue == dealerHandTotalValue) ||
          (playerHandTotalValue > 21 && dealerHandTotalValue > 21)) {
        outputMessage = displayPlayerAndDealerHands(playerHand, dealerHand) + "<br>Its a Tie!" + displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue);
      } 
      else if ((playerHandTotalValue > dealerHandTotalValue && playerHandTotalValue <= 21) ||
                (playerHandTotalValue <= 21 && dealerHandTotalValue > 21)) { 
        outputMessage = displayPlayerAndDealerHands(playerHand, dealerHand) + "<br>Player wins!" + displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue);
      } 
      else {
        outputMessage = displayPlayerAndDealerHands(playerHand, dealerHand) + "<br>Dealer wins!" + displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue);
      }
      currentGameMode = gameResultShown;
    }

    else {
      outputMessage = 'Wrong input... only type "hit" or "stand".<br><br>' + displayPlayerAndDealerHands(playerHand, dealerHand);
    }

  return outputMessage;
}
};