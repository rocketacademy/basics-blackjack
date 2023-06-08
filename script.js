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

  makeDeck(); // this works

  if (gameMode == "shuffled cards") {
    shuffledDeck = shuffleCards(deck);
    gameMode = "compare card score";
    console.log(shuffledDeck);
  }

  if (gameMode == "compare card score") {
    // assign 2 cards to computer
    numberOfCardsToDraw = 2;
    for (let i = 0; i < numberOfCardsToDraw; i++) {
      var currentCard = shuffledDeck.pop();
      computerCardDeck.push(currentCard);
      doesComputerCardDeckHaveAce = checkForAce(currentCard);
    }
    console.log("computerCardDeck: ");
    console.log(computerCardDeck);
    console.log(doesComputerCardDeckHaveAce);

    // assign 2 cards to player
    for (let i = 0; i < numberOfCardsToDraw; i++) {
      var currentCard = shuffledDeck.pop();
      playerCardDeck.push(currentCard);
      doesPlayerCardDeckHaveAce = checkForAce(currentCard);
    }
    console.log("playerCardDeck: ");
    console.log(playerCardDeck);
    console.log(doesPlayerCardDeckHaveAce);

    // calculate computer card score
    for (let i = 0; i < numberOfCardsToDraw; i++) {
      computerCurrentCardScore =
        computerCurrentCardScore + computerCardDeck[i].score;
      console.log(computerCurrentCardScore);
    }

    // calculate player card score
    for (let i = 0; i < numberOfCardsToDraw; i++) {
      playerCurrentCardScore = playerCurrentCardScore + playerCardDeck[i].score;
      console.log(playerCurrentCardScore);
    }

    if (computerCurrentCardScore < playerCurrentCardScore) {
      myOutputValue = "Player won!";
    }

    if (computerCurrentCardScore > playerCurrentCardScore) {
      myOutputValue = "Computer won!";
    }

    if (computerCurrentCardScore == playerCurrentCardScore) {
      myOutputValue = "It's a tie!";
    }
  }

  return myOutputValue;
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
  var suits = ["diamonds", "hearts", "clubs", "spades"];
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
        currentName = "ace";
      } else if (nameIndex == 11) {
        currentName = "jack";
        currentScore = 10;
      } else if (nameIndex == 12) {
        currentName = "queen";
        currentScore = 10;
      } else if (nameIndex == 13) {
        currentName = "king";
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
