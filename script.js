// Global variables
var player = [];
var computer = [];

//make an empty deck with a current suit
var makeDeck = function () {
  var cardDeck = [];
  var suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
  //create index for suits and ranks
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var rankIndex = 1;
    while (rankIndex <= 13) {
      var cardName = rankIndex;
      if (rankIndex == 1) {
        cardName = "Ace";
      } else if (rankIndex == 11) {
        cardName = "Jack";
      } else if (rankIndex == 12) {
        cardName = "Queen";
      } else if (rankIndex == 13) {
        cardName = "King";
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

var gameMode = "deal cards";
var sumOfComputer = "";
var sumOfPlayer = "";
var playerCard1 = "";
var playerCard1 = "";

var main = function (input) {
  if (gameMode == "deal cards") {
    playerCard1 = shuffledDeck.pop();
    var computerCard1 = shuffledDeck.pop();
    playerCard2 = shuffledDeck.pop();
    var computerCard2 = shuffledDeck.pop();
    sumOfPlayer = playerCard1.value + playerCard2.value;
    console.log("player: " + playerCard1.value + playerCard2.value);
    sumOfComputer = computerCard1.value + computerCard2.value;
    console.log("computer:" + computerCard1.value + computerCard2.value);

    var myOutputValue = "";
    // make a deck and update global deck

    // deck = shuffleCards(makeDeck());
    console.log(cardDeck);

    gameMode = "hit or stand";
    return (
      "Players Cards: " +
      playerCard1.name +
      " of " +
      playerCard1.suit +
      " & " +
      playerCard2.name +
      " of " +
      playerCard2.suit +
      " <br> Player got: " +
      sumOfPlayer +
      "<br><br> Enter HIT to deal another card or STAND to keep the hand."
    );
  }
  if (gameMode == "hit or stand") {
    if (input == "HIT") {
      var playerCard3 = shuffledDeck.pop();
      sumOfPlayer = sumOfPlayer + playerCard3.value;
      return (
        "Your hand is: <br>" +
        playerCard1.name +
        " of " +
        playerCard1.suit +
        " & " +
        playerCard2.name +
        " of " +
        playerCard2.suit +
        " & " +
        playerCard3.name +
        " of " +
        playerCard3.suit
      );
    } else if (input == "STAND") {
      return (
        "Your hand is: <br>" +
        playerCard1.name +
        " of " +
        playerCard1.suit +
        " & " +
        playerCard2.name +
        " of " +
        playerCard2.suit
      );
    }
    gameMode = "win or lose";
  }

  if (gameMode == "win or lose") {
    console.log("player: " + sumOfPlayer);
    console.log("computer: " + sumOfComputer);

    if (sumOfComputer > sumOfPlayer) {
      myOutputValue = "<br> Computer Wins!";
    } else if (sumOfComputer < sumOfPlayer) {
      myOutputValue = "<br> Player Wins!";
    } else myOutputValue = "<br> It's a tie!";
  }

  return myOutputValue;
};

// Deck is shuffled.
// User clicks Submit to deal cards.
// The cards are analysed for winnings - BLACKJACK
// The cards are displayed to the user.
// The user decides whether to hit or stand, using the submit button to submit their choice.
// The user's cards are analysed for winning or losing conditions.
// The computer decides to hit or stand automatically based on game rules.
// The game either ends or continues.

// "Players Cards: " +
//   playerCard1.name +
//   " of " +
//   playerCard1.suit +
//   " & " +
//   playerCard2.name +
//   " of " +
//   playerCard2.suit +
//   " <br> Player got: " +
//   sumOfPlayer +
//   "<br> Computers Cards:" +
//   computerCard1.name +
//   " of " +
//   computerCard1.suit +
//   " & " +
//   computerCard2.name +
//   " of " +
//   computerCard2.suit +
//   " <br> Computer got: " +
//   sumOfComputer;
