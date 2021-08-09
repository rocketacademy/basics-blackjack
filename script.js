// global variables

// game modes
var USERNAME_MODE = "Username Mode";
var SHUFFLE_DECK_MODE = "Shuffle Deck Mode";
var DEAL_CARD_MODE = "Deal Card Mode";
var PLAYER_MODE = "Player Mode";
var COMPUTER_MODE = "Computer Mode";
var DECIDE_WINNER_MODE = "Decide Winner Mode";
var BET_MODE = "Bet Mode";
var CHOOSE_NUM_OF_PLAYER = "Choose number of players";
var GAME_MODE = CHOOSE_NUM_OF_PLAYER;

// global values
var deck = [];
var computerHand = [];
var players = [];
var currentPlayer = 0;
var numOfPlayers = 0;

//________________________ Main Game________________ //
// main function to call the different function to run the game in different modes

var main = function (input) {
  var myOutputValue = "";
  if (GAME_MODE === CHOOSE_NUM_OF_PLAYER) {
    myOutputValue = setNumPlayers(input);
  } else if (GAME_MODE === USERNAME_MODE) {
    myOutputValue = setUsername(input);
  } else if (GAME_MODE === SHUFFLE_DECK_MODE) {
    myOutputValue = createNewDeck(input);
  } else if (GAME_MODE === BET_MODE) {
    myOutputValue = playerBet(input);
  } else if (GAME_MODE === DEAL_CARD_MODE) {
    myOutputValue = dealCards(input);
  } else if (GAME_MODE === PLAYER_MODE) {
    myOutputValue = playerTurn(input);
  } else if (GAME_MODE === COMPUTER_MODE) {
    myOutputValue = computerTurn(input);
  }
  // console log to track which mode we are current in
  console.log("GAME_MODE = " + GAME_MODE);
  return myOutputValue;
};

//______________________ Mode to set num of players_________________ //

var setNumPlayers = function (input) {
  var myOutputValue = `Welcome to Blackjack ♣︎♥︎♠︎♦︎!<br><br>How many players are there ⛹🏻‍♂️ ⛹🏻‍♀️ ?`;
  if (Number(input)) {
    numOfPlayers = input;
    myOutputValue = `${input} players vs Computer/Dealer 😈!<br><br>Tell us your names! =)<br><br>Separate your names with a space`;
    GAME_MODE = USERNAME_MODE;
  }
  return myOutputValue;
};
//______________________ Mode to set username _________________ //

// Using this function to set username and also to create the important Players array which will house all the players information including their hand, bet, points etc. Hand is another array which will house the cards objects

var setUsername = function (input) {
  var myOutputValue = `Tell us your names! =)<br><br>Separate your names with a space`;
  if (input != "") {
    var splitNames = input.split(" ");
    var names = "";
    var counter = 0;
    while (counter < numOfPlayers) {
      // Define players array
      var createPlayer = {
        order: counter,
        name: `${splitNames[counter]}`,
        points: 100,
        bet: 0,
        hand: [],
      };
      players.push(createPlayer);
      names = names + ` ${players[counter].name},`;
      counter += 1;
    }
    console.log(players);
    myOutputValue = `Hello ${names}!<br><br>Welcome to Blackjack! ♣︎♥︎♠︎♦︎`;
    GAME_MODE = SHUFFLE_DECK_MODE;
  }
  return myOutputValue;
};

//__________________ Mode for shuffle Deck ___________//

// function to creat a new deck and shuffle. This function will also reset all the players hand.

var createNewDeck = function () {
  var myOutputValue = `The deck has been shuffled! 🂡🂱🃁🃑 <br><br>${players[0].name} please place your bets.💰`;
  var newDeck = shuffleCards(makeDeck());
  deck = newDeck;
  console.log(deck);
  computerHand = [];

  // this is to reset all player's hand
  var counter = 0;
  while (counter < players.length) {
    players[counter].hand = [];
    counter += 1;
  }
  GAME_MODE = BET_MODE;
  return myOutputValue;
};

//________ mode for players to bet _____________//

// mode to set the the bets for each player. will push the bets in the Players array with key = bet.

var playerBet = function (input) {
  var myOutputValue = "";
  if (Number(input) && currentPlayer <= players.length) {
    // setting the bet into each player's bet key
    players[currentPlayer].bet = input;
    myOutputValue = `${players[currentPlayer].name}'s bet is ${input}`;
    currentPlayer += 1;
  }
  if (currentPlayer == players.length) {
    GAME_MODE = DEAL_CARD_MODE;
    currentPlayer = 0;
  } else {
    myOutputValue =
      myOutputValue +
      `<br><br>${players[currentPlayer].name} please place your bets.💰`;
  }
  return myOutputValue;
};

//_______________ Mode to deal cards _____________//

// this function will deal the cards to players and computer.

var dealCards = function () {
  var myOutputValue = "";

  // using loops to push each players card into their respective hand's array
  var dealCounter = 1;
  while (dealCounter <= 2) {
    var computerCard = deck.pop();
    computerHand.push(computerCard);
    while (currentPlayer < players.length) {
      var playerCard = deck.pop();
      players[currentPlayer].hand.push(playerCard);
      currentPlayer += 1;
    }
    dealCounter += 1;
    currentPlayer = 0;
  }

  // immediately after cards are dealt, we will run a check for any blackjacks.

  while (currentPlayer < players.length) {
    myOutputValue =
      myOutputValue +
      `<br><br>${players[currentPlayer].name} cards are` +
      `${currentHand(players[currentPlayer].hand)}`;
    if (isBlackjack(players[currentPlayer].hand)) {
      myOutputValue = myOutputValue + `  BLACKJACK!!`;
    }
    currentPlayer += 1;
  }
  currentPlayer = 0;

  // check that if Computer has blackjack game is over.

  if (isBlackjack(computerHand)) {
    myOutputValue =
      myOutputValue +
      `<br><br>Computer BLACKJACK with ${currentHand(computerHand)}🎉` +
      `<br><br>This round is over.`;

    // if Computer has blackjack, program would update the points with the bets. This is done with the checkWin function (function found at end of code)
    var counter = 0;
    while (counter < players.length) {
      myOutputValue = myOutputValue + checkWin(players[counter]);
      counter += 1;
    }
    // getPointsSummary is just to give a update of all Players Points.
    myOutputValue = myOutputValue + `${getPointsSummary()}`;
    GAME_MODE = SHUFFLE_DECK_MODE;
  } else {
    myOutputValue =
      myOutputValue +
      `<br><br>Computer's face up card is ${cardName(computerHand[0])}` +
      `<br><br>${players[currentPlayer].name} will go first`;
    GAME_MODE = PLAYER_MODE;
  }
  return myOutputValue;
};

//__________________ Mode where it is Player's Turn______//

// function will allow players to either hit or stand.

var playerTurn = function (input) {
  var myOutputValue = ``;
  if (input == "hit") {
    var playerCard = deck.pop();
    players[currentPlayer].hand.push(playerCard);
    myOutputValue =
      `${players[currentPlayer].name} hit ` + `${cardName(playerCard)}`;
  }
  myOutputValue =
    myOutputValue +
    `<br><br>${players[currentPlayer].name} cards are ` +
    `${currentHand(players[currentPlayer].hand)}`;

  // condition if that player has a blackjack, there is nothing to be done. Just wait for other players turn.

  if (isBlackjack(players[currentPlayer].hand)) {
    myOutputValue =
      `${players[currentPlayer].name} cards are ` +
      `${currentHand(players[currentPlayer].hand)}` +
      `<br><br>${players[currentPlayer].name} has a BLACKJACK!🎉`;
    currentPlayer += 1;

    // condition to check that is Player BUST, that they cannot pick more cards.
    // checkScore is found at the end of code. checkScore has inbuilt logic for treatment of Ace
  }
  if (
    checkScore(players[currentPlayer].hand) > 21 &&
    currentPlayer !== players.length - 1
  ) {
    myOutputValue =
      myOutputValue + `<br><br>${players[currentPlayer].name} BUST!!`;
    currentPlayer += 1;
  } else if (checkScore(players[currentPlayer].hand) < 22) {
    myOutputValue = myOutputValue + `<br><br>Please type "hit or "stand"`;
  }

  if (
    checkScore(players[currentPlayer].hand) > 21 &&
    currentPlayer == players.length - 1
  ) {
    myOutputValue =
      myOutputValue +
      `<br><br>${players[currentPlayer].name} BUST!!` +
      `<br><br>Computer's face down card was ` +
      `${cardName(computerHand[0])}` +
      `<br><br>It is now Computer's turn.`;
    GAME_MODE = COMPUTER_MODE;
  }
  if (input == "stand" && currentPlayer == players.length - 1) {
    // after last player has made their decision, we ill move to next game mode
    myOutputValue =
      `Computer's face down card was ` +
      `${cardName(computerHand[0])}` +
      `<br><br>It is now Computer's turn.`;
    GAME_MODE = COMPUTER_MODE;
  } else if (input == "stand") {
    currentPlayer += 1;
    myOutputValue = `It is now ${players[currentPlayer].name}'s turn.`;
  }
  return myOutputValue;
};

//__________________ Mode where it is computer's Turn______//

// function will automatically decide how many cards Computer needs to draw in order to hit 17.

var computerTurn = function (input) {
  var myOutputValue = "";
  var counter = checkScore(computerHand);
  while (counter < 17) {
    var computerCard = deck.pop();
    computerHand.push(computerCard);
    counter = checkScore(computerHand);
  }
  myOutputValue = `Computer's hand is ${currentHand(computerHand)}.`;
  if (checkScore(computerHand) > 21) {
    myOutputValue = myOutputValue + ` Computer BUST!!`;
  }

  // checkWin function will determine if player has won or lose and update their points.
  currentPlayer = 0;
  while (currentPlayer < players.length) {
    myOutputValue = myOutputValue + checkWin(players[currentPlayer]);
    currentPlayer += 1;
  }
  myOutputValue = myOutputValue + `${getPointsSummary()}`;
  GAME_MODE = SHUFFLE_DECK_MODE;
  currentPlayer = 0;
  return myOutputValue;
};

//____________________ SUPPORTING Functions____________ //

var checkWin = function (input) {
  var myOutputValue = "";
  if (
    (checkScore(input.hand) > checkScore(computerHand) &&
      checkScore(input.hand) < 22) ||
    (checkScore(input.hand) < 22 && checkScore(computerHand) > 21) ||
    (isBlackjack(input.hand) == true && isBlackjack(computerHand) == false)
  ) {
    myOutputValue = myOutputValue =
      `<br><br>${input.name}'s cards are ` +
      `${currentHand(input.hand)}. ` +
      `${input.name} WON 🙌🏻 !`;
    input.points += Number(input.bet);
  } else if (
    (checkScore(input.hand) < checkScore(computerHand) &&
      checkScore(computerHand) < 22) ||
    (checkScore(input.hand) > 22 && checkScore(computerHand) < 22)
  ) {
    input.points -= Number(input.bet);
    myOutputValue =
      myOutputValue +
      `<br><br>${input.name}'s cards are ` +
      `${currentHand(input.hand)}. ` +
      `${input.name} LOST ☹️ `;
  } else if (
    checkScore(input.hand) == checkScore(computerHand) ||
    (checkScore(input.hand) > 21 && checkScore(computerHand) > 21) ||
    (isBlackjack(input.hand) == true && isBlackjack(computerHand) == true)
  ) {
    myOutputValue =
      `<br><br>${input.name}'s cards are ` +
      `${currentHand(input.hand)}. ` +
      `${input.name} It's a Draw!`;
  }
  return myOutputValue;
};

var makeDeck = function () {
  var cardDeck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var power = rankCounter;
      var cardName = rankCounter;
      if (cardName == 1) {
        cardName = "Ace";
      } else if (cardName == 11) {
        cardName = "Jack";
        power = 10;
      } else if (cardName == 12) {
        cardName = "Queen";
        power = 10;
      } else if (cardName == 13) {
        cardName = "King";
        power = 10;
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        power: power,
      };
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};

var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};
var shuffleCards = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex = currentIndex + 1;
  }
  return cardDeck;
};

var cardName = function (card) {
  if (card.suit == "clubs") {
    var suit = "♣︎";
  } else if (card.suit == "hearts") {
    var suit = "♥︎";
  } else if (card.suit == "spades") {
    var suit = "♠︎";
  } else if (card.suit == "diamonds") {
    var suit = "♦︎";
  }
  return `${card.name}${suit}`;
};

var currentHand = function (input) {
  var counter = 0;
  var name = "";
  while (counter < input.length) {
    name = name + `   ${cardName(input[counter])}`;
    counter += 1;
  }
  return name;
};

var checkScore = function (input) {
  var counter = 0;
  var score = 0;
  while (counter < input.length) {
    score = score + input[counter].power;
    counter += 1;
  }
  if (numOfAce(input) == 1 && score <= 11) {
    score += 10;
  }
  if (numOfAce(input) == 2 && score <= 11) {
    score += 10;
  }
  if (numOfAce(input) == 3 && score <= 11) {
    score += 10;
  }
  if (numOfAce(input) == 4 && score <= 11) {
    score += 10;
  }
  return score;
};

var numOfAce = function (input) {
  var number = 0;
  var counter = 0;
  while (counter < input.length) {
    if (input[counter].rank == 1) {
      number += 1;
    }
    counter += 1;
  }
  return number;
};

var isBlackjack = function (input) {
  return (
    (input[0].name == "Ace" && input[1].rank >= 10) ||
    (input[1].name == "Ace" && input[0].rank >= 10)
  );
};

var getPointsSummary = function () {
  var myOutputValue = "<br>";
  var counter = 0;
  while (counter < players.length) {
    myOutputValue =
      myOutputValue +
      `<br>${players[counter].name}'s points ➡ ${players[counter].points}`;
    counter += 1;
  }
  return myOutputValue;
};

// computerHand = [
//   {
//     name: "Ace",
//     power: 1,
//     rank: 1,
//     suit: "spades",
//   },
//   {
//     name: 10,
//     power: 10,
//     rank: 10,
//     suit: "spades",
//   },
// ];
// players = [
//   {
//     bet: "13",
//     hand: [
//       {
//         name: "Ace",
//         power: 1,
//         rank: 1,
//         suit: "spades",
//       },
//       {
//         name: 10,
//         power: 10,
//         rank: 10,
//         suit: "spades",
//       },
//     ],
//     name: "Eric",
//     order: 0,
//     points: 100,
//   },
//   {
//     bet: "12",
//     hand: [
//       {
//         name: "Ace",
//         power: 1,
//         rank: 1,
//         suit: "spades",
//       },
//       {
//         name: 9,
//         power: 9,
//         rank: 9,
//         suit: "spades",
//       },
//     ],
//     name: "Tom",
//     order: 1,
//     points: 100,
//   },
// ];

// computerHand = [
//   {
//     name: "Ace",
//     power: 1,
//     rank: 1,
//     suit: "spades",
//   },
//   {
//     name: 10,
//     power: 10,
//     rank: 10,
//     suit: "spades",
//   },
// ];
