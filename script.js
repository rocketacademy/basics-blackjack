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
  suits = ["Club", "Diamond", "Heart", "Spade"];
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
  if (playerCards[0].name == "Ace" && playerCards[1].name == "Ace") {
    playerCardValue == 21;
  }
};

var aceCard = function (cards) {
  if (cards.length == 2) {
    var aceValue = 11;
  } else if (cards.length > 2) {
    var aceValue = 1;
  }
  return aceValue;
};

var checkForBlackJack = function () {
  if (dealerCardValue == 21) {
    var output = `The dealer drew BLACK JACK. Dealer WINS!`;
  } else if (playerCardValue == 21) {
    var output = `Player drew BLACK JACK. Player WINS!`;
  }
  return output;
};

var hitOrStandPlayer = function (cardsValue) {
  if (cardsValue < 12) {
    output = `Player your total card value is below 12, you have to hit`;
  } else if (12 < cardsValue < 21) {
    output = `Player your total card value is between 12 and 21, you can choose to hit or stand`;
  }
  return output;
};

var playersAction = function (input) {
  if (input != "Hit" && input != "Stand") {
    output = `Please input Hit or Stand`;
  } else if (playerCardValue < 12 && input != "Hit") {
    output = `Please enter hit as your card value is below 12`;
  } else if (input == "Hit") {
    playerCards.push(shuffledDeck.pop());
    cardTotalValue();
    if (playerCardValue > 21) {
      output = `Player's total value is ${playerCardValue}. IT IS A BUST!! `;
    } else {
      output = `Your current total card value is ${playerCardValue}. To continue, input Hit or Stand`;
    }
  } else if (input == "Stand") {
    gameStatus = "dealersTurn";
    output = `Dealer's Turn <br><br> ${dealersAction()}`;
  }
  return output;
};

var dealersAction = function () {
  while (dealerCardValue < 17) {
    dealerCards.push(shuffledDeck.pop());
    cardTotalValue();
    if (dealerCardValue > 21) {
      output = `Dealer's total value is ${dealerCardValue}. IT IS A BUST!! `;
      return output;
    }
  }
  if (dealerCardValue >= 17) {
    output = `Dealer's final total card value is ${dealerCardValue}`;
  }
  return output;
};

var main = function (input) {
  var myOutputValue = "hello world";
  var deck = cardGenerator(); // generate deck
  shuffledDeck = cardShuffler(deck); // shuffle deck
  if (gameStatus == "dealing") {
    cardDealer(shuffledDeck); // deal card
    cardTotalValue();
    if (dealerCardValue == 21 || playerCardValue == 21) {
      myOutputValue = checkForBlackJack();
      console.log(checkForBlackJack());
      return myOutputValue;
    }
    myOutputValue = `Player first card: ${playerCards[0].name} of ${
      playerCards[0].suit
    } <br>
    Player second card: ${playerCards[1].name} of ${
      playerCards[1].suit
    } <br><br>
     ${hitOrStandPlayer()} <br><br>
    Dealer first card: Faced down<br>
    Dealer second card: ${dealerCards[1].name} of ${dealerCards[1].suit}`;
    gameStatus = "playersTurn";
  } else if (gameStatus == "playersTurn") {
    myOutputValue = playersAction(input);
  } else if (gameStatus == "dealersTurn") {
    dealersAction();
  }
  console.log(`player's card are`);
  console.log(playerCards);
  console.log(`player's card value is ${playerCardValue}`);

  console.log(`dealer's card are`);
  console.log(dealerCards);
  console.log(`dealer's card value is ${dealerCardValue}`);

  return myOutputValue;
};
