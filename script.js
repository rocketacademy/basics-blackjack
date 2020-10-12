var myOutputValue;
var playerHand = [];
var computerHand = [];

var main = function (input) {
  // User clicks submit button and gets two cards
  var computerCard1 = deck.pop();
  var playerCard1 = deck.pop();
  var computerCard2 = deck.pop();
  var playerCard2 = deck.pop();

  console.log(computerHand);
  console.log(playerHand);

  playerHand.push(playerCard2, playerCard1);
  computerHand.push(computerCard1, computerCard2);

  var playerScore = countScore(playerHand);
  var computerScore = countScore(computerHand);

  // The cards drawn are displayed to the user.
  myOutputValue =
    "Computer drew: " +
    computerCard1.name +
    " of " +
    computerCard1.suit +
    " and " +
    computerCard2.name +
    " of " +
    computerCard2.suit +
    "whereas user drew " +
    playerCard1.name +
    " of " +
    playerCard1.suit +
    " and " +
    playerCard2.name +
    " of " +
    playerCard2.suit;

  console.log(myOutputValue);

  // if computer score is less or equals to 17, computer takes another card and card is pushed to computer hand
  if (Number(computerScore) <= 17) {
    var computerCard3 = deck.pop();
    computerHand.push(computerCard3);
    myOutputValue = myOutputValue + `computer hits another card: ${computerCard3.name} of ${computerCard3.suit}`
    computerScore = countScore(computerHand);
  }
  console.log(computerHand);
  console.log(playerHand);

  // blackjack functions 
  // if computerscore is exactly 21, computer wins
  // if  user is exactly 21, user wins
  // if both are exactly 21, nobody wins
  // if computerscore is more than 21 and user is less than 21 , computer burst and user wins
  // if computerscore is more than 21 and userscore is more than 21, both loses
  // if computerscore and player score is less than 21 and computer score is higher, computer wins
  // if computerscore and player score is less than 21 and player score is higher, player wins
  // 

  // if (Number(playerScore) > Number(computerScore) && Number(computerHand) <= 21) {
  //   myOutputValue = myOutputValue + `player wins!!!`
  // }

  // else if (Number(playerHand.rank) < Number(computerHand.rank) && Number(computerHand.rank) <= 21) {
  //   myOutputValue = myOutputValue + `computer wins!!!`
  // }
  // // game continues until we are out of cards
  // playerScore = 0;
  // computerScore = 0;
  // if (deck.length == 0) {
  //   myOutputValue = "game over"
  return myOutputValue;
};


// Then begins a new action, where the user has to decide whether to hit or stand, using the submit button to submit their choice.

// When the user makes a decision the cards are analyzed for any winning conditions.They are also analyzed for losing conditions, since it's possible for any player to lose now.

// The computer also decides to hit or stand automatically based on game rules.

// Either the game ends or continues.


// Deck is shuffled - global state
var getRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
};
// cards is an array of card objects
var shuffleCards = function (deck) {
  var currentIndex = 0;
  // loop over the entire cards array
  while (currentIndex < deck.length) {
    // select a random position from the deck
    var randomIndex = getRandomIndex(deck.length);
    // get the current card in the loop
    var currentItem = deck[currentIndex];
    // get the random card
    var randomItem = deck[randomIndex];
    // swap the current card and the random card
    deck[currentIndex] = randomItem;
    deck[randomIndex] = currentItem;
    currentIndex = currentIndex + 1;
  }
  // give back the shuffled deck
  return deck;
};

var countScore = function (hand) {
  var index = 0;
  var score = 0;
  while (index < hand.length) {
    index += 1;
    console.log(index);
    score = score + hand[index].rank;
    console.log(hand[1]);
    console.log(hand[index].rank)
  }
  return score
};

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

var shuffledDeck = shuffleCards(deck)