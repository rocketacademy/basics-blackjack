var myOutputValue = "";
var gameMode = "shuffle";
var shuffledDeck = {};
var playerCard1 = "";
var playerCard2 = "";
var playerCount = 0;
var computerCard1 = "";
var computerCard2 = "";
var computerCount = 0;
var cardDeck = [];

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function () {
  return Math.floor(Math.random() * 52);
};

// Shuffle the elements in the cardDeck array
var shuffleCards = function () {
  // defining the card deck here so that when we reshuffle the deck gets reinitialized at the same tim
  cardDeck = [
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

// Shuffle the deck and save it in a new variable shuffledDeck
// to communicate that we have shuffled the deck.
var pickCard = function () {
  card = cardDeck.pop();
  return card;
};

var main = function (input) {
  //shuffle the deck with the first submit click
  if (gameMode == "shuffle") {
    shuffledDeck = shuffleCards(cardDeck);
    console.log(shuffledDeck);
    gameMode = "player pick";
    return "The cards have been shuffled and the game is ready to begin!";
  }
  //initial player pick gets displayed and the count is recorded
  if (gameMode == "player pick") {
    gameMode = "player further picks or computer";
    playerCard1 = pickCard(shuffledDeck);
    playerCard2 = pickCard(shuffledDeck);
    //case when player gets an ace
    if (playerCard1.rank == 1 && playerCard2.rank < 11) {
      playerCard1.rank = 11;
    }
    if (playerCard2.rank == 1 && playerCard1.rank < 11) {
      playerCard2.rank = 11;
    }
    playerCount = playerCard1.rank + playerCard2.rank;
    console.log(playerCount);
    return `Your first two cards are ${playerCard1.name} of ${playerCard1.suit} and ${playerCard2.name} of ${playerCard2.suit}. Your total count sits at ${playerCount}<br><br>If you want to pick another card please click 'submit', else please input 'computer' into the input box to let the computer play!`;
  }
  //player picks another card
  if (gameMode == "player further picks or computer" && input == "") {
    playerCard1 = pickCard(shuffledDeck);
    //case when player gets an ace
    if (playerCard1.rank == 1 && playerCount < 11) {
      playerCard1.rank = 11;
    }
    playerCount = playerCount + playerCard1.rank;
    var resultString = `You have picked ${playerCard1.name} of ${playerCard1.suit} and your total count sits at ${playerCount}<br><br>`;
    console.log(playerCount);

    if (playerCount > 21) {
      var bust = true;
      gameMode = "shuffle";
      resultString +=
        "You've gone bust and you lose! Please press 'submit' if you want to play again.<br><br>";
    }

    if (bust == true) {
      return resultString;
    } else {
      return `${resultString} If you want to pick another card please click 'submit', else please input 'computer' into the input box to let the computer play!`;
    }
  }
  //computer turn
  if (gameMode == "player further picks or computer" && input == "computer") {
    gameMode = "computer mode";
    computerCard1 = pickCard(shuffledDeck);
    computerCard2 = pickCard(shuffledDeck);
    //case when computer gets an ace
    if (computerCard1.rank == 1 && computerCard2.rank < 11) {
      console.log("computercard1.rank " + computerCard1.rank);
      computerCard1.rank = 11;
    }
    if (computerCard2.rank == 1 && computerCard1.rank < 11) {
      computerCard2.rank = 11;
    }
    computerCount = computerCard1.rank + computerCard2.rank;
    console.log(computerCount);
    if (computerCount >= playerCount) {
      gameMode = "shuffle";
      return `The computer's first two cards are ${computerCard1.name} of ${computerCard1.suit} and ${computerCard2.name} of ${computerCard2.suit}. The computer total count sits at ${computerCount} vs your count of ${playerCount}.<br><br>The computer wins!<br><br>To play again click the 'submit' button.`;
    } else {
      return `The computer's first two cards are ${computerCard1.name} of ${computerCard1.suit} and ${computerCard2.name} of ${computerCard2.suit}. The computer total count sits at ${computerCount} vs your count of ${playerCount}.<br><br>If you want the computer to pick another card please click 'submit'.`;
    }
  }
  //computer picks more cards
  if (gameMode == "computer mode") {
    computerCard1 = pickCard(shuffledDeck);
    //case when computer gets an ace
    if (computerCard1.rank == 1 && computerCount < 11) {
      computerCard1.rank = 11;
    }
    computerCount = computerCount + computerCard1.rank;
    var resultString = `The computer has picked ${computerCard1.name} of ${computerCard1.suit} and the total count sits at ${computerCount} vs your count of ${playerCount}<br><br>`;
    console.log(computerCount);

    if (computerCount > 21) {
      var bust = true;
      gameMode = "shuffle";
      resultString +=
        "The computer has gone bust and you win! Please press 'submit' if you want to play again.<br><br>";
    }

    if (bust == true) {
      return resultString;
    } else if (computerCount >= playerCount) {
      gameMode = "shuffle";
      return (
        resultString +
        "You lose! Please press 'submit' if you want to play again."
      );
    } else {
      return `${resultString} If you want to pick another card please click 'submit'.`;
    }
  }
};
