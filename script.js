var deck = [
  {
    name: "ace",
    suit: "hearts",
    score: 1,
  },
  {
    name: "2",
    suit: "hearts",
    score: 2,
  },
  {
    name: "3",
    suit: "hearts",
    score: 3,
  },
  {
    name: "4",
    suit: "hearts",
    score: 4,
  },
  {
    name: "5",
    suit: "hearts",
    score: 5,
  },
  {
    name: "6",
    suit: "hearts",
    score: 6,
  },
  {
    name: "7",
    suit: "hearts",
    score: 7,
  },
  {
    name: "8",
    suit: "hearts",
    score: 8,
  },
  {
    name: "9",
    suit: "hearts",
    score: 9,
  },
  {
    name: "10",
    suit: "hearts",
    score: 10,
  },
  {
    name: "jack",
    suit: "hearts",
    score: 10,
  },
  {
    name: "queen",
    suit: "hearts",
    score: 10,
  },
  {
    name: "king",
    suit: "hearts",
    score: 10,
  },
  {
    name: "ace",
    suit: "diamonds",
    score: 1,
  },
  {
    name: "2",
    suit: "diamonds",
    score: 2,
  },
  {
    name: "3",
    suit: "diamonds",
    score: 3,
  },
  {
    name: "4",
    suit: "diamonds",
    score: 4,
  },
  {
    name: "5",
    suit: "diamonds",
    score: 5,
  },
  {
    name: "6",
    suit: "diamonds",
    score: 6,
  },
  {
    name: "7",
    suit: "diamonds",
    score: 7,
  },
  {
    name: "8",
    suit: "diamonds",
    score: 8,
  },
  {
    name: "9",
    suit: "diamonds",
    score: 9,
  },
  {
    name: "10",
    suit: "diamonds",
    score: 10,
  },
  {
    name: "jack",
    suit: "diamonds",
    score: 10,
  },
  {
    name: "queen",
    suit: "diamonds",
    score: 10,
  },
  {
    name: "king",
    suit: "diamonds",
    score: 10,
  },
  {
    name: "ace",
    suit: "clubs",
    score: 1,
  },
  {
    name: "2",
    suit: "clubs",
    score: 2,
  },
  {
    name: "3",
    suit: "clubs",
    score: 3,
  },
  {
    name: "4",
    suit: "clubs",
    score: 4,
  },
  {
    name: "5",
    suit: "clubs",
    score: 5,
  },
  {
    name: "6",
    suit: "clubs",
    score: 6,
  },
  {
    name: "7",
    suit: "clubs",
    score: 7,
  },
  {
    name: "8",
    suit: "clubs",
    score: 8,
  },
  {
    name: "9",
    suit: "clubs",
    score: 9,
  },
  {
    name: "10",
    suit: "clubs",
    score: 10,
  },
  {
    name: "jack",
    suit: "clubs",
    score: 10,
  },
  {
    name: "queen",
    suit: "clubs",
    score: 10,
  },
  {
    name: "king",
    suit: "clubs",
    score: 10,
  },
  {
    name: "ace",
    suit: "spades",
    score: 1,
  },
  {
    name: "2",
    suit: "spades",
    score: 2,
  },
  {
    name: "3",
    suit: "spades",
    score: 3,
  },
  {
    name: "4",
    suit: "spades",
    score: 4,
  },
  {
    name: "5",
    suit: "spades",
    score: 5,
  },
  {
    name: "6",
    suit: "spades",
    score: 6,
  },
  {
    name: "7",
    suit: "spades",
    score: 7,
  },
  {
    name: "8",
    suit: "spades",
    score: 8,
  },
  {
    name: "9",
    suit: "spades",
    score: 9,
  },
  {
    name: "10",
    suit: "spades",
    score: 10,
  },
  {
    name: "jack",
    suit: "spades",
    score: 10,
  },
  {
    name: "queen",
    suit: "spades",
    score: 10,
  },
  {
    name: "king",
    suit: "spades",
    score: 10,
  },
];
var shuffledDeck;
var gameBustScore = 21;
var gameMode = "shuffled cards";
var numberOfCardsToDraw;
var computerCardDeck = [];
var doesComputerCardDeckHaveAce = false;
var computerCurrentCardScore = 0;
var playerCardDeck = [];
var doesPlayerCardDeckHaveAce = false;
var playerCurrentCardScore = 0;

// cards 2 through 10 are scored using their face value
// jack, queen and king are scored 10
// ace can be scored 1 or 11

var main = function (input) {
  var myOutputValue = 1;

  if (gameMode == "shuffled cards") {
    shuffledDeck = shuffleCards(deck);
    gameMode = "compare card score";
    console.log(shuffledDeck);
  }

  if (gameMode == "compare card score") {
    // assign 2 cards to computer
    numberOfCardsToDraw = 2;
    for (let i = 0; i < numberOfCardsToDraw; i++) {
      var currentCard = shuffledDeck.pop();
      computerCardDeck.push(currentCard);
      doesComputerCardDeckHaveAce = checkForAce(currentCard);
    }
    console.log("computerCardDeck: ");
    console.log(computerCardDeck);
    console.log(doesComputerCardDeckHaveAce);

    // assign 2 cards to player
    for (let i = 0; i < numberOfCardsToDraw; i++) {
      var currentCard = shuffledDeck.pop();
      playerCardDeck.push(currentCard);
      doesPlayerCardDeckHaveAce = checkForAce(currentCard);
    }
    console.log("playerCardDeck: ");
    console.log(playerCardDeck);
    console.log(doesPlayerCardDeckHaveAce);

    // calculate computer card score
    for (let i = 0; i < numberOfCardsToDraw; i++) {
      computerCurrentCardScore =
        computerCurrentCardScore + computerCardDeck[i].score;
      console.log(computerCurrentCardScore);
    }

    // calculate player card score
    for (let i = 0; i < numberOfCardsToDraw; i++) {
      playerCurrentCardScore = playerCurrentCardScore + playerCardDeck[i].score;
      console.log(playerCurrentCardScore);
    }

    if (computerCurrentCardScore < playerCurrentCardScore) {
      myOutputValue = "Player won!";
    }

    if (computerCurrentCardScore > playerCurrentCardScore) {
      myOutputValue = "Computer won!";
    }

    if (computerCurrentCardScore == playerCurrentCardScore) {
      myOutputValue = "It's a tie!";
    }
  }

  return myOutputValue;
};

var checkForAce = function (currentCard) {
  if (currentCard.name == "ace") {
    return true;
  }

  if (currentCard.name != "ace") {
    return false;
  }
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

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// 20230607 decided not to use this function
// var assignTwoCards = function () {
//   numberOfCardsToDraw = 2;
//   for (let i = 0; i < numberOfCardsToDraw; i++) {
//     var currentCard = shuffledDeck.pop();
//     // computerCardDeck.push(currentCard);
//     return currentCard;
//   }
// };
