// == Blackjack Casino Style (Basic) ==
// Computer is the dealer, human is the player
// Each player is dealed with two cards to start
// Player can decide to hit (draw) or stand (enf their turn). Player has to hit if its total card value is below 12. Player can draw any amount of cards until the cards value not more than 21. Bust if its more than 21.
// Dealer has to hit if his hand is below 17
// ace can be 1 or 11, jack queen and king are all value of 10
// Dealer has hit under his hand is more than 17

// helper functions needed: cardGenerator, cardShuffler, cardDealer, cardTotal
// global variable: dealerCards, playerCard

var dealerCards = [];
var playerCards = [];
var dealerCardValue = 0;
var playerCardValue = 0;
var gameStatus = "dealing";
var shuffledDeck = {};

var cardGenerator = function () {
  suits = ["Club ♣︎", "Diamond ♦︎", "Heart ♥︎", "Spade ♠︎"];
  deck = [];
  for (i = 0; i < suits.length; i += 1) {
    currentSuit = suits[i];
    for (j = 1; j <= 13; j += 1) {
      var card = {
        rank: j,
        suit: currentSuit,
        name: j,
      };
      if (j == 11) {
        card.name = "Jack";
      } else if (j == 12) {
        card.name = "Queen";
      } else if (j == 13) {
        card.name = "King";
      } else if (j == 1) {
        card.name = "Ace";
      }
      deck.push(card);
    }
  }
  return deck;
};

var getRandomIndex = function () {
  return Math.floor(Math.random() * 52);
};

var cardShuffler = function (shuffledDeck) {
  for (i = 0; i < shuffledDeck.length; i += 1) {
    console.log(`deck length is ${shuffledDeck.length}`);
    var currentIndex = i;
    var randomIndex = getRandomIndex();
    var currentCard = deck[i];
    var randomCard = deck[randomIndex];
    shuffledDeck[currentIndex] = randomCard;
    shuffledDeck[randomIndex] = currentCard;
  }
  return shuffledDeck;
};

var cardDealer = function (shuffledDeck) {
  if (gameStatus == "dealing") {
    playerCards.push(shuffledDeck.pop());
    dealerCards.push(shuffledDeck.pop());
    playerCards.push(shuffledDeck.pop());
    dealerCards.push(shuffledDeck.pop());
    console.log(shuffledDeck); // check for no of cards left in deck
    gameStatus = "playersTurn";
  }
};

var cardTotalValue = function () {
  dealerCardValue = 0;
  for (i = 0; i < dealerCards.length; i += 1) {
    if (
      dealerCards[i].name == "Jack" ||
      dealerCards[i].name == "Queen" ||
      dealerCards[i].name == "King"
    ) {
      dealerCardValue += 10;
    } else if (dealerCards[i].name == "Ace") {
      aceValue = aceCard(dealerCards);
      dealerCardValue += aceValue;
    } else {
      dealerCardValue += dealerCards[i].rank;
    }
  }
  if (dealerCards[0].name == "Ace" && dealerCards[1].name == "Ace") {
    dealerCardValue == 21;
  }
  for (i = 0; i < dealerCards.length; i += 1) {
    if (dealerCards.length > 2 && dealerCards[i].name == "Ace") {
      if (dealerCardValue <= 10) {
        var aceValue = 11;
        dealerCardValue += aceValue;
      } else if (dealerCardValue > 10) {
        var aceValue = 1;
        dealerCardValue += aceValue;
      }
    }
  }

  playerCardValue = 0;
  for (i = 0; i < playerCards.length; i += 1) {
    if (
      playerCards[i].name == "Jack" ||
      playerCards[i].name == "Queen" ||
      playerCards[i].name == "King"
    ) {
      playerCardValue += 10;
    } else if (playerCards[i].name == "Ace") {
      aceValue = aceCard(playerCards);
      playerCardValue += aceValue;
    } else {
      playerCardValue += playerCards[i].rank;
    }
  }
  for (i = 0; i < playerCards.length; i += 1) {
    if (playerCards.length > 2 && playerCards[i].name == "Ace") {
      if (playerCardValue <= 10) {
        var aceValue = 11;
        playerCardValue += aceValue;
      } else if (playerCardValue > 10) {
        var aceValue = 1;
        playerCardValue += aceValue;
      }
    }
  }

  if (playerCards[0].name == "Ace" && playerCards[1].name == "Ace") {
    playerCardValue == 21;
  }
};

var aceCard = function (cards) {
  if (cards.length == 2) {
    var aceValue = 11;
  } else if (cards.length > 2) {
    var aceValue = 0;
  }
  return aceValue;
};

var checkForBlackJack = function () {
  var output = "";
  if (dealerCardValue == 21) {
    output = `${outputDisplay()} <br> The dealer drew BLACK JACK. Dealer WON!`;
    output += "<br><br> Game has reset";
    reset();
  } else if (playerCardValue == 21) {
    output = `${outputDisplay()} <br> Player drew BLACK JACK. Player WON!`;
    output += "<br><br> Game has reset";
    reset();
  } else if (dealerCardValue == 21 && playerCardValue == 21) {
    output = `${outputDisplay()} <br> Player and Dealer both drew BLACK JACK. IT IS A DRAW!`;
    output += "<br><br> Game has reset";
    reset();
  }
  return output;
};

var hitOrStandPlayer = function () {
  if (playerCardValue < 12) {
    output = `== PLAYERS TURN == <br> Player, your current total card value is ${playerCardValue}, it is below 12, you can only input "Hit"`;
  } else if (12 < playerCardValue < 21) {
    output = `== PLAYERS TURN == <br> Player, your current total card value is ${playerCardValue}, it is between 12 and 21, you can choose to input "Hit" or "Stand"`;
  }
  return output;
};

var reset = function () {
  dealerCards = [];
  playerCards = [];
  dealerCardValue = 0;
  playerCardValue = 0;
  gameStatus = "dealing";
  shuffledDeck = {};
};

var playersAction = function (input) {
  if (input != "Hit" && input != "Stand") {
    output = `Please click on Hit or Stand`;
  } else if (playerCardValue < 12 && input != "Hit") {
    output = `Please enter hit as your card value is below 12`;
  } else if (input == "Hit") {
    playerCards.push(shuffledDeck.pop());
    cardTotalValue();
    if (playerCardValue > 21) {
      output = `${outputDisplay()} Player, your total value is ${playerCardValue}. IT IS A BUST!!`;
      output += "<br><br> Game has reset";
      reset();
    } else {
      output = `${outputDisplay()} Player, your current total card value is ${playerCardValue}. <br><br> To continue, input Hit or Stand`;
    }
  } else if (input == "Stand") {
    gameStatus = "dealersTurn";
    output = `${dealersAction()}`;
  }
  return output;
};

var dealersAction = function () {
  while (dealerCardValue < 17) {
    dealerCards.push(shuffledDeck.pop());
    cardTotalValue();
    if (dealerCardValue > 21) {
      output = `${outputDisplay()} <br> Dealers total value is ${dealerCardValue}. IT IS A BUST!! `;
      output += "<br><br> Game has reset";
      reset();
      return output;
    }
  }
  if (dealerCardValue >= 17) {
    output = `${outputDisplay()} <br> Dealers total card value is ${dealerCardValue}`;
  }
  gameStatus = "valueComparer";
  output = `${valueComparison()}`;
  return output;
};

var valueComparison = function () {
  if (playerCardValue > dealerCardValue) {
    output = `${outputDisplay()} <br> == RESULT == <br> Players Total Value: ${playerCardValue} <br> 
    Dealers Total Value: ${dealerCardValue} <br> Player WON`;
  } else if (playerCardValue < dealerCardValue) {
    output = `${outputDisplay()} <br> == RESULT == <br> Players Total Value: ${playerCardValue} <br> 
    Dealers Total Value: ${dealerCardValue} <br> Dealer WON`;
  } else {
    output = `${outputDisplay()} <br> == RESULT == <br> Players Total Value: ${playerCardValue} <br> 
    Dealers Total Value: ${dealerCardValue} <br> IT IS A DRAW!!`;
  }
  dealerCards = [];
  playerCards = [];
  dealerCardValue = 0;
  playerCardValue = 0;
  gameStatus = "dealing";
  shuffledDeck = {};
  output += "<br><br> Game has reset!";
  return output;
};

var outputDisplay = function () {
  var dealerCardNO1 = "";
  var output = "";
  if (dealerCardValue == 21 && dealerCards.length == 2) {
    dealerCardNO1 = `${dealerCards[0].name} of ${dealerCards[0].suit}`;
  } else if (dealerCards.length >= 2 && gameStatus != "playersTurn") {
    dealerCardNO1 = `${dealerCards[0].name} of ${dealerCards[0].suit}`;
  } else {
    dealerCardNO1 = `Card is faced down`;
  }
  output += `Players Draw: <br>`;
  for (i = 0; i < playerCards.length; i += 1) {
    output += `CARD NO${i + 1}: ${playerCards[i].name} of ${
      playerCards[i].suit
    } <br>`;
  }

  output += `<br> Dealers Draw: <br>`;
  output += ` CARD NO1: ${dealerCardNO1} <br>`;
  for (i = 1; i < dealerCards.length; i += 1) {
    output += `CARD NO${i + 1}: ${dealerCards[i].name} of ${
      dealerCards[i].suit
    }<br>`;
  }
  output += `<br> ========================================= <br>`;
  return output;
};

var main = function (input) {
  var myOutputValue = "";
  if (input != "Start" && gameStatus == "dealing") {
    myOutputValue = "Click on Start!";
    return myOutputValue;
  }
  if (input == "Reset") {
    reset();
    myOutputValue = "Game has reset!";
    return myOutputValue;
  }
  var deck = cardGenerator(); // generate deck
  shuffledDeck = cardShuffler(deck); // shuffle deck

  if (gameStatus == "dealing") {
    cardDealer(shuffledDeck); // deal card
    cardTotalValue();
    if (dealerCardValue == 21 || playerCardValue == 21) {
      myOutputValue = checkForBlackJack();
      return myOutputValue;
    }
    myOutputValue = outputDisplay();
    myOutputValue += `<br>${hitOrStandPlayer()} `;
    gameStatus = "playersTurn";
  } else if (gameStatus == "playersTurn") {
    myOutputValue = playersAction(input);
  } else if (gameStatus == "dealersTurn") {
    dealersAction();
  }
  console.log(`players card are`);
  console.log(playerCards);
  console.log(`players card value is ${playerCardValue}`);

  console.log(`dealers card are`);
  console.log(dealerCards);
  console.log(`dealers card value is ${dealerCardValue}`);

  return myOutputValue;
};
