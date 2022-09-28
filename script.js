var dealerSum = 0;
var yourSum = 0;
var hidden;
var deck;

//Keep track of no. of Aces in order to assign a value or 1 or 11
var aceCountDealer = 0;
var aceCountYou = 0;

//Allows the player to hit while the sum is <= 21
var canHit = true;

window.onload = function () {
  buildDeck();
  shuffleDeck();
  startGame();
};

function buildDeck() {
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
  var types = ["C", "D", "H", "S"];
  deck = [];

  // Double for loop to push the card values and types to the empty deck array eg. A-C to K-C, A-D to K-D
  for (var i = 0; i < types.length; i++) {
    for (var j = 0; j < values.length; j++) {
      deck.push(values[j] + "-" + types[i]);
    }
  }
}

function shuffleDeck() {
  for (var i = 0; i < deck.length; i++) {
    // Gives a no. between 0 to 51
    var j = Math.floor(Math.random() * deck.length);
    // Swaps 2 cards in the deck
    var temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
  console.log(deck);
}

function startGame() {
  //Drawing of cards for Dealer
  hidden = deck.pop();
  dealerSum = dealerSum + getValue(hidden);
  aceCountDealer = aceCountDealer + checkAce(hidden);
  while (dealerSum < 17) {
    // Creates image tag
    var cardImg = document.createElement("img");
    var card = deck.pop();
    // Sets the image source to the folder name, name of the image and the extension
    cardImg.src = "./cards/" + card + ".png";
    dealerSum = dealerSum + getValue(card);
    aceCountDealer = aceCountDealer + checkAce(card);
    // Appends the additional card(s) to the dealer-cards div in html file
    document.getElementById("dealer-cards").append(cardImg);
  }
  console.log("Dealer Sum", dealerSum);

  // Drawing of cards for Player
  for (var i = 0; i < 2; i++) {
    var cardImg = document.createElement("img");
    var card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    yourSum = yourSum + getValue(card);
    aceCountYou = aceCountYou + checkAce(card);
    document.getElementById("your-cards").append(cardImg);
  }
  console.log("Your Sum", yourSum);
  document.getElementById("hit").addEventListener("click", hit);
  document.getElementById("stay").addEventListener("click", stay);
}

function hit() {
  if (!canHit) {
    return;
  }

  var cardImg = document.createElement("img");
  var card = deck.pop();
  cardImg.src = "./cards/" + card + ".png";
  yourSum = yourSum + getValue(card);
  aceCountYou = aceCountYou + checkAce(card);
  document.getElementById("your-cards").append(cardImg);

  // If the sum of player's cards exceed 21, they cannot click the "hit" button
  if (reduceAce(yourSum, aceCountYou) > 21) {
    canHit = false;
  }
}

function stay() {
  dealerSum = reduceAce(dealerSum, aceCountDealer);
  yourSum = reduceAce(yourSum, aceCountYou);

  canHit = false;
  document.getElementById("hidden").src = "./cards/" + hidden + ".png";

  var myOutputMessage = "";
  if (yourSum > 21) {
    myOutputMessage = "You lose! 😢 Better luck next round!";
  } else if (dealerSum > 21) {
    myOutputMessage = "Congratulations, you win! 🥳";
  } else if (yourSum == dealerSum) {
    myOutputMessage = "Looks like it's a tie! 😑";
  } else if (yourSum > dealerSum) {
    myOutputMessage = "Congratulations, you win! 🥳";
  } else if (yourSum < dealerSum) {
    myOutputMessage = "You lose! 😢 Better luck next round!";
  }
  // Populates the scores within the spans for dealer sum and player sum
  document.getElementById("dealer-sum").innerText = dealerSum;
  document.getElementById("your-sum").innerText = yourSum;
  // Populates 1 of the messages to the results paragraph tag in the html file
  document.getElementById("results-div").innerText = myOutputMessage;
}

function getValue(card) {
  // Splits the value and type of a card into separate elements in an array eg. "2-C" --> ["2", "C"]
  var data = card.split("-");
  var value = data[0];
  // Checks if the value of a card is not a number. If so, will assign individual values to it
  if (isNaN(value)) {
    if (value == "A") {
      return 11;
    }
    return 10;
  }
  // Extracts the value from the string and returns it to an actual number
  return parseInt(value);
}

function checkAce(card) {
  if (card[0] == "A") {
    return 1;
  }
  return 0;
}

// If player sum exceeds 21 and player has at least 1 ace, the player sum will be reduced by 10 as the default ace value is set as 11
function reduceAce(playerSum, aceCountYou) {
  while (playerSum > 21 && aceCountYou > 0) {
    playerSum = playerSum - 10;
    aceCountYou = aceCountYou - 1;
  }
  return playerSum;
}
