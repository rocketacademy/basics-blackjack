var deck = [];
var shuffledDeck = [];
var playerCards = [];
var computerCards = [];
var playerHandSize = playerCards.length;

var main = function (input) {
  var myOutputValue = " ";
  //inititate making of deck
  var deck1 = makeDeck();
  //shuffle the deck
  var shuffle = shuffleCards(deck);
  //find player hand and output in box
  //calPlayerCard gives string representing the card name and suit
  var playerHand = calPlayerCard(shuffledDeck);
  console.log(playerHand);
  var computerHand = calComputerCard(shuffledDeck);
  console.log(computerHand);
  var winningHand = calWinningHand(playerCards, computerCards);
  var myOutputValue = winningHand;
  return myOutputValue;
};

var makeDeck = function () {
  var suits = ["diamonds", "clubs", "hearts", "spades"];
  var suitIndex = 0;
  //making suits
  while (suitIndex < suits.length) {
    var currentSuits = suits[suitIndex];
    console.log("current Suit: " + currentSuits);
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      if (cardName == 1) {
        cardName = "Ace";
        cardEmoji = "😎";
      } else if (cardName > 1 && cardName < 11) {
        cardName = rankCounter;
        cardEmoji = " ";
      } else if (cardName == 11) {
        cardName = "Jack";
        cardEmoji = "👶";
      } else if (cardName == 12) {
        cardName = "Queen";
        cardEmoji = "👸";
      } else if (cardName == 13) {
        cardName = "King";
        cardEmoji = "🤴";
      }
      var card = {
        name: cardName,
        suit: currentSuits,
        rank: rankCounter,
        Emoji: cardEmoji,
      };
      console.log("rank: " + rankCounter + cardEmoji);
      deck.push(card);
      shuffledDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return deck;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the deck array
var shuffleCards = function (deck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < deck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(shuffledDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = shuffledDeck[randomIndex];
    console.log(randomCard);
    // Select the card that corresponds to currentIndex
    var currentCard = shuffledDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    shuffledDeck[currentIndex] = randomCard;
    shuffledDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return deck;
};

// finding a player card from shuffled deck
var calPlayerCard = function (shuffledDeck) {
  var playerCard = shuffledDeck.pop();
  playerCards.push(playerCard);
  var myOutputValue = "You got " + playerCard.name + " of " + playerCard.suit;
  return myOutputValue;
};
// finding computer card from shuffled deck
var calComputerCard = function (shuffledDeck) {
  var computerCard = shuffledDeck.pop();
  computerCards.push(computerCard);
  var myOutputValue =
    "You got " + computerCard.name + " of " + computerCard.suit;
  return myOutputValue;
};
//calculating winning hand through rank
//will need to input sum of strong method soon
//also conditons for ace being 1 or 11

var calWinningHand = function (playerCards, computerCards) {
  var counter = 0;
  if (playerCards[counter].rank < computerCards[counter].rank) {
    var myOutputValue =
      "You got " +
      playerCards[counter].rank +
      " of " +
      playerCards[counter].suit +
      "<br>" +
      "Computer got " +
      computerCards[counter].rank +
      " of " +
      computerCards[counter].suit +
      "<br>" +
      "You Lost!";
  } else if (playerCards[counter].rank == computerCards[counter].rank) {
    var myOutputValue =
      "You got " +
      playerCards[counter].rank +
      " of " +
      playerCards[counter].suit +
      "<br>" +
      "Computer got " +
      computerCards[counter].rank +
      " of " +
      computerCards[counter].suit +
      "<br>" +
      "Draw!";
  } else if (playerCards[counter].rank > computerCards[counter].rank) {
    myOutputValue =
      "You got " +
      playerCards[counter].rank +
      " of " +
      playerCards[counter].suit +
      "<br>" +
      "Computer got " +
      computerCards[counter].rank +
      " of " +
      computerCards[counter].suit +
      "<br>" +
      "You Won!";
  }
  return myOutputValue;
};
