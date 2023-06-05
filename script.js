const deck = {
  value: [2, 3, 4, 5, 6, 7, 8, 9, 10, `J`, `Q`, `K`, `A`],
  suit: ["♦️", "♣️", "♥️", "♠️"],
};

let cardsDealt = [];
let playerCards = [];
let playerTotal = 0;

const cardPick = function () {
  let card = {
    value: 0,
    name: 0,
  };
  let valuesRNG = Math.floor(Math.random() * deck.value.length);
  let suitsRNG = Math.floor(Math.random() * 4);

  card.value = deck.value[valuesRNG];
  card.name = `<br>┏╾┓<br>\xa0│<b>${
    deck.value[valuesRNG] + deck.suit[suitsRNG]
  }</b>│<br>┗┻┛`;

  if (
    card.name.includes(`J`) ||
    card.name.includes(`Q`) ||
    card.name.includes(`K`)
  ) {
    card.value = 10;
  }
  if (card.name.includes(`A`)) {
    card.value = 11;
  }
  return card;
};

const cardCheck = function (pick) {
  pick = cardPick();
  while (cardsDealt.includes(pick.name)) {
    pick = cardPick();
    if (cardsDealt.length === 52) {
      return `There are no more cards left to deal.`;
    }
  }

  if (cardsDealt.length < 52) {
    cardsDealt.push(pick.name);
    return pick;
  }
};

const main = function (input) {
  let dealtCard = cardCheck();
  playerCards.push(dealtCard.name);
  playerTotal = playerTotal + dealtCard.value;

  let output1 = `Your cards are the ${playerCards.join(" and ")}.<br>`;
  let output2 = `Your total count is ${playerTotal}`;

  if (playerTotal < 21) {
    if (dealtCard === `There are no more cards left to deal.`) {
      return `There are no more cards left to deal.`;
    }
    if (playerCards.length === 1) {
      output1 = `Your card is the ${playerCards}.<br>`;
      output2 = `Your count is ${playerTotal}`;
      return output1 + output2;
    }
    if (playerCards.length > 1) {
      return output1 + output2;
    }
  }
  if (playerTotal === 21 || playerTotal > 21) {
    if (playerTotal === 21) {
      output2 = `Your total count is ${playerTotal}<br><br> <b>BLACKJACK!</b>`;
    }
    if (playerTotal > 21) {
      output2 = `Your total count is ${playerTotal}<br><br> Too bad.`;
    }
    cardsDealt = [];
    playerTotal = 0;
    playerCards = [];
  }
  return output1 + output2;
};

//card name `⌈` + "‾‾‾‾‾" + `⌉` + `<br>` + ` |` + `\xa0 2♠️ ` + ` |` + `<br>` + `⌊___⌋`
//improved name `┏╾┓<br>\xa0│<b>${dealtCard.name}</b> │<br>┗┻┛`
//`Your card is the <br>┏╾┓<br>\xa0│<b>${dealtCard.name}</b>│<br>┗┻┛<br> which has a value of ${dealtCard.value}`
