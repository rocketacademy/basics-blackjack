// There will be only two players. One human and one computer (for the Base solution).
// The computer will always be the dealer.
// Each player gets dealt two cards to start. (both face up, dealer has 1 card open and 1 card closed)
// The player goes first, and decides if they want to hit (draw a card) or stand (end their turn).
// The dealer has to hit if their hand is below 17.
// Each players' score is the total of their card ranks. Jacks/Queen/Kings are 10. Aces can be 1 or 11.
// The player who is closer to, but not above 21 wins the hand.

//global variables
var deck = [];
var gameMode;
var playerHand = [];
//states for game modes: dealCard, hit, stand, findWinner

function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}
function shuffleDeck() {
  for (i = 0; i < deck.length; i += 1) {
    var randomIndex = getRandomNumber(deck.length);
    var currentIndex = i;
    var currentCard = deck[currentIndex];
    var randomCard = deck[randomIndex];
    deck[currentIndex] = randomCard;
    deck[randomIndex] = currentCard;
  }
  return deck;
}

function getStartingHand(numberOfCards) {
  for (i = 0; i < numberOfCards; i += 1) {
    var card = dealCard();
    playerHand.push(card);
  }
}

function dealCard() {
  var drawnCard = deck.pop();
  return drawnCard;
}

function displayUserCards() {}

function getComputerDecision() {}

function matchNumber(cardTotal) {}

function findWinner(cardTotal) {}

function displayGameStatus() {}

var main = function (input) {
  makeDeck();
  shuffleDeck();
  getStartingHand(2);
  console.log(playerHand);
  return playerHand;
};

//card deck
function makeDeck() {
  for (i = 0; i < 4; i += 1) {
    var suits = ["diamonds", "spades", "clubs", "hearts"];
    var currentSuit = suits[i];
    for (j = 1; j <= 13; j += 1) {
      var currentRank = j;
      var currentName = String(j);
      console.log(typeof currentRank);
      if (currentRank === 1) {
        currentName = "ace";
      } else if (currentRank === 11) {
        currentName = "jack";
      } else if (currentRank === 12) {
        currentName = "queen";
      } else if (currentRank === 13) {
        currentName = "king";
      }
      var currentCard = {
        name: currentName,
        suit: currentSuit,
        rank: currentRank,
      };
      deck.push(currentCard);
    }
  }
  return deck;
}
