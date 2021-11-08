/*Implement a simplified version of Blackjack. Our simplified rules are the following. Please read all the requirements before starting it!

There will be only two players.
One human and one computer (for the Base solution).
The computer will always be the dealer.
Each player gets dealt two cards to start.
The player goes first, and decides if they want to hit (draw a card) or stand (end their turn).
The dealer has to hit if their hand is below 17.Each players' score is the total of their card ranks. Jacks/Queen/Kings are 10. Aces can be 1 or 11.
The player who is closer to, but not above 21 wins the hand.*/

// VERSION 1 OF BLACKJACK

// GLOBAL VARIABLES
var myOutputValue = "";

// GAME MODE
var INIT = "init";
var CHECK_FOR_BLACKJACK = "check for blackjack";
var PLAYER_TURN = "player turn";
var COMPUTER_TURN = "computer turn";
var mode = INIT;

// GAME STATUS
var shuffledDeck = [];
var playerHand = [];
var computerHand = [];
var playerSum = [];
var computerSum = [];

var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

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
    // Increment currentIndex to shuffle the next pair of cards
    currentIndex += 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

// make a standard 52-card deck
var makeDeck = function () {
  var deck = [];
  suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
  names = [
    "Ace",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "Jack",
    "Queen",
    "King",
  ];
  values = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];

  var index = 0;
  for (var suit = 0; suit < suits.length; suit += 1) {
    for (var name = 0; name < names.length; name += 1) {
      deck[index] = {
        suit: suits[suit],
        name: names[name],
        value: values[name],
      };
      index += 1;
    }
  }
  return deck;
};

var showHandMessage = function (character, charHand) {
  var handSize = charHand.length;
  myOutputValue += `${character}: `;
  var handSum = 0;

  // loop and display
  var counter = 0;
  while (counter < handSize) {
    handSum += charHand[counter].value;
    var handName = charHand[counter].name + " of " + charHand[counter].suit;
    myOutputValue += handName + ", ";
    counter += 1;
  }
  myOutputValue = myOutputValue.substring(0, myOutputValue.length - 2); // remove last comma
  myOutputValue += ` (Value: ${handSum})`;
  myOutputValue += "<br>";
  return;
};

var isBlackjack = function (charHand) {
  var firstCardName = charHand[0].name;
  var secondCardName = charHand[1].name;
  var hasAce = handGotAce(firstCardName, secondCardName);

  var firstCardValue = charHand[0].value;
  var secondCardValue = charHand[1].value;
  var hasTen = handGotTen(firstCardValue, secondCardValue);

  if (hasAce && hasTen) {
    return true;
  }
  return false;
};

var handGotAce = function (firstCardName, secondCardName) {
  if (firstCardName == "Ace" || secondCardName == "Ace") {
    return true;
  }
  return false;
};

var handGotTen = function (firstCardValue, secondCardValue) {
  if (firstCardValue == 10 || secondCardValue == 10) {
    return true;
  }
  return false;
};

function isEmpty(str) {
  return !str || str.length === 0;
}

/* persuo code for blackjack
make deck
shuffle deck
deal card to player and computer

check for blackjack; draw if both blackjack; move to game if no blackjack

player hit or stand

computer hit if value <= 16
find winner
*/

var main = function (input) {
  if (mode == INIT) {
    console.log("========== entering init ========");
    // create a shuffled standard 52-card deck
    shuffledDeck = shuffleCards(makeDeck());
    console.log("========== shuffled deck ========");
    console.log(shuffledDeck);

    // clear hand
    playerHand = [];
    computerHand = [];

    // deal starting hand
    playerHand.push(shuffledDeck.pop());
    computerHand.push(shuffledDeck.pop());
    playerHand.push(shuffledDeck.pop());
    computerHand.push(shuffledDeck.pop());
    console.log("========== player hand ========");
    console.log(playerHand);
    console.log("========== computer hand ========");
    console.log(computerHand);

    // next mode
    mode = CHECK_FOR_BLACKJACK;

    // display hand state
    myOutputValue = "";
    showHandMessage("Player", playerHand);
    showHandMessage("Dealer", computerHand);
    myOutputValue += "<br>Press Submit to continue";

    console.log("========== exiting init ========");
    return myOutputValue;
  }

  if (mode == CHECK_FOR_BLACKJACK) {
    console.log("========== entering check for blackjack ========");
    // playerHand = [
    //   { suit: "Clubs", name: "Ace", value: 11 },
    //   { suit: "Clubs", name: "King", value: 10 },
    // ];
    // computerHand = [
    //   { suit: "Clubs", name: "Ace", value: 11 },
    //   { suit: "Clubs", name: "King", value: 10 },
    // ];

    var isPlayerBlackjack = isBlackjack(playerHand);
    var isComputerBlackjack = isBlackjack(computerHand);

    if (isPlayerBlackjack && isComputerBlackjack) {
      myOutputValue = `Player and Dealer got blackjack!
      <br>
      This is a draw!
      <br>
      Game reset`;
      mode = INIT;
      return myOutputValue;
    }
    if (isPlayerBlackjack) {
      myOutputValue = `Player got blackjack!
      <br>
      Player wins!
      <br>
      Game reset`;
      mode = INIT;
      return myOutputValue;
    }
    if (isComputerBlackjack) {
      myOutputValue = `Dealer got blackjack!
      <br>
      Dealer wins!
      <br>
      Game reset`;
      mode = INIT;
      return myOutputValue;
    }

    // display hand state
    myOutputValue = "No one got blackjack.<br><br>";
    showHandMessage("Player", playerHand);
    showHandMessage("Dealer", computerHand);
    myOutputValue += "<br>Press Submit to continue to Player's turn.";

    mode = PLAYER_TURN;
    console.log("========== exiting check for blackjack ========");
    return myOutputValue;
  }

  if (mode == PLAYER_TURN) {
    console.log("========== entering player turn ========");
    var userInput = input;

    if (isEmpty(userInput)) {
      // display hand state
      myOutputValue = "";
      showHandMessage("Player", playerHand);
      showHandMessage("Dealer", computerHand);
      myOutputValue += `<br>Player's turn<br>
    Enter "hit" or "stand" for your action.`;
      return myOutputValue;
    } else if (userInput == "hit") {
      playerHand.push(shuffledDeck.pop());
      myOutputValue = "";
      showHandMessage("Player", playerHand);
      showHandMessage("Dealer", computerHand);
      myOutputValue += `<br>Player's turn<br>
    Enter "hit" or "stand" for your action.`;
      return myOutputValue;
    } else if (userInput == "stand") {
      myOutputValue = "";
      showHandMessage("Player", playerHand);
      showHandMessage("Dealer", computerHand);
      myOutputValue += `<br>Player's turn<br>
    Enter "hit" or "stand" for your action.`;
      mode = COMPUTER_TURN;
      console.log("========== exiting player turn ========");
      return myOutputValue;
    } else {
      myOutputValue = "Invalid input. Please try again.";
      return myOutputValue;
    }
  }

  if (mode == COMPUTER_TURN) {
    console.log("========== entering computer turn ========");
  }

  return "end";
};

/* TO DO 
a function that evaluate hand value, taking into account ace logic
computer game logic
find winner
*/
