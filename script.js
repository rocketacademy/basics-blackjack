// Create all the cards
var makeDeck = function () {
  var cardDeck = [];
  var suits = ["hearts ♥︎", "diamonds ♦︎", "clubs ♣︎", "spades ♠︎"];
  var suitIdx = 0;
  while (suitIdx < suits.length) {
    var rankCounter = 1;
    var currentSuit = suits[suitIdx];
    while (rankCounter < 14) {
      var cardName = rankCounter;
      if (rankCounter == 1) cardName = "ace";
      if (rankCounter == 11) cardName = "jack";
      if (rankCounter == 12) cardName = "queen";
      if (rankCounter == 13) cardName = "king";

      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIdx += 1;
  }
  return cardDeck;
};

// Generate random index
function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
}

// Shuffle card deck
function shuffleCards(cardDeck) {
  let currentIdx = 0;
  while (currentIdx < cardDeck.length) {
    let currentCard = cardDeck[currentIdx];
    let randomIdx = getRandomIndex(cardDeck.length);
    let randomCard = cardDeck[randomIdx];
    // Swap cards
    cardDeck[currentIdx] = randomCard;
    cardDeck[randomIdx] = currentCard;
    currentIdx += 1;
  }
  return cardDeck;
}

let deck = shuffleCards(makeDeck());

// First Version: Compare Initial Hands to Determine Winner - main1
var main1 = function (input) {
  if (deck.length == 0) {
    return "No more card in the deck.";
  }

  let playerHand = [];
  let computerHand = [];
  playerHand.push(deck.pop());
  playerHand.push(deck.pop());
  computerHand.push(deck.pop());
  computerHand.push(deck.pop());

  let playerHandValue = playerHand[0].rank + playerHand[1].rank;
  let computerHandValue = computerHand[0].rank + computerHand[1].rank;

  if (playerHandValue == computerHandValue) {
    myOutputValue = `It's a tie! 
    <hr>Player has: ${playerHand[0].name} of ${playerHand[0].suit}, ${playerHand[1].name} of ${playerHand[1].suit}
    <br>Dealer has: ${computerHand[0].name} of ${computerHand[0].suit}, ${computerHand[1].name} of ${computerHand[1].suit}`;
  } else if (playerHandValue == 21 || playerHandValue > computerHandValue) {
    myOutputValue = `You win! 
    <hr>Player has: ${playerHand[0].name} of ${playerHand[0].suit}, ${playerHand[1].name} of ${playerHand[1].suit}
    <br>Dealer has: ${computerHand[0].name} of ${computerHand[0].suit}, ${computerHand[1].name} of ${computerHand[1].suit}`;
  } else if (computerHandValue == 21 || computerHandValue > playerHandValue) {
    myOutputValue = `You loose! 
    <hr>Player has: ${playerHand[0].name} of ${playerHand[0].suit}, ${playerHand[1].name} of ${playerHand[1].suit}
    <br>Dealer has: ${computerHand[0].name} of ${computerHand[0].suit}, ${computerHand[1].name} of ${computerHand[1].suit}`;
  }

  return myOutputValue;
};

// Second Version: Add Player Hit or Stand - main2
var main = function (input) {
  return myOutputValue;
};
