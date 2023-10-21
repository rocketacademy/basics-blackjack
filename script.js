//Global Variables
const deck = [];

function main(input, myOutputValue) {
  initDeck();
  shuffleDeck();
  myOutputValue = printDeck();
  return myOutputValue;
}

function initDeck() {
  if (deck.length <= 0) {
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
        const card = { Name: name, Suit: suit, Rank: Number(index) + 1 };
        deck.push(card);
      }
    }
  }
}

function shuffleDeck() {
  let i, j, holdIndex;
  for (i = deck.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    holdIndex = deck[i];
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

function printDeck() {
  let output = "";
  for (let i = 0; i < deck.length; i++) {
    output += `${deck[i].Name} of ${deck[i].Suit}<br>`;
  }
  return output;
}
