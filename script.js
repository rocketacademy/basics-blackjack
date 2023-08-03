/// Main goals
// Shuffle and deal cards to Player and Computer
// deal 2 cards to player and 2 to computer
// Determine whos the winner

///
// how to do it?
// 3 functions to dnload - getRandomIndex , shuffleCards, makeDeck
// function dealCard, store in array, compare
////////////////////////////////////////

// declare variables to store player and dealer hands
// use arrays as each hand will be holding multiple card objects
var playerHand = [];
var dealerHand = [];

var makeDeck = function () {
  // Initialise an empty deck array
  var cards = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // Add the new card to the deck
      cards.push(card);

      // Increment rank Counter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // Return the completed card deck
  return cards;
};

var makeDeckDone = makeDeck();

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cards array
function shuffleDeck(cards) {
  // Loop over the card deck array once
  var index = 0;
  while (index < cards.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cards.length);

    // Select the card that corresponds to randomIndex
    var randomItem = cards[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentItem = cards[index];
    // Swap positions of randomCard and currentCard in the deck
    cards[index] = randomItem;

    cards[randomIndex] = currentItem;
    // Increment currentIndex
    index += 1;
  }
  // Return the shuffled deck
  return cards;
}

// Function to Create NEW DECK

function createNewDeck() {
  var shuffleDeckDone = shuffleDeck(makeDeckDone);
  return shuffleDeckDone;
}

//////// got blackjack?

function gotBlackjack(handArray) {
  var playerCardOne = handArray[0];
  var playerCardTwo = handArray[1];

  var gotBlackjack = false;

  if (
    (playerCardOne.name == "ace" && playerCardTwo.rank >= 10) ||
    (playerCardOne.rank >= 10 && playerCardTwo.name == "ace")
  ) {
    gotBlackjack = true;
  } else {
    gotBlackjack = false;
  }
  return gotBlackjack;
}

function sumHandScore(handArray) {
  var sum = 0;
  var i = 0;

  while (i < handArray.length) {
    var currentCard = handArray[i];
    if (
      currentCard.name == "jack" ||
      currentCard.name == "queen" ||
      currentCard.name == "king"
    ) {
      sum = sum + 10;
    } else {
      sum = sum + currentCard.rank;
    }
    i += 1;
  }
  return sum;
  ``;
}

// Game MODES
var gameStart = "game start";
var gameCardsIssued = "cards issued";
var gameScore = "game score";
var gameModeNow = gameStart;
var playDeck = "";

//////////////////////////////////////////

function main(input) {
  var instruction;

  // SUBMIT
  if (gameModeNow == gameStart) {
    // create the game deck

    playDeck = createNewDeck();
    console.log(playDeck);

    // deal 2 cards to player and dealer respectively

    playerHand.push(playDeck.pop());
    dealerHand.push(playDeck.pop());
    playerHand.push(playDeck.pop());
    dealerHand.push(playDeck.pop());

    console.log("player hand >>");
    console.log(playerHand);
    console.log("dealer hand >>");
    console.log(dealerHand);

    gameModeNow = gameCardsIssued;

    instruction = "Cards are dealt. Press SUBMIT to see cards";

    return instruction;
  }

  if (gameModeNow == gameCardsIssued) {
    //test for blackjack

    // check for blackjack
    var playerHasBlackJack = gotBlackjack(playerHand);
    var dealerHasBlackJack = gotBlackjack(dealerHand);

    if (playerHasBlackJack == true || dealerHasBlackJack == true) {
      if (playerHasBlackJack == true && dealerHasBlackJack == true) {
        instruction = "Both have achieved a DRAW";
      } else if (playerHasBlackJack == true && dealerHasBlackJack == false) {
        instruction = "Player Blackjack WINs";
      } else {
        instruction = "Dealer Blackjack WINs";
      }
      console.log(instruction);
    } else {
      instruction = " no one has blackjack ";

      console.log(instruction);

      var playerSumHandScore = sumHandScore(playerHand);
      var dealerSumHandScore = sumHandScore(dealerHand);

      console.log("Player Hand >>", playerSumHandScore);

      console.log("Dealer Hand >>", dealerSumHandScore);

      if (playerSumHandScore == dealerSumHandScore) {
        console.log("its a Draw");
        instruction = "Both Player and Computer DRAWs";
      }

      if (playerSumHandScore > dealerSumHandScore) {
        console.log("player wins");
        instruction = " Player WINS";
      }

      if (playerSumHandScore < dealerSumHandScore) {
        console.log("Computer wins");

        instruction = " Computer WINS";
      }
    }

    return instruction;
  }
}

// only player has blackjack .. player wins
// dealer has blackjack ... dealer wins

// no blackjack .. game continues

// calculate value of player and dealer
/// compare and getWinner (draw, playerwin or dealer win)

// change game mode

// message and instruction

////////////////////////////