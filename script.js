// Global variables
var playerHand = [];
var aiHand = [];

var makeDeck = function () {
  var deck = [];
  var suits = ["♠", "♣", "♥", "♦"];
  var values = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];
  for (countSuit = 0; countSuit < suits.length; countSuit++) {
    for (let countValues = 0; countValues < values.length; countValues++) {
      deck.push({ value: values[countValues], suit: suits[countSuit] });
    }
  }
  return deck;
};

var draw = function (hand, deck) {
  var drawnCard = deck.pop();
  hand.push(drawnCard);
};

var deal = function (listOfHands, noOfCards, deck) {
  for (var i = 0; i < noOfCards; i++) {
    for (var j = 0; j < listOfHands.length; j++) {
      draw(listOfHands[j], deck);
    }
  }
};

var shuffleDeck = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    // Generate random number
    var j = Math.floor(Math.random() * (i + 1));

    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
};

var handValueCounter = function (hand) {
  var totalValue = 0;
  for (var i = 0; i < hand.length; i++) {
    if (hand[i].value == "J" || hand[i].value == "Q" || hand[i].value == "K") {
      totalValue += 10;
    } else if (hand[i].value == "A") {
      totalValue += 11;
    } else {
      totalValue += Number(hand[i].value);
    }
  }
  return totalValue;
};

var winChecker = function (hand1, hand2) {
  if (handValueCounter(hand1) > handValueCounter(hand2)) {
    return 1;
  } else if (handValueCounter(hand1) < handValueCounter(hand2)) {
    return 2;
  } else {
    return 0;
  }
};

var bjChecker = function (hand) {
  if (handValueCounter(hand) == 21 && hand.length == 2) {
    return true;
  }
  return false;
};

var handDisplay = function (hand) {
  var text = `<br>`;
  for (var i = 0; i < hand.length; i++) {
    text += `<br>${hand[i].value + hand[i].suit}`;
  }
  return text;
};

var main = function (input) {
  aiHand = [];
  playerHand = [];
  sampleDeck = shuffleDeck(makeDeck());
  deal([playerHand, aiHand], 2, sampleDeck);
  var status =
    "<br><br>Player cards drawn:" +
    handDisplay(playerHand) +
    "<br><br>AI cards drawn:" +
    handDisplay(aiHand);
  if (bjChecker(playerHand) && bjChecker(aiHand)) {
    return "It's a tie!" + status;
  } else if (bjChecker(playerHand)) {
    return "Blackjack! Player wins!" + status;
  } else if (bjChecker(aiHand)) {
    return "Blackjack! AI wins!" + status;
  }
  var winner = winChecker(playerHand, aiHand);
  if (winner == 1) {
    return "Player wins!" + status;
  } else if (winner == 2) {
    return "AI wins!" + status;
  } else {
    return "It's a tie!" + status;
  }
};
