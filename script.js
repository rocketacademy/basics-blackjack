var deck = [];

var main = function (input) {
  createDeck();
  shuffleDeck();
  console.log(deck);
  deck = [];
  return "Test";
};

var addPlayer = function () {};

var addComputerPlayer = function () {};

var createDeck = function () {
  let suits = ["diamonds", "clubs", "hearts", "spades"];
  for (let i = 0; i < 4; i++) {
    for (let j = 1; j <= 13; j++) {
      let card = {};
      card.rank = j;
      card.suit = suits[i];
      if (j == 1) {
        card.name = `Ace of ${suits[i]}`;
      } else if (j == 11) {
        card.name = `Jack of ${suits[i]}`;
      } else if (j == 12) {
        card.name = `Queen of ${suits[i]}`;
      } else if (j == 13) {
        card.name = `King of ${suits[i]}`;
      } else card.name = `${j} of ${suits[i]}`;
      console.log(JSON.stringify(card));
      deck.push(card);
    }
  }
  return;
};

var shuffleDeck = function () {
  for (let i = 1; i < deck.length; i++) {
    let randomIndex = Math.floor(Math.random() * deck.length);
    let temp = deck[i];

    deck[i] = deck[randomIndex];
    deck[randomIndex] = temp;
  }
};
