// Global variables
var mode = "start";

// a function that gets a random index ranging from 0 (inclusive) to max (exclusive) -- used in shuffleCards function.
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// a function that shuffles deck
var shuffleCards = function (cardDeck) {
  // loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // select the card that corresponds to the random index
    var randomCard = cardDeck[randomIndex];
    // select the card that corresponds to the current index
    var currentCard = cardDeck[currentIndex];
    // swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // return the shuffled deck
  return cardDeck;
};

// a function that makes a card deck
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
      // new variable 'blackJackScore' is created to change the rank of jacks, queens, and kings to 10 WITHOUT messing up the other cards in the deck
      var blackJackScore = rankCounter;
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
        blackJackScore = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        blackJackScore = 10;
      } else if (cardName == 13) {
        cardName = "king";
        blackJackScore = 10;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: blackJackScore,
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

// // a function that takes a normal card deck and assigns the rank of 10 to all Jacks, Queens, and Kings
// var blackJackDeck = function (cardDeck) {
//   if
//   return cardDeck;
// };

var main = function (input) {
  var cardDeck = makeDeck();
  var shuffledDeck = shuffleCards(cardDeck);
  var outcomeMessage = "";

  // 1st round: program deals computer's card and player's card
  var computerCard1 = shuffledDeck.pop();
  var playerCard1 = shuffledDeck.pop();

  // 2nd round: program deals computer's card and player's card again
  var computerCard2 = shuffledDeck.pop();
  var playerCard2 = shuffledDeck.pop();

  // new variables to make naming and console logging easier
  var computerInitialScore = computerCard1.rank + computerCard2.rank;
  var playerInitialScore = playerCard1.rank + playerCard2.rank;
  console.log(`Computer's score: ${computerInitialScore}`);
  console.log(`Player's score: ${playerInitialScore}`);

  message = `Computer's hand: <br>${computerCard1.name} of ${computerCard1.suit} <br>${computerCard2.name} of ${computerCard2.suit} <br><br> Player's hand: <br>${playerCard1.name} of ${playerCard1.suit} <br>${playerCard2.name} of ${playerCard2.suit}`;

  // determine who is initial winner

  // first, have to set the ranks of Jack, Queen, and King as 10

  // it's a tie: player and computer has same score
  if (playerInitialScore == computerInitialScore) {
    outcomeMessage = "It's a tie. <br><br>";
  }
  // player wins if player's score > computer's score
  else if (playerInitialScore > computerInitialScore) {
    outcomeMessage = "Player wins. <br><br>";
  }
  // computer wins if player's score < computer's score
  else {
    outcomeMessage = "Computer wins. <br><br>";
  }

  var myOutputValue = outcomeMessage + message;

  return myOutputValue;
};
