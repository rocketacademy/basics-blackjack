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
let output1 = `The dealer has a ${dealerCards} and one face down card.<br><br>`;
let output2 = `Your cards are ${playerCards.join(
  "\xa0 "
)}.<br>Your total count is ${playerTotal}.<br>`;
let output3 = `Type in 'Hit' to draw another card.<br> Type in 'Stand' to end your turn.`;
//-------Mode 0 Start-------
const firstDraw = function (playerInput) {
  let dealtCard = cardCheck();
  playerCards.push(dealtCard.name);
  playerTotal = playerTotal + dealtCard.value;
  let dealerCard = cardCheck();
  dealerCards.push(dealerCard.name);
  dealerTotal = dealerTotal + dealerCard.value;
  mode++;
  return +output1 + output2 + output3;
};
//-------Mode 0 End-------
//-------Mode 1 Start-------
const playerChoice = function () {
  if (
    playerInput.toLowerCase().trim() !== `stand` ||
    playerInput.toLowerCase().trim() !== `trim`
  ) {
    return `I'm sorry I don't understand.<br>` + output1 + output2 + output3;
  }
  //----if player hits----
  if (playerTotal < 21)
    if (playerInput.toLowerCase().trim() === `hit`) {
      let dealtCard = cardCheck();
      playerCards.push(dealtCard.name);
      playerTotal = playerTotal + dealtCard.value;
      if (
        playerTotal > 21 &&
        (playerCards.includes("A♦️") ||
          playerCards.includes("A♣️") ||
          playerCards.includes("A♥️") ||
          playerCards.includes("A♠️"))
      ) {
        playerTotal = playerTotal - 10;
      }
      return +output1 + output2 + output3;
    }
  //----if player bust----
  if (
    playerTotal > 21 &&
    (playerCards.includes("A♦️") ||
      playerCards.includes("A♣️") ||
      playerCards.includes("A♥️") ||
      playerCards.includes("A♠️"))
  ) {
    playerTotal = playerTotal - 10;
  }
  //---- if player stands----
  if (playerInput.toLowerCase().trim() === `stand`) {
    output2 = `Your cards are ${playerCards.join("\xa0 ")}.<br>`;
    output3 = `You have chosen to stand with a total of ${playerTotal}.<br><br>The dealer will now draw their cards.`;
    mode++;
    return output1 + output2 + output3;
  }
};
//-------Mode 1 End-------
//-------Mode 2 Start-------
const dealerDraws = function () {
  output1 = `The dealer has ${dealerCards}.<br>Their total count is ${dealerTotal}`;
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
    return output1 + output2;
  }
  if (dealerTotal >= 17) {
    output1 = `The dealer has ${dealerCards}.<br>Their total count is ${dealerTotal}. They will stand here.`;
    output3 = `Click the Deal button to move on to the results.`;
  }
};

//-------Main Function-------
const main = function (input) {
  if (playerTotal < 21) {
    if (dealtCard === `There are no more cards left to deal.`) {
      return `There are no more cards left to deal.`;
    }
    if (playerCards.length === 1) {
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
//-------Main Function-------

//card name `⌈` + "‾‾‾‾‾" + `⌉` + `<br>` + ` |` + `\xa0 2♠️ ` + ` |` + `<br>` + `⌊___⌋`
//improved name `┏╾┓<br>\xa0│<b>${dealtCard.name}</b> │<br>┗┻┛`
//`Your card is the <br>┏╾┓<br>\xa0│<b>${dealtCard.name}</b>│<br>┗┻┛<br> which has a value of ${dealtCard.value}`
