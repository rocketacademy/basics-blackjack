/*
There will be only two players. One human and one computer (for the Base solution).
The computer will always be the dealer.
Each player gets dealt two cards to start.
The player goes first, and decides if they want to hit (draw a card) or stand (end their turn).
The dealer has to hit if their hand is below 17.
Each players' score is the total of their card ranks. Jacks/Queen/Kings are 10. Aces can be 1 or 11.
The player who is closer to, but not above 21 wins the hand.
*/

// Global Variables declariation
var player = [
  {
    name: "player",
    hands: [[]],
    points: 0, // array of points and wagers corresponding to hands
    wager: 0,
    chips: 100,
    readyState: [false], // array denoting whether the hand is settled
  },
];
// var playerHandValue = checkValue(player[0]);

var computer = [
  {
    name: "computer",
    hands: [[]],
    points: 0, // array of points and wagers corresponding to hands
    wager: 0,
    chips: 100,
    readyState: [false], // array denoting whether the hand is settled
  },
];
// var computerHandValue = checkValue(computer[0]);

var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
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
      cardDeck.push(card);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // Return the completed card deck
  console.log(cardDeck);
  return cardDeck;
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

// Initialise deck creation and shuffling
var deck = makeDeck();
var shuffledDeck = shuffleCards(deck);

// var draw2Cards = function (who) {
//   who.hands = [shuffledDeck.pop(), shuffledDeck.pop()];
//   return who;
// };

// var splitOption = function(){

// }

var checkValue = function (player) {
  player.points = 0;
  console.log(player);
  // getting values of player first hand, if split implemented, do another for loop to change hands
  // player.hands[0] = [shuffledDeck.pop(), shuffledDeck.pop()];
  for (var i = 0; i < player.hands[0].length; i += 1) {
    console.log(`${player.name} cards: ${player.hands[0]}`);
    var currCardCounter = 0;
    var acesInHand = 0;

    // getting value of each card from player first hand
    while (currCardCounter < player.hands[i].length) {
      console.log(`running card ${currCardCounter}`);
      var currCard = player.hands[i][currCardCounter];
      // Deal with aces and picture rank values
      /* Special case for aces:
      if 2 aces dealt at start but allow for split
      else aces will be 11 for 2 cards
      else aces will be 1 for 3 cards and above
      */
      if (currCard.rank == 1) {
        player.points += 11;
        acesInHand += 1;
      } else if (
        currCard.rank == 11 ||
        currCard.rank == 12 ||
        currCard.rank == 13
      ) {
        player.points += 10;
      } else {
        player.points += currCard.rank;
      }
      // Check for if 2 aces dealt at start
      if (player.hands[i].length == 2 && acesInHand == 2) {
        player.points = 21;
        // myOutputValue = `You have 2 aces for a blackjack win! or do you want to split?`;
        return player;
        // check condition for split later
      }
      if (player.hands[i].length > 2 && acesInHand >= 2) {
        if (player.points > 21) {
          var aceCounter = 0;
          while (aceCounter < acesInHand) {
            player.points -= 10;
            aceCounter += 1;
            if (player.points < 21) {
              break;
            }
          }
        }
      }
      currCardCounter += 1;
    }
    return player;
  }
};

mainGameFunction = `start`;

var main = function (input) {
  if (mainGameFunction == "start") {
    myOutputValue = `Welcome to blackjack please press enter to start the game`;
    mainGameFunction = "draw cards";
    return myOutputValue;
  }
  if (mainGameFunction == "draw cards") {
    // Draw 2 cards from the top of the deck
    player[0].hands[0] = [shuffledDeck.pop(), shuffledDeck.pop()];
    computer[0].hands[0] = [shuffledDeck.pop(), shuffledDeck.pop()];
    checkValue(player[0]).points;
    console.log(`Playerhands: ${player[0].points}`);
    checkValue(computer[0]).points;
    console.log(`Computerhands: ${computer[0].points}`);
    // Construct an output string to communicate which cards were drawn
    var myOutputValue =
      "Computer had " +
      computer[0].points +
      ".<br><br>Player had " +
      player[0].points +
      ".<br><br>" +
      "Player would you like to hit or stand?";
    mainGameFunction = "waiting instructions";
    return myOutputValue;
  }
  if (mainGameFunction == "waiting instructions") {
    if (input == "hit") {
      player[0].hands[0].push(shuffledDeck.pop());
      checkValue(player[0]).points;
      console.log(`Playerhands: ${player[0].points}`);
      checkValue(computer[0]).points;
      console.log(`Computerhands: ${computer[0].points}`);
      myOutputValue =
        "Computer had " +
        computer[0].points +
        ".<br><br>Player had " +
        player[0].points +
        ".<br><br>" +
        "Player would you like to hit or stand?";
      mainGameFunction = "waiting instructions";
      return myOutputValue;
    } else if (input == "stand") {
      myOutputValue = `Player final hand value is ${player[0].points}!<br><br>Computer's turn to draw`;
      mainGameFunction = "computer turn";
      console.log("Computer turn!");
      console.log(`main game function ${mainGameFunction}`);
      return myOutputValue;
    } else {
      myOutputValue = "Please input either hit or stand";
      mainGameFunction = "waiting instructions";
      return myOutputValue;
    }
  }
  if (mainGameFunction == "computer turn") {
    console.log("In computer turn");
    if (computer[0].points < 17) {
      computer[0].hands[0].push(shuffledDeck.pop());
      checkValue(player[0]).points;
      console.log(`Playerhands: ${player[0].points}`);
      checkValue(computer[0]).points;
      console.log(`Computerhands: ${computer[0].points}`);
      myOutputValue =
        "Computer had " +
        computer[0].points +
        ".<br><br>Player had " +
        player[0].points +
        ".<br><br>" +
        "Computer thinking whether to draw....";
      return myOutputValue;
    }
  }
  myOutputValue =
    "Computer final value is: " +
    computer[0].points +
    ".<br><br>Player final value is: " +
    player[0].points +
    ".";
  mainGameFunction = "start";
  if (computer[0].points > player[0].points && computer[0].points <= 21) {
    finalOutput = "Computer Wins!<br><br>" + myOutputValue;
  } else if (computer[0].points < player[0].points && player[0].points <= 21) {
    finalOutput = "Player Wins!<br><br>" + myOutputValue;
  } else if (computer[0].points > 21) {
    finalOutput = "Computer Busts!<br><br>" + myOutputValue;
  } else if (player[0].points > 21) {
    finalOutput = "Player Busts!<br><br>" + myOutputValue;
  } else if (computer[0].points == player[0].points) {
    finalOutput = "ISSA DRAW!<br><br>" + myOutputValue;
  }

  // Return the fully-constructed output string
  return finalOutput;
};
