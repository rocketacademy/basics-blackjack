//-------Global Variables-------
const deck = {
  value: [2, 3, 4, 5, 6, 7, 8, 9, 10, `J`, `Q`, `K`, `A`],
  suit: ["♦️", "♣️", "♥️", "♠️"],
};

let cardsDealt = [];
let playerCards = [];
let dealerCards = [];
let playerTotal = 0;
let dealerTotal = 0;
let mode = 0;
//-------Global Variables-------

//-------Helper Functions-------
const cardPick = function () {
  let card = {
    value: 0,
    name: 0,
  };
  let valuesRNG = Math.floor(Math.random() * deck.value.length);
  let suitsRNG = Math.floor(Math.random() * 4);

  card.value = deck.value[valuesRNG];
  card.name = card.value + deck.suit[suitsRNG];

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
//-------Helper Functions-------

//-------Game Modes-------
//-------Mode 0 Start-------
const firstDraw = function (playerInput) {
  let dealtCard = cardCheck();
  playerCards.push(dealtCard.name);
  playerTotal = playerTotal + dealtCard.value;
  let dealerCard = cardCheck();
  dealerCards.push(dealerCard.name);
  dealerTotal = dealerTotal + dealerCard.value;
  mode++;
  return `The dealer has a ${dealerCards} and one face down card.<br><br>Your cards are ${playerCards.join(
    "\xa0 "
  )}.<br>Your total count is ${playerTotal}.<br>Type in 'Hit' to draw another card.<br> Type in 'Stand' to end your turn.`;
};
//-------Mode 0 End-------
//-------Mode 1 Start-------
const playerChoice = function (playerInput) {
  //----if player hits----
  if (
    playerTotal > 21 &&
    (playerCards.includes("A♦️") ||
      playerCards.includes("A♣️") ||
      playerCards.includes("A♥️") ||
      playerCards.includes("A♠️"))
  ) {
    playerTotal = playerTotal - 10;
  }

  if (playerInput.toLowerCase().trim() === `hit`) {
    let dealtCard = cardCheck();
    playerCards.push(dealtCard.name);
    playerTotal = playerTotal + dealtCard.value;

    return `The dealer has a ${dealerCards} and one face down card.<br><br>Your cards are ${playerCards.join(
      "\xa0 "
    )}.<br>Your total count is ${playerTotal}.<br>Type in 'Hit' to draw another card.<br> Type in 'Stand' to end your turn.`;
  }

  //---- if player stands----
  if (playerInput.toLowerCase().trim() === `stand`) {
    mode++;
    console.log(mode);
    return `The dealer has a ${dealerCards} and one face down card.<br><br>Your cards are ${playerCards.join(
      "\xa0 "
    )}.<br>You have chosen to stand with a total of ${playerTotal}.<br><br>The dealer will now draw their cards.`;
  }

  if (
    playerInput.toLowerCase().trim() !== `stand` ||
    playerInput.toLowerCase().trim() !== `hit`
  ) {
    return `I'm sorry I don't understand.<br>The dealer has a ${dealerCards} and one face down card.<br><br>Your cards are ${playerCards.join(
      "\xa0 "
    )}.<br>Your total count is ${playerTotal}.<br>Type in 'Hit' to draw another card.<br> Type in 'Stand' to end your turn.`;
  }
};
//-------Mode 1 End-------
//-------Mode 2 Start-------
const dealerDraws = function () {
  if (
    dealerTotal > 21 &&
    (dealerCards.includes("A♦️") ||
      dealerCards.includes("A♣️") ||
      dealerCards.includes("A♥️") ||
      dealerCards.includes("A♠️"))
  ) {
    dealerTotal = dealerTotal - 10;
  }
  while (dealerTotal < 17) {
    let dealerCard = cardCheck();
    dealerCards.push(dealerCard.name);
    dealerTotal = dealerTotal + dealerCard.value;
    return `The dealer has ${dealerCards}.<br>Their total count is ${dealerTotal}<br><br>Your cards are ${playerCards.join(
      "\xa0 "
    )}.<br>Your total count is ${playerTotal}.<br><br>Click Deal to continue.`;
  }
  if (dealerTotal >= 17) {
    mode++;
    return `The dealer has ${dealerCards}.<br>Their total count is ${dealerTotal}<br>They will stand here.<br><br>Your cards are ${playerCards.join(
      "\xa0 "
    )}.<br>Your total count is ${playerTotal}.<br><br>Click Deal to continue.`;
  }
};
///-------Mode 2 End-------

//-------Main Function-------
const main = function (input) {
  if (mode === 0) {
    return firstDraw(input);
  }

  if (mode === 1) {
    return playerChoice(input);
  }

  if (mode === 2) {
    return dealerDraws();
  }
};
//-------Main Function-------

//card name `⌈` + "‾‾‾‾‾" + `⌉` + `<br>` + ` |` + `\xa0 2♠️ ` + ` |` + `<br>` + `⌊___⌋`
//improved name `┏╾┓<br>\xa0│<b>${dealtCard.name}</b> │<br>┗┻┛`
//`Your card is the <br>┏╾┓<br>\xa0│<b>${dealtCard.name}</b>│<br>┗┻┛<br> which has a value of ${dealtCard.value}`
