//Global Variables
const deck = [];

function main(input, myOutputValue) {
  initDeck();
  console.log(deck);
  return myOutputValue;
}

function initDeck() {
  const nameConstruct = [
    "Ace",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Jack",
    "Queen",
    "King",
  ];
  const suits = ["Diamonds", "Clubs", "Hearts", "Spades"];
  const indexName = Object.entries({ ...nameConstruct });
  for (const [index, name] of indexName) {
    for (const suit of suits) {
      const card = { name: name, suit: suit, rank: Number(index) + 1 };
      deck.push(card);
    }
  }
}

function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i + 1);
    let holdIndex = deck[i];
    deck[i] = deck[j];
    deck[j] = holdIndex;
  }
}
//Fisher-Yates Shuffle, Durstenfeld variation
// function shuffle(array) {
//   var m = array.length,
//     t,
//     i;
//   // While there remain elements to shuffle…
//   while (m) {
//     // Pick a remaining element…
//     i = Math.floor(Math.random() * m--);
//     // And swap it with the current element.
//     t = array[m];
//     array[m] = array[i];
//     array[i] = t;
//   }
//   return array;
// }
