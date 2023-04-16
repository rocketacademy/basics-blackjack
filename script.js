const makeDeck = function () {
  const deck = [];
  const suits = ["hearts", "diamonds", "clubs", "spades"];
  for (let suitIndex = 0; suitIndex < 4; suitIndex++) {
    let currentSuit = suits[suitIndex];
    for (let rankIndex = 1; rankIndex <= 13; rankIndex++) {
      let cardName = rankIndex;
      if (rankIndex === 1) {
        cardName = "ace";
      } else if (rankIndex === 11) {
        cardName = "jack";
      } else if (rankIndex === 12) {
        cardName = "queen";
      } else if (rankIndex === 13) {
        cardName = "king";
      }
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankIndex,
      };
      deck.push(card);
    }
  }
  return deck;
};

const getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

const makeShuffledDeck = function (deck) {
  for (let currentIndex = 0; currentIndex < deck.length; currentIndex++) {
    let currentCard = deck[currentIndex];
    let randomIndex = getRandomIndex(deck.length);
    let randomCard = deck[randomIndex];
    deck[currentIndex] = randomCard;
    deck[randomIndex] = currentCard;
  }
  return deck;
};

const main = function (input) {
  const originalDeck = makeDeck();
  const shuffledDeck = makeShuffledDeck(originalDeck);

  let myOutputValue = "hello world";
  return myOutputValue;
};
