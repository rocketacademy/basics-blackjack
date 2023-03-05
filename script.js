// There will be only two players. One human and one computer (for the Base solution).
// The computer will always be the dealer.
// Each player gets dealt two cards to start. (both face up, dealer has 1 card open and 1 card closed)
// The player goes first, and decides if they want to hit (draw a card) or stand (end their turn).
// The dealer has to hit if their hand is below 17.
// Each players' score is the total of their card ranks. Jacks/Queen/Kings are 10. Aces can be 1 or 11.
// The player who is closer to, but not above 21 wins the hand.

//global variables
var deck = [];
var gameMode; //states for game modes: dealCard, hit, stand, findWinner
var playerHand = []; //to reset

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

function displayUserCards(numberOfCards) {
  var output = `You drew: <br>`;
  for (i = 0; i < numberOfCards; i += 1) {
    output += `${playerHand[i].name} of ${playerHand[i].suit}<br>`;
  }
  return output;
}

function getComputerDecision() {}

function findCardTotal() {
  var cardTotal = 0;
  for (i = 0; i < playerHand.length; i += 1) {
    cardTotal += playerHand[i].rank;
  }
  return cardTotal;
}

function assignAceRank() {
  var cardTotal = findCardTotal();
  for (i = 0; i < playerHand.length; i += 1) {
    if (playerHand[i].rank === 1) {
      if (cardTotal === 11) {
        playerHand[i].rank = 11; //playerhand array updated with new rank
      }
      cardTotal = findCardTotal();
    }
  }
  return cardTotal;
}

function matchNumber(number) {
  //for initial winning condition, 2 cards only
  var cardTotal = findCardTotal();
  if (cardTotal === number) {
    var output = "Blackjack! Player wins"; //put to player then use display message function
    console.log(typeof cardTotal);
  } else {
    output = "No blackjack, game continues!"; //rephrase?
  }
  return output;
}

function findWinner(cardTotal) {}

function displayGameStatus() {}

var main = function (input) {
  makeDeck();
  shuffleDeck();
  // getStartingHand(2);
  playerHand = [{ rank: 1 }, { rank: 1 }];
  return assignAceRank();
  return `${displayUserCards(2)} ${matchNumber(21)}`;
};

//card deck
function makeDeck() {
  for (i = 0; i < 4; i += 1) {
    var allSuits = ["diamonds ♦️", "spades ♠️", "clubs ♣️", "hearts ♥️"];
    var currentSuit = allSuits[i];
    for (j = 1; j <= 13; j += 1) {
      var currentRank = j;
      var currentName = String(j);
      if (currentRank === 1) {
        currentName = "ace";
      } else if (currentRank === 11) {
        currentName = "jack";
        currentRank = 10;
      } else if (currentRank === 12) {
        currentName = "queen";
        currentRank = 10;
      } else if (currentRank === 13) {
        currentName = "king";
        currentRank = 10;
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
