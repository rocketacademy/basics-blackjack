//GLOBAL VAR//
//set up players - hands, cards
var playerHand = [];
var dealerHand = [];

//deals two cards each to player and dealer
//player decides if they want to hit or stand -must hit if hand below 17-
//scoring: sum of card ranks, except face cards = 10, ace = 1 || 11
//eval: winning hand is hand closest to 21. above 21 is a bust

//INIT FN//
//set up deck
deck = makeDeck();
shuffledDeck = shuffleCards(deck);

var myOutputValue = "Hit 'Submit' to start playing.";

//MAIN FN//
var main = function (input) {
  var hands = dealCards();
  playerHand = hands.playerHand;
  dealerHand = hands.dealerHand;
  console.log(playerHand);
  currPlayerScore = calcCardRank(playerHand);
  currDealerScore = calcCardRank(dealerHand);
  console.log(currPlayerScore);
  return myOutputValue;
};

//HELPER FUNCTIONS//
function calcCardRank(arr) {
  //loops through the hand
  var handScore = 0;
  for (var i = 0; i < arr.length; i++) {
    //checks if have face card and set score to 10
    if (arr[i].rank > 10) {
      handScore += 10;
    }

    //sums up the score
    handScore += arr[i].rank;
  }
  return handScore;
}

function containsAce(card) {
  if (card.rank == 1) {
    return true;
  }
  return false;
}

function isLessThan17(score) {
  if (score < 17) {
    return true;
  }
  return false;
}

function isOver21(score) {
  if (score > 21) {
    return true;
  }
  return false;
}

//this function deals two cards to each player (including dealer)
function dealCards() {
  for (var i = 0; i < 2; i++) {
    playerHand.push(shuffledDeck.pop());
    dealerHand.push(shuffledDeck.pop());
  }
  return { playerHand: playerHand, dealerHand: dealerHand };
}

//this functions creates a deck upon page load
function makeDeck() {
  var deck = [];
  var suits = ["diamonds", "clubs", "hearts", "spades"];
  //loop 1: loops through the suits
  for (let suitCounter = 0; suitCounter < suits.length; suitCounter++) {
    currentSuit = suits[suitCounter];
    //console.log(suits[suitCounter]);
    //loop 2
    let cardCounter = 1;
    for (cardCounter; cardCounter < 14; cardCounter++) {
      var currentRank = cardCounter;
      var currentSuit = suits[suitCounter];
      var name = cardCounter;
      if (currentRank == 1) {
        name = "ace";
      }
      if (currentRank == 11) {
        name = "jack";
      }
      if (currentRank == 12) {
        name = "queen";
      }
      if (currentRank == 13) {
        name = "king";
      }

      var currentCard = { rank: currentRank, suit: currentSuit, name: name };
      deck.push(currentCard);
    }
  }
  console.log(deck);
  return deck;
}

// this functions gets a random index ranging from 0 (inclusive) to max (exclusive).
function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
}

// this functions huffles the elements in the cardDeck array
function shuffleCards(cardDeck) {
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
}
