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
    playerTotal + card.value > 21 ? (card.value = 1) : (card.value = 11);
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

const restart = function () {
  cardsDealt = [];
  playerCards = [];
  dealerCards = [];
  playerTotal = 0;
  dealerTotal = 0;
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
  dealerCard = cardCheck();
  playerCards.push(firstCard.name, secondCard.name);
  dealerCards.push(dealerCard.name);
  playerTotal = playerTotal + firstCard.value + secondCard.value;
  dealerTotal = dealerTotal + dealerCard.value;
  let output1 = `The dealer deals you the ${playerCards[0]} and deals themselves the ${dealerCards}.<br><br>You then get a ${playerCards[1]} and the dealer places one card face down for themself.<br><br>`;
  let output2 = `Your cards are ${playerCards.join(
    "\xa0 "
  )} with a total count of ${playerTotal}.<br><br>`;
  let output3 = `Type in 'Hit' to draw another card.<br> Type in 'Stand' to end your turn.`;

  if (playerTotal === 21) {
    if (dealerTotal === 10 || dealerTotal === 11) {
      mode = 2;
      output3 = `You have a <b>BLACKJACK!</b> If the dealer does not get a <b>BLACKJACK</b> immediately, you win.`;
      console.log(playerTotal);
      console.log(dealerTotal);
      console.log(mode);
      return output1 + output2 + output3;
    }
    if (dealerTotal !== 10 || dealerTotal !== 11) {
      mode = 4;
      return suddenDeath();
    }
  }

  mode++;
  return output1 + output2 + output3;
};
//-------Mode 0-------
//-------Mode 1 Start-------
const playerChoice = function (playerInput) {
  //----if player busts----

  //----if player hits----
  if (playerInput.toLowerCase().trim() === `hit`) {
    let dealtCard = cardCheck();
    playerCards.push(dealtCard.name);
    playerTotal = playerTotal + dealtCard.value;
    console.log(
      `player total of ${playerTotal} is more than 21: ${playerTotal > 21}`
    );

    if (playerTotal > 21) {
      mode = 4;
      return suddenDeath();
    }
    // let aceCount = 0;
    // for (let i = 0; i < playerCards.length; i++) {
    //   if (playerTotal > 21 && playerCards[i].includes("A")) {
    //     aceCount++;
    //     console.log(aceCount);
    //   }
    // }
    // let altTotal = playerTotal - aceCount * 10;
    // if (aceCount === 0 && playerTotal > 21) {
    //   mode = 4;
    //   console.log(playerTotal);
    //   return suddenDeath();
    // }
    //playerCards[i].includes("A")
    // if (aceCount > 0 && altTotal > 21) {
    //   mode = 4;
    //   console.log(altTotal);
    //   return suddenDeath();
    // }

    // if (altTotal > 21 || playerTotal > 21) {
    //   mode = 4;
    //   console.log(altTotal);
    //   return suddenDeath();
    // }
    return `The dealer has a ${dealerCards} and one face down card.<br><br>Your cards are ${playerCards.join(
      "\xa0 "
    )}.<br>Your total count is ${playerTotal}.<br>Type in 'Hit' to draw another card.<br> Type in 'Stand' to end your turn.`;
  }

  //---- if player stands----
  if (playerInput.toLowerCase().trim() === `stand`) {
    mode++;
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
  if (dealerTotal < 17 || dealerTotal < playerTotal) {
    let dealerCard = cardCheck();
    dealerCards.push(dealerCard.name);
    dealerTotal = dealerTotal + dealerCard.value;
    let aceCount = 0;
    for (i = 0; i < dealerCards.length; i++) {
      if (dealerTotal > 21 && dealerCards[i].includes("A")) {
        aceCount++;
        console.log(aceCount);
      }
      let altTotal = dealerTotal - aceCount * 10;
      if (dealerCards[i].includes("A") && altTotal > 21) {
        mode = 4;
        console.log(dealerTotal);
        return suddenDeath();
      }
      if (!dealerCards[i].includes("A") && dealerTotal > 21) {
        mode = 4;
        console.log(dealerTotal);
        return suddenDeath();
      }
    }
    // if (
    //   dealerTotal > 21 &&
    //   (dealerCards.includes("A♦️") ||
    //     dealerCards.includes("A♣️") ||
    //     dealerCards.includes("A♥️") ||
    //     dealerCards.includes("A♠️"))
    // ) {
    //   dealerTotal = dealerTotal - 10;
    // }

    if (
      playerCards.length === 2 &&
      playerTotal === 21 &&
      dealerCards.length === 2 &&
      dealerTotal !== 21
    ) {
      mode = 4;
      return suddenDeath();
    }

    if (dealerTotal > 21) {
      mode = 4;
      return suddenDeath();
    }

    if (
      dealerCards.length === 2 &&
      dealerTotal === 21 &&
      playerCards.length !== 2 &&
      playerTotal <= 21
    ) {
      mode = 4;
      console.log(mode);
      return suddenDeath();
    }

    if (
      dealerCards.length === 2 &&
      dealerTotal === 21 &&
      playerCards.length === 2 &&
      playerTotal === 21
    ) {
      mode = 4;
      console.log(mode);
      return suddenDeath();
    }

    return `The dealer has ${dealerCards.join(
      "\xa0 "
    )}.<br>Their total count is ${dealerTotal}<br><br>Your cards are ${playerCards.join(
      "\xa0 "
    )}.<br>Your total count is ${playerTotal}.<br><br>Click Deal to continue.`;
  }
  if (
    dealerTotal >= 17 &&
    (dealerTotal > playerTotal || dealerTotal === playerTotal)
  ) {
    mode++;
    return endResult();
  }
};
//-------Mode 2 End-------
//-------Mode 3 Start-------
const endResult = function () {
  let finalOutput1 = `The dealer has ${dealerCards.join(
    "\xa0 "
  )}.<br>Their total count is ${dealerTotal}<br>They will stand here.<br><br>Your cards are ${playerCards.join(
    "\xa0 "
  )}.<br>Your total count is ${playerTotal}.<br><br>`;
  let finalOutput2 = `You have the higher total. You win!💰🤑💰<br><br>Click deal to start a new round.`;

  if (dealerTotal > playerTotal) {
    finalOutput2 = `Dealer has the higher total. Dealer wins this round.💸<br><br>Click deal to start a new round.`;
  }

  if (dealerTotal === playerTotal) {
    finalOutput2 = `You both have the same total. Nobody wins this time.<br><br>Click deal to start a new round.`;
  }
  restart();
  return finalOutput1 + finalOutput2;
};
//-------Mode 3 End-------
//-------Mode 4 Start-------
const suddenDeath = function () {
  let finalOutput3 = `Your cards ${playerCards.join(
    "\xa0 "
  )} have given you a total of ${playerTotal}.<br><br>`;
  let finalOutput4 = `That's a bust. Too bad.💸<br><br>Click deal to start a new round.`;

  //--if both dealer and player get blacjacks--
  if (dealerTotal === 21 && playerTotal === 21 && playerCards.length === 2) {
    finalOutput4 = `Your cards ${playerCards.join(
      "\xa0 "
    )} have given you a <b>BLACKJACK</b>! But...<br><br>The Dealer's cards of ${dealerCards.join(
      "\xa0 "
    )} have given them a <b>BLACKJACK</b> as well. What are the odds.Too bad.<br><br>Click deal to start a new round.`;
  }

  //--if player busts with an ace--
  // if (
  //   (playerTotal > 21 && playerCards.includes("A♦️")) ||
  //   playerCards.includes("A♣️") ||
  //   playerCards.includes("A♥️") ||
  //   playerCards.includes("A♠️")
  // ) {
  //   finalOutput3 = `Your cards ${playerCards.join(
  //     "\xa0 "
  //   )} have given you a total of ${playerTotal - 10}.<br><br>`;
  // }

  if (dealerTotal > 21) {
    finalOutput3 = `<br>Dealer's cards ${dealerCards.join(
      "\xa0 "
    )} have given them a total of ${dealerTotal}.<br><br>Dealer busts!`;
    //-- if dealer busts and player has a blackjack--
    if (playerCards.length === 2) {
      finalOutput4 = `<br><br>You win with ${playerCards.join(
        "\xa0 "
      )}... <b>BLACKJACK</b>!💰🤑💰`;
    }
    if (playerCards.length > 2) {
      finalOutput4 = `<br><br>You win with ${playerCards.join(
        "\xa0 "
      )} and a total of ${playerTotal}!💰🤑💰`;
    }
  }

  //--if dealer has a blackjack but player does not--
  if (
    dealerTotal === 21 &&
    dealerCards.length === 2 &&
    playerTotal <= 21 &&
    playerCards.length > 2
  ) {
    return `Your cards ${playerCards.join(
      "\xa0 "
    )} have given you a total of ${playerTotal}! But...<br><br>The Dealer's cards of ${dealerCards.join(
      "\xa0 "
    )} have given them a <b>BLACKJACK</b>. What are the odds.Too bad.<br>Maybe the next <b>BLACKJACK</b> could be yours?<br><br>Click deal to start a new round.`;
  }

  //--if player has a blackjack and dealer does not--
  if (playerTotal === 21 && playerCards.length === 2 && dealerTotal !== 21) {
    console.log(dealerCards);
    finalOutput3 = `Your cards ${playerCards.join(
      "\xa0 "
    )} have given you a <b>BLACKJACK</b> and the Dealer's face down card is... ${
      dealerCards[1]
    }!<br><br>`;
    finalOutput4 = `The dealer's ${dealerCards.join(
      "\xa0 "
    )} can not give them a <b>BLACKJACK</b>! Winner winner chicken dinner!💰🤑💰<br><br>Click deal to start a new round.`;
  }

  // if (playerTotal !== 21 && dealerTotal === 21) {
  //   finalOutput4 = `But the dealer's facedown ${dealerCards[1]} gives them a <b>BLACKJACK</b>... Too bad.💸<br><br>Maybe the next <b>BLACKJACK</b> could be yours?<br><br>Click deal to start a new round.`;
  // }

  restart();
  return finalOutput3 + finalOutput4;
};
//-------Mode 4 End-------

//-------Main Function-------

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
    : suddenDeath();

  //   if (mode === `new game`) {
  //     return newGame();
  //   }

  //   if (mode === 0) {
  //     return firstDeal();
  //   }

  //   if (mode === 1) {
  //     return playerChoice(input);
  //   }

  //   if (mode === 2) {
  //     return dealerDraws();
  //   }

  //   if (mode === 3) {
  //     return endResult();
  //   }

  //   if (mode === 4) {
  //     return suddenDeath();
  //   }
};
//-------Main Function-------

//card name `⌈` + "‾‾‾‾‾" + `⌉` + `<br>` + ` |` + `\xa0 2♠️ ` + ` |` + `<br>` + `⌊___⌋`
//improved name `┏╾┓<br>\xa0│<b>${dealtCard.name}</b> │<br>┗┻┛`
//`Your card is the <br>┏╾┓<br>\xa0│<b>${dealtCard.name}</b>│<br>┗┻┛<br> which has a value of ${dealtCard.value}`
