/*Implement a simplified version of Blackjack. Our simplified rules are the following. Please read all the requirements before starting it!

There will be only two players.
One human and one computer (for the Base solution).
The computer will always be the dealer.
Each player gets dealt two cards to start.
The player goes first, and decides if they want to hit (draw a card) or stand (end their turn).
The dealer has to hit if their hand is below 17.Each players' score is the total of their card ranks. Jacks/Queen/Kings are 10. Aces can be 1 or 11.
The player who is closer to, but not above 21 wins the hand.*/

/*VERSION 2 OF BLACKJACK
allow more than 1 player
all players play against dealer
allow betting*/

// CONSTANT
var MIN_NUM_PLAYER = 1;
var MAX_NUM_PLAYER = 4;
var TWENTY_ONE = 21;
var SEVENTEEN = 17;
var HAND_SIZE_LIMIT = 5;

// GLOBAL VARIABLES
var myOutputValue = "";

// GAME MODE
var ASK_FOR_PLAYERS = "ask for players";
var mode = ASK_FOR_PLAYERS;
var CREATE_PLAYERS = "create players";
var ASK_FOR_BETS = "ask for bets";
var DEAL_STARTING_HAND = "deal starting hand";
var CHECK_FOR_BLACKJACK = "check for blackjack";
var PLAYERS_TURN = "players turn";

// GAME STATUS
var numberOfPlayers = 0;
var players = [];
var dealer = {};
var currentBetIndex = 0;
var currentPlayerIndex = 0;

var initialisePlayers = function () {
  // create players
  for (var i = 0; i < numberOfPlayers; i += 1) {
    players[i] = {
      name: `Player ${i + 1}`,
      hand: [],
      blackjack: false,
      handValue: 0,
      wallet: 100,
      bet: 0,
      draw: false,
      stand: false,
    };
  }
  // create dealer
  dealer = {
    name: "Dealer",
    hand: [],
    blackjack: false,
    handValue: 0,
  };
};

var initialiseDeck = function () {
  var deck = [];
  var names = [
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
  var values = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
  var suits = ["Spades", "Hearts", "Diamonds", "Clubs"];

  // make standard 52-card deck
  var index = 0;
  for (var suit = 0; suit < suits.length; suit += 1) {
    for (var name = 0; name < names.length; name += 1) {
      deck[index] = {
        name: names[name],
        value: values[name],
        suit: suits[suit],
      };
      index += 1;
    }
  }
  return deck;
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

var showBetMessage = function () {
  var name = players[currentBetIndex].name;
  var wallet = players[currentBetIndex].wallet;

  var message = `${name}, you have $${wallet}.
  <br><br>
  Place your bet in the textbox and press Submit to continue.`;

  return message;
};

var dealStartingHand = function () {
  var startingHandSize = 2;
  // deal to players then dealer
  for (var round = 0; round < startingHandSize; round += 1) {
    for (var player = 0; player < numberOfPlayers; player += 1) {
      var randomCard = shuffledDeck.pop();
      players[player].hand.push(randomCard);
    }
    randomCard = shuffledDeck.pop();
    dealer.hand.push(randomCard);
  }
};

var showHandState = function () {
  // dealer = {
  //   name: "Dealer",
  //   hand: [
  //     { name: "4", value: 4, suit: "Clubs" },
  //     { name: "9", value: 9, suit: "Diamonds" },
  //     { name: "4", value: 4, suit: "Hearts" },
  //     { name: "9", value: 9, suit: "Hearts" },
  //   ],
  //   blackjack: false,
  //   handValue: 0,
  // };
  // players[0] = {
  //   name: `Player 1`,
  //   hand: [
  //     { name: "4", value: 4, suit: "Clubs" },
  //     { name: "9", value: 9, suit: "Diamonds" },
  //     { name: "4", value: 4, suit: "Hearts" },
  //     { name: "9", value: 9, suit: "Hearts" },
  //   ],
  //   blackjack: false,
  //   handValue: 0,
  //   wallet: 100,
  //   bet: 0,
  // };

  var message = "";
  var dealerName = dealer.name;
  var dealerHandSize = dealer.hand.length;
  var dealerValue = dealer.handValue;

  message = `${dealerName}: `;
  var counter = 0;
  while (counter < dealerHandSize) {
    var cardName = `${dealer.hand[counter].name} of ${dealer.hand[counter].suit}`;
    message += `${cardName}, `;
    counter += 1;
  }
  message = message.substring(0, message.length - 2);
  message += ` (Value: ${dealerValue})`;
  message += `<br><br>`;

  var index = 0;
  counter = 0;
  while (index < numberOfPlayers) {
    var playerName = players[index].name;
    var playerHandSize = players[index].hand.length;
    var playerValue = players[index].handValue;

    message += `${playerName}: `;
    while (counter < playerHandSize) {
      cardName = `${players[index].hand[counter].name} of ${players[index].hand[counter].suit}`;
      message += `${cardName}, `;
      counter += 1;
    }
    counter = 0;
    index += 1;
    message = message.substring(0, message.length - 2);
    message += ` (Value: ${playerValue})`;
    message += `<br><br>`;
  }
  message += `Press Submit to continue.`;
  return message;
};

// calculate hand value and store into object
var calcHandValue = function () {
  // dealer
  var dealerCountAces = getNumberOfAces(dealer.hand);
  var dealerHandSize = dealer.hand.length;

  var sum = 0;
  var counter = 0;
  while (counter < dealerHandSize) {
    var cardValue = dealer.hand[counter].value;
    sum += cardValue;
    counter += 1;
  }
  if (sum > TWENTY_ONE && dealerCountAces > 0) {
    var aceCounter = 0;
    while (aceCounter < dealerCountAces) {
      sum -= 10;
      if (sum <= TWENTY_ONE) {
        break;
      }
      aceCounter += 1;
    }
  }
  dealer.handValue = sum;

  // players
  var index = 0;
  while (index < numberOfPlayers) {
    var player = players[index];
    var playerCountAces = getNumberOfAces(player.hand);
    var playerHandSize = player.hand.length;

    sum = 0;
    counter = 0;
    while (counter < playerHandSize) {
      cardValue = player.hand[counter].value;
      sum += cardValue;
      counter += 1;
    }
    if (sum > TWENTY_ONE && playerCountAces > 0) {
      aceCounter = 0;
      while (aceCounter < playerCountAces) {
        sum -= 10;
        if (sum <= TWENTY_ONE) {
          break;
        }
        aceCounter += 1;
      }
    }
    player.handValue = sum;
    index += 1;
  }
};

var getNumberOfAces = function (hand) {
  var numberOfAces = 0;

  var counter = 0;
  while (counter < hand.length) {
    var cardName = hand[counter].name;

    if (cardName == "Ace") {
      numberOfAces += 1;
    }
    counter += 1;
  }
  return numberOfAces;
};

/* persuo code for blackjack - version 2
create players

ask for bet

make deck
shuffle deck
deal card to players and computer

check for blackjack; draw if both blackjack; move to game if no blackjack
if blackjack, betting * 2

players hit or stand

computer hit if value <= 16

players vs computer
give winning
*/

var main = function (input) {
  // first load, ask for number of players
  if (mode == ASK_FOR_PLAYERS) {
    console.log("========== entering ask for players ==========");
    var userInput = Number(input);

    // true when input is between min and max number of players
    if (userInput >= MIN_NUM_PLAYER && userInput <= MAX_NUM_PLAYER) {
      numberOfPlayers = userInput;
      myOutputValue = `${numberOfPlayers} player(s) will be playing in this game of Blackjack.
      <br><br>
      Creating player(s)...
      <br><br>
      Player(s) place your bet.
      <br><br>
      Press Submit to continue.`;

      mode = CREATE_PLAYERS;

      console.log("========== exiting ask for players ==========");
      return myOutputValue;
    }

    // false
    myOutputValue = `You typed in an invalid response. How many players will be playing? (min: 1, max: 4)`;
    return myOutputValue;
  }

  if (mode == CREATE_PLAYERS) {
    console.log("========== entering create players ==========");
    initialisePlayers();
    mode = ASK_FOR_BETS;
    myOutputValue = showBetMessage();
    console.log("========== exiting create players ==========");
    return myOutputValue;
  }

  if (mode == ASK_FOR_BETS) {
    console.log("========== entering ask for bets ==========");

    var betAmount = Number(input);
    var playerWallet = players[currentBetIndex].wallet;

    // bet must be valid and less than what wallet has
    if (betAmount > 0 && playerWallet >= betAmount) {
      players[currentBetIndex].bet = betAmount;
      console.log(players[currentBetIndex].name, players[currentBetIndex].bet);
      currentBetIndex += 1;

      // all players betted, exit mode
      if (currentBetIndex >= numberOfPlayers) {
        currentBetIndex = 0;
        mode = DEAL_STARTING_HAND;
        myOutputValue = `All player(s) have betted.<br><br>
        Dealing cards...
        <br><br>
        Press Submit to continue.`;
        console.log("========== exiting ask for bets ==========");
        return myOutputValue;
      }
      // prompt next player bet
      myOutputValue = showBetMessage();
      return myOutputValue;
    }
    // catch invalid response
    myOutputValue = "You typed in an invalid bet.<br><br>" + showBetMessage();
    return myOutputValue;
  }

  if (mode == DEAL_STARTING_HAND) {
    console.log("========== entering deal starting hand ==========");
    shuffledDeck = shuffleCards(initialiseDeck());
    dealStartingHand();
    calcHandValue();
    myOutputValue = showHandState();
    mode = CHECK_FOR_BLACKJACK;
    console.log("========== exiting deal starting hand ==========");
    return myOutputValue;
  }

  if (mode == CHECK_FOR_BLACKJACK) {
    console.log("========== entering check for blackjack ==========");
    // check hand for blackjack
    inspectBlackjack();

    // if dealer blackjack, round end
    if (dealer.blackjack) {
      myOutputValue = evalRoundDealerBlackjack();
      gameReset();
      return myOutputValue;
    }

    // game continue
    mode = PLAYERS_TURN;
    console.log("========== exiting check for blackjack ==========");
  }

  if (mode == PLAYERS_TURN) {
    // handsize > 5
    // handvalue > 21
    // hit or stand

    var userInput = input;

    // force player to stand
    if (handSize > HAND_SIZE_LIMIT || player.handValue > TWENTY_ONE) {
      userInput = "stand";
    }

    if (userInput == "hit") {
      var player = players[currentPlayerIndex];
      player.hand.push(shuffledDeck.pop());
      calcHandValue();
      var handSize = player.hand.length;

      return "player hit";
    }

    if (userInput == "stand") {
      return "auto stand";
    }

    myOutputValue = "invalid";
    return myOutputValue;
  }
  /*
  check for blackjack, if dealer blackjack, dealer win, game end
  blackjack winner bet * 2

  those no blackjack, continue game
  hit or stand
  auto stand > 21 or hand > 5

  dealer stand >= 17

  evluate game

  give winning

  empty hand and bet, next game
  */

  return "end of main";
};

// dealer = {
//   name: "Dealer",
//   hand: [
//     { name: "4", value: 4, suit: "Clubs" },
//     { name: "9", value: 9, suit: "Diamonds" },
//     { name: "4", value: 4, suit: "Hearts" },
//     { name: "9", value: 9, suit: "Hearts" },
//   ],
//   blackjack: false,
//   handValue: 0,
// };
// players[0] = {
//   name: `Player 1`,
//   hand: [
//     { name: "4", value: 4, suit: "Clubs" },
//     { name: "9", value: 9, suit: "Diamonds" },
//     { name: "4", value: 4, suit: "Hearts" },
//     { name: "9", value: 9, suit: "Hearts" },
//   ],
//   blackjack: false,
//   handValue: 0,
//   wallet: 100,
//   bet: 0,
// };

var gameReset = function () {
  mode = ASK_FOR_BETS;
  dealer.hand = [];
  dealer.blackjack = false;
  dealer.handValue = 0;

  var counter = 0;
  while (counter < numberOfPlayers) {
    var player = players[counter];
    player.hand = [];
    player.blackjack = false;
    player.handValue = 0;
    player.bet = 0;
    counter += 1;
  }
};

var inspectBlackjack = function () {
  // dealer = {
  //   name: "Dealer",
  //   hand: [
  //     { name: "Ace", value: 11, suit: "Clubs" },
  //     { name: "King", value: 10, suit: "Diamonds" },
  //   ],
  //   blackjack: false,
  //   handValue: 21,
  // };
  // players[0] = {
  //   name: `Player 1`,
  //   hand: [
  //     { name: "Ace", value: 11, suit: "Clubs" },
  //     { name: "King", value: 10, suit: "Diamonds" },
  //   ],
  //   blackjack: false,
  //   handValue: 21,
  //   wallet: 100,
  //   bet: 0,
  // };
  // players[1] = {
  //   name: `Player 2`,
  //   hand: [
  //     { name: "Ace", value: 11, suit: "Clubs" },
  //     { name: "King", value: 10, suit: "Diamonds" },
  //   ],
  //   blackjack: false,
  //   handValue: 21,
  //   wallet: 100,
  //   bet: 0,
  // };

  if (dealer.handValue == TWENTY_ONE) {
    dealer.blackjack = true;
  }

  for (var i = 0; i < numberOfPlayers; i += 1) {
    if (players[i].handValue == TWENTY_ONE) {
      players[i].blackjack = true;
    }
  }
};

var evalRoundDealerBlackjack = function () {
  // dealer got blackjack
  // check which players got blackjack
  // count winning
  // round end, reset

  var counter = 0;
  while (counter < numberOfPlayers) {
    var player = players[counter];

    if (player.blackjack) {
      player.draw = true;
    }
    counter += 1;
  }

  var message = `Dealer has Blackjack!<br><br>`;

  counter = 0;
  while (counter < numberOfPlayers) {
    player = players[counter];

    if (player.draw) {
      message += `${player.name} has Blackjack! It is a draw!<br><br>`;
      counter += 1;
      continue;
    }

    player.wallet -= player.bet * 2;

    message += `${player.name} betted $${player.bet}. (-$${
      player.bet * 2
    })<br><br>`;
    counter += 1;
  }
  message += `Round end. Preparing for next round...<br><br>Press Submit to continue.`;
  return message;
};
