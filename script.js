var makeCard = function (suit, emoji, rank) {
  var specialRanks = {
    11: "jack",
    12: "queen",
    13: "king",
    1: "ace",
  };
  var name = rank.toString();
  var points = rank;

  if (Object.keys(specialRanks).includes(name)) {
    name = specialRanks[rank];
    if (name != "ace") points = 10;
  }

  return { name, suit, rank, points, emoji };
};

var makeDeck = function () {
  var deck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var suitEmojis = ["♥️", "♦", "♣️", "♠️"];

  for (var suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    for (var rank = 1; rank <= 13; rank += 1) {
      var card = makeCard(suits[suitIndex], suitEmojis[suitIndex], rank);
      deck.push(card);
    }
  }
  return deck;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
var shuffleDeck = function (cardDeck) {
  for (var i = 0; i < cardDeck.length; i += 1) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[i];

    cardDeck[i] = randomCard;
    cardDeck[randomIndex] = currentCard;
  }
  return cardDeck;
};

var deck;
var playerCards = [];
var computerCards = [];

const STARTING_CARDS = 2;

var resetGame = function () {
  deck = makeDeck();
  deck = shuffleDeck(deck);
  playerCards = [];
  computerCards = [];
};

var checkForBlackjack = function (cards) {
  cards.sort((a, b) => a.points - b.points);
  return cards[0].points == 1 && cards[1].points == 10;
};

var calculatePoints = function (cards) {
  var total = 0;
  for (var i = 0; i < cards.length; i += 1) {
    total += cards[i].points;
  }
  return total;
};

var main = function (input) {
  resetGame();
  for (var i = 0; i < STARTING_CARDS; i += 1) {
    playerCards.push(deck.pop());
    computerCards.push(deck.pop());
  }

  var output = "Player's cards:<br>";
  for (var i = 0; i < STARTING_CARDS; i += 1) {
    output += `${playerCards[i].name} of ${playerCards[i].emoji}<br>`;
  }

  output += "<br>Computer's cards:<br>";
  for (var i = 0; i < STARTING_CARDS; i += 1) {
    output += `${computerCards[i].name} of ${computerCards[i].emoji}<br>`;
  }

  if (checkForBlackjack(playerCards)) {
    output += `<br>Player has blackjack. Player wins!`;
  } else {
    var playerPoints = calculatePoints(playerCards);
    var computerPoints = calculatePoints(computerCards);

    output += `<br>Player has ${playerPoints} points.<br>Computer has ${computerPoints} points.<br>`;

    if (playerPoints == computerPoints) output += `It's a tie!`;
    else if (playerPoints > computerPoints) output += `Player wins!`;
    else output += `Computer wins!`;
  }

  return output;
};
