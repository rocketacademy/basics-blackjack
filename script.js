var deck = [
  {
    name: 'ace',
    suit: 'hearts',
    rank: 1,
  },
  {
    name: '2',
    suit: 'hearts',
    rank: 2,
  },
  {
    name: '3',
    suit: 'hearts',
    rank: 3,
  },
  {
    name: '4',
    suit: 'hearts',
    rank: 4,
  },
  {
    name: '5',
    suit: 'hearts',
    rank: 5,
  },
  {
    name: '6',
    suit: 'hearts',
    rank: 6,
  },
  {
    name: '7',
    suit: 'hearts',
    rank: 7,
  },
  {
    name: '8',
    suit: 'hearts',
    rank: 8,
  },
  {
    name: '9',
    suit: 'hearts',
    rank: 9,
  },
  {
    name: '10',
    suit: 'hearts',
    rank: 10,
  },
  {
    name: 'jack',
    suit: 'hearts',
    rank: 11,
  },
  {
    name: 'queen',
    suit: 'hearts',
    rank: 12,
  },
  {
    name: 'king',
    suit: 'hearts',
    rank: 13,
  },
  {
    name: 'ace',
    suit: 'diamonds',
    rank: 1,
  },
  {
    name: '2',
    suit: 'diamonds',
    rank: 2,
  },
  {
    name: '3',
    suit: 'diamonds',
    rank: 3,
  },
  {
    name: '4',
    suit: 'diamonds',
    rank: 4,
  },
  {
    name: '5',
    suit: 'diamonds',
    rank: 5,
  },
  {
    name: '6',
    suit: 'diamonds',
    rank: 6,
  },
  {
    name: '7',
    suit: 'diamonds',
    rank: 7,
  },
  {
    name: '8',
    suit: 'diamonds',
    rank: 8,
  },
  {
    name: '9',
    suit: 'diamonds',
    rank: 9,
  },
  {
    name: '10',
    suit: 'diamonds',
    rank: 10,
  },
  {
    name: 'jack',
    suit: 'diamonds',
    rank: 11,
  },
  {
    name: 'queen',
    suit: 'diamonds',
    rank: 12,
  },
  {
    name: 'king',
    suit: 'diamonds',
    rank: 13,
  },
  {
    name: 'ace',
    suit: 'clubs',
    rank: 1,
  },
  {
    name: '2',
    suit: 'clubs',
    rank: 2,
  },
  {
    name: '3',
    suit: 'clubs',
    rank: 3,
  },
  {
    name: '4',
    suit: 'clubs',
    rank: 4,
  },
  {
    name: '5',
    suit: 'clubs',
    rank: 5,
  },
  {
    name: '6',
    suit: 'clubs',
    rank: 6,
  },
  {
    name: '7',
    suit: 'clubs',
    rank: 7,
  },
  {
    name: '8',
    suit: 'clubs',
    rank: 8,
  },
  {
    name: '9',
    suit: 'clubs',
    rank: 9,
  },
  {
    name: '10',
    suit: 'clubs',
    rank: 10,
  },
  {
    name: 'jack',
    suit: 'clubs',
    rank: 11,
  },
  {
    name: 'queen',
    suit: 'clubs',
    rank: 12,
  },
  {
    name: 'king',
    suit: 'clubs',
    rank: 13,
  },
  {
    name: 'ace',
    suit: 'spades',
    rank: 1,
  },
  {
    name: '2',
    suit: 'spades',
    rank: 2,
  },
  {
    name: '3',
    suit: 'spades',
    rank: 3,
  },
  {
    name: '4',
    suit: 'spades',
    rank: 4,
  },
  {
    name: '5',
    suit: 'spades',
    rank: 5,
  },
  {
    name: '6',
    suit: 'spades',
    rank: 6,
  },
  {
    name: '7',
    suit: 'spades',
    rank: 7,
  },
  {
    name: '8',
    suit: 'spades',
    rank: 8,
  },
  {
    name: '9',
    suit: 'spades',
    rank: 9,
  },
  {
    name: '10',
    suit: 'spades',
    rank: 10,
  },
  {
    name: 'jack',
    suit: 'spades',
    rank: 11,
  },
  {
    name: 'queen',
    suit: 'spades',
    rank: 12,
  },
  {
    name: 'king',
    suit: 'spades',
    rank: 13,
  },
];
function genrateRandomCards(max) {
  return Math.floor(Math.random(max));
}
function shuffledDeck(cardDeck) {
  const length = cardDeck.length;
  for (let i = 0; i < length; i++) {
    const currentCardIndex = i;
    const randomCardIndex = genrateRandomCards(length);
    const currentCard = cardDeck[currentCardIndex];
    const randomCard = cardDeck[randomCardIndex];
    cardDeck[currentCardIndex] = randomCard;
    cardDeck[randomCardIndex] = currentCard;
  }
  return cardDeck;
}
function setAceValue(aCard, cardsSum) {
  let cardValue;
  if (aCard == 'ace' && cardsSum > 21) {
    cardValue = 1;
  }
  else if (aCard == 'ace' && cardsSum <= 10) {
    cardValue = 11;
  }
  else {
    cardValue = aCard;
  }
  return cardValue;
}
function analyseForBlackjack(cardsTotal) {
  let result;
  if (cardsTotal > 21) {
    result = 'BUST';
  }
  else if (cardsTotal == 21) {
    result = 'BLACKJACK';
  }
  else {
    result = 'hit or stand';
  }

  return result;
}
function autoAnalyseBlackjack(cardsTotal) {
  let result;
  if (cardsTotal > 21) {
    result = 'BUST';
  }
  else if (cardsTotal < 17) {
    result = 'hit';
  }
  else {
    result = 'stand';
  }
  return result;
}
function setMode(userInput, presentMode) {
  let mode;
  if (userInput == '') {
    mode = presentMode;
  }
  else if (userInput == 'hit') {
    mode = 'hit';
  }
  else if (userInput == 'stand') {
    mode = 'stand';
  }
  else if (userInput == 'hand1' || userInput == 'hand2') {
    mode = 'split';
  }
  return mode;
}
function findWinner(sumOfUserCards, sumOfDealerCards) {
  let result;
  if (sumOfUserCards > sumOfDealerCards) {
    result = `user WON!. <br> user total is ${sumOfUserCards} and dealer's total is ${sumOfDealerCards}. `;
  }
  else if (sumOfDealerCards > sumOfUserCards) {
    result = `Dealer Won. <br> user total is ${sumOfUserCards} and dealer's total is ${sumOfDealerCards}.`;
  }
  else {
    result = `DRAW. <br> user total is ${sumOfUserCards} and dealer's total is ${sumOfDealerCards}.`;
  }
  return result;
}
// customize messages when dealer is playing.
function dealerPlayMessages(currentPlayer, playerResult, playerTotal) {
  return ` ${currentPlayer}'s total is ${playerTotal}. <br>${currentPlayer} decided to ${playerResult}.`;
}
function dealerHitMessages(currentPlayer, playResult, newCard, playerTotal) {
  return `${currentPlayer}'s new card is ${newCard} <br> ${currentPlayer} decided to ${playResult} again. ${currentPlayer}'s total so far is ${playerTotal}.`;
}
function splitHandsCards(dealtCard1, dealtCard2) {
  let card1; let card2; let card3; let card4; let sumCard1Card2; let sumCard3Card4;
  let handsArray = [];
  if (dealtCard1 == dealtCard2) {
    card1 = dealtCard1;
    card2 = shuffledDeck(deck).pop().rank;
    sumCard1Card2 = card1 + card2;
    card3 = dealtCard2;
    card4 = shuffledDeck(deck).pop().rank;
    sumCard3Card4 = card3 + card4;
  }
  let firstCard = setAceValue(card1, sumCard1Card2);
  console.log('first card: ' + firstCard);
  let secondCard = setAceValue(card2, sumCard1Card2);
  let thirdCard = setAceValue(card3, sumCard3Card4);
  let fourthCard = setAceValue(card4, sumCard3Card4);

  let sumOfFirstHand = firstCard + secondCard;
  let sumOfSecondHand = thirdCard + fourthCard;
  handsArray.push(sumOfFirstHand);
  handsArray.push(sumOfSecondHand);
  return handsArray;
}

let currentMode = 'play'; let currentPlayer = 'user';
let userTotal; let dealerTotal; let result;
let userPoints = 100;

function main(input) {
  let mode = setMode(input, currentMode);
  if (mode == 'play') {
    // each time cards are dealt. user bets 10 points.
    userPoints -= 10;
    if (userPoints <= 0) {
      return `you runout of points. your current point is ${userPoints}`;
    }
    let card1 = shuffledDeck(deck).pop().rank;
    let card2 = shuffledDeck(deck).pop().rank;
    // let card1 = 10;
    // let card2 = 10;
    let sum = card1 + card2;
    let firstCard = setAceValue(card1, sum);
    let secondCard = setAceValue(card2, sum);
    let sumOfCards = firstCard + secondCard;
    result = `${currentPlayer} 's First Card is ${firstCard} and Second Card is ${secondCard}. total so far is ${sumOfCards}. you currently have ${userPoints} points.`;
    if (currentPlayer == 'user') {
      userTotal = sumOfCards;
      result += analyseForBlackjack(sumOfCards);
      // split cards game inplementation block
      if (card1 == card2) {
        console.log('two equal cards loop is running');
        userTotal1 = splitHandsCards(card1, card2)[0];
        console.log(userTotal1 + ' :usertotal1');
        userTotal2 = splitHandsCards(card1, card2)[1];
        console.log(userTotal2 + ' :usertotal2');
        result = `user's first card is ${card1} and second card is ${card2}.<br> After split user's first hand  is ${userTotal1} and second hand is ${userTotal2}. choose hand1/hand2 to continue playing. `;
        return result;
      }
      //
    }

    else if (currentPlayer == 'dealer') {
      dealerTotal = sumOfCards;
      let playResult = autoAnalyseBlackjack(dealerTotal);
      result += dealerPlayMessages(currentPlayer, playResult, dealerTotal);
      if (playResult == 'hit') {
        currentMode = 'hit';
        result += `press submit to see ${currentPlayer}'s card.`;
      }
      else if (playResult == 'stand') {
        currentMode = 'stand';
        result += '<br> press submit to know the winner.';
        return result;
      }
      else if (playResult == 'BUST') {
        result += `${currentPlayer}'s total is ${dealerTotal}. <br> Start another round.`;
        currentMode = 'play';
        currentPlayer = 'user';
      }
    }
  }

  else if (mode == 'hit') {
    let newCard = shuffledDeck(deck).pop().rank;
    let newCardValue = setAceValue(newCard, userTotal);
    if (currentPlayer == 'user') {
      userTotal += newCardValue;
      result = analyseForBlackjack(userTotal);
      result = `after the hit new total is ${userTotal}.` + result;
    }
    else if (currentPlayer == 'dealer') {
      dealerTotal += newCardValue;
      console.log('dealers hit round')
      let resultValue = autoAnalyseBlackjack(dealerTotal);
      result = dealerHitMessages(currentPlayer, resultValue, newCardValue, dealerTotal);
      if (resultValue == 'hit') {
        result += ' press submit to see the cards.';
      }
      else if (resultValue == 'stand') {
        currentMode = 'stand';
        result += ' <br> press submit to know the winner.';
      }
      else {
        currentMode = 'play';
        currentPlayer = 'user';
        result = resultValue + `. dealer's new card is ${newCardValue} <br>dealers total so far is ${dealerTotal}`;
      }
    }
  }
  else if (input == 'stand' && currentPlayer == 'user') {
    currentMode = 'play';
    currentPlayer = 'dealer';
    result = `current mode is set to ${currentMode}.current player is ${currentPlayer}.`;
  }
  else if (mode == 'stand' && currentPlayer == 'dealer') {
    result = findWinner(userTotal, dealerTotal);
    currentMode = 'play';
    currentPlayer = 'user';
    result += 'Let\'s play another round';
  }
  // split cards game inplementation block
  else if (mode == 'split') {
    console.log('split mode loop is running.')
    if (input == 'hand1') {
      console.log('split loop is running');
      userTotal = userTotal1;
      result = `user's total is ${userTotal1}. ` + analyseForBlackjack(userTotal1);
    }
    else if (input == 'hand2') {
      result = analyseForBlackjack(userTotal2);
      userTotal = userTotal2;
    }
  }
  //
  return result;
}
