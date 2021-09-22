var playerArray = [];
var computerArray = [];
var playerValue = 0;
var computerValue = 0;
var deck = [
  {
    name: "ace",
    suit: "hearts",
    rank: 11,
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
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};
var DEALCARDS = "dealCards";
var HITORSTAND = "hitOrStand";
var END = "end";
var RESET = "reset";
gameMode = DEALCARDS;

var main = function (input) {
  console.log(gameMode);
  var myOutputValue = "";

  if (gameMode == "dealCards") {
    // 1. Deck is shuffled.
    shuffleCards(deck);
    // 2. User clicks Submit to deal cards.
    playerArray.push(deck.pop());
    playerArray.push(deck.pop());
    computerArray.push(deck.pop());
    computerArray.push(deck.pop());

    // Cards are summed up to get playerValue and computerValue
    for (i = 0; i < playerArray.length; i++) {
      playerValue += playerArray[i].rank;
      computerValue += computerArray[i].rank;
    }

    // The cards are analysed for game winning conditions, e.g. Blackjack.
    if (playerValue == 21 && computerValue == 21) {
      myOutputValue =
        `It's a draw! ` +
        `Your hand: ${playerValue}. Computer's hand: ${computerValue}.`;
      gameMode = RESET;
    } else if (playerValue == 21) {
      myOutputValue =
        `Blackjack! You won! ` +
        `Your hand: ${playerValue}. Computer's hand: ${computerValue}.`;
      gameMode = RESET;
    } else if (computerValue == 21) {
      myOutputValue =
        `You lost! The computer got Blackjack! ` +
        `Your hand: ${playerValue}. Computer's hand: ${computerValue}.`;
      gameMode = RESET;
    } else {
      //The cards are displayed to the user.
      myOutputValue =
        `Your hand: ${playerValue}.` +
        "<br/>Do you want to hit another card or stand? <br/>Enter: Hit/Stand";
      gameMode = HITORSTAND;
    }
  } else if (gameMode == HITORSTAND) {
    //The user decides whether to hit or stand, using the submit button to submit their choice.
    if (input == "hit") {
      playerArray.push(deck.pop());
      playerValue += playerArray[playerArray.length - 1].rank;
      myOutputValue = `You drew ${
        playerArray[playerArray.length - 1].name
      } of ${playerArray[playerArray.length - 1].suit}.
      <br/>
      Your hand is now ${playerValue}.
      <br/>`;
      if (playerValue > 21) {
        myOutputValue = myOutputValue + "You lost!";
      } else {
        myOutputValue =
          myOutputValue +
          "Key in 'hit' to hit again, or key in 'stand' if you are happy with your hand.";
      }
    } else if (input == "stand") {
      console.log(playerValue);
      if (playerValue < 17) {
        myOutputValue = "Your hand is below 17. Key in 'hit' to hit again";
        gameMode = HITORSTAND;
      } else if (playerValue > 21) {
        myOutputValue = `You lost! Your hand: ${playerValue}.`;
      } else {
        myOutputValue = "Hit 'Submit' again to see the results!";
        gameMode = END;
      }
    }
  } else if (gameMode == END) {
    while (computerValue < 17) {
      computerArray.push(deck.pop());
      computerValue += computerArray[computerArray.length - 1].rank;
    }
    if (computerValue > 21) {
      myOutputValue = `You won! Your hand: ${playerValue}. Computer's hand: ${computerValue}.`;
      gameMode = RESET;
    } else {
      if (playerValue > computerValue) {
        myOutputValue = `You won! Your hand: ${playerValue}. Computer's hand: ${computerValue}.`;
        gameMode = RESET;
      } else if (playerValue < computerValue) {
        myOutputValue = `You lost! Your hand: ${playerValue}. Computer's hand: ${computerValue}.`;
        gameMode = RESET;
      } else {
        myOutputValue = `It's a draw! Your hand: ${playerValue}. Computer's hand: ${computerValue}.`;
        gameMode = RESET;
      }
    }
  } else if (gameMode == RESET) {
    myOutputValue = "Click 'Submit' to play again!";
  }
  return myOutputValue;
};
