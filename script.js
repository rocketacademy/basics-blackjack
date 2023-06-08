// var hardCodedDeck = [
//   {
//     name: "Ace",
//     suits: "hearts",
//     score: 1,
//   },
//   {
//     name: "10",
//     suits: "Hearts",
//     score: 10,
//   },
//   {
//     name: "Jack",
//     suits: "Hearts",
//     score: 10,
//   },
//   {
//     name: "Queen",
//     suits: "Hearts",
//     score: 10,
//   },
//   {
//     name: "King",
//     suits: "Hearts",
//     score: 10,
//   },
// ];

var deck = [];
var shuffledDeck;
var gameBustScore = 21;
var gameMode = "shuffled cards";
var numberOfCardsToDraw;
var computerCardDeck = [];
var doesComputerCardDeckHaveAce = false;
var computerCurrentCardScore = 0;
var playerCardDeck = [];
var doesPlayerCardDeckHaveAce = false;
var playerCurrentCardScore = 0;

// cards 2 through 10 are scored using their face value
// jack, queen and king are scored 10
// ace can be scored 1 or 11

var main = function (input) {
  var myOutputValue = 1;
  // console.log(hardCodedDeck);
  makeDeck(); // this works

  if (gameMode == "shuffled cards") {
    // shuffledDeck = shuffleCards(hardCodedDeck);
    shuffledDeck = shuffleCards(deck);
    gameMode = "compare card score";
    // console.log(shuffledDeck);
  }

  if (gameMode == "compare card score") {
    // assign 2 cards to computer
    numberOfCardsToDraw = 2;
    for (let i = 0; i < numberOfCardsToDraw; i++) {
      var currentCard = shuffledDeck.pop();
      computerCardDeck.push(currentCard);
      doesComputerCardDeckHaveAce = checkForAce(currentCard);
    }

    // assign 2 cards to player
    for (let i = 0; i < numberOfCardsToDraw; i++) {
      var currentCard = shuffledDeck.pop();
      playerCardDeck.push(currentCard);
      doesPlayerCardDeckHaveAce = checkForAce(currentCard);
    }

    calculateScore(numberOfCardsToDraw);
    myOutputValue = checkWhoWon();

    // console.log("computerCardDeck: ");
    // console.log(computerCardDeck);
    // console.log(doesComputerCardDeckHaveAce);
    // console.log(computerCurrentCardScore);

    // console.log("playerCardDeck: ");
    // console.log(playerCardDeck);
    // console.log(doesPlayerCardDeckHaveAce);
    // console.log(playerCurrentCardScore);
  }

  return myOutputValue;
};

var checkWhoWon = function () {
  if (computerCurrentCardScore < playerCurrentCardScore) {
    return (
      playerCardMessage() +
      "<br><br>" +
      playerScoreMessage() +
      "<br><br>" +
      computerCardMessage() +
      "<br><br>" +
      computerScoreMessage() +
      "<br><br>Player won!"
    );
  }

  if (computerCurrentCardScore > playerCurrentCardScore) {
    return (
      playerCardMessage() +
      "<br><br>" +
      playerScoreMessage() +
      "<br><br>" +
      computerCardMessage() +
      "<br><br>" +
      computerScoreMessage() +
      "<br><br>Dealer won!"
    );
  }

  if (computerCurrentCardScore == playerCurrentCardScore) {
    return (
      playerCardMessage() +
      "<br><br>" +
      playerScoreMessage() +
      "<br><br>" +
      computerCardMessage() +
      "<br><br>" +
      computerScoreMessage() +
      "<br><br>It's a tie!"
    );
  }
};

var computerScoreMessage = function () {
  if (doesComputerCardDeckHaveAce && computerCurrentCardScore == 21) {
    return "Dealer's score: Won by Black Jack";
  } else return "Dealer's score: " + computerCurrentCardScore;
};

var computerCardMessage = function () {
  let message = "Dealer hand: ";
  for (let i = 0; i < computerCardDeck.length; i++) {
    message =
      message +
      computerCardDeck[i].name +
      " of " +
      computerCardDeck[i].suits +
      ", ";
  }
  return message;
};

var playerScoreMessage = function () {
  if (doesPlayerCardDeckHaveAce && playerCurrentCardScore == 21) {
    return "Player's score: Won by Black Jack";
  } else return "Player's score: " + playerCurrentCardScore;
};

var playerCardMessage = function () {
  let message = "Player hand: ";
  for (let i = 0; i < playerCardDeck.length; i++) {
    message =
      message +
      playerCardDeck[i].name +
      " of " +
      playerCardDeck[i].suits +
      ", ";
  }
  return message;
};

var calculateScore = function (numberOfCardsToDraw) {
  // calculate computer card score

  for (let i = 0; i < numberOfCardsToDraw; i++) {
    // if computer has ACE in 2 cards, score of ACE increase to 11
    if (computerCardDeck[i].name == "Ace") {
      computerCardDeck[i].score = 11;
    }
    computerCurrentCardScore =
      computerCurrentCardScore + computerCardDeck[i].score;
  }

  // calculate player card score

  for (let i = 0; i < numberOfCardsToDraw; i++) {
    // if player has ACE in 2 cards, score of ACE increase to 11
    if (playerCardDeck[i].name == "Ace") {
      playerCardDeck[i].score = 11;
    }
    playerCurrentCardScore = playerCurrentCardScore + playerCardDeck[i].score;
  }
};

var checkForAce = function (currentCard) {
  if (currentCard.name == "ace") {
    return true;
  }

  if (currentCard.name != "ace") {
    return false;
  }
};

// Shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  // console.log("I'm inside shuffleCards");
  // console.log(cardDeck);
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

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

var makeDeck = function () {
  // suits
  var suits = ["Diamonds", "Hearts", "Clubs", "Spades"];
  var suitsIndex = 0;
  while (suitsIndex < suits.length) {
    var currentSuit = suits[suitsIndex];
    var currentName = "";
    var currentScore = "";
    // name ace,2,3,4,5,6,7,8,9,10,jack,queen,king
    // score

    var nameIndex = 1;
    while (nameIndex < 14) {
      currentName = nameIndex;
      currentScore = nameIndex;

      if (nameIndex == 1) {
        currentName = "Ace";
      } else if (nameIndex == 11) {
        currentName = "Jack";
        currentScore = 10;
      } else if (nameIndex == 12) {
        currentName = "Queen";
        currentScore = 10;
      } else if (nameIndex == 13) {
        currentName = "King";
        currentScore = 10;
      }

      var currentCard = {
        suits: suits[suitsIndex],
        name: currentName,
        score: currentScore,
      };

      deck.push(currentCard);

      nameIndex = nameIndex + 1;
    }

    suitsIndex = suitsIndex + 1;
  }
};

// 20230607 decided not to use this function
// var assignTwoCards = function () {
//   numberOfCardsToDraw = 2;
//   for (let i = 0; i < numberOfCardsToDraw; i++) {
//     var currentCard = shuffledDeck.pop();
//     // computerCardDeck.push(currentCard);
//     return currentCard;
//   }
// };
