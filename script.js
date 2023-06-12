var stateManager = "instructions";
var computerCards = [];
var playerCards = [];

var main = function (input) {
  var playingCards = makeDeck();
  var shuffledDeck = shuffleCards(playingCards);

  input = input.toLowerCase();

  if (stateManager == "instructions") {
    stateManager = "drawPhase";
    console.log(stateManager);
    myOutputValue = `Welcome to BlackJack! ♣ ♦ ♥ ♠<br><br>
Click the "Submit" button to deal the cards`;
    return myOutputValue;
  } else if (stateManager == "drawPhase") {
    stateManager = "hitOrStandPhase";
    for (var i = 0; i < 2; i += 1) {
      playerCards.push(shuffledDeck.pop());
    }
    for (var j = 0; j < 2; j += 1) {
      computerCards.push(shuffledDeck.pop());
    }

    var computerHandValue = calcHand(computerCards);
    var playerHandValue = calcHand(playerCards);

    var myOutputValue = `Player drew, ${playerCards[0].name} of ${playerCards[0].suit}, ${playerCards[1].name} of ${playerCards[1].suit}. Total Hand Value is ${playerHandValue}<br><br>Computer drew, ${computerCards[0].name} of ${computerCards[0].suit}, ${computerCards[1].name} of ${computerCards[1].suit}. Total Hand Value is ${computerHandValue}<br><br>Please enter "hit" or "stand", then click Submit`;

    return myOutputValue;
  } else if (stateManager == "hitOrStandPhase") {
    if (input == "hit") {
      playerCards.push(shuffledDeck.pop());
      var computerHandValue = calcHand(computerCards);
      var playerHandValue = calcHand(playerCards);
      if (playerHandValue <= 21) {
        var myOutputValue = `${convertPlayerHandToString(
          playerCards
        )}. Total Hand Value is ${playerHandValue}<br><br> ${convertComputerHandToString(
          computerCards
        )}. Total Hand Value is ${computerHandValue}<br><br>Player has not chosen to stand<br><br>Please enter "hit" or "stand".<br><br> Else, click submit to see Computer's next move.`;
      } else {
        stateManager = "gameOver";
        var myOutputValue = `${convertPlayerHandToString(
          playerCards
        )}. Total Hand Value is ${playerHandValue}<br><br> ${convertComputerHandToString(
          computerCards
        )}. Total Hand Value is ${computerHandValue}<br><br>Player has busted and loses.<br><br>Please refresh to play again.`;
      }
    } else if (input == "stand") {
      var computerHandValue = calcHand(computerCards);
      var playerHandValue = calcHand(playerCards);
      var myOutputValue = `${convertPlayerHandToString(
        playerCards
      )}. Total Hand Value is ${playerHandValue}<br><br> ${convertComputerHandToString(
        computerCards
      )}. Total Hand Value is ${computerHandValue}<br><br>Player has chosen to stand<br><br>If player has not chosen to stand, please enter "hit".<br><br> Else, click submit to see Computer's next move.`;
    } else if (input == "") {
      stateManager = "computerPhase";
      var computerHandValue = calcHand(computerCards);
      var playerHandValue = calcHand(playerCards);
      var myOutputValue = `${convertPlayerHandToString(
        playerCards
      )}. Total Hand Value is ${playerHandValue}<br><br> ${convertComputerHandToString(
        computerCards
      )}. Total Hand Value is ${computerHandValue}<br><br> It is now computer's turn, computer is thinking....<br><br> Click submit again to see results!!`;
    } else if (input != "hit" || input != stand) {
      var computerHandValue = calcHand(computerCards);
      var playerHandValue = calcHand(playerCards);
      var myOutputValue = `${convertPlayerHandToString(
        playerCards
      )}. Total Hand Value is ${playerHandValue}<br><br> ${convertComputerHandToString(
        computerCards
      )}. Total Hand Value is ${computerHandValue}<br><br>You have entered a wrong input. Please enter "hit" or "stand", then click Submit<br><br> Else, click submit to see Computer's next move.`;
    }
    return myOutputValue;
  } else if (stateManager == "computerPhase") {
    var computerHandValue = calcHand(computerCards);
    var playerHandValue = calcHand(playerCards);
    while (computerHandValue <= playerHandValue) {
      if (computerHandValue <= 21) {
        computerCards.push(shuffledDeck.pop());
        var computerHandValue = calcHand(computerCards);
        var playerHandValue = calcHand(playerCards);
      }
    }
    if (computerHandValue > playerHandValue && computerHandValue <= 21) {
      stateManager = "gameOver";
      myOutputValue = `${convertPlayerHandToString(
        playerCards
      )}. Total Hand Value is ${playerHandValue}<br><br> ${convertComputerHandToString(
        computerCards
      )}. Total Hand Value is ${computerHandValue}<br><br> Computer wins!!`;
    } else if (computerHandValue < playerHandValue) {
      stateManager = "gameOver";
      myOutputValue = `${convertPlayerHandToString(
        playerCards
      )}. Total Hand Value is ${playerHandValue}<br><br> ${convertComputerHandToString(
        computerCards
      )}. Total Hand Value is ${computerHandValue}<br><br> Player wins!!`;
    } else if (computerHandValue > 21) {
      stateManager = "gameOver";
      myOutputValue = `${convertPlayerHandToString(
        playerCards
      )}. Total Hand Value is ${playerHandValue}<br><br> ${convertComputerHandToString(
        computerCards
      )}. Total Hand Value is ${computerHandValue}<br><br> Computer has busted! Player wins!!`;
    } else if (computerHandValue == playerHandValue) {
      stateManager = "gameOver";
      myOutputValue = `${convertPlayerHandToString(
        playerCards
      )}. Total Hand Value is ${playerHandValue}<br><br> ${convertComputerHandToString(
        computerCards
      )}. Total Hand Value is ${computerHandValue}<br><br> It's a draw!`;
    }
    return myOutputValue;
  } else if (stateManager == "gameOver") {
    playerCards = [];
    computerCards = [];
    myOutputValue = `Please click Submit to play again`;
    stateManager = "instructions";
    return myOutputValue;
  }
};

var convertPlayerHandToString = function (hand) {
  var cards = "Player Drew";
  var handIndex = 0;

  while (handIndex < hand.length) {
    cards =
      cards +
      ", " +
      hand[handIndex].name +
      " " +
      "of" +
      " " +
      hand[handIndex].suit;
    handIndex = handIndex + 1;
  }
  return cards;
};

var convertComputerHandToString = function (hand) {
  var cards = "Computer Drew";
  var handIndex = 0;

  while (handIndex < hand.length) {
    cards =
      cards +
      ", " +
      hand[handIndex].name +
      " " +
      "of" +
      " " +
      hand[handIndex].suit;
    handIndex = handIndex + 1;
  }
  return cards;
};

var calcHand = function (hand) {
  var handValue = 0;
  var hasAce = false;
  for (var k = 0; k < hand.length; k += 1) {
    handValue += hand[k].value;
    if (hand[k].name == "Ace") {
      hasAce = true;
    }
  }
  if (handValue < 12 && hasAce == true) {
    handValue = handValue + 10;
  }
  return handValue;
};

var shuffleCards = function (cardDeck) {
  var l = 0;
  while (l < cardDeck.length) {
    var randomL = getRandomL(cardDeck.length);
    var currentCard = cardDeck[l];
    var randomCard = cardDeck[randomL];
    cardDeck[l] = randomCard;
    cardDeck[randomL] = currentCard;
    l += 1;
  }
  return cardDeck;
};

var getRandomL = function (size) {
  return Math.floor(Math.random() * size);
};

var makeDeck = function () {
  var cardDeck = [];
  var suits = ["Diamond", "Clubs", "Hearts", "Spades"];

  var suitM = 0;
  while (suitM < suits.length) {
    var currentSuit = suits[suitM];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      var cardValue = rankCounter;

      if (cardName == 1) {
        cardName = "Ace";
        cardValue = 1;
      }
      if (cardName == 11) {
        cardName = "Jack";
        cardValue = 10;
      }
      if (cardName == 12) {
        cardName = "Queen";
        cardValue = 10;
      }
      if (cardName == 13) {
        cardName = "King";
        cardValue = 10;
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: cardValue,
      };
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitM += 1;
  }
  return cardDeck;
};
