var YES = "yes";
var NO = "no";

//global variables
var playerCards = [];
var dealerCards = [];
var playerValue = 0;
var dealerValue = 0;
var end = NO;

//Helper Functions
//Generating the deck
var generateDeck = function () {
  deck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var index = 0;
  //for each suit

  while (index < suits.length) {
    var currentSuit = suits[index];
    var currentRank = 1;

    while (currentRank <= 13) {
      var cardName = currentRank;
      var cardValue = currentRank;

      if (cardName == 1) {
        cardName = "Ace";
      } else if (cardName == 11) {
        cardName = "Jack";
        cardValue = 10;
      } else if (cardName == 12) {
        cardName = "Queen";
        cardValue = 10;
      } else if (cardName == 13) {
        cardName = "King";
        cardValue = 10;
      }

      var newCard = {
        name: cardName,
        suit: currentSuit,
        rank: currentRank,
        value: cardValue,
      };

      deck.push(newCard);
      currentRank += 1;
    }

    index += 1;
  }

  return deck;
};

var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
var shuffleDeck = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex += 1;
  }

  return cardDeck;
};

var cardImage = function (suit) {
  var image = "♠️";

  if (suit === "hearts") {
    image = "♥";
  } else if (suit === "diamonds") {
    image = "♦️";
  } else if (suit === "clubs") {
    image = "♣️";
  }

  return image;
};

var printCard = function (array) {
  var count = 0;
  var printedCard = "";
  while (count < array.length) {
    printedCard =
      printedCard + array[count].name + cardImage(array[count].suit) + "<br>";
    count += 1;
  }
  return printedCard;
};

var checkForBlackjack = function (array) {
  var blackjack = false;
  if (array[0] == "Ace" && 10 <= array[1]) {
    blackjack = true;
  } else if (array[1] == "Ace" && 10 <= array[0]) {
    blackjack = true;
  }
  return blackjack;
};

var dealtBoard = function (playerCards, playerValue, dealerCards) {
  return (
    "Player your cards are: <br>" +
    printCard(playerCards) +
    "Player value is: " +
    playerValue +
    "<br><br> The dealer cards are: <br>" +
    "*** Hidden Card *** <br>" +
    dealerCards[1].name +
    cardImage(dealerCards[1].suit)
  );
};

var leaderboard = function (
  playerCards,
  playerValue,
  dealerCards,
  dealerValue
) {
  return (
    "Player your cards are: <br>" +
    printCard(playerCards) +
    "Player value is: " +
    playerValue +
    "<br><br> The dealer cards are: <br>" +
    printCard(dealerCards) +
    "Dealer value is: " +
    dealerValue
  );
};

var checkForAces = function (array) {
  var aceIndex = 0;
  var noOfAces = 0;
  while (aceIndex < array.length) {
    var card = array[aceIndex];
    if (card.rank == 1) {
      noOfAces += 1;
    }
    aceIndex += 1;
  }
  return noOfAces;
};

var adjustForAces = function (array, value) {
  var aces = checkForAces(array);
  console.log("Aces", aces);

  while (aces > 0 && value < 11) {
    aces = aces - 1;
    value = value + 10;
  }

  console.log("Value", value);
  return value;
};

var onButton = function (btn, btn2) {
  hitButton.disabled = false;
  standButton.disabled = false;
};

var offButton = function (btn, btn2) {
  hitButton.disabled = true;
  standButton.disabled = true;
};

//Stand Button
var standButton = document.createElement("BUTTON");
standButton.innerHTML = "Stand";
var dealButton = document.getElementById("submit-button");
dealButton.insertAdjacentElement("afterend", standButton);
standButton.addEventListener("click", function () {
  var result = standFunction();
  var output = document.querySelector("#output-div");
  output.innerHTML = result;
});

//hit Button
var hitButton = document.createElement("BUTTON");
hitButton.innerHTML = "Hit";
dealButton.insertAdjacentElement("afterend", hitButton);
hitButton.addEventListener("click", function () {
  var result = hitFunction();
  var output = document.querySelector("#output-div");
  output.innerHTML = result;
});

//Deck Functions
var mydeck = generateDeck();
var shuffledDeck = shuffleDeck(mydeck);

//Buttons should start with being disabled
hitButton.disabled = true;
standButton.disabled = true;

//Function for Deal
var main = function () {
  playerCards = [];
  dealerCards = [];
  mydeck = generateDeck();
  shuffledDeck = shuffleDeck(mydeck);
  var cardIndex = 0;
  while (cardIndex < 2) {
    playerCards[cardIndex] = shuffledDeck.pop();
    console.log(playerCards);
    dealerCards[cardIndex] = shuffledDeck.pop();
    console.log(dealerCards);
    cardIndex += 1;
  }

  var playerBlackjack = checkForBlackjack(playerCards);
  var computerBlackjack = checkForBlackjack(dealerCards);
  playerValue = playerCards[0].value + playerCards[1].value;
  dealerValue = dealerCards[0].value + dealerCards[1].value;

  if (playerBlackjack === true && computerBlackjack === true) {
    return (
      leaderboard(playerCards, playerValue, dealerCards) +
      "<br><br> Both players have blackjacks!, Its a tie!"
    );
  } else if (playerBlackjack === true && computerBlackjack === false) {
    return (
      leaderboard(playerCards, playerValue, dealerCards) +
      "<br><br> Player have blackjack!, You win!"
    );
  } else if (playerBlackjack === false && computerBlackjack === true) {
    return (
      leaderboard(playerCards, playerValue, dealerCards) +
      "<br><br> Computer have blackjack!, You lose!"
    );
  }

  onButton(hitButton, standButton);
  return (
    dealtBoard(playerCards, playerValue, dealerCards) +
    "<br><br> Please press either 'stay' or 'hit'"
  );
};

//Function for Hit
var hitFunction = function () {
  var newCard = shuffledDeck.pop();
  playerCards.push(newCard);
  playerValue = playerValue + newCard.value;
  playerValue = adjustForAces(playerCards, playerValue);
  var myOutputValue = dealtBoard(playerCards, playerValue, dealerCards);

  if (playerValue > 21 && dealerValue < 22) {
    offButton(hitButton, standButton);
    return (
      myOutputValue +
      `<br><br> You Bust! You Lose <br><br> Press DEAL to start a new game`
    );
  }

  return myOutputValue + "<br><br> Please press either 'stay' or 'hit'";
};

//Function for Stand
var standFunction = function () {
  while (dealerValue <= 15) {
    newCard = shuffledDeck.pop();
    dealerCards.push(newCard);
    dealerValue = dealerValue + newCard.value;
    dealerValue = adjustForAces(dealerCards, dealerValue);
  }

  if (playerValue > 21 && dealerValue < 22) {
    myOutputValue = "<br><br> You Bust! You Lose";
  } else if (playerValue < 22 && dealerValue > 21) {
    myOutputValue = "<br><br> Computer Bust! You Win";
  } else if (playerValue > 21 && dealerValue > 21) {
    myOutputValue = "<br><br> Both Busts! Its a draw";
  } else if (playerValue < dealerValue) {
    myOutputValue = "<br><br> You Lose!";
  } else if (playerValue > dealerValue) {
    myOutputValue = "<br><br> You Win!";
  } else if (playerValue == dealerValue) {
    myOutputValue = "<br><br> Its a Draw!";
  }

  offButton(hitButton, standButton);
  return (
    leaderboard(playerCards, playerValue, dealerCards, dealerValue) +
    myOutputValue +
    `<br><br> Press Submit to start a new game`
  );
};
