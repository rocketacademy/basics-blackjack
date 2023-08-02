// There will be only two players. One human and one computer (for the Base solution).
// The computer will always be the dealer.
// Each player gets dealt two cards to start.
// The player goes first, and decides if they want to hit (draw a card) or stand (end their turn).
// The dealer has to hit if their hand is below 17.
// Each players' score is the total of their card ranks. Jacks/Queen/Kings are 10. Aces can be 1 or 11. How to let player choose whether Ace is 1 or 11?
// The player who is closer to, but not above 21 wins the hand.

// REQUIRED STATES
// State 1 - Player draws 2 cards. Chooses to Hit or Stand
// State 2 - Player chose to Hit, draw 1 card. Chooses to Hit or Stand. If Hit, draw an extra card
// State 3 - Player chose an Ace, and can choose whether the Ace value is 1 or 11
// State 4 - Player chooses to Stand, compares scores and declares winner.
// State 5 - If Player or Computer exceeds 21, they automatically lose
var DRAW_CARDS = "DRAW_CARDS";
var HIT_OR_STAND = "HIT_OR_STAND";
var ACE_CARD = "ACE_CARD";
var DECLARE_WINNER = "DECLARE_WINNER";

var gameMode = DRAW_CARDS;

var HIT = "hit";
var STAND = "stand";
var button2;

var playerCardArray = [];
var computerCardArray = [];

var playerFinalNumber;
var computerFinalNumber;

var main = function (input) {
  makeDeck();
  var myOutputValue;
  var shuffledDeck = shuffleCards(cardDeck);
  // computer draws 2 cards but doesn't reveal it
  var computerCardOne = shuffledDeck.pop();
  var computerCardTwo = shuffledDeck.pop();
  // computer draws extra card if the total is under 17
  var computerCardThree = shuffledDeck.pop();
  // player draws 2 cards, these two cards are revealed to player
  var playerCardOne = shuffledDeck.pop();
  var playerCardTwo = shuffledDeck.pop();
  // additional card for when player chooses Hit
  var playerCardThree = shuffledDeck.pop();
  // combined number
  computerCardArray.push(computerCardOne.rank);
  computerCardArray.push(computerCardTwo.rank);
  var computerFinalNumber = computerCardArray[0] + computerCardArray[1];
  if (computerFinalNumber < 17) {
    computerCardArray.push(computerCardThree.rank);
    computerFinalNumber = computerFinalNumber + computerCardArray[2];
  }
  var playerCombinedNumber =
    Number(playerCardOne.rank) + Number(playerCardTwo.rank);
  playerCardArray.push(playerCardOne.rank);
  playerCardArray.push(playerCardTwo.rank);
  console.log(
    `Player Card One: ${playerCardArray[0]} Player Card Two: ${playerCardArray[1]}`
  );
  playerFinalNumber = playerCardArray[0] + playerCardArray[1];
  if (
    gameMode === DRAW_CARDS &&
    (playerCardArray[0] === 1 || playerCardArray[1] === 1)
  ) {
    gameMode = ACE_CARD;
    myOutputValue = `You have drawn <b>${playerCardArray[0]}</b> & <b>${playerCardArray[1]}</b>. <br> You have drawn an Ace card. <br><br> Input "<b>1</b>" or "<b>11</b>" to choose whether its value will be 1 or 11.`;
  }
  if (gameMode === ACE_CARD) {
    if (playerCardArray[0] === 1 && input === "11") {
      playerCardArray[0] = 11;
      console.log(
        `Player Card One: ${playerCardArray[0]} Player Card Two: ${playerCardArray[1]}`
      );
      playerFinalNumber = playerCardArray[0] + playerCardArray[1];
      gameMode = HIT_OR_STAND;
      return `You have chosen "<b>11</b>", and your combined drawn number is <b>${playerFinalNumber}</b>. <br><br> Input "<b>Hit</b>" to draw another card, or "<b>Stand</b>" to end your turn.`;
    }
    if (playerCardArray[1] === 1 && input === "11") {
      playerCardArray[1] = 11;
      console.log(
        `Player Card One: ${playerCardArray[0]} Player Card Two: ${playerCardArray[1]}`
      );
      playerFinalNumber = playerCardArray[0] + playerCardArray[1];
      gameMode = HIT_OR_STAND;
      return `You have chosen "<b>11</b>", and your combined drawn number is <b>${playerFinalNumber}</b>. <br><br> Input "<b>Hit</b>" to draw another card, or "<b>Stand</b>" to end your turn.`;
    } else if (input === "1") {
      gameMode = HIT_OR_STAND;
      return `You haven chosen "<b>1</b>", and your combined drawn number is <b>${playerFinalNumber}</b>. <br><br> Input "<b>Hit</b>" to draw another card, or "<b>Stand</b>" to end your turn.`;
    }
  }

  if (gameMode === DRAW_CARDS && playerCombinedNumber < 21) {
    gameMode = HIT_OR_STAND;
    myOutputValue = `You drew <b>${playerCardArray[0]}</b> & <b>${playerCardArray[1]}</b> with a combined number of <b>${playerFinalNumber}</b>. <br><br> Input "<b>Hit</b>" to draw another card, or "<b>Stand</b>" to end your turn.`;
  } else if (gameMode === DRAW_CARDS && playerCombinedNumber > 21) {
    myOutputValue = `You drew <b>${playerCardOne.rank}</b> & <b>${playerCardTwo.rank}</b> with a combined number of <b>${playerFinalNumber}</b>.<br> You have exceeded the number of 21. <br><br> Input "<b>Stand</b>" to end your turn.`;
  }

  if (gameMode === HIT_OR_STAND && input === HIT) {
    playerCardArray.push(playerCardThree.rank);
    if (playerFinalNumber < 21) {
      playerFinalNumber = playerFinalNumber + playerCardArray[2];
      myOutputValue = `You drew an additional card of <b>${playerCardArray[2]}</b>. Combined, your total number is <b>${playerFinalNumber}</b>. <br><br>Input "<b>Stand</b>" to end your turn.`;
    } else if (playerFinalNumber > 21) {
      playerFinalNumber = playerFinalNumber + playerCardArray[2];
      myOutputValue = `You drew an additional card of <b>${playerCardThree.rank}</b> & have a combined number of <b>${playerFinalNumber}</b>. <br>You have exceeded the number of 21. <br><br> Input "<b>Stand</b>" to end your turn.`;
    }
  }
  if (gameMode === HIT_OR_STAND && input == STAND) {
    console.log(`Player Final Number: ${playerFinalNumber}`);
    gameMode = DECLARE_WINNER;
    if (computerFinalNumber < playerFinalNumber && playerFinalNumber <= 21) {
      myOutputValue = `You drew a total of <b>${playerFinalNumber}</b> and the computer drew a total of <b>${computerFinalNumber}</b>. <br><h2>You win!</h2>`;
    }
    if (
      computerFinalNumber > playerFinalNumber &&
      playerFinalNumber <= 21 &&
      computerFinalNumber <= 21
    ) {
      myOutputValue = `You drew a total of <b>${playerFinalNumber}</b> and the computer drew a total of <b>${computerFinalNumber}</b>. <br><h2>The computer wins!</h2> <br> <br> Click <b>Submit</b> again to start over.`;
    }
    if (computerFinalNumber === 21 && playerFinalNumber === 21) {
      myOutputValue = `You drew a total of <b>${playerFinalNumber}</b> and the computer drew a total of <b>${computerFinalNumber}.</b> <br><h2>As both of you drew 21, it's a tie!</h2> <br> <br> Click <b>Submit</b> again to start over.`;
    }
    if (computerFinalNumber > 21 && playerFinalNumber > 21) {
      myOutputValue = `You drew a total of <b>${playerFinalNumber}</b> and the computer drew a total of <b>${computerFinalNumber}</b>. <br> <h2> As both of you have exceeded 21, it's a tie! </h2> <br> <br> Click <b>Submit</b> again to start over.`;
    }
    if (computerFinalNumber > 21) {
      myOutputValue = `You drew a total of <b>${playerFinalNumber}</b> and the computer drew a total of <b>${computerFinalNumber}</b>. <br> <h2>As the computer has exceeded 21, you win! </h2> <br> <br> Click <b>Submit</b> again to start over.`;
    } else if (playerFinalNumber > 21) {
      myOutputValue = `The computer drew a total of <b>${computerFinalNumber}</b>.<br> <h2>As you have exceeded 21, the computer wins.</h2><br> <br> Click <b>Submit</b> again to start over.`;
    }
    resetGame();
  }
  return myOutputValue;
};

var cardDeck = [];

// define card deck
var makeDeck = function () {
  // Initialise an empty deck array

  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // Create a variable to store rankNumber
      var rankNumber;
      // Create a variable to store the card names
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;
      // By default, rankNumber is the same as rankCounter
      var rankNumber = rankCounter;
      // create if conditions for the other cards
      if (cardName == 1) {
        // change card name to Ace
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
        // reassign rankNumber to 10
        rankNumber = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        rankNumber = 10;
      } else if (cardName == 13) {
        cardName = "king";
        rankNumber = 10;
      }

      // create a card with the current name, suit and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankNumber,
      };

      // add the new card to the deck
      cardDeck.push(card);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // Return the completed card deck
  return cardDeck;
};

// Initialise index to 0 to start from the beginning of the array
var index = 0;
// Define loop condition to loop until index is the length of cardDeck
while (index < cardDeck.length) {
  // Access attributes of each card with dot notation.
  console.log(cardDeck[index].name);
  // Construct a string using attributes of each card object
  var cardTitle = cardDeck[index].name + " of " + cardDeck[index].suit;
  // Log the string
  console.log(cardTitle);
  // Increment the card index
  index = index + 1;
}

var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  // shuffle each card as many times as there are cards in the deck
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

// reset the game
var resetGame = function () {
  // reset to first mode
  gameMode = DRAW_CARDS;
  // clear arrays
  computerCardArray = [];
  playerCardArray = [];
};
