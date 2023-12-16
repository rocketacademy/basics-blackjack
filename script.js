// create a deck
var deck = function () {
  var cardDeck = [];
  var suits = ["Hearts", "Diamonds", "Spade", "Clubs"];
  var emojis = ["❤", "♦", "🏓", "🏒"];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var currentEmoji = emojis[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      if (cardName == 1) {
        cardName = "Ace";
      } else if (cardName == 11) {
        cardName = "Jack";
      } else if (cardName == 12) {
        cardName = "Queen";
      } else if (cardName == 13) {
        cardName = "King";
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        emoji: currentEmoji,
      };
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};
// function to shuffle deck
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
// There will be only two players. One human and one computer (for the Base solution).
// Global Variables
var computerHand = [];
var playerHand = [];
var myOutputValue = "";
var message = "";
var playerCounter = 0;
var mode = "game start";
var playerCard;

//function to display computer hands
var displayComputerHands = function (computerarray) {
  var message = "Player Hand: <br>"; // isolated from the loop for this to be constant
  var index = 0;
  while (index < computerarray.length) {
    message =
      message + computerarray[index].name + " of " + computerarray[index].suit;
    index = index + 1;
  }
};

var displayPlayerHands = function (playerarray) {
  var message = "Player Hand: <br>"; // isolated from the loop for this to be constant
  var index = 0;
  while (index < playerarray.length) {
    message =
      message + playerarray[index].name + " of " + playerarray[index].suit;
    index = index + 1;
  }
};

// function to calculate total hand value
var totalHandValue = function (handarray) {
  var index = 0;
  var totalValue = 0;
  while (index < handarray.length) {
    var currentValue = handarray[index];
    if (
      currentValue.name == "Jack" ||
      currentValue.name == "Queen" ||
      currentValue.name == "King"
    ) {
      totalValue = totalValue + 10;
    } else {
      totalValue = totalValue + currentValue.rank;
    }
    index = index + 1;
  }
  return totalValue;
};

// function to check for blackjack
var checkForBlackjack = function (handarray) {
  var cardOne = handarray[0];
  var cardTwo = handarray[1];
  var isBlackjack = false;
  if (
    (cardOne.rank >= 10 && cardTwo.suit == "Ace") ||
    (cardOne.suit == "Ace" && cardTwo.rank >= 10)
  ) {
    isBlackjack = true;
  }
  return isBlackjack;
};

var main = function (input) {
  if (mode == "game start") {
    var shuffleDeck = shuffleCards(deck());
    playerHand.push(shuffleDeck.pop());
    playerHand.push(shuffleDeck.pop());
    computerHand.push(shuffleDeck.pop());
    computerHand.push(shuffleDeck.pop());
    mode = "cards are dealt";
    myOutputValue = "The cards have been dealt";
    return myOutputValue;
  }
  if (mode == "cards are dealt") {
    var playerHasBlackjack = checkForBlackjack(playerHand);
    var computerHasBlackjack = checkForBlackjack(computerHand);
    if (playerHasBlackjack == true || computerHasBlackjack == true) {
      if (playerHasBlackjack == true && computerHasBlackjack == true) {
        myOutputValue = "it is a tie!";
      } else if (playerHasBlackjack == true && computerHasBlackjack == false) {
        myOutputValue = "Player Wins!";
      } else if (playerHasBlackjack == false && computerHasBlackjack == true) {
        myOutputValue = "Computer Wins";
      } else {
        var totalPlayerValue = totalHandValue(playerHand);
        var totalComputerValue = totalHandValue(computerHand);
        if (totalPlayerValue == totalComputerValue) {
          myOutputValue = "It is a tie!";
        } else if (totalPlayerValue > totalComputerValue) {
          myOutputValue = "Player Wins!";
        } else if (totalComputerValue > totalPlayerValue) {
          myOutputValue = "Computer wins!";
          console.log(myOutputValue);
        }
        console.log(totalPlayerValue, totalComputerValue);
        var displayresults = displayComputerHands(computerHand);
        console.log(displayresults);
        return (
          displayComputerHands(computerHand) +
          displayPlayerHands(playerHand) +
          message
        );
      }
    }
  }
};
