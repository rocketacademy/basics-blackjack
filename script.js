//FIRST VERSION

// Global variables
var player = [];
var computer = [];

//make an empty deck with a current suit
var makeDeck = function () {
  var cardDeck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  //create index for suits and ranks
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var rankIndex = 1;
    while (rankIndex <= 13) {
      var cardName = rankIndex;
      if (rankIndex == 1) {
        cardName = "ACE";
      } else if (rankIndex == 11) {
        cardName = "JACK";
      } else if (rankIndex == 12) {
        cardName = "QUEEN";
      } else if (rankIndex == 13) {
        cardName = "KING";
      }

      //add values for cards
      var cardValue = rankIndex;
      if (cardValue == 1) {
        cardValue = 1;
      } else if (cardValue == 11 || cardValue == 12 || cardValue == 13) {
        cardValue = 10;
      }

      // create object for card
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankIndex,
        value: cardValue,
      };
      //push the card to the deck
      cardDeck.push(card);
      rankIndex += 1;
    }
    suitIndex += 1;
  }

  return cardDeck;
};

//make random index for shuffling cards (mathfloor/random)
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

//Shuffle cards function
cardDeck = makeDeck();
var shuffleCards = function (cardDeck) {
  var index = 0;
  while (index < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[index];
    cardDeck[index] = randomCard;
    cardDeck[randomIndex] = currentCard;
    index = index + 1;
  }
  return cardDeck;
};
var shuffledDeck = shuffleCards(cardDeck);
var main = function (cardDeck) {
  var myOutputValue = "";
  // make a deck and update global deck

  // deck = shuffleCards(makeDeck());
  console.log(cardDeck);
  // draw 2 cards for player & computer
  var playerCard1 = shuffledDeck.pop(cardDeck);
  var computerCard1 = shuffledDeck.pop(cardDeck);
  var playerCard2 = shuffledDeck.pop(cardDeck);
  var computerCard2 = shuffledDeck.pop(cardDeck);
  var sumOfPlayer = playerCard1.value + playerCard2.value;
  console.log(playerCard1.value + playerCard2.value);
  var sumOfComputer = computerCard1.value + computerCard2.value;
  console.log(computerCard1.value + computerCard2.value);

  // compare cards of player and computer

  // declare winner
  var myOutcome =
    "Player got: " + sumOfPlayer + "<br> Computer got: " + sumOfComputer;

  if (sumOfComputer > sumOfPlayer) {
    myOutputValue = myOutcome + "<br> Computer Wins!";
  } else if (sumOfComputer < sumOfPlayer) {
    myOutputValue = myOutcome + "<br> Player Wins!";
  } else myOutputValue = myOutcome + "<br> It's a tie!";

  return myOutputValue;
};

//under main it will show the gameModes and use the functions to return compared initial hands

// Deck is shuffled.
// User clicks Submit to deal cards.
// The cards are analysed for winnings - BLACKJACK
// The cards are displayed to the user.
// The user decides whether to hit or stand, using the submit button to submit their choice.
// The user's cards are analysed for winning or losing conditions.
// The computer decides to hit or stand automatically based on game rules.
// The game either ends or continues.
