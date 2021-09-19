// make function to generate a card deck
const makeDecks = () => {
  const deck = [];

  let suitIndex = 0;
  const suits = ["spades", "hearts", "clubs", "diamonds"];

  // loop 1 , 4 suits, give every suit an emoji
  while (suitIndex < suits.length) {
    const currentSuit = suits[suitIndex];
    let emojiSuit = "";
    if (currentSuit == "spades") {
      emojiSuit = "♠️";
    } else if (currentSuit == "hearts") {
      emojiSuit = "♥️";
    } else if (currentSuit == "clubs") {
      emojiSuit = "♣️";
    } else if (currentSuit == "diamonds") {
      emojiSuit = "♦️";
    }

    // loop 2, rank 1-13
    let rankCounter = 1;
    // assign card's value and different name for card 1, 11, 12, 13
    let cardValue = rankCounter;
    while (rankCounter <= 13) {
      let cardName = "";
      if (rankCounter == 1) {
        cardName = "ace";
        cardValue = 11;
      } else if (rankCounter == 11) {
        cardName = "jack";
        cardValue = 10;
      } else if (rankCounter == 12) {
        cardName = "queen";
        cardValue = 10;
      } else if (rankCounter == 13) {
        cardName = "king";
        cardValue = 10;
      } else {
        cardName = String(rankCounter);
        cardValue = rankCounter;
      }
      // assign a card object
      const card = {
        rank: rankCounter,
        suit: currentSuit,
        name: cardName,
        emojiSuit: emojiSuit,
        value: cardValue,
      };
      // push the card to card deck
      deck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  // return a card deck
  return deck;
};

// generate a new card Deck
const deck = makeDecks();

// Returns a random card object from the deck.
const dealARandomCard = () => {
  let randomCard = deck[Math.floor(Math.random() * deck.length)];
  console.log(
    `random card is: ${randomCard.name} ${randomCard.suit} and the value is ${randomCard.value}`
  );
  return randomCard;
};

// generate 2 card object in a row for the first drawn with params playerCards
const firstCardsDeal = (playerCards) => {
  playerCards.push(dealARandomCard());
  playerCards.push(dealARandomCard());
  return playerCards;
};

// a function to calculate in hand score with params playerCards
const calculateScore = (playerCards) => {
  let totalScore = 0;
  for (let i = 0; i < playerCards.length; i++) {
    totalScore = totalScore + Number(playerCards[i].value);
  }
  return totalScore;
};

var main = function (input) {
  var myOutputValue = "hello world";

  // assign an array for user and comp cards
  let userCards = [];
  let compCards = [];

  // assign a var for the total amount of cards in hand
  let userTotalScore;
  let compTotalScore;

  userCards = firstCardsDeal(userCards);
  compCards = firstCardsDeal(compCards);
  userTotalScore = calculateScore(userCards);
  console.log(userTotalScore);
  compTotalScore = calculateScore(compCards);

  return `user cards are: ${userCards[0].name} ${userCards[0].emojiSuit} and ${userCards[1].name} ${userCards[1].emojiSuit}, total score : ${userTotalScore} <br>
          comp cards are: ${compCards[0].name} ${compCards[0].emojiSuit} and ${compCards[1].name} ${compCards[1].emojiSuit}, total score : ${compTotalScore}`;
};
