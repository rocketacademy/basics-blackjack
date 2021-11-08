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
  return cardDeck;
};

//----------------------------------------------------------------------------------
// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

//----------------------------------------------------------------------------------
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

//----------------------------------------------------------------------------------
//Create the deck
var deck = makeDeck();
// Shuffle the deck and save it in a new variable shuffledDeck
var shuffledDeck = shuffleCards(deck);

//Find the icone for each choice
var addIcone = function (object) {
  if (object == "clubs") return `♣️`;
  if (object == "spades") return `♠️`;
  if (object == "diamonds") return `♦️`;
  if (object == "hearts") return `♥️`;
};

var resultTour = function (resultPlayer, resultDealer) {
  if (resultPlayer == 0 && resultDealer == 0) {
    resultValue = "It's a draw";
  } else if (resultPlayer > 21) {
    resultValue = "Player has lost. Please refresh to play again.";
  } else if (resultDealer > 21) {
    resultValue = "Dealer has lost. Please refresh to play again.";
  } else if (resultPlayer == 21) {
    resultValue =
      "Player has blackjack and wins. Please refresh to play again.";
  } else if (resultDealer == 21) {
    resultValue =
      "Dealer has blackjack and wins. Please refresh to play again.";
  } else {
    resultValue = `Please enter "hit" or "stand", then press Submit`;
    tour += 1;
  }
  return resultValue;
};

//----------------------------------------------------------------------------------
var players = [
  ["player1", {}, {}],
  ["Dealer", {}, {}],
];
var tour = 1;
var playerChoice = "";
var playerValue = 1;
var dealerValue = 1;

var main = function (input) {
  if (tour == 1) {
    // 2 cards for each player
    players[0][playerValue] = shuffledDeck.pop();
    playerValue += 1;
    players[0][playerValue] = shuffledDeck.pop();
    players[1][dealerValue] = shuffledDeck.pop();
    dealerValue += 1;
    players[1][dealerValue] = shuffledDeck.pop();

    totalPlayer = players[0][1].rank + players[0][2].rank;
    totalDealer = players[1][1].rank + players[1][2].rank;

    console.table(players);

    myOutputValue = resultTour(totalPlayer, totalDealer);
  } else {
    playerChoice = input.toLowerCase();
    if (playerChoice == "hit") {
      playerValue += 1;
      players[0][playerValue] = shuffledDeck.pop();
      if (
        players[0][playerValue].name == "Ace" &&
        totalPlayer + players[0][playerValue].rank > 21
      ) {
        totalPlayer = totalPlayer + players[0][playerValue].rank - 10;
      } else {
        totalPlayer = totalPlayer + players[0][playerValue].rank;
      }
      console.table(players);
      myOutputValue = resultTour(totalPlayer, totalDealer);
    } else if (playerChoice == "stand") {
      while (totalDealer < 17) {
        dealerValue += 1;
        players[1][dealerValue] = shuffledDeck.pop();
        if (
          players[1][dealerValue].name == "Ace" &&
          totalDealer + players[1][dealerValue].rank > 21
        ) {
          totalDealer = totalDealer + players[1][dealerValue].rank - 10;
        } else {
          totalDealer = totalDealer + players[1][dealerValue].rank;
        }
      }
      console.table(players);
      myOutputValue = resultTour(totalPlayer, totalDealer);
    }
  }

  return (
    "Player has : " +
    players[0][1].name +
    +addIcone(players[0][1].suit) +
    ", " +
    players[0][2].name +
    +addIcone(players[0][2].suit) +
    " with sum = " +
    totalPlayer +
    "<br>" +
    "Dealer has : " +
    players[1][1].name +
    +addIcone(players[1][1].suit) +
    ", " +
    players[1][2].name +
    +addIcone(players[1][2].suit) +
    " with sum = " +
    totalDealer +
    "<br>" +
    myOutputValue
  );
};
