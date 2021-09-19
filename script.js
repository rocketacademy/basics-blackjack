var drawnCard = [];
var shuffledDeck = [];
var turn = "player";
var playerCards;
var computerCards;

var main = function () {
  // deck only reshuffles if game ends and return back to player
  if (turn == "player") {
    var deck = makeDeck();
    shuffledDeck = shuffleCards(deck);
    console.log("cards are shuffled");
    playerCards = drawnCards();
    turn = "computer";
    return `Player draws: ${playerCards}`;
  }

  if (turn == "computer") {
    computerCards = drawnCards();
    turn = "player";
    return `Computer draws: ${computerCards}`;
  }
};

var calSumOfCards = function () {
  // converts all picture cards to rank = 10
  var drawnCardCounter = 0;
  while (drawnCardCounter < drawnCard.length) {
    convertRank();
    drawnCardCounter += 1;
  }

  // calculate total sum of cards using value of rank
  function rank(value) {
    return value.rank;
  }
  function sum(prev, next) {
    return prev + next;
  }
  sumOfCards = drawnCard.map(rank).reduce(sum);
  console.log(sumOfCards);
  return sumOfCards;
};

// function to convert all picture cards to rank = 10
var convertRank = function () {
  if (drawnCard[0].rank == 11 || drawnCard[1].rank == 11) {
    cardRankIndex = drawnCard.findIndex((obj) => obj.rank == 11);
    drawnCard[cardRankIndex].rank = 10;
  }
  if (drawnCard[0].rank == 12 || drawnCard[1].rank == 12) {
    cardRankIndex = drawnCard.findIndex((obj) => obj.rank == 12);
    drawnCard[cardRankIndex].rank = 10;
  }
  if (drawnCard[0].rank == 13 || drawnCard[1].rank == 13) {
    cardRankIndex = drawnCard.findIndex((obj) => obj.rank == 13);
    drawnCard[cardRankIndex].rank = 10;
  }
};

var drawnCards = function () {
  drawnCard = [];

  // draw initial 2 cards
  var cardsCounter = 0;
  while (cardsCounter < 2) {
    drawnCard.push(shuffledDeck.pop());
    cardsCounter += 1;
  }

  calSumOfCards();

  if (turn == "player") {
    playerSum = sumOfCards;
    console.log(
      `player: ${drawnCard[0].name} of ${drawnCard[0].suit} and ${drawnCard[1].name} of ${drawnCard[1].suit}. `
    );
    return `${drawnCard[0].name} of ${drawnCard[0].suit} and ${drawnCard[1].name} of ${drawnCard[1].suit}. Your sum is now ${playerSum}.`;
  }
  if (turn == "computer") {
    computerSum = sumOfCards;
    console.log(
      `computer: ${drawnCard[0].name} of ${drawnCard[0].suit} and ${drawnCard[1].name} of ${drawnCard[1].suit}.Your sum is now ${computerSum}.`
    );
    return `${drawnCard[0].name} of ${
      drawnCard[0].suit
    } and 2nd card is unknown. <br><br>
    ${resultsOfGame()}`;
  }
};

// use total sum of game to calculate who is winning
var resultsOfGame = function () {
  if (playerSum > computerSum) {
    return `Player sum = ${playerSum}<br>
    Computer sum = ${computerSum}<br>
    Player wins!`;
  }

  if (playerSum < computerSum) {
    return `Player sum = ${playerSum}<br>
    Computer sum = ${computerSum}<br>
    Computer wins!`;
  }

  if ((playerSum = computerSum)) {
    return `Player sum = ${playerSum}<br>
    Computer sum = ${computerSum}<br>
    It's a tie!`;
  }
};

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
