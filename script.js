// There will be only two players. One human and one computer (for the Base solution).
// The computer will always be the dealer.
// Each player gets dealt two cards to start. (both face up, dealer has 1 card open and 1 card closed)
// The player goes first, and decides if they want to hit (draw a card) or stand (end their turn).
// The dealer has to hit if their hand is below 17.
// Each players' score is the total of their card ranks. Jacks/Queen/Kings are 10. Aces can be 1 or 11.
// The player who is closer to, but not above 21 wins the hand.

//global variables
var deck = [];
var gameMode = "deal cards"; //states for game modes: dealCard, hit, stand, findWinner
var playerHand = []; //to reset
var computerHand = [];

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

function getStartingHand(numberOfCards, array) {
  for (i = 0; i < numberOfCards; i += 1) {
    var card = dealCard();
    array.push(card);
  }
  return array;
}

function dealCard() {
  var drawnCard = deck.pop();
  return drawnCard;
}

function displayUserCards(array) {
  var output = `drew: <br>`;
  for (i = 0; i < array.length; i += 1) {
    output = output + `${array[i].name} of ${array[i].suit}<br>`;
  }
  return output;
}

// find total to determine ace rank and to determine whether dealer draws a card
function findCardTotal(array) {
  var cardTotal = 0;
  for (i = 0; i < array.length; i += 1) {
    cardTotal += array[i].rank;
  }
  return cardTotal;
}

function getComputerDecision() {} //is this the same as assignAceRank()?

function assignAceRank(array) {
  var cardTotal = findCardTotal(array);
  for (i = 0; i < array.length; i += 1) {
    if (array[i].rank === 1) {
      if (cardTotal === 11) {
        array[i].rank = 11; //playerhand array updated with new rank
      }
      cardTotal = findCardTotal(array);
    }
  }
  return cardTotal;
}

function matchNumber(number, cardTotal) {
  //return a Boolean
  //for initial winning condition, 2 cards only
  // if (cardTotal === number) {
  //   var output = "Blackjack!"; //put to player then use display message function
  // } else {
  //   output = "No blackjack, game continues!"; //rephrase?
  // }
  return cardTotal === number;
}

function findWinner() {
  var playerCardTotal = assignAceRank(playerHand);
  var computerCardTotal = assignAceRank(computerHand);
  //win by blackjack
  var playerBlackjack = matchNumber(21, playerCardTotal);
  var computerBlackjack = matchNumber(21, computerCardTotal);
  if (playerBlackjack || computerBlackjack) {
    var winner = `Blackjack! `;
    if (playerBlackjack === computerBlackjack) {
      winner += "tie";
    } else if (matchNumber(21, playerCardTotal)) {
      winner += "player";
    } else if (matchNumber(21, computerCardTotal)) {
      winner += "computer";
    }
  } else {
    //win by bigger number
    if (playerCardTotal > computerCardTotal) {
      winner = "player";
    } else {
      winner = "computer";
    }
  }
  return winner;
}

function displayGameStatus() {} //?

var main = function (input) {
  makeDeck();
  shuffleDeck();
  if (gameMode === "deal cards") {
    playerHand = getStartingHand(2, playerHand);
    computerHand = getStartingHand(2, computerHand);
    console.log(playerHand);
    console.log(computerHand);
    playerHand = [{ rank: 1 }, { rank: 10 }];
    computerHand = [{ rank: 1 }, { rank: 10 }];
    // return findCardTotal(playerHand);
    var output = `Player ${displayUserCards(
      playerHand
    )} Computer ${displayUserCards(computerHand)}`;
    gameMode = "compare cards";
  } else if (gameMode === "compare cards") {
    findWinner();
    output = `${findWinner()} is the winner!`;
  }
  return output;
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
