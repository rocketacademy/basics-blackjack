// There will be only two players. One human and one computer (for the Base solution).
// The computer will always be the dealer.
// Each player gets dealt two cards to start.
// The player goes first, and decides if they want to hit (draw a card) or stand (end their turn).
// The dealer has to hit if their hand is below 17.
// Each players' score is the total of their card ranks. Jacks/Queen/Kings are 10. Aces can be 1 or 11.
// The player who is closer to, but not above 21 wins the hand.

//global variables
var deck = [];

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

function shuffleDeck() {}

function displayUserCards() {}

function findWinner() {}

var main = function (input) {
  console.log(makeDeck());
  return deck;
};
