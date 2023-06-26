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
let player = "";
let mode = `new game`;
let winLoss = 0;
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
  mode = 0;
  winLoss = 0;
};
//-------Helper Functions-------

//-------Game Modes-------
//-------New Game-------
const newGame = function (playerInput) {
  let firstOutput = `No names then? Okay. Let's just call you Player.`;

  playerInput.trim() !== "" ? (player = playerInput) : (player = "Player");

  if (player != "Player") {
    firstOutput = `Well hello ${player}.`;
  }

  mode = 0;
  return (
    firstOutput +
    `<br>Ready to win some money? Click 'Hit' to get your cards.🃏<br><br>Oh by the way, I have to Stand on 17 or more.`
  );
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
  dealerCards.push(dealerCard.name, "🂠");
  dealerValues.push(dealerCard.value);
  playerCount();
  dealerCount();

  if (
    firstCard.value + secondCard.value === 21 &&
    (dealerCard.value === 10 || dealerCard.value === 11)
  ) {
    mode = 2;
    return `WOW! You got a <b>BLACKJACK!</b> right there!<br><br>You win if I don't get a <b>BLACKJACK</b> now. Click 'Hit' to continue.`;
  }

  if (firstCard.value + secondCard.value === 21 && dealerCard.value < 10) {
    mode = 5;
    return blackjack();
  }

  mode++;
  return `Let's start then. This one's for you. Now me. Back to you and a facedown card for me.<br><br>What's it gonna be ${player}? Hit or Stand?`;
};
//-------Mode 0 End-------
//-------Mode 1-------
const playerChoice = function (playerInput) {
  //--if player hits--
  if (playerInput === `hit`) {
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
    return `Alright then here's another one for ya'.`;
  }

  //---- if player stands----
  if (playerInput === `stand`) {
    mode++;
    return `Gonna stand on that then? Okay my turn🙂<br>Click 'Hit' to continue.`;
  }
};
//-------Mode 1 End-------
//-------Mode 2-------
const dealerDraws = function () {
  let dealerCard = cardCheck();
  if (dealerValues[0] === 11 && dealerCard.value === 11) {
    dealerCard.value = 1;
  }
  dealerCards[1] = dealerCard.name;
  dealerValues.push(dealerCard.value);

  if (
    playerValues[0] + playerValues[1] === 21 ||
    dealerValues[0] + dealerValues[1] === 21
  ) {
    mode = 5;
    return blackjack();
  }

  while (dealerCount() < 17) {
    let nextCard = cardCheck();

    dealerCards.push(nextCard.name);
    dealerValues.push(nextCard.value);
    if (dealerCount() > 21) {
      dealerValues[dealerValues.indexOf(11)] = 1;
    }
  }

  if (dealerCount() > 21) {
    mode = 4;
    return bust();
  }

  if (dealerCount() >= 17) {
    mode++;
    return endResult();
  }
};
//-------Mode 2 End-------
//-------Mode 3-------
const endResult = function () {
  let tempArr1 = [];
  for (let k = 2; k < dealerCards.length; k++) {
    tempArr1.push(dealerCards[k]);
  }
  //--if player wins
  let standardOutput1 = `My facedown card is a ${dealerCards[1]} and.. `;
  let standardOutput2 = `I draw ${tempArr1.join(" and ")}.<br><br>`;
  let standardOutput3 = `I have to Stand at 17 or more so...<br><br>You have the higher total. You win!💰🤑💰<br><br>Click 'Hit' to start a new round.`;
  playerCount() > dealerCount() ? winLoss++ : winLoss--;

  //--if dealer wins
  if (dealerCount() > playerCount()) {
    standardOutput3 = `I have to Stand at 17 or more so...<br><br>Looks like I have the higher total💸 Maybe the next hand will be the winning hand?<br><br>Let's go again.Click 'Hit' to start a new round.`;
  }

  //--tie game
  if (dealerCount() === playerCount()) {
    standardOutput3 = `Both of us have the same total. Nobody wins🙂<br><br>Let's go again.Click 'Hit' to start a new round.`;
  }

  mode = 6;
  if (dealerCards.length === 2) {
    return standardOutput1 + standardOutput3;
  } else {
    return standardOutput1 + standardOutput2 + standardOutput3;
  }
};
//-------Mode 3 End-------
//-------Mode 4-------
const bust = function () {
  let tempArr2 = [];
  for (let l = 2; l < dealerCards.length; l++) {
    tempArr2.push(dealerCards[l]);
  }
  //--if player busts
  let suddenOutput1 = `Here you go and.. Oof..<br><br>A total of ${playerCount()}. That's a bust. Too bad.💸<br><br>Maybe next round? Click 'Hit' to try again🙂`;
  //--if dealer busts
  if (dealerCount() > 21) {
    if (dealerCards.length === 2) {
      suddenOutput1 = `My facedown card is a.. ${
        dealerCards[1]
      } and I draw ${tempArr2.join(
        " and "
      )}.. Oof..<br><br>That's a bust for me but.. That's a WIN for you!💰🤑💰<br><br>Click 'Hit' to win again🙂`;
    }
    if (dealerCards.length > 2) {
      suddenOutput1 = `My facedown card is a.. ${dealerCards[1]} and I draw.. Oof..<br><br>That's a bust for me but.. That's a WIN for you!💰🤑💰<br><br>Click 'Hit' to win again🙂`;
    }
  }
  playerCount() > 21 ? winLoss-- : winLoss++;
  mode = 6;
  return suddenOutput1;
};
//-------Mode 4 End-------
//-------Mode 5-------
const blackjack = function () {
  //--if player has BLACKJACK and dealer does not
  let suddenOutput3 = `My facedown card is a... ${dealerCards[1]}!`;
  let suddenOutput4 = `I don't have a <b>BLACKJACK</b> which means you win!💰🤑💰<br><br>Click 'Hit' to win again🙂`;

  if (playerValues[0] + playerValues[1] === 21) {
    //--if both have BLACKJACKs
    if (dealerValues[0] + dealerValues[1] === 21) {
      suddenOutput4 = `Wow! What are the odds that we both get <b>BLACKJACKS</b>?<br><br>Nobody wins this round.Click 'Hit' to deal a new hand🙂`;
    }

    //--if dealer immediately cannot get a BLACKJACK
    if (dealerValues[0] < 10) {
      suddenOutput3 = `That's a <b>BLACKJACK!</b><br><br>`;
      suddenOutput4 = `We don't even need to check my facedown card! You Immediately Win!💰🤑💰<br><br>Ready to win again? Click 'Hit' to start a new round.`;
    }
  }

  //--if dealer has BLACKJACK and player does not
  if (
    playerValues[0] + playerValues[1] < 21 &&
    dealerValues[0] + dealerValues[1] === 21
  ) {
    suddenOutput4 = `I got a <b>BLACKJACK!</b><br><br>But that's too bad for you..💸☹️<br><br> Maybe next round?Click 'Hit' to start a new round.`;
  }
  if (playerCount() === 21) {
    if (dealerCount() === 21) {
      winLoss--;
    }
    if (dealerCount() !== 21) {
      winLoss++;
    }
  }
  if (playerCount() !== 21) {
    winLoss--;
  }
  mode++;
  return suddenOutput3 + suddenOutput4;
};
//-------Mode 5 End-------
//-------Mode 6-------
const goAgain = function () {
  let winTry = ``;
  winLoss > 0 ? (winTry = `win`) : (winTry = `try`);
  restart();
  return `Wanna ${winTry} again ${player}?<br>Click 'Hit' to start a new round.`;
};
//-------Mode 6 End-------
const main = function (input) {
  return mode === `new game`
    ? newGame(input)
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
    : mode === 5
    ? blackjack()
    : goAgain();
};
