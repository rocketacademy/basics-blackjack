// Array of user's cards
var userCardsArray = [];
// Array of computer's cards
var computerCardsArray = [];
var userResult = "";
var computerResult = "";
var finalResult = "";
var gameStatus = "playing";
var userDecision = "";
var firstRound = 1;
var computerDecisionOutput = "";
// Hard coded deck of cards
var deck = [
  {
    name: "ace",
    suit: "hearts",
    rank: 1,
    emoji: "🂱",
  },
  {
    name: "2",
    suit: "hearts",
    rank: 2,
    emoji: "🂲",
  },
  {
    name: "3",
    suit: "hearts",
    rank: 3,
    emoji: "🂳",
  },
  {
    name: "4",
    suit: "hearts",
    rank: 4,
    emoji: "🂴",
  },
  {
    name: "5",
    suit: "hearts",
    rank: 5,
    emoji: "🂵",
  },
  {
    name: "6",
    suit: "hearts",
    rank: 6,
    emoji: "🂶",
  },
  {
    name: "7",
    suit: "hearts",
    rank: 7,
    emoji: "🂷",
  },
  {
    name: "8",
    suit: "hearts",
    rank: 8,
    emoji: "🂸",
  },
  {
    name: "9",
    suit: "hearts",
    rank: 9,
    emoji: "🂹 ",
  },
  {
    name: "10",
    suit: "hearts",
    rank: 10,
    emoji: "🂺",
  },
  {
    name: "jack",
    suit: "hearts",
    rank: 11,
    emoji: "🂻",
  },
  {
    name: "queen",
    suit: "hearts",
    rank: 12,
    emoji: "🂽",
  },
  {
    name: "king",
    suit: "hearts",
    rank: 13,
    emoji: "🂾",
  },
  {
    name: "ace",
    suit: "diamonds",
    rank: 1,
    emoji: "🃁",
  },
  {
    name: "2",
    suit: "diamonds",
    rank: 2,
    emoji: "🃂",
  },
  {
    name: "3",
    suit: "diamonds",
    rank: 3,
    emoji: "🃃",
  },
  {
    name: "4",
    suit: "diamonds",
    rank: 4,
    emoji: "🃄",
  },
  {
    name: "5",
    suit: "diamonds",
    rank: 5,
    emoji: "🃅",
  },
  {
    name: "6",
    suit: "diamonds",
    rank: 6,
    emoji: "🃆",
  },
  {
    name: "7",
    suit: "diamonds",
    rank: 7,
    emoji: "🃇",
  },
  {
    name: "8",
    suit: "diamonds",
    rank: 8,
    emoji: "🃈",
  },
  {
    name: "9",
    suit: "diamonds",
    rank: 9,
    emoji: "🃉",
  },
  {
    name: "10",
    suit: "diamonds",
    rank: 10,
    emoji: "🃊",
  },
  {
    name: "jack",
    suit: "diamonds",
    rank: 11,
    emoji: "🃋",
  },
  {
    name: "queen",
    suit: "diamonds",
    rank: 12,
    emoji: "🃍",
  },
  {
    name: "king",
    suit: "diamonds",
    rank: 13,
    emoji: "🃎",
  },
  {
    name: "ace",
    suit: "clubs",
    rank: 1,
    emoji: "🃑",
  },
  {
    name: "2",
    suit: "clubs",
    rank: 2,
    emoji: "🃒",
  },
  {
    name: "3",
    suit: "clubs",
    rank: 3,
    emoji: "🃓",
  },
  {
    name: "4",
    suit: "clubs",
    rank: 4,
    emoji: "🃔",
  },
  {
    name: "5",
    suit: "clubs",
    rank: 5,
    emoji: "🃕",
  },
  {
    name: "6",
    suit: "clubs",
    rank: 6,
    emoji: "🃖",
  },
  {
    name: "7",
    suit: "clubs",
    rank: 7,
    emoji: "🃗",
  },
  {
    name: "8",
    suit: "clubs",
    rank: 8,
    emoji: "🃘",
  },
  {
    name: "9",
    suit: "clubs",
    rank: 9,
    emoji: "🃙",
  },
  {
    name: "10",
    suit: "clubs",
    rank: 10,
    emoji: "🃚",
  },
  {
    name: "jack",
    suit: "clubs",
    rank: 11,
    emoji: "🃛",
  },
  {
    name: "queen",
    suit: "clubs",
    rank: 12,
    emoji: "🃝",
  },
  {
    name: "king",
    suit: "clubs",
    rank: 13,
    emoji: "🃞",
  },
  {
    name: "ace",
    suit: "spades",
    rank: 1,
    emoji: "🂡",
  },
  {
    name: "2",
    suit: "spades",
    rank: 2,
    emoji: "🂢",
  },
  {
    name: "3",
    suit: "spades",
    rank: 3,
    emoji: "🂣",
  },
  {
    name: "4",
    suit: "spades",
    rank: 4,
    emoji: "🂤",
  },
  {
    name: "5",
    suit: "spades",
    rank: 5,
    emoji: "🂥",
  },
  {
    name: "6",
    suit: "spades",
    rank: 6,
    emoji: "🂦",
  },
  {
    name: "7",
    suit: "spades",
    rank: 7,
    emoji: "🂧",
  },
  {
    name: "8",
    suit: "spades",
    rank: 8,
    emoji: "🂨",
  },
  {
    name: "9",
    suit: "spades",
    rank: 9,
    emoji: "🂩",
  },
  {
    name: "10",
    suit: "spades",
    rank: 10,
    emoji: "🂪",
  },
  {
    name: "jack",
    suit: "spades",
    rank: 11,
    emoji: "🂫",
  },
  {
    name: "queen",
    suit: "spades",
    rank: 12,
    emoji: "🂭",
  },
  {
    name: "king",
    suit: "spades",
    rank: 13,
    emoji: "🂮",
  },
];

// Function to generate a deck of cards
// Add a value property to each card
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["♥", "♦", "♣", "♠"];

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
      var cardValue = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
        cardValue = 11;
      } else if (cardName == 11) {
        cardName = "jack";
        cardValue = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        cardValue = 10;
      } else if (cardName == 13) {
        cardName = "king";
        cardValue = 10;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: cardValue,
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
  return cardDeck;
};

// Create a deck of cards variable using the makeDeck function
var deckOfCards = makeDeck();

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

// Array of deck of shuffled cards
var shuffledDeck = shuffleCards(deckOfCards);

var main = function (input) {
  if (firstRound) {
    // Press submit to deal the first two cards each to user and computer
    for (i = 0; i < 2; i += 1) {
      var randomCard = shuffledDeck.pop();
      userCardsArray.push(randomCard);
      var randomCard = shuffledDeck.pop();
      computerCardsArray.push(randomCard);
    }

    // After first two cards are drawn cards are analysed to see if either user or computer hits 21
    // For two cards, the only possibility of a win is if one card is an ace and they other card has a value of 10
    for (i = 0; i < 2; i += 1) {
      if (userCardsArray[i].name == "ace") {
        if (userCardsArray[0].value + userCardsArray[1].value == 21) {
          // User wins blackjack
          userResult = "You win blackjack!";
          gameStatus = "over";
        }
      }
    }

    for (i = 0; i < 2; i += 1) {
      if (computerCardsArray[i].name == "ace") {
        if (computerCardsArray[0].value + computerCardsArray[1].value == 21) {
          // User wins blackjack
          computerResult = "The computer wins blackjack!";
          gameStatus = "over";
        }
      }
    }
  }

  if (!firstRound) {
    // User decides whether to "hit" or "stand", using the text input and submit button
    userDecision = input;
    if (userDecision == "hit") {
      var randomCard = shuffledDeck.pop();
      userCardsArray.push(randomCard);
    }

    // Computer hits or stands automatically based on game rules (if computer's hands is below 17, the computer hits)
    computerScore = 0;
    computerNumberOfAces = 0;
    for (i = 0; i < computerCardsArray.length; i += 1) {
      var computerScore = computerScore + computerCardsArray[i].value;
      if (computerCardsArray[i].name == "ace") {
        computerNumberOfAces = computerNumberOfAces + 1;
      }
    }
    if (computerScore > 21) {
      for (i = 0; i < computerNumberOfAces; i += 1) {
        if (computerScore <= 21) {
          break;
        }
        computerScore = computerScore - 10;
      }
    }
    if (computerScore < 17) {
      var computerDecision = "hit";
      computerDecisionOutput = "The computer has decided to hit";
    } else {
      computerDecision = "stand";
      computerDecisionOutput = "The computer has decided to stand";
    }

    if (computerDecision == "hit") {
      var randomCard = shuffledDeck.pop();
      computerCardsArray.push(randomCard);
    }
    if (userDecision == "stand" && computerDecision == "stand") {
      gameStatus = "over";
    }
  }
  console.log(computerCardsArray);
  // User's cards are converted to an output
  var userCards = "";
  for (i = 0; i < userCardsArray.length; i += 1) {
    userCards = userCards + userCardsArray[i].name + ", ";
  }
  userCards = userCards.slice(0, -2);

  // computer's cards are converted to an output
  var computerCards = "";
  for (i = 0; i < computerCardsArray.length; i += 1) {
    computerCards = computerCards + computerCardsArray[i].name + ", ";
  }
  computerCards = computerCards.slice(0, -2);

  // User's and computer's cards are compared to determine win/lose/draw result
  // Once game is over, display the user's and computer's cards, their scores, and who won
  // Ace is counted as 11 first. If it causes a bust, minus total score by 10
  if (gameStatus == "over") {
    var userScore = 0;
    var userNumberOfAces = 0;
    for (i = 0; i < userCardsArray.length; i += 1) {
      userScore = userScore + userCardsArray[i].value;
      if (userCardsArray[i].name == "ace") {
        userNumberOfAces = userNumberOfAces + 1;
      }
    }

    if (userScore > 21) {
      for (i = 0; i < userNumberOfAces; i += 1) {
        if (userScore <= 21) {
          break;
        }
        userScore = userScore - 10;
      }
    }

    var computerScore = 0;
    var computerNumberOfAces = 0;
    for (i = 0; i < computerCardsArray.length; i += 1) {
      computerScore = computerScore + computerCardsArray[i].value;
      if (computerCardsArray[i].name == "ace") {
        computerNumberOfAces = computerNumberOfAces + 1;
      }
    }
    if (computerScore > 21) {
      for (i = 0; i < computerNumberOfAces; i += 1) {
        if (computerScore <= 21) {
          break;
        }
        computerScore = computerScore - 10;
      }
    }

    // Scanarios
    // Computer and user goes below 21
    if (userScore < 21 && computerScore < 21) {
      if (userScore > computerScore) {
        finalResult = "You win";
      }
      if (computerScore > userScore) {
        finalResult = "Computer wins";
      }
      if (computerScore == userScore) {
        finalResult = "It is a draw";
      }
    }
    // User gets blackjack and computer does not
    if (userScore == 21 && computerScore != 21) {
      userResult = "You win blackjack";
      finalResult = "You win";
    }
    // Computer gets blackjack and user does not
    if (computerScore == 21 && userScore != 21) {
      computerResult = "Computer wins blackjack";
      finalResult = "Computer wins";
    }
    // Both user and computer gets blackjack
    if (computerScore == 21 && userScore == 21) {
      userResult = "You win blackjack";
      computerResult = "Computer wins blackjack";
      finalResult = "It is a draw";
    }
    // User goes over and computer does not
    if (userScore > 21 && computerScore <= 21) {
      userResult = "You have gone over";
      finalResult = "Computer wins";
    }
    // Computer goes over and user does not
    if (computerScore > 21 && userScore <= 21) {
      computerResult = "Computer has gone over";
      finalResult = "You win";
    }
    // Both user and computer goes over
    if (userScore > 21 && computerScore > 21) {
      userResult = "You have gone over";
      computerResult = "Computer has gone over";
      finalResult = "It is a draw";
    }
    var finalOutput =
      userResult +
      "<br><br>" +
      computerResult +
      "<br><br>" +
      "Your cards are " +
      userCards +
      "<br>" +
      "Your score is " +
      userScore +
      "<br><br>" +
      "The computer's cards are " +
      computerCards +
      "<br>" +
      "The computer's score is " +
      computerScore +
      "<br><br>" +
      finalResult;

    //Restart game variables
    // Array of user's cards
    userCardsArray = [];
    // Array of computer's cards
    computerCardsArray = [];
    userResult = "";
    computerResult = "";
    finalResult = "";
    gameStatus = "playing";
    userDecision = "";
    firstRound = 1;
    computerDecisionOutput = "";
    return finalOutput;
  }
  firstRound = 0;
  // If game is still going on, return output of the user's cards
  return (
    "Your cards are " +
    userCards +
    "<br><br>Please choose whether to hit or stand<br><br>" +
    computerDecisionOutput
  );
};
