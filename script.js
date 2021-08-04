// blackjack - base first version
// 2 players: user and computer/dealer

// first version: Compare Initial Hands to Determine Winner

var shuffledDeck;
var playerTotalHand = 0;
var computerTotalHand = 0;

// array to track player's and computer's hand
var playerHand = [];
var computerHand = [];
var playerHandValue = [];
var computerHandValue = [];

// making a deck of cards: 52 cards with 4 suits (13 cards each suit)
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["Hearts", "Diamonds", "Clubs", "Spades"];

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
        cardName = "Ace";
      } else if (cardName == 11) {
        cardName = "Jack";
      } else if (cardName == 12) {
        cardName = "Queen";
      } else if (cardName == 13) {
        cardName = "King";
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
  //console.log(cardDeck);
  return cardDeck;
};

// to get the total hand, and compare to get the winner
var currentWinner = function () {
  playerTotalHand = 0;
  var counter = 0;
  while (counter < playerHandValue.length) {
    playerTotalHand = playerTotalHand + playerHandValue[counter];
    counter += 1;
  }
  console.log("player total hand: " + playerTotalHand);

  computerTotalHand = 0;
  var counter = 0;
  while (counter < computerHandValue.length) {
    computerTotalHand = computerTotalHand + computerHandValue[counter];
    counter += 1;
  }
  console.log("computer total hand: " + computerTotalHand);

  var myOutputValue = `Player has a total of ${playerTotalHand}. <br> Computer has a total of ${computerTotalHand}. <br> <br>`;

  // Compare computer and player cards
  // If computer card rank is greater than player card rank, computer wins
  if (computerTotalHand < playerTotalHand) {
    myOutputValue += "Player wins!";
    // Else if computer card rank is less than player card rank, player wins
  } else if (computerTotalHand > playerTotalHand) {
    myOutputValue += "Computer wins!";
    // Otherwise (i.e. ranks are equal), it's a tie
  } else {
    myOutputValue += "It's a tie.";
  }
  return myOutputValue;
};

// reseting the game
var restartGame = function () {
  playerTotalHand = 0;
  computerTotalHand = 0;
  playerHand = [];
  computerHand = [];
  playerHandValue = [];
  computerHandValue = [];
};

var main = function (input) {
  var shuffledDeck = shuffleCards(makeDeck());

  // Draw 4 cards from the top of the deck
  var playerCard1 = shuffledDeck.pop();
  var computerCard1 = shuffledDeck.pop();
  var playerCard2 = shuffledDeck.pop();
  var computerCard2 = shuffledDeck.pop();

  //push drawn cards info to array
  playerHand.push(playerCard1);
  playerHand.push(playerCard2);
  computerHand.push(computerCard1);
  computerHand.push(computerCard2);

  // push drawn cards value/rank to array
  playerHandValue.push(playerCard1.rank);
  playerHandValue.push(playerCard2.rank);
  computerHandValue.push(computerCard1.rank);
  computerHandValue.push(computerCard2.rank);

  console.log("player's hand value: " + playerHandValue);
  console.log("computer's hand value: " + computerHandValue);

  var currentWinnerMessage = currentWinner();

  var myOutputValue = `Player drawn ${playerCard1.name} of ${playerCard1.suit} and ${playerCard2.name} of ${playerCard2.suit}.<br> Computer drawn ${computerCard1.name} of ${computerCard1.suit} and ${computerCard2.name} of ${computerCard2.suit}. <br> <br> ${currentWinnerMessage} <br><br> Click 'Submit' to play another round.`;

  // restarting the game
  restartGame();

  return myOutputValue;
};
