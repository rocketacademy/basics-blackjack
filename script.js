// 2 players  - User and dealer (computer)
// 1 deck of cards
// starting hand for 2 cards
// compare winning conditions - win, lose, draw

// Flow of the game
// The deck is shuffled first
// User clicks submit to deal the cards
// Game checks if user has blackjack = auto win
// Cards are displayed to user
// User select hit or stand.
// If hit, deals another card and check for win/lose conditions
// If stand, dealer will decided to hit or stand based on the rules set (16> stand.)
// Compare dealer and user number, and conclude winner

// Create a deck
// Use objects. Card contain suits, number and rank.
// 52 cards, 13 cards for each suit.
// Test git push

/// 1. CREATION OF DECKS FUNCTIONS

var makeDeck = function () {
  var suits = ["Spade", "Heart", "Club", "Diamond"];
  var deck = [];

  for (var i = 0; i < suits.length; i += 1) {
    for (var j = 1; j <= 13; j += 1) {
      var cardName = assignCardNames(j);
      var cardNum = assignCardNumbers(j);
      if (cardName == "ace") {
        cardNum = 11;
      }
      //console.log(cardname);
      var card = {
        name: cardName,
        suit: suits[i],
        number: cardNum,
        rank: j,
      };
      //console.log(card);
      deck.push(card);
    }
  }
  return deck;
};

// Assign Card Names (ace, jack, queen,king)
// insert rank into input
var assignCardNames = function (input) {
  if (input == 1) {
    return "ace";
  } else if (input == 11) {
    return "jack";
  } else if (input == 12) {
    return "queen";
  } else if (input == 13) {
    return "king";
  } else {
    return String(input);
  }
};

// Assign Card Numbers (1,11,12,13 -> Number 1 and 10)
var assignCardNumbers = function (input) {
  if (input == 1) {
    return 1;
  } else if (input == 11) {
    return 10;
  } else if (input == 12) {
    return 10;
  } else if (input == 13) {
    return 10;
  } else {
    return input;
  }
};

// Shuffle a deck - Inputs: Deck (array type)
var shuffleDeck = function (input) {
  var i = 0;
  while (i < input.length) {
    var randomNumber = randomNum();
    var proxycard_i = deck[i];
    input[i] = input[randomNumber];
    input[randomNumber] = proxycard_i;
    i += 1;
  }
  return input;
};

// Get a random number
var randomNum = function () {
  return Math.floor(Math.random() * 52);
};

// GAME BEGINS HERE

var gamestate = "START_STATE"; // START_STATE, HIT_STATE, STAND_STATE
var playerHand = [];
var computerHand = [];
var deck = makeDeck();
var shuffledDeck = shuffleDeck(deck);
var playerHandValue = 0;
var computerHandValue = 0;

var main = function (input) {
  //check gamestate
  if (checkCorrectInput(input)) {
    return `Please enter Hit or Stand`;
  } else {
    checkGameState(input);
  }
  console.log("Check initial game state:" + gamestate);

  if (gamestate == "START_STATE") {
    gamestate = "PENDING_PLAYER_DECISION";
    return startInitialGame();
  }

  if (gamestate == "HIT_STATE") {
    var output = init_hit_state();
    // console.log("Player hits, 1 card drawn, check deck: ");
    // console.log(shuffledDeck);
    return output;
  } else if (gamestate == "STAND_STATE") {
    console.log("Reach stand state");
    init_stand_state();

    var outcome = compareHandValues(playerHand, computerHand);
    var myOutPut = GameOutcome(outcome);
    resetgame();
    return myOutPut;
  }
};

/// 2. GAME STATE FUNCTION
// Initial game state
// Draw 2 cards for player and computer
// Updates the drawn deck
// Check for blackjack conditions
var startInitialGame = function () {
  for (var i = 0; i < 2; i += 1) {
    var playercard = drawCard(shuffledDeck);
    playerHand.push(playercard);
    var computercard = drawCard(shuffledDeck);
    computerHand.push(computercard);
    console.log(playercard);
    console.log(computercard);
  }
  //check for blackjack first
  checkBlackJack(playerHand);
  return hitOrStand();
};

// Hit state
var init_hit_state = function () {
  // to check if the deck is updated
  var playercard = drawCard(shuffledDeck);
  playerHand.push(playercard);
  if (checkHandSum(playerHand) > 21) {
    gamestate = "STAND_STATE";
    return moreThan21text();
  } else {
    return hitOrStand();
  }
};

// Stand state
// Dealer abiding by black jack rules
// Draw when sum less than 16
// Stop draw when more than 16
var init_stand_state = function () {
  while (checkHandSum(computerHand) < 16) {
    var computercard = drawCard(shuffledDeck);
    console.log(computercard);
    computerHand.push(computercard);
  }
  console.log("exited While Loop");
};

// Draw a card
// Input: Deck (array), update the deck to reflect drawn card
var drawCard = function (input) {
  // Remove first element from deck. Updates deck with new values
  //var drawnCard = shuffledDeck.shift();
  //console.log(drawnCard);
  return input.shift();
};

/// 3. VALIDATION FUNCTIONS

// Check hand sum
// Inputs: playerHand or computerHand (arrays)
var checkHandSum = function (hand) {
  var handSum = 0;
  for (var i = 0; i < hand.length; i += 1) {
    handSum = handSum + hand[i]["number"];
  }
  return handSum;
};

// Check for BlackJack outcome
// Inputs: playerhand (arrays)
var checkBlackJack = function (playerhand) {
  if (checkHandSum(playerhand) == 21) {
    gamestate = "STAND_STATE";
    return "Player got a blackjack! Player won!";
  }
  console.log("no BlackJack");
};

// Check game state based on inputs
// Inputs: Hit or Stand
var checkGameState = function (input) {
  if (input == "Hit") {
    gamestate = "HIT_STATE";
  } else if (input == "Stand") {
    gamestate = "STAND_STATE";
  }
};

var checkCorrectInput = function (input) {
  if (
    !(input == "Hit") &&
    !(input == "Stand") &&
    gamestate == "PENDING_PLAYER_DECISION"
  )
    return true;
};

/// TEXT FUNCTIONS
// Hit or Stand Text
var hitOrStand = function () {
  return `Player hand: ${displayCardList(playerHand)} <br>
  Player hand sum: ${checkHandSum(playerHand)} <br><br>
  Computer hand: ${displayCardList(computerHand)} <br>
  Computer hand sum:: ${checkHandSum(computerHand)} <br><br>
  Player choice: Hit or Stand?`;
};

// When player has more than 21
var moreThan21text = function () {
  return `Player hand: ${displayCardList(playerHand)} <br>
  Player hand sum: ${checkHandSum(playerHand)} <br><br>
  Computer hand: ${displayCardList(computerHand)} <br>
  Computer hand sum:: ${checkHandSum(computerHand)} <br><br>
    May RNG be with you`;
};

// Display cards
// Eg. Ace of Heart - "Name" + of + "suit"
var displayCardList = function (hand) {
  var cardlist = [];
  for (var i = 0; i < hand.length; i += 1) {
    var cardName = hand[i]["name"];
    var cardSuit = hand[i]["suit"];
    var cardFullName = " " + cardName + " of " + cardSuit;
    cardlist.push(cardFullName);
  }
  return cardlist;
};

// Game Set
var GameOutcome = function (input) {
  if (input == "Draw") {
    return `Player hand: ${displayCardList(playerHand)} <br>
  Player hand sum: ${checkHandSum(playerHand)} <br><br>
  Computer hand: ${displayCardList(computerHand)} <br>
  Computer hand sum:: ${checkHandSum(computerHand)} <br><br>
  Game Draw!`;
  } else if (input == "Win") {
    return `Player hand: ${displayCardList(playerHand)} <br>
  Player hand sum: ${checkHandSum(playerHand)} <br><br>
  Computer hand: ${displayCardList(computerHand)} <br>
  Computer hand sum:: ${checkHandSum(computerHand)} <br><br>
  Player win!`;
  } else if (input == "Lose") {
    return `Player hand: ${displayCardList(playerHand)} <br>
  Player hand sum: ${checkHandSum(playerHand)} <br><br>
  Computer hand: ${displayCardList(computerHand)} <br>
  Computer hand sum:: ${checkHandSum(computerHand)} <br><br>
  Player lose!`;
  }
};

// Compare outcomes
// Possible scenarios:
// Player > 21 , Com > 21 = Draw
// Player = Com = Draw
// Player > 21 , Com < 21 = Player Lose
// Player < 21 , Com > 21 = Player Win
// Player < 21 , Com < 21 but Player < Com = Player Lose
// Player < 21 , Com < 21 but Player > Com = Player Win
var compareHandValues = function (playerhand, computerhand) {
  var playersum = checkHandSum(playerhand);
  var compsum = checkHandSum(computerhand);
  // console.log(playersum);
  // console.log(compsum);

  if (playersum > 21 && compsum > 21) {
    return "Draw";
  } else if (playersum == compsum) {
    return "Draw";
  } else if (playersum > 21 && compsum <= 21) {
    return "Lose";
  } else if (playersum < 21 && compsum > 21) {
    return "Win";
  } else if (playersum < 21 && compsum < 21 && playersum > compsum) {
    return "Win";
  } else if (playersum < 21 && compsum < 21 && playersum < compsum) {
    return "Lose";
  }
};

// Reset game
var resetgame = function () {
  gamestate = "START_STATE";
  playerHand = [];
  computerHand = [];
  deck = makeDeck();
  shuffledDeck = shuffleDeck(deck);
  playerHandValue = 0;
  computerHandValue = 0;
};

// Special Ace Condition
// We always assume ace = 11 first
var summationWithoutAces = function (hand) {
  var totalsum = 0;
  for (var i = 0; i < hand.length; i += 1) {
    totalsum = totalsum + hand[i]["number"];
  }
  return totalsum;
};

// Check hand sum
// Inputs: playerHand or computerHand (arrays)
var checkHandSum = function (hand) {
  var aceCounter = countAces(hand);
  var totalsum = summationWithoutAces(hand);
  console.log("Check for Hand  Sum");
  console.log(aceCounter);
  console.log(totalsum);
  if (aceCounter == 1 && totalsum > 21) {
    // above assumed ace = 11;
    // if 11 + total sum more than 21, we turned ace =1
    totalsum = totalsum - 11 + 1;
    return totalsum;
  } else if (aceCounter == 2) {
    // both aces can never be 11
    // either both aces = 1 OR ace_1 = 1 and ace_2 =11

    // totalsum - 10: because we assumed aces = 11 (hence 2 aces = 22 in value)
    // this assume ace_1 = 1, ace_2 = 11, but sum > 21
    if (totalsum - 10 > 21) {
      totalsum = totalsum - 10;
      return totalsum;
    } else {
      return totalsum;
    }
  }
  return totalsum;
};

// Check for number of aces in the hand
var countAces = function (hand) {
  var counter = 0;
  for (var i = 0; i < hand.length; i += 1) {
    if (hand[i]["name"] == "ace") {
      counter += 1;
    }
  }
  return counter;
};

// REFLECTIONS

// 1. Naming is key for better management and checking
// 2. Create a checklist of what to test and add more testing points while doing the project
// 3. Always add comments along the way to explain each function (input, datatype, what it does and output)
