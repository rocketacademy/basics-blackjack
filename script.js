// function to generate deck of 52 cards.
function createDeck() {
  let suits = ['hearts', 'dimonds', 'clubs', 'spades'];
  let suitsLength = suits.length;
  let cardRank;
  let cardName;
  let cardDeck = [];
  for (let i = 0; i < suitsLength; i++) {
    let currentSuit = suits[i];
    console.log('current suit is: ' + suits[i]);
    for (let j = 1; j <= 13; j++) {
      cardRank = j;
      cardName = cardRank;
      if (cardRank == 1) {
        cardName = 'ace';
      }
      else if (cardRank == 11) {
        cardName = 'jack';
      }
      else if (cardRank == 12) {
        cardName = 'queen';
      }
      else if (cardRank == 13) {
        cardName = 'king';
      }
      let deck = {
        name: cardName,
        suit: currentSuit,
        rank: cardRank,
      };
      cardDeck.push(deck);
    }
  }
  return cardDeck;
}

let deck = createDeck();

// function generates random card number.
function genrateRandomCards(max) {
  return Math.floor(Math.random(max));
}

// takes card deck as input and returns shuffled cards deck
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

// function takes a card and sum of all the cards as inputs.
// if card is ace, returns new value of ace (1 or 11).
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

// takes total sum of cards as input and returns result as per backjack rules
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

// function to analyse blackjack when computer is playing.
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

// takes user input, present game mode and returns the new/changed mode.
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

// takes sums of user and dealer as input and returns winner.
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

// customizes messages when dealer is playing.
function dealerPlayMessages(currentPlayer, playerResult, playerTotal) {
  return ` ${currentPlayer}'s total is ${playerTotal}. <br>${currentPlayer} decided to ${playerResult}.`;
}

// customized message when dealer decides to hit.
function dealerHitMessages(currentPlayer, playResult, newCard, playerTotal) {
  return `${currentPlayer}'s new card is ${newCard} <br> ${currentPlayer} decided to ${playResult} again. ${currentPlayer}'s total so far is ${playerTotal}.`;
}

// input is dealt cards. returns array of hands after the split.
function splitHandsCards(dealtCard1, dealtCard2) {
  let card1;
  let card2;
  let card3;
  let card4;
  let sumCard1Card2;
  let sumCard3Card4;
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

// default mode and player.
let currentMode = 'play';
let currentPlayer = 'user';

// track totals of user and dealer's card
let userTotal;
let dealerTotal;

// result of main function.
let result;
// assigned points to player when game starts.
let userPoints = 100;

function main(input) {
  let mode = setMode(input, currentMode);
  if (mode == 'play') {
    let card1 = shuffledDeck(deck).pop().rank;
    let card2 = shuffledDeck(deck).pop().rank;
    // let card1 = 10;
    // let card2 = 10;
    let sum = card1 + card2;
    let firstCard = setAceValue(card1, sum);
    // display images of dealt card
    document.getElementById('card1').src = 'images/' + firstCard + '.png';
    let secondCard = setAceValue(card2, sum);
    document.getElementById('card2').src = 'images/' + secondCard + '.png';
    let sumOfCards = firstCard + secondCard;
    result = `${currentPlayer} 's First Card is ${firstCard} <br> and Second Card is ${secondCard} . total so far is ${sumOfCards}.`;
    if (currentPlayer == 'user') {
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
      // each time cards are dealt. user bets 10 points.
      userPoints -= 10;
      if (userPoints <= 0) {
        return `you runout of points. your current point is ${userPoints}`;
      }
      userTotal = sumOfCards;
      result += `you currently have ${userPoints} points. ` + analyseForBlackjack(sumOfCards);
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
      console.log('new card value and user total is ' + newCardValue + ' ' + userTotal);
      result = analyseForBlackjack(userTotal);
      result = `new card is ${newCardValue}. after the hit new total is ${userTotal}.` + result;
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
