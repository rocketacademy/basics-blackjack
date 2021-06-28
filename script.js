// 2 players - 1 human, 1 computer
// computer = dealer, dealer hits if hand <17
// whoever has hand closer to 21 = wins
// Aces = 1 or 11

// To initialise a standard 52-card deck
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
    rank: 11,
  },
  {
    name: "queen",
    suit: "hearts",
    rank: 12,
  },
  {
    name: "king",
    suit: "hearts",
    rank: 13,
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
    rank: 11,
  },
  {
    name: "queen",
    suit: "diamonds",
    rank: 12,
  },
  {
    name: "king",
    suit: "diamonds",
    rank: 13,
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
    rank: 11,
  },
  {
    name: "queen",
    suit: "clubs",
    rank: 12,
  },
  {
    name: "king",
    suit: "clubs",
    rank: 13,
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
    rank: 11,
  },
  {
    name: "queen",
    suit: "spades",
    rank: 12,
  },
  {
    name: "king",
    suit: "spades",
    rank: 13,
  },
];

// To get a random index ranging from 0 (inclusive) to max (exclusive).
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

// Shuffle deck and save into new variable shuffledDeck to show that deck has been shuffled.
var shuffledDeck = shuffleCards(deck);
var gameMode = "username";
var userName = "";
var userChoice = "";

var main = function (input) {
  if (gameMode == "username") {
    userName = input;
    gameMode = "game start";
    myOutputValue = `Welcome to the game of Blackjack, ${userName}! <br><br> To begin, please enter "start".`;
    console.log(`username is ${userName}`);
    return myOutputValue;
  }

  //Draw 2x card for Computer and 2x card for Player
  var computerCard1 = shuffledDeck.pop();
  var computerCard2 = shuffledDeck.pop();
  var computerHand = computerCard1.rank + computerCard2.rank;
  var playerCard1 = shuffledDeck.pop();
  var playerCard2 = shuffledDeck.pop();
  var playerHand = playerCard1.rank + playerCard2.rank;

  if (gameMode == "game start" && input == "start") {
    gameMode = "decide";
    myOutputValue = `${userName} drew ${playerCard1.name} ${playerCard2.suit} and ${playerCard2.name} ${playerCard2.suit}. <br> Total: ${playerHand} <br><br> To draw another card, please enter "Hit". <br> Otherwise please enter "Stand". `;
    return myOutputValue;
  }

  if (input == "Hit" && gameMode == "decide") {
    userChoice = input;
    while (computerHand < 17 && gameMode == "computer auto") {
      var computerCard3 = shuffledDeck.pop();
      computerHand += computerCard3.rank;
    }
    var playerCard3 = shuffledDeck.pop();
    playerHand += playerCard3.rank;
    gameMode = "computer auto";
    myOutputValue = `Player chose ${userChoice} to draw another card. <br><br> Cards drew so far are : <br> ${playerCard1.name} ${playerCard1.suit} , <br> ${playerCard2.name} ${playerCard2.suit} , <br> ${playerCard3.name} ${playerCard3.suit}. <br> Total: ${playerHand}`;
    console.log(`Player choose to Hit`);
    return myOutputValue;
  }

  if (input == "Stand" && gameMode == "decide") {
    userChoice = input;
    while (computerHand < 17 && gameMode == "computer auto") {
      var computerCard3 = shuffledDeck.pop();
      computerHand += computerCard3.rank;
    }
    gameMode = "compare";
    myOutputValue = `Player chose ${userChoice} to not draw another card. <br><br> Cards drew so far are : <br> ${playerCard1.name} ${playerCard1.suit} , <br> ${playerCard2.name} ${playerCard2.suit}. <br> Total: ${playerHand}`;
    console.log(`Player choose to Stand.`);
    return myOutputValue;
  }

  if (computerHand > playerHand && gameMode == "compare") {
    gameMode = "restart";
    myOutputValue = `Computer Won! <br> Computer drew: <br> ${computerCard1.name} ${computerCard1.suit} , <br> ${computerCard2.name} ${computerCard2.suit} , <br> ${computerCard3.name} ${computerCard3.suit}. <br> Total: ${computerHand}. <br><br> Player drew: <br> ${playerCard1.name} ${playerCard1.suit} , <br> ${playerCard2.name} ${playerCard2.suit} , <br> ${playerCard3.name} ${playerCard3.suit}. <br> Total: ${playerHand}.`;
    console.log(`Computer Won!`);
    return myOutputValue;
  }

  if (computerHand < playerHand && gameMode == "compare") {
    gameMode = "restart";
    myOutputValue = `Player Won! <br> Player drew: <br> ${playerCard1.name} ${playerCard1.suit} , <br> ${playerCard2.name} ${playerCard2.suit} , <br> ${playerCard3.name} ${playerCard3.suit}. <br> Total: ${playerHand}. <br><br> Computer drew: <br> ${computerCard1.name} ${computerCard1.suit} , <br> ${computerCard2.name} ${computerCard2.suit} , <br> ${computerCard3.name} ${computerCard3.suit}. <br> Total: ${computerHand}.`;
    console.log(`Player Won!`);
    return myOutputValue;
  }

  if (gameMode == "restart") {
    gameMode = "username";
    myOutputValue = `Game restarts. Please enter Username again.`;
    console.log(`Game restarts . Mode: ${gameMode}`);
    return myOutputValue;
  }
  var myOutputValue = `Invalid Entry. <br><br> Please try again.`;
  return myOutputValue;
};
