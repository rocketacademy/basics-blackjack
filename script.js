// init deck as an empty array
var deck = [];

// issue first two cards to player & first card to house
var playerHand = [];
var houseHand = []; //face down, face up

//generate sequential deck
function generateDeck() {
  const suits = ["Diamonds", "Clubs", "Hearts", "Spades"];
  const card = [
    "Ace",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "Jack",
    "Queen",
    "King",
  ];

  for (i = 0; i < 52; i++) {
    var newCard = {};
    deck[i] = newCard;
    rank = i;
    newCard.property = card[Math.floor(i / 4)];
    newCard.value =
      newCard.property == "Jack" ||
      newCard.property == "Queen" ||
      newCard.property == "King"
        ? 10
        : newCard.property == "Ace"
        ? 1
        : Number(newCard.property);
    newCard.suit = suits[(i + 4) % 4];
    newCard.name = newCard.property + " of " + newCard.suit;
  }
}

//shuffle the deck
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

var shuffleCards = function (deck) {
  var currentIndex = 0;
  while (currentIndex < deck.length) {
    var randomIndex = getRandomIndex(deck.length);
    var randomCard = deck[randomIndex];
    var currentCard = deck[currentIndex];
    deck[currentIndex] = randomCard;
    deck[randomIndex] = currentCard;
    currentIndex += 1;
  }
  return deck;
};

// HELPER FUNCTIONS
// populate values
// score function does not capture all edge cases
var score = function (card) {
  var sum = 0;
  var count = 0;
  var aces = 0;

  while (count < card.length) {
    if (card[count].property == "Ace") {
      sum += card[count].value;
      count++;
      aces++;
    } else {
      sum += card[count].value;
      count++;
    }
  }

  while (aces > 0) {
    if (sum + 10 < 21 || sum == 11) {
      sum += 10;
      aces--;
    }
  }

  return sum;
};

// check for BlackJack:
// if player total value is 11 && one of the cards has 'Ace'
var blackjack = function (hand) {
  //takes an object and check if two cards are 'Ace' & 10 card
  if (
    score(hand) == 21 &&
    (hand[0].property == "Ace" || hand[1].property == "Ace")
  ) {
    return true;
  } else {
    return false;
  }
};

var deal = function () {
  return deck.shift();
};

var hit = function () {
  standme.disabled = false;
  newCard = deal();
  playerHand.push(newCard);
  console.log(newCard);
  var playerDraw =
    "<br>" +
    "<br>" +
    "You drew the " +
    newCard.name +
    " for a total of " +
    score(playerHand) +
    ".";
  output.innerHTML += playerDraw;
  if (score(playerHand) > 21) {
    hitme.disabled = true;
    standme.disabled = true;
    start.disabled = false;
    output.innerHTML += "<br>" + "<br>" + "Bust! You lose!";
  }
};

var stand = function () {
  if (score(playerHand) < 17) {
    var error = "<br>" + "<br>" + "Insufficient value. Please draw a card.";
    output.innerHTML += error;
    standme.disabled = true;
  } else {
    hitme.disabled = true;
    var endTurn =
      "<br>" +
      "<br>" +
      "The house opens the " +
      houseHand[1].name +
      " with a total score of " +
      score(houseHand) +
      ".";
    output.innerHTML += endTurn;

    while (score(houseHand) < 17) {
      newCard = deal();
      houseHand.push(newCard);
      var houseDraw =
        "<br>" +
        "<br>" +
        "The house draws a " +
        houseHand[0].name +
        " for a sum of " +
        score(houseHand) +
        ".";
      output.innerHTML += houseDraw;
    }
    if (blackjack(houseHand)) {
      start.disabled = false;
      standme.disabled = true;
      output.innerHTML += "It's a Blackjack! You lose!";
    } else if (score(houseHand) > 21 || score(playerHand) > score(houseHand)) {
      start.disabled = false;
      standme.disabled = true;
      output.innerHTML += "<br>" + "<br>" + "You win!";
    } else if (score(playerHand) < score(houseHand)) {
      start.disabled = false;
      standme.disabled = true;
      output.innerHTML += "<br>" + "<br>" + "You lose!";
    } else {
      start.disabled = false;
      standme.disabled = true;
      output.innerHTML += "<br>" + "<br>" + "Draw!";
    }
  }
};

//main game
var startGame = function () {
  start.disabled = true;
  generateDeck();
  shuffleCards(deck);
  playerHand = [deal(), deal()];
  //console.log(playerHand);
  houseHand = [deal(), deal()];
  //console.log(houseHand);
  var firstround =
    "You were dealt the " +
    playerHand[0].name +
    " as well as the " +
    playerHand[1].name +
    ", for a total score of " +
    score(playerHand) +
    "." +
    "<br><br> The dealer has " +
    houseHand[0].name +
    ".";
  output.innerHTML = firstround;

  hitme.disabled = false;
  standme.disabled = false;

  if (blackjack(playerHand)) {
    var bj = "<br>" + "Blackjack!";
    output.html += bj;
    start.disabled = false;
    if (blackjack(houseHand)) {
      var draw =
        "<br>" +
        "<br>" +
        "Too bad, the house deals a BlackJack too! It's a draw!";
      output.innerHTML += draw;
      start.disabled = false;
    } else {
      output.innerHTML += "<br>" + "You're a winner!";
      start.disabled = false;
    }
  }
};
