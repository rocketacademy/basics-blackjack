var mode = "everydayimshuffling";
var deck = [
  {
    name: "ace",
    suit: "hearts",
    rank: 1,
  },
  {
    name: "2",
    suit: "hearts",
    rank: 2,
  },
  {
    name: "3",
    suit: "hearts",
    rank: 3,
  },
  {
    name: "4",
    suit: "hearts",
    rank: 4,
  },
  {
    name: "5",
    suit: "hearts",
    rank: 5,
  },
  {
    name: "6",
    suit: "hearts",
    rank: 6,
  },
  {
    name: "7",
    suit: "hearts",
    rank: 7,
  },
  {
    name: "8",
    suit: "hearts",
    rank: 8,
  },
  {
    name: "9",
    suit: "hearts",
    rank: 9,
  },
  {
    name: "10",
    suit: "hearts",
    rank: 10,
  },
  {
    name: "jack",
    suit: "hearts",
    rank: 10,
  },
  {
    name: "queen",
    suit: "hearts",
    rank: 10,
  },
  {
    name: "king",
    suit: "hearts",
    rank: 10,
  },
  {
    name: "ace",
    suit: "diamonds",
    rank: 1,
  },
  {
    name: "2",
    suit: "diamonds",
    rank: 2,
  },
  {
    name: "3",
    suit: "diamonds",
    rank: 3,
  },
  {
    name: "4",
    suit: "diamonds",
    rank: 4,
  },
  {
    name: "5",
    suit: "diamonds",
    rank: 5,
  },
  {
    name: "6",
    suit: "diamonds",
    rank: 6,
  },
  {
    name: "7",
    suit: "diamonds",
    rank: 7,
  },
  {
    name: "8",
    suit: "diamonds",
    rank: 8,
  },
  {
    name: "9",
    suit: "diamonds",
    rank: 9,
  },
  {
    name: "10",
    suit: "diamonds",
    rank: 10,
  },
  {
    name: "jack",
    suit: "diamonds",
    rank: 10,
  },
  {
    name: "queen",
    suit: "diamonds",
    rank: 10,
  },
  {
    name: "king",
    suit: "diamonds",
    rank: 10,
  },
  {
    name: "ace",
    suit: "clubs",
    rank: 1,
  },
  {
    name: "2",
    suit: "clubs",
    rank: 2,
  },
  {
    name: "3",
    suit: "clubs",
    rank: 3,
  },
  {
    name: "4",
    suit: "clubs",
    rank: 4,
  },
  {
    name: "5",
    suit: "clubs",
    rank: 5,
  },
  {
    name: "6",
    suit: "clubs",
    rank: 6,
  },
  {
    name: "7",
    suit: "clubs",
    rank: 7,
  },
  {
    name: "8",
    suit: "clubs",
    rank: 8,
  },
  {
    name: "9",
    suit: "clubs",
    rank: 9,
  },
  {
    name: "10",
    suit: "clubs",
    rank: 10,
  },
  {
    name: "jack",
    suit: "clubs",
    rank: 10,
  },
  {
    name: "queen",
    suit: "clubs",
    rank: 10,
  },
  {
    name: "king",
    suit: "clubs",
    rank: 10,
  },
  {
    name: "ace",
    suit: "spades",
    rank: 1,
  },
  {
    name: "2",
    suit: "spades",
    rank: 2,
  },
  {
    name: "3",
    suit: "spades",
    rank: 3,
  },
  {
    name: "4",
    suit: "spades",
    rank: 4,
  },
  {
    name: "5",
    suit: "spades",
    rank: 5,
  },
  {
    name: "6",
    suit: "spades",
    rank: 6,
  },
  {
    name: "7",
    suit: "spades",
    rank: 7,
  },
  {
    name: "8",
    suit: "spades",
    rank: 8,
  },
  {
    name: "9",
    suit: "spades",
    rank: 9,
  },
  {
    name: "10",
    suit: "spades",
    rank: 10,
  },
  {
    name: "jack",
    suit: "spades",
    rank: 10,
  },
  {
    name: "queen",
    suit: "spades",
    rank: 10,
  },
  {
    name: "king",
    suit: "spades",
    rank: 10,
  },
];

var playerDeck = [];
var dealerDeck = [];
var shuffledDeck = [];
var playervalue = 0;
var dealervalue = 0;
var playerDeckforMessage = [];
var dealerDeckforMessage = [];

var main = function (input) {
  var myOutputValue = "";
  console.log(mode);

  if (mode == "everydayimshuffling") {
    mode = "deal";
    myOutputValue = shufflethedeck();
    return myOutputValue;
  } else if (mode == "deal") {
    mode = "actualgame";
    return DealtCards();
  } else if (mode == "actualgame") {
    return actualgame(input);
  }
  return myOutputValue;
};

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

var shufflethedeck = function () {
  shuffledDeck = shuffleCards(deck);
  return "Card have been shuffled. <br><br>Press Submit to deal cards.";
};

var DealtCards = function () {
  var playerCard1 = shuffledDeck.pop();
  var playerCard2 = shuffledDeck.pop();

  playerDeck.push(playerCard1);
  playerDeck.push(playerCard2);

  var dealerCard1 = shuffledDeck.pop();
  var dealerCard2 = shuffledDeck.pop();

  dealerDeck.push(dealerCard1);
  dealerDeck.push(dealerCard2);

  var counter = 0;
  while (counter < playerDeck.length) {
    playerDeckforMessage.push(
      ` ${playerDeck[counter].name} of ${playerDeck[counter].suit}`
    );
    counter += 1;
  }

  var counter2 = 0;
  while (counter2 < dealerDeck.length) {
    dealerDeckforMessage.push(
      ` ${playerDeck[counter2].name} of ${playerDeck[counter2].suit}`
    );
    counter2 += 1;
  }

  playervalue = calculations(playerDeck);
  dealervalue = calculations(dealerDeck);

  console.log("player: " + playervalue);
  console.log("dealer: " + dealervalue);

  return `Your cards are the ${playerDeckforMessage}. <br>One of the dealer's cards is the ${dealerDeckforMessage[0]}.<br><br>Do you want to 'stand' or 'hit'?`;
};

var calculations = function (ADeck) {
  var counter = 0;
  var value = 0;
  while (counter < ADeck.length) {
    value += ADeck[counter].rank;
    counter += 1;
  }
  return value;
};

var actualgame = function (input) {
  var message = "Please enter either 'stand' or 'hit'.";
  playervalue = calculations(playerDeck);
  dealervalue = calculations(dealerDeck);

  if (playervalue > 21) {
    message =
      "Player has lost as you have exceeded 21. <br><br>Your deck of cards are " +
      playerDeckforMessage +
      ".";
  } else if (playervalue == 21) {
    message = "Player has won!!!";
  } else if (dealervalue > 21) {
    message = "Player has won as dealer has exceeded 21.";
  } else if (playervalue < 21) {
    if (input == "stand") {
      if (playervalue < dealervalue) {
        message = `The dealer has won!`;
      } else if (playervalue > dealervalue) {
        message = `The player has won!`;
      } else if (playervalue == dealervalue) {
        message = `It's a tie.`;
      }
    } else if (input == "hit") {
      if (dealervalue < 17) {
        var dealerCard = shuffledDeck.pop();
        dealerDeck.push(dealerCard);
        dealervalue = calculations(dealerDeck);
        dealerDeckforMessage.push(` ${dealerCard.name} of ${dealerCard.suit}`);
      }
      var playerCard = shuffledDeck.pop();
      playerDeck.push(playerCard);
      playerDeckforMessage.push(` ${playerCard.name} of ${playerCard.suit}`);
      playervalue = calculations(playerDeck);

      message = `Your cards are the ${playerDeckforMessage} while the dealer's cards are the ${dealerDeckforMessage}. <br><br>Do you wish to 'stand' or 'hit'?`;
    }
  }
  console.log("player: " + playervalue);
  console.log("dealer: " + dealervalue);

  return message;
};
