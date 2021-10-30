//Global Variables
var cardDeck = [];
var suit = ["Diamond", "Clubs", "Hearts", "Spades"];
var rank = [
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
//Generate the Deck
for (var x = 0; x < 4; x += 1) {
  for (var y = 0; y < 13; y += 1) {
    var cardAttribute = {};
    cardAttribute.suit = suit[x];
    cardAttribute.number = y + 1;
    cardAttribute.rank = rank[y];
    console.log("Card Attribute Suit: " + cardAttribute.suit);
    console.log("Card Attribute Number: " + cardAttribute.number);
    console.log("Card Attribute Rank: " + cardAttribute.rank);
    cardDeck.push(cardAttribute);
  }
}

var main = function (input) {
  var myOutputValue = "hello world";
  return myOutputValue;
};

//Get Random Index
var getRandomIndex = function (input) {
  return Math.floor(Math.random(input));
};
