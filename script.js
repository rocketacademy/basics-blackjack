//-------Global Variables-------
const deck = {
  value: [2, 3, 4, 5, 6, 7, 8, 9, 10, `J`, `Q`, `K`, `A`],
  suit: ["♦️", "♣️", "♥️", "♠️"],
};
let cardsDealt = [];
let playerCards = [];
let dealerCards = [];
let playerValues = [];
let dealerValues = [];
let player1 = `waiting`;
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
  card.name = deck.value[valuesRNG] + deck.suit[suitsRNG];

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

const playerCount = function () {
  let pCount = 0;

  for (i = 0; i < playerValues.length; i++) {
    pCount += playerValues[i];
  }

  return pCount;
};

const dealerCount = function () {
  let dCount = 0;

  for (j = 0; j < dealerValues.length; j++) {
    if (dealerValues[i] === 11 && dCount + dealerValues[i] > 21) {
      dealerValues[i] = 1;
    }
    dCount += dealerValues[j];
  }
  return dCount;
};

const restart = function () {
  cardsDealt = [];
  playerCards = [];
  dealerCards = [];
  playerValues = [];
  dealerValues = [];
  mode = `new game`;
};
//-------Helper Functions-------

//-------Game Modes-------
//-------New Game-------
const newGame = function () {
  mode = 0;
  return `Ready for a new round? Click Deal to get your cards.🃏`;
};
//-------New Game-------
//-------Mode 0-------
const firstDeal = function (firstCard, secondCard, dealerCard) {
  firstCard = cardCheck();
  secondCard = cardCheck();

  if (firstCard.value === 11 && secondCard.value === 11) {
    secondCard.value = 1;
  }

  playerCards.push(firstCard.name, secondCard.name);
  playerValues.push(firstCard.value, secondCard.value);
  dealerCard = cardCheck();
  dealerCards.push(dealerCard.name);
  dealerValues.push(dealerCard.value);

  let output1 = `The dealer deals you the ${playerCards[0]} and deals themselves the ${dealerCards}.<br><br>You then get a ${playerCards[1]} and the dealer places one card face down for themself.<br><br>`;
  let output2 = `Your cards are ${playerCards.join(
    "\xa0 "
  )} with a total count of ${playerCount()}.<br><br>`;
  let output3 = `Type in 'Hit' to draw another card.<br> Type in 'Stand' to end your turn.`;

  if (firstCard.value === 11 && secondCard.value === 11) {
    secondCard.value = 1;
  }

  if (
    firstCard.value + secondCard.value === 21 &&
    (dealerCard.value === 10 || dealerCard.value === 11)
  ) {
    mode = 2;
    return (
      output1 +
      `<b>${playerValues[0]} BLACKJACK! ${playerValues[1]}</b><br><br>You win if the dealer doesn't have a <b>BLACKJACK</b>`
    );
  }

  if (firstCard.value + secondCard.value === 21 && dealerCard.value < 10) {
    mode = 4;
    return blackjack();
  }

  mode++;
  return output1 + output2 + output3;
};
//-------Mode 0 End-------
//-------Mode 1-------
const playerChoice = function (playerInput) {
  //--if player hits--
  if (playerInput.toLowerCase().trim() === `hit`) {
    let dealtCard = cardCheck();
    playerCards.push(dealtCard.name);
    playerValues.push(dealtCard.value);

    if (playerCount() > 21) {
      playerValues[playerValues.indexOf(11)] = 1;
    }

    if (playerCount() > 21) {
      mode = 4;
      return bust();
    }
    return `The dealer has a ${dealerCards} and one face down card.<br><br>Your cards are ${playerCards.join(
      "\xa0 "
    )}.<br>Your total count is ${playerCount()}.<br>Type in 'Hit' to draw another card.<br> Type in 'Stand' to end your turn.`;
  }

  //---- if player stands----
  if (playerInput.toLowerCase().trim() === `stand`) {
    mode++;
    return `The dealer has a ${dealerCards} and one face down card.<br><br>Your cards are ${playerCards.join(
      "\xa0 "
    )}.<br>You have chosen to stand with a total of ${playerCount()}.<br><br>The dealer will now draw their cards.`;
  }

  if (
    playerInput.toLowerCase().trim() !== `stand` ||
    playerInput.toLowerCase().trim() !== `hit`
  ) {
    return `I'm sorry I don't understand.<br>The dealer has a ${dealerCards} and one face down card.<br><br>Your cards are ${playerCards.join(
      "\xa0 "
    )}.<br>Your total count is ${playerCount()}.<br>Type in 'Hit' to draw another card.<br> Type in 'Stand' to end your turn.`;
  }
};
//-------Mode 1 End-------
//-------Mode 2-------
const dealerDraws = function () {
  let dealerCard = cardCheck();
  dealerCards.push(dealerCard.name);
  dealerValues.push(dealerCard.value);

  if (dealerCount() > 21) {
    dealerValues[dealerValues.indexOf(11)] = 1;
  }

  if (dealerCount() > 21) {
    mode = 4;
    return bust();
  }

  if (
    playerValues[0] + playerValues[1] === 21 ||
    dealerValues[0] + dealerValues[1] === 21
  ) {
    mode = 4;
    return blackjack();
  }

  if (dealerCount() >= 17) {
    mode++;
    return endResult();
  }

  return `The dealer has ${dealerCards.join(
    "\xa0 "
  )}.<br>Their total count is ${dealerCount()}<br><br>Your cards are ${playerCards.join(
    "\xa0 "
  )}.<br>Your total count is ${playerCount()}.<br><br>Click Deal to continue.`;
};
//-------Mode 2 End-------
//-------Mode 3-------
const endResult = function () {
  //--if player wins
  let finalOutput1 = `The dealer has ${dealerCards.join(
    "\xa0 "
  )}.<br>Their total count is ${dealerCount()}<br>They will stand here.<br><br>Your cards are ${playerCards.join(
    "\xa0 "
  )}.<br>Your total count is ${playerCount()}.<br><br>`;
  let finalOutput2 = `You have the higher total. You win!💰🤑💰<br><br>Click deal to start a new round.`;

  //--if dealer wins
  if (dealerCount() > playerCount()) {
    finalOutput2 = `Dealer has the higher total. Dealer wins this round.💸<br><br>Maybe the next hand will be the winning hand? Click deal to start a new round.`;
  }

  //--tie game
  if (dealerCount() === playerCount()) {
    finalOutput2 = `You both have the same total. Nobody wins this time.<br><br>Click deal to start a new round.`;
  }
  restart();
  return finalOutput1 + finalOutput2;
};
//-------Mode 3 End-------
//-------Mode 4-------
const bust = function () {
  //--if player busts
  let suddenOutput1 = `You have a total of ${
    playerCount() - playerValues[playerValues.length - 1]
  } and you draw a.. ${playerCards[playerCards.length - 1]}...<br><br>`;
  let suddenOutput2 = `Your cards ${playerCards.join(
    "\xa0 "
  )} give you a total of ${playerCount()} That's a bust. Too bad.💸 Maybe next round?`;

  //--if dealer busts
  if (dealerCount() > 21) {
    suddenOutput1 = `The dealer has a total of ${
      dealerCount() - dealerValues[dealerValues.length - 1]
    } and they draw a.. ${dealerCards[dealerCards.length - 1]}!<br><br>`;
    suddenOutput2 = `Dealer busts with ${dealerCards.join(
      "\xa0 "
    )} and a total of ${dealerCount()}!<br><br>You win with ${playerCards.join(
      "\xa0 "
    )}💰🤑💰<br><br>Winner Winner Chicken Dinner!<br><br>Ready to win more? Click deal to start a new round.`;
  }

  restart();
  mode = `new game`;
  return suddenOutput1 + suddenOutput2;
};

const blackjack = function () {
  //--if player has BLACKJACK and dealer does not
  let suddenOutput3 = `Your cards  have give you a ${playerCards[0]} BLACKJACK! ${playerCards[1]}<br><br>`;
  let suddenOutput4 = `The dealer has a ${dealerCards[0]} and they reveal their facedown card to be... ${dealerCards[1]}!<br><br>Dealer doesn't have a <b>BLACKJACK!</b> You Win!💰🤑💰<br><br>Ready to win more? Click deal to start a new round.`;

  if (playerValues[0] + playerValues[1] === 21) {
    //--if both have BLACKJACKs
    if (dealerValues[0] + dealerValues[1] === 21) {
      suddenOutput4 = `The dealer has a ${dealerCards[0]} and they reveal their facedown card to be... ${dealerCards[1]}...<br><br>You both have a <b>BLACKJACK</b> so nobody wins... What are the odds?<br><br>Maybe the next hand will be the winning hand?`;
    }
    //--if dealer immediately cannot get a BLACKJACK
    if (dealerValues[0] < 10) {
      suddenOutput3 = `The dealer deals you the ${playerCards[0]} and deals themselves the ${dealerCards[0]}.<br><br>You then get a ${playerCards[1]} and the dealer places one card face down for themself.<br><br>Your cards have give you a <b>${playerCards[0]} BLACKJACK! ${playerCards[1]}</b><br><br>`;
      suddenOutput4 = `Dealer's ${dealerCards[0]} cannot give them a <b>BLACKJACK!</b> You Immediately Win!💰🤑💰<br><br>Ready to win more? Click deal to start a new round.`;
    }
  }

  //--if dealer has BLACKJACK and player does not
  if (
    playerValues[0] + playerValues[1] < 21 &&
    dealerValues[0] + dealerValues[1] === 21
  ) {
    suddenOutput3 = `Dealer has a ${dealerCards[0]} and they reveal their facedown card to be a... ${dealerCards[1]}!<br><br>Dealer's cards have given them a ${dealerCards[0]} BLACKJACK ${dealerCards[1]}<br><br>`;
    suddenOutput4 = `Your ${playerCards} is the losing hand..<br><br>Too bad.💸 Maybe next round?`;
  }
  restart();
  mode = `new game`;
  return suddenOutput3 + suddenOutput4;
};

const main = function (input) {
  return mode === `new game`
    ? newGame()
    : mode === 0
    ? firstDeal()
    : mode === 1
    ? playerChoice(input)
    : mode === 2
    ? dealerDraws()
    : mode === 3
    ? endResult()
    : mode === 4
    ? bust()
    : blackjack();
};
