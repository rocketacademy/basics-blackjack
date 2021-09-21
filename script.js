var generateRandomIndex = function (max) {
  var randomDecimal = Math.random() * max;
  var randomInteger = Math.floor(randomDecimal);
  return randomInteger;
};

var cardDeck = [];
var playersHand = [];
var dealersHand = [];
var gameMode = "deal";
var playersCard1 = 0;
var playersCard2 = 0;
var dealersCard1 = 0;
var dealersCard2 = 0;
var playersTotal = 0;
var dealersTotal = 0;

var main = function (input) {
  if (gameMode == "reset") {
    reset();
  }
  if (input == "end") {
    gameMode = "end";
  }
  if (gameMode == "end") {
    dealersPlay();
    if (dealersTotal > 21) {
      gameMode = "reset";
      return "The dealer busted his hand. You win!";
    }
    gameMode = "reset";
    return compareResults();
  }
  if (input == "draw") {
    gameMode = "draw";
  }
  if (gameMode == "draw") {
    return playersPlay();
  }
  if (gameMode == "deal") {
    createNShuffleDeck();
    return dealCards();
  }
};

//initialize deck of cards
var createNShuffleDeck = function () {
  var suits = ["hearts", "clubs", "spades", "diamonds"];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var rankValue = rankCounter;
      var cardName = rankValue;
      if (rankCounter == 1) {
        cardName = "Ace";
      }
      if (rankCounter == 11) {
        cardName = "Jack";
        rankValue = 10;
      }
      if (rankCounter == 12) {
        cardName = "Queen";
        rankValue = 10;
      }
      if (rankCounter == 13) {
        cardName = "King";
        rankValue = 10;
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankValue,
      };
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }

  //shuffle deck of cards
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = generateRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex += 1;
  }
  console.log("Shuffled card deck:", cardDeck);
  return cardDeck;
};

//pop player's and dealer's cards, output player's hand
var dealCards = function (input) {
  playersCard1 = cardDeck.pop();
  playersHand.push(playersCard1);
  playersCard2 = cardDeck.pop();
  playersHand.push(playersCard2);
  console.log("Player's array:", playersHand);
  dealersCard1 = cardDeck.pop();
  dealersHand.push(dealersCard1);
  dealersCard2 = cardDeck.pop();
  dealersHand.push(dealersCard2);
  console.log("Dealer's array:", dealersHand);
  playersTotal = Number(playersCard1.rank) + Number(playersCard2.rank);

  //check for Blackjack
  var myOutputValue;
  if (
    (dealersCard1.name == "Ace" && dealersCard2.rank == 10) ||
    (dealersCard2.name == "Ace" && dealersCard1.rank == 10)
  ) {
    myOutputValue = "The dealer got a natural blackjack! You lose.";
  } else if (
    (playersCard1.name == "Ace" && playersCard2.rank == 10) ||
    (playersCard2.name == "Ace" && playersCard1.rank == 10)
  ) {
    myOutputValue = "You got a natural blackjack! You win.";
  } else {
    myOutputValue =
      "You got " +
      playersCard1.name +
      " of " +
      playersCard1.suit +
      " and " +
      playersCard2.name +
      " of " +
      playersCard2.suit +
      ". Enter 'draw' to draw another card or 'end' if you're satisfied with your cards.";
  }
  return myOutputValue;
};

//player inputs "draw" to draw another card or "end" to compare hands
var playersPlay = function () {
  playersTotal = 0;
  var playersDrawCard = cardDeck.pop();
  console.log("Player's Draw Card:", playersDrawCard);
  playersHand.push(playersDrawCard);
  var arrayIndex = 0;
  while (arrayIndex < playersHand.length) {
    playersTotal += Number(playersHand[arrayIndex].rank);
    arrayIndex += 1;
  }
  console.log("Player's Total:", playersTotal);
  if (playersTotal <= 21) {
    return (
      "You have drawn " +
      playersDrawCard.name +
      " of " +
      playersDrawCard.suit +
      ". Your total is " +
      playersTotal +
      " points. Enter 'draw' to draw another card or 'end' if you're satisfied with your cards."
    );
  }
  if (playersTotal > 21) {
    gameMode = "reset";
    return (
      "You have drawn " +
      playersDrawCard.name +
      " of " +
      playersDrawCard.suit +
      ". Your total is " +
      playersTotal +
      " points. You've busted your hand. Better luck next time!"
    );
  }
};

//if dealer is < 17, dealer has to draw
var dealersPlay = function () {
  dealersTotal = 0;
  dealersTotal = Number(dealersCard1.rank) + Number(dealersCard2.rank);
  while (dealersTotal < 17) {
    var dealersDrawCard = cardDeck.pop();
    console.log("Dealer's Draw Card:", dealersDrawCard);
    dealersHand.push(dealersDrawCard);
    dealersTotal += Number(dealersDrawCard.rank);
  }
  console.log("Dealer's Total:", dealersTotal);
  return dealersTotal;
};

//output results
var compareResults = function () {
  if (dealersTotal > playersTotal) {
    return (
      "You scored " +
      playersTotal +
      " points while the dealer scored " +
      dealersTotal +
      " points. You lose!"
    );
  }
  if (dealersTotal < playersTotal) {
    return (
      "You scored " +
      playersTotal +
      " points while the dealer scored " +
      dealersTotal +
      " points. You win!"
    );
  }
  if (dealersTotal == playersTotal) {
    return (
      "You scored " +
      playersTotal +
      " points while the dealer scored " +
      dealersTotal +
      " points. It's a tie!"
    );
  }
};

var reset = function () {
  gameMode = "deal";
  cardDeck = [];
  playersHand = [];
  dealersHand = [];
  playersCard1 = 0;
  playersCard2 = 0;
  dealersCard1 = 0;
  dealersCard2 = 0;
  playersTotal = 0;
  dealersTotal = 0;
};
